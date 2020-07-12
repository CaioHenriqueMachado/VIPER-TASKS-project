export default function alterColor(number){
	const modal1 = document.getElementById('buttonOne');
	const modal2 = document.getElementById('buttonTwo');
	const modal3 = document.getElementById('totalColor');
	
	if (number === '0'){
		modal1.classList.replace('gray-bg','red-bg');
		modal2.classList.replace('green-bg' ,'gray-bg');
		modal3.classList.replace('green', 'red');
	}
	if (number === '1'){
		modal1.classList.replace('red-bg' ,'gray-bg');
		modal2.classList.replace('gray-bg','green-bg');
		modal3.classList.replace('red', 'green');
	}
}
