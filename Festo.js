const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('leMenu');
const FermerMenu = document.getElementById('FermerMenu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});


FermerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

function Seconnecter() {
    const email = document.getElementById('email').value;
    const motdepasse = document.getElementById('motdepasse').value;
    
    if (email && motdepasse) {
        alert('Connexion réussie !');
    } else {
        alert('Veuillez remplir tous les champs');
    }
}