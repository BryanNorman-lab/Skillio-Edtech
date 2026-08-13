# 🎓 Skillio - EdTech Learning Platform

**Your personal learning companion with AI assistance, voice notes, video courses, and social learning.**

---

## 📖 What is Skillio?

Skillio is a modern, interactive learning platform designed for students and lifelong learners. It combines personalized course recommendations, YouTube video integration, AI-powered assistance, voice note-taking, and social features into one seamless web application.

### 🎯 Core Purpose
Skillio helps you:
- **Learn smarter** with personalized course recommendations based on your interests and experience level
- **Take organized notes** with text and voice recording features
- **Watch educational videos** curated from YouTube based on your selected courses
- **Plan your schedule** with an interactive daily event planner
- **Get AI assistance** for assignments, course recommendations, and learning questions
- **Connect with friends** to share progress and chat in real-time
- **Track your progress** with detailed reports and analytics

---

## ✨ Key Features

### 1. 🔐 Authentication & Onboarding
- **Secure Login/Signup** with email and password
- **Profile Picture Upload** during signup (JPG, PNG, GIF up to 5MB)
- **4-Step Preference Quiz** to personalize your learning journey:
  - Select courses you want to learn (8 categories)
  - Choose experience level (Beginner/Intermediate/Advanced)
  - Set learning goals (Skill Improvement, Career Change, Hobby, Certification)
  - Define weekly time commitment
- **Persistent Sessions** - stay logged in across browser refreshes

### 2. 📚 My Class - Smart Note Taking
- **Add Note Button** - Create text notes with title and content
- **Voice Recorder** - Record class lectures or voice memos with real-time transcription
- **Auto-Save** - All notes saved to browser localStorage
- **Delete Notes** - Remove notes you no longer need
- **Note Metadata** - View creation dates for all notes
- **Class Materials** - Access PDFs, presentations, and assignment templates

### 3. 🎥 My Courses - YouTube Video Integration
- **Course-Based Videos** - Videos automatically loaded based on your selected courses
- **In-App Video Player** - Watch YouTube videos directly in the app via modal
- **Video Cards** - Beautiful thumbnails with play buttons and duration
- **Browse YouTube** - Open YouTube directly for more content
- **Organized by Course** - Videos grouped by category (Web Dev, UI/UX, Mobile, etc.)

### 4. 📅 Events - Daily Planner
- **Interactive Calendar** - Navigate months and select dates
- **Add Events** - Create events with title, time, and description
- **Event Types** - Quizzes, homework, coding sessions, admin events
- **Complete Events** - Mark events as done with checkmark buttons
- **Event Indicators** - Calendar shows which days have events
- **Upcoming Events Widget** - Quick view of scheduled events

### 5. 🤖 Skillio AI - Your Learning Assistant
- **Real-Time Chat Interface** - Instant responses to your questions
- **Voice Input** - Speak your questions instead of typing
- **Assignment Help** - Get guidance on homework and projects
- **Course Recommendations** - Find the perfect courses for your goals
- **Book Suggestions** - Get learning resource recommendations
- **Study Tips** - Receive personalized learning advice
- **Chat History** - All conversations saved locally

### 6. 👥 Friends & Social Learning
- **Add Friends** - Send friend requests via email
- **Real-Time Chat** - Instant messaging with friends
- **Friend Profiles** - View points and progress
- **Persistent Conversations** - Chat history saved per friend
- **Online Status** - See who's available to chat

### 7. 🌙 Dark / Light Mode
- **Theme Toggle** - Switch between light and dark themes
- **Persistent Preference** - Theme choice saved across sessions
- **Consistent Design** - All components adapt to selected theme
- **Easy on Eyes** - Perfect for late-night study sessions

### 8. 📊 Reports & Analytics
- **Progress Cards** - Weekly progress, course completion, quiz performance
- **Learning Activity Chart** - 7-day activity visualization
- **Skills Progress Chart** - Track improvement across skills
- **Visual Metrics** - Easy-to-understand progress bars and percentages

### 9. 🎨 Additional Features
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Profile Image** - Custom avatar displayed throughout the app
- **Search Bar** - Quick search across topics and courses
- **Explore Section** - Discover new courses and trending content
- **Instructor Profiles** - Connect with expert instructors
- **Daily Quests** - Complete challenges to earn points
- **Settings Page** - Manage notifications, video quality, language preferences

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)** - Vanilla JS for maximum performance

### APIs & Services
- **YouTube Iframe Embed API** - Video playback (`youtube.com/embed`)
- **Web Speech API** - Voice recording and real-time transcription (`SpeechRecognition` / `webkitSpeechRecognition`)
- **MediaRecorder API** - Audio capture for voice notes
- **LocalStorage API** - Persistent data storage
- **SessionStorage API** - Temporary video data caching

### No External Dependencies
- No frameworks required
- No backend server needed
- No database required
- All data stored locally in browser

---

## 📁 File Structure

```
edtech/
├── index.html          # Main app with all sections (860+ lines)
├── login.html          # Authentication page with preference quiz (351 lines)
├── style.css           # Complete styling with dark mode (2345+ lines)
├── login.css           # Login/signup specific styles (970 lines)
├── main.js             # Main app logic (1867+ lines)
├── login.js            # Auth & YouTube integration (415 lines)
└── README.md           # This file
```

