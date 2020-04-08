const specEnters = document.querySelectorAll('.menuItem');
const specExits = document.querySelectorAll('.menuDetail > button');

Array.from(specEnters).forEach(button =>
  button.addEventListener('click', openWindow, true),
);
Array.from(specExits).forEach(button =>
  button.addEventListener('click', closeWindow, true),
);
function openWindow() {
  console.log('open');
  const target = this.parentElement.querySelector('.menuDetail');
  target.classList.add('isOpen');
  target.style = 'user-select: none';
}
function closeWindow(e) {
  console.log('close');
  e.preventDefault();
  // setTimeout(() => {
  //   this.parentElement.classList.remove('open_spec');
  // }, 0);
  this.parentElement.classList.remove('isOpen');
}

const navigation = document.querySelector('.navigation');
const navClBtn = document.querySelector('#navClBtn');
const navOpBtn = document.querySelector('.burgerButton');
navOpBtn.addEventListener('click', navOpen);
navClBtn.addEventListener('click', navClose);

function navOpen() {
  console.log('open');
  navigation.classList.add('isActive');
}
function navClose() {
  console.log('close');
  navigation.classList.remove('isActive');
}

// Array.from(btns).forEach(btn => btn.addEventListener('click', closeWindow));
// burgerBtn.addEventListener('click', () => {
// });
