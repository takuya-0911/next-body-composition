import { useState } from "react";
import Head from "next/head";

const Register = () => {
    const [newUser, setNewUser] = useState({
        id: "",
        email: "",
        password: "",
        sex: "default",
        birthday: ""
    });

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("ユーザ登録失敗");
        }
    }

    return (
        <>
            <Head><title>ユーザ登録</title></Head>
            <h1>ユーザ登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={newUser.id} onChange={handleChange} type="text" name="id" placeholder="ID" required/>
                <input value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required/>
                <input value={newUser.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required/>
                <select value={newUser.sex} onChange={handleChange} name="sex">
                    <option value="default" disabled hidden>性別</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                </select>
                <input value={newUser.birthday} onChange={handleChange} type="date" name="birthday" placeholder="生年月日"/>
                <button>登録</button>
            </form>
        </>
    )
};

export default Register;