
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
