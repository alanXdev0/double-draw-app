import React, { useEffect } from 'react';

/**
 * Componente AdBanner
 * 
 * Espacio publicitario adaptado para Google AdSense o AdMob (versión Web).
 * Viene pre-configurado para ejecutar la carga de anuncios en producción
 * y muestra un placeholder premium en desarrollo/vacío.
 */
export default function AdBanner({ slotId, format = 'auto', style = {}, t }) {
  useEffect(() => {
    // Si adsbygoogle está disponible en el DOM, ejecuta la carga del anuncio
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("AdSense script no inicializado aún:", e);
    }
  }, []);

  const formatText = format === 'auto' ? 'Adaptable 728x90 / 320x50' : format;

  return (
    <div className="ad-container glass-panel" style={style}>
      <div className="ad-label">{t ? t('ad_banner_label') : 'PUBLICIDAD'}</div>
      
      {/* Contenedor del anuncio real */}
      <div className="ad-slot-wrapper">
        {/*
          ======================================================================
          INSTRUCCIONES PARA ACTIVAR GOOGLE ADSENSE / ADMOB WEB:
          1. Descomenta el bloque <ins> a continuación.
          2. Reemplaza "ca-pub-XXXXXXXXXXXXXXXX" con tu ID de editor de AdSense.
          3. Reemplaza el slotId si deseas mapearlo mediante props.
          ======================================================================
        */}
        {/*
        <ins className="adsbygoogle"
             style={{ display: 'block', minWidth: '250px', height: '90px' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId || "0000000000"}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
        */}

        {/* Placeholder estético para previsualización o cuando no hay anuncios cargados */}
        <div className="ad-placeholder">
          <span className="ad-icon">📢</span>
          <div className="ad-text-content">
            <span className="ad-title">{t ? t('ad_banner_title') : 'Espacio Publicitario AdMob / AdSense'}</span>
            <span className="ad-subtitle">
              {t ? t('ad_banner_subtitle', { format: formatText }) : `Listo para producción (${formatText})`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
