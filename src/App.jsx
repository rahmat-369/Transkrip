import React, { useEffect, useMemo, useRef, useState } from "react";
import { Youtube, Search, Copy, Check, Loader2, Sparkles, FileText, Zap, Github, CheckCircle2, XCircle, Info, MessageCircle, Send, X, Wand2, Trash2, ChevronDown, Info as InfoIcon, History, Headset, ExternalLink, Menu, Link as LinkIcon, Bot, Brain, TrendingUp, Globe } from "lucide-react";

function TikTokIcon({ size = 16, className = "" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M16.7 3c.5 2.8 2.3 4.7 5.3 5v3.2c-2 0-3.7-.6-5.3-1.7v7.2c0 4-3.3 7.3-7.3 7.3S2 20.7 2 16.7 5.3 9.4 9.3 9.4c.4 0 .8 0 1.2.1v3.5c-.4-.1-.8-.2-1.2-.2-2 0-3.9 1.7-3.9 3.9s1.7 3.9 3.9 3.9 3.9-1.6 3.9-3.9V3h3.5z" /></svg>);
}
function TelegramIcon({ size = 16, className = "" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>);
}
function ToastIcon({ type }) {
  if (type === "success") return <CheckCircle2 size={18} />;
  if (type === "error") return <XCircle size={18} />;
  return <Info size={18} />;
}
function toastStyles(type) {
  if (type === "success") return { ring: "ring-1 ring-emerald-200/70", bg: "bg-emerald-50/75", text: "text-emerald-950", sub: "text-emerald-900/70", iconWrap: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" };
  if (type === "error") return { ring: "ring-1 ring-red-200/70", bg: "bg-red-50/75", text: "text-red-950", sub: "text-red-900/70", iconWrap: "bg-red-100 text-red-700", bar: "bg-red-500" };
  return { ring: "ring-1 ring-gray-200/70", bg: "bg-white/70", text: "text-gray-950", sub: "text-gray-700/70", iconWrap: "bg-gray-100 text-gray-700", bar: "bg-gray-900" };
}
function isValidHttpsUrl(raw) { try { const u = new URL(raw); return u.protocol === "https:"; } catch { return false; } }
function isYouTubeUrl(raw) {
  try { const u = new URL(raw); const host = u.hostname.replace(/^www\./, "").toLowerCase(); const allowed = new Set(["youtube.com", "m.youtube.com", "youtu.be", "music.youtube.com"]); return [...allowed].some((d) => host === d); } catch { return false; }
}
function hasTimestamps(text) { return /\b\d{1,2}:\d{2}\b/.test(text || ""); }
function CustomSelect({ value, onChange, options, disabled = false }) {
  const [open, setOpen] = useState(false); const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (!ref.current) return; if (!ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("touchstart", onDoc, { passive: true });
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("touchstart", onDoc); };
  }, []);
  const current = options.find((o) => o.value === value) || options[0];
  return (
    <div ref={ref} className="relative z-[110]">
      <button type="button" disabled={disabled} onClick={() => setOpen((v) => !v)} className="w-full h-11 rounded-2xl bg-[#FFFFFF] border border-gray-200 px-3 text-sm font-extrabold text-gray-900 flex items-center justify-between gap-2 hover:bg-gray-50 transition disabled:opacity-60" style={{ WebkitTapHighlightColor: "transparent" }}>
        <span className="truncate">{current?.label}</span> <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      <div className={["absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-[#FFFFFF] shadow-[0_18px_40px_-26px_rgba(0,0,0,0.35)]", "transition-all duration-200", open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"].join(" ")} style={{ zIndex: 120 }}>
        <div className="p-1">
          {options.map((o) => {
            const active = o.value === value;
            return (<button key={o.value} type="button" onClick={() => { onChange(o.value); setOpen(false); }} className={["w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition", active ? "bg-gray-900 text-white" : "text-gray-800 hover:bg-gray-50"].join(" ")} style={{ WebkitTapHighlightColor: "transparent" }}>{o.label}</button>);
          })}
        </div>
      </div>
    </div>
  );
}
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-0.5">
      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}
function SkeletonLoader() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-full w-full"></div>
      <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded-full w-4/5"></div>
    </div>
  );
}
function DialogShell({ open, onClose, title, subtitle, icon, children, widthClass = "max-w-[420px]" }) {
  useEffect(() => { const onKey = (e) => { if (e.key === "Escape") onClose(); }; if (!open) return; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [open, onClose]);
  return (
    <div className={["fixed inset-0 z-[95] transition-all duration-300", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"].join(" ")}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4">
        <div className={["w-full", widthClass, "rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl transform transition-all duration-300", open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.96]"].join(" ")} role="dialog" aria-modal="true">
          <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-2xl bg-gray-900 text-white grid place-items-center">{icon}</div><div className="min-w-0"><div className="text-sm font-extrabold text-gray-900 leading-tight">{title}</div><div className="text-xs font-semibold text-gray-500 leading-tight">{subtitle}</div></div></div>
            <button onClick={onClose} className="h-10 w-10 rounded-2xl grid place-items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition" style={{ WebkitTapHighlightColor: "transparent" }}><X size={18} /></button>
          </div>
          <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">{children}</div>
        </div>
      </div>
    </div>
  );
}
function safeJsonParse(raw, fallback) { try { const v = JSON.parse(raw); return v ?? fallback; } catch { return fallback; } }

export default function App() {
  const imgDevProfile = "/image/rhmt-icon.png";
  const clickSfx = "https://files.catbox.moe/tk3jff.mp3";
  const ADMIN = { waLink: "https://chat.whatsapp.com/IfWRoOW9H4HAHj689XKH4M?mode=hqctcla", telegramLink: "https://t.me/rAi_engine", tiktokLink: "https://www.tiktok.com/@r_hmtofc?_r=1&_t=ZS-94KRfWQjeUu", githubLink: "https://github.com/rahmat-369" };
  const HISTORY_KEYS = { transcript: "zclip_history_transcript", chat: "zclip_history_chat" };

  const [url, setUrl] = useState(""); const [transcript, setTranscript] = useState(""); const [loading, setLoading] = useState(false); const [copied, setCopied] = useState(false); const [isMounted, setIsMounted] = useState(false);
  const [fabOpen, setFabOpen] = useState(false); const [toasts, setToasts] = useState([]); const toastTimers = useRef(new Map());
  const reduceMotion = useMemo(() => { if (typeof window === "undefined") return false; return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false; }, []);
  const underlineRef = useRef(null); const underlineInitOnce = useRef(false);
  const [chatOpen, setChatOpen] = useState(false); const [chatMode, setChatMode] = useState("clip"); const [chatCustomPrompt, setChatCustomPrompt] = useState(""); const [chatText, setChatText] = useState(""); const [chatSending, setChatSending] = useState(false); const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false); const [historyOpen, setHistoryOpen] = useState(false); const [historyType, setHistoryType] = useState("transcript"); const [contactOpen, setContactOpen] = useState(false);
  const [transcriptHistory, setTranscriptHistory] = useState([]); const [chatHistory, setChatHistory] = useState([]);
  const [chatMessages, setChatMessages] = useState([{ role: "user", content: "Halo siapa kamu?" }, { role: "assistant", content: "Aku adalah AI asisten yang dikembangkan oleh R_hmt ofc. Tempel transkrip, pilih mode output, aku bikinin hasil siap edit." }]);
  const chatListRef = useRef(null); const clickAudioRef = useRef(null);

  // Scroll Lock mechanism to prevent double scrolling on mobile
  useEffect(() => {
    if (chatOpen || historyOpen || aboutOpen || contactOpen || fabOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [chatOpen, historyOpen, aboutOpen, contactOpen, fabOpen]);

  useEffect(() => { const t = requestAnimationFrame(() => setIsMounted(true)); return () => cancelAnimationFrame(t); }, []);
  useEffect(() => {
    const a = new Audio(clickSfx); a.preload = "auto"; a.volume = 0.6; a.crossOrigin = "anonymous"; clickAudioRef.current = a;
    const onAnyClick = (e) => { const target = e.target; if (!target) return; const isBtn = target.closest?.("button"); const isLink = target.closest?.("a"); if (!isBtn && !isLink) return; const audio = clickAudioRef.current; if (!audio) return; try { audio.currentTime = 0; audio.play().catch(() => {}); } catch {} };
    document.addEventListener("click", onAnyClick, true); return () => document.removeEventListener("click", onAnyClick, true);
  }, [clickSfx]);
  useEffect(() => {
    if (!underlineRef.current || underlineInitOnce.current) return;
    underlineInitOnce.current = true; const el = underlineRef.current; const length = el.getTotalLength();
    el.style.opacity = "0"; el.style.strokeDasharray = String(length); el.style.strokeDashoffset = String(length); el.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1), opacity 450ms ease";
    requestAnimationFrame(() => { el.style.opacity = "1"; el.style.strokeDashoffset = "0"; });
  }, [isMounted]);

  const scrollChatToBottom = (smooth = true) => { const node = chatListRef.current; if (!node) return; requestAnimationFrame(() => { node.scrollTo({ top: node.scrollHeight, behavior: smooth ? "smooth" : "auto" }); }); };
  useEffect(() => { if (!chatOpen) return; setTimeout(() => scrollChatToBottom(false), 50); }, [chatOpen]);
  useEffect(() => { if (!chatOpen) return; scrollChatToBottom(true); }, [chatMessages.length, chatSending, chatOpen]);

  const dismissToast = (id) => { setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))); const timer = setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); toastTimers.current.delete(id); }, reduceMotion ? 0 : 650); toastTimers.current.set(id, timer); };
  const pushToast = ({ type = "info", title, message, duration = 3200 }) => { const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`; setToasts((prev) => [{ id, type, title, message, leaving: false, duration }, ...prev].slice(0, 4)); const timer = setTimeout(() => dismissToast(id), duration); toastTimers.current.set(id, timer); };
  
  const loadTranscriptHistory = () => { const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.transcript) || "[]", []); setTranscriptHistory(Array.isArray(items) ? items.slice(0, 50) : []); };
  const loadChatHistory = () => { const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.chat) || "[]", []); setChatHistory(Array.isArray(items) ? items.slice(0, 50) : []); };
  useEffect(() => { loadTranscriptHistory(); loadChatHistory(); }, []);

  const saveTranscriptHistoryItem = (item) => { const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.transcript) || "[]", []); const arr = Array.isArray(items) ? items : []; const next = [item, ...arr].slice(0, 50); localStorage.setItem(HISTORY_KEYS.transcript, JSON.stringify(next)); setTranscriptHistory(next); };
  const saveChatHistoryItem = (item) => { const items = safeJsonParse(localStorage.getItem(HISTORY_KEYS.chat) || "[]", []); const arr = Array.isArray(items) ? items : []; const next = [item, ...arr].slice(0, 50); localStorage.setItem(HISTORY_KEYS.chat, JSON.stringify(next)); setChatHistory(next); };
  const clearTranscriptHistory = () => { localStorage.removeItem(HISTORY_KEYS.transcript); setTranscriptHistory([]); pushToast({ type: "info", title: "History", message: "History transkrip dihapus.", duration: 1600 }); };
  const clearChatHistory = () => { localStorage.removeItem(HISTORY_KEYS.chat); setChatHistory([]); pushToast({ type: "info", title: "History", message: "History chat dihapus.", duration: 1600 }); };

  const fetchTranscript = async (e) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) { pushToast({ type: "error", title: "Gagal", message: "URL kosong" }); return; }
    if (!isValidHttpsUrl(trimmed) || !isYouTubeUrl(trimmed)) { pushToast({ type: "error", title: "Gagal", message: "Hanya support URL YouTube" }); return; }

    setLoading(true); setTranscript(""); setCopied(false);
    try {
      const encodedUrl = encodeURIComponent(trimmed);
      const res = await fetch(`https://x.0cd.fun/tools/yt-transcript?url=${encodedUrl}`);
      const data = await res.json();
      if (data?.status && data?.data?.transcript) {
        const t = String(data.data.transcript); setTranscript(t); pushToast({ type: "success", title: "Berhasil", message: "Transkrip sudah dibuat." });
        saveTranscriptHistoryItem({ id: `${Date.now()}_${Math.random().toString(16).slice(2)}`, ts: Date.now(), url: trimmed, transcript: t, preview: t.slice(0, 220) });
      } else { pushToast({ type: "error", title: "Gagal", message: data?.message || "Transkrip tidak tersedia." }); }
    } catch { pushToast({ type: "error", title: "Gagal", message: "API tidak dapat diakses." }); } finally { setLoading(false); }
  };

  const handleCopyTranscript = async () => {
    if (!transcript) return;
    try { await navigator.clipboard.writeText(transcript); setCopied(true); pushToast({ type: "success", title: "Tersalin", message: "Transkrip disalin.", duration: 2000 }); setTimeout(() => setCopied(false), 2000); }
    catch { pushToast({ type: "error", title: "Gagal", message: "Clipboard ditolak." }); }
  };
  const resetAll = () => { setTranscript(""); setUrl(""); setCopied(false); pushToast({ type: "info", title: "Reset", message: "Input dibersihkan.", duration: 2000 }); };

  const buildClipperPrompt = (text, userCustom, mode) => {
    const textHasTs = hasTimestamps(text);
    const modePrompt = mode === "clip" ? (textHasTs ? `Tugas: 1) 10 kandidat clip (Timestamp start-end, Durasi, Judul, Hook, Ringkas). 2) 5 judul Shorts. 3) 10 caption + hashtag. B. Indonesia.` : `Tugas: PENTING: Jangan bikin timestamp. 1) 10 kandidat clip (Judul, Durasi, Hook, Ringkas). 2) 5 judul Shorts. 3) 10 caption. B. Indonesia.`) : mode === "chapters" ? (textHasTs ? `Tugas: bikin chapters mm:ss Judul, 3 opsi judul, 3 opsi thumbnail.` : `Tugas: bikin chapters (1) Judul, (2) Judul. Jangan bikin waktu.`) : mode === "summary" ? `Tugas: ringkas TL;DR, Outline, 8 quote kuat, CTA.` : `Tugas: ubah transkrip jadi naskah voiceover paragraf pendek, 5 opsi hook.`;
    return `Kamu adalah asisten AI creator Indonesia.\n${modePrompt}\n\n${userCustom?.trim() ? `Instruksi tambahan:\n${userCustom.trim()}\n` : ""}TRANSKRIP:\n${text}`;
  };

  const sendChat = async () => {
    const text = chatText.trim(); if (!text) { pushToast({ type: "error", title: "Kosong", message: "Tempel transkrip ke kolom chat." }); return; }
    const prompt = buildClipperPrompt(text, chatCustomPrompt, chatMode);
    setChatText(""); setChatSending(true); setChatMessages((prev) => [...prev, { role: "user", content: text }]);
    try {
      const res = await fetch("https://api.codeteam.web.id/api/v1/gpt5", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const data = await res.json(); const msg = data?.data?.message || data?.message || "Gagal mendapat jawaban."; const out = String(msg);
      setChatMessages((prev) => [...prev, { role: "assistant", content: out }]);
      saveChatHistoryItem({ id: `${Date.now()}_${Math.random().toString(16).slice(2)}`, ts: Date.now(), mode: chatMode, custom: chatCustomPrompt || "", input: text, output: out, inputPreview: text.slice(0, 140), outputPreview: out.slice(0, 180) });
    } catch { setChatMessages((prev) => [...prev, { role: "assistant", content: "Error: API terganggu." }]); } finally { setChatSending(false); }
  };
  const clearChat = () => { setChatMessages([{ role: "user", content: "Halo siapa kamu?" }, { role: "assistant", content: "Aku adalah AI asisten R_hmt ofc. Tempel transkrip ke sini." }]); pushToast({ type: "info", title: "Clear", message: "Chat dibersihkan.", duration: 1600 }); };
  const copyAssistantMessage = async (idx) => { const msg = chatMessages[idx]; if (!msg || msg.role !== "assistant") return; try { await navigator.clipboard.writeText(msg.content); setCopiedMsgId(idx); setTimeout(() => setCopiedMsgId(null), 1200); } catch { pushToast({ type: "error", title: "Gagal", message: "Clipboard ditolak." }); } };
  const restoreChatHistoryItem = (item) => { setChatMessages([{ role: "user", content: item.input || "" }, { role: "assistant", content: item.output || "" }]); setChatMode(item.mode || "clip"); setChatCustomPrompt(item.custom || ""); setHistoryOpen(false); setChatOpen(true); setFabOpen(false); setTimeout(() => scrollChatToBottom(false), 50); };
  const restoreTranscriptHistoryItem = (item) => { setUrl(item.url || ""); setTranscript(item.transcript || ""); setCopied(false); setHistoryOpen(false); pushToast({ type: "success", title: "Dipulihkan", message: "Transkrip dimuat.", duration: 1600 }); };
  const copyText = async (t) => { try { await navigator.clipboard.writeText(t); pushToast({ type: "success", title: "Tersalin", message: "Tersalin ke clipboard.", duration: 1600 }); } catch { pushToast({ type: "error", title: "Gagal", message: "Clipboard ditolak." }); } };
  const openHistory = () => { loadTranscriptHistory(); loadChatHistory(); setHistoryOpen(true); setFabOpen(false); };

  return (
    <div className={`min-h-[100dvh] flex flex-col text-[#111111] font-sans selection:bg-indigo-500/30 selection:text-indigo-900 relative transition-opacity duration-1000 ${isMounted ? "opacity-100" : "opacity-0"}`} style={{ WebkitTapHighlightColor: "transparent" }}>
      <style>{`
        @keyframes toastInSoft { 0% { opacity: 0; transform: translate3d(0,-10px,0) scale(.985); filter: blur(8px); } 70% { opacity: 1; transform: translate3d(0,0,0) scale(1); filter: blur(0); } 100% { opacity: 1; transform: translate3d(0,0,0) scale(1); } }
        @keyframes toastOutSoft { 0% { opacity: 1; transform: translate3d(0,0,0) scale(1); filter: blur(0); } 100% { opacity: 0; transform: translate3d(0,-10px,0) scale(.985); filter: blur(8px); } }
        @keyframes toastBar { 0% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
      `}</style>

      {/* Optimized Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#FBFBFB]" />
        <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-br from-indigo-50/70 via-white/20 to-transparent" />
      </div>

      <div className="fixed top-4 right-4 z-[90] w-[min(360px,calc(100vw-2rem))] space-y-2">
        {toasts.map((t) => {
          const s = toastStyles(t.type);
          return (
            <div key={t.id} className={["relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_18px_44px_-26px_rgba(0,0,0,0.55)] will-change-transform", s.ring].join(" ")} style={{ animation: reduceMotion ? "none" : t.leaving ? "toastOutSoft 650ms cubic-bezier(.22,1,.36,1) forwards" : "toastInSoft 900ms cubic-bezier(.22,1,.36,1) forwards" }}>
              <button onClick={() => dismissToast(t.id)} className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-xl text-gray-500 hover:text-gray-900 hover:bg-black/5 active:scale-95 transition"><span className="text-lg leading-none">×</span></button>
              <div className="flex gap-3 p-4 pr-10"><div className={["h-9 w-9 rounded-xl grid place-items-center shrink-0", s.iconWrap].join(" ")}><ToastIcon type={t.type} /></div><div className="min-w-0"><div className={["text-sm font-extrabold tracking-tight", s.text].join(" ")}>{t.title}</div><div className={["text-sm font-medium leading-snug mt-0.5", s.sub].join(" ")}>{t.message}</div></div></div>
              <div className="h-[3px] w-full bg-black/5"><div className={["h-full origin-left", s.bar].join(" ")} style={{ animation: reduceMotion ? "none" : `toastBar ${t.duration}ms linear forwards` }} /></div>
            </div>
          );
        })}
      </div>

      <header className="sticky top-0 z-30 bg-[#FBFBFB]/85 backdrop-blur-xl border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={resetAll}>
            <div className="bg-transparent text-[#111111] group-hover:scale-105 transition-transform duration-300"><Youtube size={26} strokeWidth={2.5} /></div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-[#111111]">YouTube Transcript</h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-white/60 px-3 py-1.5 rounded-full border border-gray-200/70 cursor-default shadow-sm">
            <Zap size={14} className="text-indigo-500 fill-indigo-500 animate-pulse" /><span className="hidden sm:inline">AI Powered</span><span className="sm:hidden">FREE</span>
          </div>
        </div>
      </header>

      <main className="flex-grow z-10 w-full relative pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <section className={`w-full text-center space-y-6 sm:space-y-8 transition-all duration-700 ${isMounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-gray-700 mb-2 cursor-default" style={{ animation: "bounce 3s infinite" }}><Sparkles size={16} className="text-indigo-600" /> Ekstrak otomatis dengan AI</div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] leading-tight drop-shadow-sm px-2">Dapatkan Transkrip Video <br className="hidden sm:block" /> dalam <span className="relative inline-block mt-1 sm:mt-0"><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Hitungan Detik</span><svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-3 sm:h-5 text-neutral-900/20" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none"><path ref={underlineRef} d="M4 15c30-2 70-5 110-5s60 2 82 5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg></span>.</h2>
            </div>
            <form onSubmit={fetchTranscript} className="max-w-2xl mx-auto relative flex flex-col sm:flex-row gap-3 p-2 bg-white/95 rounded-2xl sm:rounded-full shadow-lg border border-gray-200/70 transition-all duration-300 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300">
              <div className="relative flex-grow flex items-center">
                <div className="absolute left-5 flex items-center pointer-events-none"><Search className={`h-5 w-5 transition-colors duration-300 ${url ? "text-gray-900" : "text-gray-400"}`} /></div>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="tempel link youtube di sini..." className="block w-full pl-14 pr-4 py-4 sm:py-0 bg-transparent text-sm sm:text-base font-semibold placeholder-gray-400 outline-none focus:ring-0 transition-all" disabled={loading} inputMode="url" autoCorrect="off" autoCapitalize="off" spellCheck={false} />
              </div>
              <button type="submit" disabled={loading} className="group relative flex items-center justify-center gap-2 py-4 px-8 font-bold rounded-xl sm:rounded-full text-white bg-gray-900 hover:bg-black active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md">
                {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /><span>Memproses...</span></>) : (<><span>Ekstrak</span><Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" /></>)}
              </button>
            </form>
          </section>

          {/* RESULT FIRST LAYOUT (Dipindah ke atas panduan) */}
          <div className={`w-full max-w-3xl mx-auto mt-8 transition-all duration-700 ease-out transform origin-top ${(transcript || loading) ? "opacity-100 translate-y-0 scale-100 block" : "opacity-0 translate-y-6 scale-95 pointer-events-none hidden"}`}>
            <section className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-gray-200 bg-gray-50/80">
                <h3 className="font-extrabold text-gray-900 flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm text-gray-700 border border-gray-200"><FileText size={16} /></div> Hasil Transkrip
                </h3>
                {transcript && !loading && (
                  <div className="flex items-center gap-2">
                    <button onClick={handleCopyTranscript} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all duration-200 active:scale-95 ${copied ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                      {copied ? <Check size={14} /> : <Copy size={14} />} <span className="hidden sm:inline">Salin</span>
                    </button>
                    <button onClick={() => { setChatText(transcript); setChatOpen(true); }} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all">
                      <Bot size={14} /> <span>Tanya AI</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 z-10 bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 z-10 bg-gradient-to-t from-white to-transparent" />
                <div className="p-5 sm:p-8 bg-white min-h-[150px]">
                  <div className="max-h-[350px] overflow-y-auto pr-3 custom-scrollbar prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {loading ? <SkeletonLoader /> : transcript}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className={`transition-all duration-700 ${transcript || loading ? "mt-10" : "mt-6"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left px-4">
              <div className="p-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0"><LinkIcon size={16} className="text-gray-700" /></div>
                <div><h4 className="font-extrabold text-sm text-gray-900">1. Tempel Link</h4><p className="text-xs font-semibold text-gray-600 mt-0.5 leading-relaxed">Salin tautan video dari YouTube dan tempel ke kolom di atas.</p></div>
              </div>
              <div className="p-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0"><FileText size={16} className="text-gray-700" /></div>
                <div><h4 className="font-extrabold text-sm text-gray-900">2. Ekstrak Teks</h4><p className="text-xs font-semibold text-gray-600 mt-0.5 leading-relaxed">Sistem akan mengambil seluruh teks percakapan dari video.</p></div>
              </div>
              <div className="p-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0"><Bot size={16} className="text-indigo-600" /></div>
                <div><h4 className="font-extrabold text-sm text-gray-900">3. Chat AI</h4><p className="text-xs font-semibold text-gray-600 mt-0.5 leading-relaxed">Buka menu pojok kanan bawah, gunakan AI untuk meringkas.</p></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-6 px-4">
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-1.5 shadow-sm"><Zap size={12} className="fill-indigo-700"/> Proses Cepat</span>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1.5 shadow-sm"><Brain size={12} /> AI Ringkasan</span>
              <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-bold border border-orange-100 flex items-center gap-1.5 shadow-sm"><TrendingUp size={12} /> SEO Optimized</span>
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1.5 shadow-sm"><Globe size={12} /> Bahasa Indonesia</span>
            </div>
          </section>
        </div>
      </main>

      {/* Sinking Footer */}
      <footer className="mt-auto z-20 border-t border-gray-200 bg-[#FBFBFB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-900 font-extrabold"><Youtube size={16} className="text-[#111111]" /><span>&copy; {new Date().getFullYear()} R_hmt ofc.</span></div>
            <div className="text-[11px] font-bold text-gray-500">Based on original code by Zakrenz</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600 font-bold">
            <a href={ADMIN.githubLink} className="hover:text-gray-900 transition-colors flex items-center gap-1.5 group"><Github size={16} className="group-hover:scale-110 transition-transform" /><span className="hidden sm:inline">GitHub</span></a>
            <a href={ADMIN.tiktokLink} className="hover:text-gray-900 transition-colors flex items-center gap-1.5 group"><TikTokIcon size={16} className="group-hover:scale-110 transition-transform" /><span className="hidden sm:inline">TikTok</span></a>
          </div>
        </div>
      </footer>

      {/* FAB Main Menu */}
      <div className="fixed bottom-6 right-4 z-[80] flex flex-col items-end gap-3">
        <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom right-0 ${fabOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}>
          <div className="flex items-center gap-3 justify-end">
            <span className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-200 text-xs font-bold text-gray-700">Hubungi Admin</span>
            <button onClick={() => { setContactOpen(true); setFabOpen(false); }} className="h-12 w-12 rounded-full bg-white text-gray-700 border border-gray-200 shadow-lg grid place-items-center hover:bg-gray-50 active:scale-95 transition"><Headset size={20} /></button>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <span className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-200 text-xs font-bold text-gray-700">Riwayat Teks</span>
            <button onClick={openHistory} className="h-12 w-12 rounded-full bg-white text-gray-700 border border-gray-200 shadow-lg grid place-items-center hover:bg-gray-50 active:scale-95 transition"><History size={20} /></button>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <span className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-200 text-xs font-bold text-gray-700">Info Asisten AI</span>
            <button onClick={() => { setAboutOpen(true); setFabOpen(false); }} className="h-12 w-12 rounded-full bg-white text-gray-700 border border-gray-200 shadow-lg grid place-items-center hover:bg-gray-50 active:scale-95 transition"><InfoIcon size={20} /></button>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <span className="bg-gray-900 px-3 py-1.5 rounded-xl shadow-md text-xs font-bold text-white">Chat Asisten AI</span>
            <button onClick={() => { setChatOpen(!chatOpen); setFabOpen(false); }} className="h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 grid place-items-center hover:bg-indigo-700 active:scale-95 transition"><MessageCircle size={20} /></button>
          </div>
        </div>
        <button onClick={() => { if(chatOpen) setChatOpen(false); setFabOpen(!fabOpen); }} className="h-14 w-14 rounded-full bg-gray-900 text-white shadow-xl shadow-black/20 grid place-items-center hover:bg-black active:scale-95 transition-transform z-50 relative">
          {fabOpen || chatOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Modals */}
      <DialogShell open={aboutOpen} onClose={() => setAboutOpen(false)} title="Tentang AI" subtitle="Asisten Konten Cerdas" icon={<Wand2 size={18} />}>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0 shadow-inner"><img src={imgDevProfile} alt="Developer" className="w-full h-full object-cover" draggable={false} /></div>
          <div className="min-w-0"><div className="text-base font-extrabold text-gray-900">Developer Profile</div><div className="text-xs font-bold text-gray-500 mt-0.5">R_hmt ofc</div><div className="text-xs font-semibold text-gray-600 mt-1 leading-snug">Tool AI untuk mempermudah creator merangkum dan mencari ide konten.</div></div>
        </div>
        <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
          <div className="text-sm font-extrabold text-indigo-900">Cara pakai AI:</div>
          <ul className="mt-3 space-y-2.5 text-xs sm:text-sm font-semibold text-gray-700">
            <li className="flex items-start gap-2"><span className="text-indigo-600 font-black">1.</span> Tempel hasil transkrip ke kolom chat.</li>
            <li className="flex items-start gap-2"><span className="text-indigo-600 font-black">2.</span> Pilih mode (Ringkasan/Ide Konten/Chapter).</li>
            <li className="flex items-start gap-2"><span className="text-indigo-600 font-black">3.</span> Kirim, dan biarkan AI bekerja!</li>
          </ul>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-400">Code Based by Zakrenz</div><button onClick={() => setAboutOpen(false)} className="px-5 py-2.5 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition">Tutup</button>
        </div>
      </DialogShell>

      <DialogShell open={historyOpen} onClose={() => setHistoryOpen(false)} title="Riwayat" subtitle="Transkrip & Obrolan AI" icon={<History size={18} />} widthClass="max-w-[680px]">
        <div className="grid grid-cols-1 gap-4">
          <CustomSelect value={historyType} onChange={setHistoryType} options={[{ value: "transcript", label: "Riwayat Transkrip" }, { value: "chat", label: "Riwayat Chat AI" }]} />
          {historyType === "transcript" ? (
            <><div className="flex items-center justify-between gap-2"><div className="text-sm font-bold text-gray-700">Total Tersimpan: <span className="text-gray-900">{transcriptHistory.length}</span></div><button onClick={clearTranscriptHistory} className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-extrabold hover:bg-red-100 active:scale-95 transition">Hapus Semua</button></div>
              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50"><div className="max-h-[350px] overflow-y-auto custom-scrollbar">{transcriptHistory.length === 0 ? (<div className="p-6 text-center text-sm font-semibold text-gray-500">Belum ada riwayat transkrip.</div>) : (<div className="divide-y divide-gray-200">{transcriptHistory.map((it) => (<div key={it.id} className="p-4 bg-white hover:bg-gray-50 transition"><div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3"><div className="min-w-0 flex-1"><div className="text-[10px] font-bold text-gray-400">{new Date(it.ts).toLocaleString("id-ID")}</div><div className="mt-1 text-sm font-extrabold text-gray-900 truncate">{it.url || "-"}</div><div className="mt-1.5 text-xs font-semibold text-gray-600 whitespace-pre-wrap line-clamp-2">{it.preview || ""}</div></div><div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0"><button onClick={() => restoreTranscriptHistoryItem(it)} className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-extrabold hover:bg-black active:scale-95 transition">Buka</button><button onClick={() => copyText(it.transcript || "")} className="h-8 w-8 rounded-xl border border-gray-200 bg-white grid place-items-center text-gray-700 hover:bg-gray-100 active:scale-95 transition"><Copy size={14} /></button></div></div></div>))}</div>)}</div></div></>
          ) : (
            <><div className="flex items-center justify-between gap-2"><div className="text-sm font-bold text-gray-700">Total Tersimpan: <span className="text-gray-900">{chatHistory.length}</span></div><button onClick={clearChatHistory} className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-extrabold hover:bg-red-100 active:scale-95 transition">Hapus Semua</button></div>
              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50"><div className="max-h-[350px] overflow-y-auto custom-scrollbar">{chatHistory.length === 0 ? (<div className="p-6 text-center text-sm font-semibold text-gray-500">Belum ada riwayat chat.</div>) : (<div className="divide-y divide-gray-200">{chatHistory.map((it) => (<div key={it.id} className="p-4 bg-white hover:bg-gray-50 transition"><div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3"><div className="min-w-0 flex-1"><div className="text-[10px] font-bold text-gray-400">{new Date(it.ts).toLocaleString("id-ID")} • <span className="text-indigo-600 uppercase tracking-wider">{String(it.mode || "clip")}</span></div><div className="mt-1.5 text-sm font-extrabold text-gray-900 line-clamp-2">{it.outputPreview || "(tanpa output)"}</div></div><div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0"><button onClick={() => restoreChatHistoryItem(it)} className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-extrabold hover:bg-black active:scale-95 transition">Buka</button><button onClick={() => copyText(it.output || "")} className="h-8 w-8 rounded-xl border border-gray-200 bg-white grid place-items-center text-gray-700 hover:bg-gray-100 active:scale-95 transition"><Copy size={14} /></button></div></div></div>))}</div>)}</div></div></>
          )}
          <div className="flex items-center justify-end mt-2"><button onClick={() => setHistoryOpen(false)} className="px-5 py-2.5 rounded-2xl bg-gray-200 text-gray-900 text-sm font-extrabold hover:bg-gray-300 active:scale-95 transition">Tutup</button></div>
        </div>
      </DialogShell>

      <DialogShell open={contactOpen} onClose={() => setContactOpen(false)} title="Hubungi Admin" subtitle="Pilih platform di bawah" icon={<Headset size={18} />} widthClass="max-w-[480px]">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
           <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0 shadow-inner"><img src={imgDevProfile} alt="Developer" className="w-full h-full object-cover" draggable={false} /></div>
          <div><div className="text-sm font-extrabold text-gray-900">R_hmt ofc</div><div className="text-[11px] font-bold text-gray-500">Developer & Creator</div></div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 space-y-2">
          <a href={ADMIN.telegramLink} target="_blank" rel="noreferrer" className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between gap-3 hover:bg-[#F0F8FF] hover:border-[#B0E0E6] active:scale-[0.98] transition-all group">
            <div className="min-w-0 flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center shrink-0"><TelegramIcon size={20} /></div><div className="text-left"><div className="text-sm font-extrabold text-gray-900 group-hover:text-[#0088cc] transition-colors">Telegram</div><div className="text-xs font-bold text-gray-500 truncate">Tanya seputar AI & Tool</div></div></div><ExternalLink size={18} className="text-gray-400 group-hover:text-[#0088cc]/60 transition-colors" />
          </a>
          <a href={ADMIN.waLink} target="_blank" rel="noreferrer" className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between gap-3 hover:bg-[#F0FFF4] hover:border-[#C6F6D5] active:scale-[0.98] transition-all group">
            <div className="min-w-0 flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0"><MessageCircle size={20} /></div><div className="text-left"><div className="text-sm font-extrabold text-gray-900 group-hover:text-[#128C7E] transition-colors">WhatsApp</div><div className="text-xs font-bold text-gray-500 truncate">Join Chanel</div></div></div><ExternalLink size={18} className="text-gray-400 group-hover:text-[#25D366]/60 transition-colors" />
          </a>
          <a href={ADMIN.tiktokLink} target="_blank" rel="noreferrer" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-3 hover:bg-gray-100 active:scale-[0.98] transition-all group">
            <div className="min-w-0 flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center shrink-0"><TikTokIcon size={18} /></div><div className="text-left"><div className="text-sm font-extrabold text-gray-900 group-hover:text-black transition-colors">TikTok</div><div className="text-xs font-bold text-gray-500 truncate">Follow & Support</div></div></div><ExternalLink size={18} className="text-gray-400 group-hover:text-black transition-colors" />
          </a>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="text-[11px] font-bold text-gray-400">Code Based by Zakrenz</div><button onClick={() => setContactOpen(false)} className="px-5 py-2.5 rounded-2xl bg-gray-900 text-white text-sm font-extrabold hover:bg-black active:scale-95 transition">Tutup</button>
        </div>
      </DialogShell>

      {/* CHAT AI MOBILE FIX WITH AI GLOW */}
      <div className={["fixed bottom-24 right-4 z-[99]", "w-[min(390px,calc(100vw-2rem))]", "flex flex-col", "transition-all duration-400 ease-out origin-bottom-right", chatOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none translate-y-4"].join(" ")} style={{ maxHeight: "calc(100dvh - 120px)" }}>
        <div className="flex flex-col h-full rounded-3xl overflow-hidden border border-gray-200 bg-[#FFFFFF] shadow-2xl">
          <div className="px-4 py-3 border-b border-gray-200 bg-[#FFFFFF] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md"><Bot size={18} /></div>
              <div className="min-w-0"><div className="text-sm font-extrabold text-gray-900 leading-tight">Asisten AI</div><div className="text-[11px] font-bold text-indigo-600 leading-tight flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online</div></div>
            </div>
            <button onClick={() => setChatOpen(false)} className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition"><X size={18} /></button>
          </div>
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 shrink-0 space-y-2">
            <CustomSelect value={chatMode} onChange={setChatMode} options={[{ value: "clip", label: "✨ Cari Ide Konten Pendek" }, { value: "summary", label: "📝 Buat Ringkasan Otomatis" }, { value: "chapters", label: "⏱️ Buat Chapters (Waktu)" }, { value: "rewrite", label: "✍️ Tulis Ulang Script" }]} disabled={chatSending} />
            <textarea value={chatCustomPrompt} onChange={(e) => setChatCustomPrompt(e.target.value)} placeholder="Instruksi spesifik (opsional)" className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-800 outline-none resize-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all custom-scrollbar" style={{ WebkitTapHighlightColor: "transparent", WebkitAppearance: "none" }} disabled={chatSending} />
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 space-y-3 custom-scrollbar" ref={chatListRef}>
            {chatMessages.map((m, idx) => {
              const isUser = m.role === "user"; const isAssistant = m.role === "assistant";
              return (
                <div key={idx} className={["w-full flex", isUser ? "justify-end" : "justify-start"].join(" ")}>
                  <div className={["max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] font-semibold leading-relaxed whitespace-pre-wrap shadow-sm", isUser ? "bg-gray-900 text-white rounded-tr-sm" : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"].join(" ")}>
                    <div>{m.content}</div>
                    {isAssistant && (
                      <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-end">
                        <button onClick={() => copyAssistantMessage(idx)} className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95 transition">
                          {copiedMsgId === idx ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}<span className="text-[10px] font-bold">{copiedMsgId === idx ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {chatSending && <div className="w-full flex justify-start"><div className="max-w-[80%] rounded-2xl px-4 py-3 border border-indigo-200 rounded-tl-sm shadow-sm bg-gradient-to-r from-indigo-50 via-white to-indigo-50 bg-[length:200%_200%] animate-[pulse_2s_ease-in-out_infinite]"><TypingDots /></div></div>}
          </div>
          <div className="p-3 bg-white border-t border-gray-200 shrink-0">
            <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-1 focus-within:border-indigo-300 focus-within:bg-white transition-colors">
              <textarea value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder="Tempel transkrip ke sini..." className="flex-1 max-h-[100px] min-h-[40px] bg-transparent px-3 py-2 text-sm font-semibold text-gray-800 outline-none resize-none custom-scrollbar" style={{ WebkitTapHighlightColor: "transparent", WebkitAppearance: "none" }} disabled={chatSending} />
              <div className="flex items-center gap-1 pb-1 pr-1">
                 <button onClick={clearChat} disabled={chatSending || chatMessages.length <= 2} className="h-8 w-8 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 grid place-items-center active:scale-95 transition disabled:opacity-30"><Trash2 size={16} /></button>
                <button onClick={sendChat} disabled={chatSending || !chatText.trim()} className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50 shadow-md">{chatSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} className="-ml-0.5" />}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}