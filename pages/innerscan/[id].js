import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Link from 'next/link';
import Head from '../../components/head';

const ReadInnerScan = (props) => {
    const router = useRouter();
    const {status: loading} = useSession({
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
    return (
        <>
            <Head
            title={'体組成計データ'}
            />
            <h1 className="px-2 py-1 text-gray-800 text-xl font-bold">体組成計データ</h1>
            <div className='flex flex-col'>
                <span className='text-base text-blue-900 px-2 py-2 font-medium'>{props.singleScan.scandate.toString().substr(0,10)}</span>
                <table>
                    <colgroup>
                        <col span='1' className='w-2/12'/>
                        <col span='1' className='w-10/12'/>
                    </colgroup>
                    <tbody>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">身長</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.height.$numberDecimal}cm</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体重</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.weight.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体脂肪率</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.body_fat.$numberDecimal}%</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">脂肪量</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.fat_mass.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">徐脂肪量</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.lean_body_mass.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">筋肉量</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.muscle_mass.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体水分量</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.body_water.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">体水分率</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.total_body_water.$numberDecimal}%</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">推定骨量</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.bone_mass.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">基礎代謝量</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.bmr}kcal</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">内臓脂肪レベル</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.visceral_fat_level}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">脚点</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.leg_score}点</td>
                        </tr>
                    </tbody>
                    <tbody className='border-spacing-1 mt-3'>
                        <tr>
                            <td className='py-2'></td><td className='py-2'></td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">BMI</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.bmi.$numberDecimal}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">標準体重</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.standard_weight.$numberDecimal}kg</td>
                        </tr>
                        <tr className='border-b'>
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">肥満度</td>
                            <td className='text-sm text-gray-900 font-normal px-2 py-2 whitespace-nowrap'>{props.singleScan.degree_of_obesity.$numberDecimal}%</td>
                        </tr>
                    </tbody>
                </table>
                <div className='pt-4'>
                    <Link href={`/innerscan/update/${props.singleScan._id}`}><a className='mt-2 mx-1 w-20 px-5 py-1.5 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500'>編集画面</a></Link>
                </div>
                
            </div>
        </>
    )

};

export default ReadInnerScan;

export const getServerSideProps = async(contex) => {
    const response = await fetch(`https://next-body-composition.vercel.app/api/innerscan/${contex.query.id}`);
    const singleScan = await response.json();
    return {
        props: singleScan
    }
}