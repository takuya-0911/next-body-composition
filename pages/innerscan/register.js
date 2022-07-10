import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useState } from 'react';
import NumberLimit from '../../utils/input';
import Head from '../../components/head';

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
            const response = await fetch("https://next-body-composition.vercel.app/api/innerscan/register", {
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
            <Head
            title={'体組成計データ登録'}
            />
            <h1 className="px-2 py-1 text-gray-800 text-xl font-bold">体組成計データ登録</h1>
            <form onSubmit={handleSubmit}>
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
                                    <input type="number" data-maxdigit="3" value={newInnerScan.height} onChange={handleChange} step="0.1" name="height" placeholder="身長" required/>cm
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体重</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="2" value={newInnerScan.weight} onChange={handleChange} step="0.1" name="weight" placeholder="体重" required/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体脂肪率</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="2" value={newInnerScan.body_fat} onChange={handleChange} step="0.1" name="body_fat" placeholder="体脂肪率"/>%
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">脂肪量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="2" value={newInnerScan.fat_mass} onChange={handleChange} step="0.1" name="fat_mass" placeholder="脂肪量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">徐脂肪量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="2" value={newInnerScan.lean_body_mass} onChange={handleChange} step="0.1" name="lean_body_mass" placeholder="徐脂肪量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">筋肉量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="2" value={newInnerScan.muscle_mass} onChange={handleChange} step="0.1" name="muscle_mass" placeholder="筋肉量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体水分量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="2" value={newInnerScan.body_water} onChange={handleChange} step="0.1" name="body_water" placeholder="体水分量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体水分率</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="3" value={newInnerScan.total_body_water} onChange={handleChange} step="0.1" name="total_body_water" placeholder="体水分率"/>%
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">推定骨量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="3" value={newInnerScan.bone_mass} onChange={handleChange} step="0.1" name="bone_mass" placeholder="推定骨量"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">基礎代謝量</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="4" value={newInnerScan.bmr} onChange={handleChange} name="bmr" placeholder="基礎代謝量"/>kcal
                                </td>

                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">内臓脂肪レベル</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="3" value={newInnerScan.visceral_fat_level} onChange={handleChange} name="visceral_fat_level" placeholder="内臓脂肪レベル"/>    
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">脚点</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="3" value={newInnerScan.leg_score} onChange={handleChange} name="leg_score" placeholder="脚点"/>点
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
                                    <input type="number" data-maxdigit="3" value={newInnerScan.bmi} onChange={handleChange} step="0.1" name="bmi" placeholder="BMI"/>
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">標準体重</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="3" value={newInnerScan.standard_weight} onChange={handleChange} step="0.1" name="standard_weight" placeholder="標準体重"/>kg
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">肥満度</td>
                                <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>
                                    <input type="number" data-maxdigit="3" value={newInnerScan.degree_of_obesity} onChange={handleChange} step="0.1" name="degree_of_obesity" placeholder="肥満度"/>%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className='mt-2 w-20 px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500'>登録</button>
            </form>
        </>
    )

};

export default RegisterInnerScan;