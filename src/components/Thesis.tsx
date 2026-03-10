"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";
import CountUp from "./CountUp";

const stats = [
  { figure: "6%", label: "of PE firms currently use AI for operations" },
  { figure: "70%", label: "expect AI to materially impact returns over the next 3-5 years" },
  { figure: "Now", label: "The window is closing. First movers will have a portfolio-wide advantage." },
  { figure: "6–8 wk", label: "That's how long it takes to deploy a working system." },
];

export default function Thesis() {
  return (
    <Box
      id="problem"
      sx={{
        py: { xs: 12, md: 18 },
        bgcolor: "#06091A",
        position: "relative",
      }}
    >
      {/* Animated accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1,
          height: 80,
          background: "rgba(79,125,247,0.35)",
          transformOrigin: "top",
        }}
      />

      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", mb: 3, display: "block" }}
          >
            The Problem
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                  color: "text.primary",
                  mb: 5,
                }}
              >
                Multiples are tight.
                <br />
                <Box
                  component="span"
                  sx={{ fontStyle: "italic", color: "primary.main" }}
                >
                  AI is the gap.
                </Box>
              </Typography>
            </AnimateIn>

            <StaggerContainer stagger={0.15} delay={0.2}>
              <motion.div variants={staggerItem}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 4, maxWidth: 580 }}
                >
                  Purchase multiples have compressed. Financial engineering
                  won&apos;t move the needle anymore. What does: operational
                  improvements that hit the P&L. AI can automate a portfolio
                  company&apos;s manual workflows, consolidate legacy systems,
                  and eliminate costs that flow straight to EBITDA. But it has
                  to work.
                </Typography>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 4, maxWidth: 580 }}
                >
                  The problem is clear. Your typical consulting firm charges
                  $500K-$1M, stations 8 people on-site for 3-6 months, and
                  delivers a binder of recommendations. Your portfolio company
                  gets a strategy deck. What it actually needs is a system that
                  runs.
                </Typography>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", maxWidth: 580, fontWeight: 500 }}
                >
                  We&apos;re different. We build and deploy the AI. You get
                  infrastructure you can operate, not a consultant-written
                  playbook. Fixed scope, fixed price, 6-8 weeks in. Every dollar
                  of savings drops to EBITDA.
                </Typography>
              </motion.div>
            </StaggerContainer>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateIn delay={0.3} direction="right" blur scale>
              <Box
                sx={{
                  border: "1px solid rgba(232,236,244,0.06)",
                  p: { xs: 4, md: 5 },
                  bgcolor: "rgba(79,125,247,0.03)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.7rem",
                    color: "text.secondary",
                    mb: 4,
                    letterSpacing: "0.12em",
                  }}
                >
                  The State of PE & AI
                </Typography>

                <StaggerContainer stagger={0.1} delay={0.5}>
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label} variants={staggerItem}>
                      <Box sx={{ py: 2.5 }}>
                        <Typography
                          sx={{
                            fontFamily: '"Instrument Serif", serif',
                            fontSize: { xs: "2rem", md: "2.5rem" },
                            color: "text.primary",
                            lineHeight: 1,
                            mb: 0.75,
                          }}
                        >
                          <CountUp value={stat.figure} />
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                      {i < stats.length - 1 && <Divider />}
                    </motion.div>
                  ))}
                </StaggerContainer>
              </Box>
            </AnimateIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
