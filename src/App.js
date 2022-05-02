import React, { useEffect } from "react";
import LandingPage from "./core/LandingPage";
import ResponsiveAppBar from "./core/components/ResponsiveAppBar";
import SearchContainer from "./core/SearchContainer";

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { RecoilRoot } from "recoil";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import SearchResultCard from "./core/components/SearchResultCard";
import { Ranger } from "./damageComparison/classes/Ranger";
import DamageComparisonPage from "./damageComparison/DamageComparisonPage";

am4core.useTheme(am4themes_animated);

function App() {
  // useEffect(() => {
  //   console.log(
  //     new Ranger(16, {
  //       hasExtraAttack: true,
  //       hasSharpshooter: true,
  //       hasColossalSlayer: true,
  //     }).getTotalDamage()
  //   );
  // }, []);
  return (
    <RecoilRoot>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/search"
            element={
              <div>
                <SearchContainer />
                <SearchResultCard />
              </div>
            }
          />
          <Route path="/damage" element={<DamageComparisonPage />} />
        </Routes>

        <LandingPage />
      </div>
    </RecoilRoot>
  );
}

export default App;
