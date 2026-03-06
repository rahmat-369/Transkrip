import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Youtube,
  Search,
  Copy,
  Check,
  Loader2,
  Sparkles,
  FileText,
  Zap,
  Github,
  CheckCircle2,
  XCircle,
  Info,
  MessageCircle,
  Send,
  X,
  Wand2,
  Trash2,
  ChevronDown,
  Info as InfoIcon,
  History,
  Headset,
  ExternalLink,
  CreditCard,
  HeartHandshake,
  Phone,
  Wallet,
} from "lucide-react";

function TikTokIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.7 3c.5 2.8 2.3 4.7 5.3 5v3.2c-2 0-3.7-.6-5.3-1.7v7.2c0 4-3.3 7.3-7.3 7.3S2 20.7 2 16.7 5.3 9.4 9.3 9.4c.4 0 .8 0 1.2.1v3.5c-.4-.1-.8-.2-1.2-.2-2 0-3.9 1.7-3.9 3.9s1.7 3.9 3.9 3.9 3.9-1.6 3.9-3.9V3h3.5z" />
    </svg>
  );
}

function ToastIcon({ type }) {
  if (type === "success") return <CheckCircle2 size={18} />;
  if (type === "error") return <XCircle size={18} />;
  return <Info size={18} />;
}

function toastStyles(type) {
  if (type === "success") {
    return {
      ring: "ring-1 ring-emerald-200/70",
      bg: "bg-emerald-50/75",
      text: "text-emerald-950",
      sub: "text-emerald-900/70",
      iconWrap: "bg-emerald-100 text-emerald-700",
      bar: "bg-emerald-500",
    };
  }
  if (type === "error") {
    return {
      ring: "ring-1 ring-red-200/70",
      bg: "bg-red-50/75",
      text: "text-red-950",
      sub: "text-red-900/70",
      iconWrap: "bg-red-100 text-red-700",
      bar: "bg-red-500",
    };
  }
  return {
    ring: "ring-1 ring-gray-200/70",
    bg: "bg-white/70",
    text: "text-gray-950",
    sub: "text-gray-700/70",
    iconWrap: "bg-gray-100 text-gray-700",
    bar: "bg-gray-900",
  };
}

function isValidHttpsUrl(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

function isYouTubeUrl(raw) {
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    const allowed = new Set(["youtube.com", "m.youtube.com", "youtu.be", "music.youtube.com"]);
    return [...allowed].some((d) => host === d);
  } catch {
    return false;
  }
}

function hasTimestamps(text) {
  return /\b\d{1,2}:\d{2}\b/.test(text || "");
}

function normalizePhone(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  const digits = s.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

function buildWaLink(phoneOrEmpty, text) {
  const p = normalizePhone(phoneOrEmpty);
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  if (p) return `https://wa.me/${p}${q}`;
  if (text) return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  return "https://wa.me/";
}

function CustomSelect({ value, onChange, options, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, []);

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={ref} className="relative z-[110]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="w-full h-11 rounded-2xl bg-[#FFFFFF] border border-gray-200 px-3 text-sm font-extrabold text-gray-900 flex items-center justify-between gap-2 hover:bg-gray-50 transition disabled:opacity-60"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      <div
        className={[
          "absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-[#FFFFFF] shadow-[0_18px_40px_-26px_rgba(0,0,0,0.35)]",
          "transition-all duration-200",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none",
        ].join(" ")}
        style={{ zIndex: 120 }}
      >
        <div className="p-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={[
                  "w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition",
                  active ? "bg-gray-900 text-white" : "text-gray-800 hover:bg-gray-50",
                ].join(" ")}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-500/70 animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-1.5 w-1.5 rounded-full bg-gray-500/70 animate-bounce" style={{ animationDelay: "120ms" }} />
      <span className="h-1.5 w-1.5 rounded-full bg-gray-500/70 animate-bounce" style={{ animationDelay: "240ms" }} />
    </div>
  );
}

