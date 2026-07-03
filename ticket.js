"use strict";

/* =====================================================================
   상업적 이용 가능한 폰트 목록 (전부 상업적 이용 가능한 웹폰트)
   ===================================================================== */
const FONT_OPTIONS = [
  { label: "Georgia", family: "Georgia, 'Times New Roman', serif" },
  { label: "Playfair Display", family: "'Playfair Display', Georgia, serif" },
  { label: "Bebas Neue", family: "'Bebas Neue', sans-serif" },
  { label: "Dancing Script", family: "'Dancing Script', cursive" },
  { label: "나눔명조", family: "'Nanum Myeongjo', serif" },
  { label: "고운돋움", family: "'Gowun Dodum', sans-serif" },
  { label: "프리텐다드", family: "'Pretendard', sans-serif" },
  { label: "Meongi Black (only English)", family: "'Cafe24MeongiBlack', sans-serif" },
  { label: "던파 비트비트체v2", family: "'DnfBitbeatV2', sans-serif" },
  { label: "온글잎 박다현체", family: "'OngleipParkDahyeon', cursive" },
];

/* =====================================================================
   템플릿 정의
   - 각 템플릿은 앞면/뒷면 별로 캔버스에 그릴 텍스트 필드의 "초기값"을 갖는다.
   - 실제 편집 상태(위치, 폰트, 크기, 켜짐/꺼짐, 값)는 textItems로 별도 관리된다.
   - 이미지/스티커는 템플릿과 무관하게 사용자가 자유롭게 추가·이동·크기조절한다.
   ===================================================================== */
const TEMPLATES = [
  {
    id: "dark-concert",
    name: "세로형",
    width: 480,
    height: 820,
    edge: { bumpRadius: 11, cornerRadius: 22 },
    borderWidth: 1.5,
    colors: {
      bgTop: "#232b39",
      bgBottom: "#05070b",
      border: "rgba(255,255,255,0.35)",
      textPrimary: "#f5f5f7",
      textSecondary: "#aab2c0",
      placeholderColor: "rgba(245,245,247,0.32)",
    },
    front: {
      fields: [
        { key: "overline", label: "상단 태그", type: "text", x: 240, y: 110, align: "center", fontWeight: 600, fontSize: 17, maxWidth: 420, placeholder: "MY MOVIE TICKET" },
        { key: "subtitle", label: "서브 타이틀", type: "text", x: 240, y: 655, align: "center", fontWeight: 600, fontSize: 20, maxWidth: 420, placeholder: "Subtitle" },
        { key: "mainTitle", label: "메인 타이틀", type: "text", x: 240, y: 725, align: "center", fontStyle: "italic", fontWeight: 700, fontSize: 50, maxWidth: 440, placeholder: "MOVIE TITLE" },
      ],
    },
    back: {
      decorations: [
        { type: "line", x1: 40, y1: 92, x2: 440, y2: 92, color: "rgba(255,255,255,0.25)" },
        { type: "line", x1: 40, y1: 500, x2: 440, y2: 500, color: "rgba(255,255,255,0.25)" },
      ],
      fields: [
        { key: "label", label: "상단 라벨", type: "text", x: 40, y: 70, align: "left", fontWeight: 600, fontSize: 13, maxWidth: 200, placeholder: "ORIGINAL TICKET", default: "ORIGINAL TICKET", color: "#c7cbd4" },
        { key: "ticketNo", label: "티켓 번호", type: "text", x: 440, y: 70, align: "right", fontSize: 14, maxWidth: 200, placeholder: "No. 000001" },
        { key: "title", label: "타이틀", type: "text", x: 40, y: 175, align: "left", fontStyle: "italic", fontWeight: 700, fontSize: 42, maxWidth: 400, placeholder: "Movie Title" },
        { key: "date", label: "날짜", type: "text", x: 40, y: 270, align: "left", fontSize: 15, maxWidth: 400, placeholder: "2026.00.00 ~ 2026.00.00", isDateField: true },
        { key: "venue", label: "장소", type: "text", x: 40, y: 305, align: "left", fontSize: 15, maxWidth: 400, placeholder: "VENUE" },
        { key: "cast", label: "캐스트 / 출연진", type: "multiline", x: 40, y: 340, maxWidth: 400, fontSize: 15, lineHeight: 22, align: "left", placeholder: "CAST NAMES" },
        { key: "rating", label: "별점", type: "rating", x: 40, y: 460, fontSize: 26, align: "left" },
        { key: "review", label: "코멘트", type: "multiline", x: 40, y: 545, maxWidth: 400, fontStyle: "italic", fontSize: 16, lineHeight: 26, align: "left", placeholder: "짧은 감상평을 적어보세요." },
      ],
    },
  },
  {
    id: "pastel-film",
    name: "가로형",
    width: 760,
    height: 480,
    edge: { bumpRadius: 10, cornerRadius: 20 },
    borderWidth: 1.5,
    colors: {
      bgTop: "#f6efd9",
      bgBottom: "#ecdcae",
      border: "rgba(255,255,255,0.7)",
      textPrimary: "#5b4a2a",
      textSecondary: "#8a7550",
      placeholderColor: "rgba(91,74,42,0.35)",
    },
    front: {
      fields: [
        { key: "title", label: "메인 타이틀", type: "text", x: 380, y: 210, align: "center", fontStyle: "italic", fontWeight: 700, fontSize: 34, maxWidth: 600, placeholder: "MOVIE TITLE" },
        { key: "subtitle", label: "서브 타이틀", type: "text", x: 380, y: 248, align: "center", fontStyle: "italic", fontSize: 17, maxWidth: 600, placeholder: "SUBTITLE" },
      ],
    },
    back: {
      decorations: [
        {
          type: "line",
          color: "rgba(91,74,42,0.3)",
          variants: {
            horizontal: { x1: 30, y1: 265, x2: 730, y2: 265 },
            vertical: { x1: 380, y1: 40, x2: 380, y2: 440 },
          },
        },
      ],
      fields: [
        { key: "label", label: "상단 라벨", type: "text", x: 30, y: 50, align: "left", fontWeight: 700, fontSize: 12, maxWidth: 300, placeholder: "ORIGINAL TICKET", default: "ORIGINAL TICKET" },
        { key: "no", label: "번호", type: "text", x: 730, y: 50, align: "right", fontSize: 12, maxWidth: 150, placeholder: "No. 01" },
        { key: "title", label: "타이틀", type: "text", x: 30, y: 112, align: "left", fontStyle: "italic", fontWeight: 700, fontSize: 32, maxWidth: 700, placeholder: "Title" },
        { key: "date", label: "날짜", type: "text", x: 30, y: 165, align: "left", fontSize: 13, maxWidth: 300, placeholder: "2026.00.00", isDateField: true },
        { key: "cast", label: "캐스트", type: "text", x: 30, y: 190, align: "left", fontSize: 13, maxWidth: 700, placeholder: "CAST" },
        { key: "rating", label: "별점", type: "rating", x: 30, y: 232, fontSize: 22, align: "left" },
        { key: "comment", label: "코멘트", type: "multiline", x: 30, y: 300, maxWidth: 700, fontSize: 14, lineHeight: 22, align: "left", placeholder: "짧은 감상평을 적어보세요." },
      ],
    },
  },
  {
    id: "photo-story",
    name: "정사각형",
    width: 480,
    height: 480,
    edge: { corner: 14, bumpRadius: 0 },
    borderWidth: 0,
    colors: {
      bg: "#fdf6f2",
      border: "transparent",
      textPrimary: "#222222",
      textSecondary: "#777777",
      placeholderColor: "rgba(34,34,34,0.3)",
    },
    front: {
      fields: [{ key: "title", label: "메인 타이틀", type: "text", x: 30, y: 70, align: "left", fontStyle: "italic", fontWeight: 700, fontSize: 46, maxWidth: 320, placeholder: "MOVIE TITLE" }],
    },
    back: {
      decorations: [
        { type: "line", x1: 30, y1: 95, x2: 450, y2: 95, color: "rgba(34,34,34,0.6)" },
        { type: "line", x1: 30, y1: 380, x2: 450, y2: 380, color: "rgba(34,34,34,0.3)" },
      ],
      fields: [
        { key: "album", label: "메인 타이틀", type: "text", x: 30, y: 60, align: "left", fontStyle: "italic", fontWeight: 700, fontSize: 32, maxWidth: 420, placeholder: "MOVIE TITLE" },
        { key: "release", label: "날짜", type: "text", x: 30, y: 130, align: "left", fontSize: 13, maxWidth: 420, placeholder: "2026.00.00", isDateField: true },
        { key: "artist", label: "캐스트", type: "text", x: 30, y: 155, align: "left", fontSize: 13, maxWidth: 420, placeholder: "Cast" },
        { key: "rating", label: "별점", type: "rating", x: 30, y: 400, fontSize: 20, align: "left" },
        { key: "review", label: "코멘트", type: "text", x: 30, y: 435, align: "left", fontStyle: "italic", fontSize: 13, maxWidth: 420, placeholder: "짧은 감상평을 적어보세요." },
      ],
    },
  },
];

