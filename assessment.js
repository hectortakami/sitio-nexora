/* ============================================================
   Nexora — Evaluación (Assessment) + Reporte de Inteligencia
   Flujo de 5 pasos que genera un dashboard de resultados.
   No necesitas editar este archivo.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.CONFIG || {};
  function L() { return localStorage.getItem("nexora_lang") || "es"; }
  function waLink(msg) {
    var n = (CFG.whatsapp || "").replace(/[^\d]/g, "");
    return "https://wa.me/" + n + (msg ? "?text=" + encodeURIComponent(msg) : "");
  }
  var BRAND = CFG.brand || "Nexora";

  /* ---------- i18n ---------- */
  var T = {
    es: {
      introEyebrow: "Evaluación gratis",
      introTitle: "Descubre el potencial de tu negocio",
      introLead: "En menos de 3 minutos, Nexora analiza tu negocio y te entrega:",
      g1: "Business Health Score", g2: "Riesgos prioritarios", g3: "Oportunidades de crecimiento",
      g4: "Roadmap personalizado", g5: "Recomendaciones de IA", g6: "Benchmark de industria",
      introCta: "Iniciar evaluación",
      stTitle: "Descubre el potencial de tu negocio",
      sCompany: "Tamaño", sIndustry: "Industria", sRevenue: "Ingresos", sGoals: "Objetivos", sChallenges: "Retos",
      qCompany: "Tamaño de la empresa", qCompanyH: "Selecciona el tamaño de tu organización.",
      qIndustry: "Industria principal", qIndustryH: "¿Qué sector describe mejor tu operación?",
      qRevenue: "Ingresos anuales", qRevenueH: "Nos ayuda a calcular el ROI potencial.",
      qGoals: "Objetivos de negocio", qGoalsH: "Selecciona hasta 3 prioridades para los próximos 12 meses.",
      qChallenges: "Principales retos", qChallengesH: "Selecciona hasta 3 obstáculos que frenan tu crecimiento.",
      selectPh: "Selecciona…",
      back: "Atrás", next: "Continuar", analyze: "Analizar resultados",
      pick: "Selecciona una opción para continuar.", pickMax: "Puedes elegir hasta 3.",
      processing: "Procesando modelos de datos", processingSub: "Comparando contra estándares de la industria…",
      reportBadge: "Análisis completo", retake: "Repetir evaluación",
      reportTitle: "Tu Reporte de Inteligencia",
      reportSubA: "Con base en tu perfil en la industria de ", reportSubB: ", estos son tus insights estratégicos.",
      healthScore: "Health Score", aiReadiness: "Preparación para IA", criticalRisks: "Riesgos críticos", growthPotential: "Potencial de crecimiento",
      gpHigh: "Alto", gpMed: "Medio", gpLow: "Bajo",
      vulnTitle: "Vulnerabilidades clave", oppTitle: "Oportunidades de crecimiento",
      radarTitle: "Radar de capacidades", radarYou: "Tu puntuación", radarAvg: "Promedio de industria",
      actionTitle: "Plan de acción", advisor: "Asesor", explore: "Explorar", consult: "Consultar", startProject: "Iniciar proyecto",
      ctaTitle: "Convierte los insights en acción",
      ctaSub: "Conéctate con nuestros asesores IA especializados para ejecutar tu roadmap.",
      bookDemo: "Agendar demo", viewPlans: "Ver planes",
      riskHigh: "Riesgo alto", riskMed: "Riesgo medio", riskLow: "Riesgo bajo",
      quickwin: "Quick Win", m3_6: "3–6 meses", m6_12: "6–12 meses",
      waMsg: "Hola " + BRAND + ", completé la evaluación y quiero hablar sobre mis resultados."
    },
    en: {
      introEyebrow: "Free assessment",
      introTitle: "Discover your business potential",
      introLead: "In under 3 minutes, Nexora analyzes your business and delivers:",
      g1: "Business Health Score", g2: "Priority risks", g3: "Growth opportunities",
      g4: "Personalized roadmap", g5: "AI recommendations", g6: "Industry benchmark",
      introCta: "Start assessment",
      stTitle: "Discover your business potential",
      sCompany: "Size", sIndustry: "Industry", sRevenue: "Revenue", sGoals: "Goals", sChallenges: "Challenges",
      qCompany: "Company size", qCompanyH: "Select your organization size.",
      qIndustry: "Primary industry", qIndustryH: "Which sector best describes your operation?",
      qRevenue: "Annual revenue", qRevenueH: "Helps us calculate potential ROI.",
      qGoals: "Business goals", qGoalsH: "Select up to 3 priorities for the next 12 months.",
      qChallenges: "Main challenges", qChallengesH: "Select up to 3 hurdles slowing your growth.",
      selectPh: "Select…",
      back: "Back", next: "Continue", analyze: "Analyze results",
      pick: "Select an option to continue.", pickMax: "You can pick up to 3.",
      processing: "Processing data models", processingSub: "Benchmarking against industry standards…",
      reportBadge: "Analysis complete", retake: "Retake assessment",
      reportTitle: "Your Intelligence Report",
      reportSubA: "Based on your profile in the ", reportSubB: " industry, here are your strategic insights.",
      healthScore: "Health Score", aiReadiness: "AI Readiness", criticalRisks: "Critical risks", growthPotential: "Growth potential",
      gpHigh: "High", gpMed: "Medium", gpLow: "Low",
      vulnTitle: "Key vulnerabilities", oppTitle: "Growth opportunities",
      radarTitle: "Capability radar", radarYou: "Your score", radarAvg: "Industry average",
      actionTitle: "Action plan", advisor: "Advisor", explore: "Explore", consult: "Consult", startProject: "Start project",
      ctaTitle: "Turn insights into action",
      ctaSub: "Connect with our specialized AI advisors to execute your roadmap.",
      bookDemo: "Book demo", viewPlans: "View plans",
      riskHigh: "High risk", riskMed: "Medium risk", riskLow: "Low risk",
      quickwin: "Quick Win", m3_6: "3–6 months", m6_12: "6–12 months",
      waMsg: "Hi " + BRAND + ", I completed the assessment and want to talk about my results."
    }
  };
  function t(k) { var d = T[L()] || {}; return (k in d) ? d[k] : (T.es[k] || k); }

  /* ---------- Data ---------- */
  var SIZES = [
    { id: "startup", es: "Startup", en: "Startup" },
    { id: "small", es: "Pequeña", en: "Small" },
    { id: "medium", es: "Mediana", en: "Medium" },
    { id: "large", es: "Grande", en: "Large" },
    { id: "enterprise", es: "Empresa", en: "Enterprise" }
  ];
  var INDUSTRIES = [
    { id: "technology", es: "Tecnología", en: "Technology", avg: [62, 60, 58, 64, 56] },
    { id: "finance", es: "Finanzas", en: "Finance", avg: [64, 62, 56, 60, 50] },
    { id: "retail", es: "Retail", en: "Retail", avg: [56, 60, 64, 52, 48] },
    { id: "manufacturing", es: "Manufactura", en: "Manufacturing", avg: [58, 66, 50, 50, 52] },
    { id: "healthcare", es: "Salud", en: "Healthcare", avg: [60, 58, 60, 56, 46] },
    { id: "education", es: "Educación", en: "Education", avg: [54, 54, 58, 50, 44] },
    { id: "services", es: "Servicios", en: "Services", avg: [58, 58, 62, 52, 50] },
    { id: "other", es: "Otra", en: "Other", avg: [56, 57, 58, 53, 48] }
  ];
  var REVENUES = [
    { id: "r1", es: "< $100K", en: "< $100K" }, { id: "r2", es: "$100K–$500K", en: "$100K–$500K" },
    { id: "r3", es: "$500K–$2M", en: "$500K–$2M" }, { id: "r4", es: "$2M–$10M", en: "$2M–$10M" },
    { id: "r5", es: "$10M–$50M", en: "$10M–$50M" }, { id: "r6", es: "$50M+", en: "$50M+" }
  ];
  var GOALS = [
    { id: "revenue_growth", es: "Crecimiento de ingresos", en: "Revenue growth" },
    { id: "market_expansion", es: "Expansión de mercado", en: "Market expansion" },
    { id: "cost_reduction", es: "Reducción de costos", en: "Cost reduction" },
    { id: "digital_transformation", es: "Transformación digital", en: "Digital transformation" },
    { id: "customer_experience", es: "Experiencia del cliente", en: "Customer experience" },
    { id: "product_innovation", es: "Innovación de producto", en: "Product innovation" },
    { id: "operational_efficiency", es: "Eficiencia operativa", en: "Operational efficiency" },
    { id: "risk_management", es: "Gestión de riesgos", en: "Risk management" }
  ];
  var CHALLENGES = [
    { id: "limited_budget", es: "Presupuesto limitado", en: "Limited budget" },
    { id: "talent_shortage", es: "Escasez de talento", en: "Talent shortage" },
    { id: "legacy_systems", es: "Sistemas heredados", en: "Legacy systems" },
    { id: "data_management", es: "Gestión de datos", en: "Data management" },
    { id: "cybersecurity", es: "Ciberseguridad", en: "Cybersecurity" },
    { id: "market_competition", es: "Competencia de mercado", en: "Market competition" },
    { id: "regulatory_compliance", es: "Cumplimiento regulatorio", en: "Regulatory compliance" },
    { id: "customer_retention", es: "Retención de clientes", en: "Customer retention" }
  ];
  // challenge -> vulnerability
  var VULN = {
    cybersecurity: { lvl: 3, es: ["Riesgo de brecha de datos", "Infraestructura desactualizada expone amenazas de seguridad."], en: ["Data breach vulnerability", "Outdated infrastructure poses significant security threats."], consult: { es: "Consultar Ciberseguridad", en: "Consult Cybersecurity" } },
    regulatory_compliance: { lvl: 3, es: ["Incumplimiento regulatorio", "Cambios en los estándares requieren atención inmediata."], en: ["Regulatory non-compliance", "Changing industry standards require immediate attention."], consult: { es: "Consultar Legal & Riesgo", en: "Consult Legal & Risk" } },
    legacy_systems: { lvl: 3, es: ["Riesgo de sistemas heredados", "La tecnología obsoleta limita la escalabilidad."], en: ["Legacy system risk", "Obsolete technology limits scalability."], consult: { es: "Consultar Tecnología", en: "Consult Technology" } },
    data_management: { lvl: 2, es: ["Datos fragmentados", "Fuentes de datos dispersas dificultan decidir con confianza."], en: ["Fragmented data", "Scattered data sources make confident decisions hard."], consult: { es: "Consultar Datos", en: "Consult Data Analytics" } },
    talent_shortage: { lvl: 2, es: ["Fuga de talento", "Dificultad para retener al mejor talento limita el crecimiento."], en: ["Talent attrition", "Difficulty retaining top performers limits growth potential."], consult: { es: "Consultar RH & Operaciones", en: "Consult HR & Operations" } },
    limited_budget: { lvl: 2, es: ["Restricción de presupuesto", "Recursos limitados frenan iniciativas de alto impacto."], en: ["Budget constraints", "Limited resources slow high-impact initiatives."], consult: { es: "Consultar Finanzas", en: "Consult Finance" } },
    market_competition: { lvl: 2, es: ["Presión competitiva", "La competencia gana terreno en segmentos clave."], en: ["Competitive pressure", "Competitors are gaining ground in key segments."], consult: { es: "Consultar Estrategia", en: "Consult Strategy" } },
    customer_retention: { lvl: 2, es: ["Pérdida de clientes", "La falta de personalización lleva clientes a la competencia."], en: ["Customer churn", "Lack of personalization is driving customers to competitors."], consult: { es: "Consultar Marketing", en: "Consult Marketing" } }
  };
  // goal -> opportunity
  var OPP = {
    cost_reduction: { metric: { es: "-25% costos TI", en: "-25% IT costs" }, advisor: { es: "Tecnología", en: "Technology" }, es: ["Modernización de infraestructura cloud", "Migra sistemas core a arquitecturas escalables en la nube."], en: ["Cloud infrastructure modernization", "Migrate core systems to scalable cloud architectures."] },
    customer_experience: { metric: { es: "+20% LTV", en: "+20% LTV" }, advisor: { es: "Datos", en: "Data Analytics" }, es: ["Analítica predictiva de clientes", "Anticipa necesidades con modelado de datos predictivo."], en: ["Predictive customer analytics", "Anticipate customer needs using predictive data modeling."] },
    operational_efficiency: { metric: { es: "+30% eficiencia", en: "+30% efficiency" }, advisor: { es: "Estrategia IA", en: "AI Strategy" }, es: ["Automatización de procesos con IA", "Despliega modelos de IA para automatizar tareas rutinarias."], en: ["AI-driven process automation", "Deploy machine learning models to automate routine tasks."] },
    revenue_growth: { metric: { es: "+18% ingresos", en: "+18% revenue" }, advisor: { es: "Crecimiento", en: "Growth" }, es: ["Motor de optimización de ingresos", "Identifica y prioriza palancas de ingreso de alto retorno."], en: ["Revenue optimization engine", "Identify and prioritize high-return revenue levers."] },
    market_expansion: { metric: { es: "+3 segmentos", en: "+3 segments" }, advisor: { es: "Estrategia", en: "Strategy" }, es: ["Plan de expansión de mercado", "Detecta nuevos segmentos y rutas de entrada con menor riesgo."], en: ["Market expansion playbook", "Detect new segments and lower-risk entry routes."] },
    digital_transformation: { metric: { es: "2x velocidad", en: "2x speed" }, advisor: { es: "Estrategia IA", en: "AI Strategy" }, es: ["Roadmap de transformación digital", "Prioriza iniciativas digitales por impacto y esfuerzo."], en: ["Digital transformation roadmap", "Prioritize digital initiatives by impact and effort."] },
    product_innovation: { metric: { es: "+15% NPS", en: "+15% NPS" }, advisor: { es: "Producto", en: "Product" }, es: ["Laboratorio de innovación de producto", "Valida ideas más rápido con datos de uso reales."], en: ["Product innovation lab", "Validate ideas faster with real usage data."] },
    risk_management: { metric: { es: "Riesgo mitigado", en: "Risk mitigated" }, advisor: { es: "Gestión de riesgos", en: "Risk Management" }, es: ["Monitoreo de cumplimiento automatizado", "Vigila y asegura cumplimiento regulatorio continuo con IA."], en: ["Automated compliance tracking", "Use AI to monitor continuous regulatory compliance."] }
  };
  // action plan pool: trigger -> action
  var ACTIONS = [
    { trig: "cybersecurity", effort: "quickwin", es: ["Auditoría de seguridad", "Identifica y corrige vulnerabilidades críticas."], en: ["Conduct security audit", "Identify and patch immediate vulnerabilities in core systems."] },
    { trig: "customer_retention", effort: "m3_6", es: ["Modelo predictivo de churn", "Usa datos históricos para detectar cuentas en riesgo."], en: ["Develop predictive churn model", "Use historical data to identify at-risk accounts before they cancel."] },
    { trig: "data_management", effort: "m6_12", es: ["Consolidación de datos", "Centraliza fuentes dispersas en una sola fuente de verdad."], en: ["Data warehouse consolidation", "Centralize fragmented data sources into a single source of truth."] },
    { trig: "cost_reduction", effort: "quickwin", es: ["Optimizar gasto en la nube", "Revisa y ajusta el tamaño de tu infraestructura cloud."], en: ["Optimize cloud spending", "Review and right-size current cloud infrastructure allocations."] },
    { trig: "customer_experience", effort: "m3_6", es: ["IA conversacional de soporte", "Despliega agentes IA para atender consultas de nivel 1."], en: ["Implement conversational AI for support", "Deploy AI agents to handle tier 1 customer inquiries."] },
    { trig: "regulatory_compliance", effort: "m3_6", es: ["Automatizar cumplimiento", "Implementa monitoreo continuo de normativas."], en: ["Automate compliance tracking", "Implement continuous regulatory monitoring."] },
    { trig: "talent_shortage", effort: "m3_6", es: ["Programa de retención de talento", "Diseña incentivos y rutas de crecimiento por rol."], en: ["Launch talent retention program", "Design incentives and growth paths per role."] },
    { trig: "operational_efficiency", effort: "m3_6", es: ["Automatización de procesos", "Automatiza flujos repetitivos con IA."], en: ["Deploy process automation", "Automate repetitive workflows with AI."] },
    { trig: "legacy_systems", effort: "m6_12", es: ["Modernización de sistemas", "Migra sistemas críticos a arquitecturas modernas."], en: ["Modernize core systems", "Migrate critical systems to modern architectures."] }
  ];

  /* ---------- State ---------- */
  var st = { view: "intro", step: 0, size: "", industry: "", revenue: "", goals: [], challenges: [], result: null };
  var STEPS = ["company", "industry", "revenue", "goals", "challenges"];

  function clamp(n, a, b) { return Math.max(a, Math.min(b, Math.round(n))); }
  function lbl(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i][L()]; return id; }

  /* ---------- Compute ---------- */
  function compute() {
    var g = st.goals, c = st.challenges;
    var has = function (a, x) { return a.indexOf(x) >= 0; };
    var sizeIdx = 0; SIZES.forEach(function (s, i) { if (s.id === st.size) sizeIdx = i; });
    var ind = INDUSTRIES.filter(function (x) { return x.id === st.industry; })[0] || INDUSTRIES[7];

    var axes = {
      strategy: 55 + (has(g, "market_expansion") ? 12 : 0) + (has(g, "revenue_growth") ? 8 : 0) - (has(c, "market_competition") ? 12 : 0),
      operations: 58 + (has(g, "operational_efficiency") ? 14 : 0) - (has(c, "legacy_systems") ? 12 : 0) - (has(c, "limited_budget") ? 6 : 0),
      customer: 60 + (has(g, "customer_experience") ? 14 : 0) - (has(c, "customer_retention") ? 14 : 0),
      data: 52 + (has(g, "digital_transformation") ? 10 : 0) + (has(g, "risk_management") ? 6 : 0) - (has(c, "data_management") ? 14 : 0),
      automation: 48 + (has(g, "digital_transformation") ? 12 : 0) + (has(g, "operational_efficiency") ? 8 : 0) - (has(c, "legacy_systems") ? 8 : 0)
    };
    var youArr = [];
    for (var k in axes) { axes[k] = clamp(axes[k] + sizeIdx * 2, 28, 94); youArr.push(axes[k]); }

    var health = clamp((axes.strategy + axes.operations + axes.customer + axes.data + axes.automation) / 5, 32, 92);
    var aiReady = clamp(40 + axes.automation * 0.3 + axes.data * 0.2 + (has(g, "digital_transformation") ? 10 : 0), 22, 96);

    // vulnerabilities
    var vulns = [];
    (c.length ? c : ["cybersecurity", "data_management"]).forEach(function (id) {
      if (VULN[id]) vulns.push({ id: id, v: VULN[id] });
    });
    vulns.sort(function (a, b) { return b.v.lvl - a.v.lvl; });
    vulns = vulns.slice(0, 3);

    // opportunities
    var opps = [];
    (g.length ? g : ["cost_reduction", "operational_efficiency", "customer_experience"]).forEach(function (id) {
      if (OPP[id]) opps.push({ id: id, o: OPP[id] });
    });
    opps = opps.slice(0, 3);

    // action plan
    var picked = [], usedTrig = {};
    ACTIONS.forEach(function (a) {
      if ((has(g, a.trig) || has(c, a.trig)) && !usedTrig[a.trig]) { picked.push(a); usedTrig[a.trig] = 1; }
    });
    ACTIONS.forEach(function (a) { if (picked.length < 4 && picked.indexOf(a) < 0) picked.push(a); });
    picked = picked.slice(0, 5);

    var gp = (has(g, "revenue_growth") || has(g, "market_expansion")) && health >= 50 ? "High"
      : (g.length >= 2 ? "Medium" : "Low");

    st.result = {
      health: health, aiReady: aiReady, risks: vulns.length, gp: gp,
      you: youArr, avg: ind.avg, indLabel: ind[L()],
      vulns: vulns, opps: opps, actions: picked
    };
  }

  /* ---------- SVG bits ---------- */
  function gaugeSVG(score) {
    var r = 70, cx = 90, cy = 92, len = Math.PI * r;
    var off = len * (1 - score / 100);
    var col = score < 50 ? "hsl(38 92% 50%)" : (score < 70 ? "hsl(214 82% 55%)" : "hsl(142 71% 45%)");
    return '<svg viewBox="0 0 180 110" class="gauge">' +
      '<path d="M20 92 A70 70 0 0 1 160 92" fill="none" stroke="hsl(220 20% 88%)" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M20 92 A70 70 0 0 1 160 92" fill="none" stroke="' + col + '" stroke-width="14" stroke-linecap="round" stroke-dasharray="' + len + '" stroke-dashoffset="' + off + '"/>' +
      '<text x="90" y="86" text-anchor="middle" class="gauge-num" fill="' + col + '">' + score + "</text>" +
      "</svg>";
  }
  function radarSVG(you, avg) {
    var cx = 140, cy = 132, R = 96, n = 5, out = "";
    function pt(val, i) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / n, rr = val / 100 * R;
      return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
    }
    // grid rings
    [0.25, 0.5, 0.75, 1].forEach(function (f) {
      var p = []; for (var i = 0; i < n; i++) { var q = pt(f * 100, i); p.push(q[0].toFixed(1) + "," + q[1].toFixed(1)); }
      out += '<polygon points="' + p.join(" ") + '" fill="none" stroke="hsl(220 20% 88%)" stroke-width="1"/>';
    });
    // axes
    var labels = L() === "es" ? ["Estrategia", "Operaciones", "Cliente", "Datos", "Automatización"] : ["Strategy", "Operations", "Customer", "Data", "Automation"];
    for (var i = 0; i < n; i++) {
      var e = pt(100, i);
      out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" stroke="hsl(220 20% 88%)" stroke-width="1"/>';
      var lp = pt(122, i);
      var anchor = Math.abs(lp[0] - cx) < 8 ? "middle" : (lp[0] > cx ? "start" : "end");
      out += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + 3).toFixed(1) + '" text-anchor="' + anchor + '" class="radar-lbl">' + labels[i] + "</text>";
    }
    function poly(vals, fill, stroke) {
      var p = []; for (var i = 0; i < n; i++) { var q = pt(vals[i], i); p.push(q[0].toFixed(1) + "," + q[1].toFixed(1)); }
      return '<polygon points="' + p.join(" ") + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>';
    }
    out += poly(avg, "hsl(214 82% 55% / .12)", "hsl(214 82% 55% / .5)");
    out += poly(you, "hsl(214 68% 14% / .18)", "hsl(214 68% 14%)");
    return '<svg viewBox="-32 -6 344 262" class="radar">' + out + "</svg>";
  }

  /* ---------- Renderers ---------- */
  var ICONS = {
    company: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><path d="M5 21V7l8-4v18M19 21V11l-6-4"/></svg>',
    industry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    revenue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    goals: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    challenges: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    backArrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>'
  };

  function renderIntro() {
    var gl = ["g1", "g2", "g3", "g4", "g5", "g6"].map(function (g) {
      return '<li>' + ICONS.check + "<span>" + t(g) + "</span></li>";
    }).join("");
    return '<div class="asmt-intro">' +
      '<span class="eyebrow eyebrow-light">' + t("introEyebrow") + "</span>" +
      "<h2>" + t("introTitle") + "</h2>" +
      '<p class="asmt-intro-lead">' + t("introLead") + "</p>" +
      '<ul class="asmt-goals">' + gl + "</ul>" +
      '<button class="btn btn-accent btn-lg" data-act="start">' + t("introCta") + ICONS.arrow + "</button>" +
      "</div>";
  }

  function stepper() {
    var cur = st.step;
    return '<div class="asmt-stepper">' + STEPS.map(function (s, i) {
      var cls = i < cur ? "done" : (i === cur ? "active" : "");
      return '<div class="asmt-st ' + cls + '"><div class="asmt-st-ic">' + ICONS[s] + "</div><span>" + t("s" + s.charAt(0).toUpperCase() + s.slice(1)) + "</span></div>" +
        (i < STEPS.length - 1 ? '<div class="asmt-st-line ' + (i < cur ? "done" : "") + '"></div>' : "");
    }).join("") + "</div>";
  }

  function optionList(arr, selectedIds, multi) {
    return '<div class="asmt-opts">' + arr.map(function (o) {
      var sel = multi ? (selectedIds.indexOf(o.id) >= 0) : (selectedIds === o.id);
      return '<button class="asmt-opt' + (sel ? " sel" : "") + '" data-act="' + (multi ? "multi" : "single") + '" data-id="' + o.id + '">' +
        '<span class="asmt-radio">' + (multi ? ICONS.check : "") + "</span><span>" + o[L()] + "</span></button>";
    }).join("") + "</div>";
  }

  function renderWizard() {
    var step = STEPS[st.step], body = "", title = "", hint = "", canNext = false;
    if (step === "company") { title = t("qCompany"); hint = t("qCompanyH"); body = optionList(SIZES, st.size, false); canNext = !!st.size; }
    else if (step === "industry") {
      title = t("qIndustry"); hint = t("qIndustryH");
      body = '<select class="asmt-select" data-act="industry"><option value="">' + t("selectPh") + "</option>" +
        INDUSTRIES.map(function (o) { return '<option value="' + o.id + '"' + (st.industry === o.id ? " selected" : "") + ">" + o[L()] + "</option>"; }).join("") + "</select>";
      canNext = !!st.industry;
    }
    else if (step === "revenue") { title = t("qRevenue"); hint = t("qRevenueH"); body = optionList(REVENUES, st.revenue, false); canNext = !!st.revenue; }
    else if (step === "goals") { title = t("qGoals"); hint = t("qGoalsH"); body = optionList(GOALS, st.goals, true); canNext = st.goals.length > 0; }
    else if (step === "challenges") { title = t("qChallenges"); hint = t("qChallengesH"); body = optionList(CHALLENGES, st.challenges, true); canNext = st.challenges.length > 0; }

    var last = st.step === STEPS.length - 1;
    var nav = '<div class="asmt-nav">' +
      (st.step > 0 ? '<button class="qback" data-act="back">' + ICONS.backArrow + "<span>" + t("back") + "</span></button>" : "<span></span>") +
      '<button class="btn btn-accent" data-act="' + (last ? "analyze" : "fwd") + '"' + (canNext ? "" : " disabled") + ">" +
      (last ? t("analyze") : t("next")) + (last ? "" : ICONS.arrow) + "</button></div>";

    return '<div class="asmt-wizard">' +
      '<h2 class="asmt-wtitle">' + t("stTitle") + "</h2>" + stepper() +
      '<div class="asmt-q"><div class="asmt-qlabel">' + title + '</div><div class="asmt-qhint">' + hint + "</div>" + body + "</div>" +
      nav + "</div>";
  }

  function renderProcessing() {
    return '<div class="asmt-processing"><div class="asmt-spinner"></div><h3>' + t("processing") + "</h3><p>" + t("processingSub") + "</p></div>";
  }

  function renderReport() {
    var r = st.result, lvlName = { 3: t("riskHigh"), 2: t("riskMed"), 1: t("riskLow") }, lvlCls = { 3: "high", 2: "med", 1: "low" };
    var stats =
      '<div class="rp-stats">' +
      '<div class="rp-stat rp-gauge-card"><div class="rp-stat-k">' + t("healthScore") + "</div>" + gaugeSVG(r.health) + "</div>" +
      '<div class="rp-stat"><div class="rp-ic" style="background:hsl(214 82% 55% / .12);color:hsl(214 82% 55%)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><div class="rp-big">' + r.aiReady + '<span>/100</span></div><div class="rp-stat-lbl">' + t("aiReadiness") + "</div></div>" +
      '<div class="rp-stat"><div class="rp-ic" style="background:hsl(0 84% 60% / .12);color:hsl(0 84% 60%)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg></div><div class="rp-big rp-danger">' + r.risks + '</div><div class="rp-stat-lbl">' + t("criticalRisks") + "</div></div>" +
      '<div class="rp-stat"><div class="rp-ic" style="background:hsl(142 71% 45% / .12);color:hsl(142 71% 45%)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div><div class="rp-big rp-ok">' + t("gp" + r.gp) + '</div><div class="rp-stat-lbl">' + t("growthPotential") + "</div></div>" +
      "</div>";

    var vulns = '<div class="rp-col"><h3 class="rp-h rp-h-danger">' + t("vulnTitle") + "</h3>" +
      r.vulns.map(function (x) {
        var v = x.v;
        return '<div class="rp-vuln ' + lvlCls[v.lvl] + '"><div class="rp-vuln-top"><span class="rp-vuln-title">' + v[L()][0] + '</span><span class="rp-chip ' + lvlCls[v.lvl] + '">' + lvlName[v.lvl] + '</span></div>' +
          '<p>' + v[L()][1] + '</p><a class="rp-consult" data-act="wa" data-msg="' + encodeURIComponent(v.consult[L()]) + '">' + v.consult[L()] + " →</a></div>";
      }).join("") + "</div>";

    var opps = '<div class="rp-col"><h3 class="rp-h rp-h-ok">' + t("oppTitle") + "</h3>" +
      r.opps.map(function (x) {
        var o = x.o;
        return '<div class="rp-opp"><div class="rp-opp-head"><span class="rp-opp-title">' + o[L()][0] + '</span><span class="rp-chip ok">' + o.metric[L()] + '</span></div>' +
          '<p>' + o[L()][1] + '</p><div class="rp-opp-foot"><span class="rp-advisor">' + t("advisor") + ": " + o.advisor[L()] + '</span><button class="btn btn-accent rp-explore" data-act="wa" data-msg="' + encodeURIComponent(o[L()][0]) + '">' + t("explore") + "</button></div></div>";
      }).join("") + "</div>";

    var radar = '<div class="rp-card"><h3 class="rp-h">' + t("radarTitle") + "</h3>" + radarSVG(r.you, r.avg) +
      '<div class="rp-legend"><span><i class="dot-you"></i>' + t("radarYou") + '</span><span><i class="dot-avg"></i>' + t("radarAvg") + "</span></div></div>";

    var action = '<div class="rp-card"><h3 class="rp-h">' + t("actionTitle") + '</h3><div class="rp-actions">' +
      r.actions.map(function (a) {
        return '<div class="rp-action"><div class="rp-action-main"><span class="rp-action-title">' + a[L()][0] + '<span class="rp-effort ' + a.effort + '">' + t(a.effort) + '</span></span><p>' + a[L()][1] + '</p></div>' +
          '<button class="btn btn-ghost rp-start" data-act="wa" data-msg="' + encodeURIComponent(a[L()][0]) + '">' + t("startProject") + "</button></div>";
      }).join("") + "</div></div>";

    var cta = '<div class="rp-cta"><h3>' + t("ctaTitle") + '</h3><p>' + t("ctaSub") + '</p><div class="rp-cta-btns">' +
      '<button class="btn btn-accent" data-act="wa" data-msg="' + encodeURIComponent(t("waMsg")) + '">' + t("bookDemo") + "</button>" +
      '<button class="btn btn-outline-light" data-act="plans">' + t("viewPlans") + "</button></div></div>";

    return '<div class="asmt-report">' +
      '<div class="rp-head"><span class="rp-badge">' + t("reportBadge") + '</span>' +
      '<button class="rp-retake" data-act="retake">' + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' + t("retake") + "</button></div>" +
      '<h2 class="rp-title">' + t("reportTitle") + '</h2>' +
      '<p class="rp-sub">' + t("reportSubA") + "<strong>" + r.indLabel + "</strong>" + t("reportSubB") + "</p>" +
      stats +
      '<div class="rp-grid2">' + vulns + opps + "</div>" +
      '<div class="rp-grid2">' + radar + action + "</div>" +
      cta + "</div>";
  }

  function render() {
    var card = document.getElementById("asmtCard");
    if (!card) return;
    card.classList.remove("is-report", "is-wizard", "is-intro");
    if (st.view === "intro") { card.classList.add("is-intro"); card.innerHTML = renderIntro(); }
    else if (st.view === "wizard") { card.classList.add("is-wizard"); card.innerHTML = renderWizard(); }
    else if (st.view === "processing") { card.classList.add("is-wizard"); card.innerHTML = renderProcessing(); }
    else if (st.view === "report") { card.classList.add("is-report"); card.innerHTML = renderReport(); }
  }

  /* ---------- Events ---------- */
  function onClick(e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var act = b.getAttribute("data-act");
    if (act === "start") { st.view = "wizard"; st.step = 0; render(); }
    else if (act === "single") { var step = STEPS[st.step]; var id = b.getAttribute("data-id"); if (step === "company") st.size = id; else if (step === "revenue") st.revenue = id; render(); }
    else if (act === "multi") {
      var id2 = b.getAttribute("data-id"); var step2 = STEPS[st.step];
      var arr = step2 === "goals" ? st.goals : st.challenges;
      var i = arr.indexOf(id2);
      if (i >= 0) arr.splice(i, 1); else { if (arr.length >= 3) { return; } arr.push(id2); }
      render();
    }
    else if (act === "back") { if (st.step > 0) st.step--; render(); }
    else if (act === "fwd") { if (st.step < STEPS.length - 1) st.step++; render(); }
    else if (act === "analyze") {
      st.view = "processing"; render();
      setTimeout(function () { compute(); st.view = "report"; render(); var sec = document.getElementById("assessment"); if (sec) window.scrollTo({ top: sec.offsetTop - 60, behavior: "smooth" }); }, 1400);
    }
    else if (act === "retake") { st = { view: "wizard", step: 0, size: "", industry: "", revenue: "", goals: [], challenges: [], result: null }; render(); }
    else if (act === "plans") { var p = document.getElementById("pricing"); if (p) window.scrollTo({ top: p.offsetTop - 60, behavior: "smooth" }); }
    else if (act === "wa") { var msg = decodeURIComponent(b.getAttribute("data-msg") || ""); window.open(waLink(msg), "_blank", "noopener"); }
  }
  function onChange(e) {
    var s = e.target.closest('[data-act="industry"]');
    if (s) { st.industry = s.value; render(); }
  }

  function init() {
    var card = document.getElementById("asmtCard");
    if (!card) return;
    card.addEventListener("click", onClick);
    card.addEventListener("change", onChange);
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  window.addEventListener("nexora:lang", function () { if (document.getElementById("asmtCard")) render(); });
})();
