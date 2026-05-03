"use client";

import { useState, useEffect } from "react";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  emoji: string;
  color: string;
  description: string;
  fileUrl?: string;
  fileType?: "image" | "pdf";
};

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

function PortfolioCarousel({ items, index, onClose, onPrev, onNext, onDot }: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) {
  const item = items[index];
  if (!item) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(74,56,96,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#f5f0f7", borderRadius: 28, padding: "32px 24px 28px", maxWidth: 520, width: "94vw", position: "relative", boxShadow: "0 24px 64px rgba(74,56,96,0.25)", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, left: 14, width: 34, height: 34, borderRadius: "50%", border: "none", background: "#ede6f2", color: "#7a5c9a", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
          ✕
        </button>
        <h2 style={{ fontWeight: 800, fontSize: 20, color: "#4a3860", margin: 0 }}>תיק עבודות</h2>
        <div className="portfolio-card" style={{ borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: item.color ?? "#ede6f2", transition: "background 0.35s ease", position: "relative", overflow: "hidden" }}>
          {item.fileUrl && item.fileType === "image" ? (
            <img src={item.fileUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, borderRadius: 20 }} />
          ) : item.fileUrl && item.fileType === "pdf" ? (
            <span style={{ fontSize: 64 }}>📄</span>
          ) : (
            <span style={{ fontSize: 64 }}>{item.emoji}</span>
          )}
          <div style={{ textAlign: "center", padding: "0 16px", position: "relative", zIndex: 2, background: item.fileType === "image" ? "rgba(255,255,255,0.85)" : "transparent", borderRadius: 12, margin: item.fileType === "image" ? "auto 12px 12px" : "0" }}>
            <p style={{ fontWeight: 800, fontSize: 18, color: "#4a3860" }}>{item.title}</p>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#7a5c9a", background: "#fff", borderRadius: 99, padding: "3px 12px", marginTop: 6, display: "inline-block" }}>{item.category}</span>
            <p style={{ fontSize: 12, color: "#4a3860", opacity: 0.7, marginTop: 8 }}>{item.description}</p>
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
            {items.map((_, i) => (
              <div key={i} onClick={() => onDot(i)} style={{ width: i === index ? 20 : 7, height: 7, borderRadius: 99, background: i === index ? "#7a5c9a" : "#c8aede", cursor: "pointer", transition: "all 0.25s" }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <button onClick={onNext} style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: "#ede6f2", color: "#7a5c9a", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>‹</button>
          <span style={{ display: "flex", alignItems: "center", fontSize: 13, color: "#7a5c9a", fontWeight: 600 }}>{index + 1} / {items.length}</span>
          <button onClick={onPrev} style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: "#ede6f2", color: "#7a5c9a", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>›</button>
        </div>
      </div>
    </div>
  );
}

export default function MobileHome() {
  const [active, setActive] = useState("clients");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => setPortfolioItems(data.items))
      .catch(() => {});
  }, [portfolioOpen]);

  const prev = () => setCarouselIndex((i) => (i === 0 ? portfolioItems.length - 1 : i - 1));
  const next = () => setCarouselIndex((i) => (i === portfolioItems.length - 1 ? 0 : i + 1));

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#f5f0f7", fontFamily: "'Segoe UI','Arial Hebrew',Arial,sans-serif" }}>

      {portfolioOpen && portfolioItems.length > 0 && (
        <PortfolioCarousel
          items={portfolioItems}
          index={carouselIndex}
          onClose={() => setPortfolioOpen(false)}
          onPrev={prev}
          onNext={next}
          onDot={(i) => setCarouselIndex(i)}
        />
      )}

      {portfolioOpen && portfolioItems.length === 0 && (
        <div onClick={() => setPortfolioOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(74,56,96,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#f5f0f7", borderRadius: 28, padding: 40, textAlign: "center", color: "#b89cc8" }}>
            <div style={{ fontSize: 36 }}>⏳</div>
            <p>טוען עבודות...</p>
          </div>
        </div>
      )}

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#f5f0f7", borderBottom: "1px solid #d8c8e8" }}>
        <div className="desktop-only" style={{ alignItems: "center", justifyContent: "space-between", padding: "14px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <img src="/logo.png" alt="לוגו" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          <nav style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className="nav-btn" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", background: active === item.id ? "#b89cc8" : "#ede6f2", color: active === item.id ? "#fff" : "#4a3860", boxShadow: active === item.id ? "0 4px 14px #c8aede55" : "none" }}>
                <span>{item.icon}</span><span>{item.label}</span>
              </button>
            ))}
            <button onClick={() => setPortfolioOpen(true)} className="portfolio-btn nav-btn" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "2px solid #b89cc8", background: "transparent", color: "#7a5c9a" }}>
              🖼️ תיק עבודות
            </button>
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

        <div className="mobile-only" style={{ flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 10px 0" }}>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className="nav-btn" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, background: "none", border: "none", cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: active === item.id ? "#b89cc8" : "#ede6f2", border: active === item.id ? "2.5px solid #c8aede" : "2.5px solid transparent", boxShadow: active === item.id ? "0 3px 14px #d8c8e8" : "none", transform: active === item.id ? "scale(1.08)" : "scale(1)", transition: "all 0.2s" }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: active === item.id ? 700 : 500, color: active === item.id ? "#7a5c9a" : "#4a3860", opacity: active === item.id ? 1 : 0.7 }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: "1px solid #d8c8e8" }}>
            <button className="tool-btn" onClick={() => setViewMode("grid")} style={{ width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer", background: viewMode === "grid" ? "#b89cc8" : "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GridIcon color={viewMode === "grid" ? "#fff" : "#7a5c9a"} />
            </button>
            <button className="tool-btn" onClick={() => setViewMode("list")} style={{ width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer", background: viewMode === "list" ? "#b89cc8" : "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ListIcon color={viewMode === "list" ? "#fff" : "#7a5c9a"} />
            </button>
            <button onClick={() => setPortfolioOpen(true)} className="portfolio-btn" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "2px solid #b89cc8", background: "transparent", color: "#7a5c9a" }}>
              🖼️ תיק עבודות
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 16px 0" }}>
        <div style={{ background: "#ede6f2", borderRadius: 16, padding: "12px 18px" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#7a5c9a" }}>{sections[active].title}</p>
          <p style={{ fontSize: 13, color: "#4a3860", marginTop: 3, opacity: 0.85 }}>{sections[active].content}</p>
        </div>
      </div>

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
    <div className="card-hover" style={{ background: bg, borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "14px", minHeight: 130, boxShadow: "0 2px 12px #d8c8e820", cursor: "pointer" }}>
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