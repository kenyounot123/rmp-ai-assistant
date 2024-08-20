import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rate My Professor Assistant",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box sx={{ minHeight: "800px" }}>{children}</Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
