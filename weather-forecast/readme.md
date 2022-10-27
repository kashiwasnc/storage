# [weather-forecast](./index.html)

## Overview

[Open-Meteo](https://open-meteo.com/en)の天気予報 API で取得した各気象情報をウェブブラウザでシンプルに表示させる  
「現在地の体感温度をサクッと見たい！」という気持ちが作成したキッカケです

## Requirement

- Windows 10
  - Visual Studio Code

## Description

1. 天気情報を取得したい地点の緯度・経度を指定する
1. Open-Meteo の天気 API で JSON 形式の情報を取得
1. 取得した JSON データを利用して各種情報を表示
   - 天気情報を取得した地点の情報および現在の天気情報を HTML で表示
   - [Chart.js](https://www.chartjs.org/)を利用してグラフ表示

## Reference

- [API キーもログインも不要！完全無料で使える天気予報 API「Open-Meteo」を使ってみた！ - paiza 開発日誌](https://paiza.hatenablog.com/entry/2021/11/04/130000)
- [Docs | Open-Meteo.com](https://open-meteo.com/en/docs)
- [位置情報 API の使用 - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)
- [Chart.js で横スクロール可能なグラフを作る - Qiita](https://qiita.com/yutake27/items/fa7b1f6b3c7c65e9d69b)

## Licence

None
