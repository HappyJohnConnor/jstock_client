import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const fetchStockData = (stock_idx: string, from: string, to: string) => {
  const data = {
    stock_idx: stock_idx,
    from: from,
    to: to,
  };
  const config = {
    method: "get",
    url: `${API_URL}/stockdata`,
    headers: {
      "Access-Control-Allow-Origin": API_URL,
      "Content-Type": "application/json",
    },
    params: data,
  };
  return axios(config).then((response) => response.data);
};

export const getStockData = (stock_idx: string, month_interval: number) => {
  const today = new Date();
  const current = strDate(today);
  today.setMonth(today.getMonth() - month_interval);
  const previous = strDate(today);
  return fetchStockData("T" + stock_idx, previous, current);
};

function strDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = date.getDate();
  return year + "-" + month + "-" + day;
}

export const fetchAllStock = () => {
  const config = {
    method: "get",
    url: `${API_URL}/stockdata/all`,
    headers: {
      "Access-Control-Allow-Origin": API_URL,
      "Content-Type": "application/json",
    },
  };
  return axios(config).then((response) => response.data);
};

export const fetchAllEarnings = () => {
  const config = {
    method: "get",
    url: `${API_URL}/stockdata/earnings`,
    headers: {
      "Access-Control-Allow-Origin": API_URL,
      "Content-Type": "application/json",
    },
  };
  return axios(config).then((response) => response.data);
};
