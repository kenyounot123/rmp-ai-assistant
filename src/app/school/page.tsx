"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  TextField,
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function School() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false)

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!userInput) {
      return
    }
  
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: userInput }), // Convert object to JSON string
      });
      
      const result = await response.json(); // Parse the response JSON
      
      if (response.ok) {
        // Send data to temporary storage
        await fetch('/api/store-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        });
        router.push('/school/result');
      } else {
        console.error('Error:', result.error); // Handle error response
      }
    } catch (error) {
      console.error('Error fetching scrape data:', error);
    } finally {
      setLoading(false)
    }

  };

  return (
    <>
      <Container sx={{ py: { xs: 5, lg: 10 } }}>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: "bold",
                color: "#4A4A4A",
              }}
              variant="h1"
            >
              Enter rate my professor link
            </Typography>
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              value={userInput}
              onChange={handleUserInput}
            />
            <Box>
              <Button
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress/> : "Submit"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
