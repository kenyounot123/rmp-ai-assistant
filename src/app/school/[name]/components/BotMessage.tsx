"use client";

import { Typography, Box, Avatar } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useState } from "react";
import { Message } from "@/types";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export function BotMessage({
  message,
}: {
  message: Message; // TODO: replace string with Message type
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "#61398F",
          }}
        >
          <SmartToyIcon />
        </Avatar>
        <Typography
          variant="caption"
          sx={{
            color: "#4A4A4A",
            fontWeight: "bold",
          }}
        >
          Assistant
        </Typography>
      </Box>
      <Box
        bgcolor={"#8B5FBF"}
        color="black"
        sx={{
          p: 2,
          borderRadius: "15px",
        }}
      >
        <Typography color={"primary.contrastText"}>{message.content}</Typography>
      </Box>
    </Box>
  );
}
