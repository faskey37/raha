   // Settings Manager
    class SettingsManager {
      static defaultSettings = {
        appointmentReminders: true,
        medicationAlerts: true,
        healthTips: false,
        notificationSound: true,
        dataSharing: false,
        biometricLogin: false,
        recordsAccess: 'my',
        theme: 'light',
        fontSize: 'medium',
        twoFactorAuth: false
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
      
      static checkPasswordStrength(password) {
        if (!password) return 0;
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character type checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return Math.min(strength, 5);
      }
    }
    
    // Initialize settings on page load
    document.addEventListener('DOMContentLoaded', function() {
      const settings = SettingsManager.loadSettings();
      SettingsManager.applySettings(settings);
    
      // Initialize form controls with current settings
      document.getElementById('appointmentReminders').checked = settings.appointmentReminders;
      document.getElementById('medicationAlerts').checked = settings.medicationAlerts;
      document.getElementById('healthTips').checked = settings.healthTips;
      document.getElementById('notificationSound').checked = settings.notificationSound;
      document.getElementById('dataSharing').checked = settings.dataSharing;
      document.getElementById('biometricLogin').checked = settings.biometricLogin;
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
      
      document.getElementById('notificationSound').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.notificationSound = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Notification sound ${this.checked ? 'enabled' : 'disabled'}`);
      });
    
      document.getElementById('dataSharing').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.dataSharing = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Data sharing ${this.checked ? 'enabled' : 'disabled'}`);
      });
      
      document.getElementById('biometricLogin').addEventListener('change', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.biometricLogin = this.checked;
        SettingsManager.saveSettings(newSettings);
        SettingsManager.showToast(`Biometric login ${this.checked ? 'enabled' : 'disabled'}`);
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
      
      // Two-factor authentication
      document.getElementById('enable2FABtn').addEventListener('click', function() {
        const newSettings = SettingsManager.loadSettings();
        newSettings.twoFactorAuth = !newSettings.twoFactorAuth;
        SettingsManager.saveSettings(newSettings);
        this.innerHTML = newSettings.twoFactorAuth ? 
          '<i class="fas fa-shield-alt"></i> Disable' : 
          '<i class="fas fa-shield-alt"></i> Enable';
        SettingsManager.showToast(`Two-factor authentication ${newSettings.twoFactorAuth ? 'enabled' : 'disabled'}`);
      });
    
      // Password change modal
      const passwordModal = document.getElementById('passwordModal');
      
      document.getElementById('changePasswordBtn').addEventListener('click', function() {
        passwordModal.style.display = 'flex';
        setTimeout(() => {
          passwordModal.classList.add('show');
        }, 10);
      });
      
      document.getElementById('cancelPasswordChange').addEventListener('click', function() {
        passwordModal.classList.remove('show');
        setTimeout(() => {
          passwordModal.style.display = 'none';
        }, 300);
      });
      
      // Password strength indicator
      document.getElementById('newPassword').addEventListener('input', function() {
        const strength = SettingsManager.checkPasswordStrength(this.value);
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        strengthBar.style.width = `${strength * 20}%`;
        
        if (strength <= 1) {
          strengthBar.style.backgroundColor = '#dc3545';
          strengthText.textContent = 'Weak';
        } else if (strength <= 3) {
          strengthBar.style.backgroundColor = '#ffc107';
          strengthText.textContent = 'Medium';
        } else {
          strengthBar.style.backgroundColor = '#28a745';
          strengthText.textContent = 'Strong';
        }
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
        
        if (newPass.length < 8) {
          SettingsManager.showToast('Password must be at least 8 characters', 'error');
          return;
        }
        
        // In a real app, you would send this to your backend
        console.log('Password change requested', { current, newPass });
        
        SettingsManager.showToast('Password changed successfully');
        
        // Close modal and clear fields
        passwordModal.classList.remove('show');
        setTimeout(() => {
          passwordModal.style.display = 'none';
          document.getElementById('currentPassword').value = '';
          document.getElementById('newPassword').value = '';
          document.getElementById('confirmPassword').value = '';
          document.querySelector('.strength-bar').style.width = '0%';
          document.querySelector('.strength-text').textContent = 'Password strength';
        }, 300);
      });
    
      // Delete account confirmation
      const deleteConfirmation = document.getElementById('deleteConfirmation');
      
      document.getElementById('deleteAccountBtn').addEventListener('click', function() {
        deleteConfirmation.style.display = 'flex';
        setTimeout(() => {
          deleteConfirmation.classList.add('show');
        }, 10);
      });
      
      document.getElementById('cancelDelete').addEventListener('click', function() {
        deleteConfirmation.classList.remove('show');
        setTimeout(() => {
          deleteConfirmation.style.display = 'none';
        }, 300);
      });
      
      document.getElementById('confirmDelete').addEventListener('click', function() {
        // In a real app, you would send a delete request to your backend
        console.log('Account deletion confirmed');
        SettingsManager.showToast('Account deletion initiated. Check your email for confirmation.', 'warning');
        
        deleteConfirmation.classList.remove('show');
        setTimeout(() => {
          deleteConfirmation.style.display = 'none';
        }, 300);
      });
      
      // Change app icon
      document.getElementById('changeIconBtn').addEventListener('click', function() {
        SettingsManager.showToast('App icon change feature coming soon!', 'warning');
      });
    
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