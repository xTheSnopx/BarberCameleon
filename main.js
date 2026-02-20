// ============ MENU TOGGLE MOBILE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 5, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ============ VIDEO HOVER PLAY ============
document.querySelectorAll('.video-item').forEach(item => {
    const video = item.querySelector('video');
    if (video) {
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
        // Click para pantalla completa
        item.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            }
            video.muted = false;
            video.play();
        });
    }
});

// ============ LIGHTBOX PARA FOTOS ============
// Crear el lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Imagen ampliada">
        <div class="lightbox-nav">
            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    </div>
`;
document.body.appendChild(lightbox);

// Agregar estilos del lightbox
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    #lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    #lightbox.active {
        display: flex;
    }
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 85vh;
        border-radius: 15px;
        box-shadow: 0 0 60px rgba(255, 0, 255, 0.4), 0 0 100px rgba(0, 255, 255, 0.2);
        animation: zoomIn 0.3s ease;
    }
    @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 2.5rem;
        color: #fff;
        cursor: pointer;
        transition: color 0.3s, transform 0.3s;
    }
    .lightbox-close:hover {
        color: #ff00ff;
        transform: rotate(90deg);
    }
    .lightbox-nav {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        pointer-events: none;
    }
    .lightbox-nav button {
        pointer-events: auto;
        background: rgba(0, 255, 255, 0.2);
        border: 2px solid #00ffff;
        color: #00ffff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .lightbox-nav button:hover {
        background: #00ffff;
        color: #000;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
    }
`;
document.head.appendChild(lightboxStyles);

// Funcionalidad del lightbox
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
let currentImageIndex = 0;
let galleryImages = [];

// Obtener todas las fotos
document.querySelectorAll('.foto-item').forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
        galleryImages.push(img.src);
        item.addEventListener('click', () => {
            currentImageIndex = index;
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    }
});

// Cerrar lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Navegación
lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
});

// Teclas de navegación
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// ============ ANIMACIÓN AL SCROLL ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar cards de servicios
document.querySelectorAll('.servicio-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animar items de galería
document.querySelectorAll('.galeria-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Animar items de contacto
document.querySelectorAll('.info-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.5s ease ${index * 0.15}s`;
    observer.observe(item);
});

// ============ EFECTO PARALLAX HERO ============
const heroLogo = document.querySelector('.hero-logo');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroLogo && scrolled < window.innerHeight) {
        heroLogo.style.transform = `translateY(${scrolled * 0.3}px) rotate(${-1 + scrolled * 0.01}deg)`;
    }
});

// ============ CURSOR PERSONALIZADO (opcional) ============
const createCursorTrail = () => {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #ff00ff, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 5}px;
            top: ${e.clientY - 5}px;
            animation: trailFade 0.5s forwards;
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    });

    // Agregar keyframes para el trail
    if (!document.querySelector('#cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.textContent = `
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
};

// Activar solo en desktop
if (window.innerWidth > 768) {
    // createCursorTrail(); // Descomentar para activar
}

// ============ SMOOTH SCROLL PARA ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

console.log('🦎 Barber Camaleón - Website loaded successfully!');
