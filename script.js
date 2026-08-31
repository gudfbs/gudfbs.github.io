document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations (if any fade-in elements exist)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.slide-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 64; // Navbar height is 64px
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scrollspy and Navbar style changes on Scroll
    const sections = document.querySelectorAll('.page-block');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Toggle navbar style on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(97, 87, 234, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
        }

        // Scrollspy logic
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for threshold

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
