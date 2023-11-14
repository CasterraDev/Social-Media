import Comment, { CommentType } from "@/models/Comment";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        
        const username = data.get("Username");
        const commentText = data.get("CommentText");
        const parentCom = data.get("ParentComment");

        await dbConnect();
        const com: CommentType = await Comment.create({ commenterUsername: username, textContent: commentText })
        await Comment.findByIdAndUpdate(parentCom, { $push: { comments: com._id } })

        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 301 })
    }
}
