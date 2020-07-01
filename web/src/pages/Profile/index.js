import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiPower, FiEdit } from 'react-icons/fi';

import EditTask from '../EditTask';
import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function Profile() {
    const [ tasks, setTasks ] = useState([]);

    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    // Assim que entrar na tela ele deve puxar do backend os dados instantaneamente, para isso o useEffect.
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
                    
                      <button className="edit" onClick={() => handleIdTask(task.id)} type="button">
                          <FiEdit size={20} color="#a8a8b3" />
                      </button>

                      <button className="delete" onClick={() => handleDeleteTask(task.id)} type="button">
                          <FiTrash2 size={20} color="#a8a8b3" />
                      </button>
                  </li>
                ))}
            </ul>
        </div>
        <EditTask/>
        </>
        
    );
} 