import React, { useState, cloneElement } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useRecoilValue, useRecoilState } from "recoil";
import { spellListState, searchStringState } from "../../atoms";
import { maxHeight } from "@mui/system";

function generate(element) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SearchList = () => {
  const [dense, setDense] = useState(false);

  const spellList = useRecoilValue(spellListState);
  const [searchString, setSearchString] = useRecoilState(searchStringState);

  const getFilteredList = (filterString) => {
    const filteredSpellList = spellList.map((spell) => {
      if (spell.name.toLowerCase().includes(filterString.toLowerCase())) {
        return (
          <ListItem
            sx={{ height: 35, marginBottom: 2 }}
            onClick={handleSetSearchString.bind(this, spell.name)}
          >
            <ListItemText
              sx={{ padding: 0 }}
              primary={spell.name}
              secondary={"spell"}
            />
          </ListItem>
        );
      }
    });
    return filteredSpellList;
  };

  const handleSetSearchString = (newString) => {
    setSearchString(newString);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, maxHeight: 200, overflow: "auto" }}>
      <Demo>
        {searchString.length > 1 && (
          <List dense={dense}>{getFilteredList(searchString)}</List>
        )}
      </Demo>
    </Box>
  );
};

export default SearchList;
