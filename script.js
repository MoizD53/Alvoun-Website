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

// HERO SECTION 3D SCROLL EFFECT (GSAP ScrollTrigger)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: '+=300%', // 3 steps, 300% scroll
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        const heroBottle = document.getElementById('hero-bottle');
        const heroTexts = [
            document.getElementById('hero-text-0'),
            document.getElementById('hero-text-1'),
            document.getElementById('hero-text-2'),
            document.getElementById('hero-text-3')
        ];

        // Intro animation on page load (bottom to top, very big but fully visible)
        gsap.set(heroBottle, { xPercent: -50, yPercent: -50, y: '100vh', scale: 0.5, opacity: 0 });
        gsap.set(heroTexts[0], { opacity: 0, y: 30 });
        
        // When page loads, animate the bottle up and text in
        gsap.to(heroBottle, { y: 0, scale: 1, opacity: 1, duration: 2, ease: "power4.out", delay: 0.2 });
        gsap.to(heroTexts[0], { opacity: 1, y: 0, duration: 1, delay: 1 });

        // Scroll Timeline
        // Step 1: ALVOUN -> H2O (Bottle shrinks and spins 360)
        heroTl.to(heroTexts[0], { opacity: 0, y: -30, duration: 1 }, "step1")
              .to(heroBottle, { scale: 0.6, rotation: 360, y: 0, duration: 2, ease: "power1.inOut" }, "step1")
              .to(heroTexts[1], { opacity: 1, x: 0, duration: 1 }, "step1+=1");

        // Hold
        heroTl.to({}, { duration: 1 });

        // Step 2: H2O -> EARTH (Bottle spins another 360)
        heroTl.to(heroTexts[1], { opacity: 0, x: -30, duration: 1 }, "step2")
              .to(heroBottle, { scale: 0.6, rotation: 720, duration: 2, ease: "power1.inOut" }, "step2")
              .to(heroTexts[2], { opacity: 1, x: 0, duration: 1 }, "step2+=1");

        // Hold
        heroTl.to({}, { duration: 1 });

        // Step 3: EARTH -> PH LEVEL (Bottle spins another 360)
        heroTl.to(heroTexts[2], { opacity: 0, x: 30, duration: 1 }, "step3")
              .to(heroBottle, { scale: 0.6, rotation: 1080, duration: 2, ease: "power1.inOut" }, "step3")
              .to(heroTexts[3], { opacity: 1, x: 0, duration: 1 }, "step3+=1");

        // Hold final state
        heroTl.to({}, { duration: 1.5 });
    }
}

// 3D CAROUSEL (GSAP ScrollTrigger)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection) {
        const items = gsap.utils.toArray('.carousel-item');
        const texts = gsap.utils.toArray('.c-text');
        const numItems = items.length;
        const angle = 360 / numItems;

        // Initialize positions in 3D space
        gsap.set(items, {
            rotationY: (i) => i * angle,
            transformOrigin: "50% 50% -400px" // Adjust based on CSS media queries if needed, but GSAP takes over here
        });
        
        // Show first text
        gsap.set(texts[0], { opacity: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.carousel-section',
                start: 'top top',
                end: '+=400%', // 400% of viewport height creates a long scrolling experience
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // Create the rotation animation
        // We rotate the entire stage, or just the items?
        // Since we set transformOrigin, we can just rotate each item by -360 over the timeline
        tl.to(items, {
            rotationY: "-=360",
            ease: "none",
            duration: 1
        }, 0);

                // Synchronize text opacity
        const step = 1 / numItems;
        
        texts.forEach((text, i) => {
            if (i !== 0) gsap.set(text, { opacity: 0 });
            
            // i=0: active 0 to 0.125, then fades out, active again at 0.875 to 1
            // i=1: active 0.25
            // i=2: active 0.5
            // i=3: active 0.75
            
            let center = i * step;
            
            if (i === 0) {
                tl.to(texts[0], { opacity: 0, duration: 0.05 }, step/2);
                tl.to(texts[0], { opacity: 1, duration: 0.05 }, 1 - step/2);
            } else {
                tl.to(texts[i], { opacity: 1, duration: 0.05 }, center - step/2);
                tl.to(texts[i], { opacity: 0, duration: 0.05 }, center + step/2);
            }
        });
    }
}
