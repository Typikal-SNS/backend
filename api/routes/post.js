
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
 *                                  {id: 7, content: "응원합니다", createdAt: "2022-09-26T08:21:58.000Z", updatedAt: "2022-10-02T15:33:28.000Z", UserId: 8, PostId: 1, RecommentId: null, User: {id: 8, nickname: "이층사는아저씨"} },
 *                                   {id: 9, content: "저는 응원 안하는데요?", createdAt: "2022-09-27T08:19:58.000Z", updatedAt: "2022-10-02T15:33:28.000Z", UserId: 11, PostId: 1, RecommentId: 7, User: {id: 11, nickname: "딴지걸기천재"} } ]
 *                    Likers:
 *                        type: array
 *              
 *                        default: [{id: 8}, {id: 15}, {id: 22}]
 *                
 */ 



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

/**
 * @swagger
 *
 * /post/{postId}/recomment:
 *  post:
 *    summary: "대댓글달기"
 *    description: "POST 방식으로 대댓글을 등록함"
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
 *      description: 대댓글달기 API입니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              commentId: 
 *                type: integer
 *                default: 5
 *              content:
 *                 type: string
 *                 default: "5번 댓글에  달리는 대댓글이지롱~"
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
 *                      default: 9
 *                    content:
 *                      type: string
 *                      default: "5번 댓글에  달리는 대댓글이지롱~"
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
 *                      default: 5
 *                    User:
 *                        type: object
 *                        properties:
 *                          id: 
 *                            type: integer
 *                            default: 4
 *                          nickname: 
 *                            type: string
 *                            default: '대댓글작성자4의닉네임'
 *                message:
 *                  type: string
 *                  default: "대댓글 달기 성공"
 */


/**
 * @swagger
 *
 * /post/{postId}/like:
 *  patch:
 *    summary: "게시글 좋아요 기능"
 *    description: "PATCH 방식으로 게시글 좋아요를 등록함"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: postId
 *        default: 1
 *        schema:
 *          type: number
 *        
 *    responses:
 *      "200":
 *        description: "게시글 좋아요 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                PostId:
 *                  type: integer
 *                  default: 1
 *                UserId:
 *                  type: integer
 *                  default: 3
 *                message:
 *                  type: string
 *                  default: "게시글 좋아요 성공"
 */

/**
 * @swagger
 *
 * /post/{postId}/like:
 *  delete:
 *    summary: "게시글 좋아요 취소 기능"
 *    description: "DELETE 방식으로 게시글 좋아요를 취소함"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: postId
 *        default: 1
 *        schema:
 *          type: number
 *        
 *    responses:
 *      "200":
 *        description: "게시글 좋아요 취소 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                PostId:
 *                  type: integer
 *                  default: 1
 *                UserId:
 *                  type: integer
 *                  default: 3
 *                message:
 *                  type: string
 *                  default: "게시글 좋아요 취소 성공"
 */


/**
 * @swagger
 *
 * /post/{postId}:
 *  patch:
 *    summary: "게시글 수정 기능"
 *    description: "PATCH 방식으로 게시글을 수정함"
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
 *      description: 게시글 수정 API입니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content: 
 *                type: string
 *                default: "새로운 게시글 이지롱 #빠끄 #열코"
 *        
 *    responses:
 *      "200":
 *        description: "게시글 수정 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                PostId:
 *                  type: integer
 *                  default: 1
 *                content:
 *                  type: integer
 *                  default:  "새로운 게시글 이지롱 #빠끄 #열코"
 *                message:
 *                  type: string
 *                  default: "게시글 수정 성공"
 */

/**
 * @swagger
 *
 * /post/{postId}:
 *  delete:
 *    summary: "게시글 삭제 기능"
 *    description: "DELETE 방식으로 게시글을 삭제함"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: postId
 *        default: 1
 *        schema:
 *          type: number
 *        
 *    responses:
 *      "200":
 *        description: "게시글 삭제 성공시 응답"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  default: 200
 *                PostId:
 *                  type: integer
 *                  default: 1
 *                message:
 *                  type: string
 *                  default: "게시글 삭제 성공"
 */
