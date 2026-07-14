const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let particles = [];

    // Performance knobs (auto-tuned)
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth <= 768;

    let particleCount = isSmallScreen ? 35 : 60;
    let connectionDistance = isSmallScreen ? 85 : 100;
    let mouseDistance = isSmallScreen ? 120 : 150;

    // Recompute connections less frequently to avoid O(n^2) cost every frame.
    let connectEveryNFrames = isSmallScreen ? 2 : 1;

    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    }, { passive: true });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particleCount = window.innerWidth <= 768 ? 35 : 60;
        connectionDistance = window.innerWidth <= 768 ? 85 : 100;
        mouseDistance = window.innerWidth <= 768 ? 120 : 150;
        connectEveryNFrames = window.innerWidth <= 768 ? 2 : 1;
        init();
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            if (mouse.x != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0 && distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.5;
                    const directionY = forceDirectionY * force * 0.5;
                    this.vx -= directionX;
                    this.vy -= directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 102, 0, 0.6)';

            // Localized glow (avoid leaving shadow state for other draw calls)
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff6600';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    function connect() {
        // O(n^2) connection drawing, reduced by connectEveryNFrames.
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(255, 102, 0, ${opacity * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        if (frame % connectEveryNFrames === 0) connect();
        frame++;
        requestAnimationFrame(animate);
    }

    init();

    if (prefersReducedMotion) {
        // Render a single frame for accessibility.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) particles[i].draw();
        connect();
    } else {
        animate();
    }
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;
    navLinks.classList.toggle('active');
}

// Close mobile menu on nav click (if present)
if (document && document.addEventListener) {
    document.addEventListener('click', (e) => {
        const navLinks = document.getElementById('navLinks');
        const hamburger = document.querySelector('.hamburger');
        if (!navLinks || !navLinks.classList.contains('active')) return;

        const target = e.target;
        const clickedLink = target && target.closest && target.closest('.nav-links a');
        const clickedHamburger = hamburger && (target === hamburger || hamburger.contains(target));

        if (clickedLink && !clickedHamburger) navLinks.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('active');
    });
}

