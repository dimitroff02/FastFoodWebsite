// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
}

function toggleMobileMenu() {
    if (navMenu) navMenu.classList.toggle('active');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Автоматично затваряне на менюто при resize към десктоп
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
// Добавена проверка за href == "#"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Скрипт за показване и скриване на модалния прозорец с телефони
// Взимаме бутона, модалния прозорец и бутона за затваряне
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const closeCallModal = document.getElementById('closeCallModal');

// Когато се натисне бутона 'Обадете се', показваме модалния прозорец
if (callBtn && callModal) {
    callBtn.addEventListener('click', function() {
        callModal.style.display = 'flex';
    });
}

// Когато се натисне X, скриваме модалния прозорец
if (closeCallModal && callModal) {
    closeCallModal.addEventListener('click', function() {
        callModal.style.display = 'none';
    });
}

// Ако се кликне извън съдържанието на модала, също го скриваме
window.addEventListener('click', function(event) {
    if (event.target === callModal) {
        callModal.style.display = 'none';
    }
});

// Обяснение:
// - Когато натиснете бутона, модалният прозорец се появява (display: flex).
// - Когато натиснете X или кликнете извън прозореца, той се скрива (display: none).

// Функция за следене на активната секция и обновяване на навигацията
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Отстъп за навигацията
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Премахваме активния клас от всички линкове
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Добавяме активния клас на текущия линк
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Добавяме слушател за скролване
window.addEventListener('scroll', updateActiveNavLink);

// Извикваме функцията веднъж при зареждане на страницата
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Обновяваме активния линк при кликване
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        // Премахваме активния клас от всички линкове
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        // Добавяме активния клас на кликнатия линк веднага
        this.classList.add('active');
        
        // След кратка пауза позволяваме на скролването да продължи да следва активната секция
        setTimeout(() => {
            // Включваме обратно следенето на скрола след 1 секунда
            window.addEventListener('scroll', updateActiveNavLink);
        }, 1000);
        
        // Временно изключваме следенето на скрола
        window.removeEventListener('scroll', updateActiveNavLink);
    });
});

// Функция за следене на позицията на floating бутона и спиране му над футъра
function updateCallButtonPosition() {
    const callBtn = document.getElementById('callBtn');
    const footer = document.querySelector('.footer');
    
    if (!callBtn || !footer) return;
    
    const footerTop = footer.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    // Ако скролът е близо до футъра
    if (scrollPosition >= footerTop) {
        // Спираме бутона точно над футъра
        callBtn.style.position = 'absolute';
        callBtn.style.top = (footerTop - 80) + 'px';
        callBtn.style.bottom = 'auto';
    } else {
        // Връщаме бутона към нормалната floating позиция
        callBtn.style.position = 'fixed';
        callBtn.style.top = 'auto';
        callBtn.style.bottom = '20px';
    }
}

// Добавяме слушател за скролване за бутона
window.addEventListener('scroll', updateCallButtonPosition);

// Извикваме функцията веднъж при зареждане на страницата
document.addEventListener('DOMContentLoaded', updateCallButtonPosition); 

// Добавям слушател за бутона до hamburger менюто на мобилна версия
const navCallBtnMobile = document.getElementById('navCallBtnMobile');
if (navCallBtnMobile && callModal) {
    navCallBtnMobile.addEventListener('click', function() {
        callModal.style.display = 'flex';
    });
} 