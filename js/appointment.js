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
        title: "Flu Checkup"
    },
    {
        id: 2,
        patientName: "Lisa Bryson",
        patientImage: "https://randomuser.me/api/portraits/women/65.jpg",
        doctorName: "Dr. Andrew Moss",
        specialty: "dentist",
        time: "14:00",
        date: getFormattedDate(new Date()),
        title: "Dental Cleaning"
    },
    {
        id: 3,
        patientName: "Donte Tarotto",
        patientImage: "https://randomuser.me/api/portraits/men/44.jpg",
        doctorName: "Dr. Ivory Williams",
        specialty: "neurologist",
        time: "14:30",
        date: getFormattedDate(new Date()),
        title: "Consultation"
    }
];

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
];

// DOM Elements
const dateScroll = document.getElementById('dateScroll');
const specialistTags = document.getElementById('specialistTags');
const appointmentsList = document.getElementById('appointmentsList');
const topDoctorsList = document.getElementById('topDoctorsList');
const openBookingBtn = document.getElementById('openBooking');
const bookingPopup = document.getElementById('bookingPopup');
const bookingForm = document.getElementById('bookingForm');
const closePopup = document.getElementById('closePopup');
const cancelBookingBtn = document.getElementById('cancelBooking');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const monthModal = document.getElementById('monthModal');
const openMonthModal = document.getElementById('openMonthModal');
const closeMonthModal = document.getElementById('closeMonthModal');
const modalYear = document.getElementById('modalYear');
const prevYearBtn = document.getElementById('prevYear');
const nextYearBtn = document.getElementById('nextYear');
const monthGrid = document.getElementById('monthGrid');
const appointmentDateInput = document.getElementById('appointmentDate');

// Current state
let currentDate = new Date();
let currentFilter = 'all';
let modalCurrentDate = new Date(currentDate);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderMonthYear();
    generateDatePills();
    renderAppointments();
    renderTopDoctors();
    setupEventListeners();
    setupModalMonths();
    
    // Set default date to today
    appointmentDateInput.value = getFormattedDateForInput(new Date());
});

