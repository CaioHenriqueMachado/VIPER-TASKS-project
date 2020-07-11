import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiPower, FiEdit, FiX, FiCheckSquare, FiXSquare } from 'react-icons/fi';

import './styles.css';
import initialModal from './script';
import finishModal from './script2';

import Error from '../../Error';
import DateFormat from '../../DateFormat';

import logoImg from '../../assests/logo1.svg';

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

    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get(`tasks?concluded=${concludedTasks}`,{
            headers: {
                Authorization: userId,
            }
        }).then(response => {
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

    function handleLogout() {
        localStorage.clear();
        history.push('/') ;
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
    }catch{

    }

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
        <div className="profile-container">
            <header>
                <img src={logoImg}  alt='logos'/>
    <span>Bem vindo, {userName}</span>

                <Link className="button" to="/tasks/new">
                    Cadastrar um novo caso
                </Link>
                <Link className="button editProfile" to="/profile/edit">
                    <FiEdit size={30} color="#dcdce6" />
                </Link>
                <button className="button" type="button" onClick={handleLogout}>
                    <FiPower size={30} color="#dcdce6" />
                </button>
            </header>

            <h1>Sua lista de tarefas</h1>
            
            <button 
                onClick={ () => setconcludedTasks(0) }
                >TAREFAS PENDENTES
            </button>
            <button 
                onClick={ () => setconcludedTasks(1) }
                >TAREFAS CONCLUÍDAS
            </button>
            <ul>
                {tasks.map(task =>(
                      <li key={task.id}>
                      <strong>TAREFA:</strong>
                      <p>{task.name}</p>

                      <strong>DESCRIÇÃO:</strong>
                        <p>{task.description}</p>

                      <strong>DIFICULDADE:</strong>
                      <p>{task.difficulty}</p>
                      
                      <strong>DATA DE ATUALIZAÇÃO:</strong>
                      <p>{DateFormat(task.updated_at)}</p>
                
                      <strong>DATA DE CADASTRO:</strong>
                      <p>{DateFormat(task.created_at)}</p>


                      { (task.concluded === 0)  && (
                      <button className="edit" onClick={() => (handleIdTask(task.id), initialModal('modal-edit'))} type="button">
                          <FiEdit size={20} color="#a8a8b3" />
                      </button>
                      )}

                      <button className="delete" onClick={() => handleDeleteTask(task.id)} type="button">
                          <FiTrash2 size={20} color="#a8a8b3" />
                      </button>
                    
                    
                      <button className="check" onClick={() => handleConcludeTask(task.id, task.concluded)} type="button">
                            { (task.concluded === 0)  && (
                            <FiCheckSquare size={21} color="#a8a8b3" />)}
                            { (task.concluded === 1)  && (
                            <FiXSquare size={21} color="#a8a8b3" />)}
                      </button>

                  </li>
                ))}
            </ul>
        </div>

        <div id="modal-edit" className="modal-container">
			<div className="modal">
				<button className="close" onClick={() => (finishModal('modal-edit'), closeIdTask())}>
					<FiX size={40} color="black"/>
				</button>
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
					<button className="button" type="submit" onClick={() => finishModal('modal-edit')}>Atualizar</button>
				</form>
			</div>
		</div>
        <Error message={message} validate={validate} />
        </>
        
    );
} 