// Wrapped in a function to avoid polluting global scope
(function() {
  // Wait for DOM to be fully ready
  function domReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  domReady(function() {
    try {
      // Load cart items from localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
        console.error('Required elements not found');
        return;
      }

      // Initial render
      updateCartDisplay(cart);

      // Calculate and display totals
      updateTotals(cart);

      // Event listeners with null checks
      if (shopBtn) {
        shopBtn.addEventListener('click', function() {
          window.location.href = 'pharmacy.html';
        });
      }

      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
          if (cart.length > 0) {
            alert('Proceeding to checkout!');
          }
        });
      }

      // Update cart display based on items
      function updateCartDisplay(cartItems) {
        if (cartItems.length === 0) {
          cartItemsContainer.style.display = 'none';
          emptyCart.style.display = 'flex';
        } else {
          cartItemsContainer.style.display = 'block';
          emptyCart.style.display = 'none';
          renderCartItems(cartItems);
        }
      }

      // Render cart items
      function renderCartItems(cartItems) {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '<h2><i class="fas fa-prescription-bottle-alt"></i> Medications</h2>';
        
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
                ${item.prescription ? '<p>Prescription required</p>' : ''}
              </div>
            </div>
            <div class="item-controls">
              <div class="quantity-control">
                <button class="quantity-btn minus">-</button>
                <span class="quantity">${item.quantity || 1}</span>
                <button class="quantity-btn plus">+</button>
              </div>
              <div class="item-price">${escapeHtml(item.price)}</div>
              <button class="remove-btn">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          `;
          cartItemsContainer.appendChild(cartItem);
          
          // Add event listeners
          cartItem.querySelector('.minus')?.addEventListener('click', () => updateQuantity(index, -1));
          cartItem.querySelector('.plus')?.addEventListener('click', () => updateQuantity(index, 1));
          cartItem.querySelector('.remove-btn')?.addEventListener('click', () => removeItem(index));
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

      // Simple HTML escaping
      function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe.toString()
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      // Update quantity
      function updateQuantity(index, change) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
          cart[index].quantity = (cart[index].quantity || 1) + change;
          
          if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
          }
          
          saveCart(cart);
        }
      }

      // Remove item
      function removeItem(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        saveCart(cart);
      }

      // Save cart and update UI
      function saveCart(cart) {
        try {
          localStorage.setItem('cart', JSON.stringify(cart));
          updateTotals(cart);
          updateCartDisplay(cart);
          updateNavCartCount(cart);
        } catch (e) {
          console.error('Error saving cart:', e);
        }
      }

      // Update totals
      function updateTotals(cart) {
        const itemCountValue = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        const subtotalValue = cart.reduce((total, item) => {
          const price = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
          return total + (price * (item.quantity || 1));
        }, 0);
        const shippingValue = 3.99;
        const taxValue = subtotalValue * 0.08;
        
        if (itemCount) itemCount.textContent = itemCountValue;
        if (subtotal) subtotal.textContent = formatCurrency(subtotalValue);
        if (tax) tax.textContent = formatCurrency(taxValue);
        if (total) total.textContent = formatCurrency(subtotalValue + shippingValue + taxValue);
      }

      // Format currency
      function formatCurrency(value) {
        return '$' + parseFloat(value).toFixed(2);
      }

      // Update cart count in navbar
      function updateNavCartCount(cart) {
        if (!navCartCount) return;
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        navCartCount.textContent = count;
        navCartCount.style.display = count > 0 ? 'flex' : 'none';
      }

    } catch (error) {
      console.error('Error in cart script:', error);
      // Show error to user if needed
      alert('There was an error loading the cart. Please try again.');
    }
  });
})();