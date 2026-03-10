"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";

const projects = [
  {
    number: "01",
    category: "Computer Vision",
    title: "Oyster Larvae Counter",
    description:
      "Computer vision system that automatically counts and classifies oyster larvae from microscope imagery, replacing hours of manual counting per batch with a sub-second inference pipeline.",
  },
  {
    number: "02",
    category: "Optimization",
    title: "Salmon Feed Optimizer",
    description:
      "Optimization models that determine precise feeding schedules and quantities for salmon pens based on water temperature, dissolved oxygen, fish weight estimates, and feed conversion ratios. Cuts feed waste and maximizes growth rates.",
  },
  {
    number: "03",
    category: "AI Agent Pipeline",
    title: "Skip Tracing System",
    description:
      "Multi-tier AI agent pipeline that takes a name and last-known address and returns verified phone, email, employer, property holdings, and legal exposure in under 6 minutes. Three-tier architecture: run only what you need.",
  },
  {
    number: "04",
    category: "Mobile Application",
    title: "Accountability App",
    description:
      "Native mobile app using location tracking and automatic billing to hold users accountable. Offline-capable with background sync when connectivity is restored.",
  },
  {
    number: "05",
    category: "AI Voice Agent",
    title: "Restaurant Phone Ordering Agent",
    description:
      "AI voice agent that handles inbound restaurant calls end-to-end: takes orders, handles modifications, reads back totals, and pushes confirmed orders directly into the POS system. Zero hold times, no missed calls.",
  },
  {
    number: "06",
    category: "Search & Retrieval",
    title: "Survey Document Retrieval",
    description:
      "RAG-based retrieval tool that lets land surveyors query decades of historical survey records, plats, and easement documents in natural language. Surfaces the exact page and parcel in seconds instead of hours of manual search.",
  },
  {
    number: "07",
    category: "Sales Automation",
    title: "ICP Discovery & Enrichment Pipeline",
    description:
      "Automated pipeline that builds targeted prospect lists from an ideal customer profile, enriches each company with firmographic and contact data, scores leads by fit, and pushes qualified records directly into the CRM.",
  },
  {
    number: "08",
    category: "Document Automation",
    title: "Deed Auto-Drafter",
    description:
      "AI system that reads recorded deeds and automatically generates draft survey descriptions, legal boundary language, and metes-and-bounds descriptions. Cuts drafting time from hours to minutes per parcel.",
  },
  {
    number: "09",
    category: "Custom Software",
    title: "Oyster Farm Management Platform",
    description:
      "End-to-end operations platform built for a South Carolina oyster farm: managing cage inventory, harvest tracking, water quality logs, customer orders, and compliance reporting in one system.",
  },
];

export default function Portfolio() {
  return (
    <Box
      sx={{
        py: { xs: 12, md: 18 },
        bgcolor: "#06091A",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography
            component="a"
            href="/"
            sx={{
              display: "inline-block",
              color: "text.secondary",
              fontSize: "0.8125rem",
              textDecoration: "none",
              mb: 4,
              transition: "color 0.2s ease",
              "&:hover": { color: "primary.main" },
            }}
          >
            ← Back to Landex Systems
          </Typography>
        </AnimateIn>
        <AnimateIn blur>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", mb: 3, display: "block" }}
          >
            Work
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ mb: { xs: 8, md: 14 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                  color: "text.primary",
                  mb: 3,
                }}
              >
                Systems we&apos;ve
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  already built
                </Box>
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <AnimateIn delay={0.2} direction="right">
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Examples of systems we have built and can build for you. This is
                not an extensive list. Each was production infrastructure that
                replaced manual work and showed up on the P&amp;L.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <StaggerContainer stagger={0.07} delay={0.1}>
          <Grid container spacing={0}>
            {projects.map((project, i) => (
              <Grid key={project.number} size={{ xs: 12, sm: 6, lg: 4 }}>
                <motion.div variants={staggerItem} style={{ height: "100%" }}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "1px solid rgba(232,236,244,0.06)",
                      borderRight: {
                        xs: "none",
                        sm: i % 2 === 0 ? "1px solid rgba(232,236,244,0.06)" : "none",
                        lg: i % 3 < 2 ? "1px solid rgba(232,236,244,0.06)" : "none",
                      },
                      position: "relative",
                      overflow: "hidden",
                      transition: "background-color 0.25s ease",
                      "&:hover": {
                        bgcolor: "rgba(79,125,247,0.025)",
                        "& .project-number": {
                          color: "rgba(79,125,247,0.07)",
                        },
                        "& .project-title": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    {/* Ghost number */}
                    <Typography
                      className="project-number"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: 16,
                        fontFamily: '"Instrument Serif", serif',
                        fontSize: "5rem",
                        color: "rgba(232,236,244,0.03)",
                        lineHeight: 1,
                        userSelect: "none",
                        pointerEvents: "none",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {project.number}
                    </Typography>

                    <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "primary.main",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          lineHeight: 1,
                          display: "block",
                          mb: 2,
                        }}
                      >
                        {project.category}
                      </Typography>

                      {/* Title */}
                      <Typography
                        className="project-title"
                        variant="h4"
                        sx={{
                          fontSize: { xs: "1.125rem", md: "1.25rem" },
                          color: "text.primary",
                          mb: 2,
                          lineHeight: 1.3,
                          fontWeight: 600,
                          transition: "color 0.25s ease",
                        }}
                      >
                        {project.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.75,
                          fontSize: "0.875rem",
                        }}
                      >
                        {project.description}
                      </Typography>
                    </Box>
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
