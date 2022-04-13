import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { prefStoreActions } from "../components/stores/prefStore";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";

function valuetext(value) {
  return `${value} yo`;
}

const tempBorder = {
  display: "flex",
  // border: "2px solid blue",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "space-between",
};

const tempBorderInterests = {
  display: "flex",
  // border: "2px solid yellow",
  alignContent: "center",

  justifyContent: "space-between",
};

const tempBorderNavigation = {
  display: "flex",
  // border: "2px solid red",
  justifyContent: "space-between",
};

const tempBorderHeader = {
  display: "flex",
  // border: "2px solid cyan",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const interestedSelection = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

function getStyles(name, interestedPref, theme) {
  return {
    fontWeight:
      interestedPref.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Filter() {
  // material themer
  const theme = useTheme();

  // redux
  const userUserId = useSelector((state) => state.user.userId);

  // redux store
  const dispatchStore = useDispatch();
  const genderPref = useSelector((state) => state.prefStore.genderPref);
  const agePref = useSelector((state) => state.prefStore.agePref);
  const interestedPref = useSelector((state) => state.prefStore.interestedPref);

  // // react states
  // const [genderPref, setGenderPref] = useState("");
  // const [agePref, setAgePref] = useState([24, 46]);
  // const [interestedPref, setinterestedPref] = useState([]);

  // handlers
  // gender handle
  const handleGenderChange = (event) => {
    console.log(event.target.value);
    dispatchStore(prefStoreActions.setGenderPref(event.target.value));
  };

  // age handle
  const handleAgeChange = (event) => {
    console.log(event.target.value);
    dispatchStore(prefStoreActions.setAgePref(event.target.value));
  };

  // interest handle
  const handleInterestedChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(event.target.value);

    dispatchStore(
      prefStoreActions.setinterestedPref(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  // save filters and then patch
  const saveFilters = async () => {
    console.log("SAVE buttton clicked");

    const sendFilter = {
      userPreference: {
        gender: genderPref,
        ageMin: agePref[0],
        ageMax: agePref[1],
        interested: interestedPref,
      },
    };
    console.log(sendFilter);

    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match/filters`;
    const settings = { withCredentials: true };

    const patchFilter = await axios
      .patch(url, sendFilter, settings)
      .catch((error) => {
        console.log(error);
      });
    console.log(patchFilter);
  };

  return (
    <>
      <Container>
        <Stack direction="row" style={tempBorderNavigation} sx={{ mt: 3 }}>
          <Button
            style={tempBorder}
            size="large"
            component={NavLink}
            to={`/${userUserId}/match`}
          >
            <ArrowBackIosIcon />
            Back
          </Button>
          <Button
            variant="contained"
            disableElevation
            style={tempBorder}
            size="large"
            onClick={saveFilters}
          >
            Save
          </Button>
        </Stack>

        <Stack direction="row" style={tempBorderHeader} sx={{ ml: -1.25 }}>
          <Typography variant="h4">Match me with...</Typography>
        </Stack>

        <Stack direction="row" style={tempBorder} sx={{ mb: -1 }}>
          <Typography variant="h6">Gender</Typography>
        </Stack>

        <Card
          elevation={0}
          sx={{ borderRadius: 3, mb: 0.5, p: 0.5, pl: 3, pr: 3 }}
        >
          <Stack direction="row" style={tempBorder}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleGenderChange}
                value={genderPref}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Card>

        <Stack direction="row" style={tempBorder} sx={{ mb: -1 }}>
          <Typography variant="h6">Age</Typography>
        </Stack>

        <Card elevation={0} sx={{ borderRadius: 3, mb: 1, p: 1, pl: 3, pr: 3 }}>
          <Stack direction="row" style={tempBorder}>
            <Box sx={{ width: "100%" }} style={tempBorder}>
              <Slider
                sx={{ mt: 4 }}
                getAriaLabel={() => "age range"}
                value={agePref}
                onChange={handleAgeChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                min={18}
                max={70}
                style={tempBorder}
              />
            </Box>
          </Stack>
        </Card>

        <Stack
          style={tempBorder}
          direction="row"
          sx={{ minWidth: 200, mb: -1 }}
        >
          <Typography variant="h6">Interested in...</Typography>
        </Stack>

        <Card elevation={0} sx={{ borderRadius: 3, mb: 1, p: 1, pl: 3, pr: 3 }}>
          <Stack style={tempBorderInterests}>
            <FormControl sx={{ m: 1, minWidth: 200, maxWidth: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Selected</InputLabel>

              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={interestedPref}
                onChange={handleInterestedChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {interestedSelection.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, interestedPref, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Card>
      </Container>
    </>
  );
}

// body to send into the user's userPreference
// body : {
//  userPreference:
//   [
//     male: true,
//     female: true,
//     ageMin: 18,
//     ageMax: 20,
//     interested: ["fire", "grass", "water", "electric"]
//   ]
// }
