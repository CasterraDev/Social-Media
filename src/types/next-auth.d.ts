import { UserType } from "@/models/User";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            username: string,
            displayName: string,
            email: string,
            password: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        username: string,
        displayName: string,
        email: string,
        password: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: {
            username: string,
            displayName: string,
            email: string,
            password: string,
        }
    }
}
