import React, { Fragment } from 'react'

const TableData = ({ value }) => {
    let sortedlist = value && value.filter(item => item.cases > 0).sort((b, a) => a.deaths - b.deaths)
    return (
        <div style={{ marginLeft: "40px", marginRight: "40px" }}>
            <p style={{ color: "white", textDecoration: "underline", fontSize: "17px" }}>Coronavirus Summary Data Points</p>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#282a2f", borderStyle: "inset" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", color: "white", alignContent: "center", marginLeft: "7px", marginRight: "9px", fontSize: "20px" }}>
                    <div style={{ marginTop: "16px" }}>Cases</div>
                    <div style={{ marginTop: "16px" }}>Deaths</div>
                    <div style={{ marginTop: "16px" }}>Recovered</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}>
                    {sortedlist && sortedlist.map((item, index) => {
                        return (
                            <Fragment key={index} >
                                <table style={{ display: "flex", flexDirection: "column", paddinTop: "10px", fontSize: "15px", backgroundColor: "darkred" }}>
                                    <th style={{ width: "110px", color: "white", marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>{item.country}</th>
                                    <tr align="center" style={{ marginTop: "10px", border: "1px solid black" }}>
                                        <td style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>{item.cases}</td>
                                    </tr>
                                    <tr align="center" style={{ marginTop: "10px", border: "1px solid black" }}>
                                        <td style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>{item.deaths}</td>
                                    </tr>
                                    <tr align="center" style={{ marginTop: "10px", border: "1px solid black" }}>
                                        <td style={{ color: "white", marginTop: "10px" }}>{item.recovered}</td>
                                    </tr>
                                </table>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </div>)
}

export default TableData