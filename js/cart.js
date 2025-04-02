// Wrapped in a function to avoid polluting global scope
(function() {
  // Enhanced DOM ready check for Android WebView
  function domReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Double RAF for Android WebView compatibility
      requestAnimationFrame(function() {
        requestAnimationFrame(fn);
      });
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  domReady(function() {
    try {
      // Load cart items with fallback for Android WebView localStorage issues
      let cart = [];
      try {
        const cartData = localStorage.getItem('cart');
        cart = cartData ? JSON.parse(cartData) : [];
      } catch (e) {
        console.error('Error loading cart:', e);
        cart = [];
      }

      // Get DOM elements with null checks
      const cartItemsContainer = document.getElementById('cartItems');
      const emptyCart = document.querySelector('.empty-cart');
      const itemCount = document.getElementById('itemCount');
      const subtotal = document.getElementById('subtotal');
      const tax = document.getElementById('tax');
      const total = document.getElementById('total');
      const navCartCount = document.getElementById('navCartCount');
      const checkoutBtn = document.getElementById('checkoutBtn');
      const shopBtn = document.getElementById('shopBtn');

      // Check if required elements exist
      if (!cartItemsContainer || !emptyCart) {
        console.error('Required cart elements not found');
        return;
      }

      // Initial render
      updateCartDisplay(cart);
      updateTotals(cart);
      updateNavCartCount(cart);

      // Event listeners with Android WebView compatible fallbacks
      if (shopBtn) {
        shopBtn.addEventListener('click', function() {
          window.location.href = 'pharmacy.html';
        });
      }

      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
          if (cart.length > 0) {
            // Android WebView compatible alert
            if (typeof Android !== 'undefined' && Android.showAlert) {
              Android.showAlert("Proceeding to checkout!");
            } else {
              alert('Proceeding to checkout!');
            }
          }
        });
      }

      // Update cart display based on items
      function updateCartDisplay(cartItems) {
        if (!cartItemsContainer || !emptyCart) return;
        
        if (cartItems.length === 0) {
          cartItemsContainer.style.display = 'none';
          emptyCart.style.display = 'flex';
        } else {
          cartItemsContainer.style.display = 'block';
          emptyCart.style.display = 'none';
          renderCartItems(cartItems);
        }
      }

      // Render cart items with performance optimizations
      function renderCartItems(cartItems) {
        if (!cartItemsContainer) return;
        
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.innerHTML = '<i class="fas fa-prescription-bottle-alt"></i> Medications';
        fragment.appendChild(heading);
        
        cartItems.forEach((item, index) => {
          const icon = getIconForType(item.type);
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.dataset.id = item.id;
          cartItem.innerHTML = `
            <div class="item-info">
              <div class="item-image">
                <i class="fas ${icon}"></i>
              </div>
              <div class="item-details">
                <h3>${escapeHtml(item.name)}</h3>
                <p>${escapeHtml(item.description)}</p>
                ${item.prescription ? '<p class="prescription-notice">Prescription required</p>' : ''}
              </div>
            </div>
            <div class="item-controls">
              <div class="quantity-control">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity">${item.quantity || 1}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
              </div>
              <div class="item-price">${escapeHtml(item.price)}</div>
              <button class="remove-btn" data-index="${index}">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          `;
          fragment.appendChild(cartItem);
        });
        
        // Clear and append new content in one operation
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(fragment);
        
        // Use event delegation for better performance
        cartItemsContainer.addEventListener('click', function(e) {
          const target = e.target.closest('.minus, .plus, .remove-btn');
          if (!target) return;
          
          const index = parseInt(target.dataset.index);
          if (isNaN(index)) return;
          
          if (target.classList.contains('minus')) {
            updateQuantity(index, -1);
          } else if (target.classList.contains('plus')) {
            updateQuantity(index, 1);
          } else if (target.classList.contains('remove-btn')) {
            removeItem(index);
          }
        });
      }

      // Helper function to get icon
      function getIconForType(type) {
        const icons = {
          'tablet': 'fa-pills',
          'capsule': 'fa-capsules',
          'syrup': 'fa-flask',
          'injection': 'fa-syringe',
          'topical': 'fa-spray-can'
        };
        return icons[type] || 'fa-tablets';
      }

      // More robust HTML escaping
      function escapeHtml(unsafe) {
        if (unsafe == null) return '';
        return unsafe.toString()
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      // Update quantity with validation
      function updateQuantity(index, change) {
        if (index < 0 || index >= cart.length) return;
        
        cart[index].quantity = (cart[index].quantity || 1) + change;
        
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
        
        saveCart(cart);
      }

      // Remove item with validation
      function removeItem(index) {
        if (index < 0 || index >= cart.length) return;
        cart.splice(index, 1);
        saveCart(cart);
      }

      // Save cart with Android WebView fallback
      function saveCart(cart) {
        try {
          localStorage.setItem('cart', JSON.stringify(cart));
          updateTotals(cart);
          updateCartDisplay(cart);
          updateNavCartCount(cart);
        } catch (e) {
          console.error('Error saving cart:', e);
          // Fallback for Android WebView localStorage issues
          if (typeof Android !== 'undefined' && Android.showToast) {
            Android.showToast("Could not save cart changes");
          }
        }
      }

      // Update totals with validation
      function updateTotals(cart) {
        const itemCountValue = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        const subtotalValue = cart.reduce((total, item) => {
          try {
            const priceStr = String(item.price).replace(/[^0-9.]/g, '');
            const price = parseFloat(priceStr) || 0;
            return total + (price * (item.quantity || 1));
          } catch (e) {
            return total;
          }
        }, 0);
        
        const shippingValue = 3.99;
        const taxValue = subtotalValue * 0.08;
        
        if (itemCount) itemCount.textContent = itemCountValue;
        if (subtotal) subtotal.textContent = formatCurrency(subtotalValue);
        if (tax) tax.textContent = formatCurrency(taxValue);
        if (total) total.textContent = formatCurrency(subtotalValue + shippingValue + taxValue);
      }

      // More robust currency formatting
      function formatCurrency(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return '$0.00';
        return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }

      // Update cart count in navbar
      function updateNavCartCount(cart) {
        if (!navCartCount) return;
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        navCartCount.textContent = count;
        navCartCount.style.display = count > 0 ? 'flex' : 'none';
        
        // Update Android WebView badge if available
        if (typeof Android !== 'undefined' && Android.updateCartBadge) {
          Android.updateCartBadge(count);
        }
      }

    } catch (error) {
      console.error('Error in cart script:', error);
      // Android WebView compatible error display
      if (typeof Android !== 'undefined' && Android.showToast) {
        Android.showToast("Error loading cart");
      } else {
        alert('There was an error loading the cart. Please try again.');
      }
    }
  });
})();