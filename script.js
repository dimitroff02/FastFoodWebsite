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

// --- Static Reviews Slider ---

document.addEventListener("DOMContentLoaded", function() {
    reviewsData = [
        {
            author_name: "Виктор Тинев",
            rating: 5,
            text: "Отлични бургери и най-вече лично отношение.",
            profile_photo: "ViktorTinev.png"
        },
        {
            author_name: "MAP MASTER",
            rating: 5,
            text: "Най-добрите бургери които сме яли някога, дори и в столицата! Каквото и да си вземете няма да съжалите!",
            profile_photo: "MapMaster.png"
        },
        {
            author_name: "Valentin",
            rating: 5,
            text: "Безспорно най-добрите бургери в града. Месото идва прясно без да е замразявано, което нямя да срещнете на много места. Явно малкото негативни коментари са на дребничка конкуренция. 🤫",
            profile_photo: "Valentin.png"
        },
        {
            author_name: "Irinka Georgieva",
            rating: 5,
            text: "Перфектни! Работа с прецизност! Изключителни продукти! Вкус! Изтънченост!    Бързо обслужване. Препоръчвам! Не пропускайте да опитате тези вкусотии!",
            profile_photo: "Irinka.png"
        },
        {
            author_name: "Mark-Aleks Evtimov",
            rating: 5,
            text: "Бързо, вкусно, любезно, на добри цени.",
            profile_photo: "MarkAleks.png"
        }
    ];
    renderReviewsSlider();
    window.addEventListener('resize', handleResizeReviewsSlider);
});

let reviewsData = [];
let currentIndex = 0;
let isAnimating = false;
let visibleCount = getVisibleReviewsCount();

function getVisibleReviewsCount() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
}

function handleResizeReviewsSlider() {
    const newCount = getVisibleReviewsCount();
    if (newCount !== visibleCount) {
        visibleCount = newCount;
        // Ако currentIndex е извън обхвата, го коригираме
        if (currentIndex > reviewsData.length - visibleCount) {
            currentIndex = Math.max(0, reviewsData.length - visibleCount);
        }
        renderReviewsSlider();
    }
}

function renderReviewsSlider(direction) {
    const container = document.getElementById('google-reviews');
    if (!container) return;
    if (!reviewsData.length) {
        container.innerHTML = '<div>Няма ревюта.</div>';
        return;
    }
    visibleCount = getVisibleReviewsCount();
    let visible = reviewsData.slice(currentIndex, currentIndex + visibleCount);
    if (visible.length < visibleCount) {
        visible = reviewsData.slice(-visibleCount);
        currentIndex = reviewsData.length - visibleCount;
    }
    // Анимация: fade-out, после fade-in
    if (direction) {
        isAnimating = true;
        container.querySelectorAll('.review').forEach(el => el.classList.add('fade-out'));
        setTimeout(() => {
            container.innerHTML = visible.map(r => `
                <div class="review fade-in">
                    <div class="review-header">
                        <img class="review-avatar" src="${r.profile_photo || 'SmashBurger.png'}" alt="Профилна снимка">
                        <div class="author">${r.author_name}</div>
                    </div>
                    <div class="rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                    <div class="text">${r.text}</div>
                </div>
            `).join('');
            setTimeout(() => {
                container.querySelectorAll('.review').forEach(el => el.classList.remove('fade-in'));
                isAnimating = false;
            }, 300);
        }, 250);
    } else {
        container.innerHTML = visible.map(r => `
            <div class="review">
                <div class="review-header">
                    <img class="review-avatar" src="${r.profile_photo || 'SmashBurger.png'}" alt="Профилна снимка">
                    <div class="author">${r.author_name}</div>
                </div>
                <div class="rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                <div class="text">${r.text}</div>
            </div>
        `).join('');
    }
    const prevBtn = document.getElementById('reviewsPrev');
    const nextBtn = document.getElementById('reviewsNext');
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= reviewsData.length - visibleCount;
}

const prevBtn = document.getElementById('reviewsPrev');
const nextBtn = document.getElementById('reviewsNext');
if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0 && !isAnimating) {
            visibleCount = getVisibleReviewsCount();
            currentIndex = Math.max(0, currentIndex - visibleCount);
            renderReviewsSlider('left');
        }
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        visibleCount = getVisibleReviewsCount();
        if (currentIndex < reviewsData.length - visibleCount && !isAnimating) {
            currentIndex = Math.min(reviewsData.length - visibleCount, currentIndex + visibleCount);
            renderReviewsSlider('right');
        }
    });
}
// --- Край на Static Reviews Slider --- 

// --- Swipe support for reviews on touch devices ---
(function() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // px
    const reviewsSlider = document.getElementById('google-reviews');
    if (reviewsSlider) {
        reviewsSlider.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
            }
        });
        reviewsSlider.addEventListener('touchmove', function(e) {
            if (e.touches.length === 1) {
                touchEndX = e.touches[0].clientX;
            }
        });
        reviewsSlider.addEventListener('touchend', function(e) {
            const dx = touchEndX - touchStartX;
            if (Math.abs(dx) > minSwipeDistance) {
                if (dx < 0) {
                    // swipe left -> next
                    if (currentIndex < reviewsData.length - getVisibleReviewsCount() && !isAnimating) {
                        currentIndex = Math.min(reviewsData.length - getVisibleReviewsCount(), currentIndex + getVisibleReviewsCount());
                        renderReviewsSlider('right');
                    }
                } else {
                    // swipe right -> prev
                    if (currentIndex > 0 && !isAnimating) {
                        currentIndex = Math.max(0, currentIndex - getVisibleReviewsCount());
                        renderReviewsSlider('left');
                    }
                }
            }
            touchStartX = 0;
            touchEndX = 0;
        });
    }
})(); 