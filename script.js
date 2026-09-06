document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll reveals
    const revealElements = document.querySelectorAll('.reveal, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Simple Parallax Effect for Images
    const parallaxImages = document.querySelectorAll('.image-parallax img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxImages.forEach(img => {
            const speed = 0.1;
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
// CINEMATIC DISTRIBUTION ART (Permanent Static + Looping Animation)
if (typeof gsap !== 'undefined') {
    const artDistSection = document.querySelector('.art-dist-scroll');
    if (artDistSection) {
        // Prepare paths for continuous drawing
        const paths = document.querySelectorAll('.art-path, .art-highlight');
        paths.forEach(path => {
            const length = path.getTotalLength() || 1000;
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            
            // Loop the drawing animation forever
            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 4,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                stagger: 0.5
            });
        });

        // Pulse the origin
        gsap.to(".art-origin-pulse", {
            scale: 2.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power2.out"
        });

        // Subtle 2.5D Parallax Effect
        const container = document.getElementById('art-dist-container');
        const network = document.getElementById('art-network-layer');
        const bg = document.querySelector('.art-dist-bg');
        
        if (container && network && bg) {
            container.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                
                gsap.to(network, {
                    rotationY: x,
                    rotationX: -y,
                    transformPerspective: 1000,
                    transformOrigin: "center center",
                    ease: "power2.out",
                    duration: 1
                });
                
                gsap.to(bg, {
                    x: -x * 2,
                    y: -y * 2,
                    ease: "power2.out",
                    duration: 1
                });
            });
            
            container.addEventListener('mouseleave', () => {
                gsap.to([network, bg], {
                    rotationY: 0,
                    rotationX: 0,
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                    duration: 1
                });
            });
        }
    }
}

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navbar.classList.toggle('menu-open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
            });
        });
    }
});

// CINEMATIC COLLECTION (GSAP ScrollTrigger)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const cineWrapper = document.querySelector('.cine-collection-wrapper');
    if (cineWrapper) {
        const tlCine = gsap.timeline({
            scrollTrigger: {
                trigger: '.cine-collection-wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: '.cine-pinned-container'
            }
        });

        // Initial setup
        gsap.set(['#cine-intro', '#cine-text-1', '#cine-text-2', '#cine-text-3', '#cine-text-4', '#cine-outro'], { opacity: 0 });
        
        // 0-10%: Intro fades in
        tlCine.to('#cine-intro', { opacity: 1, duration: 1 })
              .to('#cine-intro', { opacity: 0, duration: 1, delay: 0.5 });
              
        // 300ML
        tlCine.to('#bottle-1', { opacity: 1, scale: 1, z: 0, rotationY: 10, duration: 2 }, 'b1')
              .to('#cine-text-1', { opacity: 1, duration: 1 }, 'b1+=0.5')
              .to('#dot-1', { backgroundColor: '#fff', scale: 1.5, duration: 0.5 }, 'b1')
              .to('.cine-particles', { y: '-10%', duration: 2 }, 'b1')
              // Out
              .to('#bottle-1', { opacity: 0, scale: 1.2, z: 100, rotationY: 20, duration: 2 }, 'b1_out')
              .to('#cine-text-1', { opacity: 0, duration: 1 }, 'b1_out')
              .to('#dot-1', { backgroundColor: 'rgba(255,255,255,0.2)', scale: 1, duration: 0.5 }, 'b1_out');

        // 500ML
        tlCine.to('#bottle-2', { opacity: 1, scale: 1, z: 0, rotationY: -10, duration: 2 }, 'b2')
              .to('#cine-text-2', { opacity: 1, duration: 1 }, 'b2+=0.5')
              .to('#dot-2', { backgroundColor: '#fff', scale: 1.5, duration: 0.5 }, 'b2')
              .to('.cine-particles', { y: '-20%', duration: 2 }, 'b2')
              // Out
              .to('#bottle-2', { opacity: 0, scale: 1.2, z: 100, rotationY: -20, duration: 2 }, 'b2_out')
              .to('#cine-text-2', { opacity: 0, duration: 1 }, 'b2_out')
              .to('#dot-2', { backgroundColor: 'rgba(255,255,255,0.2)', scale: 1, duration: 0.5 }, 'b2_out');

        // 1L
        tlCine.to('#bottle-3', { opacity: 1, scale: 1, z: 0, rotationY: 5, duration: 2 }, 'b3')
              .to('#cine-text-3', { opacity: 1, duration: 1 }, 'b3+=0.5')
              .to('#dot-3', { backgroundColor: '#fff', scale: 1.5, duration: 0.5 }, 'b3')
              .to('.cine-particles', { y: '-30%', duration: 2 }, 'b3')
              // Out
              .to('#bottle-3', { opacity: 0, scale: 1.2, z: 100, rotationY: 10, duration: 2 }, 'b3_out')
              .to('#cine-text-3', { opacity: 0, duration: 1 }, 'b3_out')
              .to('#dot-3', { backgroundColor: 'rgba(255,255,255,0.2)', scale: 1, duration: 0.5 }, 'b3_out');

        // ALKALINE
        tlCine.to('#bottle-4', { opacity: 1, scale: 1, z: 0, rotationY: 0, duration: 2 }, 'b4')
              .to('#cine-text-4', { opacity: 1, duration: 1 }, 'b4+=0.5')
              .to('#dot-4', { backgroundColor: '#fff', scale: 1.5, duration: 0.5 }, 'b4')
              .to('.cine-glow', { backgroundColor: 'rgba(51, 153, 255, 0.2)', scale: 1.2, duration: 2 }, 'b4')
              .to('.cine-particles', { y: '-40%', duration: 2 }, 'b4')
              // Out
              .to('#bottle-4', { opacity: 0, scale: 1.2, duration: 2 }, 'b4_out')
              .to('#cine-text-4', { opacity: 0, duration: 1 }, 'b4_out')
              .to('#dot-4', { backgroundColor: 'rgba(255,255,255,0.2)', scale: 1, duration: 0.5 }, 'b4_out');
              
        // Outro
        tlCine.to('#cine-outro', { opacity: 1, duration: 2 });
    }
}

