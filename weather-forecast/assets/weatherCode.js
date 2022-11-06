// 天気コードから天気を求める
export function weatherCode(json) {
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