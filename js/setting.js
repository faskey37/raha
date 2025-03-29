// Settings Manager - This should be included in all pages
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
  
    static saveSettings(settings) {
      localStorage.setItem('rahaSettings', JSON.stringify(settings));
      this.applySettings(settings);
    }
  
    static applySettings(settings) {
      // Apply theme
      let theme = settings.theme;
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
      document.body.className = settings.fontSize + '-text';
  
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
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
  
  // Initialize settings on page load
  document.addEventListener('DOMContentLoaded', function() {
    const settings = SettingsManager.loadSettings();
    SettingsManager.applySettings(settings);
  
    // Only run settings page specific code if we're on the settings page
    if (document.querySelector('.settings-container')) {
      // Initialize form controls with current settings
      document.getElementById('appointmentReminders').checked = settings.appointmentReminders;
      document.getElementById('medicationAlerts').checked = settings.medicationAlerts;
      document.getElementById('healthTips').checked = settings.healthTips;
      document.getElementById('dataSharing').checked = settings.dataSharing;
      document.getElementById('recordsAccess').value = settings.recordsAccess;
      document.getElementById('themeSelect').value = settings.theme;
      document.getElementById('fontSize').value = settings.fontSize;
  
      // Set up event listeners for settings changes
      document.getElementById('appointmentReminders').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.appointmentReminders = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Appointment reminders ${this.checked ? 'enabled' : 'disabled'}`);
      });
  
      document.getElementById('medicationAlerts').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.medicationAlerts = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Medication alerts ${this.checked ? 'enabled' : 'disabled'}`);
      });
  
      document.getElementById('healthTips').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.healthTips = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Health tips ${this.checked ? 'enabled' : 'disabled'}`);
      });
  
      document.getElementById('dataSharing').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.dataSharing = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Data sharing ${this.checked ? 'enabled' : 'disabled'}`);
      });
  
      document.getElementById('recordsAccess').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.recordsAccess = this.value;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast('Medical records access updated');
      });
  
      document.getElementById('themeSelect').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.theme = this.value;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Theme changed to ${this.value}`);
      });
  
      document.getElementById('fontSize').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.fontSize = this.value;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Font size changed to ${this.value}`);
      });
  
      // Password change modal
      document.getElementById('changePasswordBtn').addEventListener('click', function() {
        document.getElementById('passwordModal').style.display = 'flex';
      });
      
      document.getElementById('cancelPasswordChange').addEventListener('click', function() {
        document.getElementById('passwordModal').style.display = 'none';
      });
      
      document.getElementById('savePassword').addEventListener('click', function() {
        const current = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        
        if (!current || !newPass || !confirmPass) {
          SettingsManager.showToast('Please fill all fields', 'error');
          return;
        }
        
        if (newPass !== confirmPass) {
          SettingsManager.showToast('New passwords do not match', 'error');
          return;
        }
        
        // In a real app, you would send this to your backend
        console.log('Password change requested', { current, newPass });
        
        document.getElementById('passwordModal').style.display = 'none';
        SettingsManager.showToast('Password changed successfully');
        
        // Clear fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
      });
  
      // Delete account confirmation
      document.getElementById('deleteAccountBtn').addEventListener('click', function(e) {
        if(!confirm('Are you sure you want to delete your account? This cannot be undone.')) {
          e.preventDefault();
          return;
        }
        
        // In a real app, you would send a delete request to your backend
        console.log('Account deletion requested');
        SettingsManager.showToast('Account deletion initiated. Check your email for confirmation.', 'warning');
      });
    }
  
    // Check system theme preference for system theme setting
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const settings = SettingsManager.loadSettings();
      if (settings.theme === 'system') {
        SettingsManager.applySettings(settings);
      }
    });
  });
  
  // Cart count functionality (shared across pages)
  document.addEventListener('DOMContentLoaded', function() {
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      const navCartCount = document.getElementById('navCartCount');
      
      if (navCartCount) {
        navCartCount.textContent = count;
        navCartCount.style.display = count > 0 ? 'flex' : 'none';
      }
    }
  
    updateCartCount();
    
    // Listen for cart changes from other pages
    window.addEventListener('storage', function(e) {
      if (e.key === 'cart') {
        updateCartCount();
      }
    });
  });



// settings.js - Only for settings page

document.addEventListener('DOMContentLoaded', function() {
    const settings = SettingsManager.loadSettings();
  
    // Initialize form controls with current settings
    document.getElementById('appointmentReminders').checked = settings.appointmentReminders;
    document.getElementById('medicationAlerts').checked = settings.medicationAlerts;
    document.getElementById('healthTips').checked = settings.healthTips;
    document.getElementById('dataSharing').checked = settings.dataSharing;
    document.getElementById('recordsAccess').value = settings.recordsAccess;
    document.getElementById('themeSelect').value = settings.theme;
    document.getElementById('fontSize').value = settings.fontSize;
  
    // Set up event listeners for settings changes
    document.getElementById('appointmentReminders').addEventListener('change', function() {
      const newSettings = SettingsManager.loadSettings();
      newSettings.appointmentReminders = this.checked;
      localStorage.setItem('rahaSettings', JSON.stringify(newSettings));
      SettingsManager.applySettings(newSettings);
      SettingsManager.showToast(`Appointment reminders ${this.checked ? 'enabled' : 'disabled'}`);
    });
  
    document.getElementById('medicationAlerts').addEventListener('change', function() {
      const newSettings = SettingsManager.loadSettings();
      newSettings.medicationAlerts = this.checked;
      localStorage.setItem('rahaSettings', JSON.stringify(newSettings));
      SettingsManager.applySettings(newSettings);
      SettingsManager.showToast(`Medication alerts ${this.checked ? 'enabled' : 'disabled'}`);
    });
  
    // ... (keep all other event listeners the same as before)
  });