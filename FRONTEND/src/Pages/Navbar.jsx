import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai'; 

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showCollections, setShowCollections] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);

    const searchRef = useRef(null);

    // Fetch cart count from localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
    }, []);

    // Close search bar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            {/* Mobile Menu Icon */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <AiOutlineMenu size={28} />
            </div>

            {/* Center Navbar Links */}
            <div className="navbar-center">
                <ul className="navbar-li">
                    <li><Link to="/">Home</Link></li>
                    <li 
                        onMouseEnter={() => setShowCollections(true)}
                        onMouseLeave={() => setShowCollections(false)}
                    >
                        New Collections ▼
                        {showCollections && (
                            <ul className="nested-list">
                                <li>Men Shirts</li>
                                <li>Women Dresses</li>
                                <li>Men Trousers</li>
                                <li>Women Tops</li>
                                <li>Women Sarees</li>
                                <li>Men Tracks</li>
                                <li>Kids Wear</li>
                                <li>Watches</li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/menswear">Mens Wear</Link></li>
                    <li><Link to="/womenswear">Womens Wear</Link></li>
                    <li><Link to="/kidsswear">Kids Wear</Link></li>
                    <li><Link to="/footswear">Foot Wear</Link></li>
                    <li><Link to="/Accesories">Accessories</Link></li>
                </ul>
            </div>

            {/* Right Side Icons */}
            <div className="icon-container">
                {/* Search Input (Shows when searchOpen is true) */}
                <div ref={searchRef} className="search-container">
                    <input 
                        type="text" 
                        className={`search-input ${searchOpen ? "active" : ""}`} 
                        placeholder="Search..." 
                        onBlur={() => setSearchOpen(false)}
                    />
                    <AiOutlineSearch 
                        className="icon search-icon" 
                        size={25} 
                        onClick={() => setSearchOpen(!searchOpen)} 
                    />
                </div>

                <Link to='/Login'>
                    <AiOutlineUser className="icon" size={28} />
                </Link>

                {/* Cart Icon with Badge */}
                <Link to="/cart" className="cart-icon">
                    <AiOutlineShoppingCart className="icon" size={28} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li 
                        onMouseEnter={() => setShowCollections(true)}
                        onMouseLeave={() => setShowCollections(false)}
                    >
                        New Collections ▶
                        {showCollections && (
                            <ul className="nested-list">
                                <li>Men Shirts</li>
                                <li>Women Dresses</li>
                                <li>Men Trousers</li>
                                <li>Women Tops</li>
                                <li>Women Sarees</li>
                                <li>Men Tracks</li>
                                <li>Kids Wear</li>
                                <li>Watches</li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/menswear">Mens Wear</Link></li>
                    <li><Link to="/womenswear">Womens Wear</Link></li>
                    <li><Link to="/kidswear">Kids Wear</Link></li>
                    <li><Link to="/footwear">Foot Wear</Link></li>
                    <li><Link to="/accessories">Accessories</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
