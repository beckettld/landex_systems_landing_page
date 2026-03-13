"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import StaggerContainer, { staggerItem, staggerItemLeft, staggerItemRight } from "@/components/StaggerContainer";
import Navbar from "@/components/Navbar";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const dataPoints = [
  { category: "Identity", items: ["Full legal name", "Aliases", "Date of birth", "Age", "Deceased status"] },
  { category: "Contact", items: ["Phone numbers (type, carrier, verified)", "Current address", "Previous addresses", "Email addresses"] },
  { category: "Employment", items: ["Employment info", "LinkedIn URL"] },
  { category: "Household", items: ["Spouse or partner", "Relatives", "Co-habitants"] },
  { category: "Assets", items: ["Property ownership", "Homeowner or renter", "Vehicles"] },
  { category: "Legal", items: ["Bankruptcy", "Civil judgments & liens", "Court cases", "UCC filings", "Professional licenses"] },
  { category: "Social", items: ["Facebook URL", "LinkedIn URL", "Social media profiles"] },
  { category: "Other", items: ["Voter registration address", "Estimated income range", "SSN last four", "Data quality score (0–100)"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function EntityFinderHero() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (vantaEffect) return;
    let cancelled = false;

    async function init() {
      const THREE = await import("three");
      const VANTA = await import("vanta/dist/vanta.fog.min");
      if (cancelled || !vantaRef.current) return;
      const effect = VANTA.default({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x1e00ff,
        midtoneColor: 0x40b8de,
        lowlightColor: 0x3de87,
        baseColor: 0x06091a,
        blurFactor: 0.43,
        speed: 0.2,
        zoom: 1.2,
      });
      if (!cancelled) setVantaEffect(effect);
    }

    init();
    return () => { cancelled = true; };
  }, [vantaEffect]);

  useEffect(() => {
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, [vantaEffect]);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "#06091A",
      }}
    >
      <Box ref={vantaRef} sx={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(6,9,26,0.3) 0%, rgba(6,9,26,0.15) 50%, rgba(6,9,26,0.6) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ maxWidth: 900, pt: { xs: 12, md: 0 } }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="overline"
              sx={{ color: "primary.main", mb: 4, display: "block", letterSpacing: "0.15em" }}
            >
              Entity Finder API
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.75rem", lg: "5.25rem" },
                color: "text.primary",
                mb: 4,
              }}
            >
              Find the people
              <br />
              you need.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", maxWidth: 580, mb: 6, fontSize: { xs: "1rem", md: "1.125rem" } }}
            >
              Describe who you want to reach, or tell us what your product
              does and we figure out who to find. Already have a list of names?
              We get their contact info. Either way, you walk away with verified
              phones, email, and whatever else you need to actually reach them.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                href="https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Learn More
              </Button>
              <Button
                variant="outlined"
                href="/entity-find/docs"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.primary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                View API Docs
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <Box sx={{ width: 1, height: 40, background: "rgba(79,125,247,0.25)", mx: "auto" }} />
        </motion.div>
      </motion.div>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            How it works
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1} blur>
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "text.primary", mb: 3 }}>
                Two ways in.
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  One output.
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 480 }}>
                You either need to find people, or you already have names and
                need their contact info. Either way, the result is the same:
                verified phones, email, employer, and current address for
                every person.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Path A */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1}>
              <Box
                component="a"
                href="https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  border: "1px solid rgba(232,236,244,0.08)",
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, background-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(232,236,244,0.2)",
                    bgcolor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 3, letterSpacing: "0.12em" }}>
                  Path A
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "1.5rem", color: "text.primary", mb: 2 }}>
                  I need to find people.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
                  Tell us who you want to reach — or tell us what your product
                  does and we figure out who to find. We build a list of people
                  and companies that match and get you their contact info.
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    "Describe your target or your product",
                    "We find the people and companies that fit",
                    "Verified phones, email, and address for each",
                  ].map((s) => (
                    <Box key={s} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 4, height: 4, bgcolor: "rgba(79,125,247,0.4)", flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{s}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </AnimateIn>
          </Grid>

          {/* Path B */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.2}>
              <Box
                component="a"
                href="https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  border: "1px solid rgba(79,125,247,0.3)",
                  bgcolor: "rgba(79,125,247,0.03)",
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, background-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(79,125,247,0.55)",
                    bgcolor: "rgba(79,125,247,0.07)",
                  },
                }}
              >
                <Typography variant="overline" sx={{ color: "primary.main", display: "block", mb: 3, letterSpacing: "0.12em" }}>
                  Path B
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "1.5rem", color: "text.primary", mb: 2 }}>
                  I have names. I need contact info.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
                  Hand us a list of names or companies and we get the contact
                  info for every one — verified phones, email, current address,
                  employer, and more.
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    "Give us names, companies, or partial records",
                    "We find phones, email, address, and employer for each",
                    "Ready to use — no extra work on your end",
                  ].map((s) => (
                    <Box key={s} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 4, height: 4, bgcolor: "primary.main", flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{s}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </AnimateIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier Pipeline
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Data Points Grid
// ─────────────────────────────────────────────────────────────────────────────

function DataPointsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Fields we can find
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary" }}
              >
                What you can get back.
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Not every field comes back on every person — it depends on
                what&apos;s publicly available. This is the full set of fields
                we look for. Every field is nullable; we return what we find.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <StaggerContainer stagger={0.08} delay={0.1}>
          <Grid container spacing={0}>
            {dataPoints.map((group, i) => {
              const isActive = i === activeIndex;
              return (
                <Grid key={group.category} size={{ xs: 12, sm: 6, md: 4 }}>
                  <motion.div variants={staggerItem} style={{ height: "100%" }}>
                    <Box
                      onClick={() => setActiveIndex(i)}
                      sx={{
                        p: { xs: 4, md: 4.5 },
                        height: "100%",
                        borderTop: "2px solid",
                        borderTopColor: isActive ? "primary.main" : "rgba(232,236,244,0.06)",
                        borderRight: {
                          xs: "none",
                          sm: i % 2 === 0 ? "1px solid rgba(232,236,244,0.06)" : "none",
                          md: i % 3 < 2 ? "1px solid rgba(232,236,244,0.06)" : "none",
                        },
                        borderBottom: "1px solid rgba(232,236,244,0.06)",
                        bgcolor: isActive ? "rgba(79,125,247,0.03)" : "transparent",
                        cursor: "pointer",
                        transition: "background-color 0.25s ease, border-color 0.25s ease",
                        "&:hover": {
                          bgcolor: isActive ? "rgba(79,125,247,0.05)" : "rgba(255,255,255,0.02)",
                          borderTopColor: isActive ? "primary.main" : "rgba(232,236,244,0.18)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "0.7rem",
                          color: isActive ? "primary.main" : "text.secondary",
                          mb: 3,
                          letterSpacing: "0.12em",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {group.category}
                      </Typography>
                      {group.items.map((item) => (
                        <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.6 }}>
                          <Box
                            sx={{
                              width: 3,
                              height: 3,
                              bgcolor: isActive ? "primary.main" : "rgba(79,125,247,0.4)",
                              flexShrink: 0,
                              transition: "background-color 0.25s ease",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: isActive ? "text.primary" : "text.secondary",
                              fontSize: "0.875rem",
                              transition: "color 0.25s ease",
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// API Access
// ─────────────────────────────────────────────────────────────────────────────

function ApiAccess() {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="overline" sx={{ color: "primary.main", mb: 2, display: "block" }}>
                For developers
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "text.primary", mb: 3 }}>
                API access available.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 520 }}>
                If you want to integrate directly, the API is available. Submit
                a name, get back a structured JSON profile. Full endpoint
                reference, data models, and integration notes are in the docs.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  href="/entity-find/docs"
                  fullWidth
                  sx={{
                    py: 2,
                    borderColor: "rgba(79,125,247,0.35)",
                    color: "primary.main",
                    "&:hover": { borderColor: "primary.main", bgcolor: "rgba(79,125,247,0.05)" },
                  }}
                >
                  View API Docs →
                </Button>
                <Button
                  variant="outlined"
                  href="mailto:allen@landexsystems.com?subject=Entity Finder API Access"
                  fullWidth
                  sx={{
                    py: 2,
                    borderColor: "rgba(232,236,244,0.12)",
                    color: "text.secondary",
                    "&:hover": { borderColor: "rgba(232,236,244,0.25)", bgcolor: "rgba(255,255,255,0.02)" },
                  }}
                >
                  Request API Key
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </AnimateIn>
      </Container>
    </Box>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────

function EntityFinderCTA() {
  return (
    <Box
      sx={{
        py: { xs: 16, md: 24 },
        bgcolor: "#06091A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(79,125,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <AnimateIn blur>
          <Box sx={{ maxWidth: 720 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", mb: 4, display: "block" }}
            >
              Get Access
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.25rem", md: "3.5rem", lg: "4rem" },
                color: "text.primary",
                mb: 4,
              }}
            >
              Tell us who you need.{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                We find them.
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 6, maxWidth: 540 }}
            >
              Sales, recruiting, outreach, research — if you need to reach
              specific people, this is built for that. Describe who you want
              and we build the list, or hand us names and we get the contact
              info. Book a call to see it in action.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                href="https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Learn More
              </Button>
              <Button
                variant="outlined"
                href="/"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.secondary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                ← Back to Landex Systems
              </Button>
            </Stack>
          </Box>
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function EntityFinderPage() {
  return (
    <>
      <Navbar />
      <EntityFinderHero />
      <HowItWorks />
      <DataPointsGrid />
      <ApiAccess />
      <EntityFinderCTA />
    </>
  );
}
