"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import StaggerContainer, { staggerItem } from "@/components/StaggerContainer";
import Navbar from "@/components/Navbar";

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

const proofItems = [
  { stat: "Live", label: "Web-sourced, not a static database" },
  { stat: "Verified", label: "Every contact confirmed active" },
  { stat: "Natural language", label: "No filters. Just describe who you want." },
];

function Hero({ onNicheClick }: { onNicheClick: (i: number) => void }) {
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
              Verified contact intelligence
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
              Find anyone.
              <br />
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                Just describe them.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 0,
                mb: 5,
              }}
            >
              {niches.map((n, i) => (
                <Box key={n.id} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="button"
                    onClick={() => {
                      onNicheClick(i);
                      document.getElementById("use-cases")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                      background: "none",
                      border: "none",
                      p: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      color: "rgba(232,236,244,0.45)",
                      transition: "color 0.2s ease",
                      "&:hover": { color: "rgba(232,236,244,0.9)" },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.6rem",
                        color: "rgba(79,125,247,0.6)",
                        lineHeight: 1,
                        mt: "1px",
                      }}
                    >
                      ›
                    </Box>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 400,
                        letterSpacing: "0.03em",
                        color: "inherit",
                      }}
                    >
                      {n.label}
                    </Typography>
                  </Box>
                  {i < niches.length - 1 && (
                    <Box
                      component="span"
                      sx={{
                        mx: 1.5,
                        color: "rgba(232,236,244,0.1)",
                        fontSize: "0.75rem",
                        userSelect: "none",
                      }}
                    >
                      /
                    </Box>
                  )}
                </Box>
              ))}
              <Box component="span" sx={{ mx: 1.5, color: "rgba(232,236,244,0.1)", fontSize: "0.75rem" }}>/</Box>
              <Typography component="span" sx={{ fontSize: "0.8rem", color: "rgba(232,236,244,0.2)", letterSpacing: "0.03em" }}>
                & more
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", maxWidth: 560, mb: 6, fontSize: { xs: "1rem", md: "1.125rem" } }}
            >
              No filter dropdowns. No stale databases. Describe who you need in
              plain English and we search the live web, enrich the result, and
              hand you a verified contact ready to reach out.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
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
                Book a demo
              </Button>
              <Button
                variant="outlined"
                href="#try"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.primary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                Tell us who you need, get contacts back
              </Button>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Box
              sx={{
                mt: 9,
                pt: 4,
                borderTop: "1px solid rgba(232,236,244,0.08)",
                display: "flex",
                gap: { xs: 5, md: 8 },
                flexWrap: "wrap",
              }}
            >
              {proofItems.map((item) => (
                <Box key={item.stat}>
                  <Typography
                    sx={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      color: "text.primary",
                      lineHeight: 1,
                      mb: 0.75,
                    }}
                  >
                    {item.stat}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Niche Switcher
// ─────────────────────────────────────────────────────────────────────────────

const niches = [
  {
    id: "wealth",
    label: "Wealth Managers",
    headline: "Find prospects the moment their situation changes.",
    subhead:
      "Liquidity events are time-sensitive. The advisor who calls first wins the relationship. We surface verified contact info on newly liquid individuals and log the triggering event so you know exactly why to reach out.",
    points: [
      "Identify business owners within days of a company sale or major real estate transaction",
      "Get a direct line on HNWI prospects before your competitors make the call",
      "Every contact delivered with the event that triggered the search: date, record type, and source",
    ],
    accent: "Event logging included. Know what happened, not just who they are.",
  },
  {
    id: "foreclosure",
    label: "Foreclosure",
    headline: "Reach distressed owners the day the filing hits.",
    subhead:
      "The window between a Notice of Default and a bank takeover is short. We surface verified contact info on homeowners within hours of a filing and attach the public record so every outreach has context.",
    points: [
      "Phone and email on homeowners the same day a NOD or lis pendens is recorded",
      "Find heirs and family members on probate and inherited properties",
      "Every contact stamped with the filing date, case number, and county record",
    ],
    accent: "Event logging included. Every contact comes with the record that triggered it.",
  },
  {
    id: "pi",
    label: "Private Investigators",
    headline: "Close cases faster with intelligence that is actually current.",
    subhead:
      "Stale databases slow you down. We search the live web for every query and return structured, verified data ready to drop straight into your report.",
    points: [
      "Current address, employer, and phone confirmed against live sources, not scraped once and left to rot",
      "Known associates, co-habitants, and family members surfaced automatically",
      "Structured output ready to load into your case management system",
    ],
    accent: null,
  },
  {
    id: "skip",
    label: "Skip Tracing",
    headline: "Find anyone who does not want to be found.",
    subhead:
      "Name and last known address in. Verified current contact out. We cross-reference live web sources, property records, voter registration, and professional licenses to track down people who have gone quiet.",
    points: [
      "Phone, email, and current address from live sources. Not a database scraped eighteen months ago.",
      "Employment history to pinpoint where they are working right now",
      "Full background on request: property ownership, civil judgments, and known associates",
    ],
    accent: null,
  },
  {
    id: "b2b",
    label: "B2B Sales",
    headline: "Stop filtering. Just describe who you want.",
    subhead:
      "Filter menus cannot express a niche. Plain English can. Tell us who your ideal customer is and we search the live web, build the list, verify every contact, and hand it to you.",
    points: [
      "No Apollo, no SIC codes, no filter menus. Just a description in plain English.",
      "Every contact verified active before it reaches your sequence tool",
      "Gets faster and cheaper over time as the system learns which sources work for your ICP",
    ],
    accent: null,
  },
];

function NicheSwitcher({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const niche = niches[active];

  return (
    <Box id="use-cases" sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Built for your workflow
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: { xs: 8, md: 10 }, maxWidth: 680 }}
          >
            Every industry has a different reason to find someone.
          </Typography>
        </AnimateIn>

        {/* Tab row */}
        <AnimateIn delay={0.1} blur>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mb: { xs: 6, md: 8 },
              borderBottom: "1px solid rgba(232,236,244,0.06)",
              pb: 0,
            }}
          >
            {niches.map((n, i) => (
              <Box
                key={n.id}
                onClick={() => setActive(i)}
                sx={{
                  px: { xs: 2.5, md: 3 },
                  py: 1.5,
                  cursor: "pointer",
                  borderBottom: active === i ? "2px solid" : "2px solid transparent",
                  borderColor: active === i ? "primary.main" : "transparent",
                  mb: "-1px",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    borderColor: active === i ? "primary.main" : "rgba(232,236,244,0.2)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: active === i ? 500 : 400,
                    color: active === i ? "text.primary" : "text.secondary",
                    transition: "color 0.18s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </AnimateIn>

        {/* Content panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, color: "text.primary", mb: 3, fontWeight: 400, lineHeight: 1.35 }}
              >
                {niche.headline}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: niche.accent ? 4 : 0 }}>
                {niche.subhead}
              </Typography>
              {niche.accent && (
                <Box
                  sx={{
                    mt: 4,
                    px: 3,
                    py: 2,
                    borderLeft: "2px solid",
                    borderColor: "primary.main",
                    bgcolor: "rgba(79,125,247,0.05)",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "primary.main", fontSize: "0.875rem", lineHeight: 1.7 }}>
                    {niche.accent}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                {niche.points.map((point, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      gap: 3,
                      alignItems: "flex-start",
                      p: { xs: 3, md: 4 },
                      borderTop: "1px solid rgba(232,236,244,0.06)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontSize: "1.125rem",
                        color: "rgba(79,125,247,0.5)",
                        lineHeight: 1,
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "0.9375rem" }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ICP Form
// ─────────────────────────────────────────────────────────────────────────────

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(255,255,255,0.03)",
    "& fieldset": { borderColor: "rgba(232,236,244,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(232,236,244,0.22)" },
    "&.Mui-focused fieldset": { borderColor: "primary.main" },
  },
  "& .MuiInputBase-input": {
    color: "text.primary",
    fontSize: "0.9375rem",
    "&::placeholder": { color: "text.secondary", opacity: 0.5 },
  },
  "& .MuiInputLabel-root": { color: "text.secondary", fontSize: "0.875rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
};

function ICPForm() {
  const [fields, setFields] = useState({
    name: "",
    company: "",
    industry: "",
    role: "",
    email: "",
    icp: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("https://formspree.io/f/mdapnojr", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: fields.name,
        company: fields.company,
        industry: fields.industry,
        role: fields.role,
        email: fields.email,
        icp: fields.icp,
      }),
    });
    setSubmitted(true);
  }

  return (
    <Box
      id="try"
      sx={{
        py: { xs: 12, md: 18 },
        bgcolor: "#080C1E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(ellipse, rgba(79,125,247,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Try it now
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 3 }}
          >
            Tell us who you need to find.
            <br />
            <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
              We will get you contacts.
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 6, maxWidth: 560 }}>
            Describe the person or the type of person you are looking for in
            plain English. We will run it through our system and email you
            verified contacts. No sign-up required.
          </Typography>

          {!submitted ? (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Your name"
                    required
                    fullWidth
                    value={fields.name}
                    onChange={set("name")}
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Company"
                    required
                    fullWidth
                    value={fields.company}
                    onChange={set("company")}
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Industry"
                    required
                    fullWidth
                    value={fields.industry}
                    onChange={set("industry")}
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Your role"
                    fullWidth
                    value={fields.role}
                    onChange={set("role")}
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    type="email"
                    label="Work email"
                    required
                    fullWidth
                    value={fields.email}
                    onChange={set("email")}
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    multiline
                    minRows={4}
                    label="Who are you looking for?"
                    required
                    fullWidth
                    value={fields.icp}
                    onChange={set("icp")}
                    placeholder="e.g. Homeowners in Maricopa County who filed a Notice of Default in the last 30 days with at least 20% equity... or CFOs at manufacturing companies in the Midwest with 50-200 employees..."
                    sx={{
                      ...fieldSx,
                      "& .MuiInputBase-input": {
                        ...fieldSx["& .MuiInputBase-input"],
                        lineHeight: 1.7,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2}>
                <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.5, fontSize: "0.8rem" }}>
                  We typically respond within a few hours. No spam, no pitch. Just verified contacts.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 5, py: 1.75, fontSize: "0.9375rem", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Get my contacts
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box
              sx={{
                border: "1px solid rgba(79,125,247,0.35)",
                bgcolor: "rgba(79,125,247,0.05)",
                p: 4,
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.8 }}>
                Got it. We are running your search now and will email you
                verified contacts shortly. If you want to talk through the
                results,{" "}
                <Box
                  component="a"
                  href="https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  book a demo here.
                </Box>
              </Typography>
            </Box>
          )}
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works
// ─────────────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Tell us who you need",
    body: "Describe your target in plain English. A type of person, a specific individual, a triggering event. Job title, geography, license type, filing date. Whatever defines who you are after. No filter menus.",
  },
  {
    num: "02",
    title: "We search the live web",
    body: "Our system routes your query across multiple live sources: web agents, APIs, scrapers, public records, directories. It automatically selects the fastest path to the right result.",
  },
  {
    num: "03",
    title: "You get verified contacts",
    body: "Every result is enriched and verified before it reaches you. Name, phone, email, address, and current details, all confirmed against live sources. Not pulled from a database and left to go stale.",
  },
];

function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            How it works
          </Typography>
        </AnimateIn>
        <AnimateIn delay={0.1} blur>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: { xs: 8, md: 12 }, maxWidth: 600 }}
          >
            From plain English to verified contact in seconds.
          </Typography>
        </AnimateIn>

        <StaggerContainer stagger={0.1} delay={0.1}>
          <Grid container spacing={0}>
            {steps.map((step, i) => (
              <Grid key={step.num} size={{ xs: 12, md: 4 }}>
                <motion.div variants={staggerItem} style={{ height: "100%" }}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      height: "100%",
                      borderTop: "2px solid rgba(79,125,247,0.25)",
                      borderRight: {
                        xs: "none",
                        md: i < 2 ? "1px solid rgba(232,236,244,0.06)" : "none",
                      },
                      borderBottom: { xs: "1px solid rgba(232,236,244,0.06)", md: "none" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontSize: "3.5rem",
                        color: "rgba(232,236,244,0.06)",
                        lineHeight: 1,
                        mb: 3,
                      }}
                    >
                      {step.num}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "text.primary", fontSize: "1.125rem", mb: 2, fontWeight: 400 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                      {step.body}
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

// ─────────────────────────────────────────────────────────────────────────────
// Why We're Different
// ─────────────────────────────────────────────────────────────────────────────

const diffCards = [
  {
    vs: "vs. static databases",
    title: "We search live. They query stale.",
    body: "Most tools are built on databases scraped months or years ago. We search the live web for every query. The contact you get reflects the world as it is right now, not as it was when someone last ran a crawler.",
    highlight: false,
  },
  {
    vs: "Our approach",
    title: "Plain English, not checkbox filters.",
    body: "Describing a distressed homeowner with equity above 20% in a specific county, or a PI target who relocated in the last six months, is impossible in a dropdown menu. It is one sentence for us.",
    highlight: true,
  },
  {
    vs: "Our approach",
    title: "Verified before it reaches you.",
    body: "We do not just find contacts. We confirm them. Every result is checked against live sources so you are not calling a disconnected number or mailing to an address someone moved out of two years ago.",
    highlight: true,
  },
  {
    vs: "vs. manual research",
    title: "Minutes, not days.",
    body: "Pulling together a phone, a current address, an employer, and a background check by hand takes hours or days. We return a structured, verified profile in minutes. Your time goes to the outreach, not the research.",
    highlight: false,
  },
  {
    vs: "vs. AI search tools",
    title: "A contact, not a web result.",
    body: "AI search returns links. We return people. There is a full enrichment, structuring, and verification layer between a raw web query and what lands in your hands, so you get something you can actually act on.",
    highlight: false,
  },
  {
    vs: "Our approach",
    title: "Gets cheaper the more you use it.",
    body: "Every query teaches our system which sources work best for which searches. Repeated lookups hit a verified cache. The more you use it, the faster and cheaper it gets, and that efficiency passes directly to you.",
    highlight: true,
  },
];

function WhyDifferent() {
  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Why we are different
          </Typography>
        </AnimateIn>
        <AnimateIn delay={0.1} blur>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: { xs: 8, md: 12 }, maxWidth: 680 }}
          >
            Every other tool hands you a filter. We hand you a contact.
          </Typography>
        </AnimateIn>

        <StaggerContainer stagger={0.07} delay={0.1}>
          <Grid container spacing={0}>
            {diffCards.map((card, i) => (
              <Grid key={card.title} size={{ xs: 12, sm: 6 }}>
                <motion.div variants={staggerItem} style={{ height: "100%" }}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      height: "100%",
                      bgcolor: card.highlight ? "rgba(79,125,247,0.05)" : "transparent",
                      borderTop: `2px solid ${card.highlight ? "rgba(79,125,247,0.4)" : "rgba(232,236,244,0.06)"}`,
                      borderRight: {
                        xs: "none",
                        sm: i % 2 === 0 ? "1px solid rgba(232,236,244,0.06)" : "none",
                      },
                      borderBottom: "1px solid rgba(232,236,244,0.06)",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: card.highlight ? "primary.main" : "text.secondary",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        display: "block",
                        mb: 2.5,
                      }}
                    >
                      {card.vs}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "text.primary", fontSize: "1.0625rem", mb: 2, fontWeight: 400 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                      {card.body}
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

// ─────────────────────────────────────────────────────────────────────────────
// Book Demo CTA
// ─────────────────────────────────────────────────────────────────────────────

function BookDemo() {
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
          <Box sx={{ maxWidth: 640 }}>
            <Typography variant="overline" sx={{ color: "primary.main", mb: 4, display: "block" }}>
              Talk to us
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "2.25rem", md: "3.5rem", lg: "4rem" }, color: "text.primary", mb: 4 }}
            >
              See it work on{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                your actual search.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 6, maxWidth: 500 }}>
              Book a 30-minute call and we will run your actual target through
              the system live. You will see results before the call ends. No
              slides, no demo environment.
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
                Book a demo
              </Button>
              <Button
                variant="outlined"
                href="#try"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.secondary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                Try it without a call
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

export default function Home() {
  const [activeNiche, setActiveNiche] = useState(0);

  return (
    <>
      <Navbar />
      <Hero onNicheClick={setActiveNiche} />
      <NicheSwitcher active={activeNiche} setActive={setActiveNiche} />
      <ICPForm />
      <HowItWorks />
      <WhyDifferent />
      <BookDemo />
    </>
  );
}