function DialogShell({ open, onClose, title, subtitle, icon, children, widthClass = "max-w-[420px]" }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={["fixed inset-0 z-[95] transition-all duration-300", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"].join(" ")}>
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4">
        <div
          className={[
            "w-full",
            widthClass,
            "rounded-3xl overflow-hidden",
            "bg-white border border-gray-200 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.55)]",
            "transform transition-all duration-300",
            open ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gray-900 text-white grid place-items-center">{icon}</div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-gray-900 leading-tight">{title}</div>
                <div className="text-xs font-semibold text-gray-500 leading-tight">{subtitle}</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-2xl grid place-items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function safeJsonParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const imgZakrenz = "https://files.catbox.moe/f0rsf5.png";
  const clickSfx = "https://files.catbox.moe/tk3jff.mp3";

  const ADMIN = {
    waText: "Halo admin, saya mau tanya soal Z-YouTube Transcript.",
    waNumber: "087742898019",
    tiktokLink: "https://www.tiktok.com/@zakrenzreal",
    githubLink: "https://github.com/Zakrenzdev",
    danaNumber: "087742898019",
    donateLabel: "Donasi (DANA)",
  };

  const HISTORY_KEYS = {
    transcript: "zclip_history_transcript",
    chat: "zclip_history_chat",
  };

  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [toasts, setToasts] = useState([]);
  const toastTimers = useRef(new Map());
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const underlineRef = useRef(null);
  const underlineInitOnce = useRef(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMode, setChatMode] = useState("clip");
  const [chatCustomPrompt, setChatCustomPrompt] = useState("");
  const [chatText, setChatText] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState(null);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyType, setHistoryType] = useState("transcript");
  const [contactOpen, setContactOpen] = useState(false);

  const [transcriptHistory, setTranscriptHistory] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const [chatMessages, setChatMessages] = useState([
    { role: "user", content: "Halo siapa kamu?" },
    {
      role: "assistant",
      content: "Aku adalah Z-Clipper AI yang dibuat oleh Zakrenz. Tempel transkrip, pilih mode output, aku bikinin hasil siap edit.",
    },
  ]);

  const chatListRef = useRef(null);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const a = new Audio(clickSfx);
    a.preload = "auto";
    a.volume = 0.6;
    a.crossOrigin = "anonymous";
    clickAudioRef.current = a;

    const onAnyClick = (e) => {
      const target = e.target;
      if (!target) return;
      const isBtn = target.closest?.("button");
      const isLink = target.closest?.("a");
      if (!isBtn && !isLink) return;

      const audio = clickAudioRef.current;
      if (!audio) return;
      try {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch {}
    };

    document.addEventListener("click", onAnyClick, true);
    return () => document.removeEventListener("click", onAnyClick, true);
  }, [clickSfx]);

  useEffect(() => {
    if (!underlineRef.current) return;
    if (underlineInitOnce.current) return;
    underlineInitOnce.current = true;

    const el = underlineRef.current;
    const length = el.getTotalLength();
    el.style.opacity = "0";
    el.style.strokeDasharray = String(length);
    el.style.strokeDashoffset = String(length);
    el.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1), opacity 450ms ease";
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.strokeDashoffset = "0";
    });
  }, [isMounted]);

  const scrollChatToBottom = (smooth = true) => {
    const node = chatListRef.current;
    if (!node) return;
    requestAnimationFrame(() => {
      node.scrollTo({ top: node.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    });
  };

  useEffect(() => {
    if (!chatOpen) return;
    setTimeout(() => scrollChatToBottom(false), 0);
  }, [chatOpen]);

  useEffect(() => {
    if (!chatOpen) return;
    scrollChatToBottom(true);
  }, [chatMessages.length, chatSending, chatOpen]);

  const dismissToast = (id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      toastTimers.current.delete(id);
    }, reduceMotion ? 0 : 650);
    toastTimers.current.set(id, timer);
  };

  const pushToast = ({ type = "info", title, message, duration = 3200 }) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [{ id, type, title, message, leaving: false, duration }, ...prev].slice(0, 4));
    const timer = setTimeout(() => dismissToast(id), duration);
    toastTimers.current.set(id, timer);
  };

  useEffect(() => {
    return () => {
      for (const t of toastTimers.current.values()) clearTimeout(t);
      toastTimers.current.clear();
    };
  }, []);

  const loadTranscriptHistory = () => {
    const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.transcript) || "[]", []);
    const arr = Array.isArray(items) ? items : [];
    setTranscriptHistory(arr.slice(0, 50));
  };

  const loadChatHistory = () => {
    const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.chat) || "[]", []);
    const arr = Array.isArray(items) ? items : [];
    setChatHistory(arr.slice(0, 50));
  };

  useEffect(() => {
    loadTranscriptHistory();
    loadChatHistory();
  }, []);

  const saveTranscriptHistoryItem = (item) => {
    const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.transcript) || "[]", []);
    const arr = Array.isArray(items) ? items : [];
    const next = [item, ...arr].slice(0, 50);
    localStorage.setItem(HISTORY_KEYS.transcript, JSON.stringify(next));
    setTranscriptHistory(next);
  };

  const saveChatHistoryItem = (item) => {
    const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.chat) || "[]", []);
    const arr = Array.isArray(items) ? items : [];
    const next = [item, ...arr].slice(0, 50);
    localStorage.setItem(HISTORY_KEYS.chat, JSON.stringify(next));
    setChatHistory(next);
  };

  const clearTranscriptHistory = () => {
    localStorage.removeItem(HISTORY_KEYS.transcript);
    setTranscriptHistory([]);
    pushToast({ type: "info", title: "History", message: "History transkrip dihapus.", duration: 1600 });
  };

  const clearChatHistory = () => {
    localStorage.removeItem(HISTORY_KEYS.chat);
    setChatHistory([]);
    pushToast({ type: "info", title: "History", message: "History chat dihapus.", duration: 1600 });
  };

  const validateUrl = (candidate) => {
    const trimmed = candidate.trim();
    if (!trimmed) return { ok: false, reason: "URL kosong" };
    if (!isValidHttpsUrl(trimmed)) return { ok: false, reason: "URL harus https://" };
    if (!isYouTubeUrl(trimmed)) return { ok: false, reason: "Hanya support URL YouTube" };
    return { ok: true, reason: "" };
  };

  const fetchTranscript = async (e) => {
    e.preventDefault();

    const v = validateUrl(url);
    if (!v.ok) {
      pushToast({ type: "error", title: "Gagal validasi", message: v.reason });
      return;
    }

    setLoading(true);
    setTranscript("");
    setCopied(false);

    try {
      const encodedUrl = encodeURIComponent(url.trim());
      const apiUrl = `https://x.0cd.fun/tools/yt-transcript?url=${encodedUrl}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data?.status && data?.data?.transcript) {
        const t = String(data.data.transcript);
        setTranscript(t);
        pushToast({ type: "success", title: "Berhasil", message: "Transkrip sudah dibuat." });

        saveTranscriptHistoryItem({
          id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
          ts: Date.now(),
          url: url.trim(),
          transcript: t,
          preview: t.slice(0, 220),
        });
      } else {
        pushToast({
          type: "error",
          title: "Gagal",
          message: data?.message || "Transkrip tidak tersedia untuk video ini.",
        });
      }
    } catch {
      pushToast({ type: "error", title: "Jaringan bermasalah", message: "API tidak dapat diakses." });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTranscript = async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      pushToast({ type: "success", title: "Tersalin", message: "Transkrip disalin.", duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      pushToast({ type: "error", title: "Gagal", message: "Clipboard ditolak." });
    }
  };

  const resetAll = () => {
    setTranscript("");
    setUrl("");
    setCopied(false);
    pushToast({ type: "info", title: "Reset", message: "Input dan hasil dibersihkan.", duration: 2000 });
  };

  const getModePrompt = (mode, textHasTs) => {
    if (mode === "clip") {
      return textHasTs
        ? `Tugas: bantu clipper bikin potongan konten dari transkrip.
Output WAJIB:
1) 10 kandidat clip (format: [Clip #] Timestamp start-end, Durasi (detik), Judul 4-7 kata, Hook 1 kalimat, Ringkas 2-3 bullet, Cut instruction 1 baris).
2) 5 judul Shorts/Reels/TikTok.
3) 10 caption pendek (<= 90 karakter) + 10 hashtag relevan.
Bahasa: Indonesia kasual. Fokus: punchline, insight, quote kuat.`
        : `Tugas: bantu clipper bikin potongan konten dari transkrip.
PENTING: transkrip ini tidak punya timestamp. Jangan bikin timestamp/perkiraan waktu sama sekali.
Output WAJIB:
1) 10 kandidat clip (format: [Clip #] Judul 4-7 kata, Durasi (detik) estimasi, Hook 1 kalimat, Ringkas 2-3 bullet, Cut instruction 1 baris).
2) 5 judul Shorts/Reels/TikTok.
3) 10 caption pendek (<= 90 karakter) + 10 hashtag relevan.
Bahasa: Indonesia kasual. Fokus: punchline, insight, quote kuat.`;
    }

    if (mode === "chapters") {
      return textHasTs
        ? `Tugas: bikin chapters + title pack.
