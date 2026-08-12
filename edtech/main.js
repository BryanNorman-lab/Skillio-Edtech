// ===========================
// DOM Elements
// ===========================
const sidebar = document.querySelector('.sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');
const sectionContents = document.querySelectorAll('.section-content');

// ===========================
// Mobile Menu Management
// ===========================
function openSidebar() {
    sidebar.classList.add('active'); 
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Event listeners for menu toggle
if (openSidebarBtn) {
    openSidebarBtn.addEventListener('click', openSidebar);
}

if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeSidebar);
}

if (overlay) {
    overlay.addEventListener('click', closeSidebar);
}

// ===========================
// Navigation Section Management
// ===========================
function showSection(sectionId) {
    // Hide all sections
    sectionContents.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Set the clicked link as active
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close sidebar on mobile after selecting
    if (window.innerWidth <= 768) {
        closeSidebar();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);

        // Store the current section in localStorage for persistence
        localStorage.setItem('currentSection', sectionId);
    });
});

// ===========================
// Initialize App
// ===========================
function initializeApp() {
    // Check if there's a saved section in localStorage
    const savedSection = localStorage.getItem('currentSection');
    const initialSection = savedSection || 'dashboard';

    // Show the initial section
    showSection(initialSection);
}

// ===========================
// Responsive Behavior
// ===========================
window.addEventListener('resize', () => {
    // Close sidebar when resizing to desktop
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

// ===========================
// Add Interactive Features
// ===========================

// Make video cards clickable
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Video card clicked');
        // You can add video player functionality here
    });
});

// Make category cards interactive
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Category card clicked');
        // You can add category view functionality here
    });
});

// Make instructor cards interactive
const instructorCards = document.querySelectorAll('.instructor-card');
instructorCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Instructor card clicked');
        // You can add instructor profile functionality here
    });
});

// Make setting items interactive
const settingItems = document.querySelectorAll('.setting-item');
settingItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Setting item clicked');
        // You can add setting functionality here
    });
});

// ===========================
// Quest Button Functionality
// ===========================
const questButtons = document.querySelectorAll('.btn-quest');
questButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert('Quest started! Complete the challenge to earn points.');
    });
});

// ===========================
// Premium Button
// ===========================
const premiumBtn = document.querySelector('.btn-premium');
if (premiumBtn) {
    premiumBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Great! Upgrade to Premium to unlock 1,000+ courses and get exclusive content from industry experts.');
    });
}

// ===========================
// Friend Items
// ===========================
const friendItems = document.querySelectorAll('.friend-item');
friendItems.forEach(item => {
    item.addEventListener('click', () => {
        const friendName = item.querySelector('.friend-name').textContent;
        console.log(`Viewing profile of ${friendName}`);
        // You can add friend profile functionality here
    });
});

// ===========================
// Contact Instructor Buttons
// ===========================
const contactButtons = document.querySelectorAll('.instructor-card .btn-small');
contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instructorName = btn.parentElement.querySelector('h4').textContent;
        alert(`Opening chat with ${instructorName}...`);
    });
});

// ===========================
// Search Bar Functionality
// ===========================
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log(`Searching for: ${searchTerm}`);
        // You can add search functionality here
    });
}

// ===========================
// Event Calendar Interaction
// ===========================
const calendarDates = document.querySelectorAll('.calendar-dates span');
calendarDates.forEach(date => {
    date.addEventListener('click', () => {
        calendarDates.forEach(d => d.classList.remove('active'));
        date.classList.add('active');
        console.log(`Selected date: ${date.textContent}`);
    });
});

// ===========================
// Prevent default link behavior for all nav links
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===========================
// Initialize the app when DOM is loaded
// ===========================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===========================
// Handle mobile menu close on link click
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            setTimeout(closeSidebar, 100);
        }
    });
});

// ===========================
// Add smooth scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.startsWith('#section')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===========================
// Performance optimization for animations
// ===========================
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.video-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// ===========================
// Add console logging for debugging
// ===========================
console.log('Skillio Learning Platform Initialized ✓');
console.log('Available sections:', Array.from(sectionContents).map(s => s.id));