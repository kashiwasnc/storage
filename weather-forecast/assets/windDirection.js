// 風向きを求める
export function windDirection(json) {
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