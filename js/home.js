const topDoctors = [
    {
        id: 1,
        name: "Dr. Katharine Moss",
        specialty: "Head Specialist",
        rating: 4.5,
        image: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
        id: 2,
        name: "Dr. Dutcher William",
        specialty: "Cee-Sensibil",
        rating: 4.2,
        image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ]


// Search Functionality
document.getElementById('searchInput').addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
const searchTerm = this.value.trim();
if (searchTerm) {
  alert(`Searching for: ${searchTerm}`);
  // In real app: window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
}
}
});

// Highlight current page in nav
document.addEventListener('DOMContentLoaded', function() {
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
if (link.getAttribute('href') === currentPage) {
  link.classList.add('active');
}
});
});

let progress = 0;
const counter = setInterval(() => {
progress += Math.random() * 15;
if(progress >= 100) {
progress = 100;
clearInterval(counter);
// Add completion class for animation
document.querySelector('.custom-loader').classList.add('complete');
// Hide after animation completes
setTimeout(() => {
document.querySelector('.custom-loader').classList.add('hidden');
}, 500);
}
document.querySelector('.progress-counter').textContent = `${Math.floor(progress)}%`;
}, 300);

// Modified preloader logic
document.addEventListener('DOMContentLoaded', function() {
// Check if this is the first visit in this session
if (!sessionStorage.getItem('preloaderShown')) {
// Show preloader
let progress = 0;
const counter = setInterval(() => {
progress += Math.random() * 15;
if(progress >= 100) {
  progress = 100;
  clearInterval(counter);
  document.querySelector('.custom-loader').classList.add('complete');
  setTimeout(() => {
    document.querySelector('.custom-loader').classList.add('hidden');
  }, 500);
  // Set flag in session storage
  sessionStorage.setItem('preloaderShown', 'true');
}
document.querySelector('.progress-counter').textContent = `${Math.floor(progress)}%`;
}, 300);
} else {
// If preloader was already shown, hide it immediately
document.querySelector('.custom-loader').classList.add('hidden');
}
});
    // Preloader animation
    document.addEventListener('DOMContentLoaded', function() {
      const preloader = document.querySelector('.custom-loader');
      const counter = document.querySelector('.progress-counter');
      
      // Simulate loading progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress > 100) progress = 100;
        counter.textContent = `${progress}%`;
        
        if (progress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
          }, 500);
        }
      }, 200);
    });

    // User Profile Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
  // User data (in a real app, this would come from your authentication system)
  const user = {
    name: "John Doe",
    email: "john@example.com",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
  };

  // DOM Elements
  const profileBtn = document.createElement('div');
  profileBtn.className = 'user-profile';
  profileBtn.innerHTML = `
    <button class="profile-btn">
      <img src="${user.profilePic}" alt="Profile" class="profile-img">
      <span class="profile-name">${user.name.split(' ')[0]}</span>
    </button>
    <div class="profile-dropdown">
      <div class="dropdown-header">
        <img src="${user.profilePic}" alt="Profile" class="profile-img">
        <div class="dropdown-user-info">
          <h4>${user.name}</h4>
          <p>${user.email}</p>
        </div>
      </div>
      <div class="dropdown-menu">
        <a href="profile.html" class="dropdown-item">
          <i class="fas fa-user"></i> My Profile
        </a>
        <a href="appointment.html" class="dropdown-item">
          <i class="fas fa-calendar-alt"></i> Appointments
        </a>
        <a href="records.html" class="dropdown-item">
          <i class="fas fa-file-medical"></i> Medical Records
        </a>
        <div class="dropdown-divider"></div>
        <a href="settings.html" class="dropdown-item">
          <i class="fas fa-cog"></i> Settings
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item" id="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
    </div>
  `;

  // Insert the profile button into the header
  const headerContainer = document.querySelector('.search-container');
  if (headerContainer) {
    headerContainer.insertAdjacentElement('afterend', profileBtn);
  } else {
    // Fallback if search-container doesn't exist
    document.querySelector('header .container').appendChild(profileBtn);
  }

  // Toggle dropdown
  const dropdownBtn = document.querySelector('.profile-btn');
  const dropdownMenu = document.querySelector('.profile-dropdown');

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.user-profile')) {
        dropdownMenu.classList.remove('active');
      }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, you would call your logout API here
        alert('Logging out...');
        // Then redirect to login page
        window.location.href = 'login.html';
      });
    }
  }

  // Load user data from localStorage if available
  loadUserData();
});

function loadUserData() {
  // In a real app, you would get this from your authentication system
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    updateProfileDisplay(user);
  } else {
    // Default user (for demo purposes)
    const defaultUser = {
      name: "John Doe",
      email: "john@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    };
    updateProfileDisplay(defaultUser);
  }
}

function updateProfileDisplay(user) {
  const profileImg = document.querySelector('.profile-img');
  const profileName = document.querySelector('.profile-name');
  const dropdownImg = document.querySelector('.dropdown-header .profile-img');
  const dropdownName = document.querySelector('.dropdown-user-info h4');
  const dropdownEmail = document.querySelector('.dropdown-user-info p');

  if (profileImg) profileImg.src = user.profilePic;
  if (profileName) profileName.textContent = user.name.split(' ')[0];
  if (dropdownImg) dropdownImg.src = user.profilePic;
  if (dropdownName) dropdownName.textContent = user.name;
  if (dropdownEmail) dropdownEmail.textContent = user.email;
}