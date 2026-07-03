"use strict";

/* =====================================================================
   TheaterSocket
   - 지금은 서버가 없으므로 로컬(에코) 모드로 동작한다.
   - 실제 서버가 준비되면 connect()의 주석을 해제하고 URL만 넣으면
     나머지 코드(채팅/리액션)는 수정 없이 그대로 동작하도록 설계했다.
   ===================================================================== */
const TheaterSocket = {
  socket: null,
  connected: false,
  listeners: {},

  connect(url) {
    // ---- 실제 WebSocket 서버 연동 시 아래 주석을 해제 ----
    // this.socket = new WebSocket(url);
    // this.socket.onopen = () => {
    //   this.connected = true;
    //   this.emit("open");
    // };
    // this.socket.onmessage = (event) => {
    //   const { type, payload } = JSON.parse(event.data);
    //   this.emit(type, payload);
    // };
    // this.socket.onclose = () => {
    //   this.connected = false;
    //   this.emit("close");
    // };
    // this.socket.onerror = (err) => this.emit("error", err);

    console.log("[TheaterSocket] 서버 미연결 상태 - 로컬 모드로 동작합니다.");
  },

  send(type, payload) {
    const message = { type, payload, timestamp: Date.now() };

    if (this.socket && this.connected) {
      this.socket.send(JSON.stringify(message));
    } else {
      // 로컬 모드: 서버가 없으니 자기 자신에게 즉시 에코한다.
      this._localEcho(message);
    }
  },

  on(type, callback) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(callback);
  },

  emit(type, payload) {
    (this.listeners[type] || []).forEach((cb) => cb(payload));
  },

  _localEcho(message) {
    setTimeout(() => this.emit(message.type, message.payload), 30);
  },
};

/* =====================================================================
   유틸
   ===================================================================== */
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

const USER_COLORS = ["#ff4d67", "#5cd6ff", "#7dff8a", "#ffcf5c", "#c58cff", "#ff9a5c"];

function isImageAvatar(avatar) {
  return typeof avatar === "string" && avatar.startsWith("data:image");
}

function getMyUser() {
  let name = localStorage.getItem("theater_username");
  let color = localStorage.getItem("theater_usercolor");
  let avatar = localStorage.getItem("theater_avatar"); // 없으면 null (업로드 전)

  if (!name) {
    name = `게스트${Math.floor(1000 + Math.random() * 9000)}`;
    localStorage.setItem("theater_username", name);
  }
  if (!color) {
    color = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
    localStorage.setItem("theater_usercolor", color);
  }
  if (avatar && !isImageAvatar(avatar)) {
    // 예전 버전(이모지 아바타)의 값이 남아있으면 무시한다.
    avatar = null;
    localStorage.removeItem("theater_avatar");
  }

  return { name, color, avatar };
}

// 업로드한 사진이 있으면 이미지로, 없으면 이름 첫 글자 + 사용자 색상으로 표시한다.
function renderAvatar(el, { avatar, name, color }) {
  if (isImageAvatar(avatar)) {
    el.style.backgroundImage = `url("${avatar}")`;
    el.style.backgroundColor = "";
    el.textContent = "";
  } else {
    el.style.backgroundImage = "";
    el.style.backgroundColor = color;
    el.textContent = (name || "?").trim().charAt(0).toUpperCase();
  }
}

/* =====================================================================
   채팅
   ===================================================================== */
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const me = getMyUser();

// 백업 기능에서 사용하는, 지금까지 나눈 채팅 로그 전체 기록
const chatLog = [];

