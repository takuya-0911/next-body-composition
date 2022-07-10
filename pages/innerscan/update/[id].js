import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useState } from 'react';
import Head from '../../../components/head';
import { IS_UorD } from '../../../constants/constants';
import NumberLimit from '../../../utils/input';

const UpdateInnerScan = (props) => {
    const router = useRouter();
    const { data: session, status: loading } = useSession({
        required: true,
        onUnauthenticated() {
          // 認証されていないのでトップへ
          router.push("/");
        },
    });
    const [buttonValue, setButtonValue] = useState({value: ""});
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

    // ロード中
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

        // 編集ボタン押下の場合
        if (IS_UorD.UPDATE === buttonValue) {
            session.user["login_kbn"] = session.login_kbn
            try {
                const response = await fetch(`https://next-body-composition.vercel.app/api/innerscan/update/${props.singleScan._id}`, {
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
        } else {
            // 削除ボタンの場合
            if (window.confirm("削除します。よろしいですか？")) {
                try {
                    const response = await fetch(`https://next-body-composition.vercel.app/api/innerscan/delete/${props.singleScan._id}`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                    });
                    const jsonData = await response.json();
                    alert(jsonData.message);
                    router.push("/innerscan/daily");
                } catch (error) {
                    alert("体組成計削除失敗");
                }
            }
        }
    }

    return (
        <>
            <Head
            title={'体組成計データ編集'}
            />
            <h1 className="px-2 py-1 text-gray-800 text-xl font-bold">体組成計データ編集</h1>
            <form className="grid grid-cols-1 gap-6 m-2" onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <span className='text-base text-blue-900 px-2 py-2 font-medium'>
                        <input type="date" value={newInnerScan.scandate} onChange={handleChange} id="scandate" name="scandate" placeholder="日付" required/>
                    </span>
                    <table>
                        <colgroup>
                            <col span='1' className='w-2/12'/>
                            <col span='1' className='w-10/12'/>
                        </colgroup>
                        <tbody>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">身長</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.height} onChange={handleChange} step="0.1" name="height" required/>cm
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体重</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.weight} onChange={handleChange} step="0.1" name="weight" required/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体脂肪率</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.body_fat} onChange={handleChange} step="0.1" name="body_fat"/>%
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">脂肪量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.fat_mass} onChange={handleChange} step="0.1" name="fat_mass" placeholder="脂肪量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">徐脂肪量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.lean_body_mass} onChange={handleChange} step="0.1" name="lean_body_mass" placeholder="徐脂肪量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">筋肉量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.muscle_mass} onChange={handleChange} step="0.1" name="muscle_mass" placeholder="筋肉量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体水分量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.body_water} onChange={handleChange} step="0.1" name="body_water" placeholder="体水分量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体水分率</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.total_body_water} onChange={handleChange} step="0.1" name="total_body_water" placeholder="体水分率"/>%
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">推定骨量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.bone_mass} onChange={handleChange} step="0.1" name="bone_mass" placeholder="推定骨量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">基礎代謝量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.bmr} onChange={handleChange} name="bmr" placeholder="基礎代謝量"/>kcal
                                </td>

                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">内臓脂肪レベル</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.visceral_fat_level} onChange={handleChange} name="visceral_fat_level" placeholder="内臓脂肪レベル"/>    
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">脚点</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.leg_score} onChange={handleChange} name="leg_score" placeholder="脚点"/>点
                                </td>
                            </tr>
                        </tbody>
                        <tbody className='border-spacing-1 mt-3'>
                            <tr>
                                <td className='py-4'></td><td className='py-4'></td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">BMI</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.bmi} onChange={handleChange} step="0.1" name="bmi" placeholder="BMI"/>
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">標準体重</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.standard_weight} onChange={handleChange} step="0.1" name="standard_weight" placeholder="標準体重"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">肥満度</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" value={newInnerScan.degree_of_obesity} onChange={handleChange} step="0.1" name="degree_of_obesity" placeholder="肥満度"/>%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='mx-2 w-20 px-2 py-1 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500' onClick={() => setButtonValue(IS_UorD.UPDATE)}>編集</button>
                    <button className='mx-2 w-20 px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500' onClick={() => setButtonValue(IS_UorD.DELETE)}>削除</button>
                </div>
                
            </form>
        </>
    )

};

export default UpdateInnerScan;

export const getServerSideProps = async(contex) => {
    const response = await fetch(`https://next-body-composition.vercel.app/api/innerscan/${contex.query.id}`);
    const singleScan = await response.json();
    return {
        props: singleScan
    }
}