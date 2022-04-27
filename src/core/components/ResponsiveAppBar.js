import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useRecoilState } from "recoil";
import { searchOptionState } from "../../atoms";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [appBarTop, setAppBarTop] = useState("-300px");
  const [appBarPosition, setAppBarPosition] = useState("relative");

  useEffect(() => {
    setTimeout(() => {
      setAppBarTop("0px");
    }, 4000);
    setTimeout(() => {
      setAppBarPosition("sticky");
    }, 6000);
  }, []);

  return (
    <AppBar
      position={appBarPosition}
      sx={{ backgroundColor: "#810404", transition: "2s", top: appBarTop }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: {
                xs: "none",
                sm: "flex",
                flex: 1,
                justifyContent: "center",
              },
            }}
          >
            {`Anything D&D`}
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
            }}
          >
            {`Anything D&D`}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
