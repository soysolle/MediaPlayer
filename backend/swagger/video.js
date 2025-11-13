/**
 * @swagger
 * /videos:
 *   get:
 *     summary: 비디오 리스트 조회
 *     description: 모든 비디오를 페이지네이션과 함께 조회합니다. 제목 및 카테고리로 필터링할 수 있습니다.
 *     tags:
 *       - video
 *     parameters:
 *       - name: title
 *         in: query
 *         description: "비디오 제목 (부분 검색 가능)"
 *         required: false
 *         schema:
 *           type: string
 *           example: "라퓨타"
 *       - name: category
 *         in: query
 *         description: 카테고리 이름
 *         required: false
 *         schema:
 *           type: string
 *           example: "애니메이션"
 *       - name: page
 *         in: query
 *         description: "페이지 번호 (기본값: 1)"
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   video_id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "라퓨타"
 *                   url:
 *                     type: string
 *                     example: "https://media.w3.org/2010/05/sintel/trailer.mp4"
 *                   category_name:
 *                     type: string
 *                     example: "애니메이션"
 *                   duration:
 *                     type: string
 *                     example: "01:30:00"
 *                   views:
 *                     type: integer
 *                     example: 1200
 *                   thumb:
 *                     type: string
 *                     example: "https://example.com/thumb.jpg"
 *                   likes:
 *                     type: integer
 *                     example: 500
 *       400:
 *         description: 요청 값이 유효하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameters"
 */

/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: 비디오 상세 조회
 *     description: 특정 비디오의 상세 정보를 가져옵니다.
 *     tags:
 *       - video
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 비디오 ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 video_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "라퓨타"
 *                 subtitle:
 *                   type: string
 *                   example: "천공의 섬"
 *                 description:
 *                   type: string
 *                   example: "비디오 설명"
 *                 url:
 *                   type: string
 *                   example: "https://media.w3.org/2010/05/sintel/trailer.mp4"
 *                 duration:
 *                   type: string
 *                   example: "00:00:52"
 *                 views:
 *                   type: integer
 *                   example: 100
 *                 thumb:
 *                   type: string
 *                   example: "https://www.viewhotels.jp/asakusa-annex/wp-content/uploads/sites/6/2020/03/test-img.jpg"
 *                 likes:
 *                   type: integer
 *                   example: 50
 *                 category_name:
 *                   type: string
 *                   example: "애니메이션"
 */

/**
 * @swagger
 * /videos/{id}/like:
 *   post:
 *     summary: 비디오 좋아요 / 좋아요 취소
 *     description: 비디오에 좋아요를 추가하거나 취소합니다.
 *     tags:
 *       - video
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 비디오 ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               liked:
 *                 summary: 좋아요 성공
 *                 value:
 *                   message: "Liked"
 *               unliked:
 *                 summary: 좋아요 취소 성공
 *                 value:
 *                   message: "Unliked"
 */

/**
 * @swagger
 * /videos/liked:
 *   get:
 *     summary: 좋아요한 비디오 조회
 *     description: 사용자가 좋아요를 누른 비디오 목록을 반환합니다.
 *     tags:
 *       - video
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   video_id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "라퓨타"
 *                   url:
 *                     type: string
 *                     example: "https://media.w3.org/2010/05/sintel/trailer.mp4"
 *                   category_name:
 *                     type: string
 *                     example: "애니메이션"
 *                   duration:
 *                     type: string
 *                     example: "01:30:00"
 *                   views:
 *                     type: integer
 *                     example: 1200
 *                   thumb:
 *                     type: string
 *                     example: "https://example.com/thumb.jpg"
 *                   likes:
 *                     type: integer
 *                     example: 500
 */

/**
 * @swagger
 * /videos/{videoId}/comments:
 *   post:
 *     summary: 댓글 추가
 *     description: 비디오에 댓글을 추가합니다.
 *     tags:
 *       - video
 *     parameters:
 *       - name: videoId
 *         in: path
 *         description: 비디오 ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "이 비디오 정말 재미있어요!"
 *     responses:
 *       201:
 *         description: 댓글 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment_id:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "이 비디오 정말 재미있어요!"
 */

/**
 * @swagger
 * /videos/{videoId}/comments:
 *   get:
 *     summary: 댓글 조회
 *     description: 비디오의 댓글을 조회합니다.
 *     tags:
 *       - video
 *     parameters:
 *       - name: videoId
 *         in: path
 *         description: 비디오 ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   likes:
 *                     type: integer
 *                     example: 10
 *                   content:
 *                     type: string
 *                     example: "이 비디오 정말 재미있어요!"
 *                   nickname:
 *                     type: string
 *                     example: "user123"
 *                   last_updated:
 *                     type: string
 *                     example: "2024-12-09T09:51:29.000Z"
 */

/**
 * @swagger
 * /videos/{videoId}/comments/{commentId}/like:
 *   post:
 *     summary: 댓글 좋아요 / 좋아요 취소
 *     description: 댓글에 좋아요를 추가하거나 취소합니다.
 *     tags:
 *       - video
 *     parameters:
 *       - name: videoId
 *         in: path
 *         description: 비디오 ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: commentId
 *         in: path
 *         description: 댓글 ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Liked"
 */
