export const TRANSLATIONS = {
  es: {
    logo: "DUO RAFFLE",
    logo_tagline: "TU RULETA DOBLE",
    tab_sorteo: "🎯 Sorteo",
    tab_config: "⚙️ Configuración",
    footer_text: "Duo Raffle • Desarrollado por Alan Anaya Araujo 🎯",
    celebration_title: "🎉 ¡NUEVA ASIGNACIÓN COMPLETADA! 🎉",
    btn_accept_continue: "Aceptar y Continuar",
    versus_divider: "— le ha tocado a —",

    // DrawDashboard
    dashboard_title: "Panel de Sorteos Aleatorios",
    bombo_activo: "Bombo Activo:",
    participants_free: "Participantes Libres:",
    teams_available: "Equipos Disponibles:",
    spin_btn_spinning: "SORTEANDO...",
    spin_btn_mismatch: "DIFERENCIA DE CANTIDADES",
    spin_btn_completed: "SORTEO COMPLETADO",
    spin_btn_idle: "GIRAR RULETA",
    spin_subtext_completed:
      "Todos los sorteos para este bombo se han realizado",
    spin_subtext_idle: "Presiona para elegir un par al azar",
    spin_subtext_mismatch:
      "⚠️ El número de participantes ({totalParticipants}) debe ser igual al número de equipos en este bombo ({totalTeams}) para iniciar el sorteo.",
    participants_title: "Participantes",
    teams_title: "Equipos",
    live_draft: "SORTEO EN VIVO",
    waiting: "ESPERANDO...",

    // SetupPanel
    setup_title_participants: "Gestión de Participantes",
    setup_add_participant: "Añadir Participante",
    setup_placeholder_participant: "Nombre de la persona...",
    setup_btn_add: "Añadir",
    setup_total_participants: "Total de participantes:",
    setup_empty_participants: "No hay participantes",
    setup_title_pots: "Configuración de Bombos y Equipos",
    setup_pot_management: "Gestión de Bombos",
    setup_placeholder_pot: "Nombre del nuevo bombo (ej. Bombo 5)...",
    setup_btn_create_pot: "+ Crear Bombo",
    setup_add_team: "Añadir Equipo a {pot}",
    setup_placeholder_team: "Nombre del equipo (ej. Equipo A)...",
    setup_total_teams: "Equipos en {pot}:",
    setup_empty_teams: "No hay equipos cargados en este bombo",
    setup_btn_clear_results: "Limpiar Resultados Sorteados",
    setup_btn_reset_defaults: "Restablecer Predefinidos",
    setup_btn_open_wizard: "⚙️ Abrir Asistente",
    setup_confirm_reset:
      "¿Estás seguro de que quieres restablecer todos los participantes y bombos a los valores predefinidos? Esto también borrará los resultados actuales.",
    setup_confirm_clear:
      "¿Estás seguro de que quieres limpiar todos los emparejamientos sorteados? Las ruletas volverán a llenarse.",
    setup_confirm_delete_pot:
      '¿Estás seguro de que quieres eliminar "{potName}"? Todos los equipos cargados y emparejamientos asociados de este bombo se perderán.',
    confirm_reduce_pots:
      "Al reducir la cantidad de bombos se perderán los equipos de los bombos eliminados. ¿Deseas continuar?",
    setup_pot_quantity: "Cantidad de Bombos",

    // ResultsSection
    results_title: "Resultados Asignados",
    results_subtitle:
      "Los ganadores sorteados se retiran de las ruletas y se listan aquí.",
    results_btn_copy: "📋 Copiar Resultados",
    results_copied: "¡Resultados copiados al portapapeles!",
    results_no_results: "No hay resultados para copiar.",
    results_clipboard_header: "🏆 RESULTADOS DEL DRAFT 🏆\n\n",
    results_clipboard_empty: "  (Sin sorteos aún)\n",
    results_empty_state: "Ningún equipo asignado",
    results_remove_tooltip: "Eliminar este sorteo y regresar a la ruleta",

    // OnboardingWizard
    wizard_title: "🏆 Configuración Inicial de Sorteo",
    wizard_subtitle:
      "Configura tus participantes y equipos de forma balanceada antes de empezar.",
    wizard_step_participants: "Participantes",
    wizard_step_pots: "Bombos y Equipos",
    wizard_step_summary: "Resumen",
    wizard_step_1_heading: "Paso 1: Registra los Participantes",
    wizard_step_1_desc:
      "Agrega los nombres de las personas que participarán en el sorteo (mínimo 2).",
    wizard_step_1_placeholder: "Nombre de la persona (ej. Alan)...",
    wizard_step_2_heading: "Paso 2: Gestiona tus Bombos y Equipos",
    wizard_step_2_desc:
      "Cada bombo debe tener exactamente {count} equipos (el mismo número de participantes).",
    wizard_step_2_pot_label: "Crear Nuevo Bombo",
    wizard_step_2_placeholder: "Nombre del bombo (ej. Bombo 2)...",
    wizard_step_2_create: "+ Crear",
    wizard_step_2_team_placeholder:
      "Añadir equipo a {potName} (ej. Equipo A)...",
    wizard_step_2_empty_teams: "No hay equipos en {potName}",
    wizard_step_2_alert_valid:
      "✅ ¡Listo! Coincide con los {count} participantes.",
    wizard_step_3_heading: "Paso 3: Validaciones Finales",
    wizard_step_3_desc:
      "Revisa que todos tus bombos cumplan con el balance de participantes antes de guardar.",
    wizard_step_3_pot_status: "Estado de los Bombos:",
    wizard_step_3_alert_valid:
      "🎉 ¡Perfecto! Todos los bombos están balanceados. Estás listo para comenzar.",
    wizard_step_3_alert_invalid:
      "❌ No puedes iniciar. Asegúrate de que todos los bombos tengan exactamente {count} equipos.",
    wizard_step_3_btn_finish: "🚀 Comenzar Sorteo!",
    wizard_btn_back: "Atrás",
    wizard_btn_next: "Siguiente",
    wizard_teams_missing: "Faltan {count} equipos ({current}/{total})",
    wizard_teams_extra: "Sobran {count} equipos ({current}/{total})",
    wizard_teams_match: "Coincide ({count} equipos)",

    // InterstitialAd
    ad_tag: "📢 Anuncio Patrocinado",
    ad_info: "La aplicación se mantiene gracias a la publicidad",
    ad_title: "Anuncio Intersticial Completo",
    ad_subtitle: "Tu código AdSense se renderizará en esta ventana.",
    ad_countdown: "Puedes omitir este anuncio en {count} segundos...",
    ad_skip: "Continuar al Sorteo ➔",

    // Extra
    alert_duplicate_participant:
      "Esta persona ya está en la lista de participantes.",
    alert_duplicate_team: "Este equipo ya está registrado.",
    alert_pot_teams_exceeded: "No puedes agregar más equipos a este bombo que el número de participantes.",
    alert_duplicate_pot: 'El bombo "{potName}" ya existe.',
    empty_wheel: "Vacío",
    ad_banner_label: "PUBLICIDAD",
    ad_banner_title: "Espacio Publicitario AdSense",
    ad_banner_subtitle: "Listo para producción ({format})",
    setup_pot_obligatorio:
      "El 'Bombo 1' es obligatorio y no se puede eliminar.",
    wizard_validation_warnings:
      "Por favor corrige las advertencias antes de continuar.",
    wizard_empty_participants: "Aún no has agregado participantes",
    wizard_empty_teams: "No hay equipos en {potName}",
    wizard_pot_label_edit: "Equipos en {potName}:",
    results_copy_failed:
      "No se pudo copiar automáticamente. Por favor, selecciona el texto manualmente.",
    btn_delete_pot_label: "Eliminar {potName}",
    setup_comma_hint:
      "Puedes agregar varios separados por comas (ej. Juan, Pedro, María)",
    wizard_min_participants: "Se requieren mínimo 2 participantes."
  },
  en: {
    logo: "DUO RAFFLE",
    logo_tagline: "YOUR DOUBLE ROULETTE",
    tab_sorteo: "🎯 Draft",
    tab_config: "⚙️ Settings",
    footer_text: "Duo Raffle • Developed by Alan Anaya Araujo 🎯",
    celebration_title: "🎉 NEW ASSIGNMENT COMPLETED! 🎉",
    btn_accept_continue: "Accept and Continue",
    versus_divider: "— has drawn —",

    // DrawDashboard
    dashboard_title: "Random Draft Board",
    bombo_activo: "Active Pot:",
    participants_free: "Free Participants:",
    teams_available: "Available Teams:",
    spin_btn_spinning: "DRAFTING...",
    spin_btn_mismatch: "COUNT MISMATCH",
    spin_btn_completed: "DRAFT COMPLETED",
    spin_btn_idle: "SPIN WHEEL",
    spin_subtext_completed: "All drafts for this pot have been completed",
    spin_subtext_idle: "Press to pick a random pair",
    spin_subtext_mismatch:
      "⚠️ The number of participants ({totalParticipants}) must equal the number of teams in this pot ({totalTeams}) to start the draft.",
    participants_title: "Participants",
    teams_title: "Teams",
    live_draft: "LIVE DRAFT",
    waiting: "WAITING...",

    // SetupPanel
    setup_title_participants: "Participant Management",
    setup_add_participant: "Add Participant",
    setup_placeholder_participant: "Person's name...",
    setup_btn_add: "Add",
    setup_total_participants: "Total participants:",
    setup_empty_participants: "No participants",
    setup_title_pots: "Pots and Teams Configuration",
    setup_pot_management: "Pot Management",
    setup_placeholder_pot: "New pot name (e.g. Pot 2)...",
    setup_btn_create_pot: "+ Create Pot",
    setup_add_team: "Add Team to {pot}",
    setup_placeholder_team: "Team name (e.g. Team A)...",
    setup_total_teams: "Teams in {pot}:",
    setup_empty_teams: "No teams loaded in this pot",
    setup_btn_clear_results: "Clear Drafted Results",
    setup_btn_reset_defaults: "Reset to Defaults",
    setup_btn_open_wizard: "⚙️ Open Assistant",
    setup_confirm_reset:
      "Are you sure you want to reset all participants and pots to the defaults? This will also clear current results.",
    setup_confirm_clear:
      "Are you sure you want to clear all drawn pairings? The wheels will be refilled.",
    setup_confirm_delete_pot:
      'Are you sure you want to delete "{potName}"? All teams and results associated with this pot will be lost.',
    confirm_reduce_pots:
      "Reducing the number of pots will delete the teams in the removed pots. Do you want to continue?",
    setup_pot_quantity: "Number of Pots",

    // ResultsSection
    results_title: "Assigned Results",
    results_subtitle:
      "Drawn winners are removed from the wheels and listed here.",
    results_btn_copy: "📋 Copy Results",
    results_copied: "Results copied to clipboard!",
    results_no_results: "No results to copy.",
    results_clipboard_header: "🏆 DRAFT RESULTS 🏆\n\n",
    results_clipboard_empty: "  (No drafts yet)\n",
    results_empty_state: "No team assigned",
    results_remove_tooltip: "Remove this draft and return to the wheel",

    // OnboardingWizard
    wizard_title: "🏆 Initial Setup Assistant",
    wizard_subtitle:
      "Set up your participants and teams in a balanced way before starting.",
    wizard_step_participants: "Participants",
    wizard_step_pots: "Pots & Teams",
    wizard_step_summary: "Summary",
    wizard_step_1_heading: "Step 1: Register Participants",
    wizard_step_1_desc:
      "Add the names of the people who will participate in the draft (minimum 2).",
    wizard_step_1_placeholder: "Person's name (e.g., John)...",
    wizard_step_2_heading: "Step 2: Manage Pots and Teams",
    wizard_step_2_desc:
      "Each pot must have exactly {count} teams (the same number of participants).",
    wizard_step_2_pot_label: "Create New Pot",
    wizard_step_2_placeholder: "Pot name (e.g., Pot 2)...",
    wizard_step_2_create: "+ Create",
    wizard_step_2_team_placeholder: "Add team to {potName} (e.g., Team A)...",
    wizard_step_2_empty_teams: "No teams in {potName}",
    wizard_step_2_alert_valid: "✅ Ready! Matches the {count} participants.",
    wizard_step_3_heading: "Step 3: Final Validations",
    wizard_step_3_desc:
      "Make sure all pots comply with the participant balance before saving.",
    wizard_step_3_pot_status: "Pots Status:",
    wizard_step_3_alert_valid:
      "🎉 Perfect! All pots are balanced. You are ready to start.",
    wizard_step_3_alert_invalid:
      "❌ Cannot start. Make sure all pots have exactly {count} teams.",
    wizard_step_3_btn_finish: "🚀 Start Draft!",
    wizard_btn_back: "Back",
    wizard_btn_next: "Next",
    wizard_teams_missing: "Missing {count} teams ({current}/{total})",
    wizard_teams_extra: "Extra {count} teams ({current}/{total})",
    wizard_teams_match: "Matches ({count} teams)",

    // InterstitialAd
    ad_tag: "📢 Sponsored Ad",
    ad_info: "The application is supported by advertising",
    ad_title: "Full Interstitial Ad",
    ad_subtitle: "Your AdSense code will render in this window.",
    ad_countdown: "You can skip this ad in {count} seconds...",
    ad_skip: "Continue to Draft ➔",

    // Extra
    alert_duplicate_participant:
      "This person is already in the participant list.",
    alert_duplicate_team: "This team is already registered.",
    alert_pot_teams_exceeded: "You cannot add more teams to this pot than the number of participants.",
    alert_duplicate_pot: 'The pot "{potName}" already exists.',
    empty_wheel: "Empty",
    ad_banner_label: "SPONSOR",
    ad_banner_title: "AdSense Banner Space",
    ad_banner_subtitle: "Ready for production ({format})",
    setup_pot_obligatorio: "The 'Pot 1' is mandatory and cannot be deleted.",
    wizard_validation_warnings: "Please correct warnings before continuing.",
    wizard_empty_participants: "You have not added participants yet",
    wizard_empty_teams: "No teams in {potName}",
    wizard_pot_label_edit: "Teams in {potName}:",
    results_copy_failed:
      "Could not copy automatically. Please select the text manually.",
    btn_delete_pot_label: "Delete {potName}",
    setup_comma_hint:
      "You can add multiple items separated by commas (e.g. John, Jane, Mary)",
    wizard_min_participants: "Minimum 2 participants required."
  },
  pt: {
    logo: "DUO RAFFLE",
    logo_tagline: "SUA ROLETA DUPLA",
    tab_sorteo: "🎯 Sorteo",
    tab_config: "⚙️ Configuração",
    footer_text: "Duo Raffle • Desenvolvido por Alan Anaya Araujo 🎯",
    celebration_title: "🎉 NOVA ATRIBUIÇÃO CONCLUÍDA! 🎉",
    btn_accept_continue: "Aceitar e Continuar",
    versus_divider: "— tirou —",

    // DrawDashboard
    dashboard_title: "Painel de Sorteios Aleatórios",
    bombo_activo: "Pote Ativo:",
    participants_free: "Participantes Livres:",
    teams_available: "Equipes Disponíveis:",
    spin_btn_spinning: "SORTEANDO...",
    spin_btn_mismatch: "DIFERENÇA DE QUANTIDADES",
    spin_btn_completed: "SORTEIO CONCLUÍDO",
    spin_btn_idle: "GIRAR ROLETA",
    spin_subtext_completed: "Todos os sorteios para este pote foram realizados",
    spin_subtext_idle: "Pressione para escolher um par aleatório",
    spin_subtext_mismatch:
      "⚠️ O número de participantes ({totalParticipants}) deve ser igual ao número de equipes neste pote ({totalTeams}) para iniciar o sorteio.",
    participants_title: "Participantes",
    teams_title: "Equipes",
    live_draft: "SORTEIO AO VIVO",
    waiting: "AGUARDANDO...",

    // SetupPanel
    setup_title_participants: "Gestão de Participantes",
    setup_add_participant: "Adicionar Participante",
    setup_placeholder_participant: "Nome do participante...",
    setup_btn_add: "Adicionar",
    setup_total_participants: "Total de participantes:",
    setup_empty_participants: "Nenhum participante",
    setup_title_pots: "Configuração de Potes e Equipes",
    setup_pot_management: "Gestão de Potes",
    setup_placeholder_pot: "Nome do novo pote (ex: Pote 2)...",
    setup_btn_create_pot: "+ Criar Pote",
    setup_add_team: "Adicionar Equipe ao {pot}",
    setup_placeholder_team: "Nome da equipe (ex: Equipe A)...",
    setup_total_teams: "Equipes no {pot}:",
    setup_empty_teams: "Nenhuma equipe carregada neste pote",
    setup_btn_clear_results: "Limpar Resultados Sorteados",
    setup_btn_reset_defaults: "Restaurar Padrões",
    setup_btn_open_wizard: "⚙️ Abrir Assistente",
    setup_confirm_reset:
      "Tem certeza de que deseja redefinir todos os participantes e potes para os padrões? Isso também apagará os resultados atuais.",
    setup_confirm_clear:
      "Tem certeza de que deseja limpar todos os emparelhamentos sorteados? As roletas serão recarregadas.",
    setup_confirm_delete_pot:
      'Tem certeza de que deseja excluir "{potName}"? Todas as equipes e resultados associados a este pote serão perdidos.',
    confirm_reduce_pots:
      "Reduzir o número de potes excluirá os times nos potes removidos. Deseja continuar?",
    setup_pot_quantity: "Quantidade de Potes",

    // ResultsSection
    results_title: "Resultados Atribuídos",
    results_subtitle:
      "Vencedores sorteados são removidos das roletas e listados aqui.",
    results_btn_copy: "📋 Copiar Resultados",
    results_copied: "Resultados copiados para a área de transferência!",
    results_no_results: "Nenhum resultado para copiar.",
    results_clipboard_header: "🏆 RESULTADOS DO DRAFT 🏆\n\n",
    results_clipboard_empty: "  (Sem sorteios ainda)\n",
    results_empty_state: "Nenhuma equipe atribuída",
    results_remove_tooltip: "Remover este sorteio e retornar à roleta",

    // OnboardingWizard
    wizard_title: "🏆 Assistente de Configuração Inicial",
    wizard_subtitle:
      "Configure seus participantes e equipes de forma equilibrada antes de começar.",
    wizard_step_participants: "Participantes",
    wizard_step_pots: "Potes & Equipes",
    wizard_step_summary: "Resumo",
    wizard_step_1_heading: "Passo 1: Registrar Participantes",
    wizard_step_1_desc:
      "Adicione os nomes das pessoas que participarão do sorteio (mínimo 2).",
    wizard_step_1_placeholder: "Nome do participante (ex: João)...",
    wizard_step_2_heading: "Passo 2: Gerenciar Potes e Equipes",
    wizard_step_2_desc:
      "Cada pote deve ter exatamente {count} equipes (o mesmo número de participantes).",
    wizard_step_2_pot_label: "Criar Novo Pote",
    wizard_step_2_placeholder: "Nome do pote (ex: Pote 2)...",
    wizard_step_2_create: "+ Criar",
    wizard_step_2_team_placeholder:
      "Adicionar equipe ao {potName} (ex: Equipe A)...",
    wizard_step_2_empty_teams: "Nenhuma equipe no {potName}",
    wizard_step_2_alert_valid:
      "✅ Pronto! Coincide com os {count} participantes.",
    wizard_step_3_heading: "Passo 3: Validações Finais",
    wizard_step_3_desc:
      "Verifique se todos os potes cumprem o equilíbrio de participantes antes de salvar.",
    wizard_step_3_pot_status: "Estado dos Potes:",
    wizard_step_3_alert_valid:
      "🎉 Perfeito! Todos os potes estão equilibrados. Você está pronto para começar.",
    wizard_step_3_alert_invalid:
      "❌ Não é possível iniciar. Certifique-se de que todos os potes tenham exatamente {count} equipes.",
    wizard_step_3_btn_finish: "🚀 Iniciar Sorteio!",
    wizard_btn_back: "Voltar",
    wizard_btn_next: "Avançar",
    wizard_teams_missing: "Faltam {count} equipes ({current}/{total})",
    wizard_teams_extra: "Sobram {count} equipes ({current}/{total})",
    wizard_teams_match: "Coincide ({count} equipes)",

    // InterstitialAd
    ad_tag: "📢 Anúncio Patrocinado",
    ad_info: "O aplicativo é mantido por publicidade",
    ad_title: "Anúncio Intersticial Completo",
    ad_subtitle: "Seu código AdSense será renderizado nesta janela.",
    ad_countdown: "Você pode pular este anúncio em {count} segundos...",
    ad_skip: "Continuar para Sorteio ➔",

    // Extra
    alert_duplicate_participant:
      "Esta pessoa já está na lista de participantes.",
    alert_duplicate_team: "Esta equipe já está registrada.",
    alert_pot_teams_exceeded: "Você não pode adicionar mais equipes a este pote do que o número de participantes.",
    alert_duplicate_pot: 'O pote "{potName}" já existe.',
    empty_wheel: "Vazio",
    ad_banner_label: "PUBLICIDADE",
    ad_banner_title: "Espaço Publicitário AdSense",
    ad_banner_subtitle: "Pronto para produção ({format})",
    setup_pot_obligatorio: "O 'Pote 1' é obrigatório e não pode ser excluído.",
    wizard_validation_warnings: "Corrija os avisos antes de continuar.",
    wizard_empty_participants: "Você ainda não adicionou participantes",
    wizard_empty_teams: "Sem equipes em {potName}",
    wizard_pot_label_edit: "Equipes em {potName}:",
    results_copy_failed:
      "Não foi possível copiar automaticamente. Selecione o texto manualmente.",
    btn_delete_pot_label: "Excluir {potName}",
    setup_comma_hint:
      "Você pode adicionar vários separados por vírgulas (ex: João, Maria, José)",
    wizard_min_participants: "Mínimo de 2 participantes necessários."
  },
  fr: {
    logo: "DUO RAFFLE",
    logo_tagline: "VOTRE DOUBLE ROULETTE",
    tab_sorteo: "🎯 Tirage",
    tab_config: "⚙️ Configuration",
    footer_text: "Duo Raffle • Développé par Alan Anaya Araujo 🎯",
    celebration_title: "🎉 NOUVELLE AFFECTATION TERMINÉE ! 🎉",
    btn_accept_continue: "Accepter et Continuer",
    versus_divider: "— a tiré —",

    // DrawDashboard
    dashboard_title: "Tableau de Tirage Aléatoire",
    bombo_activo: "Chapeau Actif:",
    participants_free: "Participants Libres:",
    teams_available: "Équipes Disponibles:",
    spin_btn_spinning: "TIRAGE EN COURS...",
    spin_btn_mismatch: "INCOMPATIBILITÉ DE NOMBRE",
    spin_btn_completed: "TIRAGE TERMINÉ",
    spin_btn_idle: "LANCER LA ROULETTE",
    spin_subtext_completed: "Tous les tirages pour ce chapeau sont terminés",
    spin_subtext_idle: "Appuyez pour choisir une paire au hasard",
    spin_subtext_mismatch:
      "⚠️ Le nombre de participants ({totalParticipants}) doit être égal au nombre d'équipes dans ce chapeau ({totalTeams}) pour commencer le tirage.",
    participants_title: "Participants",
    teams_title: "Équipes",
    live_draft: "TIRAGE EN DIRECT",
    waiting: "EN ATTENTE...",

    // SetupPanel
    setup_title_participants: "Gestion des Participants",
    setup_add_participant: "Ajouter un Participant",
    setup_placeholder_participant: "Nom du participant...",
    setup_btn_add: "Ajouter",
    setup_total_participants: "Total des participants:",
    setup_empty_participants: "Aucun participant",
    setup_title_pots: "Configuration des Chapeaux et Équipes",
    setup_pot_management: "Gestion des Chapeaux",
    setup_placeholder_pot: "Nom du nouveau chapeau (ex: Chapeau 2)...",
    setup_btn_create_pot: "+ Créer Chapeau",
    setup_add_team: "Ajouter Équipe au {pot}",
    setup_placeholder_team: "Nom de l'équipe (ex: Équipe A)...",
    setup_total_teams: "Équipes dans {pot}:",
    setup_empty_teams: "Aucune équipe chargée dans ce chapeau",
    setup_btn_clear_results: "Effacer les Résultats Tirés",
    setup_btn_reset_defaults: "Réinitialiser aux Défauts",
    setup_btn_open_wizard: "⚙️ Ouvrir l'Assistant",
    setup_confirm_reset:
      "Êtes-vous sûr de vouloir réinitialiser tous les participants et chapeaux aux valeurs par défaut ? Cela effacera également les résultats actuels.",
    setup_confirm_clear:
      "Êtes-vous sûr de vouloir effacer tous les appariements tirés ? Les roulettes seront rechargées.",
    setup_confirm_delete_pot:
      'Êtes-vous sûr de vouloir supprimer "{potName}" ? Toutes les équipes et tous les résultats associés à ce chapeau seront perdus.',
    confirm_reduce_pots:
      "Réduire le nombre de chapeaux supprimera les équipes des chapeaux supprimés. Voulez-vous continuer?",
    setup_pot_quantity: "Nombre de Chapeaux",

    // ResultsSection
    results_title: "Résultats Assignés",
    results_subtitle:
      "Les gagnants tirés sont retirés des roulettes et listés ici.",
    results_btn_copy: "📋 Copier les Résultats",
    results_copied: "Résultats copiés dans le presse-papiers !",
    results_no_results: "Aucun résultat à copier.",
    results_clipboard_header: "🏆 RÉSULTATS DU TIRAGE 🏆\n\n",
    results_clipboard_empty: "  (Aucun tirage pour le moment)\n",
    results_empty_state: "Aucune équipe assignée",
    results_remove_tooltip: "Supprimer ce tirage et revenir à la roulette",

    // OnboardingWizard
    wizard_title: "🏆 Assistant de Configuration Initiale",
    wizard_subtitle:
      "Configurez vos participants et vos équipes de manière équilibrée avant de commencer.",
    wizard_step_participants: "Participants",
    wizard_step_pots: "Chapeaux & Équipes",
    wizard_step_summary: "Résumé",
    wizard_step_1_heading: "Étape 1: Enregistrer les Participants",
    wizard_step_1_desc:
      "Ajoutez les noms des personnes qui participeront au tirage (minimum 2).",
    wizard_step_1_placeholder: "Nom du participant (ex: Jean)...",
    wizard_step_2_heading: "Étape 2: Gérer les Chapeaux et les Équipes",
    wizard_step_2_desc:
      "Chaque chapeau doit contenir exactement {count} équipes (le même nombre de participants).",
    wizard_step_2_pot_label: "Créer un Nouveau Chapeau",
    wizard_step_2_placeholder: "Nom du chapeau (ex: Chapeau 2)...",
    wizard_step_2_create: "+ Créer",
    wizard_step_2_team_placeholder:
      "Ajouter équipe au {potName} (ex: Équipe A)...",
    wizard_step_2_empty_teams: "Aucune équipe dans {potName}",
    wizard_step_2_alert_valid: "✅ Prêt ! Correspond aux {count} participants.",
    wizard_step_3_heading: "Étape 3: Validations Finales",
    wizard_step_3_desc:
      "Vérifiez que tous les chapeaux respectent l'équilibre des participants avant de sauvegarder.",
    wizard_step_3_pot_status: "État des Chapeaux:",
    wizard_step_3_alert_valid:
      "🎉 Parfait ! Tous les chapeaux sont équilibrés. Vous êtes prêt à commencer.",
    wizard_step_3_alert_invalid:
      "❌ Impossible de commencer. Assurez-vous que tous les chapeaux ont exactement {count} équipes.",
    wizard_step_3_btn_finish: "🚀 Commencer le Tirage !",
    wizard_btn_back: "Retour",
    wizard_btn_next: "Suivant",
    wizard_teams_missing: "{count} équipes manquantes ({current}/{total})",
    wizard_teams_extra: "{count} équipes en trop ({current}/{total})",
    wizard_teams_match: "Correspond ({count} équipes)",

    // InterstitialAd
    ad_tag: "📢 Publicité Sponsorisée",
    ad_info: "L'application est financée par la publicité",
    ad_title: "Publicité Interstitielle Complete",
    ad_subtitle: "Votre code AdSense sera affiché dans cette fenêtre.",
    ad_countdown:
      "Vous pouvez ignorer cette publicité dans {count} secondes...",
    ad_skip: "Continuer vers le Tirage ➔",

    // Extra
    alert_duplicate_participant:
      "Cette personne est déjà dans la liste des participants.",
    alert_duplicate_team: "Cette équipe est déjà enregistrée.",
    alert_pot_teams_exceeded: "Vous ne pouvez pas ajouter plus d'équipes à ce chapeau que le nombre de participants.",
    alert_duplicate_pot: 'Le chapeau "{potName}" existe déjà.',
    empty_wheel: "Vide",
    ad_banner_label: "PUBLICITÉ",
    ad_banner_title: "Espace Publicitaire AdSense",
    ad_banner_subtitle: "Prêt pour la production ({format})",
    setup_pot_obligatorio:
      "Le 'Chapeau 1' est obligatoire et ne peut pas être supprimé.",
    wizard_validation_warnings:
      "Veuillez corriger les avertissements avant de continuer.",
    wizard_empty_participants: "Vous n'avez pas encore ajouté de participants",
    wizard_empty_teams: "Aucune équipe dans {potName}",
    wizard_pot_label_edit: "Équipes dans {potName} :",
    results_copy_failed:
      "Copie automatique impossible. Veuillez sélectionner le texte manuellement.",
    btn_delete_pot_label: "Supprimer {potName}",
    setup_comma_hint:
      "Vous pouvez en ajouter plusieurs séparés par des virgules (ex. Jean, Marie, Pierre)",
    wizard_min_participants: "Minimum 2 participants requis."
  },
  de: {
    logo: "DUO RAFFLE",
    logo_tagline: "IHR DOPPELTES ROULETTE",
    tab_sorteo: "🎯 Verlosung",
    tab_config: "⚙️ Einstellungen",
    footer_text: "Duo Raffle • Entwickelt von Alan Anaya Araujo 🎯",
    celebration_title: "🎉 NEUE ZUWEISUNG ERFOLGT! 🎉",
    btn_accept_continue: "Akzeptieren und Weiter",
    versus_divider: "— hat gezogen —",

    // DrawDashboard
    dashboard_title: "Zufälliges Auslosungspanel",
    bombo_activo: "Aktiver Topf:",
    participants_free: "Freie Teilnehmer:",
    teams_available: "Verfügbare Teams:",
    spin_btn_spinning: "ZIEHUNG LÄUFT...",
    spin_btn_mismatch: "ANZAHL UNSTIMMIG",
    spin_btn_completed: "AUSLOSUNG BEENDET",
    spin_btn_idle: "RAD DREHEN",
    spin_subtext_completed:
      "Alle Auslosungen für diesen Topf wurden abgeschlossen",
    spin_subtext_idle: "Drücken, um eine zufällige Paarung zu wählen",
    spin_subtext_mismatch:
      "⚠️ Die Anzahl der Teilnehmer ({totalParticipants}) muss mit der Anzahl der Teams in diesem Topf ({totalTeams}) übereinstimmen, um die Ziehung zu starten.",
    participants_title: "Teilnehmer",
    teams_title: "Teams",
    live_draft: "LIVE-ZIEHUNG",
    waiting: "WARTE...",

    // SetupPanel
    setup_title_participants: "Teilnehmerverwaltung",
    setup_add_participant: "Teilnehmer hinzufügen",
    setup_placeholder_participant: "Name der Person...",
    setup_btn_add: "Hinzufügen",
    setup_total_participants: "Teilnehmer insgesamt:",
    setup_empty_participants: "Keine Teilnehmer vorhanden",
    setup_title_pots: "Töpfe- und Teamkonfiguration",
    setup_pot_management: "Topf-Verwaltung",
    setup_placeholder_pot: "Name des neuen Topfes (z.B. Topf 2)...",
    setup_btn_create_pot: "+ Topf erstellen",
    setup_add_team: "Team zu {pot} hinzufügen",
    setup_placeholder_team: "Name des Teams (z.B. Team A)...",
    setup_total_teams: "Teams in {pot}:",
    setup_empty_teams: "Keine Teams in diesem Topf geladen",
    setup_btn_clear_results: "Gezogene Ergebnisse löschen",
    setup_btn_reset_defaults: "Auf Standard zurücksetzen",
    setup_btn_open_wizard: "⚙️ Assistent öffnen",
    setup_confirm_reset:
      "Sind Sie sicher, dass Sie alle Teilnehmer und Töpfe auf die Standardwerte zurücksetzen möchten? Dadurch werden auch die aktuellen Ergebnisse gelöscht.",
    setup_confirm_clear:
      "Sind Sie sicher, dass Sie alle gezogenen Paarungen löschen möchten? Die Räder werden wieder gefüllt.",
    setup_confirm_delete_pot:
      'Sind Sie sicher, dass Sie "{potName}" auslöschen wollen? Alle Teams und Resultate dieses Topfes gehen verloren.',
    confirm_reduce_pots:
      "Das Reduzieren der Anzahl der Töpfe löscht die Teams in den entfernten Töpfen. Möchten Sie fortfahren?",
    setup_pot_quantity: "Anzahl der Töpfe",

    // ResultsSection
    results_title: "Zugeordnete Ergebnisse",
    results_subtitle:
      "Gezogene Gewinner werden von den Rädern entfernt und hier aufgelistet.",
    results_btn_copy: "📋 Ergebnisse kopieren",
    results_copied: "Ergebnisse in die Zwischenablage kopiert!",
    results_no_results: "Keine Ergebnisse zum Kopieren.",
    results_clipboard_header: "🏆 OUTCOME DER AUSLOSUNG 🏆\n\n",
    results_clipboard_empty: "  (Noch keine Auslosungen)\n",
    results_empty_state: "Kein Team zugewiesen",
    results_remove_tooltip: "Diese Paarung löschen und zum Rad zurückkehren",

    // OnboardingWizard
    wizard_title: "🏆 Einrichtungsassistent",
    wizard_subtitle:
      "Richten Sie Ihre Teilnehmer und Teams ausgewogen ein, bevor Sie beginnen.",
    wizard_step_participants: "Teilnehmer",
    wizard_step_pots: "Töpfe & Teams",
    wizard_step_summary: "Zusammenfassung",
    wizard_step_1_heading: "Schritt 1: Teilnehmer registrieren",
    wizard_step_1_desc:
      "Fügen Sie die Namen der Personen hinzu, die an der Verlosung teilnehmen (mindestens 2).",
    wizard_step_1_placeholder: "Name der Person (z.B. Hans)...",
    wizard_step_2_heading: "Schritt 2: Töpfe und Teams verwalten",
    wizard_step_2_desc:
      "Jeder Topf muss genau {count} Teams enthalten (die gleiche Anzahl wie die Teilnehmer).",
    wizard_step_2_pot_label: "Neuen Topf erstellen",
    wizard_step_2_placeholder: "Name des Topfes (z.B. Topf 2)...",
    wizard_step_2_create: "+ Erstellen",
    wizard_step_2_team_placeholder:
      "Team zu {potName} hinzufügen (z.B. Team A)...",
    wizard_step_2_empty_teams: "Keine Teams in {potName}",
    wizard_step_2_alert_valid:
      "✅ Bereit! Stimmt mit den {count} Teilnehmern überein.",
    wizard_step_3_heading: "Schritt 3: Letzte Prüfungen",
    wizard_step_3_desc:
      "Stellen Sie sicher, dass alle Töpfe vor dem Speichern mit der Teilnehmerzahl übereinstimmen.",
    wizard_step_3_pot_status: "Status der Töpfe:",
    wizard_step_3_alert_valid:
      "🎉 Perfekt! Alle Töpfe sind ausgeglichen. Sie können jetzt starten.",
    wizard_step_3_alert_invalid:
      "❌ Kann nicht starten. Stellen Sie sicher, dass alle Töpfe genau {count} Teams enthalten.",
    wizard_step_3_btn_finish: "🚀 Auslosung starten!",
    wizard_btn_back: "Zurück",
    wizard_btn_next: "Weiter",
    wizard_teams_missing: "Es fehlen {count} Teams ({current}/{total})",
    wizard_teams_extra: "{count} Teams zu viel ({current}/{total})",
    wizard_teams_match: "Stimmt überein ({count} Teams)",

    // InterstitialAd
    ad_tag: "📢 Gesponserte Anzeige",
    ad_info: "Die Anwendung wird durch Werbung finanziert",
    ad_title: "Vollbild-Anzeige",
    ad_subtitle: "Ihr AdSense-Code wird in diesem Fenster angezeigt.",
    ad_countdown:
      "Sie können diese Anzeige in {count} Sekunden überspringen...",
    ad_skip: "Weiter zur Auslosung ➔",

    // Extra
    alert_duplicate_participant:
      "Diese Person steht bereits auf der Teilnehmerliste.",
    alert_duplicate_team: "Dieses Team ist bereits registriert.",
    alert_pot_teams_exceeded: "Sie können diesem Topf nicht mehr Teams hinzufügen als die Anzahl der Teilnehmer.",
    alert_duplicate_pot: 'Der Topf "{potName}" existiert bereits.',
    empty_wheel: "Leer",
    ad_banner_label: "WERBUNG",
    ad_banner_title: "AdSense-Werbebereich",
    ad_banner_subtitle: "Bereit für die Produktion ({format})",
    setup_pot_obligatorio:
      "Der 'Topf 1' ist obligatorisch und kann nicht gelöscht werden.",
    wizard_validation_warnings:
      "Bitte korrigieren Sie die Warnungen, bevor Sie fortfahren.",
    wizard_empty_participants: "Sie haben noch keine Teilnehmer hinzugefügt",
    wizard_empty_teams: "Keine Teams in {potName}",
    wizard_pot_label_edit: "Teams in {potName}:",
    results_copy_failed:
      "Kopieren fehlgeschlagen. Bitte kopieren Sie den Text manuell.",
    btn_delete_pot_label: "Löschen {potName}",
    setup_comma_hint:
      "Mehrere Einträge durch Kommas getrennt möglich (z.B. Hans, Peter, Maria)",
    wizard_min_participants: "Mindestens 2 Teilnehmer erforderlich."
  },
  it: {
    logo: "DUO RAFFLE",
    logo_tagline: "LA TUA DOPPIA ROULETTE",
    tab_sorteo: "🎯 Estrazione",
    tab_config: "⚙️ Impostazioni",
    footer_text: "Duo Raffle • Sviluppato da Alan Anaya Araujo 🎯",
    celebration_title: "🎉 NUOVA ASSEGNAZIONE COMPLETATA! 🎉",
    btn_accept_continue: "Accetta e Continua",
    versus_divider: "— ha estratto —",

    // DrawDashboard
    dashboard_title: "Pannello Sorteggi Aléatori",
    bombo_activo: "Urna Attiva:",
    participants_free: "Partecipanti Liberi:",
    teams_available: "Squadre Disponibili:",
    spin_btn_spinning: "SORTEGGIO IN CORSO...",
    spin_btn_mismatch: "DISCREPANZA NUMERO",
    spin_btn_completed: "SORTEGGIO COMPLETATO",
    spin_btn_idle: "GIRA LA ROULETTE",
    spin_subtext_completed:
      "Tutti i sorteggi per questa urna sono stati completati",
    spin_subtext_idle: "Premi per scegliere una coppia a caso",
    spin_subtext_mismatch:
      "⚠️ Il numero di partecipanti ({totalParticipants}) deve essere uguale al numero di squadre in questa urna ({totalTeams}) per iniziare il sorteggio.",
    participants_title: "Partecipanti",
    teams_title: "Squadre",
    live_draft: "SORTEGGIO IN DIRETTA",
    waiting: "ATTESA...",

    // SetupPanel
    setup_title_participants: "Gestione Partecipanti",
    setup_add_participant: "Aggiungi Partecipante",
    setup_placeholder_participant: "Nome della persona...",
    setup_btn_add: "Aggiungi",
    setup_total_participants: "Totale partecipanti:",
    setup_empty_participants: "Nessun partecipante",
    setup_title_pots: "Configurazione Urne e Squadre",
    setup_pot_management: "Gestione Urne",
    setup_placeholder_pot: "Nome della nuova urna (es: Urna 2)...",
    setup_btn_create_pot: "+ Crea Urna",
    setup_add_team: "Aggiungi Squadra a {pot}",
    setup_placeholder_team: "Nome della squadra (es: Squadra A)...",
    setup_total_teams: "Squadre in {pot}:",
    setup_empty_teams: "Nessuna squadra caricata in questa urna",
    setup_btn_clear_results: "Cancella Risultati Sorteggiati",
    setup_btn_reset_defaults: "Ripristina Predefiniti",
    setup_btn_open_wizard: "⚙️ Apri Assistente",
    setup_confirm_reset:
      "Sei sicuro di voler ripristinare tutti i partecipanti e le urne ai valori predefiniti? Questo cancellerà anche i risultati attuali.",
    setup_confirm_clear:
      "Sei sicuro di voler cancellare tutti gli accoppiamenti estratti? Le ruote si riempiranno di nuovo.",
    setup_confirm_delete_pot:
      'Sei sicuro di voler eliminare "{potName}"? Tutte le squadre e i risultati associati a questa urna andranno perduti.',
    confirm_reduce_pots:
      "Riducendo il numero di urne si elimineranno le squadre nelle urne rimosse. Desideri continuare?",
    setup_pot_quantity: "Quantità di Urne",

    // ResultsSection
    results_title: "Risultati Assegnati",
    results_subtitle:
      "I vincitori estratti vengono rimossi dalle ruote e elencati qui.",
    results_btn_copy: "📋 Copia Risultati",
    results_copied: "Risultati copiati negli appunti!",
    results_no_results: "Nessun risultato da copiare.",
    results_clipboard_header: "🏆 RISULTATI DEL SORTEGGIO 🏆\n\n",
    results_clipboard_empty: "  (Ancora nessun sorteggio)\n",
    results_empty_state: "Nessuna squadra assegnata",
    results_remove_tooltip: "Rimuovi questo sorteggio e ritorna alla ruota",

    // OnboardingWizard
    wizard_title: "🏆 Assistente di Configurazione Iniziale",
    wizard_subtitle:
      "Configura i tuoi partecipanti e le squadre in modo equilibrato prima di iniziare.",
    wizard_step_participants: "Partecipanti",
    wizard_step_pots: "Urne & Squadre",
    wizard_step_summary: "Riepilogo",
    wizard_step_1_heading: "Passo 1: Registra Partecipanti",
    wizard_step_1_desc:
      "Aggiungi i nomi delle persone che parteciperanno al sorteggio (minimo 2).",
    wizard_step_1_placeholder: "Nome della persona (es. Mario)...",
    wizard_step_2_heading: "Passo 2: Gestisci Urne e Squadre",
    wizard_step_2_desc:
      "Ogni urna deve contenere esattamente {count} squadre (lo stesso numero dei partecipanti).",
    wizard_step_2_pot_label: "Crea Nuova Urna",
    wizard_step_2_placeholder: "Nome dell'urna (es. Urna 2)...",
    wizard_step_2_create: "+ Crea",
    wizard_step_2_team_placeholder:
      "Aggiungi squadra a {potName} (es. Squadra A)...",
    wizard_step_2_empty_teams: "Nessuna squadra in {potName}",
    wizard_step_2_alert_valid:
      "✅ Pronto! Coincide con i {count} partecipanti.",
    wizard_step_3_heading: "Passo 3: Validazioni Finali",
    wizard_step_3_desc:
      "Verifica che tutte le urne rispettino il bilanciamento dei partecipanti prima di salvare.",
    wizard_step_3_pot_status: "Stato delle Urne:",
    wizard_step_3_alert_valid:
      "🎉 Perfetto! Tutte le urne sono bilanciate. Sei pronto per iniziare.",
    wizard_step_3_alert_invalid:
      "❌ Impossibile iniziare. Assicurati che tutte le urne abbiano esattamente {count} squadre.",
    wizard_step_3_btn_finish: "🚀 Inizia Sorteggio!",
    wizard_btn_back: "Indietro",
    wizard_btn_next: "Avanti",
    wizard_teams_missing: "Mancano {count} squadre ({current}/{total})",
    wizard_teams_extra: "{count} squadre in più ({current}/{total})",
    wizard_teams_match: "Coincide ({count} squadre)",

    // InterstitialAd
    ad_tag: "📢 Annuncio Sponsorizzato",
    ad_info: "L'applicazione è supportata dalla pubblicità",
    ad_title: "Annuncio Interstiziale Completo",
    ad_subtitle: "Il tuo codice AdSense verrà visualizzato in questa finestra.",
    ad_countdown: "Puoi saltare questo annuncio tra {count} secondi...",
    ad_skip: "Continua al Sorteggio ➔",

    // Extra
    alert_duplicate_participant:
      "Questa persona è già nell'elenco dei partecipanti.",
    alert_duplicate_team: "Questa squadra è già registrata.",
    alert_pot_teams_exceeded: "Non puoi aggiungere a questa urna più squadre rispetto al numero di partecipanti.",
    alert_duplicate_pot: 'L\'urna "{potName}" esiste già.',
    empty_wheel: "Vuoto",
    ad_banner_label: "PUBBLICITÀ",
    ad_banner_title: "Spazio Pubblicitario AdSense",
    ad_banner_subtitle: "Pronto per la produzione ({format})",
    setup_pot_obligatorio:
      "L'urna 'Urna 1' è obbligatoria e non può essere eliminata.",
    wizard_validation_warnings:
      "Si prega di correggere gli avvisi prima di continuare.",
    wizard_empty_participants: "Non hai ancora aggiunto partecipanti",
    wizard_empty_teams: "Nessuna squadra in {potName}",
    wizard_pot_label_edit: "Squadre in {potName}:",
    results_copy_failed:
      "Copia automatica non riuscita. Si prega di copiare manualmente.",
    btn_delete_pot_label: "Elimina {potName}",
    setup_comma_hint:
      "Puoi aggiungere più elementi separati da virgole (es. Mario, Luigi, Anna)",
    wizard_min_participants: "Sono richiesti minimo 2 partecipanti."
  },
  ar: {
    logo: "DUO RAFFLE",
    logo_tagline: "عجلتك المزدوجة",
    tab_sorteo: "🎯 سحب",
    tab_config: "⚙️ الإعدادات",
    footer_text: "Duo Raffle • تم التطوير بواسطة آلان أنايا أراوجو 🎯",
    celebration_title: "🎉 تم اكتمال التخصيص الجديد! 🎉",
    btn_accept_continue: "قبول ومتابعة",
    versus_divider: "— حصل على —",

    // DrawDashboard
    dashboard_title: "لوحة القرعة العشوائية",
    bombo_activo: "المستوى النشط:",
    participants_free: "المشاركون المتبقون:",
    teams_available: "الفرق المتاحة:",
    spin_btn_spinning: "جاري السحب...",
    spin_btn_mismatch: "اختلاف في الأعداد",
    spin_btn_completed: "اكتملت القرعة",
    spin_btn_idle: "تدوير العجلة",
    spin_subtext_completed: "تم الانتهاء من جميع السحوبات لهذا المستوى",
    spin_subtext_idle: "اضغط لاختيار زوج عشوائي",
    spin_subtext_mismatch:
      "⚠️ يجب أن يكون عدد المشاركين ({totalParticipants}) مساوياً لعدد الفرق في هذا المستوى ({totalTeams}) لبدء القرعة.",
    participants_title: "المشاركون",
    teams_title: "الفرق",
    live_draft: "سحب حي ومباشر",
    waiting: "في الانتظار...",

    // SetupPanel
    setup_title_participants: "إدارة المشاركين",
    setup_add_participant: "إضافة مشارك",
    setup_placeholder_participant: "اسم الشخص...",
    setup_btn_add: "إضافة",
    setup_total_participants: "إجمالي المشاركين:",
    setup_empty_participants: "لا يوجد مشاركون",
    setup_title_pots: "تكوين المستويات والفرق",
    setup_pot_management: "إدارة المستويات",
    setup_placeholder_pot: "اسم المستوى الجديد (مثال: مستوى 2)...",
    setup_btn_create_pot: "+ إنشاء مستوى",
    setup_add_team: "إضافة فريق إلى {pot}",
    setup_placeholder_team: "اسم الفريق (مثال: فريق أ)...",
    setup_total_teams: "الفرق في {pot}:",
    setup_empty_teams: "لا توجد فرق مضافة في هذا المستوى",
    setup_btn_clear_results: "مسح النتائج المسحوبة",
    setup_btn_reset_defaults: "إعادة تعيين الافتراضيات",
    setup_btn_open_wizard: "⚙️ فتح المعالج",
    setup_confirm_reset:
      "هل أنت متأكد من رغبتك في إعادة تعيين جميع المشاركين والمستويات للافتراضيات؟ سيؤدي هذا لمسح النتائج الحالية أيضاً.",
    setup_confirm_clear:
      "هل أنت متأكد من رغبتك في مسح كافة الثنائيات المسحوبة؟ ستتم إعادة تعبئة العجلات.",
    setup_confirm_delete_pot:
      'هل أنت متأكد من رغبتك في حذف "{potName}"؟ ستفقد جميع الفرق والنتائج المرتبطة بهذا المستوى.',
    confirm_reduce_pots:
      "تقليل عدد المستويات سيؤدي إلى حذف الفرق في المستويات التي تمت إزالتها. هل تريد الاستمرار؟",
    setup_pot_quantity: "عدد المستويات",

    // ResultsSection
    results_title: "النتائج المخصصة",
    results_subtitle: "تتم إزالة الفائزين المسحوبين من العجلات وإدراجهم هنا.",
    results_btn_copy: "📋 نسخ النتائج",
    results_copied: "تم نسخ النتائج إلى الحافظة!",
    results_no_results: "لا توجد نتائج لنسخها.",
    results_clipboard_header: "🏆 نتائج القرعة 🏆\n\n",
    results_clipboard_empty: "  (لا توجد سحوبات بعد)\n",
    results_empty_state: "لم يتم تعيين أي فريق",
    results_remove_tooltip: "إزالة هذا السحب والعودة إلى العجلة",

    // OnboardingWizard
    wizard_title: "🏆 معالج الإعداد الأولي",
    wizard_subtitle: "قم بإعداد المشاركين والفرق بشكل متوازن قبل البدء.",
    wizard_step_participants: "المشاركون",
    wizard_step_pots: "المستويات والفرق",
    wizard_step_summary: "الملخص",
    wizard_step_1_heading: "الخطوة 1: تسجيل المشاركين",
    wizard_step_1_desc:
      "أضف أسماء الأشخاص الذين سيشاركون في القرعة (الحد الأدنى 2).",
    wizard_step_1_placeholder: "اسم الشخص (مثال: محمد)...",
    wizard_step_2_heading: "الخطوة 2: إدارة المستويات والفرق",
    wizard_step_2_desc:
      "يجب أن يحتوي كل مستوى على {count} فرق بالضبط (نفس عدد المشاركين).",
    wizard_step_2_pot_label: "إنشاء مستوى جديد",
    wizard_step_2_placeholder: "اسم المستوى (مثال: مستوى 2)...",
    wizard_step_2_create: "+ إنشاء",
    wizard_step_2_team_placeholder:
      "إضافة فريق إلى {potName} (مثال: فريق أ)...",
    wizard_step_2_empty_teams: "لا توجد فرق في {potName}",
    wizard_step_2_alert_valid: "✅ جاهز! يتطابق مع {count} من المشاركين.",
    wizard_step_3_heading: "الخطوة 3: التحقق النهائي",
    wizard_step_3_desc:
      "تأكد من أن جميع المستويات تتوافق مع توازن المشاركين قبل الحفظ.",
    wizard_step_3_pot_status: "حالة المستويات:",
    wizard_step_3_alert_valid:
      "🎉 ممتاز! جميع المستويات متوازنة. أنت مستعد للبدء.",
    wizard_step_3_alert_invalid:
      "❌ لا يمكن البدء. تأكد من أن جميع المستويات تحتوي على {count} فرق بالضبط.",
    wizard_step_3_btn_finish: "🚀 ابدأ القرعة!",
    wizard_btn_back: "السابق",
    wizard_btn_next: "التالي",
    wizard_teams_missing: "يتبقى {count} فرق ({current}/{total})",
    wizard_teams_extra: "هناك {count} فرق إضافية ({current}/{total})",
    wizard_teams_match: "يتطابق ({count} فرق)",

    // InterstitialAd
    ad_tag: "📢 إعلان برعاية",
    ad_info: "يتم دعم التطبيق بواسطة الإعلانات",
    ad_title: "إعلان كامل الشاشة",
    ad_subtitle: "سيتم عرض رمز AdSense الخاص بك في هذه النافذة.",
    ad_countdown: "يمكنك تخطي هذا الإعلان خلال {count} ثوانٍ...",
    ad_skip: "المتابعة إلى القرعة ➔",

    // Extra
    alert_duplicate_participant: "هذا الشخص موجود بالفعل في قائمة المشاركين.",
    alert_duplicate_team: "هذا الفريق مسجل بالفعل.",
    alert_pot_teams_exceeded: "لا يمكنك إضافة فرق إلى هذا المستوى أكثر من عدد المشاركين.",
    alert_duplicate_pot: 'المستوى "{potName}" موجود بالفعل.',
    empty_wheel: "فارغ",
    ad_banner_label: "إعلان",
    ad_banner_title: "مساحة إعلانية لـ AdSense",
    ad_banner_subtitle: "جاهز للإنتاج ({format})",
    setup_pot_obligatorio: "المستوى 'مستوى 1' إلزامي ولا يمكن حذفه.",
    wizard_validation_warnings: "يرجى تصحيح التحذيرات قبل المتابعة.",
    wizard_empty_participants: "لم تقم بإضافة مشاركين بعد",
    wizard_empty_teams: "لا توجد فرق في {potName}",
    wizard_pot_label_edit: "الفرق في {potName}:",
    results_copy_failed: "تعذر النسخ تلقائيًا. يرجى تحديد النص ونسخه يدويًا.",
    btn_delete_pot_label: "حذف {potName}",
    setup_comma_hint:
      "يمكنك إضافة عدة أسماء مفصولة بفاصلة (مثال: محمد، أحمد، علي)",
    wizard_min_participants: "مطلوب مشاركين كحد أدنى 2."
  },
};

/**
 * Retorna un helper de traducción para el idioma seleccionado.
 *
 * @param {string} lang - Código de idioma (es, en, pt, fr, de, it, ar)
 * @returns {function} Función t(key, variables)
 */
export const getTranslationHelper = (lang) => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  return (key, variables = {}) => {
    let text = dict[key] || TRANSLATIONS["en"][key] || key;
    Object.keys(variables).forEach((varKey) => {
      text = text.replace(new RegExp(`{${varKey}}`, "g"), variables[varKey]);
    });
    return text;
  };
};
