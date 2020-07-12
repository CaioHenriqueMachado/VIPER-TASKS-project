import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit, FiCheckSquare } from 'react-icons/fi';

import './styles.css';


import initialModal from './script';
import alterColor from './scriptColor';

import Error from '../../Error';
import Header from '../../Header';
import DateFormat from '../../DateFormat';

import api from '../../services/api';

export default function Profile() {
	const [chave, setChave ] = useState(0);
	const [ tasks, setTasks ] = useState([]);
	const [ task, setTask ] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [validate, setValidate] = useState(false);
	const [message, setMessage] = useState('');
	const [concludedTasks, setconcludedTasks] = useState(0);
	const [totalTask, setTotalTask] = useState(tasks.length);

	const userId = localStorage.getItem('userId');
	const userName = localStorage.getItem('userName');

	useEffect(() => {
			api.get(`tasks?concluded=${concludedTasks}`,{
					headers: {
							Authorization: userId,
					}
			}).then(response => {
					setTotalTask(response.data.length);
					setTasks(response.data);
			})

			
	}, [chave, userId, concludedTasks]);


	async function handleDeleteTask(id) {
			try {
					await api.delete(`tasks/${id}`, {
							headers: {
									Authorization: userId,
							}
					});
					setTasks(tasks.filter(task => task.id !== id));
					setTotalTask(totalTask - 1);
			}catch(err) {   
					setMessage('Erro ao deletar Tarefa !!!');
					setValidate(true);
					setValidate(false);
			}
	}

	async function handleIdTask(id) {
			setTask(id);
			api.get(`task/${id}`,{
					headers: {
							Authorization: userId,
					}
			}).then(response => {
		setName(response.data.name)
		setDescription(response.data.description)
		setDifficulty(response.data.difficulty)
			})
	}

	async function closeIdTask(){
			setName('')
			setDescription('')
			setDifficulty('')
	}

	async function handleConcludeTask(taskId, taskConcluded){

	const data = {
			concluded:  taskConcluded === 1 ? false: true
	};


	try {
			await api.put(`tasks/${taskId}`,data, {
					headers: {
							Authorization: userId,
					}
					});
					setTasks(tasks.filter(task => task.id !== taskId));
	}catch{}
	}
	async function handleUpdateTask(e){
	e.preventDefault();

	const data = {
		name,
		description,
		difficulty
	};

	try {
					await api.put(`tasks/${task}`,data, {
							headers: {
									Authorization: userId,
							}
							});
							setChave(chave+ 1);
							
	} catch(err){
					setMessage('Sua tarefa não cumpre o tamanho mínimo');
					setValidate(true);
					setValidate(false);
	}			
}

	return (
		<>
			<div className="container pd-top">
				<Header />
				<h2>Bem vindo, {userName}</h2>
				<h1>LISTA DE TAREFAS</h1>
				
				<h2 id='totalColor' className='red'>{totalTask} 
					{ (concludedTasks === 0)  && (<strong> Tarefas pendentes </strong>)}
					{ (concludedTasks === 1)  && (<strong> Tarefas concluídas </strong>)}
				</h2>
				
				

				<div className='doubleButton'>
					<button  className='one red-bg'  id='buttonOne'
						onClick={ () => (setconcludedTasks(0), alterColor('0') ) }
						>PENDENTES
					</button>
					<button className='two gray-bg'  id='buttonTwo'
						onClick={ () => (setconcludedTasks(1), alterColor('1')) }
						>CONCLUÍDAS
					</button>
				</div>

				<hr size={5} color='black'/>

				<div className='main'>
					<ul>
							{tasks.map(task =>(
										<li key={task.id} id='liColor'>
										<strong>TAREFA:</strong>
										<p>{task.name}</p>

										{/* <strong>DESCRIÇÃO:</strong>
											<p>{task.description}</p>

										<strong>DIFICULDADE:</strong>
										<p>{task.difficulty}</p>

										<strong>DATA DE ATUALIZAÇÃO:</strong>
										<p>{DateFormat(task.updated_at)}</p>
							
										<strong>DATA DE CADASTRO:</strong>
										<p>{DateFormat(task.created_at)}</p> */}


										{ (task.concluded === 0)  && (
										<button className="edit" onClick={() => (handleIdTask(task.id), initialModal('modal-edit'))} type="button">
												<FiEdit size={20} />
										</button>
										)}

										<button className="delete" onClick={() => handleDeleteTask(task.id)} type="button">
												<FiTrash2 size={20} />
										</button>
									
									
										<button className="check" onClick={() => (handleConcludeTask(task.id, task.concluded), setTotalTask(totalTask - 1))} type="button">
													{ (task.concluded === 0)  && (
													<FiCheckSquare size={21} />)}
													{ (task.concluded === 1)  && (
													<FiCheckSquare size={21} color="#00ff00" />)}
										</button>
								</li>
							))}
					</ul>
					</div>
			</div>
		<div id="modal-edit" className="modal-container">
		<div className="modal">	
			 <form onSubmit={handleUpdateTask}>
				<h2>Nome:</h2>
				<input 
					value={name}
					onChange={ e => setName(e.target.value) }
					maxLength='100'
					required
				/>
				<h2>Descrição:</h2>
				<textarea 
					value={description}
					onChange={ e => setDescription(e.target.value) }
					maxLength='250'
			
				/>
				<h2>Dificuldade:</h2>
				<input 
					value={difficulty}
					onChange={ e => setDifficulty(e.target.value) }
					maxLength='20'
				/>
				<div className='doubleButtonAlert'>
					<button className=" button close" onClick={() => (initialModal('modal-edit'), closeIdTask())}>
						CANCELAR
					</button>
					<button className="button" type="submit" onClick={() => initialModal('modal-edit')}>
						ATUALIZAR
					</button>
					
				</div>
			</form> 
		</div>
	</div>
	
	<Error message={message} validate={validate} />
	</>
			
	);
} 