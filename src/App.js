import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import TitleBar from './components/appBar'
import DataCard from './components/dataCard'
import ChartData from './components/chart'
import VectorLayersExample from './components/map'
import countryListCordinates from './constants'
import CountryInfo from './components/countryInfo';

function App() {
  const [coronaData, setCoronaData] = useState({})
  const [countryWiseData, setCountryWiseData]= useState([])
  const [chooseView, setView] = useState('Individual Country Representation')
  let coordinatesArr = [];
  let deathTableData = [];
  const segregateCountriesCoordinates = value => {
    for(let i=0; i < value.length; i++){
      for(let j =0; j < countryListCordinates.length; j++ ){
        if(value[i].country ===  countryListCordinates[j]['name']){
          coordinatesArr.push({...value[i], coordinates:countryListCordinates[j]['latlng']})
        }
      }
    }
    }

  function tableData(value){
    let sortedlist = value.filter(item => item.cases > 0).sort((b, a) => a.deaths - b.deaths)
    return (
    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", color:"white", alignContent:"center"}}>
        <div style={{marginTop:"16px"}}>Cases</div>
        <div style={{marginTop:"16px"}}>Deaths</div>
        <div style={{marginTop:"16px"}}>Recovered</div>
      </div>
    <div style={{display:"flex", flexDirection:"row",overflow:"scroll"}}>
      {sortedlist.map(item => {
        return (
          <Fragment>
        <div style={{display:"flex", flexDirection:"column", padding:"10px"}}>
         <th style={{width:"70px", color:"white", marginTop:"10px", marginBottom:"10px", textAlign:"left"}}>{item.country}</th>
         <tr  style={{marginTop:"10px"}}>
         <td style={{color:"yellow", marginTop:"10px", marginBottom:"10px"}}>{item.cases}</td>
         </tr>
         <tr  style={{marginTop:"10px"}}>
         <td style={{color:"red", marginTop:"10px", marginBottom:"10px"}}>{item.deaths}</td>
         </tr>
         <tr style={{marginTop:"10px"}}>
         <td style={{color:"#00FF7F", marginTop:"10px", marginBottom:"10px"}}>{item.recovered}</td>
         </tr>
         </div>
         </Fragment>
        )
      })}
      </div>
      </div>)
  }

  const handleViewChange = (e) => {
    setView(e.target.value)
  }
  

  useEffect(() => {
    const fetchData = async() => {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    let targetUrl = 'https://corona.lmao.ninja/all'
    let response = await fetch(`${targetUrl}`)
    let responseData = await response.json()
    setCoronaData(responseData)
    }
    fetchData()
  },[])

  useEffect(() => {
    const fetchData = async() => {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    let targetUrl = 'https://corona.lmao.ninja/countries'
    let response = await fetch(`${targetUrl}`)
    let responseData = await response.json()
    setCountryWiseData(responseData)
    }
    fetchData()
  },[])
  if(countryWiseData){ 
    segregateCountriesCoordinates(countryWiseData)
    deathTableData = tableData(countryWiseData)
  }
  return (
    <div className="App">
     <TitleBar/>
     <DataCard coronaData = {coronaData}/>
     {/* <ChartData coronaData = {countryWiseData}/> */}
     <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%", margin:"10px", color:"white", backgroundColor:"#282a2f", padding:"10px"}}>
     <label>
     <input style={{marginRight:"10px"}} type="radio" value={"Map Reperesentation"} checked={ chooseView === "Map Reperesentation"} onChange={handleViewChange}/>
     Map Reperesentation
     </label>
     <label style={{marginLeft:"20px"}}>
     <input style={{marginRight:"10px"}} type="radio"value={"Individual Country Representation"} checked={chooseView === "Individual Country Representation"} onChange={handleViewChange}/>
     Individual Country Representation
     </label>
     </div>
     {
       chooseView === "Map Reperesentation" ? <VectorLayersExample coordinates= {coordinatesArr}/> : <CountryInfo countryWiseData={countryWiseData} />
     }
     <div style={{height:"290px"}}>
     <p style={{color:"white", textDecoration:"underline"}}>Coronavirus Summary Data</p>
     {deathTableData}
     </div>
    </div>
  );
}

export default App;