Output:
- Chapters format: mm:ss Judul
- 3 opsi judul video panjang
- 3 opsi thumbnail text (2-4 kata)`
        : `Tugas: bikin struktur chapter tanpa waktu.
PENTING: transkrip ini tidak punya timestamp. Jangan bikin waktu/perkiraan waktu.
Output:
- Chapters format: (1) Judul, (2) Judul, dst (8-14 bagian)
- 3 opsi judul video panjang
- 3 opsi thumbnail text (2-4 kata)`;
    }

    if (mode === "summary") {
      return `Tugas: ringkas transkrip jadi struktur.
Output:
- TL;DR (3 kalimat)
- Outline (7-12 poin)
- 8 quote yang paling kuat (exact words)
- CTA yang cocok untuk penonton.`;
    }

    if (mode === "rewrite") {
      return `Tugas: ubah transkrip jadi naskah voiceover yang rapih tanpa ubah makna.
Output:
- Naskah paragraf pendek
- 5 opsi hook (1 kalimat)`;
    }

    return `Tugas: bantu clipper dari transkrip.`;
  };

  const buildClipperPrompt = (text, userCustom, mode) => {
    const textHasTs = hasTimestamps(text);
    const basePrompt = `Kamu adalah "Z-Clipper AI" untuk creator Indonesia.
