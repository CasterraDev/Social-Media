"use client"
import React, { FormEvent, RefObject, useEffect, useReducer, useRef, useState } from 'react'
import DropZone from './Dropzone'
import styles from "@/css/ProfileUpdate.module.css"
import { useSession } from 'next-auth/react'

type Action = {
    type: string;
} & State

type State = {
    inDropZone: Boolean;
    files: FileList | File[];
}

interface ProfileUpdateProps {
    toggleEditor: () => void
}

export default function ProfileUpdate(props: ProfileUpdateProps) {
    const { data: session, update } = useSession();
    const [formError, setFormError] = useState<string>();

    const displayNameRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
    const bioRef: RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>() as RefObject<HTMLTextAreaElement>;
    const birthdateRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
    const locationRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
    const jobRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "SET_IN_DROP_ZONE":
                return { ...state, inDropZone: action.inDropZone };
            case "ADD_FILE_TO_LIST":
                return { ...state, files: action.files };
            case "EMPTY_FILE_LIST":
                return { ...state, files: [] }
            default:
                return state;
        }
    };

    // destructuring state and dispatch, initializing fileList to empty array
    const [dataProfilePic, dispatchProfilePic] = useReducer(reducer, {
        inDropZone: false,
        files: [],
    });

    const [dataCoverPic, dispatchCoverPic] = useReducer(reducer, {
        inDropZone: false,
        files: [],
    });

    const saveChanges = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd: FormData = new FormData(e.currentTarget);

        if (!session) {
            return;
        }
        fd.append("userID", session.user._id.toString())

        if (dataProfilePic.files.length > 0) {
            fd.append("ProfileFile", dataProfilePic.files[0])
        }

        if (dataCoverPic.files.length > 0) {
            fd.append("coverFile", dataCoverPic.files[0])
        }

        const res = await fetch("/api/saveProfileChanges", {
            method: "POST",
            body: fd,
        })

        if (!res.ok) {
            setFormError("Error submitting to server")
            throw "Save Profile Changes"
        }

        props.toggleEditor();
        update();
    }

    useEffect(() => {
        if (!session || !session.user) {
            setFormError("No session being used")
            return;
        }

        if (!displayNameRef.current || !bioRef.current || !birthdateRef.current || !locationRef.current || !jobRef.current) {
            setFormError("Form refs not set")
            return;
        }

        displayNameRef.current.value = session.user.displayName;
        bioRef.current.value = session.user.bioContent;
        if (session.user.bioInfo?.bioBirthdate) {
            birthdateRef.current.value = session.user.bioInfo.bioBirthdate;
        }
        if (session.user.bioInfo?.bioLocation) {
            locationRef.current.value = session.user.bioInfo?.bioLocation;
        }
        if (session.user.bioInfo?.bioJob) {
            jobRef.current.value = session.user.bioInfo?.bioJob;
        }

    }, [session])

    return (
        <div className={styles.profileUpdateWrapper}>
            <form className={styles.container} onSubmit={saveChanges}>
                <div className={styles.header}>
                    <h2>Edit Profile Details</h2>
                    <button className={`stealthBtn ${styles.xBtn}`} onClick={props.toggleEditor}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <hr />
                <h2>Profile Picture</h2>
                <DropZone data={dataProfilePic} dispatch={dispatchProfilePic} name="Profile Picture" />
                <h2>Cover Picture</h2>
                <DropZone data={dataCoverPic} dispatch={dispatchCoverPic} name="Cover Picture" />

                <label className={styles.topMargin} htmlFor="Display Name">Display Name</label>
                <input id="Display Name" name="Display Name" ref={displayNameRef} spellCheck={false} maxLength={24}/>

                <label className={styles.topMargin} htmlFor="Bio">Bio</label>
                <textarea id="Bio" name="Bio" placeholder={session?.user.bioContent} ref={bioRef} maxLength={100}/>

                <div className={`${styles.bioInfo} ${styles.topMargin}`}>
                    <div>
                        <label htmlFor="BirthDate">BirthDate</label>
                        <input type='date' name="BirthDate" ref={birthdateRef} />
                    </div>
                    <div>
                        <label htmlFor="Location">Location</label>
                        <input type='text' name="Location" ref={locationRef} maxLength={24}/>
                    </div>
                    <div>
                        <label htmlFor="Job">Job</label>
                        <input type='text' name="Job" ref={jobRef} maxLength={24}/>
                    </div>
                </div>
                <button className={styles.topMargin} type="submit">
                    Save Changes
                </button>
                {formError &&
                    <div>
                        {formError}
                    </div>
                }
            </form>
        </div>
    )
}
