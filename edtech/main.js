// ===========================
// Authentication & User Data
// ===========================
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let userVideos = JSON.parse(sessionStorage.getItem('userVideos')) || {};

// Check if user is logged in
if (!currentUser) {
    window.location.href = 'login.html';
}

// ===========================
// DOM Elements
// ===========================
const sidebar = document.querySelector('.sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');
const sectionContents = document.querySelectorAll('.section-content');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const userLevel = document.getElementById('userLevel');

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
    sectionContents.forEach(section => {
        section.classList.remove('active');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    if (window.innerWidth <= 768) {
        closeSidebar();
    }

    window.scrollTo(0, 0);

    if (sectionId === 'my-courses') {
        loadMyCourses();
    } else if (sectionId === 'explore') {
        loadTrendingVideos();
    } else if (sectionId === 'reports') {
        initCharts();
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
        localStorage.setItem('currentSection', sectionId);
    });
});

// ===========================
// Initialize App
// ===========================
function initializeApp() {
    const savedSection = localStorage.getItem('currentSection');
    const initialSection = savedSection || 'dashboard';

    if (currentUser && currentUser.preferences && Object.keys(userVideos).length === 0) {
        ensureUserVideosLoaded();
    }

    showSection(initialSection);
    loadDarkModePreference();
    loadSettings();
    loadUserNotes();
    loadUserEvents();
    initCalendar();
}

// ===========================
// Responsive Behavior
// ===========================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

// ===========================
// Add Interactive Features
// ===========================
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Video card clicked');
    });
});

const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Category card clicked');
    });
});

const instructorCards = document.querySelectorAll('.instructor-card');
instructorCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Instructor card clicked');
    });
});

const settingItems = document.querySelectorAll('.setting-item');
settingItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.toggle-switch') && !e.target.closest('.setting-select')) {
            console.log('Setting item clicked');
        }
    });
});

const questButtons = document.querySelectorAll('.btn-quest');
questButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert('Quest started! Complete the challenge to earn points.');
    });
});

const premiumBtn = document.querySelector('.btn-premium');
if (premiumBtn) {
    premiumBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Great! Upgrade to Premium to unlock 1,000+ courses and get exclusive content from industry experts.');
    });
}

const friendItems = document.querySelectorAll('.friend-item');
friendItems.forEach(item => {
    item.addEventListener('click', () => {
        const friendName = item.querySelector('.friend-name').textContent;
        console.log(`Viewing profile of ${friendName}`);
    });
});

const contactButtons = document.querySelectorAll('.instructor-card .btn-small');
contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instructorName = btn.parentElement.querySelector('h4').textContent;
        alert(`Opening chat with ${instructorName}...`);
    });
});

const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log(`Searching for: ${searchTerm}`);
    });
}

const calendarDates = document.querySelectorAll('.calendar-dates span');
calendarDates.forEach(date => {
    date.addEventListener('click', () => {
        calendarDates.forEach(d => d.classList.remove('active'));
        date.classList.add('active');
        console.log(`Selected date: ${date.textContent}`);
    });
});

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

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            setTimeout(closeSidebar, 100);
        }
    });
});

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
// User Profile Initialization
// ===========================
function initializeUserProfile() {
    if (currentUser) {
        if (userName) {
            userName.textContent = currentUser.name.split(' ')[0];
        }

        if (userLevel && currentUser.preferences) {
            userLevel.textContent = currentUser.preferences.experience || 'User';
        }

        loadPersonalizedVideos();
        loadUserProfileImage();
    }
}

function loadUserProfileImage() {
    const userAvatarImg = document.querySelector('.user-avatar img');
    const mobileProfileImg = document.querySelector('.profile-img');

    if (currentUser && currentUser.profileImage) {
        const imgSrc = currentUser.profileImage;
        if (userAvatarImg) userAvatarImg.src = imgSrc;
        if (mobileProfileImg) mobileProfileImg.src = imgSrc;
    }
}

// ===========================
// Load Personalized Videos
// ===========================
function loadPersonalizedVideos() {
    if (!currentUser || !currentUser.preferences) return;

    const courses = currentUser.preferences.courses;
    const videosGrid = document.querySelector('.videos-grid');
    
    if (!videosGrid) return;

    videosGrid.innerHTML = '';

    courses.slice(0, 3).forEach(course => {
        const videos = userVideos[course] || [];
        videos.slice(0, 2).forEach(video => {
            const videoCard = createVideoCard(video);
            videosGrid.appendChild(videoCard);
        });
    });

    if (videosGrid.children.length < 3) {
        Object.values(userVideos).flat().slice(0, 3).forEach(video => {
            if (!videosGrid.querySelector(`[data-video-id="${video.id}"]`)) {
                const videoCard = createVideoCard(video);
                videosGrid.appendChild(videoCard);
            }
        });
    }
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-video-id', video.id);
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://via.placeholder.com/320x180/667eea/ffffff?text=Video+Not+Available'">
            <div class="play-button">
                <i class="fas fa-play"></i>
            </div>
            <div class="video-duration">Video</div>
        </div>
        <h4>${video.title}</h4>
        <p class="course-category">${video.channel}</p>
    `;

    card.addEventListener('click', () => {
        openVideoModal(video);
    });

    return card;
}

function openVideoModal(video) {
    const modal = document.createElement('div');
    modal.className = 'video-modal active';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="modal-close-btn" onclick="this.closest('.video-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <iframe width="100%" height="500" src="https://www.youtube.com/embed/${video.id}" 
                    frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"></iframe>
            <div class="video-fallback" style="display:none; align-items:center; justify-content:center; height:500px; background:#f0f2f5; flex-direction:column; gap:15px;">
                <i class="fas fa-exclamation-circle" style="font-size:48px; color:#667eea;"></i>
                <p style="color:#666; font-size:16px;">This video is currently unavailable.</p>
                <a href="${video.url}" target="_blank" class="btn-watch-full">Watch on YouTube</a>
            </div>
            <div class="video-info">
                <h2>${video.title}</h2>
                <p>by ${video.channel}</p>
                <a href="${video.url}" target="_blank" class="btn-watch-full">Watch on YouTube</a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ===========================
// Logout Functionality
// ===========================
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('userVideos');
            window.location.href = 'login.html';
        }
    });
}

// Add video modal styles
const style = document.createElement('style');
style.textContent = `
.video-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 3000;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.video-modal.active {
    display: flex;
}

.video-modal-content {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    position: relative;
}

.video-modal iframe {
    display: block;
    aspect-ratio: 16 / 9;
}

.modal-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s ease;
}

.modal-close-btn:hover {
    background: rgba(0, 0, 0, 0.9);
}

.video-info {
    padding: 20px;
}

.video-info h2 {
    font-size: 20px;
    margin-bottom: 8px;
}

.video-info p {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
}

