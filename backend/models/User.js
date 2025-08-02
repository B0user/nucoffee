import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    // Authentication
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    // Profile Information
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    phone: {
        type: String,
        trim: true
    },
    // Coffee Preferences
    favoriteDrinks: [{
        type: String,
        trim: true
    }],
    dietaryRestrictions: [{
        type: String,
        enum: ['none', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free']
    }],
    preferredMilk: {
        type: String,
        enum: ['regular', 'skim', 'almond', 'soy', 'oat', 'coconut', 'none'],
        default: 'regular'
    },
    preferredSweetener: {
        type: String,
        enum: ['none', 'sugar', 'honey', 'stevia', 'splenda', 'agave'],
        default: 'none'
    },

    // Address & Delivery
    addresses: [{
        type: {
            type: String,
            enum: ['home', 'work', 'other'],
            default: 'home'
        },
        street: String,
        city: String,
        state: String,
        zipCode: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],

    // Loyalty & Rewards
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    membershipLevel: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum'],
        default: 'bronze'
    },
    totalSpent: {
        type: Number,
        default: 0
    },

    // Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },

    // Notifications
    notificationPreferences: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        sms: {
            type: Boolean,
            default: false
        },
        orderUpdates: {
            type: Boolean,
            default: true
        },
        promotions: {
            type: Boolean,
            default: true
        }
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (without sensitive data)
UserSchema.methods.getPublicProfile = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

// Method to update loyalty points
UserSchema.methods.addLoyaltyPoints = function(points) {
    this.loyaltyPoints += points;
    
    // Update membership level based on points
    if (this.loyaltyPoints >= 1000) {
        this.membershipLevel = 'platinum';
    } else if (this.loyaltyPoints >= 500) {
        this.membershipLevel = 'gold';
    } else if (this.loyaltyPoints >= 100) {
        this.membershipLevel = 'silver';
    }
    
    return this.save();
};

// Method to add spending
UserSchema.methods.addSpending = function(amount) {
    this.totalSpent += amount;
    return this.save();
};

// Static method to find by email
UserSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active users
UserSchema.statics.findActive = function() {
    return this.find({ isActive: true });
};

export default mongoose.model('User', UserSchema); 