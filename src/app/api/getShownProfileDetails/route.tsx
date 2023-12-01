import User, { UserType } from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const data = await req.json();
    dbConnect();
    const user: UserType | null = await User.findOne({username: data.username});

    let shownUser: DynamicObject = {};
    if (!user) return NextResponse.json({}, {status: 604});

    shownUser.username = user.username;
    shownUser.displayName = user.displayName;
    shownUser.bioContent = user.bioContent;
    shownUser.coverPic = user.coverPic;
    shownUser.profilePic = user.profilePic;
    shownUser.followers = user.followers;
    shownUser.followees = user.followees;
    
    let bioInfo: DynamicObject = {};
    bioInfo.bioBirthDate = user.bioInfo.bioBirthdate;
    bioInfo.bioLocation = user.bioInfo.bioLocation;
    bioInfo.bioJob = user.bioInfo.bioJob;

    shownUser.bioInfo = bioInfo;

    return NextResponse.json({shownUser, birthDate: user.bioInfo.bioBirthdate}, {status: 200});
}
