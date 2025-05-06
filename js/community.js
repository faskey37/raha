// Community Support Functions
function openGroup(groupId) {
    // In a real app, this would load the specific group page
    console.log("Opening group:", groupId);
    alert(`Loading ${groupId} support group...`);
    // window.location.href = `group.html?id=${groupId}`;
}

function openQuestionForm() {
    // In a real app, this would open a question submission form
    console.log("Opening question form");
    alert("This would open a form to submit questions to doctors");
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Highlight the current page in navbar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // In a real app, you would fetch community posts here
    // fetchCommunityPosts();
});