import ChartPage from "./pages/StockDetail";
import StockList from "./pages/StockList";
import "./styles/App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";

export default function App() {
  const Header = styled.header`
    text-align: center;
    padding: 1em;
  `;

  const MainDiv = styled.div``;
  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <Link to={"/"} style={{ fontSize: "2rem" }}>
            JStock
          </Link>
        </Header>
        <MainDiv>
          <Routes>
            <Route path="/" element={<StockList />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </MainDiv>
      </div>
    </BrowserRouter>
  );
}
