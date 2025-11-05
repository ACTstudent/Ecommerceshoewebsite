// Main App Logic
let currentPage = 'home';
let selectedProductId = null;
let selectedCategory = 'all';
let sortBy = 'featured';
let selectedSize = null;
let selectedColor = null;
let quantity = 1;
let orderId = '';

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Navigation
function navigateTo(page, data) {
    currentPage = page;
    if (page === 'product-details' && data) {
        selectedProductId = data;
    } else if (page === 'checkout-details' && data) {
        orderId = data;
    }
    
    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    renderPage();
}

// Render current page
function renderPage() {
    const mainContent = document.getElementById('main-content');
    
    switch (currentPage) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'products':
            mainContent.innerHTML = renderProductsPage();
            break;
        case 'product-details':
            mainContent.innerHTML = renderProductDetailsPage();
            break;
        case 'cart':
            mainContent.innerHTML = renderCartPage();
            break;
        case 'login':
            mainContent.innerHTML = renderLoginPage();
            break;
        case 'signup':
            mainContent.innerHTML = renderSignupPage();
            break;
        case 'account':
            mainContent.innerHTML = renderAccountPage();
            break;
        case 'checkout':
            mainContent.innerHTML = renderCheckoutPage();
            break;
        case 'checkout-details':
            mainContent.innerHTML = renderCheckoutDetailsPage();
            break;
        case 'about':
            mainContent.innerHTML = renderAboutPage();
            break;
        default:
            mainContent.innerHTML = renderHomePage();
    }
}

