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
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Show first testimonial and start rotation
    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
});

// Simple form submission (you'll need to implement server-side handling)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to your server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});