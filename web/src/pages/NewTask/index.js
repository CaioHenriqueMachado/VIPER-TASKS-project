import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import newTaskImg from '../../assests/newTask.svg';

import api from '../../services/api';

import Header from '../../Header';
import Error from '../../Error';

export default function NewTask() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState('');
    const [validate, setValidate] = useState(false);

    const message = 'Sua tarefa não cumpre as validacões';
	const history = useHistory();

	const userId = localStorage.getItem('userId');

	async function handleNewTask(e){
		e.preventDefault();

		const data = {
			name,
			description,
			difficulty
		};

		try {
				await api.post('tasks', data, {
					headers: {
						Authorization: userId
					}
				});
				
				alert ('Cadastro realizado com sucesso');
				history.push('/profile');
		} catch(err){
			setValidate(true);
            setValidate(false);
		}
				
}
return (

	<>
		<div className="container newTask">
			<Header />
			<section className='lateralForm'>
				<h1>NOVA TAREFA</h1>
				<form onSubmit={handleNewTask}>
					<input placeholder="Título da tarefa"
						value={name}
						onChange={ e => setName(e.target.value) }
						required
						minLength='4'
						maxLength='100'
					/>

					<textarea placeholder="Descrição"
						value={description}
						onChange={ e => setDescription(e.target.value) }
						required
						minLength='10'
						maxLength='250'
					/>

					<input 
						type='select'
						placeholder="Nível de dificuldade" 
						value={difficulty}
						onChange={ e => setDifficulty(e.target.value) }
						required
						minLength='4'
						maxLength='20'
					/>
					<button className="button" type="submit">Cadastrar</button>
					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#E02041"/>
						Voltar para Home
					</Link>
				</form>
			</section>
			<div className='imageWallpaper'>
				<img src={newTaskImg} alt="New Task Image"/>
			</div>
		</div>
		<Error message={message} validate={validate} />
	</>
);
}