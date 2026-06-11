function findDropDownLink(text) {
    return Array.from(document.querySelectorAll('.dropdown-content a')).find(link => link.textContent.trim() === text);
}

function setTextSize(size) {
    const validSizes = ['normal', 'large', 'extra-large'];
    const selected = validSizes.includes(size) ? size : 'normal';
    document.documentElement.setAttribute('data-text-size', selected);
    localStorage.setItem('text-size', selected);

    document.querySelectorAll('.accessibility-menu .dropdown-content a[data-size]').forEach(link => {
        link.classList.toggle('active', link.dataset.size === selected);
    });
}

function initTextSizeControls() {
    document.querySelectorAll('.accessibility-menu .dropdown-content a[data-size]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            setTextSize(link.dataset.size);
        });
    });

    const savedSize = localStorage.getItem('text-size');
    setTextSize(savedSize);
}

// Single source of truth for navigation and views
const navBtns = {
    career: document.getElementById('career-btn'),
    courses: document.getElementById('courses-btn'),
    unit1: document.getElementById('unit1-btn'),
    unit2: document.getElementById('unit2-btn'),
    unit6: document.getElementById('unit6-btn') || findDropDownLink('Unit 6'),
    unit7: document.getElementById('unit7-btn') || findDropDownLink('Unit 7'),
    unit12: document.getElementById('unit12-btn') || findDropDownLink('Unit 12'),
    unit21: document.getElementById('unit21-btn') || findDropDownLink('Unit 21'),
    unit25: document.getElementById('unit25-btn') || findDropDownLink('Unit 25'),
    skill1: document.getElementById('skill1-btn') || findDropDownLink('My Skill 1'),
    skill2: document.getElementById('skill2-btn') || findDropDownLink('My Skill 2'),
    achievement1: document.getElementById('achievement1-btn') || findDropDownLink('Achievement 1'),
    achievement2: document.getElementById('achievement2-btn') || findDropDownLink('Achievement 2'),
    achievement3: document.getElementById('achievement3-btn') || findDropDownLink('Achievement 3'),
    awards: document.getElementById('awards-btn') || findDropDownLink('Awards'),
    goals: document.getElementById('goals-btn'),
    qa: document.getElementById('qa-btn'),
    about: document.getElementById('about-btn'),
    logo: document.querySelector('.logo-img')
};

const views = {
    welcome: document.getElementById('welcome-view'),
    career: document.getElementById('career-view'),
    unit1: document.getElementById('unit1-view'),
    unit2: document.getElementById('unit2-view'),
    unit6: document.getElementById('unit6-view'),
    unit12: document.getElementById('unit12-view'),
    unit21: document.getElementById('unit21-view'),
    unit25: document.getElementById('unit25-view'),
    skill1: document.getElementById('skill1-view'),
    skill2: document.getElementById('skill2-view'),
    achievement1: document.getElementById('achievement1-view'),
    achievement2: document.getElementById('achievement2-view'),
    achievement3: document.getElementById('achievement3-view'),
    awards: document.getElementById('awards-view'),
    goals: document.getElementById('goals-view'),
    qa: document.getElementById('qa-view'),
    about: document.getElementById('about-view')
};

function showView(viewToShow) {
    Object.values(views).forEach(view => {
        if (view) view.classList.add('hidden');
    });
    // Remove any previous animation/position classes from the about view and container
    const aboutView = document.getElementById('about-view');
    const aboutContainer = document.querySelector('#about-view .about-container');
    if (aboutView) {
        aboutView.classList.remove('about-position-right');
    }
    if (aboutContainer) {
        aboutContainer.classList.remove('about-animate');
        aboutContainer.classList.remove('about-animate-right');
    }

    if (viewToShow) {
        viewToShow.classList.remove('hidden');
        // If opening the About view, position it at right and add right animation
        if (viewToShow.id === 'about-view' && aboutView && aboutContainer) {
            aboutView.classList.add('about-position-right');
            // Use requestAnimationFrame twice to ensure element is visible before animating
            requestAnimationFrame(() => {
                requestAnimationFrame(() => aboutContainer.classList.add('about-animate-right'));
            });
        }
        // If opening the Welcome view, replay the typing animation
        if (viewToShow.id === 'welcome-view') {
            animateWelcome();
        }
        // If opening Q&A view, reset animations on Q&A items so they play each time
        if (viewToShow.id === 'qa-view') {
            const qaItems = viewToShow.querySelectorAll('.qa-item');
            qaItems.forEach(item => {
                item.style.animation = 'none';
                // Force reflow to restart animation
                void item.offsetWidth;
                item.style.animation = '';
            });
        }
    }
}

