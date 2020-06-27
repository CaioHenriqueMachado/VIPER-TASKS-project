import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';
import ideasImg from '../../assests/ideas.png';

export default function Logon() {
    return(
        <div className="logon-container">
            <img src={logoImg} alt="logo" className="logo"/>
            <section className="form">
                <form>
                    <h1>Faça seu Login</h1>
                    <input placeholder="Login" autofocus="autofocus"/>
                    <input placeholder="Password" />
                    <button className="button" type="submit">Entrar</button>
                    <a href="/register" className="back-link">
                        <FiLogIn size={16} color="#0609be"/>
                        Não tenho cadastro
                    </a>
                </form>
            </section>
            <div className="painel">
                <img src={ideasImg} alt="painel" width={300}/>
            </div>
        </div>
    );
}