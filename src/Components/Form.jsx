import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Content from "./Content";

export default function Form() {
  const [input, setInput] = useState("");
  const [dis, setDis] = useState(true);
  const [click, setClick] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const HandleClick = async () => {
    try {
      const data = await fetch(`https://restcountries.com/v3.1/name/${input}`);
      const result = await data.json();
      setCountryData(result[0]);
      setClick(true);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleChange = (e) =>{
    setInput(e.target.value);

    if(input.trim().length === 0 ) setDis(true);
    else setDis(false);
  }

  return (
    <>
      <Box
        className="form"
        sx={{
          margin: 3,
          padding: 3,
          width: 470,
          height: 100,
        }}
      >
        <TextField
          id="outlined-basic"
          label="CountryName"
          variant="outlined"
          onChange={(e) => { HandleChange(e) }}
        />

        <Button
          className="btn"
          variant="contained"
          disabled={dis}
          onClick={HandleClick}
        >
          Submit
        </Button>
      </Box>
      {click && <Content countryData={countryData} />}
    </>
  );
}
