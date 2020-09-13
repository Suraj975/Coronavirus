import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Circle, Map, Popup, GeoJSON } from "react-leaflet";
import "../App.css";
import worldGeoJSON from "geojson-world-map";

const MapBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px;
  text-align: left;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  .legend {
    z-index: 9999;
    width: 135px;
    position: absolute;
    top: 10px;
    right:0px;
    margin-left: 10px;
    background-color: #272c2f;
    color: white;
    border-radius: 10px;
    padding: 5px;
    font-size: 15px;
  }

  .labels {
    display: flex;
    align-items: center;
    padding: 2px;
  }

  .square {
    background: red;
    width: 10px;
    height: 10px;
    margin-right:5px;
  }
`;

const center = [51.505, -0.09];

export default class VectorLayersExample extends Component {
  render(props) {
    let finalValue = [];
    let check = [];
    if (this.props.coordinates) {
      finalValue = this.props.coordinates.map((item, index) => {
        check.push([item.countryInfo["lat"], item.countryInfo["long"]]);
        return (
          <Fragment key={index}>
            <Circle
              center={[item.countryInfo["lat"], item.countryInfo["long"]]}
              fillColor="red"
              color={
                item.cases > 100000
                  ? "rgba(255, 0, 0, 0.6)"
                  : item.cases > 10000
                  ? "rgba(255, 255, 0, 0.6)"
                  : "rgb(0, 255, 127, 0.6)"
              }
              weight={item.cases > 100000 ? 40 : item.cases > 10000 ? 10 : 5}
              radius={50}
            >
              <Popup>
                <div style={{listStyleType: "none", backgroundColor:"#272c2f", color:"white" }}>
                  <div style={{display:'flex', alignItems:"center"}}>
                  <h2 style={{marginRight:'10px'}}>{item.country}</h2>
                  <img src={item.countryInfo.flag} height="15px" width="15px" alt="country"/>
                  </div>
                  <ul
                    style={{
                      textAlign: "left",
                      listStyleType: "none",
                      fontSize: "14px",
                      padding:"0px"
                    }}
                  >
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
        );
      });
    }
    return (
      <MapBox>
        {/* <div style={{ flex: 0.7, backgroundColor: "#282a30", marginTop: "10px" }}>
          <ul style={{ color: "white" }}>
            <li style={{ marginTop: "10px" }}>
              The Covin19 data has been taken from Worldometers (sources: WHO,
              CDC, NHC, BBC, CDC Press Release, The Local France etc).{" "}
            </li>
            <li style={{ marginTop: "20px" }}>
              Click on the data points to access country specific data
            </li>
          </ul>
        </div> */}
        <div style={{ flex: 3 }}>
          <Map center={center} zoom={2}>
            <GeoJSON
              data={worldGeoJSON}
              style={() => ({
                color: "#4a83ec",
                weight: 0.5,
                fillColor: "#272B2F",
                fillOpacity: 1
              })}
            />
            {finalValue}
            <div className="legend">
              <div style={{ textAlign: "center" }}>Cases</div>
              <div className="labels">
                <div
                  className="square"
                  style={{backgroundColor: "rgba(255, 0, 0, 0.6)"}}
                ></div>
                <div>100,000+</div>
              </div>
              <div className="labels">
                <div
                  className="square"
                  style={{backgroundColor: "rgba(255, 255, 0, 0.6)"}}
                ></div>
                <div>10,000 - 100,000</div>
              </div>
              <div className="labels">
                <div
                  className="square"
                  style={{backgroundColor: "rgb(0, 255, 127, 0.6)"}}
                ></div>
                <div>0 - 10,000</div>
              </div>
            </div>
          </Map>
        </div>
      </MapBox>
    );
  }
}
