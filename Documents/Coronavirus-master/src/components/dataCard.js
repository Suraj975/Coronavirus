import React from 'react'
import '../App.css';
import styled from "styled-components"
import NumberFormat from 'react-number-format';

const MenuDataBox = styled.div`
display: flex;
flex-direction:row;
width:100%;
justify-content:space-evenly;
margin-top:10px;
.contentBox{
 background-color:#282a2f;
 display:flex;
 flex-direction:column;
 align-items:center;
 padding:5px;
 border-radius:2%;
}
.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}

.header{
display:flex;
flex-direction:row;
justify-content:space-evenly;
align-items:center;
}
.data {
color:#d2d2d2;
font-size:10px;
}

@media only screen and (max-width: 600px) {
flex-direction:column;
width:100%;
}
`


export default function DataCard(props) {
    let { cases, deaths, recovered } = props.coronaData
    return (
        <div>
            <MenuDataBox>
                <div className="contentBox">
                    <div className="header">
                        <div style={{display:"flex", flexDirection:"column", flex:2}}>
                        <div><NumberFormat value={cases} thousandSeparator={true} style={{ border:"none",backgroundColor:"#282a2f", textAlign:"center", color:"#ffffff", fontSize:"20px" }} /></div>
                        <div className="data">Total Cases</div>
                        </div>
                        <div style={{flex:1, padding:"5px"}}><span className="dot" style={{backgroundColor: "yellow"}}></span></div>
                    </div>
                </div>

                <div className="contentBox">
                <div className="header">
                        <div style={{display:"flex", flexDirection:"column", flex:2}}>
                        <div><NumberFormat value={deaths} thousandSeparator={true} style={{ border:"none",backgroundColor:"#282a2f", textAlign:"center", color:"#ffffff", fontSize:"20px" }} /></div>
                        <div className="data">Total Deaths</div>
                        </div>
                        <div style={{flex:1, padding:"5px"}}><span className="dot" style={{backgroundColor: "red"}}></span></div>
                    </div>
                </div>

                <div className="contentBox">
                <div className="header">
                        <div style={{display:"flex", flexDirection:"column", flex:2}}>
                        <div><NumberFormat value={recovered} thousandSeparator={true} style={{ border:"none",backgroundColor:"#282a2f", textAlign:"center", color:"#ffffff", fontSize:"20px" }} /></div>
                        <div className="data">Recovered</div>
                        </div>
                        <div style={{flex:1, padding:"5px"}}><span className="dot" style={{backgroundColor: "#00FF7F"}}></span></div>
                    </div>
                </div>

            </MenuDataBox>
        </div>
    )
}