.btn-watch-full {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
}

.btn-watch-full:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
`;
document.head.appendChild(style);

// ===========================
// Initialize User Profile on Load
// ===========================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeUserProfile();
    });
} else {
    initializeUserProfile();
}

console.log('Skillio Learning Platform Initialized');
console.log('Current User:', currentUser ? currentUser.name : 'None');

// ===========================
// Fallback Video Data
// ===========================
const fallbackVideos = {
    'web-development': [
        { id: 'UB1O30fR-EE', title: 'Complete Web Development Course 2024', channel: 'Tech Academy', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', thumbnail: 'https://img.youtube.com/vi/UB1O30fR-EE/mqdefault.jpg' },
        { id: 'jUfEn032Id8', title: 'HTML & CSS Full Course', channel: 'Web Dev Simplified', url: 'https://www.youtube.com/watch?v=jUfEn032Id8', thumbnail: 'https://img.youtube.com/vi/jUfEn032Id8/mqdefault.jpg' },
        { id: 'W6NZfCO5SIk', title: 'JavaScript Essentials', channel: 'Coding Train', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/mqdefault.jpg' },
        { id: 'RGOj5yH7evk', title: 'Responsive Design Tutorial', channel: 'Kevin Powell', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', thumbnail: 'https://img.youtube.com/vi/RGOj5yH7evk/mqdefault.jpg' },
        { id: 'PlxWf493en0', title: 'Frontend Development Guide', channel: 'Traversy Media', url: 'https://www.youtube.com/watch?v=PlxWf493en0', thumbnail: 'https://img.youtube.com/vi/PlxWf493en0/mqdefault.jpg' },
        { id: 'iKDQw5e4dYI', title: 'Modern CSS Techniques', channel: 'Web Dev Simplified', url: 'https://www.youtube.com/watch?v=iKDQw5e4dYI', thumbnail: 'https://img.youtube.com/vi/iKDQw5e4dYI/mqdefault.jpg' }
    ],
    'ui-ux-design': [
        { id: 'c9Wg6Cb_YlU', title: 'UI/UX Design Masterclass', channel: 'DesignCourse', url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/mqdefault.jpg' },
        { id: 'GnAi_jS0gXU', title: 'Figma Tutorial for Beginners', channel: 'AJ&Smart', url: 'https://www.youtube.com/watch?v=GnAi_jS0gXU', thumbnail: 'https://img.youtube.com/vi/GnAi_jS0gXU/mqdefault.jpg' },
        { id: '1V2-sPkG6MI', title: 'Design Thinking Process', channel: 'Interaction Design Foundation', url: 'https://www.youtube.com/watch?v=1V2-sPkG6MI', thumbnail: 'https://img.youtube.com/vi/1V2-sPkG6MI/mqdefault.jpg' },
        { id: 'E8ZDl2a-UM8', title: 'UX Research Methods', channel: 'Nielsen Norman Group', url: 'https://www.youtube.com/watch?v=E8ZDl2a-UM8', thumbnail: 'https://img.youtube.com/vi/E8ZDl2a-UM8/mqdefault.jpg' },
        { id: 'TyZQrG_D-20', title: 'Web Design Principles', channel: 'DesignCourse', url: 'https://www.youtube.com/watch?v=TyZQrG_D-20', thumbnail: 'https://img.youtube.com/vi/TyZQrG_D-20/mqdefault.jpg' },
        { id: 'kDHk5XBXwJA', title: 'Color Theory for Designers', channel: 'CharliMarieTV', url: 'https://www.youtube.com/watch?v=kDHk5XBXwJA', thumbnail: 'https://img.youtube.com/vi/kDHk5XBXwJA/mqdefault.jpg' }
    ],
    'mobile-development': [
        { id: 'gpC0ssgMk8M', title: 'Mobile App Development with React Native', channel: 'Tech Academy', url: 'https://www.youtube.com/watch?v=gpC0ssgMk8M', thumbnail: 'https://img.youtube.com/vi/gpC0ssgMk8M/mqdefault.jpg' },
        { id: 'F127Zy2K4Uc', title: 'Flutter Beginner Tutorial', channel: 'Flutter Explained', url: 'https://www.youtube.com/watch?v=F127Zy2K4Uc', thumbnail: 'https://img.youtube.com/vi/F127Zy2K4Uc/mqdefault.jpg' },
        { id: 'C0DPdy98e4c', title: 'iOS Development Course', channel: 'iOS Academy', url: 'https://www.youtube.com/watch?v=C0DPdy98e4c', thumbnail: 'https://img.youtube.com/vi/C0DPdy98e4c/mqdefault.jpg' },
        { id: 'l-_LnZjwM5o', title: 'Android Development Basics', channel: 'Android Developers', url: 'https://www.youtube.com/watch?v=l-_LnZjwM5o', thumbnail: 'https://img.youtube.com/vi/l-_LnZjwM5o/mqdefault.jpg' },
        { id: 'qPAb0VgzNbA', title: 'Kotlin for Mobile Development', channel: 'Code with Rishab', url: 'https://www.youtube.com/watch?v=qPAb0VgzNbA', thumbnail: 'https://img.youtube.com/vi/qPAb0VgzNbA/mqdefault.jpg' },
        { id: 'e29LiPW_B5Q', title: 'Swift Basics Tutorial', channel: 'Hacking with Swift', url: 'https://www.youtube.com/watch?v=e29LiPW_B5Q', thumbnail: 'https://img.youtube.com/vi/e29LiPW_B5Q/mqdefault.jpg' }
    ],
    'game-development': [
        { id: 'OAcXnzRNiCo', title: 'Unity Game Development for Beginners', channel: 'Brackeys', url: 'https://www.youtube.com/watch?v=OAcXnzRNiCo', thumbnail: 'https://img.youtube.com/vi/OAcXnzRNiCo/mqdefault.jpg' },
        { id: 'j48LtUkZm7g', title: 'Unreal Engine 5 Tutorial', channel: 'Unreal Sensei', url: 'https://www.youtube.com/watch?v=j48LtUkZm7g', thumbnail: 'https://img.youtube.com/vi/j48LtUkZm7g/mqdefault.jpg' },
        { id: 'nBN0xHlzXnE', title: 'Game Design Principles', channel: 'Game Maker\'s Toolkit', url: 'https://www.youtube.com/watch?v=nBN0xHlzXnE', thumbnail: 'https://img.youtube.com/vi/nBN0xHlzXnE/mqdefault.jpg' },
        { id: 'Sxw4lIbMc_s', title: 'Godot Engine Introduction', channel: 'Brackeys', url: 'https://www.youtube.com/watch?v=Sxw4lIbMc_s', thumbnail: 'https://img.youtube.com/vi/Sxw4lIbMc_s/mqdefault.jpg' },
        { id: 'eEqO-TNZJ9s', title: 'Python Game Development', channel: 'Tech with Tim', url: 'https://www.youtube.com/watch?v=eEqO-TNZJ9s', thumbnail: 'https://img.youtube.com/vi/eEqO-TNZJ9s/mqdefault.jpg' },
        { id: 'LQ5Ht_tBx68', title: '3D Game Development Basics', channel: 'Brackeys', url: 'https://www.youtube.com/watch?v=LQ5Ht_tBx68', thumbnail: 'https://img.youtube.com/vi/LQ5Ht_tBx68/mqdefault.jpg' }
    ],
    'graphic-design': [
        { id: 'JMCuqIEp-5M', title: 'Graphic Design Fundamentals', channel: 'Adobe Creative Cloud', url: 'https://www.youtube.com/watch?v=JMCuqIEp-5M', thumbnail: 'https://img.youtube.com/vi/JMCuqIEp-5M/mqdefault.jpg' },
        { id: 'A4L1Kx93h4w', title: 'Adobe Photoshop Complete Course', channel: 'Udemy Free', url: 'https://www.youtube.com/watch?v=A4L1Kx93h4w', thumbnail: 'https://img.youtube.com/vi/A4L1Kx93h4w/mqdefault.jpg' },
        { id: 'hI5nWVPBh2k', title: 'Illustrator Tutorial for Beginners', channel: 'Adobe Creative Cloud', url: 'https://www.youtube.com/watch?v=hI5nWVPBh2k', thumbnail: 'https://img.youtube.com/vi/hI5nWVPBh2k/mqdefault.jpg' },
        { id: '3P7OhHlEfOo', title: 'Typography Design Guide', channel: 'DesignCourse', url: 'https://www.youtube.com/watch?v=3P7OhHlEfOo', thumbnail: 'https://img.youtube.com/vi/3P7OhHlEfOo/mqdefault.jpg' },
        { id: 'E5HfP3CmHiQ', title: 'Logo Design Tutorial', channel: 'DesignCourse', url: 'https://www.youtube.com/watch?v=E5HfP3CmHiQ', thumbnail: 'https://img.youtube.com/vi/E5HfP3CmHiQ/mqdefault.jpg' },
        { id: 'f8Ia3cqX0wU', title: 'Branding Design Masterclass', channel: 'CharliMarieTV', url: 'https://www.youtube.com/watch?v=f8Ia3cqX0wU', thumbnail: 'https://img.youtube.com/vi/f8Ia3cqX0wU/mqdefault.jpg' }
    ],
    'digital-marketing': [
        { id: 'b3B3XE9TqVg', title: 'Digital Marketing Course', channel: 'Neil Patel', url: 'https://www.youtube.com/watch?v=b3B3XE9TqVg', thumbnail: 'https://img.youtube.com/vi/b3B3XE9TqVg/mqdefault.jpg' },
        { id: 'eAcjD-Ueqv8', title: 'SEO Tutorial for Beginners', channel: 'Backlinko', url: 'https://www.youtube.com/watch?v=eAcjD-Ueqv8', thumbnail: 'https://img.youtube.com/vi/eAcjD-Ueqv8/mqdefault.jpg' },
        { id: 'bA-wxI0vMqo', title: 'Content Marketing Strategy', channel: 'HubSpot', url: 'https://www.youtube.com/watch?v=bA-wxI0vMqo', thumbnail: 'https://img.youtube.com/vi/bA-wxI0vMqo/mqdefault.jpg' },
        { id: 'w-JcKcWfnAA', title: 'Social Media Marketing Guide', channel: 'Social Media Examiner', url: 'https://www.youtube.com/watch?v=w-JcKcWfnAA', thumbnail: 'https://img.youtube.com/vi/w-JcKcWfnAA/mqdefault.jpg' },
        { id: '7Bv73YCStWs', title: 'Google Ads Tutorial', channel: 'Google Ads', url: 'https://www.youtube.com/watch?v=7Bv73YCStWs', thumbnail: 'https://img.youtube.com/vi/7Bv73YCStWs/mqdefault.jpg' },
        { id: 'E-lP0Uah5iA', title: 'Email Marketing Strategy', channel: 'HubSpot', url: 'https://www.youtube.com/watch?v=E-lP0Uah5iA', thumbnail: 'https://img.youtube.com/vi/E-lP0Uah5iA/mqdefault.jpg' }
    ],
    'video-production': [
        { id: '4W5yv-r1G5M', title: 'Video Production Basics', channel: 'Film Riot', url: 'https://www.youtube.com/watch?v=4W5yv-r1G5M', thumbnail: 'https://img.youtube.com/vi/4W5yv-r1G5M/mqdefault.jpg' },
        { id: 'x97F0hCMrRw', title: 'Adobe Premiere Pro Tutorial', channel: 'Film Riot', url: 'https://www.youtube.com/watch?v=x97F0hCMrRw', thumbnail: 'https://img.youtube.com/vi/x97F0hCMrRw/mqdefault.jpg' },
        { id: 'N2GH3ebJa4c', title: 'DaVinci Resolve Guide', channel: 'Casey Faris', url: 'https://www.youtube.com/watch?v=N2GH3ebJa4c', thumbnail: 'https://img.youtube.com/vi/N2GH3ebJa4c/mqdefault.jpg' },
        { id: 'E3BFnJTfABU', title: 'Cinematography Fundamentals', channel: 'Film Riot', url: 'https://www.youtube.com/watch?v=E3BFnJTfABU', thumbnail: 'https://img.youtube.com/vi/E3BFnJTfABU/mqdefault.jpg' },
        { id: 'xbNMSg4CyAI', title: 'Video Editing Tips and Tricks', channel: 'Video Creator', url: 'https://www.youtube.com/watch?v=xbNMSg4CyAI', thumbnail: 'https://img.youtube.com/vi/xbNMSg4CyAI/mqdefault.jpg' },
        { id: 'wBCVFaI1oCc', title: 'Sound Design for Video', channel: 'Film Riot', url: 'https://www.youtube.com/watch?v=wBCVFaI1oCc', thumbnail: 'https://img.youtube.com/vi/wBCVFaI1oCc/mqdefault.jpg' }
    ],
    'data-science': [
        { id: 'ua-js-j42zQ', title: 'Data Science Beginners Course', channel: 'Edureka', url: 'https://www.youtube.com/watch?v=ua-js-j42zQ', thumbnail: 'https://img.youtube.com/vi/ua-js-j42zQ/mqdefault.jpg' },
        { id: 'T5pRlIbr6gg', title: 'Python for Data Science', channel: 'Programming with Mosh', url: 'https://www.youtube.com/watch?v=T5pRlIbr6gg', thumbnail: 'https://img.youtube.com/vi/T5pRlIbr6gg/mqdefault.jpg' },
        { id: 'MwZwr1C5SJQ', title: 'Machine Learning Tutorial', channel: 'Sentdex', url: 'https://www.youtube.com/watch?v=MwZwr1C5SJQ', thumbnail: 'https://img.youtube.com/vi/MwZwr1C5SJQ/mqdefault.jpg' },
        { id: 'PaFPU4Aff-E', title: 'Statistics for Data Science', channel: 'Statquest with Josh Starmer', url: 'https://www.youtube.com/watch?v=PaFPU4Aff-E', thumbnail: 'https://img.youtube.com/vi/PaFPU4Aff-E/mqdefault.jpg' },
        { id: 'r-uOLxkGkqk', title: 'SQL Tutorial for Data Analysis', channel: 'Mode Analytics', url: 'https://www.youtube.com/watch?v=r-uOLxkGkqk', thumbnail: 'https://img.youtube.com/vi/r-uOLxkGkqk/mqdefault.jpg' },
        { id: 'FHgJPQCZ2mY', title: 'Data Visualization with Matplotlib', channel: 'Tech with Tim', url: 'https://www.youtube.com/watch?v=FHgJPQCZ2mY', thumbnail: 'https://img.youtube.com/vi/FHgJPQCZ2mY/mqdefault.jpg' }
    ]
};

function ensureUserVideosLoaded() {
    if (!currentUser || !currentUser.preferences) return;

    const courses = currentUser.preferences.courses;
    const userVids = {};
    courses.forEach(course => {
        userVids[course] = fallbackVideos[course] || [];
    });

    if (Object.keys(userVids).length > 0) {
        userVideos = userVids;
        sessionStorage.setItem('userVideos', JSON.stringify(userVids));
    }
}

// ===========================
// NOTES SYSTEM
// ===========================
const noteModal = document.getElementById('noteModal');
const addNoteBtn = document.getElementById('addNoteBtn');
const closeNoteModal = document.getElementById('closeNoteModal');
const cancelNoteBtn = document.getElementById('cancelNoteBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const notesContainer = document.getElementById('notesContainer');

function loadUserNotes() {
    if (!currentUser) return;
    const notes = JSON.parse(localStorage.getItem(`notes_${currentUser.id}`)) || [];
    const defaultNotes = [
        { id: 1, title: 'JavaScript Closures', text: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).', date: 'Aug 10, 2025' },
        { id: 2, title: 'CSS Flexbox Tips', text: 'Use justify-content for main axis alignment and align-items for cross axis. flex-direction changes the main axis.', date: 'Aug 12, 2025' }
    ];
    const allNotes = [...defaultNotes, ...notes];
    renderNotes(allNotes);
}

function renderNotes(notes) {
    if (!notesContainer) return;
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.setAttribute('data-note-id', note.id);
        noteCard.innerHTML = `
            <div class="note-header">
                <h4>${note.title}</h4>
                <button class="btn-delete-note" data-note-id="${note.id}"><i class="fas fa-trash"></i></button>
            </div>
            <p>${note.text}</p>
            <div class="note-meta">
                <span><i class="fas fa-calendar"></i> ${note.date}</span>
            </div>
        `;
        notesContainer.appendChild(noteCard);
    });

    document.querySelectorAll('.btn-delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const noteId = parseInt(btn.getAttribute('data-note-id'));
            deleteNote(noteId);
        });
    });
}

function deleteNote(noteId) {
    if (!currentUser) return;
    let notes = JSON.parse(localStorage.getItem(`notes_${currentUser.id}`)) || [];
    notes = notes.filter(n => n.id !== noteId);
    localStorage.setItem(`notes_${currentUser.id}`, JSON.stringify(notes));
    loadUserNotes();
}

function openNoteModal() {
    if (noteModal) {
        noteModal.classList.add('active');
        if (noteTitle) noteTitle.value = '';
        if (noteText) noteText.value = '';
        if (noteTitle) noteTitle.focus();
    }
}

function closeNoteModalFn() {
    if (noteModal) {
        noteModal.classList.remove('active');
    }
}

function saveNote() {
    if (!currentUser) return;
    const title = noteTitle ? noteTitle.value.trim() : '';
    const text = noteText ? noteText.value.trim() : '';

    if (!title || !text) {
        alert('Please fill in both title and note content');
        return;
    }

    const notes = JSON.parse(localStorage.getItem(`notes_${currentUser.id}`)) || [];
    const newNote = {
        id: Date.now(),
        title,
        text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    notes.push(newNote);
    localStorage.setItem(`notes_${currentUser.id}`, JSON.stringify(notes));
    closeNoteModalFn();
    loadUserNotes();
}

if (addNoteBtn) {
    addNoteBtn.addEventListener('click', openNoteModal);
}

if (closeNoteModal) {
    closeNoteModal.addEventListener('click', closeNoteModalFn);
}

if (cancelNoteBtn) {
    cancelNoteBtn.addEventListener('click', closeNoteModalFn);
}

if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', saveNote);
}

if (noteModal) {
    noteModal.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            closeNoteModalFn();
        }
    });
}

// ===========================
// SETTINGS - DARK MODE & MORE
// ===========================
const darkModeToggle = document.getElementById('darkModeToggle');
const notificationsToggle = document.getElementById('notificationsToggle');

function loadDarkModePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = false;
    }
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    if (darkModeToggle) {
        darkModeToggle.checked = settings.darkMode || false;
    }
    if (notificationsToggle) {
        notificationsToggle.checked = settings.notifications !== false;
    }
}

function saveSettings() {
    const settings = {
        darkMode: darkModeToggle ? darkModeToggle.checked : false,
        notifications: notificationsToggle ? notificationsToggle.checked : true
    };
    localStorage.setItem('settings', JSON.stringify(settings));
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
        saveSettings();
    });
}

if (notificationsToggle) {
    notificationsToggle.addEventListener('change', () => {
        saveSettings();
        alert(notificationsToggle.checked ? 'Notifications enabled' : 'Notifications disabled');
    });
}

// ===========================
// MY COURSES - VIDEO PLAYER
// ===========================
function loadMyCourses() {
    const myCoursesVideos = document.getElementById('myCoursesVideos');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');

    if (!myCoursesVideos || !currentUser || !currentUser.preferences) return;

    const courses = currentUser.preferences.courses;
    const courseVideos = {};

    courses.forEach(course => {
        courseVideos[course] = userVideos[course] || [];
    });

    myCoursesVideos.innerHTML = '';

    const courseNames = {
        'web-development': 'Web Development',
        'ui-ux-design': 'UI/UX Design',
        'mobile-development': 'Mobile Development',
        'game-development': 'Game Development',
        'graphic-design': 'Graphic Design',
        'digital-marketing': 'Digital Marketing',
        'video-production': 'Video Production',
        'data-science': 'Data Science'
    };

    let videoIndex = 0;
    courses.forEach(course => {
        const videos = courseVideos[course] || [];
        if (videos.length > 0) {
            const sectionTitle = document.createElement('h3');
            sectionTitle.style.cssText = 'font-size: 16px; margin-bottom: 15px; color: var(--primary-color); grid-column: 1 / -1;';
            sectionTitle.textContent = courseNames[course] || course;
            myCoursesVideos.appendChild(sectionTitle);

            videos.slice(0, 3).forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                videoCard.innerHTML = `
                    <div class="video-thumbnail">
                        <img src="${video.thumbnail}" alt="${video.title}">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="video-duration">12:30</div>
                    </div>
                    <h4>${video.title}</h4>
                    <p class="course-category">${video.channel}</p>
                `;
                videoCard.addEventListener('click', () => {
                    playVideo(video);
                });
                myCoursesVideos.appendChild(videoCard);
                videoIndex++;
            });
        }
    });

    if (videoIndex === 0) {
        myCoursesVideos.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No courses selected yet. Complete the signup quiz to get personalized videos.</p>';
    }
}

function playVideo(video) {
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const currentVideoTitle = document.getElementById('currentVideoTitle');
    const currentVideoChannel = document.getElementById('currentVideoChannel');

    if (videoPlayerContainer && videoPlayer) {
        videoPlayerContainer.style.display = 'block';
        videoPlayer.src = `https://www.youtube.com/embed/${video.id}`;
        if (currentVideoTitle) currentVideoTitle.textContent = video.title;
        if (currentVideoChannel) currentVideoChannel.textContent = `by ${video.channel}`;
        videoPlayerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

