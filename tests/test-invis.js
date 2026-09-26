"use strict";
/** v4.52 — 👻 Toàn hình: mình trong suốt, người khác không thấy, không FireServer */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 👻 TOÀN HÌNH (v4.52)");
const end = src.indexOf("-- ---------- HẾT 👻 TOÀN HÌNH ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 👻 Toàn hình");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.52: KHUNG 👻 TOÀN HÌNH");
const pEnd = src.indexOf("-- ---------- HẾT KHUNG 👻 TOÀN HÌNH ----------");
if (pStart < 0 || pEnd < 0) throw new Error("không tìm thấy HubInvis_Panel");
const panel = src.slice(pStart, pEnd);

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 👻 toàn hình ==");
ok("S.Invis.Set / HideReal / EnsureGhost / Follow / SpoofAll / Stop",
  src.includes("function S.Invis.Set") && src.includes("function S.Invis.HideReal") &&
  src.includes("function S.Invis.EnsureGhost") && src.includes("function S.Invis.Follow") &&
  src.includes("function S.Invis.SpoofAll") && src.includes("function S.Invis.Stop"));
ok("thẻ invis + khung HubInvis_Panel",
  src.includes('action="invis"') && src.includes('Name = "HubInvis_Panel"') &&
  src.includes('HubInvis_Panel = "Tiện ích"'));
ok("RunHubAction invis gọi Set",
  /elseif id == "invis" then[\s\S]{0,280}S\.Invis\.Set/.test(src));
ok("RebuildHubList sync invis", src.includes("S.SyncInvisPanel"));

console.log("== mình trong suốt · người khác toàn hình · không remote ==");
ok("nhân vật thật Transparency = 1 (người khác không thấy)",
  eng.includes("d.Transparency = 1") && eng.includes('d:IsA("BasePart")'));
ok("ghost local Transparency 0.45 (mình thấy trong suốt)",
  eng.includes('g.Name = "BC_InvisGhost"') && eng.includes("d.Transparency = 0.45") &&
  eng.includes("ch:Clone()"));
ok("ghost parent CurrentCamera (local, không replicate clone)",
  eng.includes("g.Parent = cam or workspace") && eng.includes("workspace.CurrentCamera"));
ok("SpoofAll duyệt Players:GetPlayers, không đụng Character người khác",
  eng.includes("Players:GetPlayers()") && !eng.includes("p.Character") &&
  !eng.includes("other.Character"));
ok("KHÔNG gọi FireServer / InvokeServer / FireClient",
  !/:FireServer\s*\(/.test(eng) && !/:InvokeServer\s*\(/.test(eng) &&
  !/:FireClient\s*\(/.test(eng) && !eng.includes("RemoteEvent") && !eng.includes("RemoteFunction"));
ok("không chìm đất / không HUD / không CameraType",
  !eng.includes("_underY") && !eng.includes("pressHud") && !eng.includes("CameraType") &&
  !eng.includes("BC_SafeInvisCam"));
ok("không cướp 🚀/🧱/PlatformStand nhân vật thật",
  !eng.includes("MV.SetFly") && !eng.includes("SetNoclip") && !eng.includes("PlatformStand") &&
  !eng.includes("MV.Safe.Set"));

console.log("== không mất tính năng ==");
ok("🚀/💨/🦘/🛡/✨/🔐 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function MV.Safe.Set") &&
  src.includes("function S.Glow.Set") && src.includes("function S.AntiBanSet"));
ok("nút khung gọi Invis.Set / Stop",
  panel.includes("S.Invis.Set(not IV.on)") && panel.includes("S.Invis.Stop()"));
ok("không còn SafeInvis / safeinvis",
  !src.includes("function S.SafeInvis") && !src.includes('action="safeinvis"') &&
  !src.includes("HubSafeInvis_Panel"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
