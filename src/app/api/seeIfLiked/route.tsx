import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();

    await dbConnect();
    const postRes = await Post.findById(data.postID, 'likes')
    if (postRes == null) return NextResponse.json({}, { status: 500 });

    let isLiked = false;

    for (let i: number = 0; i < postRes.likes.length; i++) {
        if (postRes.likes[i] == data.usernameID) {
            isLiked = true;
        }
    }

    return NextResponse.json({ liked: isLiked })
}
