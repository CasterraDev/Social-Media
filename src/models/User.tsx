import mongoose, { Schema, models } from "mongoose";

export type UserType = {
    username: string,
    displayName: string,
    email: string,
    password: string,
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        displayName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        accessLevel: {
            type: String,
            required: true,
            default: "User",
        }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
