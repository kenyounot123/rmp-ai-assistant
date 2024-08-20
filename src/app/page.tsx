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
import ProductSection from "@/components/ProductSection";

const LandingPage = () => {
  return (
    <>
      <Container sx={{ py: { xs: 5, lg: 10 } }}>
        <Stack sx={{ minHeight: "1000px" }} spacing={5} alignItems={"center"}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 44,
              fontWeight: "bold",
              maxWidth: { lg: "50%" },
            }}
            variant="h1"
          >
            Your Personal Professor Insight Agent
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              textAlign: "center",
              maxWidth: { lg: "40%" },
              color: "#4A4A4A",
            }}
            variant="h4"
          >
            <Box component={"span"} color={"accent.accent5"}>
              Rate my professor but better. Get real-time data, trends, and
              recommendations on professors to optimize your educational.{" "}
            </Box>
          </Typography>
          <Link href={"/school"}>
            <Button
              sx={{ fontWeight: "bold", fontSize: 16, py: 1, px: 2 }}
              variant="contained"
            >
              Discover Now
            </Button>
          </Link>
          <Skeleton
            variant="rounded"
            sx={{ width: "100%", height: "400px", borderRadius: 10 }}
          />
        </Stack>
        <ProductSection />
        <Testimonials />
      </Container>
    </>
  );
};

export default LandingPage;
