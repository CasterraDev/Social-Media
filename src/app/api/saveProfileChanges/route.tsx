import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

interface DynamicObject {
    [key: string]: any
}

export async function POST(req: Request){
    const data = await req.formData();
    console.log(data);

    const userID = data.get("userID");

    const displayName = data.get("Display Name");
    const bioContent = data.get("Bio");
    const birthdate = data.get("BirthDate");
    const location = data.get("Location");
    const job = data.get("Job");

    await dbConnect();

    let changes: DynamicObject = {};

    if (displayName){
        changes.displayName = displayName;
    }
    if (bioContent){
        changes.bioContent = bioContent;
    }

    let bioChanges: DynamicObject = {};

    if (birthdate){
        bioChanges.bioBirthdate = birthdate;
    }
    if (location){
        bioChanges.bioLocation = location;
    }
    if (job){
        bioChanges.bioJob = job;
    }

    changes.bioInfo = bioChanges;

    console.log(changes);

    await User.findOneAndUpdate({_id: userID}, changes, {new: true});

    return NextResponse.json({changes}, {status: 200})
}
