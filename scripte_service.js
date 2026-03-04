// ===================================
// Script JavaScript pour interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gestion du menu mobile (si ajouté plus tard)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Placeholder pour future navigation mobile
            console.log('Menu clicked');
        });
    }

    // Animation au scroll pour les éléments
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Appliquer l'animation aux cards et sections
    const animatedElements = document.querySelectorAll('.service-card, .process-step, .pricing-item, .review-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Carousel tactile pour les reviews
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        reviewsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            reviewsSlider.style.cursor = 'grabbing';
            startX = e.pageX - reviewsSlider.offsetLeft;
            scrollLeft = reviewsSlider.scrollLeft;
        });

        reviewsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            reviewsSlider.style.cursor = 'grab';
        });

        reviewsSlider.addEventListener('mouseup', () => {
            isDown = false;
            reviewsSlider.style.cursor = 'grab';
        });

        reviewsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            reviewsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Compteur d'animation pour les chiffres (ex: nombre de reviews)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Log pour vérifier que le script est chargé
    console.log('🚀 Scripts initialisés avec succès');
});

// Fonction utilitaire pour formater les numéros de téléphone
function formatPhoneNumber(phoneNumber) {
    // Retire tous les caractères non-numériques
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
    // Format belge: +32 XXX XX XX XX
    if (cleaned.length === 9 && cleaned.startsWith('0')) {
        return '+32 ' + cleaned.substring(1, 4) + ' ' + 
               cleaned.substring(4, 6) + ' ' + 
               cleaned.substring(6, 8) + ' ' + 
               cleaned.substring(8);
    }
    
    return phoneNumber;
}