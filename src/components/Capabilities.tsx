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
      "Replace manual data entry, spreadsheet-based reporting, and repetitive back-office tasks with AI systems that run autonomously. The work that takes your team hours gets done in seconds.",
    span: { xs: 12, md: 6, lg: 4 },
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Customer Service & Sales",
    description:
      "AI voice and chat agents that handle inbound calls, route inquiries, answer questions from your knowledge base, and execute multi-step workflows — reducing headcount needs and response times.",
    span: { xs: 12, md: 6, lg: 4 },
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Document Processing",
    description:
      "Invoices, contracts, compliance forms, insurance documents — automatically classified, extracted, and structured. Eliminates paper-based bottlenecks in services, healthcare, and insurance companies.",
    span: { xs: 12, md: 6, lg: 4 },
  },
  {
    icon: InsightsOutlinedIcon,
    title: "Reporting & Analytics",
    description:
      "Automated financial and operational reporting that pulls from your existing systems. Real-time dashboards that give operating partners visibility without waiting for month-end.",
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    icon: StorefrontOutlinedIcon,
    title: "Sales & Marketing Modernization",
    description:
      "AI-powered prospecting, lead enrichment, CRM automation, and outbound infrastructure that replaces outdated sales processes with scalable, measurable systems.",
    span: { xs: 12, md: 6, lg: 3 },
  },
  {
    icon: IntegrationInstructionsOutlinedIcon,
    title: "Legacy System Integration",
    description:
      "Connect outdated ERP, CRM, and custom software through AI-powered data pipelines. Modernize without ripping and replacing.",
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
                Working systems
                <br />
                <Box component="span" sx={{ color: "text.secondary" }}>
                  that hit the P&L
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
                Every system we deploy targets a specific operational cost or
                bottleneck inside your portfolio company. We measure impact in
                dollars saved, hours eliminated, and errors removed — the
                metrics that flow to EBITDA.
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
