import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useState } from 'react';
import Head from 'next/head';

const RegisterInnerScan = () => {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          // 認証されていないのでトップへ
          router.push("/");
        },
    });
    const [newInnerScan, setNewInnerScan] = useState({
        scandate: router.query.scandate,
        height: "",
        weight: "",
        body_fat: "",
        fat_mass: "",
        lean_body_mass: "",
        muscle_mass: "",
        body_water: "",
        total_body_water: "",
        bone_mass: "",
        bmr: "",
        visceral_fat_level: "",
        leg_score: "",
        bmi: "",
        standard_weight: "",
        degree_of_obesity: ""
    });

    const handleChange = (e) => {
        setNewInnerScan({
            ...newInnerScan,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        session.user["login_kbn"] = session.login_kbn
        try {
            const response = await fetch("http://localhost:3000/api/innerscan/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Object.assign(newInnerScan, session.user))
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("体組成計登録失敗");
        }
    }

    return (
        <>
            <Head><title>体組成計データ登録</title></Head>
            <h1>体組成計データ登録</h1>
            <form onSubmit={handleSubmit}>
                <input type="date" value={newInnerScan.scandate} onChange={handleChange} name="scandate" placeholder="日付" required/><br/>
                <input type="number" value={newInnerScan.height} onChange={handleChange} step="0.1" name="height" placeholder="身長" required/>cm<br/>
                <input type="number" value={newInnerScan.weight} onChange={handleChange} step="0.1" name="weight" placeholder="体重" required/>kg<br/>
                <input type="number" value={newInnerScan.body_fat} onChange={handleChange} step="0.1" name="body_fat" placeholder="体脂肪率"/>%<br/>
                <input type="number" value={newInnerScan.fat_mass} onChange={handleChange} step="0.1" name="fat_mass" placeholder="脂肪量"/>kg<br/>
                <input type="number" value={newInnerScan.lean_body_mass} onChange={handleChange} step="0.1" name="lean_body_mass" placeholder="徐脂肪量"/>kg<br/>
                <input type="number" value={newInnerScan.muscle_mass} onChange={handleChange} step="0.1" name="muscle_mass" placeholder="筋肉量"/>kg<br/>
                <input type="number" value={newInnerScan.body_water} onChange={handleChange} step="0.1" name="body_water" placeholder="体水分量"/>kg<br/>
                <input type="number" value={newInnerScan.total_body_water} onChange={handleChange} step="0.1" name="total_body_water" placeholder="体水分率"/>%<br/>
                <input type="number" value={newInnerScan.bone_mass} onChange={handleChange} step="0.1" name="bone_mass" placeholder="推定骨量"/>kg<br/>
                <input type="number" value={newInnerScan.bmr} onChange={handleChange} name="bmr" placeholder="基礎代謝量"/>kcal<br/>
                <input type="number" value={newInnerScan.visceral_fat_level} onChange={handleChange} name="visceral_fat_level" placeholder="内臓脂肪レベル"/><br/>
                <input type="number" value={newInnerScan.leg_score} onChange={handleChange} name="leg_score" placeholder="脚点"/>点<br/><br/>
                <input type="number" value={newInnerScan.bmi} onChange={handleChange} step="0.1" name="bmi" placeholder="BMI"/><br/>
                <input type="number" value={newInnerScan.standard_weight} onChange={handleChange} step="0.1" name="standard_weight" placeholder="標準体重"/>kg<br/>
                <input type="number" value={newInnerScan.degree_of_obesity} onChange={handleChange} step="0.1" name="degree_of_obesity" placeholder="肥満度"/>%<br/>
                <button>登録</button>
            </form>
        </>
    )

};

export default RegisterInnerScan;