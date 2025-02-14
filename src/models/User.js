const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
        unique: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    countryCode: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    status: {
        type: Number,
        trim: true,
        default: 1
    }
}, {
    timestamps: true // This will automatically create `createdAt` and `updatedAt`
});

const User = mongoose.model("users", UserSchema);

module.exports = {
    User
};
