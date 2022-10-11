
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

