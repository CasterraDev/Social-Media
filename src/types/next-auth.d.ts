import { UserType } from "@/models/User";
import { Types } from "mongoose";
import { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT, DefaultJWT } from "next-auth/jwt"

type UserDefaultType = {

} & UserType & DefaultUser

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
        } & UserType & DefaultSession
    }

    interface User extends UserDefaultType {
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: {
        } & UserType | AdapterUser | User
    }
}
