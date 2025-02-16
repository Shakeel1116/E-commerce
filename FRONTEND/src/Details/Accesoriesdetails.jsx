import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Accessories from '../Data/Accessories';

const AccessoriesDetails = () => {
    const { id } = useParams();
    const product = Accessories.accessories.find((item) => item.id === parseInt(id, 10));

    const [selectedColor, setSelectedColor] = useState('');
    const [cartMessage, setCartMessage] = useState('');

    const addToCart = () => {
        if (!selectedColor) {
            setCartMessage("Please select a color! ❌");
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
        <div className="accessories-details-container">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p><b>Category:</b> {product.category}</p>
            <p><b>Price:</b> {product.currency} {product.price}</p>
            <p><b>Brand:</b> {product.brand}</p>
            <p><b>Material:</b> {product.material}</p>
            <p><b>Availability:</b> {product.availability}</p>

            <label><b>Select Color:</b></label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="dropdown">
                <option value="">Choose Color</option>
                {product.color.map((color) => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>

            <button className="add-to-cart-btn" onClick={addToCart} disabled={product.availability === "Out of Stock"}>
                {product.availability === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
            </button>

            {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
    );
};

export default AccessoriesDetails;
