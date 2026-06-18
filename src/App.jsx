import { useState, useRef } from "react";

// ── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#ffffff",
  bgCard: "#f0f9ff",
  bgSurface: "#e0f2fe",
  bgModal: "#ffffff",
  border: "#bae6fd",
  borderStrong: "#7dd3fc",
  text: "#0369a1",
  textMuted: "#38bdf8",
  textFaint: "#7dd3fc",
  textDark: "#0c4a6e",
  accent: "#0ea5e9",
  accentHover: "#0284c7",
  navActive: "#0d9488",       // teal green (pressed icon)
  navActiveTxt: "#ffffff",
  navInactive: "transparent",
  navInactiveTxt: "#38bdf8",
  btnPrimary: "#0d9488",
  btnPrimaryTxt: "#ffffff",
  btnSecondary: "#e0f2fe",
  btnSecondaryTxt: "#0369a1",
  statActive: "#0369a1",
  statUrgent: "#ef4444",
  statTasks: "#f59e0b",
  waBtn: "#d1fae5",
  waBtnTxt: "#065f46",
  waBorder: "#6ee7b7",
  linkColor: "#0d9488",
  inputBg: "#f0f9ff",
  inputBorder: "#7dd3fc",
  inputText: "#0c4a6e",
  headerBorder: "#bae6fd",
  divider: "#e0f2fe",
  tagFamily: { bg: "#ede9fe", text: "#6d28d9" },
  tagDistrict: { bg: "#dbeafe", text: "#1d4ed8" },
  tagLHC: { bg: "#e0e7ff", text: "#3730a3" },
  tagRevenue: { bg: "#ffedd5", text: "#9a3412" },
  tagBanking: { bg: "#ccfbf1", text: "#0f766e" },
  tagLabour: { bg: "#cffafe", text: "#0e7490" },
  tagAnti: { bg: "#fee2e2", text: "#991b1b" },
  tagNadra: { bg: "#d9f99d", text: "#3f6212" },
  tagOther: { bg: "#f1f5f9", text: "#475569" },
  statusActive: { bg: "#dcfce7", text: "#15803d" },
  statusAppeal: { bg: "#fef9c3", text: "#854d0e" },
  statusClosed: { bg: "#f1f5f9", text: "#64748b" },
  statusPending: { bg: "#dbeafe", text: "#1e40af" },
  statusAdjourned: { bg: "#fee2e2", text: "#991b1b" },
  timelineNode: "#0d9488",
  timelineLine: "#bae6fd",
  overlayBg: "rgba(12,74,110,0.35)",
};

// ── Constants ────────────────────────────────────────────────────────────────
const FORUMS = [
  "District Courts Multan",
  "Family Courts Multan",
  "Labour Court Multan",
  "Banking Court Multan",
  "Revenue / Board of Revenue",
  "Anti-Corruption Tribunal",
  "LHC Multan Bench",
  "Administrative / NADRA",
  "Other",
];
const STATUSES = ["Active", "Appeal", "Pending", "Adjourned", "Closed"];
const PRIORITIES = ["High", "Medium", "Low"];
const ASSIGNEES = ["Self", "Clerk", "Muhammad Ali Siddiqui", "Sammar Abbas", "Ms. Kainat Khan"];

