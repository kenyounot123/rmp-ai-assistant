"use client";
import React from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function School() {
  return (
    <>
      <Container sx={{ py: { xs: 5, lg: 10 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} sx={{ height: "80vh" }}>
            <Stack
              sx={{
                backgroundColor: "#D6C6E1",
                borderRadius: "10px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#D6C6E1",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <Typography variant="h6">School</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ height: "80vh" }}>
            <Stack sx={{ height: "100%" }}>
              <Stack
                direction={"column"}
                p={0}
                spacing={3}
                sx={{
                  backgroundColor: "#FFFFFF",
                  flexGrow: 1,
                  overflowY: "auto",
                  borderRadius: "10px",
                }}
              ></Stack>

              <Box
                component={"form"}
                sx={{
                  display: "flex",
                  gap: 1,
                  pt: 3,
                }}
              >
                <TextField
                  fullWidth
                  minRows={1}
                  autoComplete="off"
                  variant="outlined"
                  label="Ask anything..."
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    // "&:focus": {
                    //   backgroundColor: "black",
                    //   color: "white",
                    // },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: "10px",
                  }}
                >
                    <SendRoundedIcon />
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
