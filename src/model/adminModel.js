const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
            immutable: true,
        },
    },
    { timestamps: true,versionKey:false }
);

const adminModel = model("Admin",adminSchema);
module.exports = adminModel;



