import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    await dbConnect();
    const r = await Post.findById(data.postID);
    return NextResponse.json({ post: r }, { status: 200 });
}