const watchOnYoutubeBtn = document.getElementById('watchOnYoutubeBtn');
if (watchOnYoutubeBtn) {
    watchOnYoutubeBtn.addEventListener('click', () => {
        window.open('https://www.youtube.com', '_blank');
    });
}

// ===========================
// DAILY EVENT PLANNER
// ===========================
const addEventBtn = document.getElementById('addEventBtn');
const eventModal = document.getElementById('eventModal');
const closeEventModal = document.getElementById('closeEventModal');
const cancelEventBtn = document.getElementById('cancelEventBtn');
const saveEventBtn = document.getElementById('saveEventBtn');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTimeInput = document.getElementById('eventTimeInput');
const eventDescInput = document.getElementById('eventDescInput');
const eventsPlannerList = document.getElementById('eventsPlannerList');

let currentCalendarDate = new Date();

function initCalendar() {
    renderCalendar(currentCalendarDate);
    setupCalendarNav();
}

function renderCalendar(date) {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');

    if (!calendarGrid) return;

    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    if (currentMonthEl) {
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const events = JSON.parse(localStorage.getItem('userEvents')) || [];
    const eventDates = events.map(e => new Date(e.date).getDate());

    let html = '';

    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const hasEvent = eventDates.includes(day);
        const isSelected = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

        let classes = 'calendar-day';
        if (isToday) classes += ' active';
        if (hasEvent) classes += ' has-event';

        html += `<div class="${classes}" data-day="${day}">${day}</div>`;
    }

    const remainingCells = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }

    calendarGrid.innerHTML = html;

    document.querySelectorAll('.calendar-day:not(.other-month)').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
            dayEl.classList.add('active');
            const selectedDay = dayEl.getAttribute('data-day');
            const selectedDate = new Date(year, month, selectedDay);
            showEventsForDate(selectedDate);
        });
    });
}

