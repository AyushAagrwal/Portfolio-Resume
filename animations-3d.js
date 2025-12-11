// ==================== 3D ANIMATION SYSTEM ====================
// Enhanced 3D scroll animations with perspective, rotate, fade, and scale

// Set up perspective for 3D transforms
document.querySelectorAll('.section').forEach(section => {
    section.style.perspective = '1000px';
    section.style.transformStyle = 'preserve-3d';
});

// ==================== SCROLL DIRECTION DETECTION ====================
let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
});

// ==================== 3D SCROLL OBSERVER WITH FADE & SCALE ====================
const animatedElements = new Set();

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scroll3DObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;

        if (entry.isIntersecting && scrollDirection === 'down') {
            // Element entering viewport while scrolling down
            if (!animatedElements.has(element)) {
                animatedElements.add(element);
                trigger3DAnimation(element, 'enter');
            }
        } else if (!entry.isIntersecting && scrollDirection === 'up' && animatedElements.has(element)) {
            // Element leaving viewport while scrolling up
            trigger3DAnimation(element, 'exit');
        }
    });
}, observerOptions);

function trigger3DAnimation(element, direction) {
    const isEnter = direction === 'enter';

    // Get animation type from data attribute or use default
    const animType = element.getAttribute('data-3d-anim') || 'default';

    switch (animType) {
        case 'rotate-x':
            // 3D rotation on X axis with scale and fade
            anime({
                targets: element,
                rotateX: isEnter ? ['-90deg', '0deg'] : ['0deg', '-90deg'],
                scale: isEnter ? [0.5, 1] : [1, 0.5],
                opacity: isEnter ? [0, 1] : [1, 0],
                translateZ: isEnter ? [-200, 0] : [0, -200],
                duration: 1200,
                easing: 'easeOutExpo'
            });
            break;

        case 'rotate-y':
            // 3D rotation on Y axis with scale and fade
            anime({
                targets: element,
                rotateY: isEnter ? ['90deg', '0deg'] : ['0deg', '90deg'],
                scale: isEnter ? [0.3, 1] : [1, 0.3],
                opacity: isEnter ? [0, 1] : [1, 0],
                translateZ: isEnter ? [-300, 0] : [0, -300],
                duration: 1400,
                easing: 'easeOutExpo'
            });
            break;

        case 'rotate-z':
            // 3D rotation on Z axis (spinning) with scale and fade
            anime({
                targets: element,
                rotate: isEnter ? ['180deg', '0deg'] : ['0deg', '180deg'],
                scale: isEnter ? [0, 1] : [1, 0],
                opacity: isEnter ? [0, 1] : [1, 0],
                duration: 1200,
                easing: 'easeOutElastic(1, .6)'
            });
            break;

        case 'cube-rotate':
            // Complex 3D cube rotation
            anime({
                targets: element,
                rotateX: isEnter ? ['-45deg', '0deg'] : ['0deg', '45deg'],
                rotateY: isEnter ? ['45deg', '0deg'] : ['0deg', '-45deg'],
                scale: isEnter ? [0.4, 1] : [1, 0.4],
                opacity: isEnter ? [0, 1] : [1, 0],
                translateZ: isEnter ? [-400, 0] : [0, -400],
                duration: 1600,
                easing: 'easeOutExpo'
            });
            break;

        case 'flip-in':
            // Card flip effect
            anime({
                targets: element,
                rotateY: isEnter ? ['180deg', '0deg'] : ['0deg', '180deg'],
                scale: isEnter ? [0.5, 1] : [1, 0.5],
                opacity: isEnter ? [0, 1] : [1, 0],
                duration: 1200,
                easing: 'easeOutExpo'
            });
            break;

        case 'zoom-3d':
            // 3D zoom with depth
            anime({
                targets: element,
                scale: isEnter ? [0.2, 1] : [1, 0.2],
                translateZ: isEnter ? [-500, 0] : [0, -500],
                opacity: isEnter ? [0, 1] : [1, 0],
                rotateX: isEnter ? ['15deg', '0deg'] : ['0deg', '15deg'],
                duration: 1400,
                easing: 'easeOutExpo'
            });
            break;

        case 'slide-3d-left':
            // 3D slide from left with rotation
            anime({
                targets: element,
                translateX: isEnter ? [-500, 0] : [0, -500],
                translateZ: isEnter ? [-200, 0] : [0, -200],
                rotateY: isEnter ? ['45deg', '0deg'] : ['0deg', '45deg'],
                scale: isEnter ? [0.7, 1] : [1, 0.7],
                opacity: isEnter ? [0, 1] : [1, 0],
                duration: 1300,
                easing: 'easeOutExpo'
            });
            break;

        case 'slide-3d-right':
            // 3D slide from right with rotation
            anime({
                targets: element,
                translateX: isEnter ? [500, 0] : [0, 500],
                translateZ: isEnter ? [-200, 0] : [0, -200],
                rotateY: isEnter ? ['-45deg', '0deg'] : ['0deg', '-45deg'],
                scale: isEnter ? [0.7, 1] : [1, 0.7],
                opacity: isEnter ? [0, 1] : [1, 0],
                duration: 1300,
                easing: 'easeOutExpo'
            });
            break;

        case 'perspective-zoom':
            // Perspective depth zoom
            anime({
                targets: element,
                scale: isEnter ? [0.1, 1] : [1, 0.1],
                translateZ: isEnter ? [-1000, 0] : [0, -1000],
                rotateX: isEnter ? ['30deg', '0deg'] : ['0deg', '30deg'],
                rotateY: isEnter ? ['-30deg', '0deg'] : ['0deg', '-30deg'],
                opacity: isEnter ? [0, 1] : [1, 0],
                duration: 1800,
                easing: 'easeOutExpo'
            });
            break;

        case 'spiral':
            // Spiral rotation effect
            anime({
                targets: element,
                rotate: isEnter ? ['360deg', '0deg'] : ['0deg', '360deg'],
                scale: isEnter ? [0, 1] : [1, 0],
                translateZ: isEnter ? [-600, 0] : [0, -600],
                opacity: isEnter ? [0, 1] : [1, 0],
                duration: 1600,
                easing: 'easeOutElastic(1, .6)'
            });
            break;

        default: // 'default' - simple fade and scale
            anime({
                targets: element,
                scale: isEnter ? [0.5, 1] : [1, 0.5],
                opacity: isEnter ? [0, 1] : [1, 0],
                translateZ: isEnter ? [-100, 0] : [0, -100],
                duration: 1000,
                easing: 'easeOutExpo'
            });
    }
}

// Observe all elements with 3D scroll animations
const scroll3DElements = document.querySelectorAll('[data-3d-scroll]');
scroll3DElements.forEach(el => {
    scroll3DObserver.observe(el);
});
