const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.gt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'RecommentId', 'ASC'],
        [Comment, 'createdAt', 'ASC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
        attributes: ['src', 'PostId'],
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
        through: {attributes: []}
      }],
    });
    res.status(200).json({
        code: 200,
        message: '게시글 로드 성공',
        posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/**
 * @swagger
 *
 * /posts:
 *  get:
 *    summary: "게시글 로드"
 *    description: "GET  쿼리스트링 방식으로  10 개 씩게시글을 로드한다."
 *    tags: [Posts]
 *    parameters:
 *      - in: query
 *        name: lastId
 *        required: true
 *        description: lastId
 *        default: 11
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: "게시글 로드 성공시 응답"
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
 *                  default: "게시글 로드 성공"
 *                posts:
 *                  type: array
 *                  default: [{}, {}, {}]
 *                
 */ 
module.exports = router;
