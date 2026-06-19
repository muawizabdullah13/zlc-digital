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
  navActive: "#0d9488", // teal green (pressed icon)
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
const STATUSES = [
  "Active",
  "Appeal",
  "Pending",
  "Adjourned",
  "Closed",
];
const PRIORITIES = ["High", "Medium", "Low"];
const ASSIGNEES = [
  "Self",
  "Clerk",
  "Muhammad Ali Siddiqui",
  "Sammar Abbas",
  "Ms. Kainat Khan",
];

// ── Seed Data ────────────────────────────────────────────────────────────────
const SEED_CASES = [
  {
    id: 1,
    ref: "ZLC-2026-001",
    title: "Maintenance & Dower Recovery — Hina Bibi",
    forum: "Family Courts Multan",
    status: "Active",
    nextDate: "2026-06-18",
    dsjLink:
      "https://dsj.punjab.gov.pk/casedetail/917f19f418279159de1c41b50f",
    linkedCases: [2],
    client: {
      name: "Hina Bibi",
      phone: "923000000001",
      cnic: "36302-0000001-4",
    },
    associates: [
      { name: "Muhammad Ali Siddiqui", phone: "923010000001" },
    ],
    brief:
      "Suit for maintenance, dower recovery, possession of dowry items and gifted property. Key witnesses: Muhammad Asif and Muhammad Amir (sons of Ghulam Hussain).",
    history: [
      {
        date: "2026-04-10",
        note: "Plaint filed before Family Judge.",
      },
      { date: "2026-05-02", note: "Summons issued to defendant." },
      {
        date: "2026-05-28",
        note: "Written statement filed by opposing counsel.",
      },
    ],
  },
  {
    id: 2,
    ref: "ZLC-2026-002",
    title: "Maintenance Appeal — Hina Bibi",
    forum: "LHC Multan Bench",
    status: "Appeal",
    nextDate: "2026-06-25",
    dsjLink: "",
    linkedCases: [1],
    client: {
      name: "Hina Bibi",
      phone: "923000000001",
      cnic: "36302-0000001-4",
    },
    associates: [{ name: "Sammar Abbas", phone: "923010000002" }],
    brief:
      "Appeal arising from order in ZLC-2026-001. Challenging quantum of interim maintenance awarded.",
    history: [
      {
        date: "2026-05-30",
        note: "Appeal filed at LHC Multan Bench.",
      },
    ],
  },
  {
    id: 3,
    ref: "ZLC-2026-003",
    title: "BISE Multan v. Ideal College",
    forum: "District Courts Multan",
    status: "Appeal",
    nextDate: "2026-07-03",
    dsjLink: "",
    linkedCases: [],
    client: {
      name: "BISE Multan",
      phone: "920610000002",
      cnic: "N/A",
    },
    associates: [{ name: "Ms. Kainat Khan", phone: "923010000003" }],
    brief:
      "Civil appeal against Ideal College of Science and Commerce (owner: Muhammad Shoaib). Recovery of enrollment fees and damages. Stay application under Section 151 CPC filed.",
    history: [
      {
        date: "2026-03-15",
        note: "Decree in favour of defendant at trial court.",
      },
      { date: "2026-04-01", note: "Appeal filed with grounds." },
      {
        date: "2026-04-20",
        note: "Stay application heard. Adjourned for reply.",
      },
    ],
  },
  {
    id: 4,
    ref: "ZLC-2026-004",
    title: "Arifa Bibi — Declaration & Cancellation",
    forum: "Revenue / Board of Revenue",
    status: "Active",
    nextDate: "2026-06-12",
    dsjLink: "",
    linkedCases: [],
    client: {
      name: "Arifa Bibi",
      phone: "923010000004",
      cnic: "36302-0000003-6",
    },
    associates: [],
    brief:
      "Challenge to Mutation No. 12637 and Sale Deed No. 29758/1. Grounds: perverse finding on father-daughter relationship; mala fide transfers.",
    history: [
      {
        date: "2026-02-10",
        note: "Original suit dismissed at trial level.",
      },
      { date: "2026-03-05", note: "Appeal filed." },
    ],
  },
];

