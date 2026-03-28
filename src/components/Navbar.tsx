"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? "rgba(6,9,26,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(232,236,244,0.06)"
          : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: "space-between" }}
        >
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "primary.main",
                transform: "rotate(45deg)",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "text.primary",
              }}
            >
              Landex Systems
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Button
              variant="outlined"
              size="small"
              href="https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: "rgba(232,236,244,0.15)",
                color: "text.primary",
                px: 3,
                py: 1,
                fontSize: "0.8125rem",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(79,125,247,0.06)",
                },
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
