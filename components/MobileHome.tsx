"use client";

import { useState } from "react";

const navItems = [
  { icon: "🤍", label: "לקוחות", id: "clients" },
  { icon: "⭐", label: "תוצאות", id: "results" },
  { icon: "🌿", label: "שירותים", id: "services" },
  { icon: "👤", label: "מי אני", id: "me" },
];

const sections: Record<string, { title: string; content: string }> = {
  clients: { title: "הלקוחות שלי", content: "עסקים קטנים ובינוניים שרוצים נוכחות דיגיטלית מקצועית שמייצרת לקוחות אמיתיים." },
  results: { title: "התוצאות שלנו", content: "עסקים שעבדתי איתם הכפילו את הלידים שלהם תוך 3 חודשים עם תוכן מדויק ועקבי." },
  services: { title: "השירותים שלי", content: "עיצוב תוכן, ניהול רשתות חברתיות, בניית מותג ואסטרטגיית תוכן – הכל במקום אחד." },
  me: { title: "מי אני", content: "מומחית תוכן ועיצוב עם ניסיון של 7 שנים בבניית מותגים דיגיטליים מנצחים." },
};

export default function MobileHome() {
  const [active, setActive] = useState("clients");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#f5f0f7", fontFamily: "'Segoe UI','Arial Hebrew',Arial,sans-serif" }}>
      <style>{`
        .nav-btn { transition: all 0.2s; }
        .nav-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .card-hover { transition: all 0.2s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 10px 28px #b89cc835 !important; }
        .list-row { transition: all 0.2s; }
        .list-row:hover { transform: translateX(-4px); box-shadow: 0 6px 24px #b89cc830 !important; }
        .tool-btn { transition: all 0.15s; }
        .tool-btn:hover { filter: brightness(0.92); transform: scale(1.05); }
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .desktop-only { display: flex !important; }
          .main-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          .main-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#f5f0f7", borderBottom: "1px solid #d8c8e8" }}>

        {/* Desktop header */}
        <div className="desktop-only" style={{ alignItems: "center", justifyContent: "space-between", padding: "14px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <span style={{ color: "#7a5c9a", fontWeight: 800, fontSize: 22 }}>✦ michal studio</span>
          <nav style={{ display: "flex", gap: 10 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="nav-btn"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 20px", borderRadius: 999, fontSize: 14,
                  fontWeight: 600, cursor: "pointer", border: "none",
                  background: active === item.id ? "#b89cc8" : "#ede6f2",
                  color: active === item.id ? "#fff" : "#4a3860",
                  boxShadow: active === item.id ? "0 4px 14px #c8aede55" : "none",
                  transform: active === item.id ? "translateY(-1px)" : "none",
                }}
              >
                <span>{item.icon}</span><span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="tool-btn" onClick={() => setViewMode("grid")} style={{ width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer", background: viewMode === "grid" ? "#b89cc8" : "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GridIcon color={viewMode === "grid" ? "#fff" : "#7a5c9a"} />
            </button>
            <button className="tool-btn" onClick={() => setViewMode("list")} style={{ width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer", background: viewMode === "list" ? "#b89cc8" : "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ListIcon color={viewMode === "list" ? "#fff" : "#7a5c9a"} />
            </button>
          </div>
        </div>

        {/* Mobile header */}
        <div className="mobile-only" style={{ flexDirection: "column" }}>
          {/* Status bar */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px 4px" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#4a3860" }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="16" height="12" viewBox="0 0 17 13" fill="none">
                <rect x="0" y="5" width="3" height="8" rx="1" fill="#4a3860" opacity="0.45" />
                <rect x="4.5" y="3" width="3" height="10" rx="1" fill="#4a3860" opacity="0.6" />
                <rect x="9" y="1" width="3" height="12" rx="1" fill="#4a3860" opacity="0.8" />
                <rect x="13.5" y="0" width="3" height="13" rx="1" fill="#4a3860" />
              </svg>
              <div style={{ width: 24, height: 12, borderRadius: 3, border: "1.5px solid #4a3860", position: "relative", display: "flex", alignItems: "center", paddingLeft: 2 }}>
                <div style={{ width: "72%", height: 7, borderRadius: 2, background: "#4a3860" }} />
                <div style={{ width: 2, height: 5, background: "#4a3860", position: "absolute", right: -4, borderRadius: "0 2px 2px 0" }} />
              </div>
            </div>
          </div>
          {/* Nav circles */}
          <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 10px 0" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="nav-btn"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, background: "none", border: "none", cursor: "pointer" }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  background: active === item.id ? "#b89cc8" : "#ede6f2",
                  border: active === item.id ? "2.5px solid #c8aede" : "2.5px solid transparent",
                  boxShadow: active === item.id ? "0 3px 14px #d8c8e8" : "none",
                  transform: active === item.id ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.2s",
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? "#7a5c9a" : "#4a3860", opacity: active === item.id ? 1 : 0.7 }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          {/* Tool row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: "10px 20px 8px", borderBottom: "1px solid #d8c8e8" }}>
            <button className="tool-btn" onClick={() => setViewMode("grid")} style={{ width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer", background: viewMode === "grid" ? "#b89cc8" : "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GridIcon color={viewMode === "grid" ? "#fff" : "#7a5c9a"} />
            </button>
            <button className="tool-btn" onClick={() => setViewMode("list")} style={{ width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer", background: viewMode === "list" ? "#b89cc8" : "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ListIcon color={viewMode === "list" ? "#fff" : "#7a5c9a"} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Section banner ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 16px 0" }}>
        <div style={{ background: "#ede6f2", borderRadius: 16, padding: "12px 18px", transition: "all 0.3s" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#7a5c9a" }}>{sections[active].title}</p>
          <p style={{ fontSize: 13, color: "#4a3860", marginTop: 3, opacity: 0.85 }}>{sections[active].content}</p>
        </div>
      </div>

      {/* ── Main grid / list ── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 16px 36px" }}>
        {viewMode === "grid" ? (
          <div className="main-grid" style={{ display: "grid", gap: 10 }}>
            <CardText bg="#fff" text="תוכן שמשוי ומתאים לקהל שלך" />
            <CardEmoji emoji="💐" bg="linear-gradient(135deg,#ede6f2,#e8d5e8)" />
            <CardText bg="#fff" text="עיצוב שמדבר את העסק שלך" />
            <CardAccent />
            <CardEmoji emoji="💻" bg="linear-gradient(135deg,#e8dff0,#e8d5e8)" />
            <CardText bg="#ede6f2" text="נראות מקצועית שמייצרת אמון ומביאה תוצאות" />
            <CardEmoji emoji="📱" bg="linear-gradient(135deg,#f0e8f5,#ede6f2)" />
            <CardText bg="#fff" text="תכנון, עיצוב ועריכת תוכן במקום אחד" />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { emoji: "💐", title: "תוכן שמשוי ומתאים לקהל שלך", desc: "תוכן שמדבר ישירות אל הלקוחות שלך וגורם להם לפעול." },
              { emoji: "✏️", title: "עיצוב שמדבר את העסק שלך", desc: "זהות ויזואלית ברורה שמייצרת רושם ראשוני מנצח." },
              { emoji: "🎯", title: "דיוק במסר – תוצאות שמביאות לקוחות", desc: "מסרים חדים ומדויקים שממירים עוקבים ללקוחות." },
              { emoji: "💻", title: "נראות מקצועית שמייצרת אמון", desc: "כשהנראות מדויקת, הלקוחות סומכים עליך מהרגע הראשון." },
              { emoji: "📱", title: "תכנון, עיצוב ועריכת תוכן במקום אחד", desc: "פתרון שלם לכל הצרכים הדיגיטליים שלך – בלי לפזר את האנרגיה." },
            ].map((item, i) => (
              <div key={i} className="list-row" style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 16, padding: "14px 18px", boxShadow: "0 2px 12px #d8c8e820", cursor: "pointer" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {item.emoji}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#4a3860", fontSize: 14 }}>{item.title}</p>
                  <p style={{ color: "#7a5c9a", fontSize: 12, marginTop: 3, opacity: 0.82 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function CardText({ bg, text }: { bg: string; text: string }) {
  return (
    <div className="card-hover" style={{ background: bg, borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "14px 14px", minHeight: 130, boxShadow: "0 2px 12px #d8c8e820", cursor: "pointer" }}>
      <p style={{ fontWeight: 700, color: "#4a3860", fontSize: 14, lineHeight: 1.55 }}>{text}</p>
    </div>
  );
}

function CardEmoji({ emoji, bg }: { emoji: string; bg: string }) {
  return (
    <div className="card-hover" style={{ background: bg, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 130, fontSize: 52, cursor: "pointer" }}>
      {emoji}
    </div>
  );
}

function CardAccent() {
  return (
    <div className="card-hover" style={{ background: "#b89cc8", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 130, boxShadow: "0 6px 24px #c8aede55", cursor: "pointer" }}>
      <p style={{ fontWeight: 800, color: "#fff", fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>דיוק במסר<br />תוצאות שמביאות<br />לקוחות</p>
      <span style={{ fontSize: 20 }}>🤍</span>
    </div>
  );
}

function GridIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="11" y="1" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="1" y="11" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function ListIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3" width="14" height="2.5" rx="1.2" fill={color} />
      <rect x="2" y="7.8" width="10" height="2.5" rx="1.2" fill={color} />
      <rect x="2" y="12.5" width="12" height="2.5" rx="1.2" fill={color} />
    </svg>
  );
}
