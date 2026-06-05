import React, { useState, useEffect, useRef } from "react";
import RouletteWheel from "./RouletteWheel";
import playerSvg from "../assets/player.svg";

// Country flag color database for World Cup 2026 hosts and participants
const COUNTRY_COLORS = {
  Francia: ["#00209F", "#FFFFFF", "#E10021"],
  España: ["#C60B1E", "#FFC400", "#C60B1E"],
  Argentina: ["#74ACDF", "#FFFFFF", "#74ACDF"],
  Inglaterra: ["#FFFFFF", "#CF081F", "#FFFFFF"],
  Portugal: ["#006600", "#FF0000", "#FFCC00"],
  Brasil: ["#009B3A", "#FEDF00", "#002776"],
  Holanda: ["#FF4F00", "#FFFFFF", "#21468B"],
  Marruecos: ["#C1272D", "#006233", "#C1272D"],
  Bélgica: ["#000000", "#FDDA24", "#EF3340"],
  Alemania: ["#000000", "#DD0000", "#FFCC00"],
  Croacia: ["#FF0000", "#FFFFFF", "#171796"],
  Colombia: ["#FCD116", "#003893", "#CE1126"],

  Senegal: ["#00853F", "#FDEF42", "#E31B23"],
  México: ["#006847", "#FFFFFF", "#CE1126"],
  "Estados Unidos": ["#B22234", "#FFFFFF", "#3C3B6E"],
  Uruguay: ["#0081C6", "#FFFFFF", "#FFD700"],
  Japón: ["#FFFFFF", "#BC002D", "#FFFFFF"],
  Suiza: ["#D80027", "#FFFFFF", "#D80027"],
  Irán: ["#228B22", "#FFFFFF", "#DA291C"],
  Austria: ["#ED2939", "#FFFFFF", "#ED2939"],
  Turquía: ["#E30A17", "#FFFFFF", "#E30A17"],
  Ecuador: ["#FFDD00", "#0033A0", "#D52B1E"],
  "Corea del Sur": ["#FFFFFF", "#CD113B", "#0047A0"],
  Argelia: ["#006633", "#FFFFFF", "#D21920"],

  Australia: ["#00008B", "#FF0000", "#FFFFFF"],
  Egipto: ["#C0930C", "#FFFFFF", "#E31B23"],
  Canadá: ["#FF0000", "#FFFFFF", "#FF0000"],
  Noruega: ["#EF2B2D", "#FFFFFF", "#002868"],
  Panamá: ["#005293", "#FFFFFF", "#D21034"],
  "Costa de Marfil": ["#F77F00", "#FFFFFF", "#009E60"],
  Suecia: ["#006AA7", "#FECC02", "#006AA7"],
  Paraguay: ["#D52B1E", "#FFFFFF", "#003893"],
  "República Checa": ["#11457E", "#FFFFFF", "#D91A30"],
  Escocia: ["#005EB8", "#FFFFFF", "#005EB8"],
  Bosnia: ["#00209F", "#FFCC00", "#00209F"],
  Serbia: ["#C6363C", "#0C4076", "#FFFFFF"],

  Jordania: ["#000000", "#FFFFFF", "#C60C30"],
  Haití: ["#00209F", "#D21034", "#00209F"],
  Ghana: ["#E31B23", "#FCD116", "#006B3F"],
  Qatar: ["#8A1538", "#FFFFFF", "#8A1538"],
  "Cabo Verde": ["#002F6C", "#FFFFFF", "#C8102E"],
  Irak: ["#E31B23", "#FFFFFF", "#007A3D"],
  Congo: ["#009F4D", "#FCD116", "#D11919"],
  Curazao: ["#002F6C", "#FFFFFF", "#FED141"],
  Túnez: ["#E30A17", "#FFFFFF", "#E30A17"],
  "Nueva Zelanda": ["#000000", "#FFFFFF", "#000000"],
  Sudáfrica: ["#007A4D", "#FFFFFF", "#E31B23"],
  Uzbekistán: ["#0099B5", "#FFFFFF", "#1EB53A"],
};

// Helper to strip flag emojis and clean country strings for map lookup
const getCleanCountryName = (teamName) => {
  if (!teamName) return "";
  return teamName
    .replace(
      /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
      "",
    )
    .trim();
};

export default function DrawDashboard({
  participants = [],
  pots = {},
  results = [],
  onDrawComplete = () => {},
  playTick = () => {},
}) {
  const [selectedPot, setSelectedPot] = useState("Bombo 1");
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

  // Handle spin trigger
  const handleSpin = () => {
    if (
      isSpinning ||
      remainingParticipants.length === 0 ||
      remainingTeams.length === 0
    )
      return;

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

  const isPotFilled =
    remainingParticipants.length === 0 || remainingTeams.length === 0;

  // Determine active flag colors for the central player card
  const cleanActiveCountry = getCleanCountryName(activeTeam);
  const flagColors = COUNTRY_COLORS[cleanActiveCountry] || [
    "#10b981",
    "#3b82f6",
    "#fbbf24",
  ]; // Default fallback

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
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              Sorteo de Grupos FIFA 2026™
            </h2>
          </div>

          <div className="pot-select-container">
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              Bombo Activo:
            </span>
            <select
              className="custom-select"
              value={selectedPot}
              onChange={(e) => setSelectedPot(e.target.value)}
              disabled={isSpinning}
            >
              {Object.keys(pots).map((potName) => (
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
            Participantes Libres:{" "}
            <span style={{ color: "var(--cyan-primary)", fontWeight: 700 }}>
              {remainingParticipants.length}
            </span>
          </div>
          <div
            style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.1)" }}
          ></div>
          <div>
            Equipos Disponibles:{" "}
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
              Participantes
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
                <span className="ticker-label">SORTEO EN VIVO</span>
                <div
                  className={`ticker-person ${isSpinning ? "spinning" : ""}`}
                >
                  {activePerson || "⚽"}
                </div>
                <div className="ticker-vs">vs</div>
                <div className={`ticker-team ${isSpinning ? "spinning" : ""}`}>
                  {activeTeam || "ESPERANDO..."}
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
              Equipos
            </div>
            <RouletteWheel
              items={remainingTeams}
              isSpinning={isSpinning}
              targetIndex={rightTargetIdx}
              onSpinComplete={handleRightSpinComplete}
              onActiveItemChange={(idx) => setActiveTeam(remainingTeams[idx])}
              colorTheme="magenta"
              playTick={playTick}
            />
          </div>
        </div>

        {/* SPIN Trigger Button Below the Wheels */}
        <div className="spin-action-area-bottom">
          <button
            className="btn-spin-horizontal"
            onClick={handleSpin}
            disabled={isSpinning || isPotFilled}
          >
            {isSpinning
              ? "SORTEANDO BOMBOS..."
              : isPotFilled
                ? "SORTEO COMPLETADO"
                : "GIRAR RULETA"}
          </button>
          <span className="spin-subtext">
            {isPotFilled
              ? "Todos los sorteos para este bombo se han realizado"
              : "Presiona para elegir un par al azar"}
          </span>
        </div>
      </div>
    </div>
  );
}
