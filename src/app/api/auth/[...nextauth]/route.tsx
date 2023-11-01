import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/utils/dbConnect";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            async authorize(credentials: any) {
                const { emailUsername, password } = credentials;
                console.log(emailUsername);
                console.log(password);
                let user: any;
                await dbConnect();
                if (emailUsername.includes("@") && emailUsername.includes(".")) {
                    console.log("Eamila")
                    user = await User.findOne({ email: emailUsername });
                } else {
                    console.log("Usename")
                    user = await User.findOne({ username: emailUsername });
                }
                console.log("User: ", user);
                const match = await bcrypt.compare(password, user.password);
                
                if (match){
                    return user;
                }else{
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
