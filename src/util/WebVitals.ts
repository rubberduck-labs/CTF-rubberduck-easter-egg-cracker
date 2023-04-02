import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

const VERCEL_ANALYTICS_ID = import.meta.env.VITE_VERCEL_ANALYTICS_ID;
const VITALS_URL = 'https://vitals.vercel-analytics.com/v1/vitals';

console.log('wv', VERCEL_ANALYTICS_ID);
 
function getConnectionSpeed() {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in navigator['connection']
    ? navigator['connection']['effectiveType']
    : '';
}
 
function sendToAnalytics(metric, options) {
  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path,
  );
 
  const body = {
    dsn: VERCEL_ANALYTICS_ID,
    id: metric.id, // v2-1653884975443-1839479248192
    page, // /blog/[slug]
    href: location.href, // https://{my-example-app-name-here}/blog/my-test
    event_name: metric.name, // TTFB
    value: metric.value.toString(), // 60.20000000298023
    speed: getConnectionSpeed(), // 4g
  };
 
  if (options.debug) {
    console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
  }
 
  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(VITALS_URL, blob);
  } else
    fetch(VITALS_URL, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
}
 
function webVitals(options) {
  try {
    getFID((metric) => sendToAnalytics(metric, options));
    getTTFB((metric) => sendToAnalytics(metric, options));
    getLCP((metric) => sendToAnalytics(metric, options));
    getCLS((metric) => sendToAnalytics(metric, options));
    getFCP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error('[Analytics]', err);
  }
}

webVitals({ params: {} });