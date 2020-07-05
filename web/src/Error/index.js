import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import './styles.css';


export default function Error({ message, validate }) {
    const [exibir , setExibir] = useState(true);


    useEffect(() => {
        if (validate){
            const modal = document.getElementById("modalError");
            console.log('adicionou')
            modal.classList.add('show')
        }

    }, []);

    function close(modalId){
        const modal = document.getElementById(modalId);
        console.log('removeu')
        modal.classList.remove('show')
        validate = false
    }

    return (
        <div className="modalAlert" id="modalError">
            <div className="boxAlert">
                <FiX size={40} color="black"/>
                <h1>TESTE</h1>
                <button onClick={() => {close('modalError')}}>OK</button>
            </div>
        </div>
    );
}
