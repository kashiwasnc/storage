import { weatherCode } from "./weatherCode.js";
import { windDirection } from "./windDirection.js";

// Open-MeteoからJSONデータを取得する
export function fetchData() {
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;
  const requestURL = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,shortwave_radiation_sum&current_weather=true&timezone=Asia%2FTokyo`;
  return fetch(requestURL)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      } else {
        return response.json();
      }
    });
}

// 現在の天気の表示
export function currentWeather(json) {
  const weathercode = weatherCode(json);
  const winddirection = windDirection(json);
  const view = `
    <small class="p-small">
    （予報を取得した地点の緯度:${json.latitude} 経度:${json.longitude} 海抜高度:${json.elevation}m）<br>
    </small>
    <p>
    現在(${json.current_weather.time})の天気:${weathercode}, 気温:${json.current_weather.temperature}°C, ${winddirection}:${json.current_weather.windspeed}m/s
    </p>
    `
  document.getElementById("current").innerHTML = view;
}

// 今後の予報のグラフをChart.jsで描画
export function drawChart(json) {
  // 取得したJSONデータの各プロパティを新しい変数に保存
  const myTime = json.daily.time;
  const myATmax = json.daily.apparent_temperature_max;
  const myATmin = json.daily.apparent_temperature_min;
  const myTAmax = json.daily.temperature_2m_max;
  const myTAmin = json.daily.temperature_2m_min;
  const myPCsum = json.daily.precipitation_sum;
  const mySRsum = json.daily.shortwave_radiation_sum;
  // グラフを再描画する場合は前のグラフを消去
  const oldChart = Chart.getChart("chart");
  if (oldChart) {
    oldChart.destroy();
  }

  // グラフ用データの設定
  const chartData = {
    labels: myTime,
    datasets: [{
      type: 'line',
      data: myATmax,
      label: '最高体感[°C]',
      yAxisID: 'yT',
      borderColor: 'tomato',
    }, {
      type: 'line',
      data: myTAmax,
      label: '最高気温[°C]',
      yAxisID: 'yT',
      borderColor: 'orange',
    }, {
      type: 'line',
      data: myATmin,
      label: '最低体感[°C]',
      yAxisID: 'yT',
      borderColor: 'turquoise',
    }, {
      type: 'line',
      data: myTAmin,
      label: '最低気温[°C]',
      yAxisID: 'yT',
      borderColor: 'skyblue',
    }, {
      type: 'bar',
      data: myPCsum,
      label: '降水量[mm]',
      yAxisID: 'yP',
      backgroundColor: 'royalblue',
      hidden: true
    }, {
      type: 'bar',
      data: mySRsum,
      label: '日射量[MJ/m²]',
      yAxisID: 'yR',
      backgroundColor: 'maroon',
      hidden: true
    }]
  };
  // グラフ用オプションの設定
  const chartOption = {
    responsive: false,
    aspectRatio: 1.6,
    plugins: {
      title: {
        display: true,
        text: '今後一週間の予報グラフ'
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      yT: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: false,
          text: '°C',
        }
      },
      yP: {
        type: 'linear',
        min: 0,
        max: 120,
        display: false,
        position: 'right',
        title: {
          display: false,
          text: 'mm'
        }
      },
      yR: {
        min: 0,
        max: 24,
        type: 'linear',
        display: false,
        position: 'right',
        title: {
          display: false,
          text: 'MJ/m²'
        }
      },
    }
  };
  // グラフの生成
  let myChart = new Chart(document.getElementById("chart"), {
    data: chartData,
    options: chartOption
  }
  );
  // グラフのサイズを指定
  myChart.resize(768, 480);

  return myChart;
}
