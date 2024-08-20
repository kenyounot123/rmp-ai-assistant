"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "next/link";
import { Typography } from "@mui/material";

function ResponsiveAppBar() {
  return (
    <AppBar
      id="home"
      sx={{ maxWidth: "xl", boxShadow: "none", mx: "auto" }}
      position="static"
      color="secondary"
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
              ProfInsight
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
