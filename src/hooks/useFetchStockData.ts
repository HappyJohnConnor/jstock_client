import React, { useState, useEffect } from "react";
import { getStockData, fetchAllEarnings } from "../services/data.service";

type dict = { [key: string]: number };

export const useFetchStockData = (stock_idx: string) => {
  const [priceAry, setPriceAry] = useState<number[][]>([]);
  const [volumeAry, setVolumeAry] = useState<number[]>([]);
  const [dateAry, setDateAry] = useState<number[]>([]);
  const [stockData, setStockData] = useState<any>([]);
  const [earnigns, setEarnings] = useState<{ [key: string]: number }[]>([]);

  useEffect(() => {
    let dates;
    getStockData(stock_idx, 5).then(
      (data) => {
        setStockData(data);
        setVolumeAry(data.map((d: dict) => d["volume"]));
        setPriceAry(
          data
            .map((d: dict) => [
              d["open"],
              d["close"],
              d["low"],
              d["high"],
              d["volume"],
            ])
            .reverse()
        );
        setDateAry(data.map((d: dict) => d["time"]).reverse());
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return [priceAry, volumeAry, dateAry, stockData];
};
