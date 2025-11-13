import swaggerJsdoc from 'swagger-jsdoc';

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: 사용자 인증 관련 API
 *   - name: video
 *     description: 비디오 관련 API
 *   - name: history
 *     description: 시청 기록 관련 API
 */


const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // OpenAPI 버전
        info: {
            title: 'My API', // API 제목
            version: '1.0.0', // API 버전
            description: 'API documentation using Swagger', // API 설명
        },
        servers: [
            {
                url: 'http://localhost:4000', // 서버 URL
            },
        ],
    },
    apis: ['./routes/*.js'], // API 정의 파일 경로
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