function appendChatMessage({ author, color, avatar, text, system }) {
  const time = Date.now();
  chatLog.push({ author, color, avatar, text, system: !!system, time });

  const row = document.createElement("div");
  row.className = system ? "chat-message system" : "chat-message";

  if (system) {
    row.textContent = text;
  } else {
    const avatarEl = document.createElement("span");
    avatarEl.className = "msg-avatar";
    renderAvatar(avatarEl, { avatar, name: author, color });

    const bodyEl = document.createElement("div");
    bodyEl.className = "msg-body";
    bodyEl.innerHTML = `<div class="msg-header"><span class="author" style="color:${color}">${escapeHtml(
      author
    )}</span><span class="msg-time">${formatLogTime(time)}</span></div><span class="text">${escapeHtml(
      text
    )}</span>`;

    row.appendChild(avatarEl);
    row.appendChild(bodyEl);
  }

  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 서버(혹은 로컬 에코)로부터 채팅 메시지를 받으면 화면에 그린다.
TheaterSocket.on("chat", (payload) => {
  appendChatMessage(payload);
});

// 입장/퇴장 알림: 채팅 로그(백업 저장 대상)에는 남기지 않고, 화면에만 가운데 정렬로 보여준다.
function appendPresenceMessage(text) {
  const row = document.createElement("div");
  row.className = "chat-message system presence";
  row.textContent = text;
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 실제 서버가 연결되면 다른 사용자의 입장/퇴장도 이 이벤트로 전달받으면 된다.
TheaterSocket.on("presence", (payload) => {
  const verb = payload.type === "leave" ? "퇴장했습니다" : "입장했습니다";
  appendPresenceMessage(`${payload.name}님이 ${verb}`);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  TheaterSocket.send("chat", {
    author: me.name,
    color: me.color,
    avatar: me.avatar,
    text,
  });
  chatInput.value = "";
});

TheaterSocket.send("presence", { type: "join", name: me.name });

/* =====================================================================
   프로필 설정 (닉네임 / 프로필 사진)
   ===================================================================== */
const profileTrigger = document.getElementById("profileTrigger");
const profileMenu = document.getElementById("profileMenu");
const profileCloseBtn = document.getElementById("profileCloseBtn");
const myAvatarPreview = document.getElementById("myAvatarPreview");
const myNamePreview = document.getElementById("myNamePreview");
const nameInput = document.getElementById("nameInput");
const colorInput = document.getElementById("colorInput");
const avatarPreviewLg = document.getElementById("avatarPreviewLg");
const avatarUpload = document.getElementById("avatarUpload");
const avatarRemoveBtn = document.getElementById("avatarRemoveBtn");

function refreshProfilePreview() {
  renderAvatar(myAvatarPreview, me);
  renderAvatar(avatarPreviewLg, me);
  myNamePreview.textContent = me.name;
}

nameInput.addEventListener("input", () => {
  const trimmed = nameInput.value.trim();
  me.name = trimmed || me.name;
  if (trimmed) localStorage.setItem("theater_username", trimmed);
  refreshProfilePreview();
});

colorInput.addEventListener("input", () => {
  me.color = colorInput.value;
  localStorage.setItem("theater_usercolor", me.color);
  refreshProfilePreview();
});

avatarUpload.addEventListener("change", () => {
  const file = avatarUpload.files && avatarUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    me.avatar = reader.result;
    localStorage.setItem("theater_avatar", reader.result);
    refreshProfilePreview();
  };
  reader.readAsDataURL(file);
});

avatarRemoveBtn.addEventListener("click", () => {
  me.avatar = null;
  localStorage.removeItem("theater_avatar");
  avatarUpload.value = "";
  refreshProfilePreview();
});

function openProfileMenu() {
  nameInput.value = me.name;
  colorInput.value = me.color;
  closeBackupMenu();
  profileMenu.hidden = false;
}

function closeProfileMenu() {
  profileMenu.hidden = true;
}

profileTrigger.addEventListener("click", () => {
  if (profileMenu.hidden) openProfileMenu();
  else closeProfileMenu();
});

profileCloseBtn.addEventListener("click", closeProfileMenu);

document.addEventListener("click", (e) => {
  if (profileMenu.hidden) return;
  const clickedInsideMenu = profileMenu.contains(e.target);
  const clickedTrigger = profileTrigger.contains(e.target);
  if (!clickedInsideMenu && !clickedTrigger) closeProfileMenu();
});

refreshProfilePreview();

/* =====================================================================
   채팅 로그 백업 (텍스트 / HTML)
   ===================================================================== */
const backupTrigger = document.getElementById("backupTrigger");
const backupMenu = document.getElementById("backupMenu");
const backupTxtBtn = document.getElementById("backupTxtBtn");
const backupHtmlBtn = document.getElementById("backupHtmlBtn");

function openBackupMenu() {
  closeProfileMenu();
  backupMenu.hidden = false;
}

function closeBackupMenu() {
  backupMenu.hidden = true;
}

backupTrigger.addEventListener("click", () => {
  if (backupMenu.hidden) openBackupMenu();
  else closeBackupMenu();
});

document.addEventListener("click", (e) => {
  if (backupMenu.hidden) return;
  const clickedInsideMenu = backupMenu.contains(e.target);
  const clickedTrigger = backupTrigger.contains(e.target);
  if (!clickedInsideMenu && !clickedTrigger) closeBackupMenu();
});

function formatDateForFilename(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(
    date.getHours()
  )}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function formatLogTime(ms) {
  const d = new Date(ms);
  const hours24 = d.getHours();
  const period = hours24 < 12 ? "AM" : "PM";
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  const pad = (n) => String(n).padStart(2, "0");
  return `${period} ${pad(hours12)}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildTextLog() {
  // 제목 아래 구분선 + 한 줄 여백을 두고 실제 채팅 로그가 이어지게 한다.
  const lines = [
    `퍼스널 시어터 채팅 로그 - ${new Date().toLocaleString("ko-KR")}`,
    "",
    "----------------------------------------",
    "",
  ];

  chatLog.forEach((m) => {
    const time = formatLogTime(m.time);
    lines.push(m.system ? `[${time}] * ${m.text}` : `[${time}] ${m.author}: ${m.text}`);
  });

  return lines.join("\n");
}

function buildHtmlLog() {
  const rows = chatLog
    .map((m) => {
      if (m.system) {
        return `  <div class="log-system">* ${escapeHtml(m.text)}</div>`;
      }

      const avatarHtml = isImageAvatar(m.avatar)
        ? `<span class="log-avatar" style="background-image:url('${m.avatar}')"></span>`
        : `<span class="log-avatar" style="background-color:${escapeHtml(
            m.color
          )}">${escapeHtml((m.author || "?").trim().charAt(0).toUpperCase())}</span>`;

      return `  <div class="log-message">
    ${avatarHtml}
    <div class="log-body">
      <div class="log-meta"><span class="log-author" style="color:${escapeHtml(
        m.color
      )}">${escapeHtml(m.author)}</span><span class="log-time">${formatLogTime(
        m.time
      )}</span></div>
      <div class="log-text">${escapeHtml(m.text)}</div>
    </div>
  </div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>퍼스널 시어터 채팅 로그</title>
<style>
  body { background:#0b0b0f; color:#f5f5f7; font-family:"Apple SD Gothic Neo","Malgun Gothic",sans-serif; padding:24px; }
  h1 { font-size:15px; font-weight:700; color:#9a9aa5; margin:0 0 18px; }
  .log-message { display:flex; align-items:flex-start; gap:10px; margin-bottom:16px; }
  .log-avatar { flex-shrink:0; width:40px; height:40px; border-radius:50%; background-color:#1e1e26; background-size:cover; background-position:center; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; color:#fff; }
  .log-body { min-width:0; }
  .log-meta { display:flex; align-items:baseline; gap:8px; margin-bottom:2px; }
  .log-author { font-weight:700; font-size:13px; }
  .log-time { font-size:11px; color:#6d6d78; }
  .log-text { font-size:13px; line-height:1.5; word-break:break-word; }
  .log-system { color:#9a9aa5; font-style:italic; font-size:12px; margin:10px 0; }
  .log-divider { border-top:1px solid #2a2a33; margin:8px 0 24px; }
</style>
</head>
<body>
<h1>퍼스널 시어터 채팅 로그 - ${escapeHtml(new Date().toLocaleString("ko-KR"))}</h1>
<div class="log-divider"></div>
${rows}
</body>
</html>
`;
}

