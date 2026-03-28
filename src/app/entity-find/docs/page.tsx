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
import { motion } from "framer-motion";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import StaggerContainer, { staggerItemLeft, staggerItemRight } from "@/components/StaggerContainer";
import Navbar from "@/components/Navbar";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const apiSteps = [
  { step: "01", action: "POST /api/v1/enrich", detail: "Submit name + address (or company name for the pipeline). Receive a job_id in under 100ms." },
  { step: "02", action: "Job runs asynchronously", detail: "Agent pipeline executes up to 4 tiers per person. Company pipeline expands contacts first, then enriches each one. No blocking." },
  { step: "03", action: "GET /api/v1/jobs/{job_id}", detail: "Poll for status. When completed, retrieve a fully structured JSON result." },
  { step: "04", action: "Structured result object", detail: "Every field is typed and nullable. Plug directly into your CRM, data warehouse, or workflow." },
];

const codeBlockSx = {
  bgcolor: "rgba(6,9,26,0.8)",
  border: "1px solid rgba(79,125,247,0.15)",
  p: 2,
  fontFamily: "monospace",
  fontSize: "0.8125rem",
  overflow: "auto",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function EntityFinderDocsPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Navbar />

      {/* Header */}
      <Box sx={{ pt: { xs: 16, md: 20 }, pb: { xs: 8, md: 12 }, bgcolor: "#06091A" }}>
        <Container maxWidth="lg">
          <AnimateIn blur>
            <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block", letterSpacing: "0.15em" }}>
              Entity Finder
            </Typography>
          </AnimateIn>
          <AnimateIn delay={0.1} blur>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, color: "text.primary", mb: 3 }}>
              API Documentation
            </Typography>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 560, mb: 5 }}>
              Full reference for the Entity Finder API. Endpoints, data models,
              job lifecycle, and integration notes.
            </Typography>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                href="mailto:allen@landexsystems.com?subject=Entity Finder API Access"
                sx={{ px: 4, py: 1.5 }}
              >
                Request API Access
              </Button>
              <Button
                variant="outlined"
                href="/entity-find"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.secondary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                ← Back to Entity Finder
              </Button>
            </Stack>
          </AnimateIn>
        </Container>
      </Box>

      {/* Integration overview */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#080C1E" }}>
        <Container maxWidth="lg">
          <AnimateIn blur>
            <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
              Integration
            </Typography>
          </AnimateIn>

          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <AnimateIn delay={0.1} blur>
                <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, color: "text.primary", mb: 4 }}>
                  Submit. Poll.
                  <br />
                  <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                    Done.
                  </Box>
                </Typography>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
                  All POST start endpoints return 202 Accepted with a
                  job_id. Poll GET until status is terminal. Max 10
                  concurrent jobs. Completed, failed, and cancelled jobs
                  purged after 24 hours.
                </Typography>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <Box sx={{ bgcolor: "rgba(6,9,26,0.8)", border: "1px solid rgba(79,125,247,0.15)", p: 3 }}>
                  <Typography sx={{ color: "rgba(232,236,244,0.4)", mb: 1, fontSize: "0.75rem", fontFamily: "monospace" }}>
                    POST /api/v1/enrich
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

      {/* API Reference */}
      <Box id="api-reference" sx={{ py: { xs: 10, md: 16 }, bgcolor: "#06091A" }}>
        <Container maxWidth="lg">
          <AnimateIn blur>
            <Typography variant="overline" sx={{ color: "primary.main", mb: 3, display: "block" }}>
              API Reference
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, color: "text.primary", mb: 4 }}>
              Endpoints &amp; Models
            </Typography>
          </AnimateIn>

          {/* Table of Contents */}
          <AnimateIn delay={0.1}>
            <Box sx={{ mb: 10, p: 3, border: "1px solid rgba(232,236,244,0.06)", bgcolor: "rgba(255,255,255,0.01)" }}>
              <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.7rem", letterSpacing: "0.12em", mb: 2 }}>
                Contents
              </Typography>
              <Stack component="nav" direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.5, sm: 3 }} flexWrap="wrap">
                {[
                  { href: "#api-auth", label: "Authentication" },
                  { href: "#api-endpoints", label: "Endpoints" },
                  { href: "#api-models", label: "Data Models" },
                  { href: "#api-lifecycle", label: "Job Lifecycle" },
                  { href: "#api-limits", label: "Limits" },
                  { href: "#api-optimizations", label: "Optimizations" },
                ].map(({ href, label }) => (
                  <Typography
                    key={href}
                    component="a"
                    href={href}
                    sx={{ color: "primary.main", fontSize: "0.875rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {label}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </AnimateIn>

          {/* Authentication */}
          <Box id="api-auth" sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
              Authentication
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              All{" "}
              <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>/api/v1/*</Box>{" "}
              requests require header{" "}
              <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>X-API-Key: &lt;your-api-key&gt;</Box>.
              Use{" "}
              <Box component="code" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85em" }}>Content-Type: application/json</Box>{" "}
              for all POST bodies. Missing or invalid key returns 401.{" "}
              <Box component="code" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85em" }}>GET /health</Box>{" "}
              does not require authentication.
            </Typography>
            <Box sx={codeBlockSx}>
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mb: 0.5 }}>Headers</Typography>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{"X-API-Key: <your-api-key>\nContent-Type: application/json"}</Typography>
              <Divider sx={{ my: 2, borderColor: "rgba(79,125,247,0.12)" }} />
              <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>401 — Missing or invalid key</Typography>
              <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{`{ "detail": "Invalid or missing API key" }`}</Typography>
            </Box>
          </Box>

          {/* Endpoints */}
          <Box id="api-endpoints" sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 5 }}>
              Endpoints
            </Typography>

            {/* GET /health */}
            <Box sx={{ mb: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/health</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>Server status. No authentication required.</Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200</Typography>
                <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre" }}>{`{ "status": "ok" }`}</Typography>
              </Box>
            </Box>

            {/* POST /api/v1/enrich */}
            <Box sx={{ mb: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 1 }}>
                <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/enrich</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>or</Typography>
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
                Enrich a person by name + address (skip trace) or name + LinkedIn URL. Returns a full profile including phones, employment, relatives, property, legal history, and more. Four-tier agent; <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>max_tier</Box> 1–4 controls depth. Deduplication: same name+address or name+linkedin_url returns an existing job_id.
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.8rem" }}>Request body</Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre", fontSize: "0.75rem" }}>{`{
  "name": "string",           // required
  "address": "string",        // optional; use for skip trace
  "max_tier": 1,              // optional; 1–4, default 1
  "date_of_birth": "string",  // optional
  "known_phone": "string",    // optional
  "ssn_last_four": "string",  // optional
  "linkedin_url": "string",   // optional; use when no address
  "employer": "string"        // optional
}`}</Typography>
              </Box>
              <Box sx={{ ...codeBlockSx, mt: 1 }}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>202 Accepted</Typography>
                <Typography sx={{ color: "#4F7DF7", fontFamily: "monospace", whiteSpace: "pre" }}>{`{
  "job_id": "a3f9c21b04d7",
  "status": "queued"
}`}</Typography>
              </Box>
            </Box>

            {/* GET /api/v1/jobs/{job_id} */}
            <Box sx={{ mb: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 1 }}>
                <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs/{`{job_id}`}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>or</Typography>
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace/{`{job_id}`}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
                Poll until status is <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>completed</Box>, <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>failed</Box>, or <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>cancelled</Box>. For enrich jobs, job_type is <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>"trace"</Box>; result is in <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>result</Box> (EntityFindingResult).
              </Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — completed</Typography>
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
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — running / queued (result is null)</Typography>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 0.5 }}>404 — job_id not found</Typography>
              </Box>
            </Box>

            {/* DELETE /api/v1/jobs/{job_id} */}
            <Box sx={{ mb: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 1 }}>
                <Chip label="DELETE" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs/{`{job_id}`}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>or</Typography>
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/trace/{`{job_id}`}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
                Cancel a queued or running job. Returns 202. Poll to confirm <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>cancelled</Box> and retrieve any partial result. Returns 409 if the job is already terminal.
              </Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>202 — cancellation requested</Typography>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 0.5 }}>404 — job_id not found &nbsp;|&nbsp; 409 — job already terminal</Typography>
              </Box>
            </Box>

            {/* POST /api/v1/expand/company */}
            <Box sx={{ mb: 8 }}>
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: "0.875rem", mb: 2 }}>Expand Company</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/expand/company</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
                Resolve a company name (and optional domain) to a list of key contacts and company-level signals. Does not enrich contacts. Deduplication: same company name returns existing job_id.
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.8rem" }}>Request body</Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "#E8ECF4", fontFamily: "monospace", whiteSpace: "pre", fontSize: "0.75rem" }}>{`{
  "company": { "name": "string", "domain": "string" },
  "limit": 10,
  "roles": ["CEO"],
  "seniority": ["c_suite", "vp", "director", "manager"],
  "department": "string"
}`}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", mt: 1.5 }}>
                <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>limit</Box>: 1–50, default 10. Poll <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>GET /api/v1/jobs/{`{job_id}`}</Box>. Result in <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>expand_result</Box>: company_name, contacts_found, contacts[], and signals (email_pattern, office_locations, registered_agent, etc.).
              </Typography>
            </Box>

            {/* POST /api/v1/expand/company/enrich */}
            <Box sx={{ mb: 8 }}>
              <Typography variant="h6" sx={{ color: "primary.main", fontSize: "0.875rem", mb: 2 }}>Expand + Enrich Pipeline</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip label="POST" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/expand/company/enrich</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
                Company name to contacts (expand) then enrich each contact in a single job. One POST, one job_id. Body: company, limit, roles, seniority, department, and an optional <Box component="code" sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "0.85em" }}>enrich: {`{ "max_tier": 1 }`}</Box> block (1–4 per contact).
              </Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>Poll: GET /api/v1/expand/company/enrich/{`{job_id}`}</Typography>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 0.5 }}>Statuses: queued | expanding | enriching | completed | failed | cancelled</Typography>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 0.5 }}>Cancel: DELETE /api/v1/expand/company/enrich/{`{job_id}`}</Typography>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace", mt: 0.5 }}>List all: GET /api/v1/expand/company/enrich</Typography>
              </Box>
            </Box>

            {/* GET /api/v1/jobs */}
            <Box sx={{ mb: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/jobs</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>List all trace and expand_company jobs. Does not include pipeline jobs.</Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — Array of Job</Typography>
              </Box>
            </Box>

            {/* GET /api/v1/usage */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip label="GET" size="small" sx={{ bgcolor: "rgba(79,125,247,0.2)", color: "primary.main", fontWeight: 600 }} />
                <Typography sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.95rem" }}>/api/v1/usage</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 2 }}>Usage for the current API key. Returns key_id, first_seen, total_cost_usd, total_steps, job_count, and jobs[] (JobRecord).</Typography>
              <Box sx={codeBlockSx}>
                <Typography sx={{ color: "rgba(232,236,244,0.5)", fontSize: "0.75rem", fontFamily: "monospace" }}>200 — UsageResponse</Typography>
              </Box>
            </Box>
          </Box>

          {/* Data Models */}
          <Box id="api-models" sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 5 }}>
              Data Models
            </Typography>

            <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.8rem", letterSpacing: "0.1em", mb: 2 }}>Enrich request body</Typography>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 6, "& th, & td": { border: "1px solid rgba(232,236,244,0.08)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600, bgcolor: "rgba(79,125,247,0.04)" } }}>
              <thead><tr><th>Field</th><th>Type</th><th>Notes</th></tr></thead>
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

            <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.8rem", letterSpacing: "0.1em", mb: 2 }}>Job object</Typography>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 6, "& th, & td": { border: "1px solid rgba(232,236,244,0.08)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600, bgcolor: "rgba(79,125,247,0.04)" } }}>
              <thead><tr><th>Field</th><th>Type</th></tr></thead>
              <tbody>
                <tr><td>job_id</td><td>string</td></tr>
                <tr><td>job_type</td><td>"trace" | "expand_company"</td></tr>
                <tr><td>status</td><td>queued | running | completed | failed | cancelled</td></tr>
                <tr><td>debtor</td><td>input params (enrich only)</td></tr>
                <tr><td>created_at</td><td>datetime (UTC)</td></tr>
                <tr><td>completed_at</td><td>datetime | null</td></tr>
                <tr><td>total_steps</td><td>integer | null</td></tr>
                <tr><td>cost_usd</td><td>number | null</td></tr>
                <tr><td>result</td><td>EntityFindingResult | null</td></tr>
                <tr><td>expand_result</td><td>expand result | null</td></tr>
                <tr><td>error</td><td>string | null</td></tr>
              </tbody>
            </Box>

            <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "0.8rem", letterSpacing: "0.1em", mb: 2 }}>EntityFindingResult</Typography>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 3, "& th, & td": { border: "1px solid rgba(232,236,244,0.08)", p: 1.5, textAlign: "left", fontSize: "0.8125rem" }, "& th": { color: "primary.main", fontWeight: 600, bgcolor: "rgba(79,125,247,0.04)" } }}>
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
              Nested types: PhoneNumber (number, phone_type, carrier, is_verified), Address (street, city, state, zip_code), EmploymentInfo, RelativeInfo, etc. All fields nullable; only found data is returned.
            </Typography>
          </Box>

          {/* Job Lifecycle */}
          <Box id="api-lifecycle" sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
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

          {/* Limits */}
          <Box id="api-limits" sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
              Limits
            </Typography>
            <Stack spacing={1}>
              {[
                "All POST endpoints return 202 Accepted with job_id. Work is async — poll GET until status is terminal.",
                "404: job_id not found.",
                "409: cancel requested on a job that is already completed, failed, or cancelled.",
                "Max concurrency: 10 concurrent jobs server-side. Additional requests queue.",
                "Persistence: jobs are in-memory. Completed, failed, and cancelled jobs purged after 24 hours.",
              ].map((line) => (
                <Typography key={line} variant="body2" sx={{ color: "text.secondary" }}>• {line}</Typography>
              ))}
            </Stack>
          </Box>

          {/* Optimizations */}
          <Box id="api-optimizations">
            <Typography variant="h4" sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3 }}>
              Optimizations
            </Typography>
            <Stack spacing={1}>
              {[
                "Deduplication: same name+address (or name+linkedin_url) returns the existing job_id. No duplicate pipeline runs.",
                "Cancel early: DELETE /api/v1/trace/{job_id} returns 202. Poll until cancelled and use the partial result.",
                "Tier control: max_tier defaults to 1. Set higher only when you need deeper fields.",
                "Later tiers skip re-verifying fields already found in earlier tiers.",
              ].map((line) => (
                <Typography key={line} variant="body2" sx={{ color: "text.secondary" }}>• {line}</Typography>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: "#06091A" }}>
        <Container maxWidth="lg">
          <AnimateIn blur>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "text.primary", mb: 3 }}>
              Ready to integrate?
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, maxWidth: 480 }}>
              Email to get an API key and start testing. We can walk you through
              the first integration or answer any questions.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                href="mailto:allen@landexsystems.com?subject=Entity Finder API Access"
                sx={{ px: 5, py: 1.75 }}
              >
                Request API Access
              </Button>
              <Button
                variant="outlined"
                href="/entity-find"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.secondary",
                  "&:hover": { borderColor: "rgba(232,236,244,0.3)", bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                ← Back to Entity Finder
              </Button>
            </Stack>
          </AnimateIn>
        </Container>
      </Box>
    </>
  );
}
