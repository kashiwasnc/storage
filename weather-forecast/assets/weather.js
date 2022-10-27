// show-infoボタンのEventListener
document.getElementById("show-info").addEventListener('click', getWeather);

// main function
async function getWeather() {
    try {
        const jsonData = await fetchData();
        currentWeather(jsonData);
        oldChart();
        drawChart(jsonData);
    } catch (error) {
        console.error(`エラーが発生しました (${error})`);
    }
}

// Open-MeteoからJSONデータを取得する
function fetchData() {
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
function currentWeather(json) {
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

// グラフを再描画する場合は前のグラフを消去
function oldChart() {
    const oldChart = Chart.getChart("chart");
    if (oldChart) {
        oldChart.destroy();
    }
}

// 今後の予報のグラフをChart.jsで描画
function drawChart(json) {
    // 取得したJSONデータの各プロパティを新しい変数に保存
    const myTime = json.daily.time;
    const myATmax = json.daily.apparent_temperature_max;
    const myATmin = json.daily.apparent_temperature_min;
    const myTAmax = json.daily.temperature_2m_max;
    const myTAmin = json.daily.temperature_2m_min;
    const myPCsum = json.daily.precipitation_sum;
    const mySRsum = json.daily.shortwave_radiation_sum;
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

// 天気コードから天気を求める
function weatherCode(json) {
    const wCode = JSON.parse(json.current_weather.weathercode);
    switch (wCode) {
        case 0://clear sky
            return "快晴";
        case 1://mainly clear
            return "晴れ";
        case 2://partly cloudy
            return "晴れ時々曇り";
        case 3://overcast
            return "曇り";
        case 45:
        case 48://fog and depositing rime fog
            return "霧";
        case 51:
        case 53:
        case 55://drizzle: light, moderate, and dense
            return "霧雨"
        case 56:
        case 57://freezing drizzle: light and dense
            return "霧雨（着氷性）"
        case 61://rain: slight, moderate, and heavy
            return "小雨";
        case 63:
            return "雨";
        case 65:
            return "大雨";
        case 66:
        case 67://freezing rain: light and heavy
            return "着氷性の雨";
        case 71://snow fall: slight, moderate,and heavy
            return "小雪";
        case 73:
            return "雪";
        case 75:
            return "大雪";
        case 77://snow grains
            return "霧雪";
        case 80://rain showers: slight, moderate, and heavy
        case 81:
        case 82:
            return "にわか雨";
        case 85://snow showers slight and heavy
            return "一時的な雪";
        case 86:
            return "一時的な雪";
        case 95://Thunderstorm: Slight or moderate
            return "一時的な雷雨";
        case 96://Thunderstorm with slight and heavy hail
            return "雷雨";
        case 99:
            return "激しい雷雨";
        default:
            return "エラー";
    }
}

// 角度から風向きを求める
function windDirection(json) {
    const direction = JSON.parse(json.current_weather.winddirection);
    if (direction < 0) {
        return "エラー";
    } else if (direction < 23) {
        return "北風";
    } else if (direction < 68) {
        return "北東の風";
    } else if (direction < 103) {
        return "東風";
    } else if (direction < 158) {
        return "南東の風";
    } else if (direction < 203) {
        return "南風";
    } else if (direction < 248) {
        return "南西の風";
    } else if (direction < 293) {
        return "西風";
    } else if (direction < 338) {
        return "北西の風"
    } else if (direction <= 360) {
        return "北風"
    } else {
        return "エラー";
    }
}