// Attach event listeners safely (check element exists)
function attachNavAction(button, view, fallbackUrl) {
    if (!button) return;
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (view) {
            showView(view);
            return;
        }

        const href = button.getAttribute('href');
        if (href && href !== '#') {
            window.location.href = href;
            return;
        }

        if (fallbackUrl) {
            window.location.href = fallbackUrl;
        }
    });
}

function initDropdownToggleButtons() {
    // On desktop, CSS :hover handles dropdown display
    // No JavaScript needed for toggles - this keeps clicks on dropdown items clean
}

// DO NOT attach listeners to Career/Courses toggles - let CSS :hover handle them
// Dropdown toggles (Career, Courses) will open via CSS :hover only
// Dropdown items - navigate or show view
attachNavAction(navBtns.unit1, views.unit1, 'Courses.Unit 1.html');
attachNavAction(navBtns.unit2, views.unit2, 'Courses.Unit 2.html');
attachNavAction(navBtns.unit6, views.unit6, 'Courses.Unit 6.html');
attachNavAction(navBtns.unit7, views.unit7, 'Courses.Unit 7.html');
attachNavAction(navBtns.unit12, views.unit12, 'Courses.Unit 12.html');
attachNavAction(navBtns.unit21, views.unit21, 'Courses.Unit 21.html');
attachNavAction(navBtns.unit25, views.unit25, 'Courses.Unit 25.html');
attachNavAction(navBtns.skill1, views.skill1, 'Career.My Skill 1.html');
attachNavAction(navBtns.skill2, views.skill2, 'Career.My Skill 2.html');
attachNavAction(navBtns.achievement1, views.achievement1, 'Career.Achievement 1.html');
attachNavAction(navBtns.achievement2, views.achievement2, 'Career.Achievement 2.html');
attachNavAction(navBtns.achievement3, views.achievement3, 'Career.Achievement 3.html');
attachNavAction(navBtns.awards, views.awards, 'Career.Awards.html');
// Top-level buttons - show view or navigate
attachNavAction(navBtns.goals, views.goals, 'index.html');
attachNavAction(navBtns.qa, views.qa, 'index.html');
attachNavAction(navBtns.about, views.about, 'index.html');
initDropdownToggleButtons();
if (navBtns.logo) navBtns.logo.addEventListener('click', (e) => { e.preventDefault(); showView(views.welcome); });

// Q&A Accordion Logic
document.querySelectorAll('.qa-item').forEach(item => {
    const btn = item.querySelector('.toggle-btn');
    if (btn) btn.addEventListener('click', () => {
        item.classList.toggle('active');
        // Toggle button text between + and -
        btn.textContent = item.classList.contains('active') ? '−' : '+';
    });
});

// Lightbox image modal
const imageModal = document.getElementById('image-modal');
const imageModalImg = document.getElementById('image-modal-img');
const imageModalClose = document.getElementById('image-modal-close');

function openImageModal(src, alt) {
    if (!imageModal || !imageModalImg) return;
    imageModalImg.src = src;
    imageModalImg.alt = alt || 'Enlarged image';
    imageModal.classList.remove('hidden');
}

function closeImageModal() {
    if (!imageModal) return;
    imageModal.classList.add('hidden');
    if (imageModalImg) {
        imageModalImg.src = '';
        imageModalImg.alt = '';
    }
}

document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => openImageModal(img.src, img.alt));
});

if (imageModalClose) {
    imageModalClose.addEventListener('click', closeImageModal);
}

if (imageModal) {
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal || event.target.classList.contains('image-modal-backdrop')) {
            closeImageModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeImageModal();
    });
}

// About overlay back button (returns to welcome view)
const aboutBackBtn = document.getElementById('about-back');
if (aboutBackBtn) {
    aboutBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showView(views.welcome);
    });
}

initTextSizeControls();

const welcomeHeadingElement = document.getElementById('welcome-heading');
const welcomeSubtitleElement = document.getElementById('welcome-subtitle');
const welcomeMessage = 'Discover my portfolio, goals, and achievements.';
const welcomeTitle = 'Welcome';

function typeText(element, text, delay = 80, callback) {
    element.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
        element.textContent += text.charAt(index);
        index += 1;
        if (index >= text.length) {
            clearInterval(interval);
            if (typeof callback === 'function') callback();
        }
    }, delay);
}

function animateWelcome() {
    if (!welcomeHeadingElement || !welcomeSubtitleElement) return;
    welcomeHeadingElement.textContent = '';
    welcomeSubtitleElement.textContent = '';
    typeText(welcomeHeadingElement, welcomeTitle, 120, () => {
        typeText(welcomeSubtitleElement, welcomeMessage, 60);
    });
}

// Start welcome animation when landing on the page
showView(views.welcome);