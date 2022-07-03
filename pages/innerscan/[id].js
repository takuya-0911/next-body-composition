import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Link from 'next/link';
import Head from 'next/head';

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
            <Head><title>体組成計データ</title></Head>
            <h1>体組成計データ</h1>
            <div>
                <p><Link href={`/innerscan/daily`}><a>一覧へ</a></Link></p>
                <p>日付：{props.singleScan.scandate.toString().substr(0,10)}</p>
                <p>身長：{props.singleScan.height.$numberDecimal}cm</p>
                <p>体重：{props.singleScan.weight.$numberDecimal}kg</p>
                <p>体脂肪率：{props.singleScan.body_fat.$numberDecimal}%</p>
                <p>脂肪量：{props.singleScan.fat_mass.$numberDecimal}kg</p>
                <p>徐脂肪量：{props.singleScan.lean_body_mass.$numberDecimal}kg</p>
                <p>筋肉量：{props.singleScan.muscle_mass.$numberDecimal}kg</p>
                <p>体水分量：{props.singleScan.body_water.$numberDecimal}kg</p>
                <p>体水分率：{props.singleScan.total_body_water.$numberDecimal}%</p>
                <p>推定骨量：{props.singleScan.bone_mass.$numberDecimal}kg</p>
                <p>基礎代謝量：{props.singleScan.bmr}kcal</p>
                <p>内臓脂肪レベル：{props.singleScan.visceral_fat_level}</p>
                <p>脚点：{props.singleScan.leg_score}点</p>
                <p>BMI：{props.singleScan.bmi.$numberDecimal}</p>
                <p>標準体重：{props.singleScan.standard_weight.$numberDecimal}kg</p>
                <p>肥満度：{props.singleScan.degree_of_obesity.$numberDecimal}%</p>
                <Link href={`/innerscan/update/${props.singleScan._id}`}><a>編集</a></Link>
                <Link href={`/innerscan/delete/${props.singleScan._id}`}><a>削除</a></Link>
            </div>
        </>
    )

};

export default ReadInnerScan;

export const getServerSideProps = async(contex) => {
    const response = await fetch(`http://localhost:3000/api/innerscan/${contex.query.id}`);
    const singleScan = await response.json();
    return {
        props: singleScan
    }
}