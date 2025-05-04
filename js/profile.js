document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loading-overlay').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-overlay').style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize date picker
    flatpickr(".date-picker", {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });

    // Toast notification
    function showToast(message, isSuccess = true) {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('i');
        const toastTitle = toast.querySelector('.title');
        const toastText = toast.querySelector('.text');
        
        toastIcon.className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        toastIcon.style.color = isSuccess ? 'var(--success)' : 'var(--danger)';
        toastTitle.textContent = isSuccess ? 'Success!' : 'Error!';
        toastText.textContent = message;
        
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    // Close toast
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('toast').classList.remove('active');
    });

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.dataset.tab;
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Profile picture upload
    const profilePicContainer = document.getElementById('profilePicContainer');
    const profilePic = document.getElementById('profilePic');
    const photoUpload = document.getElementById('photoUpload');
    
    profilePicContainer.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profilePic.src = event.target.result;
                showToast('Profile picture updated successfully');
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Edit toggle functionality
    function setupEditToggle(editButtonId, formId, actionsId) {
        const editButton = document.getElementById(editButtonId);
        const form = document.getElementById(formId);
        const actions = document.getElementById(actionsId);
        const inputs = form.querySelectorAll('.form-control');
        const cancelButton = actions.querySelector('.cancel-btn');
        
        editButton.addEventListener('click', function() {
            inputs.forEach(input => input.disabled = false);
            actions.style.display = 'flex';
            this.style.display = 'none';
        });
        
        cancelButton.addEventListener('click', function() {
            inputs.forEach(input => {
                input.disabled = true;
                // Reset to original values here if needed
            });
            actions.style.display = 'none';
            editButton.style.display = 'flex';
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            inputs.forEach(input => input.disabled = true);
            actions.style.display = 'none';
            editButton.style.display = 'flex';
            showToast('Information updated successfully');
        });
    }
    
    // Set up edit toggles for all sections
    setupEditToggle('editBasicInfo', 'basicInfoForm', 'basicInfoActions');
    setupEditToggle('editContactInfo', 'contactInfoForm', 'contactInfoActions');
    setupEditToggle('editAboutMe', 'aboutMeForm', 'aboutMeActions');

    // Tags functionality
    const interestsContainer = document.getElementById('interestsContainer');
    const addInterestInput = document.getElementById('addInterest');
    const addInterestButton = document.querySelector('.add-tag button');
    
    // Enable tags editing when about me form is enabled
    document.getElementById('editAboutMe').addEventListener('click', function() {
        addInterestInput.disabled = false;
        addInterestButton.disabled = false;
    });
    
    // Add new interest tag
    addInterestButton.addEventListener('click', function() {
        const interestText = addInterestInput.value.trim();
        if (interestText) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `${interestText} <i class="fas fa-times"></i>`;
            interestsContainer.appendChild(tag);
            addInterestInput.value = '';
            
            // Add remove functionality
            tag.querySelector('i').addEventListener('click', function() {
                tag.remove();
            });
        }
    });
    
    // Initialize existing tags with remove functionality
    document.querySelectorAll('#interestsContainer .tag i').forEach(icon => {
        icon.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });

    // Health metrics charts
    function initCharts() {
        // Weight chart
        const weightCtx = document.getElementById('weightChart').getContext('2d');
        new Chart(weightCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Weight (kg)',
                    data: [72, 71, 70, 69, 68, 68.5],
                    borderColor: 'rgba(74, 107, 255, 1)',
                    backgroundColor: 'rgba(74, 107, 255, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    },
                    x: {
                        display: false
                    }
                }
            }
        });
        
        // Heart rate chart
        const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
        new Chart(heartRateCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Heart Rate (bpm)',
                    data: [75, 74, 76, 73, 72, 71, 72],
                    borderColor: 'rgba(244, 67, 54, 1)',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    },
                    x: {
                        display: false
                    }
                }
            }
        });
        
        // Steps chart
        const stepsCtx = document.getElementById('stepsChart').getContext('2d');
        new Chart(stepsCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Steps',
                    data: [6500, 8000, 7500, 9000, 8500, 7000, 6000],
                    backgroundColor: 'rgba(0, 198, 171, 0.7)',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    },
                    x: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Initialize charts when health tab is clicked
    document.querySelector('[data-tab="health"]').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            setTimeout(initCharts, 300); // Wait for tab transition
        }
    });
    
    // If health tab is active on load, initialize charts
    if (document.querySelector('[data-tab="health"].active')) {
        initCharts();
    }

    // Add health data button
    document.getElementById('addHealthData').addEventListener('click', function() {
        showToast('This would open a form to add health data', true);
    });

    // Upload medical record button
    document.getElementById('uploadMedicalRecord').addEventListener('click', function() {
        showToast('This would open a file upload dialog', true);
    });

    // Settings buttons
    document.querySelectorAll('.setting-item button').forEach(button => {
        button.addEventListener('click', function() {
            const settingName = this.closest('.setting-item').querySelector('h5').textContent;
            showToast(`This would open ${settingName} settings`, true);
        });
    });

    // Logout button
    document.querySelector('.danger-actions .btn-danger:not(.btn-outline)').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            showToast('Logged out successfully', true);
            // In a real app, this would redirect to login page
        }
    });

    // Delete account button
    document.querySelector('.danger-actions .btn-danger.btn-outline').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            showToast('Account deletion request sent', true);
            // In a real app, this would trigger account deletion process
        }
    });
});