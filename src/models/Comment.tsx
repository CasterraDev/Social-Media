import mongoose, { Schema, Types, models } from "mongoose";

export type CommentType = {
    _id: Types.ObjectId;
    commenterUsername: string;
    textContent: string;
    likes: Object[];
    comments: Object[];
    commentsCount: Number;
    date: Date;
    hidden: boolean;
    deleted: boolean;
    deletedAt: Date;
    hashtags: string[];
    atsUsernames: string[];
}

const commentSchema = new Schema(
    {
        commenterUsername: {
            type: String,
            required: true,
        },
        textContent: {
            type: String,
            required: true,
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

const Comment = models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
