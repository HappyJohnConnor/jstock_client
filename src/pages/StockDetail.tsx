import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Chart from "../components/Chart";
import InfoPane from "../components/StockStats";
import { newStock } from "../functions/table_data";
import { useFetchStockData } from "../hooks/useFetchStockData";

const ChartPage = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const stock_idx = query.get("stock_idx") ?? "";
  const [prices, volumes, dates, stockData] = useFetchStockData(stock_idx);

  const Grid = styled.div`
    display: grid;
    margin: 0px;
    box-sizing: border-box;
    @media screen and (min-width: 1000px) {
      grid-template-columns: clamp(330px, 23%, 480px) 1fr;
    }
  `;

  const ChartDiv = styled.div`
    position: relative;
    @media screen and (max-width: 999px) {
      // width: calc(100% - 40px);
    }
    overflow: hidden;
  `;

  return (
    <Grid>
      <div className="pane">
        <InfoPane
          stockCode={stock_idx}
          stock={newStock(stock_idx, stockData)}
        />
      </div>
      <ChartDiv>
        <Chart dateAry={dates} priceAry={prices} volumeAry={volumes} />
      </ChartDiv>
    </Grid>
  );
};

export default ChartPage;
