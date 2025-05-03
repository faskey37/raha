// Add 'loading' class immediately when page starts loading
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loading');
    
    // Hide loader when everything is loaded
    window.addEventListener('load', function() {
      const loader = document.getElementById('loader-overlay');
      const main = document.getElementById('main-content');
      
      // First fade out the loader
      loader.style.opacity = '0';
      
      // Then remove it and show content
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        main.style.display = 'block';
        
        // Force reflow to prevent glitches
        void main.offsetHeight;
      }, 500);
    });
  });