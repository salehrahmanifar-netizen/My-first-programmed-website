// Single source of truth for navigation and views
const navBtns = {
    career: document.getElementById('career-btn'),
    courses: document.getElementById('courses-btn'),
    unit1: document.getElementById('unit1-btn'),
    unit2: document.getElementById('unit2-btn'),
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
    goals: document.getElementById('goals-view'),
    qa: document.getElementById('qa-view'),
    about: document.getElementById('about-view')
};

function showView(viewToShow) {
    Object.values(views).forEach(view => view.classList.add('hidden'));
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
if (navBtns.career) navBtns.career.addEventListener('click', (e) => { e.preventDefault(); showView(views.career); });
if (navBtns.courses) navBtns.courses.addEventListener('click', (e) => { e.preventDefault(); showView(views.unit1); });
if (navBtns.unit1) navBtns.unit1.addEventListener('click', (e) => { e.preventDefault(); showView(views.unit1); });
if (navBtns.unit2) navBtns.unit2.addEventListener('click', (e) => { e.preventDefault(); showView(views.unit2); });
if (navBtns.goals) navBtns.goals.addEventListener('click', (e) => { e.preventDefault(); showView(views.goals); });
if (navBtns.qa) navBtns.qa.addEventListener('click', (e) => { e.preventDefault(); showView(views.qa); });
if (navBtns.about) navBtns.about.addEventListener('click', (e) => { e.preventDefault(); showView(views.about); });
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

// About overlay back button (returns to welcome view)
const aboutBackBtn = document.getElementById('about-back');
if (aboutBackBtn) {
    aboutBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showView(views.welcome);
    });
}

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
animateWelcome();