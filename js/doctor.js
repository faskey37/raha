document.addEventListener('DOMContentLoaded', function () {
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
            function (date) {
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
            reviews: 65,
            experience: "11+ years",
            location: "Seattle, USA",
            price: "$140",
            available: true,
            nextAvailable: "Today",
            telemed: false,
            languages: ["English", "Korean"],
            education: "MD, University of California, San Francisco",
            bio: "Orthopedic surgeon specializing in sports injuries and joint replacement with a focus on patient-centered care."
        }
    ];

    // Render doctors
    const container = document.getElementById('doctor-list');
    if (container) {
        doctors.forEach(doctor => {
            const card = document.createElement('div');
            card.classList.add('doctor-card');
            card.innerHTML = `
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-img">
                <h3>${doctor.name}</h3>
                <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                <p><strong>Rating:</strong> ${doctor.rating} ⭐ (${doctor.reviews} reviews)</p>
                <p><strong>Location:</strong> ${doctor.location}</p>
                <p><strong>Next Available:</strong> ${doctor.nextAvailable}</p>
                <p><strong>Telemedicine:</strong> ${doctor.telemed ? 'Yes' : 'No'}</p>
                <p><strong>Languages:</strong> ${doctor.languages.join(", ")}</p>
                <p><strong>Bio:</strong> ${doctor.bio}</p>
            `;
            container.appendChild(card);
        });
    }
});