// Render current month and year
function renderMonthYear() {
    const options = { month: 'long', year: 'numeric' };
    currentMonthYear.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Generate date pills for the current month
// Update the generateDatePills function to this:
function generateDatePills() {
dateScroll.innerHTML = '';

const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Get first day of month and last day of month
const firstDay = new Date(year, month, 1).getDay();
const lastDay = new Date(year, month, daysInMonth).getDay();

// Add pills for each day of the month
for (let day = 1; day <= daysInMonth; day++) {
const date = new Date(year, month, day);
const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const dayName = dayNames[date.getDay()];

const dateString = getFormattedDate(date);
const isActive = dateString === getFormattedDate(currentDate);

const pill = document.createElement('div');
pill.className = `date-pill ${isActive ? 'active' : ''}`;
pill.dataset.date = dateString;
pill.innerHTML = `
    <div class="day">${dayName}</div>
    <div class="date">${day}</div>
    <div class="title">&nbsp;</div>
`;

pill.addEventListener('click', function() {
    document.querySelector('.date-pill.active')?.classList.remove('active');
    this.classList.add('active');
    currentDate = new Date(this.dataset.date);
    renderAppointments();
});

dateScroll.appendChild(pill);
}

// Scroll to the active date
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

// Render appointments based on current filter and date
function renderAppointments() {
    appointmentsList.innerHTML = '';
    
    let filteredAppointments = appointments.filter(appointment => {
        // Filter by date
        const dateMatch = appointment.date === getFormattedDate(currentDate);
        
        // Filter by specialty
        const specialtyMatch = currentFilter === 'all' || appointment.specialty === currentFilter;
        
        return dateMatch && specialtyMatch;
    });
    
    if (filteredAppointments.length === 0) {
        appointmentsList.innerHTML = '<p class="no-appointments">No appointments found for this date</p>';
        return;
    }
    
    filteredAppointments.forEach(appointment => {
        const card = document.createElement('div');
        card.className = 'appointment-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${appointment.title}</div>
                <div class="card-time">${formatTime(appointment.time)}</div>
            </div>
            <div class="card-content">
                <img src="${appointment.patientImage}" alt="${appointment.patientName}" class="patient-avatar">
                <div class="patient-info">
                    <div class="patient-name">${appointment.patientName}</div>
                    <div class="doctor-name">${appointment.doctorName}</div>
                    <div class="doctor-specialty">${appointment.specialty.charAt(0).toUpperCase() + appointment.specialty.slice(1)}</div>
                </div>
            </div>
        `;
        appointmentsList.appendChild(card);
    });
}

// Render top doctors
function renderTopDoctors() {
    topDoctorsList.innerHTML = '';
    
    topDoctors.forEach(doctor => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
            <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar">
            <div class="doctor-details">
                <div class="doctor-name">${doctor.name}</div>
                <div class="doctor-specialty">${doctor.specialty}</div>
                <div class="doctor-rating">
                    <div class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(doctor.rating))}
                        ${doctor.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    </div>
                    <div class="rating-value">${doctor.rating}</div>
                </div>
            </div>
        `;
        topDoctorsList.appendChild(card);
    });
}

// Set up month selection modal
function setupModalMonths() {
    const months = [
        'January', 'February', 'March', 'April', 
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    
    monthGrid.innerHTML = '';
    
    months.forEach((month, index) => {
        const monthBtn = document.createElement('button');
        monthBtn.className = 'month-btn';
        if (index === modalCurrentDate.getMonth() && 
            modalCurrentDate.getFullYear() === currentDate.getFullYear()) {
            monthBtn.classList.add('active');
        }
        monthBtn.textContent = month;
        monthBtn.dataset.month = index;
        
        monthBtn.addEventListener('click', function() {
            modalCurrentDate.setMonth(index);
            currentDate = new Date(modalCurrentDate);
            renderMonthYear();
            generateDatePills();
            renderAppointments();
            monthModal.classList.remove('active');
        });
        
        monthGrid.appendChild(monthBtn);
    });
    
    modalYear.textContent = modalCurrentDate.getFullYear();
}

// Set up event listeners
function setupEventListeners() {
    // Month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        modalCurrentDate = new Date(currentDate);
        renderMonthYear();
        generateDatePills();
        renderAppointments();
        setupModalMonths();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        modalCurrentDate = new Date(currentDate);
        renderMonthYear();
        generateDatePills();
        renderAppointments();
        setupModalMonths();
    });
    
    // Specialist tag clicks
    specialistTags.querySelectorAll('.specialist-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            specialistTags.querySelector('.specialist-tag.active').classList.remove('active');
            this.classList.add('active');
            currentFilter = this.dataset.specialty;
            renderAppointments();
        });
    });
    
    // Book appointment button
    openBookingBtn.addEventListener('click', function() {
        bookingPopup.classList.add('active');
        // Set default date to currently selected date
        appointmentDateInput.value = getFormattedDate(currentDate);
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
            patientName: "You", // In a real app, this would be the logged in user
            patientImage: "https://randomuser.me/api/portraits/lego/1.jpg", // Default image
            doctorName: doctor.split(' (')[0],
            specialty: specialty,
            time: time,
            date: date,
            title: reason.substring(0, 20) + (reason.length > 20 ? '...' : '') // Truncate if too long
        };
        
        // Add to appointments array
        appointments.push(newAppointment);
        
        // If the date is the current date, update the view
        if (date === getFormattedDate(currentDate)) {
            renderAppointments();
        }
        
        // Show success message
        alert('Appointment booked successfully!');
        
        // Reset form and close
        bookingForm.reset();
        closeBookingForm();
    });
    
    // Month modal controls
    openMonthModal.addEventListener('click', function() {
        monthModal.classList.add('active');
    });
    
    closeMonthModal.addEventListener('click', function() {
        monthModal.classList.remove('active');
    });
    
    prevYearBtn.addEventListener('click', function() {
        modalCurrentDate.setFullYear(modalCurrentDate.getFullYear() - 1);
        modalYear.textContent = modalCurrentDate.getFullYear();
        setupModalMonths();
    });
    
    nextYearBtn.addEventListener('click', function() {
        modalCurrentDate.setFullYear(modalCurrentDate.getFullYear() + 1);
        modalYear.textContent = modalCurrentDate.getFullYear();
        setupModalMonths();
    });
    
    // Close modal when clicking outside
    monthModal.addEventListener('click', function(e) {
        if (e.target === monthModal) {
            monthModal.classList.remove('active');
        }
    });
}

function closeBookingForm() {
    bookingPopup.classList.remove('active');
}

// Helper function to format date as YYYY-MM-DD
function getFormattedDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper function to format date for input field
function getFormattedDateForInput(date) {
    return getFormattedDate(date);
}

// Helper function to format time (HH:MM to HH:MM AM/PM)
function formatTime(time) {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    
    return `${displayHour}:${minutes} ${period}`;
}
