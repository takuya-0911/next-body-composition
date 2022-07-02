import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import { getSession } from 'next-auth/react';
import { useRouter } from "next/router";
import ja from '@fullcalendar/core/locales/ja';

const DailyInnerScan = (props) => {
  const router = useRouter();

  // イベントリストに変換
  const eventsList = props.monthScan.map( data => {
    const retData = {
      title: "登録済",
      start: data.scandate.toString().substr(0,10),
      url: `http://localhost:3000/innerscan/${data._id}`,
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
        initialEvents={[{ title: "initial event", start: new Date() }]}
        events={eventsList}
        dateClick={handleCLick}
      />
    </>
  )
};

export default DailyInnerScan;

export const getServerSideProps = async(ctx) => {
  const session = await getSession(ctx);
  session.user["login_kbn"] = session.login_kbn
  // 月初を取得
  let today = new Date(new Date().setDate(1));
  const bigiMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const response = await fetch("http://localhost:3000/api/innerscan/period", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.assign({bigiMonth: bigiMonth}, session.user))
  });
  const monthScan = await response.json();
  return {
      props: monthScan
  }
}