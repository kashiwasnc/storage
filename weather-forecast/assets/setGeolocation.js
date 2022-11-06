// 端末の位置情報から緯度経度を設定
export function getGeolocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  const status = document.getElementById("status");

  function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    status.textContent = '';
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;
    document.getElementById("latitude").dispatchEvent(new Event('input'));
  }

  function error(err) {
    status.textContent = 'Unable to retrieve your location';
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}

// 緯度・経度の値のチェックなど
export function checkLatLonValue() {
  let latValue = document.getElementById("latitude").value;
  let lonValue = document.getElementById("longitude").value;
  let checkLat = checkValue(latValue);
  let checkLon = checkValue(lonValue);
  document.getElementById("check-lat").innerHTML = `${checkLat}`
  document.getElementById("check-lon").innerHTML = `${checkLon}`

  // show-infoボタンのステータス変更
  let btnShowInfo = document.getElementById("show-info");
  if (checkLat == `` && checkLon == ``) {
    btnShowInfo.disabled = false;
    btnShowInfo.className = "btn btn-action";
  } else {
    btnShowInfo.disabled = true;
    btnShowInfo.className = "btn btn-disabled";
  }
}

// 入力値のチェック
function checkValue(value) {
  if (value == "") {
    return "数値を入力してください"
  } else if (value < -180 || value > 180) {
    return `-180～180の間で入力してください`
  } else {
    return ``
  }
}
