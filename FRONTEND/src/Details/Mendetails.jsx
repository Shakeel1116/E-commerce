import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Menclothing from '../Data/Mendata';

const Mendetails = () => {
    const { id } = useParams();
    const product = Menclothing.mens_clothing.find((item) => item.id === parseInt(id, 10));

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [cartMessage, setCartMessage] = useState('');

    const addToCart = () => {
        if (!selectedSize || !selectedColor) {
            setCartMessage("Please select a size and color! ❌");
            setTimeout(() => setCartMessage(''), 2000);
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
        };

        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        setCartMessage("Item added to cart! 🛒");
        setTimeout(() => setCartMessage(''), 2000);
    };

    if (!product) {
        return <h1>Product Not Found</h1>;
    }

    return (
        <div className="mendetails-container">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p><span>Category:</span> {product.category}</p>
            <p><span>Price:</span> {product.currency} {product.price}</p>
            
            <label><b>Select Size:</b></label>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="dropdown">
                <option value="">Choose Size</option>
                {product.size.map((size) => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>

            <label><b>Select Color:</b></label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="dropdown">
                <option value="">Choose Color</option>
                {product.color.map((color) => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>

            <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
            {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
    );
};

export default Mendetails;
