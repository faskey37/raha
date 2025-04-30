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

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Create dots
  slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
      });
  }
  
  function goToSlide(index) {
      currentIndex = index;
      updateSlider();
  }
  
  function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
  }
  
  function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
  }
  
  // Button events
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto-slide (optional)
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
  });
});
// Add to your JavaScript
const quotes = [
  "Health is a relationship between you and your body.",
  "Take care of your body. It's the only place you have to live.",
  "Every journey begins with a single step.",
  "Your health is an investment, not an expense.",
  "Small steps every day lead to big results."
];

document.getElementById('refresh-quote').addEventListener('click', function() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.querySelector('.motivational-quote p').textContent = `"${randomQuote}"`;
});

// In your app's JavaScript
async function queryMedicalAI(prompt, userContext = {}) {
  try {
    const response = await fetch('/api/ai/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt,
        context: {
          age: getUserAge(),
          gender: getUserGender(),
          medications: getUserMeds(),
          // other relevant context
          ...userContext
        }
      })
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error querying AI:', error);
    return "Our health assistant is currently unavailable. Please try again later.";
  }
}

// Example usage
document.getElementById('ask-ai-button').addEventListener('click', async () => {
  const question = document.getElementById('ai-question').value;
  if (!question) return;
  
  const response = await queryMedicalAI(question);
  displayAIResponse(response);
});

function displayAIResponse(response) {
  const formattedResponse = formatMedicalResponse(response);
  document.getElementById('ai-response-container').innerHTML = formattedResponse;
}

function formatMedicalResponse(text) {
  // Simple formatting - you might want to use a markdown parser
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
    .replace(/\n/g, '<br>') // line breaks
    .replace(/- (.*?)(<br>|$)/g, '<li>$1</li>'); // bullets
}