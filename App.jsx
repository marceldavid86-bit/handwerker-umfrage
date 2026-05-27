import { useState } from "react";

const C = {
  bg: "#faf7f2",
  surface: "#ffffff",
  card: "#fff9f0",
  border: "#e8ddd0",
  accent: "#e85d00",
  accentLight: "#fff0e8",
  accentDark: "#b84800",
  text: "#1a1208",
  muted: "#8a7a6a",
  success: "#2d7a3a",
  successLight: "#edf7ee",
  ink: "#2c1810",
};

const questions = [
  {
    id: "beruf",
    question: "Was ist dein Handwerk?",
    type: "single",
    icon: "🔧",
    options: ["Elektriker", "Installateur / Sanitär", "Schlosser / Metallbau", "Tischler / Zimmerer", "Maler / Lackierer", "Kfz-Mechaniker", "Anderes Handwerk"],
  },
  {
    id: "groesste_probleme",
    question: "Was kostet dich am meisten Zeit & Nerven?",
    subtitle: "Mehrere Antworten möglich",
    type: "multi",
    icon: "😤",
    options: [
      "📋 Papierkram & Dokumentation",
      "📞 Angebote & Auftragsabwicklung",
      "💸 Rechnungsstellung & Zahlungsabwicklung",
      "📦 Materialeinkauf & Lagerhaltung",
      "👷 Mitarbeiterplanung & Urlaubsverwaltung",
      "🗓️ Terminplanung & Kundenkommunikation",
      "📐 Aufmaß & Kalkulation",
      "🔍 Mängelmanagement & Gewährleistung",
    ],
  },
  {
    id: "digital",
    question: "Wie digital arbeitest du heute?",
    type: "single",
    icon: "💻",
    options: [
      "Alles auf Papier / Excel",
      "Einzelne Apps, aber kein System",
      "Handwerker-Software (z.B. MeinBüro, Billomat)",
      "Komplett digital & gut organisiert",
    ],
  },
  {
    id: "groesster_schmerz",
    question: "Was ist dein #1 Problem das du SOFORT lösen würdest?",
    subtitle: "Nur eine Antwort – sei ehrlich!",
    type: "single",
    icon: "🎯",
    options: [
      "Angebote dauern zu lange",
      "Rechnungen werden zu spät bezahlt",
      "Ich verliere den Überblick über Aufträge",
      "Materialbestellung ist chaotisch",
      "Kundenkommunikation frisst zu viel Zeit",
      "Dokumentation für Gewährleistung fehlt",
    ],
  },
  {
    id: "zahlen",
    question: "Was würdest du monatlich für eine echte Lösung zahlen?",
    type: "single",
    icon: "💶",
    options: [
      "Nichts – muss kostenlos sein",
      "Bis €29 / Monat",
      "Bis €59 / Monat",
      "Bis €99 / Monat",
      "Mehr, wenn es wirklich hilft",
    ],
  },
  {
    id: "kontakt",
    question: "Darf ich dich bei Ergebnissen kontaktieren?",
    subtitle: "Optional – für early access",
    type: "input",
    icon: "✉️",
    placeholder: "deine@email.de (freiwillig)",
  },
];

const resultInsights = {
  "📋 Papierkram & Dokumentation": "Automatische Dokumentengenerierung",
  "📞 Angebote & Auftragsabwicklung": "Angebote in unter 5 Minuten erstellen",
  "💸 Rechnungsstellung & Zahlungsabwicklung": "Automatische Zahlungserinnerungen",
  "📦 Materialeinkauf & Lagerhaltung": "Intelligente Bestellvorschläge",
  "👷 Mitarbeiterplanung & Urlaubsverwaltung": "Digitale Einsatzplanung",
  "🗓️ Terminplanung & Kundenkommunikation": "Automatische Terminbestätigung per WhatsApp",
  "📐 Aufmaß & Kalkulation": "KI-gestützte Kalkulation",
  "🔍 Mängelmanagement & Gewährleistung": "Digitale Mängeldokumentation mit Fotos",
};

