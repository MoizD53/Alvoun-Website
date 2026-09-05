document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, .btn, .menu-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
} else if(cursor) {
    cursor.style.display = 'none';
}

// Navbar Scroll Effect
const navbar = document.querySelector('.pill-navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if(menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Reveal Animations
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-up').forEach(el => observer.observe(el));


// GSAP Premium Distribution Scroll Animation
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const distSection = document.querySelector(".dist-scroll-section");
    if(distSection) {
        // Initial setup for stroke animations
        const pathLengths = document.querySelectorAll(".flow-path, .flow-highlight");
        pathLengths.forEach(path => {
            const len = path.getTotalLength();
            path.style.strokeDasharray = len;
            path.style.strokeDashoffset = len;
        });
        
        // Hide elements
        gsap.set(["#dist-dahod-origin", ".state-label", "#dist-hero-stats", "#dist-final", ".dist-nodes", ".dahod-node"], { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".dist-scroll-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // 0-15%: Title appears then fades
        tl.to("#dist-title-start", { opacity: 1, duration: 1 })
          .to("#dist-title-start", { opacity: 0, duration: 1, delay: 0.5 });

        // 15-25%: Dahod appears
        tl.to(".dahod-node", { opacity: 1, duration: 0.5 })
          .to(".dahod-pulse", { opacity: 1, scale: 1.5, duration: 1, ease: "power2.out" }, "<")
          .to("#dist-dahod-origin", { opacity: 1, duration: 0.5 }, "-=0.5");

        // 25-50%: Routes flow out organically
        tl.to(".flow-path", { strokeDashoffset: 0, duration: 3, ease: "power1.inOut", stagger: 0.5 }, "flow")
          .to(".flow-highlight", { strokeDashoffset: 0, duration: 3, ease: "power1.inOut", stagger: 0.5 }, "flow+=0.2")
          .to(".state-label", { opacity: 1, duration: 1, stagger: 0.5 }, "flow+=1");

        // 50-70%: Nodes and Hero Stat
        tl.to(".dist-nodes", { opacity: 1, duration: 1, ease: "power1.inOut" })
          .to("#dist-hero-stats", { opacity: 1, y: -20, duration: 1.5 }, "<");

        // 70-85%: Dissolve network
        tl.to(["#dist-hero-stats", ".dist-nodes", ".state-label", "#dist-dahod-origin", ".flow-path", ".flow-highlight", ".dahod-pulse", ".dahod-node"], { opacity: 0, duration: 1.5, delay: 1 });

        // 85-100%: Final frame
        tl.to("#dist-final", { opacity: 1, duration: 1 });