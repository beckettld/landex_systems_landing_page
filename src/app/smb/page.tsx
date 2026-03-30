"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AnimateIn from "@/components/AnimateIn";
import StaggerContainer, { staggerItem } from "@/components/StaggerContainer";

const CALENDLY = "https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo";

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

function SmbNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? "rgba(6,9,26,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(232,236,244,0.06)"
          : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: "space-between" }}
        >
          <Box
            component="a"
            href="/"
            sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
          >
            <Box sx={{ width: 8, height: 8, bgcolor: "primary.main", transform: "rotate(45deg)" }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "text.primary",
              }}
            >
              Landex Systems
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            {[
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
            ].map((item) => (
              <Button
                key={item.label}
                component="a"
                href={item.href}
                size="small"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.8125rem",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="small"
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                ml: 1,
                borderColor: "rgba(232,236,244,0.15)",
                color: "text.primary",
                px: 3,
                py: 1,
                fontSize: "0.8125rem",
                "&:hover": { borderColor: "primary.main", bgcolor: "rgba(79,125,247,0.06)" },
              }}
            >
              Book a Free Audit
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

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
          background: "linear-gradient(180deg, rgba(6,9,26,0.3) 0%, rgba(6,9,26,0.15) 50%, rgba(6,9,26,0.6) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ maxWidth: 860, pt: { xs: 12, md: 0 } }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="overline"
              sx={{ color: "primary.main", mb: 4, display: "block", letterSpacing: "0.15em" }}
            >
              Built for small business owners who are tired of doing it all manually
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
                fontSize: { xs: "2.5rem", sm: "3.25rem", md: "4.25rem", lg: "4.75rem" },
                color: "text.primary",
                mb: 5,
                lineHeight: 1.1,
              }}
            >
              You didn&apos;t start your business to spend half your week{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                on admin.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", maxWidth: 580, mb: 7, fontSize: { xs: "1rem", md: "1.125rem" }, lineHeight: 1.8 }}
            >
              We build AI automations that handle the repetitive work, so you can get back to the work that actually matters.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
              <Button
                variant="contained"
                color="primary"
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Book your free 30-minute AI Audit →
              </Button>
              <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.6, fontSize: "0.8125rem" }}>
                Start here. It&apos;s free.
              </Typography>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Audit Section
// ─────────────────────────────────────────────────────────────────────────────

const auditPoints = [
  "You walk us through a typical week",
  "We identify your biggest time drains",
  "We tell you what we'd automate and why",
  "You get a clear scope and an honest price. Or we tell you it's not the right fit.",
];

