export default function effectFocus(modalId){
  const modal = document.getElementById(modalId);
  modal.classList.add('focus')
}

// export default function t(){


// const inputs = document.getElementById('fff');


// function focusFunc(input) {
//   input.classList.add('focus');

// }

// function blurFunc() {
//   let parent = this.parentNode.parentNode;
//   if(this.value == ""){
//     parent.classList.remove('focus');
//   }
  
// }

// inputs.forEach(input => {
//   input.addEventListener('focus', focusFunc);
//   input.addEventListener('blur', blurFunc);
// });

// }