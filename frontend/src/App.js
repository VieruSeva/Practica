import React, { useState, useEffect } from "react";
import "./App.css";
import { 
  Header, 
  HeroSection, 
  ProductShowcase, 
  TaskDashboard, 
  ProfilePage, 
  Footer,
  FeaturesSection,
  TestimonialsSection
} from "./components";
import { 
  AuthModal, 
  ShoppingCart, 
  ToastNotification 
} from "./enhanced-components";

function App() {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems') || '[]'));
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Enhanced dark mode toggle with animation
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    
    // Add visual feedback
    const body = document.body;
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      body.style.transition = '';
    }, 300);
  };

  // Enhanced toast notification helper with more types
  const showToast = (message, type = 'success', duration = 4000) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), duration);
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll'
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load saved preferences
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Update cart in localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Update wishlist in localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Enhanced user profile loading with better error handling
  useEffect(() => {
    const loadUserProfile = async () => {
      if (authToken) {
        try {
          setLoading(true);
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            showToast(`Welcome back, ${userData.name}! 🎉`, 'success');
          } else {
            localStorage.removeItem('token');
            setAuthToken(null);
            showToast('Session expired. Please login again.', 'warning');
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          localStorage.removeItem('token');
          setAuthToken(null);
          showToast('Connection error. Please try again.', 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, [authToken]);

  // Enhanced task loading
  useEffect(() => {
    const loadTasks = async () => {
      if (user && authToken) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (response.ok) {
            const tasksData = await response.json();
            setTasks(tasksData);
          }
        } catch (error) {
          console.error('Error loading tasks:', error);
          showToast('Error loading tasks', 'error');
        }
      }
    };

    loadTasks();
  }, [user, authToken]);

  // Enhanced login handler
  const handleLogin = (token, userData) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
    setUser(userData);
    setShowAuthModal(false);
    showToast(`Welcome back, ${userData.name}! 🎉`, 'success');
    
    // Add celebration animation
    const body = document.body;
    body.classList.add('success-animation');
    setTimeout(() => body.classList.remove('success-animation'), 800);
  };

  // Enhanced logout handler
  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('token');
    setCurrentPage('home');
    setTasks([]);
    showToast('Logged out successfully. See you soon! 👋', 'success');
  };

  // Enhanced cart functions with better feedback
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      showToast(`Updated ${product.name} quantity! 🛒`, 'success');
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
      showToast(`${product.name} added to cart! ✨`, 'success');
    }
    
    // Add visual feedback
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
      cartButton.classList.add('success-animation');
      setTimeout(() => cartButton.classList.remove('success-animation'), 600);
    }
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    showToast(`${item?.name} removed from cart`, 'success');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cart cleared successfully! 🧹', 'success');
  };

  // Enhanced wishlist functions
  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      showToast(`${product.name} added to wishlist! ❤️`, 'success');
    } else {
      showToast('Already in wishlist! 💕', 'warning');
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlist.find(item => item.id === productId);
    setWishlist(wishlist.filter(item => item.id !== productId));
    showToast(`${item?.name} removed from wishlist`, 'success');
  };

  // Calculate cart metrics
  const cartTotal = cartItems.reduce((total, item) => 
    total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0
  );
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Optimized Page transition handler - removed white flash
  const handlePageChange = (page) => {
    // Smooth page transition without opacity change on body
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Enhanced page rendering with transitions
  const renderPage = () => {
    const pageClasses = "page-transition fade-in-up";
    
    switch (currentPage) {
      case 'dashboard':
        return user ? (
          <div className={pageClasses}>
            <TaskDashboard 
              darkMode={darkMode} 
              tasks={tasks} 
              setTasks={setTasks}
              authToken={authToken}
              user={user}
              showToast={showToast}
            />
          </div>
        ) : (
          <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="text-center modern-card hover-lift">
              <div className="feature-icon mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Access Restricted
              </h2>
              <p className="text-lg mb-6 opacity-80">
                Please login to access the task dashboard and business management tools
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary morph-bounce"
              >
                Login Now
              </button>
            </div>
          </div>
        );
      
      case 'profile':
        return user ? (
          <div className={pageClasses}>
            <ProfilePage 
              darkMode={darkMode} 
              user={user} 
              tasks={tasks}
              authToken={authToken}
              cartItems={cartItems}
              wishlist={wishlist}
              showToast={showToast}
            />
          </div>
        ) : (
          <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="text-center modern-card hover-lift">
              <div className="feature-icon mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Profile Access Required
              </h2>
              <p className="text-lg mb-6 opacity-80">
                Please login to view your profile and account settings
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary morph-bounce"
              >
                Login Now
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={pageClasses}>
            <HeroSection 
              darkMode={darkMode} 
              setCurrentPage={handlePageChange}
              setShowAuthModal={setShowAuthModal}
              user={user}
              addToCart={addToCart}
            />
            <FeaturesSection darkMode={darkMode} />
            <ProductShowcase 
              darkMode={darkMode}
              setShowAuthModal={setShowAuthModal}
              user={user}
              setCurrentPage={handlePageChange}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              showToast={showToast}
            />
            <TestimonialsSection darkMode={darkMode} />
          </div>
        );
    }
  };

  return (
    <div className={`App transition-colors duration-300 ${darkMode ? 'dark' : ''} ${loading ? 'overflow-hidden' : ''}`}>
      {/* Enhanced Loading Overlay with better animation */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p className="text-white text-lg font-medium">Loading your experience...</p>
          </div>
        </div>
      )}

      {/* Enhanced Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 z-50">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header with enhanced props */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        setShowAuthModal={setShowAuthModal}
        user={user}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
        setShowCart={setShowCart}
        wishlistCount={wishlist.length}
      />

      {/* Main Content with page transitions */}
      <main className="relative">
        {renderPage()}
      </main>

      {/* Enhanced Footer */}
      <Footer 
        darkMode={darkMode}
        setCurrentPage={handlePageChange}
        setShowAuthModal={setShowAuthModal}
        user={user}
      />

      {/* Enhanced Modals */}
      <AuthModal
        showModal={showAuthModal}
        setShowModal={setShowAuthModal}
        onLogin={handleLogin}
        darkMode={darkMode}
        showToast={showToast}
      />

      <ShoppingCart
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        clearCart={clearCart}
        cartTotal={cartTotal}
        darkMode={darkMode}
        user={user}
        setShowAuthModal={setShowAuthModal}
        showToast={showToast}
      />

      {/* Enhanced Toast Notifications */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Enhanced Floating Action Button - Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fab hover-glow"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
    </div>
  );
}

export default App;
