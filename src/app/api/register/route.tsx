import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
    try {
        const fd: FormData = await req.formData();
        const email: string = fd.get("Email") as string;
        const username: string = fd.get("Username") as string;
        const displayName: string = fd.get("DisplayName") as string;
        const password: string = fd.get("Password") as string;

        const dbc = await dbConnect();
        //Check that the email is already used
      //const r = await User.find({email: email})
      //console.log(r);
        console.log(password)
        const hp = await bcrypt.hash(password, 10);
        await User.create({email, username, displayName: displayName, password: hp})

        return NextResponse.json({ message: "User Registered." }, { status: 201 })
    } catch {
        return NextResponse.json({ message: "Error registering User." }, { status: 500 })
    }
}
