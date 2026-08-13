// ===========================
// Authentication System
// ===========================

// Dummy user database (in production, use a backend)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Current logged-in user
let currentUser = null;

// ===========================
// Form Switching
// ===========================
function switchForm(form) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (form === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}

// ===========================
// Login Functionality
// ===========================
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Find user in database
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Welcome back, ${user.name}!`);
        redirectToApp();
    } else {
        alert('Invalid email or password');
    }
});

// ===========================
// Profile Image Upload
// ===========================
const profileImageInput = document.getElementById('profileImage');
const profilePreview = document.getElementById('profilePreview');

if (profileImageInput && profilePreview) {
    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                profilePreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// ===========================
// Signup Functionality
// ===========================
document.getElementById('signupBtn').addEventListener('click', () => {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();

    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    const profileImageSrc = profilePreview ? profilePreview.src : 'https://i.pravatar.cc/150?img=5';

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        profileImage: profileImageSrc,
        preferences: null
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    showPreferenceModal();
});

// ===========================
// Preference Modal
// ===========================
function showPreferenceModal() {
    const modal = document.getElementById('preferenceModal');
    modal.classList.add('active');
    resetQuiz();
}

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('preferenceModal');
    modal.classList.remove('active');
});

// Click outside modal to close
document.getElementById('preferenceModal').addEventListener('click', (e) => {
    if (e.target.id === 'preferenceModal') {
        e.target.classList.remove('active');
    }
});

// ===========================
// Quiz Navigation
// ===========================
function nextStep(stepNum) {
    // Validate current step
    if (stepNum === 2) {
        const courses = document.querySelectorAll('input[name="course"]:checked');
        if (courses.length === 0) {
            alert('Please select at least one course');
            return;
        }
    } else if (stepNum === 3) {
        const experience = document.querySelector('input[name="experience"]:checked');
        if (!experience) {
            alert('Please select your experience level');
            return;
        }
    } else if (stepNum === 4) {
        const goal = document.querySelector('input[name="goal"]:checked');
        if (!goal) {
            alert('Please select your learning goal');
            return;
        }
    }

    // Hide current step
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show next step
    document.getElementById(`step${stepNum}`).classList.add('active');
}

function previousStep(stepNum) {
    // Hide current step
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show previous step
    document.getElementById(`step${stepNum}`).classList.add('active');
}

function resetQuiz() {
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    document.getElementById('preferenceForm').reset();
}

// ===========================
// Preference Form Submission
// ===========================
document.getElementById('preferenceForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(el => el.value);
    const experience = document.querySelector('input[name="experience"]:checked').value;
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const time = document.querySelector('input[name="time"]:checked').value;

    // Validate time commitment
    if (!time) {
        alert('Please select your available time');
        return;
    }

    // Save preferences
    const preferences = {
        courses,
        experience,
        goal,
        time,
        completedAt: new Date().toISOString()
    };

    currentUser.preferences = preferences;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update user in database
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert(`Great! Your preferences have been saved. Welcome, ${currentUser.name}!`);
    redirectToApp();
});

// ===========================
// Redirect to Main App
// ===========================
function redirectToApp() {
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// ===========================
// YouTube Integration
// ===========================

// YouTube API Key (Replace with your own key from Google Cloud Console)
const YOUTUBE_API_KEY = 'AIzaSyDemoKeyPlease_Replace_With_Your_Key';

// Course to YouTube search query mapping
const courseSearchQueries = {
    'web-development': 'web development tutorial beginner',
    'ui-ux-design': 'UI UX design tutorial beginner',
    'mobile-development': 'mobile app development tutorial',
    'game-development': 'game development tutorial for beginners',
    'graphic-design': 'graphic design tutorial beginner',
    'digital-marketing': 'digital marketing tutorial',
    'video-production': 'video production tutorial beginner',
    'data-science': 'data science tutorial for beginners'
};

// Fetch YouTube videos based on user preferences
async function fetchYouTubeVideos(course) {
    try {
        const query = courseSearchQueries[course];
        if (!query) return [];

        const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(query)}&part=snippet&type=video&maxResults=6&relevanceLanguage=en`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            return data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url,
                channel: item.snippet.channelTitle,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return [];
    }
}

// Fallback video data (when YouTube API is not available or limited)
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

// Store YouTube videos in session storage
function storeUserVideos() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.preferences) return;

    const userVideos = {};
    user.preferences.courses.forEach(course => {
        userVideos[course] = fallbackVideos[course] || [];
    });

    sessionStorage.setItem('userVideos', JSON.stringify(userVideos));
}

// ===========================
// Check Authentication on Page Load
// ===========================
window.addEventListener('load', () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        storeUserVideos();
    }
});

// ===========================
// Password Toggle
// ===========================
document.addEventListener('click', (e) => {
    if (e.target.closest('.toggle-password')) {
        const button = e.target.closest('.toggle-password');
        const input = button.parentElement.querySelector('input');
        
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            button.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }
});

// ===========================
// Social Login (Demo)
// ===========================
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList.contains('apple') ? 'Apple' : 'Google';
        alert(`${provider} login would open their login page. For this demo, using local storage.`);
    });
});

console.log('Login system initialized ✓');
