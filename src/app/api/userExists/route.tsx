import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { data }: { data: string } = await req.json();
        let user;
        if (data.includes("@") && data.includes(".")) {
            user = await User.findOne({ email: data }).select("_id");
        } else {
            user = await User.findOne({ username: data }).select("_id");
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error Checking User." }, { status: 500 })
    }
}