Aturan:
- Jangan ngajarin teori.
- Jangan panjang-panjang.
- Kalau transkrip tidak punya timestamp: jangan bikin timestamp/perkiraan waktu.
- Jangan pakai emoji.`;

    const modePrompt = getModePrompt(mode, textHasTs);
    const custom = userCustom?.trim() ? `Instruksi tambahan:\n${userCustom.trim()}\n` : "";
    return `${basePrompt}\n\n${modePrompt}\n\n${custom}TRANSKRIP:\n${text}`;
  };

  const sendChat = async () => {
    const text = chatText.trim();
    if (!text) {
      pushToast({ type: "error", title: "Kosong", message: "Tempel transkrip di kolom chat." });
      return;
    }

    const prompt = buildClipperPrompt(text, chatCustomPrompt, chatMode);

    setChatText("");
    setChatSending(true);
    setChatMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const res = await fetch("https://api.codeteam.web.id/api/v1/gpt5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const msg = data?.data?.message || data?.message || "Gagal mendapat jawaban.";
      const out = String(msg);

      setChatMessages((prev) => [...prev, { role: "assistant", content: out }]);

      saveChatHistoryItem({
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        ts: Date.now(),
        mode: chatMode,
        custom: chatCustomPrompt || "",
        input: text,
        output: out,
        inputPreview: text.slice(0, 140),
        outputPreview: out.slice(0, 180),
      });
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Error: API tidak bisa diakses." }]);
    } finally {
      setChatSending(false);
    }
  };

  const clearChat = () => {
    setChatMessages([
      { role: "user", content: "Halo siapa kamu?" },
      {
        role: "assistant",
        content: "Aku adalah Z-Clipper AI yang dibuat oleh Zakrenz. Tempel transkrip, pilih mode output, aku bikinin hasil siap edit.",
      },
    ]);
    pushToast({ type: "info", title: "Clear", message: "Chat dibersihkan.", duration: 1600 });
  };

  const copyAssistantMessage = async (idx) => {
    const msg = chatMessages[idx];
    if (!msg || msg.role !== "assistant") return;
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopiedMsgId(idx);
      setTimeout(() => setCopiedMsgId(null), 1200);
    } catch {
      pushToast({ type: "error", title: "Gagal", message: "Clipboard ditolak." });
    }
  };

  const restoreChatHistoryItem = (item) => {
    const user = { role: "user", content: item.input || "" };
    const assistant = { role: "assistant", content: item.output || "" };
    setChatMessages([user, assistant]);
    setChatMode(item.mode || "clip");
    setChatCustomPrompt(item.custom || "");
    setHistoryOpen(false);
    setChatOpen(true);
    setTimeout(() => scrollChatToBottom(false), 50);
  };

  const restoreTranscriptHistoryItem = (item) => {
    setUrl(item.url || "");
    setTranscript(item.transcript || "");
    setCopied(false);
    setHistoryOpen(false);
    pushToast({ type: "success", title: "Dipulihkan", message: "Transkrip dimuat dari history.", duration: 1600 });
  };

  const copyText = async (t) => {
    try {
      await navigator.clipboard.writeText(t);
      pushToast({ type: "success", title: "Tersalin", message: "Disalin ke clipboard.", duration: 1600 });
    } catch {
      pushToast({ type: "error", title: "Gagal", message: "Clipboard ditolak." });
    }
  };

  const openHistory = () => {
    loadTranscriptHistory();
    loadChatHistory();
    setHistoryOpen(true);
  };

  const waHref = buildWaLink(ADMIN.waNumber, ADMIN.waText);
  const danaNumber = String(ADMIN.danaNumber || "").trim();

  return (
    <div
      className={`h-screen text-[#111111] font-sans selection:bg-[#111111] selection:text-white relative overflow-hidden transition-opacity duration-1000 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <style>{`
        @keyframes toastInSoft {
          0% { opacity: 0; transform: translate3d(0,-10px,0) scale(.985); filter: blur(8px); }
          70% { opacity: 1; transform: translate3d(0,0,0) scale(1); filter: blur(0); }
          100% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes toastOutSoft {
          0% { opacity: 1; transform: translate3d(0,0,0) scale(1); filter: blur(0); }
          100% { opacity: 0; transform: translate3d(0,-10px,0) scale(.985); filter: blur(8px); }
        }
        @keyframes toastBar {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB] via-[#F5F6F7] to-[#FFFFFF]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(0,0,0,0.06) 0, transparent 55%), radial-gradient(circle at 82% 16%, rgba(0,0,0,0.05) 0, transparent 50%), radial-gradient(circle at 70% 85%, rgba(0,0,0,0.04) 0, transparent 55%)",
          }}
        />
        <div className="absolute top-[-12%] left-[-12%] w-[28rem] h-[28rem] bg-gray-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-18 animate-pulse pointer-events-none" />
        <div
          className="absolute bottom-[-12%] right-[-12%] w-[30rem] h-[30rem] bg-gray-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-28 pointer-events-none"
          style={{ animation: "pulse 3s infinite alternate-reverse" }}
        />
      </div>

      <div className="fixed top-4 right-4 z-[60] w-[min(360px,calc(100vw-2rem))] space-y-2">
        {toasts.map((t) => {
          const s = toastStyles(t.type);
          return (
            <div
              key={t.id}
              className={[
                "relative overflow-hidden rounded-2xl",
                "backdrop-blur-xl shadow-[0_18px_44px_-26px_rgba(0,0,0,0.55)]",
                "will-change-transform",
                s.bg,
                s.ring,
              ].join(" ")}
              style={{
                animation: reduceMotion
                  ? "none"
                  : t.leaving
                  ? "toastOutSoft 650ms cubic-bezier(.22,1,.36,1) forwards"
                  : "toastInSoft 900ms cubic-bezier(.22,1,.36,1) forwards",
              }}
              role="status"
              aria-live="polite"
            >
              <button
                onClick={() => dismissToast(t.id)}
                className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-xl text-gray-600/80 hover:text-gray-900 hover:bg-black/5 active:scale-95 transition"
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label="Tutup"
              >
                <span className="text-lg leading-none">×</span>
              </button>

              <div className="flex gap-3 p-4 pr-10">
                <div className={["h-9 w-9 rounded-xl grid place-items-center shrink-0", s.iconWrap].join(" ")}>
                  <ToastIcon type={t.type} />
                </div>
                <div className="min-w-0">
                  <div className={["text-sm font-extrabold tracking-tight", s.text].join(" ")}>{t.title}</div>
                  <div className={["text-sm font-medium leading-snug mt-0.5", s.sub].join(" ")}>{t.message}</div>
                </div>
              </div>

              <div className="h-[3px] w-full bg-black/5">
                <div className={["h-full origin-left", s.bar].join(" ")} style={{ animation: reduceMotion ? "none" : `toastBar ${t.duration}ms linear forwards` }} />
              </div>
            </div>
          );
        })}
      </div>

      <header className="fixed top-0 left-0 right-0 z-30 bg-[#FBFBFB]/55 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={resetAll}>
            <div className="bg-[#111111] text-white p-2 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-black/10">
              <Youtube size={20} strokeWidth={2.5} className="group-hover:text-red-500 transition-colors duration-300" />
            </div>
            <h1 className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">YT Transcript</h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100/70 px-3 py-1.5 rounded-full border border-gray-200/70 cursor-default hover:bg-gray-200/70 transition-colors shadow-sm">
            <Zap size={14} className="text-yellow-500 fill-yellow-500 animate-pulse" />
            <span className="hidden sm:inline">AI Powered</span>
            <span className="sm:hidden">FREE</span>
          </div>
        </div>
      </header>

      <main className="fixed left-0 right-0 top-16 bottom-[72px] z-10 overflow-y-auto overscroll-contain">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <section className={`w-full text-center space-y-8 transition-all duration-700 ${isMounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-gray-200/70 shadow-sm text-sm font-medium text-gray-700 mb-2 hover:shadow-md transition-shadow cursor-default animate-bounce" style={{ animationDuration: "3s" }}>
                <Sparkles size={16} className="text-gray-900" />
                Ekstrak otomatis dengan AI
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] leading-tight drop-shadow-sm">
                Dapatkan Transkrip Video <br className="hidden sm:block" /> dalam{" "}
                <span className="relative inline-block mt-1 sm:mt-0">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Hitungan Detik</span>
                  <svg className="absolute -bottom-3 sm:-bottom-4 left-0 w-full h-4 sm:h-5 text-neutral-900/30" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <path ref={underlineRef} d="M4 15c30-2 70-5 110-5s60 2 82 5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h2>

              <p className="text-gray-700/80 max-w-xl mx-auto text-base sm:text-lg">
                Tempelkan tautan video YouTube di bawah ini untuk mengekstrak seluruh teks percakapan menggunakan API secara kilat.
              </p>
            </div>

            <form
              onSubmit={fetchTranscript}
              className="max-w-2xl mx-auto relative flex flex-col sm:flex-row gap-3 p-2 bg-white/80 rounded-2xl sm:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/70 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:ring-4 focus-within:ring-black/5 focus-within:border-gray-300"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="relative flex-grow flex items-center">
                <div className="absolute left-5 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 transition-colors duration-300 ${url ? "text-gray-900" : "text-gray-400"}`} />
                </div>

                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="masukan tautan youtube disini..."
                  className="block w-full pl-14 pr-4 py-4 sm:py-0 bg-transparent text-sm sm:text-base placeholder-gray-400 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-all"
                  style={{ WebkitTapHighlightColor: "transparent", WebkitAppearance: "none", appearance: "none" }}
                  disabled={loading}
                  inputMode="url"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 py-4 px-8 font-semibold rounded-xl sm:rounded-full text-white bg-[#111111] hover:bg-[#222222] active:bg-black hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10" />
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                    <span className="relative z-10">Memproses...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Ekstrak</span>
                    <Sparkles className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </section>

          <div className={`w-full max-w-3xl mx-auto mt-10 transition-all duration-700 ease-out transform origin-top ${transcript ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95 pointer-events-none"}`}>
            <section className="bg-white/85 border border-gray-200/70 rounded-3xl shadow-[0_20px_44px_-18px_rgba(0,0,0,0.08)] overflow-hidden backdrop-blur">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-200/70 bg-gradient-to-b from-gray-50/80 to-white/70">
                <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
                  <div className="p-1.5 bg-gray-100 rounded-lg text-gray-700">
                    <FileText size={18} />
                  </div>
                  Hasil Transkrip
                </h3>

                <button
                  onClick={handleCopyTranscript}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border transition-all duration-200 active:scale-95 ${
                    copied ? "bg-gray-900 border-gray-900 text-white shadow-sm" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  disabled={!transcript}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Salin Teks</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-10 bg-gradient-to-b from-white/85 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 z-10 bg-gradient-to-t from-white/85 to-transparent" />

                <div className="p-6 sm:p-8 bg-white/60">
                  <div className="max-h-[340px] overflow-y-auto pr-4 prose prose-sm sm:prose-base max-w-none text-gray-900 leading-relaxed whitespace-pre-wrap font-medium">
                    {transcript}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/70 bg-white/55 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <Youtube size={16} className="text-gray-400" />
            <span>&copy; {new Date().getFullYear()} ZakrenzModder.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
            <a href={ADMIN.githubLink} className="hover:text-[#111111] transition-colors flex items-center gap-1.5 group">
              <Github size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a href={ADMIN.tiktokLink} className="hover:text-[#111111] transition-colors flex items-center gap-1.5 group">
              <TikTokIcon size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">TikTok</span>
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-[92px] right-4 z-[70] flex items-center gap-2">
        <button
          onClick={() => setContactOpen(true)}
          className="h-12 w-12 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-xl shadow-black/10 grid place-items-center hover:bg-gray-50 active:scale-95 transition"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label="Hubungi admin"
        >
          <MessageCircle size={20} />
        </button>

        <button
          onClick={() => {
            openHistory();
            setHistoryType("transcript");
          }}
          className="h-12 w-12 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-xl shadow-black/10 grid place-items-center hover:bg-gray-50 active:scale-95 transition"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label="History"
        >
          <History size={20} />
        </button>

        <button
          onClick={() => setAboutOpen(true)}
          className="h-12 w-12 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-xl shadow-black/10 grid place-items-center hover:bg-gray-50 active:scale-95 transition"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label="About"
        >
          <InfoIcon size={20} />
        </button>

        <button
          onClick={() => setChatOpen((v) => !v)}
          className="h-12 w-12 rounded-2xl bg-[#111111] text-white shadow-xl shadow-black/20 grid place-items-center hover:bg-[#1f1f1f] active:scale-95 transition"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label="Chat AI"
        >
          {chatOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      <DialogShell open={aboutOpen} onClose={() => setAboutOpen(false)} title="About Z-Clipper" subtitle="Untuk para clipper" icon={<Wand2 size={18} />}>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
            <img src={imgZakrenz} alt="Zakrenz" className="w-full h-full object-cover" draggable={false} />
          </div>
          <div className="min-w-0">
            <div className="text-base font-extrabold text-gray-900">Z-Clipper AI</div>
            <div className="text-sm font-semibold text-gray-600 leading-snug">Clip ideas, chapters, summary, rewrite. Output siap edit.</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-extrabold text-gray-900">Cara pakai cepat</div>
          <ul className="mt-2 space-y-1.5 text-sm font-semibold text-gray-700">
            <li>1) Tempel transkrip ke kolom chat.</li>
            <li>2) Pilih mode output.</li>
            <li>3) Tambah instruksi (opsional), kirim.</li>
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-500">© {new Date().getFullYear()} Zakrenz</div>
          <button
            onClick={() => setAboutOpen(false)}
            className="px-4 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            Oke
          </button>
        </div>
      </DialogShell>

      <DialogShell open={historyOpen} onClose={() => setHistoryOpen(false)} title="History" subtitle="Transkrip + Chat AI" icon={<History size={18} />} widthClass="max-w-[680px]">
        <div className="grid grid-cols-1 gap-3">
          <CustomSelect
            value={historyType}
            onChange={setHistoryType}
            options={[
              { value: "transcript", label: "History Transkrip" },
              { value: "chat", label: "History Chat AI" },
            ]}
          />

          {historyType === "transcript" ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-bold text-gray-700">
                  Tersimpan: <span className="text-gray-900">{transcriptHistory.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadTranscriptHistory}
                    className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm font-extrabold hover:bg-gray-50 active:scale-95 transition"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    Refresh
                  </button>
                  <button
                    onClick={clearTranscriptHistory}
                    className="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    Hapus semua
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="max-h-[460px] overflow-y-auto bg-white">
                  {transcriptHistory.length === 0 ? (
                    <div className="p-4 text-sm font-semibold text-gray-600">Belum ada history transkrip.</div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {transcriptHistory.map((it) => (
                        <div key={it.id} className="p-4 hover:bg-gray-50 transition">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-500">{new Date(it.ts).toLocaleString("id-ID")}</div>
                              <div className="mt-1 text-sm font-extrabold text-gray-900 truncate">{it.url || "-"}</div>
                              <div className="mt-2 text-sm font-semibold text-gray-700 whitespace-pre-wrap">{it.preview || ""}</div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => restoreTranscriptHistoryItem(it)}
                                className="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
                                style={{ WebkitTapHighlightColor: "transparent" }}
                              >
                                Buka
                              </button>
                              <button
                                onClick={() => copyText(it.transcript || "")}
                                className="h-10 w-10 rounded-2xl border border-gray-200 bg-white grid place-items-center text-gray-800 hover:bg-gray-50 active:scale-95 transition"
                                style={{ WebkitTapHighlightColor: "transparent" }}
                                aria-label="Salin transkrip"
                              >
                                <Copy size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-bold text-gray-700">
                  Tersimpan: <span className="text-gray-900">{chatHistory.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadChatHistory}
                    className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm font-extrabold hover:bg-gray-50 active:scale-95 transition"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    Refresh
                  </button>
                  <button
                    onClick={clearChatHistory}
                    className="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    Hapus semua
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="max-h-[460px] overflow-y-auto bg-white">
                  {chatHistory.length === 0 ? (
                    <div className="p-4 text-sm font-semibold text-gray-600">Belum ada history chat.</div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {chatHistory.map((it) => (
                        <div key={it.id} className="p-4 hover:bg-gray-50 transition">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-500">
                                {new Date(it.ts).toLocaleString("id-ID")} • <span className="text-gray-700">{String(it.mode || "clip")}</span>
                              </div>
                              <div className="mt-2 text-sm font-extrabold text-gray-900 truncate">{it.outputPreview || "(tanpa output)"}</div>
                              <div className="mt-1 text-sm font-semibold text-gray-600">{it.inputPreview || "(tanpa input)"}</div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => restoreChatHistoryItem(it)}
                                className="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
                                style={{ WebkitTapHighlightColor: "transparent" }}
                              >
                                Buka
                              </button>
                              <button
                                onClick={() => copyText(it.output || "")}
                                className="h-10 w-10 rounded-2xl border border-gray-200 bg-white grid place-items-center text-gray-800 hover:bg-gray-50 active:scale-95 transition"
                                style={{ WebkitTapHighlightColor: "transparent" }}
                                aria-label="Salin output"
                              >
                                <Copy size={16} />
                              </button>
                            </div>
                          </div>

                          {it.custom?.trim() ? (
                            <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-3">
                              <div className="text-xs font-extrabold text-gray-700">Instruksi tambahan</div>
                              <div className="mt-1 text-sm font-semibold text-gray-700 whitespace-pre-wrap">{it.custom}</div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-end">
            <button
              onClick={() => setHistoryOpen(false)}
              className="px-4 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Tutup
            </button>
          </div>
        </div>
      </DialogShell>

      <DialogShell open={contactOpen} onClose={() => setContactOpen(false)} title="Hubungi Admin" subtitle="WhatsApp • Sosial • Donasi (DANA)" icon={<Headset size={18} />} widthClass="max-w-[520px]">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-extrabold text-gray-900">Kontak</div>
          <div className="mt-3 grid grid-cols-1 gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white flex items-center justify-between gap-3 hover:bg-gray-50 active:scale-[0.99] transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <MessageCircle size={16} className="text-gray-900" /> WhatsApp
                </div>
                <div className="text-xs font-bold text-gray-500 truncate">Chat admin</div>
              </div>
              <ExternalLink size={16} className="text-gray-700" />
            </a>

            <a
              href={ADMIN.tiktokLink}
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white flex items-center justify-between gap-3 hover:bg-gray-50 active:scale-[0.99] transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <TikTokIcon size={14} className="text-gray-900" /> TikTok
                </div>
                <div className="text-xs font-bold text-gray-500 truncate">{ADMIN.tiktokLink}</div>
              </div>
              <ExternalLink size={16} className="text-gray-700" />
            </a>

            <a
              href={ADMIN.githubLink}
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white flex items-center justify-between gap-3 hover:bg-gray-50 active:scale-[0.99] transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <Github size={16} className="text-gray-900" /> GitHub
                </div>
                <div className="text-xs font-bold text-gray-500 truncate">{ADMIN.githubLink}</div>
              </div>
              <ExternalLink size={16} className="text-gray-700" />
            </a>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Wallet size={16} className="text-gray-900" /> {ADMIN.donateLabel}
            </div>
            <CreditCard size={16} className="text-gray-700" />
          </div>

          <div className="mt-2 text-sm font-semibold text-gray-600 leading-snug">Nomor DANA:</div>
          <div className="mt-1 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-extrabold text-gray-900 flex items-center justify-between gap-2">
            <span className="truncate">{danaNumber || "-"}</span>
            <Phone size={16} className="text-gray-600" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => copyText(danaNumber)}
              className={`flex-1 px-4 py-3 rounded-2xl bg-gray-900 text-white text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-black active:scale-[0.99] transition ${
                danaNumber ? "" : "opacity-60 pointer-events-none"
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Salin nomor DANA <Copy size={16} />
            </button>
            <a
              href="https://link.dana.id/"
              target="_blank"
              rel="noreferrer"
              className="h-12 w-12 rounded-2xl border border-gray-200 bg-white grid place-items-center text-gray-800 hover:bg-gray-50 active:scale-95 transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Buka DANA"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="mt-2 text-[11px] font-bold text-gray-500">Buka DANA → Send → Send to a Friend → paste nomor.</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-500">© {new Date().getFullYear()} Zakrenz</div>
          <button
            onClick={() => setContactOpen(false)}
            className="px-4 py-2 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            Oke
          </button>
        </div>
      </DialogShell>

      <div
        className={[
          "fixed bottom-[152px] right-4 z-[70]",
          "w-[min(390px,calc(100vw-2rem))]",
          "transition-all duration-500",
          chatOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
        ].join(" ")}
      >
        <div className="rounded-3xl overflow-hidden border border-gray-200 bg-[#FFFFFF] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
          <div className="px-4 py-3.5 border-b border-gray-200 bg-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center">
                <Wand2 size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-gray-900 leading-tight">Z-Clipper AI</div>
                <div className="text-xs font-semibold text-gray-500 leading-tight">Chat khusus transkrip</div>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="h-9 w-9 rounded-2xl grid place-items-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:scale-95 transition"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Hapus chat"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="px-4 pt-3 pb-3 grid grid-cols-1 gap-2 border-b border-gray-200 bg-[#FFFFFF]">
            <CustomSelect
              value={chatMode}
              onChange={setChatMode}
              options={[
                { value: "clip", label: "Clip ideas" },
                { value: "chapters", label: "Chapters" },
                { value: "summary", label: "Summary + quotes" },
                { value: "rewrite", label: "Rewrite script" },
              ]}
              disabled={chatSending}
            />

            <textarea
              value={chatCustomPrompt}
              onChange={(e) => setChatCustomPrompt(e.target.value)}
              placeholder="Instruksi tambahan (opsional)."
              className="w-full min-h-[56px] max-h-[110px] rounded-2xl bg-[#FFFFFF] border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 outline-none resize-none"
              style={{ WebkitTapHighlightColor: "transparent", WebkitAppearance: "none", appearance: "none" }}
              disabled={chatSending}
            />
          </div>

          <div className="relative border-b border-gray-200 bg-[#FFFFFF]">
            <div ref={chatListRef} className="max-h-[250px] overflow-y-auto px-4 py-3 space-y-2">
              {chatMessages.map((m, idx) => {
                const isUser = m.role === "user";
                const isAssistant = m.role === "assistant";

                return (
                  <div key={idx} className={["w-full flex", isUser ? "justify-end" : "justify-start"].join(" ")}>
                    <div
                      className={[
                        "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm font-medium leading-relaxed whitespace-pre-wrap",
                        isUser ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-900",
                      ].join(" ")}
                    >
                      <div>{m.content}</div>

                      {isAssistant && (
                        <div className="pt-2 mt-2 border-t border-gray-200 flex items-center justify-end">
                          <button
                            onClick={() => copyAssistantMessage(idx)}
                            className="h-9 w-9 rounded-2xl grid place-items-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:scale-95 transition"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            aria-label="Salin pesan"
                          >
                            {copiedMsgId === idx ? <Check size={18} /> : <Copy size={18} />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {chatSending && (
                <div className="w-full flex justify-start">
                  <div className="max-w-[86%] rounded-2xl px-3.5 py-2.5 bg-white border border-gray-200">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-3 bg-[#FFFFFF]">
            <div className="flex items-end gap-2">
              <textarea
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Kirim Pesan..."
                className="flex-1 min-h-[44px] max-h-[120px] rounded-2xl bg-[#FFFFFF] border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 outline-none resize-none"
                style={{ WebkitTapHighlightColor: "transparent", WebkitAppearance: "none", appearance: "none" }}
                disabled={chatSending}
              />

              <button
                onClick={() => setChatText("")}
                disabled={chatSending || !chatText}
                className="h-[44px] w-[44px] rounded-2xl border border-gray-200 bg-white text-gray-800 grid place-items-center hover:bg-gray-50 active:scale-95 transition disabled:opacity-50"
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label="Hapus teks input"
              >
                <X size={18} />
              </button>

              <button
                onClick={sendChat}
                disabled={chatSending}
                className="h-[44px] w-[44px] rounded-2xl bg-gray-900 text-white grid place-items-center hover:bg-black active:scale-95 transition disabled:opacity-60"
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label="Kirim"
              >
                {chatSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>

            <div className="mt-2 text-[11px] font-bold text-gray-500">&copy; {new Date().getFullYear()} ZakrenzSoci£ty.</div>
          </div>
        </div>
      </div>
    </div>
  );
}