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
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Header fix
@media (max-width: 767px) {
    header nav {
        flex-direction: column;
        align-items: center;
    }

    .logo {
        margin-bottom: 10px;
    }

    .nav-menu {
        display: none;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .nav-menu.active {
        display: flex;
    }

    .menu-toggle {
        display: block;
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
    }
}

@media (min-width: 768px) {
    .menu-toggle {
        display: none;
    }

    .nav-menu {
        display: flex;
    }
}

// Icon text overflow fix
@media (max-width: 767px) {
    .tech-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .tech-item {
        flex: 0 0 calc(50% - 10px);
        margin-bottom: 20px;
        height: auto;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 10px;
    }

    .tech-item i {
        font-size: 2rem;
        margin-bottom: 5px;
    }

    .tech-item h3 {
        font-size: 0.9rem;
        margin: 0;
    }
}

// Project cards on mobile
@media (max-width: 767px) {
    .project-cards {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
    }

    .project-card {
        height: 350px; /* Initial height */
        transition: all 0.3s ease;
    }

    .project-image {
        height: 150px;
    }

    .project-info {
        height: 200px; /* Adjust this value as needed */
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .project-details {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .project-card.active {
        height: auto;
        max-height: 1000px; /* Adjust this value as needed */
    }

    .project-card.active .project-info {
        height: auto;
        max-height: 1000px; /* Adjust this value as needed */
    }

    .project-card.active .project-details {
        opacity: 1;
        max-height: 1000px; /* Adjust this value as needed */
    }
}