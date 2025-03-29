// Simple search functionality
document.querySelector('.search-filter input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const specialty = card.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || specialty.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Filter by specialty
document.querySelector('.search-filter select').addEventListener('change', function(e) {
    const specialty = e.target.value.toLowerCase();
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    if (!specialty) {
        doctorCards.forEach(card => card.style.display = 'block');
        return;
    }
    
    doctorCards.forEach(card => {
        const cardSpecialty = card.querySelector('p').textContent.toLowerCase();
        
        if (cardSpecialty.includes(specialty)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality for specialty tags
    const tags = document.querySelectorAll('.tag');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            tags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            const specialty = this.dataset.specialty;
            
            // Filter doctors
            doctorCards.forEach(card => {
                if (specialty === '' || card.dataset.specialty === specialty) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        doctorCards.forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            const specialty = card.querySelector('.specialty').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || specialty.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Filter dropdown functionality
    const filterSelect = document.querySelector('.filter-box select');
    filterSelect.addEventListener('change', function() {
        const selectedSpecialty = this.value;
        
        doctorCards.forEach(card => {
            if (selectedSpecialty === '' || card.dataset.specialty === selectedSpecialty) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});