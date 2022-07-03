import { useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { LOGIN_KBN } from "../../constants/constants";
import Head from "next/head";

const UserUpdate = (props) => {
    const router = useRouter();
    
    const {data: session, status: loading} = useSession({
        required: true,
        onUnauthenticated() {
            // 認証されていないのでトップへ
            router.push("/");
        },
    });

    const [newUser, setNewUser] = useState({
        id: session.user.name,
        currentPassword: "",
        newPassword: "",
        sex: props.userPersonal.sex || "default",
        birthday: props.userPersonal.birthday.toString().substr(0,10)
    });

    // ロード中
    if (loading === "loading") {
        return <div>Loading...</div>
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        session.user["login_kbn"] = session.login_kbn
        try {
            const response = await fetch("http://localhost:3000/api/user/update", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Object.assign(newUser, session.user))
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/innerscan/daily");
        } catch (error) {
            alert("ユーザ登録失敗");
        }
    }

    // 独自ユーザの場合
    if (LOGIN_KBN.CREDENTIALS === session.login_kbn) {
        return (
            <>
                <Head><title>ユーザ情報編集</title></Head>
                <h1>ユーザ情報編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={newUser.id} onChange={handleChange} type="text" name="id" placeholder="ID" required/>
                    <p>{session.user.email}</p>
                    <input value={newUser.currentPassword} onChange={handleChange} type="text" name="currentPassword" placeholder="現在のパスワード"/>
                    <input value={newUser.newPassword} onChange={handleChange} type="text" name="newPassword" placeholder="新しいパスワード"/>
                    <select value={newUser.sex} onChange={handleChange} name="sex">
                        <option value="default" disabled hidden>性別</option>
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                    </select>
                    <input value={newUser.birthday} onChange={handleChange} type="date" name="birthday" placeholder="生年月日"/>
                    <button>編集</button>
                </form>
            </>
        )
    }

    return (
        <>
            <Head><title>ユーザ情報編集</title></Head>
            <h1>ユーザ情報編集</h1>
            <form onSubmit={handleSubmit}>
            <input value={newUser.id} onChange={handleChange} type="text" name="id" placeholder="ID" required/>
                <p>{session.user.email}</p>
                <select value={newUser.sex} onChange={handleChange} name="sex">
                    <option value="default" disabled hidden>性別</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                </select>
                <input value={newUser.birthday} onChange={handleChange} type="date" name="birthday" placeholder="生年月日"/>
                <button>編集</button>
            </form>
        </>
    )    
};

export default UserUpdate;

export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx);
    // ログインチェック
    if (!session) {
        return {props: {userPersonal: {sex: "",birthday: ""}}};
    }
    session.user["login_kbn"] = session.login_kbn
    const response = await fetch(`http://localhost:3000/api/user/selectPersonal`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session.user)
      });
    const userPersonal = await response.json();
    return {
        props: userPersonal
    }
};