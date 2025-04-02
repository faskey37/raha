document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector(".custom-loader");
    const counter = document.querySelector(".progress-counter");
    
    // Check if loader was already shown in this session
    if (sessionStorage.getItem("loaderShown")) {
        // Hide immediately if already shown
        loader.classList.add("hidden");
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
                loader.classList.add("hidden");
                document.body.style.overflow = '';
                
                // Mark as shown in this session
                sessionStorage.setItem("loaderShown", "true");
            }, 500);
        }
    }, 200);

    // Reset loader when page is fully reloaded (but not on in-app navigation)
    window.addEventListener("beforeunload", function() {
        sessionStorage.removeItem("loaderShown");
    });
});