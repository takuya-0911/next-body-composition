import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useState } from 'react';
import NumberLimit from '../../utils/input';
import Head from 'next/head';

const RegisterInnerScan = () => {
    const router = useRouter();
    const { data: session, status: loading } = useSession({
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
    if (loading === 'loading') {
        return <div>Loading...</div>
    }

    const handleChange = (e) => {
        setNewInnerScan({
            ...newInnerScan,
            [e.target.name]: NumberLimit(e.target.value, e.target.dataset.maxdigit)
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
            router.push("/innerscan/daily");
        } catch (error) {
            alert("体組成計登録失敗");
        }
    }

    return (
        <>
            <Head><title>体組成計データ登録</title></Head>
            <h1>体組成計データ登録</h1>
            <form onSubmit={handleSubmit}>
                <p><label htmlFor="scandate">日付：</label><input type="date" value={newInnerScan.scandate} onChange={handleChange} id="scandate" name="scandate" placeholder="日付" required/></p>
                <p><label htmlFor="height">身長：</label><input type="number" data-maxdigit="3" value={newInnerScan.height} onChange={handleChange} step="0.1" name="height" placeholder="身長" required/>cm</p>
                <p><label htmlFor="weight">体重：</label><input type="number" data-maxdigit="2" value={newInnerScan.weight} onChange={handleChange} step="0.1" name="weight" placeholder="体重" required/>kg</p>
                <p><label htmlFor="body_fat">体脂肪率：</label><input type="number" data-maxdigit="2" value={newInnerScan.body_fat} onChange={handleChange} step="0.1" name="body_fat" placeholder="体脂肪率"/>%</p>
                <p><label htmlFor="fat_mass">脂肪量：</label><input type="number" data-maxdigit="2" value={newInnerScan.fat_mass} onChange={handleChange} step="0.1" name="fat_mass" placeholder="脂肪量"/>kg</p>
                <p><label htmlFor="lean_body_mass">徐脂肪量：</label><input type="number" data-maxdigit="2" value={newInnerScan.lean_body_mass} onChange={handleChange} step="0.1" name="lean_body_mass" placeholder="徐脂肪量"/>kg</p>
                <p><label htmlFor="muscle_mass">筋肉量：</label><input type="number" data-maxdigit="2" value={newInnerScan.muscle_mass} onChange={handleChange} step="0.1" name="muscle_mass" placeholder="筋肉量"/>kg</p>
                <p><label htmlFor="body_water">体水分量：</label><input type="number" data-maxdigit="2" value={newInnerScan.body_water} onChange={handleChange} step="0.1" name="body_water" placeholder="体水分量"/>kg</p>
                <p><label htmlFor="total_body_water">体水分率：</label><input type="number" data-maxdigit="3" value={newInnerScan.total_body_water} onChange={handleChange} step="0.1" name="total_body_water" placeholder="体水分率"/>%</p>
                <p><label htmlFor="bone_mass">推定骨量：</label><input type="number" data-maxdigit="3" value={newInnerScan.bone_mass} onChange={handleChange} step="0.1" name="bone_mass" placeholder="推定骨量"/>kg</p>
                <p><label htmlFor="bmr">基礎代謝量：</label><input type="number" data-maxdigit="4" value={newInnerScan.bmr} onChange={handleChange} name="bmr" placeholder="基礎代謝量"/>kcal</p>
                <p><label htmlFor="visceral_fat_level">内臓脂肪レベル：</label><input type="number" data-maxdigit="3" value={newInnerScan.visceral_fat_level} onChange={handleChange} name="visceral_fat_level" placeholder="内臓脂肪レベル"/></p>
                <p><label htmlFor="leg_score">脚点：</label><input type="number" data-maxdigit="3" value={newInnerScan.leg_score} onChange={handleChange} name="leg_score" placeholder="脚点"/>点</p><br/>
                <p><label htmlFor="bmi">BMI：</label><input type="number" data-maxdigit="3" value={newInnerScan.bmi} onChange={handleChange} step="0.1" name="bmi" placeholder="BMI"/></p>
                <p><label htmlFor="standard_weight">標準体重：</label><input type="number" data-maxdigit="3" value={newInnerScan.standard_weight} onChange={handleChange} step="0.1" name="standard_weight" placeholder="標準体重"/>kg</p>
                <p><label htmlFor="degree_of_obesity">肥満度：</label><input type="number" data-maxdigit="3" value={newInnerScan.degree_of_obesity} onChange={handleChange} step="0.1" name="degree_of_obesity" placeholder="肥満度"/>%</p>
                <button>登録</button>
            </form>
        </>
    )

};

export default RegisterInnerScan;