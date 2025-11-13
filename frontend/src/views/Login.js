/* eslint-disable */
import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import axios from 'axios';
import {useState} from 'react';
import $L from '@enact/i18n/$L';
import './Login.css'; // CSS 파일 가져오기
import logo from '../assets/logo.png'; // 로고 이미지 가져오기

const Login = ({navigateToAccount}) => {
	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const handleLogin = async () => {
		try {
			const response = await axios.post('/api/auth/login', {
				email: state.email,
				password: state.password,
			});
			alert($L('Login successful!'));
			// 로그인 성공 처리 (예: 토큰 저장)
			localStorage.setItem('accessToken', response.data.accessToken);
			setState({
				email: '',
				password: '',
			});
		} catch (error) {
			console.error(error);
			alert($L('Login failed. Please check your credentials.'));
		}
	};

	return (
		<div className="login-container">
			<img src={logo} alt="Logo" className="logo" /> {/* 로고 추가 */}
			<div className="form-container">
				<InputField
					type="email"
					value={state.email}
					onChange={e => setState(prev => ({ ...prev, email: e.value }))}
					placeholder="이메일"
					className="input-field"
				/>
				<InputField
					type="password"
					value={state.password}
					onChange={e => setState(prev => ({ ...prev, password: e.value }))}
					placeholder="비밀번호"
					className="input-field"
				/>
				<div className="button-container">
					<Button onClick={handleLogin} type="submit" className="login-button">
						{$L('로그인 하기')}
					</Button>
					<Button onClick={navigateToAccount} type="button" className="signup-button">
						{$L('회원가입 하러가기')}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;
