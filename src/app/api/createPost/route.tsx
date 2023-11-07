import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const un = data.get("username");
        const content = data.get("text");

        await dbConnect();
        await Post.create({posterUsername: un, textContent: content})

        return NextResponse.json({ success: true })
    } catch(error) {
        return NextResponse.json({ success: false, message: error })
    }
}