function AuditSection() {
  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Free 30-Minute AI Ops Audit
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 5, maxWidth: 720 }}
          >
            We sit down with you and look at how your business actually runs.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mb: 6, lineHeight: 1.85 }}>
            Where time gets lost. What&apos;s repetitive. What&apos;s falling through the cracks.
            By the end of the call you&apos;ll know exactly where AI could help your business
            and what it would cost to fix it. No pitch. No pressure. Just honest advice from
            people who understand both the technology and how real businesses operate.
          </Typography>
        </AnimateIn>

        <AnimateIn delay={0.1} blur>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 4, fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5 }}
          >
            What happens on the call
          </Typography>
          <Stack spacing={0} sx={{ mb: 8, maxWidth: 600 }}>
            {auditPoints.map((point, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "flex-start",
                  py: 3,
                  borderTop: "1px solid rgba(232,236,244,0.06)",
                  "&:last-child": { borderBottom: "1px solid rgba(232,236,244,0.06)" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: "1.0rem",
                    color: "rgba(79,125,247,0.45)",
                    lineHeight: 1,
                    mt: "3px",
                    flexShrink: 0,
                    minWidth: 28,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.75 }}>
                  {point}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box
            sx={{
              mb: 3,
              px: 3,
              py: 2.5,
              borderLeft: "2px solid",
              borderColor: "primary.main",
              bgcolor: "rgba(79,125,247,0.05)",
              maxWidth: 480,
            }}
          >
            <Typography variant="body2" sx={{ color: "primary.main", fontSize: "0.9375rem", lineHeight: 1.7 }}>
              Thirty minutes. Completely free. No obligation.
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
          >
            Book your free audit →
          </Button>
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Automation Section
// ─────────────────────────────────────────────────────────────────────────────

const automationBuilds = [
  "Lead follow-up that responds to new inquiries within 90 seconds, day or night",
  "Email drafting that surfaces ready-to-send replies before you open your inbox",
  "Appointment and scheduling workflows that book, confirm, and remind automatically",
  "Invoice and payment confirmations that send themselves",
  "Weekly social content generated from a single spreadsheet you fill in once",
  "CRM pipelines that populate themselves from form submissions and calls",
];

const automationSteps = [
  {
    num: "01",
    title: "We run the free audit to scope exactly what to build",
    body: null,
  },
  {
    num: "02",
    title: "We build it in your accounts. You own it from day one.",
    body: null,
  },
  {
    num: "03",
    title: "We test it, walk you through it on a Loom video, and leave you a one-page reference doc",
    body: null,
  },
  {
    num: "04",
    title: "You're live within 3 business days",
    body: null,
  },
];

function AutomationSection() {
  return (
    <Box id="services" sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Already know you want it built?
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" }, color: "text.primary", mb: 5, maxWidth: 680 }}
          >
            Done-For-You AI Automation
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mb: 10, lineHeight: 1.85 }}>
            We build a custom automation that runs inside your existing tools: your email, your CRM,
            your calendar, whatever you already use. Built in 3 days. Owned by you forever.
            No monthly fees to us, no lock-in, no ongoing dependency.
          </Typography>
        </AnimateIn>

        <Box sx={{ display: { md: "grid" }, gridTemplateColumns: { md: "1fr 1fr" }, gap: { md: 12 } }}>
          <AnimateIn delay={0.05} blur>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 4, fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5 }}
            >
              What we typically build
            </Typography>
            <Stack spacing={0} sx={{ mb: { xs: 10, md: 0 } }}>
              {automationBuilds.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    gap: 2.5,
                    alignItems: "flex-start",
                    py: 2.5,
                    borderTop: "1px solid rgba(232,236,244,0.06)",
                    "&:last-child": { borderBottom: "1px solid rgba(232,236,244,0.06)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      bgcolor: "rgba(79,125,247,0.5)",
                      mt: "9px",
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.75, fontSize: "0.9375rem" }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </AnimateIn>

          <AnimateIn delay={0.1} blur>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 4, fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5 }}
            >
              How it works
            </Typography>
            <Stack spacing={0} sx={{ mb: 8 }}>
              {automationSteps.map((step, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-start",
                    py: 3,
                    borderTop: "1px solid rgba(232,236,244,0.06)",
                    "&:last-child": { borderBottom: "1px solid rgba(232,236,244,0.06)" },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontSize: "1.0rem",
                      color: "rgba(79,125,247,0.45)",
                      lineHeight: 1,
                      mt: "3px",
                      flexShrink: 0,
                      minWidth: 28,
                    }}
                  >
                    {step.num}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.75 }}>
                    {step.title}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                mb: 4,
                px: 3,
                py: 2.5,
                borderLeft: "2px solid",
                borderColor: "primary.main",
                bgcolor: "rgba(79,125,247,0.05)",
              }}
            >
              <Typography variant="body2" sx={{ color: "primary.main", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                Priced based on what you need. Most projects land between $500 and $2,500.
                We scope it together on the audit call so there are no surprises.
              </Typography>
            </Box>

            <Box
              sx={{
                mb: 6,
                px: 3,
                py: 2.5,
                borderLeft: "2px solid",
                borderColor: "rgba(232,236,244,0.2)",
                bgcolor: "rgba(232,236,244,0.03)",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                <Box component="span" sx={{ color: "text.primary", fontWeight: 500 }}>Our guarantee:</Box>{" "}
                If you&apos;re not satisfied with what we deliver, we&apos;ll keep working until you are —
                or we&apos;ll refund the full project fee. No questions asked.
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
            >
              Book the audit and let&apos;s scope it →
            </Button>
          </AnimateIn>
        </Box>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Other Services
// ─────────────────────────────────────────────────────────────────────────────

const otherServices = [
  {
    title: "Team AI Workshops",
    body: "Half-day or full-day training sessions to get your staff using AI tools effectively. Priced by team size, starting at $299.",
  },
  {
    title: "AI Readiness Audit",
    body: "A deeper look at everything AI could do across your business, delivered as a prioritized action plan. Starting at $299.",
  },
  {
    title: "Ongoing Advisory",
    body: "A monthly retainer if you want an AI expert in your corner on a regular basis.",
  },
  {
    title: "Content engines, chatbots, custom builds",
    body: "If you have a specific problem, chances are we can build something for it.",
  },
];

function OtherServices() {
  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Need something else?
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, color: "text.primary", mb: 4, maxWidth: 600 }}
          >
            Other ways we can help.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 8, maxWidth: 520, lineHeight: 1.8 }}>
            If automation isn&apos;t the right next step, we offer:
          </Typography>
        </AnimateIn>

        <StaggerContainer stagger={0.08} delay={0.1}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 0,
            }}
          >
            {otherServices.map((service, i) => (
              <motion.div key={service.title} variants={staggerItem}>
                <Box
                  sx={{
                    p: { xs: 4, md: 5 },
                    borderTop: "2px solid rgba(232,236,244,0.06)",
                    borderRight: {
                      xs: "none",
                      sm: i % 2 === 0 ? "1px solid rgba(232,236,244,0.06)" : "none",
                    },
                    borderBottom: "1px solid rgba(232,236,244,0.06)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "text.primary", fontSize: "1.0625rem", mb: 2, fontWeight: 400 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                    {service.body}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </StaggerContainer>

        <AnimateIn delay={0.2} blur>
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 8, maxWidth: 480, lineHeight: 1.8 }}>
            Just ask on the call. We&apos;ll point you in the right direction.
          </Typography>
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────────────────────

function About() {
  return (
    <Box id="about" sx={{ py: { xs: 12, md: 18 }, bgcolor: "#06091A" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Who we are
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, color: "text.primary", mb: 6, maxWidth: 600 }}
          >
            A small team that actually knows how small businesses run.
          </Typography>
          <Stack spacing={3} sx={{ maxWidth: 640 }}>
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.85 }}>
              We&apos;re MIT-trained engineers based in Massachusetts and North Carolina. We&apos;ve spent years working at the intersection of AI and real business operations — not in research labs, but in the messy, practical reality of how companies actually run.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.85 }}>
              We started this because we kept seeing the same thing: the tools to save small
              businesses enormous amounts of time exist, they&apos;re cheap, and most business
              owners have no idea. We fix that.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.85 }}>
              We work with local businesses first. We keep our client list small enough that every
              engagement gets real attention. And we don&apos;t build anything we wouldn&apos;t
              stake our reputation on.
            </Typography>
          </Stack>
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Do I need to be technical?",
    a: "Not at all. We handle everything. You'll get a plain-English walkthrough of what we built and how to use it.",
  },
  {
    q: "What tools do you use?",
    a: "We build primarily on Make.com, connected to OpenAI. Both run in your accounts. No proprietary tools, no vendor lock-in. Any developer can open it up later if you want changes.",
  },
  {
    q: "What if I want changes after delivery?",
    a: "We include 30 days of email support. After that, because it's built in standard tools, any developer can modify it, or we can quote a small update.",
  },
  {
    q: "Is this worth it for a small business?",
    a: "If an automation saves you 5 hours a week, that's 260 hours a year. At even $20 of your time per hour, that's $5,200 in value annually. Most clients earn the project back within 6–8 weeks.",
  },
  {
    q: "What if it's not a fit?",
    a: "We'll tell you on the call. Honestly. We'd rather refer you somewhere else than take a project that won't deliver real value.",
  },
];

