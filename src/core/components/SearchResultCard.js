import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useRecoilValue } from "recoil";
import { searchResultState } from "../../atoms";

const SearchResultCard = () => {
  const searchResult = useRecoilValue(searchResultState);
  return (
    <div>
      {searchResult !== null && (
        <Card sx={{ minWidth: 275, margin: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              gutterBottom
            >
              {searchResult.name}
            </Typography>
            <Typography variant="body2" component="div">
              {searchResult.desc}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Casting Time: ${searchResult.casting_time}`}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchResultCard;
