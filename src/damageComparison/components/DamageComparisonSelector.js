import * as React from "react";
import Radio from "@mui/material/Radio";
import { Grid, Typography } from "@mui/material";
import DamageComparisonFilter from "./DamageComparisonFilter";

const DamageComparisonSelector = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
          />
          <Typography>Ranger</Typography>
          <Radio
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ "aria-label": "B" }}
          />
          <Typography>Rogue</Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <DamageComparisonFilter />
      </Grid>
    </Grid>
  );
};

export default DamageComparisonSelector;
