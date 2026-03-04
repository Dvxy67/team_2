
function toggleMenu() {
    const menu = document.querySelector('.menu-burger');
    const overlay = document.querySelector('.menu-overlay');
    
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-links a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
});