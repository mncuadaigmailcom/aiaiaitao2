"use strict";
/** v4.43 — 🔐 Anti Ban: tự hop server khác khi bị kick/ban hoặc server nghi */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 🔐 ANTI BAN (v4.43)");
const end = src.indexOf("-- ---------- HẾT 🔐 ANTI BAN ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 🔐 Anti Ban");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.43: KHUNG 🔐 ANTI BAN");
const pEnd = src.indexOf("-- ---------- HẾT KHUNG 🔐 ANTI BAN ----------");
if (pStart < 0 || pEnd < 0) throw new Error("không tìm thấy HubAntiBan_Panel");
const panel = src.slice(pStart, pEnd);

const m = src.match(/S\.ScriptHubList\s*=\s*\{([\s\S]*?)\nS\.hubFavs/);
if (!m) throw new Error("không tìm thấy S.ScriptHubList");
const list = m[1];

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 🔐 Anti Ban ==");
ok("S.AntiBan + AntiBanSet + AntiBanHop + AntiBanArm",
  src.includes("function S.AntiBanSet") && src.includes("function S.AntiBanHop") &&
  src.includes("function S.AntiBanArm") && src.includes("S.AntiBan = S.AntiBan or"));
ok("thẻ Script Hub Anti Ban · cat Server · action antiban",
  /name="Anti Ban"[\s\S]{0,80}cat="Server"[\s\S]{0,80}action="antiban"/.test(list) ||
  /icon="🔐", name="Anti Ban", cat="Server"/.test(list));
ok("RunHubAction antiban gọi AntiBanSet",
  /elseif id == "antiban" then[\s\S]{0,280}AntiBanSet/.test(src));
ok("khung HubAntiBan_Panel", src.includes('Name = "HubAntiBan_Panel"') && panel.includes("AntiBanOn"));
ok("HubPanelCat AntiBan = Server", src.includes('HubAntiBan_Panel = "Server"'));
ok("RebuildHubList sync antiban", src.includes("S.SyncAntiBanPanel"));

console.log("== hop SANG server khác, không reset server cũ ==");
ok("AntiBanHop gọi HopServer", eng.includes("S.HopServer()"));
ok("không gọi ResetServer trong Anti Ban", !eng.includes("ResetServer") && !panel.includes("ResetServer"));
ok("thất bại thì Teleport PlaceId (rời), không Join JobId cũ",
  eng.includes("TeleportService:Teleport(game.PlaceId") && !/JoinServer\(\s*me/.test(eng));
ok("cooldown chống hop liên tục", eng.includes("cooldown") && eng.includes('"cooldown"'));
ok("ghi nhớ bật qua _G.BananaCatHub_AntiBan", eng.includes("_G.BananaCatHub_AntiBan"));

console.log("== tín hiệu nghi / định ban ==");
ok("lọc message kick/ban (không khớp chữ 'ban' trần)",
  eng.includes("you have been banned") && eng.includes("exploit detected") &&
  !/keys = \{[^}]*"ban"/.test(eng));
ok("hook Kick + PlayerRemoving + GuiService error",
  eng.includes("player.Kick") && eng.includes("PlayerRemoving") && eng.includes("ErrorMessageChanged"));
ok("bay/xuyên/tốc độ bị reset WalkSpeed → hop",
  eng.includes("WalkSpeed") && eng.includes("speed_reset") && eng.includes("m.fly or m.noclip"));
ok("TeleportInitFailed thử hop lại", eng.includes("TeleportInitFailed"));

console.log("== không mất tính năng cũ ==");
ok("Hop Server / Reset Server / GetJobId còn",
  src.includes('action="hopserver"') && src.includes('action="resetserver"') &&
  src.includes('action="getjobid"') && src.includes("function S.HopServer"));
ok("🚀/💨/🦘/🛡/✨ còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function MV.Safe.Set") &&
  src.includes("S.Glow.Set"));
ok("nút khung gọi RunHubAction antiban + HopServer",
  panel.includes('RunHubAction("antiban")') && panel.includes("AntiBanHop"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
