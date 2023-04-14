import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import profile from "../assets/icons/profile.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import NavigateNext from "@mui/icons-material/NavigateNext";
import Save from "@mui/icons-material/Save";

const UserInfo = () => {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSelectedState = (e) => setSelectedState(e.target.value);

  const handleSelectedCity = (e) => setSelectedCity(e.target.value);

  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://locus.fkkas.com/api/states")
      .then((res) => res.json())
      .then((data) => {
        setStates(data.data);
      })
      .catch((error) => console.log(error));

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    if (selectedState) {
      fetch(`https://locus.fkkas.com/api/regions/${selectedState}`)
        .then((res) => res.json())
        .then((data) => {
          setCities(data.data);
        })
        .catch((error) => console.log(error));
    }

    return () => abortController.abort();
  }, [selectedState]);

  const stateMenuItems = states?.map((state) => (
    <MenuItem value={state.alias} key={state.id}>
      {state.name}
    </MenuItem>
  ));

  const stateCitiesItems = cities?.map((city) => (
    <MenuItem value={city.name} key={city.id}>
      {city.name}
    </MenuItem>
  ));

  return (
    <section className="bg-midWhite min-h-[100vh] px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="py-0.5">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => navigate(-1)}
          >
            undo
          </span>
        </div>

        <div className="w-full flex justify-center">
          <img src={profile} alt="Doctor" className="max-h-72" />
        </div>

        <h1 className="text-center font-semibold text-4xl my-4">
          Setting up your profile
        </h1>

        <div className="mx-auto max-w-lg">
          <div className="mt-8">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedState}
                label="State"
                onChange={handleSelectedState}
              >
                {stateMenuItems}
              </Select>
            </FormControl>
          </div>
          <div className="mt-8">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cities</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity}
                label="State"
                onChange={handleSelectedCity}
              >
                {stateCitiesItems}
              </Select>
            </FormControl>
          </div>
          <div className="mt-8">
            <TextField
              id="outlined-basic"
              type="text"
              label="Allergies"
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="mt-8">
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rows={4}
              className="w-full"
            />
          </div>
          <div className="mt-4 mb-8">
            <Button
              variant="contained"
              className="w-full !py-3"
              size="large"
              endIcon={<Save />}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserInfo;
