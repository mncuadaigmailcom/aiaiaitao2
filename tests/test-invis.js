"use strict";
/** v4.47 — 👻 Toàn hình an toàn: Evade LTM, bấm nút nhiều lần, 📐 chỉnh nút */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 👻 TOÀN HÌNH AN TOÀN (v4.47)");
const end = src.indexOf("-- ---------- HẾT 👻 TOÀN HÌNH AN TOÀN ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 👻 Toàn hình an toàn");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.47: KHUNG 👻 TOÀN HÌNH AN TOÀN");
const pEnd = src.indexOf("-- ---------- HẾT KHUNG 👻 TOÀN HÌNH AN TOÀN ----------");
if (pStart < 0 || pEnd < 0) throw new Error("không tìm thấy HubSafeInvis_Panel");
const panel = src.slice(pStart, pEnd);

const m = src.match(/S\.ScriptHubList\s*=\s*\{([\s\S]*?)\nS\.hubFavs/);
if (!m) throw new Error("không tìm thấy S.ScriptHubList");
const list = m[1];

function fnBody(name) {
  const k = "function S.SafeInvis." + name;
  const i = eng.indexOf(k);
  if (i < 0) return "";
  const j = eng.indexOf("\nfunction S.SafeInvis.", i + 1);
  return eng.slice(i, j < 0 ? eng.length : j);
}

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 👻 toàn hình an toàn ==");
ok("S.SafeInvis.Set + FlyTo + SetSpeed + SetAdjust + Land",
  src.includes("function S.SafeInvis.Set") && src.includes("function S.SafeInvis.FlyTo") &&
  src.includes("function S.SafeInvis.SetSpeed") && src.includes("function S.SafeInvis.SetAdjust") &&
  src.includes("function S.SafeInvis.Land"));
ok("thẻ Toàn Hình An Toàn · Tiện ích · safeinvis",
  list.includes('name="Toàn Hình An Toàn"') && list.includes('action="safeinvis"'));
ok("RunHubAction safeinvis", /elseif id == "safeinvis" then[\s\S]{0,240}S\.SafeInvis\.Set/.test(src));
ok("khung HubSafeInvis_Panel + 📐 Chỉnh nút",
  src.includes('Name = "HubSafeInvis_Panel"') && panel.includes("SafeInvisAdjust") &&
  panel.includes("SetAdjust"));

console.log("== Evade: ẩn mỗi frame + LTM ==");
ok("LocalTransparencyModifier = 1 (Evade hay ghi đè Transparency)",
  fnBody("HideInst").includes("LocalTransparencyModifier = 1"));
ok("BindHide RenderPriority.Last (sau script game)",
  eng.includes("Enum.RenderPriority.Last.Value"));
ok("HideInst không tắt CanCollide", !fnBody("HideInst").includes("CanCollide"));
ok("HUD ScreenGui DisplayOrder 10000 (nút bấm được trên Evade)",
  eng.includes("BC_SafeInvisGui") && eng.includes("DisplayOrder = 10000"));

console.log("== bấm nút nhiều lần + 📐 chỉnh ==");
ok("FlyTo không chặn khi đang flying (bấm lại được)",
  fnBody("FlyTo").includes("if not SI.on then return false") &&
  !fnBody("FlyTo").includes("SI.flying then return"));
ok("tới nơi thì Land, KHÔNG Set(false) (vẫn ẩn, bấm tiếp được)",
  fnBody("FlyStep").includes("S.SafeInvis.Land") &&
  !fnBody("FlyStep").includes("Set(false)"));
ok("SetAdjust + chỉ kéo khi SI.adjust",
  src.includes("function S.SafeInvis.SetAdjust") &&
  eng.includes("if not SI.adjust then return") &&
  eng.includes("SI.adjust and SI._dragging"));
ok("Activated: đang chỉnh thì không FlyTo",
  /if SI\.adjust or SI\._dragMoved then/.test(eng));
ok("📐 TẮT thì không kéo (adjust false)",
  fnBody("SetAdjust").includes("SI.adjust = (b == true)") &&
  panel.includes("Chỉnh nút: TẮT"));
ok("nút tròn Corner UDim.new(1, 0)", eng.includes("UDim.new(1, 0)") && eng.includes("SafeInvisCircle"));

console.log("== không cướp tính năng cũ ==");
ok("không gọi MV.Safe.Set", !eng.includes("MV.Safe.Set("));
ok("🚀/💨/🦘/✨/🛡/🔐 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function S.Glow.Set") &&
  src.includes("function MV.Safe.Set") && src.includes("function S.AntiBanSet"));
ok("thẻ glow/fly/safefly/antiban còn",
  src.includes('action="glow"') && src.includes('action="fly"') &&
  src.includes('action="safefly"') && src.includes('action="antiban"'));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
