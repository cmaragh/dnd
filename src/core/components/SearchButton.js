import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import { useRecoilValue, useRecoilState } from "recoil";
import { searchStringState, searchResultState } from "../../atoms";

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

const SearchButton = () => {
  const searchString = useRecoilValue(searchStringState);
  const [searchResult, setSearchResult] = useRecoilState(searchResultState);

  const GET_SEARCH_RESULT_QUERY = `
  {
    spell (filter: {
      name: "${searchString}"
    }) {
      name
      desc
      casting_time
      concentration
    }
  }
  `;

  const getSpellDetails = async () => {
    const spellDetailsRes = await fetch("https://www.dnd5eapi.co/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_SEARCH_RESULT_QUERY }),
    });
    const spellDetails = await spellDetailsRes.json();
    setSearchResult(spellDetails.data.spell);
  };

  return (
    <BootstrapButton onClick={getSpellDetails} disabled={searchString === ""}>
      Search
    </BootstrapButton>
  );
};

export default SearchButton;
