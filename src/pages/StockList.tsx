import { useState } from "react";
import styled from "styled-components";

import Table from "../components/Table";
import "../styles/StockList.css";
import { useFetchTableData } from "../hooks/useFetchTableData";

const PBHBtn = styled.span`
  padding: 0.5em;
  margin: 1em 0.5em 1em 0;
  border-radius: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  padding: 0.5em 1em 0.5em 1em;
  background-color: #202e3c;
  border-radius: 5px;
`;

const StockList = () => {
  const [q, setQ] = useState("");
  const tableData = useFetchTableData();
  const [criteria, setCriteria] = useState<null | "PBR" | "ES">(null);

  const togglePBRTh = (value: number) => {
    if (criteria !== "PBR" && value === 1) {
      setCriteria("PBR");
    } else if (criteria === "PBR" && value === 1) {
      setCriteria(null);
    } else if (criteria !== "ES" && value === 0) {
      setCriteria("ES");
    } else if (criteria === "ES" && value === 0) {
      setCriteria(null);
    }
  };

  const middlePBR = () => {
    const pbrs = tableData.map((row) => row["pbr"]);
    pbrs.sort((x, y) => x - y);
    return pbrs[Number(pbrs.length / 2)];
  };

  const search = () => {
    //const middle = middlePBR();
    return tableData.filter((row) => {
      if (criteria === null) {
        return String(row.code).indexOf(q) > -1 || row.name.indexOf(q) > -1;
      } else {
        return row.criteria === criteria;
      }
    });
  };

  return (
    <div className="stockList">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0.5em",
        }}
      >
        <div>
          <PBHBtn
            className={`${criteria === "PBR" ? "selected" : "non-selected"}`}
            onClick={() => togglePBRTh(1)}
          >
            PBR選定銘柄
          </PBHBtn>
          <PBHBtn
            className={`${criteria === "ES" ? "selected" : "non-selected"}`}
            onClick={() => togglePBRTh(0)}
          >
            ROE選定銘柄
          </PBHBtn>
        </div>
        <SearchInput
          className="searchBox"
          type="text"
          value={q}
          placeholder="search..."
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Table data={search()} />
    </div>
  );
};

export default StockList;