// ── Seed Data ────────────────────────────────────────────────────────────────
const SEED_CASES = [
  {
    id: 1, ref: "ZLC-2026-001",
    title: "Maintenance & Dower Recovery — Hina Bibi",
    forum: "Family Courts Multan", status: "Active", nextDate: "2026-06-18",
    dsjLink: "https://dsj.punjab.gov.pk/casedetail/917f19f418279159de1c41b50f",
    linkedCases: [2],
    client: { name: "Hina Bibi", phone: "923000000001", cnic: "36302-0000001-4" },
    associates: [{ name: "Muhammad Ali Siddiqui", phone: "923010000001" }],
    brief: "Suit for maintenance, dower recovery, possession of dowry items and gifted property. Key witnesses: Muhammad Asif and Muhammad Amir (sons of Ghulam Hussain).",
    history: [
      { date: "2026-04-10", note: "Plaint filed before Family Judge." },
      { date: "2026-05-02", note: "Summons issued to defendant." },
      { date: "2026-05-28", note: "Written statement filed by opposing counsel." },
    ],
  },
  {
    id: 2, ref: "ZLC-2026-002",
    title: "Maintenance Appeal — Hina Bibi",
    forum: "LHC Multan Bench", status: "Appeal", nextDate: "2026-06-25",
    dsjLink: "", linkedCases: [1],
    client: { name: "Hina Bibi", phone: "923000000001", cnic: "36302-0000001-4" },
    associates: [{ name: "Sammar Abbas", phone: "923010000002" }],
    brief: "Appeal arising from order in ZLC-2026-001. Challenging quantum of interim maintenance awarded.",
    history: [{ date: "2026-05-30", note: "Appeal filed at LHC Multan Bench." }],
  },
  {
    id: 3, ref: "ZLC-2026-003",
    title: "BISE Multan v. Ideal College",
    forum: "District Courts Multan", status: "Appeal", nextDate: "2026-07-03",
    dsjLink: "", linkedCases: [],
    client: { name: "BISE Multan", phone: "920610000002", cnic: "N/A" },
    associates: [{ name: "Ms. Kainat Khan", phone: "923010000003" }],
    brief: "Civil appeal against Ideal College of Science and Commerce (owner: Muhammad Shoaib). Recovery of enrollment fees and damages. Stay application under Section 151 CPC filed.",
    history: [
      { date: "2026-03-15", note: "Decree in favour of defendant at trial court." },
      { date: "2026-04-01", note: "Appeal filed with grounds." },
      { date: "2026-04-20", note: "Stay application heard. Adjourned for reply." },
    ],
  },
  {
    id: 4, ref: "ZLC-2026-004",
    title: "Arifa Bibi — Declaration & Cancellation",
    forum: "Revenue / Board of Revenue", status: "Active", nextDate: "2026-06-12",
    dsjLink: "", linkedCases: [],
    client: { name: "Arifa Bibi", phone: "923010000004", cnic: "36302-0000003-6" },
    associates: [],
    brief: "Challenge to Mutation No. 12637 and Sale Deed No. 29758/1. Grounds: perverse finding on father-daughter relationship; mala fide transfers.",
    history: [
      { date: "2026-02-10", note: "Original suit dismissed at trial level." },
      { date: "2026-03-05", note: "Appeal filed." },
    ],
  },
];

const SEED_TASKS = [
  { id: 1, title: "File written statement in ZLC-2026-004", assignedTo: "Self", due: "2026-06-14", priority: "High", done: false },
  { id: 2, title: "Collect certified copy of BISE decree", assignedTo: "Clerk", due: "2026-06-16", priority: "Medium", done: false },
  { id: 3, title: "Prepare witness list for Family Court matter", assignedTo: "Self", due: "2026-06-20", priority: "High", done: false },
  { id: 4, title: "Draft vakalatnama for new client", assignedTo: "Clerk", due: "2026-06-13", priority: "Low", done: true },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
}
function daysUntil(d) {
  return Math.ceil((new Date(d) - new Date()) / 86400000);
}
function statusStyle(s) {
  const m = { Active: T.statusActive, Appeal: T.statusAppeal, Closed: T.statusClosed, Pending: T.statusPending, Adjourned: T.statusAdjourned };
  const c = m[s] || T.statusClosed;
  return { background: c.bg, color: c.text, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, display: "inline-block" };
}
function forumStyle(f) {
  const m = {
    "Family Courts Multan": T.tagFamily,
    "District Courts Multan": T.tagDistrict,
    "LHC Multan Bench": T.tagLHC,
    "Revenue / Board of Revenue": T.tagRevenue,
    "Banking Court Multan": T.tagBanking,
    "Labour Court Multan": T.tagLabour,
    "Anti-Corruption Tribunal": T.tagAnti,
    "Administrative / NADRA": T.tagNadra,
  };
  const c = m[f] || T.tagOther;
  return { background: c.bg, color: c.text, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, display: "inline-block" };
}
function priorityColor(p) {
  return { High: "#ef4444", Medium: "#f59e0b", Low: "#94a3b8" }[p] || "#94a3b8";
}
function buildWhatsApp(phone, message) {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}
function whatsappMsg(c) {
  return `Assalam o Alaikum,\n\nThis is a reminder that your case *${c.title}* [${c.ref}] is listed before *${c.forum}* on *${formatDate(c.nextDate)}*.\n\nPlease be present and prepared.\n\n— Zakariya Law Chambers, Multan`;
}

