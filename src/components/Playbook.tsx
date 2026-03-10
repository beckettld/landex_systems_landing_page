"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";

const steps = [
  {
    number: "/01",
    title: "Bring Ideas",
    description:
      "You have a portfolio company with a specific operational problem. We bring ideas on how AI can solve it. We scope the project, define what success looks like, and agree on timeline and cost upfront.",
  },
  {
    number: "/02",
    title: "Understand & Build",
    description:
      "We work with your team to understand the exact operational bottleneck. Then we build production infrastructure to fix it—not a strategy deck, not recommendations. The system goes live in weeks delivering measurable results from day one.",
  },
  {
    number: "/03",
    title: "Validate Results",
    description:
      "You see proof of concept. Measure the impact: headcount freed, costs cut, days of manual work eliminated. You have proof that this works in your fund.",
  },
  {
    number: "/04",
    title: "Scale & Expand",
    description:
      "Once validated, the second deployment takes 4-6 weeks and costs half as much. Each subsequent company is faster and cheaper. By your third or fourth company, the cost per deployment becomes negligible. We move as fast as you want to scale.",
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
            Pilot one company.
            <br />
            <Box component="span" sx={{ color: "text.secondary" }}>
              Multiply across your fund.
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
            Here's how we work together. You bring the portfolio company and the
            problem. We bring ideas on how AI fixes it. We scope one project, execute it,
            show you the results. Then we talk about expanding: either the same
            system across your portfolio, or new solutions. You control what comes next.
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
