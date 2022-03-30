const toggleBtn = document.querySelector('.toggle__button')
const navBar =document.querySelector('.nav__baar')

toggleBtn.addEventListener('click', () => {
    navBar.classList.toggle('active');
});