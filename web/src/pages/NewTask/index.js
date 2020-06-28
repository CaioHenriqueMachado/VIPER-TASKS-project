import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assests/logo1.svg';

export default function NewTask() {
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
            <form>
                <input placeholder="Título da tarefa"

                />

                <textarea placeholder="Descrição"
     
                />

                <input placeholder="Nível de dificuldade" 
 
                />
                    
           

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}