const express = require('express')
const { User } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

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
 *    summary: "닉네임 변경"
 *    description: "PATCH 방식으로 닉네임을 변경한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 닉네임을 변경합니다..
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
module.exports = router