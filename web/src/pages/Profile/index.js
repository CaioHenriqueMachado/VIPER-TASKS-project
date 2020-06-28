import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPower } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function Profile() {
    const [ ] = useState([]);

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: userId,
            }
        }).then(Response => {

        })
    }, []);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
    <span>Bem vindo, {userName}</span>

                <Link className="button" to="/tasks/new">
                    Cadastrar um novo caso
                </Link>
                <button  type="button">
                    <FiPower size={24} color="#0609be" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                   
                    <li >
                        <strong>CASO:</strong>
                        <p>aqui o resumo</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>AQUI VAI A DESCRIÇÃO</p>

                        <strong>DIFICULDADE:</strong>
                        <p>Facil</p>

                        <button type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                    <li >
                        <strong>TAREFA:</strong>
                        <p>aqui o resumo</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>AQUI VAI A DESCRIÇÃO</p>

                        <strong>DIFICULDADE:</strong>
                        <p>Facil</p>

                        <button type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                    <li >
                        <strong>CASO:</strong>
                        <p>aqui o resumo</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>AQUI VAI A DESCRIÇÃO</p>

                        <strong>DIFICULDADE:</strong>
                        <p>Facil</p>

                        <button type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                    <li >
                        <strong>CASO:</strong>
                        <p>aqui o resumo</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>AQUI VAI A DESCRIÇÃO</p>

                        <strong>DIFICULDADE:</strong>
                        <p>Facil</p>

                        <button type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                
            </ul>
        </div>
    );
}