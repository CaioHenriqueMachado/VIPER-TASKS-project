import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';



export default function EditProfile() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');

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
			alert ('Cadastro atualizado com sucesso');
			
				history.push('/profile');
			
		} catch(err){
				alert ('Erro no cadastro, tente novamente')
		}
	}
	

	return(
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

					/>
					<h2>E-mail</h2>
					<input 

						value={email}
						onChange={ e => setEmail(e.target.value) }
					/>
					<h2>Login</h2>
					<input 

						value={login}
						onChange={ e => setLogin(e.target.value) }
					/>
					<button className="button" type="submit">Atualizar</button>
					<Link to="/profile" className="back-link">
						<FiLogIn size={16} color="#0609be"/>
						Voltar para tarefas
					</Link>
				</form>
			</section>
		</div>
	);
}

