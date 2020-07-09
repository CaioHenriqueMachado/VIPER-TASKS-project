import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assests/logo1.svg';
import avatarImg from '../../assests/avatar.svg';
import wallpaperLogon from '../../assests/wallpaperLogon.png';

import api from '../../services/api';

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
				{/* <img src={logoImg} alt="logo" className="logo"/> */}
				<section className="loginScreen">
					<img src={avatarImg} className="avatar-logon" alt="" width="100px"/>
					<h1 className='logon'>Seja bem vindo</h1>
					<form onSubmit={handleLogon}>
						<div className="input">
							<input
								// onFocus={ () => {effectFocus('logonInput')}}
								className='logon' 
								value={login}
								onChange={ e => setLogin(e.target.value) }
								minLength='8'
								maxLength='20'
							/>
							<div className="placeholder" id='fff'>Usuário</div>
							<div className="icon">
							<FiUser className="icon" size={24} color="#39ff14"/>
							</div>
						</div>
						<div className="input">
							<input
								onFocus={ () => {effectFocus('passwordInput')}}
								className='logon' 
								type="password"
								value={password}
								onChange={ e => setPassword(e.target.value) }
								minLength='8'
								maxLength='20'
							/>
							<div className="placeholder" id='fff'>Senha</div>
							<div className="icon">
							<FiLock className="icon" size={24} color="#39ff14"/>
							</div>
						</div>

						<button className="login-button">
          		Entrar<span></span>
        		</button>
					</form>
					<Link to="/register" className="back-link">
						<FiLogIn size={16} color="#39ff14"/>Não tenho cadastro
					</Link>
				</section>
				{/* <div className="painel-logon">
					<img src={wallpaperLogon} alt="painel" width={300}/>
				</div> */}
			<Error message={message} validate={validate} />
		</div>
	</>
	);
}