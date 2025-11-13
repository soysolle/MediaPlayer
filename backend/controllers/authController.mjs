import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const saltRounds = 10;
const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const signup = async (req, res, next) => {
	try {
		const { email, password, nickname } = req.body;

		// 이메일 형식 검증
		if (!validateEmail(email)) {
			return res.status(400).json({ message: '잘못된 이메일 형식입니다.' });
		}

		// 비밀번호 길이 검증
		if (!password || password.length < 8) {
			return res.status(400).json({ message: '비밀번호는 8자 이상이어야 합니다.' });
		}

		const salt = await bcrypt.genSalt(saltRounds);
		const encrypted = await bcrypt.hash(req.body.password, salt);

		await db.query(
			`INSERT INTO user (email, password, nickname) VALUES (?, ?, ?)`,
			[
				req.body.email,
				encrypted,
				req.body.nickname,
			],
		);

		res.status(201).json({ message: '회원가입 성공' });
	} catch (err) {
		if (err.errno === 1062) {
			return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
		}
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const [user] = await db.query(
			`SELECT user_id, password, nickname FROM user WHERE email = ?`,
			[req.body.email],
		);

		if (user.length === 0) {
			return res.status(404).json({ message: '존재하지 않는 이메일입니다.' });
		}

		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (!match) {
			return res.status(400).json({ message: '잘못된 비밀번호입니다.' });
		}

		const accessToken = jwt.sign(
			{
				user_id: user[0].user_id,
				email: user[0].email,
				nickname: user[0].nickname,
			},
			process.env.JWT_SECRET_KEY,
			{ algorithm: 'HS256', expiresIn: '1d' },
		);

		const refreshToken = jwt.sign(
			{
				user_id: user[0].user_id,
			},
			process.env.JWT_SECRET_KEY,
			{ algorithm: 'HS256', expiresIn: '30d' },
		);

		res.status(200).json({
			id: user[0].id,
			nickname: user[0].nickname,
			accessToken,
			refreshToken,
		});
	} catch (err) {
		next(err);
	}
};