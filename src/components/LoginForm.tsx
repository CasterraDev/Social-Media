"use client"
import styles from "@/css/LoginForm.module.css"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginForm() {
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const handleForm = async (e: any) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        console.log(data);

        try {
            const emailUsername = data.get("EmailUsername");
            const password = data.get("Password");

            if (!emailUsername && !password) {
                setError("Please enter all fields.");
            }

            const res = await signIn("credentials", {
                emailUsername,
                password,
                callbackUrl: "http://localhost:3000/",
            })

            if (res?.error){
                console.log(res.error);
                setError("Invalid Credentials.");
                return;
            }

            router.push("/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleForm}>
                <input type="text" name="EmailUsername" placeholder="Email or Username" />
                <input type="password" name="Password" placeholder="Password" />
                {error && <div className={styles.error}>{error}</div>}
                <Link href="/register" className={styles.register}>
                    Need an account? Register
                </Link>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}
