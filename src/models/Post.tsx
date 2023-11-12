import mongoose, { Schema, Types, models } from "mongoose";

export type PostType = {
    _id: Types.ObjectId;
    posterUsername: string;
    textContent: string;
    media: string[];
    likes: Object[];
    comments: Object[];
    commentsCount: Number;
    sharesCount: Number;
    date: Date;
    hidden: boolean;
    deleted: boolean;
    deletedAt: Date;
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
        commentsCount: {
            type: Number,
            default: 0
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
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
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
