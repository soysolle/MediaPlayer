import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRouter from './routes/auth.mjs'; // authRouter 추가
import videoRouter from './routes/video.js';
import historyRouter from './routes/history.js';

config(); // process.env

// Swagger 설정
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'My API',
			version: '1.0.0',
			description: 'API documentation with Swagger',
		},
		servers: [
			{
				url: 'http://localhost:4000', // 서버 URL
			},
		],
	},
	apis: ['./swagger/*.js'], // Swagger 주석이 있는 파일 경로
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.set('port', process.env.PORT || 4000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*', // 개발 환경에서만 이렇게 설정
	}),
);

// 라우터 추가
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRouter); // authRouter 경로 추가
app.use('/videos', videoRouter);
app.use('/histories', historyRouter);

// 에러 처리
app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		error: process.env.NODE_ENV !== 'production' ? err : {},
	});
});

// 서버 실행
app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기중');
});

export default app;