// Simulated community data
const communityData = {
  "📋 Papierkram & Dokumentation": 78,
  "📞 Angebote & Auftragsabwicklung": 65,
  "💸 Rechnungsstellung & Zahlungsabwicklung": 71,
  "📦 Materialeinkauf & Lagerhaltung": 44,
  "👷 Mitarbeiterplanung & Urlaubsverwaltung": 38,
  "🗓️ Terminplanung & Kundenkommunikation": 59,
  "📐 Aufmaß & Kalkulation": 52,
  "🔍 Mängelmanagement & Gewährleistung": 31,
};

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.muted, letterSpacing: 1, fontWeight: 700 }}>
          FRAGE {current} VON {total}
        </span>
        <span style={{ fontSize: 11, color: C.accent, fontWeight: 900 }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, background: C.accent,
          borderRadius: 2, transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

function ResultScreen({ answers }) {
  const problems = answers["groesste_probleme"] || [];
  const topProblem = answers["groesster_schmerz"];
  const budget = answers["zahlen"];
  const beruf = answers["beruf"];

  const sortedCommunity = Object.entries(communityData).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 48px" }}>
      {/* Header */}
      <div style={{
        background: C.accent, borderRadius: 12, padding: "32px 28px", marginBottom: 24,
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.08,
          transform: "rotate(-15deg)", pointerEvents: "none",
        }}>🔧</div>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
        <h2 style={{ color: "#fff", margin: "0 0 8px", fontSize: 24, fontFamily: "'Georgia', serif", fontWeight: 900 }}>
          Danke, {beruf || "Meister"}!
        </h2>
        <p style={{ color: "#ffe8d6", margin: 0, fontSize: 15 }}>
          Deine Antworten helfen dabei, das perfekte Tool zu bauen.
        </p>
      </div>

      {/* Your top problem */}
      {topProblem && (
        <div style={{
          background: C.accentLight, border: `2px solid ${C.accent}`,
          borderRadius: 10, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 900, letterSpacing: 2, marginBottom: 8 }}>DEIN #1 PROBLEM</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{topProblem}</div>
          <div style={{ marginTop: 10, fontSize: 13, color: C.muted }}>
            → Lösung: <strong style={{ color: C.accent }}>{resultInsights[topProblem] || "Maßgeschneiderte Automatisierung"}</strong>
          </div>
        </div>
      )}

      {/* Community comparison */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 900, letterSpacing: 2, marginBottom: 16 }}>
          SO ANTWORTEN ANDERE HANDWERKER
        </div>
        {sortedCommunity.map(([label, pct]) => {
          const isYours = problems.includes(label);
          return (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: isYours ? C.accent : C.text, fontWeight: isYours ? 900 : 400 }}>
                  {label} {isYours ? "← du" : ""}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: isYours ? C.accent : C.muted }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${pct}%`,
                  background: isYours ? C.accent : C.border,
                  borderRadius: 3, transition: "width 0.6s ease",
                  backgroundImage: isYours ? "none" : `repeating-linear-gradient(90deg, ${C.muted}44 0px, ${C.muted}44 4px, transparent 4px, transparent 8px)`,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget insight */}
      {budget && (
        <div style={{
          background: C.successLight, border: `1px solid #b8ddbf`,
          borderRadius: 10, padding: "16px 24px", marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: C.success, fontWeight: 900, letterSpacing: 2, marginBottom: 6 }}>DEIN BUDGET-SIGNAL</div>
          <div style={{ fontSize: 15, color: C.ink }}>
            Du würdest <strong>{budget}</strong> investieren –
            {budget.includes("Nichts") ? " das ist ein wichtiges Signal für eine Freemium-Strategie." :
              budget.includes("Mehr") ? " das zeigt echten Leidensdruck. Sehr wertvolles Feedback!" :
                " absolut im Rahmen für ein professionelles Tool."}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{
        background: C.ink, borderRadius: 10, padding: "28px 24px", textAlign: "center",
      }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>🚀</div>
        <h3 style={{ color: "#fff", margin: "0 0 8px", fontSize: 18, fontFamily: "'Georgia', serif" }}>
          Ergebnisse teilen & verbreiten
        </h3>
        <p style={{ color: "#b8a898", margin: "0 0 20px", fontSize: 14 }}>
          Je mehr Handwerker mitmachen, desto besser die Auswertung!
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {["WhatsApp teilen", "Link kopieren"].map(label => (
            <button key={label} style={{
              background: label.includes("WhatsApp") ? "#25d366" : C.surface,
              color: label.includes("WhatsApp") ? "#fff" : C.ink,
              border: "none", padding: "10px 22px", borderRadius: 6, cursor: "pointer",
              fontWeight: 900, fontSize: 13, letterSpacing: 0.5,
            }}
              onClick={() => alert(`Demo: "${label}" – in der echten App funktioniert das!`)}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0); // 0 = intro
  const [answers, setAnswers] = useState({});
  const [inputVal, setInputVal] = useState("");
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);
  const [hovered, setHovered] = useState(null);

  const q = questions[step - 1];
  const isIntro = step === 0;
  const isLast = step === questions.length;

  const handleNext = () => {
    if (q) {
      const val = q.type === "input" ? inputVal : q.type === "multi" ? selected : selected[0];
      if (q.type !== "input" && !val && selected.length === 0 && !q.subtitle?.includes("Optional")) return;
      setAnswers(prev => ({ ...prev, [q.id]: val || selected[0] || "" }));
    }
    setSelected([]);
    setInputVal("");
    if (isLast) { setDone(true); return; }
    setStep(s => s + 1);
  };

  const toggleOption = (opt) => {
    if (q.type === "single") {
      setSelected([opt]);
    } else {
      setSelected(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
    }
  };

  const canNext = q?.type === "input"
    ? true
    : q?.type === "multi"
      ? selected.length > 0
      : selected.length > 0;

  if (done) return (
    <div style={{ fontFamily: "'Georgia', serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🔧</span>
        <span style={{ fontWeight: 900, fontSize: 16, color: C.ink, letterSpacing: 1 }}>HANDWERKER-UMFRAGE</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: C.success, fontWeight: 700 }}>✓ Abgeschlossen</span>
      </div>
      <ResultScreen answers={answers} />
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🔧</span>
        <span style={{ fontWeight: 900, fontSize: 16, color: C.ink, letterSpacing: 1 }}>HANDWERKER-UMFRAGE 2026</span>
        {step > 0 && (
          <button onClick={() => { setStep(s => s - 1); setSelected([]); }} style={{
            marginLeft: "auto", background: "none", border: "none", color: C.muted,
            cursor: "pointer", fontSize: 13, fontFamily: "inherit",
          }}>← Zurück</button>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>

          {/* INTRO */}
          {isIntro && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80, height: 80, background: C.accentLight, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", fontSize: 36, border: `2px solid ${C.accent}`,
              }}>🔨</div>
              <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: C.ink, margin: "0 0 16px", lineHeight: 1.2 }}>
                Was nervt dich<br />als Handwerker<br />am meisten?
              </h1>
              <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, margin: "0 auto 32px", maxWidth: 420 }}>
                5 kurze Fragen · 2 Minuten · Anonyme Auswertung.<br />
                Dein Feedback hilft dabei, ein Tool zu bauen das <strong style={{ color: C.accent }}>wirklich</strong> hilft.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
                {["🏗️ Anonym", "⚡ 2 Minuten", "🎁 Ergebnis sofort"].map(tag => (
                  <span key={tag} style={{
                    background: C.accentLight, color: C.accent, border: `1px solid ${C.border}`,
                    borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700,
                  }}>{tag}</span>
                ))}
              </div>
              <button onClick={() => setStep(1)} style={{
                background: C.accent, color: "#fff", border: "none",
                padding: "16px 48px", borderRadius: 8, cursor: "pointer",
                fontFamily: "inherit", fontSize: 16, fontWeight: 900, letterSpacing: 0.5,
                boxShadow: `0 8px 24px ${C.accent}44`,
                transition: "transform 0.15s",
              }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              >
                Jetzt starten →
              </button>
              <div style={{ marginTop: 16, fontSize: 12, color: C.muted }}>
                Bereits 247 Handwerker haben teilgenommen
              </div>
            </div>
          )}

          {/* QUESTION */}
          {!isIntro && q && (
            <div>
              <ProgressBar current={step} total={questions.length} />

              <div style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: "28px 24px", marginTop: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{q.icon}</div>
                <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: C.ink, margin: "0 0 4px", lineHeight: 1.3 }}>
                  {q.question}
                </h2>
                {q.subtitle && (
                  <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>{q.subtitle}</p>
                )}
                {!q.subtitle && <div style={{ marginBottom: 20 }} />}

                {/* Options */}
                {q.type !== "input" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {q.options.map(opt => {
                      const isSelected = selected.includes(opt);
                      return (
                        <button key={opt} onClick={() => toggleOption(opt)}
                          onMouseEnter={() => setHovered(opt)}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            background: isSelected ? C.accentLight : hovered === opt ? C.card : C.bg,
                            border: `2px solid ${isSelected ? C.accent : C.border}`,
                            borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                            fontFamily: "inherit", fontSize: 14, fontWeight: isSelected ? 700 : 400,
                            color: isSelected ? C.accent : C.ink, textAlign: "left",
                            transition: "all 0.15s", display: "flex", alignItems: "center", gap: 10,
                          }}>
                          <span style={{
                            width: 20, height: 20, borderRadius: q.type === "multi" ? 4 : "50%",
                            border: `2px solid ${isSelected ? C.accent : C.border}`,
                            background: isSelected ? C.accent : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, fontSize: 11, color: "#fff",
                          }}>{isSelected ? "✓" : ""}</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Input */}
                {q.type === "input" && (
                  <input
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder={q.placeholder}
                    style={{
                      width: "100%", padding: "14px 16px", borderRadius: 8,
                      border: `2px solid ${C.border}`, background: C.bg,
                      fontFamily: "inherit", fontSize: 15, color: C.ink,
                      boxSizing: "border-box", outline: "none",
                    }}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                )}

                <button
                  onClick={handleNext}
                  disabled={q.type !== "input" && !canNext}
                  style={{
                    marginTop: 20, width: "100%", background: canNext || q.type === "input" ? C.accent : C.border,
                    color: canNext || q.type === "input" ? "#fff" : C.muted,
                    border: "none", padding: "14px", borderRadius: 8, cursor: canNext || q.type === "input" ? "pointer" : "not-allowed",
                    fontFamily: "inherit", fontSize: 15, fontWeight: 900, letterSpacing: 0.5,
                    transition: "all 0.2s",
                  }}>
                  {isLast ? "Auswertung anzeigen 🎯" : "Weiter →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
