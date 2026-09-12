/**
 * Particle System for Supernova Browser
 * Creates animated white particles on grey background
 */

class ParticleSystem {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.particles = [];
        this.particleCount = 50;
        this.animationId = null;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    createParticles() {
        // Clear existing particles
        this.particles = [];
        this.container.innerHTML = '';

        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            this.particles.push(particle);
            this.container.appendChild(particle.element);
        }
    }

    createParticle() {
        const element = document.createElement('div');
        element.className = 'particle';

        const size = Math.random() * 4 + 1;
        element.style.width = size + 'px';
        element.style.height = size + 'px';

        const particle = {
            element: element,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            opacity: Math.random() * 0.5 + 0.3,
            life: Math.random() * 100 + 50
        };

        this.updateParticlePosition(particle);
        return particle;
    }

    updateParticlePosition(particle) {
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.opacity = particle.opacity;
    }

    animate = () => {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply slight gravity
            particle.vy += 0.01;

            // Bounce off walls
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
            }

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(particle.x, window.innerWidth));
            particle.y = Math.max(0, Math.min(particle.y, window.innerHeight));

            // Update opacity with sine wave for twinkling effect
            particle.life -= 1;
            if (particle.life <= 0) {
                particle.life = Math.random() * 100 + 50;
                particle.opacity = Math.random() * 0.5 + 0.3;
            }

            particle.opacity = Math.max(0.1, particle.opacity + Math.sin(Date.now() * 0.005 + index) * 0.005);

            this.updateParticlePosition(particle);
        });

        this.animationId = requestAnimationFrame(this.animate);
    };

    handleResize() {
        const containerRect = this.container.getBoundingClientRect();
        this.particles.forEach(particle => {
            if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth;
                particle.vx *= -1;
            }
            if (particle.y > window.innerHeight) {
                particle.y = window.innerHeight;
                particle.vy *= -1;
            }
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles = [];
        this.container.innerHTML = '';
    }
}

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem('.particle-background');
    console.log('Particle system initialized with', particleSystem.particleCount, 'particles');
});

// Particle interaction (optional enhancement)
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        // Particles could respond to mouse, but keeping it subtle for performance
    });
}