backupTxtBtn.addEventListener("click", () => {
  downloadFile(
    `theater-chat-log-${formatDateForFilename(new Date())}.txt`,
    buildTextLog(),
    "text/plain;charset=utf-8"
  );
  closeBackupMenu();
});

backupHtmlBtn.addEventListener("click", () => {
  downloadFile(
    `theater-chat-log-${formatDateForFilename(new Date())}.html`,
    buildHtmlLog(),
    "text/html;charset=utf-8"
  );
  closeBackupMenu();
});

/* =====================================================================
   리액션 (야유 / 박수 / 하트)
   ===================================================================== */
const reactionStage = document.getElementById("reactionStage");

const reactionButtons = {
  boo: document.getElementById("btnBoo"),
  clap: document.getElementById("btnClap"),
  heart: document.getElementById("btnHeart"),
};

const reactionCounts = {
  boo: document.getElementById("countBoo"),
  clap: document.getElementById("countClap"),
  heart: document.getElementById("countHeart"),
};

const counts = { boo: 0, clap: 0, heart: 0 };

function spawnSplat(x, y) {
  const mark = document.createElement("span");
  mark.className = "fx-splat-mark";
  mark.style.left = `${x}px`;
  mark.style.top = `${y}px`;
  reactionStage.appendChild(mark);
  mark.addEventListener("animationend", () => mark.remove());

  const dropCount = 8;
  for (let i = 0; i < dropCount; i++) {
    const angle = ((Math.PI * 2) / dropCount) * i + randomBetween(-0.3, 0.3);
    const dist = randomBetween(18, 46);
    const drop = document.createElement("span");
    drop.className = "fx-splat-drop";
    drop.style.left = `${x}px`;
    drop.style.top = `${y}px`;
    drop.style.setProperty("--sx", `${Math.cos(angle) * dist}px`);
    drop.style.setProperty("--sy", `${Math.sin(angle) * dist}px`);
    reactionStage.appendChild(drop);
    drop.addEventListener("animationend", () => drop.remove());
  }
}

