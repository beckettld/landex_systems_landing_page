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
      "Work with your operating team to select the portfolio company with the biggest operational drag: manual data entry, paper-based workflows, fragmented legacy systems. We narrow the scope to one specific problem with a measurable outcome.",
  },
  {
    number: "/02",
    title: "Embed & Build",
    description:
      "A small team of engineers operates from inside the portfolio company. We map the workflow, design the AI system, and build production infrastructure. No consultants, no decks. Just working code that runs.",
  },
  {
    number: "/03",
    title: "Deploy & Measure",
    description:
      "Go live in 6-8 weeks. Measure the output: headcount freed up, cost per transaction cut in half, days of manual work eliminated. Show the impact in terms that matter to your LPs.",
  },
  {
    number: "/04",
    title: "Expand Across the Portfolio",
    description:
      "Once you have proof of concept, we deploy the same AI system to your next portfolio company. Timeline drops to 4-6 weeks. Each subsequent deployment is cheaper. What took 8 weeks for company one takes 3 weeks for company ten.",
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
            Start with one company.
            <br />
            <Box component="span" sx={{ color: "text.secondary" }}>
              Then scale the playbook.
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
            We identify the portfolio company with the clearest operational
            pain. Deploy a small team of engineers for 6-8 weeks. Build, launch,
            and measure. Once you see the results, we roll the same system across
            the rest of your portfolio faster and cheaper.
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
