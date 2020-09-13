import React, {useState} from 'react';
import styled from "styled-components"
import ProvinceModal from './provincesModal';

const CountryBox = styled.div`
width: 200px;
height: 190px;
margin: 2px;
border-radius: 10px;
cursor:pointer;
box-shadow: 0 3px 14px rgba(0,0,0,0.7);
background-color:${props => props.cases > 3000 ? "rgba(255, 0, 0, 0.5)" : props.cases > 50 ? "rgba(255, 255, 0, 0.5)" : "#228B22	"};
`
const Wrapper = styled.div`
display:flex;
flex-direction:column;
width:100%;
`
const Search = styled.div`
color:white;
margin:10px;

input{
width:50%;
margin-left:10px;
height:30px;
}
input::placeholder{
font-size:17px;
font-weight:bold;
text-align:center;
}

`

const InnerWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 550px;
  margin-bottom: 2px;
  overflow: scroll;
`;

const IndividualCountry = styled.div`
  margin-left: 10px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 13px;
  color: white;
  div{
    padding:2px;
  }
`;

const CountryInfo = ({ countryWiseData, countryProvinceData }) => {
  const [search, setSearch] = useState("");
  const [countryData, setCountryData] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleSearch = async e => {
    await setSearch(e.target.value);
  };
  const handleOpen = (country) => {
    let countrySegrgatedModalData = countryProvinceData.filter((item) => {
      if(item.country === country || (country.substring(0,country.length - 1) === item.country)){
        return item
      }
    })
    setCountryData(countrySegrgatedModalData)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let sortedlist = countryWiseData
    .filter(item => item.cases > 0)
    .sort((b, a) => a.cases - b.cases)
    .filter(
      item =>
        item["country"].slice(0, search.length).toLowerCase() ===
        search.toLowerCase()
    );
  return (
    <Wrapper>
      <Search>
        <input type="text" value={search} onChange={handleSearch}  placeholder="Search Country"/>
      </Search>
      <InnerWrapper>
        {sortedlist.map((item, index) => {
          return (
            <CountryBox cases={item.cases} key={index} onClick={() => handleOpen(item.country)}>
              <IndividualCountry>
                <div style={{ fontSize:"18px", textDecoration:"underline", fontWeight:"bold" }}>{item.country}</div>
                <div>Cases:- {item.cases}</div>
                <div>Deaths:- {item.deaths}</div>
                <div>Today:- {item.todayCases}</div>
                <div>TodayDeaths:- {item.todayDeaths}</div>
                <div>Critical:- {item.critical}</div>
                <div>Recovered:- {item.recovered}</div>
                <div>Cases/Million:- {item.casesPerOneMillion}</div>
              </IndividualCountry>
            </CountryBox>
          );
        })}
      </InnerWrapper>
      <ProvinceModal setOpen={setOpen} open={open} handleClose={handleClose} countryData={countryData}/>
    </Wrapper>
  );
};

export default CountryInfo