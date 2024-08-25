console.log('Script loaded');

// Loading screen
document.body.classList.add('loading');

window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
            document.body.classList.remove('loading');
        }, 500);
    }, 1500); // Adjusted to allow for quicker animation
});

// Rotating words functionality
document.addEventListener('DOMContentLoaded', function() {
    const rotatingWord = document.getElementById('rotating-word');
    const words = ['data-driven solutions',
        'scalable infrastructure',
        'intelligent automation',
        'innovative engineering',
        'LLM-driven solutions',
        'predictive analytics',
        'adaptive algorithms'];
    let currentIndex = 0;

    function changeWord() {
        rotatingWord.textContent = words[currentIndex];
        currentIndex = (currentIndex + 1) % words.length;
    }

    // Set initial word
    changeWord();

    // Change word every 3 seconds
    setInterval(changeWord, 3000);
});

// Projects section
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if it's a mobile device
            if (window.innerWidth <= 767) {
                e.preventDefault(); // Prevent default link behavior if there's any
                this.classList.toggle('active');

                // Close other cards when one is opened
                projectCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                    }
                });
            }
        });
    });
});

// Navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});