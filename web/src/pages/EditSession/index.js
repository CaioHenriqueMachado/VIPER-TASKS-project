import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiSettings } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

import Error from '../../Error';

export default function EditSession() {
	const [password, setPassword] = useState('');
	const [new_password, setNew_password] = useState('');
	const [confirm_new_password, setConfirm_new_password] = useState('');
    const [validate, setValidate] = useState(false);

    const message = 'Sua senha não cumpre as validacões';
	const history = useHistory();

	const userId = localStorage.getItem('userId');

	async function handleSessionEdit(e){
		e.preventDefault();

		const data = {
			password,
			new_password,
			confirm_new_password
		};

		try {
			console.log('frontEnd')
			console.log(password)
			console.log(new_password)
			console.log(confirm_new_password)
			console.log(userId)
            await api.put(`sessions/${userId}`,data, {
                headers: {
                    Authorization: userId,
                }
			});
			
			history.push('/profile');
			
		} catch(err){
			setValidate(true);
            setValidate(false);
		}
	}
	
	return(
		<>
		<div className="logon-container">
			<img src={logoImg} alt="logo" className="logo"/>
			<section className="form">
				<form onSubmit={handleSessionEdit}>
					<h1>Redefinir senha</h1>
					<h2>Senha antiga</h2>
					<input 
						id="loco"
						type="password"
						value={password}
						onChange={ e => setPassword(e.target.value) }
						required
                        minLength='8'
                        maxLength='30'

					/>
					<h2>Senha nova</h2>
					<input 
						type="password"
						value={new_password}
						onChange={ e => setNew_password(e.target.value) }
						required
                        minLength='8'
                        maxLength='30'
					/>
					<h2>Senha nova</h2>
					<input 
						type="password"
						value={confirm_new_password}
						onChange={ e => setConfirm_new_password(e.target.value) }
						required
                        minLength='8'
                        maxLength='30'
					/>
					<button className="button" type="submit">Atualizar</button>
					<Link to="/profile/edit" className="back-link">
						<FiSettings size={16} color="#0609be"/>
						Voltar para suas configurações
					</Link>
				</form>
			</section>
		</div>
		<Error message={message} validate={validate} />
		</>
	)
}
