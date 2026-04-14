// Language Management
let currentLang = 'ar';

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const body = document.body;
    const langText = document.getElementById('lang-text');
    
    if (currentLang === 'en') {
        body.classList.add('ltr');
        body.setAttribute('dir', 'ltr');
        body.setAttribute('lang', 'en');
        langText.textContent = 'العربية';
    } else {
        body.classList.remove('ltr');
        body.setAttribute('dir', 'rtl');
        body.setAttribute('lang', 'ar');
        langText.textContent = 'English';
    }
    
    updateContent();
    saveLanguagePreference();
}

function updateContent() {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    
    // Update placeholders
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(input => {
        const arPlaceholder = input.getAttribute('data-ar-placeholder') || input.placeholder;
        const enPlaceholder = input.getAttribute('data-en-placeholder') || input.placeholder;
        
        if (!input.getAttribute('data-ar-placeholder')) {
            input.setAttribute('data-ar-placeholder', arPlaceholder);
            input.setAttribute('data-en-placeholder', enPlaceholder);
        }
        
        input.placeholder = currentLang === 'ar' ? arPlaceholder : enPlaceholder;
    });
}

function saveLanguagePreference() {
    localStorage.setItem('preferred-language', currentLang);
}

function loadLanguagePreference() {
    const saved = localStorage.getItem('preferred-language');
    if (saved && saved !== currentLang) {
        toggleLanguage();
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
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

// Observe all cards and features
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    
    const animatedElements = document.querySelectorAll('.course-card, .feature, .about-text, .about-image, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Form Submissions
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.');
    e.target.reset();
});

document.querySelector('.newsletter').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!');
    e.target.reset();
});

// Course Enrollment Buttons
document.querySelectorAll('.course-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseName = e.target.closest('.course-card').querySelector('h3').textContent;
        alert(currentLang === 'ar' 
            ? `سيتم تحويلك لصفحة التسجيل في: ${courseName}` 
            : `You will be redirected to enrollment page for: ${courseName}`);
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
    });
});
