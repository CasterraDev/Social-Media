import Comment, { CommentType } from "@/models/Comment";
import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const username = data.get("Username");
        const commentText = data.get("CommentText");
        const parentID = data.get("ParentID");
        const parentType = data.get("ParentType");

        await dbConnect();
        const com: CommentType = await Comment.create({ commenterUsername: username, textContent: commentText })
        if (parentType == "Post") {
            await Post.findByIdAndUpdate(parentID, { $push: { comments: com._id } })
        } else if (parentType == "Comment") {
            await Comment.findByIdAndUpdate(parentID, { $push: { comments: com._id } })
        }

        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 301 })
    }
}
