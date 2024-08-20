"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function School() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/school/${userInput}`);
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
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
