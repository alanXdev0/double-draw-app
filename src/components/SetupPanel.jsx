import React, { useState } from 'react';

export default function SetupPanel({
  participants = [],
  pots = {},
  onAddParticipant = () => {},
  onRemoveParticipant = () => {},
  onAddTeam = () => {},
  onRemoveTeam = () => {},
  onResetToDefaults = () => {},
  onClearResults = () => {}
}) {
  const [newPerson, setNewPerson] = useState('');
  const [newTeam, setNewTeam] = useState('');
  const [selectedConfigPot, setSelectedConfigPot] = useState('Bombo 1');

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
    if (window.confirm('¿Estás seguro de que quieres restablecer todos los participantes y bombos a los valores predefinidos del Mundial? Esto también borrará los resultados actuales.')) {
      onResetToDefaults();
    }
  };

  const confirmClearResults = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los emparejamientos sorteados? Las ruletas volverán a llenarse.')) {
      onClearResults();
    }
  };

  return (
    <div className="config-grid">
      
      {/* Left Column: Participants Management */}
      <div className="glass-panel config-card">
        <h2 style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', fontSize: '1.25rem' }}>
          Gestión de Participantes
        </h2>
        
        <form onSubmit={handleAddPersonSubmit} className="form-group">
          <label htmlFor="new-person">Añadir Participante</label>
          <div className="input-container">
            <input
              id="new-person"
              type="text"
              className="custom-input"
              placeholder="Nombre de la persona..."
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '10px' }}>
              Añadir
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>Total de participantes:</span>
          <span className="font-mono" style={{ fontWeight: 600, color: 'var(--cyan-primary)' }}>{participants.length}</span>
        </div>

        <div className="items-list" style={{ minHeight: '200px', background: 'rgba(0, 0, 0, 0.15)', borderRadius: '12px', padding: '12px' }}>
          {participants.length === 0 ? (
            <div className="empty-state" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
              No hay participantes
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
          <h2 style={{ fontSize: '1.25rem' }}>Configuración de Bombos y Equipos</h2>
          
          <div className="pot-selector-tabs" style={{ width: 'auto' }}>
            {Object.keys(pots).map((potName) => (
              <button
                key={potName}
                type="button"
                className={`pot-selector-tab ${selectedConfigPot === potName ? 'active' : ''}`}
                onClick={() => setSelectedConfigPot(potName)}
              >
                {potName.replace('Bombo ', 'B')}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleAddTeamSubmit} className="form-group">
          <label htmlFor="new-team">Añadir Equipo a {selectedConfigPot}</label>
          <div className="input-container">
            <input
              id="new-team"
              type="text"
              className="custom-input"
              placeholder="Nombre del equipo (ej. Alemania 🇩🇪)..."
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '10px' }}>
              Añadir
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>Equipos en {selectedConfigPot}:</span>
          <span className="font-mono" style={{ fontWeight: 600, color: 'var(--magenta-primary)' }}>
            {(pots[selectedConfigPot] || []).length}
          </span>
        </div>

        <div className="items-list" style={{ minHeight: '200px', background: 'rgba(0, 0, 0, 0.15)', borderRadius: '12px', padding: '12px' }}>
          {(!pots[selectedConfigPot] || pots[selectedConfigPot].length === 0) ? (
            <div className="empty-state" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
              No hay equipos cargados en este bombo
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
            Limpiar Resultados Sorteados
          </button>
          
          <button
            type="button"
            className="btn-secondary"
            onClick={confirmReset}
            style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f8fafc', background: 'rgba(239, 68, 68, 0.05)' }}
          >
            Restablecer Predefinidos
          </button>
        </div>
      </div>

    </div>
  );
}
