import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import './styles.css';
import avatarImg from '../../assests/avatar.svg';
import editProfileImg from '../../assests/editProfileImg.svg';

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
			<div className="container">
				<section className="editProfileScreen">
					<img src={avatarImg} className="avatar-logon" alt="" width="100px"/>
					<h1 >Atualize seus dados</h1>
					<form onSubmit={handleSessionEdit}>
						<h2>Senha antiga:</h2>
						<input 
							id="loco"
							type="password"
							value={password}
							onChange={ e => setPassword(e.target.value) }
							required
							minLength='8'
							maxLength='30'
						/>
						<h2>Senha nova:</h2>
						<input 
							type="password"
							value={new_password}
							onChange={ e => setNew_password(e.target.value) }
							required
							minLength='8'
							maxLength='30'
						/>
						<h2>Senha nova:</h2>
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
				<img src={editProfileImg} className='editProfile'  alt="Edit Profile"/>
				<Error message={message} validate={validate} />
			</div>
		</>
	)
}