const SEED_TASKS = [
  {
    id: 1,
    title: "File written statement in ZLC-2026-004",
    assignedTo: "Self",
    due: "2026-06-14",
    priority: "High",
    done: false,
  },
  {
    id: 2,
    title: "Collect certified copy of BISE decree",
    assignedTo: "Clerk",
    due: "2026-06-16",
    priority: "Medium",
    done: false,
  },
  {
    id: 3,
    title: "Prepare witness list for Family Court matter",
    assignedTo: "Self",
    due: "2026-06-20",
    priority: "High",
    done: false,
  },
  {
    id: 4,
    title: "Draft vakalatnama for new client",
    assignedTo: "Clerk",
    due: "2026-06-13",
    priority: "Low",
    done: true,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function daysUntil(d) {
  return Math.ceil((new Date(d) - new Date()) / 86400000);
}
function statusStyle(s) {
  const m = {
    Active: T.statusActive,
    Appeal: T.statusAppeal,
    Closed: T.statusClosed,
    Pending: T.statusPending,
    Adjourned: T.statusAdjourned,
  };
  const c = m[s] || T.statusClosed;
  return {
    background: c.bg,
    color: c.text,
    padding: "2px 10px",
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 600,
    display: "inline-block",
  };
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
  return {
    background: c.bg,
    color: c.text,
    padding: "2px 10px",
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 600,
    display: "inline-block",
  };
}
function priorityColor(p) {
  return (
    { High: "#ef4444", Medium: "#f59e0b", Low: "#94a3b8" }[p] ||
    "#94a3b8"
  );
}
function buildWhatsApp(phone, message) {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}
function whatsappMsg(c) {
  return `Assalam o Alaikum,\n\nThis is a reminder that your case *${c.title}* [${c.ref}] is listed before *${c.forum}* on *${formatDate(c.nextDate)}*.\n\nPlease be present and prepared.\n\n— Zakariya Law Chambers, Multan`;
}

// ── UI Primitives ────────────────────────────────────────────────────────────
const cardStyle = {
  background: T.bgCard,
  border: `1px solid ${T.border}`,
  borderRadius: 14,
};
const surfaceStyle = {
  background: T.bgSurface,
  border: `1px solid ${T.border}`,
  borderRadius: 10,
};
const inpStyle = {
  background: T.inputBg,
  border: `1px solid ${T.inputBorder}`,
  borderRadius: 8,
  color: T.inputText,
  padding: "8px 12px",
  fontSize: 13,
  width: "100%",
  outline: "none",
};

function Modal({ title, onClose, children, wide }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: T.overlayBg, paddingTop: 40 }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: wide ? 760 : 600,
          background: T.bgModal,
          border: `1px solid ${T.borderStrong}`,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(3,105,161,0.12)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <span
            style={{
              fontWeight: 700,
              color: T.textDark,
              fontSize: 15,
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              color: T.textMuted,
              fontSize: 22,
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Inp({ label, ...props }) {
  return (
    <div>
      {label && (
        <p
          style={{
            color: T.textMuted,
            fontSize: 11,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
      )}
      <input style={inpStyle} {...props} />
    </div>
  );
}
function Sel({ label, options, ...props }) {
  return (
    <div>
      {label && (
        <p
          style={{
            color: T.textMuted,
            fontSize: 11,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
      )}
      <select style={{ ...inpStyle, cursor: "pointer" }} {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── WhatsApp Button ──────────────────────────────────────────────────────────
function WABtn({ phone, message, label }) {
  if (!phone) return null;
  return (
    <a
      href={buildWhatsApp(phone, message)}
      target="_blank"
      rel="noreferrer"
      style={{
        background: T.waBtn,
        color: T.waBtnTxt,
        border: `1px solid ${T.waBorder}`,
        borderRadius: 8,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      💬 {label || "WhatsApp"}
    </a>
  );
}

// ── Case Card ────────────────────────────────────────────────────────────────
function CaseCard({ c, onClick }) {
  const days = daysUntil(c.nextDate);
  const dueTomorrow = days === 1;
  return (
    <div
      onClick={() => onClick(c)}
      style={{
        ...cardStyle,
        padding: 14,
        cursor: "pointer",
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 4px 16px rgba(3,105,161,0.10)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <p
            style={{
              color: T.textFaint,
              fontFamily: "monospace",
              fontSize: 11,
              marginBottom: 2,
            }}
          >
            {c.ref}
          </p>
          <p
            style={{
              color: T.textDark,
              fontWeight: 700,
              fontSize: 14,
              lineHeight: 1.3,
            }}
          >
            {c.title}
          </p>
        </div>
        <span style={statusStyle(c.status)}>{c.status}</span>
      </div>
      <p
        style={{ color: T.textMuted, fontSize: 12, marginBottom: 10 }}
      >
        {c.forum}
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span style={forumStyle(c.forum)}>
            {c.forum.split(" ")[0]}
          </span>
          {c.linkedCases.length > 0 && (
            <span
              style={{
                background: "#e0e7ff",
                color: "#3730a3",
                padding: "2px 10px",
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              🔗 {c.linkedCases.length} linked
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {dueTomorrow && c.client?.phone && (
            <span onClick={(e) => e.stopPropagation()}>
              <WABtn
                phone={c.client.phone}
                message={whatsappMsg(c)}
                label="Remind"
              />
            </span>
          )}
          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color:
                days < 0
                  ? "#ef4444"
                  : days === 0
                    ? "#ef4444"
                    : days <= 3
                      ? "#f59e0b"
                      : T.textFaint,
              fontWeight: days <= 3 ? 700 : 400,
            }}
          >
            {days === 0
              ? "Today"
              : days < 0
                ? `${Math.abs(days)}d ago`
                : `${days}d`}{" "}
            · {formatDate(c.nextDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Case Detail ──────────────────────────────────────────────────────────────
function CaseDetail({ c, allCases, onClose, onEdit }) {
  const linked = allCases.filter((x) => c.linkedCases.includes(x.id));
  return (
    <Modal title={c.ref} onClose={onClose} wide>
      <div className="space-y-4 text-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              style={{
                color: T.textDark,
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.3,
              }}
            >
              {c.title}
            </p>
            <p
              style={{
                color: T.textMuted,
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {c.forum}
            </p>
          </div>
          <button
            onClick={() => onEdit(c)}
            style={{
              background: T.btnSecondary,
              color: T.text,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            [
              "Status",
              <span style={statusStyle(c.status)}>{c.status}</span>,
            ],
            [
              "Next Date",
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  color:
                    daysUntil(c.nextDate) <= 1
                      ? "#f59e0b"
                      : T.textDark,
                  fontWeight: 600,
                }}
              >
                {formatDate(c.nextDate)}
              </span>,
            ],
            [
              "DSJ Portal",
              c.dsjLink ? (
                <a
                  href={c.dsjLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: T.linkColor,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Verify ↗
                </a>
              ) : (
                <span style={{ color: T.textFaint, fontSize: 12 }}>
                  No link saved
                </span>
              ),
            ],
          ].map(([label, val], i) => (
            <div
              key={i}
              style={{ ...surfaceStyle, padding: "10px 12px" }}
            >
              <p
                style={{
                  color: T.textMuted,
                  fontSize: 10,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {label}
              </p>
              {val}
            </div>
          ))}
        </div>

        <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
          <p
            style={{
              color: T.textMuted,
              fontSize: 10,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Client
          </p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p style={{ color: T.textDark, fontWeight: 700 }}>
                {c.client.name}
              </p>
              <p style={{ color: T.text, fontSize: 12 }}>
                {c.client.phone}
                {c.client.cnic !== "N/A" ? ` · ${c.client.cnic}` : ""}
              </p>
            </div>
            <WABtn
              phone={c.client.phone}
              message={whatsappMsg(c)}
              label="Send Update"
            />
          </div>
        </div>

        {c.associates?.length > 0 && (
          <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
            <p
              style={{
                color: T.textMuted,
                fontSize: 10,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Associates
            </p>
            <div className="space-y-2">
              {c.associates.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p
                      style={{
                        color: T.textDark,
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {a.name}
                    </p>
                    <p style={{ color: T.text, fontSize: 11 }}>
                      {a.phone}
                    </p>
                  </div>
                  <WABtn
                    phone={a.phone}
                    message={whatsappMsg(c)}
                    label="Notify"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {linked.length > 0 && (
          <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
            <p
              style={{
                color: T.textMuted,
                fontSize: 10,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Linked Cases
            </p>
            <div className="space-y-2">
              {linked.map((lc) => (
                <div
                  key={lc.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p
                      style={{
                        color: T.textMuted,
                        fontFamily: "monospace",
                        fontSize: 11,
                      }}
                    >
                      {lc.ref}
                    </p>
                    <p
                      style={{
                        color: T.textDark,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {lc.title}
                    </p>
                  </div>
                  <span style={statusStyle(lc.status)}>
                    {lc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
          <p
            style={{
              color: T.textMuted,
              fontSize: 10,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Case Brief
          </p>
          <p
            style={{
              color: T.textDark,
              lineHeight: 1.6,
              fontSize: 13,
            }}
          >
            {c.brief}
          </p>
        </div>

        <div style={{ ...surfaceStyle, padding: "12px 14px" }}>
          <p
            style={{
              color: T.textMuted,
              fontSize: 10,
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Proceedings
          </p>
          <div className="space-y-3">
            {c.history.map((h, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 99,
                      background: T.timelineNode,
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  />
                  {i < c.history.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        background: T.timelineLine,
                        marginTop: 3,
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <p
                    style={{
                      color: T.textMuted,
                      fontFamily: "monospace",
                      fontSize: 11,
                    }}
                  >
                    {formatDate(h.date)}
                  </p>
                  <p style={{ color: T.textDark, fontSize: 13 }}>
                    {h.note}
                  </p>
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
  const blank = {
    ref: "",
    title: "",
    forum: FORUMS[0],
    status: "Active",
    nextDate: "",
    dsjLink: "",
    linkedCases: [],
    client: { name: "", phone: "", cnic: "" },
    associates: [],
    brief: "",
    history: [],
  };
  const [form, setForm] = useState(
    initial
      ? {
          ...initial,
          client: { ...initial.client },
          associates: [...(initial.associates || [])],
          linkedCases: [...initial.linkedCases],
        }
      : blank,
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setClient = (k, v) =>
    setForm((f) => ({ ...f, client: { ...f.client, [k]: v } }));
  const toggleLink = (id) =>
    setForm((f) => ({
      ...f,
      linkedCases: f.linkedCases.includes(id)
        ? f.linkedCases.filter((x) => x !== id)
        : [...f.linkedCases, id],
    }));
  const addAssociate = () =>
    setForm((f) => ({
      ...f,
      associates: [...f.associates, { name: "", phone: "" }],
    }));
  const setAssoc = (i, k, v) =>
    setForm((f) => {
      const a = [...f.associates];
      a[i] = { ...a[i], [k]: v };
      return { ...f, associates: a };
    });
  const removeAssoc = (i) =>
    setForm((f) => ({
      ...f,
      associates: f.associates.filter((_, j) => j !== i),
    }));
  const save = () => {
    if (!form.title || !form.forum) return;
    onSave({ ...form, id: form.id || Date.now() });
    onClose();
  };

  return (
    <Modal
      title={initial ? "Edit Case" : "Add Case"}
      onClose={onClose}
      wide
    >
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <Inp
            label="Case Ref"
            value={form.ref}
            onChange={(e) => set("ref", e.target.value)}
            placeholder="ZLC-2026-005"
          />
          <Inp
            label="Next Date"
            type="date"
            value={form.nextDate}
            onChange={(e) => set("nextDate", e.target.value)}
          />
        </div>
        <Inp
          label="Case Title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Maintenance Suit — Client Name"
        />
        <div className="grid grid-cols-2 gap-3">
          <Sel
            label="Forum / Court"
            value={form.forum}
            options={FORUMS}
            onChange={(e) => set("forum", e.target.value)}
          />
          <Sel
            label="Status"
            value={form.status}
            options={STATUSES}
            onChange={(e) => set("status", e.target.value)}
          />
        </div>
        <Inp
          label="DSJ Punjab Link"
          value={form.dsjLink}
          onChange={(e) => set("dsjLink", e.target.value)}
          placeholder="https://dsj.punjab.gov.pk/casedetail/..."
        />

        <p
          style={{
            color: T.text,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            paddingTop: 4,
          }}
        >
          Client
        </p>
        <div className="grid grid-cols-3 gap-3">
          <Inp
            label="Name"
            value={form.client.name}
            onChange={(e) => setClient("name", e.target.value)}
          />
          <Inp
            label="Phone (with country code)"
            value={form.client.phone}
            onChange={(e) => setClient("phone", e.target.value)}
            placeholder="923001234567"
          />
          <Inp
            label="CNIC"
            value={form.client.cnic}
            onChange={(e) => setClient("cnic", e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <p
            style={{
              color: T.text,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Associates
          </p>
          <button
            onClick={addAssociate}
            style={{
              background: T.btnSecondary,
              color: T.text,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            + Add
          </button>
        </div>
        {form.associates.map((a, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 items-end">
            <Inp
              label="Name"
              value={a.name}
              onChange={(e) => setAssoc(i, "name", e.target.value)}
            />
            <div className="flex gap-2">
              <Inp
                label="WhatsApp (with country code)"
                value={a.phone}
                onChange={(e) => setAssoc(i, "phone", e.target.value)}
                placeholder="923001234567"
              />
              <button
                onClick={() => removeAssoc(i)}
                style={{
                  color: "#ef4444",
                  fontSize: 20,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginTop: 20,
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}

        {allCases.filter((x) => x.id !== form.id).length > 0 && (
          <>
            <p
              style={{
                color: T.text,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                paddingTop: 4,
              }}
            >
              Linked Cases
            </p>
            <div className="flex flex-wrap gap-2">
              {allCases
                .filter((x) => x.id !== form.id)
                .map((x) => (
                  <button
                    key={x.id}
                    onClick={() => toggleLink(x.id)}
                    style={{
                      background: form.linkedCases.includes(x.id)
                        ? "#e0e7ff"
                        : T.bgSurface,
                      color: form.linkedCases.includes(x.id)
                        ? "#3730a3"
                        : T.text,
                      border: `1px solid ${form.linkedCases.includes(x.id) ? "#a5b4fc" : T.border}`,
                      borderRadius: 8,
                      padding: "5px 12px",
                      fontSize: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {x.ref}
                  </button>
                ))}
            </div>
          </>
        )}

        <p
          style={{
            color: T.text,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            paddingTop: 4,
          }}
        >
          Case Brief
        </p>
        <textarea
          value={form.brief}
          onChange={(e) => set("brief", e.target.value)}
          style={{ ...inpStyle, minHeight: 80, resize: "vertical" }}
        />

        <button
          onClick={save}
          style={{
            width: "100%",
            background: T.btnPrimary,
            color: T.btnPrimaryTxt,
            border: "none",
            borderRadius: 12,
            padding: "11px 0",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          {initial ? "Save Changes" : "Add Case"}
        </button>
      </div>
    </Modal>
  );
}

// ── Import Modal ─────────────────────────────────────────────────────────────
function ImportModal({ onClose, onImport }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    setPreview(null);
    const text = await file.text();
    const lines = text.split("\n").filter((l) => l.trim());
    if (lines.length < 2) {
      setError("File appears empty.");
      return;
    }
    const headers = lines[0]
      .split(",")
      .map((h) => h.trim().replace(/"/g, "").toLowerCase());
    const rows = lines
      .slice(1)
      .map((line) => {
        const vals = line
          .split(",")
          .map((v) => v.trim().replace(/"/g, ""));
        const obj = {};
        headers.forEach((h, i) => (obj[h] = vals[i] || ""));
        return obj;
      })
      .filter((r) => r.title);
    setPreview(rows);
  };

  const template = `ref,title,forum,status,nextdate,client,phone,cnic,brief,dsjlink\nZLC-2026-005,Example Suit,District Courts Multan,Active,2026-07-10,Client Name,923001234567,36302-0000000-0,Brief notes here,`;

  const confirm = () => {
    const imported = preview.map((r, i) => ({
      id: Date.now() + i,
      ref: r.ref || `ZLC-IMP-${i + 1}`,
      title: r.title || "Untitled",
      forum: FORUMS.includes(r.forum) ? r.forum : "Other",
      status: STATUSES.includes(r.status) ? r.status : "Active",
      nextDate: r.nextdate || r["next date"] || "",
      dsjLink: r.dsjlink || "",
      linkedCases: [],
      client: {
        name: r.client || "",
        phone: r.phone || "",
        cnic: r.cnic || "",
      },
      associates: [],
      brief: r.brief || "",
      history: [],
    }));
    onImport(imported);
    onClose();
  };

  return (
    <Modal title="Import Cases (CSV)" onClose={onClose} wide>
      <div className="space-y-4 text-sm">
        <div style={{ ...surfaceStyle, padding: 14 }}>
          <p style={{ color: T.text, marginBottom: 8 }}>
            Download the template, fill in your cases in Excel, save
            as CSV, then upload:
          </p>
          <button
            onClick={() => {
              const b = new Blob([template], { type: "text/csv" });
              const u = URL.createObjectURL(b);
              const a = document.createElement("a");
              a.href = u;
              a.download = "cases-template.csv";
              a.click();
            }}
            style={{
              background: T.btnSecondary,
              color: T.text,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ⬇ Download Template
          </button>
        </div>

        <div
          style={{
            ...surfaceStyle,
            padding: 16,
            textAlign: "center",
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileRef.current.click()}
            style={{
              background: T.btnPrimary,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 20px",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            📂 Choose CSV File
          </button>
          {error && (
            <p
              style={{ color: "#ef4444", fontSize: 12, marginTop: 8 }}
            >
              {error}
            </p>
          )}
        </div>

        {preview && (
          <>
            <p style={{ color: T.text, fontWeight: 600 }}>
              {preview.length} cases ready to import:
            </p>
            <div
              style={{ maxHeight: 200, overflowY: "auto" }}
              className="space-y-1"
            >
              {preview.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: T.bgSurface }}
                >
                  <span
                    style={{
                      color: T.textDark,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {r.title}
                  </span>
                  <span style={{ color: T.textMuted, fontSize: 11 }}>
                    {r.forum || "Other"}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={confirm}
              style={{
                width: "100%",
                background: T.btnPrimary,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "11px 0",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Import {preview.length} Cases
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

// ── Task Item ────────────────────────────────────────────────────────────────
function TaskItem({ t, onToggle, onDelete }) {
  const days = daysUntil(t.due);
  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-3 transition-all ${t.done ? "opacity-40" : ""}`}
      style={cardStyle}
    >
      <button
        onClick={() => onToggle(t.id)}
        style={{
          width: 20,
          height: 20,
          borderRadius: 99,
          flexShrink: 0,
          marginTop: 2,
          background: t.done ? T.navActive : "transparent",
          border: t.done ? "none" : `2px solid ${T.borderStrong}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {t.done && (
          <span
            style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}
          >
            ✓
          </span>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontSize: 13,
            color: t.done ? T.textFaint : T.textDark,
            textDecoration: t.done ? "line-through" : "none",
            fontWeight: 600,
          }}
        >
          {t.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            style={{
              fontSize: 11,
              color: priorityColor(t.priority),
              fontWeight: 700,
            }}
          >
            {t.priority}
          </span>
          <span style={{ color: T.textFaint, fontSize: 11 }}>·</span>
          <span style={{ fontSize: 11, color: T.text }}>
            {t.assignedTo}
          </span>
          <span style={{ color: T.textFaint, fontSize: 11 }}>·</span>
          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color:
                !t.done && days < 0
                  ? "#ef4444"
                  : !t.done && days <= 2
                    ? "#f59e0b"
                    : T.textMuted,
            }}
          >
            {formatDate(t.due)}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(t.id)}
        style={{
          color: T.textFaint,
          fontSize: 18,
          background: "none",
          border: "none",
          cursor: "pointer",
          marginTop: 2,
        }}
      >
        ×
      </button>
    </div>
  );
}

// ── Add Task Modal ────────────────────────────────────────────────────────────
function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    assignedTo: "Self",
    due: "",
    priority: "Medium",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Modal title="Add Task" onClose={onClose}>
      <div className="space-y-3 text-sm">
        <Inp
          label="Task"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. File written statement"
        />
        <div className="grid grid-cols-2 gap-3">
          <Sel
            label="Assigned To"
            value={form.assignedTo}
            options={ASSIGNEES}
            onChange={(e) => set("assignedTo", e.target.value)}
          />
          <Sel
            label="Priority"
            value={form.priority}
            options={PRIORITIES}
            onChange={(e) => set("priority", e.target.value)}
          />
        </div>
        <Inp
          label="Due Date"
          type="date"
          value={form.due}
          onChange={(e) => set("due", e.target.value)}
        />
        <button
          onClick={() => {
            if (form.title) {
              onAdd({ ...form, id: Date.now(), done: false });
              onClose();
            }
          }}
          style={{
            width: "100%",
            background: T.btnPrimary,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "11px 0",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>
    </Modal>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function LawFirmOS() {
  const [tab, setTab] = useState("dashboard");
  const [cases, setCases] = useState(SEED_CASES);
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [selectedCase, setSelectedCase] = useState(null);
  const [editCase, setEditCase] = useState(null);
  const [showAddCase, setShowAddCase] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [search, setSearch] = useState("");
  const [filterForum, setFilterForum] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const saveCase = (c) => {
    setCases((cs) =>
      cs.find((x) => x.id === c.id)
        ? cs.map((x) => (x.id === c.id ? c : x))
        : [...cs, c],
    );
    if (selectedCase?.id === c.id) setSelectedCase(c);
  };

  const activeCases = cases.filter((c) => c.status !== "Closed");
  const tomorrowCases = cases.filter(
    (c) => c.status !== "Closed" && daysUntil(c.nextDate) === 1,
  );
  const urgentCases = cases.filter(
    (c) =>
      c.status !== "Closed" &&
      daysUntil(c.nextDate) <= 3 &&
      daysUntil(c.nextDate) >= 0,
  );
  const pendingTasks = tasks.filter((t) => !t.done);
  const todayTasks = tasks.filter(
    (t) =>
      !t.done && t.due === new Date().toISOString().split("T")[0],
  );
  const usedForums = [...new Set(cases.map((c) => c.forum))];

  const filteredCases = cases.filter((c) => {
    const q = search.toLowerCase();
    return (
      (!q ||
        c.title.toLowerCase().includes(q) ||
        c.ref.toLowerCase().includes(q) ||
        c.client.name.toLowerCase().includes(q)) &&
      (filterForum === "All" || c.forum === filterForum) &&
      (filterStatus === "All" || c.status === filterStatus)
    );
  });

  const navItems = [
    { id: "dashboard", icon: "⚖️", label: "Dashboard" },
    { id: "cases", icon: "📁", label: "Cases" },
    { id: "tasks", icon: "📋", label: "Tasks" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: T.bg,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="px-5 pt-5 pb-3 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${T.headerBorder}` }}
      >
        <div>
          <p
            style={{
              color: T.textFaint,
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Zakariya Law Chambers
          </p>
          <h1
            style={{
              color: T.textDark,
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            Muawiz Abdullah, Advocate
          </h1>
        </div>
        <div className="text-right">
          <p style={{ color: T.textFaint, fontSize: 11 }}>
            {new Date().toLocaleDateString("en-PK", {
              weekday: "short",
            })}
          </p>
          <p
            style={{
              color: T.text,
              fontSize: 13,
              fontFamily: "monospace",
              fontWeight: 600,
            }}
          >
            {new Date().toLocaleDateString("en-PK", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex px-5 pt-3 pb-1 gap-1">
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              background: tab === n.id ? T.navActive : T.navInactive,
              color: tab === n.id ? T.navActiveTxt : T.navInactiveTxt,
              border: "none",
              borderRadius: 12,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
            }}
          >
            <span>{n.icon}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 px-5 py-4 overflow-auto">
        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Active Cases",
                  value: activeCases.length,
                  color: T.statActive,
                },
                {
                  label: "Hearing Soon",
                  value: urgentCases.length,
                  color: T.statUrgent,
                },
                {
                  label: "Tasks Pending",
                  value: pendingTasks.length,
                  color: T.statTasks,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    ...cardStyle,
                    padding: 14,
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: s.color,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: T.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {tomorrowCases.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: "#f59e0b",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  ⚡ Hearing Tomorrow — Send Reminders
                </p>
                <div className="space-y-2">
                  {tomorrowCases.map((c) => (
                    <div
                      key={c.id}
                      style={{ ...cardStyle, padding: "12px 14px" }}
                      className="flex items-center justify-between gap-3 flex-wrap"
                    >
                      <div>
                        <p
                          style={{
                            color: T.textDark,
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {c.title}
                        </p>
                        <p
                          style={{ color: T.textMuted, fontSize: 11 }}
                        >
                          {c.forum} · {formatDate(c.nextDate)}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {c.client?.phone && (
                          <WABtn
                            phone={c.client.phone}
                            message={whatsappMsg(c)}
                            label={`Client: ${c.client.name.split(" ")[0]}`}
                          />
                        )}
                        {c.associates?.map((a, i) => (
                          <WABtn
                            key={i}
                            phone={a.phone}
                            message={whatsappMsg(c)}
                            label={a.name.split(" ")[0]}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p
                style={{
                  fontSize: 11,
                  color: T.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                Upcoming Hearings
              </p>
              <div className="space-y-2">
                {[...activeCases]
                  .sort(
                    (a, b) =>
                      new Date(a.nextDate) - new Date(b.nextDate),
                  )
                  .slice(0, 5)
                  .map((c) => {
                    const d = daysUntil(c.nextDate);
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCase(c)}
                        style={{
                          ...cardStyle,
                          padding: "12px 14px",
                          cursor: "pointer",
                        }}
                        className="flex items-center justify-between hover:opacity-80 transition"
                      >
                        <div>
                          <p
                            style={{
                              color: T.textDark,
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {c.title}
                          </p>
                          <p
                            style={{
                              color: T.textMuted,
                              fontSize: 11,
                            }}
                          >
                            {c.forum}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p
                            style={{
                              fontSize: 11,
                              fontFamily: "monospace",
                              fontWeight: 700,
                              color:
                                d <= 0
                                  ? "#ef4444"
                                  : d <= 3
                                    ? "#f59e0b"
                                    : T.text,
                            }}
                          >
                            {formatDate(c.nextDate)}
                          </p>
                          <p
                            style={{
                              fontSize: 10,
                              color: T.textFaint,
                            }}
                          >
                            {d === 0
                              ? "Today"
                              : d < 0
                                ? `${Math.abs(d)}d overdue`
                                : `in ${d}d`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: 11,
                  color: T.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                Today's Tasks{" "}
                {todayTasks.length > 0 && (
                  <span style={{ color: "#f59e0b" }}>
                    ({todayTasks.length})
                  </span>
                )}
              </p>
              {todayTasks.length === 0 ? (
                <p style={{ color: T.textFaint, fontSize: 13 }}>
                  No tasks due today.
                </p>
              ) : (
                <div className="space-y-2">
                  {todayTasks.map((t) => (
                    <TaskItem
                      key={t.id}
                      t={t}
                      onToggle={(id) =>
                        setTasks((ts) =>
                          ts.map((x) =>
                            x.id === id ? { ...x, done: !x.done } : x,
                          ),
                        )
                      }
                      onDelete={(id) =>
                        setTasks((ts) =>
                          ts.filter((x) => x.id !== id),
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CASES ── */}
        {tab === "cases" && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cases, clients…"
                style={{ ...inpStyle, flex: 1, borderRadius: 12 }}
              />
              <button
                onClick={() => setShowAddCase(true)}
                style={{
                  background: T.btnPrimary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "0 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                + Case
              </button>
              <button
                onClick={() => setShowImport(true)}
                style={{
                  background: T.btnSecondary,
                  color: T.text,
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                  padding: "0 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                ⬆ Import
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {["All", ...usedForums].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterForum(f)}
                  style={{
                    background:
                      filterForum === f ? T.navActive : T.bgSurface,
                    color: filterForum === f ? "#fff" : T.text,
                    border: `1px solid ${filterForum === f ? T.navActive : T.border}`,
                    borderRadius: 99,
                    padding: "5px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {f === "All"
                    ? "All Forums"
                    : f.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {["All", ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    background:
                      filterStatus === s ? "#e0f2fe" : T.bgSurface,
                    color:
                      filterStatus === s ? T.textDark : T.textMuted,
                    border: `1px solid ${filterStatus === s ? T.borderStrong : T.border}`,
                    borderRadius: 99,
                    padding: "5px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <p style={{ color: T.textFaint, fontSize: 11 }}>
              {filteredCases.length} of {cases.length} cases
            </p>

            <div className="space-y-2">
              {filteredCases.length === 0 ? (
                <p
                  style={{
                    color: T.textFaint,
                    fontSize: 13,
                    textAlign: "center",
                    padding: "20px 0",
                  }}
                >
                  No cases match your filters.
                </p>
              ) : (
                filteredCases.map((c) => (
                  <CaseCard
                    key={c.id}
                    c={c}
                    onClick={setSelectedCase}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* ── TASKS ── */}
        {tab === "tasks" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p style={{ color: T.text, fontSize: 13 }}>
                {pendingTasks.length} pending ·{" "}
                {tasks.filter((t) => t.done).length} done
              </p>
              <button
                onClick={() => setShowAddTask(true)}
                style={{
                  background: T.btnPrimary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + Task
              </button>
            </div>
            {PRIORITIES.map((priority) => {
              const group = tasks.filter(
                (t) => t.priority === priority && !t.done,
              );
              if (!group.length) return null;
              return (
                <div key={priority}>
                  <p
                    style={{
                      fontSize: 11,
                      color: priorityColor(priority),
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {priority} Priority
                  </p>
                  <div className="space-y-2">
                    {group.map((t) => (
                      <TaskItem
                        key={t.id}
                        t={t}
                        onToggle={(id) =>
                          setTasks((ts) =>
                            ts.map((x) =>
                              x.id === id
                                ? { ...x, done: !x.done }
                                : x,
                            ),
                          )
                        }
                        onDelete={(id) =>
                          setTasks((ts) =>
                            ts.filter((x) => x.id !== id),
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            {tasks.filter((t) => t.done).length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: T.textFaint,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 8,
                  }}
                >
                  Completed
                </p>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.done)
                    .map((t) => (
                      <TaskItem
                        key={t.id}
                        t={t}
                        onToggle={(id) =>
                          setTasks((ts) =>
                            ts.map((x) =>
                              x.id === id
                                ? { ...x, done: !x.done }
                                : x,
                            ),
                          )
                        }
                        onDelete={(id) =>
                          setTasks((ts) =>
                            ts.filter((x) => x.id !== id),
                          )
                        }
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedCase && (
        <CaseDetail
          c={selectedCase}
          allCases={cases}
          onClose={() => setSelectedCase(null)}
          onEdit={(c) => {
            setEditCase(c);
            setSelectedCase(null);
          }}
        />
      )}
      {editCase && (
        <CaseFormModal
          initial={editCase}
          allCases={cases}
          onClose={() => setEditCase(null)}
          onSave={saveCase}
        />
      )}
      {showAddCase && (
        <CaseFormModal
          allCases={cases}
          onClose={() => setShowAddCase(false)}
          onSave={saveCase}
        />
      )}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={(imported) =>
            setCases((cs) => [...cs, ...imported])
          }
        />
      )}
      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onAdd={(t) => setTasks((ts) => [t, ...ts])}
        />
      )}
    </div>
  );
}
