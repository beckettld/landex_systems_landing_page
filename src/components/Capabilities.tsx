"use client";

import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import AnimateIn from "./AnimateIn";
import StaggerContainer, { staggerItemScale } from "./StaggerContainer";

const capabilities = [
  {
    icon: AutoFixHighOutlinedIcon,
    title: "Workflow Automation",
    description:
      "Replace data entry, spreadsheet management, and repetitive back-office work with AI systems that run 24/7. The tasks your team spends 40 hours a week on get executed in seconds.",
    span: { xs: 12, md: 6, lg: 4 },
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Customer Service & Sales",
    description:
      "AI voice and chat agents that handle inbound inquiries, route calls to the right person, pull from your knowledge base, and execute transaction workflows. Cuts support headcount by 30-50% without dropping service quality.",
    span: { xs: 12, md: 6, lg: 4 },
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Document Processing",
    description:
      "Invoices, contracts, tax forms, insurance claims. Automatically extracted, classified, and routed. Eliminates weeks of manual data entry and paper shuffling in finance, insurance, and services companies.",
    span: { xs: 12, md: 6, lg: 4 },
  },
  {
    icon: InsightsOutlinedIcon,
    title: "Reporting & Analytics",
    description:
      "Monthly financial reporting and operational dashboards built automatically from your existing systems. Operating partners see real-time visibility instead of waiting for month-end close.",
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    icon: StorefrontOutlinedIcon,
    title: "Sales & Marketing Automation",
    description:
      "AI-powered prospecting, lead scoring, CRM workflow automation, and outbound sequences. Replace outdated sales processes with systems that scale.",
    span: { xs: 12, md: 6, lg: 3 },
  },
  {
    icon: IntegrationInstructionsOutlinedIcon,
    title: "Legacy System Integration",
    description:
      "Connect fragmented ERP, CRM, and custom software through data pipelines. Your systems can finally talk to each other without a full rip-and-replace.",
    span: { xs: 12, md: 6, lg: 3 },
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

        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 6, md: 10 } }}>
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
                headcount freed. Not in activity or consulting hours.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <StaggerContainer stagger={0.1} delay={0.15}>
          <Grid container spacing={2}>
            {capabilities.map((cap) => (
              <Grid key={cap.title} size={cap.span}>
                <motion.div variants={staggerItemScale} style={{ height: "100%" }}>
                  <Card
                    sx={{
                      height: "100%",
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <CardContent sx={{ p: "0 !important" }}>
                      <cap.icon
                        sx={{
                          fontSize: 28,
                          color: "primary.main",
                          mb: 3,
                          opacity: 0.85,
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.0625rem",
                          color: "text.primary",
                          mb: 2,
                        }}
                      >
                        {cap.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.7 }}
                      >
                        {cap.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}
