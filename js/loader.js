document.addEventListener("DOMContentLoaded", function () {
    let counter = document.querySelector(".progress-counter");
    let loader = document.querySelector(".custom-loader");

    let progress = 0;

    let interval = setInterval(() => {
        progress += 5;
        counter.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 500);
        }
    }, 200);
});
