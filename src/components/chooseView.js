import React, { useState } from 'react'




const ChooseView = ({ chooseView, handleViewChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "10px", color: "white", backgroundColor: "#282a2f", padding: "10px", alignItems: "center", fontSize: "14px" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
                <input style={{ marginRight: "10px", height: "25px", width: "25px" }} type="radio" value={"Map Reperesentation"} checked={chooseView === "Map Reperesentation"} onChange={handleViewChange} />
                Map Reperesentation
        </label>
            <label style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <input style={{ marginRight: "10px", height: "25px", width: "25px" }} type="radio" value={"Individual Country Representation"} checked={chooseView === "Individual Country Representation"} onChange={handleViewChange} />
                Individual Country Representation
        </label>
        </div>
    )
}

export default ChooseView