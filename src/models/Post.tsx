import mongoose, { Schema, models } from "mongoose";

export type PostType = {
    posterUsername: string;
    textContent: string;
    media: string[];
    likes: Object[];
    comments: Object[];
    sharesCount: Number;
    date: Date;
    hidden: boolean;
    hashtags: string[];
    atsUsernames: string[];
}

const postSchema = new Schema(
    {
        posterUsername: {
            type: String,
            required: true,
        },
        textContent: {
            type: String,
            required: true,
        },
        media: {
            type: [String],
            default: []
        },
        likes: {
            type: [Object],
            default: []
        },
        comments: {
            type: [Object],
            default: []
        },
        sharesCount: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
        hidden: {
            type: Boolean,
            default: false
        },
        hashtags: {
            type: [String],
            default: []
        },
        atsUsernames: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;
