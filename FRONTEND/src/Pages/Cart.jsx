import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({
        bagTotal: 0,
        deliveryFee: 50,
        platformFee: 20,
        orderTotal: 0,
    });
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user) {
            const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
            if (redirectAfterLogin) {
                localStorage.removeItem("redirectAfterLogin");
                navigate(redirectAfterLogin);
            } else {
                navigate("/Login");
            }
            return;
        }

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const validCart = storedCart.map(item => ({
            ...item,
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0
        }));
        setCartItems(validCart);
        calculateTotal(validCart);
    }, [navigate]);

    const updateQuantity = (index, change) => {
        const updatedCart = cartItems.map((item, i) => {
            if (i === index) {
                const newQuantity = Math.max(1, (Number(item.quantity) || 1) + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const calculateTotal = (items) => {
        if (!items || items.length === 0) {
            setTotals({ bagTotal: 0, deliveryFee: 50, platformFee: 20, orderTotal: 0 });
            return;
        }

        const bagTotal = items.reduce((sum, item) => {
            return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
        }, 0);

        const deliveryFee = bagTotal > 500 ? 0 : 50;
        const platformFee = 20;
        const orderTotal = bagTotal + deliveryFee + platformFee;

        setTotals({ bagTotal, deliveryFee, platformFee, orderTotal });
    };

    const placeOrder = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please sign in to place an order.");
            localStorage.setItem("redirectAfterLogin", "/cart");
            navigate("/signup");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (paymentMethod === "UPI" && !upiId.trim()) {
            alert("Please enter a valid UPI ID.");
            return;
        }

        if (paymentMethod === "Credit/Debit Card" && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
            alert("Please enter valid card details.");
            return;
        }

        const orderId = `ORD${Date.now().toString().slice(-6)}`;
        const newOrder = {
            id: orderId,
            items: cartItems,
            total: totals.orderTotal,
            paymentMethod,
            status: "Pending",
            placedAt: new Date().toLocaleString(),
            user: user.email,
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
        localStorage.removeItem("cart");

        setCartItems([]);
        alert(`Order ${orderId} placed successfully!`);
        navigate("/our-orders");
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart">🛒 Your cart is empty!</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-details">
                            <h2>{item.name}</h2>
                            <p>Price: ₹{item.price.toFixed(2)}</p>
                            <p>Size: {item.size} | Color: {item.color}</p>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(index, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(index, 1)}>+</button>
                            </div>
                            <button className="remove-btn" onClick={() => removeItem(index)}>❌ Remove</button>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <p><strong>Bag Total:</strong> ₹{totals.bagTotal.toFixed(2)}</p>
                    <p><strong>Delivery Fee:</strong> ₹{totals.deliveryFee.toFixed(2)}</p>
                    <p><strong>Platform Fee:</strong> ₹{totals.platformFee.toFixed(2)}</p>
                    <h3><strong>Order Total:</strong> ₹{totals.orderTotal.toFixed(2)}</h3>

                    <div className="payment-method">
                        <label><strong>Choose Payment Method:</strong></label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="UPI">UPI (Google Pay, PhonePe, Paytm)</option>
                            <option value="Credit/Debit Card">Credit/Debit Card</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>

                    {paymentMethod === "UPI" && (
                        <input
                            type="text"
                            placeholder="Enter UPI ID (e.g., example@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    )}

                    {paymentMethod === "Credit/Debit Card" && (
                        <div className="card-details">
                            <input
                                type="text"
                                placeholder="Card Number"
                                maxLength="16"
                                value={cardDetails.cardNumber}
                                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Expiry (MM/YY)"
                                maxLength="5"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                maxLength="3"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            />
                        </div>
                    )}

                    <button className="proceed-btn" onClick={placeOrder}>✅ Place Order</button>
                </div>
            )}

            <div className="cart-buttons">
                <button className="back-btn" onClick={() => navigate("/")}>🔙 Continue Shopping</button>
                <button className="orders-btn" onClick={() => navigate("/our-orders")}>📦 Our Orders</button>
            </div>
        </div>
    );
};

export default Cart;