// Home Page
function renderHomePage() {
    const featuredProducts = products.slice(0, 4);
    
    return `
        <div class="hero">
            <div class="hero-container">
                <div>
                    <h1>Step Into Style</h1>
                    <p>Discover the latest collection of premium shoes designed for comfort and style.</p>
                    <div class="hero-actions">
                        <button class="btn-primary btn-lg" onclick="navigateTo('products')">Shop Now</button>
                        <button class="btn-secondary btn-lg" onclick="navigateTo('about')">Learn More</button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lc3xlbnwxfHx8fDE3NjIyMjE0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Featured Shoe">
                </div>
            </div>
        </div>

        <div class="features">
            <div class="features-container">
                <div class="feature">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="3" width="15" height="13"/>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                    <h3>Free Shipping</h3>
                    <p>On orders over $100</p>
                </div>
                <div class="feature">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <h3>Secure Payment</h3>
                    <p>100% secure transactions</p>
                </div>
                <div class="feature">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <h3>Easy Returns</h3>
                    <p>30-day return policy</p>
                </div>
                <div class="feature">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <h3>Premium Quality</h3>
                    <p>Only the best materials</p>
                </div>
            </div>
        </div>

        <div class="products-section">
            <div class="section-header">
                <h2>Featured Products</h2>
                <p>Check out our latest and most popular shoes</p>
            </div>
            <div class="products-container">
                <div class="products-grid">
                    ${featuredProducts.map(product => `
                        <div class="product-card" onclick="navigateTo('product-details', ${product.id})">
                            <div class="product-image-container">
                                <img src="${product.image}" alt="${product.name}" class="product-image">
                                <div class="product-rating">
                                    <svg class="star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                    </svg>
                                    <span>${product.rating}</span>
                                </div>
                            </div>
                            <div class="product-info">
                                <p class="product-category">${product.category}</p>
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-price">$${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 3rem;">
                    <button class="btn-primary btn-lg" onclick="navigateTo('products')">View All Products</button>
                </div>
            </div>
        </div>

        <div style="background: black; color: white; padding: 5rem 2rem; text-align: center;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Join Our Newsletter</h2>
                <p style="font-size: 1.25rem; color: #d1d5db; margin-bottom: 2rem;">Get exclusive deals and new product announcements</p>
                <div style="display: flex; gap: 1rem; max-width: 500px; margin: 0 auto;">
                    <input type="email" placeholder="Enter your email" style="flex: 1; padding: 1rem; border-radius: 0.375rem; border: none;">
                    <button class="btn-secondary" style="padding: 1rem 2rem;">Subscribe</button>
                </div>
            </div>
        </div>
    `;
}

// Products Page
function renderProductsPage() {
    const categories = ['all', ...new Set(products.map(p => p.category))];
    const filteredProducts = products.filter(p => 
        selectedCategory === 'all' || p.category === selectedCategory
    );
    
    let sortedProducts = [...filteredProducts];
    if (sortBy === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    
    return `
        <div style="background: var(--bg-gray); padding: 3rem 2rem;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">All Products</h1>
                <p style="color: var(--text-gray);">Discover our complete collection of premium shoes</p>
            </div>
        </div>

        <div class="products-container" style="padding: 2rem;">
            <div class="filter-bar">
                <div class="filter-group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    <select onchange="selectedCategory = this.value; renderPage()">
                        <option value="all" ${selectedCategory === 'all' ? 'selected' : ''}>All Categories</option>
                        ${categories.filter(c => c !== 'all').map(cat => 
                            `<option value="${cat}" ${selectedCategory === cat ? 'selected' : ''}>${cat}</option>`
                        ).join('')}
                    </select>
                </div>
                <select onchange="sortBy = this.value; renderPage()">
                    <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                    <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                    <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                    <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
                </select>
            </div>

            <div class="products-grid">
                ${sortedProducts.map(product => `
                    <div class="product-card" onclick="navigateTo('product-details', ${product.id})">
                        <div class="product-image-container">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-rating">
                                <svg class="star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>${product.rating}</span>
                            </div>
                        </div>
                        <div class="product-info">
                            <p class="product-category">${product.category}</p>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">$${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Product Details Page
function renderProductDetailsPage() {
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return renderProductsPage();
    
    const relatedProducts = products.filter(p => 
        p.category === product.category && p.id !== product.id
    ).slice(0, 4);
    
    return `
        <div class="product-details">
            <div class="breadcrumb">
                <a href="#" onclick="navigateTo('home')">Home</a>
                <span>/</span>
                <a href="#" onclick="navigateTo('products')">Products</a>
                <span>/</span>
                <span>${product.name}</span>
            </div>

            <div class="product-details-grid">
                <div>
                    <img src="${product.image}" alt="${product.name}" class="product-details-image">
                </div>

                <div class="product-details-info">
                    <p class="product-category">${product.category}</p>
                    <h1>${product.name}</h1>
                    <div class="product-meta">
                        ${Array(5).fill(0).map((_, i) => `
                            <svg class="${i < Math.floor(product.rating) ? 'star' : ''}" width="20" height="20" viewBox="0 0 24 24" fill="${i < Math.floor(product.rating) ? '#fbbf24' : 'none'}" stroke="${i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'}" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        `).join('')}
                        <span style="color: var(--text-gray); font-size: 0.875rem;">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <p style="font-size: 2rem; font-weight: bold;">$${product.price.toFixed(2)}</p>

                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>

                    <div class="size-selector">
                        <h3>Select Size</h3>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-btn ${selectedSize === size ? 'selected' : ''}" onclick="selectedSize = ${size}; renderPage()">
                                    ${size}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="color-selector">
                        <h3>Select Color</h3>
                        <div class="color-options">
                            ${product.colors.map(color => `
                                <button class="color-btn ${selectedColor === color ? 'selected' : ''}" onclick="selectedColor = '${color}'; renderPage()">
                                    ${color}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="quantity-selector">
                        <h3>Quantity</h3>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="quantity = Math.max(1, quantity - 1); renderPage()">-</button>
                            <span class="quantity-display">${quantity}</span>
                            <button class="quantity-btn" onclick="quantity = quantity + 1; renderPage()">+</button>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button class="btn-primary btn-lg" onclick="handleAddToCart(${product.id})">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; margin-right: 0.5rem;">
                                <path d="M9 2L7.8 5.3M22 5.3h-20M9 2L7.8 5.3m12.4 0L21 2m-1.8 3.3L17.3 21H6.7L4.8 5.3m12.4 0H7.8"/>
                                <circle cx="9" cy="21" r="1"/>
                                <circle cx="17" cy="21" r="1"/>
                            </svg>
                            Add to Cart
                        </button>
                        ${currentUser ? `
                            <button class="btn-secondary btn-lg" onclick="handleAddToCart(${product.id}); setTimeout(() => navigateTo('checkout'), 500)">
                                Buy Now
                            </button>
                        ` : ''}
                    </div>

                    <div class="product-features">
                        <div class="feature-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"/>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                                <circle cx="5.5" cy="18.5" r="2.5"/>
                                <circle cx="18.5" cy="18.5" r="2.5"/>
                            </svg>
                            <div>
                                <p>Free Shipping</p>
                                <p style="font-size: 0.875rem; color: var(--text-gray);">On orders over $100</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <div>
                                <p>Easy Returns</p>
                                <p style="font-size: 0.875rem; color: var(--text-gray);">30-day return policy</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <div>
                                <p>Secure Payment</p>
                                <p style="font-size: 0.875rem; color: var(--text-gray);">100% secure transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${relatedProducts.length > 0 ? `
                <div style="margin-top: 4rem;">
                    <h2 style="font-size: 1.875rem; margin-bottom: 1.5rem;">You May Also Like</h2>
                    <div class="products-grid" style="grid-template-columns: repeat(4, 1fr);">
                        ${relatedProducts.map(p => `
                            <div class="product-card" onclick="navigateTo('product-details', ${p.id})">
                                <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem 0.5rem 0 0;">
                                <div style="padding: 1rem;">
                                    <p class="product-category">${p.category}</p>
                                    <h3 class="product-name">${p.name}</h3>
                                    <p class="product-price">$${p.price.toFixed(2)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (!selectedSize || !selectedColor) {
        alert('Please select a size and color');
        return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    alert('Added to cart!');
}

// Cart Page
function renderCartPage() {
    if (cart.length === 0) {
        return `
            <div class="empty-cart">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 2L7.8 5.3M22 5.3h-20M9 2L7.8 5.3m12.4 0L21 2m-1.8 3.3L17.3 21H6.7L4.8 5.3m12.4 0H7.8"/>
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="17" cy="21" r="1"/>
                </svg>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Your cart is empty</h2>
                <p style="color: var(--text-gray); margin-bottom: 2rem;">Add some items to get started!</p>
                <button class="btn-primary" onclick="navigateTo('products')">Continue Shopping</button>
            </div>
        `;
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return `
        <div class="cart-page">
            <h1 style="font-size: 2rem; margin-bottom: 2rem;">Shopping Cart</h1>
            
            <div class="cart-grid">
                <div class="cart-items">
                    ${cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-info">
                                <h3>${item.name}</h3>
                                <p style="color: var(--text-gray); font-size: 0.875rem;">${item.category}</p>
                                <div class="cart-item-details">
                                    <span>Size: ${item.selectedSize}</span>
                                    <span>Color: ${item.selectedColor}</span>
                                </div>
                                <div class="cart-item-actions">
                                    <div class="quantity-controls">
                                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1}); renderPage()">-</button>
                                        <span class="quantity-display">${item.quantity}</span>
                                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1}); renderPage()">+</button>
                                    </div>
                                    <div>
                                        <p style="font-size: 1.125rem; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <button class="btn-danger" style="align-self: flex-start;" onclick="removeFromCart(${item.id}); renderPage()">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="cart-summary">
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Order Summary</h2>
                    <div style="margin-bottom: 1.5rem;">
                        <div class="summary-row">
                            <span style="color: var(--text-gray);">Subtotal</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span style="color: var(--text-gray);">Shipping</span>
                            <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span style="color: var(--text-gray);">Tax</span>
                            <span>$${tax.toFixed(2)}</span>
                        </div>
                        ${subtotal < 100 ? `
                            <p style="font-size: 0.875rem; color: var(--text-gray); margin-top: 0.5rem;">
                                Add $${(100 - subtotal).toFixed(2)} more for free shipping!
                            </p>
                        ` : ''}
                    </div>
                    <div class="summary-total">
                        <span>Total</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    ${currentUser ? `
                        <button class="btn-primary" style="width: 100%; margin-bottom: 0.75rem;" onclick="navigateTo('checkout')">
                            Proceed to Checkout
                        </button>
                    ` : `
                        <button class="btn-primary" style="width: 100%; margin-bottom: 0.75rem;" onclick="navigateTo('login')">
                            Login to Checkout
                        </button>
                        <p style="text-align: center; font-size: 0.875rem; color: var(--text-gray);">
                            or <a href="#" onclick="navigateTo('signup')" style="color: var(--primary);">create an account</a>
                        </p>
                    `}
                    <button class="btn-outline" style="width: 100%;" onclick="navigateTo('products')">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Login Page
function renderLoginPage() {
    return `
        <div class="form-container">
            <div class="form-card">
                <div class="form-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your account to continue shopping</p>
                </div>
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <div id="login-error" class="error-message" style="display: none;"></div>
                    <button type="submit" class="btn-primary" style="width: 100%;">Login</button>
                    <div class="form-footer">
                        Don't have an account? 
                        <a href="#" onclick="navigateTo('signup')">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (login(email, password)) {
        navigateTo('home');
    } else {
        document.getElementById('login-error').textContent = 'Invalid credentials';
        document.getElementById('login-error').style.display = 'block';
    }
}

// Signup Page
function renderSignupPage() {
    return `
        <div class="form-container">
            <div class="form-card">
                <div class="form-header">
                    <h1>Create an Account</h1>
                    <p>Join us and start shopping today</p>
                </div>
                <form onsubmit="handleSignup(event)">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <div id="signup-error" class="error-message" style="display: none;"></div>
                    <button type="submit" class="btn-primary" style="width: 100%;">Create Account</button>
                    <div class="form-footer">
                        Already have an account? 
                        <a href="#" onclick="navigateTo('login')">Login</a>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('signup-error');
    
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (signup(name, email, password)) {
        navigateTo('home');
    } else {
        errorDiv.textContent = 'Failed to create account';
        errorDiv.style.display = 'block';
    }
}

// Account Page
function renderAccountPage() {
    if (!currentUser) {
        navigateTo('login');
        return '';
    }

    return `
        <div class="account-page">
            <div style="margin-bottom: 2rem;">
                <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">My Account</h1>
                <p style="color: var(--text-gray);">Manage your account settings and view your orders</p>
            </div>

            <div class="tabs">
                <button class="tab-btn active" onclick="switchTab('profile')">Profile</button>
                <button class="tab-btn" onclick="switchTab('orders')">Orders</button>
                <button class="tab-btn" onclick="switchTab('settings')">Settings</button>
            </div>

            <div id="profile-tab" class="tab-content active">
                <div class="card">
                    <div class="card-header">
                        <h2>Profile Information</h2>
                        <p>Update your account details</p>
                    </div>
                    <form onsubmit="handleProfileUpdate(event)">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="prof-name">Full Name</label>
                                <input type="text" id="prof-name" value="${currentUser.name || ''}">
                            </div>
                            <div class="form-group">
                                <label for="prof-email">Email</label>
                                <input type="email" id="prof-email" value="${currentUser.email || ''}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="prof-phone">Phone Number</label>
                            <input type="tel" id="prof-phone" value="${currentUser.phone || ''}" placeholder="+1 234 567 8900">
                        </div>
                        <div class="form-group">
                            <label for="prof-address">Address</label>
                            <input type="text" id="prof-address" value="${currentUser.address || ''}" placeholder="123 Main St, New York, NY 10001">
                        </div>
                        <button type="submit" class="btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>

            <div id="orders-tab" class="tab-content">
                <div class="card">
                    <div class="card-header">
                        <h2>Order History</h2>
                        <p>View and track your orders</p>
                    </div>
                    ${renderOrderHistory()}
                </div>
            </div>

            <div id="settings-tab" class="tab-content">
                <div class="card">
                    <div class="card-header">
                        <h2>Account Settings</h2>
                        <p>Manage your account preferences</p>
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Password</h3>
                        <button class="btn-outline">Change Password</button>
                    </div>
                    <div style="border-top: 1px solid var(--border); padding-top: 2rem;">
                        <h3 style="margin-bottom: 0.5rem; color: #ef4444;">Danger Zone</h3>
                        <p style="color: var(--text-gray); margin-bottom: 1rem; font-size: 0.875rem;">
                            Once you delete your account, there is no going back.
                        </p>
                        <button class="btn-danger" onclick="if(confirm('Are you sure?')) { logout(); }">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

function handleProfileUpdate(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('prof-name').value,
        email: document.getElementById('prof-email').value,
        phone: document.getElementById('prof-phone').value,
        address: document.getElementById('prof-address').value
    };
    updateProfile(data);
    alert('Profile updated successfully!');
}

function renderOrderHistory() {
    const orders = [
        { id: 'ORD-001', date: 'Nov 1, 2025', total: 259.98, status: 'Delivered', items: 2 },
        { id: 'ORD-002', date: 'Oct 28, 2025', total: 129.99, status: 'In Transit', items: 1 },
        { id: 'ORD-003', date: 'Oct 15, 2025', total: 189.99, status: 'Delivered', items: 1 }
    ];

    return orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div>
                    <p style="margin-bottom: 0.25rem;">Order ${order.id}</p>
                    <p style="font-size: 0.875rem; color: var(--text-gray);">
                        ${order.date} • ${order.items} item${order.items > 1 ? 's' : ''}
                    </p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="text-align: right;">
                        <p style="font-size: 0.875rem; color: var(--text-gray);">Total</p>
                        <p>$${order.total.toFixed(2)}</p>
                    </div>
                    <span class="order-status ${order.status === 'Delivered' ? 'status-delivered' : 'status-transit'}">
                        ${order.status}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Checkout Page
function renderCheckoutPage() {
    if (!currentUser) {
        navigateTo('login');
        return '';
    }

    if (cart.length === 0) {
        navigateTo('cart');
        return '';
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return `
        <div class="checkout-page">
            <h1 style="font-size: 2rem; margin-bottom: 2rem;">Checkout</h1>

            <form onsubmit="handleCheckout(event)">
                <div class="checkout-grid">
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="card">
                            <div class="card-header">
                                <h2>Shipping Information</h2>
                            </div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" id="fullName" value="${currentUser.name || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label>Email *</label>
                                    <input type="email" id="email" value="${currentUser.email || ''}" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" id="phone" value="${currentUser.phone || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Street Address *</label>
                                <input type="text" id="address" value="${currentUser.address || ''}" required>
                            </div>
                            <div class="form-grid" style="grid-template-columns: repeat(3, 1fr);">
                                <div class="form-group">
                                    <label>City *</label>
                                    <input type="text" id="city" required>
                                </div>
                                <div class="form-group">
                                    <label>State *</label>
                                    <input type="text" id="state" required>
                                </div>
                                <div class="form-group">
                                    <label>ZIP Code *</label>
                                    <input type="text" id="zipCode" required>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h2>Payment Information</h2>
                            </div>
                            <div class="form-group">
                                <label>Card Number *</label>
                                <input type="text" id="cardNumber" maxlength="16" placeholder="1234 5678 9012 3456" required>
                            </div>
                            <div class="form-group">
                                <label>Cardholder Name *</label>
                                <input type="text" id="cardName" placeholder="John Doe" required>
                            </div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Expiry Date *</label>
                                    <input type="text" id="expiryDate" maxlength="5" placeholder="MM/YY" required>
                                </div>
                                <div class="form-group">
                                    <label>CVV *</label>
                                    <input type="text" id="cvv" maxlength="4" placeholder="123" required>
                                </div>
                            </div>
                            <p style="font-size: 0.875rem; color: var(--text-gray); display: flex; align-items: center; gap: 0.5rem;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                Your payment information is secure and encrypted
                            </p>
                        </div>
                    </div>

                    <div class="cart-summary">
                        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Order Summary</h2>
                        <div class="checkout-items">
                            ${cart.map(item => `
                                <div class="checkout-item">
                                    <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
                                    <div class="checkout-item-info">
                                        <p>${item.name}</p>
                                        <p class="checkout-item-meta">Size ${item.selectedSize} • ${item.selectedColor}</p>
                                        <p class="checkout-item-meta">Qty: ${item.quantity}</p>
                                    </div>
                                    <p style="font-size: 0.875rem;">$${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            `).join('')}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div class="summary-row" style="font-size: 0.875rem;">
                                <span style="color: var(--text-gray);">Subtotal</span>
                                <span>$${subtotal.toFixed(2)}</span>
                            </div>
                            <div class="summary-row" style="font-size: 0.875rem;">
                                <span style="color: var(--text-gray);">Shipping</span>
                                <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                            </div>
                            <div class="summary-row" style="font-size: 0.875rem;">
                                <span style="color: var(--text-gray);">Tax</span>
                                <span>$${tax.toFixed(2)}</span>
                            </div>
                        </div>
                        <div class="summary-total" style="margin-bottom: 1.5rem;">
                            <span>Total</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        <button type="submit" class="btn-primary btn-lg" style="width: 100%;">
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `;
}

function handleCheckout(e) {
    e.preventDefault();
    const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    clearCart();
    navigateTo('checkout-details', newOrderId);
}

// Checkout Details Page
function renderCheckoutDetailsPage() {
    return `
        <div class="order-confirmation">
            <div class="success-icon">
                <div class="success-circle">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Order Confirmed!</h1>
                <p style="font-size: 1.25rem; color: var(--text-gray); margin-bottom: 0.5rem;">
                    Thank you for your purchase
                </p>
                <p style="color: var(--text-gray);">
                    Order number: <span style="font-family: monospace;">${orderId}</span>
                </p>
            </div>

            <div class="card" style="margin-bottom: 2rem;">
                <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Order Status</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-icon active">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#065f46" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div class="timeline-content">
                            <p>Order Confirmed</p>
                            <p style="font-size: 0.875rem; color: var(--text-gray);">Your order has been received</p>
                        </div>
                        <span class="timeline-time">Just now</span>
                    </div>
                    <div class="timeline-item" style="opacity: 0.5;">
                        <div class="timeline-icon inactive">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"/>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                            </svg>
                        </div>
                        <div class="timeline-content">
                            <p>Processing</p>
                            <p style="font-size: 0.875rem; color: var(--text-gray);">We're preparing your items</p>
                        </div>
                        <span class="timeline-time">Pending</span>
                    </div>
                    <div class="timeline-item" style="opacity: 0.5;">
                        <div class="timeline-icon inactive">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"/>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                                <circle cx="5.5" cy="18.5" r="2.5"/>
                                <circle cx="18.5" cy="18.5" r="2.5"/>
                            </svg>
                        </div>
                        <div class="timeline-content">
                            <p>Shipped</p>
                            <p style="font-size: 0.875rem; color: var(--text-gray);">Your order is on the way</p>
                        </div>
                        <span class="timeline-time">Pending</span>
                    </div>
                    <div class="timeline-item" style="opacity: 0.5;">
                        <div class="timeline-icon inactive">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                        </div>
                        <div class="timeline-content">
                            <p>Delivered</p>
                            <p style="font-size: 0.875rem; color: var(--text-gray);">Package has arrived</p>
                        </div>
                        <span class="timeline-time">Pending</span>
                    </div>
                </div>
            </div>

            <div class="card" style="margin-bottom: 2rem;">
                <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">What's Next?</h2>
                <div style="display: flex; flex-direction: column; gap: 0.75rem; color: var(--text-gray);">
                    <p>📧 You'll receive a confirmation email at your registered email address with your order details.</p>
                    <p>📦 Once your order ships, we'll send you a tracking number so you can follow your package.</p>
                    <p>🚚 Estimated delivery: <span style="font-weight: 600;">5-7 business days</span></p>
                    <p>💬 Need help? Contact our customer support at support@stepstyle.com</p>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn-primary btn-lg" onclick="navigateTo('account')">View Order Details</button>
                <button class="btn-outline btn-lg" onclick="navigateTo('home')">Continue Shopping</button>
            </div>
        </div>
    `;
}

// About Page
function renderAboutPage() {
    return `
        <div class="about-hero">
            <h1>About StepStyle</h1>
            <p style="font-size: 1.25rem; color: #d1d5db; max-width: 800px; margin: 0 auto;">
                Your destination for premium footwear that combines style, comfort, and quality
            </p>
        </div>

        <div class="about-section">
            <div class="about-grid">
                <div>
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Our Story</h2>
                    <p style="color: var(--text-gray); line-height: 1.8; margin-bottom: 1rem;">
                        Founded in 2020, StepStyle began with a simple mission: to provide high-quality, stylish footwear 
                        that doesn't compromise on comfort. We believe that everyone deserves shoes that look great and feel 
                        even better.
                    </p>
                    <p style="color: var(--text-gray); line-height: 1.8;">
                        Today, we serve thousands of customers worldwide, offering a carefully curated selection of shoes 
                        for every occasion. From casual sneakers to formal dress shoes, athletic performance wear to outdoor 
                        boots, we've got your feet covered.
                    </p>
                </div>
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lc3xlbnwxfHx8fDE3NjIyMjE0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Our Story" class="about-image">
            </div>

            <div class="about-grid" style="grid-template-columns: 1fr 1fr;">
                <img src="https://images.unsplash.com/photo-1651371409956-20e79c06a8bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHdoaXRlfGVufDF8fHx8MTc2MjI0MzM5NHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Our Mission" class="about-image">
                <div>
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Our Mission</h2>
                    <p style="color: var(--text-gray); line-height: 1.8; margin-bottom: 1rem;">
                        We're committed to delivering exceptional quality at fair prices. Every product we offer is carefully 
                        selected to meet our high standards for craftsmanship, durability, and design.
                    </p>
                    <p style="color: var(--text-gray); line-height: 1.8;">
                        We also believe in sustainable practices and ethical sourcing. We partner with manufacturers who share 
                        our values and commitment to responsible production.
                    </p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 4rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Our Values</h2>
                <p style="color: var(--text-gray); margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                    These core principles guide everything we do
                </p>
                <div class="values-grid">
                    <div class="value-card">
                        <div class="value-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        </div>
                        <h3 style="margin-bottom: 0.5rem;">Quality First</h3>
                        <p style="color: var(--text-gray);">We never compromise on the quality of our products</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <h3 style="margin-bottom: 0.5rem;">Customer Focused</h3>
                        <p style="color: var(--text-gray);">Your satisfaction is our top priority</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                        </div>
                        <h3 style="margin-bottom: 0.5rem;">Fair Pricing</h3>
                        <p style="color: var(--text-gray);">Premium quality at accessible prices</p>
                    </div>
                </div>
            </div>

            <div style="margin-top: 5rem; text-align: center;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Meet Our Team</h2>
                <p style="color: var(--text-gray); margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                    The talented individuals behind StepStyle
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto 3rem;">
                    <div style="background: white; border: 1px solid var(--border); border-radius: 0.5rem; padding: 2rem; text-align: center; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; font-weight: bold;">
                            JA
                        </div>
                        <h3 style="font-size: 1.125rem; margin-bottom: 0.25rem;">JL Ardimer</h3>
                        <p style="color: var(--text-gray); font-size: 0.875rem;">Team Member</p>
                    </div>
                    <div style="background: white; border: 1px solid var(--border); border-radius: 0.5rem; padding: 2rem; text-align: center; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; font-weight: bold;">
                            JM
                        </div>
                        <h3 style="font-size: 1.125rem; margin-bottom: 0.25rem;">John Mancao</h3>
                        <p style="color: var(--text-gray); font-size: 0.875rem;">Team Member</p>
                    </div>
                    <div style="background: white; border: 1px solid var(--border); border-radius: 0.5rem; padding: 2rem; text-align: center; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; font-weight: bold;">
                            AD
                        </div>
                        <h3 style="font-size: 1.125rem; margin-bottom: 0.25rem;">Althessa Pearl Diaz</h3>
                        <p style="color: var(--text-gray); font-size: 0.875rem;">Team Member</p>
                    </div>
                    <div style="background: white; border: 1px solid var(--border); border-radius: 0.5rem; padding: 2rem; text-align: center; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; font-weight: bold;">
                            JP
                        </div>
                        <h3 style="font-size: 1.125rem; margin-bottom: 0.25rem;">Joshua Pitogo</h3>
                        <p style="color: var(--text-gray); font-size: 0.875rem;">Team Member</p>
                    </div>
                    <div style="background: white; border: 1px solid var(--border); border-radius: 0.5rem; padding: 2rem; text-align: center; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; font-weight: bold;">
                            MP
                        </div>
                        <h3 style="font-size: 1.125rem; margin-bottom: 0.25rem;">Marc Ponce</h3>
                        <p style="color: var(--text-gray); font-size: 0.875rem;">Team Member</p>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 0.5rem; max-width: 600px; margin: 0 auto;">
                    <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">Connect With Us</h3>
                    <p style="color: rgba(255, 255, 255, 0.9); margin-bottom: 1.5rem;">Follow us on Facebook for updates and behind-the-scenes content</p>
                    <a href="https://www.facebook.com/JLkun25" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.75rem; background: white; color: #1877f2; padding: 0.875rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Visit Our Facebook Page
                    </a>
                </div>
            </div>

            <div style="background: var(--bg-gray); padding: 3rem; border-radius: 0.5rem; text-align: center; margin-top: 5rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Ready to Step Into Style?</h2>
                <p style="color: var(--text-gray); margin-bottom: 2rem;">
                    Explore our collection and find your perfect pair today
                </p>
                <button class="btn-primary btn-lg" onclick="navigateTo('products')">Shop Now</button>
            </div>
        </div>
    `;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderPage();
});
