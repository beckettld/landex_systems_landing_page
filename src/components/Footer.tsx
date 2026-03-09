"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AnimateIn from "./AnimateIn";

export default function Footer() {
  return (
    <>
      <Box
        id="contact"
        sx={{
          py: { xs: 14, md: 20 },
          bgcolor: "#06091A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            height: "60vh",
            background:
              "radial-gradient(ellipse at center, rgba(79,125,247,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: 700, mx: "auto" }}>
            <AnimateIn blur>
              <Typography
                variant="overline"
                sx={{ color: "primary.main", mb: 4, display: "block" }}
              >
                Get Started
              </Typography>
            </AnimateIn>

            <AnimateIn delay={0.15} blur scale>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.25rem", md: "3.25rem", lg: "4rem" },
                  color: "text.primary",
                  mb: 4,
                }}
              >
                Let&rsquo;s discuss your
                <br />
                portfolio
              </Typography>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 6, maxWidth: 520, mx: "auto" }}
              >
                We start with a single portfolio company and deliver measurable
                results in weeks. If the model works, we expand across the fund.
                The first conversation is the only investment required.
              </Typography>
            </AnimateIn>

            <AnimateIn delay={0.45} direction="none" scale>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() =>
                    window.Calendly?.initPopupWidget({
                      url: "https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo",
                    })
                  }
                  sx={{ px: 5, py: 1.75, fontSize: "0.9375rem", cursor: "pointer" }}
                >
                  Discuss Portfolio Modernization
                </Button>
              </Stack>
            </AnimateIn>
          </Box>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: "#040714",
          borderTop: "1px solid rgba(232,236,244,0.06)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    bgcolor: "primary.main",
                    transform: "rotate(45deg)",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "text.primary",
                  }}
                >
                  Landex Systems
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", maxWidth: 280 }}
              >
                AI-native consulting and software for private equity value
                creation.
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  mb: 2,
                  fontSize: "0.65rem",
                }}
              >
                Navigate
              </Typography>
              {[
                { label: "The Problem", href: "#problem" },
                { label: "How It Works", href: "#approach" },
                { label: "What We Build", href: "#capabilities" },
                { label: "Why Us", href: "#advantage" },
              ].map((item) => (
                  <Typography
                    key={item.label}
                    component="a"
                    href={item.href}
                    sx={{
                      color: "text.secondary",
                      display: "block",
                      fontSize: "0.8125rem",
                      mb: 1.5,
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": { color: "text.primary" },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  mb: 2,
                  fontSize: "0.65rem",
                }}
              >
                Contact
              </Typography>
              <Typography
                component="a"
                href="mailto:allen@landexsystems.com"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  fontSize: "0.8125rem",
                  mb: 1.5,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "text.primary" },
                }}
              >
                allen@landexsystems.com
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.Calendly?.initPopupWidget({
                    url: "https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo",
                  });
                }}
                sx={{
                  color: "text.secondary",
                  display: "block",
                  fontSize: "0.8125rem",
                  mb: 1.5,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  cursor: "pointer",
                  "&:hover": { color: "text.primary" },
                }}
              >
                Schedule a Call
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "rgba(232,236,244,0.25)", fontSize: "0.75rem" }}
            >
              &copy; {new Date().getFullYear()} Landex Systems. All rights
              reserved. Confidential.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
