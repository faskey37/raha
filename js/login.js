document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    // In a real app, you would send this data to your backend
    console.log('Login data:', { email, password, rememberMe });
    
    // Show success message
    alert('Login successful! Redirecting to your dashboard...');
    
    // Redirect to dashboard (in a real app)
    // window.location.href = 'dashboard.html';
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.querySelector('i').classList[1].split('-')[1];
        alert(`In a real app, this would initiate ${provider} login`);
    });
});