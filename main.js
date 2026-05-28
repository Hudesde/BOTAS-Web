/* ===========================================================================
   BOTAS — sitio estático · lógica de cliente
   - Multi-idioma (ES / EN / PT) con diccionario JSON
   - Conmutación de pestañas (con soporte de #hash)
   - Menú móvil
   - Cuenta regresiva (25 de julio de 2026)
   - Acordeones (instalación / ejemplos con video lazy-load)
   - Blur "Próximamente" con interacción táctil
   - Envío del formulario a Formspree vía AJAX (@formspree/ajax)
   =========================================================================== */
(function () {
  "use strict";

  /* ---- CONFIGURACIÓN EDITABLE ------------------------------------------- */
  var LAUNCH_DATE   = new Date("2026-07-25T00:00:00-06:00"); // 25 jul 2026, CST (Oaxaca)
  var CONTACT_EMAIL = "aatr010423@gmail.com";
  var FORMSPREE_ID  = "mlgvaklw";
  var FORMSPREE_URL = "https://formspree.io/f/" + FORMSPREE_ID;
  var STORAGE_LANG  = "botas:lang";
  /* ----------------------------------------------------------------------- */

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ===== Diccionario i18n =============================================== */
  var I18N = {
    es: {
      page_title: "BOTAS — Asistente de voz para GNU/Linux",
      meta_desc: "BOTAS: un asistente de voz que actúa como middleware entre el usuario y la línea de comandos de GNU/Linux. Diseñado con principios de IA Centrada en el Humano (HCAI).",

      nav_what: "¿Qué es?",
      nav_about: "Sobre mí",
      nav_start: "Cómo empezar",
      nav_download: "Descarga y contacto",

      hero_eyebrow: "Asistente de voz · GNU/Linux · enfoque HCAI",
      hero_h1: "Habla con tu sistema operativo.",
      hero_lead: "<strong>BOTAS</strong> (Bot de Operaciones y Tareas Automatizadas del Sistema) es un asistente de voz que actúa como <em>middleware</em> entre tú y la línea de comandos de GNU/Linux: tú dices lo que quieres hacer y BOTAS genera el comando, lo muestra, lo explica y lo ejecuta.",
      hero_cta_try: "Quiero probarlo",
      hero_cta_how: "Cómo funciona",
      hero_img_alt: "Interfaz gráfica de BOTAS mostrando el saludo, el indicador de estado y los botones de control.",
      hero_caption: "Interfaz de BOTAS (GTK).",

      band1_h: "¿Para qué se hizo?",
      band1_p: "GNU/Linux mueve la nube, las supercomputadoras y los móviles del mundo, pero su puerta de entrada sigue siendo una línea de comandos de los años 70. BOTAS nace para cerrar esa brecha: hacer accesible ese poder sin pedirle al usuario que memorice sintaxis crípticas.",
      band2_h: "¿Cómo es útil?",
      band2_p: "Para quien empieza en Linux, encontrar el comando correcto deja de ser un obstáculo. Para quien ya lo conoce, evita decenas de clics y permite delegar tareas por voz mientras hace otra cosa. No reemplaza la terminal: la vuelve conversacional.",

      features_h: "Características principales",
      f1_h: "Voz en español", f1_p: "Reconocimiento con OpenAI Whisper (en línea) o Vosk (sin conexión).",
      f2_h: "Interpretación inteligente", f2_p: "Traduce lenguaje natural a comandos con GPT-4o o un modelo local (DeepSeek / LM&nbsp;Studio).",
      f3_h: "Seguridad por capas", f3_p: "Seis capas deterministas, independientes del modelo, que previenen operaciones destructivas.",
      f4_h: "Aprende de ti", f4_p: "Memoriza las tareas que resuelve el LLM y las reutiliza sin volver a consultarlo.",
      f5_h: "Multi-distribución", f5_p: "Se adapta a 6 familias de distros (Debian, Fedora, Arch, openSUSE, Alpine, Void).",
      f6_h: "Más que archivos", f6_p: "Procesos, redes y puertos, búsquedas web, plantillas de proyecto y análisis de texto.",
      f7_h: "Confirma lo riesgoso", f7_p: "Muestra el comando antes de ejecutarlo y pide confirmación en operaciones delicadas.",
      f8_h: "Respuesta hablada", f8_p: "Retroalimentación por voz con OpenAI TTS o eSpeak (offline).",

      callout: "BOTAS se diseñó bajo el paradigma de <strong>Inteligencia Artificial Centrada en el Humano (HCAI)</strong>: la IA <em>propone</em> y el humano <em>decide</em>. Transparencia, control humano, seguridad y empoderamiento guían cada decisión.",

      about_h1: "Sobre mí",
      about_q1: "¿Quién soy?",
      about_a1: "Hola, soy <strong>José Ramón Aragón Toledo</strong>, estudiante de Ingeniería en Computación en la <strong>Universidad Tecnológica de la Mixteca</strong> (Huajuapan de León, Oaxaca). Me gusta cacharrear con GNU/Linux, leer sobre interacción humano-computadora y construir herramientas pequeñas que terminen siendo útiles para alguien más, no sólo para mí.",
      about_q2: "¿Por qué desarrollé BOTAS?",
      about_a2: "BOTAS nació durante mi <strong>servicio social</strong> en la UTM, cuando empecé a documentar cómo se construyen aplicaciones con IA generativa. Me di cuenta de algo simple: la terminal de Linux es enormemente poderosa, pero también enormemente intimidante para quien apenas llega. Quise probar si un asistente de voz, guiado por los principios de <em>IA Centrada en el Humano</em> (HCAI), podía hacer ese poder accesible sin esconder lo que pasa por debajo. De ahí salió un primer prototipo en Perl, que poco a poco fue creciendo hasta convertirse en lo que hoy es BOTAS, y que ahora forma parte de mi trabajo de tesis.",
      about_q3: "Contexto académico",
      about_a3: "BOTAS se desarrolla en la <strong>Universidad Tecnológica de la Mixteca</strong> bajo la dirección del <strong>M.C. Ricardo Ruiz Rodríguez</strong>, y se presenta como artículo corto en <strong>CLIHC&nbsp;2026</strong>.",
      about_related_h: "Trabajos relacionados",
      about_related_p: "Mi acercamiento previo más directo a este tema fue mi trabajo de servicio social, donde exploré y documenté varios prototipos con IA generativa. Lo dejo aquí por si alguien quiere ver de dónde vienen muchas de las decisiones que se ven hoy en BOTAS.",
      about_related_link: "Marco Histórico y Referencial Para el Desarrollo de Aplicaciones con IA",
      about_related_note: "Servicio social · prototipos documentados en el repositorio JRATSS.",

      start_h1: "Cómo empezar",
      examples_h: "Ejemplos de uso",
      examples_hint: "Toca un ejemplo para abrir una breve demostración en video.",
      ex1: "«Muéstrame todos los archivos PDF en la carpeta Documentos.»",
      ex2: "«Crea una estructura de proyecto fullstack en el escritorio.»",
      ex3: "«¿Qué procesos están consumiendo más memoria?»",
      ex4: "«Busca en YouTube un tutorial de Git.»",
      ex5: "«¿Qué puertos tengo abiertos?»",
      ex6: "«Mueve los PDF de Descargas a Documentos/Tesis.»",
      video_unsupported: "Tu navegador no soporta el reproductor de video.",
      confirm_alt: "Diálogo de confirmación de BOTAS antes de ejecutar una operación.",
      confirm_caption: "BOTAS muestra el comando y pide confirmación antes de ejecutar.",

      install_h: "Instalación",
      install_lead: "BOTAS corre en GNU/Linux. El instalador detecta tu distribución automáticamente. Despliega cada paso para ver los detalles.",
      step1_h: "Clonar el repositorio",
      step1_p: "El repositorio aún es privado mientras pulimos la primera versión pública.",
      step2_h: "Instalar dependencias",
      step2_p: "Instala Perl y sus módulos, SoX (audio), eSpeak (voz) y demás requisitos. Compatible con Debian/Ubuntu, Fedora/RHEL, Arch/Manjaro, openSUSE, Alpine y Void.",
      step3_h: "Configurar",
      step3_p: "O usa el modo local sin clave (ver abajo).",
      step4_h: "Ejecutar",
      step4_p: "Se abre la ventana. Pulsa «Escuchar» o di la palabra de activación «Botas» y habla tu comando.",
      blur_msg: "Próximamente, contáctame para recibir una versión demo",

      apikeys_h: "Obtener una API key",
      api1_h: "OpenAI (recomendado)", api1_p: "Mayor precisión (Whisper + GPT-4o).",
      api1_s1: 'Entra a <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">platform.openai.com/api-keys</a>.',
      api1_s2: "Inicia sesión y pulsa «Create new secret key».",
      api1_s3: 'Copia la clave (empieza con <code>sk-…</code>) en <code>config.json</code> → <code>"api_key"</code>.',
      api2_h: "DeepSeek (alternativa)", api2_p: "Compatible con la API de OpenAI, suele ser más económica.",
      api2_s1: 'Entra a <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a>.',
      api2_s2: "Crea una API key en el panel.",
      api2_s3: "Colócala en <code>config.json</code> y selecciona el proveedor DeepSeek.",
      api3_h: "Local · sin clave", api3_p: "100&nbsp;% privado y gratis, sin internet.",
      api3_s1: 'Instala <a href="https://lmstudio.ai" target="_blank" rel="noopener">LM&nbsp;Studio</a> u <a href="https://ollama.com" target="_blank" rel="noopener">Ollama</a>.',
      api3_s2: "Descarga un modelo (p.ej. DeepSeek-R1 8B).",
      api3_s3: "Inicia el servidor local y apunta <code>config.json</code> a esa URL.",

      download_h1: "Descarga",
      cd_eyebrow: "Liberación pública del repositorio",
      cd_days: "días", cd_hours: "horas", cd_mins: "min", cd_secs: "seg",
      cd_target: "Disponible el <strong>25 de julio de 2026</strong>.",
      cd_live: "<strong>¡Ya está disponible!</strong>",
      download_btn: "Descargar (próximamente)",
      download_btn_live: "Descargar BOTAS",
      download_note: "El enlace se habilitará automáticamente cuando termine la cuenta regresiva.",
      download_note_live: "Gracias por tu interés. ¡Que lo disfrutes!",

      contact_h1: "Contacto y feedback",
      contact_lead: "¿Tienes comentarios, dudas o quieres una <strong>demo privada</strong>? Escríbeme: leo todo lo que llega por aquí.",
      contact_name: "Nombre",
      contact_email: "Correo",
      contact_message: "Mensaje",
      contact_demo: "Quiero solicitar una <strong>demo privada</strong>.",
      contact_submit: "Enviar",
      contact_sending: "Enviando…",
      form_success: "¡Gracias! Tu mensaje fue enviado. Te responderé pronto.",
      form_error: "Hubo un problema al enviar. Inténtalo de nuevo o escríbeme directamente.",
      form_invalid: "Revisa los campos requeridos.",
      mailto_q: "¿Prefieres tu propio correo?",
      mailto_link: "Escríbeme directamente",

      foot1: "BOTAS · Universidad Tecnológica de la Mixteca · CLIHC&nbsp;2026",
      foot2: "Hecho con HTML, CSS y JavaScript · sin rastreadores."
    },

    en: {
      page_title: "BOTAS — Voice assistant for GNU/Linux",
      meta_desc: "BOTAS: a voice assistant acting as middleware between you and the GNU/Linux command line. Designed with Human-Centered AI (HCAI) principles.",

      nav_what: "What is it?",
      nav_about: "About me",
      nav_start: "Get started",
      nav_download: "Download & contact",

      hero_eyebrow: "Voice assistant · GNU/Linux · HCAI approach",
      hero_h1: "Talk to your operating system.",
      hero_lead: "<strong>BOTAS</strong> (System Operations & Tasks Automation Bot) is a voice assistant that acts as <em>middleware</em> between you and the GNU/Linux command line: you say what you want to do and BOTAS builds the command, shows it, explains it and runs it.",
      hero_cta_try: "I want to try it",
      hero_cta_how: "How it works",
      hero_img_alt: "BOTAS graphical interface showing the greeting, status indicator and control buttons.",
      hero_caption: "BOTAS interface (GTK).",

      band1_h: "Why was it built?",
      band1_p: "GNU/Linux powers the cloud, supercomputers and the world's phones, but its front door is still a 1970s command line. BOTAS exists to bridge that gap: make that power accessible without forcing you to memorize cryptic syntax.",
      band2_h: "How is it useful?",
      band2_p: "For Linux newcomers, finding the right command stops being a roadblock. For seasoned users, it skips dozens of clicks and lets you delegate tasks by voice while doing something else. It doesn't replace the terminal: it makes it conversational.",

      features_h: "Main features",
      f1_h: "Voice in Spanish", f1_p: "Speech recognition with OpenAI Whisper (online) or Vosk (offline).",
      f2_h: "Smart interpretation", f2_p: "Translates natural language into commands with GPT-4o or a local model (DeepSeek / LM&nbsp;Studio).",
      f3_h: "Layered safety", f3_p: "Six deterministic layers, independent of the model, that prevent destructive operations.",
      f4_h: "Learns from you", f4_p: "Memorizes the tasks the LLM solves and reuses them without asking again.",
      f5_h: "Multi-distribution", f5_p: "Adapts to 6 distro families (Debian, Fedora, Arch, openSUSE, Alpine, Void).",
      f6_h: "Beyond files", f6_p: "Processes, networks and ports, web searches, project templates and text analysis.",
      f7_h: "Confirms risky actions", f7_p: "Shows the command before executing it and asks for confirmation on delicate operations.",
      f8_h: "Spoken reply", f8_p: "Voice feedback with OpenAI TTS or eSpeak (offline).",

      callout: "BOTAS was designed under the <strong>Human-Centered AI (HCAI)</strong> paradigm: the AI <em>proposes</em>, the human <em>decides</em>. Transparency, human control, safety and empowerment guide every decision.",

      about_h1: "About me",
      about_q1: "Who am I?",
      about_a1: "Hi, I'm <strong>José Ramón Aragón Toledo</strong>, a Computer Engineering student at the <strong>Universidad Tecnológica de la Mixteca</strong> (Huajuapan de León, Oaxaca, Mexico). I like tinkering with GNU/Linux, reading about human-computer interaction, and building small tools that end up being useful to someone other than me.",
      about_q2: "Why did I build BOTAS?",
      about_a2: "BOTAS was born during my <strong>social service</strong> at UTM, when I started documenting how to build apps with generative AI. I noticed something simple: the Linux terminal is hugely powerful, but also hugely intimidating for newcomers. I wanted to see whether a voice assistant, guided by <em>Human-Centered AI</em> (HCAI) principles, could make that power accessible without hiding what's happening underneath. A first Perl prototype came out of that idea and slowly grew into what BOTAS is today — and into my thesis work.",
      about_q3: "Academic context",
      about_a3: "BOTAS is developed at the <strong>Universidad Tecnológica de la Mixteca</strong> under the supervision of <strong>M.C. Ricardo Ruiz Rodríguez</strong>, and is presented as a short paper at <strong>CLIHC&nbsp;2026</strong>.",
      about_related_h: "Related work",
      about_related_p: "My closest previous approach to this topic was my social service work, where I explored and documented several generative-AI prototypes. I leave it here in case anyone wants to see where many of the decisions in BOTAS come from.",
      about_related_link: "Historical and Reference Framework for the Development of AI Applications",
      about_related_note: "Social service · prototypes documented in the JRATSS repository.",

      start_h1: "Get started",
      examples_h: "Usage examples",
      examples_hint: "Tap an example to open a short video demonstration.",
      ex1: "“Show me every PDF file in the Documents folder.”",
      ex2: "“Create a fullstack project structure on the desktop.”",
      ex3: "“Which processes are consuming the most memory?”",
      ex4: "“Search YouTube for a Git tutorial.”",
      ex5: "“Which ports do I have open?”",
      ex6: "“Move PDFs from Downloads to Documents/Thesis.”",
      video_unsupported: "Your browser doesn't support the video player.",
      confirm_alt: "BOTAS confirmation dialog before executing an operation.",
      confirm_caption: "BOTAS shows the command and asks for confirmation before running.",

      install_h: "Installation",
      install_lead: "BOTAS runs on GNU/Linux. The installer detects your distribution automatically. Expand each step for details.",
      step1_h: "Clone the repository",
      step1_p: "The repository is still private while we polish the first public release.",
      step2_h: "Install dependencies",
      step2_p: "Installs Perl and its modules, SoX (audio), eSpeak (voice) and other requirements. Compatible with Debian/Ubuntu, Fedora/RHEL, Arch/Manjaro, openSUSE, Alpine and Void.",
      step3_h: "Configure",
      step3_p: "Or use the local key-less mode (see below).",
      step4_h: "Run",
      step4_p: "The window opens. Click “Listen” or say the wake word “Botas” and speak your command.",
      blur_msg: "Coming soon — contact me to receive a demo version",

      apikeys_h: "Getting an API key",
      api1_h: "OpenAI (recommended)", api1_p: "Highest accuracy (Whisper + GPT-4o).",
      api1_s1: 'Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">platform.openai.com/api-keys</a>.',
      api1_s2: "Log in and click “Create new secret key”.",
      api1_s3: 'Paste the key (starts with <code>sk-…</code>) into <code>config.json</code> → <code>"api_key"</code>.',
      api2_h: "DeepSeek (alternative)", api2_p: "OpenAI-compatible API, usually cheaper.",
      api2_s1: 'Go to <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a>.',
      api2_s2: "Create an API key in the dashboard.",
      api2_s3: "Place it in <code>config.json</code> and select the DeepSeek provider.",
      api3_h: "Local · no key", api3_p: "100% private and free, no internet.",
      api3_s1: 'Install <a href="https://lmstudio.ai" target="_blank" rel="noopener">LM&nbsp;Studio</a> or <a href="https://ollama.com" target="_blank" rel="noopener">Ollama</a>.',
      api3_s2: "Download a model (e.g. DeepSeek-R1 8B).",
      api3_s3: "Start the local server and point <code>config.json</code> at that URL.",

      download_h1: "Download",
      cd_eyebrow: "Public release of the repository",
      cd_days: "days", cd_hours: "hours", cd_mins: "min", cd_secs: "sec",
      cd_target: "Available on <strong>July 25, 2026</strong>.",
      cd_live: "<strong>It's available now!</strong>",
      download_btn: "Download (coming soon)",
      download_btn_live: "Download BOTAS",
      download_note: "The link will be enabled automatically when the countdown ends.",
      download_note_live: "Thanks for your interest. Enjoy!",

      contact_h1: "Contact & feedback",
      contact_lead: "Feedback, questions, or want a <strong>private demo</strong>? Write me — I read everything that comes in here.",
      contact_name: "Name",
      contact_email: "Email",
      contact_message: "Message",
      contact_demo: "I want to request a <strong>private demo</strong>.",
      contact_submit: "Send",
      contact_sending: "Sending…",
      form_success: "Thanks! Your message was sent. I'll reply soon.",
      form_error: "There was a problem sending. Try again or contact me directly.",
      form_invalid: "Please check the required fields.",
      mailto_q: "Prefer your own email?",
      mailto_link: "Write me directly",

      foot1: "BOTAS · Universidad Tecnológica de la Mixteca · CLIHC&nbsp;2026",
      foot2: "Built with HTML, CSS and JavaScript · no trackers."
    },

    pt: {
      page_title: "BOTAS — Assistente de voz para GNU/Linux",
      meta_desc: "BOTAS: um assistente de voz que atua como middleware entre você e a linha de comando do GNU/Linux. Projetado com princípios de IA Centrada no Humano (HCAI).",

      nav_what: "O que é?",
      nav_about: "Sobre mim",
      nav_start: "Começar",
      nav_download: "Download & contato",

      hero_eyebrow: "Assistente de voz · GNU/Linux · enfoque HCAI",
      hero_h1: "Fale com seu sistema operacional.",
      hero_lead: "<strong>BOTAS</strong> (Bot de Operações e Tarefas Automatizadas do Sistema) é um assistente de voz que atua como <em>middleware</em> entre você e a linha de comando do GNU/Linux: você diz o que quer fazer e o BOTAS gera o comando, mostra, explica e executa.",
      hero_cta_try: "Quero experimentar",
      hero_cta_how: "Como funciona",
      hero_img_alt: "Interface gráfica do BOTAS mostrando a saudação, o indicador de estado e os botões de controle.",
      hero_caption: "Interface do BOTAS (GTK).",

      band1_h: "Para que foi feito?",
      band1_p: "GNU/Linux move a nuvem, os supercomputadores e os celulares do mundo, mas sua porta de entrada continua sendo uma linha de comando dos anos 70. O BOTAS nasce para fechar essa lacuna: tornar esse poder acessível sem pedir ao usuário que memorize sintaxes crípticas.",
      band2_h: "Como é útil?",
      band2_p: "Para quem está começando no Linux, encontrar o comando certo deixa de ser um obstáculo. Para quem já conhece, evita dezenas de cliques e permite delegar tarefas por voz enquanto faz outra coisa. Não substitui o terminal: o torna conversacional.",

      features_h: "Características principais",
      f1_h: "Voz em espanhol", f1_p: "Reconhecimento com OpenAI Whisper (online) ou Vosk (offline).",
      f2_h: "Interpretação inteligente", f2_p: "Traduz linguagem natural para comandos com GPT-4o ou um modelo local (DeepSeek / LM&nbsp;Studio).",
      f3_h: "Segurança em camadas", f3_p: "Seis camadas determinísticas, independentes do modelo, que previnem operações destrutivas.",
      f4_h: "Aprende com você", f4_p: "Memoriza as tarefas que o LLM resolve e as reutiliza sem consultá-lo de novo.",
      f5_h: "Multi-distribuição", f5_p: "Se adapta a 6 famílias de distros (Debian, Fedora, Arch, openSUSE, Alpine, Void).",
      f6_h: "Mais que arquivos", f6_p: "Processos, redes e portas, buscas na web, modelos de projeto e análise de texto.",
      f7_h: "Confirma o arriscado", f7_p: "Mostra o comando antes de executá-lo e pede confirmação em operações delicadas.",
      f8_h: "Resposta falada", f8_p: "Retorno por voz com OpenAI TTS ou eSpeak (offline).",

      callout: "O BOTAS foi desenhado sob o paradigma de <strong>Inteligência Artificial Centrada no Humano (HCAI)</strong>: a IA <em>propõe</em> e o humano <em>decide</em>. Transparência, controle humano, segurança e empoderamento guiam cada decisão.",

      about_h1: "Sobre mim",
      about_q1: "Quem sou?",
      about_a1: "Olá, sou <strong>José Ramón Aragón Toledo</strong>, estudante de Engenharia da Computação na <strong>Universidad Tecnológica de la Mixteca</strong> (Huajuapan de León, Oaxaca, México). Gosto de mexer com GNU/Linux, ler sobre interação humano-computador e construir ferramentas pequenas que acabem sendo úteis para alguém além de mim.",
      about_q2: "Por que desenvolvi o BOTAS?",
      about_a2: "O BOTAS nasceu durante o meu <strong>serviço social</strong> na UTM, quando comecei a documentar como se constroem aplicações com IA generativa. Percebi algo simples: o terminal do Linux é enormemente poderoso, mas também enormemente intimidante para quem está chegando. Quis testar se um assistente de voz, guiado pelos princípios de <em>IA Centrada no Humano</em> (HCAI), poderia tornar esse poder acessível sem esconder o que acontece por baixo. Daí saiu um primeiro protótipo em Perl, que foi crescendo até virar o BOTAS de hoje, e que agora faz parte do meu trabalho de tese.",
      about_q3: "Contexto acadêmico",
      about_a3: "O BOTAS é desenvolvido na <strong>Universidad Tecnológica de la Mixteca</strong> sob orientação do <strong>M.C. Ricardo Ruiz Rodríguez</strong>, e é apresentado como artigo curto na <strong>CLIHC&nbsp;2026</strong>.",
      about_related_h: "Trabalhos relacionados",
      about_related_p: "Meu trabalho anterior mais próximo deste tema foi o meu serviço social, onde explorei e documentei vários protótipos com IA generativa. Deixo aqui caso alguém queira ver de onde vêm muitas das decisões que aparecem hoje no BOTAS.",
      about_related_link: "Marco Histórico e Referencial Para o Desenvolvimento de Aplicações com IA",
      about_related_note: "Serviço social · protótipos documentados no repositório JRATSS.",

      start_h1: "Começar",
      examples_h: "Exemplos de uso",
      examples_hint: "Toque em um exemplo para abrir uma breve demonstração em vídeo.",
      ex1: "«Mostre-me todos os arquivos PDF na pasta Documentos.»",
      ex2: "«Crie uma estrutura de projeto fullstack na área de trabalho.»",
      ex3: "«Quais processos estão consumindo mais memória?»",
      ex4: "«Procure no YouTube um tutorial de Git.»",
      ex5: "«Quais portas eu tenho abertas?»",
      ex6: "«Mova os PDFs de Downloads para Documentos/Tese.»",
      video_unsupported: "Seu navegador não suporta o reprodutor de vídeo.",
      confirm_alt: "Diálogo de confirmação do BOTAS antes de executar uma operação.",
      confirm_caption: "O BOTAS mostra o comando e pede confirmação antes de executar.",

      install_h: "Instalação",
      install_lead: "O BOTAS roda em GNU/Linux. O instalador detecta sua distribuição automaticamente. Expanda cada passo para ver os detalhes.",
      step1_h: "Clonar o repositório",
      step1_p: "O repositório ainda é privado enquanto polimos a primeira versão pública.",
      step2_h: "Instalar dependências",
      step2_p: "Instala Perl e seus módulos, SoX (áudio), eSpeak (voz) e demais requisitos. Compatível com Debian/Ubuntu, Fedora/RHEL, Arch/Manjaro, openSUSE, Alpine e Void.",
      step3_h: "Configurar",
      step3_p: "Ou use o modo local sem chave (veja abaixo).",
      step4_h: "Executar",
      step4_p: "A janela se abre. Clique em «Escutar» ou diga a palavra de ativação «Botas» e fale seu comando.",
      blur_msg: "Em breve, contate-me para receber uma versão demo",

      apikeys_h: "Obter uma API key",
      api1_h: "OpenAI (recomendado)", api1_p: "Maior precisão (Whisper + GPT-4o).",
      api1_s1: 'Acesse <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">platform.openai.com/api-keys</a>.',
      api1_s2: "Faça login e clique em «Create new secret key».",
      api1_s3: 'Copie a chave (começa com <code>sk-…</code>) em <code>config.json</code> → <code>"api_key"</code>.',
      api2_h: "DeepSeek (alternativa)", api2_p: "Compatível com a API da OpenAI, costuma ser mais econômica.",
      api2_s1: 'Acesse <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a>.',
      api2_s2: "Crie uma API key no painel.",
      api2_s3: "Coloque-a em <code>config.json</code> e selecione o provedor DeepSeek.",
      api3_h: "Local · sem chave", api3_p: "100% privado e gratuito, sem internet.",
      api3_s1: 'Instale <a href="https://lmstudio.ai" target="_blank" rel="noopener">LM&nbsp;Studio</a> ou <a href="https://ollama.com" target="_blank" rel="noopener">Ollama</a>.',
      api3_s2: "Baixe um modelo (p.ex. DeepSeek-R1 8B).",
      api3_s3: "Inicie o servidor local e aponte o <code>config.json</code> para essa URL.",

      download_h1: "Download",
      cd_eyebrow: "Liberação pública do repositório",
      cd_days: "dias", cd_hours: "horas", cd_mins: "min", cd_secs: "seg",
      cd_target: "Disponível em <strong>25 de julho de 2026</strong>.",
      cd_live: "<strong>Já está disponível!</strong>",
      download_btn: "Baixar (em breve)",
      download_btn_live: "Baixar BOTAS",
      download_note: "O link será habilitado automaticamente quando a contagem regressiva terminar.",
      download_note_live: "Obrigado pelo interesse. Aproveite!",

      contact_h1: "Contato e feedback",
      contact_lead: "Comentários, dúvidas ou quer uma <strong>demo privada</strong>? Escreva — eu leio tudo que chega por aqui.",
      contact_name: "Nome",
      contact_email: "E-mail",
      contact_message: "Mensagem",
      contact_demo: "Quero solicitar uma <strong>demo privada</strong>.",
      contact_submit: "Enviar",
      contact_sending: "Enviando…",
      form_success: "Obrigado! Sua mensagem foi enviada. Responderei em breve.",
      form_error: "Houve um problema ao enviar. Tente de novo ou me escreva diretamente.",
      form_invalid: "Revise os campos obrigatórios.",
      mailto_q: "Prefere seu próprio e-mail?",
      mailto_link: "Escreva-me diretamente",

      foot1: "BOTAS · Universidad Tecnológica de la Mixteca · CLIHC&nbsp;2026",
      foot2: "Feito com HTML, CSS e JavaScript · sem rastreadores."
    }
  };

  var currentLang = "es";

  function getInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_LANG);
      if (saved && I18N[saved]) return saved;
    } catch (_) {}
    var nav = (navigator.language || "es").toLowerCase().slice(0, 2);
    return I18N[nav] ? nav : "es";
  }

  function applyTranslations(lang) {
    if (!I18N[lang]) lang = "es";
    var dict = I18N[lang];
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) {
        if (el.tagName === "TITLE") {
          el.textContent = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    $$("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      spec.split(",").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key  = parts[1].trim();
        if (dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });

    $$(".lang-switch button").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });

    refreshCountdownLabels();

    try { localStorage.setItem(STORAGE_LANG, lang); } catch (_) {}
  }

  function t(key) {
    var dict = I18N[currentLang] || I18N.es;
    return dict[key] != null ? dict[key] : (I18N.es[key] || "");
  }

  /* ===== Pestañas ======================================================== */
  var tabs   = $$(".tab");
  var panels = $$(".panel");
  var topbar = $(".topbar");

  function activate(id, push) {
    if (!document.getElementById(id)) { id = "que-es"; }
    panels.forEach(function (p) { p.classList.toggle("is-active", p.id === id); });
    tabs.forEach(function (tEl) {
      var on = tEl.getAttribute("data-tab") === id;
      tEl.classList.toggle("is-active", on);
      tEl.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (push && history.replaceState) { history.replaceState(null, "", "#" + id); }
    if (topbar) {
      topbar.classList.remove("nav-open");
      var togBtn = $(".nav-toggle");
      if (togBtn) togBtn.setAttribute("aria-expanded", "false");
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  $$("[data-tab]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      activate(el.getAttribute("data-tab"), true);
    });
  });

  window.addEventListener("hashchange", function () {
    activate((location.hash || "#que-es").slice(1), false);
  });

  /* ===== Menú móvil ====================================================== */
  var toggle = $(".nav-toggle");
  if (toggle && topbar) {
    toggle.addEventListener("click", function () {
      var open = topbar.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ===== Selector de idioma ============================================= */
  $$(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () {
      applyTranslations(b.getAttribute("data-lang"));
    });
  });

  /* ===== Cuenta regresiva =============================================== */
  var box        = $(".countdown-box");
  var dlBtn      = $("#download-btn");
  var dlNote     = $("#download-note");
  var targetTxt  = $(".countdown__target");
  var fields     = {
    days:  $('[data-cd="days"]'),
    hours: $('[data-cd="hours"]'),
    mins:  $('[data-cd="mins"]'),
    secs:  $('[data-cd="secs"]')
  };
  var isLive = false;
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  function refreshCountdownLabels() {
    if (!targetTxt) return;
    if (isLive) {
      targetTxt.innerHTML = t("cd_live");
      if (dlBtn) dlBtn.textContent = t("download_btn_live");
      if (dlNote) dlNote.textContent = t("download_note_live");
    } else {
      targetTxt.innerHTML = t("cd_target");
      if (dlBtn) dlBtn.textContent = t("download_btn");
      if (dlNote) dlNote.textContent = t("download_note");
    }
  }

  function launchReady() {
    isLive = true;
    if (box) box.classList.add("is-live");
    if (dlBtn) {
      dlBtn.classList.remove("is-disabled");
      dlBtn.removeAttribute("aria-disabled");
      var wrap = dlBtn.closest(".blur-wrap");
      if (wrap) {
        wrap.classList.remove("blur-wrap", "blur-wrap--btn");
        dlBtn.classList.remove("blur-content");
        var ov = wrap.querySelector(".blur-overlay");
        if (ov) ov.remove();
      }
    }
    refreshCountdownLabels();
  }

  function tick() {
    var diff = LAUNCH_DATE.getTime() - Date.now();
    if (diff <= 0) { launchReady(); clearInterval(timer); return; }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;
    if (fields.days)  fields.days.textContent  = d;
    if (fields.hours) fields.hours.textContent = pad(h);
    if (fields.mins)  fields.mins.textContent  = pad(m);
    if (fields.secs)  fields.secs.textContent  = pad(s);
  }
  var timer;
  if (box) { tick(); timer = setInterval(tick, 1000); }

  /* ===== Blur "Próximamente" — soporte táctil ============================= */
  $$(".blur-wrap").forEach(function (wrap) {
    wrap.addEventListener("click", function (e) {
      e.preventDefault();
      var wasRevealed = wrap.classList.contains("is-revealed");
      $$(".blur-wrap.is-revealed").forEach(function (w) { w.classList.remove("is-revealed"); });
      if (!wasRevealed) wrap.classList.add("is-revealed");
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        wrap.classList.toggle("is-revealed");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".blur-wrap")) {
      $$(".blur-wrap.is-revealed").forEach(function (w) { w.classList.remove("is-revealed"); });
    }
  });

  /* ===== Ejemplos: lazy-load del <source> sólo al abrir =================== */
  $$(".example").forEach(function (det) {
    det.addEventListener("toggle", function () {
      if (!det.open) {
        var v = det.querySelector("video");
        if (v) { try { v.pause(); } catch (_) {} }
        return;
      }
      var video = det.querySelector("video[data-src]");
      if (!video || video.querySelector("source")) return;
      var src = video.getAttribute("data-src");
      var source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      video.insertBefore(source, video.firstChild);
      video.load();
    });
  });

  /* ===== Formulario de contacto (Formspree AJAX) ========================= */
  var form    = $("#contact-form");
  var status  = $("#form-status");
  var ok      = $("#form-success");
  var err     = $("#form-error");
  var submit  = $("#submit-btn");

  function setBanner(kind, msg) {
    if (ok)  { ok.hidden  = (kind !== "ok");  if (kind === "ok"  && msg) ok.innerHTML  = msg; }
    if (err) { err.hidden = (kind !== "err"); if (kind === "err" && msg) err.innerHTML = msg; }
    if (status) {
      status.textContent = (kind === "sending" && msg) ? msg : "";
      status.className = "form-status" + (kind === "ok" ? " ok" : kind === "err" ? " err" : "");
    }
  }

  function tryFormspreeLib() {
    if (!form || !window.formspree) return false;
    try {
      if (typeof window.formspree.init === "function") {
        window.formspree.init();
      }
      return true;
    } catch (_) { return false; }
  }

  if (form) {
    window.addEventListener("load", tryFormspreeLib);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form._gotcha && form._gotcha.value) return;

      if (!form.checkValidity()) {
        setBanner("err", t("form_invalid"));
        form.reportValidity && form.reportValidity();
        return;
      }

      var data = new FormData(form);
      if (submit) { submit.disabled = true; submit.textContent = t("contact_sending"); }
      setBanner("sending", t("contact_sending"));

      fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (r) {
          return r.json().then(function (j) { return { ok: r.ok, body: j }; });
        })
        .then(function (res) {
          if (res.ok) {
            setBanner("ok", t("form_success"));
            form.reset();
          } else {
            var msg = t("form_error");
            if (res.body && Array.isArray(res.body.errors) && res.body.errors.length) {
              msg = res.body.errors.map(function (er) { return er.message; }).join(" · ");
            }
            setBanner("err", msg);
          }
        })
        .catch(function () {
          setBanner("err", t("form_error") + " " + CONTACT_EMAIL);
        })
        .finally(function () {
          if (submit) { submit.disabled = false; submit.textContent = t("contact_submit"); }
        });
    });
  }

  /* ===== Estado inicial ================================================== */
  applyTranslations(getInitialLang());
  activate((location.hash || "#que-es").slice(1), false);
})();
