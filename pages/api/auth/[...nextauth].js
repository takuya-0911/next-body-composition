import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import bcrypt from 'bcrypt';

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
                    const result = await bcrypt.compare(credentials.password, foundUser.password);
                    if (result) {
                        const user = {
                            name: foundUser['id'],
                            email: foundUser['email'],
                          };
                        return user;
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
        async jwt({ token, account }) {
            if (account) {
                console.log(account);
                // ログイン区分判定
                token.login_kbn = account.provider
            }
            return token
          },
          async session({ session, token }) {
            session.login_kbn = token.login_kbn
            return session
          }
      },
    secret: 'secret',
});