import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiPower, FiEdit, FiX } from 'react-icons/fi';

import './styles.css';
import initialModal from './script';
import finishModal from './script2';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function Profile() {
    const [ tasks, setTasks ] = useState([]);

    const [name, setName] = useState('');
	const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('tasks',{
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setTasks(response.data);
        })
    }, [userId]);

    async function handleDeleteTask(id) {
        try {
            await api.delete(`tasks/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });
            setTasks(tasks.filter(task => task.id !== id));
        }catch(err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    async function handleIdTask(id) {
        localStorage.setItem('taskId', id);
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


    return (
        <>
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
    <span>Bem vindo, {userName}</span>

                <Link className="button" to="/tasks/new">
                    Cadastrar um novo caso
                </Link>
                <button  type="button" onClick={handleLogout}>
                    <FiPower size={24} color="#0609be" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {tasks.map(task =>(
                      <li key={task.id}>
                      <strong>TAREFA:</strong>
                      <p>{task.name}</p>

                      <strong>DESCRIÇÃO:</strong>
                        <p>{task.description}</p>

                      <strong>DIFICULDADE:</strong>
                      <p>{task.difficulty}</p>
                    
                      <button className="edit" onClick={() => (handleIdTask(task.id), initialModal('modal-edit'))} type="button">
                          <FiEdit size={20} color="#a8a8b3" />
                      </button>

                      <button className="delete" onClick={() => handleDeleteTask(task.id)} type="button">
                          <FiTrash2 size={20} color="#a8a8b3" />
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
    
        </>
        
    );
} 