/**
 * @swagger
 * /histories:
 *   get:
 *     summary: 시청 기록 조회
 *     description: 특정 사용자의 비디오 시청 기록을 조회합니다.
 *     tags:
 *       - history
 *     parameters:
 *       - name: video_id
 *         in: query
 *         description: 조회할 비디오의 ID
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
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 video_id:
 *                   type: integer
 *                   example: 1
 *                 playback_pos:
 *                   type: string
 *                   example: "00:12:34"
 *                 last_updated:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-09T12:00:00Z"
 *       400:
 *         description: 요청 값이 유효하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "video_id is required"
 *       404:
 *         description: 시청 기록이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "History not found"
 */

/**
 * @swagger
 * /histories:
 *   post:
 *     summary: 시청 기록 업데이트
 *     description: 사용자의 시청 기록을 삽입하거나 업데이트합니다.
 *     tags:
 *       - history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               video_id:
 *                 type: integer
 *                 description: 업데이트할 비디오의 ID
 *                 example: 1
 *               playback_pos:
 *                 type: string
 *                 description: 비디오 시청 위치 (시간)
 *                 example: "00:12:34"
 *     responses:
 *       200:
 *         description: 성공적으로 시청 기록이 저장되었음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "시청 기록이 저장되었습니다."
 *       400:
 *         description: 요청 값이 유효하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "video_id는 필수입니다."
 */
