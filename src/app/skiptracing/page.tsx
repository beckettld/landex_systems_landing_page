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

const tiers = [
  {
    number: "01",
    label: "Tier 1 — Compliance & Identity",
    time: "~2 min",
    steps: "30 agent steps",
    fields: [
      "Full legal name & aliases",
      "Phone numbers (cell / landline / work)",
      "Email addresses",
      "Current address",
      "Date of birth",
      "Bankruptcy status",
      "Deceased status",
    ],
    use: "Quick background pass before initiating outreach. Confirms identity and surfaces hard stops.",
  },
  {
    number: "02",
    label: "Tier 2 — Employment & History",
    time: "~4 min",
    steps: "30 agent steps",
    fields: [
      "Employer name & job title",
      "Work phone & employer address",
      "Previous addresses with date ranges",
      "Additional aliases / maiden names",
    ],
    use: "Deal-stage diligence. Maps an operator's career trajectory and current institutional affiliation.",
  },
  {
    number: "03",
    label: "Tier 3 — Full Intelligence",
    time: "~6 min",
    steps: "40 agent steps",
    fields: [
      "Spouse / domestic partner",
      "Co-habitants at known address",
      "Property ownership & equity estimate",
      "Civil judgments & liens",
      "Voter registration address",
      "Professional licenses",
      "Facebook / social profile",
      "Estimated income range",
    ],
    use: "Full due-diligence profile. Network mapping, asset analysis, and litigation exposure for founder or operator targets.",
  },
];

const useCases = [
  {
    title: "Deal Sourcing",
    description:
      "Surface accurate contact information for founders and operators before your team makes the first call. Stop bouncing off stale LinkedIn data.",
  },
  {
    title: "Founder Background",
    description:
      "Confirm identity, current employer, and litigation history on management teams before term sheets are signed.",
  },
  {
    title: "Operator Vetting",
    description:
      "Map an operating partner candidate's address history, professional licenses, and financial standing in minutes.",
  },
  {
    title: "LP & Co-Investor DD",
    description:
      "Run rapid background intelligence on incoming LP commitments or co-investors to flag conflicts before close.",
  },
];

const peUseCases = [
  {
    number: "01",
    title: "Proprietary Deal Flow",
    impact: "Higher entry multiples",
    impactDetail: "Off-market deals transact at 1–3x lower multiples than auctioned assets",
    tier: "Tier 1",
    description:
      "Bankers run auctions. The best deals never reach them. Skip tracing gives your team direct dial and email for private business owners — the HVAC rollup target, the regional MSP, the founder-run manufacturer — before anyone else makes the call.",
    bullets: [
      "Find the actual decision-maker, not the CFO who screens calls",
      "Verify current address and phone before sending a letter of interest",
      "Run 10 targets in parallel in under 20 minutes",
    ],
  },
  {
    number: "02",
    title: "Pre-LOI Founder Screening",
    impact: "Kill bad deals early",
    impactDetail: "Full DD on a failed deal costs $150K–$400K in fees alone",
    tier: "Tier 1",
    description:
      "Before your team commits to an LOI and triggers the DD clock, run a Tier 1 trace on every named principal. Bankruptcy filings, active judgments, and litigation history surface in under two minutes — before you spend a dollar on legal or accounting.",
    bullets: [
      "Catch active bankruptcies and Chapter 7/11 filings before LOI",
      "Surface civil judgments and liens that sellers won't disclose",
      "Confirm the person signing is who they say they are",
    ],
  },
  {
    number: "03",
    title: "Add-On Acquisition Sourcing",
    impact: "Faster platform build",
    impactDetail: "Platform + add-on strategies average 2–3x MOIC vs. standalone holds",
    tier: "Tier 1–2",
    description:
      "Once you own the platform, every add-on target is a sourcing problem. Skip trace the owner-operators of adjacent businesses in your target geography. Get to them before the sector banker does and negotiate directly at lower multiples.",
    bullets: [
      "Build a direct-contact list for 50 add-on targets in an afternoon",
      "Verify ownership — make sure you're talking to the decision-maker",
      "Pull employment history to understand operator tenure and stability",
    ],
  },
  {
    number: "04",
    title: "Distressed & Special Situations",
    impact: "First-mover advantage",
    impactDetail: "Distressed assets trade at 30–60% discounts to intrinsic value",
    tier: "Tier 1–3",
    description:
      "In loan-to-own and distressed strategies, reaching the debtor or asset owner directly before a formal process begins is everything. Skip trace the principals of defaulting companies to initiate direct negotiations — before the restructuring banker is retained.",
    bullets: [
      "Locate principals of companies with covenant violations or defaults",
      "Surface property ownership and equity for secured creditor analysis",
      "Identify spousal assets and co-owners in complex family business situations",
    ],
  },
  {
    number: "05",
    title: "Management Succession & Hiring",
    impact: "Reduce operator risk",
    impactDetail: "Management failure is the #1 cited cause of underperforming PE investments",
    tier: "Tier 2–3",
    description:
      "When a portfolio company needs new leadership, background a shortlist of candidates before you get to reference calls. Verify employment history, professional license status, and financial standing. Catch red flags before an offer is extended.",
    bullets: [
      "Verify professional licenses are active (critical for healthcare, finance, legal)",
      "Confirm employment history matches what's on the resume",
      "Check for undisclosed bankruptcy or judgments before signing an employment contract",
    ],
  },
  {
    number: "06",
    title: "LP & Co-Investor KYC",
    impact: "Regulatory protection",
    impactDetail: "AML violations carry penalties up to $10M+ per fund for failing to screen",
    tier: "Tier 1",
    description:
      "Incoming LP commitments and co-investment partners require AML/KYC screening before close. Run Tier 1 traces on beneficial owners to surface bankruptcy, liens, and litigation — satisfying your compliance obligations without routing every check through outside counsel.",
    bullets: [
      "Screen beneficial owners of LP entities for compliance flags",
      "Verify identity and current address before accepting a wire",
      "Flag deceased or high-risk individuals before close",
    ],
  },
  {
    number: "07",
    title: "Post-Close Indemnity & Litigation",
    impact: "Asset recovery",
    impactDetail: "Sellers who misrepresent are often judgment-proof if you can't find them",
    tier: "Tier 3",
    description:
      "When a seller misrepresents and you need to pursue the indemnification, you need to know where they are and what they own. Tier 3 surfaces current address, property holdings, estimated equity, and known associates — the inputs your litigation counsel needs to serve process and attach assets.",
    bullets: [
      "Locate sellers who go dark post-close",
      "Surface real property and equity for asset attachment",
      "Identify co-habitants and associated parties for network analysis",
    ],
  },
];

