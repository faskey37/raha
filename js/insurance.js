document.addEventListener('DOMContentLoaded', function() {
    // Modal Handling
    const modal = document.getElementById('policy-modal');
    const addBtn = document.getElementById('add-policy-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    // Open modal
    addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    const policyForm = document.getElementById('policy-form');
    policyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const provider = document.getElementById('provider').value;
        const policyNumber = document.getElementById('policy-number').value;
        const policyName = document.getElementById('policy-name').value;
        const coverage = document.getElementById('coverage').value;
        const startDate = document.getElementById('start-date').value;
        const expiry = document.getElementById('expiry').value;
        const policyType = document.getElementById('policy-type').value;
        
        // In a real app, you would save this to your backend
        console.log('Adding policy:', { 
            provider, 
            policyNumber, 
            policyName, 
            coverage, 
            startDate, 
            expiry, 
            policyType 
        });
        
        // Show success message
        showToast('Policy added successfully!', 'success');
        
        // Close modal and reset form
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        policyForm.reset();
    });
    
    // Claim button handlers
    document.querySelectorAll('.claim-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would open a claim form
            showToast('Redirecting to claims submission...', 'info');
        });
    });
    
    // View button handlers
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would show policy details
            showToast('Showing policy details...', 'info');
        });
    });
    
    // Renew button handler
    document.querySelectorAll('.renew-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Redirecting to policy renewal...', 'info');
        });
    });
    
    // Explore button handler
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Opening provider details...', 'info');
        });
    });
    
    // View all claims button
    document.querySelector('.view-all-btn').addEventListener('click', function() {
        showToast('Loading all claims...', 'info');
    });
    
    // Back button handler
    document.querySelector('.back-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Toast notification function
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Add some sample data for demonstration
    if (window.location.search.includes('demo=true')) {
        // This would be replaced with actual API calls in a real app
        setTimeout(() => {
            showToast('Welcome to your insurance dashboard!', 'success');
        }, 1000);
    }
});