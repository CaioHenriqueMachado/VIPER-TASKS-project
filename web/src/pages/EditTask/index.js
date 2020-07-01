import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiX } from 'react-icons/fi';

import './styles.css';
import finishModal from './script';
import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';



export default function EditTask() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');

	const history = useHistory();

	const userId = localStorage.getItem('userId');
	const taskId = localStorage.getItem('taskId');


	// PAREI AQUI. CRIAR TASK QUE PUXA DOS DADOS DE 1 ID
	useEffect(() => {
        api.get(`tasks`,{
            headers: {
                Authorization: userId,
            }
        }).then(response => {
			setName(response.data.name)
			setEmail(response.data.des)
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
		<div id="modal-edit" className="modal-container">
			<div className="modal">
				<button className="close" onClick={() => finishModal('modal-edit')}>
					<FiX size={40} color="black"/>
				</button>
				<form action="">
					<h2>Nome:</h2>
					<input type="text"/>
					<h2>Descrição:</h2>
					<input type="text"/>
					<h2>Dificuldade:</h2>
					<input type="text"/>
					<button className="button" type="submit">Atualizar</button>
				</form>
			</div>
		</div>
	);
}