/* =====================================================================
   상태 관리
   ===================================================================== */
const state = {
  activeTemplateId: TEMPLATES[0].id,
  activeSide: "front",
  // data[templateId][side] = { layers: [...], textItems: [...] }
  data: {},
};

// 현재 선택된 항목: { type: "layer" | "text", id } 또는 null
let selected = null;

function getActiveTemplate() {
  return TEMPLATES.find((t) => t.id === state.activeTemplateId);
}

function createTextItemFromField(field) {
  return {
    id: `field-${field.key}`,
    key: field.key,
    label: field.label,
    type: field.type,
    text: field.default || "",
    x: field.x,
    y: field.y,
    defaultX: field.x,
    defaultY: field.y,
    align: field.align || "left",
    maxWidth: field.maxWidth || 300,
    lineHeight: field.lineHeight || Math.round((field.fontSize || 16) * 1.3),
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: field.fontSize || 16,
    fontWeight: field.fontWeight || 400,
    fontStyle: field.fontStyle || "normal",
    color: field.color || null,
    placeholder: field.placeholder || "",
    enabled: true,
    isCustom: false,
    isDateField: !!field.isDateField,
    useTodayDate: false,
  };
}

function ensureSideState(templateId, side) {
  const tpl = TEMPLATES.find((t) => t.id === templateId);
  state.data[templateId] = state.data[templateId] || {};
  if (!state.data[templateId][side]) {
    const textItems = tpl[side].fields.map(createTextItemFromField);
    state.data[templateId][side] = { layers: [], textItems, dividerOrientation: "horizontal" };
  }
  return state.data[templateId][side];
}

function getSideState() {
  return ensureSideState(state.activeTemplateId, state.activeSide);
}

/* =====================================================================
   티켓 모양 (스캘럽 노치 + 둥근 모서리)을 캔버스 경로로 그린다
   ===================================================================== */
function appendTicketOutline(ctx, w, h, edge) {
  const bumpRadius = edge.bumpRadius ?? 0;

  if (bumpRadius <= 0) {
    const corner = edge.corner ?? 16;
    ctx.moveTo(corner, 0);
    ctx.lineTo(w - corner, 0);
    ctx.arcTo(w, 0, w, corner, corner);
    ctx.lineTo(w, h - corner);
    ctx.arcTo(w, h, w - corner, h, corner);
    ctx.lineTo(corner, h);
    ctx.arcTo(0, h, 0, h - corner, corner);
    ctx.lineTo(0, corner);
    ctx.arcTo(0, 0, corner, 0, corner);
    ctx.closePath();
    return;
  }

  // 네 꼭짓점은 일반 노치보다 더 큰 원으로 파낸다(1/4원, cornerRadius).
  // 상/하단 사이는 일반 반원 노치(bumpRadius)로 채우고, 좌/우 변은 직선으로 유지한다.
  // 펀칭과 펀칭 사이(꼭짓점 펀칭 <-> 첫/마지막 노치 포함)의 여백은 일반 노치의
  // 너비(지름)만큼 자연스럽게 띄운다.
  const r = bumpRadius;
  const cr = edge.cornerRadius ?? r;
  const notchGap = edge.gap ?? r * 2;
  const step = 2 * r + notchGap;
  const hStart = cr + notchGap + r;
  const hEnd = w - (cr + notchGap + r);
  const hSpan = Math.max(0, hEnd - hStart);
  const hCount = Math.max(1, Math.round(hSpan / step) + 1);
  const hStep = hCount > 1 ? hSpan / (hCount - 1) : 0;

  ctx.moveTo(cr, 0);

  // 상단: 왼쪽 -> 오른쪽 일반 노치들
  for (let i = 0; i < hCount; i++) {
    const cx = hCount === 1 ? (hStart + hEnd) / 2 : hStart + hStep * i;
    ctx.lineTo(cx - r, 0);
    ctx.arc(cx, 0, r, Math.PI, 0, true);
  }
  ctx.lineTo(w - cr, 0);

  // 우상단 꼭짓점 펀칭 (1/4원, 더 큰 반지름)
  ctx.arc(w, 0, cr, Math.PI, 0.5 * Math.PI, true);

  // 오른쪽 변: 직선
  ctx.lineTo(w, h - cr);

  // 우하단 꼭짓점 펀칭
  ctx.arc(w, h, cr, 1.5 * Math.PI, Math.PI, true);

  // 하단: 오른쪽 -> 왼쪽 일반 노치들
  for (let i = 0; i < hCount; i++) {
    const cx = hCount === 1 ? (hStart + hEnd) / 2 : hEnd - hStep * i;
    ctx.lineTo(cx + r, h);
    ctx.arc(cx, h, r, 0, Math.PI, true);
  }
  ctx.lineTo(cr, h);

  // 좌하단 꼭짓점 펀칭
  ctx.arc(0, h, cr, 0, -0.5 * Math.PI, true);

  // 왼쪽 변: 직선
  ctx.lineTo(0, cr);

  // 좌상단 꼭짓점 펀칭
  ctx.arc(0, 0, cr, 0.5 * Math.PI, 0, true);

  ctx.closePath();
}

function traceTicketPath(ctx, w, h, edge) {
  ctx.beginPath();
  appendTicketOutline(ctx, w, h, edge);
}

/* =====================================================================
   텍스트 줄바꿈 유틸
   ===================================================================== */
