import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assests/logo1.svg';

import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            login,
            password
        };

        try {
            const response =  await api.post('users', data);
            alert ('Cadastro realizado com sucesso');
            history.push('/');
        } catch(err){
            alert ('Erro no cadastro, tente novamente')
        }
        

        
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" className="logo"/> 

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>
                    
                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#0609be"/>
                    Voltar para o login
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={ e => setName(e.target.value) }
                    />                 
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                    <input 
                        placeholder="Login" 
                        value={login}
                        onChange={ e => setLogin(e.target.value) }
                    />
                    <input 
                        placeholder="Senha" 
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
    }