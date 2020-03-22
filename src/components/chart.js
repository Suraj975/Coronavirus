import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function Chart1({ value, graphCountry, width }) {
  let newArr = []
  let newValue = value.slice(0, graphCountry)
  for (let i = 0; i < (newValue.length); i++) {
    newArr.push({ label: value[i].country, value: value[i].cases })
  }

  const chartConfigs = {
    type: "column2d",
    width: `${width > 500 ? 500 : 350}`,
    height: "300",
    dataFormat: "json",
    dataSource: {
      chart: {
        "baseFontSize": "12",
        caption: `Top ${graphCountry} Countries Effected by Coronavirus`,
        xAxisName: "Country",
        yAxisName: "Cases",
        theme: "fusion"
      },
      data: newArr
    }
  };

  return (<ReactFC {...chartConfigs} />);
}

export default Chart1;