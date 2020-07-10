import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiLock, FiMail } from 'react-icons/fi';
import api from '../../services/api';

import avatarImg from '../../assests/avatar.svg';
import wallpaperOne from '../../assests/wallpaperImage2.svg';
import wallpaperTwo from '../../assests/wallpaperImage1.svg';

import Error from '../../Error';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [validate, setValidate] = useState(false);

	const message = 'Seu cadastro não cumpre as validacões';

	const history = useHistory();
	async function handleRegister(e){
		e.preventDefault();

		const data = {
			name,
			email,
			login,
			password
		};

		try {
			await api.post('users', data);
			alert ('Cadastro realizado com sucesso');
			history.push('/');
		} catch(err){
			setValidate(true);
			setValidate(false);
		}
	}

	return (
		<>
			<div className="container center">
				<section className="loginScreen">
					<img src={avatarImg} className="avatar-logon" alt="" width="100px"/>
					<h1>CADASTRE-SE</h1>
					<form onSubmit={handleRegister}>
						<div className="input">
							<input 
								placeholder="Nome"
								className='logon' 
								value={name}
								onChange={ e => setName(e.target.value) }
								required
								minLength='4'
								maxLength='15'
							/>    
							<div className="icon">
								<FiUser className="icon" size={24} color="#014eb9"/>
							</div>
						</div>
						<div className="input">          
							<input 
								type="email" 
								className='logon' 
								placeholder="E-mail"
								value={email}
								onChange={ e => setEmail(e.target.value) }
								required
								minLength='8'
								maxLength='30'
							/>
							<div className="icon">
								<FiMail className="icon" size={24} color="#014eb9"/>
							</div>
						</div>
						<div className="input">
							<input 
								placeholder="Usuário" 
								className='logon' 
								value={login}
								onChange={ e => setLogin(e.target.value) }
								required
								minLength='8'
								maxLength='30'
							/>
							<div className="icon">
								<FiUser className="icon" size={24} color="#014eb9"/>
							</div>
						</div>
						<div className="input ">
							<input
								type="password"
								className='logon' 
								placeholder="Senha" 
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
							Cadastrar<span></span>
						</button>
						<Link to="/" className="back-link">
							<FiArrowLeft size={16} color="#014eb9"/>Voltar para o login
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