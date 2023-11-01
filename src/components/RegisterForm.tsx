"use client"
import styles from "@/css/RegisterForm.module.css"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const handleForm = async (e: any) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        console.log(data);

        try {
            const email = data.get("Email");
            const username = data.get("Username");
            const displayName = data.get("DisplayName");
            const password = data.get("Password");

            if (!email && !username && !displayName && !password) {
                setError("Please enter all fields.");
            }

            const resEmail = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: email }),
            })

            const { user } = await resEmail.json();

            if (user) {
                setError("Email already used.");
                return;
            }

            const resUsername = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: username }),
            })

            const usernameData = await resUsername.json();

            if (usernameData.user) {
                setError("Username already used.");
                return;
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                body: data,
            })
            const res = await response.json();

            if (response.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                setError(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleForm}>
                <input type="text" name="Email" placeholder="Email" />
                <input type="text" name="Username" placeholder="Username" />
                <input type="text" name="DisplayName" placeholder="Display Name" />
                <input type="password" name="Password" placeholder="Password" />
                {error && <div className={styles.error}>{error}</div>}
                <Link href="/login" className={styles.register}>
                    Already have an account? Login
                </Link>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