function setupCalendarNav() {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar(currentCalendarDate);
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar(currentCalendarDate);
        });
    }
}

function showEventsForDate(date) {
    const selectedDateTitle = document.getElementById('selectedDateTitle');
    if (selectedDateTitle) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        selectedDateTitle.textContent = date.toLocaleDateString('en-US', options);
    }
}

function openEventModal() {
    if (eventModal) {
        eventModal.classList.add('active');
        if (eventTitleInput) eventTitleInput.value = '';
        if (eventTimeInput) eventTimeInput.value = '';
        if (eventDescInput) eventDescInput.value = '';
        if (eventTitleInput) eventTitleInput.focus();
    }
}

function closeEventModalFn() {
    if (eventModal) {
        eventModal.classList.remove('active');
    }
}

function saveEvent() {
    if (!currentUser) return;
    const title = eventTitleInput ? eventTitleInput.value.trim() : '';
    const time = eventTimeInput ? eventTimeInput.value : '';
    const desc = eventDescInput ? eventDescInput.value.trim() : '';

    if (!title) {
        alert('Please enter an event title');
        return;
    }

    const events = JSON.parse(localStorage.getItem('userEvents')) || [];
    const selectedDay = document.querySelector('.calendar-day.active');
    const selectedDate = selectedDay ? new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), selectedDay.getAttribute('data-day')) : new Date();

    const newEvent = {
        id: Date.now(),
        title,
        time: time || 'All day',
        description: desc,
        date: selectedDate.toISOString(),
        type: 'user',
        userId: currentUser.id
    };

    events.push(newEvent);
    localStorage.setItem('userEvents', JSON.stringify(events));
    closeEventModalFn();
    loadUserEvents();
    renderCalendar(currentCalendarDate);
}