function wrapText(ctx, text, maxWidth) {
  const paragraphs = text.split("\n");
  const lines = [];
  paragraphs.forEach((para) => {
    if (!para) {
      lines.push("");
      return;
    }
    const words = para.split(" ");
    let current = "";
    words.forEach((word) => {
      const test = current ? `${current} ${word}` : word;
      if (current && ctx.measureText(test).width > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    });
    lines.push(current);
  });
  return lines;
}

// <input type="color">는 정확한 #rrggbb 형식만 허용하므로 값을 안전하게 보정한다.
function normalizeColorForPicker(color) {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#ffffff";
}

// 날짜 필드의 "오늘 날짜 자동입력"에 쓰인다.
function formatToday() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

function composeFont(item) {
  const style = item.fontStyle === "italic" ? "italic " : "";
  const weight = item.fontWeight || 400;
  return `${style}${weight} ${item.fontSize}px ${item.fontFamily}`;
}

/* =====================================================================
   캔버스 렌더링
   ===================================================================== */
const canvas = document.getElementById("ticketCanvas");
const ctx = canvas.getContext("2d");
const canvasWrap = document.querySelector(".tm-canvas-wrap");

function drawTemplateBackground(tpl) {
  if (tpl.colors.bgTop && tpl.colors.bgBottom) {
    const grad = ctx.createLinearGradient(0, 0, 0, tpl.height);
    grad.addColorStop(0, tpl.colors.bgTop);
    grad.addColorStop(1, tpl.colors.bgBottom);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = tpl.colors.bg || "#ffffff";
  }
  ctx.fillRect(0, 0, tpl.width, tpl.height);
}

function drawStaticText(deco) {
  ctx.font = deco.font;
  ctx.fillStyle = deco.color;
  ctx.textAlign = deco.align || "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(deco.text, deco.x, deco.y);
}

function drawLine(deco) {
  ctx.strokeStyle = deco.color;
  ctx.lineWidth = deco.width || 1;
  ctx.beginPath();
  ctx.moveTo(deco.x1, deco.y1);
  ctx.lineTo(deco.x2, deco.y2);
  ctx.stroke();
}

// 일부 구분선은 가로/세로 방향을 사용자가 선택할 수 있도록 variants로 좌표를 나눠 갖는다.
function drawDecorations(decorations, data) {
  (decorations || []).forEach((deco) => {
    if (deco.type === "line") {
      const coords = deco.variants ? deco.variants[data.dividerOrientation || "horizontal"] : deco;
      drawLine({ ...deco, ...coords });
    } else if (deco.type === "text") {
      drawStaticText(deco);
    }
  });
}

// 텍스트 항목의 대략적인 경계 상자를 계산한다 (선택/드래그 히트테스트용).
function computeTextItemBBox(item) {
  ctx.font = composeFont(item);
  const align = item.align || "left";

  if (item.type === "rating") {
    const w = item.fontSize * 5 * 1.1;
    const h = item.fontSize * 1.3;
    let x0 = item.x;
    if (align === "center") x0 -= w / 2;
    else if (align === "right") x0 -= w;
    return { x: x0, y: item.y - item.fontSize, w, h };
  }

  const value = (item.text ?? "").toString();
  const displayText = value.trim() ? value : item.placeholder || "";
  const text = displayText || " ";
  const lines = item.type === "multiline" ? wrapText(ctx, text, item.maxWidth || 300) : [text];
  const lineHeight = item.lineHeight || Math.round(item.fontSize * 1.3);
  const widths = lines.map((l) => ctx.measureText(l || " ").width);
  const w = Math.max(...widths, 24);
  let x0 = item.x;
  if (align === "center") x0 -= w / 2;
  else if (align === "right") x0 -= w;
  const ascent = item.fontSize;
  const h = Math.max(lines.length * lineHeight, ascent);
  return { x: x0, y: item.y - ascent * 0.85, w, h };
}

// 편집 중인 줄 끝에 깜빡이는 커서를 그린다 (실제 캐럿 위치까지는 아니고 마지막 글자 뒤).
function drawTextCursor(item, lineText, lineY) {
  ctx.font = composeFont(item);
  ctx.textAlign = "left";
  const width = ctx.measureText(lineText).width;
  let baseX = item.x;
  if (item.align === "center") baseX -= width / 2;
  else if (item.align === "right") baseX -= width;
  const cursorX = baseX + width + 2;
  ctx.strokeStyle = item.color || "#33ccff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cursorX, lineY - item.fontSize * 0.85);
  ctx.lineTo(cursorX, lineY + item.fontSize * 0.2);
  ctx.stroke();
}

function drawTextItem(item, tpl) {
  const isEditing = editingItemId === item.id;

  if (item.type === "rating") {
    const rating = Number(item.text) || 0;
    ctx.font = composeFont(item);
    ctx.fillStyle = item.color || tpl.colors.textPrimary;
    ctx.textAlign = item.align || "left";
    ctx.textBaseline = "alphabetic";
    let stars = "";
    for (let i = 0; i < 5; i++) stars += i < rating ? "★" : "☆";
    ctx.fillText(stars, item.x, item.y);
    return;
  }

  const value = (item.text ?? "").toString();
  const isPlaceholder = !isEditing && !value.trim();
  const displayText = isPlaceholder ? item.placeholder || "" : value;
  if (!displayText && !isEditing) return;

  ctx.font = composeFont(item);
  ctx.fillStyle = isPlaceholder ? tpl.colors.placeholderColor : item.color || tpl.colors.textPrimary;
  ctx.textAlign = item.align || "left";
  ctx.textBaseline = "alphabetic";

  let lastLineText = "";
  let lastLineY = item.y;

  if (item.type === "multiline") {
    const lines = wrapText(ctx, displayText || " ", item.maxWidth || 300);
    const lineHeight = item.lineHeight || Math.round(item.fontSize * 1.3);
    // fillText의 4번째 인자(maxWidth)를 넘기면 글자가 찌그러지므로 쓰지 않는다.
    // 줄바꿈은 이미 wrapText에서 처리했으니, 넘치는 단어가 있어도 그대로 흘러넘치게 둔다.
    lines.forEach((line, i) => ctx.fillText(line, item.x, item.y + i * lineHeight));
    lastLineText = lines[lines.length - 1] || "";
    lastLineY = item.y + (lines.length - 1) * lineHeight;
  } else {
    ctx.fillText(displayText, item.x, item.y);
    lastLineText = displayText;
    lastLineY = item.y;
  }

  if (isEditing && cursorBlinkOn) {
    drawTextCursor(item, lastLineText, lastLineY);
  }
}

// 모든 텍스트 항목의 히트박스를 계산하고, 켜져 있는 것만 그린다.
function drawAllTextItems(data, tpl) {
  data.textItems.forEach((item) => {
    item._bbox = computeTextItemBBox(item);
    if (item.enabled) drawTextItem(item, tpl);
  });
}

// 벡터 (x,y)를 angle(라디안)만큼 회전시킨다.
function rotateVec(x, y, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - y * sin, y: x * sin + y * cos };
}

// 레이어의 회전을 반영한 네 모서리(tl/tr/bl/br)의 캔버스 좌표를 구한다.
function getLayerCorners(layer) {
  const halfW = layer.w / 2;
  const halfH = layer.h / 2;
  const cx = layer.x + halfW;
  const cy = layer.y + halfH;
  const rotation = layer.rotation || 0;
  const local = {
    tl: { x: -halfW, y: -halfH },
    tr: { x: halfW, y: -halfH },
    bl: { x: -halfW, y: halfH },
    br: { x: halfW, y: halfH },
  };
  const result = {};
  Object.keys(local).forEach((key) => {
    const r = rotateVec(local[key].x, local[key].y, rotation);
    result[key] = { x: cx + r.x, y: cy + r.y };
  });
  return result;
}

// 이미지 위에 은은한 흰/검정 그라데이션을 덮어서 사진과 텍스트가 자연스럽게 어우러지게 한다.
function drawLayerGradientOverlay(layer, gradientKey) {
  const [color, dir] = gradientKey.split("-");
  let x0 = layer.x;
  let y0 = layer.y;
  let x1 = layer.x;
  let y1 = layer.y + layer.h;
  if (dir === "top") {
    y0 = layer.y + layer.h;
    y1 = layer.y;
  } else if (dir === "left") {
    x0 = layer.x + layer.w;
    y0 = layer.y;
    x1 = layer.x;
    y1 = layer.y;
  } else if (dir === "right") {
    x0 = layer.x;
    y0 = layer.y;
    x1 = layer.x + layer.w;
    y1 = layer.y;
  }

  const rgb = color === "white" ? "255,255,255" : "0,0,0";
  const grad = ctx.createLinearGradient(x0, y0, x1, y1);
  grad.addColorStop(0, `rgba(${rgb},0)`);
  grad.addColorStop(1, `rgba(${rgb},0.85)`);
  ctx.fillStyle = grad;
  ctx.fillRect(layer.x, layer.y, layer.w, layer.h);
}

