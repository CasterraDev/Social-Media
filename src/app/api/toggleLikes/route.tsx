import Post, { PostType } from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

interface dbLikesRes {
    _id: Types.ObjectId;
    likes: Types.ObjectId[];
}

export async function POST(req: Request) {
    const data = await req.json();
    await dbConnect();
    const postRes: dbLikesRes | null = await Post.findById(data.postID, 'likes')

    if (postRes == null) return NextResponse.json({}, { status: 500 });

    let found: boolean = false;
    let result: string = "liked";

    for (let i: number = 0; i < postRes.likes.length; i++) {
        if (postRes.likes[i] == data.usernameID) {
            postRes.likes.splice(i, 1);
            found = true;
            result = "unliked";
        }
    }

    if (!found) {
        postRes.likes.push(data.usernameID);
    }

    await Post.findByIdAndUpdate(data.postID, { likes: postRes.likes })

    return NextResponse.json({ likesCnt: postRes?.likes.length, result: result })
}
