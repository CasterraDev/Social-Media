import mongoose, { Schema, models } from "mongoose";

export type UserType = {
    username: string,
    displayName: string,
    email: string,
    password: string,
    accessLevel: string,
    headerPic: string,
    profilePic: string,
    followers: Object[],
    followees: Object[],
    bioContent: string,
    bioInfo: {
        bioBirthdate: string,
        bioLocation: string,
        bioJob: string,
    }
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
        },
        headerPic: {
            type: String,
        },
        profilePic: {
            type: String,
            //default: "/media/defaultProfilePic.jpg"
        },
        followers: {
            type: [Object],
            default: []
        },
        followees: {
            type: [Object],
            default: []
        },
        bioContent: {
            type: String,
            default: ""
        },
        bioInfo: {
            bioBirthdate: {
                type: Date,
            },
            bioLocation: {
                type: String,
            },
            bioJob: {
                type: String,
            }
        }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
