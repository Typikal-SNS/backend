
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
