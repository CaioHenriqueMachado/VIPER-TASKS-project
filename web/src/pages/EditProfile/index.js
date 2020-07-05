import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiKey } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

import Error from '../../Error';

export default function EditProfile() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');
    const [validate, setValidate] = useState(false);

    const message = 'Seu cadastro não cumpre as validacões';
	const history = useHistory();

	const userId = localStorage.getItem('userId');

	useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: userId,
            }
        }).then(response => {
			setName(response.data.name)
			setEmail(response.data.email)
			setLogin(response.data.login)
        })
	}, [userId]);
	



	async function handleProfileEdit(e){
		e.preventDefault();

		const data = {
			name,
			email,
			login
		};

		try {
            await api.put(`users/${userId}`,data, {
                headers: {
                    Authorization: userId,
                }
			});
			localStorage.setItem('userName', data.name);
			
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
				<form onSubmit={handleProfileEdit}>
					<h1>Edite seu perfil</h1>
					<h2>Nome</h2>
					<input 
						id="loco"
						value={name}
						onChange={ e => setName(e.target.value) }
                        required
                        minLength='4'
                        maxLength='15'
					/>
					<h2>E-mail</h2>
					<input 

						value={email}
						onChange={ e => setEmail(e.target.value) }
						required
                        minLength='7'
                        maxLength='30'
					/>
					<h2>Login</h2>
					<input 

						value={login}
						onChange={ e => setLogin(e.target.value) }
						required
                        minLength='8'
                        maxLength='30'
					/>
					<Link to="/pwd" className="back-link">
						<FiKey size={16} color="#0609be"/>
						Alterar senha
					</Link>
					<button className="button" type="submit">Atualizar</button>
					
					<Link to="/profile" className="back-link">
						<FiLogIn size={16} color="#0609be"/>
						Voltar para tarefas
					</Link>
				</form>
			</section>
		</div>
		<Error message={message} validate={validate} />
		</>
	)
}
