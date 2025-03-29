document.addEventListener('DOMContentLoaded', function() {
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

  // Display cart items or empty state
  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    emptyCart.style.display = 'flex';
  } else {
    cartItemsContainer.style.display = 'block';
    emptyCart.style.display = 'none';
    renderCartItems(cart);
  }

  // Calculate and display totals
  updateTotals(cart);

  // Event listeners
  shopBtn.addEventListener('click', function() {
    window.location.href = 'pharmacy.html';
  });

  checkoutBtn.addEventListener('click', function() {
    if (cart.length > 0) {
      alert('Proceeding to checkout!');
      // In a real app, this would redirect to checkout page
    }
  });

  // Render cart items
  function renderCartItems(cartItems) {
    cartItemsContainer.innerHTML = '<h2><i class="fas fa-prescription-bottle-alt"></i> Medications</h2>';
    
    cartItems.forEach((item, index) => {
      const icon = item.type === 'tablet' ? 'fa-pills' : 
                  item.type === 'capsule' ? 'fa-capsules' :
                  item.type === 'syrup' ? 'fa-flask' :
                  item.type === 'injection' ? 'fa-syringe' :
                  item.type === 'topical' ? 'fa-spray-can' : 'fa-tablets';
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.dataset.id = item.id;
      cartItem.innerHTML = `
        <div class="item-info">
          <div class="item-image">
            <i class="fas ${icon}"></i>
          </div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            ${item.prescription ? '<p>Prescription required</p>' : ''}
          </div>
        </div>
        <div class="item-controls">
          <div class="quantity-control">
            <button class="quantity-btn minus">-</button>
            <span class="quantity">${item.quantity || 1}</span>
            <button class="quantity-btn plus">+</button>
          </div>
          <div class="item-price">${item.price}</div>
          <button class="remove-btn">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
      
      // Add event listeners to buttons
      const minusBtn = cartItem.querySelector('.minus');
      const plusBtn = cartItem.querySelector('.plus');
      const removeBtn = cartItem.querySelector('.remove-btn');
      
      minusBtn.addEventListener('click', () => updateQuantity(index, -1));
      plusBtn.addEventListener('click', () => updateQuantity(index, 1));
      removeBtn.addEventListener('click', () => removeItem(index));
    });
  }

  // Update quantity
  function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
      cart[index].quantity = (cart[index].quantity || 1) + change;
      
      // Remove item if quantity reaches 0
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateTotals(cart);
      
      if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'flex';
      } else {
        renderCartItems(cart);
      }
      
      // Update cart count in navbar
      updateNavCartCount(cart);
    }
  }

  // Remove item
  function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotals(cart);
    
    if (cart.length === 0) {
      cartItemsContainer.style.display = 'none';
      emptyCart.style.display = 'flex';
    } else {
      renderCartItems(cart);
    }
    
    // Update cart count in navbar
    updateNavCartCount(cart);
  }

  // Update totals
  function updateTotals(cart) {
    const itemCountValue = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const subtotalValue = cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * (item.quantity || 1));
    }, 0);
    const shippingValue = 3.99;
    const taxValue = subtotalValue * 0.08; // 8% tax
    
    itemCount.textContent = itemCountValue;
    subtotal.textContent = `$${subtotalValue.toFixed(2)}`;
    tax.textContent = `$${taxValue.toFixed(2)}`;
    total.textContent = `$${(subtotalValue + shippingValue + taxValue).toFixed(2)}`;
    
    // Update cart count in navbar
    updateNavCartCount(cart);
  }

  // Update cart count in navbar
  function updateNavCartCount(cart) {
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    navCartCount.textContent = count;
    navCartCount.style.display = count > 0 ? 'flex' : 'none';
  }
});