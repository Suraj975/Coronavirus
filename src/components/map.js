import React, { Component, Fragment } from 'react'
import styled from "styled-components"
import {
    Circle,
    CircleMarker,
    Map,
    Popup,
    TileLayer,
} from 'react-leaflet'

const MapBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px;
    text-align: left;
@media only screen and (max-width: 600px) {
flex-direction:column;
}
`

const center = [51.505, -0.09]

export default class VectorLayersExample extends Component {
    render(props) {
        let finalValue = [];
        if (this.props.coordinates) {
            finalValue = this.props.coordinates.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <Circle center={[item.coordinates[0], item.coordinates[1]]} fillColor="red" color="red" weight={7} radius={20} >
                            <Popup><div style={{textAlign:"center", listStyleType:"none"}}>
                                <h1>{item.country}</h1>
                                <ul style={{textAlign:"left", listStyleType:"none", fontSize:"13px"}}>
                                    <li>Deaths:- {item.deaths}</li>
                                    <li>Cases:- {item.cases}</li>
                                    <li>Today:- {item.todayCases}</li>
                                    <li>Today-Deaths:- {item.todayDeaths}</li>
                                    <li>Critical:- {item.critical}</li>
                                    <li>Recovered:- {item.recovered}</li>
                                    </ul>
                                </div>
                           </Popup>
                        </Circle>
                    </Fragment>
                )
            })
        }
        return (
            <MapBox>
            <div style={{flex:1, backgroundColor:"#282a30", marginTop:"10px"}}>
            <ul style={{color:"white"}}>
                <li style={{marginTop:"10px"}}>The Covin19 data has been taken from Worldometers (sources: WHO, CDC, NHC, BBC, CDC Press Release, The Local France etc). </li>
                <li style={{marginTop:"20px"}}>Click on the data points to access country specific data</li>
            </ul>
            </div>
            <div style={{flex:3}}>
            <Map center={center} zoom={2}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {finalValue}
            </Map>
            </div>
            </MapBox>
        )
    }
}