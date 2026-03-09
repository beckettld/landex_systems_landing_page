"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";
import CountUp from "./CountUp";

const stats = [
  { figure: "6%", label: "of PE firms see high AI impact today" },
  { figure: "70%", label: "expect high impact within 3–5 years" },
  { figure: "$1T", label: "in uninvested PE capital seeking returns" },
  { figure: "6–8 wk", label: "to deploy working AI systems" },
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
                Your portfolio companies
                <br />
                need AI.{" "}
                <Box
                  component="span"
                  sx={{ fontStyle: "italic", color: "primary.main" }}
                >
                  Who builds it?
                </Box>
              </Typography>
            </AnimateIn>

            <StaggerContainer stagger={0.15} delay={0.2}>
              <motion.div variants={staggerItem}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 4, maxWidth: 580 }}
                >
                  Purchase multiples are at historic highs. Financial engineering
                  alone cannot generate the returns your LPs expect. The
                  operational improvement that moves the needle is AI — automating
                  manual workflows, modernizing legacy systems, cutting costs that
                  flow directly to EBITDA.
                </Typography>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 4, maxWidth: 580 }}
                >
                  But the traditional consulting firms charge half a million
                  dollars, staff eight people for three months, and deliver a
                  binder of recommendations. Your portfolio company gets a
                  strategy deck. What it needed was a working system.
                </Typography>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", maxWidth: 580, fontWeight: 500 }}
                >
                  We are a different kind of firm. We build and deploy the AI
                  systems — not recommend them. Fixed scope. Weeks, not quarters.
                  And every dollar of cost reduction flows straight to EBITDA.
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
                  The AI Gap in PE
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
