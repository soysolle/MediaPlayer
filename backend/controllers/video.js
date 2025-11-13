import db from '../config/db.js';

// 동영상 리스트 API
export const getVideos = async (req, res, next) => {
	const { title, category, order_by = 'views', direction = 'desc' } = req.query;

	// 유효한 정렬 기준 확인
	const validOrderByFields = ['views', 'likes'];
	if (!validOrderByFields.includes(order_by)) {
		return res.status(400).json({ error: 'Invalid order_by field' });
	}

	// 유효한 정렬 방향 확인
	const validDirections = ['asc', 'desc'];
	if (!validDirections.includes(direction)) {
		return res.status(400).json({ error: 'Invalid direction value' });
	}

	let query = `SELECT v.video_id, v.title, v.url, v.category_name, v.duration, v.views, v.thumb, v.likes 
		FROM video AS v
		WHERE 1=1`;
	const params = [];

	// 제목 검색 조건 추가
	if (title) {
		query += ' AND title LIKE ?';
		params.push(`%${title}%`);
	}

	// 카테고리 조건 추가
	if (category) {
		query += ' AND category_name = ?';
		params.push(category);
	}

	// 동적으로 정렬 기준 및 방향 추가
	query += ` ORDER BY ${order_by} ${direction}`;

	try {
		// 데이터베이스 쿼리 실행
		const [videos] = await db.query(query, params);
		res.status(200).json(videos);
	} catch (err) {
		// 에러 처리
		next(err);
	}
};

// 동영상 상세 API
export const getVideoById = async (req, res, next) => {
	const { id } = req.params;
	console.log('Requested video ID:', id);
	try {
		// 조회수 증가
		await db.query('UPDATE video SET views = views + 1 WHERE video_id = ?', [
			id,
		]);

		// 비디오 정보 가져오기
		const [video] = await db.query(
			`
            SELECT *
            FROM video
            WHERE video_id = ?`,
			[id],
		);

		// 비디오가 없을 경우
		if (video.length === 0) {
			return res.status(404).json({ error: 'Video not found' });
		}

		// 비디오 정보 반환
		return res.status(200).json(video[0]);
	} catch (err) {
		next(err);
	}
};

export const handleLikeVideo = async (req, res, next) => {
	const videoId = req.params.id;
	const userId = req.user.user_id;

	let connection; // 트랜잭션을 위한 connection 객체 선언

	try {
		// MySQL 연결 생성
		connection = await db.getConnection();

		// 트랜잭션 시작
		await connection.beginTransaction();

		// 사용자가 이미 좋아요를 눌렀는지 확인
		const [existingLike] = await connection.query(
			'SELECT * FROM video_like WHERE user_id = ? AND video_id = ?',
			[userId, videoId],
		);

		if (existingLike.length > 0) {
			// 좋아요가 이미 존재하면 취소 (Unlike)
			await connection.query(
				'DELETE FROM video_like WHERE user_id = ? AND video_id = ?',
				[userId, videoId],
			);

			// 총 좋아요 수 감소
			await connection.query(
				'UPDATE video SET likes = likes - 1 WHERE video_id = ?',
				[videoId],
			);

			await connection.commit();
			return res.status(200).json({ message: 'Unliked' });
		} else {
			// 좋아요 추가 (Like)
			await connection.query(
				'INSERT INTO video_like (user_id, video_id) VALUES (?, ?)',
				[userId, videoId],
			);

			// 총 좋아요 수 증가
			await connection.query(
				'UPDATE video SET likes = likes + 1 WHERE video_id = ?',
				[videoId],
			);

			await connection.commit();
			return res.status(200).json({ message: 'Liked' });
		}
	} catch (err) {
		if (connection) await connection.rollback(); // 트랜잭션 롤백
		next(err); // 에러 미들웨어로 전달
	} finally {
		if (connection) connection.release(); // 연결 반환
	}
};

// user 모듈과 합친 후 테스트 필요
export const getLikedVideos = async (req, res, next) => {
	const userId = req.user.user_id;

	try {
		const [likedVideos] = await db.query(
			`
            SELECT v.video_id, v.title, v.url, v.category_name, v.duration, v.views, v.thumb, v.likes 
            FROM video_like l
            JOIN video v ON l.video_id = v.video_id
            WHERE l.user_id = ?
            ORDER BY l.created_at DESC;
        `,
			[userId],
		);

		if (likedVideos.length === 0) {
			return res.status(404).json({ message: 'No liked videos found.' });
		}

		res.status(200).json(likedVideos);
	} catch (err) {
		next(err);
	}
};

export const addComment = async (req, res, next) => {
	const userId = req.user.user_id; // 인증된 사용자 ID
	const videoId = req.params.videoId; // 요청 URL에서 비디오 ID
	const content = req.body.content; // 요청 본문에서 댓글 내용

	const insertQuery = `INSERT INTO comment (video_id, user_id, content) VALUES (?, ?, ?)`;
	const selectQuery = `SELECT c.*
                         FROM comment c
                         JOIN user u ON c.user_id = u.user_id
                         WHERE c.comment_id = ?`;

	try {
		// 데이터베이스에 댓글 삽입
		const [insertResult] = await db.query(insertQuery, [
			videoId,
			userId,
			content,
		]);

		const commentId = insertResult.insertId;
		const [comments] = await db.query(selectQuery, [commentId]);
		if (comments.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}
		res.status(201).json(comments[0]);
	} catch (err) {
		next(err);
	}
};

export const getComments = async (req, res, next) => {
	const videoId = req.params.videoId;
	const query = `
        SELECT c.comment_id, c.user_id, c.likes, c.content, u.nickname, c.last_updated
        FROM comment c
        JOIN user u ON c.user_id = u.user_id
        WHERE c.video_id = ?
        ORDER BY last_updated ASC
    `;

	try {
		const [comments] = await db.query(query, [videoId]);
		res.status(200).json(comments);
	} catch (err) {
		next(err);
	}
};

export const handleLikeComment = async (req, res, next) => {
	const commentId = req.params.commentId;
	const userId = req.user.user_id;

	let connection; // 트랜잭션을 위한 connection 객체 선언

	try {
		// MySQL 연결 생성
		connection = await db.getConnection();

		// 트랜잭션 시작
		await connection.beginTransaction();

		// 사용자가 이미 좋아요를 눌렀는지 확인
		const [existingLike] = await connection.query(
			'SELECT * FROM comment_like WHERE user_id = ? AND comment_id = ?',
			[userId, commentId],
		);

		if (existingLike.length > 0) {
			// 좋아요가 이미 존재하면 취소 (Unlike)
			await connection.query(
				'DELETE FROM comment_like WHERE user_id = ? AND comment_id = ?',
				[userId, commentId],
			);

			// 총 좋아요 수 감소
			await connection.query(
				'UPDATE comment SET likes = likes - 1 WHERE comment_id = ?',
				[commentId],
			);

			await connection.commit();
			return res.status(200).json({ message: 'Unliked' });
		} else {
			// 좋아요 추가 (Like)
			await connection.query(
				'INSERT INTO comment_like (user_id, comment_id) VALUES (?, ?)',
				[userId, commentId],
			);

			// 총 좋아요 수 증가
			await connection.query(
				'UPDATE comment SET likes = likes + 1 WHERE comment_id = ?',
				[commentId],
			);

			await connection.commit();
			return res.status(200).json({ message: 'Liked' });
		}
	} catch (err) {
		if (connection) await connection.rollback(); // 트랜잭션 롤백
		next(err); // 에러 미들웨어로 전달
	} finally {
		if (connection) connection.release(); // 연결 반환
	}
};
