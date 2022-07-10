import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import ja from '@fullcalendar/core/locales/ja';

const DailyInnerScan = (props) => {
  const router = useRouter();
  const {status: loading} = useSession({
    required: true,
    onUnauthenticated() {
        // 認証されていないのでトップへ
        router.push("/");
      },
  });
  // ロード中
  if (loading === "loading") {
    return <div>Loading...</div>
  }

  // イベントリストに変換
  const eventsList = props.monthScan.map( data => {
    const retData = {
      title: "登録済",
      start: data.scandate.toString().substr(0,10),
      url: `https://next-body-composition.vercel.app/innerscan/${data._id}`,
    };

    return retData;
  });

  const handleCLick = (info) => {
      const compareDate = eventsList.map( data => data.start)
      // 未登録の場合、新規登録画面へ
      if (!compareDate.includes(info.dateStr)) {
        router.push({
          pathname:"/innerscan/register",
          query: {scandate: info.dateStr}
        });
      }
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        locale={ja}
        initialEvents={[{ title: "Current time", start: new Date() }]}
        events={eventsList}
        dateClick={handleCLick}
      />
    </>
  )
};

export default DailyInnerScan;

export const getServerSideProps = async(ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {props: {monthScan: []}};
  }
  session.user["login_kbn"] = session.login_kbn
  const response = await fetch("https://next-body-composition.vercel.app/api/innerscan/all", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(session.user)
  });
  const monthScan = await response.json();
  return {
      props: monthScan
  }
}