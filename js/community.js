// Community Support Functions
let currentGroupFilter = 'all';
let currentDiscussionFilter = 'all';

// Open specific support group
function openGroup(groupId) {
    // In production, this would load the group page
    console.log(`Opening ${groupId} support group`);
    // window.location.href = `group.html?id=${groupId}`;
    
    // Show loading animation
    document.body.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        document.body.classList.remove('loading');
        alert(`Loading ${groupId} community...`);
    }, 800);
}

// Open question form
function openQuestionForm(expertId = null) {
    const formUrl = expertId ? 
        `ask-expert.html?expert=${expertId}` : 'ask-question.html';
    
    // In production, redirect to form
    console.log(`Opening question form for ${expertId || 'general'}`);
    // window.location.href = formUrl;
    
    // For demo purposes
    alert(`Redirecting to question submission form${expertId ? ' with selected expert' : ''}`);
}

// Filter discussions
function filterDiscussions(type) {
    currentDiscussionFilter = type;
    console.log(`Filtering discussions by: ${type}`);
    
    // Update UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // In production, would fetch filtered discussions
    // fetchDiscussions(type);
}

// Filter groups
function filterGroups(category) {
    currentGroupFilter = category;
    console.log(`Filtering groups by: ${category}`);
    
    // Update UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // In production, would fetch filtered groups
    // fetchGroups(category);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterDiscussions(this.textContent.trim().toLowerCase());
        });
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterGroups(this.textContent.trim().toLowerCase());
        });
    });
    
    // Initialize with some mock data
    setTimeout(() => {
        document.querySelectorAll('.discussion-card').forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
            card.style.opacity = 0;
        });
    }, 300);
    
    // In a real app, you would:
    // 1. Fetch user's joined groups
    // 2. Load recent discussions
    // 3. Check for notifications
    // fetchInitialData();
});

// Simulated API functions
function fetchInitialData() {
    return Promise.all([
        fetchGroups(currentGroupFilter),
        fetchDiscussions(currentDiscussionFilter)
    ]);
}

function fetchGroups(category) {
    // Simulated API call
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Fetched groups for ${category}`);
            resolve([]);
        }, 500);
    });
}

function fetchDiscussions(filter) {
    // Simulated API call
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Fetched discussions with ${filter} filter`);
            resolve([]);
        }, 500);
    });
}