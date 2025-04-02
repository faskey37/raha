document.addEventListener("DOMContentLoaded", function () {
    let counter = document.querySelector(".progress-counter");
    let loader = document.querySelector(".custom-loader");

    // First ensure body has no scroll
    document.body.style.overflow = 'hidden';
    
    let progress = 0;

    let interval = setInterval(() => {
        progress += 5;
        counter.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add("hidden");
                // Restore body scroll when loader is hidden
                document.body.style.overflow = '';
            }, 500);
        }
    }, 200);
});