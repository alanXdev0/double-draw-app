import React, { useState, useEffect, useMemo, useRef } from "react";
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

const duplicateAndShuffle = (items) => {
  const doubledItems = [...items, ...items];

  for (let index = doubledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [doubledItems[index], doubledItems[randomIndex]] = [
      doubledItems[randomIndex],
      doubledItems[index],
    ];
  }

  return doubledItems;
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
  onOpenWizard,
}) {
  const [selectedPot, setSelectedPot] = useState(() => {
    const keys = Object.keys(pots);
    return keys.includes("Bombo 1") ? "Bombo 1" : (keys[0] || "Bombo 1");
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [leftTargetIdx, setLeftTargetIdx] = useState(null);
  const [rightTargetIdx, setRightTargetIdx] = useState(null);
  const [selectedPair, setSelectedPair] = useState(null);

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

  // Each available option is rendered twice in a shuffled sequence. This gives
  // the roulette more visual movement while assignments remain unique.
  const displayParticipants = useMemo(
    () => duplicateAndShuffle(remainingParticipants),
    [participants, results, selectedPot],
  );
  const displayTeams = useMemo(
    () => duplicateAndShuffle(remainingTeams),
    [pots, results, selectedPot],
  );

  const startSpinning = () => {
    setIsSpinning(true);
    setLeftTargetIdx(null);
    setRightTargetIdx(null);
    setActivePerson("");
    setActiveTeam("");

    // Choose one unique assignment, then target either of its visual copies.
    const chosenPerson = remainingParticipants[Math.floor(
      Math.random() * remainingParticipants.length,
    )];
    const chosenTeam = remainingTeams[Math.floor(
      Math.random() * remainingTeams.length,
    )];
    const personIndexes = displayParticipants
      .map((person, index) => person === chosenPerson ? index : -1)
      .filter((index) => index >= 0);
    const teamIndexes = displayTeams
      .map((team, index) => team === chosenTeam ? index : -1)
      .filter((index) => index >= 0);

    setSelectedPair({ person: chosenPerson, team: chosenTeam });
    setLeftTargetIdx(personIndexes[Math.floor(Math.random() * personIndexes.length)]);
    setRightTargetIdx(teamIndexes[Math.floor(Math.random() * teamIndexes.length)]);
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

      const chosenPerson = selectedPair?.person;
      const chosenTeam = selectedPair?.team;

      if (!chosenPerson || !chosenTeam) return;

      // Make sure the central display settles exactly on the final winner
      setActivePerson(chosenPerson);
      setActiveTeam(chosenTeam);

      // Send the outcome to the parent component
      onDrawComplete(selectedPot, chosenPerson, chosenTeam, false);
    }
  };

  // Automatically reset target index references if selectedPot changes
  useEffect(() => {
    setLeftTargetIdx(null);
    setRightTargetIdx(null);
    setSelectedPair(null);
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
      onDrawComplete(selectedPot, lastPerson, lastTeam, true);
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
    <div className="glass-panel draw-dashboard">
      <div className="draw-dashboard-content">
        {/* Pot Selector Header */}
        <div className="dashboard-heading">
          <div>
            <span className="section-kicker">MATCH CENTER</span>
            <h1>
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

        {/* Suggestion Banner to launch Wizard manually */}
        {onOpenWizard && (
          <div className="setup-nudge">
            <span>
              💡 {lang === "es"
                ? "¿Quieres crear tu propio sorteo con tus nombres y equipos?"
                : "Want to create your own draw with your names and teams?"}
            </span>
            <button
              onClick={onOpenWizard}
              className="btn-primary"
              style={{ padding: "6px 14px", fontSize: "0.85rem", cursor: "pointer" }}
            >
              🪄 {lang === "es" ? "Asistente de Configuración" : "Setup Wizard"}
            </button>
          </div>
        )}

        {/* Info Banner */}
          <div className="draw-stats">
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
              items={displayParticipants}
              isSpinning={isSpinning}
              targetIndex={leftTargetIdx}
              onSpinComplete={handleLeftSpinComplete}
              onActiveItemChange={(idx) =>
                setActivePerson(displayParticipants[idx])
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
              items={displayTeams}
              isSpinning={isSpinning}
              targetIndex={rightTargetIdx}
              onSpinComplete={handleRightSpinComplete}
              onActiveItemChange={(idx) => setActiveTeam(displayTeams[idx])}
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
