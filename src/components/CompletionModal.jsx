import { useState } from 'react';

const getPotResults = (results, pot) => results.filter((result) => result.pot === pot);

const makeTextReport = (pot, assignments, t) => {
  const rows = assignments.map((assignment, index) =>
    `${index + 1}. ${assignment.person} -> ${assignment.team}`,
  );

  return [
    'DUO RAFFLE',
    t('completion_title'),
    '',
    pot.toUpperCase(),
    '',
    ...rows,
  ].join('\n');
};

const downloadFile = (filename, type, contents) => {
  const file = new Blob([contents], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

export default function CompletionModal({ pot, results, onClose, t }) {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const assignments = getPotResults(results, pot);
  const report = makeTextReport(pot, assignments, t);

  const handleTextExport = () => {
    downloadFile('duo-raffle-resultados.txt', 'text/plain;charset=utf-8', report);
  };

  const handlePdfExport = async () => {
    setIsExportingPdf(true);

    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const columnSplit = 93;
      let y = 24;

      const drawHeader = () => {
        pdf.setFillColor(7, 17, 31);
        pdf.rect(0, 0, pageWidth, 17, 'F');
        pdf.setTextColor(244, 248, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(15);
        pdf.text('DUO RAFFLE', margin, 11);
        pdf.setTextColor(7, 17, 31);
      };

      const drawTableHeader = () => {
        pdf.setFillColor(94, 229, 255);
        pdf.rect(margin, y, pageWidth - margin * 2, 9, 'F');
        pdf.setTextColor(7, 17, 31);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.text(t('completion_person'), margin + 4, y + 6);
        pdf.text(t('completion_team'), columnSplit + 4, y + 6);
        pdf.setTextColor(7, 17, 31);
        y += 9;
      };

      drawHeader();
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.text(t('completion_title'), margin, y);
      y += 9;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(80, 99, 120);
      pdf.text(pot, margin, y);
      y += 10;
      drawTableHeader();

      assignments.forEach((assignment, index) => {
        if (y + 12 > pageHeight - 18) {
          pdf.addPage();
          y = 24;
          drawHeader();
          drawTableHeader();
        }

        pdf.setFillColor(index % 2 === 0 ? 241 : 248, index % 2 === 0 ? 247 : 250, index % 2 === 0 ? 252 : 255);
        pdf.rect(margin, y, pageWidth - margin * 2, 11, 'F');
        pdf.setDrawColor(210, 222, 235);
        pdf.rect(margin, y, pageWidth - margin * 2, 11);
        pdf.line(columnSplit, y, columnSplit, y + 11);
        pdf.setTextColor(7, 17, 31);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.text(`${index + 1}. ${assignment.person}`, margin + 4, y + 7);
        pdf.text(assignment.team, columnSplit + 4, y + 7);
        y += 11;
      });

      pdf.setFontSize(8);
      pdf.setTextColor(111, 132, 158);
      pdf.text(`Duo Raffle - ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);
      pdf.save('duo-raffle-resultados.pdf');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="completion-overlay" role="dialog" aria-modal="true" aria-labelledby="completion-title">
      <section className="completion-modal glass-panel">
        <span className="section-kicker">DUO RAFFLE</span>
        <h2 id="completion-title">{t('completion_title')}</h2>
        <p className="completion-description">{t('completion_description', { pot })}</p>

        <div className="completion-table-wrap">
          <table className="completion-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('completion_person')}</th>
                <th>{t('completion_team')}</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={`${assignment.person}-${assignment.team}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{assignment.person}</td>
                  <td>{assignment.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="completion-actions">
          <button type="button" className="btn-secondary" onClick={handleTextExport}>
            {t('completion_export_text')}
          </button>
          <button type="button" className="btn-primary" onClick={handlePdfExport} disabled={isExportingPdf}>
            {isExportingPdf ? t('completion_exporting_pdf') : t('completion_export_pdf')}
          </button>
        </div>
        <button type="button" className="completion-close" onClick={onClose}>
          {t('completion_close')}
        </button>
      </section>
    </div>
  );
}
