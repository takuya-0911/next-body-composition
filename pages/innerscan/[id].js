import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Link from 'next/link';
import Head from 'next/head';

const ReadInnerScan = (props) => {
    const router = useRouter();
    useSession({
        required: true,
        onUnauthenticated() {
          // 認証されていないのでトップへ
          router.push("/");
        },
    });
    return (
        <>
            <Head><title>体組成計データ</title></Head>
            <h1>体組成計データ</h1>
            <div>
                <p>{props.singleScan.scandate}</p>
                <p>{props.singleScan.height.$numberDecimal}</p>
                <p>{props.singleScan.weight.$numberDecimal}</p>
                <p>{props.singleScan.body_fat.$numberDecimal}</p>
                <p>{props.singleScan.fat_mass.$numberDecimal}</p>
                <p>{props.singleScan.lean_body_mass.$numberDecimal}</p>
                <p>{props.singleScan.muscle_mass.$numberDecimal}</p>
                <p>{props.singleScan.body_water.$numberDecimal}</p>
                <p>{props.singleScan.total_body_water.$numberDecimal}</p>
                <p>{props.singleScan.bone_mass.$numberDecimal}</p>
                <p>{props.singleScan.bmr.$numberDecimal}</p>
                <p>{props.singleScan.visceral_fat_level}</p>
                <p>{props.singleScan.leg_score}</p>
                <p>{props.singleScan.bmi.$numberDecimal}</p>
                <p>{props.singleScan.standard_weight.$numberDecimal}</p>
                <p>{props.singleScan.degree_of_obesity.$numberDecimal}</p>
                <Link href={`/innerscan/update/${props.singleScan._id}`}><a>編集</a></Link>
                <Link href={`/innerscan/delete/${props.singleScan._id}`}><a>削除</a></Link>
            </div>
        </>
    )

};

export default ReadInnerScan;

export const getServerSideProps = async(contex) => {
    const response = await fetch(`http://localhost:3000/api/innerscan/${contex.query.id}`);
    const singleInnerScan = await response.json();
    return {
        props: singleInnerScan
    }
}