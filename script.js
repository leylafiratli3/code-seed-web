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
    const teamMembers = document.querySelectorAll('.team-member');

    function handleTeamMemberInteraction(cards) {
        cards.forEach(card => {
            const cardInner = card.querySelector('.relative');

            function toggleCard() {
                const isFlipped = cardInner.classList.contains('rotate-y-180');
                
                if (!isFlipped) {
                    // Flip the card
                    card.classList.add('expanded');
                    cardInner.classList.add('rotate-y-180');
                } else {
                    // Unflip the card
                    card.classList.remove('expanded');
                    cardInner.classList.remove('rotate-y-180');
                }
            }

            // For team members, only toggle on click for both mobile and desktop
            card.addEventListener('click', toggleCard);
        });
    }

    handleTeamMemberInteraction(teamMembers);

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

    // Update project links based on language
    const projectLinks = {
        'soulseedfestival': {
            en: '/projects/soulseedfestival.html',
            tr: '/projects/soulseedfestivaltr.html'
        },
        'listforge': {
            en: '/projects/listforge.html',
            tr: '/projects/listforgetr.html'
        },
        'harman': {
            en: '/projects/harman.html',
            tr: '/projects/harmantr.html'
        },
        'coflow': {
            en: '/projects/coflow.html',
            tr: '/projects/coflowtr.html'
        },
        'dimmak': {
            en: '/projects/dimmak.html',
            tr: '/projects/dimmaktr.html'
        },
        'semayoga': {
            en: '/projects/semayoga.html',
            tr: '/projects/semayogatr.html'
        }
    };

    // Update all project links using data attributes
    Object.keys(projectLinks).forEach(project => {
        const links = document.querySelectorAll(`a[data-project="${project}"]`);
        console.log(`Found ${links.length} links for project: ${project}`); // Debug log
        
        links.forEach(link => {
            const newHref = projectLinks[project][currentLang];
            console.log(`Updating ${project} link to ${newHref}`); // Debug log
            link.setAttribute('href', newHref);
        });
    });

    document.documentElement.lang = currentLang;
}

function toggleLanguage() {
    console.log('Toggle language clicked - current language:', currentLang); // Debug log
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    console.log('Language changed to:', currentLang); // Debug log
    localStorage.setItem('preferredLanguage', currentLang);
    updateLanguageDisplay();
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        currentLang = storedLang;
    }
    
    // Update the display immediately
    updateLanguageDisplay();
    
    const languageToggle = document.getElementById('language-toggle');
    console.log('Found language toggle button:', languageToggle); // Debug log
    
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
});