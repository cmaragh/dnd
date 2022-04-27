import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchBar from "./components/SearchBar";
import SearchButton from "./components/SearchButton";

import { useRecoilValue, useRecoilState } from "recoil";
import { searchOptionState, spellListState } from "../atoms";
import SearchList from "./components/SearchList";

// import "./Transitions.css";

const SearchContainer = () => {
  const [isContainerShown, setIsContainerShown] = useState(false);

  const searchOption = useRecoilValue(searchOptionState);
  const [spellList, setSpellList] = useRecoilState(spellListState);

  useEffect(() => {
    setTimeout(() => {
      setIsContainerShown(true);
    }, 6000);
  }, []);

  const GET_SPELL_LIST_QUERY = `
  {
    spells(limit: 1000) {
      name
    }
  }
  `;
  useEffect(() => {
    getSpellList().then((res) => setSpellList(res));
  }, []);

  const getSpellList = async () => {
    let spellList;
    if (!localStorage.getItem("spellList")) {
      const spellListRes = await fetch("https://www.dnd5eapi.co/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GET_SPELL_LIST_QUERY }),
      });
      spellList = await spellListRes.json();
    } else {
      spellList = JSON.parse(localStorage.getItem("spellList"));
    }

    return spellList.data.spells;
  };

  return (
    <Grid
      container
      className="slit-in-vertical"
      sx={{
        flexGrow: 1,
        display: isContainerShown ? "flex" : "none",
        padding: "20px",
      }}
    >
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontFamily: `'Montserrat', sans-serif`, color: "white" }}
        >
          {searchOption === ""
            ? `Search Anything D&D`
            : `Search ${searchOption}`}
        </Typography>
      </Grid>
      <Grid container item xs={12} sm={5}>
        <Grid
          item
          xs={12}
          sx={{
            marginTop: { xs: ".5em", sm: "0px" },
            marginBottom: { xs: ".5em", sm: "0px" },
          }}
        >
          <SearchBar />
        </Grid>
        <Grid item xs={12}>
          <SearchList />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={1}>
        <SearchButton />
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        {/* <Grid item xs={12}>
          <Link to="/privacy">
            <MainPageButton title="Privacy" />
          </Link>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default SearchContainer;
