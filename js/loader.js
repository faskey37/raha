document.addEventListener('DOMContentLoaded', function() {
  // Set loading state immediately
  document.body.classList.add('loading');
  
  // Minimum display time for loader (1.5 seconds)
  const minimumLoadTime = 1500;
  const loadStartTime = Date.now();
  
  window.addEventListener('load', function() {
    const loader = document.getElementById('loader-overlay');
    const main = document.getElementById('main-content');
    const elapsed = Date.now() - loadStartTime;
    const remainingTime = Math.max(0, minimumLoadTime - elapsed);
    
    setTimeout(function() {
      // Start fade-out process
      loader.style.opacity = '0';
      
      // After fade-out completes
      setTimeout(function() {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        main.style.display = 'block';
      }, 800); // Matches the CSS transition time
    }, remainingTime);
  });
  
  // Fallback in case load event never fires
  setTimeout(function() {
    if (document.body.classList.contains('loading')) {
      const loader = document.getElementById('loader-overlay');
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        document.getElementById('main-content').style.display = 'block';
      }, 800);
    }
  }, 5000); // Absolute maximum 5 second load time
});