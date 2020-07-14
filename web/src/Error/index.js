import React, { useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './styles.css';

export default function Error({ message, validate }) {

	useEffect(() => {
		if (validate){
			const modal = document.getElementById("modalError");
			modal.classList.toggle('show');
		}
	}, [validate]);

	function close(modalId){
		const modal = document.getElementById(modalId);
		modal.classList.toggle('show');
		validate = false
	}

	return (
		<div className="modalAlert" id="modalError">
			<div className="boxAlert">
				<FiAlertTriangle size={40} color="red"/>
				<h1 className="h1Error">{message}</h1>
				<button className="button error" onClick={() => {close('modalError')}}>OK</button>
			</div>
		</div>
	);
}
d