function loadUserEvents() {
    if (!eventsPlannerList) return;
    const events = JSON.parse(localStorage.getItem('userEvents')) || [];
    const defaultEvents = [
        { id: 1, title: 'UI Basics Quiz', description: '6 quick MCQs on design', time: '10:00', type: 'quiz', completed: false },
        { id: 2, title: 'Framer Homework', description: 'Make 3 interactive prototypes', time: '14:00', type: 'homework', completed: false },
        { id: 3, title: 'CSS Live Code', description: 'Create interactive card component', time: '16:30', type: 'code', completed: false }
    ];

    const allEvents = [...defaultEvents, ...events.filter(e => e.type === 'user')];
    eventsPlannerList.innerHTML = '';

    allEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = `event-planner-item ${event.completed ? 'completed' : ''}`;
        eventItem.setAttribute('data-event-id', event.id);

        const iconClass = event.type === 'quiz' ? 'quiz' : event.type === 'homework' ? 'homework' : event.type === 'admin' ? 'admin' : 'code';
        const iconName = event.type === 'quiz' ? 'fa-question-circle' : event.type === 'homework' ? 'fa-pencil-alt' : event.type === 'admin' ? 'fa-user-shield' : 'fa-code';

        eventItem.innerHTML = `
            <div class="event-icon ${iconClass}">
                <i class="fas ${iconName}"></i>
            </div>
            <div class="event-planner-info">
                <h4>${event.title}</h4>
                <p>${event.description}</p>
                <span class="event-time"><i class="fas fa-clock"></i> ${event.time || 'All day'}</span>
            </div>
            <button class="btn-complete-event" data-event-id="${event.id}"><i class="fas fa-check"></i></button>
        `;

        const completeBtn = eventItem.querySelector('.btn-complete-event');
        completeBtn.addEventListener('click', () => {
            completeEvent(event.id);
        });

        eventsPlannerList.appendChild(eventItem);
    });
}

