"use strict";
/** v4.44 — 👻 Toàn hình: chìm xuống đất, HRP/camera giữ, vẫn chạy/nhảy/nhặt đồ */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 👻 TOÀN HÌNH (v4.44)");
const end = src.indexOf("-- ---------- HẾT 👻 TOÀN HÌNH ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 👻 Toàn hình");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.44: KHUNG 👻 TOÀN HÌNH");
const pEnd = src.indexOf("-- ---------- HẾT KHUNG 👻 TOÀN HÌNH ----------");
if (pStart < 0 || pEnd < 0) throw new Error("không tìm thấy HubInvis_Panel");
const panel = src.slice(pStart, pEnd);

const m = src.match(/S\.ScriptHubList\s*=\s*\{([\s\S]*?)\nS\.hubFavs/);
if (!m) throw new Error("không tìm thấy S.ScriptHubList");
const list = m[1];

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 👻 toàn hình ==");
ok("S.Invis.Set + Sink + MakeClone + SetSeeSelf + SetDepth",
  src.includes("function S.Invis.Set") && src.includes("function S.Invis.Sink") &&
  src.includes("function S.Invis.MakeClone") && src.includes("function S.Invis.SetSeeSelf") &&
  src.includes("function S.Invis.SetDepth"));
ok("thẻ Script Hub Toàn Hình · Tiện ích · invis",
  list.includes('name="Toàn Hình"') && list.includes('action="invis"') &&
  /name="Toàn Hình"[\s\S]{0,80}cat="Tiện ích"/.test(list));
ok("RunHubAction invis gọi Invis.Set",
  /elseif id == "invis" then[\s\S]{0,220}S\.Invis\.Set/.test(src));
ok("khung HubInvis_Panel", src.includes('Name = "HubInvis_Panel"') && panel.includes("InvisOn"));
ok("HubPanelCat Invis = Tiện ích", src.includes('HubInvis_Panel = "Tiện ích"'));
ok("RebuildHubList sync invis", src.includes("S.SyncInvisPanel"));

console.log("== ẩn xuống đất nhưng HRP/camera/thao tác giữ ==");
ok("chìm part theo depth, bỏ qua HumanoidRootPart",
  eng.includes("CFrame.new(0, -depth, 0)") && eng.includes('p.Name ~= "HumanoidRootPart"'));
ok("HideInst bỏ qua HumanoidRootPart (không tắt collide HRP)",
  eng.includes('inst.Name == "HumanoidRootPart"'));
ok("không đổi CameraSubject / CameraType",
  !eng.includes("CameraSubject") && !eng.includes("CameraType") &&
  !panel.includes("CameraSubject"));
ok("clone BC_InvisClone khi chỉ mình thấy (parent Camera)",
  eng.includes("BC_InvisClone") && eng.includes("workspace.CurrentCamera") &&
  eng.includes("IV.seeSelf"));
ok("không ai thấy thì KillClone",
  /SetSeeSelf[\s\S]{0,280}KillClone/.test(eng));
ok("status nhắc chạy nhảy nhặt đồ cứu đồng đội",
  eng.includes("chạy nhảy nhặt đồ cứu đồng đội"));

console.log("== không cướp tính năng cũ ==");
ok("engine không SetFly / SetNoclip / SetSprint / SetHighJump",
  !eng.includes("SetFly") && !eng.includes("SetNoclip") &&
  !eng.includes("SetSprint") && !eng.includes("SetHighJump"));
ok("panel không SetNoclip/SetFly",
  !panel.includes("SetNoclip") && !panel.includes("SetFly"));
ok("🚀/💨/🦘/✨/🛡/🔐 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function S.Glow.Set") &&
  src.includes("function MV.Safe.Set") && src.includes("function S.AntiBanSet"));
ok("thẻ glow/fly/antiban còn",
  src.includes('action="glow"') && src.includes('action="fly"') &&
  src.includes('action="antiban"'));
ok("nút khung gọi RunHubAction invis + SetSeeSelf",
  panel.includes('RunHubAction("invis")') && panel.includes("SetSeeSelf"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
