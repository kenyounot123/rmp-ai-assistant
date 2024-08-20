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

interface Testimonial {
  avatar?: string;
  name: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex P.",
    text: "ProfInsight completely transformed how I choose my professors.",
  },
  {
    name: "Alex P.",
    text: "ProfInsight completely transformed how I choose my professors.",
  },
  {
    name: "Alex P.",
    text: "ProfInsight completely transformed how I choose my professors.",
  },
  {
    name: "Alex P.",
    text: "I love ProfInsight!",
  },
  {
    name: "Alex P.",
    text: "ProfInsight completely transformed how I choose my professors.",
  },
  {
    name: "Jordan S.",
    text: "I love how easy it is to get detailed reviews and ratings.",
  },
];

function TestimonialColumn({
  reversed,
  testimonial1,
  testimonial2,
}: {
  reversed: boolean;
  testimonial1: Testimonial;
  testimonial2: Testimonial;
}) {
  return (
    <Stack
      spacing={3}
      direction={reversed ? "column-reverse" : "column"}
      sx={{ height: 400 }}
    >
      <Card
        sx={{
          backgroundColor: "primary.light",
          borderRadius: 6,
          p: 2,
          color: "primary.contrastText",
          flex: 2,
        }}
      >
        <Stack direction={"row"} gap={2}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt={testimonial1.name}
            src={testimonial1.avatar}
          />
          <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
            {testimonial1.name}
          </Typography>
        </Stack>
        <Typography sx={{ p: 2 }}>{testimonial1.text}</Typography>
      </Card>
      <Card
        sx={{
          backgroundColor: "primary.light",
          borderRadius: 6,
          p: 2,
          color: "primary.contrastText",
          flex: 1,
        }}
      >
        <Stack direction={"row"} gap={2}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt={testimonial2.name}
            src={testimonial2.avatar}
          />
          <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
            {testimonial2.name}
          </Typography>
        </Stack>
        <Typography sx={{ p: 2 }}>{testimonial2.text}</Typography>
      </Card>
    </Stack>
  );
}

export default function Testimonials() {
  return (
    <Stack
      id="pricing"
      component={"section"}
      sx={{ maxWidth: "xl", py: 4, mx: "auto" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography sx={{ fontSize: 44, fontWeight: "bold" }} variant="h1">
        What Our Users Say
      </Typography>
      <Typography
        sx={{ fontSize: 20, my: 2, color: "#4A4A4A", mb: 4 }}
        variant="body2"
      >
        Find out how our users are spreading the word
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <TestimonialColumn
            reversed={true}
            testimonial1={testimonials[0]}
            testimonial2={testimonials[1]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TestimonialColumn
            reversed={false}
            testimonial1={testimonials[2]}
            testimonial2={testimonials[3]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TestimonialColumn
            reversed={true}
            testimonial1={testimonials[4]}
            testimonial2={testimonials[5]}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
