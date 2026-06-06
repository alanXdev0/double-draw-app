import React, { useState, useRef } from 'react';

/**
 * OnboardingWizard Component
 * 
 * Un asistente interactivo por pasos para configurar los participantes,
 * bombos y equipos antes de iniciar el sorteo.
 */
export default function OnboardingWizard({
  initialParticipants = [],
  initialPots = {},
  onComplete = () => {},
  onClose = null, // Solo se proporciona si el modal puede cancelarse (reabierto)
  t
}) {
  const [step, setStep] = useState(1); // 1: Participantes, 2: Bombos/Equipos, 3: Resumen
  
  // Inicialización de estados locales para edición segura en el wizard
  const [participants, setParticipants] = useState(() => {
    return initialParticipants.length > 0 ? [...initialParticipants] : [];
  });
  
  const [pots, setPots] = useState(() => {
    // Si no hay bombos, nos aseguramos de crear obligatoriamente "Bombo 1"
    const keys = Object.keys(initialPots);
    if (keys.length === 0) {
      return { "Bombo 1": [] };
    }
    // Nos aseguramos que "Bombo 1" siempre exista
    const updated = { ...initialPots };
    if (!updated["Bombo 1"]) {
      updated["Bombo 1"] = [];
    }
    return updated;
  });

  const [activeConfigPot, setActiveConfigPot] = useState("Bombo 1");
  const [newPersonName, setNewPersonName] = useState("");
  const [newPotName, setNewPotName] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [toast, setToast] = useState({ show: false, message: '' });
  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 4000);
  };

  // Paso 1: Gestión de Participantes
  const handleAddParticipant = (e) => {
    e.preventDefault();
    const names = newPersonName.split(',').map(n => n.trim()).filter(n => n.length > 0);
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
      alert(`${t("alert_duplicate_participant")} (${duplicates.join(', ')})`);
    }
    
    if (toAdd.length > 0) {
      setParticipants([...participants, ...toAdd]);
    }
    setNewPersonName("");
  };

  const handleRemoveParticipant = (name) => {
    setParticipants(participants.filter(p => p !== name));
  };

  // Paso 2: Gestión de Bombos y Equipos
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
      
      // Also adjust activeConfigPot if it was deleted
      if (potsToDelete.includes(activeConfigPot)) {
        setActiveConfigPot("Bombo 1");
      }
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

  const handleAddTeam = (e) => {
    e.preventDefault();
    const teams = newTeamName.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (teams.length === 0) return;
    
    const maxAllowed = participants.length;
    const currentTeams = pots[activeConfigPot] || [];
    
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
      alert(`${t("alert_duplicate_team")} (${duplicates.join(', ')})`);
    }
    
    if (toAdd.length > 0) {
      if (currentTeams.length + toAdd.length > maxAllowed) {
        alert(t('alert_pot_teams_exceeded'));
        return;
      }
      setPots({
        ...pots,
        [activeConfigPot]: [...currentTeams, ...toAdd]
      });
    }
    setNewTeamName("");
  };

  const handleRemoveTeam = (teamName) => {
    const currentTeams = pots[activeConfigPot] || [];
    setPots({
      ...pots,
      [activeConfigPot]: currentTeams.filter(t => t !== teamName)
    });
  };

  // Validación de Reglas Generales
  const isStep1Valid = participants.length >= 2;
  
  // Valida que cada bombo tenga exactamente el mismo número de equipos que participantes
  const getPotValidationStatus = (potName) => {
    const teamCount = (pots[potName] || []).length;
    const participantCount = participants.length;
    
    if (participantCount < 2) {
      return { valid: false, message: t("wizard_min_participants") };
    }
    
    if (teamCount === participantCount) {
      return { valid: true, message: t("wizard_teams_match", { count: teamCount }) };
    } else if (teamCount < participantCount) {
      return { valid: false, message: t("wizard_teams_missing", { count: participantCount - teamCount, current: teamCount, total: participantCount }) };
    } else {
      return { valid: false, message: t("wizard_teams_extra", { count: teamCount - participantCount, current: teamCount, total: participantCount }) };
    }
  };

  const isAllPotsValid = () => {
    return Object.keys(pots).every(potName => getPotValidationStatus(potName).valid);
  };

  const isStep2Valid = isAllPotsValid();

  const handleNextStep = () => {
    if (!isStep1Valid) {
      showToast(t("wizard_min_participants"));
      return;
    }
    if (!isStep2Valid) {
      const firstInvalidPot = orderedPots.find(potName => !getPotValidationStatus(potName).valid);
      if (firstInvalidPot) {
        const errorMsg = getPotValidationStatus(firstInvalidPot).message;
        const cleanMsg = errorMsg.startsWith('⚠️') ? errorMsg.replace('⚠️', '').trim() : errorMsg;
        const potLabel = firstInvalidPot.includes('Bombo ')
          ? firstInvalidPot.replace('Bombo ', t('bombo_activo').includes('Pot') || t('bombo_activo').includes('Pote') || t('bombo_activo').includes('Chapeau') || t('bombo_activo').includes('Topf') || t('bombo_activo').includes('Urna') || t('bombo_activo').includes('المستوى') ? (t('bombo_activo').includes('المستوى') ? '' : 'P') : 'B')
          : firstInvalidPot;
        showToast(`${potLabel}: ${cleanMsg}`);
      } else {
        showToast(t("wizard_validation_warnings"));
      }
      return;
    }
    setStep(step + 1);
  };

  const handleFinish = () => {
    if (!isStep1Valid) {
      showToast(t("wizard_min_participants"));
      return;
    }
    if (!isStep2Valid) {
      const firstInvalidPot = orderedPots.find(potName => !getPotValidationStatus(potName).valid);
      if (firstInvalidPot) {
        const errorMsg = getPotValidationStatus(firstInvalidPot).message;
        const cleanMsg = errorMsg.startsWith('⚠️') ? errorMsg.replace('⚠️', '').trim() : errorMsg;
        const potLabel = firstInvalidPot.includes('Bombo ')
          ? firstInvalidPot.replace('Bombo ', t('bombo_activo').includes('Pot') || t('bombo_activo').includes('Pote') || t('bombo_activo').includes('Chapeau') || t('bombo_activo').includes('Topf') || t('bombo_activo').includes('Urna') || t('bombo_activo').includes('المستوى') ? (t('bombo_activo').includes('المستوى') ? '' : 'P') : 'B')
          : firstInvalidPot;
        showToast(`${potLabel}: ${cleanMsg}`);
      } else {
        showToast(t("wizard_validation_warnings"));
      }
      return;
    }
    onComplete(participants, pots);
  };

  // Ordenar pestañas de bombos poniendo "Bombo 1" al principio
  const orderedPots = Object.keys(pots).sort((a, b) => {
    const numA = parseInt(a.replace(/^\D+/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/^\D+/g, ''), 10) || 0;
    if (numA && numB) return numA - numB;
    return a.localeCompare(b);
  });

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card glass-panel glow-cyan" style={step === 1 ? { maxWidth: '1000px' } : {}}>
        
        {/* Toast Notification */}
        {toast.show && (
          <div className="toast-notification">
            <span>⚠️</span>
            <span>{toast.message}</span>
          </div>
        )}

        {/* Encabezado del Modal */}
        <div className="wizard-header">
          <div className="wizard-title-group">
            <h2 className="wizard-title">{t('wizard_title')}</h2>
            <p className="wizard-subtitle">{t('wizard_subtitle')}</p>
          </div>
          {onClose && (
            <button className="btn-close-wizard" onClick={onClose} title="Cerrar asistente">
              &times;
            </button>
          )}
        </div>

        {/* Indicador de Pasos */}
        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>
            <span className="dot-num">1</span>
            <span className="dot-label">{t('tab_config')}</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>
            <span className="dot-num">2</span>
            <span className="dot-label">{t('wizard_step_summary')}</span>
          </div>
        </div>

        {/* Cuerpo del Paso Activo */}
        <div className="wizard-body">
          
          {/* PASO 1: Configuración Unificada (Participantes y Equipos lado a lado) */}
          {step === 1 && (
            <div className="wizard-step-content">
              
              {/* Barra de Gestión de Bombos (Full Width) */}
              <div className="wizard-pot-creator" style={{ 
                background: 'var(--bg-darker)', 
                padding: '12px 16px', 
                borderRadius: '16px', 
                border: '1px dashed var(--card-border)', 
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  {/* Left part: Active Pot Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {t('bombo_activo') || "Bombo Activo"}:
                    </span>
                    <div className="pot-selector-tabs" style={{ width: 'auto' }}>
                      {orderedPots.map(potName => (
                        <button
                          key={potName}
                          type="button"
                          className={`pot-selector-tab ${activeConfigPot === potName ? 'active' : ''}`}
                          onClick={() => setActiveConfigPot(potName)}
                        >
                          {potName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right part: Pot Quantity Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {t('setup_pot_quantity')}:
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => updatePotCount(orderedPots.length - 1)}
                        disabled={orderedPots.length <= 1}
                        style={{ padding: '0', height: '28px', width: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', borderRadius: '6px', border: 'none', background: 'transparent' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '24px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                        {orderedPots.length}
                      </span>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => updatePotCount(orderedPots.length + 1)}
                        style={{ padding: '0', height: '28px', width: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', borderRadius: '6px', border: 'none', background: 'var(--cyan-primary)', color: 'white' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wizard-config-grid">
                
                {/* Left Column: Participants Management */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="step-heading" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', fontSize: '1.15rem' }}>
                    {t('wizard_step_1_heading')}
                  </h3>
                  <p className="step-description" style={{ minHeight: '40px' }}>{t('wizard_step_1_desc')}</p>
                  
                  <div>
                    <form onSubmit={handleAddParticipant} className="input-container" style={{ margin: '12px 0 8px 0' }}>
                      <input
                        type="text"
                        className="custom-input"
                        placeholder={t('wizard_step_1_placeholder')}
                        value={newPersonName}
                        onChange={(e) => setNewPersonName(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="btn-primary">
                        {t('setup_btn_add')}
                      </button>
                    </form>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px', display: 'block' }}>
                      {t('setup_comma_hint')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>{t('setup_total_participants')}</span>
                    <span className="font-mono" style={{ fontWeight: 600, color: 'var(--cyan-primary)' }}>{participants.length}</span>
                  </div>

                  <div className="items-list wizard-badge-list" style={{ height: '230px', overflowY: 'auto', background: 'rgba(0, 0, 0, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    {participants.length === 0 ? (
                      <div className="empty-state" style={{ width: '100%', border: 'none' }}>{t('wizard_empty_participants')}</div>
                    ) : (
                      participants.map(name => (
                        <span key={name} className="item-badge cyan">
                          {name}
                          <button type="button" className="btn-remove-badge" onClick={() => handleRemoveParticipant(name)}>&times;</button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Right Column: Teams Management */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="step-heading" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', fontSize: '1.15rem' }}>
                    {t('wizard_step_2_heading')}
                  </h3>
                  <p className="step-description" style={{ minHeight: '40px' }}>{t('wizard_step_2_desc', { count: participants.length })}</p>

                  <div>
                    {/* Entrada para agregar equipos al bombo activo */}
                    <form onSubmit={handleAddTeam} className="input-container" style={{ margin: '12px 0 8px 0' }}>
                      <input
                        type="text"
                        className="custom-input"
                        placeholder={t('wizard_step_2_team_placeholder', { potName: activeConfigPot })}
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                      />
                      <button type="submit" className="btn-primary">
                        {t('setup_btn_add')}
                      </button>
                    </form>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px', display: 'block' }}>
                      {t('setup_comma_hint')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>{t('wizard_pot_label_edit', { potName: activeConfigPot })}</span>
                    <span className="font-mono" style={{ fontWeight: 600, color: 'var(--magenta-primary)' }}>
                      {(pots[activeConfigPot] || []).length}
                    </span>
                  </div>

                  <div className="items-list wizard-badge-list" style={{ height: '230px', overflowY: 'auto', background: 'rgba(0, 0, 0, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    {(!pots[activeConfigPot] || pots[activeConfigPot].length === 0) ? (
                      <div className="empty-state" style={{ width: '100%', border: 'none' }}>{t('wizard_empty_teams', { potName: activeConfigPot })}</div>
                    ) : (
                      pots[activeConfigPot].map(team => (
                        <span key={team} className="item-badge magenta">
                          {team}
                          <button type="button" className="btn-remove-badge" onClick={() => handleRemoveTeam(team)}>&times;</button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PASO 2: Resumen de Validación General */}
          {step === 2 && (
            <div className="wizard-step-content">
              <h3 className="step-heading">{t('wizard_step_3_heading')}</h3>
              <p className="step-description">{t('wizard_step_3_desc')}</p>

              <div className="summary-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  background: 'var(--bg-darker)',
                  border: '1px solid var(--card-border)',
                  padding: '12px 14px',
                  borderRadius: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>👥 {t('setup_total_participants')}</span>
                    <span className="highlight-cyan font-mono" style={{ fontWeight: 700 }}>{participants.length}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    padding: '4px',
                    borderRadius: '8px'
                  }}>
                    {participants.map(name => (
                      <span key={name} className="item-badge cyan" style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '6px' }}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginTop: '4px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                    {t('wizard_step_3_pot_status')}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {orderedPots.map(potName => {
                      const status = getPotValidationStatus(potName);
                      const potTeams = pots[potName] || [];
                      return (
                        <div key={potName} className="pot-summary-card" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          background: status.valid ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                          border: `1px solid ${status.valid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700 }}>{potName}</span>
                            <span style={{
                              fontSize: '0.8rem',
                              color: status.valid ? '#10b981' : '#f87171',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: status.valid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                            }}>
                              {status.message}
                            </span>
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            padding: '4px',
                            borderRadius: '8px'
                          }}>
                            {potTeams.length === 0 ? (
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                {t('setup_empty_teams')}
                              </span>
                            ) : (
                              potTeams.map(team => (
                                <span key={team} className="item-badge magenta" style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '6px' }}>
                                  {team}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {isStep2Valid ? (
                <div className="pot-status-alert valid" style={{ textAlign: 'center', margin: '16px 0' }}>
                  {t('wizard_step_3_alert_valid')}
                </div>
              ) : (
                <div className="pot-status-alert invalid" style={{ textAlign: 'center', margin: '16px 0' }}>
                  {t('wizard_step_3_alert_invalid', { count: participants.length })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Botones de Navegación del Modal */}
        <div className="wizard-footer">
          {step > 1 ? (
            <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>
              {t('wizard_btn_back')}
            </button>
          ) : (
            <div style={{ width: '1px' }}></div>
          )}

          {step < 2 ? (
            <button
              type="button"
              className="btn-primary"
              onClick={handleNextStep}
            >
              {t('wizard_btn_next')}
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={handleFinish}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}
            >
              {t('wizard_step_3_btn_finish')}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
