import React, { useState, useEffect } from "react";
import "./App.css";
import { 
  Header, 
  HeroSection, 
  ProductShowcase, 
  AuthModal, 
  TaskDashboard, 
  ProfilePage, 
  Footer,
  FeaturesSection,
  TestimonialsSection,
  ShoppingCart,
  ToastNotification
} from "./components";

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

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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

  // Load user profile if token exists
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
          } else {
            localStorage.removeItem('token');
            setAuthToken(null);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          localStorage.removeItem('token');
          setAuthToken(null);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, [authToken]);

  // Load tasks if user is logged in
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

  // Handle successful login
  const handleLogin = (token, userData) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
    setUser(userData);
    setShowAuthModal(false);
    showToast(`Welcome back, ${userData.name}! 🎉`, 'success');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('token');
    setCurrentPage('home');
    setTasks([]);
    showToast('Logged out successfully', 'success');
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    showToast(`${product.name} added to cart! 🛒`, 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'success');
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
    showToast('Cart cleared', 'success');
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      showToast(`${product.name} added to wishlist! ❤️`, 'success');
    } else {
      showToast('Already in wishlist', 'warning');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
    showToast('Removed from wishlist', 'success');
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => 
    total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0
  );

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Render different pages based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return user ? (
          <TaskDashboard 
            darkMode={darkMode} 
            tasks={tasks} 
            setTasks={setTasks}
            authToken={authToken}
            user={user}
            showToast={showToast}
          />
        ) : (
          <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="text-center modern-card">
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
                className="btn-primary"
              >
                Login Now
              </button>
            </div>
          </div>
        );
      
      case 'profile':
        return user ? (
          <ProfilePage 
            darkMode={darkMode} 
            user={user} 
            tasks={tasks}
            authToken={authToken}
            cartItems={cartItems}
            wishlist={wishlist}
            showToast={showToast}
          />
        ) : (
          <div className={`min-h-screen pt-20 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="text-center modern-card">
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
                className="btn-primary"
              >
                Login Now
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <HeroSection 
              darkMode={darkMode} 
              setCurrentPage={setCurrentPage}
              setShowAuthModal={setShowAuthModal}
              user={user}
              addToCart={addToCart}
            />
            <FeaturesSection darkMode={darkMode} />
            <ProductShowcase 
              darkMode={darkMode}
              setShowAuthModal={setShowAuthModal}
              user={user}
              setCurrentPage={setCurrentPage}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              showToast={showToast}
            />
            <TestimonialsSection darkMode={darkMode} />
          </>
        );
    }
  };

  return (
    <div className={`App transition-colors duration-300 ${darkMode ? 'dark' : ''} ${loading ? 'overflow-hidden' : ''}`}>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}

      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setShowAuthModal={setShowAuthModal}
        user={user}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
        setShowCart={setShowCart}
        wishlistCount={wishlist.length}
      />

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer 
        darkMode={darkMode}
        setCurrentPage={setCurrentPage}
        setShowAuthModal={setShowAuthModal}
        user={user}
      />

      {/* Modals */}
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

      {/* Toast Notifications */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
