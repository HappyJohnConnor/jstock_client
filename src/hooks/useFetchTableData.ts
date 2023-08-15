import { useState, useEffect } from "react";
import { fetchAllEarnings, fetchAllStock } from "../services/data.service";
import { Stock } from "../types/Stock";
import { EMADeviation, getRSI } from "../functions/table_data";
const stockList = require("../assets/JPX150.json");

const rowData = (
  code: string,
  prices: { [key: string]: any }[],
  earnigns: { [key: string]: number }
) => {
  return {
    code: code,
    name: stockList[code]["name"],
    criteria: stockList[code]["criteria"],
    current: prices[0]["close"],
    previous:
      prices.length > 1 ? prices[0]["close"] - prices[1]["close"] : undefined,
    volume: prices[0]["volume"],
    col_5ema: EMADeviation(prices, 5),
    col_20ema: EMADeviation(prices, 20),
    col_9rsi: getRSI(prices, 9),
    col_14rsi: getRSI(prices, 14),
    pbr: earnigns["pbr"],
    roe: earnigns["roe_2023_actual"],
    year_high: prices[0]["year_high"],
    year_low: prices[0]["year_low"],
    margin_ratio: prices[0]["margin_ratio"],
    subtraction: prices[0]["loan_balance"] - prices[0]["loan_stock_balance"],
    dividend_date: localDate(prices[0]["dividend_date"]),
    reverse_daily_rate: prices[0]["reverse_daily_rate"],
    share: prices[0]["share"],
  };
};

const localDate = (value: string) => {
  return new Date(Date.parse(value)).toLocaleDateString();
};
const makeData = (
  prices: {
    [x: string]: { [key: string]: number }[];
  },
  earnings: { [key: number]: any }
): Stock[] => {
  let rows: any[] = [];
  for (const code in stockList) {
    rows.push(rowData(code, prices["T" + code], earnings[Number(code)]));
  }
  return rows;
};

const earningsFormatter = (earnings: { [key: string]: number }[]) => {
  let dict: { [key: number]: any } = {};
  earnings.forEach((data: { [key: string]: number }) => {
    dict[data["code"]] = data;
  });
  return dict;
};

export const useFetchTableData = () => {
  const [tableData, setTableData] = useState<Stock[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const prices = await fetchAllStock();
        const earnigns = await fetchAllEarnings();
        const rows = makeData(prices, earningsFormatter(earnigns));
        setTableData(rows);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return tableData;
};
