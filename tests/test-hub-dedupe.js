"use strict";
/**
 * v4.39 — dọn thẻ trùng trên Script Hub, không xoá engine.
 */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const m = src.match(/S\.ScriptHubList\s*=\s*\{([\s\S]*?)\nS\.hubFavs/);
if (!m) throw new Error("không tìm thấy S.ScriptHubList");
const list = m[1];
const names = [...list.matchAll(/name\s*=\s*"([^"]+)"/g)].map((x) => x[1]);
const actions = [...list.matchAll(/action\s*=\s*"([^"]+)"/g)].map((x) => x[1]);

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== thẻ Script Hub ==");
ok("không còn thẻ tên 'Bay' trùng (đã đổi Bay theo camera)", !names.includes("Bay") && names.includes("Bay theo camera"));
ok("vẫn có 🛡 Bay An Toàn (khác 🚀)", names.includes("Bay An Toàn"));
ok("đúng 2 thẻ bay: theo camera + an toàn",
  names.filter((n) => n === "Bay theo camera" || n === "Bay An Toàn").length === 2);
ok("không còn thẻ Bay Tới Kính / Bay Tới Người / Dừng Bay",
  !names.some((n) => /Bay Tới|Dừng Bay/.test(n)));
ok("không còn thẻ Đặt 1 Tấm / Xóa Kính / Tự Đặt / Quản Lý Kính / Định Vị Lẻ / Tắt Định Vị / Dừng Xem",
  !names.includes("Đặt 1 Tấm Kính Dưới Chân") &&
  !names.includes("Xóa Kính Đã Đặt") &&
  !names.includes("Tự Đặt Kính") &&
  !names.includes("Quản Lý Kính (trong Người Chơi)") &&
  !names.includes("Định Vị Lẻ") &&
  !names.includes("Tắt Định Vị") &&
  !names.includes("Dừng Xem Người Chơi"));
ok("Thảm Kính thay Đặt Kính (tránh lẫn đặt kính cố định)", names.includes("Thảm Kính") && !names.includes("Đặt Kính"));
ok("action không trùng trong danh sách", new Set(actions).size === actions.length, actions.join(","));

const removed = ["placeglass","clearglass","autoglass","openglasspanel","flyglass","stopglassfly","flyplayer","stopflyplayer","loc_solo","spec_off","loc_stop"];
ok("đã gỡ action trùng khỏi ScriptHubList", removed.every((a) => !actions.includes(a)), removed.filter((a) => actions.includes(a)).join(","));

console.log("== engine / khung vẫn sống ==");
ok("🚀 SetFly + HubFly_Panel", src.includes("function MV.SetFly") && src.includes("HubFly_Panel"));
ok("🛡 Safe.Set + HubSafe_Panel + SetAvoidPlayers",
  src.includes("function MV.Safe.Set") && src.includes("HubSafe_Panel") && src.includes("SetAvoidPlayers"));
ok("kính: PlaceGlass / FlyToGlass / FlyToPlayer còn",
  src.includes("function MV.PlaceGlass") || src.includes("MV.PlaceGlass") ?
    src.includes("PlaceGlass") && src.includes("FlyToGlass") && src.includes("FlyToPlayer") : false);
ok("RunHubAction vẫn nhận action đã gỡ thẻ",
  removed.every((a) => src.includes('id == "' + a + '"')));
ok("HubMove_Panel vẫn có Đặt Kính / Bay tới",
  src.includes("HubMove_Panel") && src.includes("Đặt Kính Dưới Chân") && src.includes("Bay tới kính"));
ok("tab 👥 HubGlass_Panel + HubLoc_Panel còn",
  src.includes("HubGlass_Panel") && src.includes("HubLoc_Panel"));
ok("💨 sprint + 🦘 highJump + infJump còn",
  src.includes("function MV.SetSprint") && src.includes("function MV.SetHighJump") && src.includes("function MV.SetInfJump"));
ok("👣 spec_on bấm lại thì Stop",
  /elseif id == "spec_on" then[\s\S]*S\.Spec\.Stop\(/.test(src));
ok("tên action còn lại là duy nhất từng tính năng lõi",
  ["fly","safefly","camspeed","highjump","infjump","noclip","carpet","runmode","glow","freecam","loc_all","spec_on"]
    .every((a) => actions.includes(a)));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
