import React, { useState, useEffect } from "react";
import { FaShippingFast, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const OurOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(storedOrders);
    }, []);

    // Function to auto-update order status and remove orders after 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setOrders((prevOrders) => {
                const updatedOrders = prevOrders
                    .map((order) => {
                        if (order.status === "Pending") {
                            return { ...order, status: "Shipped" };
                        } else if (order.status === "Shipped") {
                            return { ...order, status: "Delivered" };
                        }
                        return order;
                    })
                    .filter((order) => {
                        // Remove orders older than 30 seconds
                        const currentTime = new Date().getTime();
                        const orderTime = new Date(order.placedAt).getTime();
                        return currentTime - orderTime <= 30000; // 30 seconds
                    });

                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                return updatedOrders;
            });
        }, 10000); // Updates every 10 seconds (real-world simulation)

        return () => clearInterval(interval);
    }, []);

    // Function to get status icons
    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return <FaHourglassHalf className="status-icon pending" title="Order Pending" />;
            case "Shipped":
                return <FaShippingFast className="status-icon shipped" title="Order Shipped" />;
            case "Delivered":
                return <FaCheckCircle className="status-icon delivered" title="Order Delivered" />;
            default:
                return <FaHourglassHalf className="status-icon pending" />;
        }
    };

    return (
        <div className="orders-container">
            <h1>📦 Your Orders</h1>

            {orders.length === 0 ? (
                <p className="empty-message">No orders placed yet! 🛍️</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-item">
                        <div className="order-header">
                            <h3>Order ID: {order.id || "N/A"}</h3>
                            {getStatusIcon(order.status)}
                        </div>
                        <p><strong>Total:</strong> ₹{order.total?.toFixed(2) || "0.00"}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
                        <p><strong>Placed On:</strong> {order.placedAt || "N/A"}</p>
                        <p className={`order-status ${order.status?.toLowerCase()}`}>
                            <strong>Status:</strong> {order.status || "Pending"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OurOrders;