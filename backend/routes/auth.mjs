import express from 'express';
import { signup, login } from '../controllers/authController.mjs';
import { verifyAccessToken, verifyRefreshToken } from '../utils.mjs';

const router = express.Router();

// 회원가입
router.post('/signup', signup);

// 로그인
router.post('/login', login);

// 로그아웃
router.get('/logout', verifyAccessToken, (req, res) => {
    res.status(200).json({ message: "로그아웃 성공" });
});

// 회원 탈퇴
router.delete('/unlink', verifyAccessToken, async (req, res) => {
    try {
        await db.promise().query(`DELETE FROM user WHERE id = ?`, [req.query.id]);
        res.status(200).json({ message: "회원탈퇴 성공" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 리프레시 토큰 갱신
router.get('/refreshToken', verifyRefreshToken, async (req, res) => {
    try {
        const [user] = await db.promise().query(
            `SELECT id, nickname FROM user WHERE id = ?`,
            [res.locals.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: "존재하지 않는 회원입니다." });
        }

        const accessToken = jwt.sign(
            { id: user[0].id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { id: user[0].id },
            process.env.JWT_SECRET_KEY,
            { algorithm: 'HS256', expiresIn: '30d' }
        );

        return res.status(200).json({
            id: user[0].id,
            nickname: user[0].nickname,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 사용자 정보 조회
router.get('/me', verifyAccessToken, async (req, res) => {
    try {
        const [user] = await db.promise().query(
            `SELECT id, nickname FROM user WHERE id = ?`,
            [res.locals.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: "존재하지 않는 회원입니다." });
        }

        return res.status(200).json({
            id: user[0].id,
            email: user[0].email,
            nickname: user[0].nickname,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "서버 오류" });
    }
});

export default router;