// ── UI Primitives ────────────────────────────────────────────────────────────
const cardStyle = { background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14 };
const surfaceStyle = { background: T.bgSurface, border: `1px solid ${T.border}`, borderRadius: 10 };
const inpStyle = { background: T.inputBg, border: `1px solid ${T.inputBorder}`, borderRadius: 8, color: T.inputText, padding: "8px 12px", fontSize: 13, width: "100%", outline: "none" };

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{ background: T.overlayBg, paddingTop: 40 }}>
      <div style={{ width: "100%", maxWidth: wide ? 760 : 600, background: T.bgModal, border: `1px solid ${T.borderStrong}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 40px rgba(3,105,161,0.12)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontWeight: 700, color: T.textDark, fontSize: 15 }}>{title}</span>
          <button onClick={onClose} style={{ color: T.textMuted, fontSize: 22, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}>×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Inp({ label, ...props }) {
  return (
    <div>
      {label && <p style={{ color: T.textMuted, fontSize: 11, marginBottom: 4 }}>{label}</p>}
      <input style={inpStyle} {...props} />
    </div>
  );
}
function Sel({ label, options, ...props }) {
  return (
    <div>
      {label && <p style={{ color: T.textMuted, fontSize: 11, marginBottom: 4 }}>{label}</p>}
      <select style={{ ...inpStyle, cursor: "pointer" }} {...props}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── WhatsApp Button ──────────────────────────────────────────────────────────
function WABtn({ phone, message, label }) {
  if (!phone) return null;
  return (
    <a href={buildWhatsApp(phone, message)} target="_blank" rel="noreferrer"
      style={{ background: T.waBtn, color: T.waBtnTxt, border: `1px solid ${T.waBorder}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>
      💬 {label || "WhatsApp"}
    </a>
  );
}

