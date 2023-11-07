"use client"
import { RefObject, useRef } from "react";
import styles from "../css/PostForm.module.css"
import Avatar from "./Avatar";
import Card from "./Card";

interface Props {
    username: string
}

export default function PostForm(props: Props) {

    const textRef: RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>() as RefObject<HTMLTextAreaElement>;
    const mediaRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
    {/* const locationRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>; */ }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (textRef.current == null || mediaRef.current == null) {
            throw "ERROR: Refs not found"
        }

        const files: FileList = mediaRef.current?.files as FileList;
        const data: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("media[]", files[i])
        }
        data.append("text", textRef.current?.value as string);
        data.append("username", props.username);

        const res: Response = await fetch("/api/createPost", {
            method: "POST",
            body: data,
        })
        const d = await res.json();
        if (!d.success) {
            throw "CreatePost Failed";
        }

        textRef.current.value = "";
        mediaRef.current.files = null;
    }

    const handleFileUpload = () => {
        mediaRef.current?.click();
    }

    {/* const handleLocationUpload = () => { */ }
    {/*     locationRef.current?.click(); */ }
    {/* } */ }

    return (
        <Card>
            <div className={styles.wrapper}>
                <div>
                    <Avatar />
                </div>
                <form onSubmit={handleSubmit} className={styles.postContent}>
                    <textarea ref={textRef} placeholder="What to Post" />
                    <div className={styles.bottomBar}>
                        <div className={styles.infoBtns}>
                            <div onClick={handleFileUpload} className={styles.infoBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="file" ref={mediaRef} hidden />
                            {/*                         <div onClick={handleLocationUpload} className={styles.infoBtn}> */}
                            {/*                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> */}
                            {/*                                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-11-4.69v.447a3.5 3.5 0 001.025 2.475L8.293 10 8 10.293a1 1 0 000 1.414l1.06 1.06a1.5 1.5 0 01.44 1.061v.363a1 1 0 00.553.894l.276.139a1 1 0 001.342-.448l1.454-2.908a1.5 1.5 0 00-.281-1.731l-.772-.772a1 1 0 00-1.023-.242l-.384.128a.5.5 0 01-.606-.25l-.296-.592a.481.481 0 01.646-.646l.262.131a1 1 0 00.447.106h.188a1 1 0 00.949-1.316l-.068-.204a.5.5 0 01.149-.538l1.44-1.234A6.492 6.492 0 0116.5 10z" clipRule="evenodd" /> */}
                            {/*                             </svg> */}
                            {/*                         </div> */}
                            {/*                         <input type="file" ref={locationRef} hidden /> */}
                        </div>
                        <button type="submit" className={styles.submit}>
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    )
}
