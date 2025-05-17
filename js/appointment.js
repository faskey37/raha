// Sample data
        let appointments = [
            {
                id: 1,
                patientName: "Jinan Carter",
                patientImage: "https://randomuser.me/api/portraits/men/32.jpg",
                doctorName: "Dr. Nathan Keys",
                specialty: "cardiologist",
                time: "13:30",
                date: getFormattedDate(new Date()),
                title: "Annual Heart Checkup",
                location: "City Heart Center",
                upcoming: false
            },
            {
                id: 2,
                patientName: "Lisa Bryson",
                patientImage: "https://randomuser.me/api/portraits/women/65.jpg",
                doctorName: "Dr. Andrew Moss",
                specialty: "dentist",
                time: "14:00",
                date: getFormattedDate(new Date()),
                title: "Dental Cleaning",
                location: "Bright Smile Dental",
                upcoming: false
            },
            {
                id: 3,
                patientName: "Donte Tarotto",
                patientImage: "https://randomuser.me/api/portraits/men/44.jpg",
                doctorName: "Dr. Ivory Williams",
                specialty: "neurologist",
                time: "14:30",
                date: getFormattedDate(new Date()),
                title: "Migraine Consultation",
                location: "NeuroCare Clinic",
                upcoming: false
            },
            {
                id: 4,
                patientName: "Maria Garcia",
                patientImage: "https://randomuser.me/api/portraits/women/33.jpg",
                doctorName: "Dr. Sarah Johnson",
                specialty: "dermatologist",
                time: "09:00",
                date: getFormattedDate(addDays(new Date(), 2)),
                title: "Skin Allergy Check",
                location: "Skin Health Center",
                upcoming: true
            },
            {
                id: 5,
                patientName: "James Wilson",
                patientImage: "https://randomuser.me/api/portraits/men/22.jpg",
                doctorName: "Dr. Michael Brown",
                specialty: "pediatrician",
                time: "11:30",
                date: getFormattedDate(addDays(new Date(), 5)),
                title: "Child Vaccination",
                location: "KidsCare Hospital",
                upcoming: true
            }
        ];

        const topDoctors = [
            {
                id: 1,
                name: "Dr. Katharine Moss",
                specialty: "Cardiologist",
                rating: 4.5,
                reviews: 128,
                image: "https://randomuser.me/api/portraits/women/33.jpg",
                available: true
            },
            {
                id: 2,
                name: "Dr. Dutcher William",
                specialty: "Neurologist",
                rating: 4.8,
                reviews: 215,
                image: "https://randomuser.me/api/portraits/men/22.jpg",
                available: true
            },
            {
                id: 3,
                name: "Dr. Olivia Carter",
                specialty: "Pediatrician",
                rating: 4.9,
                reviews: 187,
                image: "https://randomuser.me/api/portraits/women/45.jpg",
                available: false
            },
            {
                id: 4,
                name: "Dr. Robert Chen",
                specialty: "Dermatologist",
                rating: 4.7,
                reviews: 156,
                image: "https://randomuser.me/api/portraits/men/55.jpg",
                available: true
            }
        ];

        // DOM Elements
        const dateScroll = document.getElementById('dateScroll');
        const specialistTags = document.getElementById('specialistTags');
        const appointmentsList = document.getElementById('appointmentsList');
        const upcomingAppointments = document.getElementById('upcomingAppointments');
        const topDoctorsList = document.getElementById('topDoctorsList');
        const openBookingBtn = document.getElementById('openBooking');
        const bookingPopup = document.getElementById('bookingPopup');
        const bookingForm = document.getElementById('bookingForm');
        const closePopup = document.getElementById('closePopup');
        const cancelBookingBtn = document.getElementById('cancelBooking');
        const currentMonthYear = document.getElementById('currentMonthYear');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const appointmentDateInput = document.getElementById('appointmentDate');
        const searchBtn = document.getElementById('searchBtn');
        const notificationBtn = document.getElementById('notificationBtn');

        // Current state
        let currentDate = new Date();
        let currentFilter = 'all';

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderMonthYear();
            generateDatePills();
            renderAppointments();
            renderUpcomingAppointments();
            renderTopDoctors();
            setupEventListeners();
            
            // Set default date to today
            appointmentDateInput.value = getFormattedDateForInput(new Date());
            
            // Mark dates with appointments
            markDatesWithAppointments();
        });

        // Helper functions
        function getFormattedDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        function getFormattedDateForInput(date) {
            return getFormattedDate(date);
        }

        function formatTime(time) {
            if (!time) return '';
            
            const [hours, minutes] = time.split(':');
            const hourNum = parseInt(hours, 10);
            const period = hourNum >= 12 ? 'PM' : 'AM';
            const displayHour = hourNum % 12 || 12;
            
            return `${displayHour}:${minutes} ${period}`;
        }

        function addDays(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        // Render current month and year
        function renderMonthYear() {
            const options = { month: 'long', year: 'numeric' };
            currentMonthYear.textContent = currentDate.toLocaleDateString('en-US', options);
        }

        // Generate date pills for the current month
        function generateDatePills() {
            dateScroll.innerHTML = '';

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            const todayFormatted = getFormattedDate(today);

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const dateFormatted = getFormattedDate(date);
                const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                const dayName = dayNames[date.getDay()];

                // Check if this date has any appointments
                const hasAppointment = appointments.some(app => app.date === dateFormatted);
                const isToday = dateFormatted === todayFormatted;

                const pill = document.createElement('div');
                pill.className = `date-pill ${isToday ? 'active' : ''} ${hasAppointment ? 'has-appointment' : ''}`;
                pill.dataset.date = dateFormatted;
                pill.innerHTML = `
                    <div class="day">${dayName}</div>
                    <div class="date">${day}</div>
                    <div class="indicator"></div>
                `;

                pill.addEventListener('click', function() {
                    document.querySelector('.date-pill.active')?.classList.remove('active');
                    this.classList.add('active');
                    currentDate = new Date(this.dataset.date);
                    renderAppointments();
                });

                dateScroll.appendChild(pill);
            }

            // Scroll to today's date
            setTimeout(() => {
                const activePill = document.querySelector('.date-pill.active');
                if (activePill) {
                    activePill.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }, 100);
        }

        // Mark dates that have appointments
        function markDatesWithAppointments() {
            const appointmentDates = [...new Set(appointments.map(app => app.date))];
            
            document.querySelectorAll('.date-pill').forEach(pill => {
                if (appointmentDates.includes(pill.dataset.date)) {
                    pill.classList.add('has-appointment');
                }
            });
        }

        // Render appointments based on current filter and date
        function renderAppointments() {
            appointmentsList.innerHTML = '';
            
            const dateFormatted = getFormattedDate(currentDate);
            let filteredAppointments = appointments.filter(appointment => {
                // Filter by date
                const dateMatch = appointment.date === dateFormatted;
                
                // Filter by specialty
                const specialtyMatch = currentFilter === 'all' || appointment.specialty === currentFilter;
                
                return dateMatch && specialtyMatch && !appointment.upcoming;
            });
            
            if (filteredAppointments.length === 0) {
                appointmentsList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-calendar-times"></i>
                        <h3>No Appointments</h3>
                        <p>You don't have any appointments scheduled for this date.</p>
                        <button class="empty-btn" id="bookNowEmpty">Book Now</button>
                    </div>
                `;
                
                document.getElementById('bookNowEmpty').addEventListener('click', () => {
                    bookingPopup.classList.add('active');
                });
                
                return;
            }
            
            filteredAppointments.forEach(appointment => {
                const card = document.createElement('div');
                card.className = 'appointment-card';
                card.innerHTML = `
                    <div class="appointment-header">
                        <div class="appointment-time">
                            <i class="far fa-clock"></i>
                            ${formatTime(appointment.time)}
                        </div>
                        <div class="appointment-type">${appointment.specialty.charAt(0).toUpperCase() + appointment.specialty.slice(1)}</div>
                    </div>
                    <div class="appointment-body">
                        <img src="${appointment.patientImage}" alt="${appointment.patientName}" class="doctor-avatar">
                        <div class="doctor-info">
                            <h4 class="doctor-name">${appointment.doctorName}</h4>
                            <p class="doctor-specialty">${appointment.title}</p>
                            <p class="doctor-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${appointment.location}
                            </p>
                        </div>
                    </div>
                    <div class="appointment-footer">
                        <button class="action-btn secondary">
                            <i class="fas fa-clock"></i>
                            Reschedule
                        </button>
                        <button class="action-btn primary">
                            <i class="fas fa-video"></i>
                            Join
                        </button>
                    </div>
                `;
                appointmentsList.appendChild(card);
            });
        }

        // Render upcoming appointments
        function renderUpcomingAppointments() {
            upcomingAppointments.innerHTML = '';
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            let upcoming = appointments.filter(appointment => {
                const appDate = new Date(appointment.date);
                return appDate > today && appointment.upcoming;
            });
            
            if (upcoming.length === 0) {
                upcomingAppointments.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-calendar-plus"></i>
                        <h3>No Upcoming Appointments</h3>
                        <p>You don't have any upcoming appointments scheduled.</p>
                        <button class="empty-btn" id="bookNowUpcoming">Book Now</button>
                    </div>
                `;
                
                document.getElementById('bookNowUpcoming').addEventListener('click', () => {
                    bookingPopup.classList.add('active');
                });
                
                return;
            }
            
            upcoming.forEach(appointment => {
                const card = document.createElement('div');
                card.className = 'appointment-card';
                
                // Format the date display (e.g., "Mon, Jun 5")
                const appDate = new Date(appointment.date);
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = appDate.toLocaleDateString('en-US', options);
                
                card.innerHTML = `
                    <div class="appointment-header">
                        <div class="appointment-time">
                            <i class="far fa-calendar-alt"></i>
                            ${formattedDate}, ${formatTime(appointment.time)}
                        </div>
                        <div class="appointment-type">${appointment.specialty.charAt(0).toUpperCase() + appointment.specialty.slice(1)}</div>
                    </div>
                    <div class="appointment-body">
                        <img src="${appointment.patientImage}" alt="${appointment.patientName}" class="doctor-avatar">
                        <div class="doctor-info">
                            <h4 class="doctor-name">${appointment.doctorName}</h4>
                            <p class="doctor-specialty">${appointment.title}</p>
                            <p class="doctor-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${appointment.location}
                            </p>
                        </div>
                    </div>
                    <div class="appointment-footer">
                        <button class="action-btn secondary">
                            <i class="fas fa-clock"></i>
                            Reschedule
                        </button>
                        <button class="action-btn primary">
                            <i class="fas fa-directions"></i>
                            Directions
                        </button>
                    </div>
                `;
                upcomingAppointments.appendChild(card);
            });
        }

        // Render top doctors
        function renderTopDoctors() {
            topDoctorsList.innerHTML = '';
            
            topDoctors.forEach(doctor => {
                const card = document.createElement('div');
                card.className = 'doctor-card-lg';
                card.innerHTML = `
                    <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar-lg">
                    <h4 class="doctor-name-lg">${doctor.name}</h4>
                    <p class="doctor-specialty-lg">${doctor.specialty}</p>
                    <div class="doctor-rating-lg">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(doctor.rating))}
                        ${doctor.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        <span>${doctor.rating} (${doctor.reviews})</span>
                    </div>
                    <button class="book-btn-sm" ${doctor.available ? '' : 'disabled'}>
                        ${doctor.available ? 'Book Now' : 'Not Available'}
                    </button>
                `;
                topDoctorsList.appendChild(card);
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            // Month navigation
            prevMonthBtn.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderMonthYear();
                generateDatePills();
                renderAppointments();
            });
            
            nextMonthBtn.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderMonthYear();
                generateDatePills();
                renderAppointments();
            });
            
            // Specialist tag clicks
            specialistTags.querySelectorAll('.filter-tag').forEach(tag => {
                tag.addEventListener('click', function() {
                    specialistTags.querySelector('.filter-tag.active').classList.remove('active');
                    this.classList.add('active');
                    currentFilter = this.dataset.specialty;
                    renderAppointments();
                });
            });
            
            // Book appointment button
            openBookingBtn.addEventListener('click', function() {
                bookingPopup.classList.add('active');
                // Set default date to currently selected date
                appointmentDateInput.value = getFormattedDateForInput(currentDate);
            });
            
            // Close popup form
            closePopup.addEventListener('click', closeBookingForm);
            cancelBookingBtn.addEventListener('click', closeBookingForm);
            
            // Close when clicking outside form
            bookingPopup.addEventListener('click', function(e) {
                if (e.target === bookingPopup) {
                    closeBookingForm();
                }
            });
            
            // Form submission
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const date = document.getElementById('appointmentDate').value;
                const time = document.getElementById('appointmentTime').value;
                const doctor = document.getElementById('doctorSelect').value;
                const reason = document.getElementById('appointmentReason').value;
                
                // Extract specialty from doctor selection
                const specialtyMatch = doctor.match(/\((.*?)\)/);
                const specialty = specialtyMatch ? specialtyMatch[1].toLowerCase() : '';
                
                // Create new appointment
                const newAppointment = {
                    id: appointments.length + 1,
                    patientName: "You",
                    patientImage: "https://randomuser.me/api/portraits/lego/1.jpg",
                    doctorName: doctor.split(' (')[0],
                    specialty: specialty,
                    time: time,
                    date: date,
                    title: reason.substring(0, 20) + (reason.length > 20 ? '...' : ''),
                    location: "Raha Health Center",
                    upcoming: new Date(date) > new Date()
                };
                
                // Add to appointments array
                appointments.push(newAppointment);
                
                // Update the views
                if (date === getFormattedDate(currentDate)) {
                    renderAppointments();
                }
                renderUpcomingAppointments();
                generateDatePills(); // To update the indicators
                
                // Show success message
                alert('Appointment booked successfully!');
                
                // Reset form and close
                bookingForm.reset();
                closeBookingForm();
            });
            
            // Header buttons
            searchBtn.addEventListener('click', function() {
                alert('Search functionality will be implemented here');
            });
            
            notificationBtn.addEventListener('click', function() {
                alert('Notifications will be shown here');
            });
        }

        function closeBookingForm() {
            bookingPopup.classList.remove('active');
        }