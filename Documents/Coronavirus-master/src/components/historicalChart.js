import { Months } from '../constants'

import React from 'react'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";


const Chart2 = ({ thirdGraphdata }) => {

    let timeline, cases1, deaths1, recovered1, category1 = [];
    let country, province = '';

    if (thirdGraphdata.data.length > 0 && thirdGraphdata.fullDisplay === false) {
        country = thirdGraphdata.data[0].country;
        province = thirdGraphdata.data[0].province;
        timeline = thirdGraphdata.data[0].timeline;

        category1 = Object.keys(timeline['cases']).reverse().map(items => {
            let x = items[3] === '/' ? 3 : 4
            return { "label": `${Months[parseInt(items[0]) - 1][items[0]]} ${items.slice(2, x)}` }
        })
        cases1 = Object.entries(timeline['cases']).map(item => {
            if (item[1]) {
                return { "value": item[1] }
            }
        }).reverse()
        deaths1 = Object.entries(timeline['deaths']).map(item => {
            if (item[1]) {
                return { "value": item[1] }
            }
        }).reverse()
        recovered1 = Object.entries(timeline['recovered']).map(item => {
            if (item[1]) {
                return { "value": item[1] }
            }
        }).reverse()


    } else if (thirdGraphdata.data.length > 0) {

        category1 = Object.keys(thirdGraphdata.data[0].timeline['cases']).reverse().map(items => {
            let x = items[3] === '/' ? 3 : 4
            return { "label": `${Months[parseInt(items[0]) - 1][items[0]]} ${items.slice(2, x)}` }
        })

        const dataManuplation = (value) => {
            let convertedValues = thirdGraphdata.data.map(item => {
                if (item.timeline[value]) {
                    return Object.values(item.timeline[value])
                }
            })
            return convertedValues.reduce((r, a) => a.map((b, i) => (parseInt(r[i]) || 0) + parseInt(b)), []).reverse()
        }

        cases1 = dataManuplation("cases").map(item => { return { "value": item } })
        deaths1 = dataManuplation("deaths").map(item => { return { "value": item } })
        recovered1 = dataManuplation("recovered").map(item => { return { "value": item } })
    }


    const categories = [{ "category": category1 }]
    const dataset = [{
        seriesname: "Cases",
        "data": cases1
    }, {
        seriesname: "recovered",
        "data": recovered1
    }, {
        seriesname: "deaths",
        "data": deaths1
    }]

    charts(FusionCharts);
    const dataSource = {
        chart: {
            caption: `${province ? `${country} - ${province}` : country ? country : "World"} Coronavirus Timeline`,
            subcaption: "Last 30 days ",
            plottooltext: "$dataValue",
            yaxisname: `Total Data Points`,
            labelFontColor:`${'#FFFFFF'}`,
            yAxisNameFontColor: `${'#FFFFFF'}`,
            xAxisNameFontColor: `${'#FFFFFF'}`,
            valueFontColor:"#ffffff",
            subCaptionFontColor: `${'#FFFFFF'}`,
            captionFontColor: `${'#FFFFFF'}`,
            legendItemFontColor: `${'#FFFFFF'}`,
            baseFontColor: '#FFFFFF',
            bgColor: `#272B2F`,
            xaxisname: `${country || "World"}`,
            theme: "fusion",
            showValues:1
        },
        categories,
        dataset
    }

    return (
        <ReactFusioncharts
            type="scrollcolumn2d"
            width="95%"
            height="100%"
            dataFormat="JSON"
            dataSource={dataSource}
        />
    );

}

export default Chart2;