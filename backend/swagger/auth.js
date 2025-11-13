/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 회원가입 API
 *     description: 새 사용자를 등록합니다.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 사용자의 이메일
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 사용자 비밀번호
 *                 example: "securepassword123"
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임
 *                 example: "nickname123"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공"
 *       409:
 *         description: 이미 존재하는 이메일
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미 존재하는 이메일입니다."
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인 API
 *     description: 이메일과 비밀번호로 사용자 인증 후 토큰을 반환합니다.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 사용자의 이메일
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 사용자 비밀번호
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nickname:
 *                   type: string
 *                   example: "nickname123"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: 잘못된 비밀번호
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "잘못된 비밀번호입니다."
 *       404:
 *         description: 존재하지 않는 이메일
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "존재하지 않는 이메일입니다."
 *       500:
 *         description: 서버 오류
 */