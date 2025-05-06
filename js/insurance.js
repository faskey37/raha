// Insurance Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal Handling
    const modal = document.getElementById('policy-modal');
    const addBtn = document.getElementById('add-policy-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    // Open modal
    addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission
    const policyForm = document.getElementById('policy-form');
    policyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const provider = document.getElementById('provider').value;
        const policyNumber = document.getElementById('policy-number').value;
        const expiry = document.getElementById('expiry').value;
        
        // In a real app, you would save this to your backend
        console.log('Adding policy:', { provider, policyNumber, expiry });
        alert('Policy added successfully!');
        
        // Close modal and reset form
        modal.style.display = 'none';
        policyForm.reset();
        
        // Refresh policy list (in real app would fetch from backend)
        // refreshPolicies();
    });
    
    // Claim button handlers
    document.querySelectorAll('.claim-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would open a claim form
            alert('Redirecting to claims submission...');
        });
    });
    
    // View button handlers
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would show policy details
            alert('Showing policy details...');
        });
    });
    
    // Highlight current page in navbar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});