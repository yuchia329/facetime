"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type Mode = "sfu" | "p2p";

export default function LobbyPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [mode, setMode] = useState<Mode>("sfu");

  const basePath = mode === "sfu" ? "/room" : "/room-p2p";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) return;
    setIsJoining(true);
    const room = roomId.trim() || uuidv4().slice(0, 8);
    router.push(
      `${basePath}/${room}?name=${encodeURIComponent(displayName.trim())}`,
    );
  }

  const sfuFeatures = [
    { label: "Ultra-low latency" },
    { label: "End-to-end encrypted" },
    { label: "Scales to large groups" },
  ];

  const p2pFeatures = [
    { label: "Direct peer connections" },
    { label: "End-to-end encrypted" },
    { label: "No media server needed" },
  ];

  const features = mode === "sfu" ? sfuFeatures : p2pFeatures;

  return (
    <div className="page-shell">
      <main className="lobby-page">
        {/* Background orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="lobby-card">
          {/* Logo */}
          <div className="lobby-logo">
            <h1 className="logo-title">Hubstream</h1>
          </div>
          <p className="lobby-subtitle">
            {mode === "sfu"
              ? "Crystal-clear video chat, powered by WebRTC SFU"
              : "Direct peer-to-peer video chat, no media server"}
          </p>

          {/* Mode selector */}
          <div className="mode-selector">
            <button
              type="button"
              className={`mode-btn ${mode === "sfu" ? "mode-btn--active" : ""}`}
              onClick={() => setMode("sfu")}
            >
              SFU Mode
              <span className="mode-btn-desc">Scalable · Server-routed</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === "p2p" ? "mode-btn--active" : ""}`}
              onClick={() => setMode("p2p")}
            >
              Mesh P2P
              <span className="mode-btn-desc">Direct · Browser-to-browser</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="lobby-form">
            {/* Display name */}
            <div className="form-group">
              <label htmlFor="displayName" className="form-label">
                Your Name
              </label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                {["🦫 Beaver", "🐹 Hamster", "🐨 Koala"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDisplayName(n)}
                    style={{
                      flex: 1,
                      padding: "6px",
                      background: "rgba(255,255,255,0.05)",
                      border:
                        displayName === n
                          ? "1px solid #6366f1"
                          : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <input
                id="displayName"
                type="text"
                placeholder="Enter your name…"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="form-input"
                maxLength={30}
                required
                autoFocus
              />
            </div>

            {/* Room ID */}
            <div className="form-group">
              <label htmlFor="roomId" className="form-label">
                Room ID{" "}
                <span className="label-hint">(leave blank to create new)</span>
              </label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                {["1", "2", "3"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoomId(r)}
                    style={{
                      flex: 1,
                      padding: "6px",
                      background: "rgba(255,255,255,0.05)",
                      border:
                        roomId === r
                          ? "1px solid #6366f1"
                          : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <input
                id="roomId"
                type="text"
                placeholder="e.g. abc12345"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="form-input"
                maxLength={20}
              />
            </div>

            <div className="lobby-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!displayName.trim() || isJoining}
              >
                {isJoining ? (
                  <span className="btn-loading">
                    <span className="spinner" /> Joining…
                  </span>
                ) : (
                  "→ Join Room"
                )}
              </button>
            </div>
          </form>

          <div className="lobby-features">
            {features.map((f, idx) => (
              <div key={idx} className="feature">
                <span className="feature-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="site-footer-copy">
            © 2026 Yuchia. All rights reserved.
          </p>
          <div className="site-footer-links">
            <a
              href="https://yuchia.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-link"
              aria-label="Website"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </a>
            <a
              href="https://github.com/yuchia329"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-link"
              aria-label="GitHub"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/yuchia-chang-1b5058177/"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-link"
              aria-label="LinkedIn"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:yuchia.chang@outlook.com"
              className="site-footer-link"
              aria-label="Email"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
