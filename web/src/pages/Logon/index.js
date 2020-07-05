import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assests/logo1.svg';
import ideasImg from '../../assests/ideas.png';

import api from '../../services/api';

import Error from '../../Error';

export default function Logon() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);

    const message = 'Login ou senha inválida!!';

    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        const data = {
            login,
            password
        };

        try {
            const response =  await api.post('session', data);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userId', response.data.id);

            alert ('Login realizado com sucesso');
            history.push('/profile');
        } catch(err){
            setValidate(true);
            setValidate(false);
            
        }

        
    }
    return(
        <>
        <div className="logon-container">
            <img src={logoImg} alt="logo" className="logo"/>
            <section className="form">
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Login</h1>
                    <input 
                        placeholder="Login"
                        value={login}
                        onChange={ e => setLogin(e.target.value) }
                    />
                    <input 
                        placeholder="Password" 
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#0609be"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <div className="painel">
                <img src={ideasImg} alt="painel" width={300}/>
            </div>
        </div>
        <Error message={message} validate={validate} />
        </>
    );

}