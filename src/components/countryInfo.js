import React, {useState} from 'react';
import styled from "styled-components"

const CountryBox = styled.div`
width: 130px;
height: 150px;
margin: 2px;
background-color:${props => props.cases > 1000 ? "rgba(255, 0, 0, 0.5)" : props.cases > 50 ? "rgba(255, 255, 0, 0.5)" : "#228B22	"};
`

const CountryInfo = ({ countryWiseData }) => {
    const [search, setSearch] = useState('')
    const handleSearch = async (e) => {
        await setSearch(e.target.value)
    }
    let sortedlist = countryWiseData.filter(item => item.cases > 0).sort((b, a) => a.cases - b.cases).filter(item => item['country'].slice(0, search.length).toLowerCase() === search.toLowerCase())
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ color: "white", margin: "10px" }}>Search Country<input style={{ width: "50%", marginLeft: "10px" }} type="text" value={search} onChange={handleSearch} /></div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start", width: "100%", height: "400px", marginBottom: "2px", flexWrap: "wrap", overflow: "scroll" }}>
                {sortedlist.map((item, index) => {
                    return (
                        <CountryBox cases={item.cases} key={index}>
                            <div style={{ marginLeft: "10px", marginTop: "5px", display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: "13px", color: "white" }}>
                                <div style={{ width: "100%" }}>{item.country}</div>
                                <div>Cases:- {item.cases}</div>
                                <div>Deaths:- {item.deaths}</div>
                                <div>Today:- {item.todayCases}</div>
                                <div>TodayDeaths:- {item.todayDeaths}</div>
                                <div>Critical:- {item.critical}</div>
                                <div>Recovered:- {item.recovered}</div>
                                <div>Cases/1 Million:- {item.casesPerOneMillion}</div>
                            </div>
                        </CountryBox>)
                })}
            </div>
        </div>
    )
}

export default CountryInfo