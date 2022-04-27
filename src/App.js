import React, { useEffect } from "react";
import LandingPage from "./core/LandingPage";
import ResponsiveAppBar from "./core/components/ResponsiveAppBar";
import SearchContainer from "./core/SearchContainer";

import { RecoilRoot } from "recoil";

import "./App.css";
import SearchResultCard from "./core/components/SearchResultCard";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ResponsiveAppBar />
        <SearchContainer />
        <SearchResultCard />
        <LandingPage />
      </div>
    </RecoilRoot>
  );
}

export default App;
