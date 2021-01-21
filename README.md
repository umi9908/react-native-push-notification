# Expo用React Native向けプッシュ通知プラグイン

## 使い方

```js
const ncmbPush = new NCMBPushNotification('YOUR_APPLICATION_KEY', 'YOUR_CLIENT_KEY');
try {
  await ncmbPush.setDeviceToken();
} catch (e) {
  console.log(e);
}
```

この処理で、プッシュ通知許可用のダイアログ表示、デバイストークンの取得、デバイストークンのNCMBへの保存処理を行います。

## デバイストークンの取得

```js
const installation = await ncmbPush.getInstallation();
```

取得したinstallationオブジェクトに新しいメタデータを紐付けられます。

## ライセンス

MIT License
