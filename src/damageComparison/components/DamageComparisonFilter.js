import React, { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

import { useRecoilState } from "recoil";
import { damageComparisonDataState } from "../../atoms";

import {
  rangerFilterDetails,
  rogueFilterDetails,
} from "../damageComparisonConstants";

import { Ranger } from "../classes/Ranger";
import { Rogue } from "../classes/Rogue";

const DamageComparisonFilter = ({ selectedClass }) => {
  const getClassFilterDetails = (selectedClass) => {
    switch (selectedClass) {
      case "Ranger":
        return rangerFilterDetails;
      case "Rogue":
        return rogueFilterDetails;
      default:
        return [];
    }
  };
  const [state, setState] = useState(getClassFilterDetails([]));
  const [characterNumber, setCharacterNumber] = useState(1);

  const [damageComparisonData, setDamageComparisonData] = useRecoilState(
    damageComparisonDataState
  );

  useEffect(() => {
    return () => {
      setDamageComparisonData((oldData) => []);
    };
  }, []);

  useEffect(() => {
    setState(getClassFilterDetails(selectedClass));
  }, [selectedClass]);

  const handleChange = (event) => {
    const updatedFilter = [...state];
    updatedFilter.forEach((feature, index) => {
      if (event.target.name === feature.toggle) {
        updatedFilter[index] = {
          ...updatedFilter[index],
          checked: event.target.checked,
        };
      }
    });
    setState(updatedFilter);
  };

  const _renderCheckboxes = () => {
    return state.map((feature) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={feature.checked}
              onChange={handleChange}
              name={feature.toggle}
            />
          }
          label={feature.label}
        />
      );
    });
  };

  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    color: "black",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#D8AE1E",
    borderColor: "black",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#D8AE1E",
      borderColor: "black",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#D8AE1E",
      borderColor: "black",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

  const addRangerDataToComparisonChart = () => {
    const newCharacterOptions = {};
    state.forEach((feature) => {
      newCharacterOptions[`${feature.toggle}`] = feature.checked;
    });
    let newCharacter;
    switch (selectedClass) {
      case "Ranger":
        newCharacter = new Ranger(16, 10, newCharacterOptions);
        break;
      case "Rogue":
        newCharacter = new Rogue(16, 10, newCharacterOptions);
        break;
      default:
        break;
    }
    const newCharacterData = {
      class: `#${characterNumber}: ${selectedClass}`,
      damage: newCharacter.getTotalDamage(),
      features: "",
    };
    state.forEach((feature) => {
      if (feature.checked) {
        newCharacterData.features += `${feature.label}\n`;
      }
    });
    setDamageComparisonData((oldData) => [...oldData, newCharacterData]);
    setCharacterNumber(characterNumber + 1);
  };

  const _renderCalculateButton = () => {
    return (
      <BootstrapButton
        onClick={addRangerDataToComparisonChart}
        disabled={false}
      >
        Add Character and Calculate
      </BootstrapButton>
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Class Features</FormLabel>
          <FormGroup
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
          >
            {_renderCheckboxes()}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {_renderCalculateButton()}
      </Grid>
    </Grid>
  );
};

export default DamageComparisonFilter;
