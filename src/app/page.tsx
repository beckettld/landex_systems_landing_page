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

function Hero() {
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
              AI-powered lead intelligence
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", maxWidth: 560, mb: 6, fontSize: { xs: "1rem", md: "1.125rem" } }}
            >
              No filter dropdowns. No stale databases. Describe your ideal
              contact in plain English and we search the live web, enrich the
              result, and hand you a verified contact ready to reach out.
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
                Send us your ICP, get leads back
              </Button>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
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
            Describe who you are looking for.
            <br />
            <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
              We will send you leads.
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 6, maxWidth: 560 }}>
            Tell us your ICP in plain English. We will run it through our system
            and email you a list of verified contacts. No sign-up required.
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
                    label="Describe your ideal customer"
                    required
                    fullWidth
                    value={fields.icp}
                    onChange={set("icp")}
                    placeholder="e.g. Licensed land surveyors in Texas who run their own firm, under 20 employees, active on LinkedIn..."
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
                  We typically respond within a few hours. No spam, no sales pitch. Just leads.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 5, py: 1.75, fontSize: "0.9375rem", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Send me leads
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
                Got it. We are running your ICP through our system now and will
                email you a list of verified contacts shortly. If you want to
                talk through the results,{" "}
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
    title: "Describe your ICP",
    body: "Tell us who you are looking for in natural language. Job title, industry, geography, company size, license type. Anything that defines your ideal customer. No filter menus.",
  },
  {
    num: "02",
    title: "We search the live web",
    body: "Our system routes your query across multiple live sources: web agents, APIs, scrapers, directories. It automatically selects the fastest, cheapest path to the right result.",
  },
  {
    num: "03",
    title: "You get verified contacts",
    body: "Every result is enriched and verified before it reaches you. Name, title, company, email, and contact details. Confirmed active, not scraped once and forgotten.",
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
    vs: "vs. Apollo & static databases",
    title: "We search live. They query stale.",
    body: "Apollo and similar tools are built on databases scraped months or years ago. We search the live web for every query, so the contact you get reflects the world as it is today, not as it was when someone last ran a crawler.",
    highlight: false,
  },
  {
    vs: "Our approach",
    title: "Natural language, not SIC codes.",
    body: "Describing a licensed land surveyor running a 5-person firm in rural Georgia is impossible in a filter menu. It takes one sentence for us. We understand context that dropdowns simply cannot express.",
    highlight: true,
  },
  {
    vs: "Our approach",
    title: "Verified before it reaches you.",
    body: "We do not just find contacts. We confirm them. Every result goes through an enrichment and verification pass so you are not burning sequences on bad emails and dead companies.",
    highlight: true,
  },
  {
    vs: "vs. Clay & enrichment pipelines",
    title: "No playbook required.",
    body: "Tools like Clay are powerful but manual. You have to know which sources to chain and in what order. We handle that automatically. Describe who you want, and we figure out the most efficient path to find them.",
    highlight: false,
  },
  {
    vs: "vs. Exa & AI search tools",
    title: "Results, not research.",
    body: "AI search tools return web results. We return contacts. There is a full enrichment, structuring, and verification layer between raw search and what lands in your inbox, so you get something you can actually use.",
    highlight: false,
  },
  {
    vs: "Our approach",
    title: "Gets cheaper over time.",
    body: "Every query teaches our system which sources work best for which ICPs. Every repeated lookup hits a verified cache. The more it is used, the faster and cheaper it gets. That efficiency passes directly to you.",
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
                your ICP.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 6, maxWidth: 500 }}>
              Book a 30-minute demo and we will run your actual target customer
              profile through the system live. You will see results before the
              call ends.
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
                Send us your ICP instead
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
  return (
    <>
      <Navbar />
      <Hero />
      <ICPForm />
      <HowItWorks />
      <WhyDifferent />
      <BookDemo />
    </>
  );
}
