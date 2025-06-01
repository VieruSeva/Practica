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

// Enhanced Hero Section with Video Background
export const HeroSection = ({ darkMode, setCurrentPage, setShowAuthModal, user, addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Premium Device Protection",
      subtitle: "Engineered Excellence",
      description: "Military-grade protection meets stunning design. Our premium cases safeguard your devices while making a statement.",
      image: "https://images.pexels.com/photos/1670768/pexels-photo-1670768.jpeg",
      cta: "Explore Collection"
    },
    {
      title: "Business Task Management", 
      subtitle: "Streamlined Operations",
      description: "Integrated task management system for device case businesses. Track orders, manage inventory, and boost productivity.",
      image: "https://images.unsplash.com/photo-1535157412991-2ef801c1748b",
      cta: "Start Managing"
    },
    {
      title: "Custom Solutions",
      subtitle: "Tailored For You", 
      description: "Personalized device cases with custom designs, colors, and materials. Express your unique style with premium protection.",
      image: "https://images.pexels.com/photos/14833708/pexels-photo-14833708.jpeg",
      cta: "Customize Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleShopCases = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-indigo-100'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 6}s`,
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
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-full mb-4">
                {currentHero.subtitle}
              </span>
            </div>
            
            <h1 className={`text-6xl md:text-7xl font-bold mb-8 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentHero.title.split(' ').map((word, index) => (
                <span key={index} className={index % 2 === 1 ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent' : ''}>
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
                {currentHero.cta}
              </button>
              <button 
                onClick={() => user ? setCurrentPage('dashboard') : setShowAuthModal(true)}
                className="btn-secondary transform hover:scale-105"
              >
                {user ? 'Dashboard' : 'Get Started'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>50K+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Happy Customers</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>99.9%</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Protection Rate</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>24/7</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Support</div>
              </div>
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="slide-in-right">
            <div className="relative">
              <div className="glass-card p-8 transform hover:scale-105">
                <img 
                  src={currentHero.image}
                  alt="Premium Device Case"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Slide indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-purple-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
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

// Export the enhanced components
export { AuthModal, TaskDashboard, ProfilePage, Footer } from './enhanced-components';
