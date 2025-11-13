import db from '../config/db.js';

export const getHistory = async (req, res, next) => {
	try {
		const userId = req.user.user_id;
		const { video_id } = req.query;

		// 입력값 검증
		if (!video_id) {
			return res.status(400).json({ error: 'video_id is required' });
		}

		// SQL 쿼리 실행 (Prepared Statements)
		const [histories] = await db.query(
			`
            SELECT *
            FROM History
            WHERE user_id = ? AND video_id = ?
            ORDER BY last_updated DESC
            LIMIT 1
            `,
			[userId, video_id],
		);

		// 결과가 없는 경우
		if (histories.length === 0) {
			return res.status(404).json({ error: 'History not found' });
		}

		// 성공 응답
		return res.status(200).json(histories[0]); // 첫 번째 결과 반환
	} catch (err) {
		next(err); // 에러 핸들러로 전달
	}
};

export const updateHistory = async (req, res, next) => {
	try {
		console.log(req.user);
		const user_id = req.user.user_id;
		const { video_id, playback_pos } = req.body;

		// 입력값 검증
		if (!video_id) {
			return res.status(400).json({
				error: 'video_id는 필수입니다.',
			});
		}

		// 기존 시청 기록 조회
		const [existingHistory] = await db.query(
			`
            SELECT * FROM history
            WHERE user_id = ? AND video_id = ?
            LIMIT 1
            `,
			[user_id, video_id],
		);

		if (existingHistory.length === 0) {
			// 기존 기록이 없으면 새 기록 삽입
			await db.query(
				`
                INSERT INTO history (user_id, video_id, playback_pos)
                VALUES (?, ?, ?)
                `,
				[user_id, video_id, playback_pos ?? 0], // playback_pos가 없으면 기본값 0
			);
		} else {
			// 기존 기록이 있으면 업데이트
			await db.query(
				`
                UPDATE history
                SET playback_pos = ?
                WHERE user_id = ? AND video_id = ?
                `,
				[playback_pos, user_id, video_id],
			);
		}
		return res.status(200).json({ message: '시청 기록이 저장되었습니다.' });
	} catch (err) {
		next(err);
	}
};
