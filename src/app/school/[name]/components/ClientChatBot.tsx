"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function ClientChatBot() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the chat bot submission logic
    console.log("Submitted:", inputValue);
    setInputValue("");
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
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
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "10px",
        }}
        type="submit"
      >
        <SendRoundedIcon />
      </Button>
    </Box>
  );
}