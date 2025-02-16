import React from 'react';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="footer-section categories">
                <h1>Categories</h1>
                <ul>
                    <li>Men: Clothing, Watches, Sunglasses, Grooming, Footwear</li>
                    <li>Women: Clothing, Jewelry, Handbags, Beauty, Footwear</li>
                    <li>Kids: Clothing, Toys, School Supplies, Footwear</li>
                    <li>Accessories: Bags, Belts, Wallets, Caps, Smartwatches</li>
                    <li>Footwear: Sneakers, Sandals, Formal Shoes, Sports Shoes</li>
                </ul>
            </div>
            <div className="footer-section quick-links">
                <h1>Quick Links</h1>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>FAQs</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-section social-links">
                <h3>Facebook</h3>
                <h3>Instagram</h3>
                <h3>Twitter</h3>
                <h3>LinkedIn</h3>
                <div className="newsletter">
                    <h4>Newsletter Signup</h4>
                    <p>Subscribe to get the latest updates on offers and new arrivals</p>
                    <button className='subscribe-btn'>Subscribe</button>
                    <p className="copyright">&copy; 2025 All rights reserved, Shakeel Shaik.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
