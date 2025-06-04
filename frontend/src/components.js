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

  const handleProductsClick = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const productSection = document.getElementById('products');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
            className={`text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 ${
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
              className={`relative p-3 rounded-xl transition-all duration-300 ${
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
              className={`relative p-3 rounded-xl transition-all duration-300 ${
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
              className={`p-3 rounded-xl transition-all duration-300 ${
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
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Enhanced Hero Section with Advanced Animations
export const HeroSection = ({ darkMode, setCurrentPage, setShowAuthModal, user, addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Enhanced auto-slide with pause on hover
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleShopCases = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
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
      {/* Enhanced Animated Background with Parallax */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} opacity-10 transition-all duration-1000`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        
        {/* Enhanced Particles */}
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 4 + 6}s`,
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            />
          ))}
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-20 ${darkMode ? 'bg-white' : 'bg-purple-600'}`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                width: `${20 + i * 5}px`,
                height: `${20 + i * 5}px`,
                borderRadius: i % 2 === 0 ? '50%' : '0',
                transform: `rotate(${i * 45}deg) translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
                animation: `float ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content with enhanced animations */}
          <div className="fade-in-up">
            <div className="mb-6">
              <span className={`inline-block px-6 py-3 bg-gradient-to-r ${currentHero.gradient} text-white text-sm font-semibold rounded-full mb-4 transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                ✨ {currentHero.subtitle}
              </span>
            </div>
            
            <h1 className={`text-6xl md:text-7xl font-bold mb-8 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentHero.title.split(' ').map((word, index) => (
                <span 
                  key={index} 
                  className={`inline-block ${index % 2 === 1 ? `bg-gradient-to-r ${currentHero.gradient} bg-clip-text text-transparent` : ''} transform hover:scale-105 transition-all duration-300`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className={`text-xl mb-10 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'} slide-in-left`}>
              {currentHero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 slide-in-right">
              <button 
                onClick={handleShopCases}
                className="btn-primary transform hover:scale-105 morph-bounce"
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

            {/* Enhanced Stats with Animation */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              {[
                { value: '50K+', label: 'Happy Customers', icon: '😊' },
                { value: '99.9%', label: 'Protection Rate', icon: '🛡️' },
                { value: '24/7', label: 'Support', icon: '🚀' }
              ].map((stat, index) => (
                <div key={index} className={`text-center transform hover:scale-110 transition-all duration-300 cursor-pointer stagger-fade stagger-${index + 1}`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Enhanced Hero image with 3D effects */}
          <div className="slide-in-right">
            <div className="relative perspective-1000">
              <div className="glass-card p-8 transform hover:scale-105 hover:rotateY-5 transition-all duration-500">
                <img 
                  src={currentHero.image}
                  alt="Premium Device Case"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${currentHero.gradient} opacity-20 rounded-2xl`}></div>
                
                {/* Floating Action Icons */}
                <div className="absolute -top-4 -right-4 space-y-4">
                  {[
                    { icon: '❤️', delay: '0s' },
                    { icon: '⭐', delay: '0.5s' },
                    { icon: '🔥', delay: '1s' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg transform hover:scale-125 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: item.delay }}
                    >
                      <span className="text-xl">{item.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced slide indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-12 h-4 bg-gradient-to-r from-purple-600 to-blue-600' 
                        : 'w-4 h-4 bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {index === currentSlide && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform translate-x-[-100%] animate-[slideInToast_2s_ease-in-out_infinite]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// New Features Section
export const FeaturesSection = ({ darkMode }) => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Military-Grade Protection",
      description: "Advanced materials and engineering ensure maximum protection against drops, scratches, and impacts.",
      image: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Business Analytics",
      description: "Comprehensive task management and analytics dashboard to streamline your device case business operations.",
      image: "https://images.unsplash.com/photo-1599658880436-c61792e70672"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 6v6m0 0v6m6-6H6" />
        </svg>
      ),
      title: "Custom Design Studio",
      description: "Create personalized cases with our advanced customization tools. Choose colors, materials, and add personal touches.",
      image: "https://images.pexels.com/photos/32343967/pexels-photo-32343967.jpeg"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "24/7 Premium Support",
      description: "Dedicated customer support team available around the clock to assist with orders, customizations, and technical issues.",
      image: "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c"
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
              <div className="feature-icon mx-auto group-hover:scale-110 group-hover:rotate-3">
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

// Enhanced Product Showcase
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
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-3 rounded-full ${isInWishlist(product.id) ? 'bg-red-500' : 'bg-white'} text-black hover:scale-110 transition-all duration-300`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`p-3 rounded-full bg-purple-600 text-white hover:scale-110 transition-all duration-300 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                <div className="absolute top-4 right-4 glass-card p-2">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-white">{product.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>
                <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span key={index} className="badge badge-low text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{product.reviews} reviews</span>
                  </div>
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
      name: "Sarah Johnson",
      role: "Small Business Owner",
      avatar: "SJ",
      rating: 5,
      text: "CaseCraft transformed my device case business! The task management system is incredible, and the product quality is unmatched. Sales increased 300% in just 3 months!"
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      avatar: "MC",
      rating: 5,
      text: "Best phone case I've ever owned. The military-grade protection saved my iPhone from a 6-foot drop, and the wireless charging still works perfectly. Absolutely worth every penny!"
    },
    {
      name: "Emma Rodriguez",
      role: "Retail Manager",
      avatar: "ER",
      rating: 5,
      text: "The business analytics dashboard gives us insights we never had before. Managing inventory, tracking orders, and analyzing customer data has never been easier. Game-changer!"
    },
    {
      name: "David Park",
      role: "Graphic Designer",
      avatar: "DP",
      rating: 5,
      text: "The custom design studio is amazing! I created a unique case that perfectly matches my brand. The quality exceeded my expectations, and delivery was lightning fast."
    }
  ];

  return (
    <section className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> Customers Say</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied customers who trust CaseCraft for premium protection and business success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="modern-card text-center">
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ${
                darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
              }`}>
                {testimonial.avatar}
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial */}
              <p className={`mb-6 italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{testimonial.text}"
              </p>

              {/* Name and Role */}
              <div>
                <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {testimonial.name}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Shopping Cart Component
export const ShoppingCart = ({ 
  showCart, 
  setShowCart, 
  cartItems, 
  updateQuantity, 
  removeItem, 
  clearCart, 
  cartTotal, 
  darkMode,
  user,
  setShowAuthModal,
  showToast 
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      setShowAuthModal(true);
      showToast('Please login to proceed with checkout', 'warning');
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      showToast('Order placed successfully! 🎉', 'success');
      clearCart();
      setShowCart(false);
      setIsCheckingOut(false);
    }, 2000);
  };

  if (!showCart) return null;

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-end">
      <div className={`modal-content w-full max-w-md h-full rounded-l-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5A1 1 0 006.9 19H19" />
                </svg>
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm mt-2">Add some products to get started</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.price}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        -
                      </button>
                      <span className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-500 hover:bg-red-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total: ${cartTotal.toFixed(2)}
                </span>
                <button
                  onClick={clearCart}
                  className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                >
                  Clear Cart
                </button>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full btn-primary ${isCheckingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="spinner w-4 h-4"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
export const ToastNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-24 right-6 z-50 toast toast-${type} flex items-center space-x-3 min-w-0 max-w-sm animate-in slide-in-from-right`}>
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Note: AuthModal, ShoppingCart, and ToastNotification are exported from enhanced-components.js
// TaskDashboard, ProfilePage, and Footer are defined and exported in this file

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
      <div className={`modal-content w-full max-w-lg rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button
              onClick={onClose}
              className={`p-3 rounded-full transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter task title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="form-input resize-none"
                placeholder="Enter task description"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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

              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="general">General</option>
                  <option value="product">Product Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Customer Support</option>
                  <option value="inventory">Inventory Management</option>
                  <option value="quality">Quality Control</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="spinner w-4 h-4"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  task ? 'Update Task' : 'Create Task'
                )}
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
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [activeTab, setActiveTab] = useState('overview');

  const userTasks = tasks.filter(task => task.user_id === user?.id);
  const recentTasks = userTasks.slice(0, 5);

  const taskStats = {
    total: userTasks.length,
    completed: userTasks.filter(task => task.status === 'completed').length,
    pending: userTasks.filter(task => task.status === 'pending').length,
    inProgress: userTasks.filter(task => task.status === 'in-progress').length
  };

  const completionRate = taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0;
  const cartTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'tasks', label: 'Recent Tasks', icon: '✅' },
    { id: 'orders', label: 'Cart & Wishlist', icon: '🛒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="modern-card mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold shadow-xl ${
                darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
              }`}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name}
              </h1>
              <p className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {user?.email}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <span className="badge badge-medium">Premium Member</span>
                <span className="badge badge-low">Active Since {new Date(user?.created_at).toLocaleDateString()}</span>
                <span className="badge badge-high">{completionRate}% Task Completion</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{taskStats.total}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{cartItems.length}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cart Items</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{wishlist.length}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wishlist</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="modern-card mb-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Task Statistics */}
            <div className="modern-card">
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Task Performance
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="stats-card stats-card-completed text-center">
                  <div className="text-2xl font-bold">{taskStats.completed}</div>
                  <div className="text-sm opacity-90">Completed</div>
                </div>
                <div className="stats-card stats-card-pending text-center">
                  <div className="text-2xl font-bold">{taskStats.pending}</div>
                  <div className="text-sm opacity-90">Pending</div>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {completionRate}%
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overall Completion Rate
                </div>
              </div>
            </div>

            {/* Shopping Summary */}
            <div className="modern-card">
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Shopping Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cart Total</span>
                  <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Items in Cart</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {cartItems.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wishlist Items</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {wishlist.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="modern-card">
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Account Settings
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="form-input"
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="form-input"
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setEditMode(!editMode)}
                className="btn-primary"
              >
                {editMode ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Footer Component
export const Footer = ({ darkMode, setCurrentPage, setShowAuthModal, user }) => {
  const socialLinks = [
    { icon: '📘', label: 'Facebook', href: '#' },
    { icon: '📸', label: 'Instagram', href: '#' },
    { icon: '🐦', label: 'Twitter', href: '#' },
    { icon: '💼', label: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className={`transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CaseCraft Premium
              </span>
            </div>
            <p className={`mb-6 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The ultimate destination for premium device protection and advanced business management. 
              Trusted by thousands of entrepreneurs worldwide.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover-lift ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-bold text-lg mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Products
            </h3>
            <ul className="space-y-3">
              {['Phone Cases', 'Device Skins', 'Laptop Cases', 'Accessories', 'Custom Designs'].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left hover-lift`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`font-bold text-lg mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Help Center', action: () => {} },
                { label: 'Contact Us', action: () => {} },
                { label: 'Order Tracking', action: () => user ? setCurrentPage('profile') : setShowAuthModal(true) },
                { label: 'Returns & Refunds', action: () => alert('📦 Returns policy: 30-day money-back guarantee!') },
                { label: 'Live Chat', action: () => alert('💬 Live chat coming soon! Contact support for immediate assistance.') }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={item.action}
                    className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-left hover-lift`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 mt-12 flex flex-col md:flex-row justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`text-center md:text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2025 CaseCraft Premium. All rights reserved.</p>
            <p className="mt-1 text-sm">Built with ❤️ for device protection enthusiasts</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {user ? `Welcome back, ${user.name}! 🎉` : '🚀 Join thousands of satisfied customers!'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
