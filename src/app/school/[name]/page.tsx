"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Stack, Grid, Box, Card, CardContent } from "@mui/material";
import ClientChatBot from "./components/ClientChatBot";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BotMessage } from "./components/BotMessage";
import { UserMessage } from "./components/UserMessage";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Message } from "@/types";

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm the ProfInsight support assistant. How can I help you today?",
  },
];

export default function Result() {
  const [scrapeData, setScrapeData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/store-data');
      const data = await response.json();
      console.log(data)
      setScrapeData(data.data);
    };

    fetchData();
  }, []);
  const scrollToBottom = () => {
    setTimeout(() => {
      (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
        behavior: "smooth",
        block: 'nearest',
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
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await (
          reader as ReadableStreamDefaultReader<Uint8Array>
        ).read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            content: updatedMessages[lastMessageIndex].content + text,
          };
          return updatedMessages;
        });
      }

      // if (user && lastMessageRef.current?.role === "assistant") {
      //   await addMessageToHistory(user.uid, params.name, lastMessageRef.current);
      // }
    } catch (error) {
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
          liked: false,
        },
      ]);
      // if (user) {
      //   const lastMessage: Message = {
      //     role: "assistant",
      //     content:
      //       "I'm sorry, but I encountered an error. Please try again later.",
      //     liked: false,
      //   };  
      //   await addMessageToHistory(user.uid, params.name, lastMessage);
      // }
    } 
  };

  return (
    <Container sx={{ py: { xs: 5, lg: 10 } }}>
      <Grid container spacing={3}>
        {scrapeData && (
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
                        scrapeData.profRatingValue
                        ? (parseFloat(scrapeData.profRatingValue.substring(0, 3)) / 5) * 100
                        : 0
                      }
                      text={ 
                        scrapeData.profRatingValue
                        ? `${scrapeData.profRatingValue.substring(0, 3)} / 5`
                        : "N/A"}
                    />
                    <Typography align="center" sx={{ mt: 1 }}>
                      Number of Ratings: <Box sx={{color: 'primary.dark', fontWeight: 'bold', fontSize: 24}} component={'span'}>{scrapeData.numOfRatings}</Box>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, maxHeight:"30vh" }}>
                  <Stack spacing={2} sx={{ width: '100%', maxWidth: 600, height:"100%", overflowY: "auto", }}>
                    <OverlayScrollbarsComponent defer>
                      {scrapeData.profReviews.map((review:string, index:number) => (
                        <Card key={index} variant="outlined" sx={{ backgroundColor: '#f9f9f9' }}>
                          <CardContent>
                            <Typography variant="h6" component="div" gutterBottom>
                              Review {index + 1}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {review}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </OverlayScrollbarsComponent>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} md={4} sx={{height:"100vh"}}>
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
