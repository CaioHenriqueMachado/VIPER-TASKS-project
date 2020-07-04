import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function EditSession() {
	const [password, setPassword] = useState('');
	const [password_new, setPassword_new] = useState('');
	const [password_new2, setPassword_new2] = useState('');

	const history = useHistory();

	const userId = localStorage.getItem('userId');

	async function handleSessionEdit(e){
		e.preventDefault();

		const data = {
			password,
			password_new,
			password_new2
		};

		try {

            await api.put(`sessions/${userId}`,data, {
                headers: {
                    Authorization: userId,
                }
			});
			alert ('Senha atualizada com sucesso');
			history.push('/profile');
			
		} catch(err){
				alert ('Erro na atualização, tente novamenti')
		}
	}
	
	return(
		<div className="logon-container">
			<img src={logoImg} alt="logo" className="logo"/>
			<section className="form">
				<form onSubmit={handleSessionEdit}>
					<h1>Redefinir senha</h1>
					<h2>Senha antiga</h2>
					<input 
						type="text"
						value={password}
						onChange={ e => setPassword(e.target.value) }

					/>
					<h2>Senha nova</h2>
					<input 
						type="text"
						value={password_new}
						onChange={ e => setPassword_new(e.target.value) }
					/>
					<h2>Senha nova</h2>
					<input 
						type="text"
						value={password_new2}
						onChange={ e => setPassword_new2(e.target.value) }
					/>
					<button className="button" type="submit">Atualizar</button>
					<Link to="/profile" className="back-link">
						<FiLogIn size={16} color="#0609be"/>
						Voltar para suas configurações
					</Link>
				</form>
			</section>
		</div>
	)
}
