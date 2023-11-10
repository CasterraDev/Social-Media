import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        await dbConnect();
        const { data }: {data:string} = await req.json();
        let user;
        console.log(data);
        if (data.includes("@") && data.includes(".")){
            user = await User.findOne({email: data}).select("_id");
        }else{
            user = await User.findOne({username: data}).select("_id");
        }
        console.log("User: ", user);
        return NextResponse.json({ user });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Error Checking User." }, { status: 500 })
    }
    return NextResponse.json({ message: "Error Checking User." }, { status: 500 })
}
