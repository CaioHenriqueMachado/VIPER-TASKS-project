export default function alterColor(number){
    const modal1 = document.getElementById('buttonOne');
    const modal2 = document.getElementById('buttonTwo');
    const modal3 = document.getElementById('totalColor');
    const modal4 = document.getElementById('liColor');

    if (number === 0){
        modal1.classList.replace('gray-bg','orange-bg');
        modal2.classList.replace('orange-bg' ,'gray-bg');
        modal3.classList.replace('green', 'red');
    }
    if (number === 1){
        modal1.classList.replace('orange-bg' ,'gray-bg');
        modal2.classList.replace('gray-bg','orange-bg');
        modal3.classList.replace('red', 'green');
    }


    
    // modal1.classList.toggle();

    
    // modal2.classList.toggle('orange-bg');



    // const modal = document.getElementById(modalId);
    
    
}
