import React, { useState } from 'react';

function GuideSection({ lang }) {
  const isSpanish = lang === 'es';

  // State to handle FAQ accordion open/close
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Content definitions
  const content = {
    es: {
      title: "📖 Guía de Sorteos & Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber para organizar sorteos balanceados, transparentes y espectaculares en Duo Raffle.",
      
      stepsTitle: "🚀 Guía Rápida de Uso",
      step1Title: "1. Registrar Participantes",
      step1Desc: "Ve a la pestaña Configuración o usa el Asistente. Añade los nombres de las personas que participan (ej. tus amigos o jugadores). Puedes pegar una lista separada por comas.",
      
      step2Title: "2. Cargar Equipos o Premios",
      step2Desc: "Crea bombos (pots) y añade los equipos correspondientes. Recuerda: para activar la ruleta, el número total de equipos en el bombo activo debe ser igual al total de participantes.",
      
      step3Title: "3. Sorteo en Vivo y Resultados",
      step3Desc: "Selecciona el bombo activo, ve al tablero de Sorteo y pulsa 'Girar Ruleta'. El sistema emparejará un participante con un equipo al azar de forma visual. Copia el resultado final al terminar.",

      faqTitle: "💬 Preguntas Frecuentes (FAQ)",
      faqs: [
        {
          q: "¿Qué es una Ruleta Doble y por qué es mejor?",
          a: "En un sorteo tradicional, solo eliges un nombre al azar. Con la Ruleta Doble de Duo Raffle, giras dos ruedas simultáneamente: una con personas y otra con equipos o premios. Esto genera una experiencia visual y emocionante única para competiciones deportivas, videojuegos o dinámicas de grupo, manteniendo la equidad y transparencia total."
        },
        {
          q: "¿El algoritmo es realmente aleatorio y justo?",
          a: "Sí. Duo Raffle utiliza funciones matemáticas de aleatorización en el navegador para mezclar los índices de los participantes y equipos de forma independiente. No existe ningún tipo de sesgo ni predeterminación en los emparejamientos."
        },
        {
          q: "¿Cómo configuro un sorteo tipo Champions League?",
          a: "Puedes crear múltiples bombos (ej. Bombo 1 para cabezas de serie, Bombo 2 para los segundos). En la pestaña de Sorteo, puedes ir seleccionando el bombo activo uno a uno. Recuerda que cada participante se emparejará con un elemento de cada bombo activo sucesivamente."
        },
        {
          q: "¿Dónde se guardan mis datos de configuración?",
          a: "Toda la información (nombres de participantes, equipos cargados en los bombos e historial de emparejamientos) se guarda de forma segura en la memoria local de tu navegador (Local Storage). No almacenamos nada en servidores externos, por lo que tu privacidad está 100% garantizada."
        },
        {
          q: "¿Cómo restauro la app si ocurre un error?",
          a: "En la pestaña 'Configuración', puedes pulsar el botón 'Restablecer Predefinidos'. Esto borrará los datos personalizados y cargará un ejemplo inicial funcional para que puedas comenzar de nuevo rápidamente."
        }
      ]
    },
    en: {
      title: "📖 Draft Guide & Frequently Asked Questions",
      subtitle: "Everything you need to know to organize balanced, transparent, and spectacular draws in Duo Raffle.",
      
      stepsTitle: "🚀 Quick Start Guide",
      step1Title: "1. Register Participants",
      step1Desc: "Go to the Settings tab or use the Assistant. Add the names of the participating people (e.g. your friends or players). You can paste a comma-separated list.",
      
      step2Title: "2. Load Teams or Prizes",
      step2Desc: "Create pots and add the corresponding teams. Remember: to spin the wheel, the total number of teams in the active pot must equal the total number of participants.",
      
      step3Title: "3. Live Draft & Results",
      step3Desc: "Select the active pot, go to the Draft dashboard, and press 'Spin Wheel'. The system will pair a participant with a team randomly and visually. Copy the final results when finished.",

      faqTitle: "💬 Frequently Asked Questions (FAQ)",
      faqs: [
        {
          q: "What is a Double Roulette and why is it better?",
          a: "In a traditional raffle, you only pick one name at random. With Duo Raffle's Double Roulette, you spin two wheels simultaneously: one with people and one with teams or prizes. This creates a unique visual and exciting experience for sports, gaming, or group dynamics, while maintaining complete fairness and transparency."
        },
        {
          q: "Is the algorithm truly random and fair?",
          a: "Yes. Duo Raffle uses mathematically secure client-side randomization logic to shuffle participants and teams independently. There is no bias or predetermination in the pairings."
        },
        {
          q: "How do I configure a Champions League style draw?",
          a: "You can create multiple pots (e.g. Pot 1 for top seeds, Pot 2 for runners-up). In the Draft tab, you can select the active pot one by one. Remember that each participant will be paired with one item from each active pot sequentially."
        },
        {
          q: "Where is my configuration data saved?",
          a: "All information (participant names, teams loaded in pots, and pairing history) is stored securely in your browser's local memory (Local Storage). We do not store anything on external servers, so your privacy is 100% guaranteed."
        },
        {
          q: "How do I reset the app if an error occurs?",
          a: "In the 'Settings' tab, you can click the 'Reset to Defaults' button. This will erase custom data and load a functional initial example so you can restart quickly."
        }
      ]
    }
  };

  // Fallback to English if the current language is not Spanish
  const text = content[isSpanish ? 'es' : 'en'];

  return (
    <div className="guide-container" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      maxWidth: '900px',
      margin: '0 auto',
      animation: 'fadeIn 0.4s ease-out forwards'
    }}>
      {/* Introduction */}
      <div className="glass-panel" style={{
        padding: '32px',
        textAlign: 'center',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        boxShadow: 'var(--glass-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--cyan-primary) 0%, var(--magenta-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          {text.title}
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          {text.subtitle}
        </p>
      </div>

      {/* Steps */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {text.stepsTitle}
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }} className="steps-grid">
          {/* Step 1 */}
          <div style={{
            background: 'var(--cyan-bg)',
            border: '1px solid var(--cyan-border)',
            borderRadius: '12px',
            padding: '20px',
            transition: 'transform 0.2s ease'
          }}>
            <h4 style={{ color: 'var(--cyan-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
              {text.step1Title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              {text.step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            background: 'var(--magenta-bg)',
            border: '1px solid var(--magenta-border)',
            borderRadius: '12px',
            padding: '20px',
            transition: 'transform 0.2s ease'
          }}>
            <h4 style={{ color: 'var(--magenta-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
              {text.step2Title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              {text.step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            transition: 'transform 0.2s ease'
          }}>
            <h4 style={{ color: '#c69214', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
              {text.step3Title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              {text.step3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        boxShadow: 'var(--glass-shadow)',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '24px',
          color: 'var(--text-primary)'
        }}>
          {text.faqTitle}
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {text.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} style={{
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.3)',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>
                {/* Accordion Trigger Header */}
                <button onClick={() => toggleFaq(index)} style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  color: isOpen ? 'var(--cyan-primary)' : 'var(--text-primary)',
                  transition: 'color 0.2s ease'
                }}>
                  <span>{faq.q}</span>
                  <span style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    fontSize: '1.2rem',
                    color: 'var(--text-muted)'
                  }}>
                    ▼
                  </span>
                </button>

                {/* Accordion Content */}
                <div style={{
                  maxHeight: isOpen ? '300px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease, padding 0.3s ease',
                  padding: isOpen ? '0 24px 20px 24px' : '0 24px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GuideSection;
