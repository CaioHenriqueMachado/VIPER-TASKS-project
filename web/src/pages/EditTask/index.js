import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

import './styles.css';
import finishModal from './script';
import logoImg from '../../assests/logo1.svg';


import api from '../../services/api';

export default function EditTask() {
	const [taskId, setTaskId] = useState('');

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState('');

	const history = useHistory();

	const userId = localStorage.getItem('userId');


	useEffect(() => {
		setName(localStorage.getItem('taskName'))
		setDescription(localStorage.getItem('taskDescription'))
		setDifficulty(localStorage.getItem('taskDifficulty'))

		}, [localStorage.getItem('taskId')]);


  	async function closeIdTask(){
        setName('')
        setDescription('')
        setDifficulty('')
    }


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
				<button className="close" onClick={() => (finishModal('modal-edit'), closeIdTask())}>
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

