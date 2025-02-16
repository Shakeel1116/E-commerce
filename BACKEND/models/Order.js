const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI", "COD"],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending"
    },
    placedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
