"use strict";
/** v4.41 — chip Script Hub ẩn khung không thuộc nhóm */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

function extractMap() {
  const m = src.match(/S\.HubPanelCat\s*=\s*\{([\s\S]*?)\n\}/);
  if (!m) return null;
  const map = {};
  for (const row of m[1].matchAll(/(\w+)\s*=\s*"([^"]+)"/g)) map[row[1]] = row[2];
  return map;
}

console.log("== lọc khung theo chip ==");
ok("S.HubPanelCat + SyncHubPanels", src.includes("S.HubPanelCat") && src.includes("function S.SyncHubPanels"));
ok("RebuildHubList gọi SyncHubPanels", /function S\.RebuildHubList[\s\S]*SyncHubPanels/.test(src));
ok("thẻ vẫn lọc it.cat", src.includes('(cat == "Tất cả") or (it.cat == cat)'));
ok("Visible = Tất cả hoặc đúng nhóm", src.includes('c.Visible = (cat == "Tất cả") or (cat == want)'));
ok("CanvasSize bỏ khung đang ẩn", src.includes("c.Visible ~= false"));

const map = extractMap();
ok("đọc được bảng HubPanelCat", !!map);
const move = ["HubTune_Panel","HubFly_Panel","HubSpeed_Panel","HubHighJump_Panel","HubMove_Panel","HubSafe_Panel"];
ok("khung bay/nhảy/tốc độ/thảm/🛡 thuộc Di chuyển",
  map && move.every((k) => map[k] === "Di chuyển"), JSON.stringify(map));
ok("✨ Glow thuộc Tiện ích", map && map.HubGlow_Panel === "Tiện ích");
ok("🎥 Khán giả thuộc Tiện ích", map && map.HubFree_Panel === "Tiện ích");
ok("không còn khung 👻 Toàn hình an toàn", map && !map.HubSafeInvis_Panel && !src.includes('action="safeinvis"'));
ok("🔐 Anti Ban thuộc Server", map && map.HubAntiBan_Panel === "Server");
ok("Admin/Explorer/Spy/Định vị không có khung 🦘/✨/🚀/🎥",
  map && ![...move, "HubGlow_Panel", "HubFree_Panel"].some((k) => ["Admin","Explorer","Spy","Định vị"].includes(map[k])));
ok("khung 🦘/✨/🚀/🎥 không thuộc Server",
  map && ![...move, "HubGlow_Panel", "HubFree_Panel"].some((k) => map[k] === "Server"));

function vis(cat, panel) {
  const want = map[panel];
  return cat === "Tất cả" || cat === want;
}
ok("chip Admin ẩn HubTune / HubGlow / HubSafe",
  !vis("Admin","HubTune_Panel") && !vis("Admin","HubGlow_Panel") && !vis("Admin","HubSafe_Panel"));
ok("chip Định vị ẩn nhảy cao + bay + phát sáng",
  !vis("Định vị","HubHighJump_Panel") && !vis("Định vị","HubFly_Panel") && !vis("Định vị","HubGlow_Panel"));
ok("chip Di chuyển hiện tune/fly/speed/highjump/safe, ẩn glow/freecam",
  vis("Di chuyển","HubTune_Panel") && vis("Di chuyển","HubFly_Panel") &&
  vis("Di chuyển","HubHighJump_Panel") && vis("Di chuyển","HubSafe_Panel") &&
  !vis("Di chuyển","HubGlow_Panel") && !vis("Di chuyển","HubFree_Panel"));
ok("chip Tiện ích hiện glow + khán giả, ẩn bay/nhảy",
  vis("Tiện ích","HubGlow_Panel") && vis("Tiện ích","HubFree_Panel") &&
  !vis("Tiện ích","HubFly_Panel") && !vis("Tiện ích","HubHighJump_Panel"));
ok("chip Server hiện antiban, ẩn bay/nhảy/glow/freecam",
  vis("Server","HubAntiBan_Panel") && !vis("Server","HubFly_Panel") &&
  !vis("Server","HubHighJump_Panel") && !vis("Server","HubGlow_Panel") &&
  !vis("Server","HubFree_Panel"));
ok("chip Admin/Di chuyển ẩn antiban",
  !vis("Admin","HubAntiBan_Panel") && !vis("Di chuyển","HubAntiBan_Panel"));
ok("Tất cả hiện cả glow và tune", vis("Tất cả","HubGlow_Panel") && vis("Tất cả","HubTune_Panel"));

console.log("== không mất tính năng ==");
ok("engine 🚀/💨/🦘/✨/🛡 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("S.Glow.Set") && src.includes("MV.Safe.Set"));
ok("thẻ ScriptHubList vẫn có fly/highjump/glow/safefly",
  src.includes('action="fly"') && src.includes('action="highjump"') &&
  src.includes('action="glow"') && src.includes('action="safefly"'));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
