import React from 'react';
import { FiX } from 'react-icons/fi';
import './styles.css';


export default function Error({ message }) {

    function close(modalId){
        const modal = document.getElementById(modalId);
        console.log('foi')
        // modal.classList.remove('show')
    }

    return (
        <div className="modalAlert show" id="modalError">
            <div className="boxAlert">
                <FiX size={40} color="black"/>
                <h1>TESTE</h1>
                <button >OK</button>
            </div>
        </div>
    );
}