function drawLayerImage(layer) {
  if (!layer.img || !layer.img.complete) return;
  const rotation = layer.rotation || 0;
  const effects = layer.effects || createDefaultEffects();

  ctx.save();
  if (rotation) {
    const cx = layer.x + layer.w / 2;
    const cy = layer.y + layer.h / 2;
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.translate(-cx, -cy);
  }

  const filters = [];
  if (effects.grayscale) filters.push("grayscale(1)");
  if (effects.blur > 0) filters.push(`blur(${effects.blur}px)`);
  ctx.filter = filters.length ? filters.join(" ") : "none";

  ctx.drawImage(layer.img, layer.x, layer.y, layer.w, layer.h);
  ctx.filter = "none";

  if (effects.gradient && effects.gradient !== "none") {
    drawLayerGradientOverlay(layer, effects.gradient);
  }

  ctx.restore();
}

// 텍스트 선택 박스: 회전이 없는 단순 사각형, 핸들 없음.
function drawTextSelectionBox(box) {
  ctx.save();
  ctx.strokeStyle = "#33ccff";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(box.x, box.y, box.w, box.h);
  ctx.setLineDash([]);
  ctx.restore();
}

// 이미지 선택 박스: 회전을 반영해 그리고, tl/bl/br은 리사이즈 핸들(네모),
// tr은 회전 핸들(동그라미)로 표시한다.
function drawLayerSelectionBox(layer) {
  const corners = getLayerCorners(layer);
  ctx.save();
  ctx.strokeStyle = "#33ccff";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(corners.tl.x, corners.tl.y);
  ctx.lineTo(corners.tr.x, corners.tr.y);
  ctx.lineTo(corners.br.x, corners.br.y);
  ctx.lineTo(corners.bl.x, corners.bl.y);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#33ccff";
  ["tl", "bl", "br"].forEach((key) => {
    const p = corners[key];
    ctx.fillRect(p.x - 7, p.y - 7, 14, 14);
  });

  // 회전 핸들: 리사이즈 네모 핸들과 헷갈리지 않도록 동그란 배경 위에
  // 회전 화살표(↻) 아이콘을 그려서 "회전 기능"임을 바로 알아볼 수 있게 한다.
  const rp = corners.tr;
  ctx.beginPath();
  ctx.arc(rp.x, rp.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "#33ccff";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#1478a8";
  ctx.font = "13px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("↻", rp.x, rp.y + 0.5);

  ctx.restore();
}

// 티켓 모양 "바깥" 영역만 어둡게 덮어서, 편집 중에는 잘려나갈 부분을 안내선처럼 보여준다.
function drawOutsideDim(tpl, rect) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  appendTicketOutline(ctx, tpl.width, tpl.height, tpl.edge);
  ctx.clip("evenodd");
  ctx.fillStyle = "rgba(6, 6, 8, 0.6)";
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.restore();
}

// 편집 중에는 캔버스를 티켓보다 크게 두어, 티켓 밖으로 나간 이미지도 잡을 수 있게 한다.
// 스크롤이 생기면 보기 좋지 않으므로, 여백은 항상 보이는 편집 영역(래퍼) 크기에 맞춰 계산한다.
const MIN_EDIT_MARGIN = 70;
let currentMarginX = MIN_EDIT_MARGIN;
let currentMarginY = MIN_EDIT_MARGIN;

function computeEditMargins(tpl) {
  const style = getComputedStyle(canvasWrap);
  const padX = parseFloat(style.paddingLeft || "0") + parseFloat(style.paddingRight || "0");
  const padY = parseFloat(style.paddingTop || "0") + parseFloat(style.paddingBottom || "0");
  const availW = Math.max(tpl.width, canvasWrap.clientWidth - padX);
  const availH = Math.max(tpl.height, canvasWrap.clientHeight - padY);
  return {
    marginX: Math.max(MIN_EDIT_MARGIN, (availW - tpl.width) / 2),
    marginY: Math.max(MIN_EDIT_MARGIN, (availH - tpl.height) / 2),
  };
}

function renderCanvas(opts = {}) {
  const tpl = getActiveTemplate();

  let marginX = 0;
  let marginY = 0;
  if (!opts.forExport) {
    const m = computeEditMargins(tpl);
    marginX = m.marginX;
    marginY = m.marginY;
  }
  currentMarginX = marginX;
  currentMarginY = marginY;

  canvas.width = tpl.width + marginX * 2;
  canvas.height = tpl.height + marginY * 2;

  const sideDef = tpl[state.activeSide];
  const data = getSideState();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(marginX, marginY);

  if (opts.forExport) {
    // 내보내기: 티켓 모양대로 완전히 잘라서 그린다 (배경 투명 PNG).
    ctx.save();
    traceTicketPath(ctx, tpl.width, tpl.height, tpl.edge);
    ctx.clip();
    drawTemplateBackground(tpl);
    data.layers.forEach(drawLayerImage);
    drawDecorations(sideDef.decorations, data);
    drawAllTextItems(data, tpl);
    ctx.restore();
  } else if (selected && selected.type === "layer") {
    // 이미지·스티커를 선택해 조작하는 중에는 티켓 밖(여백 포함)으로 나간 부분도
    // 그대로 보이게 해서 위치·크기 조절을 쉽게 한다.
    ctx.save();
    traceTicketPath(ctx, tpl.width, tpl.height, tpl.edge);
    ctx.clip();
    drawTemplateBackground(tpl);
    ctx.restore();

    data.layers.forEach(drawLayerImage);

    drawOutsideDim(tpl, {
      x: -marginX,
      y: -marginY,
      w: tpl.width + marginX * 2,
      h: tpl.height + marginY * 2,
    });

    ctx.save();
    traceTicketPath(ctx, tpl.width, tpl.height, tpl.edge);
    ctx.clip();
    drawDecorations(sideDef.decorations, data);
    drawAllTextItems(data, tpl);
    ctx.restore();
  } else {
    // 아무 이미지도 선택하지 않았을 때는 내보내기 결과와 똑같이 완전히 잘라서 보여준다.
    // 이렇게 하면 편집 화면 자체가 미리보기 역할을 해서 따로 미리보기 창이 필요 없다.
    ctx.save();
    traceTicketPath(ctx, tpl.width, tpl.height, tpl.edge);
    ctx.clip();
    drawTemplateBackground(tpl);
    data.layers.forEach(drawLayerImage);
    drawDecorations(sideDef.decorations, data);
    drawAllTextItems(data, tpl);
    ctx.restore();
  }

  // 테두리는 borderWidth가 0으로 명시된 경우(예: 정사각형 템플릿)에는 그리지 않는다.
  const borderWidth = tpl.borderWidth === undefined ? 1.5 : tpl.borderWidth;
  if (borderWidth > 0) {
    traceTicketPath(ctx, tpl.width, tpl.height, tpl.edge);
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = tpl.colors.border;
    ctx.stroke();
  }

  if (!opts.forExport && selected) {
    if (selected.type === "layer") {
      const layer = getSelectedLayer();
      if (layer) drawLayerSelectionBox(layer);
    } else if (selected.type === "text") {
      const item = getSelectedTextItem();
      if (item && item._bbox) drawTextSelectionBox(item._bbox);
    }
  }

  ctx.restore(); // 바깥 translate 해제
}

