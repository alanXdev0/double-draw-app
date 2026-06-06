import React, { useState, useEffect, useRef } from "react";
import RouletteWheel from "./RouletteWheel";
import playerSvg from "../assets/player.svg";

// Vibrant neon color palettes for active glows during spins
const RANDOM_GLOW_COLORS = [
  ["#00f2fe", "#4facfe", "#3b82f6"], // Cyan / Blue
  ["#ec4899", "#a855f7", "#6366f1"], // Pink / Purple / Indigo
  ["#10b981", "#059669", "#34d399"], // Emerald / Green
  ["#fbbf24", "#f59e0b", "#f87171"], // Amber / Orange / Red
  ["#f43f5e", "#e11d48", "#fda4af"], // Rose / Coral
  ["#06b6d4", "#0891b2", "#22d3ee"], // Cyan / Teal
];

// Helper to calculate a deterministic color palette based on team name hash
const getGlowColors = (teamName) => {
  if (!teamName) return ["#00f2fe", "#4facfe", "#3b82f6"];
  let hash = 0;
  for (let i = 0; i < teamName.length; i++) {
    hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % RANDOM_GLOW_COLORS.length;
  return RANDOM_GLOW_COLORS[index];
};

export default function DrawDashboard({
  participants = [],
  pots = {},
  results = [],
  onDrawComplete = () => {},
  playTick = () => {},
  isCelebrationActive = false,
  t,
  lang,
}) {
  const [selectedPot, setSelectedPot] = useState(() => {
    const keys = Object.keys(pots);
    return keys.includes("Bombo 1") ? "Bombo 1" : (keys[0] || "Bombo 1");
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [leftTargetIdx, setLeftTargetIdx] = useState(null);
  const [rightTargetIdx, setRightTargetIdx] = useState(null);

  // States to hold the active elements updating live at 60fps
  const [activePerson, setActivePerson] = useState("");
  const [activeTeam, setActiveTeam] = useState("");

  // Filter remaining elements for the selected pot
  const remainingParticipants = participants.filter(
    (p) => !results.some((r) => r.pot === selectedPot && r.person === p),
  );

  const remainingTeams = (pots[selectedPot] || []).filter(
    (t) => !results.some((r) => r.pot === selectedPot && r.team === t),
  );

  const startSpinning = () => {
    setIsSpinning(true);
    setLeftTargetIdx(null);
    setRightTargetIdx(null);
    setActivePerson("");
    setActiveTeam("");

    // Pick random index from remaining lists
    const randPersonIdx = Math.floor(
      Math.random() * remainingParticipants.length,
    );
    const randTeamIdx = Math.floor(Math.random() * remainingTeams.length);

    setLeftTargetIdx(randPersonIdx);
    setRightTargetIdx(randTeamIdx);
  };

  // Handle spin trigger
  const handleSpin = () => {
    if (
      isSpinning ||
      remainingParticipants.length === 0 ||
      remainingTeams.length === 0 ||
      isCountMismatch
    )
      return;

    startSpinning();
  };

  const spinCompleteCountRef = useRef(0);

  // Monitor when both wheels finish
  const handleLeftSpinComplete = () => {
    spinCompleteCountRef.current += 1;
    checkSpinsFinished();
  };

  const handleRightSpinComplete = () => {
    spinCompleteCountRef.current += 1;
    checkSpinsFinished();
  };

  const checkSpinsFinished = () => {
    if (spinCompleteCountRef.current >= 2) {
      spinCompleteCountRef.current = 0;
      setIsSpinning(false);

      const chosenPerson = remainingParticipants[leftTargetIdx];
      const chosenTeam = remainingTeams[rightTargetIdx];

      // Make sure the central display settles exactly on the final winner
      setActivePerson(chosenPerson);
      setActiveTeam(chosenTeam);

      // Send the outcome to the parent component
      onDrawComplete(selectedPot, chosenPerson, chosenTeam);
    }
  };

  // Automatically reset target index references if selectedPot changes
  useEffect(() => {
    setLeftTargetIdx(null);
    setRightTargetIdx(null);
    setActivePerson("");
    setActiveTeam("");
  }, [selectedPot]);

  // Auto-draw when exactly 1 participant and 1 team remain
  useEffect(() => {
    if (isSpinning || isCelebrationActive) return;

    if (remainingParticipants.length === 1 && remainingTeams.length === 1) {
      const lastPerson = remainingParticipants[0];
      const lastTeam = remainingTeams[0];

      // Instantly settle the central card display
      setActivePerson(lastPerson);
      setActiveTeam(lastTeam);

      // Trigger the selection completion
      onDrawComplete(selectedPot, lastPerson, lastTeam);
    }
  }, [
    remainingParticipants.length,
    remainingTeams.length,
    isSpinning,
    isCelebrationActive,
    selectedPot,
    onDrawComplete,
  ]);

  const isPotFilled =
    remainingParticipants.length === 0 || remainingTeams.length === 0;

  const totalParticipantsCount = participants.length;
  const totalTeamsCount = (pots[selectedPot] || []).length;
  const isCountMismatch = totalParticipantsCount !== totalTeamsCount;

  // Determine active colors for the central card glow
  const flagColors = getGlowColors(activeTeam);

  const activeGlow = flagColors[1] || flagColors[0] || "rgba(0,242,254,0.3)";
  const activeBorder = flagColors[0] || "var(--card-border)";
  const activeText = flagColors[0] || "#ffffff";

  return (
    <div
      className="glass-panel"
      style={{ padding: "24px", position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* Pot Selector Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
              {t("dashboard_title")}
            </h1>
          </div>

          <div className="pot-select-container">
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              {t("bombo_activo")}
            </span>
            <select
              className="custom-select"
              value={selectedPot}
              onChange={(e) => setSelectedPot(e.target.value)}
              disabled={isSpinning}
            >
              {Object.keys(pots).sort((a, b) => {
                const numA = parseInt(a.replace(/^\D+/g, ''), 10) || 0;
                const numB = parseInt(b.replace(/^\D+/g, ''), 10) || 0;
                if (numA && numB) return numA - numB;
                return a.localeCompare(b);
              }).map((potName) => (
                <option key={potName} value={potName}>
                  {potName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info Banner */}
        <div
          style={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div>
            {t("participants_free")}{" "}
            <span style={{ color: "var(--cyan-primary)", fontWeight: 700 }}>
              {remainingParticipants.length}
            </span>
          </div>
          <div
            style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.1)" }}
          ></div>
          <div>
            {t("teams_available")}{" "}
            <span style={{ color: "var(--magenta-primary)", fontWeight: 700 }}>
              {remainingTeams.length}
            </span>
          </div>
        </div>

        {/* Dual Wheel Playground: 3-column split layout */}
        <div className="fifa-draw-arena">
          {/* LEFT: Participant Wheel */}
          <div className="fifa-wheel-column left">
            <div className="wheel-title cyan" style={{ marginBottom: "16px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--cyan-primary)",
                }}
              ></span>
              {t("participants_title")}
            </div>
            <RouletteWheel
              items={remainingParticipants}
              isSpinning={isSpinning}
              targetIndex={leftTargetIdx}
              onSpinComplete={handleLeftSpinComplete}
              onActiveItemChange={(idx) =>
                setActivePerson(remainingParticipants[idx])
              }
              colorTheme="cyan"
              playTick={playTick}
              emptyText={t("empty_wheel")}
            />
          </div>

          {/* CENTER: Dynamic Soccer Player HUD */}
          <div className="fifa-center-column">
            <div
              className={`fifa-player-glowing-card ${isSpinning ? "active-spinning" : ""}`}
              style={{
                borderColor: isSpinning ? activeBorder : "var(--card-border)",
                boxShadow: isSpinning
                  ? `0 0 30px ${activeGlow}`
                  : "var(--glass-shadow)",
              }}
            >
              {/* Custom Soccer Player SVG masked with dynamic flag colors gradient */}
              <div
                className={`soccer-player-svg ${isSpinning ? "player-kicking" : ""}`}
                style={{
                  width: "130px",
                  height: "130px",
                  zIndex: 2,
                  WebkitMaskImage: `url(${playerSvg})`,
                  maskImage: `url(${playerSvg})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  background:
                    isSpinning || activeTeam
                      ? `linear-gradient(135deg, ${flagColors[0]} 0%, ${flagColors[1] || flagColors[0]} 50%, ${flagColors[2] || flagColors[0]} 100%)`
                      : "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
                  transition: "background 0.3s ease",
                }}
              />

              {/* Ticker values */}
              <div className="ticker-names">
                <span className="ticker-label">{t("live_draft")}</span>
                <div
                  className={`ticker-person ${isSpinning ? "spinning" : ""}`}
                >
                  {activePerson || "⚽"}
                </div>
                <div className="ticker-vs">vs</div>
                <div className={`ticker-team ${isSpinning ? "spinning" : ""}`}>
                  {activeTeam || t("waiting")}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Team Wheel */}
          <div className="fifa-wheel-column right">
            <div
              className="wheel-title magenta"
              style={{ marginBottom: "16px" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--magenta-primary)",
                }}
              ></span>
              {t("teams_title")}
            </div>
            <RouletteWheel
              items={remainingTeams}
              isSpinning={isSpinning}
              targetIndex={rightTargetIdx}
              onSpinComplete={handleRightSpinComplete}
              onActiveItemChange={(idx) => setActiveTeam(remainingTeams[idx])}
              colorTheme="magenta"
              playTick={playTick}
              emptyText={t("empty_wheel")}
            />
          </div>
        </div>

        {/* SPIN Trigger Button Below the Wheels */}
        <div className="spin-action-area-bottom">
          <button
            className="btn-spin-horizontal"
            onClick={handleSpin}
            disabled={isSpinning || isPotFilled || isCountMismatch}
          >
            {isSpinning
              ? t("spin_btn_spinning")
              : isCountMismatch
                ? t("spin_btn_mismatch")
                : isPotFilled
                  ? t("spin_btn_completed")
                  : t("spin_btn_idle")}
          </button>
          <span className="spin-subtext" style={{ color: isCountMismatch ? "#f87171" : "var(--text-secondary)" }}>
            {isCountMismatch
              ? t("spin_subtext_mismatch", { totalParticipants: totalParticipantsCount, totalTeams: totalTeamsCount })
              : isPotFilled
                ? t("spin_subtext_completed")
                : t("spin_subtext_idle")}
          </span>
        </div>
      </div>

    </div>
  );
}
