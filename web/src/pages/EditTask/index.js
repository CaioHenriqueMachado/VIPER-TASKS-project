import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiX } from 'react-icons/fi';

import './styles.css';
import finishModal from './script';
import logoImg from '../../assests/logo1.svg';
import test from './test';

import api from '../../services/api';

export default function EditTask() {
	const [taskId, setTaskId] = useState(localStorage.getItem('taskId'));

	const [name, setName] = useState(localStorage.getItem('taskName'));
	const [description, setDescription] = useState(localStorage.getItem('taskDescription'));
	const [difficulty, setDifficulty] = useState(localStorage.getItem('taskDifficulty'));

	const history = useHistory();

	const userId = localStorage.getItem('userId');

	


	useEffect(() => {
		console.log('d')
		console.log(localStorage.getItem('taskId'))
        api.get(`task/${taskId}`,{
            headers: {
                Authorization: userId,
            }
        }).then(response => {
			setName(response.data.name)
			setDescription(response.data.description)
			setDifficulty(response.data.difficulty)
        })
	}, []);





	async function handleProfileEdit(e){
		e.preventDefault();

		const data = {
			name,
			description,
			difficulty
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
		<div id="modal-edit" className="modal-container">
			<div className="modal">
				<button className="close" onClick={() => finishModal('modal-edit')}>
					<FiX size={40} color="black"/>
				</button>
				<form action="">
					<h2>Nome:</h2>
					<input 
						value={name}
						onChange={ e => setName(e.target.value) }
					/>
					<h2>Descrição:</h2>
					<input 

						value={description}
						onChange={ e => setDescription(e.target.value) }
					/>
					<h2>Dificuldade:</h2>
					<input 

						value={difficulty}
						onChange={ e => setDifficulty(e.target.value) }
					/>
					<button className="button" type="submit">Atualizar</button>
				</form>
			</div>
		</div>
	);

}

