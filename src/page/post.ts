import { documentFunction } from "../main";

export default class Index {
  @documentFunction(false)
  public async registerShareWechat() {
    const shareWechatElement = document.getElementById("qrcode");
    if (!shareWechatElement) {
      return;
    }
    const QRCode = await import("qrcode");
    QRCode.toCanvas(shareWechatElement, shareWechatElement.getAttribute("data-url"), {
      width: 120,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  }
}
