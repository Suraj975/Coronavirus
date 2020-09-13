import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const HistoricalChart = ({value, numberOfCountry, width}) => {

    let topSelectedValues = value.slice(0, numberOfCountry);
    let category = topSelectedValues.map(item => {if(item.country){
        return {"label": item.country}
    }})
    let cases = topSelectedValues.map(item => {if(item.cases){
        return {"value": item.cases.toString()}
    }})
    let deaths = topSelectedValues.map(item => {if(item.deaths){
        return {"value": item.deaths.toString()}
    }})
    let recovered = topSelectedValues.map(item => {if(item.recovered){
        return {"value": item.recovered.toString()}
    }})
    let dataset =[
    {"seriesName": "Cases",
    "renderAs": "area",
    "data":cases},
    {"seriesName": "Recovered",
    "renderAs": "area",
    "data":recovered},
    {"seriesName": "Deaths",
    "renderAs": "area",
    "data":deaths},
     ]
     const categories = [{"category" : category}]

    const chartConfigs = {
        type: 'mscombi2d',
        width: `${width > 500 ? 500 : 350}`,
        height: `${width > 500 ? 250 : 350}`,
        dataFormat: 'json',
        dataSource: {
            "chart": {
              "caption": `Top ${numberOfCountry} Countries`,
              "subCaption": "Overall Analysis of Coronavirus",
              "xAxisname": "Country",
              "yAxisName": "Data Numers",
              "baseFontSize": "12",
              baseFontColor: '#FFFFFF',
              labelFontColor:`${'#FFFFFF'}`,
              yAxisNameFontColor: `${'#FFFFFF'}`,
              xAxisNameFontColor: `${'#FFFFFF'}`,
              valueFontColor:"#ffffff",
              subCaptionFontColor: `${'#FFFFFF'}`,
              captionFontColor: `${'#FFFFFF'}`,
              legendItemFontColor: `${'#FFFFFF'}`,
              bgColor: `#272B2F`,
              //"numberPrefix": "$",
              //"divlineColor": "#999999",
            //   "divLineIsDashed": "1",
            //   "divLineDashLen": "1",
            //   "divLineGapLen": "1",
            //   "toolTipColor": "#ffffff",
            //   "toolTipBorderThickness": "0",
            //   "toolTipBgColor": "#000000",
            //   "toolTipBgAlpha": "80",
            //   "toolTipBorderRadius": "2",
            //   "toolTipPadding": "5",
              "theme": "fusion"
            },
            "categories": categories,
            "dataset": dataset
          }
        }

     return (
     <ReactFC
        {...chartConfigs}/>
     );

}

export default HistoricalChart;