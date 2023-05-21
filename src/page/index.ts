import { documentFunction, sakura } from "../main";

export default class Index {
  videoPlayer: any = undefined;

  @documentFunction(false)
  public registerIndex() {
    console.log("123");
  }

  /**
   * 注册背景切换事件
   */
  @documentFunction(false)
  public registerBackgroundChangeEvent() {
    const backgorundElement = document.querySelector(".bg-change-js") as HTMLImageElement;
    if (!backgorundElement) {
      return;
    }
    const backgroundNextBotton = document.getElementById("bg-next");
    const backgroundPrevBotton = document.getElementById("bg-prev");
    const backgroundLoopSize = (
      sakura.getThemeConfig("random_image").getValue("rimage_cover_back_num", Number) || 0
    ).valueOf();
    backgroundNextBotton?.addEventListener("click", () => {
      let currIndex = Number(backgorundElement.getAttribute("data-currIndex"));
      if (backgroundLoopSize === 0) {
        currIndex = Math.ceil(Math.random() * 99);
      } else {
        currIndex = (currIndex + 1) % backgroundLoopSize;
      }
      handlerChangeBackground(currIndex);
    });

    backgroundPrevBotton?.addEventListener("click", () => {
      let currIndex = Number(backgorundElement.getAttribute("data-currIndex"));
      if (backgroundLoopSize === 0) {
        currIndex = Math.ceil(Math.random() * 99);
      } else {
        currIndex = (currIndex - 1 + backgroundLoopSize) % backgroundLoopSize;
      }
      handlerChangeBackground(currIndex);
    });
    const handlerChangeBackground = (backageImageIndex: number) => {
      const randomUrl = backgorundElement.getAttribute("data-url");
      backgorundElement.src = `${randomUrl}&t=${backageImageIndex}`;
      backgorundElement.setAttribute("data-currIndex", `${backageImageIndex}`);
    };
  }

  /**
   * 注册背景视频功能
   */
  @documentFunction(false)
  public registerBackgroundVideo() {
    const videoContainerElement = document.querySelector(".video-container");
    if (!videoContainerElement) {
      return;
    }

    videoContainerElement.insertAdjacentElement("afterbegin", document.createElement("video"));
    const videoStatusElement = videoContainerElement.querySelector(".video-status") as HTMLDivElement;
    const focusInfoElement = document.querySelector(".focusinfo") as HTMLDivElement;
    const videoPlayButtonElement = videoContainerElement.querySelector(".video-play") as HTMLDivElement;
    const videoPauseButtonElement = videoContainerElement.querySelector(".video-pause") as HTMLDivElement;

    videoPlayButtonElement?.addEventListener("click", async () => {
      if (!this.videoPlayer) {
        import("video.js").then((module: any) => {
          this.videoPlayer = module.default(
            videoContainerElement.querySelector("video"),
            {
              controls: false,
              controlsBar: false,
              children: [
                "MediaLoader"
              ],
              autoplay: false,
              preload: "auto",
              muted: false,
              loop: false,
              sources: [
                {
                  src: sakura.getThemeConfig("mainScreen").getValue("bgvideo_url", String)?.toString(),
                },
              ],
            }
          );
          this.videoPlayer.ready(() => {
            videoStatusElement.innerHTML = "正在载入视频 ...";
            videoStatusElement.style.bottom = "0";
          });

          this.videoPlayer.on("loadeddata", () => {
            videoStatusElement.style.bottom = "-100px";
            focusInfoElement.style.top = "-999px";
            videoPlayButtonElement.style.display = "none";
            videoPauseButtonElement.style.display = "block";
            this.videoPlayer.play();
          });

          this.videoPlayer.on("play", () => {
            videoStatusElement.style.bottom = "-100px";
            focusInfoElement.style.top = "-999px";
            videoPlayButtonElement.style.display = "none";
            videoPauseButtonElement.style.display = "block";
          });

          this.videoPlayer.on("pause", () => {
            videoStatusElement.innerHTML = "已暂停 ...";
            videoStatusElement.style.bottom = "0";
            focusInfoElement.style.top = "0";
            videoPlayButtonElement.style.display = "block";
            videoPauseButtonElement.style.display = "none";
          });

          this.videoPlayer.on("ended", () => {
            focusInfoElement.style.top = "0";
            videoStatusElement.style.bottom = "-100px";
            videoPlayButtonElement.style.display = "block";
            videoPauseButtonElement.style.display = "none";
            this.videoPlayer.dispose();
            videoContainerElement.insertAdjacentElement("afterbegin", document.createElement("video"));
            this.videoPlayer = undefined;
          });
        });
      } else {
        this.videoPlayer.play();
      }
    });

    videoPauseButtonElement?.addEventListener("click", () => {
      if (this.videoPlayer) {
        this.videoPlayer.pause();
      }
    });
  }
}
