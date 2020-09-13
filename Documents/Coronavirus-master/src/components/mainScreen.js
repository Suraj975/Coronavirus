import React, { useEffect, useState, Fragment } from 'react';
import DataCard from './dataCard'
import VectorLayersExample from './map'
import countryListCordinates from '../constants'
import CountryInfo from './countryInfo';
import ChooseView from './chooseView';
import TableData from './tableData';
import AllChart from './allchart';


function MainScreen() {
  const [coronaData, setCoronaData] = useState({})
  const [countryWiseData, setCountryWiseData] = useState([])
  const [countryProvinceData, setCountryProvinceData] = useState([])
  const [chooseView, setView] = useState('Map')
  const [apiCheck, setApiCheck] = useState(true)
  const handleViewChange = (e) => {
    setView(e.target.value)
  }

  const chooseComponent = (type) => {
    switch(type){
      case 'Map': return <VectorLayersExample coordinates={countryWiseData} countryProvinceData={countryProvinceData}/>
      case 'Charts' : return <AllChart />
      case 'Country':return <CountryInfo countryWiseData={countryWiseData} countryProvinceData={countryProvinceData}/>
      case 'Table':return <TableData countryWiseData={countryWiseData} />
      default : break;
    }
  }


  // let coordinatesArr = [];
  // const segregateCountriesCoordinates = value => {
  //   for (let i = 0; i < value.length; i++) {
  //     for (let j = 0; j < countryListCordinates.length; j++) {
  //       if (value[i].country === countryListCordinates[j]['name']) {
  //         coordinatesArr.push({ ...value[i], coordinates: countryListCordinates[j]['latlng'] })
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      let targetUrl = 'https://disease.sh/v3/covid-19/all'
      let response = await fetch(`${targetUrl}`)
      let responseData = await response.json()
      await setCoronaData(responseData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let targetUrl = 'https://disease.sh/v3/covid-19/countries'
      let response = await fetch(`${targetUrl}`)
      let responseData = await response.json()
      await setCountryWiseData(responseData)
      setApiCheck(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let targetUrl = 'https://disease.sh/v3/covid-19/jhucsse'
      let response = await fetch(`${targetUrl}`)
      let responseData = await response.json()
      setCountryProvinceData(responseData)
    }
    fetchData()
  }, [])


  // if (countryWiseData) {
  //   segregateCountriesCoordinates(countryWiseData)
  // }
  console.log("countryWiseData", countryWiseData)
  return (
    <div className="App">
      <DataCard coronaData={coronaData} />
      <ChooseView chooseView={chooseView} handleViewChange={handleViewChange} />
      {chooseComponent(chooseView)}
    </div>
  );
}

export default MainScreen;