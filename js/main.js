// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('fade-out');
});

// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    const icon = darkModeToggle.querySelector('i');
    const applyDark = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('darkMode', isDark);
    };
    applyDark(localStorage.getItem('darkMode') === 'true');
    darkModeToggle.addEventListener('click', () => applyDark(!document.body.classList.contains('dark-mode')));
}

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// Counter Animation (on pages with .counter)
document.querySelectorAll('.counter').forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(counter);
});

// News Modals
document.querySelectorAll('.read-more').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'flex';
    });
});
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) e.target.style.display = 'none';
});

// Lightbox (Gallery)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        if (lightbox && lightboxImg) {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        }
    });
});
if (closeLightbox) {
    closeLightbox.addEventListener('click', () => { if (lightbox) lightbox.style.display = 'none'; });
    lightbox?.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) lightbox.style.display = 'none';
    });
}

// Countdown (News page)
const countDownDate = new Date("Aug 15, 2026 08:00:00").getTime();
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    if (distance < 0) { clearInterval(countdownInterval); return; }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}, 1000);

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const status = document.getElementById('form-status');
        if (!name || !email || !message) {
            status.innerHTML = '<span style="color: red;">All fields are required.</span>';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            status.innerHTML = '<span style="color: red;">Invalid email address.</span>';
            return;
        }
        status.innerHTML = '<span style="color: green;">Message sent successfully!</span>';
        contactForm.reset();
        setTimeout(() => status.innerHTML = '', 3000);
    });
}

// Newsletter
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    });
}

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (backToTop) backToTop.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));