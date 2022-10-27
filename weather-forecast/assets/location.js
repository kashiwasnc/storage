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

// 端末の位置情報から緯度経度を設定
function getGeolocation() {
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

// latitude/longitudeフォームのeventlistener
document.getElementById("latitude").addEventListener('input', checkLatLonValue);
document.getElementById("longitude").addEventListener('input', checkLatLonValue);

// 緯度・経度の値のチェックなど
function checkLatLonValue() {
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
