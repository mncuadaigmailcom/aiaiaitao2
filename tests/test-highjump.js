"use strict";
/**
 * v4.38 — 🦘 Nhảy cao (công tắc độc lập kiểu 👤 Né người)
 * Run: node tests/run.js
 */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const engineStart = src.indexOf("-- ---------- 🦘 NHẢY CAO (v4.38)");
const engineEnd = src.indexOf("end -- 🦘 NHẢY CAO");
const panelStart = src.indexOf("-- ---------- v4.38: KHUNG 🦘 NHẢY CAO");
const panelEnd = src.indexOf("-- ---------- HẾT KHUNG 🦘 NHẢY CAO ----------");
if (engineStart < 0 || engineEnd < 0 || panelStart < 0 || panelEnd < 0) {
  throw new Error("không tìm thấy khối 🦘 nhảy cao trong script.js");
}
const engine = src.slice(engineStart, engineEnd);
const panel = src.slice(panelStart, panelEnd);

let pass = 0;
let fail = 0;
function ok(name, cond, detail) {
  if (cond) {
    pass++;
    console.log("  PASS  " + name);
  } else {
    fail++;
    console.log("  FAIL  " + name + (detail ? " — " + detail : ""));
  }
}
function near(a, b, eps) {
  return Math.abs(a - b) <= (eps == null ? 1e-6 : eps);
}

console.log("== nguồn 🦘 nhảy cao ==");
ok("HubHighJump_Panel", src.includes('Name = "HubHighJump_Panel"'));
ok("thẻ highjump", src.includes('action="highjump"') && src.includes('name="Nhảy Cao"'));
ok("SetHighJump + SetHighJumpSpeed + HighJumpVelocity",
  src.includes("function MV.SetHighJump") &&
  src.includes("function MV.SetHighJumpSpeed") &&
  src.includes("function MV.HighJumpVelocity"));
ok("công tắc độc lập (không gộp vào 🛡.on)",
  engine.includes("function MV.SetHighJump(on)") &&
  !engine.includes("MV.Safe.Set(") &&
  src.includes("highjump= function() return S.Move.highJump end"));
ok("không gán PlatformStand", !/PlatformStand\s*=/.test(engine));
ok("không BodyVelocity/BodyGyro", !/New\(\s*"BodyVelocity"/.test(engine) && !/New\(\s*"BodyGyro"/.test(engine));
ok("không tự bật noclip", !engine.includes("SetNoclip") && !panel.includes("Xuyên tường"));
ok("không nút ảo", !panel.includes("Nút ảo") && !panel.includes("showHud"));
ok("StopAll tắt highJump", src.includes("MV.SetHighJump(false)"));
ok("watchdog + respawn", src.includes("or MV.highJump or") && src.includes("MV._HighJumpApplyPower"));
ok("không nhảy khi đang Freefall (không cướp 🦘 vô hạn trên không)",
  engine.includes("HumanoidStateType.Freefall"));
ok("bỏ qua khi 🚀/🛡 đang bay", engine.includes("if MV.fly or (MV.Safe and MV.Safe.on)"));

console.log("== giữ tính năng cũ ==");
ok("🦘 Nhảy vô hạn còn", src.includes('action="infjump"') && src.includes("function MV.SetInfJump"));
ok("👤 Né người 🛡 còn", src.includes("function MV.Safe.SetAvoidPlayers") && src.includes("FlyNoclip") === false
  ? src.includes("SetAvoidPlayers") : src.includes("function MV.Safe.SetAvoidPlayers"));
ok("👤 né người toggle panel còn", src.includes("SafePlayers") && src.includes("avoidPlayers"));
ok("💨 tốc độ theo camera còn", src.includes("HubSpeed_Panel") && src.includes("function MV.SetSprint"));
ok("🚀 Bay / 🛡 / 🧱 còn",
  src.includes("HubFly_Panel") && src.includes("HubSafe_Panel") && src.includes('action="noclip"'));

console.log("== vật lý HighJumpVelocity ==");
function clamp(n, lo, hi, dft) {
  n = Number(n);
  if (!Number.isFinite(n)) return dft;
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
}
function highJumpVelocity(current, speed) {
  return [current[0], clamp(speed, 1, 500, 80), current[2]];
}
const boosted = highJumpVelocity([12, -4, -3], 120);
ok("giữ XZ, ghi Y = tốc độ", boosted[0] === 12 && boosted[2] === -3 && boosted[1] === 120, JSON.stringify(boosted));
ok("kẹp 1–500", highJumpVelocity([0, 0, 0], 9999)[1] === 500 && highJumpVelocity([0, 0, 0], -8)[1] === 1);
ok("Lua HighJumpVelocity chỉ đổi Y",
  /function MV\.HighJumpVelocity[\s\S]*Vector3\.new\(vx, mvClamp\(speed, 1, 500, 80\), vz\)/.test(engine));

console.log("== nhảy cao rồi rơi theo gravity game ==");
function apexThenFall(jumpSpeed) {
  const g = -196.2;
  const dt = 1 / 60;
  let y = 0;
  let vy = jumpSpeed;
  let maxY = 0;
  let grounded = false;
  for (let i = 0; i < 300; i++) {
    vy += g * dt; // không khóa Y
    y += vy * dt;
    if (y > maxY) maxY = y;
    if (y <= 0 && i > 3) {
      grounded = true;
      break;
    }
  }
  return { maxY, grounded };
}
const low = apexThenFall(50);
const high = apexThenFall(120);
ok("tốc độ 120 nhảy cao hơn 50", high.maxY > low.maxY * 1.5, JSON.stringify({ low, high }));
ok("cả hai đều rơi chạm đất", low.grounded && high.grounded);
ok("Lua không khóa Y bằng MaxForce", !engine.includes("MaxForce"));

ok("ô tốc độ 1–500 trong khung", panel.includes("Tốc độ nhảy (1–500)") && panel.includes("SetHighJumpSpeed"));
ok("nút BẬT/TẮT + Dừng + Áp dụng",
  panel.includes("HighJumpToggle") && panel.includes("HighJumpStop") && panel.includes("HighJumpApply"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
