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
        card.addEventListener('click', function() {
            // Check if this card is already active
            const isActive = this.classList.contains('active');

            // Remove 'active' class from all cards
            projectCards.forEach(c => c.classList.remove('active'));

            // If this card wasn't active before, make it active
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
});

// Navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            console.log('Menu toggled'); // For debugging
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Project cards and team member cards toggle effect
    const projectCards = document.querySelectorAll('.project-card');
    const teamMembers = document.querySelectorAll('.team-member');

    function toggleCard(card, className) {
        if (window.innerWidth <= 767) {
            card.classList.toggle(className);
            
            // For project cards, close other cards when one is opened
            if (className === 'active') {
                projectCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove(className);
                    }
                });
            }
        }
    }

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                e.preventDefault();
                toggleCard(this, 'active');
            }
        });
    });

    teamMembers.forEach(member => {
        member.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                e.preventDefault();
                toggleCard(this, 'flipped');
            }
        });
    });
});