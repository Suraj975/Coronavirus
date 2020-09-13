import React from 'react';
import Slider from '@material-ui/core/Slider';


function valueLabelFormat(value) {
  return value
}

export default function CountrySlider({ setNumberOfCountry, setGraphCountry }) {
  const [value, setValue] = React.useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (setGraphCountry) {
      setGraphCountry(newValue);
    } else if (setNumberOfCountry) {
      setNumberOfCountry(newValue)
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: " column", alignItems: "center", width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Slider
          value={value}
          min={5}
          max={20}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          defaultValue={10}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </div>
      <div style={{ color: "white", width: "100%", marginBottom: "5px", fontSize: "11px", display:'flex', justifyContent:"space-between" }}>
        <div>
          0
        </div>
        <div>{'<---Range--->'}</div>
        <div>
          20
        </div>
      </div>
    </div>
  );
}
