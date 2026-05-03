"use client";

import { useEffect, useState, useRef } from "react";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  emoji: string;
  color: string;
  description: string;
  fileUrl?: string;   // image or PDF
  fileType?: "image" | "pdf";
};

const CATEGORIES = ["מיתוג", "תוכן", "עיצוב", "צילום", "סושיאל", "אחר"];
const EMOJIS = ["☕", "✨", "📸", "🎉", "👗", "🎨", "💄", "🌸", "🍃", "⭐", "🏆", "💼", "🖼️", "🎯", "💡"];
const COLORS = [
  { label: "ורוד", value: "#e8d5e8" },
  { label: "תכלת", value: "#d5dde8" },
  { label: "ירוק", value: "#d5e8e4" },
  { label: "קרם", value: "#e8e4d5" },
  { label: "אפרסק", value: "#e8d5c4" },
  { label: "לבנדר", value: "#e2d5f0" },
  { label: "צהוב", value: "#f0ecd5" },
];

const EMPTY_FORM: Omit<PortfolioItem, "id"> = {
  title: "",
  category: CATEGORIES[0],
  emoji: EMOJIS[0],
  color: COLORS[0].value,
  description: "",
  fileUrl: "",
  fileType: undefined,
};

export default function AdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState<Omit<PortfolioItem, "id">>({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [previewItem, setPreviewItem] = useState<PortfolioItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setItems(data.items);
  }

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        const isPdf = file.name.toLowerCase().endsWith(".pdf");
        setForm((f) => ({ ...f, fileUrl: data.url, fileType: isPdf ? "pdf" : "image" }));
        showToast("הקובץ הועלה בהצלחה ✓");
      } else {
        showToast(data.error || "שגיאה בהעלאה", "error");
      }
    } catch {
      showToast("שגיאה בהעלאה", "error");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit() {
    if (!form.title.trim()) return showToast("חובה למלא כותרת", "error");
    if (!form.description.trim()) return showToast("חובה למלא תיאור", "error");
    setLoading(true);
    try {
      if (editingId !== null) {
        await fetch("/api/portfolio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        showToast("העבודה עודכנה בהצלחה ✓");
        setEditingId(null);
      } else {
        await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showToast("העבודה נוספה בהצלחה ✓");
      }
      setForm({ ...EMPTY_FORM });
      fetchItems();
    } catch {
      showToast("שגיאה בשמירה", "error");
    }
    setLoading(false);
  }

  async function handleDelete(id: number) {
    await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteConfirm(null);
    showToast("העבודה נמחקה");
    fetchItems();
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);
    setForm({ title: item.title, category: item.category, emoji: item.emoji, color: item.color, description: item.description, fileUrl: item.fileUrl || "", fileType: item.fileType });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  }

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#f5f0f7", fontFamily: "'Segoe UI','Arial Hebrew',Arial,sans-serif", padding: "0 0 60px" }}>
      <style>{`
        .field-input { width: 100%; padding: 10px 14px; border-radius: 12px; border: 1.5px solid #d8c8e8; background: #fff; font-size: 14px; color: #4a3860; outline: none; transition: border 0.18s; font-family: inherit; }
        .field-input:focus { border-color: #b89cc8; box-shadow: 0 0 0 3px #b89cc820; }
        .emoji-btn { width: 40px; height: 40px; border-radius: 10px; border: 2px solid transparent; background: #ede6f2; font-size: 20px; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
        .emoji-btn:hover { transform: scale(1.12); }
        .emoji-btn.active { border-color: #b89cc8; background: #fff; box-shadow: 0 2px 10px #b89cc840; }
        .color-dot { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.15s; }
        .color-dot:hover { transform: scale(1.15); }
        .color-dot.active { border-color: #7a5c9a; box-shadow: 0 0 0 2px #7a5c9a40; }
        .save-btn { padding: 12px 32px; border-radius: 999px; border: none; background: #b89cc8; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .save-btn:hover:not(:disabled) { background: #a08ab8; transform: translateY(-2px); box-shadow: 0 6px 20px #b89cc850; }
        .save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .cancel-btn { padding: 12px 24px; border-radius: 999px; border: 2px solid #d8c8e8; background: transparent; color: #7a5c9a; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .cancel-btn:hover { background: #ede6f2; }
        .upload-zone { border: 2px dashed #c8aede; border-radius: 14px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; background: #faf7fd; }
        .upload-zone:hover { border-color: #b89cc8; background: #f5f0f7; }
        .item-card { background: #fff; border-radius: 18px; padding: 16px; display: flex; align-items: center; gap: 14px; box-shadow: 0 2px 12px #d8c8e825; transition: all 0.2s; }
        .item-card:hover { transform: translateY(-2px); box-shadow: 0 6px 22px #b89cc828; }
        .edit-btn { padding: 6px 16px; border-radius: 999px; border: 1.5px solid #b89cc8; background: transparent; color: #7a5c9a; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .edit-btn:hover { background: #ede6f2; }
        .del-btn { padding: 6px 16px; border-radius: 999px; border: 1.5px solid #f0c0c0; background: transparent; color: #c08080; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .del-btn:hover { background: #fdf0f0; }
        .view-btn { padding: 6px 16px; border-radius: 999px; border: 1.5px solid #a8d8c0; background: transparent; color: #508070; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .view-btn:hover { background: #f0fdf8; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 999, background: toast.type === "success" ? "#7a5c9a" : "#c08080", color: "#fff", padding: "12px 28px", borderRadius: 999, fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>
          {toast.msg}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div onClick={() => setDeleteConfirm(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(74,56,96,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 22, padding: "32px 28px", textAlign: "center", maxWidth: 320, width: "90vw", boxShadow: "0 20px 50px rgba(74,56,96,0.2)" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#4a3860", marginBottom: 8 }}>למחוק את העבודה?</p>
            <p style={{ fontSize: 13, color: "#7a5c9a", marginBottom: 24, opacity: 0.8 }}>פעולה זו לא ניתנת לביטול</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="cancel-btn" onClick={() => setDeleteConfirm(null)}>ביטול</button>
              <button className="save-btn" style={{ background: "#c08080" }} onClick={() => handleDelete(deleteConfirm)}>מחק</button>
            </div>
          </div>
        </div>
      )}

      {/* File preview popup */}
      {previewItem && (
        <div onClick={() => setPreviewItem(null)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(74,56,96,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 22, padding: 24, maxWidth: 700, width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setPreviewItem(null)} style={{ position: "absolute", top: 14, left: 14, width: 34, height: 34, borderRadius: "50%", border: "none", background: "#ede6f2", color: "#7a5c9a", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>✕</button>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: "#4a3860", margin: "0 0 16px", textAlign: "center" }}>{previewItem.title}</h3>
            {previewItem.fileType === "image" && previewItem.fileUrl && (
              <img src={previewItem.fileUrl} alt={previewItem.title} style={{ width: "100%", borderRadius: 14, objectFit: "contain", maxHeight: "70vh" }} />
            )}
            {previewItem.fileType === "pdf" && previewItem.fileUrl && (
              <div style={{ textAlign: "center" }}>
                <iframe src={previewItem.fileUrl} style={{ width: "100%", height: "70vh", borderRadius: 14, border: "1px solid #d8c8e8" }} />
                <a href={previewItem.fileUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 12, padding: "10px 24px", background: "#b89cc8", color: "#fff", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                  פתח PDF בחלון חדש ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #d8c8e8", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ width: 36, height: 36, borderRadius: 10, background: "#ede6f2", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: 18, color: "#7a5c9a" }}>←</a>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 18, color: "#4a3860", margin: 0 }}>ניהול תיק עבודות</h1>
            <p style={{ fontSize: 12, color: "#b89cc8", margin: 0 }}>{items.length} עבודות</p>
          </div>
        </div>
        <img src="/logo.png" alt="לוגו" style={{ height: 40, width: "auto", objectFit: "contain" }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* ── Form ── */}
        <div style={{ background: "#fff", borderRadius: 22, padding: "26px 22px", boxShadow: "0 4px 20px #d8c8e830" }}>
          <h2 style={{ fontWeight: 800, fontSize: 16, color: "#4a3860", margin: "0 0 20px" }}>
            {editingId !== null ? "✏️ עריכת עבודה" : "➕ הוספת עבודה חדשה"}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Title */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 6 }}>כותרת הפרויקט *</label>
              <input className="field-input" placeholder="לדוגמה: מותג קפה בוטיק" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 6 }}>תיאור קצר *</label>
              <textarea className="field-input" placeholder="תיאור הפרויקט ומה עשית..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ resize: "vertical" }} />
            </div>

            {/* Category */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 6 }}>קטגוריה</label>
              <select className="field-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ appearance: "none", cursor: "pointer" }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* File upload */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 8 }}>תמונה או PDF של הפרויקט</label>
              {form.fileUrl ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#f5f0f7", borderRadius: 14, padding: "12px 16px" }}>
                  {form.fileType === "image" ? (
                    <img src={form.fileUrl} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 10 }} />
                  ) : (
                    <div style={{ width: 60, height: 60, background: "#ede6f2", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📄</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#4a3860", margin: 0 }}>
                      {form.fileType === "pdf" ? "PDF הועלה" : "תמונה הועלתה"} ✓
                    </p>
                    <p style={{ fontSize: 11, color: "#b89cc8", margin: "2px 0 0" }}>
                      {form.fileUrl.startsWith("data:") ? "קובץ הועלה בהצלחה" : form.fileUrl}
                    </p>
                  </div>
                  <button onClick={() => setForm({ ...form, fileUrl: "", fileType: undefined })} style={{ background: "none", border: "none", cursor: "pointer", color: "#c08080", fontSize: 18 }}>✕</button>
                </div>
              ) : (
                <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{uploading ? "⏳" : "📎"}</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#7a5c9a", margin: 0 }}>
                    {uploading ? "מעלה קובץ..." : "לחץ להעלאת תמונה או PDF"}
                  </p>
                  <p style={{ fontSize: 12, color: "#b89cc8", margin: "4px 0 0" }}>JPG, PNG, GIF, WEBP, PDF</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={handleFileUpload} disabled={uploading} />
            </div>

            {/* Emoji picker */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 8 }}>אמוג׳י (לתצוגה ללא קובץ)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {EMOJIS.map((e) => (
                  <button key={e} className={`emoji-btn${form.emoji === e ? " active" : ""}`} onClick={() => setForm({ ...form, emoji: e })}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 8 }}>צבע רקע</label>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                {COLORS.map((c) => (
                  <div key={c.value} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div className={`color-dot${form.color === c.value ? " active" : ""}`} style={{ background: c.value }} onClick={() => setForm({ ...form, color: c.value })} />
                    <span style={{ fontSize: 10, color: "#b89cc8" }}>{c.label}</span>
                  </div>
                ))}
                {/* Preview */}
                <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 8, background: form.color, borderRadius: 12, padding: "10px 16px" }}>
                  {form.fileUrl && form.fileType === "image"
                    ? <img src={form.fileUrl} alt="" style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 6 }} />
                    : <span style={{ fontSize: 24 }}>{form.emoji}</span>}
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#4a3860" }}>{form.title || "תצוגה מקדימה"}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-start", marginTop: 4 }}>
              <button className="save-btn" onClick={handleSubmit} disabled={loading || uploading}>
                {loading ? "שומר..." : editingId !== null ? "שמור שינויים" : "הוסף עבודה"}
              </button>
              {editingId !== null && (
                <button className="cancel-btn" onClick={cancelEdit}>ביטול</button>
              )}
            </div>
          </div>
        </div>

        {/* ── Items list ── */}
        <div>
          <h2 style={{ fontWeight: 800, fontSize: 16, color: "#4a3860", margin: "0 0 14px" }}>העבודות הקיימות</h2>
          {items.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 18, padding: "40px", textAlign: "center", color: "#b89cc8", fontSize: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
              עדיין אין עבודות – הוסיפי את הראשונה!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  {/* Thumbnail */}
                  <div style={{ width: 58, height: 58, borderRadius: 14, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    {item.fileUrl && item.fileType === "image"
                      ? <img src={item.fileUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : item.fileUrl && item.fileType === "pdf"
                      ? <span style={{ fontSize: 28 }}>📄</span>
                      : <span style={{ fontSize: 26 }}>{item.emoji}</span>
                    }
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: "#4a3860", fontSize: 14, margin: 0 }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: "#b89cc8", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.category}
                      {item.fileUrl && <span style={{ marginRight: 6, color: "#7a5c9a" }}>· {item.fileType === "pdf" ? "📄 PDF" : "🖼️ תמונה"}</span>}
                    </p>
                  </div>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {item.fileUrl && (
                      <button className="view-btn" onClick={() => setPreviewItem(item)}>צפה</button>
                    )}
                    <button className="edit-btn" onClick={() => startEdit(item)}>עריכה</button>
                    <button className="del-btn" onClick={() => setDeleteConfirm(item.id)}>מחק</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}