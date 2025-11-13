import request from 'supertest';
import app from '../app'; // Express 앱 경로
import db from '../config/db.js'; // 데이터베이스 설정

describe('/videos API (with auth)', () => {
	let authToken;

	// 트랜잭션 시작
	beforeAll(async () => {
		await db.query('BEGIN'); // 트랜잭션 시작

		// 회원가입
		const signupResponse = await request(app).post('/auth/signup').send({
			email: `testuser@example.com`,
			password: 'password123',
			nickname: 'testuser',
		});

		expect(signupResponse.status).toBe(201);
		expect(signupResponse.body).toHaveProperty('message', '회원가입 성공');

		// 로그인
		const loginResponse = await request(app).post('/auth/login').send({
			email: 'testuser@example.com',
			password: 'password123',
		});

		expect(loginResponse.status).toBe(200);
		expect(loginResponse.body).toHaveProperty('accessToken');

		// 토큰 저장
		authToken = loginResponse.body.accessToken;

		// 테스트를 위한 동영상 데이터 추가
		await db.query(`
			INSERT INTO video (video_id, title, url, category_name, duration, views, thumb, likes)
			VALUES 
			(1, 'Test Video 1', 'http://test.com/1', '애니메이션', '00:10:00', 100, 'http://test.com/thumb1.jpg', 10),
			(2, 'Test Video 2', 'http://test.com/2', '예능', '00:12:00', 200, 'http://test.com/thumb2.jpg', 20);
		`);
		// 테스트를 위한 댓글 데이터 추가
		await db.query(`
			INSERT INTO comment (comment_id, video_id, user_id, likes, content, last_updated, marked_time)
			VALUES 
			(1, 1, 23, 0, 'Test Comment 1', '2024-12-12 00:31:08', '00:00:01')
		`);
	});

	// 트랜잭션 롤백
	afterAll(async () => {
		await db.query('ROLLBACK'); // 트랜잭션 롤백
	});

	describe('GET /videos', () => {
		it('should fetch a list of videos', async () => {
			const response = await request(app)
				.get('/videos')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toBeInstanceOf(Array);
			expect(response.body[0]).toHaveProperty('video_id');
			expect(response.body[0]).toHaveProperty('title');
		});

		it('should fetch videos filtered by title', async () => {
			const response = await request(app)
				.get('/videos?title=Test Video 1')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.length).toBe(1);
			expect(response.body[0].title).toBe('Test Video 1');
		});

		it('should fetch videos filtered by category', async () => {
			const response = await request(app)
				.get('/videos?category=애니메이션')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toBeInstanceOf(Array);
			expect(response.body[0].category_name).toBe('애니메이션');
		});
	});

	describe('GET /videos/:id', () => {
		it('should fetch video details and increment views', async () => {
			const response = await request(app)
				.get('/videos/1')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toHaveProperty('video_id', 1);
			expect(response.body).toHaveProperty('title');
			expect(response.body).toHaveProperty('subtitle');
			expect(response.body).toHaveProperty('description');
			expect(response.body).toHaveProperty('url');
			expect(response.body).toHaveProperty('duration');
			expect(response.body).toHaveProperty('thumb');
			expect(response.body).toHaveProperty('likes');
			expect(response.body).toHaveProperty('category_name');
		});

		it('should return 404 if video is not found', async () => {
			const response = await request(app)
				.get('/videos/999')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(404);

			expect(response.body).toHaveProperty('error', 'Video not found');
		});
	});

	describe('POST /videos/:id/like', () => {
		it('should like a video', async () => {
			const response = await request(app)
				.post('/videos/1/like')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toHaveProperty('message', 'Liked');
		});

		it('should unlike a video if already liked', async () => {
			const response = await request(app)
				.post('/videos/1/like')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toHaveProperty('message', 'Unliked');
		});
	});

	describe('POST /videos/:videoId/comments', () => {
		it('should add a comment to a video', async () => {
			const response = await request(app)
				.post('/videos/1/comments')
				.set('Authorization', `Bearer ${authToken}`)
				.send({
					content: 'Test Cmment 1',
					marked_time: '00:01:23',
				})
				.expect(201);
		});
	});

	describe('GET /videos/:videoId/comments', () => {
		it('should fetch comments for a video', async () => {
			const response = await request(app)
				.get('/videos/1/comments')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toBeInstanceOf(Array);
			expect(response.body[0]).toHaveProperty('content', 'Test Comment 1');
		});
	});

	describe('POST /videos/:id/comments/:id/like', () => {
		it('should like a comment', async () => {
			const response = await request(app)
				.post('/videos/1/comments/1/like')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toHaveProperty('message', 'Liked');
		});

		it('should unlike a comment if already liked', async () => {
			const response = await request(app)
				.post('/videos/1/comments/1/like')
				.set('Authorization', `Bearer ${authToken}`)
				.expect(200);

			expect(response.body).toHaveProperty('message', 'Unliked');
		});
	});
});
