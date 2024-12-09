console.log('Script loaded');
let currentLang = 'en';

// Rotating words functionality
document.addEventListener('DOMContentLoaded', function() {
    const rotatingWord = document.getElementById('rotating-word');
    const words = {
        en: [
            'data-driven solutions',
            'scalable infrastructure',
            'intelligent automation',
            'innovative engineering',
            'LLM-driven solutions',
            'predictive analytics',
            'adaptive algorithms'
        ],
        tr: [
            'veri odaklı çözümler',
            'ölçeklenebilir altyapı',
            'akıllı otomasyon',
            'yenilikçi mühendislik',
            'LLM odaklı çözümler',
            'öngörücü analiz',
            'uyarlanabilir algoritmalar'
        ]
    };
    let currentIndex = 0;

    function changeWord() {
        rotatingWord.classList.add('opacity-0');
        setTimeout(() => {
            rotatingWord.textContent = words[currentLang][currentIndex];
            rotatingWord.classList.remove('opacity-0');
            currentIndex = (currentIndex + 1) % words[currentLang].length;
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

    // Mobile language toggle
    const mobileLangToggle = document.getElementById('mobile-language-toggle');
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', toggleLanguage);
    }
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
document.addEventListener('DOMContentLoaded', function() {
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
                        card.style.height = `${cardBack.scrollHeight}px`;
                    }, 300);
                } else {
                    cardBack.style.height = '';
                    card.style.height = '';
                }

                if (isProjectCard) {
                    cards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('expanded');
                            otherCard.querySelector('.relative').classList.remove('rotate-y-180');
                            otherCard.querySelector('.absolute.back').style.height = '';
                            otherCard.style.height = '';
                        }
                    });
                }

                // Force layout recalculation
                card.offsetHeight;
            }

            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                // Mobile interaction
                card.addEventListener('click', toggleCard);
            } else {
                // Desktop interaction
                if (isProjectCard) {
                    card.addEventListener('mouseenter', toggleCard);
                    card.addEventListener('mouseleave', toggleCard);
                } else {
                    // For team members, only toggle on click for both mobile and desktop
                    card.addEventListener('click', toggleCard);
                }
            }
        });
    }

    handleCardInteraction(projectCards, true);
    handleCardInteraction(teamMembers, false);

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('show');
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnMenuButton = mobileMenuButton.contains(event.target);
            if (!isClickInsideMenu && !isClickOnMenuButton && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
            }
        });
    }
});

// At the top of your script.js


function updateButtonStates(lang) {
    const enButton = document.getElementById('en-toggle');
    const trButton = document.getElementById('tr-toggle');
    
    if (lang === 'en') {
        enButton.setAttribute('data-active', 'true');
        trButton.setAttribute('data-active', 'false');
    } else {
        enButton.setAttribute('data-active', 'false');
        trButton.setAttribute('data-active', 'true');
    }
}

function updateLanguageDisplay() {
    console.log('Updating language to:', currentLang); // Debug log
    
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === currentLang) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });

    // Update form placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        element.placeholder = currentLang === 'en' 
            ? element.getAttribute('data-placeholder-en')
            : element.getAttribute('data-placeholder-tr');
    });

    document.documentElement.lang = currentLang;
}

function toggleLanguage() {
    console.log('Toggle language clicked'); // Debug log
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    localStorage.setItem('preferredLanguage', currentLang);
    updateLanguageDisplay();
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log
    
    const languageToggle = document.getElementById('language-toggle');
    console.log('Found language toggle button:', languageToggle); // Debug log
    
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
});