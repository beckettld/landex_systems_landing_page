"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";

const steps = [
  {
    number: "/01",
    title: "Identify",
    description:
      "We work with your operating team to select a portfolio company with clear operational pain — manual workflows, legacy systems, paper-based processes. We scope a defined project with measurable outcomes.",
  },
  {
    number: "/02",
    title: "Embed & Build",
    description:
      "A small team of engineers embeds directly with the portfolio company. We assess the operation, design the AI systems, and build working production infrastructure. No slide decks, no recommendations — working systems.",
  },
  {
    number: "/03",
    title: "Deploy & Measure",
    description:
      "Systems go live within six to eight weeks. We measure the impact — cost reduction, time saved, error rates eliminated — in terms that flow directly to EBITDA. You see results before the engagement ends.",
  },
  {
    number: "/04",
    title: "Expand Across the Portfolio",
    description:
      "Once proven, we roll the same capabilities across additional portfolio companies. Each subsequent deployment is faster and cheaper because the systems are already built. One engagement becomes a portfolio-wide advantage.",
  },
];

export default function Playbook() {
  return (
    <Box
      id="approach"
      sx={{
        py: { xs: 12, md: 18 },
        bgcolor: "#080C1E",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", mb: 3, display: "block" }}
          >
            How It Works
          </Typography>
        </AnimateIn>

        <AnimateIn delay={0.1} blur>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
              color: "text.primary",
              mb: 3,
              maxWidth: 700,
            }}
          >
            One portfolio company.
            <br />
            <Box component="span" sx={{ color: "text.secondary" }}>
              Then the entire fund.
            </Box>
          </Typography>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: { xs: 8, md: 12 },
              maxWidth: 560,
            }}
          >
            We start with a single company in your portfolio — typically one
            with obvious operational inefficiency. We deliver measurable results
            in weeks, then use that proof point to expand across the fund.
          </Typography>
        </AnimateIn>

        <StaggerContainer stagger={0.15} delay={0.1}>
          <Grid container spacing={0}>
            {steps.map((step, i) => (
              <Grid key={step.number} size={{ xs: 12, md: 6, lg: 3 }}>
                <motion.div variants={staggerItem} style={{ height: "100%" }}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      height: "100%",
                      borderLeft:
                        i === 0
                          ? "none"
                          : {
                              xs: "none",
                              lg: "1px solid rgba(232,236,244,0.06)",
                            },
                      borderTop: {
                        xs: i === 0
                          ? "none"
                          : "1px solid rgba(232,236,244,0.06)",
                        lg: "none",
                      },
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 2,
                        bgcolor:
                          i === 0 ? "primary.main" : "rgba(232,236,244,0.06)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.75rem",
                        color: i === 0 ? "primary.main" : "text.secondary",
                        letterSpacing: "0.05em",
                        mb: 3,
                        fontWeight: 500,
                      }}
                    >
                      {step.number}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "1.25rem", md: "1.375rem" },
                        color: "text.primary",
                        mb: 3,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.7 }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}
