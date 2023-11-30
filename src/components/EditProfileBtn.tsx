"use client"
import React, { useState } from 'react'
import ProfileUpdate from './ProfileUpdate';

export default function EditProfileBtn() {
    const [showEditor, setShowEditor] = useState<Boolean>(false);
    return (
        <>
            <button className="siteBtn" onClick={() => {setShowEditor(!showEditor)}}>EditProfileBtn</button>
            {showEditor && 
                <ProfileUpdate toggleEditor={() => setShowEditor(!showEditor)}/>
            }
        </>
    )
}
