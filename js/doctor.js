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
        minDate: "today",
        dateFormat: "M j, Y",
        disable: [
            function(date) {
                // Disable weekends
                return (date.getDay() === 0 || date.getDay() === 6);
            }
        ]
    });

    // Sample doctor data
    const doctors = [
        {
            id: 1,
            name: "Dr. Jane Doe",
            specialty: "Cardiology",
            image: "https://faskey37.github.io/raha/img/doctor.png",
            rating: 4.8,
            reviews: 124,
            experience: "10+ years",
            location: "New York, USA",
            price: "$120",
            available: true,
            nextAvailable: "Today",
            telemed: true,
            languages: ["English", "Spanish"],
            education: "MD, Harvard Medical School",
            bio: "Board-certified cardiologist with extensive experience in preventive cardiology and heart failure management."
        },
        {
            id: 2,
            name: "Dr. John Smith",
            specialty: "Dermatology",
            image: "https://faskey37.github.io/raha/img/doctor.png",
            rating: 4.9,
            reviews: 215,
            experience: "15+ years",
            location: "Los Angeles, USA",
            price: "$150",
            available: false,
            nextAvailable: "Tomorrow",
            telemed: true,
            languages: ["English", "French"],
            education: "MD, Johns Hopkins University",
            bio: "Specializing in cosmetic dermatology and skin cancer prevention with a holistic approach to skin health."
        },
        {
            id: 3,
            name: "Dr. Emily Brown",
            specialty: "Pediatrics",
            image: "https://faskey37.github.io/raha/img/doctor.png",
            rating: 4.7,
            reviews: 98,
            experience: "8+ years",
            location: "Chicago, USA",
            price: "$100",
            available: true,
            nextAvailable: "Today",
            telemed: true,
            languages: ["English", "Mandarin"],
            education: "MD, Stanford University",
            bio: "Pediatrician focused on child development and preventive care with a gentle, child-friendly approach."
        },
        {
            id: 4,
            name: "Dr. Michael Johnson",
            specialty: "Neurology",
            image: "https://faskey37.github.io/raha/img/doctor.png",
            rating: 4.6,
            reviews: 76,
            experience: "12+ years",
            location: "Miami, USA",
            price: "$180",
            available: true,
            nextAvailable: "Today",
            telemed: false,
            languages: ["English", "Portuguese"],
            education: "MD, Mayo Clinic",
            bio: "Neurologist specializing in headache disorders and neurodegenerative diseases with cutting-edge treatments."
        },
        {
            id: 5,
            name: "Dr. Sarah Wilson",
            specialty: "Gynecology",
            image: "https://faskey37.github.io/raha/img/doctor.png",
            rating: 4.9,
            reviews: 187,
            experience: "14+ years",
            location: "Boston, USA",
            price: "$130",
            available: false,
            nextAvailable: "Monday",
            telemed: true,
            languages: ["English", "Arabic"],
            education: "MD, Columbia University",
            bio: "OB/GYN with special interest in women's health through all life stages from adolescence to menopause."
        },
        {
            id: 6,
            name: "Dr. David Lee",
            specialty: "Orthopedics",
            image: "https://faskey37.github.io/raha/img/doctor.png",
            rating: 4.5,
            reviews: 92,
            experience: "9+ years",
            location: "San Francisco, USA",
            price: "$200",
            available: true,
            nextAvailable: "Today",
            telemed: false,
            languages: ["English", "Korean"],
            education: "MD, UCSF",
            bio: "Orthopedic surgeon specializing in sports medicine and minimally invasive joint procedures."
        }
    ];

    // Render doctors
    function renderDoctors(doctorsToRender) {
        const container = document.getElementById('doctors-container');
        container.innerHTML = '';
        
        doctorsToRender.forEach(doctor => {
            const card = document.createElement('div');
            card.className = 'doctor-card';
            card.dataset.specialty = doctor.specialty.toLowerCase();
            card.dataset.id = doctor.id;
            
            card.innerHTML = `
                <div class="doctor-badge ${doctor.available ? 'badge-online' : 'badge-offline'}">
                    ${doctor.available ? 'Available' : 'Offline'}
                </div>
                <div class="doctor-image">
                    <img src="${doctor.image}" alt="${doctor.name}">
                    <div class="rating-badge">
                        <i class="fas fa-star"></i> ${doctor.rating} <span class="review-count">(${doctor.reviews})</span>
                    </div>
                </div>
                <div class="doctor-info">
                    <h4>${doctor.name}</h4>
                    <p class="specialty">${doctor.specialty}</p>
                    <p class="experience"><i class="fas fa-briefcase"></i> ${doctor.experience}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${doctor.location}</p>
                    <div class="availability">
                        <span class="${doctor.available ? 'available' : 'not-available'}">
                            <i class="fas fa-${doctor.available ? 'check' : 'clock'}-circle"></i>
                            ${doctor.available ? 'Available Today' : `Available ${doctor.nextAvailable}`}
                        </span>
                    </div>
                    <p class="price">$${doctor.price} <span>per consultation</span></p>
                    <div class="action-buttons">
                        <button class="btn outline view-profile" data-id="${doctor.id}">
                            <i class="fas fa-user-md"></i> Profile
                        </button>
                        <button class="btn primary book-now" data-id="${doctor.id}">
                            <i class="fas fa-calendar-check"></i> Book
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Add event listeners to new buttons
        document.querySelectorAll('.view-profile').forEach(btn => {
            btn.addEventListener('click', function() {
                const doctorId = parseInt(this.dataset.id);
                showDoctorModal(doctorId);
            });
        });
        
        document.querySelectorAll('.book-now').forEach(btn => {
            btn.addEventListener('click', function() {
                const doctorId = parseInt(this.dataset.id);
                // In a real app, this would redirect to booking page
                alert(`Booking appointment with doctor ID: ${doctorId}`);
            });
        });
    }
    
    // Initial render
    renderDoctors(doctors);
    document.getElementById('results-count').textContent = doctors.length;
    
    // Filter functionality
    function filterDoctors() {
        const searchTerm = document.getElementById('doctor-search').value.toLowerCase();
        const specialtyFilter = document.getElementById('specialty-filter').value.toLowerCase();
        const locationFilter = document.getElementById('location-filter').value.toLowerCase();
        
        const filtered = doctors.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm) || 
                                doctor.specialty.toLowerCase().includes(searchTerm) ||
                                doctor.bio.toLowerCase().includes(searchTerm);
            
            const matchesSpecialty = !specialtyFilter || 
                                   doctor.specialty.toLowerCase().includes(specialtyFilter);
            
            const matchesLocation = !locationFilter || 
                                  doctor.location.toLowerCase().includes(locationFilter);
            
            return matchesSearch && matchesSpecialty && matchesLocation;
        });
        
        renderDoctors(filtered);
        document.getElementById('results-count').textContent = filtered.length;
    }
    
    // Event listeners for filters
    document.getElementById('doctor-search').addEventListener('input', filterDoctors);
    document.getElementById('specialty-filter').addEventListener('change', filterDoctors);
    document.getElementById('location-filter').addEventListener('change', filterDoctors);
    
    // Specialty tags filtering
    document.querySelectorAll('.specialty-tags .tag').forEach(tag => {
        tag.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            document.querySelectorAll('.specialty-tags .tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const specialty = this.dataset.specialty;
            if (specialty === 'all') {
                renderDoctors(doctors);
                document.getElementById('results-count').textContent = doctors.length;
            } else {
                const filtered = doctors.filter(d => d.specialty.toLowerCase() === specialty);
                renderDoctors(filtered);
                document.getElementById('results-count').textContent = filtered.length;
            }
        });
    });
    
    // Sort functionality
    document.getElementById('sort-by').addEventListener('change', function() {
        const sortBy = this.value;
        let sortedDoctors = [...doctors];
        
        switch(sortBy) {
            case 'rating':
                sortedDoctors.sort((a, b) => b.rating - a.rating);
                break;
            case 'experience':
                sortedDoctors.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
                break;
            case 'price':
                sortedDoctors.sort((a, b) => parseInt(a.price.slice(1)) - parseInt(b.price.slice(1)));
                break;
            default:
                // Default is original order
                break;
        }
        
        renderDoctors(sortedDoctors);
    });
    
    // View toggle functionality
    document.querySelectorAll('.view-toggle .view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            document.querySelectorAll('.view-toggle .view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            const gridView = document.getElementById('doctors-container');
            const mapView = document.getElementById('map-view');
            
            if (view === 'map') {
                gridView.style.display = 'none';
                mapView.style.display = 'block';
                initMap();
            } else {
                gridView.style.display = view === 'grid' ? 'grid' : 'block';
                mapView.style.display = 'none';
                
                if (view === 'list') {
                    document.querySelectorAll('.doctor-card').forEach(card => {
                        card.style.maxWidth = '100%';
                    });
                }
            }
        });
    });
    
    // Initialize map (would be more complex in real app)
    function initMap() {
        // This is a simplified version - in a real app you'd use Google Maps API
        const mapElement = document.getElementById('map');
        mapElement.innerHTML = `
            <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#f5f5f5;border-radius:12px;">
                <div style="text-align:center;">
                    <i class="fas fa-map-marker-alt" style="font-size:48px;color:var(--primary);margin-bottom:15px;"></i>
                    <h3 style="margin-bottom:10px;">Doctor Locations</h3>
                    <p style="color:var(--text-light);">Map integration would show doctor locations here</p>
                </div>
            </div>
        `;
    }
    
    // Telemedicine modal
    const telemedBtn = document.getElementById('telemed-btn');
    const telemedModal = document.getElementById('telemed-modal');
    const telemedClose = telemedModal.querySelector('.modal-close');
    
    telemedBtn.addEventListener('click', () => {
        telemedModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    telemedClose.addEventListener('click', () => {
        telemedModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Doctor profile modal
    function showDoctorModal(doctorId) {
        const doctor = doctors.find(d => d.id === doctorId);
        if (!doctor) return;
        
        const modal = document.getElementById('doctor-modal');
        const modalContent = modal.querySelector('.doctor-modal');
        
        // Generate availability slots
        let availabilitySlots = '';
        const slots = generateAvailabilitySlots();
        
        slots.forEach(slot => {
            availabilitySlots += `
                <div class="slot ${slot.available ? '' : 'unavailable'}">
                    ${slot.time}
                </div>
            `;
        });
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Doctor Profile</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="doctor-profile">
                    <img src="${doctor.image}" alt="${doctor.name}">
                    <div class="doctor-rating">
                        <i class="fas fa-star"></i>
                        <span>${doctor.rating} (${doctor.reviews} reviews)</span>
                    </div>
                    <button class="btn primary" style="margin-top:15px;">
                        <i class="fas fa-calendar-check"></i> Book Appointment
                    </button>
                </div>
                <div class="doctor-details">
                    <h3>${doctor.name}</h3>
                    <p class="doctor-specialty">${doctor.specialty}</p>
                    
                    <div class="doctor-meta">
                        <p><i class="fas fa-briefcase"></i> ${doctor.experience} experience</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${doctor.location}</p>
                        <p><i class="fas fa-dollar-sign"></i> ${doctor.price} per consultation</p>
                        <p><i class="fas fa-language"></i> ${doctor.languages.join(', ')}</p>
                        <p><i class="fas fa-graduation-cap"></i> ${doctor.education}</p>
                    </div>
                    
                    <div class="doctor-bio">
                        <h4>About Dr. ${doctor.name.split(' ')[1]}</h4>
                        <p>${doctor.bio}</p>
                    </div>
                    
                    <div class="availability-section">
                        <h4>Available Time Slots</h4>
                        <div class="availability-slots">
                            ${availabilitySlots}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add event listener to close button
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Add event listeners to slots
        modal.querySelectorAll('.slot:not(.unavailable)').forEach(slot => {
            slot.addEventListener('click', function() {
                modal.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    // Helper function to generate sample availability slots
    function generateAvailabilitySlots() {
        const slots = [];
        const startHour = 9;
        const totalSlots = 8;
        const unavailableSlots = [3, 5]; // Indexes of unavailable slots
        
        for (let i = 0; i < totalSlots; i++) {
            const hour = startHour + Math.floor(i / 2);
            const minute = (i % 2) ? '30' : '00';
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour;
            
            slots.push({
                time: `${displayHour}:${minute} ${period}`,
                available: !unavailableSlots.includes(i)
            });
        }
        
        return slots;
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
});