/* =====================================================================
   상호작용 (드래그 이동 / 모서리 리사이즈 / 선택)
   ===================================================================== */
function getCanvasPoint(evt) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  // 레이어·텍스트 좌표는 티켓 기준(0,0)이므로, 편집용 캔버스 여백만큼 빼서 보정한다.
  return {
    x: (evt.clientX - rect.left) * scaleX - currentMarginX,
    y: (evt.clientY - rect.top) * scaleY - currentMarginY,
  };
}

function getSelectedLayer() {
  if (!selected || selected.type !== "layer") return null;
  return getSideState().layers.find((l) => l.id === selected.id) || null;
}

function getSelectedTextItem() {
  if (!selected || selected.type !== "text") return null;
  return getSideState().textItems.find((i) => i.id === selected.id) || null;
}

// 이미지 레이어의 tl/bl/br 모서리 중 어느 리사이즈 핸들을 눌렀는지 찾는다
// (tr은 리사이즈가 아니라 회전 핸들이라 여기서는 제외한다).
function hitTestResizeHandle(pt, layer) {
  const size = 22;
  const corners = getLayerCorners(layer);
  for (const key of ["tl", "bl", "br"]) {
    const p = corners[key];
    if (Math.abs(pt.x - p.x) <= size / 2 && Math.abs(pt.y - p.y) <= size / 2) return key;
  }
  return null;
}

// tr 모서리(회전 핸들)를 눌렀는지 확인한다.
function hitTestRotateHandle(pt, layer) {
  const corners = getLayerCorners(layer);
  const p = corners.tr;
  const dx = pt.x - p.x;
  const dy = pt.y - p.y;
  return Math.sqrt(dx * dx + dy * dy) <= 13;
}

// 잡은 모서리의 반대쪽 모서리가 "화면상"에서 고정되도록, 회전을 감안해 크기를 바꾼다.
function applyCornerResize(layer, start, handle, dx, dy) {
  const rotation = start.rotation || 0;
  // 캔버스 기준 이동량(dx,dy)을 레이어의 회전된 로컬 x축 방향으로 투영한다.
  const localDx = dx * Math.cos(rotation) + dy * Math.sin(rotation);

  const aspect = start.w / start.h;
  const growsWithDx = handle === "br";
  const newW = Math.max(24, growsWithDx ? start.w + localDx : start.w - localDx);
  const newH = newW / aspect;

  const oldHalfW = start.w / 2;
  const oldHalfH = start.h / 2;
  const newHalfW = newW / 2;
  const newHalfH = newH / 2;

  let anchorOldLocal;
  let anchorNewLocal;
  if (handle === "br") {
    anchorOldLocal = { x: -oldHalfW, y: -oldHalfH };
    anchorNewLocal = { x: -newHalfW, y: -newHalfH };
  } else if (handle === "tl") {
    anchorOldLocal = { x: oldHalfW, y: oldHalfH };
    anchorNewLocal = { x: newHalfW, y: newHalfH };
  } else {
    // bl
    anchorOldLocal = { x: oldHalfW, y: -oldHalfH };
    anchorNewLocal = { x: newHalfW, y: -newHalfH };
  }

  const oldCenter = { x: start.x + oldHalfW, y: start.y + oldHalfH };
  const anchorOldRotated = rotateVec(anchorOldLocal.x, anchorOldLocal.y, rotation);
  const anchorCanvas = { x: oldCenter.x + anchorOldRotated.x, y: oldCenter.y + anchorOldRotated.y };
  const anchorNewRotated = rotateVec(anchorNewLocal.x, anchorNewLocal.y, rotation);
  const newCenter = { x: anchorCanvas.x - anchorNewRotated.x, y: anchorCanvas.y - anchorNewRotated.y };

  layer.w = newW;
  layer.h = newH;
  layer.x = newCenter.x - newHalfW;
  layer.y = newCenter.y - newHalfH;
}

// 회전된 이미지도 정확히 클릭 판정할 수 있도록, 점을 레이어의 로컬(회전 안 된)
// 좌표계로 변환해서 사각형 안에 있는지 검사한다.
function isPointInLayer(pt, layer) {
  const halfW = layer.w / 2;
  const halfH = layer.h / 2;
  const cx = layer.x + halfW;
  const cy = layer.y + halfH;
  const rotation = layer.rotation || 0;
  const local = rotateVec(pt.x - cx, pt.y - cy, -rotation);
  return local.x >= -halfW && local.x <= halfW && local.y >= -halfH && local.y <= halfH;
}

function hitTestLayers(pt) {
  const layers = getSideState().layers;
  for (let i = layers.length - 1; i >= 0; i--) {
    if (isPointInLayer(pt, layers[i])) return layers[i];
  }
  return null;
}

function hitTestTextItems(pt) {
  const items = getSideState().textItems;
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (!item.enabled || !item._bbox) continue;
    const box = item._bbox;
    if (pt.x >= box.x && pt.x <= box.x + box.w && pt.y >= box.y && pt.y <= box.y + box.h) return item;
  }
  return null;
}

let dragMode = null; // "move" | "resize" | "rotate" | null
let dragStartPoint = null;
let dragStart = null; // { x, y, w?, h?, rotation? }
let resizeHandle = null; // "tl" | "bl" | "br"
let dragStartAngle = 0;

function afterSelectionChange() {
  updateDeleteButtonState();
  renderLayerList();
  renderLayerEffectsPanel();
  renderCanvas();
}

canvas.addEventListener("mousedown", (e) => {
  const pt = getCanvasPoint(e);

  // 1) 이미지가 선택되어 있으면 회전 핸들(tr) -> 리사이즈 핸들(tl/bl/br) 순으로 확인한다.
  if (selected && selected.type === "layer") {
    const layer = getSelectedLayer();
    if (layer && hitTestRotateHandle(pt, layer)) {
      dragMode = "rotate";
      dragStartPoint = pt;
      dragStart = { x: layer.x, y: layer.y, w: layer.w, h: layer.h, rotation: layer.rotation || 0 };
      const cx = layer.x + layer.w / 2;
      const cy = layer.y + layer.h / 2;
      dragStartAngle = Math.atan2(pt.y - cy, pt.x - cx);
      renderCanvas();
      return;
    }
    const handle = layer && hitTestResizeHandle(pt, layer);
    if (handle) {
      dragMode = "resize";
      resizeHandle = handle;
      dragStartPoint = pt;
      dragStart = { x: layer.x, y: layer.y, w: layer.w, h: layer.h, rotation: layer.rotation || 0 };
      renderCanvas();
      return;
    }
  }

  // 2) 텍스트가 이미지보다 위에 그려지므로 텍스트를 먼저 히트테스트한다.
  const textHit = hitTestTextItems(pt);
  if (textHit) {
    selected = { type: "text", id: textHit.id };
    dragMode = "move";
    dragStartPoint = pt;
    dragStart = { x: textHit.x, y: textHit.y };
    afterSelectionChange();
    return;
  }

  // 3) 이미지 레이어 히트테스트
  const layerHit = hitTestLayers(pt);
  if (layerHit) {
    selected = { type: "layer", id: layerHit.id };
    dragMode = "move";
    dragStartPoint = pt;
    dragStart = { x: layerHit.x, y: layerHit.y, w: layerHit.w, h: layerHit.h };
    afterSelectionChange();
    return;
  }

  // 4) 빈 곳 클릭 -> 선택 해제
  selected = null;
  dragMode = null;
  afterSelectionChange();
});

