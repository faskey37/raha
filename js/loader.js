document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector(".custom-loader");
    const counter = document.querySelector(".progress-counter");
    
    // Check if we're in an Android WebView (for hybrid apps)
    const isAndroidWebView = /Android/.test(navigator.userAgent) && 
                           /wv|WebView/.test(navigator.userAgent);
    
    // Check if loader was shown in this app session (using sessionStorage)
    if (sessionStorage.getItem("loaderShown")) {
        loader.style.display = 'none';
        document.body.style.overflow = '';
        return;
    }

    // Show loader only if it's the first load in this session
    document.body.style.overflow = 'hidden';
    loader.style.display = 'flex'; // Make sure it's visible

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress > 100) progress = 100;
        counter.textContent = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            loader.classList.add("complete");
            
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = '';
                
                // Mark as shown for this session
                sessionStorage.setItem("loaderShown", "true");
                
                // For Android WebView, we need to handle this differently
                if (isAndroidWebView && window.AndroidInterface) {
                    try {
                        window.AndroidInterface.setLoaderShown(true);
                    } catch (e) {
                        console.error("Android interface error:", e);
                    }
                }
            }, 500);
        }
    }, 200);
});

// Call this from Android when the app is minimized and brought back
window.resetLoaderSession = function() {
    sessionStorage.removeItem("loaderShown");
};