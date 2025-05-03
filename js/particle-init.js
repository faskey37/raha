// particles-init.js
document.addEventListener('DOMContentLoaded', function() {
    // Only load particles if container exists
    if (document.getElementById('particles-js-container')) {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 60,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#4dd0e1"
          },
          "shape": {
            "type": "circle"
          },
          "opacity": {
            "value": 0.5,
            "random": true
          },
          "size": {
            "value": 3,
            "random": true
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#4dd0e1",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out"
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false, // Disabled to prevent scroll issues
              "mode": "grab"
            },
            "onclick": {
              "enable": false, // Disabled to prevent scroll issues
              "mode": "push"
            }
          }
        }
      });
    }
  });