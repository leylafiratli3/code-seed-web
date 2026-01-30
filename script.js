console.log('Script loaded');
let currentLang = 'en';

// Project cards and Tech Grid
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

    // Services tabs functionality
    function initServiceTabs() {
        const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
        const servicePanels = document.querySelectorAll('.service-panel');

        if (serviceTabBtns.length > 0 && servicePanels.length > 0) {
            serviceTabBtns.forEach((btn) => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const targetService = this.getAttribute('data-service');

                    if (!targetService) return;

                    // Get fresh references to ensure we have all elements
                    const allBtns = document.querySelectorAll('.service-tab-btn');
                    const allPanels = document.querySelectorAll('.service-panel');

                    // Remove active class from all buttons
                    allBtns.forEach(b => {
                        b.classList.remove('active');
                    });

                    // Add active class to clicked button
                    this.classList.add('active');

                    // Hide all panels using both hidden class and display style
                    allPanels.forEach(panel => {
                        panel.classList.add('hidden');
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    });

                    // Show target panel using both class removal and display style
                    const targetPanel = document.querySelector(`.service-panel[data-panel="${targetService}"]`);
                    if (targetPanel) {
                        targetPanel.classList.remove('hidden');
                        targetPanel.classList.add('active');
                        targetPanel.style.display = 'block';
                    }
                });
            });
        }
    }

    initServiceTabs();

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