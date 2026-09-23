"use strict";
/** v4.40 — khung ⚙ Tuỳ chỉnh gom Bay / Tốc độ camera / Nhảy cao / Di chuyển */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- v4.40: KHUNG ⚙ TUỲ CHỈNH");
const end = src.indexOf("-- ---------- HẾT KHUNG ⚙ TUỲ CHỈNH ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy HubTune_Panel");
const panel = src.slice(start, end);

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== khung ⚙ tuỳ chỉnh ==");
ok("HubTune_Panel", src.includes('Name = "HubTune_Panel"'));
ok("LayoutOrder -4 (trên cùng)", panel.includes("LayoutOrder = -4"));
ok("có 🚀 Bay BẬT/TẮT + ô tốc độ + SetFlySpeed",
  panel.includes("TuneFly") && panel.includes("TuneFlySpeed") && panel.includes("MV.SetFlySpeed"));
ok("có 💨 Tốc độ camera + SetSprintSpeed",
  panel.includes("TuneSprint") && panel.includes("SetSprintSpeed") && panel.includes('RunHubAction("camspeed")'));
ok("có 🦘 Nhảy cao + SetHighJumpSpeed",
  panel.includes("TuneHighJump") && panel.includes("SetHighJumpSpeed") && panel.includes('RunHubAction("highjump")'));
ok("có 👟 Chạy + 🦘 lực nhảy (tuỳ chỉnh di chuyển)",
  panel.includes("TuneWalkSpeed") && panel.includes("TuneJumpPower") && panel.includes("speedMode"));
ok("nút gọi đúng action fly/camspeed/highjump",
  panel.includes('RunHubAction("fly")') && panel.includes('RunHubAction("camspeed")') && panel.includes('RunHubAction("highjump")'));
ok("không tự SetNoclip trong khung tuỳ chỉnh", !panel.includes("SetNoclip"));

console.log("== không mất khung/engine cũ ==");
ok("HubFly_Panel + SetFly", src.includes("HubFly_Panel") && src.includes("function MV.SetFly"));
ok("HubSpeed_Panel + SetSprint", src.includes("HubSpeed_Panel") && src.includes("function MV.SetSprint"));
ok("HubHighJump_Panel + SetHighJump", src.includes("HubHighJump_Panel") && src.includes("function MV.SetHighJump"));
ok("HubMove_Panel còn", src.includes("HubMove_Panel"));
ok("RebuildHubList sync tune", src.includes("S.SyncTunePanel"));
ok("SetFlySpeed / SetSprintSpeed / SetHighJumpSpeed gọi SyncTunePanel",
  /function MV\.SetFlySpeed[\s\S]{0,400}SyncTunePanel/.test(src) &&
  /function MV\.SetSprintSpeed[\s\S]{0,350}SyncTunePanel/.test(src) &&
  /function MV\.SetHighJumpSpeed[\s\S]{0,400}SyncTunePanel/.test(src));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
