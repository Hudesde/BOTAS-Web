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
      about_portfolio: "Si quieres ver otros proyectos en los que he trabajado, puedes visitar mi <a href=\"https://hudesde.github.io/Portfolio/\" target=\"_blank\" rel=\"noopener\">portafolio</a>.",
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

      /* ── Pestaña Investigación ── */
      nav_research: "Investigación",
      rs_h1: "Investigación y evidencia",
      rs_eyebrow: "Transparencia completa",
      rs_lead: "Una charla de 20 minutos obliga a recortar. <strong>Aquí está todo lo que no cupo</strong>: los diagramas completos, la metodología, las gráficas, las limitaciones honestas y los <strong>datos crudos descargables</strong> — incluidos los números que no nos favorecen.",

      rs_data_h: "Datos crudos y reportes",
      rs_data_p: "Todo lo que sostiene las cifras de abajo, tal cual salió de las herramientas. Sin filtrar ni maquillar.",
      rs_dl1: "Reporte completo de usabilidad (<em>n</em>=14, ISO 9241-11)",
      rs_dl2: "Dataset de evaluación — 250 tareas",
      rs_dl3: "Resultados crudos — DeepSeek (250 tareas)",
      rs_dl4: "Resultados crudos — GPT-4o (250 tareas)",

      rs_arch_h: "Arquitectura completa",
      rs_arch_p: "Ocho componentes modulares en Perl. Una petición hablada atraviesa cuatro capas: detector local, TaskLearner, parser LLM y validador de seguridad antes de ejecutarse.",
      rs_fig_arch: "Arquitectura general: el detector local intercepta ~30 % de las peticiones; el resto baja por el LLM, el validador y la ejecución.",
      rs_fig_flow: "Flujo de un comando de principio a fin: voz → Vosk/Whisper → parser → validación de seguridad → ejecución → respuesta hablada.",
      rs_fig_attn: "Modo Atención: la palabra «botas» se detecta <strong>offline</strong>. La nube solo se contacta <em>después</em> de activar, durante una ventana de 30 s.",

      rs_tl_h: "TaskLearner: aprender sin dejar de ser seguro",
      rs_tl1_h: "Cómo aprende",
      rs_tl1_a: "Tras una llamada exitosa al LLM, deduce una <strong>plantilla reutilizable</strong> de la petición.",
      rs_tl1_b: "Localiza qué palabras corresponden a qué parámetro (un nombre de carpeta, un término de búsqueda), ponderando con <strong>TF-IDF</strong>.",
      rs_tl1_c: "Al llegar una petición parecida, calcula <strong>similitud coseno</strong>; por encima de <strong>0.60</strong> reconstruye la misma acción JSON — <strong>cero llamadas al LLM</strong>.",
      rs_tl2_h: "Salvaguardas y control",
      rs_tl2_a: "Un patrón que <strong>falla dos veces</strong> queda en cuarentena: la petición vuelve al LLM.",
      rs_tl2_b: "Los casi duplicados (&gt;95 % de similitud) solo incrementan un contador; techo de 500 patrones con desalojo del menos usado.",
      rs_tl2_c: "Solo aprende acciones seguras y plantillables — nunca <code>clarify</code> ni <code>answer</code>.",
      rs_tl2_d: "<strong>Desactivado por defecto.</strong> Puedes pausarlo o borrar permanentemente lo aprendido.",
      rs_tl2_e: "El validador de seguridad corre <strong>igual</strong> en cada comando reconstruido.",

      rs_edu_h: "Salida educativa",
      rs_edu_p: "Cada comando ejecutado vuelve con un resumen en lenguaje llano y, en operaciones marcadas, una evaluación del riesgo — para construir competencia, no dependencia. Todas las interacciones quedan registradas localmente para auditoría.",
      rs_fig_out: "Resultado de una búsqueda: cada archivo con su ruta y tamaño, el conteo total y el registro de actividad.",

      rs_eval_h: "Evaluación automatizada · 250 tareas",
      rs_eval_p: "Los revisores preguntaron si el 89 % del artículo venía de verificación manual o automatizada. Construimos un <strong>arnés reproducible en Perl</strong> que pasa el dataset completo por el parser real. <strong>Es automatizado, y cualquiera puede repetirlo.</strong>",
      rs_th_cat: "Categoría (en alcance)",
      rs_th_match: "Concordancia de acción",
      rs_c_web: "Búsqueda web",
      rs_c_app: "Apertura de aplicaciones",
      rs_c_proc: "Control de procesos",
      rs_c_sys: "Información del sistema",
      rs_c_net: "Redes",
      rs_c_perm: "Permisos",
      rs_c_file: "Gestión de archivos",
      rs_c_proj: "Creación de proyectos",
      rs_c_total: "Total",
      rs_safe_h: "La seguridad aguantó",
      rs_safe_a: "28 operaciones que modifican el estado se materializaron.",
      rs_safe_b: "<strong>5/5</strong> operaciones destructivas (<code>delete</code>) pidieron confirmación.",
      rs_safe_c: "<strong>0 falsos negativos</strong> de seguridad.",
      rs_safe_d: "Peligros fuera de alcance (<code>reboot</code>, <code>pkill</code>) nunca se materializaron.",
      rs_weak_h: "Nuestro punto más débil",
      rs_weak_p: "<strong>Creación de proyectos: 45 %.</strong> El modelo alterna entre emitir una acción <code>create_project</code> de alto nivel o improvisar carpetas una por una. Es el mismo problema que hizo fallar la tarea T1 del estudio de usabilidad, y por eso el <strong>planificador de tareas</strong> es nuestra prioridad de trabajo futuro.",

      rs_cmp_h: "GPT-4o frente a DeepSeek: autonomía contra cautela",
      rs_cmp_p: "Las mismas 250 tareas, el mismo prompt, dos modelos. La diferencia no es calidad, es <strong>temperamento</strong>.",
      rs_th_metric: "Métrica (en alcance)",
      rs_m_match: "Concordancia de acción",
      rs_m_clar: "Recurre a <code>clarify</code>",
      rs_m_file: "Gestión de archivos",
      rs_m_perm: "Permisos",
      rs_m_web: "Búsqueda web / apps",
      rs_m_safe: "Falsos negativos de seguridad",
      rs_cmp_key: "Los modelos coinciden en la acción en el <strong>64.8 %</strong> (162/250) de las tareas. GPT-4o es <strong>sistemáticamente más cauteloso</strong>: cuando una ruta es implícita, pide aclaración en vez de asumir. Por eso la elección de modelo no es un número de precisión, sino una <strong>palanca de diseño</strong>: autonomía (DeepSeek) frente a cautela (GPT-4o). Se elige <em>para tus usuarios</em>.",

      rs_us_h: "Estudio de usabilidad · <em>n</em>=14",
      rs_us_p: "El estudio piloto del artículo tenía solo 3 participantes, y los revisores lo señalaron. Lo repetimos en serio: <strong>14 participantes novatos</strong> en el laboratorio de usabilidad de la UTM (USALAB), bajo consentimiento informado y métricas <strong>ISO 9241-11</strong>.",
      rs_us_d_h: "Diseño",
      rs_us_d_a: "<strong>Intra-sujeto</strong> para la modalidad: cada persona hizo las 3 tareas primero con la interfaz gráfica y luego por voz.",
      rs_us_d_b: "<strong>Entre-sujetos</strong> para el modelo: 7 con DeepSeek, 7 con GPT-4o.",
      rs_us_d_c: "El facilitador dice <em>qué</em> lograr, nunca <em>cómo</em>.",
      rs_us_t_h: "Tareas",
      rs_us_t_a: "<strong>T1</strong> — Crear un árbol de carpetas (6 materias).",
      rs_us_t_b: "<strong>T2</strong> — Encontrar un PDF y moverlo.",
      rs_us_t_c: "<strong>T3</strong> — Hacer una búsqueda web.",
      rs_vid_h: "Una sesión real",
      rs_vid_p: "Un fragmento de una sesión del estudio, tal como ocurrió. En el registro de actividad se ve el <strong>pipeline completo en texto</strong>: grabación, transcripción, comando generado, evaluación de riesgo y ejecución.",
      rs_vid_cap: "Fragmento <strong>anonimizado</strong>: la cámara del participante está cubierta y el audio eliminado, conforme al consentimiento informado que firmaron. Las sesiones completas no se publican. <em>(La aplicación aparece con su nombre de desarrollo, LIMA.)</em>",
      rs_eff_h: "Efectividad",
      rs_eff_p: "Con la interfaz gráfica todos completaron todo: <strong>100 %</strong> — esperable, todos saben usar una GUI. Por voz, en un <strong>primer contacto sin entrenamiento</strong>, BOTAS alcanzó un <strong>83.9 % promedio</strong> (T1 80.8 % · T2 78.6 % · T3 92.3 %), <strong>mejorando tarea tras tarea</strong>. Los fallos se concentraron donde cabía esperar: dictar seis nombres de carpeta de un tirón, o señalar un archivo concreto.",
      rs_fig_g4: "Completitud por tarea y modalidad. La brecha es real en T1 y se cierra hacia T3: la mejora con la familiaridad es la señal alentadora bajo los números.",
      rs_effi_h: "Eficiencia",
      rs_effi_p: "Aquí está el dato incómodo: la voz fue <strong>2.1–2.5× más lenta</strong> que la GUI en el primer contacto — latencia de procesamiento más la curva de aprendizaje de cómo formular una petición. La varianza fue alta: algunos usuarios lo lograron con una instrucción limpia, otros reformularon varias veces. Aun así, la velocidad <em>percibida</em> se quedó en un moderado <strong>3.6/5</strong>: no siempre vivieron esos segundos extra como un problema.",
      rs_fig_g3: "Tiempos por tarea, modalidad y condición. Las barras de error altas son la variabilidad individual — y son un objetivo de diseño: bajar latencia y ayudar a formular mejor.",
      rs_sat_h: "Satisfacción",
      rs_sat_p: "Y pese a ser más lento y no ser perfecto, la satisfacción fue alta: <strong>8.21/10</strong> general, con <strong>facilidad de aprendizaje 4.54/5</strong> (lo mejor valorado) y <strong>naturalidad 3.46/5</strong> (lo más débil). El <strong>85 % volvería a usar BOTAS</strong>. En la tarea repetitiva T1 la mayoría <em>prefirió la voz</em> aunque fuera más lenta: se valora la automatización desde el primer día. Ese perfil — alta capacidad de aprendizaje, naturalidad rezagada — es lo que la literatura reporta para <em>todos</em> los asistentes de voz, Alexa y Siri incluidos. Es el problema abierto del campo, no solo nuestro.",
      rs_g1: "Calificación por participante",
      rs_g2: "Promedios por condición",
      rs_g5: "Preferencia de interfaz",
      rs_g6: "Frustración por tarea",
      rs_g7: "Satisfacción por tarea",
      rs_g8: "Perfil UX por modelo",
      rs_g9: "Velocidad percibida",
      rs_gf1: "Calificación final",
      rs_gf2: "Facilidad de aprendizaje",
      rs_gf3: "Naturalidad",
      rs_gf4: "Accesibilidad",
      rs_gf5: "Satisfacción final",

      rs_distro_h: "Validación multi-distribución",
      rs_distro_p: "El artículo declaraba una limitación: aunque BOTAS <em>mapea</em> comandos a seis familias, las pruebas sistemáticas solo se habían hecho en Ubuntu. Corrimos el <strong>mismo instalador universal, sin modificar</strong>, en máquinas virtuales limpias de tres familias más.",
      rs_th_family: "Familia",
      rs_th_distro: "Distribución",
      rs_th_install: "Instalación",
      rs_th_app: "Aplicación",
      rs_th_wake: "Palabra clave",
      rs_distro_note: "* En Kali la aplicación quedó plenamente funcional; solo la descarga del modelo offline fue bloqueada por la red de pruebas. En <strong>Fedora 44</strong> el instalador corrió <strong>totalmente desatendido</strong> — traducción de gestor de paquetes, dependencias de Perl y la palabra de activación — con <strong>cero pasos manuales</strong>. Esto convierte «soporta 6 familias» de una <em>afirmación de diseño</em> en un <strong>resultado verificado empíricamente</strong>.",

      rs_lim_h: "Limitaciones honestas",
      rs_lim_a: "La voz es <strong>más lenta y menos robusta</strong> en el primer contacto que una interfaz gráfica.",
      rs_lim_b: "El orden fijo de modalidad (GUI primero, luego voz) puede introducir un <strong>efecto de arrastre</strong>.",
      rs_lim_c: "La muestra de 14 participantes es <strong>heterogénea y descriptiva</strong>, no tiene potencia estadística inferencial.",
      rs_lim_d: "La validación multi-distro cubre 4 familias; falta una <strong>batería completa de tareas por familia</strong>.",
      rs_lim_e: "La <strong>naturalidad</strong> (3.46/5) sigue siendo la dimensión más débil.",
      rs_lim_f: "La <strong>creación de proyectos</strong> (45 %) es la categoría más débil de la evaluación automatizada.",

      rs_fw_h: "Trabajo futuro",
      rs_fw1_h: "Planificador de tareas",
      rs_fw1_p: "Nuestra propia evaluación señala el problema: pedimos al modelo que resuelva una petición de varias partes en <em>una sola</em> acción JSON. La solución es arquitectónica — <strong>planificar primero, ejecutar paso a paso</strong>. El plan se <strong>muestra antes de ejecutar nada</strong>, cada paso pasa por el <strong>mismo validador determinista</strong>, y si un paso falla BOTAS pregunta y replanifica en lugar de morir a medias dejando un desastre.",
      rs_fw2_h: "Conversación continua",
      rs_fw2_p: "Hoy cada petición es <em>de un solo turno</em>: palabra clave → un comando → reposo. El estudio mostró el costo: quien necesitaba reformular tenía que decir «botas» otra vez. Lo siguiente es un diálogo que <strong>sigue abierto hasta que el usuario lo cierre</strong>. El punto de diseño clave: la <strong>salida siempre es explícita</strong> — una despedida hablada o un seguimiento rechazado. El asistente nunca decide por su cuenta seguir escuchando.",
      rs_fig_planner: "Planificador: una petición compuesta se descompone en una cola ordenada, el <strong>plan se muestra y el usuario lo aprueba</strong>, cada paso se ejecuta por turno y, si uno falla, BOTAS pregunta y replanifica en lugar de morir a medias.",
      rs_fig_loop: "Conversación continua: tras actuar, BOTAS pregunta «¿algo más?» y vuelve a escuchar <strong>sin necesidad de repetir la palabra clave</strong>. La salida es siempre explícita — un «botas, desestima» o un seguimiento rechazado.",
      rs_fw3: "Modelo local totalmente <strong>sin conexión</strong> (DeepSeek-R1 destilado).",
      rs_fw4: "Estudio de usabilidad <strong>contrabalanceado</strong> para eliminar el efecto de arrastre.",
      rs_fw5: "Tutorial de <strong>incorporación</strong> que enseñe a formular peticiones.",
      rs_foot: "¿Falta algo o quieres discutir la metodología? Escríbeme desde la pestaña <em>Descarga y contacto</em> — leo todo lo que llega.",

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
      about_portfolio: "If you'd like to see other projects I've worked on, feel free to visit my <a href=\"https://hudesde.github.io/Portfolio/\" target=\"_blank\" rel=\"noopener\">portfolio</a>.",
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

      /* ── Research tab ── */
      nav_research: "Research",
      rs_h1: "Research & evidence",
      rs_eyebrow: "Full transparency",
      rs_lead: "A 20-minute talk forces you to cut. <strong>Here is everything that didn't fit</strong>: the full diagrams, the methodology, the charts, the honest limitations and the <strong>downloadable raw data</strong> — including the numbers that don't flatter us.",

      rs_data_h: "Raw data & reports",
      rs_data_p: "Everything behind the figures below, exactly as the tools produced it. Unfiltered, unpolished.",
      rs_dl1: "Full usability report (<em>n</em>=14, ISO 9241-11)",
      rs_dl2: "Evaluation dataset — 250 tasks",
      rs_dl3: "Raw results — DeepSeek (250 tasks)",
      rs_dl4: "Raw results — GPT-4o (250 tasks)",

      rs_arch_h: "Full architecture",
      rs_arch_p: "Eight modular Perl components. A spoken request flows through four layers: local detector, TaskLearner, LLM parser and safety validator, before anything executes.",
      rs_fig_arch: "Overall architecture: the local detector intercepts ~30 % of requests; the rest flows down through the LLM, the validator and execution.",
      rs_fig_flow: "End-to-end command flow: voice → Vosk/Whisper → parser → safety validation → execution → spoken response.",
      rs_fig_attn: "Attention Mode: the wake word «botas» is detected <strong>offline</strong>. The cloud is contacted only <em>after</em> activation, during a 30 s window.",

      rs_tl_h: "TaskLearner: learning without giving up safety",
      rs_tl1_h: "How it learns",
      rs_tl1_a: "After a successful LLM call, it reverse-engineers a <strong>reusable template</strong> from the request.",
      rs_tl1_b: "It locates which words map to which parameter (a folder name, a search term), weighted by <strong>TF-IDF</strong>.",
      rs_tl1_c: "On a similar request it computes <strong>cosine similarity</strong>; above <strong>0.60</strong> it reconstructs the same JSON action — <strong>zero LLM calls</strong>.",
      rs_tl2_h: "Guardrails & control",
      rs_tl2_a: "A pattern that <strong>fails twice</strong> is quarantined: the request falls back to the LLM.",
      rs_tl2_b: "Near-duplicates (&gt;95 % similar) merely bump a counter; a 500-pattern ceiling with least-used eviction.",
      rs_tl2_c: "It only learns safe, templatable actions — never <code>clarify</code> or <code>answer</code>.",
      rs_tl2_d: "<strong>Off by default.</strong> You can pause it or permanently erase everything it learned.",
      rs_tl2_e: "The safety validator runs <strong>just the same</strong> on every reconstructed command.",

      rs_edu_h: "Educational output",
      rs_edu_p: "Every executed command comes back with a plain-language summary and, for flagged operations, a risk assessment — to build competence, not dependence. All interactions are logged locally for auditing.",
      rs_fig_out: "Output of a search request: each file with its full path and size, the total element count, and the activity log.",

      rs_eval_h: "Automated evaluation · 250 tasks",
      rs_eval_p: "Reviewers asked whether the paper's 89 % came from manual or automated verification. We built a <strong>reproducible Perl harness</strong> that runs the full dataset through the real parser. <strong>It is automated, and anyone can re-run it.</strong>",
      rs_th_cat: "Category (in scope)",
      rs_th_match: "Action match",
      rs_c_web: "Web search",
      rs_c_app: "App opening",
      rs_c_proc: "Process control",
      rs_c_sys: "System information",
      rs_c_net: "Networking",
      rs_c_perm: "Permissions",
      rs_c_file: "File management",
      rs_c_proj: "Project creation",
      rs_c_total: "Total",
      rs_safe_h: "Safety held up",
      rs_safe_a: "28 state-changing operations materialized.",
      rs_safe_b: "<strong>5/5</strong> destructive operations (<code>delete</code>) asked for confirmation.",
      rs_safe_c: "<strong>0 safety false negatives</strong>.",
      rs_safe_d: "Out-of-scope dangers (<code>reboot</code>, <code>pkill</code>) never materialized.",
      rs_weak_h: "Our weakest point",
      rs_weak_p: "<strong>Project creation: 45 %.</strong> The model alternates between emitting a high-level <code>create_project</code> action and improvising folders one by one. It is the same problem that made usability task T1 fail — which is why the <strong>task planner</strong> is our top future-work priority.",

      rs_cmp_h: "GPT-4o vs DeepSeek: autonomy against caution",
      rs_cmp_p: "The same 250 tasks, the same prompt, two models. The difference is not quality — it is <strong>temperament</strong>.",
      rs_th_metric: "Metric (in scope)",
      rs_m_match: "Action match",
      rs_m_clar: "Falls back to <code>clarify</code>",
      rs_m_file: "File management",
      rs_m_perm: "Permissions",
      rs_m_web: "Web search / apps",
      rs_m_safe: "Safety false negatives",
      rs_cmp_key: "The models agree on the action in <strong>64.8 %</strong> (162/250) of tasks. GPT-4o is <strong>systematically more cautious</strong>: when a path is implicit it asks to clarify instead of assuming. So model choice is not an accuracy number but a <strong>design lever</strong>: autonomy (DeepSeek) versus caution (GPT-4o). You pick it <em>for your users</em>.",

      rs_us_h: "Usability study · <em>n</em>=14",
      rs_us_p: "The paper's pilot had only 3 participants, and the reviewers said so. We redid it properly: <strong>14 novice participants</strong> at UTM's usability lab (USALAB), under informed consent, with <strong>ISO 9241-11</strong> metrics.",
      rs_us_d_h: "Design",
      rs_us_d_a: "<strong>Within-subject</strong> for modality: each person did the 3 tasks first with the graphical interface, then by voice.",
      rs_us_d_b: "<strong>Between-subjects</strong> for the model: 7 on DeepSeek, 7 on GPT-4o.",
      rs_us_d_c: "The facilitator states <em>what</em> to achieve, never <em>how</em>.",
      rs_us_t_h: "Tasks",
      rs_us_t_a: "<strong>T1</strong> — Create a folder tree (6 subjects).",
      rs_us_t_b: "<strong>T2</strong> — Find a PDF and move it.",
      rs_us_t_c: "<strong>T3</strong> — Run a web search.",
      rs_vid_h: "A real session",
      rs_vid_p: "An excerpt from a study session, exactly as it happened. The activity log shows the <strong>full pipeline in text</strong>: recording, transcription, generated command, risk assessment and execution.",
      rs_vid_cap: "<strong>Anonymised</strong> excerpt: the participant's camera is covered and the audio removed, in line with the informed consent they signed. Full sessions are not published. <em>(The application appears under its development name, LIMA.)</em>",
      rs_eff_h: "Effectiveness",
      rs_eff_p: "With the graphical interface everyone completed everything: <strong>100 %</strong> — expected, everyone knows GUIs. By voice, on a <strong>first, untrained encounter</strong>, BOTAS reached <strong>83.9 % on average</strong> (T1 80.8 % · T2 78.6 % · T3 92.3 %), <strong>improving task over task</strong>. Failures clustered exactly where you'd expect: dictating six folder names in one breath, or pinpointing one specific file.",
      rs_fig_g4: "Completion by task and modality. The gap is real on T1 and closes toward T3: improvement with familiarity is the encouraging signal underneath the numbers.",
      rs_effi_h: "Efficiency",
      rs_effi_p: "Here is the uncomfortable figure: voice was <strong>2.1–2.5× slower</strong> than the GUI on first contact — processing latency plus the learning curve of how to phrase a request. Variance was high: some users managed with one clean instruction, others reformulated several times. Even so, <em>perceived</em> speed stayed at a moderate <strong>3.6/5</strong>: they did not always experience those extra seconds as a problem.",
      rs_fig_g3: "Times by task, modality and condition. The tall error bars are individual variability — and they are a design target: cut latency, and help users phrase requests better.",
      rs_sat_h: "Satisfaction",
      rs_sat_p: "And despite being slower and less than perfect, satisfaction was high: <strong>8.21/10</strong> overall, with <strong>ease of learning 4.54/5</strong> (best rated) and <strong>naturalness 3.46/5</strong> (weakest). <strong>85 % would use BOTAS again</strong>. On the repetitive task T1 most users <em>preferred voice</em> even though it was slower: automation is valued from day one. That profile — high learnability, naturalness lagging — is what the literature reports for <em>every</em> voice assistant, Alexa and Siri included. It is the field's open problem, not just ours.",
      rs_g1: "Rating per participant",
      rs_g2: "Averages by condition",
      rs_g5: "Interface preference",
      rs_g6: "Frustration by task",
      rs_g7: "Satisfaction by task",
      rs_g8: "UX profile by model",
      rs_g9: "Perceived speed",
      rs_gf1: "Final rating",
      rs_gf2: "Ease of learning",
      rs_gf3: "Naturalness",
      rs_gf4: "Accessibility",
      rs_gf5: "Final satisfaction",

      rs_distro_h: "Multi-distribution validation",
      rs_distro_p: "The paper stated a limitation: although BOTAS <em>maps</em> commands to six families, systematic tests had only been run on Ubuntu. We ran the <strong>same universal installer, unchanged</strong>, on clean virtual machines of three more families.",
      rs_th_family: "Family",
      rs_th_distro: "Distribution",
      rs_th_install: "Install",
      rs_th_app: "App",
      rs_th_wake: "Wake word",
      rs_distro_note: "* On Kali the application was fully functional; only the offline model download was blocked by the test network. On <strong>Fedora 44</strong> the installer ran <strong>fully unattended</strong> — package-manager translation, Perl dependencies and the wake word — with <strong>zero manual steps</strong>. This turns «supports 6 families» from a <em>design claim</em> into an <strong>empirically verified result</strong>.",

      rs_lim_h: "Honest limitations",
      rs_lim_a: "Voice is <strong>slower and less robust</strong> on first contact than a graphical interface.",
      rs_lim_b: "The fixed modality order (GUI first, then voice) may introduce a <strong>carry-over effect</strong>.",
      rs_lim_c: "The 14-participant sample is <strong>heterogeneous and descriptive</strong>; it has no inferential statistical power.",
      rs_lim_d: "Cross-distro validation covers 4 families; a <strong>full task battery per family</strong> is still pending.",
      rs_lim_e: "<strong>Naturalness</strong> (3.46/5) remains the weakest dimension.",
      rs_lim_f: "<strong>Project creation</strong> (45 %) is the weakest category of the automated evaluation.",

      rs_fw_h: "Future work",
      rs_fw1_h: "Task planner",
      rs_fw1_p: "Our own evaluation points at the problem: we ask the model to solve a multi-part request in <em>one</em> JSON action. The fix is architectural — <strong>plan first, then execute step by step</strong>. The plan is <strong>shown before anything runs</strong>, every step passes the <strong>same deterministic validator</strong>, and if a step fails BOTAS asks and re-plans instead of dying half-way and leaving a mess.",
      rs_fw2_h: "Continuous conversation",
      rs_fw2_p: "Today every request is <em>one-shot</em>: wake word → one command → standby. The study showed the cost: anyone who needed to rephrase had to say «botas» again. Next is a dialogue that <strong>stays open until the user closes it</strong>. The key design point: the <strong>exit is always explicit</strong> — a spoken dismissal or a declined follow-up. The assistant never decides on its own to keep listening.",
      rs_fig_planner: "Planner: a composite request is decomposed into an ordered queue, the <strong>plan is shown and the user approves it</strong>, each step runs in turn and, if one fails, BOTAS asks and re-plans instead of dying half-way.",
      rs_fig_loop: "Continuous conversation: after acting, BOTAS asks «anything else?» and loops back to listening <strong>with no wake word needed</strong>. The exit is always explicit — a spoken «botas, desestima» or a declined follow-up.",
      rs_fw3: "Fully <strong>offline</strong> local model (distilled DeepSeek-R1).",
      rs_fw4: "<strong>Counter-balanced</strong> usability study to remove the carry-over effect.",
      rs_fw5: "<strong>Onboarding</strong> tutorial that teaches how to phrase requests.",
      rs_foot: "Something missing, or want to discuss the methodology? Write to me from the <em>Download & contact</em> tab — I read everything that arrives.",

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
      about_portfolio: "Se quiser ver outros projetos em que trabalhei, você pode visitar o meu <a href=\"https://hudesde.github.io/Portfolio/\" target=\"_blank\" rel=\"noopener\">portfólio</a>.",
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

      /* ── Aba Pesquisa ── */
      nav_research: "Pesquisa",
      rs_h1: "Pesquisa e evidências",
      rs_eyebrow: "Transparência total",
      rs_lead: "Uma palestra de 20 minutos obriga a cortar. <strong>Aqui está tudo o que não coube</strong>: os diagramas completos, a metodologia, os gráficos, as limitações honestas e os <strong>dados brutos para download</strong> — incluindo os números que não nos favorecem.",

      rs_data_h: "Dados brutos e relatórios",
      rs_data_p: "Tudo o que sustenta os números abaixo, exatamente como saiu das ferramentas. Sem filtro nem maquiagem.",
      rs_dl1: "Relatório completo de usabilidade (<em>n</em>=14, ISO 9241-11)",
      rs_dl2: "Conjunto de dados de avaliação — 250 tarefas",
      rs_dl3: "Resultados brutos — DeepSeek (250 tarefas)",
      rs_dl4: "Resultados brutos — GPT-4o (250 tarefas)",

      rs_arch_h: "Arquitetura completa",
      rs_arch_p: "Oito componentes modulares em Perl. Um pedido falado atravessa quatro camadas: detector local, TaskLearner, parser LLM e validador de segurança antes de executar.",
      rs_fig_arch: "Arquitetura geral: o detector local intercepta ~30 % dos pedidos; o resto desce pelo LLM, pelo validador e pela execução.",
      rs_fig_flow: "Fluxo de um comando de ponta a ponta: voz → Vosk/Whisper → parser → validação de segurança → execução → resposta falada.",
      rs_fig_attn: "Modo Atenção: a palavra «botas» é detectada <strong>offline</strong>. A nuvem só é contactada <em>depois</em> da ativação, durante uma janela de 30 s.",

      rs_tl_h: "TaskLearner: aprender sem abrir mão da segurança",
      rs_tl1_h: "Como aprende",
      rs_tl1_a: "Após uma chamada bem-sucedida ao LLM, deduz um <strong>modelo reutilizável</strong> do pedido.",
      rs_tl1_b: "Localiza quais palavras correspondem a qual parâmetro (um nome de pasta, um termo de busca), ponderando com <strong>TF-IDF</strong>.",
      rs_tl1_c: "Num pedido parecido calcula a <strong>similaridade de cosseno</strong>; acima de <strong>0.60</strong> reconstrói a mesma ação JSON — <strong>zero chamadas ao LLM</strong>.",
      rs_tl2_h: "Salvaguardas e controlo",
      rs_tl2_a: "Um padrão que <strong>falha duas vezes</strong> fica em quarentena: o pedido volta ao LLM.",
      rs_tl2_b: "Quase duplicados (&gt;95 % de similaridade) apenas incrementam um contador; teto de 500 padrões com remoção do menos usado.",
      rs_tl2_c: "Só aprende ações seguras e modeláveis — nunca <code>clarify</code> nem <code>answer</code>.",
      rs_tl2_d: "<strong>Desativado por omissão.</strong> Pode pausá-lo ou apagar permanentemente o que foi aprendido.",
      rs_tl2_e: "O validador de segurança corre <strong>igualmente</strong> em cada comando reconstruído.",

      rs_edu_h: "Saída educativa",
      rs_edu_p: "Cada comando executado volta com um resumo em linguagem simples e, em operações sinalizadas, uma avaliação do risco — para construir competência, não dependência. Todas as interações ficam registadas localmente para auditoria.",
      rs_fig_out: "Resultado de uma busca: cada ficheiro com o seu caminho e tamanho, a contagem total e o registo de atividade.",

      rs_eval_h: "Avaliação automatizada · 250 tarefas",
      rs_eval_p: "Os revisores perguntaram se os 89 % do artigo vinham de verificação manual ou automatizada. Construímos um <strong>arnês reprodutível em Perl</strong> que passa o conjunto completo pelo parser real. <strong>É automatizado, e qualquer pessoa pode repeti-lo.</strong>",
      rs_th_cat: "Categoria (no âmbito)",
      rs_th_match: "Concordância de ação",
      rs_c_web: "Busca na web",
      rs_c_app: "Abertura de aplicações",
      rs_c_proc: "Controlo de processos",
      rs_c_sys: "Informação do sistema",
      rs_c_net: "Redes",
      rs_c_perm: "Permissões",
      rs_c_file: "Gestão de ficheiros",
      rs_c_proj: "Criação de projetos",
      rs_c_total: "Total",
      rs_safe_h: "A segurança aguentou",
      rs_safe_a: "28 operações que alteram o estado materializaram-se.",
      rs_safe_b: "<strong>5/5</strong> operações destrutivas (<code>delete</code>) pediram confirmação.",
      rs_safe_c: "<strong>0 falsos negativos</strong> de segurança.",
      rs_safe_d: "Perigos fora do âmbito (<code>reboot</code>, <code>pkill</code>) nunca se materializaram.",
      rs_weak_h: "O nosso ponto mais fraco",
      rs_weak_p: "<strong>Criação de projetos: 45 %.</strong> O modelo alterna entre emitir uma ação <code>create_project</code> de alto nível ou improvisar pastas uma a uma. É o mesmo problema que fez falhar a tarefa T1 do estudo de usabilidade, e por isso o <strong>planeador de tarefas</strong> é a nossa prioridade de trabalho futuro.",

      rs_cmp_h: "GPT-4o contra DeepSeek: autonomia versus cautela",
      rs_cmp_p: "As mesmas 250 tarefas, o mesmo prompt, dois modelos. A diferença não é qualidade, é <strong>temperamento</strong>.",
      rs_th_metric: "Métrica (no âmbito)",
      rs_m_match: "Concordância de ação",
      rs_m_clar: "Recorre a <code>clarify</code>",
      rs_m_file: "Gestão de ficheiros",
      rs_m_perm: "Permissões",
      rs_m_web: "Busca na web / apps",
      rs_m_safe: "Falsos negativos de segurança",
      rs_cmp_key: "Os modelos concordam na ação em <strong>64.8 %</strong> (162/250) das tarefas. O GPT-4o é <strong>sistematicamente mais cauteloso</strong>: quando um caminho é implícito, pede esclarecimento em vez de assumir. Por isso a escolha do modelo não é um número de precisão, mas uma <strong>alavanca de design</strong>: autonomia (DeepSeek) contra cautela (GPT-4o). Escolhe-se <em>para os teus utilizadores</em>.",

      rs_us_h: "Estudo de usabilidade · <em>n</em>=14",
      rs_us_p: "O estudo piloto do artigo tinha apenas 3 participantes, e os revisores apontaram isso. Repetimo-lo a sério: <strong>14 participantes novatos</strong> no laboratório de usabilidade da UTM (USALAB), sob consentimento informado e métricas <strong>ISO 9241-11</strong>.",
      rs_us_d_h: "Desenho",
      rs_us_d_a: "<strong>Intra-sujeito</strong> para a modalidade: cada pessoa fez as 3 tarefas primeiro com a interface gráfica e depois por voz.",
      rs_us_d_b: "<strong>Entre-sujeitos</strong> para o modelo: 7 com DeepSeek, 7 com GPT-4o.",
      rs_us_d_c: "O facilitador diz <em>o quê</em> alcançar, nunca <em>como</em>.",
      rs_us_t_h: "Tarefas",
      rs_us_t_a: "<strong>T1</strong> — Criar uma árvore de pastas (6 disciplinas).",
      rs_us_t_b: "<strong>T2</strong> — Encontrar um PDF e movê-lo.",
      rs_us_t_c: "<strong>T3</strong> — Fazer uma busca na web.",
      rs_vid_h: "Uma sessão real",
      rs_vid_p: "Um excerto de uma sessão do estudo, tal como aconteceu. No registo de atividade vê-se o <strong>pipeline completo em texto</strong>: gravação, transcrição, comando gerado, avaliação de risco e execução.",
      rs_vid_cap: "Excerto <strong>anonimizado</strong>: a câmara do participante está tapada e o áudio removido, em conformidade com o consentimento informado que assinaram. As sessões completas não são publicadas. <em>(A aplicação aparece com o seu nome de desenvolvimento, LIMA.)</em>",
      rs_eff_h: "Eficácia",
      rs_eff_p: "Com a interface gráfica todos completaram tudo: <strong>100 %</strong> — esperado, todos sabem usar uma GUI. Por voz, num <strong>primeiro contacto sem treino</strong>, o BOTAS alcançou <strong>83.9 % em média</strong> (T1 80.8 % · T2 78.6 % · T3 92.3 %), <strong>melhorando tarefa após tarefa</strong>. As falhas concentraram-se onde era de esperar: ditar seis nomes de pasta de uma só vez, ou apontar um ficheiro concreto.",
      rs_fig_g4: "Conclusão por tarefa e modalidade. A diferença é real na T1 e fecha-se até à T3: a melhoria com a familiaridade é o sinal encorajador por baixo dos números.",
      rs_effi_h: "Eficiência",
      rs_effi_p: "Aqui está o dado incómodo: a voz foi <strong>2.1–2.5× mais lenta</strong> que a GUI no primeiro contacto — latência de processamento mais a curva de aprendizagem de como formular um pedido. A variância foi alta: alguns conseguiram com uma instrução limpa, outros reformularam várias vezes. Ainda assim, a velocidade <em>percebida</em> ficou num moderado <strong>3.6/5</strong>: nem sempre viveram esses segundos extra como um problema.",
      rs_fig_g3: "Tempos por tarefa, modalidade e condição. As barras de erro altas são a variabilidade individual — e são um alvo de design: baixar a latência e ajudar a formular melhor.",
      rs_sat_h: "Satisfação",
      rs_sat_p: "E apesar de mais lento e não perfeito, a satisfação foi alta: <strong>8.21/10</strong> geral, com <strong>facilidade de aprendizagem 4.54/5</strong> (o melhor avaliado) e <strong>naturalidade 3.46/5</strong> (o mais fraco). <strong>85 % voltariam a usar o BOTAS</strong>. Na tarefa repetitiva T1 a maioria <em>preferiu a voz</em> mesmo sendo mais lenta: valoriza-se a automação desde o primeiro dia. Esse perfil — alta capacidade de aprendizagem, naturalidade atrasada — é o que a literatura reporta para <em>todos</em> os assistentes de voz, Alexa e Siri incluídos. É o problema em aberto do campo, não só nosso.",
      rs_g1: "Classificação por participante",
      rs_g2: "Médias por condição",
      rs_g5: "Preferência de interface",
      rs_g6: "Frustração por tarefa",
      rs_g7: "Satisfação por tarefa",
      rs_g8: "Perfil UX por modelo",
      rs_g9: "Velocidade percebida",
      rs_gf1: "Classificação final",
      rs_gf2: "Facilidade de aprendizagem",
      rs_gf3: "Naturalidade",
      rs_gf4: "Acessibilidade",
      rs_gf5: "Satisfação final",

      rs_distro_h: "Validação multi-distribuição",
      rs_distro_p: "O artigo declarava uma limitação: embora o BOTAS <em>mapeie</em> comandos para seis famílias, os testes sistemáticos só tinham sido feitos no Ubuntu. Corremos o <strong>mesmo instalador universal, sem alterações</strong>, em máquinas virtuais limpas de mais três famílias.",
      rs_th_family: "Família",
      rs_th_distro: "Distribuição",
      rs_th_install: "Instalação",
      rs_th_app: "Aplicação",
      rs_th_wake: "Palavra-chave",
      rs_distro_note: "* No Kali a aplicação ficou plenamente funcional; apenas a descarga do modelo offline foi bloqueada pela rede de testes. No <strong>Fedora 44</strong> o instalador correu <strong>totalmente autónomo</strong> — tradução do gestor de pacotes, dependências de Perl e a palavra de ativação — com <strong>zero passos manuais</strong>. Isto transforma «suporta 6 famílias» de uma <em>afirmação de design</em> num <strong>resultado verificado empiricamente</strong>.",

      rs_lim_h: "Limitações honestas",
      rs_lim_a: "A voz é <strong>mais lenta e menos robusta</strong> no primeiro contacto do que uma interface gráfica.",
      rs_lim_b: "A ordem fixa de modalidade (GUI primeiro, depois voz) pode introduzir um <strong>efeito de arrastamento</strong>.",
      rs_lim_c: "A amostra de 14 participantes é <strong>heterogénea e descritiva</strong>, não tem potência estatística inferencial.",
      rs_lim_d: "A validação multi-distro cobre 4 famílias; falta uma <strong>bateria completa de tarefas por família</strong>.",
      rs_lim_e: "A <strong>naturalidade</strong> (3.46/5) continua a ser a dimensão mais fraca.",
      rs_lim_f: "A <strong>criação de projetos</strong> (45 %) é a categoria mais fraca da avaliação automatizada.",

      rs_fw_h: "Trabalho futuro",
      rs_fw1_h: "Planeador de tarefas",
      rs_fw1_p: "A nossa própria avaliação aponta o problema: pedimos ao modelo que resolva um pedido de várias partes numa <em>única</em> ação JSON. A solução é arquitetural — <strong>planear primeiro, executar passo a passo</strong>. O plano é <strong>mostrado antes de executar seja o que for</strong>, cada passo passa pelo <strong>mesmo validador determinista</strong>, e se um passo falhar o BOTAS pergunta e replaneia em vez de morrer a meio deixando uma desarrumação.",
      rs_fw2_h: "Conversa contínua",
      rs_fw2_p: "Hoje cada pedido é <em>de um só turno</em>: palavra-chave → um comando → repouso. O estudo mostrou o custo: quem precisava de reformular tinha de dizer «botas» outra vez. A seguir vem um diálogo que <strong>fica aberto até o utilizador o fechar</strong>. O ponto de design fundamental: a <strong>saída é sempre explícita</strong> — uma despedida falada ou um seguimento recusado. O assistente nunca decide por si continuar a ouvir.",
      rs_fig_planner: "Planeador: um pedido composto é decomposto numa fila ordenada, o <strong>plano é mostrado e o utilizador aprova-o</strong>, cada passo executa por sua vez e, se um falhar, o BOTAS pergunta e replaneia em vez de morrer a meio.",
      rs_fig_loop: "Conversa contínua: depois de agir, o BOTAS pergunta «mais alguma coisa?» e volta a ouvir <strong>sem precisar da palavra-chave</strong>. A saída é sempre explícita — um «botas, desestima» ou um seguimento recusado.",
      rs_fw3: "Modelo local totalmente <strong>sem ligação</strong> (DeepSeek-R1 destilado).",
      rs_fw4: "Estudo de usabilidade <strong>contrabalançado</strong> para eliminar o efeito de arrastamento.",
      rs_fw5: "Tutorial de <strong>integração</strong> que ensine a formular pedidos.",
      rs_foot: "Falta alguma coisa ou quer discutir a metodologia? Escreva-me a partir da aba <em>Descarga e contacto</em> — leio tudo o que chega.",

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