function completeEvent(eventId) {
    const events = JSON.parse(localStorage.getItem('userEvents')) || [];
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex].completed = !events[eventIndex].completed;
        localStorage.setItem('userEvents', JSON.stringify(events));
    }
    loadUserEvents();
}

if (addEventBtn) {
    addEventBtn.addEventListener('click', openEventModal);
}

if (closeEventModal) {
    closeEventModal.addEventListener('click', closeEventModalFn);
}

if (cancelEventBtn) {
    cancelEventBtn.addEventListener('click', closeEventModalFn);
}

if (saveEventBtn) {
    saveEventBtn.addEventListener('click', saveEvent);
}

if (eventModal) {
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeEventModalFn();
        }
    });
}

// ===========================
// EXPLORE PAGE - SEARCH & TRENDING
// ===========================
const exploreSearch = document.getElementById('exploreSearch');
const exploreSearchBtn = document.getElementById('exploreSearchBtn');

function loadTrendingVideos() {
    const trendingGrid = document.getElementById('trendingGrid');
    if (!trendingGrid) return;

    const trendingVideos = [
        { id: 'UB1O30fR-EE', title: 'Complete Web Development Course 2024', channel: 'Tech Academy', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', thumbnail: 'https://img.youtube.com/vi/UB1O30fR-EE/mqdefault.jpg' },
        { id: 'c9Wg6Cb_YlU', title: 'UI/UX Design Masterclass', channel: 'DesignCourse', url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/mqdefault.jpg' },
        { id: 'gpC0ssgMk8M', title: 'Mobile App Development with React Native', channel: 'Tech Academy', url: 'https://www.youtube.com/watch?v=gpC0ssgMk8M', thumbnail: 'https://img.youtube.com/vi/gpC0ssgMk8M/mqdefault.jpg' },
        { id: 'OAcXnzRNiCo', title: 'Unity Game Development for Beginners', channel: 'Brackeys', url: 'https://www.youtube.com/watch?v=OAcXnzRNiCo', thumbnail: 'https://img.youtube.com/vi/OAcXnzRNiCo/mqdefault.jpg' },
        { id: 'JMCuqIEp-5M', title: 'Graphic Design Fundamentals', channel: 'Adobe Creative Cloud', url: 'https://www.youtube.com/watch?v=JMCuqIEp-5M', thumbnail: 'https://img.youtube.com/vi/JMCuqIEp-5M/mqdefault.jpg' },
        { id: 'ua-js-j42zQ', title: 'Data Science Beginners Course', channel: 'Edureka', url: 'https://www.youtube.com/watch?v=ua-js-j42zQ', thumbnail: 'https://img.youtube.com/vi/ua-js-j42zQ/mqdefault.jpg' }
    ];

    trendingGrid.innerHTML = '';
    trendingVideos.forEach(video => {
        const card = createVideoCard(video);
        trendingGrid.appendChild(card);
    });
}

if (exploreSearchBtn) {
    exploreSearchBtn.addEventListener('click', () => {
        const query = exploreSearch ? exploreSearch.value.trim() : '';
        if (query) {
            alert(`Searching for: ${query}`);
        }
    });
}

if (exploreSearch) {
    exploreSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = exploreSearch.value.trim();
            if (query) {
                alert(`Searching for: ${query}`);
            }
        }
    });
}

// ===========================
// REPORTS - CHARTS
// ===========================
let chartsInitialized = false;

function initCharts() {
    if (chartsInitialized) return;
    chartsInitialized = true;

    const activityCanvas = document.getElementById('activityChart');
    const skillsCanvas = document.getElementById('skillsChart');

    if (activityCanvas) {
        const ctx = activityCanvas.getContext('2d');
        drawActivityChart(ctx, activityCanvas);
    }

    if (skillsCanvas) {
        const ctx = skillsCanvas.getContext('2d');
        drawSkillsChart(ctx, skillsCanvas);
    }
}

function drawActivityChart(ctx, canvas) {
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    const data = [3, 5, 2, 7, 4, 6, 8];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...data);
    const barWidth = chartWidth / data.length - 10;

    ctx.fillStyle = '#f0f2f5';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);

    const isDark = document.body.classList.contains('dark-mode');
    ctx.strokeStyle = isDark ? '#3a3f47' : '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + chartHeight - (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    data.forEach((val, i) => {
        const barHeight = (val / maxVal) * chartHeight;
        const x = padding + i * (chartWidth / data.length) + 5;
        const y = padding + chartHeight - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, padding + chartHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;

        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.fillStyle = isDark ? '#b0b3b8' : '#7f8c8d';
        ctx.font = '11px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, padding + chartHeight + 15);
        ctx.fillText(val, x + barWidth / 2, y - 8);
    });
}

