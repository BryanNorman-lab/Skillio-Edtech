// Load instructors from localStorage and render them
function loadInstructors() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const instructors = users.filter(u => u.role === 'instructor');
    const container = document.getElementById('instructorsList');

    if (!container) return;
    container.innerHTML = '';

    if (instructors.length === 0) {
        container.innerHTML = '<p>No instructors yet.</p>';
        return;
    }

    instructors.forEach(instr => {
        const card = document.createElement('div');
        card.className = 'instructor-card';
        card.innerHTML = `
            <div class="thumb"><img src="${instr.profileImage || 'https://i.pravatar.cc/150'}" alt="${instr.name}"></div>
            <div class="info">
                <h3>${instr.name}</h3>
                <p>${instr.email}</p>
                <p class="contact">Contact: ${instr.contact || 'N/A'}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

window.addEventListener('load', loadInstructors);
