import React, { useEffect } from "react";

import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { Grid } from "@mui/material";
import DamageComparisonSelector from "./components/DamageComparisonSelector";

import { useRecoilValue } from "recoil";
import { damageComparisonDataState } from "../atoms";

const DamageComparisonPage = () => {
  const damageComparisonData = useRecoilValue(damageComparisonDataState);

  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.data = damageComparisonData;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "class";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "class";
    series.dataFields.valueY = "damage";
    series.dataFields.categoryY = "features";
    series.columns.template.fill = am4core.color("#104547");
    series.columns.template.tooltipText =
      "{categoryX}\nDamage: {valueY}\n\nFeatures: {categoryY}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    series.columns.template.adapter.add("fill", (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });
  }, [damageComparisonData]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <DamageComparisonSelector />
      </Grid>
      <Grid item xs={12}>
        <div id="chartdiv"></div>
      </Grid>
    </Grid>
  );
};

export default DamageComparisonPage;
