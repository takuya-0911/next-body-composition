import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

/**
 * IDまたはEmailからユーザを検索
 * @param {IDOrEmail} logStr 
 * @returns ユーザ情報
 */
const findUser = logStr => {
    if (logStr.includes("@")) {
        return UserModel.findOne({email: logStr});
    } else {
        return UserModel.findOne({id: logStr});
    }
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            // 表示名
            name: "Email",
            // ログインページのフォーム生成
            credentials: {
              login: { label: "ID or Email", type: "text" },
              password: { label: "Password", type: "password" },
            },
            // 認証の関数
            authorize: async credentials => {
                try {
                    await connectDB();
                    const foundUser = await findUser(credentials.login);
                    if (foundUser.password === credentials.password) {
                        return foundUser;
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            console.log(session);
            console.log(user);
            return Promise.resolve({
              ...session,
              user: {
                ...session.user,
                id: user.id
              }
            });
        }
    }
});