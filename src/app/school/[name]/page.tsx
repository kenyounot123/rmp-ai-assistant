'use client'
import React, {useState, useEffect} from "react";
import { Container, Typography, Stack, Grid, Box } from "@mui/material";
import ClientChatBot from "./components/ClientChatBot";



export default function Result() {
  const [scrapeData, setScrapeData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/store-data');
      const data = await response.json();
      setScrapeData(data);
    };

    fetchData();
  }, []);
  return (
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
              <pre>{JSON.stringify(scrapeData, null, 2)}</pre>
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
            {/* Chat bot will remain as client component */}
            <ClientChatBot />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}