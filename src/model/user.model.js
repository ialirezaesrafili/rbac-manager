import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const addressModel = new Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    extra_detail: { type: [String], required: true },
}, { timestamps: true });

const user_type = new Schema({
    u_type: { type: String, required: true },
    permission: { type: [String], required: true },
});

const userModel = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    first_name: { type: String, required: false, default: null },
    last_name: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    address: { type: addressModel, required: false, default: null },
    age: { type: Number, required: true },
    user_type: {
        type: user_type, required: true, default: {
            u_type: 'user',
            permission: ['r']
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    logged_in: { type: Boolean, default: false },
});

userModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    if (this.password.length < 8) {
        return next(new Error('Password must be at least 8 characters long'));
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error.message);
    }
});

const User = model('User', userModel);

export default User;