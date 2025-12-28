function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Create star field background
function createStarField() {
    const starsContainer = document.getElementById("stars-background");
    if (!starsContainer) return;
    
    const numStars = 150;
    
    // Create nebula effects
    const nebula1 = document.createElement("div");
    nebula1.className = "nebula nebula-1";
    starsContainer.appendChild(nebula1);
    
    const nebula2 = document.createElement("div");
    nebula2.className = "nebula nebula-2";
    starsContainer.appendChild(nebula2);
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        const size = Math.random();
        if (size < 0.3) {
            star.className = "star small";
        } else if (size < 0.7) {
            star.className = "star medium";
        } else {
            star.className = "star large";
        }
        
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.animationDuration = (Math.random() * 2 + 2) + "s";
        
        starsContainer.appendChild(star);
    }
}

// Animate launch counter numbers with easing
function animateCounter(elementId, targetValue, suffix = "") {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.floor(targetValue * eased);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue + suffix;
            // Add a subtle pulse effect when complete
            element.style.animation = "numberComplete 0.5s ease-out";
        }
    }
    
    updateCounter();
}

// Initialize launch counters
function initLaunchCounters() {
    // Set realistic values based on resume experience
    animateCounter("experience-count", 2, "+"); // Years of Data Engineering experience
    animateCounter("pipelines-count", 5, "+"); // Production pipelines deployed
    animateCounter("team-count", 10, "+"); // From resume: "led cross-functional team of 10+ engineers"
    animateCounter("turns-count", 100, "+"); // Personal touch: snowboarding 360s!
}

// Enhanced parallax scrolling effect (only for background)
function initParallax() {
    const starsBackground = document.getElementById("stars-background");
    if (!starsBackground) return;
    
    let ticking = false;
    
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.2; // Reduced for smoother effect
                starsBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Reveal animations on scroll (optimized for smooth transitions)
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smoother animations
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "";
                        if (entry.target.classList.contains("timeline-item")) {
                            entry.target.classList.add("visible");
                        }
                    }, index * 100); // Reduced stagger for smoother feel
                });
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll(".timeline-item").forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-30px)";
        item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(item);
    });
    
    // Observe project cards
    document.querySelectorAll(".color-container").forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Don't animate sections themselves - let them scroll naturally
    // Only animate child elements
}

// Add orbital animation to skill icons
function initOrbitalIcons() {
    const icons = document.querySelectorAll("#telemetry .icon");
    icons.forEach((icon, index) => {
        icon.classList.add("orbital-icon");
        icon.style.animationDelay = (index * 0.5) + "s";
    });
}

// Add typing effect to title
function initTypingEffect() {
    const title = document.querySelector("#profile .title");
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = "";
    title.style.opacity = "1";
    
    let index = 0;
    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            // Add cursor blink effect
            const cursor = document.createElement("span");
            cursor.textContent = "|";
            cursor.style.animation = "blink 1s infinite";
            title.appendChild(cursor);
        }
    }
    
    setTimeout(type, 500);
}

// Add smooth scroll behavior with better performance
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Calculate offset for sidebar
                const offset = window.innerWidth > 1200 ? 200 : 0;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Improve native smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Optimize scroll performance
function optimizeScrollPerformance() {
    // Use passive event listeners for better scroll performance
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateOnScroll() {
        // Any scroll-based updates here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    createStarField();
    initLaunchCounters();
    initParallax();
    initScrollReveal();
    initOrbitalIcons();
    initTypingEffect();
    initSmoothScroll();
    optimizeScrollPerformance();
    
    // Fade in body
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.8s ease-in";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 50);
});