import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

export default function Register() {
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
                <form>
                    <input 
                    placeholder="Nome"/>

                    <input type="email" placeholder="E-mail"
       
                    />
                    <input placeholder="Login" 
             
                    />
              
                    <input placeholder="Senha" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
    }