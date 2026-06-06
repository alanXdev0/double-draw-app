import React from 'react';

export default function ResultsSection({
  results = [],
  onRemoveResult = () => {}
}) {
  const potsList = ['Bombo 1', 'Bombo 2', 'Bombo 3', 'Bombo 4'];

  const getResultsForPot = (potName) => {
    return results.filter(r => r.pot === potName);
  };

  const copyToClipboard = () => {
    if (results.length === 0) {
      alert('No hay resultados para copiar.');
      return;
    }

    let text = '🏆 RESULTADOS DEL SORTEO DE EQUIPOS 🏆\n\n';
    
    potsList.forEach(pot => {
      const potResults = getResultsForPot(pot);
      text += `📦 ${pot.toUpperCase()}:\n`;
      if (potResults.length === 0) {
        text += '  (Sin sorteos aún)\n';
      } else {
        potResults.forEach(r => {
          text += `  • ${r.person} ➔ ${r.team}\n`;
        });
      }
      text += '\n';
    });

    navigator.clipboard.writeText(text)
      .then(() => alert('¡Resultados copiados al portapapeles!'))
      .catch(err => {
        console.error('Error al copiar: ', err);
        alert('No se pudo copiar automáticamente. Por favor, selecciona el texto manualmente.');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
      
      {/* Header and Copy Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Resultados Asignados</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Los ganadores sorteados se retiran de las ruletas y se listan aquí.
          </p>
        </div>
        
        <button
          className="btn-secondary font-mono"
          onClick={copyToClipboard}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
        >
          📋 Copiar Resultados
        </button>
      </div>

      {/* Grid of Pots Results */}
      <div className="results-grid">
        {potsList.map((potName, index) => {
          const potResults = getResultsForPot(potName);
          const badgeClass = `pot-badge pot-${index + 1}`;
          
          return (
            <div key={potName} className="glass-panel pot-results-card">
              <div className="pot-header">
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {potName}
                </span>
                <span className={badgeClass}>{potResults.length} / 12</span>
              </div>
              
              <div className="pair-list">
                {potResults.length === 0 ? (
                  <div className="empty-state">
                    Ningún equipo asignado
                  </div>
                ) : (
                  potResults.map((r, idx) => (
                    <div key={`${r.person}-${r.team}-${idx}`} className="pair-item">
                      <div className="pair-names">
                        <span className="pair-person">{r.person}</span>
                        <span className="pair-team">{r.team}</span>
                      </div>
                      
                      <div className="pair-actions">
                        <button
                          type="button"
                          className="btn-remove-pair"
                          onClick={() => onRemoveResult(r.pot, r.person, r.team)}
                          title="Eliminar este sorteo y regresar a la ruleta"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
