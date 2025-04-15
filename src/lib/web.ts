export const toDocument = (html: string) =>
  new DOMParser().parseFromString(html, "text/html");

export const copyToClipboard = (data: string) => {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      console.log("クリップボードにコピーされました！");
    })
    .catch((err) => {
      console.error("コピーに失敗しました: ", err);
    });
};
