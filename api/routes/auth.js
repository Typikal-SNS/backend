
/**
 * @swagger
 *
 * /auth/emailCheck:
 *  post:
 *    summary: "이메일 인증"
 *    description: "POST 방식으로 이메일을 인증한다."
 *    tags: [Users]
 *    requestBody:
 *      description: 이메일로 인증번호를 발송합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mail:
 *                type: string
 *                description: "사용 할 이메일"
 *                required: true
 *    responses:
 *      "200":
 *        description: "메일 발송 성공시 응답"
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
 *                  default: '이메일 전송 성공'
 */
 
/**
 * @swagger
 *
 * /auth/authNumCheck:
 *  post:
 *    summary: "인증번호"
 *    description: "POST 방식으로 인증번호를 확인한다.."
 *    tags: [Users]
 *    requestBody:
 *      description: 인증번호가 맞는지 확인합니다. 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              authNum:
 *                type: integer
 *                description: "인증번호"
 *                required: true
 *    responses:
 *      "200":
 *        description: "인증번호 인증 성공시 응답"
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
 *                  default: "이메일 인증 성공"
 */

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
 *                  default: "회원가입 성공"
 */

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
 *                  default: "로그인 성공"
 */

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
 *                  default: '로그아웃 성공'
 */
