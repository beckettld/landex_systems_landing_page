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
    label: "Tier 1 — Identity & Compliance",
    time: "~2 min",
    steps: "30 agent steps",
    fields: [
      "Legal name and aliases",
      "Phone numbers (mobile, landline, work)",
      "Email addresses",
      "Current address",
      "Date of birth",
      "Bankruptcy status",
      "Deceased indicator",
    ],
    use: "Quick pass before you call. Confirms who they are and surfaces hard stops (bankruptcy, death).",
  },
  {
    number: "02",
    label: "Tier 2 — Employment & History",
    time: "~4 min",
    steps: "30 agent steps",
    fields: [
      "Employer and job title",
      "Work phone and employer address",
      "Previous addresses with dates",
      "Additional aliases and maiden names",
    ],
    use: "Standard for most deals. Maps career trajectory, current employer, tenure.",
  },
  {
    number: "03",
    label: "Tier 3 — Full Background",
    time: "~6 min",
    steps: "40 agent steps",
    fields: [
      "Spouse or domestic partner",
      "Co-habitants at current address",
      "Real property ownership and estimated equity",
      "Civil judgments and liens",
      "Voter registration address",
      "Professional licenses and status",
      "Facebook profile",
      "Income estimate",
    ],
    use: "Due diligence on major deals. Network mapping, asset analysis, litigation exposure.",
  },
];

const useCases = [
  {
    title: "Skip Tracing / Collections",
    description:
      "You have a name and a last known address. You need current phones, a verified location, and employer info. The enrich pipeline runs four tiers and returns everything the collector or process server needs to act.",
  },
  {
    title: "Outbound Sales",
    description:
      "You have a list of target companies. Give them to the pipeline and get back the decision-makers with direct phones, personal emails, and current addresses. No manual research. No LinkedIn approximations.",
  },
  {
    title: "Property-Signal Targeting",
    description:
      "A property record reveals a homeowner. A deed transfer reveals a new buyer. A tax lien reveals a motivated seller. The discover pipeline finds the people behind those signals and enriches each one with contact info.",
  },
  {
    title: "Event-Triggered Outreach",
    description:
      "A new business filing, a renovation permit, a domestic relations case, a job change. These events define a population at exactly the moment they are a relevant target. The pipeline catches them and builds a verified list.",
  },
];

