document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const toast = document.getElementById('toast');
    const profileForm = document.getElementById('profileForm');
    const editToggle = document.getElementById('editToggle');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const photoUpload = document.getElementById('photoUpload');
    const profilePicContainer = document.getElementById('profilePicContainer');
    const profilePic = document.getElementById('profilePic');
    
    // Form fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const location = document.getElementById('location');
    const bio = document.getElementById('bio');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    
    // Display fields
    const displayName = document.getElementById('displayName');
    const displayEmail = document.getElementById('displayEmail');
    const displayPhone = document.getElementById('displayPhone');
    const displayLocation = document.getElementById('displayLocation');
    const displayAge = document.getElementById('displayAge');
    const displayGender = document.getElementById('displayGender');
    
    // Initially disable form
    disableForm();
    
    // Event Listeners
    editToggle.addEventListener('click', enableForm);
    cancelBtn.addEventListener('click', disableForm);
    profileForm.addEventListener('submit', saveProfile);
    photoUpload.addEventListener('change', updateProfilePic);
    profilePicContainer.addEventListener('click', () => photoUpload.click());
    
    // Load profile data (in a real app, this would come from an API)
    loadProfileData();
    
    // Functions
    function loadProfileData() {
        // In a real app, you would fetch this from your backend
        const profileData = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+123 456 7890",
            location: "New York, USA",
            bio: "Passionate about health and wellness. Always learning!",
            age: 32,
            gender: "Male",
            joinDate: "2022"
        };
        
        // Update form fields
        fullName.value = profileData.name;
        email.value = profileData.email;
        phone.value = profileData.phone;
        location.value = profileData.location;
        bio.value = profileData.bio;
        age.value = profileData.age;
        gender.value = profileData.gender;
        
        // Update display fields
        displayName.textContent = profileData.name;
        displayEmail.textContent = profileData.email;
        displayPhone.textContent = profileData.phone;
        displayLocation.textContent = profileData.location;
        displayAge.textContent = profileData.age + " years";
        displayGender.textContent = profileData.gender;
        document.getElementById('joinDate').textContent = profileData.joinDate;
    }
    
    function enableForm() {
        Array.from(document.querySelectorAll('.form-control')).forEach(input => {
            input.disabled = false;
        });
        saveBtn.disabled = false;
        cancelBtn.style.display = 'block';
        editToggle.style.display = 'none';
    }
    
    function disableForm() {
        Array.from(document.querySelectorAll('.form-control')).forEach(input => {
            input.disabled = true;
        });
        saveBtn.disabled = true;
        cancelBtn.style.display = 'none';
        editToggle.style.display = 'flex';
    }
    
    function saveProfile(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) return;
        
        // Update display fields
        displayName.textContent = fullName.value;
        displayEmail.textContent = email.value;
        displayPhone.textContent = phone.value;
        displayLocation.textContent = location.value;
        displayAge.textContent = age.value + " years";
        displayGender.textContent = gender.value;
        
        // Show success toast
        showToast();
        
        // Disable form after save
        disableForm();
        
        // In a real app, you would send this data to your backend
        console.log("Profile saved:", {
            name: fullName.value,
            email: email.value,
            phone: phone.value,
            location: location.value,
            bio: bio.value,
            age: age.value,
            gender: gender.value
        });
    }
    
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Validate name
        if (fullName.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Please enter your name';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Validate phone (if provided)
        if (phone.value && !/^[\d\s\+\-\(\)]{10,}$/.test(phone.value)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            document.getElementById('phoneError').style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    function updateProfilePic(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePic.src = event.target.result;
                
                // In a real app, you would upload this to your backend
                console.log("Profile picture updated");
            };
            reader.readAsDataURL(file);
        }
    }
    
    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Load cart count from localStorage
    updateCartCount();
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        const navCartCount = document.getElementById('navCartCount');
        
        if (navCartCount) {
            navCartCount.textContent = count;
            navCartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }
});