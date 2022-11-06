import { getGeolocation, checkLatLonValue } from './setGeolocation.js';
import { fetchData, currentWeather, drawChart } from './getWeather.js'

// 地点リストから緯度経度を設定
document.getElementById("city-select").onchange = () => {
  const city = document.getElementById("city-select");
  let lat = '';
  let lon = '';
  switch (city.value) {
    case '14163'://札幌市中央区北2条西
      lat = 43.060;
      lon = 141.328;
      break;
    case '34392'://仙台市宮城野区五輪
      lat = 38.262;
      lon = 140.897;
      break;
    case '44132'://千代田区北の丸公園
      lat = 35.692;
      lon = 139.752;
      break;
    case '62078'://大阪市中央区大手前
      lat = 34.682;
      lon = 135.518;
      break;
    case '82182'://福岡市中央区大濠
      lat = 33.582;
      lon = 130.375;
      break;
    default:
      break;
  }
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lon;
  document.getElementById("latitude").dispatchEvent(new Event('input'));
};

// get-geoボタンのeventlistener
document.getElementById("get-geo").addEventListener('click', getGeolocation);

// latitude/longitudeフォームのeventlistener
document.getElementById("latitude").addEventListener('input', checkLatLonValue);
document.getElementById("longitude").addEventListener('input', checkLatLonValue);

// show-infoボタンのEventListener
document.getElementById("show-info").addEventListener('click', getWeather);

// APIから天気予報を取得して表示
async function getWeather() {
  try {
    const jsonData = await fetchData();
    currentWeather(jsonData);
    drawChart(jsonData);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}
