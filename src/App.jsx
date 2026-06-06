import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from './hooks/useAudio';
import { 
  INITIAL_PARTICIPANTS, 
  INITIAL_POTS, 
  INITIAL_RESULTS 
} from './data/initialData';
import DrawDashboard from './components/DrawDashboard';
import SetupPanel from './components/SetupPanel';
import ResultsSection from './components/ResultsSection';
import OnboardingWizard from './components/OnboardingWizard';
import { getTranslationHelper } from './data/translations';

function App() {
  // Sound Hook
  const { playTick, playWin, playWhistle, initAudio } = useAudio();

  const CURRENT_VERSION = 'v4_empty_defaults';

  // State loaded from localStorage or fallback to defaults
  const [participants, setParticipants] = useState(() => {
    const version = localStorage.getItem('raffle_version');
    if (version !== CURRENT_VERSION) return INITIAL_PARTICIPANTS;
    const saved = localStorage.getItem('raffle_participants');
    return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
  });

  const [pots, setPots] = useState(() => {
    const version = localStorage.getItem('raffle_version');
    if (version !== CURRENT_VERSION) return INITIAL_POTS;
    const saved = localStorage.getItem('raffle_pots');
    return saved ? JSON.parse(saved) : INITIAL_POTS;
  });

  const [results, setResults] = useState(() => {
    const version = localStorage.getItem('raffle_version');
    if (version !== CURRENT_VERSION) return INITIAL_RESULTS;
    const saved = localStorage.getItem('raffle_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [activeTab, setActiveTab] = useState('sorteo'); // 'sorteo' | 'config'

  // Language state initialized by local storage or browser language detection
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('raffle_lang');
    if (saved) return saved;
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().split('-')[0];
    const supported = ['es', 'en', 'pt', 'fr', 'de', 'it', 'ar'];
    return supported.includes(browserLang) ? browserLang : 'en';
  });

  const t = getTranslationHelper(lang);

  useEffect(() => {
    localStorage.setItem('raffle_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Celebration overlay state lifted to root level
  const [showCelebration, setShowCelebration] = useState(false);
  const [drawnPair, setDrawnPair] = useState(null);

  const [showWizard, setShowWizard] = useState(() => {
    const version = localStorage.getItem('raffle_version');
    if (version !== CURRENT_VERSION) {
      localStorage.removeItem('raffle_setup_completed');
      return true;
    }
    return localStorage.getItem('raffle_setup_completed') !== 'true';
  });

  const confettiCanvasRef = useRef(null);
  const confettiAnimRef = useRef(null);

  const handleWizardComplete = (wizardParticipants, wizardPots) => {
    setParticipants(wizardParticipants);
    setPots(wizardPots);
    setResults([]); // Clear results on new configuration
    localStorage.setItem('raffle_participants', JSON.stringify(wizardParticipants));
    localStorage.setItem('raffle_pots', JSON.stringify(wizardPots));
    localStorage.setItem('raffle_results', JSON.stringify([]));
    localStorage.setItem('raffle_version', CURRENT_VERSION);
    localStorage.setItem('raffle_setup_completed', 'true');
    setShowWizard(false);
  };

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('raffle_version', CURRENT_VERSION);
  }, []);

  useEffect(() => {
    localStorage.setItem('raffle_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('raffle_pots', JSON.stringify(pots));
  }, [pots]);

  useEffect(() => {
    localStorage.setItem('raffle_results', JSON.stringify(results));
  }, [results]);

  const addParticipant = (nameInput) => {
    const names = nameInput.split(',').map(n => n.trim()).filter(n => n.length > 0);
    if (names.length === 0) return;
    
    const duplicates = [];
    const toAdd = [];
    const existingLower = participants.map(p => p.toLowerCase());
    const toAddLower = [];
    
    names.forEach(name => {
      const lower = name.toLowerCase();
      if (existingLower.includes(lower) || toAddLower.includes(lower)) {
        duplicates.push(name);
      } else {
        toAdd.push(name);
        toAddLower.push(lower);
      }
    });

    if (duplicates.length > 0) {
      alert(`${t('alert_duplicate_participant')} (${duplicates.join(', ')})`);
    }
    
    if (toAdd.length > 0) {
      setParticipants(prev => [...prev, ...toAdd]);
    }
  };

  const removeParticipant = (name) => {
    setParticipants(participants.filter(p => p !== name));
    setResults(results.filter(r => r.person !== name));
  };

  const addTeam = (pot, teamInput) => {
    const teams = teamInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (teams.length === 0) return;
    
    const maxAllowed = participants.length;
    const currentCount = (pots[pot] || []).length;
    
    const duplicates = [];
    const toAdd = [];
    const existingTeamsLower = Object.values(pots).flat().map(t => t.toLowerCase());
    const toAddLower = [];
    
    teams.forEach(team => {
      const lower = team.toLowerCase();
      if (existingTeamsLower.includes(lower) || toAddLower.includes(lower)) {
        duplicates.push(team);
      } else {
        toAdd.push(team);
        toAddLower.push(lower);
      }
    });

    if (duplicates.length > 0) {
      alert(`${t('alert_duplicate_team')} (${duplicates.join(', ')})`);
    }
    
    if (toAdd.length > 0) {
      if (currentCount + toAdd.length > maxAllowed) {
        alert(t('alert_pot_teams_exceeded'));
        return;
      }
      setPots(prev => ({
        ...prev,
        [pot]: [...(prev[pot] || []), ...toAdd]
      }));
    }
  };

  const removeTeam = (pot, teamName) => {
    const potTeams = pots[pot] || [];
    setPots({
      ...pots,
      [pot]: potTeams.filter(t => t !== teamName)
    });
    setResults(results.filter(r => !(r.pot === pot && r.team === teamName)));
  };

  const updatePotCount = (newCount) => {
    if (newCount < 1) return;
    
    const currentKeys = Object.keys(pots).sort((a, b) => {
      const numA = parseInt(a.replace(/^\D+/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/^\D+/g, ''), 10) || 0;
      if (numA && numB) return numA - numB;
      return a.localeCompare(b);
    });
    
    const currentCount = currentKeys.length;
    
    if (newCount < currentCount) {
      const potsToDelete = currentKeys.slice(newCount);
      const hasTeams = potsToDelete.some(potName => (pots[potName] || []).length > 0);
      
      if (hasTeams) {
        if (!window.confirm(t('confirm_reduce_pots'))) {
          return;
        }
      }
      
      const updatedPots = { ...pots };
      potsToDelete.forEach(potName => {
        delete updatedPots[potName];
      });
      setPots(updatedPots);
      
      setResults(results.filter(r => !potsToDelete.includes(r.pot)));
    } else if (newCount > currentCount) {
      const updatedPots = { ...pots };
      for (let i = currentCount + 1; i <= newCount; i++) {
        const potName = `Bombo ${i}`;
        if (!updatedPots[potName]) {
          updatedPots[potName] = [];
        }
      }
      setPots(updatedPots);
    }
  };

  const addResult = (pot, person, team) => {
    const newResult = { pot, person, team };
    setResults([...results, newResult]);
  };

  const removeResult = (pot, person, team) => {
    setResults(results.filter(r => !(r.pot === pot && r.person === person && r.team === team)));
  };

  const resetToDefaults = () => {
    setParticipants(INITIAL_PARTICIPANTS);
    setPots(INITIAL_POTS);
    setResults(INITIAL_RESULTS);
    localStorage.removeItem('raffle_participants');
    localStorage.removeItem('raffle_pots');
    localStorage.removeItem('raffle_results');
  };

  const clearResults = () => {
    setResults([]);
  };

  // Draw complete handler
  const handleDrawComplete = (pot, person, team) => {
    setDrawnPair({ pot, person, team });
    setShowCelebration(true);
    playWin();
    playWhistle();
  };

  const handleAcceptDrawnPair = () => {
    if (drawnPair) {
      addResult(drawnPair.pot, drawnPair.person, drawnPair.team);
      setShowCelebration(false);
      setDrawnPair(null);
    }
  };

  // Confetti Particle System inside App
  useEffect(() => {
    if (showCelebration && confettiCanvasRef.current) {
      const canvas = confettiCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const colors = ['#00f2fe', '#ec4899', '#fbbf24', '#3b82f6', '#10b981', '#a855f7'];
      const particles = [];
      const particleCount = 120;

      class Particle {
        constructor() {
          this.x = canvas.width / 2;
          this.y = canvas.height * 0.6; // Spawn near center
          this.radius = Math.random() * 5 + 4;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 12 + 6;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed - 5;
          this.gravity = 0.22;
          this.opacity = 1;
          this.fadeSpeed = Math.random() * 0.01 + 0.005;
          this.rotation = Math.random() * 360;
          this.rotationSpeed = Math.random() * 4 - 2;
        }

        update() {
          this.vy += this.gravity;
          this.x += this.vx;
          this.y += this.vy;
          this.vx *= 0.98;
          this.vy *= 0.98;
          this.opacity -= this.fadeSpeed;
          this.rotation += this.rotationSpeed;
        }

        draw() {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate((this.rotation * Math.PI) / 180);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = Math.max(0, this.opacity);
          
          if (Math.random() > 0.5) {
            ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      const animateConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let alive = false;
        particles.forEach(p => {
          p.update();
          p.draw();
          if (p.opacity > 0 && p.y < canvas.height) {
            alive = true;
          }
        });

        if (Math.random() < 0.2 && particles.length < 200) {
          const trickle = new Particle();
          trickle.x = Math.random() * canvas.width;
          trickle.y = -10;
          trickle.vy = Math.random() * 2 + 1;
          trickle.vx = Math.random() * 2 - 1;
          particles.push(trickle);
          alive = true;
        }

        if (alive) {
          confettiAnimRef.current = requestAnimationFrame(animateConfetti);
        }
      };

      animateConfetti();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        if (confettiAnimRef.current) {
          cancelAnimationFrame(confettiAnimRef.current);
        }
      };
    }
  }, [showCelebration]);

  return (
    <>
      {/* Background glowing spheres */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        left: '20%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: -1
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '15%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: -1
      }}></div>

      <header onClick={initAudio}>
        <div className="container header-content">
          <div className="logo-group" onClick={() => setActiveTab('sorteo')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="logo" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/sports_draw_logo.png" alt="Duo Raffle Logo" style={{ height: '34px', width: '34px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))' }} />
              {t('logo')}
            </div>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.45)', marginInlineStart: '42px', marginTop: '-4px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              {t('logo_tagline')}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="nav-tabs">
              <button
                className={`nav-tab ${activeTab === 'sorteo' ? 'active' : ''}`}
                onClick={() => setActiveTab('sorteo')}
              >
                {t('tab_sorteo')}
              </button>
              <button
                className={`nav-tab ${activeTab === 'config' ? 'active' : ''}`}
                onClick={() => setActiveTab('config')}
              >
                {t('tab_config')}
              </button>
            </div>

            <div className="lang-select-container">
              <select
                className="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="es">🇪🇸 ES</option>
                <option value="en">🇺🇸 EN</option>
                <option value="pt">🇵🇹 PT</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="de">🇩🇪 DE</option>
                <option value="it">🇮🇹 IT</option>
                <option value="ar">🇸🇦 AR</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ flexGrow: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {activeTab === 'sorteo' ? (
          <>
            {/* Draw Dashboard */}
            <DrawDashboard
              participants={participants}
              pots={pots}
              results={results}
              onDrawComplete={handleDrawComplete}
              playTick={playTick}
              isCelebrationActive={showCelebration}
              t={t}
              lang={lang}
            />

            {/* Results Section */}
            <ResultsSection
              pots={pots}
              results={results}
              onRemoveResult={removeResult}
              t={t}
            />
          </>
        ) : (
          /* Settings / Configuration Panel */
          <SetupPanel
            participants={participants}
            pots={pots}
            onAddParticipant={addParticipant}
            onRemoveParticipant={removeParticipant}
            onAddTeam={addTeam}
            onRemoveTeam={removeTeam}
            onResetToDefaults={resetToDefaults}
            onClearResults={clearResults}
            onUpdatePotCount={updatePotCount}
            onOpenWizard={() => setShowWizard(true)}
            t={t}
          />
        )}
      </main>

      <footer style={{
        borderTop: '1px solid var(--card-border)',
        padding: '24px 0',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        background: 'var(--bg-darker)'
      }}>
        <div className="container font-mono">
          © {new Date().getFullYear()} {t('footer_text')}
        </div>
      </footer>

      {/* Celebration Modal Overlay rendered at root level */}
      <div className={`celebration-overlay ${showCelebration ? 'active' : ''}`}>
        <canvas ref={confettiCanvasRef} id="confetti-canvas"></canvas>
        
        {drawnPair && (
          <div className="celebration-card glass-panel glow-cyan">
            <div className="celebration-title">{t('celebration_title')}</div>
            
            <div className="winner-display">
              <div className="winner-person">{drawnPair.person}</div>
              <div className="versus-divider">{t('versus_divider')}</div>
              <div className="winner-team">{drawnPair.team}</div>
            </div>

            <button
              className="btn-primary"
              onClick={handleAcceptDrawnPair}
              style={{ padding: '14px 36px', fontSize: '1.1rem', marginTop: '12px' }}
            >
              {t('btn_accept_continue')}
            </button>
          </div>
        )}
      </div>

      {showWizard && (
        <OnboardingWizard
          initialParticipants={participants}
          initialPots={pots}
          onComplete={handleWizardComplete}
          onClose={localStorage.getItem('raffle_setup_completed') === 'true' ? () => setShowWizard(false) : null}
          t={t}
        />
      )}
    </>
  );
}

export default App;