function drawSkillsChart(ctx, canvas) {
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    const data = [
        { label: 'Web Dev', value: 78 },
        { label: 'Design', value: 65 },
        { label: 'Mobile', value: 45 },
        { label: 'Data', value: 30 }
    ];
    const maxVal = 100;
    const barHeight = chartHeight / data.length - 15;

    const isDark = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDark ? '#3a3f47' : '#e0e0e0';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);

    data.forEach((item, i) => {
        const y = padding + i * (chartHeight / data.length) + 7;
        const barW = (item.value / maxVal) * chartWidth;

        ctx.fillStyle = '#f0f2f5';
        ctx.fillRect(padding, y, chartWidth, barHeight);

        const gradient = ctx.createLinearGradient(padding, 0, padding + barW, 0);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;

        ctx.fillRect(padding, y, barW, barHeight);

        ctx.fillStyle = isDark ? '#e8eaed' : '#2c3e50';
        ctx.font = '12px Segoe UI';
        ctx.textAlign = 'right';
        ctx.fillText(item.label, padding - 8, y + barHeight / 2 + 4);

        ctx.fillStyle = isDark ? '#b0b3b8' : '#7f8c8d';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.value}%`, padding + barW + 8, y + barHeight / 2 + 4);
    });
}

// ===========================
// KEYBOARD SHORTCUTS
// ===========================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNoteModalFn();
        closeEventModalFn();
        closeAddFriendModalFn();
        closeFriendChatModalFn();
    }
});

// ===========================
// VOICE RECORDER & TRANSCRIPTION
// ===========================
const startRecordBtn = document.getElementById('startRecordBtn');
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let recognition = null;

function initVoiceRecorder() {
    if (!startRecordBtn) return;

    startRecordBtn.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Media Recorder for audio capture
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (e) => {
            audioChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            saveVoiceNote(audioBlob);
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        isRecording = true;
        startRecordBtn.classList.add('recording');
        startRecordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';

        // Show recording indicator
        showRecordingIndicator();

        // Start Speech Recognition for real-time transcription
        startSpeechRecognition();

    } catch (err) {
        console.error('Error accessing microphone:', err);
        alert('Could not access microphone. Please allow microphone permission.');
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    isRecording = false;
    startRecordBtn.classList.remove('recording');
    startRecordBtn.innerHTML = '<i class="fas fa-microphone"></i> Record';
    hideRecordingIndicator();
    stopSpeechRecognition();
}

function showRecordingIndicator() {
    let indicator = document.querySelector('.recording-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'recording-indicator active';
        indicator.innerHTML = `
            <div class="recording-dot"></div>
            <span class="recording-text">Recording... Speak now</span>
        `;
        const notesSection = document.querySelector('.notes-section');
        if (notesSection && notesSection.querySelector('.notes-header')) {
            notesSection.querySelector('.notes-header').after(indicator);
        }
    }
    indicator.classList.add('active');
}

function hideRecordingIndicator() {
    const indicator = document.querySelector('.recording-indicator');
    if (indicator) {
        indicator.classList.remove('active');
    }
}

function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech recognition not supported in this browser');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        // Show live transcript preview
        showTranscriptPreview(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
            alert('Microphone permission denied. Please allow microphone access for voice transcription.');
        }
    };

    recognition.onend = () => {
        if (isRecording) {
            recognition.start();
        }
    };

    recognition.start();
}

function stopSpeechRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
}

function showTranscriptPreview(text) {
    let preview = document.querySelector('.voice-transcript-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'voice-transcript-preview active';
        preview.innerHTML = '<p><i class="fas fa-quote-left"></i> <span id="transcriptText"></span></p>';
        const notesSection = document.querySelector('.notes-section');
        if (notesSection) {
            notesSection.appendChild(preview);
        }
    }
    const transcriptText = preview.querySelector('#transcriptText');
    if (transcriptText) {
        transcriptText.textContent = text;
    }
    preview.classList.add('active');
}

function hideTranscriptPreview() {
    const preview = document.querySelector('.voice-transcript-preview');
    if (preview) {
        preview.classList.remove('active');
    }
}

function saveVoiceNote(audioBlob) {
    hideTranscriptPreview();
    
    const transcriptEl = document.querySelector('.voice-transcript-preview #transcriptText');
    const transcriptText = transcriptEl ? transcriptEl.textContent.trim() : '';
    
    if (!transcriptText) {
        alert('No speech detected. Please try recording again.');
        return;
    }

    // Create note from voice recording
    const notes = JSON.parse(localStorage.getItem(`notes_${currentUser.id}`)) || [];
    const newNote = {
        id: Date.now(),
        title: `Voice Note - ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
        text: transcriptText,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: 'voice'
    };

    notes.push(newNote);
    localStorage.setItem(`notes_${currentUser.id}`, JSON.stringify(notes));
    loadUserNotes();
}

// ===========================
// SKILLIO AI CHAT
// ===========================
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatMicBtn = document.getElementById('chatMicBtn');

let aiChatHistory = [];
let aiSpeechRecognition = null;

function initSkillioAI() {
    if (!chatSendBtn || !chatInput) return;

    chatSendBtn.addEventListener('click', () => sendAIMessage());
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAIMessage();
    });

    if (chatMicBtn) {
        chatMicBtn.addEventListener('click', () => {
            if (aiSpeechRecognition && aiSpeechRecognition.recording) {
                stopAISpeechRecognition();
            } else {
                startAISpeechRecognition();
            }
        });
    }

    loadAIChatHistory();
}

function sendAIMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';

    // Save to history
    aiChatHistory.push({ role: 'user', content: message, timestamp: new Date().toISOString() });
    saveAIChatHistory();

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = generateAIResponse(message);
        addChatMessage(aiResponse, 'ai');
        aiChatHistory.push({ role: 'ai', content: aiResponse, timestamp: new Date().toISOString() });
        saveAIChatHistory();
    }, 1000 + Math.random() * 1000);
}