const dataPoints = [
  { category: "Identity", items: ["Full legal name", "Aliases & maiden names", "Date of birth", "Deceased status"] },
  { category: "Contact", items: ["Cell, landline, work phones", "Carrier & phone type", "Email addresses", "Facebook URL"] },
  { category: "Location", items: ["Current address", "Address history with date ranges", "Voter registration address", "Co-habitants"] },
  { category: "Employment", items: ["Employer & job title", "Work phone", "Employer address", "Professional licenses"] },
  { category: "Financials", items: ["Property ownership", "Estimated equity", "Estimated income range", "Bankruptcy (chapter, case #)"] },
  { category: "Legal", items: ["Civil judgments", "Liens (amount, filing date)", "Court & case details", "Spouse / partner info"] },
];

const apiSteps = [
  { step: "01", action: "POST /api/v1/trace", detail: "Submit name + address. Receive a job_id in under 100ms." },
  { step: "02", action: "Job runs asynchronously", detail: "AI agent pipeline executes up to 3 tiers. No blocking. No waiting on the client." },
  { step: "03", action: "GET /api/v1/trace/{job_id}", detail: "Poll for status. When completed, retrieve fully structured JSON." },
  { step: "04", action: "Structured result object", detail: "Every field is typed and nullable. Plug directly into your CRM, data warehouse, or workflow." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function SkipTraceHero() {
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
              Landex Systems — Skip Trace API
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
              Know your target
              <br />
              before you make
              <br />
              <Box component="span" sx={{ color: "rgba(232,236,244,0.3)" }}>
                the{" "}
              </Box>
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                call
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
              sx={{ color: "text.secondary", maxWidth: 580, mb: 6, fontSize: { xs: "1rem", md: "1.125rem" } }}
            >
              An AI-powered skip trace API built for private equity deal teams.
              Submit a name and address. Receive a structured intelligence
              profile — phones, employment, financials, legal exposure — in
              minutes.
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
                href="mailto:allen@landexsystems.com?subject=Skip Trace API Access"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Request API Access
              </Button>
              <Button
                variant="outlined"
                href="#api-reference"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.primary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                API Reference
              </Button>
              <Button
                variant="outlined"
                href="#how-it-works"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.primary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                See How It Works
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
// Use Cases
// ─────────────────────────────────────────────────────────────────────────────

function UseCases() {
  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A", position: "relative" }}>
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 1, height: 80, background: "rgba(79,125,247,0.35)", transformOrigin: "top",
        }}
      />
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Built for PE
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 5 }}
              >
                Intelligence for
                <br />
                every stage of{" "}
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  the deal
                </Box>
              </Typography>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 520 }}>
                Deal teams waste hours chasing stale contact data, verifying
                identities, and piecing together founder backgrounds from
                fragmented sources. Our API runs a multi-tier AI agent pipeline
                against public records and returns a clean, structured profile
                — ready to load into your CRM or workflow in seconds.
              </Typography>
            </AnimateIn>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <StaggerContainer stagger={0.12} delay={0.2}>
              {useCases.map((uc, i) => (
                <motion.div key={uc.title} variants={staggerItem}>
                  <Box
                    sx={{
                      py: 3.5,
                      borderTop: "1px solid",
                      borderColor: i === 0 ? "primary.main" : "rgba(232,236,244,0.08)",
                    }}
                  >
                    <Typography variant="h4" sx={{ fontSize: "1rem", color: "text.primary", mb: 1 }}>
                      {uc.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                      {uc.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </StaggerContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PE Use Cases
// ─────────────────────────────────────────────────────────────────────────────

interface PEUseCase {
  number: string;
  title: string;
  impact: string;
  impactDetail: string;
  tier: string;
  description: string;
  bullets: string[];
}

function CardContent({ uc }: { uc: PEUseCase }) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(79,125,247,0.3)",
        bgcolor: "rgba(79,125,247,0.03)",
        p: { xs: 4, md: 5 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "2rem",
              color: "rgba(232,236,244,0.12)",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {uc.number}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" }, color: "text.primary", lineHeight: 1.3 }}
          >
            {uc.title}
          </Typography>
        </Box>
        <Chip
          label={uc.tier}
          size="small"
          sx={{
            bgcolor: "rgba(79,125,247,0.12)",
            color: "primary.main",
            fontSize: "0.6875rem",
            height: 20,
            borderRadius: 0,
            flexShrink: 0,
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        />
      </Box>

      {/* Impact callout */}
      <Box
        sx={{
          p: 2,
          bgcolor: "rgba(79,125,247,0.06)",
          borderLeft: "2px solid",
          borderLeftColor: "primary.main",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "primary.main",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          {uc.impact}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem" }}>
          {uc.impactDetail}
        </Typography>
      </Box>

      {/* Description */}
      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.75 }}>
        {uc.description}
      </Typography>

      {/* Bullets */}
      <Box>
        {uc.bullets.map((b) => (
          <Box key={b} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 4, height: 4, bgcolor: "rgba(79,125,247,0.6)", flexShrink: 0, mt: "6px" }} />
            <Typography variant="body2" sx={{ color: "rgba(232,236,244,0.45)", fontSize: "0.8125rem", lineHeight: 1.6 }}>
              {b}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function PEUseCases() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = peUseCases.length;

  const go = (next: number) => {
    setDirection(next > active ? 1 : -1);
    setActive(next);
  };
  const prev = () => go(active === 0 ? total - 1 : active - 1);
  const next = () => go(active === total - 1 ? 0 : active + 1);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, filter: "blur(6px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, filter: "blur(6px)", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const } }),
  };

  const uc = peUseCases[active];

  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Where This Moves the Needle
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ mb: { xs: 8, md: 10 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary" }}
              >
                Seven ways PE firms
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  use this today
                </Box>
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                From pre-LOI screening to post-close asset recovery, the
                intelligence gaps that cost PE firms money are almost always
                problems of locating people and surfacing facts that aren&apos;t
                in a data room. Every use case maps to a specific fund metric.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <AnimateIn delay={0.15}>
          {/* Card + nav row */}
          <Box sx={{ display: "flex", gap: { xs: 2, md: 3 }, alignItems: "stretch" }}>

            {/* Prev button */}
            <Box
              onClick={prev}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 40, md: 52 },
                flexShrink: 0,
                border: "1px solid rgba(232,236,244,0.08)",
                cursor: "pointer",
                color: "rgba(232,236,244,0.35)",
                fontSize: "1.1rem",
                transition: "all 0.2s ease",
                userSelect: "none",
                "&:hover": {
                  borderColor: "rgba(79,125,247,0.4)",
                  color: "primary.main",
                  bgcolor: "rgba(79,125,247,0.04)",
                },
              }}
            >
              ←
            </Box>

            {/* Card viewport — height driven by ghost layer so it always fits content */}
            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>

              {/* Ghost: invisible copy of the active card that sets the container height */}
              <Box sx={{ visibility: "hidden", pointerEvents: "none" }}>
                <CardContent uc={uc} />
              </Box>

              {/* Animated card overlaid on top */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -50) next();
                    else if (info.offset.x > 50) prev();
                  }}
                  style={{ position: "absolute", inset: 0, cursor: "grab" }}
                >
                  <CardContent uc={uc} />
                </motion.div>
              </AnimatePresence>
            </Box>

            {/* Next button */}
            <Box
              onClick={next}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 40, md: 52 },
                flexShrink: 0,
                border: "1px solid rgba(232,236,244,0.08)",
                cursor: "pointer",
                color: "rgba(232,236,244,0.35)",
                fontSize: "1.1rem",
                transition: "all 0.2s ease",
                userSelect: "none",
                "&:hover": {
                  borderColor: "rgba(79,125,247,0.4)",
                  color: "primary.main",
                  bgcolor: "rgba(79,125,247,0.04)",
                },
              }}
            >
              →
            </Box>
          </Box>

          {/* Dot indicators + counter */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 3 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {peUseCases.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => go(i)}
                  sx={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    bgcolor: i === active ? "primary.main" : "rgba(232,236,244,0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": { bgcolor: i === active ? "primary.main" : "rgba(232,236,244,0.35)" },
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem", fontVariantNumeric: "tabular-nums" }}>
              {active + 1} / {total}
            </Typography>
          </Box>
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier Pipeline
// ─────────────────────────────────────────────────────────────────────────────

function TierPipeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box id="how-it-works" sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Three-Tier Pipeline
          </Typography>
        </AnimateIn>

        <AnimateIn delay={0.1} blur>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 3, maxWidth: 700 }}
          >
            Run only what
            <br />
            <Box component="span" sx={{ color: "text.secondary" }}>
              you need.
            </Box>
          </Typography>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: { xs: 8, md: 12 }, maxWidth: 560 }}>
            Each tier targets a distinct set of fields. If a prior tier already
            found everything the next tier is looking for, that tier is
            automatically skipped. Set <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.9em" }}>max_tier</Box> to control cost and depth.
          </Typography>
        </AnimateIn>

        <StaggerContainer stagger={0.15} delay={0.1}>
          <Grid container spacing={2}>
            {tiers.map((tier, i) => {
              const isActive = i === activeIndex;
              return (
                <Grid key={tier.number} size={{ xs: 12, md: 4 }}>
                  <motion.div variants={staggerItem} style={{ height: "100%" }}>
                    <Box
                      onClick={() => setActiveIndex(i)}
                      sx={{
                        border: "1px solid",
                        borderColor: isActive ? "rgba(79,125,247,0.35)" : "rgba(232,236,244,0.06)",
                        p: { xs: 4, md: 5 },
                        height: "100%",
                        bgcolor: isActive ? "rgba(79,125,247,0.04)" : "rgba(255,255,255,0.01)",
                        cursor: "pointer",
                        transition: "border-color 0.25s ease, background-color 0.25s ease",
                        "&:hover": {
                          borderColor: isActive ? "rgba(79,125,247,0.5)" : "rgba(232,236,244,0.15)",
                          bgcolor: isActive ? "rgba(79,125,247,0.06)" : "rgba(255,255,255,0.025)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Instrument Serif", serif',
                          fontSize: "3rem",
                          color: isActive ? "primary.main" : "rgba(232,236,244,0.12)",
                          lineHeight: 1,
                          mb: 3,
                          transition: "color 0.25s ease",
                        }}
                      >
                        {tier.number}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "0.7rem",
                          color: isActive ? "primary.main" : "text.secondary",
                          mb: 1,
                          letterSpacing: "0.1em",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {tier.label}
                      </Typography>

                      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                        <Chip
                          label={tier.time}
                          size="small"
                          sx={{
                            bgcolor: "rgba(232,236,244,0.05)",
                            color: "text.secondary",
                            fontSize: "0.7rem",
                            height: 22,
                            borderRadius: 0,
                          }}
                        />
                        <Chip
                          label={tier.steps}
                          size="small"
                          sx={{
                            bgcolor: "rgba(232,236,244,0.05)",
                            color: "text.secondary",
                            fontSize: "0.7rem",
                            height: 22,
                            borderRadius: 0,
                          }}
                        />
                      </Stack>

                      <Box sx={{ mb: 3 }}>
                        {tier.fields.map((f) => (
                          <Box key={f} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.75 }}>
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                bgcolor: isActive ? "primary.main" : "rgba(232,236,244,0.25)",
                                flexShrink: 0,
                                transition: "background-color 0.25s ease",
                              }}
                            />
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                              {f}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Divider sx={{ mb: 3 }} />

                      <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem", lineHeight: 1.65 }}>
                        {tier.use}
                      </Typography>
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
// Data Points Grid
// ─────────────────────────────────────────────────────────────────────────────

function DataPointsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Result Schema
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary" }}
              >
                Every field you need.
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  Nothing you don&apos;t.
                </Box>
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                The result is a typed JSON object. Every field is nullable — if
                the agent couldn&apos;t find it, it comes back as{" "}
                <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.9em" }}>null</Box>.
                Arrays return empty if nothing was found. No parsing required.
                Plug directly into your stack.
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
// API Flow
// ─────────────────────────────────────────────────────────────────────────────

function ApiFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Integration
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "text.primary", mb: 4 }}
              >
                Submit. Poll.
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  Done.
                </Box>
              </Typography>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
                Asynchronous by design. Submit a trace request and get back a
                job ID in under 100ms. Poll when ready. Max 10 concurrent jobs.
                Results are available for 24 hours.
              </Typography>
            </AnimateIn>

            {/* Collapsible docs */}
            <AnimateIn delay={0.3}>
              <Box
                onClick={() => setDocsOpen((o) => !o)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  border: "1px solid",
                  borderColor: docsOpen ? "rgba(79,125,247,0.3)" : "rgba(232,236,244,0.08)",
                  bgcolor: docsOpen ? "rgba(79,125,247,0.04)" : "transparent",
                  cursor: "pointer",
                  mb: docsOpen ? 0 : 0,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "rgba(79,125,247,0.3)",
                    bgcolor: "rgba(79,125,247,0.03)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: docsOpen ? "primary.main" : "text.secondary",
                    fontFamily: "monospace",
                    transition: "color 0.25s ease",
                  }}
                >
                  Example request / response
                </Typography>
                <motion.div
                  animate={{ rotate: docsOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Typography sx={{ color: "text.secondary", fontSize: "0.75rem", lineHeight: 1 }}>▼</Typography>
                </motion.div>
              </Box>

              <AnimatePresence initial={false}>
                {docsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <Box
                      sx={{
                        bgcolor: "rgba(6,9,26,0.8)",
                        border: "1px solid rgba(79,125,247,0.15)",
                        borderTop: "none",
                        p: 3,
                      }}
                    >
                      <Typography sx={{ color: "rgba(232,236,244,0.4)", mb: 1, fontSize: "0.75rem", fontFamily: "monospace" }}>
                        POST /api/v1/trace
                      </Typography>
                      <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", fontSize: "0.8125rem", whiteSpace: "pre" }}>
{`{
  "name": "Jane Doe",
  "address": "123 Main St, MI",
  "max_tier": 3
}`}
                      </Typography>
                      <Divider sx={{ my: 2, borderColor: "rgba(79,125,247,0.12)" }} />
                      <Typography sx={{ color: "rgba(232,236,244,0.4)", mb: 1, fontSize: "0.75rem", fontFamily: "monospace" }}>
                        202 Accepted
                      </Typography>
                      <Typography sx={{ color: "#4F7DF7", fontFamily: "monospace", fontSize: "0.8125rem", whiteSpace: "pre" }}>
{`{
  "job_id": "a3f9c21b04d7",
  "status": "queued"
}`}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimateIn>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <StaggerContainer stagger={0.12} delay={0.2}>
              {apiSteps.map((s, i) => {
                const isActive = i === activeStep;
                return (
                  <motion.div key={s.step} variants={i % 2 === 0 ? staggerItemLeft : staggerItemRight}>
                    <Box
                      onClick={() => setActiveStep(i)}
                      sx={{
                        display: "flex",
                        gap: 3,
                        py: 3.5,
                        px: 2,
                        borderTop: "1px solid",
                        borderColor: isActive ? "rgba(79,125,247,0.35)" : "rgba(232,236,244,0.06)",
                        bgcolor: isActive ? "rgba(79,125,247,0.03)" : "transparent",
                        cursor: "pointer",
                        transition: "background-color 0.25s ease, border-color 0.25s ease",
                        "&:hover": {
                          bgcolor: isActive ? "rgba(79,125,247,0.05)" : "rgba(255,255,255,0.02)",
                          borderColor: isActive ? "rgba(79,125,247,0.5)" : "rgba(232,236,244,0.15)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Instrument Serif", serif',
                          fontSize: "2rem",
                          color: isActive ? "primary.main" : "rgba(232,236,244,0.15)",
                          lineHeight: 1,
                          flexShrink: 0,
                          width: 40,
                          transition: "color 0.25s ease",
                        }}
                      >
                        {s.step}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontFamily: "monospace",
                            fontSize: "0.8125rem",
                            mb: 0.75,
                            color: isActive ? "primary.main" : "text.primary",
                            transition: "color 0.25s ease",
                          }}
                        >
                          {s.action}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.65 }}>
                          {s.detail}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// API Reference (docs)
// ─────────────────────────────────────────────────────────────────────────────

const codeBlockSx = {
  bgcolor: "rgba(6,9,26,0.8)",
  border: "1px solid rgba(79,125,247,0.15)",
  p: 2,
  fontFamily: "monospace",
  fontSize: "0.8125rem",
  overflow: "auto",
} as const;

function ApiReference() {
  const [open, setOpen] = useState(false);

  return (
    <Box id="api-reference" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">

        {/* Toggle bar — always visible */}
        <AnimateIn blur>
          <Box
            onClick={() => setOpen((o) => !o)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 4,
              py: 3,
              border: "1px solid",
              borderColor: open ? "rgba(79,125,247,0.3)" : "rgba(232,236,244,0.08)",
              bgcolor: open ? "rgba(79,125,247,0.04)" : "transparent",
              cursor: "pointer",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "rgba(79,125,247,0.3)",
                bgcolor: "rgba(79,125,247,0.03)",
              },
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: open ? "primary.main" : "text.secondary",
                  display: "block",
                  letterSpacing: "0.12em",
                  transition: "color 0.25s ease",
                }}
              >
                API Reference
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem" }}>
                Full endpoint docs, data models, and job lifecycle
              </Typography>
            </Box>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1 }}>▼</Typography>
            </motion.div>
          </Box>
        </AnimateIn>

        {/* Collapsible body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <Box
                sx={{
                  border: "1px solid rgba(79,125,247,0.15)",
                  borderTop: "none",
                  px: { xs: 3, md: 5 },
                  pt: 6,
                  pb: 8,
                }}
              >

        {/* Table of Contents */}
        <AnimateIn delay={0.15}>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.7rem", letterSpacing: "0.12em", mb: 2 }}>
              Table of Contents
            </Typography>
            <Stack component="nav" spacing={0.5}>
              {[
                { href: "#api-auth", label: "Authentication" },
                { href: "#api-endpoints", label: "Endpoints" },
                { href: "#api-models", label: "Data Models" },
                { href: "#api-lifecycle", label: "Job Lifecycle" },
                { href: "#api-concurrency", label: "Concurrency & Persistence" },
                { href: "#api-optimizations", label: "Known Issues & Optimizations" },
              ].map(({ href, label }) => (
                <Typography
                  key={href}
                  component="a"
                  href={href}
                  sx={{ color: "primary.main", fontSize: "0.9rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Box>
        </AnimateIn>

        {/* Authentication */}
        <Box id="api-auth" sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 2 }}>
            Authentication
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            All <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>/api/v1/*</Box> endpoints require an <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>X-API-Key</Box> header. <Box component="code" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85em" }}>GET /health</Box> does not require authentication.
          </Typography>
          <Box sx={codeBlockSx}>
            <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mb: 0.5 }}>Header</Typography>
            <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>X-API-Key: &lt;your-api-key&gt;</Typography>
            <Divider sx={{ my: 2, borderColor: "rgba(79,125,247,0.12)" }} />
            <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>401 — Invalid or missing key</Typography>
            <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{`{ "detail": "Invalid or missing API key" }`}</Typography>
          </Box>
        </Box>

        {/* Endpoints */}
        <Box id="api-endpoints" sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 4 }}>
            Endpoints
          </Typography>

          {/* GET /health */}
          <Box sx={{ mb: 6 }}>
            <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/health</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>Server status. No authentication required.</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200</Typography>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{`{ "status": "ok" }`}</Typography>
            </Box>
          </Box>

          {/* POST /api/v1/trace */}
          <Box sx={{ mb: 6 }}>
            <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>
              Submit a new skip trace job. Queued immediately, executed asynchronously. Deduplication: same name+address returns existing job_id.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.8rem" }}>Request body:</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{`{
  "name": "Jane Doe",
  "address": "123 Main St, Detroit, MI 48201",
  "max_tier": 1
}`}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 1, fontSize: "0.8rem" }}>max_tier: 1 (default), 2, or 3. Omit for Tier 1 only.</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>202 Accepted</Typography>
              <Typography sx={{ color: "#4F7DF7", fontFamily: "monospace", whiteSpace: "pre" }}>{`{
  "job_id": "a3f9c21b04d7",
  "status": "queued"
}`}</Typography>
            </Box>
          </Box>

          {/* GET /api/v1/trace/{job_id} */}
          <Box sx={{ mb: 6 }}>
            <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace/{`{job_id}`}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>Retrieve status and result of a trace job. Poll until status is completed, failed, or cancelled.</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — completed</Typography>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", fontSize: "0.75rem", whiteSpace: "pre" }}>{`{
  "job_id": "a3f9c21b04d7",
  "status": "completed",
  "debtor": { "name": "...", "address": "...", "max_tier": 1 },
  "created_at": "2026-03-08T14:00:00Z",
  "completed_at": "2026-03-08T14:04:32Z",
  "total_steps": 87,
  "result": { ... },
  "error": null
}`}</Typography>
              <Divider sx={{ my: 2, borderColor: "rgba(79,125,247,0.12)" }} />
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — running / queued (result null)</Typography>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>404 — Job not found</Typography>
            </Box>
          </Box>

          {/* DELETE /api/v1/trace/{job_id} */}
          <Box sx={{ mb: 6 }}>
            <Chip label="DELETE" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace/{`{job_id}`}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>
              Request cancellation. Acknowledged immediately (202); worker stops at next tier boundary. Poll GET to confirm status: cancelled and partial result.
            </Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>202 — cancellation requested</Typography>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{`{ "job_id": "...", "status": "running" }`}</Typography>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 1 }}>409 — Job already completed/failed | 404 — Job not found</Typography>
            </Box>
          </Box>

          {/* GET /api/v1/jobs */}
          <Box sx={{ mb: 4 }}>
            <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>List all jobs in memory. Returns full job details per job.</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — Array of Job objects</Typography>
            </Box>
          </Box>
        </Box>

        {/* Data Models */}
        <Box id="api-models" sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
            Data Models
          </Typography>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Request — DebtorInput</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>name</td><td>string</td><td>Debtor&apos;s full name</td></tr>
              <tr><td>address</td><td>string</td><td>Known address (free-form)</td></tr>
              <tr><td>max_tier</td><td>integer</td><td>Max tier 1–3. Default 1.</td></tr>
            </tbody>
          </Box>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Response — TraceResponse (POST trace, DELETE trace)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th></tr></thead>
            <tbody>
              <tr><td>job_id</td><td>string</td></tr>
              <tr><td>status</td><td>queued | running | completed | failed | cancelled</td></tr>
            </tbody>
          </Box>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Job (GET trace/{`{job_id}`}, GET jobs)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th></tr></thead>
            <tbody>
              <tr><td>job_id</td><td>string</td></tr>
              <tr><td>status</td><td>queued | running | completed | failed | cancelled</td></tr>
              <tr><td>debtor</td><td>DebtorInput</td></tr>
              <tr><td>created_at</td><td>datetime (UTC)</td></tr>
              <tr><td>completed_at</td><td>datetime | null</td></tr>
              <tr><td>total_steps</td><td>integer | null</td></tr>
              <tr><td>result</td><td>SkipTraceResult | null</td></tr>
              <tr><td>error</td><td>string | null</td></tr>
            </tbody>
          </Box>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>SkipTraceResult (result schema)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 2, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th></tr></thead>
            <tbody>
              <tr><td>full_legal_name</td><td>string | null</td></tr>
              <tr><td>aliases</td><td>string[]</td></tr>
              <tr><td>date_of_birth</td><td>string | null</td></tr>
              <tr><td>phone_numbers</td><td>PhoneNumber[]</td></tr>
              <tr><td>current_address</td><td>Address | null</td></tr>
              <tr><td>previous_addresses</td><td>AddressHistory[]</td></tr>
              <tr><td>email_addresses</td><td>string[]</td></tr>
              <tr><td>employment</td><td>EmploymentInfo | null</td></tr>
              <tr><td>spouse_partner</td><td>RelativeInfo | null</td></tr>
              <tr><td>co_habitants</td><td>string[]</td></tr>
              <tr><td>property_ownership</td><td>PropertyInfo | null</td></tr>
              <tr><td>homeowner_or_renter</td><td>owner | renter | unknown | null</td></tr>
              <tr><td>bankruptcy</td><td>BankruptcyInfo | null</td></tr>
              <tr><td>civil_judgments_liens</td><td>JudgmentLien[]</td></tr>
              <tr><td>voter_registration_address</td><td>string | null</td></tr>
              <tr><td>professional_licenses</td><td>License[]</td></tr>
              <tr><td>facebook_url</td><td>string | null</td></tr>
              <tr><td>estimated_income_range</td><td>string | null</td></tr>
              <tr><td>deceased</td><td>DeceasedInfo | null</td></tr>
            </tbody>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
            Nested types: PhoneNumber (number, phone_type, carrier), Address (street, city, state, zip_code), AddressHistory (address, date_range), EmploymentInfo (employer_name, job_title, work_phone, employer_address, employer_main_line), RelativeInfo (name, phone, relationship), PropertyInfo (owner_of_record, estimated_value, estimated_equity, property_address), BankruptcyInfo (status, chapter, case_number, filing_date), JudgmentLien (case_type, description, amount, filing_date, court), License (license_type, status, issuing_state, license_number), DeceasedInfo (is_deceased, date_of_death, source).
          </Typography>
        </Box>

        {/* Job Lifecycle */}
        <Box id="api-lifecycle" sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 2 }}>
            Job Lifecycle
          </Typography>
          <Box sx={codeBlockSx}>
            <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", fontSize: "0.8rem", whiteSpace: "pre" }}>{`POST /api/v1/trace
        │
        ▼
    status: queued          ← returned immediately
        │
        ▼
    status: running
        │
        ├── success ──▶ status: completed  (result populated)
        │
        └── error   ──▶ status: failed     (error populated)

    DELETE during running ──▶ status: cancelled (partial result preserved)`}</Typography>
          </Box>
        </Box>

        {/* Concurrency & Persistence */}
        <Box id="api-concurrency" sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 2 }}>
            Concurrency & Persistence
          </Typography>
          <Stack spacing={1} sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
            <Typography variant="body2">• <strong>Max concurrency:</strong> 10 simultaneous trace jobs (asyncio.Semaphore).</Typography>
            <Typography variant="body2">• <strong>Persistence:</strong> Jobs in-memory only; history lost on restart.</Typography>
            <Typography variant="body2">• <strong>Job TTL:</strong> Terminal jobs (completed/failed/cancelled) purged after 24 hours. Cleanup runs hourly.</Typography>
            <Typography variant="body2">• <strong>Result files:</strong> data/{`<job_id>`}.json written on completion; survive restarts.</Typography>
          </Stack>
        </Box>

        {/* Known Issues & Optimizations */}
        <Box id="api-optimizations">
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
            Known Issues & Optimizations
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Tiers</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Tier</th><th>max_tier</th><th>Max steps</th><th>Finds</th></tr></thead>
            <tbody>
              <tr><td>Tier 1</td><td>1 (default)</td><td>30</td><td>Name, phones, email, address, DOB, bankruptcy, deceased</td></tr>
              <tr><td>Tier 2</td><td>2</td><td>30</td><td>Employer, job title, work phone, aliases, previous addresses</td></tr>
              <tr><td>Tier 3</td><td>3</td><td>40</td><td>Spouse, co-habitants, property, judgments, licenses, voter reg, Facebook, income</td></tr>
            </tbody>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Each tier runs only if the previous tier left target fields unfilled. Later tiers skip re-verifying already-found data.
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>How to minimize token drain</Typography>
          <Stack spacing={1} sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
            <Typography variant="body2">• <strong>Deduplication:</strong> Same name+address returns existing job_id; no duplicate pipeline.</Typography>
            <Typography variant="body2">• <strong>Cancel long-running jobs:</strong> DELETE /api/v1/trace/{`{job_id}`} returns 202; poll until status: cancelled and use partial result.</Typography>
            <Typography variant="body2">• <strong>Tier control:</strong> Use max_tier in request; default 1 runs Tier 1 only.</Typography>
            <Typography variant="body2">• <strong>Agent instructions:</strong> Tier 2/3 prompts tell the agent not to re-search already-confirmed fields.</Typography>
          </Stack>
        </Box>

              </Box>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────

function SkipTraceCTA() {
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
              Ready to automate
              <br />
              your prospecting{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                intelligence?
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 6, maxWidth: 540 }}
            >
              The Skip Trace API is available to PE deal teams and operators by
              request. Reach out to discuss access, pricing, and integration
              with your existing stack.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                href="mailto:allen@landexsystems.com?subject=Skip Trace API Access"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Request API Access
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
                ← Back to Landex
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

export default function SkipTracingPage() {
  return (
    <>
      <Navbar />
      <SkipTraceHero />
      <UseCases />
      <PEUseCases />
      <TierPipeline />
      <DataPointsGrid />
      <ApiFlow />
      <ApiReference />
      <SkipTraceCTA />
    </>
  );
}
