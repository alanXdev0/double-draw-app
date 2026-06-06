import React, { useState, useEffect } from 'react';

/**
 * Componente InterstitialAd
 * 
 * Renderiza un anuncio a pantalla completa (intersticial).
 * Obliga a una visualización mínima de 5 segundos mediante una cuenta regresiva.
 */
export default function InterstitialAd({ onClose = () => {}, t }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Si adsbygoogle está en el DOM, ejecuta la carga del anuncio intersticial
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("Script AdSense Intersticial no cargado aún:", e);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="interstitial-overlay">
      <div className="interstitial-card glass-panel glow-magenta">
        <div className="interstitial-header">
          <span className="interstitial-tag">{t('ad_tag')}</span>
          <span className="interstitial-info">{t('ad_info')}</span>
        </div>

        {/* Espacio para el script de AdSense Intersticial o AdMob Web */}
        <div className="interstitial-ad-slot">
          {/*
            ======================================================================
            INSTRUCCIONES PARA ACTIVAR TU ANUNCIO INTERSTICIAL:
            1. Descomenta el bloque <ins> a continuación.
            2. Reemplaza "ca-pub-XXXXXXXXXXXXXXXX" con tu ID de editor de AdSense.
            3. Reemplaza "data-ad-slot" con tu ID de slot para anuncios a pantalla completa.
            ======================================================================
          */}
          {/*
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '300px', height: '250px' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="1111111111"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          */}

          {/* Placeholder premium en desarrollo */}
          <div className="interstitial-placeholder">
            <span className="ad-screen-icon">📺</span>
            <div className="ad-screen-content">
              <h4>{t('ad_title')}</h4>
              <p>{t('ad_subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Footer y botón de cerrar condicional */}
        <div className="interstitial-footer">
          {countdown > 0 ? (
            <div className="ad-countdown">
              {t('ad_countdown', { count: countdown })}
            </div>
          ) : (
            <button className="btn-primary btn-skip-ad" onClick={onClose}>
              {t('ad_skip')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
