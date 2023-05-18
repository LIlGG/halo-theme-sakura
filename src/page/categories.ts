import { documentFunction } from "../main";
import { generateColor } from "../utils/util";
declare const categoryRadar: Map<string, number>;

import * as echarts from "echarts/core";
import { RadarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  // 数据集组件
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  RadarChart,
  CanvasRenderer,
]);

export default class Categories {
  @documentFunction(false)
  public registerCategories() {
    const categoryChips = document.querySelectorAll(".categories-container .chip") as NodeListOf<HTMLElement>;
    categoryChips.forEach((chip) => {
      if (!chip.style.backgroundColor) {
        chip.style.backgroundColor = generateColor();
      }
    });
  }

  @documentFunction(false)
  public registerCategoryRadarChart() {
    const echartElement = document.getElementById("category-echarts");
    if (!echartElement) {
      return;
    }

    const values = Object.values(categoryRadar) as number[];
    const keys = Object.keys(categoryRadar) as string[];
    if (keys.length < 3) {
      return;
    }
    const maxNum = Math.ceil(values.reduce((prev, current) => (prev > current ? prev : current)) / 5) * 5;
    const categoryChart = echarts.init(echartElement);
    categoryChart.setOption({
      title: {
        text: "文章分类雷达图",
        left: "center",
        top: "25px",
        textStyle: {
          fontSize: 22,
          fontWeight: "normal",
        },
      },
      tooltip: {
        trigger: "item",
        textStyle: {
          align: "left",
        },
      },
      radar: [
        {
          indicator: (function () {
            var indicators = [];
            for (var i = 0; i < keys.length; i++) {
              indicators.push({ text: keys[i], max: maxNum });
            }
            return indicators;
          })(),
          name: {
            textStyle: {
              // color: $(".dark").length > 0 ? "#bebebe" : "black",
              color: "black",
            },
          },
          center: ["50%", "60%"],
          radius: "60%",
        },
      ],
      series: [
        {
          type: "radar",
          itemStyle: {
            color: "rgb(123,234,185)",
          },
          lineStyle: {
            color: "rgb(123,234,185)",
          },
          areaStyle: {
            color: "rgb(123,234,185)",
          },
          data: [
            {
              value: values,
              name: "文章分类数量",
            },
          ],
        },
      ],
    });
  }
}
