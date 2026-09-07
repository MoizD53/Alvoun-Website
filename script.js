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

// PREMIUM COLLECTION (GSAP ScrollTrigger)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const collectionSection = document.querySelector('.collection-section');
    if (collectionSection) {
        // Timeline with pinning
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.collection-section',
                start: 'top top',
                end: '+=400%', // 400% of viewport height creates a long scrolling experience
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // Initialize elements
        const bottles = [
            document.getElementById('col-bottle-1'),
            document.getElementById('col-bottle-2'),
            document.getElementById('col-bottle-3'),
            document.getElementById('col-bottle-4')
        ];
        
        const texts = [
            document.getElementById('col-text-1'),
            document.getElementById('col-text-2'),
            document.getElementById('col-text-3'),
            document.getElementById('col-text-4')
        ];
        
        const progItems = [
            document.getElementById('prog-1'),
            document.getElementById('prog-2'),
            document.getElementById('prog-3'),
            document.getElementById('prog-4')
        ];
        
        const progDots = [
            document.getElementById('pdot-1'),
            document.getElementById('pdot-2'),
            document.getElementById('pdot-3')
        ];
        
        const mProgs = [
            document.getElementById('mprog-1'),
            document.getElementById('mprog-2'),
            document.getElementById('mprog-3'),
            document.getElementById('mprog-4')
        ];

        const intro = document.getElementById('col-intro');
        const outro = document.getElementById('col-outro');

        // Set initial states
        gsap.set(bottles, { opacity: 0, scale: 1, z: 0, rotationY: 0, rotation: 0 });
        gsap.set(texts, { opacity: 0, y: 30, filter: 'blur(5px)' });
        gsap.set(intro, { opacity: 1, y: 0, filter: 'blur(0px)' });
        gsap.set(outro, { opacity: 0, y: 30, filter: 'blur(5px)' });

        // 0-10% Intro fades out, Bottle 1 fades in from distance
        tl.to(intro, { opacity: 0, y: -30, filter: 'blur(5px)', duration: 1 }, "intro_out")
          .set(bottles[0], { z: -300, opacity: 0 }, "intro_out")
          .to(bottles[0], { opacity: 1, z: 0, duration: 1.5, ease: "power2.out" }, "intro_out+=0.5")
          .to(texts[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, "intro_out+=1");
          
        if(progItems[0]) tl.to(progItems[0], { opacity: 1, duration: 0.5 }, "intro_out+=1");
        if(progDots[0]) tl.to(progDots[0], { backgroundColor: '#fff', duration: 0.5 }, "intro_out+=1");

        // Keep Bottle 1 stable for a bit
        tl.to({}, { duration: 1 });

        // Transition 1: 300ML -> 500ML
        tl.to(texts[0], { opacity: 0, y: -30, filter: 'blur(5px)', duration: 1 }, "trans1")
          // Pop Out (comes out like a 3d object)
          .to(bottles[0], { scale: 1.8, rotationY: 25, duration: 1.5, ease: "power1.inOut" }, "trans1")
          // Go Back In & Fade out
          .to(bottles[0], { scale: 1, rotationY: 0, opacity: 0, duration: 1.5, ease: "power1.inOut" }, "trans1+=1.5")
          // Incoming Bottle starts popped out, goes in while fading in
          .set(bottles[1], { scale: 1.8, rotationY: 25, opacity: 0 }, "trans1+=1.5")
          .to(bottles[1], { scale: 1, rotationY: 0, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "trans1+=1.5")
          // New text
          .to(texts[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, "trans1+=2.5");
          
        if(progItems[0]) tl.to(progItems[0], { opacity: 0.3, duration: 0.5 }, "trans1");
        if(progDots[0]) tl.to(progDots[0], { backgroundColor: 'transparent', duration: 0.5 }, "trans1");
        if(progItems[1]) tl.to(progItems[1], { opacity: 1, duration: 0.5 }, "trans1+=2.5");
        if(progDots[1]) tl.to(progDots[1], { backgroundColor: '#fff', duration: 0.5 }, "trans1+=2.5");
        if(mProgs[0]) tl.to(mProgs[0], { opacity: 0, duration: 0.5 }, "trans1");
        if(mProgs[1]) tl.to(mProgs[1], { opacity: 1, duration: 0.5 }, "trans1+=2.5");

        // Keep Bottle 2 stable
        tl.to({}, { duration: 1 });

        // Transition 2: 500ML -> 1L
        tl.to(texts[1], { opacity: 0, y: -30, filter: 'blur(5px)', duration: 1 }, "trans2")
          .to(bottles[1], { scale: 1.8, rotationY: 25, duration: 1.5, ease: "power1.inOut" }, "trans2")
          .to(bottles[1], { scale: 1, rotationY: 0, opacity: 0, duration: 1.5, ease: "power1.inOut" }, "trans2+=1.5")
          .set(bottles[2], { scale: 1.8, rotationY: 25, opacity: 0 }, "trans2+=1.5")
          .to(bottles[2], { scale: 1, rotationY: 0, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "trans2+=1.5")
          .to(texts[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, "trans2+=2.5");
          
        if(progItems[1]) tl.to(progItems[1], { opacity: 0.3, duration: 0.5 }, "trans2");
        if(progDots[1]) tl.to(progDots[1], { backgroundColor: 'transparent', duration: 0.5 }, "trans2");
        if(progItems[2]) tl.to(progItems[2], { opacity: 1, duration: 0.5 }, "trans2+=2.5");
        if(progDots[2]) tl.to(progDots[2], { backgroundColor: '#fff', duration: 0.5 }, "trans2+=2.5");
        if(mProgs[1]) tl.to(mProgs[1], { opacity: 0, duration: 0.5 }, "trans2");
        if(mProgs[2]) tl.to(mProgs[2], { opacity: 1, duration: 0.5 }, "trans2+=2.5");

        // Keep Bottle 3 stable
        tl.to({}, { duration: 1 });

        // Transition 3: 1L -> ALKALINE
        tl.to(texts[2], { opacity: 0, y: -30, filter: 'blur(5px)', duration: 1 }, "trans3")
          .to(bottles[2], { scale: 1.8, rotationY: 25, duration: 1.5, ease: "power1.inOut" }, "trans3")
          .to(bottles[2], { scale: 1, rotationY: 0, opacity: 0, duration: 1.5, ease: "power1.inOut" }, "trans3+=1.5")
          .set(bottles[3], { scale: 1.8, rotationY: 25, opacity: 0 }, "trans3+=1.5")
          .to(bottles[3], { scale: 1, rotationY: 0, opacity: 1, duration: 1.5, ease: "power1.inOut" }, "trans3+=1.5")
          .to(texts[3], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, "trans3+=2.5");
          
        if(progItems[2]) tl.to(progItems[2], { opacity: 0.3, duration: 0.5 }, "trans3");
        if(progDots[2]) tl.to(progDots[2], { backgroundColor: 'transparent', duration: 0.5 }, "trans3");
        if(progItems[3]) tl.to(progItems[3], { opacity: 1, duration: 0.5 }, "trans3+=2.5");
        if(mProgs[2]) tl.to(mProgs[2], { opacity: 0, duration: 0.5 }, "trans3");
        if(mProgs[3]) tl.to(mProgs[3], { opacity: 1, duration: 0.5 }, "trans3+=2.5");

        // Keep Bottle 4 stable for a bit longer
        tl.to({}, { duration: 1.5 });

        // Final Outro Statement
        tl.to(texts[3], { opacity: 0, y: -30, filter: 'blur(5px)', duration: 1 }, "outro")
          .to(bottles[3], { z: -200, opacity: 0.5, duration: 2, ease: "power2.out" }, "outro")
          .to(outro, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, "outro+=1");
          
        // Hold the final screen
        tl.to({}, { duration: 1.5 });
    }
}

