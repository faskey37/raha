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


const API_KEY = "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";
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const closeButton = document.getElementById('close-chatbot');
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chat-messages');

// Message history
let conversationHistory = [
  {
    role: "system",
    content: `You are a knowledgeable health assistant with broad general knowledge. Follow these rules:
    1. For medical questions: Provide accurate, evidence-based information but never diagnose or prescribe
    2. For general knowledge: Answer concisely if relevant to health/wellness
    3. For personal questions: Be polite but maintain professional boundaries
    4. For technical questions: Explain simply or redirect to appropriate resources
    5. Always maintain a helpful, professional tone`
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
  conversationHistory.push({ role: "user", content: input });
  userInput.value = '';

  // Show typing indicator
  const typing = document.createElement('div');
  typing.className = 'bot-message typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    // First check for special commands
    if (handleSpecialCommands(input)) {
      chatMessages.removeChild(typing);
      return;
    }

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
        "X-Title": document.title
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-zero:free",
        "messages": conversationHistory,
        "temperature": 0.7,
        "max_tokens": 500
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    let botResponse = data.choices?.[0]?.message?.content || "I couldn't understand that. Please try again.";
    
    // Format the response based on content
    botResponse = formatResponse(input, botResponse);
    
    // Add bot response to history and chat
    conversationHistory.push({ role: "assistant", content: botResponse });
    chatMessages.removeChild(typing);
    addMessage('bot', botResponse);
    
  } catch (error) {
    console.error('Error:', error);
    chatMessages.removeChild(typing);
    addMessage('bot', "Sorry, I'm having trouble responding right now. Please try again later.");
  }
}

function handleSpecialCommands(input) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput === 'help' || lowerInput === 'commands') {
    showHelp();
    return true;
  }
  
  if (lowerInput === 'clear' || lowerInput === 'reset chat') {
    clearChat();
    return true;
  }
  
  if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
    addMessage('bot', "You're welcome! Is there anything else I can help you with?");
    return true;
  }
  
  return false;
}

function showHelp() {
  const helpMessage = `
    <div class="help-message">
      <h4>How I can help:</h4>
      <ul>
        <li><strong>Medical questions:</strong> Symptoms, conditions, medications</li>
        <li><strong>Wellness advice:</strong> Nutrition, exercise, mental health</li>
        <li><strong>Doctor information:</strong> Find specialists in our database</li>
        <li><strong>General knowledge:</strong> Health-related facts and information</li>
      </ul>
      <p>Try asking:</p>
      <ul>
        <li>"What are symptoms of diabetes?"</li>
        <li>"How much water should I drink daily?"</li>
        <li>"Find me a cardiologist"</li>
      </ul>
    </div>
  `;
  addMessage('bot', helpMessage);
}

function clearChat() {
  // Keep only the system message in history
  conversationHistory = [conversationHistory[0]];
  // Clear the chat UI
  chatMessages.innerHTML = `
    <div class="bot-message">
      <div class="message-content">
        Chat cleared. How can I help you now?
      </div>
      <div class="message-time">Just now</div>
    </div>
  `;
}

function formatResponse(input, text) {
  const lowerInput = input.toLowerCase();
  
  // Format fruit responses
  if (lowerInput.includes("name any fruit") || lowerInput.includes("suggest a fruit")) {
    const fruitMatch = text.match(/\{([^}]+)\}/);
    const fruit = fruitMatch ? fruitMatch[1] : "apple";
    return `
      <div class="fruit-response">
        <p>Here's a fruit suggestion:</p>
        <p><strong>${fruit.charAt(0).toUpperCase() + fruit.slice(1)}</strong> is an excellent choice!</p>
        <p>Nutritional benefits: Rich in vitamins, fiber, and antioxidants.</p>
      </div>
    `;
  }
  
  // Format test responses
  if (lowerInput.includes("diagnostic test") || lowerInput.includes("medical test")) {
    return `
      <div class="test-suggestion">
        <h4>Relevant Medical Tests:</h4>
        ${extractTestInformation(text)}
        <p>Always consult with your healthcare provider about which tests are appropriate for you.</p>
      </div>
    `;
  }
  
  // Format medication responses
  if (lowerInput.includes("medicine") || lowerInput.includes("medication") || lowerInput.includes("pill")) {
    return `
      <div class="medication-response">
        <h4>Medication Information:</h4>
        ${text}
        <p class="disclaimer">Note: This is general information only. Always follow your doctor's prescription.</p>
      </div>
    `;
  }
  
  // Format general responses
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>');
}

function extractTestInformation(text) {
  // Simple extraction of test information
  if (text.includes("ECG") || text.includes("EKG")) {
    return `
      <ul>
        <li><strong>Electrocardiogram (ECG/EKG)</strong> - Records heart's electrical activity</li>
        <li><strong>Blood Tests</strong> - Checks cholesterol, sugar levels, etc.</li>
        <li><strong>Imaging Tests</strong> - X-rays, CT scans, or MRIs if needed</li>
      </ul>
    `;
  }
  return text; // Fallback to original text if no specific tests found
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

// Add CSS for new message types
const style = document.createElement('style');
style.textContent = `
  .fruit-response, .test-suggestion, .medication-response {
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 8px;
    margin: 8px 0;
    border-left: 3px solid #4a89dc;
  }
  
  .help-message {
    background-color: #f0f7ff;
    padding: 12px;
    border-radius: 8px;
  }
  
  .help-message h4 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .disclaimer {
    font-size: 0.8em;
    color: #666;
    font-style: italic;
    margin-top: 10px;
  }
`;
document.head.appendChild(style);