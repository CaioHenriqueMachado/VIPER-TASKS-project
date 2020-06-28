import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function NewTask() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState('');

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
					alert ('Erro no cadastro, tente novamente')
			}
				
}
    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" className="logo"/>

                <h1>Cadastrar nova tarefa</h1>
                <p>Descreva a tarefa detalhadamente para que possa resolve-la depois.</p>
                
                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#E02041"/>
                Voltar para Home
                </Link>

            </section>
            <form onSubmit={handleNewTask}>
								<input placeholder="Título da tarefa"
									value={name}
									onChange={ e => setName(e.target.value) }
                />

                <textarea placeholder="Descrição"
									value={description}
									onChange={ e => setDescription(e.target.value) }
                />

                <input placeholder="Nível de dificuldade" 
									value={difficulty}
									onChange={ e => setDifficulty(e.target.value) }
                />
                    
           

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}