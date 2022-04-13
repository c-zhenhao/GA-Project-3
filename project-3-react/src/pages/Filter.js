import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { Button } from "@mui/material";
import { minWidth } from "@mui/system";

function valuetext(value) {
  return `${value} yo`;
}

const tempBorder = {
  display: "flex",
  border: "2px solid red",
  alignContent: "center",
  alignItems: "center",
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

const interests = [
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Filter() {
  const [value, setValue] = React.useState([30, 55]);

  const handleAgeChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleInterestChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <h1>
        <s>this is filter page</s> Show me...
      </h1>
      <Container>
        <Stack>
          <Button style={tempBorder}>Save</Button>
        </Stack>

        <Stack direction="row" style={tempBorder}>
          <Typography variant="h6">Gender</Typography>

          <Stack direction="row" style={tempBorder}>
            <FormGroup sx={{ flexDirection: "row" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Male"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Female"
              />
            </FormGroup>
          </Stack>
        </Stack>

        <Stack direction="row" style={tempBorder}>
          <Typography variant="h6">Age</Typography>

          <Box sx={{ width: 400 }} style={tempBorder}>
            <Slider
              getAriaLabel={() => "age range"}
              value={value}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={18}
              max={69}
              style={tempBorder}
            />
          </Box>
        </Stack>

        <Stack style={tempBorder} direction="row">
          <Stack style={tempBorder}>
            <Typography variant="h6">Interests</Typography>
          </Stack>

          <Stack style={tempBorder}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-multiple-chip-label">Selected</InputLabel>

              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleInterestChange}
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
                {interests.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
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
