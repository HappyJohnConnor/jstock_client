import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Stock } from "../types/Stock";
const stocklist = require("../JPX150.json");

export function newStock(code: string, data: { [key: string]: number }[]) {
  try {
    return {
      code: code,
      name: stocklist[code],
      current: data[0]["close"],
      previous:
        data.length > 1 ? data[0]["close"] - data[1]["close"] : undefined,
      volume: data[0]["volume"],
      year_high: data[0]["year_high"],
      year_low: data[0]["year_low"],
      margin_ratio: data[0]["margin_ratio"],
      subtraction: data[0]["loan_balance"] - data[0]["loan_stock_balance"],
      dividend_date: data[0]["dividend_date"],
      reverse_daily_rate: data[0]["reverse_daily_rate"],
      share: data[0]["share"],
      col_5ema: EMADeviation(data, 5),
      col_20ema: EMADeviation(data, 20),
      col_9rsi: getRSI(data, 9),
      col_14rsi: getRSI(data, 14),
    };
  } catch (e) {
    console.log(e);
    return {};
  }
}

export const makeData = (data: {
  [x: string]: { [key: string]: number }[];
}): Stock[] => {
  let result: any[] = [];
  for (const code in stocklist) {
    result.push(newStock(code, data["T" + code]));
  }
  return result;
};

export function EMADeviation(
  data: { [key: string]: number }[],
  period: number
): number {
  const lastPrice = data[0]["close"];
  const closels = data.reverse().map((item) => item["close"]);
  const EMA = require("technicalindicators").EMA;
  const emaValues = EMA.calculate({ period: period, values: closels });
  const lastEma = emaValues.slice(-1)[0];

  return ((lastPrice - lastEma) / lastPrice) * 100;
}

export function getRSI(
  data: { [key: string]: number }[],
  period: number
): number {
  const closels = data.reverse().map((item) => item["close"]);
  const RSI = require("technicalindicators").RSI;
  const rsiValues = RSI.calculate({ period: period, values: closels });

  return rsiValues.slice(-1)[0];
}

const colorList_EMA: { [key: string]: string } = {
  "0": "#0A1A17",
  "1": "#152B23",
  "2": "#255C43",
  "3": "#3D9B6B",
  "-1": "#1B1014",
  "-2": "#331A1E",
  "-3": "#642F32",
  "-4": "#642F32",
};

function getColor_RSI(value: number): string {
  let colorVal: string = "";
  switch (true) {
    case 40 < value && value <= 50:
      colorVal = "#1B1014";
      break;
    case 30 < value && value <= 40:
      colorVal = "#331A1E";
      break;
    case 20 < value && value <= 30:
      colorVal = "#642F32";
      break;
    case 20 > value:
      colorVal = "#642F32";
      break;
    case 50 < value && value <= 60:
      colorVal = "#0A1A17";
      break;
    case 60 < value && value <= 70:
      colorVal = "#152B23";
      break;
    case 70 < value && value <= 80:
      colorVal = "#255C43";
      break;
    case value > 80:
      colorVal = "#3D9B6B";
      break;
    default:
      break;
  }
  return colorVal;
}

export const COLUMNS: ColumnDef<Stock>[] = [
  {
    header: "コード",
    accessorKey: "code",
  },
  {
    header: "銘柄名",
    accessorKey: "name",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={"chart?stock_idx=" + row.original["code"]}
          style={{ display: "block", height: "40px" }}
        >
          {getValue<string>()}
        </Link>
      );
    },
  },
  {
    header: "現在値",
    accessorKey: "current",
    cell: ({ getValue }) => getValue<number>().toLocaleString(),
  },
  {
    header: "前日比",
    accessorKey: "previous",
    cell: ({ getValue, row }) => {
      const fontColor = getValue<number>() >= 0 ? "#A3386D" : "#15B579";
      const per = (getValue<number>() / row.original["current"]) * 100;

      return (
        <div style={{ color: fontColor, padding: "0em" }}>
          {getValue<number>().toFixed(2)}
          <br />({per.toFixed(2)}%)
        </div>
      );
    },
  },
  {
    header: "出来高",
    accessorKey: "volume",
    cell: ({ getValue }) => getValue<number>().toLocaleString(),
  },
  {
    header: "EMA Deviation",
    columns: [
      {
        header: "5EMA",
        accessorKey: "col_5ema",
        cell: ({ getValue }) => {
          const cellColor = colorList_EMA[Math.floor(getValue() / 20.1)];
          return (
            <div style={{ backgroundColor: cellColor }}>
              {getValue().toFixed(2) + "%"}
            </div>
          );
        },
      },
      {
        header: "20EMA",
        accessorKey: "col_20ema",
        cell: ({ getValue }) => {
          const cellColor = colorList_EMA[Math.floor(getValue() / 20.1)];
          return (
            <div style={{ background: cellColor }}>
              {getValue().toFixed(2) + "%"}
            </div>
          );
        },
      },
    ],
  },
  {
    header: "RSI",
    columns: [
      {
        header: "9-Days",
        accessorKey: "col_9rsi",
        cell: ({ getValue }) => (
          <div style={{ background: getColor_RSI(getValue()) }}>
            {getValue().toFixed(2) + "%"}
          </div>
        ),
      },
      {
        header: "14-Days",
        accessorKey: "col_14rsi",
        cell: ({ getValue }) => (
          <div style={{ background: getColor_RSI(getValue()) }}>
            {getValue().toFixed(2) + "%"}
          </div>
        ),
      },
    ],
  },
  {
    header: "PBR",
    accessorKey: "pbr",
  },
  {
    header: "ROE",
    accessorKey: "roe",
  },
];
