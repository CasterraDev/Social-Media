import { UserType } from "@/models/User";
import { Types } from "mongoose";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            username: string,
            _id: Types.ObjectId,
            displayName: string,
            email: string,
            password: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        username: string,
        _id: Types.ObjectId,
        displayName: string,
        email: string,
        password: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: {
            username: string,
            _id: Types.ObjectId,
            displayName: string,
            email: string,
            password: string,
        }
    }
}
