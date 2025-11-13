/* eslint-disable */
import Button from '@enact/sandstone/Button';
import { InputField } from '@enact/sandstone/Input';
import axios from 'axios';
import { useState } from 'react';
import $L from '@enact/i18n/$L';
import './Account.css'; // CSS 파일 가져오기
import logo from '../assets/logo.png'; // 로고 이미지 가져오기

const Account = ({ navigateToLogin }) => { // navigateToLogin을 props로 받도록 수정
	const [state, setState] = useState({
		email: '',
		password: '',
		nickname: '',
	});

	const handleSignup = async () => {
		if (state.password.length < 8) {
			alert($L('Password must be at least 8 characters long.'));
			return;
		}

		try {
			await axios.post('/api/auth/signup', {
				email: state.email,
				password: state.password,
				nickname: state.nickname,
			});
			alert($L('Signup successful!'));
			setState({
				email: '',
				password: '',
				nickname: '',
			});
		} catch (error) {
			console.error(error);
			alert($L('Signup failed. Please try again.'));
		}
	};

	return (
		<div className="account-container">
			<img src={logo} alt="Logo" className="logo" />
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
					placeholder="비밀번호 (최소 8자)"
					className="input-field"
				/>
				<InputField
					type="text"
					value={state.nickname}
					onChange={e => setState(prev => ({ ...prev, nickname: e.value }))}
					placeholder="닉네임"
					className="input-field"
				/>
				<div className="button-container">
					<Button onClick={handleSignup} type="submit" className="signup-button">
						{$L('회원가입 하기')}
					</Button>
					<Button onClick={navigateToLogin} type="button" className="login-button">
						{$L('로그인 하러가기')}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Account;
