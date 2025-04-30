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


const API_KEY = "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"; // Your Gemini 1.5 API key
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const closeButton = document.getElementById('close-chatbot');
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chat-messages');

// Message history
let conversationHistory = [
  {
    role: "user",
    parts: [{ text: "You are a helpful medical assistant. Provide clear, concise health information. Never diagnose or prescribe. Always recommend consulting a doctor for medical advice. Keep responses under 200 words unless more detail is specifically requested." }]
  }
];

chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
});

closeButton.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  // Add user message to chat and history
  addMessage('user', input);
  conversationHistory.push({
    role: "user",
    parts: [{ text: input }]
  });
  userInput.value = '';

  // Show typing indicator
  const typing = document.createElement('div');
  typing.className = 'bot-message typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    // Call Gemini 1.5 API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 2000
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_MEDICAL",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    let botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
    
    // Add bot response to history and chat
    conversationHistory.push({
      role: "model",
      parts: [{ text: botResponse }]
    });
    
    chatMessages.removeChild(typing);
    addMessage('bot', formatResponse(input, botResponse));
    
  } catch (error) {
    console.error('Error:', error);
    chatMessages.removeChild(typing);
    addMessage('bot', "Sorry, I'm having technical difficulties. Please try again later or ask a different question.");
  }
}

function formatResponse(input, text) {
  const lowerInput = input.toLowerCase();
  
  // Format fruit responses
  if (lowerInput.includes("name any fruit") || lowerInput.includes("suggest a fruit")) {
    const fruitMatch = text.match(/\b(apple|banana|orange|mango|strawberry|blueberry)\b/i) || ["apple"];
    const fruit = fruitMatch[0];
    return `
      <div class="fruit-response">
        <p>Here's a healthy fruit suggestion:</p>
        <p><strong>${fruit.charAt(0).toUpperCase() + fruit.slice(1)}</strong> would be excellent!</p>
        <p>Nutritional benefits: Rich in ${getFruitBenefits(fruit)}.</p>
      </div>
    `;
  }
  
  // Format test responses
  if (lowerInput.includes("test") || lowerInput.includes("diagnostic") || lowerInput.includes("checkup")) {
    return `
      <div class="test-suggestion">
        <h4>Medical Information:</h4>
        ${formatMedicalText(text)}
        <p class="disclaimer">Consult your healthcare provider for personalized medical advice.</p>
      </div>
    `;
  }
  
  // Format medication responses
  if (lowerInput.includes("medicine") || lowerInput.includes("medication") || lowerInput.includes("pill")) {
    return `
      <div class="medication-response">
        <h4>Medication Information:</h4>
        ${formatMedicalText(text)}
        <p class="disclaimer">Always follow your doctor's prescription and dosage instructions.</p>
      </div>
    `;
  }
  
  // Format general responses
  return formatGeneralText(text);
}

function formatMedicalText(text) {
  // Format medical information with proper structure
  return text
    .replace(/([^.]+)(\.|$)/g, '<p>$1$2</p>') // Paragraphs
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>');
}

function formatGeneralText(text) {
  // Format general conversation
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
}

function getFruitBenefits(fruit) {
  const benefits = {
    apple: "fiber and antioxidants",
    banana: "potassium and vitamin B6",
    orange: "vitamin C and flavonoids",
    mango: "vitamin A and enzymes",
    strawberry: "vitamin C and polyphenols",
    blueberry: "antioxidants and vitamin K"
  };
  return benefits[fruit.toLowerCase()] || "essential vitamins and minerals";
}

function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `${sender}-message`;
  msgDiv.innerHTML = `
    <div class="message-content">${text}</div>
    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
  `;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add CSS for the chatbot
const style = document.createElement('style');
style.textContent = `
  .fruit-response, .test-suggestion, .medication-response {
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 8px;
    margin: 8px 0;
    border-left: 3px solid #4a89dc;
  }
  
  .test-suggestion h4, .medication-response h4 {
    color: #2c3e50;
    margin-top: 0;
  }
  
  .disclaimer {
    font-size: 0.8em;
    color: #666;
    font-style: italic;
    margin-top: 10px;
  }
  
  .typing-indicator {
    display: inline-block;
    padding: 10px 15px;
  }
  
  .typing-indicator span {
    height: 8px;
    width: 8px;
    background: #ccc;
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    animation: bounce 1.5s infinite ease-in-out;
  }
  
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
  
  a {
    color: #4a89dc;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);