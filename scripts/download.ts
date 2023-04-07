import download from "download";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

type MicroCMSMediaApiResponse = {
  limit: number;
  media: { height: number; id: string; url: string; width: number }[];
  offset: number;
  totalCount: number;
};

async function _download() {
  /** microCMSのID */
  const MICRO_CMS_API_SERVICE_ID = process.env.MICRO_CMS_API_SERVICE_ID;
  /** APIキー(マネジメントAPIタブの`メディアの取得`要チェック) */
  const MICRO_CMS_API_KEY = process.env.MICRO_CMS_API_KEY;
  /** メディアAPIエンドポイント */
  const API_URL = `https://${MICRO_CMS_API_SERVICE_ID}.microcms-management.io/api/v1/media`;
  /** メディア格納庫 */
  const ASSETS_DIR = path.join(__dirname, "../public/assets");

  if (!MICRO_CMS_API_SERVICE_ID || !MICRO_CMS_API_KEY) {
    const message = "🔴 環境変数が設定されていません";
    console.error(message);
    throw new Error(message);
  }

  console.time("🟠 ダウンロード");

  const assets: MicroCMSMediaApiResponse = await fetch(API_URL, {
    headers: {
      "X-MICROCMS-API-KEY": MICRO_CMS_API_KEY,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  for (const asset of assets.media) {
    await download(asset.url, ASSETS_DIR);
  }
  console.timeEnd("🟠 ダウンロード");
  console.log("🟢 ダウンロード完了");
}

_download();
