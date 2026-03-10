"use client";

import { Box, Container, Typography, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";

const projects = [
  {
    number: "01",
    category: "Computer Vision",
    industry: "Aquaculture",
    title: "Oyster Larvae Counter",
    description:
      "Computer vision system that automatically counts and classifies oyster larvae from microscope imagery, replacing hours of manual counting per batch with a sub-second inference pipeline.",
    tags: ["CV", "PyTorch", "Image Classification"],
  },
  {
    number: "02",
    category: "Optimization",
    industry: "Aquaculture",
    title: "Salmon Feed Optimizer",
    description:
      "Optimization models that determine precise feeding schedules and quantities for salmon pens based on water temperature, dissolved oxygen, fish weight estimates, and feed conversion ratios. Cuts feed waste and maximizes growth rates.",
    tags: ["Optimization", "Predictive Modeling", "IoT"],
  },
  {
    number: "03",
    category: "AI Agent Pipeline",
    industry: "Commercial Collections",
    title: "Skip Tracing System",
    description:
      "Multi-tier AI agent pipeline that takes a name and last-known address and returns verified phone, email, employer, property holdings, and legal exposure in under 6 minutes. Three-tier architecture — run only what you need.",
    tags: ["AI Agents", "Data Aggregation", "REST API"],
  },
  {
    number: "04",
    category: "Mobile Application",
    industry: "Field Operations",
    title: "Field Data Collection App",
    description:
      "Native mobile application for field teams to capture, annotate, and sync structured data in low-connectivity environments. Offline-first architecture with automatic background sync when connectivity is restored.",
    tags: ["React Native", "Offline-First", "Sync Engine"],
  },
  {
    number: "05",
    category: "AI Voice Agent",
    industry: "Food & Beverage",
    title: "Restaurant Phone Ordering Agent",
    description:
      "AI voice agent that handles inbound restaurant calls end-to-end — takes orders, handles modifications, reads back totals, and pushes confirmed orders directly into the POS system. Zero hold times, no missed calls.",
    tags: ["Voice AI", "POS Integration", "NLU"],
  },
  {
    number: "06",
    category: "Search & Retrieval",
    industry: "Land Surveying",
    title: "Survey Document Retrieval",
    description:
      "RAG-based retrieval tool that lets land surveyors query decades of historical survey records, plats, and easement documents in natural language. Surfaces the exact page and parcel in seconds instead of hours of manual search.",
    tags: ["RAG", "Vector Search", "Document Intelligence"],
  },
  {
    number: "07",
    category: "Sales Automation",
    industry: "B2B",
    title: "ICP Discovery & Enrichment Pipeline",
    description:
      "Automated pipeline that builds targeted prospect lists from an ideal customer profile, enriches each company with firmographic and contact data, scores leads by fit, and pushes qualified records directly into the CRM.",
    tags: ["Sales Automation", "Data Enrichment", "CRM Integration"],
  },
  {
    number: "08",
    category: "Document Automation",
    industry: "Land Surveying",
    title: "Deed Auto-Drafter",
    description:
      "AI system that reads recorded deeds and automatically generates draft survey descriptions, legal boundary language, and metes-and-bounds descriptions. Cuts drafting time from hours to minutes per parcel.",
    tags: ["LLM", "Document Parsing", "Legal Drafting"],
  },
  {
    number: "09",
    category: "Custom Software",
    industry: "Aquaculture",
    title: "Oyster Farm Management Platform",
    description:
      "End-to-end operations platform built for a South Carolina oyster farm — managing cage inventory, harvest tracking, water quality logs, customer orders, and compliance reporting in one system.",
    tags: ["Full Stack", "Operations Platform", "IoT"],
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
            ← Back to Landex
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
                Past engagements — systems we built, deployed, and handed off.
                Not current clients; these are examples of the kind of work we
                do. Each was production infrastructure that replaced manual work
                and showed up on the P&amp;L.
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
                      {/* Category + industry row */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 3,
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{
                            color: "primary.main",
                            fontSize: "0.6875rem",
                            letterSpacing: "0.1em",
                            lineHeight: 1,
                          }}
                        >
                          {project.category}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.6875rem",
                            color: "rgba(232,236,244,0.3)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {project.industry}
                        </Typography>
                      </Box>

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
                          mb: 4,
                        }}
                      >
                        {project.description}
                      </Typography>
                    </Box>

                    {/* Tags */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: "rgba(232,236,244,0.04)",
                            color: "rgba(232,236,244,0.35)",
                            fontSize: "0.6875rem",
                            height: 22,
                            borderRadius: 0,
                            fontWeight: 500,
                            letterSpacing: "0.03em",
                            border: "1px solid rgba(232,236,244,0.06)",
                          }}
                        />
                      ))}
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
