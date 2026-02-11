// Efeito de Rolagem da Barra de Navegação (NavBar scroll effect)
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality
function showNotification(message) {
    const notification = document.getElementById('cartNotification');
    const messageElement = document.getElementById('cartMessage');
    
    messageElement.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Contact form submission
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contatoForm);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefone = formData.get('telefone');
    const mensagem = formData.get('mensagem');
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = `Olá! Meu nome é ${nome}.%0A%0AEmail: ${email}%0ATelefone: ${telefone}%0A%0AMensagem: ${mensagem}`;
    const whatsappUrl = `https://wa.me/5521974440502?text=${whatsappMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpar formulário
    contatoForm.reset();
    
    // Mostrar notificação
    showNotification('Redirecionando para o WhatsApp...');
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.feature-card, .produto-card, .depoimento-card, .info-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isPercentage = target === 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isPercentage ? '100%' : target + '+';
            clearInterval(timer);
        } else {
            element.textContent = isPercentage 
                ? Math.floor(current) + '%' 
                : Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    animateCounter(stat, 100);
                } else if (text.includes('5000')) {
                    animateCounter(stat, 5000);
                } else if (text.includes('15')) {
                    animateCounter(stat, 15);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const sobreStats = document.querySelector('.sobre-stats');
if (sobreStats) {
    statsObserver.observe(sobreStats);
}

// Add hover effect to produto cards
const produtoCards = document.querySelectorAll('.produto-card');
produtoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Dynamic year in footer
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
}

// Product filtering (can be enhanced later)
function filterProducts(category) {
    const products = document.querySelectorAll('.produto-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 10);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(30px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    const buttons = document.querySelectorAll('.btn, .btn-add');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Console welcome message
console.log('%c🍋 Negão do Suco Natural', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cSite desenvolvido com ❤️', 'font-size: 12px; color: #666;');

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Any additional scroll handlers can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

