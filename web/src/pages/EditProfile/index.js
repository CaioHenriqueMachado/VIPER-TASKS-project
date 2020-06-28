import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';



export default function EditProfile() {
	const [name, setName] = useState('vxvc');
	const [email, setEmail] = useState('vxvc');
	const [login, setLogin] = useState('vxvc');

	
	async function handleNewTask(e){
		e.preventDefault();
	}
	return(
		<div className="logon-container">
			<img src={logoImg} alt="logo" className="logo"/>
			<section className="form">
				<form onSubmit={handleNewTask}>
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

