import CoreController from "./core.controller.js";
import UserModel from "../../model/user.model.js";
import UserService from "../services/user.service.js";
import autoBind from "auto-bind";

class UserController extends CoreController {
    #USER_SERVICE_NAME;

    constructor() {
        super();
        autoBind(this); // Automatically bind methods to the class instance
        this.#USER_SERVICE_NAME = new UserService(UserModel); // Initialize the UserService
    }

    async create(req, res, next) {
        try {
            const userData = req.body; // Extract user data from the request body

            // Call the UserService to create a new user
            const user = await this.#USER_SERVICE_NAME.create(userData);

            // Return success response
            return res.status(201).json({
                message: "User created successfully",
                user: user,
            });
        } catch (error) {
            // Pass the error to the error-handling middleware
            next(error);
        }
    }
}

const userController = new UserController();
export default userController;