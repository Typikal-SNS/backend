const express = require('express')
const bcrypt = require('bcrypt')

const fs = require('fs');
const path = require('path')
const { User, Image, Post } = require('../models')
const { isLoggedIn, upload } = require('./middlewares')

const router = express.Router()


try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}
router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Image,
          attributes: ['src', 'id'],
        },{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      fullUserWithoutPassword.dataValues.code = 200
      fullUserWithoutPassword.dataValues.message = "유저 정보 조회 성공"
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json({
        code: 200,
        message: "당신은 로그인 하지 않았습니다."
      });
    }
  } catch (error) {
    console.error(error);
   next(error);
  }
});
/**
 * @swagger
 *
 * /user:
 *  get:
 *    summary: "유저 정보조회"
 *    description: "GET 방식으로 현재 로그인한 유저의 정보를 조회한다."
 *    tags: [Users]
 *    responses:
 *      "200":
 *        description: "정보조회 성공시 응답"
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
 *                updatedAt:
 *                  type: string
 *                  default: "2022-09-28T11:46:32.000Z"
 *                Image:
 *                    type: object
 *                    properties:
 *                      id: 
 *                        type: integer
 *                        default: 1
 *                      src: 
 *                        type: string
 *                        default: "myprofileimg_1241414343.png"
 *                Posts: 
 *                    type: array
 *                    default: [{id: 2}, {id: 6}, {id: 7}]
 *                Followings:
 *                    type: array
 *                    default: [{id: 3}, {id: 5}, {id: 6}]
 *                Followers:
 *                    type: array
 *                    default: [{id: 4}, {id: 5}, {id: 6}]
 *                code:
 *                  type: integer
 *                  default: 200
 *                message:
 *                  type: string
 *                  default: "유저 정보 조회 성공"

 */
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    const user1 = await User.findOne({
      where: { id: req.user.id }
    })
    if (!user1) {
      return res.status(403).json({
        code: 403,
        message: '존재하지 않는 사용자 입니다.'
      });
    }
    if (user1.nickname === req.body.newNickname){
        return res.status(403).json({
            code: 403,
            message: '기존 닉네임과 달라야 합니다.'
          });     
    }
    const user2 = await User.findOne({
        where: { nickname: req.body.newNickname }
      })
      if (user2) {
        return res.status(403).json({
          code: 403,
          message: '이미 존재하는 닉네임 입니다.'
        });
      }
    await User.update({
        nickname: req.body.newNickname // 어떻게 수정? 
      }, {
        where: { id: req.user.id } // 누구 꺼?
    })
    res.status(200).json({  
        code: 200, 
        newNickname: req.body.newNickname,
        message: '닉네임 수정 성공'
    })
  } catch(error){
    console.error(error)
    next(error)
  }
})
/**
 * @swagger
 *
 * /user/nickname:
 *  patch:
 *    summary: "닉네임 수정"
 *    description: "PATCH 방식으로 닉네임을 수정한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 닉네임을 수정합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              newNickname:
 *                type: string
 *                description: "새로운 닉네임"
 *                required: true
 *    responses:
 *      "200":
 *        description: "닉네임 수정 성공 시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                newNickname:
 *                  type: string
 *                  default: 'newNickname'
 *                message:
 *                  type: string
 *                  default: '닉네임 수정 성공'
 */

 router.patch('/password', isLoggedIn, async (req, res, next) => {
    try {
      const user1 = await User.findOne({
        where: { id: req.user.id }
      })
      if (!user1) {
        return res.status(403).json({
          code: 403,
          message: '존재하지 않는 사용자 입니다.'
        });
      }
      const result = await bcrypt.compare(req.body.newPassword, user1.password);
      if (result) {
        return res.status(403).json({
            code: 403,
            message: '기존 비밀번호와 일치합니다.'
          });     
      }
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
      await User.update({
          password: hashedPassword // 어떻게 수정? 
        }, {
          where: { id: req.user.id } // 누구 꺼?
      })
      res.status(200).json({  
          code: 200, 
          message: '비밀번호 변경 성공'
      })
    } catch(error){
      console.error(error)
      next(error)
    }
  })
