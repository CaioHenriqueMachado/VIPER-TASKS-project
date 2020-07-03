import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function NewTask() {
    const [password, setPassword] = useState('');
    const [new_password, setNew_password] = useState('');
	const [new_password_again, setNew_password_again] = useState('');

	const history = useHistory();

	const userId = localStorage.getItem('userId');

	async function handleNewTask(e){
		e.preventDefault();

		const data = {
			password,
			new_password,
			new_password_again
		};

		try {
				await api.post('tasks', data, {
					headers: {
						Authorization: userId
					}
				});
				
				alert ('Senha atualizada com sucesso');
				history.push('/profile');
		} catch(err){
				alert ('Erro na atualização, tente novamente')
		}
				
}
    return (
        <div id="modal-edit" className="modal-container">
			<div className="modal">
				<button className="close" onClick={() => (finishModal('modal-edit'), closeIdTask())}>
					<FiX size={40} color="black"/>
				</button>
				<form onSubmit={handleUpdateTask}>
					<h2>Senha atual:</h2>
					<input
						value={name}
						onChange={ e => setName(e.target.value) }
					/>
					<h2>Nova senha:</h2>
					<input 

						value={description}
						onChange={ e => setDescription(e.target.value) }
					/>
					<h2>Digite a senha novamente:</h2>
					<input 

						value={difficulty}
						onChange={ e => setDifficulty(e.target.value) }
					/>
					<button className="button" type="submit" onClick={() => finishModal('modal-edit')}>Atualizar</button>
				</form>
			</div>
		</div>
    );
}