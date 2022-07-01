import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import ja from '@fullcalendar/core/locales/ja';

export default function DailyInnerScan() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        locale={ja}
        initialEvents={[{ title: "initial event", start: new Date() }]}
        events={[
            {title: "A1", start: "2022-07-05", url: "http://localhost:3000/innerscan/62bb02e4c0098f9859289e6c"},
        ]}
      />
    </>
  );
}