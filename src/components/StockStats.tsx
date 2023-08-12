import { useEffect, useState } from "react";
import styled from "styled-components";

const InfoPane = ({
  stockCode,
  stock,
}: {
  stockCode: string;
  stock: { [key: string]: any };
}) => {
  const stockName = require("../JPX150.json")[stockCode];

  const MainDiv = styled.div`
    padding: 24px;
    @media screen and (max-width: 991px) {
      padding: 0 16px;
    }
  `;
  const NameSpan = styled.span`
    font-size: 18px;
  `;
  const CodeSpan = styled.span`
    font-size: 12px;
    padding-left: 7.5px;
  `;
  const PriceDiv = styled.div`
    font-size: 40px;
    padding-bottom: 0.5em;
  `;
  const Metric = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const ItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.25em;
    &:hover {
      background-color: rgba(61, 60, 61, 0.4);
    }
  `;

  const getDateStr = (d: string) => {
    let t = new Date(Date.parse(d));
    return t.toLocaleDateString();
  };

  const getMarketCapStr = (sum: number) => {
    return (sum / 1000000).toFixed(2);
  };
  return (
    <MainDiv>
      <div>
        <NameSpan className="text-xl">{stockName}</NameSpan>
        <CodeSpan>({stockCode})</CodeSpan>
      </div>
      <PriceDiv>{stock?.current?.toLocaleString()}円</PriceDiv>
      <Metric>
        <ItemDiv>
          <div>時価総額</div>
          <div>{getMarketCapStr(stock.current * stock.share * 1000)}百万円</div>
        </ItemDiv>
        <ItemDiv>
          <div>出来高</div>
          <div>{stock.volume?.toLocaleString()}</div>
        </ItemDiv>
        <ItemDiv>
          <div>倍率</div>
          <div>{stock.margin_ratio}</div>
        </ItemDiv>
        <ItemDiv>
          <div>差し引き</div>
          <div>{stock.subtraction?.toLocaleString()}</div>
        </ItemDiv>
        <ItemDiv>
          <div>配当落</div>
          <div>{getDateStr(stock.dividend_date)}</div>
        </ItemDiv>
        <ItemDiv>
          <div>逆日歩</div>
          <div>{stock.reverse_daily_rate}</div>
        </ItemDiv>
        <ItemDiv>
          <div>配当金</div>
          <div>{stock.share}</div>
        </ItemDiv>
      </Metric>
    </MainDiv>
  );
};

export default InfoPane;
