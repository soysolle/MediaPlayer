import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

	if (!token) {
		return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
	}

	try {
		// JWT 검증
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		console.log(decoded);
		req.user = {
			// req.user에 사용자 정보 설정
			user_id: decoded.user_id,
			email: decoded.email,
			nickname: decoded.nickname,
		};
		next();
	} catch (err) {
		console.error('JWT 인증 실패:', err);
		return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
	}
};

export default authenticate;
