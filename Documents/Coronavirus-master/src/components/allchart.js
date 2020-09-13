import React, { useState, Fragment } from "react";
import Chart1 from "./chart";
import Chart2 from "./chart2";
import styled from "styled-components";
import CountrySlider from "./slider";
import HistoricalChart from "./historicalChart";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import useDeviceWidth from "./getDeviceWidth";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    height={300}
    width={300}
    speed={1}
    backgroundColor={"#333"}
    foregroundColor={"#999"}
  >
    <rect x="0" y="0" rx="5" ry="5" width="300" height="500" />
  </ContentLoader>
);

const ChartWrapper = styled.div`
display:flex;
flex-direction:row;
justify-content: space-around;
margin-top:10px;
padding:10px;

.internaWrapper{
    display: flex;
    flex-direction: row;
    width: 100%;
    @media only screen and (max-width: 750px) {
        flex-direction: column;
    }
}


.Chart {
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    background-color:#222428;
    padding-left:5px;

}
.secondRowGraph{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: #222428;
    
}
.autoCompleteBox{
    background-color: #222428;
    padding-bottom: 10px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: ${props => (props.width > 500 ? "row" : "column")}
}

.autoComleteLabel{
    display: flex;
    padding-top: 25px;
    padding-left: 5px;
    font-size: 13px;
    }
    .selectBox{
    /* padding:${props => (props.width > 500 ? "15px" : "24px")}; */
    background-color: #222428;
    position: absolute;
    left: 0px;
    margin-top: -74px;
    margin-left: 39px;

    #combo-box-demo{
    width:230px;
    @media only screen and (max-width: 750px) {
    flex-direction: column;
    width:40vh;
    }
    }

    .MuiFormControl-root {
     height: 50px;
    background-color: #272c2f;
    border:1px solid #272c2f;
    }
    .MuiFormLabel-root {
        color: white;
    }
    .MuiAutocomplete-popupIndicator{
    color:white;
    }
    .MuiOutlinedInput-root {
    color:white;
    }
    @media only screen and (max-width: 750px) {
        position: relative;
        margin-top:2px;
        margin-left: 0px;
    }
    }

@media only screen and (max-width: 750px) {
    .Chart {
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:10px;
    }
}

`;

const AllChart = () => {
  const [value, setValue] = useState([]);
  const [graphCountry, setGraphCountry] = useState(5);
  const [numberOfCountry, setNumberOfCountry] = useState(5);
  const [history, setHistory] = useState([]);
  const [province, setProvince] = useState([]);
  const [country, setCountry] = useState([]);
  const [thirdGraphdata, setThridGraphData] = useState({
    fullDisplay: true,
    data: []
  });
  const [apiCheck, setApiCheck] = useState(true);
  const { width } = useDeviceWidth();
  //let isMobile = width < 500 ? true : false;

  const BigGraphLoader = () => (
    <ContentLoader
      height={width > 500 ? 400 : 300}
      width={width > 500 ? 900 : 400}
      speed={1}
      backgroundColor={"#333"}
      foregroundColor={"#999"}
    >
      <rect
        x="0"
        y="0"
        rx="5"
        ry="5"
        width={width > 500 ? "900" : "300"}
        height="420"
      />
    </ContentLoader>
  );

  React.useEffect(() => {
    const fetchData = async () => {
      let targetUrl = "https://disease.sh/v3/covid-19/countries";
      let response = await fetch(`${targetUrl}`);
      let responseData = await response.json();
      await setValue(responseData);
      await setApiCheck(false);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      let targetUrl = "https://disease.sh/v3/covid-19/historical";
      let response = await fetch(`${targetUrl}`);
      let responseData = await response.json();
      await setHistory(responseData);
      await setThridGraphData({ ...thirdGraphdata, data: responseData });
      await chooseCountryAndProvince(responseData);
    };
    fetchData();
  }, []);

  const handleSelectedCountry = async (e, value) => {
    let finalValue = history.filter(item => item.country === value);
    if (finalValue.length > 1) {
      await setProvince(finalValue);
    } else {
      await setProvince([]);
      await setThridGraphData({ fullDisplay: false, data: finalValue });
    }
  };

  const handleSelectedProvince = async (e, value) => {
    if (value) {
      let finalValue = history.filter(item => item.province === value.province);
      setThridGraphData({ fullDisplay: false, data: finalValue });
    }
  };

  const chooseCountryAndProvince = async data => {
    let countryList = [];
    for (let i = 0; i < data.length; i++) {
      countryList.push(data[i].country);
    }
    let unique = [...new Set(countryList)];
    await setCountry(unique);
  };

  return (
    <ChartWrapper width={width}>
      <div className="internaWrapper">
        <div className="secondRowGraph">
          <div style={{ width: "100%" }}>
            {window.innerWidth > 750 && (
              <div style={{ width: "100%" }}>
                {apiCheck === false ? (
                  <HistoricalChart
                    thirdGraphdata={thirdGraphdata}
                    value={value}
                    numberOfCountry={numberOfCountry}
                  />
                ) : width > 500 ? (
                  <BigGraphLoader />
                ) : (
                  <MyLoader />
                )}
              </div>
            )}
            <div className="autoCompleteBox">
              {/* {width > 500 && <div style={{backgroundColor: "white"}}><label className="autoComleteLabel"> {`Select Country ${province.length >1 ? "and Province" : ""}:`} </label></div>} */}
              {/* <div style={{width:"90%", backgroundColor:"272C2F"}}> */}
              {apiCheck ? (
                <MyLoader />
              ) : (
                <Fragment>
                  <div className="selectBox">
                    <Autocomplete
                      id="combo-box-demo"
                      options={country}
                      getOptionLabel={option => option}
                      onChange={handleSelectedCountry}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Country"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </Fragment>
              )}
              {/* {province.length > 1 &&
                                <div className="selectBox">
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={province}
                                        getOptionLabel={option => option.province}
                                        style={{ width: 300 }}
                                        onChange={handleSelectedProvince}
                                        renderInput={params => <TextField {...params} label="Province" variant="outlined" />}
                                    />

                                </div>} */}
            </div>
            {window.innerWidth < 750 && (
              <div style={{ width: "100%" }}>
                {apiCheck === false ? (
                  <HistoricalChart
                    thirdGraphdata={thirdGraphdata}
                    value={value}
                    numberOfCountry={numberOfCountry}
                  />
                ) : width > 500 ? (
                  <BigGraphLoader />
                ) : (
                  <MyLoader />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="Chart">
          <div style={{ width: "100%" }}>
            {apiCheck ? (
              <MyLoader />
            ) : (
              <Fragment>
                <Chart1
                  value={value}
                  graphCountry={graphCountry}
                  width={width}
                />
                <CountrySlider setGraphCountry={setGraphCountry} />
              </Fragment>
            )}
          </div>
          <div style={{ width: "100%" }}>
            {apiCheck ? (
              <MyLoader />
            ) : (
              <Fragment>
                <Chart2
                  value={value}
                  numberOfCountry={numberOfCountry}
                  width={width}
                />
                <CountrySlider setNumberOfCountry={setNumberOfCountry} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </ChartWrapper>
  );
};

export default AllChart;
