document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector(".custom-loader");
    const counter = document.querySelector(".progress-counter");
    
    // Check if loader was already shown in this session (using localStorage instead of sessionStorage)
    if (localStorage.getItem("loaderShown")) {
        // Hide immediately if already shown
        loader.style.display = 'none';
        document.body.style.overflow = '';
        return;
    }

    // Lock scrolling while loader is active
    document.body.style.overflow = 'hidden';

    // Start loading animation
    let progress = 0;
    const interval = setInterval(() => {
        // Increment progress randomly between 5-15% each step
        progress += Math.floor(Math.random() * 10) + 5;
        
        // Cap at 100%
        if (progress > 100) progress = 100;
        
        counter.textContent = `${progress}%`;

        // When complete
        if (progress === 100) {
            clearInterval(interval);
            
            // Add completion class for any animations
            loader.classList.add("complete");
            
            // Hide after delay
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = '';
                
                // Mark as shown in localStorage (persists across sessions)
                localStorage.setItem("loaderShown", "true");
            }, 500);
        }
    }, 200);

    // Reset loader only when explicitly needed (like after logout)
    // You can call this function when you want to show loader again
    window.resetLoader = function() {
        localStorage.removeItem("loaderShown");
    };
});