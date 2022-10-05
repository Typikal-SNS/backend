const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn, upload } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}


router.post('/', isLoggedIn , async (req, res, next) => { // POST /post
  try {
    if (!req.body.content){
      res.status(400).json({
        code: 400,
        message: '게시글 내용작성은 필수 입니다.'
      });
    }
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리면 image: [혁진.png, 지미.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } 
      else{
        return res.status(400).json({
            code: 400,
            message: '이미지는 배열 형태로 보내야 합니다.'
        });
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
        attributes: ['src', 'PostId'],
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(201).json({
      code: 201,
      fullPost,
      message: '게시글 업로드 성공'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/**
 * @swagger
 *
 * /post:
 *  post:
 *    summary: "게시글 생성"
 *    description: "POST 방식으로  게시글을 생성한다."
 *    tags: [Posts]
 *    requestBody:
 *      description: 게시글을 생성합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                default: "나는 코딩을 열심히해서 세계를 정복할거야! #코딩전사 #노드js"
 *                required: true
 *              image:
 *                type: array
 *                items:
 *                  type: string
 *                
 *                default: ["image1_1242113442.png", "img2_12415283952943.png"]
 *    responses:
 *      "200":
 *        description: "게시글 등록 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 201
 *                message:
 *                  type: string
 *                  default: "게시글 업로드 성공"
 *                fullPost:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      default: 1
 *                    content:
 *                      type: string
 *                      default: "나는 코딩을 열심히해서 세계를 정복할거야! #코딩전사 #노드js"
 *                    createdAt:
 *                      type: string
 *                      default: "2022-09-26T08:21:58.000Z"
 *                    updatedAt:
 *                      type: string
 *                      default: "2022-09-27T10:33:28.000Z"
 *                    UserId:
 *                      type: integer
 *                      default: 4
 *                    Images:
 *                        type: array
 *                        default: [{
 *                         src: "Image1_14141123123.png",
 *                         PostId: 1
 *                        },{
 *                         src: "image2_9414123123.png",
 *                         PostId: 1
 *                        }]
 *                    Comments:
 *                        type: array
 *                        default: []
 *                    User:
 *                        type: object
 *                        properties:
 *                          id: 
 *                            type: integer
 *                            default: 4
 *                          nickname: 
 *                            type: string
 *                            default: '게시글작성자4의닉네임'
 *                    Likers:
 *                        type: array
 *                        default: []
 *                
 */ 


router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  if(req.files.length === 0){
    return res.json({
      code: 400,
      message: '사진을 전송하셔야 합니다.'
    })  
  }
  res.json({
    code: 200,
    src: req.files.map((v) => v.filename),
    message: '사진 전송 성공'
  })
});
/**
 * @swagger
 *
 * /post/images:
 *  post:
 *    summary: "게시글에 사진 등록시 미리보기를 위한 기능 "
 *    description: "POST 방식으로 게시글 이미지를 받은후 프론트엔드로 src 를 넘겨준다"
 *    tags: [Posts]
 *    requestBody:
 *      description: 게시글 사진 미리보기에 사용되는 기능입니다.
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 *                  type: array
 *                  default: ['myNewProfileImg_151847asd12891.png', 'img2_4131233.png']
 *                message:
 *                  type: string
 *                  default: "사진 전송 성공"
 */
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
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
          order: [['createdAt', 'DESC']],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    res.status(200).json({
      code: 200,
      message: '게시글 조회 성공',
      post,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/**
 * @swagger
 *
 * /post/{postId}:
 *  get:
 *    summary: "게시글 조회"
 *    description: "GET 방식으로  게시글을 조회한다."
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: postId
 *        default: 1
 *        schema:
 *          type: number
 *    responses:
 *      "200":
 *        description: "게시글 조회 성공시 응답"
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
 *                  default: "게시글 조회 성공"
 *                post:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      default: 1
 *                    content:
 *                      type: string
 *                      default: "나는 코딩을 열심히해서 세계를 정복할거야! #코딩전사 #노드js"
 *                    createdAt:
 *                      type: string
 *                      default: "2022-09-26T08:21:58.000Z"
 *                    updatedAt:
 *                      type: string
 *                      default: "2022-09-27T10:33:28.000Z"
 *                    UserId:
 *                      type: integer
 *                      default: 4
 *                    User:
 *                        type: object
 *                        properties:
 *                          id: 
 *                            type: integer
 *                            default: 4
 *                          nickname: 
 *                            type: string
 *                            default: '게시글작성자4의닉네임'
 *                    Images:
 *                        type: array
 *                        default: [{
 *                         src: "Image1_14141123123.png",
 *                         PostId: 1
 *                        },{
 *                         src: "image2_9414123123.png",
 *                         PostId: 1
 *                        }]
 *                    Comments:
 *                        type: array
 *                        default: [{id: 4, content: "세계정복은 무슨 ㅋㅋ", createdAt: "2022-09-26T08:21:58.000Z", updatedAt: "2022-10-02T15:33:28.000Z", UserId: 6, PostId: 1, RecommentId: null, User: {id: 6, nickname: "코코몽"} }, 
 *                                  {id: 7, content: "응원합니다", createdAt: "2022-09-26T08:21:58.000Z", updatedAt: "2022-10-02T15:33:28.000Z", UserId: 8, PostId: 1, RecommentId: 2, User: {id: 8, nickname: "이층사는아저씨"} } ]
 *                    Likers:
 *                        type: array
 *              
 *                        default: [{id: 8}, {id: 15}, {id: 22}]
 *                
 */ 


router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).json({
        code: 402,
        message: '존재하지 않는 게시글 입니다.'
      })
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json({
      code: 201,
      fullComment,
      message: '댓글달기 성공'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


/**
 * @swagger
 *
 * /post/{postId}/comment:
 *  post:
 *    summary: "게시글에 댓글달기"
 *    description: "POST 방식으로 게시글에 댓글을 등록함"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: postId
 *        default: 1
 *        schema:
 *          type: number
 *    requestBody:
 *      description: 게시글 댓글달기 API입니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                 type: string
 *                 default: "1번게시글에 달리는 댓글이지롱~"
 *        
 *    responses:
 *      "201":
 *        description: "댓글 달기 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 201
 *                fullComment:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      default: 2
 *                    content:
 *                      type: string
 *                      default: "1번게시글에 달리는 댓글이지롱~"
 *                    createdAt:
 *                      type: string
 *                      default: "2022-09-26T08:21:58.000Z"
 *                    updatedAt:
 *                      type: string
 *                      default: "2022-09-27T10:33:28.000Z"
 *                    UserId:
 *                      type: integer
 *                      default: 4
 *                    PostId:
 *                      type: integer
 *                      default: 1
 *                    RecommentId:
 *                      type: integet
 *                      default: null
 *                    User:
 *                        type: object
 *                        properties:
 *                          id: 
 *                            type: integer
 *                            default: 4
 *                          nickname: 
 *                            type: string
 *                            default: '댓글작성자4의닉네임'
 *                message:
 *                  type: string
 *                  default: "댓글 달기 성공"
 */
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).json({
        code: 403,
        message: '존재하지 않는 게시글 입니다.'
      });
    }
    await post.addLikers(req.user.id);
    res.json({
      code:200,
      PostId: post.id,
      UserId: req.user.id,
      message: '게시글 좋아요 성공'
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).json({
        code: 403,
        message: '존재하지 않는 게시글 입니다.'
      });
    }
    await post.removeLikers(req.user.id);
    res.json({
      code: 200,
      PostId: post.id,
      UserId: req.user.id,
      message: '게시글 좋아요 취소 성공'
    })

  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      await post.setHashtags(result.map((v) => v[0]));
    }
    res.status(200).json({
      code: 200,
      PostId: parseInt(req.params.postId, 10),
      content: req.body.content,
      message: '게시글 수정 성공'
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.json({
      code: 200,
      PostId: parseInt(req.params.postId, 10),
      messaage: '게시글 삭제 성공'
    })

  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