function addChatMessage(text, sender) {
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = `chat-avatar ${sender === 'user' ? 'user-avatar-chat' : 'ai-avatar'}`;
    avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `chat-bubble ${sender === 'user' ? 'user-bubble' : 'ai-bubble'}`;
    bubbleDiv.innerHTML = `
        <p>${text}</p>
        <span class="chat-time">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    if (!chatMessages) return;
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator active';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function generateAIResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    // Assignment help
    if (lowerMsg.includes('assignment') || lowerMsg.includes('homework') || lowerMsg.includes('help me with')) {
        return "I'd be happy to help you with your assignment! Could you share more details about what you're working on? For example, the subject, topic, or specific questions you need help with. I can provide explanations, examples, and step-by-step guidance.";
    }

    // Course recommendations
    if (lowerMsg.includes('course') || lowerMsg.includes('recommend') || lowerMsg.includes('learn') || lowerMsg.includes('book')) {
        return "Based on your interests, I'd recommend checking out our Explore section! We have courses in Web Development, UI/UX Design, Mobile Development, and more. What specific topic are you interested in? I can help you find the perfect course match.";
    }

    // Greeting
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return "Hello! Great to see you here. I'm Skillio AI, your personal learning assistant. How can I help you today? I can assist with assignments, recommend courses, or answer your learning questions.";
    }

    // Thanks
    if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
        return "You're welcome! Feel free to ask if you need anything else. I'm here to help you succeed in your learning journey!";
    }

    // Default response
    return "That's an interesting question! As your learning assistant, I can help you with course recommendations, assignment guidance, study tips, and more. Could you tell me more about what you'd like to explore?";
}

function saveAIChatHistory() {
    if (currentUser) {
        localStorage.setItem(`aiChat_${currentUser.id}`, JSON.stringify(aiChatHistory.slice(-50)));
    }
}

function loadAIChatHistory() {
    if (!currentUser || !chatMessages) return;
    const history = JSON.parse(localStorage.getItem(`aiChat_${currentUser.id}`)) || [];
    aiChatHistory = history;
    
    // Clear default message and load history
    chatMessages.innerHTML = '';
    if (history.length === 0) {
        addChatMessage("Hello! I'm Skillio AI. How can I help you today? I can assist you with assignments, recommend courses, or answer your learning questions.", 'ai');
    } else {
        history.forEach(msg => {
            addChatMessage(msg.content, msg.role);
        });
    }
}

function startAISpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in your browser.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    aiSpeechRecognition = new SpeechRecognition();
    aiSpeechRecognition.continuous = false;
    aiSpeechRecognition.interimResults = false;
    aiSpeechRecognition.lang = 'en-US';
    aiSpeechRecognition.recording = true;

    if (chatMicBtn) {
        chatMicBtn.classList.add('recording');
    }

    aiSpeechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        if (chatMicBtn) {
            chatMicBtn.classList.remove('recording');
        }
        aiSpeechRecognition.recording = false;
    };

    aiSpeechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (chatMicBtn) {
            chatMicBtn.classList.remove('recording');
        }
        aiSpeechRecognition.recording = false;
    };

    aiSpeechRecognition.onend = () => {
        if (chatMicBtn) {
            chatMicBtn.classList.remove('recording');
        }
        aiSpeechRecognition.recording = false;
    };

    aiSpeechRecognition.start();
}

function stopAISpeechRecognition() {
    if (aiSpeechRecognition) {
        aiSpeechRecognition.stop();
        aiSpeechRecognition.recording = false;
        if (chatMicBtn) {
            chatMicBtn.classList.remove('recording');
        }
    }
}

// ===========================
// FRIEND SYSTEM
// ===========================
const addFriendBtn = document.getElementById('addFriendBtn');
const addFriendModal = document.getElementById('addFriendModal');
const closeAddFriendModal = document.getElementById('closeAddFriendModal');
const cancelAddFriendBtn = document.getElementById('cancelAddFriendBtn');
const sendFriendRequestBtn = document.getElementById('sendFriendRequestBtn');
const friendEmailInput = document.getElementById('friendEmailInput');

const friendChatModal = document.getElementById('friendChatModal');
const closeFriendChatModal = document.getElementById('closeFriendChatModal');
const friendChatMessages = document.getElementById('friendChatMessages');
const friendChatInput = document.getElementById('friendChatInput');
const friendChatSendBtn = document.getElementById('friendChatSendBtn');
const chatFriendName = document.getElementById('chatFriendName');
const chatFriendAvatar = document.getElementById('chatFriendAvatar');

let currentFriendId = null;
let friendChats = {};

function initFriendSystem() {
    // Add friend button
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', openAddFriendModal);
    }

    if (closeAddFriendModal) {
        closeAddFriendModal.addEventListener('click', closeAddFriendModalFn);
    }

    if (cancelAddFriendBtn) {
        cancelAddFriendBtn.addEventListener('click', closeAddFriendModalFn);
    }

    if (sendFriendRequestBtn) {
        sendFriendRequestBtn.addEventListener('click', sendFriendRequest);
    }

    if (addFriendModal) {
        addFriendModal.addEventListener('click', (e) => {
            if (e.target === addFriendModal) closeAddFriendModalFn();
        });
    }

    // Friend chat
    if (closeFriendChatModal) {
        closeFriendChatModal.addEventListener('click', closeFriendChatModalFn);
    }

    if (friendChatSendBtn) {
        friendChatSendBtn.addEventListener('click', sendFriendMessage);
    }

    if (friendChatInput) {
        friendChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendFriendMessage();
        });
    }

    if (friendChatModal) {
        friendChatModal.addEventListener('click', (e) => {
            if (e.target === friendChatModal) closeFriendChatModalFn();
        });
    }

    // Friend items click
    document.querySelectorAll('.friend-item').forEach(item => {
        item.addEventListener('click', () => {
            const friendId = item.getAttribute('data-friend-id');
            const friendName = item.getAttribute('data-friend-name');
            const friendImg = item.querySelector('img') ? item.querySelector('img').src : 'https://i.pravatar.cc/40?img=1';
            openFriendChat(friendId, friendName, friendImg);
        });
    });

    loadFriendChats();
}

function openAddFriendModal() {
    if (addFriendModal) {
        addFriendModal.classList.add('active');
        if (friendEmailInput) {
            friendEmailInput.value = '';
            friendEmailInput.focus();
        }
    }
}

function closeAddFriendModalFn() {
    if (addFriendModal) {
        addFriendModal.classList.remove('active');
    }
}

function sendFriendRequest() {
    const email = friendEmailInput ? friendEmailInput.value.trim() : '';
    if (!email) {
        alert('Please enter an email address');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
    }

    // Store friend request
    const requests = JSON.parse(localStorage.getItem('friendRequests')) || [];
    requests.push({
        id: Date.now(),
        from: currentUser.email,
        to: email,
        status: 'pending',
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('friendRequests', JSON.stringify(requests));

    alert(`Friend request sent to ${email}! They will receive an invitation to connect on Skillio.`);
    closeAddFriendModalFn();
}

function openFriendChat(friendId, friendName, friendImg) {
    currentFriendId = friendId;
    if (chatFriendName) chatFriendName.textContent = friendName;
    if (chatFriendAvatar) chatFriendAvatar.src = friendImg;
    if (friendChatModal) friendChatModal.classList.add('active');

    // Load chat history for this friend
    loadFriendChat(friendId);
}

function closeFriendChatModalFn() {
    if (friendChatModal) {
        friendChatModal.classList.remove('active');
    }
    currentFriendId = null;
}

function loadFriendChat(friendId) {
    if (!friendChatMessages) return;
    friendChatMessages.innerHTML = '';

    const chatKey = `friendChat_${currentUser.id}_${friendId}`;
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

    if (messages.length === 0) {
        // Default message
        const defaultMsg = document.createElement('div');
        defaultMsg.className = 'chat-message received';
        defaultMsg.innerHTML = `
            <div class="chat-bubble received-bubble">
                <p>Hey! How's it going?</p>
                <span class="chat-time">Just now</span>
            </div>
        `;
        friendChatMessages.appendChild(defaultMsg);
    } else {
        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${msg.sender === currentUser.id ? 'user-message' : 'received'}`;
            msgDiv.innerHTML = `
                <div class="chat-bubble ${msg.sender === currentUser.id ? 'user-bubble' : 'received-bubble'}">
                    <p>${msg.text}</p>
                    <span class="chat-time">${new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            `;
            friendChatMessages.appendChild(msgDiv);
        });
    }

    friendChatMessages.scrollTop = friendChatMessages.scrollHeight;
}

function sendFriendMessage() {
    const text = friendChatInput ? friendChatInput.value.trim() : '';
    if (!text || !currentFriendId) return;

    const chatKey = `friendChat_${currentUser.id}_${currentFriendId}`;
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

    messages.push({
        id: Date.now(),
        sender: currentUser.id,
        text: text,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem(chatKey, JSON.stringify(messages));

    if (friendChatInput) friendChatInput.value = '';
    loadFriendChat(currentFriendId);
}

function loadFriendChats() {
    friendChats = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`friendChat_${currentUser ? currentUser.id : ''}_`)) {
            const parts = key.split('_');
            const friendId = parts[parts.length - 1];
            friendChats[friendId] = JSON.parse(localStorage.getItem(key)) || [];
        }
    }
}

// ===========================
// INITIALIZE ALL NEW FEATURES
// ===========================
function initializeNewFeatures() {
    initVoiceRecorder();
    initSkillioAI();
    initFriendSystem();
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNewFeatures);
} else {
    initializeNewFeatures();
}
