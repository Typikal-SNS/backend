
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
 *                format: binary
 * 
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
   *        multipart/form-data:
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
  
