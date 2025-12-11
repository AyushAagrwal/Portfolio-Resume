// Wait for DOM and anime.js to load
document.addEventListener('DOMContentLoaded', () => {

    // ==================== CUSTOM CURSOR ====================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.9;
        cursorY += (mouseY - cursorY) * 0.9;
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            anime({ targets: cursor, scale: 1.5, duration: 300, easing: 'easeOutCubic' });
            anime({ targets: cursorFollower, scale: 1.8, duration: 300, easing: 'easeOutCubic' });
        });
        el.addEventListener('mouseleave', () => {
            anime({ targets: cursor, scale: 1, duration: 300, easing: 'easeOutCubic' });
            anime({ targets: cursorFollower, scale: 1, duration: 300, easing: 'easeOutCubic' });
        });
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== MOBILE MENU ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        anime({
            targets: hamburger.children,
            rotate: navMenu.classList.contains('active') ? 45 : 0,
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ==================== HERO SECTION ANIMATIONS ====================
    anime({
        targets: '#hero-img',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
        delay: 300
    });

    anime({
        targets: '#hero-img',
        translateY: [-10, 10],
        duration: 3000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        delay: 1500
    });

    anime({
        targets: '.greeting-word',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(150, { start: 500 }),
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.subtitle-line',
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(200, { start: 1200 }),
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-cta',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 2000,
        easing: 'easeOutElastic(1, .6)'
    });

    const floatingShapes = document.querySelectorAll('.floating-shape');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        floatingShapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ==================== 3D SCROLL ANIMATIONS - FIXED ====================
    // Set perspective for 3D effects
    document.querySelectorAll('.section').forEach(section => {
        section.style.perspective = '1500px';
        section.style.transformStyle = 'preserve-3d';
    });

    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    });

    const animatedElements = new Set();

    // MAIN SCROLL OBSERVER - Animate in ONCE, stay visible
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;

            // Only animate IN when scrolling down, ONCE per element
            if (entry.isIntersecting && scrollDirection === 'down') {
                if (!animatedElements.has(element)) {
                    animatedElements.add(element);

                    // Animate element in with 3D effect
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        scale: [0.7, 1],
                        rotateX: ['-15deg', '0deg'],
                        translateZ: [-100, 0],
                        rotateY: ['10deg', '0deg'],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
            }
            // NO scroll-up animation - elements stay visible after animating in
        });
    }, {
        threshold: 0.05,
        rootMargin: '100px 0px 100px 0px'
    });

    // Apply animations to all scrollable elements
    document.querySelectorAll('[data-scroll]').forEach(el => {
        scrollObserver.observe(el);
    });

    // Section titles - bigger 3D effect
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && scrollDirection === 'down') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.5, 1],
                        rotateY: ['-45deg', '0deg'],
                        translateZ: [-300, 0],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                }
            });
        }, { threshold: 0.05, rootMargin: '100px' });

        titleObserver.observe(title);
    });

    // Skill cards - spin in 3D
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && scrollDirection === 'down') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.3, 1],
                        rotateY: ['90deg', '0deg'],
                        translateZ: [-400, 0],
                        duration: 1200,
                        delay: index * 150,
                        easing: 'easeOutExpo'
                    });

                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        anime({
                            targets: progressBar,
                            width: [`0%`, `${progress}%`],
                            duration: 1200,
                            delay: 600,
                            easing: 'easeOutExpo'
                        });
                    }
                }
            });
        }, { threshold: 0.05, rootMargin: '100px' });

        cardObserver.observe(card);
    });

    // Project cards - flip effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && scrollDirection === 'down') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.4, 1],
                        rotateX: ['45deg', '0deg'],
                        translateZ: [-250, 0],
                        duration: 1000,
                        delay: index * 100,
                        easing: 'easeOutExpo'
                    });
                }
            });
        }, { threshold: 0.05, rootMargin: '100px' });

        projectObserver.observe(card);
    });

    // Timeline items - slide 3D
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const isOdd = index % 2 === 0;
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && scrollDirection === 'down') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.6, 1],
                        translateX: [isOdd ? -200 : 200, 0],
                        rotateY: [isOdd ? '25deg' : '-25deg', '0deg'],
                        translateZ: [-150, 0],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });

                    const dot = entry.target.querySelector('.timeline-dot');
                    if (dot) {
                        anime({
                            targets: dot,
                            scale: [0, 1],
                            duration: 500,
                            easing: 'easeOutElastic(1, .8)'
                        });
                    }
                }
            });
        }, { threshold: 0.05, rootMargin: '100px' });

        timelineObserver.observe(item);
    });

    // Education cards - cube rotation
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        const eduObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && scrollDirection === 'down') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.3, 1],
                        rotateX: ['-45deg', '0deg'],
                        rotateY: ['45deg', '0deg'],
                        translateZ: [-350, 0],
                        duration: 1200,
                        delay: index * 200,
                        easing: 'easeOutExpo'
                    });
                }
            });
        }, { threshold: 0.05, rootMargin: '100px' });

        eduObserver.observe(card);
    });

    // Highlight items - zoom 3D
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && scrollDirection === 'down') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.2, 1],
                        translateZ: [-200, 0],
                        rotateX: ['20deg', '0deg'],
                        duration: 900,
                        delay: index * 120,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            });
        }, { threshold: 0.05, rootMargin: '100px' });

        highlightObserver.observe(item);
    });

    // ==================== HOVER EFFECTS ====================
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon');
            if (icon) {
                anime({
                    targets: icon,
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    duration: 600,
                    easing: 'easeOutElastic(1, .6)'
                });
            }
        });
    });

    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        if (image) {
            card.addEventListener('mouseenter', () => {
                anime({ targets: image, scale: 1.1, duration: 600, easing: 'easeOutExpo' });
            });
            card.addEventListener('mouseleave', () => {
                anime({ targets: image, scale: 1, duration: 600, easing: 'easeOutExpo' });
            });
        }
    });

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                anime({
                    targets: contactForm,
                    translateX: [-10, 10, -10, 10, 0],
                    duration: 500,
                    easing: 'easeInOutSine'
                });
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                anime({
                    targets: document.getElementById('email').parentElement,
                    translateX: [-10, 10, -10, 10, 0],
                    duration: 500,
                    easing: 'easeInOutSine'
                });
                return;
            }

            const formGroups = contactForm.querySelectorAll('.form-group');
            const submitBtn = contactForm.querySelector('.submit-btn');

            anime({
                targets: formGroups,
                opacity: 0,
                translateY: -20,
                duration: 400,
                delay: anime.stagger(50),
                easing: 'easeInQuad'
            });

            anime({
                targets: submitBtn,
                opacity: 0,
                scale: 0.8,
                duration: 400,
                delay: 300,
                complete: () => {
                    formSuccess.classList.add('show');
                    setTimeout(() => {
                        formSuccess.classList.remove('show');
                        contactForm.reset();
                        anime({
                            targets: formGroups,
                            opacity: 1,
                            translateY: 0,
                            duration: 400,
                            delay: anime.stagger(50)
                        });
                        anime({
                            targets: submitBtn,
                            opacity: 1,
                            scale: 1,
                            duration: 400
                        });
                    }, 3000);
                }
            });
        });
    }

    // ==================== SOCIAL ICONS ====================
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: icon,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        rotate: ['-180deg', '0deg'],
                        duration: 1000,
                        delay: index * 100,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            });
        }, { threshold: 0.5 });

        iconObserver.observe(icon);

        icon.addEventListener('mouseenter', () => {
            anime({
                targets: icon,
                translateY: [-10, 0],
                rotate: '360deg',
                duration: 600,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                anime({
                    targets: 'html, body',
                    scrollTop: target.offsetTop - 80,
                    duration: 1000,
                    easing: 'easeInOutQuad'
                });
            }
        });
    });

    console.log('🎨 3D Portfolio animations loaded - all bugs fixed!');

}); // End of DOMContentLoaded