const peUseCases = [
  {
    number: "01",
    title: "Proprietary Deal Flow",
    impact: "Higher entry multiples",
    impactDetail: "Off-market deals close at 1–3x lower multiples than auction processes",
    tier: "Tier 1",
    description:
      "Bankers run auctions. The best deals never surface. Give us a list of target companies. We identify who runs each one, then build a full verified profile on every key contact — direct phone, personal email, current address. Your team starts dialing before the banker even gets the mandate.",
    bullets: [
      "Submit a company name. Get the CEO, CFO, and owners with titles and LinkedIn.",
      "Enrich each contact automatically: direct phone, personal email, current address.",
      "Run 50 target companies in parallel. Full contact list in under an hour.",
    ],
  },
  {
    number: "02",
    title: "Pre-LOI Founder Screening",
    impact: "Avoid bad deals",
    impactDetail: "A failed deal with full DD costs $150K-$400K in legal and accounting fees",
    tier: "Tier 1",
    description:
      "Two minutes of API runtime before you sign an LOI beats two weeks of legal digging. Surface bankruptcy filings, active judgments, and litigation history on every named principal. Kill the deal early if there's a hard stop.",
    bullets: [
      "Catch bankruptcies and Chapter 7/11 filings in 90 seconds",
      "Surface liens and judgments sellers won't disclose",
      "Confirm the principal's identity and current location",
    ],
  },
  {
    number: "03",
    title: "Add-On Acquisition Sourcing",
    impact: "Faster platform build",
    impactDetail: "Platform + add-on strategies return 2–3x MOIC vs. standalone holds",
    tier: "Tier 1–2",
    description:
      "You own the platform. Now find 50 adjacent businesses in your territory and get them on the phone before the sector banker can. Entity Finder builds your prospect list with verified contact info. Your team does the pitching.",
    bullets: [
      "Generate a sourcing list of 50 targets in an afternoon",
      "Verify ownership so you know you're calling the decision-maker",
      "Pull employment tenure data to gauge operator stability",
    ],
  },
  {
    number: "04",
    title: "Distressed & Special Situations",
    impact: "Speed to offer",
    impactDetail: "Distressed assets trade at 30–60% discounts to intrinsic value",
    tier: "Tier 1–3",
    description:
      "Loan-to-own deals are won on speed. Reach the defaulted company's principals directly before the restructuring banker is retained. Entity Finder surfaces who they are, where they are, and what they own.",
    bullets: [
      "Find principals of companies with covenant violations fast",
      "Surface property and equity details for secured creditor analysis",
      "Map co-owners and spousal assets in family business situations",
    ],
  },
  {
    number: "05",
    title: "Management Screening",
    impact: "Reduce operator risk",
    impactDetail: "Management failure is the #1 cause of underperforming PE investments",
    tier: "Tier 2–3",
    description:
      "Before you offer a candidate the job, verify their licenses are active, confirm their employment history, and check for undisclosed bankruptcies. You get the answer in minutes. Your legal team doesn't need to dig.",
    bullets: [
      "Verify active professional licenses (healthcare, finance, legal)",
      "Confirm employment history against the resume",
      "Flag undisclosed bankruptcies before offer letters",
    ],
  },
  {
    number: "06",
    title: "LP & Co-Investor Compliance",
    impact: "Regulatory protection",
    impactDetail: "AML violations carry penalties up to $10M+ per fund",
    tier: "Tier 1",
    description:
      "Incoming LP commitments and co-investment partners need AML/KYC screening before close. Run our API on beneficial owners. Surface bankruptcy, liens, and litigation. You check the box without routing every wire through outside counsel.",
    bullets: [
      "Screen beneficial owners of LP entities for compliance flags",
      "Verify identity and current address before wire transfers",
      "Flag deceased or high-risk individuals before close",
    ],
  },
  {
    number: "07",
    title: "Post-Close Recovery",
    impact: "Asset recovery",
    impactDetail: "Judgment-proof sellers often have assets you can't find on your own",
    tier: "Tier 3",
    description:
      "A seller misrepresents after close. You need to serve them, attach their assets, and actually collect. Entity Finder surfaces current address, property holdings, estimated equity, and known associates. Everything your litigation counsel needs to move.",
    bullets: [
      "Locate sellers who go dark post-close",
      "Surface property and equity for asset attachment",
      "Map associated parties for collection strategy",
    ],
  },
];

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

