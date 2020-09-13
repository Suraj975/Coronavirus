import React, { useState } from 'react'

const ChooseView = ({ chooseView, handleViewChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "10px", color: "white", backgroundColor: "#282a2f", padding: "10px", alignItems: "center", fontSize: "14px", fontWeight:"bold" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
                <input style={{ marginRight: "10px", height: "25px", width: "25px" }} type="radio" value={"Map"} checked={chooseView === "Map"} onChange={handleViewChange} />
                Map
        </label>
            <label style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <input style={{ marginRight: "10px", height: "25px", width: "25px" }} type="radio" value={"Country"} checked={chooseView === "Country"} onChange={handleViewChange} />
                Country
        </label>
        <label style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <input style={{ marginRight: "10px", height: "25px", width: "25px" }} type="radio" value={"Charts"} checked={chooseView === "Charts"} onChange={handleViewChange} />
                Charts
        </label>
        <label style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <input style={{ marginRight: "10px", height: "25px", width: "25px" }} type="radio" value={"Table"} checked={chooseView === "Table"} onChange={handleViewChange} />
                Table
        </label>
        </div>
    )
}

export default ChooseView