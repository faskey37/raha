  // Sample data for lab tests
    const labTestData = {
      categories: [
        { id: 'all', name: 'All Tests', icon: 'fa-vial' },
        { id: 'cardiac', name: 'Cardiac', icon: 'fa-heartbeat' },
        { id: 'hormones', name: 'Hormones', icon: 'fa-dna' },
        { id: 'infections', name: 'Infections', icon: 'fa-virus' },
        { id: 'bone', name: 'Bone', icon: 'fa-bone' },
        { id: 'respiratory', name: 'Respiratory', icon: 'fa-lungs' },
        { id: 'diabetes', name: 'Diabetes', icon: 'fa-syringe' },
        { id: 'kidney', name: 'Kidney', icon: 'fa-kidneys' },
        { id: 'liver', name: 'Liver', icon: 'fa-liver' },
        { id: 'thyroid', name: 'Thyroid', icon: 'fa-butterfly' }
      ],
      popularTests: [
        {
          id: 'cbc',
          name: 'Complete Blood Count (CBC)',
          description: 'Measures overall health and detects disorders like anemia and infection',
          price: 499,
          originalPrice: 799,
          category: 'all',
          includedInPackages: ['basic-checkup']
        },
        {
          id: 'thyroid',
          name: 'Thyroid Profile (T3, T4, TSH)',
          description: 'Evaluates thyroid gland function and detects disorders',
          price: 899,
          originalPrice: 1299,
          category: 'hormones',
          includedInPackages: ['advanced-health']
        },
        {
          id: 'lipid',
          name: 'Lipid Profile',
          description: 'Measures cholesterol and triglycerides levels',
          price: 599,
          originalPrice: 899,
          category: 'cardiac',
          includedInPackages: ['basic-checkup']
        },
        {
          id: 'liver',
          name: 'Liver Function Test',
          description: 'Assesses liver health and detects liver disorders',
          price: 699,
          originalPrice: 999,
          category: 'liver',
          includedInPackages: ['basic-checkup']
        },
        {
          id: 'kidney',
          name: 'Kidney Function Test',
          description: 'Evaluates kidney health and detects kidney disorders',
          price: 599,
          originalPrice: 899,
          category: 'kidney',
          includedInPackages: ['basic-checkup']
        },
        {
          id: 'diabetes',
          name: 'Diabetes Screening',
          description: 'Measures blood glucose levels to detect diabetes',
          price: 399,
          originalPrice: 599,
          category: 'diabetes',
          includedInPackages: ['advanced-health']
        },
        {
          id: 'vitamin-d',
          name: 'Vitamin D Test',
          description: 'Measures Vitamin D levels in the blood',
          price: 1199,
          originalPrice: 1599,
          category: 'hormones',
          includedInPackages: ['advanced-health']
        },
        {
          id: 'iron',
          name: 'Iron Studies',
          description: 'Evaluates iron levels and metabolism',
          price: 799,
          originalPrice: 1099,
          category: 'all',
          includedInPackages: ['advanced-health']
        }
      ],
      testPackages: [
        {
          id: 'basic-checkup',
          name: 'Basic Full Body Checkup',
          tests: ['CBC', 'Blood Glucose', 'Liver Function', 'Kidney Function', 'Lipid Profile'],
          price: 1499,
          originalPrice: 2999,
          badge: 'Most Popular'
        },
        {
          id: 'advanced-health',
          name: 'Advanced Health Package',
          tests: ['Complete Hemogram', 'Thyroid Profile', 'Diabetes Screening', 'Vitamin D & B12', 'Iron Studies'],
          price: 2499,
          originalPrice: 4999,
          badge: 'Best Value'
        },
        {
          id: 'women-wellness',
          name: 'Women Wellness Package',
          tests: ['Hemogram', 'Thyroid Profile', 'Vitamin D', 'Calcium', 'Iron Studies'],
          price: 1999,
          originalPrice: 3999,
          badge: ''
        },
        {
          id: 'senior-citizen',
          name: 'Senior Citizen Package',
          tests: ['Complete Hemogram', 'Liver Function', 'Kidney Function', 'Lipid Profile', 'Diabetes Screening'],
          price: 2299,
          originalPrice: 4599,
          badge: ''
        }
      ]
    };

    // Cart state
    let cart = {
      items: [],
      total: 0
    };

    // Current category filter
    let currentCategory = 'all';

    // DOM elements
    const categoriesScroll = document.getElementById('categoriesScroll');
    const popularTests = document.getElementById('popularTests');
    const testPackages = document.getElementById('testPackages');
    const searchModal = document.getElementById('searchModal');
    const openSearch = document.getElementById('openSearch');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const cartCount = document.getElementById('cartCount');

    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
      renderCategories();
      renderPopularTests();
      renderTestPackages();
      loadCart();
      setupEventListeners();
    });

    // Render categories
    function renderCategories() {
      categoriesScroll.innerHTML = '';
      
      labTestData.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = `category-card ${category.id === currentCategory ? 'active' : ''}`;
        categoryCard.dataset.category = category.id;
        categoryCard.innerHTML = `
          <i class="fas ${category.icon}"></i>
          <span>${category.name}</span>
        `;
        
        categoryCard.addEventListener('click', function() {
          currentCategory = this.dataset.category;
          document.querySelector('.category-card.active').classList.remove('active');
          this.classList.add('active');
          renderPopularTests();
        });
        
        categoriesScroll.appendChild(categoryCard);
      });
    }

    // Render popular tests
    function renderPopularTests() {
      popularTests.innerHTML = '';
      
      let filteredTests = labTestData.popularTests;
      if (currentCategory !== 'all') {
        filteredTests = labTestData.popularTests.filter(test => test.category === currentCategory);
      }
      
      if (filteredTests.length === 0) {
        popularTests.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-flask"></i>
            <h3>No Tests Found</h3>
            <p>There are no tests available in this category.</p>
          </div>
        `;
        return;
      }
      
      filteredTests.slice(0, 4).forEach(test => {
        const isInCart = cart.items.some(item => item.id === test.id && item.type === 'test');
        
        const testCard = document.createElement('div');
        testCard.className = 'test-card';
        testCard.innerHTML = `
          <div class="test-info">
            <h3>${test.name}</h3>
            <p class="test-desc">${test.description}</p>
            <div class="test-meta">
              <span class="price">₹${test.price}</span>
              <span class="original-price">₹${test.originalPrice}</span>
              <span class="discount">${Math.round((1 - test.price / test.originalPrice) * 100)}% OFF</span>
            </div>
          </div>
          <button class="add-btn ${isInCart ? 'added-btn' : ''}" data-id="${test.id}" data-type="test">
            ${isInCart ? '<i class="fas fa-check"></i> Added' : '<i class="fas fa-plus"></i> Add'}
          </button>
        `;
        
        popularTests.appendChild(testCard);
      });
    }

    // Render test packages
    function renderTestPackages() {
      testPackages.innerHTML = '';
      
      labTestData.testPackages.forEach(pkg => {
        const isInCart = cart.items.some(item => item.id === pkg.id && item.type === 'package');
        
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        packageCard.innerHTML = `
          ${pkg.badge ? `<div class="package-badge ${pkg.badge.toLowerCase().includes('value') ? 'best-value' : ''}">${pkg.badge}</div>` : ''}
          <div class="package-info">
            <h3>${pkg.name}</h3>
            <ul class="package-tests">
              ${pkg.tests.map(test => `<li>${test}</li>`).join('')}
            </ul>
            <div class="package-meta">
              <div class="price-info">
                <span class="price">₹${pkg.price}</span>
                <span class="original-price">₹${pkg.originalPrice}</span>
                <span class="discount">${Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF</span>
              </div>
              <button class="add-btn ${isInCart ? 'added-btn' : ''}" data-id="${pkg.id}" data-type="package">
                ${isInCart ? '<i class="fas fa-check"></i> Added' : '<i class="fas fa-plus"></i> Add'}
              </button>
            </div>
          </div>
        `;
        
        testPackages.appendChild(packageCard);
      });
    }

    // Render search results
    function renderSearchResults(query) {
      searchResults.innerHTML = '';
      
      if (!query) {
        searchResults.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-search"></i>
            <h3>Search Lab Tests</h3>
            <p>Enter a test name or category to find what you're looking for</p>
          </div>
        `;
        return;
      }
      
      const searchTerm = query.toLowerCase();
      const filteredTests = labTestData.popularTests.filter(test => 
        test.name.toLowerCase().includes(searchTerm) || 
        test.description.toLowerCase().includes(searchTerm)
      );
      
      if (filteredTests.length === 0) {
        searchResults.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-flask"></i>
            <h3>No Results Found</h3>
            <p>We couldn't find any tests matching "${query}"</p>
          </div>
        `;
        return;
      }
      
      filteredTests.forEach(test => {
        const isInCart = cart.items.some(item => item.id === test.id && item.type === 'test');
        
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <h3>${test.name}</h3>
          <p>${test.description}</p>
          <div class="test-meta" style="margin-top: 10px;">
            <span class="price">₹${test.price}</span>
            <span class="original-price">₹${test.originalPrice}</span>
            <span class="discount">${Math.round((1 - test.price / test.originalPrice) * 100)}% OFF</span>
            <button class="add-btn ${isInCart ? 'added-btn' : ''}" 
                    style="margin-left: auto; padding: 5px 10px; font-size: 12px;" 
                    data-id="${test.id}" data-type="test">
              ${isInCart ? '<i class="fas fa-check"></i> Added' : '<i class="fas fa-plus"></i> Add'}
            </button>
          </div>
        `;
        
        searchResults.appendChild(resultItem);
      });
    }

    // Add item to cart
    function addToCart(id, type) {
      let item;
      
      if (type === 'test') {
        item = labTestData.popularTests.find(test => test.id === id);
      } else {
        item = labTestData.testPackages.find(pkg => pkg.id === id);
      }
      
      if (!item) return;
      
      // Check if item is already in cart
      const existingItem = cart.items.find(cartItem => cartItem.id === id && cartItem.type === type);
      if (existingItem) {
        alert('This item is already in your cart');
        return;
      }
      
      // Add to cart
      cart.items.push({
        id: item.id,
        type: type,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice
      });
      
      // Update cart total
      cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
      
      // Save to localStorage
      saveCart();
      
      // Update UI
      updateCartUI();
      
      // Show success message
      showToast(`${item.name} added to cart`);
    }

    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem('rahaLabCart', JSON.stringify(cart));
    }

    // Load cart from localStorage
    function loadCart() {
      const savedCart = localStorage.getItem('rahaLabCart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
      updateCartUI();
    }

    // Update cart UI elements
    function updateCartUI() {
      // Update cart count
      cartCount.textContent = cart.items.length;
      
      // Update add buttons in popular tests
      document.querySelectorAll('.popular-tests .add-btn').forEach(btn => {
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        const isInCart = cart.items.some(item => item.id === id && item.type === type);
        
        if (isInCart) {
          btn.classList.add('added-btn');
          btn.innerHTML = '<i class="fas fa-check"></i> Added';
        } else {
          btn.classList.remove('added-btn');
          btn.innerHTML = '<i class="fas fa-plus"></i> Add';
        }
      });
      
      // Update add buttons in test packages
      document.querySelectorAll('.test-packages .add-btn').forEach(btn => {
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        const isInCart = cart.items.some(item => item.id === id && item.type === type);
        
        if (isInCart) {
          btn.classList.add('added-btn');
          btn.innerHTML = '<i class="fas fa-check"></i> Added';
        } else {
          btn.classList.remove('added-btn');
          btn.innerHTML = '<i class="fas fa-plus"></i> Add';
        }
      });
      
      // Update add buttons in search results
      document.querySelectorAll('.search-results .add-btn').forEach(btn => {
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        const isInCart = cart.items.some(item => item.id === id && item.type === type);
        
        if (isInCart) {
          btn.classList.add('added-btn');
          btn.innerHTML = '<i class="fas fa-check"></i> Added';
        } else {
          btn.classList.remove('added-btn');
          btn.innerHTML = '<i class="fas fa-plus"></i> Add';
        }
      });
    }

    // Show toast notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    // Set up event listeners
    function setupEventListeners() {
      // Search modal
      openSearch.addEventListener('click', function() {
        searchModal.classList.add('active');
        searchInput.focus();
      });
      
      closeSearch.addEventListener('click', function() {
        searchModal.classList.remove('active');
      });
      
      // Search input
      searchInput.addEventListener('input', function() {
        renderSearchResults(this.value);
      });
      
      // Add to cart buttons
      document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-btn') || e.target.closest('.add-btn')) {
          const btn = e.target.classList.contains('add-btn') ? e.target : e.target.closest('.add-btn');
          const id = btn.dataset.id;
          const type = btn.dataset.type;
          
          addToCart(id, type);
        }
      });
      
      // Close modal when clicking outside
      searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
          searchModal.classList.remove('active');
        }
      });
      
      // Close modal with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
          searchModal.classList.remove('active');
        }
      });
    }