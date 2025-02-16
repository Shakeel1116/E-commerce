import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("");
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("shippingAddress", JSON.stringify(address));
        localStorage.setItem("paymentMethod", paymentMethod);
        localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
        localStorage.setItem("upiId", upiId);
        alert("Order Placed Successfully!");
        navigate("/order-confirmation");
    };

    return (
        <div className="shipping-container">
            <h1>Shipping & Payment</h1>
            <form onSubmit={handleSubmit}>
                {/* Shipping Address Form */}
                <div className="address-form">
                    <h2>Shipping Address</h2>
                    <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                    <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} />
                    <input type="text" name="street" placeholder="Street Address" required onChange={handleChange} />
                    <input type="text" name="city" placeholder="City" required onChange={handleChange} />
                    <input type="text" name="state" placeholder="State" required onChange={handleChange} />
                    <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />
                </div>

                {/* Payment Methods - Dropdown */}
                <div className="payment-methods">
                    <h2>Select Payment Method</h2>
                    <select value={paymentMethod} onChange={handlePaymentChange} required>
                        <option value="" disabled>Select Payment Method</option>
                        <option value="PhonePe">PhonePe (UPI)</option>
                        <option value="Google Pay">Google Pay (GPay)</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>
                </div>

                {/* UPI Payment (PhonePe/GPay) */}
                {(paymentMethod === "PhonePe" || paymentMethod === "Google Pay") && (
                    <div className="upi-payment">
                        <h3>Scan QR Code or Enter UPI ID</h3>
                        <img src="/images/upi-qr.png" alt="UPI QR Code" className="upi-qr" />
                        <input type="text" placeholder="Enter UPI ID (e.g., abc@upi)" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
                    </div>
                )}

                {/* Card Payment */}
                {(paymentMethod === "Debit Card" || paymentMethod === "Credit Card") && (
                    <div className="card-payment">
                        <h3>Enter Card Details</h3>
                        <input type="text" name="cardNumber" placeholder="Card Number" maxLength="16" required onChange={handleCardChange} />
                        <input type="text" name="expiryDate" placeholder="MM/YY" maxLength="5" required onChange={handleCardChange} />
                        <input type="password" name="cvv" placeholder="CVV" maxLength="3" required onChange={handleCardChange} />
                    </div>
                )}

                <button type="submit" className="place-order-btn">Place Order</button>
            </form>
        </div>
    );
};

export default Shipping;
