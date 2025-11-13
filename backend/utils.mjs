import jwt from 'jsonwebtoken';

// Access Token 검증 미들웨어
export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access Token이 제공되지 않았습니다." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.locals.id = decoded.id; // 사용자 ID를 저장
        next(); // 다음 미들웨어로 이동
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "유효하지 않은 Access Token입니다." });
    }
};

// Refresh Token 검증 미들웨어
export const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies['refreshToken']; // 쿠키에서 Refresh Token 가져오기

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token이 제공되지 않았습니다." });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        res.locals.id = decoded.id; // 사용자 ID를 저장
        next(); // 다음 미들웨어로 이동
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "유효하지 않은 Refresh Token입니다." });
    }
};
