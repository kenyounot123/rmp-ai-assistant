"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Stack, Grid, Box } from "@mui/material";
import ClientChatBot from "./components/ClientChatBot";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BotMessage } from "./components/BotMessage";
import { UserMessage } from "./components/UserMessage";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Message } from "@/types";

const testData = {
  profName: "John Doe",
  profRatingValue: "4.5 / / 5",
  profDifficulty: "3.5",
  numOfRatings: "100",
  profDepartment: "Computer Science",
  profSchool: "University of California, Berkeley",
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm the Headstarter support assistant. How can I help you today?",
  },
];

export default function Result() {
  const [scrapeData, setScrapeData] = useState<any>(testData);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "", liked: false },
    ];

    const lastMessageIndex = newMessages.length - 1;
    setMessages(newMessages);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/store-data');
  //     const data = await response.json();
  //     setScrapeData(data);
  //   };

  //   fetchData();
  // }, []);
  return (
    <Container sx={{ py: { xs: 5, lg: 10 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack
            sx={{
              backgroundColor: "#D6C6E1",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <Stack
              sx={{
                backgroundColor: "#D6C6E1",
                borderRadius: "10px",
                p: 4,
              }}
            >
              <Typography variant="h3" fontWeight={"bold"}>
                {scrapeData.profName}
              </Typography>
              <Typography sx={{ color: "#878787", mb: 4 }}>
                {scrapeData.profDepartment},{scrapeData.profSchool}
              </Typography>

              <Grid container spacing={6} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    align="center"
                    mb={1}
                  >
                    Rating
                  </Typography>
                  <CircularProgressbar
                    value={
                      (parseFloat(scrapeData.profRatingValue.substring(0, 3)) /
                        5) *
                      100
                    }
                    text={`${scrapeData.profRatingValue.substring(0, 3)} / 5`}
                  />
                  <Typography align="center" sx={{ mt: 1 }}>
                    Number of Ratings: {scrapeData.numOfRatings}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    align="center"
                    mb={1}
                  >
                    Difficulty
                  </Typography>
                  <CircularProgressbar
                    value={(parseFloat(scrapeData.profDifficulty) / 5) * 100}
                    text={`${scrapeData.profDifficulty} / 5`}
                    styles={buildStyles({
                      textColor: "#61398F",
                      pathColor: "#61398F",
                    })}
                  />
                </Grid>
              </Grid>

              {/* <pre>{JSON.stringify(scrapeData, null, 2)}</pre> */}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} sx={{height:"75vh"}}>
          <Stack sx={{ height: "100%" }}>
            <Stack
              direction={"column"}
              p={0.5}
              spacing={3}
              sx={{
                backgroundColor: "#FFFFFF",
                flexGrow: 1,
                overflowY: "auto",
                borderRadius: "10px",
              }}
            >
              <OverlayScrollbarsComponent defer>
                <Stack
                  id="chat-box"
                  direction={"column"}
                  spacing={2}
                  flexGrow={1}
                  maxHeight="100%"
                  sx={{
                    p: 2,
                  }}
                >
                  {messages.map((message, index) => (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent={
                        message.role === "assistant" ? "flex-start" : "flex-end"
                      }
                    >
                      {message.role === "assistant" ? (
                        <BotMessage message={message} />
                      ) : (
                        <UserMessage message={message} />
                      )}
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Stack>
              </OverlayScrollbarsComponent>
            </Stack>
            <ClientChatBot submitHandler={sendMessage} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
