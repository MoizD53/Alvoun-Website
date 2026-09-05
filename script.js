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
// CINEMATIC DISTRIBUTION ART (GSAP + ScrollTrigger)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const artDistSection = document.querySelector('.art-dist-scroll');
    if (artDistSection) {
        // Initial setup
        const paths = document.querySelectorAll('.art-path, .art-highlight');
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });

        gsap.set(["#art-title-initial", "#art-label-dahod", ".art-state-label", "#art-hero-stat", "#art-final-text", ".art-dist-nodes", ".art-origin-pulse", ".art-origin-dot", ".art-origin-ambient"], { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".art-dist-scroll",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // 1. Title appears and fades
        tl.to("#art-title-initial", { opacity: 1, duration: 1 })
          .to("#art-title-initial", { opacity: 0, duration: 1, delay: 0.5 });

        // 2. Dahod Origin appears
        tl.to([".art-origin-dot", ".art-origin-ambient"], { opacity: 1, duration: 0.5 })
          .to("#art-label-dahod", { opacity: 1, duration: 0.5 }, "<")
          .to(".art-origin-pulse", { opacity: 1, scale: 2, duration: 1, ease: "power2.out" })
          .to(".art-origin-pulse", { opacity: 0, duration: 0.5 }, "-=0.5");

        // 3. Routes Flow Outwards (Organic)
        tl.to(".art-path", { strokeDashoffset: 0, duration: 3, ease: "power1.inOut", stagger: 0.3 }, "flow")
          .to(".art-highlight", { strokeDashoffset: 0, duration: 3, ease: "power1.inOut", stagger: 0.3 }, "flow+=0.2")
          .to(".art-state-label", { opacity: 1, duration: 1, stagger: 0.3 }, "flow+=1");

        // 4. Distributor Nodes Appear
        tl.to(".art-dist-nodes", { opacity: 1, duration: 1, ease: "power2.inOut" });

        // 5. Hero Statistic
        tl.to("#art-hero-stat", { opacity: 1, y: -20, duration: 1.5 }, "<");

        // 6. Dissolve Network
        tl.to(["#art-hero-stat", ".art-dist-nodes", ".art-state-label", "#art-label-dahod", ".art-path", ".art-highlight", ".art-origin-ambient", ".art-origin-dot"], { opacity: 0, duration: 1.5, delay: 1 });

        // 7. Final Text Sequence
        tl.to("#art-final-text", { opacity: 1, duration: 1 });


        // Subtle 2.5D Parallax Effect
        const container = document.getElementById('art-dist-container');
        const network = document.getElementById('art-network-layer');
        const bg = document.querySelector('.art-dist-bg');
        
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
        
        // Hover interactions for routes
        const regions = ['rj', 'mp', 'gj'];
        regions.forEach(r => {
            const region = document.getElementById('region-' + r);
            const path = document.getElementById('path-' + r);
            const hl = document.getElementById('hl-' + r);
            if(region && path) {
                region.addEventListener('mouseenter', () => {
                    gsap.to([path, hl], { opacity: 1, strokeWidth: 3, duration: 0.3 });
                });
                region.addEventListener('mouseleave', () => {
                    gsap.to([path, hl], { opacity: 0.4, strokeWidth: 1.5, duration: 0.3 }); // hl opacity goes to 0.4, path fill is from CSS
                });
            }
        });
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
