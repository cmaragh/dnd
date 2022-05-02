import * as React from "react";
import Radio from "@mui/material/Radio";
import { Grid, Typography } from "@mui/material";
import DamageComparisonFilter from "./DamageComparisonFilter";

const DamageComparisonSelector = () => {
  const [selectedClass, setSelectedClass] = React.useState("");

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
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
            checked={selectedClass === "Ranger"}
            onChange={handleChange}
            value="Ranger"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
          />
          <Typography>Ranger</Typography>
          <Radio
            checked={selectedClass === "Rogue"}
            onChange={handleChange}
            value="Rogue"
            name="radio-buttons"
            inputProps={{ "aria-label": "B" }}
          />
          <Typography>Rogue</Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <DamageComparisonFilter selectedClass={selectedClass} />
      </Grid>
    </Grid>
  );
};

export default DamageComparisonSelector;
