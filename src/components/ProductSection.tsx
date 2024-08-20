"use client";
import React from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Paper,
  Skeleton,
  Card,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Grid } from "@mui/material";
import Testimonials from "@/components/Testimonials";

export default function ProductSection() {
  const steps = [
    {
      step: "01",
      title: "Submit School Name",
      description:
        "Enter the name of the school you're interested in, and we'll handle the rest.",
    },
    {
      step: "02",
      title: "Automatic Data Collection",
      description:
        "We scrape Rate My Professor for all available professor data from the specified school.",
    },
    {
      step: "03",
      title: "Display Scraped Data",
      description:
        "We display some of the top professors based on ratings and reviews.",
    },
    {
      step: "04",
      title: "AI-Powered Recommendations",
      description:
        "Additional support agent to ask about  tailored professor suggestions and reviews based on your preferences and needs.",
    },
  ];

  function Steps({
    step,
    title,
    description,
  }: {
    step: string;
    title: string;
    description: string;
  }) {
    return (
      <Stack flexDirection={"row"} gap={2} px={2}>
        <Typography
          sx={{ fontSize: 36, color: "#61398F", fontWeight: "bold" }}
          variant="h2"
        >
          {step}
        </Typography>
        <Box>
          <Typography
            sx={{
              fontSize: 32,
              color: "primary.light",
              fontWeight: "bold",
            }}
            variant="h2"
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: 22, color: "#878787", fontWeight: "bold", mt: 1 }}
            variant="body2"
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Box
      id="product"
      component={"section"}
      sx={{ maxWidth: "xl", py: 4, mx: "auto", minHeight: "1000px" }}
    >
      <Box>
        <Stack justifyContent={"space-between"} flexDirection={"row"}>
          <Typography sx={{ fontSize: 44, fontWeight: "bold" }} variant="h1">
            Simple to Use and Powerful
          </Typography>
          <Link href={"/school"}>
            <Button
              variant="outlined"
              sx={{ fontWeight: "bold", fontSize: 16, py: 1, px: 2 }}
            >
              Get Started
            </Button>
          </Link>
        </Stack>
        <Typography
          sx={{ fontSize: 20, my: 2, color: "#4A4A4A" }}
          variant="body2"
        >
          We ensure a quick start, easy to use, efficiency, and full
          transparency
        </Typography>
        <Box
          component="hr"
          sx={{ border: 0, borderTop: "1px solid", borderColor: "#D3D3D3" }}
        />
      </Box>

      <Grid container spacing={8} mt={2}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Steps
              step={step.step}
              title={step.title}
              description={step.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
