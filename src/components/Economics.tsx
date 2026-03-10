"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import StaggerContainer, {
  staggerItemLeft,
  staggerItemRight,
} from "./StaggerContainer";

const traditional = {
  label: "Traditional Consulting",
  items: [
    { metric: "Timeline", value: "3–6 months" },
    { metric: "Cost", value: "$500K–$1M" },
    { metric: "What you get", value: "Strategic recommendations you need to hire someone else to implement" },
    { metric: "Scaling", value: "Same timeline and cost structure for each engagement" },
  ],
};

const landex = {
  label: "Landex Systems",
  items: [
    { metric: "Timeline", value: "4–8 weeks" },
    { metric: "Cost", value: "Custom-scoped, fixed price upfront" },
    { metric: "What you get", value: "Operating infrastructure deployed and running in your company" },
    { metric: "Scaling", value: "Deploying the same system again: timeline cuts in half, costs decrease" },
  ],
};

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
              Actually delivered.
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
            Every operating partner has a war story. A consulting engagement
            that ran 3 months over timeline, doubled its budget, and produced a
            deck that nobody implemented. We built our model to be the opposite.
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
                          gap: 3,
                          py: 2.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", flex: "0 0 33%" }}
                        >
                          {item.metric}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontWeight: 500, flex: 1, textAlign: "right" }}
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
                  }}
                >

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
                          gap: 3,
                          py: 2.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", flex: "0 0 33%" }}
                        >
                          {item.metric}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary", fontWeight: 600, flex: 1, textAlign: "right" }}
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

        {/* Scaling advantage section */}
        <AnimateIn delay={0.2} blur>
          <Box sx={{ mb: { xs: 8, md: 12 }, maxWidth: 560 }}>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.7,
              }}
            >
              <Typography
                component="span"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Deploy once, scale efficiently.
              </Typography>
              {" "}When you deploy the same AI system to your next portfolio company, the timeline cuts in half and efficiency gains lower your cost. Different solutions are scoped individually.
            </Typography>
          </Box>
        </AnimateIn>

      </Container>
    </Box>
  );
}
