const ref = encodeURIComponent('STIF:StopPoint:Q:22113:');
const res = await fetch(
  `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=${ref}`,
  { headers: { Accept: 'application/json', apikey: process.env.PRIM_API_KEY } }
);
console.log('status:', res.status);
console.log(JSON.stringify(await res.json(), null, 2).slice(0, 3000));