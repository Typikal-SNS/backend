const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport');
 
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router()
router.post('/join', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try{
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

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
    });
    res.json({
      code: 200,
      message: "join success"
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
 *                  default: "join success"
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
        })
        fullUserWithoutPassword.dataValues.code = 200
        fullUserWithoutPassword.dataValues.message = "login success"
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
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: "login success"
 */
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.status(200).json({
      code: 200,
      message: 'logout success'
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
 *                  default: 'logout success'
 */

module.exports = router