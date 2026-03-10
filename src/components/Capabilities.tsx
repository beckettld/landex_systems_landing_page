"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItem } from "./StaggerContainer";

const capabilities = [
  {
    icon: AutoFixHighOutlinedIcon,
    title: "Workflow Automation",
    description:
      "Replace data entry, spreadsheet management, and repetitive back-office work with AI systems that run 24/7.",
    example:
      "A staffing company automates candidate-to-role matching that previously took 6 hours of manual work per day.",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Customer Service & Sales",
    description:
      "AI voice and chat agents that handle inbound inquiries, route calls, pull from your knowledge base, and execute workflows.",
    example:
      "A home services company's AI agent qualifies inbound leads and books service appointments, cutting call center headcount by 40%.",
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Document Processing",
    description:
      "Invoices, contracts, tax forms, insurance claims—automatically extracted, classified, and routed.",
    example:
      "A healthcare billing company processes 1,000 claims per day that previously required a full team of manual data entry staff.",
  },
  {
    icon: TravelExploreOutlinedIcon,
    title: "Entity Discovery",
    description:
      "Find and segment specific customers, properties, or assets from abstract prompts. Build targeted lists that would otherwise take weeks of manual research.",
    example:
      "A pool servicing company instantly identifies every homeowner with a pool in a target county. A solar installer finds all homes that recently changed ownership.",
  },
  {
    icon: InsightsOutlinedIcon,
    title: "Reporting & Analytics",
    description:
      "Financial reporting and operational dashboards built automatically from your existing systems.",
    example:
      "An operating partner sees real-time cash flow, unit economics, and headcount utilization the day after month-end instead of waiting a week.",
  },
  {
    icon: StorefrontOutlinedIcon,
    title: "Sales & Marketing Automation",
    description:
      "AI-powered prospecting, lead scoring, CRM workflows, and outbound sequences that replace manual sales processes.",
    example:
      "A B2B services company qualifies and nurtures 500 inbound leads per month with zero sales headcount until they're ready to close.",
  },
  {
    icon: IntegrationInstructionsOutlinedIcon,
    title: "Legacy System Integration",
    description:
      "Connect fragmented ERP, CRM, and custom software through data pipelines so your systems share data in real time.",
    example:
      "A regional distributor syncs inventory across three legacy systems, eliminating the daily manual reconciliation that caused fulfillment errors.",
  },
];

export default function Capabilities() {
  return (
    <Box
      id="capabilities"
      sx={{
        py: { xs: 12, md: 18 },
        bgcolor: "#06091A",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", mb: 3, display: "block" }}
          >
            What We Build
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.75rem", lg: "3.25rem" },
                  color: "text.primary",
                  mb: 3,
                }}
              >
                AI that hits your P&L
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <AnimateIn delay={0.2} direction="right">
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Every system we deploy targets a specific cost center or
                operational bottleneck. We measure success in dollars saved and
                headcount freed—not in activity or consulting hours.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <StaggerContainer stagger={0.08} delay={0.1}>
          <Grid container spacing={0}>
            {capabilities.map((cap, i) => (
              <Grid key={cap.title} size={{ xs: 12, md: 6 }}>
                <motion.div variants={staggerItem}>
                  <Box
                    sx={{
                      py: { xs: 4, md: 5 },
                      px: { xs: 0, md: i % 2 === 0 ? "0" : "5" },
                      pl: { md: i % 2 === 1 ? 6 : 0 },
                      pr: { md: i % 2 === 0 ? 6 : 0 },
                      borderTop: "1px solid rgba(232,236,244,0.06)",
                      borderRight: {
                        xs: "none",
                        md: i % 2 === 0 ? "1px solid rgba(232,236,244,0.06)" : "none",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <cap.icon
                        sx={{ fontSize: 18, color: "primary.main", opacity: 0.85 }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ fontSize: "1rem", color: "text.primary", fontWeight: 600 }}
                      >
                        {cap.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2, fontWeight: 600 }}
                    >
                      {cap.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        color: "rgba(232,236,244,0.45)",
                        lineHeight: 1.6,
                      }}
                    >
                      Example: {cap.example}
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
