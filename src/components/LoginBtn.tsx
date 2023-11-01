"use client"
import styles from "../css/LogoutBtn.module.css"
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginBtn() {
    return (
        <Link href="" onClick={() => signIn()} className={styles.link}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <p>Login</p>
        </Link>
    )
}