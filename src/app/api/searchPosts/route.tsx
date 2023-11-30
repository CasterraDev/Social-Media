import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const data = await req.formData();
    const str: string = data.get("search") as string;
    console.log(str);
    
    await dbConnect();

    if (str == "all"){
        const d = await Post.find({});
        return NextResponse.json({posts: d}, {status: 200})
    }

    return NextResponse.json({}, {status: 603});
}
