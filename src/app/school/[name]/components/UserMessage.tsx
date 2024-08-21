"use client";

import { Typography, Box, Avatar } from "@mui/material";
import { Message } from "@/types";

export function UserMessage({
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
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#4A4A4A",
            fontWeight: "bold",
          }}
        >
          You
        </Typography>
        <Avatar
          src={""}
        />
      </Box>
      <Box
        bgcolor={"#D6C6E1"}
        color="black"
        sx={{
          p: 2,
          borderRadius: "15px",
        }}
      >
        {message.content}
      </Box>
    </Box>
  );
}
