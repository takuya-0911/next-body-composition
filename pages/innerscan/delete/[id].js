import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Head from 'next/head';

const DeleteInnerScan = (props) => {
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
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/innerscan/delete/${props.singleScan._id}`, {
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

    return (
        <>
            <Head><title>体組成計データ</title></Head>
            <h1>体組成計データ</h1>
            <form onSubmit={handleSubmit}>
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
                <p>{props.singleScan.bmr}</p>
                <p>{props.singleScan.visceral_fat_level}</p>
                <p>{props.singleScan.leg_score}</p>
                <p>{props.singleScan.bmi.$numberDecimal}</p>
                <p>{props.singleScan.standard_weight.$numberDecimal}</p>
                <p>{props.singleScan.degree_of_obesity.$numberDecimal}</p>
                <button>削除</button>
           </form>
        </>
    )

};

export default DeleteInnerScan;

export const getServerSideProps = async(contex) => {
    const response = await fetch(`http://localhost:3000/api/innerscan/${contex.query.id}`);
    const singleScan = await response.json();
    return {
        props: singleScan
    }
}