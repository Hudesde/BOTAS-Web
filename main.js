/* ===========================================================================
   BOTAS — sitio estático · lógica de cliente
   - Multi-idioma (ES / EN / PT) con diccionario JSON
   - Conmutación de pestañas (con soporte de #hash)
   - Menú móvil
   - Cuenta regresiva (25 de julio de 2026)
   - Acordeones (instalación / ejemplos con video lazy-load)
   - Blur "Próximamente" con interacción táctil
   - Envío del formulario a Web3Forms + asignación de código vía el proxy
   =========================================================================== */
(function () {
  "use strict";

  /* ---- CONFIGURACIÓN EDITABLE ------------------------------------------- */
  var CONTACT_EMAIL     = "aatr010423@gmail.com";
  var WEB3FORMS_KEY     = "536b060c-0df6-42cf-b365-0dd82c584ffb"; // access_key de Web3Forms
  var WEB3FORMS_URL     = "https://api.web3forms.com/submit";
  var REQUEST_CODE_URL  = "https://botas-proxy.hudesde.workers.dev/request-code"; // asigna un código de acceso
  var STORAGE_LANG      = "botas:lang";
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
      about_a3: "BOTAS se desarrolla en la <strong>Universidad Tecnológica de la Mixteca</strong> bajo la dirección del <strong>M.C. Ricardo Ruiz Rodríguez</strong>, y se presenta en la conferencia <strong>AIS&nbsp;2026</strong>, parte del congreso <strong>MCCSIS</strong> de <strong>IADIS</strong> (International Association for Development of the Information Society), celebrado en Valencia, España.",
      about_related_h: "Trabajos relacionados",
      about_related_p: "Mi acercamiento previo más directo a este tema fue mi trabajo de servicio social, donde exploré y documenté varios prototipos con IA generativa. Lo dejo aquí por si alguien quiere ver de dónde vienen muchas de las decisiones que se ven hoy en BOTAS.",
      about_related_link: "Marco Histórico y Referencial Para el Desarrollo de Aplicaciones con IA",
      about_related_note: "Servicio social · prototipos documentados en el repositorio JRATSS.",

      start_h1: "Cómo empezar",
      examples_h: "Ejemplos de uso",
      examples_hint: "Toca un ejemplo para abrir una breve demostración en video.",
      ex1: "«Busca en la web información sobre Python.»",
      ex2: "«Crea una estructura de carpetas para un proyecto web en el escritorio.»",
      ex3: "«Busca cuáles son los archivos más pesados en la carpeta Descargas.»",
      ex4: "«Busca en el escritorio dentro de la carpeta Pruebas Usabilidad y mueve los archivos de la subcarpeta Descargas Pendientes a la subcarpeta Entregas.»",
      video_unsupported: "Tu navegador no soporta el reproductor de video.",
      confirm_alt: "Diálogo de confirmación de BOTAS antes de ejecutar una operación.",
      confirm_caption: "BOTAS muestra el comando y pide confirmación antes de ejecutar.",

      install_h: "Instalación",
      install_lead: "BOTAS corre en GNU/Linux. El instalador detecta tu distribución automáticamente (Debian/Ubuntu, Fedora, Arch/Manjaro, openSUSE, Alpine y Void). Despliega cada paso para ver los detalles.",
      step1_h: "Instalar BOTAS",
      step1_p: "Un solo comando. El instalador detecta tu distribución e instala Perl y sus módulos, SoX (audio), eSpeak (voz), el modelo de reconocimiento y demás requisitos. Requiere conexión a internet la primera vez.",
      step2_h: "Activar con tu código",
      step2_p: "Abre <strong>BOTAS</strong> desde el menú de aplicaciones. La primera vez te pedirá tu <strong>código de acceso</strong> en una ventana: escríbelo y pulsa «Activar». Solo se hace una vez. ¿No tienes código? Pídelo en la pestaña <em>Descarga y contacto</em>.",
      step3_h: "Usar",
      step3_p: "Escribe tu petición o pulsa «Escuchar» y habla. También puedes activar el <strong>Modo Atención</strong> y decir la palabra «Botas» seguida de tu comando. El botón «Explicar» te muestra el comando de terminal equivalente.",

      code_h: "Tu código de acceso",
      code_p: "La versión de demostración se conecta a la IA a través de un <strong>servidor intermedio</strong>, así que <strong>no necesitas ninguna API key</strong> ni configurar nada: solo tu código de acceso. Cada código incluye un número limitado de peticiones para que puedas probar BOTAS. Pídelo gratis en la pestaña <em>Descarga y contacto</em> y lo recibirás al instante.",

      download_h1: "Descarga y acceso",
      dl_eyebrow: "Versión de demostración · disponible ahora",
      dl_lead: "Instala BOTAS con un solo comando en tu terminal de GNU/Linux:",
      dl_note: "Al abrir BOTAS por primera vez te pedirá un <strong>código de acceso</strong>. Solicítalo gratis en el formulario de abajo: lo recibes al instante.",

      contact_h1: "Solicita tu código y contacto",
      contact_lead: "Déjame tu correo y te asigno un <strong>código de acceso</strong> para probar BOTAS. ¿Dudas o comentarios? Escríbelos también: leo todo lo que llega por aquí.",
      contact_name: "Nombre",
      contact_email: "Correo",
      contact_message: "Mensaje",
      contact_message_opt: "(opcional)",
      contact_demo: "Quiero un <strong>código de acceso</strong> para probar BOTAS.",
      contact_submit: "Solicitar acceso",
      contact_sending: "Enviando…",
      code_intro: "Este es tu código de acceso. Cópialo y pégalo en BOTAS al abrirlo:",
      code_copy: "Copiar código",
      code_copied: "¡Copiado!",
      code_hint: "Guárdalo: es personal y tiene un número limitado de usos de demostración.",
      form_success: "¡Gracias! Recibí tu mensaje.",
      form_error: "Hubo un problema al enviar. Inténtalo de nuevo o escríbeme directamente.",
      form_invalid: "Revisa los campos requeridos.",
      form_nocodes: "Por ahora no quedan códigos de demostración disponibles. Escríbeme y te aviso en cuanto haya.",
      mailto_q: "¿Prefieres tu propio correo?",
      mailto_link: "Escríbeme directamente",

      foot1: "BOTAS · Universidad Tecnológica de la Mixteca · AIS 2026 · IADIS MCCSIS · Valencia, España",
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
      about_a3: "BOTAS is developed at the <strong>Universidad Tecnológica de la Mixteca</strong> under the supervision of <strong>M.C. Ricardo Ruiz Rodríguez</strong>, and is presented at the <strong>AIS&nbsp;2026</strong> conference, part of the <strong>MCCSIS</strong> congress by <strong>IADIS</strong> (International Association for Development of the Information Society), held in Valencia, Spain.",
      about_related_h: "Related work",
      about_related_p: "My closest previous approach to this topic was my social service work, where I explored and documented several generative-AI prototypes. I leave it here in case anyone wants to see where many of the decisions in BOTAS come from.",
      about_related_link: "Historical and Reference Framework for the Development of AI Applications",
      about_related_note: "Social service · prototypes documented in the JRATSS repository.",

      start_h1: "Get started",
      examples_h: "Usage examples",
      examples_hint: "Tap an example to open a short video demonstration.",
      ex1: "“Search the web for information about Python.”",
      ex2: "“Create a folder structure for a web project on the desktop.”",
      ex3: "“Find the heaviest files in the Downloads folder.”",
      ex4: "“Search on the desktop inside the Usability Tests folder and move the files from the Pending Downloads subfolder to the Submissions subfolder.”",
      video_unsupported: "Your browser doesn't support the video player.",
      confirm_alt: "BOTAS confirmation dialog before executing an operation.",
      confirm_caption: "BOTAS shows the command and asks for confirmation before running.",

      install_h: "Installation",
      install_lead: "BOTAS runs on GNU/Linux. The installer detects your distribution automatically (Debian/Ubuntu, Fedora, Arch/Manjaro, openSUSE, Alpine and Void). Expand each step for details.",
      step1_h: "Install BOTAS",
      step1_p: "A single command. The installer detects your distribution and installs Perl and its modules, SoX (audio), eSpeak (voice), the recognition model and other requirements. Needs an internet connection the first time.",
      step2_h: "Activate with your code",
      step2_p: "Open <strong>BOTAS</strong> from your applications menu. The first time it will ask for your <strong>access code</strong> in a window: type it and click “Activate”. Only once. No code yet? Request one in the <em>Download & contact</em> tab.",
      step3_h: "Use it",
      step3_p: "Type your request or click “Listen” and speak. You can also enable <strong>Attention Mode</strong> and say the wake word “Botas” followed by your command. The “Explain” button shows the equivalent terminal command.",

      code_h: "Your access code",
      code_p: "The demo version connects to the AI through an <strong>intermediate server</strong>, so you <strong>don't need any API key</strong> or configuration: just your access code. Each code includes a limited number of requests so you can try BOTAS. Request one for free in the <em>Download & contact</em> tab and get it instantly.",

      download_h1: "Download & access",
      dl_eyebrow: "Demo version · available now",
      dl_lead: "Install BOTAS with a single command in your GNU/Linux terminal:",
      dl_note: "The first time you open BOTAS it will ask for an <strong>access code</strong>. Request it for free in the form below — you get it instantly.",

      contact_h1: "Request your code & contact",
      contact_lead: "Leave me your email and I'll assign you an <strong>access code</strong> to try BOTAS. Questions or feedback? Write them too — I read everything that comes in here.",
      contact_name: "Name",
      contact_email: "Email",
      contact_message: "Message",
      contact_message_opt: "(optional)",
      contact_demo: "I want an <strong>access code</strong> to try BOTAS.",
      contact_submit: "Request access",
      contact_sending: "Sending…",
      code_intro: "This is your access code. Copy it and paste it into BOTAS when you open it:",
      code_copy: "Copy code",
      code_copied: "Copied!",
      code_hint: "Keep it: it's personal and has a limited number of demo uses.",
      form_success: "Thanks! I got your message.",
      form_error: "There was a problem sending. Try again or contact me directly.",
      form_invalid: "Please check the required fields.",
      form_nocodes: "No demo codes are available right now. Write me and I'll let you know as soon as there are.",
      mailto_q: "Prefer your own email?",
      mailto_link: "Write me directly",

      foot1: "BOTAS · Universidad Tecnológica de la Mixteca · AIS 2026 · IADIS MCCSIS · Valencia, España",
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
      about_a3: "O BOTAS é desenvolvido na <strong>Universidad Tecnológica de la Mixteca</strong> sob orientação do <strong>M.C. Ricardo Ruiz Rodríguez</strong>, e é apresentado na conferência <strong>AIS&nbsp;2026</strong>, parte do congresso <strong>MCCSIS</strong> da <strong>IADIS</strong> (International Association for Development of the Information Society), realizado em Valência, Espanha.",
      about_related_h: "Trabalhos relacionados",
      about_related_p: "Meu trabalho anterior mais próximo deste tema foi o meu serviço social, onde explorei e documentei vários protótipos com IA generativa. Deixo aqui caso alguém queira ver de onde vêm muitas das decisões que aparecem hoje no BOTAS.",
      about_related_link: "Marco Histórico e Referencial Para o Desenvolvimento de Aplicações com IA",
      about_related_note: "Serviço social · protótipos documentados no repositório JRATSS.",

      start_h1: "Começar",
      examples_h: "Exemplos de uso",
      examples_hint: "Toque em um exemplo para abrir uma breve demonstração em vídeo.",
      ex1: "«Pesquise na web informações sobre Python.»",
      ex2: "«Crie uma estrutura de pastas para um projeto web na área de trabalho.»",
      ex3: "«Encontre os arquivos mais pesados na pasta Downloads.»",
      ex4: "«Busque na área de trabalho dentro da pasta Testes de Usabilidade e mova os arquivos da subpasta Downloads Pendentes para a subpasta Entregas.»",
      video_unsupported: "Seu navegador não suporta o reprodutor de vídeo.",
      confirm_alt: "Diálogo de confirmação do BOTAS antes de executar uma operação.",
      confirm_caption: "O BOTAS mostra o comando e pede confirmação antes de executar.",

      install_h: "Instalação",
      install_lead: "O BOTAS roda em GNU/Linux. O instalador detecta sua distribuição automaticamente (Debian/Ubuntu, Fedora, Arch/Manjaro, openSUSE, Alpine e Void). Expanda cada passo para ver os detalhes.",
      step1_h: "Instalar o BOTAS",
      step1_p: "Um único comando. O instalador detecta sua distribuição e instala Perl e seus módulos, SoX (áudio), eSpeak (voz), o modelo de reconhecimento e demais requisitos. Precisa de conexão com a internet na primeira vez.",
      step2_h: "Ativar com seu código",
      step2_p: "Abra o <strong>BOTAS</strong> no menu de aplicativos. Na primeira vez ele pedirá seu <strong>código de acesso</strong> em uma janela: digite-o e clique em «Ativar». Só uma vez. Não tem código? Peça na aba <em>Download & contato</em>.",
      step3_h: "Usar",
      step3_p: "Digite seu pedido ou clique em «Escutar» e fale. Você também pode ativar o <strong>Modo Atenção</strong> e dizer a palavra «Botas» seguida do seu comando. O botão «Explicar» mostra o comando de terminal equivalente.",

      code_h: "Seu código de acesso",
      code_p: "A versão de demonstração se conecta à IA através de um <strong>servidor intermediário</strong>, então você <strong>não precisa de nenhuma API key</strong> nem de configurar nada: só do seu código de acesso. Cada código inclui um número limitado de requisições para você experimentar o BOTAS. Peça grátis na aba <em>Download & contato</em> e receba na hora.",

      download_h1: "Download e acesso",
      dl_eyebrow: "Versão de demonstração · disponível agora",
      dl_lead: "Instale o BOTAS com um único comando no seu terminal GNU/Linux:",
      dl_note: "Ao abrir o BOTAS pela primeira vez ele pedirá um <strong>código de acesso</strong>. Solicite grátis no formulário abaixo — você recebe na hora.",

      contact_h1: "Solicite seu código e contato",
      contact_lead: "Deixe seu e-mail e eu te atribuo um <strong>código de acesso</strong> para experimentar o BOTAS. Dúvidas ou comentários? Escreva também — eu leio tudo que chega por aqui.",
      contact_name: "Nome",
      contact_email: "E-mail",
      contact_message: "Mensagem",
      contact_message_opt: "(opcional)",
      contact_demo: "Quero um <strong>código de acesso</strong> para experimentar o BOTAS.",
      contact_submit: "Solicitar acesso",
      contact_sending: "Enviando…",
      code_intro: "Este é o seu código de acesso. Copie e cole no BOTAS ao abri-lo:",
      code_copy: "Copiar código",
      code_copied: "Copiado!",
      code_hint: "Guarde-o: é pessoal e tem um número limitado de usos de demonstração.",
      form_success: "Obrigado! Recebi sua mensagem.",
      form_error: "Houve um problema ao enviar. Tente de novo ou me escreva diretamente.",
      form_invalid: "Revise os campos obrigatórios.",
      form_nocodes: "No momento não há códigos de demonstração disponíveis. Escreva-me e aviso assim que houver.",
      mailto_q: "Prefere seu próprio e-mail?",
      mailto_link: "Escreva-me diretamente",

      foot1: "BOTAS · Universidad Tecnológica de la Mixteca · AIS 2026 · IADIS MCCSIS · Valencia, España",
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

  /* ===== Formulario: contacto (Web3Forms) + asignación de código ========= */
  var form    = $("#contact-form");
  var status  = $("#form-status");
  var ok      = $("#form-success");
  var err     = $("#form-error");
  var submit  = $("#submit-btn");
  var codeBox = $("#code-result");
  var codeVal = $("#code-value");
  var wantChk = $("#want-code");
  var copyBtn = $("#code-copy");

  // Copiar el código al portapapeles. navigator.clipboard requiere HTTPS
  // (GitHub Pages lo es); si no está disponible, se recurre a execCommand.
  function copyCode() {
    var code = codeVal ? (codeVal.textContent || "").trim() : "";
    if (!code || !copyBtn) return;
    var done = function () {
      copyBtn.textContent = t("code_copied");
      setTimeout(function () { copyBtn.textContent = t("code_copy"); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
    function fallbackCopy() {
      try {
        var ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch (_) { /* el código sigue visible y seleccionable a mano */ }
    }
  }
  if (copyBtn) copyBtn.addEventListener("click", copyCode);

  function setBanner(kind, msg) {
    if (ok)  { ok.hidden  = (kind !== "ok");  if (kind === "ok"  && msg) ok.innerHTML  = msg; }
    if (err) { err.hidden = (kind !== "err"); if (kind === "err" && msg) err.innerHTML = msg; }
    if (status) {
      status.textContent = (kind === "sending" && msg) ? msg : "";
      status.className = "form-status" + (kind === "ok" ? " ok" : kind === "err" ? " err" : "");
    }
  }

  function showCode(code) {
    if (codeVal) codeVal.textContent = code;
    if (codeBox) {
      codeBox.hidden = false;
      codeBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setBanner("none");
  }

  // Envía el contacto a Web3Forms (para que me llegue por correo).
  function sendContact() {
    var data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "Solicitud de acceso · BOTAS");
    data.append("from_name", "Sitio BOTAS");
    return fetch(WEB3FORMS_URL, { method: "POST", body: data })
      .then(function (r) { return r.json(); })
      .then(function (j) { return !!(j && j.success); })
      .catch(function () { return false; });
  }

  // Pide al proxy un código de acceso para este correo. Devuelve
  // { code } | { error } | null (sin red).
  function requestCode(email, name) {
    return fetch(REQUEST_CODE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, name: name || "" })
    })
      .then(function (r) { return r.json().then(function (j) { return j; }); })
      .catch(function () { return null; });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.botcheck && form.botcheck.checked) return; // honeypot

      if (!form.checkValidity()) {
        setBanner("err", t("form_invalid"));
        form.reportValidity && form.reportValidity();
        return;
      }

      var email = (form.email && form.email.value || "").trim();
      var name  = (form.name && form.name.value || "").trim();
      var wantCode = wantChk ? wantChk.checked : true;

      if (submit) { submit.disabled = true; submit.textContent = t("contact_sending"); }
      setBanner("sending", t("contact_sending"));

      Promise.all([
        sendContact(),
        wantCode ? requestCode(email, name) : Promise.resolve(null)
      ]).then(function (res) {
        var contactOk = res[0];
        var codeRes   = res[1];
        var gotCode   = false;

        if (codeRes && codeRes.code) {
          showCode(codeRes.code);
          gotCode = true;
        } else if (codeRes && codeRes.error === "sin_codigos") {
          setBanner("err", t("form_nocodes"));
        }

        if (gotCode) {
          form.reset();                 // el código mostrado es el feedback
        } else if (contactOk) {
          setBanner("ok", t("form_success"));
          form.reset();
        } else if (!(codeRes && codeRes.error === "sin_codigos")) {
          setBanner("err", t("form_error") + " " + CONTACT_EMAIL);
        }
      }).finally(function () {
        if (submit) { submit.disabled = false; submit.textContent = t("contact_submit"); }
      });
    });
  }

  /* ===== Estado inicial ================================================== */
  applyTranslations(getInitialLang());
  activate((location.hash || "#que-es").slice(1), false);
})();