function FAQ() {
  return (
    <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#080C1E" }}>
      <Container maxWidth="lg">
        <AnimateIn blur>
          <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
            Questions we get asked
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, color: "text.primary", mb: 10, maxWidth: 520 }}
          >
            Straight answers.
          </Typography>
        </AnimateIn>

        <StaggerContainer stagger={0.07} delay={0.1}>
          <Stack spacing={0}>
            {faqs.map((faq) => (
              <motion.div key={faq.q} variants={staggerItem}>
                <Box
                  sx={{
                    py: { xs: 4, md: 5 },
                    borderTop: "1px solid rgba(232,236,244,0.06)",
                    display: { md: "grid" },
                    gridTemplateColumns: { md: "2fr 3fr" },
                    gap: { md: 8 },
                    "&:last-child": { borderBottom: "1px solid rgba(232,236,244,0.06)" },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "text.primary", fontWeight: 400, mb: { xs: 2, md: 0 }, lineHeight: 1.6 }}
                  >
                    {faq.q}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.85 }}>
                    {faq.a}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </StaggerContainer>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────────────────────

function FinalCTA() {
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
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(79,125,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <AnimateIn blur>
          <Box sx={{ maxWidth: 680 }}>
            <Typography variant="overline" sx={{ color: "primary.main", mb: 4, display: "block" }}>
              Ready to get your time back?
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "2.25rem", md: "3.5rem", lg: "4rem" }, color: "text.primary", mb: 4, lineHeight: 1.1 }}
            >
              Book a free 30-minute{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                AI Ops Audit.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 8, maxWidth: 520, lineHeight: 1.85 }}>
              No pitch. No pressure. Just a straight conversation about your business
              and where AI fits. If it fits at all.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} sx={{ mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem" }}
              >
                Book your free call →
              </Button>
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem" }}>
                or email{" "}
                <Box
                  component="a"
                  href="mailto:allen@landexsystems.com"
                  sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  allen@landexsystems.com
                </Box>
              </Typography>
            </Stack>
            <Box
              sx={{
                mt: 5,
                pt: 4,
                borderTop: "1px solid rgba(232,236,244,0.08)",
                display: "flex",
                gap: { xs: 4, md: 6 },
                flexWrap: "wrap",
              }}
            >
              {["Free", "30 minutes", "Zoom or phone", "Satisfaction guaranteed"].map((tag) => (
                <Typography key={tag} variant="body2" sx={{ color: "text.secondary", fontSize: "0.8125rem", opacity: 0.5 }}>
                  {tag}
                </Typography>
              ))}
            </Box>
          </Box>
        </AnimateIn>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SmbPage() {
  return (
    <>
      <SmbNavbar />
      <Hero />
      <AuditSection />
      <AutomationSection />
      <OtherServices />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  );
}
