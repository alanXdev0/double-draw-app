import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAudio } from './hooks/useAudio';
import { 
  INITIAL_PARTICIPANTS, 
  INITIAL_POTS, 
  INITIAL_RESULTS,
  EXPANDED_DEMO_PARTICIPANTS,
  EXPANDED_DEMO_POTS,
} from './data/initialData';
import DrawDashboard from './components/DrawDashboard';
import SetupPanel from './components/SetupPanel';
import ResultsSection from './components/ResultsSection';
import OnboardingWizard from './components/OnboardingWizard';
import { getTranslationHelper } from './data/translations';
import GuideSection from './components/GuideSection';
import CompletionModal from './components/CompletionModal';

function BuyMeACoffeeButton({ fallbackUrl, label }) {
  const buttonHostRef = useRef(null);

  useEffect(() => {
    const host = buttonHostRef.current;
    if (!host) return undefined;

    if (typeof window.bmcBtnWidget === 'function') {
      host.innerHTML = window.bmcBtnWidget(
        'Buy me a coffee',
        'alanxdev',
        '#FFDD00',
        '',
        'Cookie',
        '#000000',
        '#000000',
        '#ffffff',
      );
    }

    return undefined;
  }, []);

  return (
    <div className="bmc-button-host" ref={buttonHostRef}>
      <a className="support-button" href={fallbackUrl} target="_blank" rel="noopener noreferrer">
        {label} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

function App() {
  // Sound Hook
  const { playTick, playWin, playWhistle, initAudio } = useAudio();

  const CURRENT_VERSION = 'v4_empty_defaults';

  const shouldRestoreDefaultDemo = () => {
    const savedParticipants = localStorage.getItem('raffle_participants');
    const savedPots = localStorage.getItem('raffle_pots');
    const savedResults = localStorage.getItem('raffle_results');

    return localStorage.getItem('raffle_setup_completed') !== 'true'
      && savedParticipants === JSON.stringify(EXPANDED_DEMO_PARTICIPANTS)
      && savedPots === JSON.stringify(EXPANDED_DEMO_POTS)
      && savedResults === JSON.stringify(INITIAL_RESULTS);
  };

  // State loaded from localStorage or fallback to defaults
  const [participants, setParticipants] = useState(() => {
    const version = localStorage.getItem('raffle_version');
    if (version !== CURRENT_VERSION) return INITIAL_PARTICIPANTS;
    if (shouldRestoreDefaultDemo()) return INITIAL_PARTICIPANTS;
    const saved = localStorage.getItem('raffle_participants');
    return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
  });

  const [pots, setPots] = useState(() => {
    const version = localStorage.getItem('raffle_version');
    if (version !== CURRENT_VERSION) return INITIAL_POTS;
    if (shouldRestoreDefaultDemo()) return INITIAL_POTS;
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
  const buyMeACoffeeUrl = import.meta.env.VITE_BUY_ME_A_COFFEE_URL?.trim() || 'https://buymeacoffee.com/alanxdev';

  useEffect(() => {
    localStorage.setItem('raffle_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Celebration overlay state lifted to root level
  const [showCelebration, setShowCelebration] = useState(false);
  const [drawnPair, setDrawnPair] = useState(null);
  const [completionDraw, setCompletionDraw] = useState(null);

  const [showWizard, setShowWizard] = useState(false);

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
    localStorage.removeItem('raffle_setup_completed');
  };

  const clearResults = () => {
    setResults([]);
  };

  // Draw complete handler
  const handleDrawComplete = (pot, person, team, isFinalDraw = false) => {
    if (isFinalDraw) {
      const completedResults = [...results, { pot, person, team }];
      setResults(completedResults);
      setCompletionDraw({ pot, results: completedResults });
      playWin();
      playWhistle();
      return;
    }

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
          <div className="logo-group" onClick={() => setActiveTab('sorteo')}>
            <div className="logo">
              <img src="/sports_draw_logo.png" alt="Duo Raffle Logo" />
              {t('logo')}
            </div>
            <span className="logo-tagline">
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
              <button
                className={`nav-tab ${activeTab === 'guia' ? 'active' : ''}`}
                onClick={() => setActiveTab('guia')}
              >
                {t('tab_guide')}
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

      <main className="container app-main">
        {activeTab === 'sorteo' && (
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
              onOpenWizard={() => setShowWizard(true)}
            />

            {/* Results Section */}
            <ResultsSection
              pots={pots}
              results={results}
              onRemoveResult={removeResult}
              t={t}
            />
          </>
        )}

        {activeTab === 'config' && (
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

        {activeTab === 'guia' && (
          /* Interactive Guide & FAQ Section */
          <GuideSection lang={lang} />
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <section className="support-card" aria-label={t('support_title')}>
            <div className="support-icon" aria-hidden="true">☕</div>
            <div className="support-copy">
              <span className="support-eyebrow">BUY ME A COFFEE</span>
              <strong>{t('support_title')}</strong>
              <p>{t('support_description')}</p>
            </div>
            <BuyMeACoffeeButton fallbackUrl={buyMeACoffeeUrl} label={t('support_button')} />
          </section>
          <div className="footer-meta">
            <div>© {new Date().getFullYear()} {t('footer_text')}</div>
            <div className="footer-links">
            <a href="/politica-de-privacidad.html" target="_blank" rel="noopener noreferrer">
              {lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </a>
            <span>|</span>
            <a href="/terminos-de-servicio.html" target="_blank" rel="noopener noreferrer">
              {lang === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
            </a>
            <span>|</span>
            <a href="/contacto.html" target="_blank" rel="noopener noreferrer">
              {lang === 'es' ? 'Contacto y Acerca de' : 'Contact & About'}
            </a>
          </div>
        </div>
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

      {completionDraw && (
        <CompletionModal
          pot={completionDraw.pot}
          results={completionDraw.results}
          onClose={() => setCompletionDraw(null)}
          t={t}
        />
      )}

      {showWizard && (
        <OnboardingWizard
          initialParticipants={localStorage.getItem('raffle_setup_completed') === 'true' ? participants : []}
          initialPots={localStorage.getItem('raffle_setup_completed') === 'true' ? pots : {}}
          onComplete={handleWizardComplete}
          onClose={() => setShowWizard(false)}
          t={t}
        />
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
