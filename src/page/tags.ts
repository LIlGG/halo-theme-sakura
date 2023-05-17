import { documentFunction } from "../main";
import cloneDeep from "lodash.clonedeep";
import * as d3 from "d3";
import cloud from "d3-cloud";
declare const wordClouds: object[];

export default class Tags {
  @documentFunction(false)
  public registerTagsWordCloud() {
    const wordCloudElement = document.getElementById("tag-wordcloud");
    if (!wordCloudElement) {
      return;
    }
    const cloneWords = cloneDeep(wordClouds);
    console.log(wordClouds)
    var layout = cloud()
      .size([wordCloudElement.offsetWidth, wordCloudElement.offsetHeight])
      .words(cloneWords)
      .rotate(() => {
        return (Math.random() * 60) - 30;
      })
      .fontSize(function (d) {
        return (d.size + 1) * 10
      })
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
          .attr("xlink:href", function (d) {
            return d.link;
          })
          .append("text")
          .style("font-size", function (d) {
            return d.size;
          })
          .style("fill", "black")
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d) {
            return d.text;
          });
      });
    layout.start();
  }
}
