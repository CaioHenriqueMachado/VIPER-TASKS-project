import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiKey } from 'react-icons/fi';
import api from '../../services/api';

import editProfileImg from '../../assests/editProfileImg.svg';
import Header from '../../Header';
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
			<div className="container newTask">
				<Header />
				<section className='lateralForm'>
					<form onSubmit={handleProfileEdit}>
					<h2>Nome:</h2>
								<input 
									placeholder="Nome"
									value={name}
									onChange={ e => setName(e.target.value) }
									required
									minLength='4'
									maxLength='15'
								/> 
								<h2>E-mail:</h2>            
								<input 
									type="email" 
									placeholder="E-mail"
									value={email}
									onChange={ e => setEmail(e.target.value) }
									required
									minLength='8'
									maxLength='30'
								/>
								<h2>Usuário:</h2>
								<input 
									placeholder="Usuário" 
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
				<div className='imageWallpaper'>
					<img src={editProfileImg} alt="Edit profile Image"/>
				</div>
			</div>
			<Error message={message} validate={validate} />
		</>
	);
}