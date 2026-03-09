"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, {
  staggerItem,
  staggerItemLeft,
  staggerItemRight,
} from "./StaggerContainer";

const traditional = {
  label: "Traditional Consulting",
  items: [
    { metric: "Timeline", value: "3–6 months" },
    { metric: "Team on-site", value: "5–8 people" },
    { metric: "Your cost", value: "$500K–$1M" },
    { metric: "What you get", value: "Recommendations" },
  ],
};

const landex = {
  label: "Landex Systems",
  items: [
    { metric: "Timeline", value: "6–8 weeks" },
    { metric: "Team on-site", value: "2–3 engineers" },
    { metric: "Your cost", value: "$100K–$300K" },
    { metric: "What you get", value: "Working systems" },
  ],
};

const advantages = [
  {
    title: "Fixed Scope, Fixed Price",
    description:
      "Every engagement is scoped to a defined deliverable with a fixed fee before work begins. No ballooning invoices. No open-ended timelines. You know exactly what you are paying and exactly what you are getting.",
  },
  {
    title: "Systems, Not Slide Decks",
    description:
      "We deliver production AI infrastructure that runs inside the portfolio company — not a binder of recommendations that collects dust. When we leave, the systems keep working.",
  },
  {
    title: "Portfolio-Wide Deployment",
    description:
      "After the first engagement proves results, the same capabilities roll out across your portfolio at significantly reduced cost and timeline. What takes weeks for the first company takes days for the tenth.",
  },
];

export default function Economics() {
  return (
    <Box
      id="advantage"
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
            Why Us
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
            Faster. Cheaper.
            <br />
            <Box component="span" sx={{ color: "text.secondary" }}>
              And it actually works.
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
            Every PE operating partner has a story about a consulting project
            that ran over timeline, over budget, and delivered recommendations
            that nobody implemented. We built our entire model to be the
            opposite of that experience.
          </Typography>
        </AnimateIn>

        {/* Comparison cards slide in from opposite sides */}
        <StaggerContainer stagger={0.2} delay={0.1}>
          <Grid container spacing={2} sx={{ mb: { xs: 10, md: 16 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={staggerItemLeft} style={{ height: "100%" }}>
                <Box
                  sx={{
                    border: "1px solid rgba(232,236,244,0.06)",
                    p: { xs: 4, md: 5 },
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.01)",
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
                    {traditional.label}
                  </Typography>
                  {traditional.items.map((item, i) => (
                    <Box key={item.metric}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          py: 2.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {item.metric}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontWeight: 500 }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                      {i < traditional.items.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={staggerItemRight} style={{ height: "100%" }}>
                <Box
                  sx={{
                    border: "1px solid rgba(79,125,247,0.25)",
                    p: { xs: 4, md: 5 },
                    height: "100%",
                    bgcolor: "rgba(79,125,247,0.04)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(135deg, rgba(79,125,247,0.1) 0%, transparent 100%)",
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "0.7rem",
                      color: "primary.main",
                      mb: 4,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {landex.label}
                  </Typography>
                  {landex.items.map((item, i) => (
                    <Box key={item.metric}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          py: 2.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {item.metric}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary", fontWeight: 600 }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                      {i < landex.items.length - 1 && (
                        <Divider
                          sx={{ borderColor: "rgba(79,125,247,0.12)" }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </StaggerContainer>

        {/* Advantage cards stagger up */}
        <StaggerContainer stagger={0.12} delay={0.1}>
          <Grid container spacing={0}>
            {advantages.map((adv, i) => (
              <Grid key={adv.title} size={{ xs: 12, md: 4 }}>
                <motion.div variants={staggerItem} style={{ height: "100%" }}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      height: "100%",
                      borderTop: "2px solid",
                      borderColor:
                        i === 0 ? "primary.main" : "rgba(232,236,244,0.06)",
                      borderRight: {
                        xs: "none",
                        md:
                          i < 2
                            ? "1px solid rgba(232,236,244,0.06)"
                            : "none",
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "1.25rem",
                        color: "text.primary",
                        mb: 2,
                      }}
                    >
                      {adv.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.7 }}
                    >
                      {adv.description}
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
