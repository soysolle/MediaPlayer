export default {
	testEnvironment: 'node', // 기본 테스트 환경
	transform: {
		'^.+\\.js$': 'babel-jest', // Babel로 ES6 변환
	},
	moduleFileExtensions: ['js', 'json'], // 사용할 파일 확장자
};
