import Comment from "@/models/Comment";
import Post from "@/models/Post";
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
    let dbRes: dbLikesRes | null = null;

    if (data.type == "Post") {
        dbRes = await Post.findById(data.dataID, 'likes');
    } else if (data.type == "Comment") {
        dbRes = await Comment.findById(data.dataID, 'likes');
    }

    if (dbRes == null) return NextResponse.json({}, { status: 500 });

    let found: boolean = false;
    let result: string = "liked";

    for (let i: number = 0; i < dbRes.likes.length; i++) {
        if (dbRes.likes[i] == data.usernameID) {
            dbRes.likes.splice(i, 1);
            found = true;
            result = "unliked";
        }
    }

    if (!found) {
        dbRes.likes.push(data.usernameID);
    }

    if (data.type == "Post") {
        await Post.findByIdAndUpdate(data.dataID, { likes: dbRes.likes })
    } else if (data.type == "Comment") {
        await Comment.findByIdAndUpdate(data.dataID, { likes: dbRes.likes })
    }

    return NextResponse.json({ likesCnt: dbRes?.likes.length, result: result })
}
