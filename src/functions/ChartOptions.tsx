import * as echarts from "echarts/core";
import { EChartsOption } from "echarts-for-react";

const colorList = [
  "#c23531",
  "#2f4554",
  "#61a0a8",
  "#d48265",
  "#91c7ae",
  "#749f83",
  "#ca8622",
  "#bda29a",
  "#6e7074",
  "#546570",
  "#c4ccd3",
];
const labelFont = "bold 12px Sans-serif";

export const chartOption = (
  dateAry: number[],
  candleAry: number[][],
  volumeAry: number[]
): EChartsOption => ({
  animation: false,
  color: colorList,
  tooltip: {
    trigger: "axis",
    position: ["65", "5%"],
    formatter: function (params: any, ticket: any, callback: any) {
      if (Array.isArray(params[0].data)) {
        const o = params[0].data[1];
        const c = params[0].data[2];
        const l = params[0].data[3];
        const h = params[0].data[4];
        return `<div>o:${o}, h:${h}, l:${l}, c:${c}</div>`;
      } else {
        return `<div>vol:${params[0].data}</div>`;
      }
    },
    backgroundColor: "rgba(50,50,50,0.5)",
    borderColor: "rgba(50,50,50,0)",
    padding: 2,
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: [0, 1],
      },
    ],
  },
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: [0, 1],
      start: 40,
      end: 70,
      top: 30,
      height: 20,
    },
  ],
  xAxis: [
    {
      type: "category",
      data: dateAry,
      boundaryGap: true,
      axisLine: { lineStyle: { color: "#D3D3D3" } },
      axisLabel: {
        formatter: function (value: any) {
          return echarts.format.formatTime("MM-dd", value);
        },
      },
      splitLine: {
        show: true,
        lineStyle: { color: "#212530", type: [5, 10] },
      },
      min: "dataMin",
      max: "dataMax",
      axisPointer: {
        show: true,
        label: {
          show: true,
          color: "#da0f0f",
          formatter: function ({ value }: { value: any }) {
            return echarts.format.formatTime("MM-dd", value);
          },
        },
      },
    },
    {
      type: "category",
      gridIndex: 1,
      data: dateAry,
      boundaryGap: true,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#777" } },
      min: "dataMin",
      max: "dataMax",
      axisPointer: {
        show: true,
      },
    },
  ],
  yAxis: [
    {
      scale: true,
      splitNumber: 2,
      axisLine: { show: true, lineStyle: { color: "#D3D3D3" } },
      splitLine: {
        show: true,
        lineStyle: { color: "#212530", type: [5, 10] },
      },
      axisTick: { show: false },
      axisLabel: {
        inside: false,
        formatter: function (value: number) {
          return value | 0;
        },
      },
      axisPointer: {
        show: true,
        label: {
          color: "#da0f0f",
        },
      },
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  ],
  grid: [
    {
      left: 60,
      right: 20,
      top: 50,
      height: 250,
    },
    {
      left: 60,
      right: 20,
      top: 260,
      height: 40,
    },
  ],
  graphic: [
    {
      type: "group",
      left: "center",
      top: 70,
      width: 300,
      bounding: "raw",
      children: [
        {
          id: "MA5",
          type: "text",
          style: { fill: colorList[1], font: labelFont },
          left: 0,
        },
        {
          id: "MA10",
          type: "text",
          style: { fill: colorList[2], font: labelFont },
          left: "center",
        },
        {
          id: "MA20",
          type: "text",
          style: { fill: colorList[3], font: labelFont },
          right: 0,
        },
      ],
    },
  ],
  series: [
    {
      name: "Volume",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: "#7fbe9e",
      },
      emphasis: {
        itemStyle: {
          color: "#140",
        },
      },
      data: volumeAry,
    },
    {
      type: "candlestick",
      data: candleAry,
      itemStyle: {
        color: "#14b143",
        color0: "#ef232a",
        borderColor: "#14b143",
        borderColor0: "#ef232a",
      },
      emphasis: {
        itemStyle: {
          color: "black",
          color0: "#444",
          borderColor: "black",
          borderColor0: "#444",
        },
      },
    },
  ],
});
