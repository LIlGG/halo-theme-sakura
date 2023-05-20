import { documentFunction } from "../main";
import cloneDeep from "lodash.clonedeep";
import cloud from "d3-cloud";
import { Util } from "../utils/util";
declare const wordClouds: object[];

export default class Tags {
  @documentFunction(false)
  public registerTags() {
    const tagChips = document.querySelectorAll(".tags-container .chip") as NodeListOf<HTMLElement>;
    tagChips.forEach((tagChip) => {
      if (!tagChip.style.backgroundColor) {
        tagChip.style.backgroundColor = Util.generateColor();
      }
    });
  }

  @documentFunction(false)
  public async registerTagsWordCloud() {
    const wordCloudElement = document.getElementById("tag-wordcloud");
    if (!wordCloudElement) {
      return;
    }
    const d3 = await import("d3");
    const cloneWords = cloneDeep(wordClouds);
    var layout = cloud()
      .size([wordCloudElement.offsetWidth, wordCloudElement.offsetHeight])
      .words(cloneWords)
      .rotate(() => {
        return Math.random() * 60 - 30;
      })
      .fontSize(function (d: any) {
        return 100 - (1 / (d.size + 1)) * 120;
      })
      .padding(5)
      .on("end", (words: object[]) => {
        d3.select("#tag-wordcloud")
          .append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
          .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          .selectAll("text")
          .data(words)
          .enter()
          .append("svg:a")
          .attr("xlink:href", function (d: any) {
            return d.link;
          })
          .append("text")
          .style("font-size", function (d: any) {
            return d.size;
          })
          .style("font-family", "Impact")
          .style("cursor", "pointer")
          .style("font-weight", 500)
          .style("fill", (d: any) => {
            return d.color || Util.generateColor();
          })
          .attr("text-anchor", "middle")
          .attr("transform", function (d: any) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d: any) {
            return d.text;
          });
      });
    layout.start();
  }
}
