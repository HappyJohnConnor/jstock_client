import { useState } from "react";
import styled from "styled-components";

import Table from "../components/Table";
import "../styles/StockList.css";
import { useFetchTableData } from "../hooks/useFetchTableData";

const StockList = () => {
  const [q, setQ] = useState("");
  const tableData = useFetchTableData();

  const search = () => {
    return tableData.filter(
      (row) => String(row.code).indexOf(q) > -1 || row.name.indexOf(q) > -1
    );
  };

  return (
    <div className="stockList">
      <input
        className="searchBox"
        type="text"
        value={q}
        placeholder="search..."
        onChange={(e) => setQ(e.target.value)}
      />
      <Table data={search()} />
    </div>
  );
};

export default StockList;
