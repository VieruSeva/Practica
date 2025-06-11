import React, { useState, useEffect } from 'react';

// Header Component with Enhanced Design
export const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  currentPage, 
  setCurrentPage, 
  setShowAuthModal, 
  user, 
  onLogout, 
  cartItemCount, 
  setShowCart,
  wishlistCount 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  // Fixed Products Button Click Handler
  const handleProductsClick = () => {
    // If not on home page, navigate first
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Increase timeout to ensure page renders completely
      setTimeout(() => {
        const productSection = document.getElementById('products');
        if (productSection) {
          productSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 300); // Increased from 100ms to 300ms
    } else {
      // Already on home page, just scroll
      const productSection = document.getElementById('products');
      if (productSection) {
        productSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? `${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg` 
        : 'bg-transparent'
    } border-b ${darkMode ? 'border-gray-700/50' : 'border-white/20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className={`text-2xl font-bold cursor-pointer transition-all duration-200 hover:scale-105 ${
              darkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
            }`}
            onClick={() => setCurrentPage('home')}
          >
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CaseCraft
            </span>
            <span className="text-xs ml-2 opacity-60">Premium</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`nav-item ${currentPage === 'home' ? 'nav-item-active' : 'nav-item-inactive'}`}
            >
              Home
            </button>
            {user && (
              <>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`nav-item ${currentPage === 'dashboard' ? 'nav-item-active' : 'nav-item-inactive'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className={`nav-item ${currentPage === 'profile' ? 'nav-item-active' : 'nav-item-inactive'}`}
                >
                  Profile
                </button>
              </>
            )}
            <button 
              onClick={handleProductsClick}
              className="nav-item nav-item-inactive"
            >
              Products
            </button>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className={`relative p-3 rounded-xl transition-all duration-200 ${
                darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5A1 1 0 006.9 19H19m-7 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0" />
              </svg>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>

            {/* Wishlist */}
            <button
              className={`relative p-3 rounded-xl transition-all duration-200 ${
                darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-200 ${
                darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* User menu or login button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`hidden sm:block font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.name}
                  </span>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border backdrop-blur-md z-50`}>
                    <div className="p-2">
                      <div className={`px-4 py-3 text-sm border-b ${darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-200'}`}>
                        <div className="font-medium">{user.name}</div>
                        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
                      </div>
                      <button
                        onClick={() => {setCurrentPage('profile'); setShowUserMenu(false);}}
                        className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Profile Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${
                          darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className={`md:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-md`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => {setCurrentPage('home'); setShowMobileMenu(false);}}
                className={`nav-item w-full text-left ${currentPage === 'home' ? 'nav-item-active' : 'nav-item-inactive'}`}
              >
                Home
              </button>
              {user && (
                <>
                  <button 
                    onClick={() => {setCurrentPage('dashboard'); setShowMobileMenu(false);}}
                    className={`nav-item w-full text-left ${currentPage === 'dashboard' ? 'nav-item-active' : 'nav-item-inactive'}`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => {setCurrentPage('profile'); setShowMobileMenu(false);}}
                    className={`nav-item w-full text-left ${currentPage === 'profile' ? 'nav-item-active' : 'nav-item-inactive'}`}
                  >
                    Profile
                  </button>
                </>
              )}
              <button 
                onClick={() => {handleProductsClick(); setShowMobileMenu(false);}}
                className="nav-item w-full text-left nav-item-inactive"
              >
                Products
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Enhanced Hero Section with Optimized Animations
export const HeroSection = ({ darkMode, setCurrentPage, setShowAuthModal, user, addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const heroSlides = [
    {
      title: "Premium Device Protection",
      subtitle: "Engineered Excellence",
      description: "Military-grade protection meets stunning design. Our premium cases safeguard your devices while making a statement.",
      image: "https://images.pexels.com/photos/1670768/pexels-photo-1670768.jpeg",
      cta: "Explore Collection",
      gradient: "from-purple-600 via-blue-600 to-indigo-600"
    },
    {
      title: "Business Task Management", 
      subtitle: "Streamlined Operations",
      description: "Integrated task management system for device case businesses. Track orders, manage inventory, and boost productivity.",
      image: "https://images.unsplash.com/photo-1535157412991-2ef801c1748b",
      cta: "Start Managing",
      gradient: "from-green-500 via-teal-600 to-blue-600"
    },
    {
      title: "Custom Solutions",
      subtitle: "Tailored For You", 
      description: "Personalized device cases with custom designs, colors, and materials. Express your unique style with premium protection.",
      image: "https://images.pexels.com/photos/14833708/pexels-photo-14833708.jpeg",
      cta: "Customize Now",
      gradient: "from-pink-500 via-purple-600 to-indigo-600"
    }
  ];

  // Optimized auto-slide with reduced frequency
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // Increased from 6000ms to 8000ms
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleShopCases = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-indigo-100'
      }`}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} opacity-10 transition-all duration-1000`}
        />
        
        {/* Reduced Particles for Performance */}
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 3 + 6}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className="fade-in-up">
            <div className="mb-6">
              <span className={`inline-block px-6 py-3 bg-gradient-to-r ${currentHero.gradient} text-white text-sm font-semibold rounded-full mb-4 transform hover:scale-105 transition-all duration-200 shadow-lg`}>
                ✨ {currentHero.subtitle}
              </span>
            </div>
            
            <h1 className={`text-6xl md:text-7xl font-bold mb-8 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentHero.title.split(' ').map((word, index) => (
                <span 
                  key={index} 
                  className={`inline-block ${index % 2 === 1 ? `bg-gradient-to-r ${currentHero.gradient} bg-clip-text text-transparent` : ''} transform hover:scale-105 transition-all duration-200`}
                >
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className={`text-xl mb-10 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentHero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleShopCases}
                className="btn-primary transform hover:scale-105"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{currentHero.cta}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button 
                onClick={() => user ? setCurrentPage('dashboard') : setShowAuthModal(true)}
                className="btn-secondary transform hover:scale-105 group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{user ? 'Dashboard' : 'Get Started'}</span>
                  <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Optimized Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              {[
                { value: '50K+', label: 'Happy Customers', icon: '😊' },
                { value: '99.9%', label: 'Protection Rate', icon: '🛡️' },
                { value: '24/7', label: 'Support', icon: '🚀' }
              ].map((stat, index) => (
                <div key={index} className={`text-center transform hover:scale-110 transition-all duration-200 cursor-pointer`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="slide-in-right">
            <div className="relative">
              <div className="glass-card p-8 transform hover:scale-105 transition-all duration-300">
                <img 
                  src={currentHero.image}
                  alt="Premium Device Case"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${currentHero.gradient} opacity-20 rounded-2xl`}></div>
              </div>
              
              {/* Simplified slide indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'w-12 h-4 bg-gradient-to-r from-purple-600 to-blue-600' 
                        : 'w-4 h-4 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Optimized Features Section
export const FeaturesSection = ({ darkMode }) => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Military-Grade Protection",
      description: "Advanced materials and engineering ensure maximum protection against drops, scratches, and impacts."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Business Analytics",
      description: "Comprehensive task management and analytics dashboard to streamline your device case business operations."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 6v6m0 0v6m6-6H6" />
        </svg>
      ),
      title: "Custom Design Studio",
      description: "Create personalized cases with our advanced customization tools. Choose colors, materials, and add personal touches."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "24/7 Premium Support",
      description: "Dedicated customer support team available around the clock to assist with orders, customizations, and technical issues."
    }
  ];

  return (
    <section className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> CaseCraft</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Experience the perfect blend of premium protection, innovative design, and advanced business management tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="modern-card group text-center">
              <div className="feature-icon mx-auto group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Product Showcase with Performance Optimizations
export const ProductShowcase = ({ 
  darkMode, 
  setShowAuthModal, 
  user, 
  setCurrentPage, 
  addToCart, 
  addToWishlist, 
  wishlist,
  showToast 
}) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 1,
      name: "iPhone 16 Pro Max Elite Case",
      category: "premium",
      image: "https://images.pexels.com/photos/1670768/pexels-photo-1670768.jpeg",
      price: "$79.99",
      originalPrice: "$99.99",
      description: "Military-grade protection with MagSafe compatibility and wireless charging support",
      inStock: true,
      rating: 4.9,
      reviews: 234,
      features: ["Drop Protection", "Wireless Charging", "MagSafe Compatible"]
    },
    {
      id: 2,
      name: "Galaxy S24 Ultra Premium Skin",
      category: "skins",
      image: "https://images.unsplash.com/photo-1535157412991-2ef801c1748b",
      price: "$34.99", 
      originalPrice: "$44.99",
      description: "Precision-cut 3M vinyl with air-release technology for bubble-free application",
      inStock: true,
      rating: 4.8,
      reviews: 187,
      features: ["3M Vinyl", "Bubble-Free", "Easy Removal"]
    },
    {
      id: 3,
      name: "MacBook Pro Armor Case",
      category: "laptop",
      image: "https://images.pexels.com/photos/14833708/pexels-photo-14833708.jpeg",
      price: "$129.99",
      originalPrice: "$159.99",
      description: "Ultra-lightweight protection with perfect port access and heat dissipation",
      inStock: false,
      rating: 4.7,
      reviews: 156,
      features: ["Heat Dissipation", "Port Access", "Lightweight"]
    },
    {
      id: 4,
      name: "AirPods Pro 2 Luxury Case",
      category: "accessories",
      image: "https://images.pexels.com/photos/8141730/pexels-photo-8141730.jpeg",
      price: "$49.99",
      originalPrice: "$64.99",
      description: "Premium leather case with built-in key ring and wireless charging support",
      inStock: true,
      rating: 4.9,
      reviews: 298,
      features: ["Genuine Leather", "Key Ring", "Wireless Ready"]
    },
    {
      id: 5,
      name: "iPad Air Custom Folio",
      category: "tablet",
      image: "https://images.pexels.com/photos/28028229/pexels-photo-28028229.jpeg",
      price: "$89.99",
      originalPrice: "$119.99",
      description: "Multi-angle stand with Apple Pencil holder and smart wake/sleep function",
      inStock: true,
      rating: 4.8,
      reviews: 203,
      features: ["Multi-Angle", "Pencil Holder", "Smart Wake"]
    },
    {
      id: 6,
      name: "Gaming Phone Cooler Case",
      category: "gaming",
      image: "https://images.unsplash.com/photo-1593055454503-531d165c2ed8",
      price: "$94.99",
      originalPrice: "$124.99",
      description: "Active cooling system with RGB lighting and enhanced grip for gaming",
      inStock: true,
      rating: 4.6,
      reviews: 142,
      features: ["Active Cooling", "RGB Lighting", "Gaming Grip"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'premium', label: 'Premium Cases' },
    { value: 'skins', label: 'Device Skins' },
    { value: 'laptop', label: 'Laptop Cases' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'tablet', label: 'Tablet Cases' },
    { value: 'gaming', label: 'Gaming Cases' }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesFilter = filter === 'all' || product.category === filter;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = async (product) => {
    if (user) {
      addToCart(product);
      
      // Create order processing task
      try {
        const orderTask = {
          title: `Order Processing: ${product.name}`,
          description: `Process order for ${product.name} - ${product.price}. Customer: ${user.name} (${user.email})`,
          category: 'support',
          priority: 'medium',
          status: 'pending'
        };
        
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(orderTask)
        });
      } catch (error) {
        console.error('Error creating order task:', error);
      }
    } else {
      setShowAuthModal(true);
      showToast('Please login to add items to cart', 'warning');
    }
  };

  const handleAddToWishlist = (product) => {
    if (user) {
      addToWishlist(product);
    } else {
      setShowAuthModal(true);
      showToast('Please login to add items to wishlist', 'warning');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <section id="products" className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Premium
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> Collection</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our curated selection of premium device protection solutions
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-bar mb-12">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-lg placeholder-gray-400"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-none outline-none text-lg cursor-pointer"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none outline-none text-lg cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-3 rounded-full ${isInWishlist(product.id) ? 'bg-red-500' : 'bg-white'} text-black hover:scale-110 transition-all duration-200`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`p-3 rounded-full bg-purple-600 text-white hover:scale-110 transition-all duration-200 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5A1 1 0 006.9 19H19" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  {!product.inStock && (
                    <span className="badge badge-high">
                      Out of Stock
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="badge badge-medium ml-2">
                      Sale
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="badge badge-low text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className={`text-lg line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        product.inStock
                          ? 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>

                {/* Reviews */}
                <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {product.reviews} customer reviews
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl">No products found</p>
            <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

// New Testimonials Section
export const TestimonialsSection = ({ darkMode }) => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Smartphone Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b7c6",
      content: "CaseCraft's iPhone case saved my phone from a 6-foot drop! The quality is exceptional and the design is sleek.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      content: "The task management system has streamlined our case business operations. Highly recommend for any retail business!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      content: "Love the custom design options! I was able to create a unique case that perfectly matches my style.",
      rating: 5
    }
  ];

  return (
    <section className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> Customers Say</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied customers who trust CaseCraft for their device protection needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="modern-card text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                loading="lazy"
              />
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className={`text-lg mb-4 italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{testimonial.content}"
              </p>
              <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {testimonial.name}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer
export const Footer = ({ darkMode, setCurrentPage, setShowAuthModal, user }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CaseCraft
              </span>
              <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Premium</span>
            </div>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Premium device protection solutions combined with advanced business management tools. 
              Protect your devices, grow your business.
            </p>
            <div className="flex space-x-4">
              <button className={`p-3 rounded-xl transition-all duration-200 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className={`p-3 rounded-xl transition-all duration-200 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => {
                      const productSection = document.getElementById('products');
                      if (productSection) {
                        productSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Products
                </button>
              </li>
              {user && (
                <>
                  <li>
                    <button 
                      onClick={() => setCurrentPage('dashboard')}
                      className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setCurrentPage('profile')}
                      className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Profile
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <button className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Help Center
                </button>
              </li>
              <li>
                <button className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Contact Us
                </button>
              </li>
              <li>
                <button className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className={`transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t pt-8 mt-8 text-center ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
          <p>© {currentYear} CaseCraft Premium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Enhanced Task Dashboard Component
export const TaskDashboard = ({ darkMode, tasks, setTasks, authToken, user, showToast }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || task.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  // Task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      const url = editingTask 
        ? `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${editingTask.id}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/tasks`;
      
      const method = editingTask ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        const savedTask = await response.json();
        
        if (editingTask) {
          setTasks(tasks.map(task => task.id === editingTask.id ? savedTask : task));
          showToast('Task updated successfully! ✨', 'success');
        } else {
          setTasks([...tasks, savedTask]);
          showToast('Task created successfully! 🎉', 'success');
        }
        
        setShowCreateModal(false);
        setEditingTask(null);
      } else {
        showToast('Error saving task', 'error');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      showToast('Error saving task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        showToast('Task deleted successfully', 'success');
      } else {
        showToast('Error deleting task', 'error');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      showToast('Error deleting task', 'error');
    }
  };

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Task Dashboard
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your business tasks and track progress efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stats-card stats-card-total text-center">
            <div className="text-3xl font-bold">{taskStats.total}</div>
            <div className="text-sm opacity-90">Total Tasks</div>
          </div>
          <div className="stats-card stats-card-completed text-center">
            <div className="text-3xl font-bold">{taskStats.completed}</div>
            <div className="text-sm opacity-90">Completed</div>
          </div>
          <div className="stats-card stats-card-pending text-center">
            <div className="text-3xl font-bold">{taskStats.pending}</div>
            <div className="text-sm opacity-90">Pending</div>
          </div>
          <div className="stats-card stats-card-in-progress text-center">
            <div className="text-3xl font-bold">{taskStats.inProgress}</div>
            <div className="text-sm opacity-90">In Progress</div>
          </div>
        </div>

        {/* Controls */}
        <div className="modern-card mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`form-input w-40 ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`form-input w-40 ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="product">Product</option>
                <option value="marketing">Marketing</option>
                <option value="support">Support</option>
                <option value="inventory">Inventory</option>
                <option value="quality">Quality</option>
              </select>
            </div>

            {/* Actions */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create Task
            </button>
          </div>
        </div>

        {/* Tasks Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="modern-card hover-lift">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setShowCreateModal(true);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {task.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`badge badge-${task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low'}`}>
                    {task.priority} priority
                  </span>
                  <span className="badge badge-low">
                    {task.category}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <select
                    value={task.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      await handleTaskSubmit({ ...task, status: newStatus });
                    }}
                    className={`text-sm px-3 py-2 rounded-full border-2 cursor-pointer transition-all ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(task.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-xl">No tasks found</p>
            <p className="text-sm mt-2">Try adjusting your filters or create a new task</p>
          </div>
        )}
      </div>

      {/* Create/Edit Task Modal */}
      {showCreateModal && (
        <TaskModal
          task={editingTask}
          darkMode={darkMode}
          onSubmit={handleTaskSubmit}
          onClose={() => {
            setShowCreateModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

// Task Modal Component
const TaskModal = ({ task, darkMode, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'pending',
    priority: task?.priority || 'medium',
    category: task?.category || 'general'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="modal-content w-full max-w-md">
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter task title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="form-input"
                placeholder="Enter task description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="general">General</option>
                  <option value="product">Product</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                  <option value="inventory">Inventory</option>
                  <option value="quality">Quality</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary flex-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="spinner w-4 h-4"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  task ? 'Update Task' : 'Create Task'
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Enhanced Profile Page
export const ProfilePage = ({ darkMode, user, tasks, authToken, cartItems, wishlist, showToast }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalSpent = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // Add profile update logic here
    setIsEditing(false);
    showToast('Profile updated successfully! ✨', 'success');
  };

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="modern-card mb-8">
          <div className="flex items-center space-x-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold ${
              darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
            }`}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name}
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {user?.email}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Member since {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stats-card stats-card-total text-center">
            <div className="text-2xl font-bold">{tasks.length}</div>
            <div className="text-sm opacity-90">Total Tasks</div>
          </div>
          <div className="stats-card stats-card-completed text-center">
            <div className="text-2xl font-bold">{completedTasks}</div>
            <div className="text-sm opacity-90">Completed</div>
          </div>
          <div className="stats-card stats-card-pending text-center">
            <div className="text-2xl font-bold">{cartItems.length}</div>
            <div className="text-sm opacity-90">Cart Items</div>
          </div>
          <div className="stats-card stats-card-in-progress text-center">
            <div className="text-2xl font-bold">{wishlist.length}</div>
            <div className="text-sm opacity-90">Wishlist</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="modern-card mb-8">
          <div className="flex space-x-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tasks', label: 'Recent Tasks' },
              { id: 'orders', label: 'Order History' },
              { id: 'settings', label: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="modern-card">
          {activeTab === 'overview' && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {task.status} • {new Date(task.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className={`flex justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Completion Rate</span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className={`flex justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Cart Value</span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${totalSpent.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Tasks
              </h2>
              <div className="space-y-4">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                      </div>
                      <span className={`badge badge-${task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low'}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Order History
              </h2>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Quantity: {item.quantity} • {item.price}
                          </p>
                        </div>
                        <span className="badge badge-medium">In Cart</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p>No orders yet. Start shopping to see your order history!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Settings
              </h2>
              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Personal Information
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Name: {user?.name}
                    </p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Email: {user?.email}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Account Security
                    </h3>
                    <button className="btn-secondary">
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};