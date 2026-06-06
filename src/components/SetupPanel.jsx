import React, { useState, useEffect } from 'react';

export default function SetupPanel({
  participants = [],
  pots = {},
  onAddParticipant = () => {},
  onRemoveParticipant = () => {},
  onAddTeam = () => {},
  onRemoveTeam = () => {},
  onResetToDefaults = () => {},
  onClearResults = () => {},
  onUpdatePotCount = () => {},
  onOpenWizard = () => {},
  t
}) {
  const [newPerson, setNewPerson] = useState('');
  const [newTeam, setNewTeam] = useState('');
  const [selectedConfigPot, setSelectedConfigPot] = useState(() => {
    const keys = Object.keys(pots);
    return keys.includes("Bombo 1") ? "Bombo 1" : (keys[0] || "Bombo 1");
  });

  // Ensure active tab remains valid when pots are added/removed
  useEffect(() => {
    const keys = Object.keys(pots);
    if (selectedConfigPot && !keys.includes(selectedConfigPot)) {
      setSelectedConfigPot("Bombo 1");
    }
  }, [pots, selectedConfigPot]);

  const handleAddPersonSubmit = (e) => {
    e.preventDefault();
    if (newPerson.trim()) {
      onAddParticipant(newPerson.trim());
      setNewPerson('');
    }
  };

  const handleAddTeamSubmit = (e) => {
    e.preventDefault();
    if (newTeam.trim()) {
      onAddTeam(selectedConfigPot, newTeam.trim());
      setNewTeam('');
    }
  };

  const confirmReset = () => {
    if (window.confirm(t('setup_confirm_reset'))) {
      onResetToDefaults();
    }
  };

  const confirmClearResults = () => {
    if (window.confirm(t('setup_confirm_clear'))) {
      onClearResults();
    }
  };

  return (
    <div className="config-grid">
      
      {/* Left Column: Participants Management */}
      <div className="glass-panel config-card">
        <h2 style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', fontSize: '1.25rem' }}>
          {t('setup_title_participants')}
        </h2>
        
        <form onSubmit={handleAddPersonSubmit} className="form-group">
          <label htmlFor="new-person">{t('setup_add_participant')}</label>
          <div className="input-container">
            <input
              id="new-person"
              type="text"
              className="custom-input"
              placeholder={t('setup_placeholder_participant')}
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '10px' }}>
              {t('setup_btn_add')}
            </button>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            {t('setup_comma_hint')}
          </span>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>{t('setup_total_participants')}</span>
          <span className="font-mono" style={{ fontWeight: 600, color: 'var(--cyan-primary)' }}>{participants.length}</span>
        </div>

        <div className="items-list" style={{ minHeight: '200px', background: 'rgba(0, 0, 0, 0.15)', borderRadius: '12px', padding: '12px' }}>
          {participants.length === 0 ? (
            <div className="empty-state" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
              {t('setup_empty_participants')}
            </div>
          ) : (
            participants.map((person) => (
              <span key={person} className="item-badge cyan">
                {person}
                <button
                  type="button"
                  className="btn-remove-badge"
                  onClick={() => onRemoveParticipant(person)}
                  title={`Eliminar a ${person}`}
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Pots and Teams Management */}
      <div className="glass-panel config-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '1.25rem' }}>{t('setup_title_pots')}</h2>
          
          <div className="pot-selector-tabs" style={{ width: 'auto' }}>
            {Object.keys(pots).sort((a, b) => {
              const numA = parseInt(a.replace(/^\D+/g, ''), 10) || 0;
              const numB = parseInt(b.replace(/^\D+/g, ''), 10) || 0;
              if (numA && numB) return numA - numB;
              return a.localeCompare(b);
            }).map((potName) => {
              const potTabLabel = potName.includes('Bombo ')
                ? potName.replace('Bombo ', t('bombo_activo').includes('Pot') || t('bombo_activo').includes('Pote') || t('bombo_activo').includes('Chapeau') || t('bombo_activo').includes('Topf') || t('bombo_activo').includes('Urna') || t('bombo_activo').includes('المستوى') ? (t('bombo_activo').includes('المستوى') ? '' : 'P') : 'B')
                : potName;
              return (
                <button
                  key={potName}
                  type="button"
                  className={`pot-selector-tab ${selectedConfigPot === potName ? 'active' : ''}`}
                  onClick={() => setSelectedConfigPot(potName)}
                >
                  {potTabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pot Management Panel */}
        <div className="form-group" style={{ background: 'var(--bg-darker)', padding: '8px 12px', borderRadius: '12px', border: '1px dashed var(--card-border)', marginBottom: '8px' }}>
          <label>{t('setup_pot_management')}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {t('setup_pot_quantity')}:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onUpdatePotCount(Object.keys(pots).length - 1)}
                disabled={Object.keys(pots).length <= 1}
                style={{ padding: '0', height: '28px', width: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', borderRadius: '6px', border: 'none', background: 'transparent' }}
              >
                -
              </button>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '24px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                {Object.keys(pots).length}
              </span>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onUpdatePotCount(Object.keys(pots).length + 1)}
                style={{ padding: '0', height: '28px', width: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', borderRadius: '6px', border: 'none', background: 'var(--cyan-primary)', color: 'white' }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddTeamSubmit} className="form-group">
          <label htmlFor="new-team">{t('setup_add_team', { pot: selectedConfigPot || '(Ninguno)' })}</label>
          <div className="input-container">
            <input
              id="new-team"
              type="text"
              className="custom-input"
              placeholder={t('setup_placeholder_team')}
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              disabled={!selectedConfigPot}
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '10px' }} disabled={!selectedConfigPot}>
              {t('setup_btn_add')}
            </button>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            {t('setup_comma_hint')}
          </span>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>{t('setup_pot_label_edit', { potName: selectedConfigPot })}</span>
          <span className="font-mono" style={{ fontWeight: 600, color: 'var(--magenta-primary)' }}>
            {(pots[selectedConfigPot] || []).length}
          </span>
        </div>

        <div className="items-list" style={{ minHeight: '200px', background: 'rgba(0, 0, 0, 0.15)', borderRadius: '12px', padding: '12px' }}>
          {(!pots[selectedConfigPot] || pots[selectedConfigPot].length === 0) ? (
            <div className="empty-state" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
              {t('setup_empty_teams')}
            </div>
          ) : (
            pots[selectedConfigPot].map((team) => (
              <span key={team} className="item-badge magenta">
                {team}
                <button
                  type="button"
                  className="btn-remove-badge"
                  onClick={() => onRemoveTeam(selectedConfigPot, team)}
                  title={`Eliminar ${team}`}
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>

        {/* Global Administrative Actions Card inside Setup Panel */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            className="btn-danger"
            onClick={confirmClearResults}
          >
            {t('setup_btn_clear_results')}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={onOpenWizard}
            style={{ borderColor: 'rgba(0, 86, 179, 0.35)', color: 'var(--cyan-primary)', background: 'rgba(0, 86, 179, 0.06)' }}
          >
            {t('setup_btn_open_wizard')}
          </button>
          
          <button
            type="button"
            className="btn-secondary"
            onClick={confirmReset}
            style={{ borderColor: 'rgba(217, 29, 78, 0.35)', color: 'var(--magenta-primary)', background: 'rgba(217, 29, 78, 0.06)' }}
          >
            {t('setup_btn_reset_defaults')}
          </button>
        </div>
      </div>

    </div>
  );
}
