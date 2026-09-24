"use strict";
/** v4.46 — 👻 Toàn hình an toàn: ẩn + đi/nhảy, nút tròn bay-tới kiểu 🛡 */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 👻 TOÀN HÌNH AN TOÀN (v4.46)");
const end = src.indexOf("-- ---------- HẾT 👻 TOÀN HÌNH AN TOÀN ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 👻 Toàn hình an toàn");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.46: KHUNG 👻 TOÀN HÌNH AN TOÀN");
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

console.log("== đã xóa toàn hình cũ ==");
ok("không còn S.Invis / HubInvis_Panel / action invis",
  !src.includes("function S.Invis.") && !src.includes("HubInvis_Panel") &&
  !src.includes('action="invis"') && !src.includes('name="Toàn Hình"'));

console.log("== nguồn 👻 toàn hình an toàn ==");
ok("S.SafeInvis.Set + FlyTo + SetSpeed + BuildHud",
  src.includes("function S.SafeInvis.Set") && src.includes("function S.SafeInvis.FlyTo") &&
  src.includes("function S.SafeInvis.SetSpeed") && src.includes("function S.SafeInvis.BuildHud"));
ok("thẻ Toàn Hình An Toàn · Tiện ích · safeinvis",
  list.includes('name="Toàn Hình An Toàn"') && list.includes('action="safeinvis"') &&
  /name="Toàn Hình An Toàn"[\s\S]{0,80}cat="Tiện ích"/.test(list));
ok("RunHubAction safeinvis",
  /elseif id == "safeinvis" then[\s\S]{0,240}S\.SafeInvis\.Set/.test(src));
ok("khung HubSafeInvis_Panel", src.includes('Name = "HubSafeInvis_Panel"') && panel.includes("SafeInvisOn"));
ok("HubPanelCat = Tiện ích", src.includes('HubSafeInvis_Panel = "Tiện ích"'));
ok("RebuildHubList sync", src.includes("S.SyncSafeInvisPanel"));

console.log("== ẩn + đi/nhảy, nút tròn bay-tới 🛡 ==");
ok("HideInst Transparency, không tắt CanCollide",
  fnBody("HideInst").includes("Transparency = 1") && !fnBody("HideInst").includes("CanCollide"));
ok("không flying thì PlatformStand = false (đi/nhảy bình thường)",
  eng.includes("hum.PlatformStand = false") && eng.includes("not SI.flying"));
ok("nút TRÒN Corner UDim.new(1, 0) + SafeInvisCircle",
  eng.includes('Name = "SafeInvisCircle"') && eng.includes("UDim.new(1, 0)") &&
  eng.includes("BC_SafeInvisHud"));
ok("nút tròn gọi FlyTo",
  /SafeInvisCircle[\s\S]{0,500}SafeInvis\.FlyTo/.test(eng) || eng.includes("pcall(S.SafeInvis.FlyTo)"));
ok("bay tới dùng BodyVelocity/BodyGyro giống 🛡 (BC_SafeInvisVel)",
  eng.includes('Name = "BC_SafeInvisVel"') && eng.includes('Name = "BC_SafeInvisGyro"') &&
  eng.includes("MaxForce = Vector3.new(1e9, 1e9, 1e9)"));
ok("chỉnh tốc độ 1–2000", eng.includes("mvClamp(SI.speed, 1, 2000") || eng.includes("mvClamp(n, 1, 2000"));
ok("tắt từ menu (Set false) KillFly + ẩn HUD, không bắt buộc FlyTo",
  fnBody("Set").includes("KillFly") && fnBody("Set").includes("SI.on = false") &&
  fnBody("Set").includes("SyncHud"));
ok("HUD Visible = SI.on (tắt tính năng là tắt nút ảo)",
  eng.includes("hud.Visible = (SI.on == true)"));
ok("không gọi MV.Safe.Set (không cướp 🛡)",
  !eng.includes("MV.Safe.Set(") && !eng.includes("Safe.Set(true)"));

console.log("== không cướp tính năng cũ ==");
ok("engine không SetFly trong ẩn thường (chỉ FlyTo mới SetFly false nếu đang bay)",
  !fnBody("Set").includes("SetFly") && !fnBody("Apply").includes("SetNoclip"));
ok("🚀/💨/🦘/✨/🛡/🔐 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function S.Glow.Set") &&
  src.includes("function MV.Safe.Set") && src.includes("function S.AntiBanSet"));
ok("thẻ glow/fly/safefly/antiban còn",
  src.includes('action="glow"') && src.includes('action="fly"') &&
  src.includes('action="safefly"') && src.includes('action="antiban"'));
ok("nút khung RunHubAction safeinvis + FlyTo + SetSpeed",
  panel.includes('RunHubAction("safeinvis")') && panel.includes("FlyTo") &&
  panel.includes("SetSpeed"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