// 캔버스에서 텍스트를 더블클릭하면 그 자리에서 바로 수정할 수 있다.
canvas.addEventListener("dblclick", (e) => {
  const pt = getCanvasPoint(e);
  const item = hitTestTextItems(pt);
  if (!item || item.type === "rating") return;
  startInlineTextEdit(item);
});

// 편집 중인 텍스트 항목의 id. 캔버스 위에서 실제 값과 깜빡이는 커서를 직접 그려서
// "그 자리에서 바로 수정하는" 느낌을 준다. 실제 키 입력/한글 조합(IME)은 화면 밖에
// 숨겨둔 input이 담당하고, 화면에는 흰 박스 대신 캔버스 렌더링만 보이게 한다.
let editingItemId = null;
let cursorBlinkOn = true;
let cursorBlinkTimer = null;

function startInlineTextEdit(item) {
  if (editingItemId) return;
  dragMode = null;
  selected = { type: "text", id: item.id };
  editingItemId = item.id;

  const isMultiline = item.type === "multiline";
  const inputEl = document.createElement(isMultiline ? "textarea" : "input");
  if (!isMultiline) inputEl.type = "text";
  inputEl.className = "inline-text-capture";
  inputEl.value = item.text || "";

  document.body.appendChild(inputEl);
  inputEl.focus();
  inputEl.select();

  function syncFromInput() {
    item.text = inputEl.value;
    renderCanvas();
  }

  function stopEditing() {
    if (editingItemId !== item.id) return;
    editingItemId = null;
    if (cursorBlinkTimer) {
      clearInterval(cursorBlinkTimer);
      cursorBlinkTimer = null;
    }
    inputEl.remove();
    renderFieldsPanel();
    renderCanvas();
  }

  inputEl.addEventListener("input", syncFromInput);
  inputEl.addEventListener("blur", stopEditing);
  inputEl.addEventListener("keydown", (ev) => {
    ev.stopPropagation();
    if (ev.key === "Enter" && !isMultiline) {
      ev.preventDefault();
      inputEl.blur();
    } else if (ev.key === "Escape") {
      inputEl.blur();
    }
  });

  cursorBlinkTimer = setInterval(() => {
    cursorBlinkOn = !cursorBlinkOn;
    if (editingItemId === item.id) renderCanvas();
  }, 500);

  cursorBlinkOn = true;
  afterSelectionChange();
}

window.addEventListener("mousemove", (e) => {
  if (!dragMode || !selected) return;
  const pt = getCanvasPoint(e);
  const dx = pt.x - dragStartPoint.x;
  const dy = pt.y - dragStartPoint.y;

  if (selected.type === "layer") {
    const layer = getSelectedLayer();
    if (!layer) return;
    if (dragMode === "move") {
      layer.x = dragStart.x + dx;
      layer.y = dragStart.y + dy;
    } else if (dragMode === "resize") {
      applyCornerResize(layer, dragStart, resizeHandle, dx, dy);
    } else if (dragMode === "rotate") {
      const cx = dragStart.x + dragStart.w / 2;
      const cy = dragStart.y + dragStart.h / 2;
      const currentAngle = Math.atan2(pt.y - cy, pt.x - cx);
      layer.rotation = dragStart.rotation + (currentAngle - dragStartAngle);
    }
  } else if (selected.type === "text") {
    const item = getSelectedTextItem();
    if (!item) return;
    item.x = dragStart.x + dx;
    item.y = dragStart.y + dy;
  }
  renderCanvas();
});

window.addEventListener("mouseup", () => {
  dragMode = null;
  resizeHandle = null;
});

document.addEventListener("keydown", (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
  if ((e.key === "Delete" || e.key === "Backspace") && selected) {
    e.preventDefault();
    deleteSelected();
  }
});

/* =====================================================================
   레이어 목록 패널 (이미지 · 스티커)
   ===================================================================== */
const layerListEl = document.getElementById("layerList");
const deleteLayerBtn = document.getElementById("deleteLayerBtn");

function updateDeleteButtonState() {
  deleteLayerBtn.disabled = !selected;
}

function renderLayerList() {
  const layers = getSideState().layers;
  layerListEl.innerHTML = "";

  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i];
    const isSelected = !!(selected && selected.type === "layer" && selected.id === layer.id);
    const li = document.createElement("li");
    li.className = "layer-item" + (isSelected ? " selected" : "");

    const thumb = document.createElement("img");
    thumb.className = "layer-thumb";
    thumb.src = layer.img.src;
    thumb.alt = "";

    const name = document.createElement("span");
    name.className = "layer-name";
    name.textContent = `이미지 ${i + 1}`;

    const actions = document.createElement("div");
    actions.className = "layer-actions";

    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.className = "layer-btn";
    upBtn.title = "앞으로";
    upBtn.textContent = "▲";
    upBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      moveLayerStep(layer.id, 1);
    });

    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.className = "layer-btn";
    downBtn.title = "뒤로";
    downBtn.textContent = "▼";
    downBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      moveLayerStep(layer.id, -1);
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "layer-btn danger";
    delBtn.title = "삭제";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteLayer(layer.id);
    });

    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
    actions.appendChild(delBtn);

    li.appendChild(thumb);
    li.appendChild(name);
    li.appendChild(actions);

    li.addEventListener("click", () => {
      selected = { type: "layer", id: layer.id };
      afterSelectionChange();
    });

    layerListEl.appendChild(li);
  }

  renderLayerEffectsPanel();
}

/* ---------- 선택한 이미지 효과 (흑백 / 블러 / 그라데이션) ---------- */
const layerEffectsEl = document.getElementById("layerEffects");
const effectGrayscaleInput = document.getElementById("effectGrayscale");
const effectBlurInput = document.getElementById("effectBlur");
const effectGradientInput = document.getElementById("effectGradient");

function renderLayerEffectsPanel() {
  const layer = getSelectedLayer();
  if (!layer) {
    layerEffectsEl.hidden = true;
    return;
  }
  if (!layer.effects) layer.effects = createDefaultEffects();

  layerEffectsEl.hidden = false;
  effectGrayscaleInput.checked = !!layer.effects.grayscale;
  effectBlurInput.value = layer.effects.blur || 0;
  effectGradientInput.value = layer.effects.gradient || "none";
}

effectGrayscaleInput.addEventListener("change", () => {
  const layer = getSelectedLayer();
  if (!layer) return;
  layer.effects.grayscale = effectGrayscaleInput.checked;
  renderCanvas();
});

effectBlurInput.addEventListener("input", () => {
  const layer = getSelectedLayer();
  if (!layer) return;
  layer.effects.blur = Number(effectBlurInput.value) || 0;
  renderCanvas();
});

effectGradientInput.addEventListener("change", () => {
  const layer = getSelectedLayer();
  if (!layer) return;
  layer.effects.gradient = effectGradientInput.value;
  renderCanvas();
});

function moveLayerStep(id, dir) {
  const layers = getSideState().layers;
  const idx = layers.findIndex((l) => l.id === id);
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= layers.length) return;
  [layers[idx], layers[newIdx]] = [layers[newIdx], layers[idx]];
  renderLayerList();
  renderCanvas();
}

function deleteLayer(id) {
  const layers = getSideState().layers;
  const idx = layers.findIndex((l) => l.id === id);
  if (idx >= 0) layers.splice(idx, 1);
  if (selected && selected.type === "layer" && selected.id === id) selected = null;
  updateDeleteButtonState();
  renderLayerList();
  renderCanvas();
}

function deleteSelected() {
  if (!selected) return;

  if (selected.type === "layer") {
    deleteLayer(selected.id);
    return;
  }

  const item = getSelectedTextItem();
  if (!item) return;

  if (item.isCustom) {
    removeCustomTextItem(item.id);
  } else {
    // 템플릿 기본 항목은 완전히 지우는 대신 꺼짐 상태로 되돌린다.
    item.enabled = false;
    selected = null;
    updateDeleteButtonState();
    renderFieldsPanel();
    renderCanvas();
  }
}

