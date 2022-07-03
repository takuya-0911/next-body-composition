import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useState } from 'react';
import Head from 'next/head';

const UpdateInnerScan = (props) => {
    const router = useRouter();
    const { data: session, status: loading } = useSession({
        required: true,
        onUnauthenticated() {
          // 認証されていないのでトップへ
          router.push("/");
        },
    });
    // ロード中
    if (loading === 'loading') {
        return <div>Loading...</div>
    }
    const [newInnerScan, setNewInnerScan] = useState({
        scandate: props.singleScan.scandate.toString().substr(0,10),
        height: props.singleScan.height.$numberDecimal,
        weight: props.singleScan.weight.$numberDecimal,
        body_fat: props.singleScan.body_fat.$numberDecimal,
        fat_mass: props.singleScan.fat_mass.$numberDecimal,
        lean_body_mass: props.singleScan.lean_body_mass.$numberDecimal,
        muscle_mass: props.singleScan.muscle_mass.$numberDecimal,
        body_water: props.singleScan.body_water.$numberDecimal,
        total_body_water: props.singleScan.total_body_water.$numberDecimal,
        bone_mass: props.singleScan.bone_mass.$numberDecimal,
        bmr: props.singleScan.bmr,
        visceral_fat_level: props.singleScan.visceral_fat_level,
        leg_score: props.singleScan.leg_score,
        bmi: props.singleScan.bmi.$numberDecimal,
        standard_weight: props.singleScan.standard_weight.$numberDecimal,
        degree_of_obesity: props.singleScan.degree_of_obesity.$numberDecimal
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
            const response = await fetch(`http://localhost:3000/api/innerscan/update/${props.singleScan._id}`, {
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
            alert("体組成計編集失敗");
        }
    }

    return (
        <>
            <Head><title>体組成計データ編集</title></Head>
            <h1>体組成計データ編集</h1>
            <form onSubmit={handleSubmit}>
            <p><label for="scandate">日付：</label><input type="date" value={newInnerScan.scandate} onChange={handleChange} id="scandate" name="scandate" placeholder="日付" required/></p>
                <p><label for="height">身長：</label><input type="number" value={newInnerScan.height} onChange={handleChange} step="0.1" name="height" placeholder="身長" required/>cm</p>
                <p><label for="weight">体重：</label><input type="number" value={newInnerScan.weight} onChange={handleChange} step="0.1" name="weight" placeholder="体重" required/>kg</p>
                <p><label for="body_fat">体脂肪率：</label><input type="number" value={newInnerScan.body_fat} onChange={handleChange} step="0.1" name="body_fat" placeholder="体脂肪率"/>%</p>
                <p><label for="fat_mass">脂肪量：</label><input type="number" value={newInnerScan.fat_mass} onChange={handleChange} step="0.1" name="fat_mass" placeholder="脂肪量"/>kg</p>
                <p><label for="lean_body_mass">徐脂肪量：</label><input type="number" value={newInnerScan.lean_body_mass} onChange={handleChange} step="0.1" name="lean_body_mass" placeholder="徐脂肪量"/>kg</p>
                <p><label for="muscle_mass">筋肉量：</label><input type="number" value={newInnerScan.muscle_mass} onChange={handleChange} step="0.1" name="muscle_mass" placeholder="筋肉量"/>kg</p>
                <p><label for="body_water">体水分量：</label><input type="number" value={newInnerScan.body_water} onChange={handleChange} step="0.1" name="body_water" placeholder="体水分量"/>kg</p>
                <p><label for="total_body_water">体水分率：</label><input type="number" value={newInnerScan.total_body_water} onChange={handleChange} step="0.1" name="total_body_water" placeholder="体水分率"/>%</p>
                <p><label for="bone_mass">推定骨量：</label><input type="number" value={newInnerScan.bone_mass} onChange={handleChange} step="0.1" name="bone_mass" placeholder="推定骨量"/>kg</p>
                <p><label for="bmr">基礎代謝量：</label><input type="number" value={newInnerScan.bmr} onChange={handleChange} name="bmr" placeholder="基礎代謝量"/>kcal</p>
                <p><label for="visceral_fat_level">内臓脂肪レベル：</label><input type="number" value={newInnerScan.visceral_fat_level} onChange={handleChange} name="visceral_fat_level" placeholder="内臓脂肪レベル"/></p>
                <p><label for="leg_score">脚点：</label><input type="number" value={newInnerScan.leg_score} onChange={handleChange} name="leg_score" placeholder="脚点"/>点</p><br/>
                <p><label for="bmi">BMI：</label><input type="number" value={newInnerScan.bmi} onChange={handleChange} step="0.1" name="bmi" placeholder="BMI"/></p>
                <p><label for="standard_weight">標準体重：</label><input type="number" value={newInnerScan.standard_weight} onChange={handleChange} step="0.1" name="standard_weight" placeholder="標準体重"/>kg</p>
                <p><label for="degree_of_obesity">肥満度：</label><input type="number" value={newInnerScan.degree_of_obesity} onChange={handleChange} step="0.1" name="degree_of_obesity" placeholder="肥満度"/>%</p>
                <button>編集</button>
            </form>
        </>
    )

};

export default UpdateInnerScan;

export const getServerSideProps = async(contex) => {
    const response = await fetch(`http://localhost:3000/api/innerscan/${contex.query.id}`);
    const singleScan = await response.json();
    return {
        props: singleScan
    }
}