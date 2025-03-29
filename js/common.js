// common.js - This should be included in ALL pages

class SettingsManager {
    static defaultSettings = {
      appointmentReminders: true,
      medicationAlerts: true,
      healthTips: false,
      dataSharing: false,
      recordsAccess: 'my',
      theme: 'light',
      fontSize: 'medium'
    };
  
    static loadSettings() {
      const settings = JSON.parse(localStorage.getItem('rahaSettings')) || {};
      return { ...this.defaultSettings, ...settings };
    }
  
    static applySettings(settings = null) {
      const currentSettings = settings || this.loadSettings();
      
      // Apply theme
      let theme = currentSettings.theme;
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
      }
      
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
  
      // Apply font size
      document.body.className = currentSettings.fontSize + '-text';
    }
  
    static showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.classList.add('show'), 10);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  }
  
  // Apply settings when page loads
  document.addEventListener('DOMContentLoaded', function() {
    SettingsManager.applySettings();
    
    // Watch for system theme changes if using system theme
    const settings = SettingsManager.loadSettings();
    if (settings.theme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        SettingsManager.applySettings();
      });
    }
  });
  
  // Cart functionality (shared across pages)
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const navCartCount = document.getElementById('navCartCount');
    
    if (navCartCount) {
      navCartCount.textContent = count;
      navCartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  
  document.addEventListener('DOMContentLoaded', updateCartCount);
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
      updateCartCount();
    }
  });