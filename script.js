console.log('Script loaded');

// Loading screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('opacity-0');
        setTimeout(() => {
            document.querySelector('.loading-screen').classList.add('hidden');
        }, 500);
    }, 1500);
});

// Rotating words functionality
document.addEventListener('DOMContentLoaded', function() {
    const rotatingWord = document.getElementById('rotating-word');
    const words = [
        'data-driven solutions',
        'scalable infrastructure',
        'intelligent automation',
        'innovative engineering',
        'LLM-driven solutions',
        'predictive analytics',
        'adaptive algorithms'
    ];
    let currentIndex = 0;

    function changeWord() {
        rotatingWord.classList.add('opacity-0');
        setTimeout(() => {
            rotatingWord.textContent = words[currentIndex];
            rotatingWord.classList.remove('opacity-0');
            currentIndex = (currentIndex + 1) % words.length;
        }, 500);
    }

    changeWord();
    setInterval(changeWord, 3000);
});

// Project cards, Testimonial Slider, and Tech Grid
document.addEventListener('DOMContentLoaded', function() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.querySelector('.project-details').classList.toggle('hidden');
            projectCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.querySelector('.project-details').classList.add('hidden');
                }
            });
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('hidden', i !== index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 5000);

    // Tech Grid
    const techItems = document.querySelectorAll('.tech-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    techItems.forEach(item => observer.observe(item));
});

// Mobile menu toggle
const menuToggle = document.querySelector('[aria-label="Toggle menu"]');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('flex');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
        });
    });
}

// Project cards and team member cards
const projectCards = document.querySelectorAll('.project-card');
const teamMembers = document.querySelectorAll('.team-member');

function handleCardInteraction(cards, isProjectCard = false) {
    cards.forEach(card => {
        const cardInner = card.querySelector('.relative');
        const cardBack = card.querySelector('.absolute.back');

        function toggleCard() {
            card.classList.toggle('expanded');
            cardInner.classList.toggle('rotate-y-180');
            
            if (cardInner.classList.contains('rotate-y-180')) {
                setTimeout(() => {
                    cardBack.style.height = `${cardBack.scrollHeight}px`;
                }, 300);
            } else {
                cardBack.style.height = '';
            }

            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.relative').classList.remove('rotate-y-180');
                    otherCard.querySelector('.absolute.back').style.height = '';
                }
            });

            // Reorder cards on mobile
            if (window.innerWidth <= 767) {
                const projectCardsContainer = card.closest('.project-cards');
                if (projectCardsContainer) {
                    const expandedCard = projectCardsContainer.querySelector('.project-card.expanded');
                    if (expandedCard) {
                        projectCardsContainer.insertBefore(expandedCard, projectCardsContainer.firstChild);
                    }
                }
            }
        }

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            // Mobile interaction
            card.addEventListener('click', toggleCard);
        } else {
            // Desktop interaction
            card.addEventListener('mouseenter', toggleCard);
            card.addEventListener('mouseleave', toggleCard);
        }
    });
}

handleCardInteraction(projectCards, true);
handleCardInteraction(teamMembers);

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuButton.contains(event.target);
        if (!isClickInsideMenu && !isClickOnMenuButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});