const apiSteps = [
  { step: "01", action: "POST /api/v1/enrich", detail: "Submit name + address (or company name for the pipeline). Receive a job_id in under 100ms." },
  { step: "02", action: "Job runs asynchronously", detail: "Agent pipeline executes up to 4 tiers per person. Company pipeline expands contacts first, then enriches each one. No blocking." },
  { step: "03", action: "GET /api/v1/jobs/{job_id}", detail: "Poll for status. When completed, retrieve a fully structured JSON result." },
  { step: "04", action: "Structured result object", detail: "Every field is typed and nullable. Plug directly into your CRM, data warehouse, or workflow." },
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
              Find anyone.
              <br />
              From any
              <br />
              starting point.
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
              A name and address. A company name. A property signal. A life
              event. Tell us who you are looking for and we find them, locate
              them, and build a verified profile on everyone who matches. Phones,
              email, employer, assets, legal history. Structured JSON, straight
              into your workflow.
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
                href="mailto:allen@landexsystems.com?subject=Entity Finder API Access"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Request API Access
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
                How It Works
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
                See Pricing
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
// Three Operations
// ─────────────────────────────────────────────────────────────────────────────

const operations = [
  {
    name: "Discover",
    status: "Coming soon",
    statusLive: false,
    tagline: "Define a population. Find everyone in it.",
    description:
      "You have a description of a target, not a list of names. Property owners in a county with delinquent taxes. New deed transfers in a zip code. Recent LLC registrations in a state. The discover operation translates a filter into a set of partial entities — names and addresses — ready for enrichment.",
    examples: [
      "New homebuyers in a target market (deed transfers, last 60 days)",
      "Commercial owners in a zip with outstanding tax liens",
      "New business registrations by state, filtered by entity type",
      "Permit pulls in a target neighborhood, last 30 days",
    ],
  },
  {
    name: "Expand",
    status: "Live",
    statusLive: true,
    tagline: "One entity. Get the people around it.",
    description:
      "You have a company. You need the people who run it. Expand takes an organization and returns its key contacts — name, title, LinkedIn, email — plus company-level signals. Filter by role, seniority, or department. The contacts it returns are seeded for enrichment without needing a separate address lookup.",
    examples: [
      "Company name to CEO, CFO, and owners with LinkedIn and email",
      "Filter by seniority (C-suite, VP, director) or department",
      "Returns registered agent, office locations, email pattern",
      "Output is valid input to enrich — no manual chaining required",
    ],
  },
  {
    name: "Enrich",
    status: "Live",
    statusLive: true,
    tagline: "Partial record. Full profile.",
    description:
      "You have a name and address, or a name and LinkedIn from expand. You need everything else. Enrich runs a four-tier agent pipeline and returns verified phones, email, employment, property, assets, legal history, and household data. Use max_tier to control depth and cost.",
    examples: [
      "Name + address → verified phones, email, employer, current location",
      "Name + LinkedIn (from expand) → full profile without an address",
      "Four tiers: identity, employment, full background, deep background",
      "Every field typed and nullable — direct to CRM or data warehouse",
    ],
  },
];

function ThreeOperations() {
  const [active, setActive] = useState(1);

  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            How it works
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 4, md: 10 }} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary" }}
              >
                Three operations.
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  Composable by design.
                </Box>
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Every capability in the system is one of three operations.
                Each one stands alone or feeds the next. The output of discover
                is valid input to expand. The output of expand is valid input
                to enrich. You call as many stages as you need.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <StaggerContainer stagger={0.12} delay={0.1}>
          <Grid container spacing={2}>
            {operations.map((op, i) => {
              const isActive = i === active;
              return (
                <Grid key={op.name} size={{ xs: 12, md: 4 }}>
                  <motion.div variants={staggerItem} style={{ height: "100%" }}>
                    <Box
                      onClick={() => setActive(i)}
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
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                        <Typography
                          sx={{
                            fontFamily: '"Instrument Serif", serif',
                            fontSize: "2.25rem",
                            color: isActive ? "primary.main" : "rgba(232,236,244,0.12)",
                            lineHeight: 1,
                            transition: "color 0.25s ease",
                          }}
                        >
                          {op.name}
                        </Typography>
                        <Chip
                          label={op.status}
                          size="small"
                          sx={{
                            bgcolor: op.statusLive ? "rgba(79,125,247,0.12)" : "rgba(232,236,244,0.05)",
                            color: op.statusLive ? "primary.main" : "rgba(232,236,244,0.3)",
                            fontSize: "0.6rem",
                            height: 18,
                            borderRadius: 0,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: isActive ? "text.primary" : "text.secondary",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          mb: 2,
                          transition: "color 0.25s ease",
                        }}
                      >
                        {op.tagline}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.75, mb: 3, fontSize: "0.8125rem" }}
                      >
                        {op.description}
                      </Typography>

                      <Divider sx={{ mb: 3, borderColor: isActive ? "rgba(79,125,247,0.15)" : "rgba(232,236,244,0.06)" }} />

                      <Box>
                        {op.examples.map((ex) => (
                          <Box key={ex} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
                            <Box sx={{ width: 3, height: 3, bgcolor: isActive ? "primary.main" : "rgba(232,236,244,0.2)", flexShrink: 0, mt: "6px", transition: "background-color 0.25s ease" }} />
                            <Typography variant="body2" sx={{ color: "rgba(232,236,244,0.4)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                              {ex}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </StaggerContainer>

        <AnimateIn delay={0.3}>
          <Box
            sx={{
              mt: 4,
              p: { xs: 3, md: 4 },
              border: "1px solid rgba(232,236,244,0.06)",
              bgcolor: "rgba(255,255,255,0.01)",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem", mb: 1 }}>
              <Box component="span" sx={{ color: "text.primary", fontWeight: 500 }}>Pipelines</Box> chain these operations. The output of each stage is the input to the next.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 3 }} sx={{ mt: 2 }}>
              {[
                { label: "Skip trace", flow: "name + address → enrich → full profile", live: true },
                { label: "Company to contacts", flow: "company → expand → enrich each contact", live: true },
                { label: "Property targeting", flow: "property signal → discover → enrich", live: false },
                { label: "Event-triggered", flow: "life event → discover → enrich", live: false },
              ].map((p) => (
                <Box key={p.label} sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                  <Box sx={{ width: 5, height: 5, bgcolor: p.live ? "primary.main" : "rgba(232,236,244,0.15)", flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: "0.7rem", color: p.live ? "primary.main" : "rgba(232,236,244,0.25)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {p.label}{!p.live && " — soon"}
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(232,236,244,0.3)" }}>
                      {p.flow}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </AnimateIn>
      </Container>
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
            Use cases
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 5 }}
              >
                Any population.
                <br />
                Defined{" "}
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  any way.
                </Box>
              </Typography>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 520 }}>
                The input can be a known individual, a company name, a
                property characteristic, or a life event. The output is a
                structured profile for each entity that matches: phones, email,
                location, employment, assets, and legal history. The research
                pattern is the same regardless of where you start.
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

// ─────────────────────────────────────────────────────────────────────────────
// Company Pipeline
// ─────────────────────────────────────────────────────────────────────────────

function CompanyPipeline() {
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
            Two ways in
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ mb: { xs: 10, md: 14 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 4 }}
              >
                Start with a person.
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  Start with a company.
                </Box>
              </Typography>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 520 }}>
                Most tools assume you already know who you&apos;re looking for.
                We don&apos;t. Give us a company name and we find the people who
                run it. Then we build a full verified profile on each one. One
                API call covers the whole target.
              </Typography>
            </AnimateIn>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Path 1: Person */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.1}>
              <Box
                sx={{
                  border: "1px solid rgba(232,236,244,0.08)",
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  position: "relative",
                }}
              >
                <Chip
                  label="Person search"
                  size="small"
                  sx={{
                    bgcolor: "rgba(232,236,244,0.06)",
                    color: "text.secondary",
                    fontSize: "0.6875rem",
                    height: 20,
                    borderRadius: 0,
                    mb: 4,
                    letterSpacing: "0.06em",
                  }}
                />
                <Typography variant="h4" sx={{ fontSize: "1.25rem", color: "text.primary", mb: 2 }}>
                  You know the person.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 5, lineHeight: 1.75 }}>
                  Name and address is enough. We run a four-tier agent pipeline
                  and return everything: verified phones, email, employer, property,
                  legal history, relatives, and more.
                </Typography>

                {/* Flow */}
                {[
                  { label: "Input", value: "Name + address (or LinkedIn URL)" },
                  { label: "Process", value: "Up to 4 enrichment tiers, async" },
                  { label: "Output", value: "Full personal profile — verified contact, employment, legal, assets" },
                ].map((row, i) => (
                  <Box key={row.label} sx={{ display: "flex", gap: 2, mb: i < 2 ? 0 : 0 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0, pt: "3px" }}>
                      <Box sx={{ width: 6, height: 6, border: "1px solid", borderColor: "primary.main", flexShrink: 0 }} />
                      {i < 2 && <Box sx={{ width: 1, flex: 1, bgcolor: "rgba(79,125,247,0.2)", my: 0.5, minHeight: 28 }} />}
                    </Box>
                    <Box sx={{ pb: i < 2 ? 3 : 0 }}>
                      <Typography sx={{ fontSize: "0.6875rem", color: "primary.main", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, mb: 0.5 }}>
                        {row.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                        {row.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid rgba(232,236,244,0.06)" }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(232,236,244,0.3)" }}>
                    POST /api/v1/enrich
                  </Typography>
                </Box>
              </Box>
            </AnimateIn>
          </Grid>

          {/* Path 2: Company */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.2}>
              <Box
                sx={{
                  border: "1px solid rgba(79,125,247,0.3)",
                  bgcolor: "rgba(79,125,247,0.03)",
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  position: "relative",
                }}
              >
                <Chip
                  label="Company pipeline"
                  size="small"
                  sx={{
                    bgcolor: "rgba(79,125,247,0.12)",
                    color: "primary.main",
                    fontSize: "0.6875rem",
                    height: 20,
                    borderRadius: 0,
                    mb: 4,
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                />
                <Typography variant="h4" sx={{ fontSize: "1.25rem", color: "text.primary", mb: 2 }}>
                  You know the company.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 5, lineHeight: 1.75 }}>
                  Give us a company name and we handle the rest. We identify
                  the key contacts — by role, seniority, or department — then
                  enrich every one of them in the same job. One call, whole
                  leadership team, ready to dial.
                </Typography>

                {/* Flow */}
                {[
                  { label: "Input", value: "Company name (and optional domain, roles, seniority)" },
                  { label: "Expand", value: "Identify CEO, CFO, owners, and key contacts with titles and LinkedIn" },
                  { label: "Enrich", value: "Full profile on each contact: direct phone, email, address, legal, assets" },
                  { label: "Output", value: "Structured JSON — entire leadership team, ready for your CRM or workflow" },
                ].map((row, i) => (
                  <Box key={row.label} sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0, pt: "3px" }}>
                      <Box sx={{ width: 6, height: 6, bgcolor: "primary.main", flexShrink: 0 }} />
                      {i < 3 && <Box sx={{ width: 1, flex: 1, bgcolor: "rgba(79,125,247,0.35)", my: 0.5, minHeight: 28 }} />}
                    </Box>
                    <Box sx={{ pb: i < 3 ? 3 : 0 }}>
                      <Typography sx={{ fontSize: "0.6875rem", color: "primary.main", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, mb: 0.5 }}>
                        {row.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                        {row.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid rgba(79,125,247,0.12)" }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(79,125,247,0.5)" }}>
                    POST /api/v1/expand/company/enrich
                  </Typography>
                </Box>
              </Box>
            </AnimateIn>
          </Grid>
        </Grid>
      </Container>
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
            Example — PE deal teams
          </Typography>
        </AnimateIn>

        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ mb: { xs: 8, md: 10 } }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AnimateIn delay={0.1} blur>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary" }}
              >
                How PE firms
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  run this workflow
                </Box>
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Private equity is one vertical where all three operations show
                up across the deal cycle. Deal sourcing, diligence, compliance,
                and post-close recovery each map to a different pipeline. The
                same API, different starting points.
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
            Three tiers. Pick
            <br />
            <Box component="span" sx={{ color: "text.secondary" }}>
              what you need.
            </Box>
          </Typography>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: { xs: 8, md: 12 }, maxWidth: 560 }}>
            Each tier discovers a specific set of fields. If you&apos;ve already
            found what you need, skip to the next deal. Set <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.9em" }}>max_tier</Box> to 1 for quick checks, or 3 for full background on high-stakes targets.
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
                Structured data.
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  No parsing.
                </Box>
              </Typography>
            </AnimateIn>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateIn delay={0.2}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                JSON response. Every field is typed and nullable. Missing data
                comes back as{" "}
                <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.9em" }}>null</Box>.
                Arrays return empty if nothing was found. Load directly into your
                CRM, Salesforce, or deal tracking system. No transformation
                layer needed.
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
                All POST start endpoints return 202 Accepted with job_id. Poll GET
                until status is terminal. Max 10 concurrent jobs. Completed, failed,
                and cancelled jobs purged after 24 hours.
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
                        POST /api/v1/enrich or /api/v1/trace
                      </Typography>
                      <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", fontSize: "0.8125rem", whiteSpace: "pre" }}>
{`{
  "name": "Jane Doe",
  "address": "123 Main St, Detroit, MI",
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
                { href: "#api-concurrency", label: "HTTP behavior & limits" },
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
            All <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>/api/v1/*</Box> requests require header <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>X-API-Key: &lt;your-api-key&gt;</Box>. Use <Box component="code" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85em" }}>Content-Type: application/json</Box> for all POST bodies. Missing or invalid key returns 401 Unauthorized. <Box component="code" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85em" }}>GET /health</Box> does not require authentication.
          </Typography>
          <Box sx={codeBlockSx}>
            <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mb: 0.5 }}>Headers</Typography>
            <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>X-API-Key: &lt;your-api-key&gt;\nContent-Type: application/json</Typography>
            <Divider sx={{ my: 2, borderColor: "rgba(79,125,247,0.12)" }} />
            <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>401 — Missing or invalid key</Typography>
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

          {/* POST /api/v1/enrich or /api/v1/trace */}
          <Box sx={{ mb: 6 }}>
            <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/enrich</Typography>
            <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.9rem", mx: 1 }}>or</Typography>
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>
              Enrich person: name + address (skip trace) or name + LinkedIn. Returns full profile (phones, employment, relatives, property, legal, etc.). Four-tier agent; max_tier 1–4 controls depth. Dedup: same name+address or name+linkedin_url returns existing job_id.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.8rem" }}>Request body:</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre", fontSize: "0.75rem" }}>{`{
  "name": "string",           // required
  "address": "string",         // optional; use for skip trace
  "max_tier": 1,               // optional; 1–4, default 1
  "date_of_birth": "string",   // optional
  "known_phone": "string",     // optional
  "ssn_last_four": "string",   // optional
  "linkedin_url": "string",    // optional; use when no address
  "employer": "string"         // optional
}`}</Typography>
            </Box>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>202 Accepted</Typography>
              <Typography sx={{ color: "#4F7DF7", fontFamily: "monospace", whiteSpace: "pre" }}>{`{
  "job_id": "a3f9c21b04d7",
  "status": "queued"
}`}</Typography>
            </Box>
          </Box>

          {/* GET /api/v1/jobs/{job_id} or /api/v1/trace/{job_id} */}
          <Box sx={{ mb: 6 }}>
            <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs/{`{job_id}`}</Typography>
            <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.9rem", mx: 1 }}>or</Typography>
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace/{`{job_id}`}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>Poll until status is completed, failed, or cancelled. For enrich: job_type is &quot;trace&quot;; result is in &quot;result&quot; (EntityFindingResult).</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — enrich completed</Typography>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", fontSize: "0.7rem", whiteSpace: "pre" }}>{`{
  "job_id": "a3f9c21b04d7",
  "job_type": "trace",
  "status": "completed",
  "debtor": { "name": "...", "address": "...", "max_tier": 1 },
  "created_at": "2026-03-08T14:00:00Z",
  "completed_at": "2026-03-08T14:04:32Z",
  "total_steps": 87,
  "cost_usd": 0.42,
  "result": { ... },
  "error": null
}`}</Typography>
              <Divider sx={{ my: 2, borderColor: "rgba(79,125,247,0.12)" }} />
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — running / queued (result null)</Typography>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>404 — job_id not found</Typography>
            </Box>
          </Box>

          {/* DELETE /api/v1/jobs/{job_id} or /api/v1/trace/{job_id} */}
          <Box sx={{ mb: 6 }}>
            <Chip label="DELETE" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs/{`{job_id}`}</Typography>
            <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.9rem", mx: 1 }}>or</Typography>
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace/{`{job_id}`}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>
              Cancel trace or expand job. Only queued or running. Response 202. Poll to confirm &quot;cancelled&quot; and get partial result. 409 if job already completed/failed/cancelled.
            </Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>202 — cancellation requested</Typography>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 1 }}>404 — job_id not found | 409 — job already terminal</Typography>
            </Box>
          </Box>

          {/* POST /api/v1/expand/company */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontSize: "0.95rem", mt: 4, mb: 2 }}>Expand Company</Typography>
            <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/expand/company</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>
              Company name (and optional domain) to list of key contacts and company signals. No person enrichment. Dedup: same company name returns existing job_id.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.8rem" }}>Request body:</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre", fontSize: "0.75rem" }}>{`{
  "company": { "name": "string", "domain": "string" },
  "limit": 10,
  "roles": ["CEO"],
  "seniority": ["c_suite", "vp", "director", "manager"],
  "department": "string"
}`}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>limit: 1–50, default 10. Poll GET /api/v1/jobs/{`{job_id}`}. job_type &quot;expand_company&quot;; result in &quot;expand_result&quot;: company_name, contacts_found, contacts[], signals (email_pattern, office_locations, registered_agent, etc.).</Typography>
          </Box>

          {/* POST /api/v1/expand/company/enrich — pipeline */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontSize: "0.95rem", mt: 4, mb: 2 }}>Expand + Enrich (pipeline)</Typography>
            <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/expand/company/enrich</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>
              Company to contacts (expand) then enrich each contact in one job. One POST, one job_id. Body: company, limit, roles, seniority, department, enrich {`{ "max_tier": 1 }`} (optional, 1–4 per contact).
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.8rem" }}>Poll</Typography>
            <Typography component="span" sx={{ fontFamily: "monospace", color: "primary.main", fontSize: "0.9rem" }}> GET /api/v1/expand/company/enrich/{`{job_id}`}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}> until status completed, failed, or cancelled. Pipeline statuses: queued | expanding | enriching | completed | failed | cancelled. Cancel: DELETE /api/v1/expand/company/enrich/{`{job_id}`}. List all pipeline jobs: GET /api/v1/expand/company/enrich.</Typography>
          </Box>

          {/* GET /api/v1/jobs */}
          <Box sx={{ mb: 6 }}>
            <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>List all jobs (trace and expand_company). Does not include pipeline jobs.</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — Array of Job</Typography>
            </Box>
          </Box>

          {/* GET /api/v1/usage */}
          <Box sx={{ mb: 4 }}>
            <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600, mr: 1, mb: 1 }} />
            <Typography component="span" sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/usage</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>Usage for the current API key. Returns key_id, first_seen, total_cost_usd, total_steps, job_count, jobs[] (JobRecord).</Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — UsageResponse</Typography>
            </Box>
          </Box>
        </Box>

        {/* Data Models */}
        <Box id="api-models" sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
            Data Models
          </Typography>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Enrich request body (POST /enrich or /trace)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>name</td><td>string</td><td>Required</td></tr>
              <tr><td>address</td><td>string</td><td>Optional; use for skip trace</td></tr>
              <tr><td>max_tier</td><td>integer</td><td>1–4, default 1</td></tr>
              <tr><td>date_of_birth</td><td>string</td><td>Optional</td></tr>
              <tr><td>known_phone</td><td>string</td><td>Optional</td></tr>
              <tr><td>ssn_last_four</td><td>string</td><td>Optional</td></tr>
              <tr><td>linkedin_url</td><td>string</td><td>Optional; use when no address (e.g. from expand)</td></tr>
              <tr><td>employer</td><td>string</td><td>Optional</td></tr>
            </tbody>
          </Box>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Response (POST enrich/trace, DELETE job)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th></tr></thead>
            <tbody>
              <tr><td>job_id</td><td>string</td></tr>
              <tr><td>status</td><td>queued | running | completed | failed | cancelled</td></tr>
            </tbody>
          </Box>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Job (GET jobs/{`{job_id}`}, GET trace/{`{job_id}`}, GET jobs)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Field</th><th>Type</th></tr></thead>
            <tbody>
              <tr><td>job_id</td><td>string</td></tr>
              <tr><td>job_type</td><td>&quot;trace&quot; | &quot;expand_company&quot;</td></tr>
              <tr><td>status</td><td>queued | running | completed | failed | cancelled</td></tr>
              <tr><td>debtor</td><td>input (enrich only)</td></tr>
              <tr><td>created_at</td><td>datetime (UTC)</td></tr>
              <tr><td>completed_at</td><td>datetime | null</td></tr>
              <tr><td>total_steps</td><td>integer | null</td></tr>
              <tr><td>cost_usd</td><td>number | null</td></tr>
              <tr><td>result</td><td>EntityFindingResult | null (enrich)</td></tr>
              <tr><td>expand_result</td><td>expand result | null (expand_company)</td></tr>
              <tr><td>error</td><td>string | null</td></tr>
            </tbody>
          </Box>

          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Entity Finding Result (enrich result schema)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 2, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Category</th><th>Fields</th></tr></thead>
            <tbody>
              <tr><td>Identity</td><td>full_legal_name, aliases[], date_of_birth, age, deceased{`{}`}</td></tr>
              <tr><td>Contact</td><td>phone_numbers[], current_address{`{}`}, previous_addresses[], email_addresses[]</td></tr>
              <tr><td>Employment</td><td>employment{`{}`}, linkedin_url</td></tr>
              <tr><td>Household</td><td>spouse_partner{`{}`}, relatives[], co_habitants[]</td></tr>
              <tr><td>Assets</td><td>property_ownership{`{}`}, homeowner_or_renter, vehicles[]</td></tr>
              <tr><td>Legal</td><td>bankruptcy{`{}`}, civil_judgments_liens[], court_cases[], ucc_filings[], professional_licenses[]</td></tr>
              <tr><td>Social</td><td>facebook_url, linkedin_url, social_media_profiles[]</td></tr>
              <tr><td>Other</td><td>voter_registration_address, estimated_income_range, ssn_last_four, data_quality_score (0–100)</td></tr>
            </tbody>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
            Nested types: PhoneNumber (number, phone_type, carrier, is_verified), Address (street, city, state, zip_code), EmploymentInfo, RelativeInfo, etc. Optional fields may be null/empty; only found data is returned.
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
            HTTP behavior & limits
          </Typography>
          <Stack spacing={1} sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
            <Typography variant="body2">• All POST start endpoints return 202 Accepted with job_id; work is async. Poll GET until status is terminal.</Typography>
            <Typography variant="body2">• <strong>404:</strong> job_id not found.</Typography>
            <Typography variant="body2">• <strong>409:</strong> cancel requested but job already completed/failed/cancelled.</Typography>
            <Typography variant="body2">• <strong>Max concurrency:</strong> 10 concurrent jobs (server-side); additional requests queue.</Typography>
            <Typography variant="body2">• <strong>Persistence:</strong> Jobs (and pipeline jobs) are in-memory; completed/failed/cancelled purged after 24 hours.</Typography>
          </Stack>
        </Box>

        {/* Known Issues & Optimizations */}
        <Box id="api-optimizations">
          <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
            Known Issues & Optimizations
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>Tiers (enrich)</Typography>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 4, "& th, & td": { border: "1px solid rgba(232,236,244,0.1)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600 } }}>
            <thead><tr><th>Tier</th><th>max_tier</th><th>Finds</th></tr></thead>
            <tbody>
              <tr><td>Tier 1</td><td>1 (default)</td><td>Name, phones, email, address, DOB, bankruptcy, deceased</td></tr>
              <tr><td>Tier 2</td><td>2</td><td>Employer, job title, work phone, aliases, previous addresses</td></tr>
              <tr><td>Tier 3</td><td>3</td><td>Spouse, co-habitants, property, judgments, licenses, voter reg, Facebook, income</td></tr>
              <tr><td>Tier 4</td><td>4</td><td>Full depth; all tiers</td></tr>
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
              Ready to source{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                faster?
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 6, maxWidth: 540 }}
            >
              Entity Finder is available to PE deal teams and operators. Standard
              pricing for sourcing workflows, custom pricing for high-volume
              compliance screening. Email to discuss your use case and get
              started.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                href="mailto:allen@landexsystems.com?subject=Entity Finder API Access"
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
      <ThreeOperations />
      <UseCases />
      <CompanyPipeline />
      <PEUseCases />
      <TierPipeline />
      <DataPointsGrid />
      <ApiFlow />
      <ApiReference />
      <EntityFinderCTA />
    </>
  );
}
