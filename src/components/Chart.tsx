import React, { useState, useLayoutEffect } from "react";
import { chartOption } from "../functions/ChartOptions";
import * as echarts from "echarts/core";

import ReactEChartsCore from "echarts-for-react/lib/core";

import {
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";

import { BarChart, CandlestickChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  CandlestickChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const style: React.CSSProperties = {
  //padding: "1.5em",
};

export default function Chart({
  dateAry,
  priceAry,
  volumeAry,
}: {
  dateAry: number[];
  priceAry: number[][];
  volumeAry: number[];
}) {
  return (
    <div style={style}>
      <ReactEChartsCore
        style={{ height: 500 }}
        opts={{ height: 500 }}
        echarts={echarts}
        option={chartOption(dateAry, priceAry, volumeAry)}
        notMerge
        lazyUpdate
      />
    </div>
  );
}