// ── Case Card ────────────────────────────────────────────────────────────────
function CaseCard({ c, onClick }) {
  const days = daysUntil(c.nextDate);
  const dueTomorrow = days === 1;
  return (
    <div onClick={() => onClick(c)} style={{ ...cardStyle, padding: 14, cursor: "pointer", transition: "box-shadow 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(3,105,161,0.10)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <p style={{ color: T.textFaint, fontFamily: "monospace", fontSize: 11, marginBottom: 2 }}>{c.ref}</p>
          <p style={{ color: T.textDark, fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{c.title}</p>
        </div>
        <span style={statusStyle(c.status)}>{c.status}</span>
      </div>
      <p style={{ color: T.textMuted, fontSize: 12, marginBottom: 10 }}>{c.forum}</p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span style={forumStyle(c.forum)}>{c.forum.split(" ")[0]}</span>
          {c.linkedCases.length > 0 && (
            <span style={{ background: "#e0e7ff", color: "#3730a3", padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>
              🔗 {c.linkedCases.length} linked
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {dueTomorrow && c.client?.phone && (
            <span onClick={e => e.stopPropagation()}>
              <WABtn phone={c.client.phone} message={whatsappMsg(c)} label="Remind" />
            </span>
          )}
          <span style={{ fontSize: 11, fontFamily: "monospace", color: days < 0 ? "#ef4444" : days === 0 ? "#ef4444" : days <= 3 ? "#f59e0b" : T.textFaint, fontWeight: days <= 3 ? 700 : 400 }}>
            {days === 0 ? "Today" : days < 0 ? `${Math.abs(days)}d ago` : `${days}d`} · {formatDate(c.nextDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Case Detail ──────────────────────────────────────────────────────────────
function CaseDetail({ c, allCases, onClose, onEdit }) {
  const linked = allCases.filter(x => c.linkedCases.includes(x.id));
  return (
    <Modal title={c.ref} onClose={onClose} wide>
      <div className="space-y-4 text-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p style={{ color: T.textDark, fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>{c.title}</p>
            <p style={{ color: T.textMuted, fontSize: 13, marginTop: 2 }}>{c.forum}</p>
          </div>
          <button onClick={() => onEdit(c)} style={{ background: T.btnSecondary, color: T.text, border: `1px solid ${T.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Edit</button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["Status", <span style={statusStyle(c.status)}>{c.status}</span>],
            ["Next Date", <span style={{ fontFamily: "monospace", fontSize: 13, color: daysUntil(c.nextDate) <= 1 ? "#f59e0b" : T.textDark, fontWeight: 600 }}>{formatDate(c.nextDate)}</span>],
            ["DSJ Portal", c.dsjLink
              ? <a href={c.dsjLink} target="_blank" rel="noreferrer" style={{ color: T.linkColor, fontSize: 12, fontWeight: 600 }}>Verify ↗</a>
              : <span style={{ color: T.textFaint, fontSize: 12 }}>No link saved</span>]
          ].map(([label, val], i) => (
            <div key={i} style={{ ...surfaceStyle, padding: "10px 12px" }}>
              <p style={{ color: T.textMuted, fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{label}</p>
              {val}
            </div>
          ))}
        </div>

        <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
          <p style={{ color: T.textMuted, fontSize: 10, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Client</p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p style={{ color: T.textDark, fontWeight: 700 }}>{c.client.name}</p>
              <p style={{ color: T.text, fontSize: 12 }}>{c.client.phone}{c.client.cnic !== "N/A" ? ` · ${c.client.cnic}` : ""}</p>
            </div>
            <WABtn phone={c.client.phone} message={whatsappMsg(c)} label="Send Update" />
          </div>
        </div>

        {c.associates?.length > 0 && (
          <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
            <p style={{ color: T.textMuted, fontSize: 10, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Associates</p>
            <div className="space-y-2">
              {c.associates.map((a, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p style={{ color: T.textDark, fontWeight: 600, fontSize: 13 }}>{a.name}</p>
                    <p style={{ color: T.text, fontSize: 11 }}>{a.phone}</p>
                  </div>
                  <WABtn phone={a.phone} message={whatsappMsg(c)} label="Notify" />
                </div>
              ))}
            </div>
          </div>
        )}

        {linked.length > 0 && (
          <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
            <p style={{ color: T.textMuted, fontSize: 10, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Linked Cases</p>
            <div className="space-y-2">
              {linked.map(lc => (
                <div key={lc.id} className="flex items-center justify-between">
                  <div>
                    <p style={{ color: T.textMuted, fontFamily: "monospace", fontSize: 11 }}>{lc.ref}</p>
                    <p style={{ color: T.textDark, fontSize: 13, fontWeight: 600 }}>{lc.title}</p>
                  </div>
                  <span style={statusStyle(lc.status)}>{lc.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
          <p style={{ color: T.textMuted, fontSize: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Case Brief</p>
          <p style={{ color: T.textDark, lineHeight: 1.6, fontSize: 13 }}>{c.brief}</p>
        </div>

        <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
          <p style={{ color: T.textMuted, fontSize: 10, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Proceedings</p>
          <div className="space-y-3">
            {c.history.map((h, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: T.timelineNode, marginTop: 4, flexShrink: 0 }} />
                  {i < c.history.length - 1 && <div style={{ width: 1, flex: 1, background: T.timelineLine, marginTop: 3 }} />}
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <p style={{ color: T.textMuted, fontFamily: "monospace", fontSize: 11 }}>{formatDate(h.date)}</p>
                  <p style={{ color: T.textDark, fontSize: 13 }}>{h.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ── Case Form Modal ──────────────────────────────────────────────────────────
function CaseFormModal({ initial, allCases, onClose, onSave }) {
  const blank = { ref: "", title: "", forum: FORUMS[0], status: "Active", nextDate: "", dsjLink: "", linkedCases: [], client: { name: "", phone: "", cnic: "" }, associates: [], brief: "", history: [] };
  const [form, setForm] = useState(initial ? { ...initial, client: { ...initial.client }, associates: [...(initial.associates || [])], linkedCases: [...initial.linkedCases] } : blank);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setClient = (k, v) => setForm(f => ({ ...f, client: { ...f.client, [k]: v } }));
  const toggleLink = (id) => setForm(f => ({ ...f, linkedCases: f.linkedCases.includes(id) ? f.linkedCases.filter(x => x !== id) : [...f.linkedCases, id] }));
  const addAssociate = () => setForm(f => ({ ...f, associates: [...f.associates, { name: "", phone: "" }] }));
  const setAssoc = (i, k, v) => setForm(f => { const a = [...f.associates]; a[i] = { ...a[i], [k]: v }; return { ...f, associates: a }; });
  const removeAssoc = (i) => setForm(f => ({ ...f, associates: f.associates.filter((_, j) => j !== i) }));
  const save = () => { if (!form.title || !form.forum) return; onSave({ ...form, id: form.id || Date.now() }); onClose(); };

  return (
    <Modal title={initial ? "Edit Case" : "Add Case"} onClose={onClose} wide>
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Case Ref" value={form.ref} onChange={e => set("ref", e.target.value)} placeholder="ZLC-2026-005" />
          <Inp label="Next Date" type="date" value={form.nextDate} onChange={e => set("nextDate", e.target.value)} />
        </div>
        <Inp label="Case Title" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Maintenance Suit — Client Name" />
        <div className="grid grid-cols-2 gap-3">
          <Sel label="Forum / Court" value={form.forum} options={FORUMS} onChange={e => set("forum", e.target.value)} />
          <Sel label="Status" value={form.status} options={STATUSES} onChange={e => set("status", e.target.value)} />
        </div>
        <Inp label="DSJ Punjab Link" value={form.dsjLink} onChange={e => set("dsjLink", e.target.value)} placeholder="https://dsj.punjab.gov.pk/casedetail/..." />

        <p style={{ color: T.text, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, paddingTop: 4 }}>Client</p>
        <div className="grid grid-cols-3 gap-3">
          <Inp label="Name" value={form.client.name} onChange=
