import React, { useEffect, useState, Fragment } from 'react';
import DataCard from './dataCard'
import VectorLayersExample from './map'
import countryListCordinates from '../constants'
import CountryInfo from './countryInfo';
import ChooseView from './chooseView';
import TableData from './tableData';

function MainScreen() {
  const [coronaData, setCoronaData] = useState({})
  const [countryWiseData, setCountryWiseData] = useState([])
  const [chooseView, setView] = useState('Individual Country Representation')
  const [apiCheck, setApiCheck] = useState(true)
  const handleViewChange = (e) => {
    setView(e.target.value)
  }


  let coordinatesArr = [];
  const segregateCountriesCoordinates = value => {
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < countryListCordinates.length; j++) {
        if (value[i].country === countryListCordinates[j]['name']) {
          coordinatesArr.push({ ...value[i], coordinates: countryListCordinates[j]['latlng'] })
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let targetUrl = 'https://corona.lmao.ninja/all'
      let response = await fetch(`${targetUrl}`)
      let responseData = await response.json()
      await setCoronaData(responseData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let targetUrl = 'https://corona.lmao.ninja/countries'
      let response = await fetch(`${targetUrl}`)
      let responseData = await response.json()
      await setCountryWiseData(responseData)
      setApiCheck(false)
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let targetUrl = 'https://corona.lmao.ninja/countries'
  //     let response = await fetch(`${targetUrl}`)
  //     let responseData = await response.json()
  //     setCountryWiseData(responseData)
  //   }
  //   fetchData()
  // }, [])


  if (countryWiseData) {
    segregateCountriesCoordinates(countryWiseData)
  }
  return (
    <div className="App">
      <DataCard coronaData={coronaData} />

      <ChooseView chooseView={chooseView} handleViewChange={handleViewChange} />
      {
        chooseView === "Map Reperesentation" ? <VectorLayersExample coordinates={coordinatesArr} /> : <CountryInfo countryWiseData={countryWiseData} />
      }
      <TableData value={countryWiseData} />
    </div>
  );
}

export default MainScreen;