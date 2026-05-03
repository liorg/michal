"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("שם משתמש או סיסמה שגויים");
    }
    setLoading(false);
  }

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#f5f0f7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI','Arial Hebrew',Arial,sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px #b89cc820" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="לוגו" style={{ height: 56, objectFit: "contain" }} />
          <p style={{ color: "#7a5c9a", fontSize: 14, marginTop: 10, fontWeight: 600 }}>כניסה לניהול תיק עבודות</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 6 }}>שם משתמש</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="הכנס שם משתמש"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #d8c8e8", fontSize: 14, color: "#4a3860", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#7a5c9a", display: "block", marginBottom: 6 }}>סיסמה</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="הכנס סיסמה"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #d8c8e8", fontSize: 14, color: "#4a3860", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>

          {error && (
            <p style={{ color: "#c08080", fontSize: 13, textAlign: "center", margin: 0 }}>{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ padding: "12px", borderRadius: 999, border: "none", background: "#b89cc8", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4, opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}
          >
            {loading ? "מתחבר..." : "כניסה"}
          </button>
        </div>
      </div>
    </div>
  );
}