deleteLayerBtn.addEventListener("click", deleteSelected);

/* =====================================================================
   이미지 · 스티커 추가
   ===================================================================== */
const addImageBtn = document.getElementById("addImageBtn");
const imageFileInput = document.getElementById("imageFileInput");
const copyOtherSideBtn = document.getElementById("copyOtherSideBtn");

function createDefaultEffects() {
  return { grayscale: false, blur: 0, gradient: "none" };
}

addImageBtn.addEventListener("click", () => imageFileInput.click());

imageFileInput.addEventListener("change", () => {
  const files = Array.from(imageFileInput.files || []);
  files.forEach(addImageLayerFromFile);
  imageFileInput.value = "";
});

// 반대 면에 있는 이미지·스티커를 현재 면으로 그대로 복사해온다 (앞뒤 사진을 맞출 때 사용).
copyOtherSideBtn.addEventListener("click", () => {
  const otherSide = state.activeSide === "front" ? "back" : "front";
  const otherData = ensureSideState(state.activeTemplateId, otherSide);
  if (otherData.layers.length === 0) return;

  const currentData = getSideState();
  const cloned = otherData.layers.map((l) => ({
    ...l,
    id: `layer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    effects: l.effects ? { ...l.effects } : createDefaultEffects(),
  }));
  currentData.layers.push(...cloned);
  selected = { type: "layer", id: cloned[cloned.length - 1].id };
  afterSelectionChange();
});

function addImageLayerFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const tpl = getActiveTemplate();
      const sideState = getSideState();
      let w;
      let h;

      if (sideState.layers.length === 0) {
        // 첫 이미지는 배경 사진처럼 캔버스를 덮도록 기본 배치한다.
        const scale = Math.max(tpl.width / img.naturalWidth, tpl.height / img.naturalHeight);
        w = img.naturalWidth * scale;
        h = img.naturalHeight * scale;
      } else {
        const scale = Math.min((tpl.width * 0.4) / img.naturalWidth, (tpl.height * 0.4) / img.naturalHeight, 1);
        w = img.naturalWidth * scale;
        h = img.naturalHeight * scale;
      }
      const x = (tpl.width - w) / 2;
      const y = (tpl.height - h) / 2;

      const layer = {
        id: `layer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        img,
        x,
        y,
        w,
        h,
        rotation: 0,
        effects: createDefaultEffects(),
      };
      sideState.layers.push(layer);
      selected = { type: "layer", id: layer.id };
      afterSelectionChange();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* =====================================================================
   템플릿 / 면 선택
   ===================================================================== */
const templateListEl = document.getElementById("templateList");
const sideFrontBtn = document.getElementById("sideFrontBtn");
const sideBackBtn = document.getElementById("sideBackBtn");
const fieldsHeading = document.getElementById("fieldsHeading");
const fieldsContainer = document.getElementById("fieldsContainer");

// 티켓의 가로/세로 비율로 방향을 판단해서 직관적인 모양 아이콘을 고른다.
function getTemplateOrientation(tpl) {
  if (tpl.width === tpl.height) return "square";
  return tpl.width > tpl.height ? "landscape" : "portrait";
}

function renderTemplateList() {
  templateListEl.innerHTML = "";
  TEMPLATES.forEach((tpl) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "template-item" + (tpl.id === state.activeTemplateId ? " active" : "");

    const icon = document.createElement("span");
    icon.className = `template-icon template-icon-${getTemplateOrientation(tpl)}`;

    const name = document.createElement("span");
    name.textContent = tpl.name;

    btn.appendChild(icon);
    btn.appendChild(name);
    btn.addEventListener("click", () => selectTemplate(tpl.id));
    templateListEl.appendChild(btn);
  });
}

function selectTemplate(id) {
  state.activeTemplateId = id;
  selected = null;
  renderTemplateList();
  renderSideButtons();
  renderFieldsPanel();
  renderLayerList();
  updateDeleteButtonState();
  renderDividerSection();
  renderCanvas();
}

function renderSideButtons() {
  sideFrontBtn.classList.toggle("active", state.activeSide === "front");
  sideBackBtn.classList.toggle("active", state.activeSide === "back");
}

function selectSide(side) {
  state.activeSide = side;
  selected = null;
  renderSideButtons();
  renderFieldsPanel();
  renderLayerList();
  updateDeleteButtonState();
  renderDividerSection();
  renderCanvas();
}

/* ---------- 구분선 방향 (파스텔 필름 뒷면 전용) ---------- */
const dividerSectionEl = document.getElementById("dividerSection");
const dividerHorizontalBtn = document.getElementById("dividerHorizontalBtn");
const dividerVerticalBtn = document.getElementById("dividerVerticalBtn");

function templateHasSelectableDivider() {
  const tpl = getActiveTemplate();
  const sideDef = tpl[state.activeSide];
  return (sideDef.decorations || []).some((d) => d.variants);
}

function renderDividerSection() {
  if (!templateHasSelectableDivider()) {
    dividerSectionEl.hidden = true;
    return;
  }
  dividerSectionEl.hidden = false;
  const orientation = getSideState().dividerOrientation || "horizontal";
  dividerHorizontalBtn.classList.toggle("active", orientation === "horizontal");
  dividerVerticalBtn.classList.toggle("active", orientation === "vertical");
}

function setDividerOrientation(orientation) {
  getSideState().dividerOrientation = orientation;
  renderDividerSection();
  renderCanvas();
}

dividerHorizontalBtn.addEventListener("click", () => setDividerOrientation("horizontal"));
dividerVerticalBtn.addEventListener("click", () => setDividerOrientation("vertical"));

// 창 크기가 바뀌면(패널 접힘 등) 편집 여백도 다시 계산해서 스크롤 없이 꽉 채운다.
let resizePending = false;
window.addEventListener("resize", () => {
  if (resizePending) return;
  resizePending = true;
  requestAnimationFrame(() => {
    resizePending = false;
    if (!dragMode) renderCanvas();
  });
});

sideFrontBtn.addEventListener("click", () => selectSide("front"));
sideBackBtn.addEventListener("click", () => selectSide("back"));

/* =====================================================================
   텍스트 입력 패널 (켜기/끄기, 위치는 캔버스 드래그, 폰트 · 크기, 추가/삭제)
   ===================================================================== */
function renderFieldsPanel() {
  const tpl = getActiveTemplate();
  const data = getSideState();

  fieldsHeading.textContent = `내용 입력 - ${state.activeSide === "front" ? "앞면" : "뒷면"}`;
  fieldsContainer.innerHTML = "";

  data.textItems.forEach((item) => {
    fieldsContainer.appendChild(buildFieldCard(item, tpl));
  });

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "add-text-btn";
  addBtn.textContent = "+ 텍스트 추가";
  addBtn.addEventListener("click", addCustomTextItem);
  fieldsContainer.appendChild(addBtn);
}

/* ---------- 전체 텍스트 색상 일괄 변경 ---------- */
const bulkColorInput = document.getElementById("bulkColorInput");
const bulkColorApplyBtn = document.getElementById("bulkColorApplyBtn");

bulkColorApplyBtn.addEventListener("click", () => {
  const data = getSideState();
  data.textItems.forEach((item) => {
    item.color = bulkColorInput.value;
  });
  renderFieldsPanel();
  renderCanvas();
});

function buildFieldCard(item, tpl) {
  const card = document.createElement("div");
  card.className = "field-card" + (item.enabled ? "" : " field-disabled");

  const header = document.createElement("div");
  header.className = "field-card-header";

  const toggleLabel = document.createElement("label");
  toggleLabel.className = "field-toggle";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.enabled;
  checkbox.addEventListener("change", () => {
    item.enabled = checkbox.checked;
    card.classList.toggle("field-disabled", !item.enabled);
    if (!item.enabled && selected && selected.type === "text" && selected.id === item.id) {
      selected = null;
      updateDeleteButtonState();
    }
    renderCanvas();
  });

  const labelText = document.createElement("span");
  labelText.textContent = item.label;

  toggleLabel.appendChild(checkbox);
  toggleLabel.appendChild(labelText);
  header.appendChild(toggleLabel);

  const headerActions = document.createElement("div");
  headerActions.className = "field-header-actions";

  const resetPosBtn = document.createElement("button");
  resetPosBtn.type = "button";
  resetPosBtn.className = "field-reset-btn";
  resetPosBtn.title = "위치 초기화";
  resetPosBtn.textContent = "⟲";
  resetPosBtn.addEventListener("click", () => {
    item.x = item.defaultX;
    item.y = item.defaultY;
    renderCanvas();
  });
  headerActions.appendChild(resetPosBtn);

  if (item.isCustom) {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "field-remove-btn";
    removeBtn.title = "삭제";
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => removeCustomTextItem(item.id));
    headerActions.appendChild(removeBtn);
  }

  header.appendChild(headerActions);
  card.appendChild(header);

  const body = document.createElement("div");
  body.className = "field-card-body";

  if (item.type === "rating") {
    const starsWrap = document.createElement("div");
    starsWrap.className = "rating-input";
    for (let i = 1; i <= 5; i++) {
      const starBtn = document.createElement("button");
      starBtn.type = "button";
      starBtn.className = "rating-star-btn";
      starBtn.textContent = i <= (Number(item.text) || 0) ? "★" : "☆";
      starBtn.addEventListener("click", () => {
        item.text = String(i);
        renderFieldsPanel();
        renderCanvas();
      });
      starsWrap.appendChild(starBtn);
    }
    body.appendChild(starsWrap);
  } else if (item.type === "multiline") {
    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.value = item.text || "";
    textarea.placeholder = item.placeholder || "";
    textarea.addEventListener("input", () => {
      item.text = textarea.value;
      renderCanvas();
    });
    body.appendChild(textarea);
  } else {
    const input = document.createElement("input");
    input.type = "text";
    input.value = item.text || "";
    input.placeholder = item.placeholder || "";
    input.disabled = !!item.useTodayDate;
    input.addEventListener("input", () => {
      item.text = input.value;
      renderCanvas();
    });

    if (item.isDateField) {
      const dateToggle = document.createElement("label");
      dateToggle.className = "date-auto-toggle";
      const dateCheckbox = document.createElement("input");
      dateCheckbox.type = "checkbox";
      dateCheckbox.checked = !!item.useTodayDate;
      dateCheckbox.addEventListener("change", () => {
        item.useTodayDate = dateCheckbox.checked;
        input.disabled = item.useTodayDate;
        if (item.useTodayDate) {
          item.text = formatToday();
          input.value = item.text;
        }
        renderCanvas();
      });
      dateToggle.appendChild(dateCheckbox);
      dateToggle.appendChild(document.createTextNode(" 오늘 날짜 자동입력"));
      body.appendChild(dateToggle);
    }

    body.appendChild(input);
  }

  const styleRow = document.createElement("div");
  styleRow.className = "field-style-row";

  const fontSelect = document.createElement("select");
  fontSelect.className = "field-font-select";
  FONT_OPTIONS.forEach((opt) => {
    const optionEl = document.createElement("option");
    optionEl.value = opt.family;
    optionEl.textContent = opt.label;
    if (item.fontFamily === opt.family) optionEl.selected = true;
    fontSelect.appendChild(optionEl);
  });
  fontSelect.addEventListener("change", () => {
    item.fontFamily = fontSelect.value;
    renderCanvas();
  });

  const sizeInput = document.createElement("input");
  sizeInput.type = "number";
  sizeInput.className = "field-size-input";
  sizeInput.min = "8";
  sizeInput.max = "120";
  sizeInput.value = item.fontSize;
  sizeInput.title = "글자 크기";
  sizeInput.addEventListener("input", () => {
    const v = parseInt(sizeInput.value, 10);
    if (!Number.isNaN(v) && v > 0) {
      item.fontSize = v;
      renderCanvas();
    }
  });

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.className = "field-color-input";
  colorInput.title = "글자 색상";
  colorInput.value = normalizeColorForPicker(item.color || tpl.colors.textPrimary);
  colorInput.addEventListener("input", () => {
    item.color = colorInput.value;
    renderCanvas();
  });

  styleRow.appendChild(fontSelect);
  styleRow.appendChild(sizeInput);
  styleRow.appendChild(colorInput);
  body.appendChild(styleRow);

  card.appendChild(body);
  return card;
}

function addCustomTextItem() {
  const tpl = getActiveTemplate();
  const data = getSideState();
  const customCount = data.textItems.filter((i) => i.isCustom).length;
  const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const item = {
    id,
    key: null,
    label: `추가 텍스트 ${customCount + 1}`,
    type: "text",
    text: "",
    x: tpl.width / 2,
    y: tpl.height / 2,
    defaultX: tpl.width / 2,
    defaultY: tpl.height / 2,
    align: "center",
    maxWidth: tpl.width - 60,
    lineHeight: 24,
    fontFamily: FONT_OPTIONS[0].family,
    fontSize: 20,
    fontWeight: 400,
    fontStyle: "normal",
    color: null,
    placeholder: "새 텍스트",
    enabled: true,
    isCustom: true,
  };

  data.textItems.push(item);
  selected = { type: "text", id };
  updateDeleteButtonState();
  renderFieldsPanel();
  renderCanvas();
}

function removeCustomTextItem(id) {
  const data = getSideState();
  const idx = data.textItems.findIndex((i) => i.id === id);
  if (idx >= 0) data.textItems.splice(idx, 1);
  if (selected && selected.type === "text" && selected.id === id) selected = null;
  updateDeleteButtonState();
  renderFieldsPanel();
  renderCanvas();
}

/* =====================================================================
   PNG 내보내기 (배경 투명)
   ===================================================================== */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const exportSideBtn = document.getElementById("exportSideBtn");
const exportBothBtn = document.getElementById("exportBothBtn");

exportSideBtn.addEventListener("click", () => {
  renderCanvas({ forExport: true });
  canvas.toBlob((blob) => {
    downloadBlob(blob, `ticket-${state.activeTemplateId}-${state.activeSide}.png`);
    renderCanvas();
  }, "image/png");
});

exportBothBtn.addEventListener("click", async () => {
  const originalSide = state.activeSide;
  for (const side of ["front", "back"]) {
    state.activeSide = side;
    renderCanvas({ forExport: true });
    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        downloadBlob(blob, `ticket-${state.activeTemplateId}-${side}.png`);
        resolve();
      }, "image/png");
    });
  }
  state.activeSide = originalSide;
  renderSideButtons();
  renderFieldsPanel();
  renderLayerList();
  updateDeleteButtonState();
  renderCanvas();
});

/* =====================================================================
   초기화
   ===================================================================== */
renderTemplateList();
renderSideButtons();
renderFieldsPanel();
renderLayerList();
updateDeleteButtonState();
renderDividerSection();
renderCanvas();

// 구글 폰트 로딩이 늦게 끝나는 경우를 대비해, 폰트 준비 완료 후 한 번 더 그린다.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => renderCanvas());
}
window.addEventListener("load", () => renderCanvas());
