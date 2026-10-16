import { writeFileSync } from 'node:fs';

const ref = encodeURIComponent('STIF:StopPoint:Q:22113:');
const res = await fetch(
  `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=${ref}`,
  { headers: { Accept: 'application/json', apikey: process.env.PRIM_API_KEY } }
);
const data = await res.json();

// 응답 전체를 파일로 저장 (다음부터는 이 파일로 연습해요)
writeFileSync('response.json', JSON.stringify(data, null, 2));

// 차량 목록 꺼내기
const visits = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;

for (const visit of visits) {
  const journey = visit.MonitoredVehicleJourney;
  const call = journey.MonitoredCall;
  const arrival = new Date(call.ExpectedArrivalTime ?? call.ExpectedDepartureTime);
  const minutes = Math.round((arrival - Date.now()) / 60000);
  console.log(`${call.StopPointName[0].value} | ${journey.LineRef.value} | → ${journey.DestinationName[0].value} | ${minutes}분 후`);
}