import request from 'supertest';
import app from '../app'; // Express 앱 경로
import db from '../config/db.js'; // 데이터베이스 설정

describe('User API', () => {
	// 트랜잭션 시작
	beforeAll(async () => {
		await db.query('BEGIN'); // 트랜잭션 시작
	});

	// 트랜잭션 롤백
	afterAll(async () => {
		await db.query('ROLLBACK'); // 트랜잭션 롤백
	});

	/**
	 * 회원가입 테스트
	 */
	describe('POST /auth/signup/', () => {
		it('should create a new user', async () => {
			const newUser = {
				email: `test${Math.floor(Math.random() * 10000)}@example.com`,
				password: 'password123',
				nickname: 'testuser',
			};

			const response = await request(app)
				.post('/auth/signup/')
				.send(newUser)
				.expect(201);

			expect(response.body).toHaveProperty('message', '회원가입 성공');
		});

		it('should return 409 for duplicated email', async () => {
			const duplicatedUser = {
				email: `a1@gmail.com`, // 이미 존재하는 이메일
				password: 'dkssud!!',
				nickname: 'nick',
			};

			const response = await request(app)
				.post('/auth/signup/')
				.send(duplicatedUser)
				.expect(409);

			expect(response.body).toHaveProperty(
				'message',
				'이미 존재하는 이메일입니다.',
			);
		});

		it('should return 400 for invalid email', async () => {
			const invalidUser = {
				email: `test`, // 잘못된 이메일 형식
				password: 'dkssud!!',
				nickname: 'nick',
			};

			const response = await request(app)
				.post('/auth/signup/')
				.send(invalidUser)
				.expect(400);

			expect(response.body).toHaveProperty(
				'message',
				'잘못된 이메일 형식입니다.',
			);
		});
		it('should return 400 for invalid email', async () => {
			const invalidUser = {
				email: `example2@example.com`,
				password: '!!',
				nickname: 'nick',
			};

			const response = await request(app)
				.post('/auth/signup/')
				.send(invalidUser)
				.expect(400);

			expect(response.body).toHaveProperty(
				'message',
				'비밀번호는 8자 이상이어야 합니다.',
			);
		});
	});

	/**
	 * 로그인 테스트
	 */
	describe('POST /auth/login/', () => {
		it('should log in an existing user', async () => {
			const userCredentials = {
				email: 'a1@gmail.com', // 미리 데이터베이스에 추가된 유저
				password: 'dkssud!!', // 올바른 패스워드
			};

			const response = await request(app)
				.post('/auth/login/')
				.send(userCredentials)
				.expect(200);

			expect(response.body).toHaveProperty('accessToken'); // JWT 토큰 확인
		});

		it('should return 404 for invalid credentials', async () => {
			const invalidCredentials = {
				email: 'a11@example.com', // 존재하지 않는 이메일
				password: 'password1',
			};

			const response = await request(app)
				.post('/auth/login/')
				.send(invalidCredentials)
				.expect(404);

			expect(response.body).toHaveProperty(
				'message',
				'존재하지 않는 이메일입니다.',
			);
		});

		it('should return 400 for invalid password', async () => {
			const invalidCredentials = {
				email: 'a1@gmail.com',
				password: 'wrongpassword',
			};

			const response = await request(app)
				.post('/auth/login/')
				.send(invalidCredentials)
				.expect(400);

			expect(response.body).toHaveProperty('message', '잘못된 비밀번호입니다.');
		});
	});
});
