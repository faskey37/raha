<script>
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader-overlay');
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => loader.style.display = 'none', 500); // Smooth fade out
  });
</script>
