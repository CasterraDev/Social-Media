import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'
import EditProfileBtn from './EditProfileBtn';

interface ProfileBtnProps {
    userID: string;
}

export default async function ProfileBtn(props: ProfileBtnProps) {
    const session = await getServerSession(authOptions)
    return (
        <div>{session?.user.username == props.userID ? <EditProfileBtn /> : <button className="siteBtn">Follow</button>}</div>
    )
}
