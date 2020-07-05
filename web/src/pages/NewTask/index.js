import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

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

                <input placeholder="Nível de dificuldade" 
									value={difficulty}
									onChange={ e => setDifficulty(e.target.value) }
									required
									minLength='4'
									maxLength='20'
                />
                    
           

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
	<Error message={message} validate={validate} />
	</>
    );
}