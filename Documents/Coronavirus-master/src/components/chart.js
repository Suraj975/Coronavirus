import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function Chart1({ value, graphCountry, width }) {
  let newArr = [];
  let newValue = value.sort((a,b) => b.cases - a.cases).slice(0, graphCountry);; 
  for (let i = 0; i < (newValue.length); i++) {
    newArr.push({ label: value[i].country, value: value[i].cases })
  }

  const chartConfigs = {
    type: "column2d",
    width: `${width > 500 ? 500 : 350}`,
    height: `${width > 500 ? 250 : 350}`,
    dataFormat: "json",
    dataSource: {
      chart: {
        "baseFontSize": "12",
        caption: `Top ${graphCountry} Countries Effected by Coronavirus`,
        xAxisName: "Country",
        yAxisName: "Cases",
        bgColor: `#272B2F`,
        yAxisNameFontColor: `${'#FFFFFF'}`,
        xAxisNameFontColor: `${'#FFFFFF'}`,
        baseFontColor: '#FFFFFF',
        divlineColor: "#999999",
        theme: "fusion",
        labelFontColor:`${'#FFFFFF'}`,
        valueFontColor:"#ffffff",
        subCaptionFontColor: `${'#FFFFFF'}`,
        captionFontColor: `${'#FFFFFF'}`,
        legendItemFontColor: `${'#FFFFFF'}`
      },
      data: newArr
    }
  };

  return (<ReactFC {...chartConfigs} />);
}

export default Chart1;