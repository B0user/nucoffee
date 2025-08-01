import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    // itemId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Item',
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const OrderSchema = new mongoose.Schema({
    client: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
    },
    // deliveryAddress: {
    //     type: String,
    //     default: ""
    // },
    // deliveryTime: {
    //     type: String,
    //     default: ""
    // },
    // specialInstructions: {
    //     type: String,
    //     default: ""
    // },
    // paymentMethod: {
    //     type: String,
    //     enum: ['cash', 'card', 'online'],
    //     default: 'cash'
    // },
    isPaid: {
        type: Boolean,
        default: false
    },
    adminNotes: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', OrderSchema); 