import { useState } from "react";
import Head from "../../components/head";

const Register = () => {
    const [newUser, setNewUser] = useState({
        id: "",
        email: "",
        password: "",
        sex: "",
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
            <Head
                title={'ユーザ登録'}
            />
            <h1 className="px-2 py-1 text-gray-800 text-xl font-bold">ユーザ登録</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-2">
                <label className="block">
                    <span className="text-gray-700 font-semibold">ID</span>
                    <input className="mt-1 block w-full" value={newUser.id} onChange={handleChange} type="text" name="id" required/>
                </label>
                <label className="block">
                <span className="text-gray-700 font-semibold">メールアドレス</span>
                    <input className="mt-1 block w-full" value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="Email@exsample.com" required/>
                </label>
                <label className="block">
                    <span className="text-gray-700 font-semibold">性別</span>
                    <input className="mt-1 block w-full" value={newUser.password} onChange={handleChange} type="text" name="password" required/>
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
                <button className='mt-2 w-20 px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500'>登録</button>
            </form>
        </>
    )
};

export default Register;