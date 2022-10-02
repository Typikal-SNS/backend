const express = require('express')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const passport = require('passport');
 
const { User, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router()
router.post('/emailCheck', isNotLoggedIn, async(req, res, next) => {
  try {
  
    const exUser = await User.findOne({ where: { email  :req.body.mail } });
    if (exUser) {
      return res.status(403).json({
        code: 403,
        message: "존재하는 이메일 입니다. 다른 이메일을 사용해 주세요."
      });
    }
    let authNum = Math.floor(1000 + Math.random()*9000);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
  
    let mailOptions = {
        from: `Typikal-SNS-Service`,
        to: req.body.mail,
        subject: 'Typikal-SNS 회원가입 인증번호.',
        text: "오른쪽 숫자를 입력해주세요 : " + authNum
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            res.end('서버 에러')
        }
        req.session.authNum = authNum;
        req.session.mail = req.body.mail
        res.status(200).json({
          code: 200,
          message: '이메일 전송 성공'
        });
        transporter.close()
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
 
});
/**
 * @swagger
 *
 * /auth/emailCheck:
 *  post:
 *    summary: "이메일 인증"
 *    description: "POST 방식으로 이메일을 인증한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 이메일로 인증번호를 발송합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mail:
 *                type: string
 *                description: "사용 할 이메일"
 *                required: true
 *    responses:
 *      "200":
 *        description: "메일 발송 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: '이메일 전송 성공'
 */
 router.post('/authNumCheck', isNotLoggedIn,async(req, res) => {

  if(req.body.authNum === req.session.authNum) {
    delete req.session.authNum
    req.session.joinable = true;
    res.status(200).json({
      code: 200,
      message: "이메일 인증 성공"
    })
  } else {

    res.json({
      code: 403,
      message: '인증번호가 틀립니다.'
    })
  }
});
/**
 * @swagger
 *
 * /auth/authNumCheck:
 *  post:
 *    summary: "인증번호"
 *    description: "POST 방식으로 인증번호를 확인한다.."
 *    tags: [Users]
 *    requestBody:
 *      description: 인증번호가 맞는지 확인합니다. 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              authNum:
 *                type: integer
 *                description: "인증번호"
 *                required: true
 *    responses:
 *      "200":
 *        description: "인증번호 인증 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: "이메일 인증 성공"
 */
router.post('/join', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try{

    if (!req.session.joinable){
      return res.status(403).json({
        code: 403,
        message: '이메일 인증을 먼저 해주세요.'
      });
    }
    const exUser1 = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser1) {
      return res.status(403).json({
        code: 403,
        message: '이미 사용 중인 이메일입니다.'
      });
    }
    const exUser2 = await User.findOne({
        where: {
          nickname: req.body.nickname,
        }
      });
      if (exUser2) {
        return res.status(403).json({
          code: 403,
          message: '이미 사용 중인 닉네임입니다.'
        });
      }
    if (req.session.mail != req.body.email){
      return res.status(403).json({
        code: 403,
        message: '인증받은 이메일로만 가입 가능합니다..'
      });  
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
    });
    delete req.session.joinable
    delete req.session.mail
    res.json({
      code: 200,
      message: "회원가입 성공"
    })
  } catch(e) {
    console.error(e)
    next(e)
  }

})
/**
 * @swagger
 *
 * /auth/join:
 *  post:
 *    summary: "유저 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 이메일 인증번호 인증 후에만 회원가입이 가능합니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "유저 고유아이디"
 *                required: true
 *              password:
 *                type: string
 *                description: "유저 비밀번호"
 *                required: true
 *              nickname:
 *                type: string
 *                description: "유저 닉네임"
 *                required: true
 *        
 *    responses:
 *      "200":
 *        description: "회원가입 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: "회원가입 성공"
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => { // 로그인상태 쿠키를 프론트로 보낸다.
        if (loginErr) {
            console.error(loginErr);
            return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
            where: { id: user.id },
            attributes: {
              exclude: ['password', 'updatedAt']
            },
            include: [{
              model: Image,
              attributes: ['src', 'id'],
            }]
        })
        fullUserWithoutPassword.dataValues.code = 200
        fullUserWithoutPassword.dataValues.message = "로그인 성공"
        return res.status(200).json(fullUserWithoutPassword);
      });
  })(req, res, next);
})
/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    summary: "유저 로그인"
 *    description: "POST 방식으로 로그인 한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 로그인API 입니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "유저 고유아이디"
 *                required: true
 *              password:
 *                type: string
 *                description: "유저 비밀번호"
 *                required: true
 *    responses:
 *      "200":
 *        description: "로그인 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  default: 37
 *                email:
 *                  type: string
 *                  default: "hyukjin.kim.dev@gmail.com"
 *                nickname:
 *                  type: string
 *                  default: "코딩전사"
 *                createdAt:
 *                  type: string
 *                  default: "2022-09-26T08:21:58.000Z"
 *                Image:
 *                    type: object
 *                    properties:
 *                      id: 
 *                        type: integer
 *                        default: 1
 *                      src: 
 *                        type: string
 *                        default: "myprofileimg_1241414343.png"
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: "로그인 성공"

 */
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.status(200).json({
      code: 200,
      message: '로그아웃 성공'
    })
  });
  });
/**
 * @swagger
 *
 * /auth/logout:
 *  get:
 *    summary: "유저 로그아웃"
 *    description: 로그아웃 API 입니다.
 *    tags: [Users]
 *    responses:
 *      "200":
 *        description: "로그아웃 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: '로그아웃 성공'
 */

module.exports = router