function spawnTomato() {
  const rect = reactionStage.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // 화면 밖(아래쪽)에서 시작해 화면 중앙 쪽 랜덤한 지점으로 날아가 부딪힌다.
  const startX = randomBetween(width * 0.1, width * 0.9);
  const startY = height + 70;
  const targetX = randomBetween(width * 0.25, width * 0.75);
  const targetY = randomBetween(height * 0.25, height * 0.65);

  const dx = targetX - startX;
  const dy = targetY - startY;
  const rot = randomBetween(-220, 220);
  const duration = randomBetween(0.5, 0.7);

  const el = document.createElement("span");
  el.className = "fx-tomato";
  el.textContent = "🍅";
  el.style.left = `${startX}px`;
  el.style.top = `${startY}px`;
  el.style.setProperty("--dx", `${dx}px`);
  el.style.setProperty("--dy", `${dy}px`);
  el.style.setProperty("--rot", `${rot}deg`);
  el.style.animationDuration = `${duration}s`;
  reactionStage.appendChild(el);

  // 날아가는 도중(약 75% 지점)에 화면에 부딪혀 터지는 것처럼 스플래시를 띄운다.
  setTimeout(() => spawnSplat(targetX, targetY), duration * 750);

  el.addEventListener("animationend", () => el.remove());
}

function spawnConfettiBurst() {
  const colors = ["#ff4d67", "#ffcf5c", "#5cd6ff", "#7dff8a", "#c58cff"];
  const pieceCount = 26;

  for (let i = 0; i < pieceCount; i++) {
    const el = document.createElement("span");
    el.className = "fx-confetti";
    el.style.left = `${randomBetween(0, 100)}%`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = `${randomBetween(0.9, 1.6)}s`;
    el.style.animationDelay = `${randomBetween(0, 0.25)}s`;
    reactionStage.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function spawnHearts() {
  const heartCount = 4;

  for (let i = 0; i < heartCount; i++) {
    const el = document.createElement("span");
    el.className = "fx-heart";
    el.textContent = "❤️";
    el.style.left = `${randomBetween(35, 60)}%`;
    el.style.setProperty("--drift", `${randomBetween(-40, 40)}px`);
    el.style.animationDuration = `${randomBetween(1.4, 2)}s`;
    el.style.animationDelay = `${randomBetween(0, 0.3)}s`;
    reactionStage.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

const REACTION_EFFECTS = {
  boo: spawnTomato,
  clap: spawnConfettiBurst,
  heart: spawnHearts,
};

function playReactionEffect(type) {
  const effect = REACTION_EFFECTS[type];
  if (effect) effect();

  const btn = reactionButtons[type];
  btn.classList.remove("pulse");
  void btn.offsetWidth; // 리플로우를 강제해 애니메이션 재시작
  btn.classList.add("pulse");
}

function bumpReactionCount(type) {
  counts[type] += 1;
  reactionCounts[type].textContent = counts[type];
}

// 서버(혹은 로컬 에코)로부터 리액션 이벤트를 받으면 애니메이션 + 카운트를 갱신한다.
TheaterSocket.on("reaction", ({ type }) => {
  playReactionEffect(type);
  bumpReactionCount(type);
});

Object.entries(reactionButtons).forEach(([type, btn]) => {
  btn.addEventListener("click", () => {
    TheaterSocket.send("reaction", { type });
  });
});

/* =====================================================================
   초기화
   ===================================================================== */
// 실제 서버 주소가 생기면 여기에 넣으면 된다. 예: TheaterSocket.connect("wss://example.com/ws");
TheaterSocket.connect(null);
