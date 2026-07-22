import React from 'react';

export default function ResultsSection({
  pots = {},
  results = [],
  onRemoveResult = () => {},
  onClearResults = () => {},
  t
}) {
  const potsList = Object.keys(pots).sort((a, b) => {
    const numA = parseInt(a.replace(/^\D+/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/^\D+/g, ''), 10) || 0;
    if (numA && numB) return numA - numB;
    return a.localeCompare(b);
  });

  const getResultsForPot = (potName) => {
    return results.filter(r => r.pot === potName);
  };

  const copyToClipboard = () => {
    if (results.length === 0) {
      alert(t('results_no_results'));
      return;
    }

    let text = t('results_clipboard_header');
    
    potsList.forEach(pot => {
      const potResults = getResultsForPot(pot);
      text += `📦 ${pot.toUpperCase()}:\n`;
      if (potResults.length === 0) {
        text += t('results_clipboard_empty');
      } else {
        potResults.forEach(r => {
          text += `  • ${r.person} ➔ ${r.team}\n`;
        });
      }
      text += '\n';
    });

    navigator.clipboard.writeText(text)
      .then(() => alert(t('results_copied')))
      .catch(err => {
        console.error('Error al copiar: ', err);
        alert(t('results_copy_failed'));
      });
  };

  const resetAssignments = () => {
    if (results.length === 0) return;
    if (window.confirm(t('results_confirm_reset'))) {
      onClearResults();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
      
      {/* Header and Copy Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('results_title')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t('results_subtitle')}
          </p>
        </div>
        
        <div className="results-actions">
          <button
            className="btn-secondary font-mono"
            onClick={copyToClipboard}
          >
            {t('results_btn_copy')}
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={resetAssignments}
            disabled={results.length === 0}
          >
            {t('results_btn_reset')}
          </button>
        </div>
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
                <span className={badgeClass}>
                  {potResults.length} / {pots[potName] ? pots[potName].length : 0}
                </span>
              </div>
              
              <div className="pair-list">
                {potResults.length === 0 ? (
                  <div className="empty-state">
                    {t('results_empty_state')}
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
                          title={t('results_remove_tooltip')}
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
