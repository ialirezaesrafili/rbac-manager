import CoreService from "./core.service.js";
import bcrypt from 'bcryptjs';

class UserService extends CoreService {
    #USER_MODEL_SCHEMA;

    constructor(userModel) {
        super(userModel);
        this.#USER_MODEL_SCHEMA = userModel;
    }

    async create(userData) {
        try {
            const { username, password, email, first_name, last_name, phone, address, age } = userData;

            // Check if the username already exists
            const existingUser = await this.#USER_MODEL_SCHEMA.findOne({ username: username.toLowerCase().trim() });
            if (existingUser) {
                throw new Error(`Username already exists: ${username}`);
            }

            // Check if the email already exists
            const existingEmail = await this.#USER_MODEL_SCHEMA.findOne({ email: email.toLowerCase().trim() });
            if (existingEmail) {
                throw new Error(`Email already exists: ${email}`);
            }

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create the new user
            const newUser = await this.#USER_MODEL_SCHEMA.create({
                username: username.toLowerCase().trim(),
                password: hashedPassword,
                email: email.toLowerCase().trim(),
                first_name: first_name || null,
                last_name: last_name || null,
                phone: phone || null,
                address: address || null,
                age,
            });

            return newUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async findOne(query) {
        try {
            const user = await this.#USER_MODEL_SCHEMA.findOne(query);
            if (!user) {
                throw new Error(`User not found: ${JSON.stringify(query)}`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    async find(query) {
        try {
            const users = await this.#USER_MODEL_SCHEMA.find(query);
            return users;
        } catch (error) {
            throw new Error(`Error finding users: ${error.message}`);
        }
    }

    async update(query, updateData) {
        try {
            const user = await this.#USER_MODEL_SCHEMA.findOneAndUpdate(query, updateData, { new: true });
            if (!user) {
                throw new Error(`User not found: ${JSON.stringify(query)}`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async delete(query) {
        try {
            const user = await this.#USER_MODEL_SCHEMA.findOneAndDelete(query);
            if (!user) {
                throw new Error(`User not found: ${JSON.stringify(query)}`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    async verifyPassword(username, password) {
        try {
            const user = await this.findOne({ username: username.toLowerCase().trim() });
            const isMatch = await bcrypt.compare(password, user.password);
            return isMatch;
        } catch (error) {
            throw new Error(`Error verifying password: ${error.message}`);
        }
    }
}

export default UserService;