/**
 * @swagger
 *
 * /user/password:
 *  patch:
 *    summary: "비밀번호 변경"
 *    description: "PATCH 방식으로 비밀번호를 변경한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 비밀번호를 변경합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              newPassword:
 *                type: string
 *                description: "새로운 비밀번호"
 *                required: true
 *    responses:
 *      "200":
 *        description: "비밀번호 변경 성공 시 응답"
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
 *                  default: '비밀번호 변경 성공'
 */

router.post('/image', isLoggedIn, upload.single('image'), (req, res, next) => {
  if(!req.file){
    return res.json({
      code: 400,
      message: '사진을 전송하셔야 합니다.'
    })  
  }
  res.json({
    code: 200,
    src: req.file.filename,
    message: '사진 전송 성공'
  })
})
/**
 * @swagger
 *
 * /user/image:
 *  post:
 *    summary: "유저 프로필 이미지 변경"
 *    description: "POST 방식으로 유저 프로필 이미지를 받은후 프론트엔드로 src 를 넘겨준다"
 *    tags: [Users]
 *    requestBody:
 *      description: 프로필 사진 미리보기에 사용되는 기능입니다.
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                required: true
 *                format: binary
 *        
 *    responses:
 *      "200":
 *        description: "사진 전송 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                src:
 *                  type: string
 *                  default: 'myNewProfileImg_151847asd12891.png'
 *                message:
 *                  type: string
 *                  default: "사진 전송 성공"
 */
router.patch('/profile', isLoggedIn, async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{
        model: Image,
        attributes: ['src', 'id']
      }]
    })
    if (!user) {
      return res.status(403).json({
        code: 403,
        message: '존재하지 않는 사용자 입니다.'
      });
    }
    if(!req.body.image && !req.body.description){
      return res.status(200).json({
        code: 200,
        message: '변경사항 없음.'
      }); 
    }
    if (req.body.image) { // 이미지를 바꾸겠다 .
      if (req.body.image === 'empty'){
        if (user.Image) {
          await user.setImage(null)
          await Image.destroy({
            where: { id: user.Image.id }
          })
        }
      } else{
        if(user.Image){
          await Image.destroy({
            where: { id: user.Image.id }
          })
        } 
          const image = await Image.create({ src: req.body.image });  
          await user.setImage(image);
      }

    }

    if (req.body.description){
      let ntext = req.body.description
      if (req.body.description === 'empty'){
        ntext = null
      }
      await User.update({
        description: ntext // 어떻게 수정? 
      }, {
        where: { id: req.user.id } // 누구 꺼?
      })
    }

    res.status(201).json({
      code: 201,
      description: req.body.description ? req.body.description : '자기소개 변경사항 없음',
      src: req.body.image ? req.body.image : '이미지 변경사항 없음',
      message: '프로필 적용 성공'
    })
  } catch(error){
    console.error(error)
    next(error)
  }

})
 /**
 * @swagger
 *
 * /user/profile:
 *  patch:
 *    summary: "유저 프로필 정보 변경"
 *    description: "PATCH 방식으로 유저 프로필 정보를 변경한다"
 *    tags: [Users]
 *    requestBody:
 *      description: 유저의 프로필 정보변경을 확정합니다. 프로필사진을 비우거나, 자기소개를 비워놓고 싶을땐 'empty' 문자열을 전송해야 합니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string
 *                default: "새로운 자기소개지롱~"
 *              image:
 *                type: string
 *                default: 'myNewProfileImg_151847asd12891.png'
 *        
 *    responses:
 *      "201":
 *        description: "프로필 변경 성공 시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 201
 *                description:
 *                  type: string
 *                  default: "새로운 자기소개지롱~"
 *                src:
 *                  type: string
 *                  default: 'myfavoriteImg_151847asd12891.png'
 *                message:
 *                  type: string
 *                  default: '프로필 적용 성공'
 */

module.exports = router