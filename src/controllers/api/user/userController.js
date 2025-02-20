const { response } = require('../../../helpers/response');
const { EmailMessageModel } = require('../../models/EmailMessage');
const { Validator } = require('node-input-validator');
const { User } = require('../../../models/User');

// Get All Users // 
const index = async (req, res) => {
    try {
        const users = await User.find({}, { user_password: 0, __v: 0 });
        return response(res, users, "Users retrieved successfully.", 200);
    } catch (error) {
        return response(res, {}, error.message, 500);
    }
};

// Get User By Id //
const show = async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.params.user_id }, {
            _id: 0, __v: 0, user_password: 0
        });
        if (!user) {
            return response(res, {}, "User not found.", 404);
        }

        return response(res, user, "User retrieved successfully.", 200);
    } catch (error) {
        return response(res, {}, error.message, 500);
    }
};

// Update User //
const update = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            user_name: "required",
            user_email: "required|email",
        });

        if (!(await validator.check())) {
            return response(res, validator.errors, "Validation error", 422);
        }

        const {
            user_name,
            user_email,
            user_company,
            user_role
        } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            {
                user_id: req.params.user_id
            },
            {
                user_name,
                user_email,
                user_company,
                user_role
            },
            { new: true }
        );

        if (!updatedUser) {
            return response(res, {}, "User not found.", 404);
        }

        return response(res, updatedUser, "User updated successfully.", 200);
    } catch (error) {
        return response(res, {}, error.message, 500);
    }
};

module.exports = {
    index,
    show,
    update,
}