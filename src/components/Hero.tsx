"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (vantaEffect) return;

    let cancelled = false;

    async function initVanta() {
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

      if (!cancelled) {
        setVantaEffect(effect);
      }
    }

    initVanta();

    return () => {
      cancelled = true;
    };
  }, [vantaEffect]);

  useEffect(() => {
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
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
      {/* Vanta fog canvas */}
      <Box
        ref={vantaRef}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Slight overlay to ensure text readability */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(6,9,26,0.3) 0%, rgba(6,9,26,0.15) 50%, rgba(6,9,26,0.5) 100%)",
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
              sx={{
                color: "primary.main",
                mb: 4,
                display: "block",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
              }}
            >
              Build Working AI Systems for Your Portfolio
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
                fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.75rem", lg: "5.5rem" },
                color: "text.primary",
                mb: 4,
              }}
            >
              Portfolio companies need
              <br />
              AI. We build it.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                maxWidth: 580,
                mb: 6,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              Fixed scope. Fixed price. Working systems deployed in weeks, not
              months. Cut costs that flow straight to EBITDA.
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
                onClick={() =>
                  window.Calendly?.initPopupWidget({
                    url: "https://calendly.com/d/cxmx-c75-jgv/landex-systems-demo",
                  })
                }
                sx={{ px: 5, py: 1.75, fontSize: "0.9375rem", cursor: "pointer" }}
              >
                Discuss Your Portfolio
              </Button>
              <Button
                variant="outlined"
                href="#problem"
                sx={{
                  px: 4,
                  py: 1.75,
                  borderColor: "rgba(232,236,244,0.15)",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "rgba(232,236,244,0.3)",
                    bgcolor: "rgba(255,255,255,0.03)",
                  },
                }}
              >
                How It Works
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownwardIcon
            sx={{ color: "rgba(232,236,244,0.2)", fontSize: 20 }}
          />
        </motion.div>
      </motion.div>
    </Box>
  );
}