---

## 🚀 Getting Started

### Installation
1. **Clone or download** the project folder
2. **Open** `login.html` in any modern web browser
3. **Create an account** or sign in

### First Time User Flow
1. Open `login.html`
2. Click **"Sign Up"**
3. Upload a profile picture
4. Fill in name, email, and password
5. Complete the 4-step preference quiz
6. Start learning!

### Returning User
1. Open `login.html`
2. Enter email and password
3. Click **"Login"**
4. Pick up where you left off

---

## 🎮 How to Use

### Dashboard
- View your personalized stats (courses completed, points, progress)
- Watch "Continue Watching" videos
- Access premium course offers

### My Class
- Click **"Add Note"** to write text notes
- Click **"Record"** to capture voice notes with transcription
- View and delete saved notes
- Access class materials (PDFs, presentations)

### My Courses
- Browse videos from your selected courses
- Click any video card to watch in-app
- Use **"Browse YouTube"** for more content
- Videos organized by course category

### Events
- Navigate the calendar with arrow buttons
- Click a date to view/add events
- Click **"Add Event"** to create new events
- Mark events as complete with checkmark button

### Skillio AI
- Type questions in the chat input
- Click **Send** or press Enter
- Use **Microphone button** for voice input
- Get instant AI-powered responses

### Friends
- Click **"Add"** in Friends section
- Enter friend's email address
- Click any friend to open chat
- Send messages in real-time

### Settings
- Toggle **Dark Mode** on/off
- Manage notification preferences
- Set video quality preferences
- Choose language

### Explore
- Search for courses and topics
- Browse category cards
- View trending videos
- Click **"Explore"** to see course details

### Reports
- View weekly progress percentage
- Check course completion rate
- See quiz performance scores
- Review learning activity charts
- Track skills progress

---

## 🎨 Design Features

- **Modern UI** - Clean, card-based interface
- **Smooth Animations** - Hover effects and transitions
- **Dark Mode** - Easy on the eyes for night studying
- **Responsive Layout** - Adapts to any screen size
- **Intuitive Navigation** - Clear sidebar menu
- **Visual Feedback** - Buttons, toggles, and interactive elements

---

## 💾 Data Storage

All data is stored locally in your browser using:
- **localStorage** - User accounts, notes, events, chat history, settings
- **sessionStorage** - Video data for current session

**Note:** Data is not synced to a server. Clearing browser data will reset everything.

---

## 🔧 Customization

### Add New Courses
Edit the `fallbackVideos` object in `main.js` and `login.js`:
```javascript
'your-new-course': [
    { 
        id: 'YouTube_Video_ID', 
        title: 'Course Title', 
        channel: 'Channel Name', 
        url: 'https://www.youtube.com/watch?v=ID', 
        thumbnail: 'https://img.youtube.com/vi/ID/mqdefault.jpg' 
    }
]
```

### Change Theme Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f5576c;
}
```

### Modify AI Responses
Edit the `generateAIResponse()` function in `main.js` to add new response patterns.

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Voice recording and speech recognition work best in Chrome and Edge.

---

## 🐛 Known Limitations

- **Voice Features** - Speech recognition works best in Chrome/Edge; may not work in all browsers
- **YouTube Availability** - Some videos may be blocked in certain regions
- **No Server Sync** - Data is local only; clearing browser data loses everything
- **Simulated AI** - AI chat is pattern-based, not connected to real AI services
- **No Backend** - This is a front-end demo; production apps need a backend

---

## 🚧 Future Enhancements

Potential features to add:
- Real backend with database
- Actual AI API integration (OpenAI, Google AI)
- Real-time chat via WebSockets
- Video progress tracking
- Course enrollment system
- Payment integration for premium courses
- Mobile app versions
- Push notifications
- File upload for assignments
- Video download for offline viewing

---

## 📊 App Statistics

- **Total Files**: 6
- **Lines of Code**: 5000+
- **Features**: 15+ major features
- **Course Categories**: 8
- **Sample Videos**: 48+ YouTube videos
- **Supported Languages**: English (easily extensible)

---

## 🤝 Contributing

This is a demo project. Feel free to:
- Report bugs
- Suggest new features
- Improve the UI/UX
- Add more course content
- Enhance the AI chatbot

---

## 📝 License

This project is open source and available for educational purposes.

---

## 🎬 Version History

### Version 2.0 (Current)
- ✅ Voice recorder with real-time transcription
- ✅ Skillio AI chat interface
- ✅ Friend system with real-time chat
- ✅ Dark/Light mode toggle
- ✅ Profile image upload
- ✅ Daily event planner with calendar
- ✅ YouTube video thumbnails fixed
- ✅ Responsive login/signup containers
- ✅ Notes system with add/delete
- ✅ Reports with charts
- ✅ Explore page with trending

### Version 1.0
- ✅ Basic authentication
- ✅ Preference quiz
- ✅ Dashboard
- ✅ YouTube video integration
- ✅ Responsive design

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section in the code
2. Review browser console (F12 → Console)
3. Ensure JavaScript is enabled
4. Try clearing browser cache

---

**Built with ❤️ for learners everywhere**
**By group 2 (Edtech)**
**Happy Learning! 🚀**

Version 2.0 | Last Updated: August 2026
