# CIでmicroCMSからメディア一式をダウンロードする

microCMSの画像類一式をNextの生成物の中に含めるためのコード。独自ドメイン配下に画像類を置くことができるように。

## 準備

- microCMSのサービスID,APIキー発行
- microCMSでwebhook設定([webhook設定参考1](https://document.microcms.io/manual/webhook-setting), [webhook設定参考2](https://kimulaco.com/post/microcms-webhook-to-github-actions/))
- GHAに環境変数(microCMSのサービスID,APIキー)のセット
- GHのアクセストークン発行(有効期限があるため、期限切れをalertする仕組みなども別途必要)

## 流れ

1. `npm run assets`でmicroCMSから画像類ダウンロード(public/assetsに格納)
2. `npm run build`で静的生成

## やってないこと

- `<img src="画像類の向き先">`を環境ごとに変更する

ローカルサーバーではmicroCMSから取得してprodのみでassetsは以下のものを使う方が良さそう