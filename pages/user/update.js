import { useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { LOGIN_KBN } from "../../constants/constants";
import Head from "../../components/head";

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
        currentPassword: "",
        newPassword: "",
        sex: props.userPersonal.sex || "",
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
                <Head
                title={'ユーザ情報編集'}
                />
                <h1 className="px-2 py-1 text-gray-800 text-xl font-bold">ユーザ情報編集</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-2">
                    <label className="block">
                        <span className="text-gray-700 font-semibold">ID</span>
                        <input className="mt-1 block w-full" value={session.user.name} onChange={handleChange} type="text" name="id" placeholder="ID" required/>
                    </label>
                    <span className="text-gray-700 font-semibold">メールアドレス</span>
                    <p className="mt-0">{session.user.email}</p>
                    <label className="block">
                        <span className="text-gray-700 font-semibold">現在のパスワード</span>
                        <input className="mt-1 block w-full" value={newUser.currentPassword} onChange={handleChange} type="text" name="currentPassword" placeholder="現在のパスワード"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-semibold">新しいパスワード</span>
                        <input className="mt-1 block w-full" value={newUser.newPassword} onChange={handleChange} type="text" name="newPassword" placeholder="新しいパスワード"/>
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-semibold">性別</span>    
                        <select className="block w-full mt-1" value={newUser.sex} onChange={handleChange} name="sex">
                            <option value=""></option>
                            <option value="男性">男性</option>
                            <option value="女性">女性</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-semibold">生年月日</span>
                        <input className="mt-1 block w-full" value={newUser.birthday} onChange={handleChange} type="date" name="birthday"/>
                    </label>
                    <button className='mt-2 w-20 px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500'>編集</button>
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