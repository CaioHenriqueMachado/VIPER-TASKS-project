import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import avatarImg from '../../assests/avatar.svg';
import wallpaperOne from '../../assests/wallpaperImage2.svg';
import wallpaperTwo from '../../assests/wallpaperImage1.svg';

import Error from '../../Error';

export default function Logon() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [validate, setValidate] = useState(false);

	const message = 'Login ou senha inválida!!';

	const history = useHistory();

	async function handleLogon(e){
		e.preventDefault();

		const data = {
			login,
			password
		};

		try {
			const response =  await api.post('session', data);
			localStorage.setItem('userName', response.data.name);
			localStorage.setItem('userId', response.data.id);
			history.push('/profile');

		}	catch(err) {
			setValidate(true);
			setValidate(false);
		}
		
	}

return(
	<>
		<div className="container center">
				<section className="loginScreen">
					<img src={avatarImg} className="avatar-logon" alt="" width="100px"/>
					<h1>Seja bem vindo</h1>
					<form onSubmit={handleLogon}>
						<div className="input">
							<input
								placeholder="Usuário"
								className='logon' 
								value={login}
								onChange={ e => setLogin(e.target.value) }
								required
								minLength='8'
								maxLength='20'
							/>
							<div className="icon">
							<FiUser className="icon" size={24} color="#014eb9"/>
							</div>
						</div>
						<div className="input">
							<input
								placeholder="Senha"
								className='logon' 
								type="password"
								value={password}
								onChange={ e => setPassword(e.target.value) }
								required
								minLength='8'
								maxLength='20'
							/>
							<div className="icon">
							<FiLock className="icon" size={24} color="#014eb9"/>
							</div>
						</div>
						<button className="login-button">
          		Entrar<span></span>
        		</button>
						<Link to="/register" className="back-link">
						<FiLogIn size={16} color="#014eb9"/>Não tenho cadastro
					</Link>
					</form>
				</section>
				<div className="painel-logon">
					<img src={wallpaperOne} className='left' alt="painel"/>
					<img src={wallpaperTwo} className='right' alt="painel"/>
				</div>
			<Error message={message} validate={validate} />
		</div>
	</>
	);
}