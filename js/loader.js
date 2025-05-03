<script>
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader-overlay');
    const main = document.getElementById('main-content');

    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';

    setTimeout(() => {
      loader.style.display = 'none';
      main.style.display = 'block'; // now show main UI
    }, 500); // wait for fade-out to finish
  });
</script>
