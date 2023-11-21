import Comment, { CommentType } from "@/models/Comment";
import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const username = data.Username;
        const commentText = data.CommentText;
        const parentID = data.ParentID;
        const parentType = data.ParentType;
        const commentParents = data.CommentParents;
        const postID = data.PostID;

        await dbConnect();
        const com: CommentType = await Comment.create({ postID: postID, commenterUsername: username, textContent: commentText })
        if (parentType == "Post") {
            await Post.findByIdAndUpdate(parentID, { $push: { comments: com._id }, $inc: { commentsCount: 1 } })
        } else if (parentType == "Comment") {
            if (postID == null || postID == undefined) {
                return NextResponse.json({ message: "Could not make comment reply" }, { status: 605 })
            }
            await Comment.findByIdAndUpdate(parentID, { $push: { comments: com._id } })
            await Comment.updateMany({ _id: { $in: commentParents } }, { $inc: { commentsCount: 1 } });
            await Post.findByIdAndUpdate(postID, { $inc: { commentsCount: 1 } })
        }

        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 301 })
    }
}
