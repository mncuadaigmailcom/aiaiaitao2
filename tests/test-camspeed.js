"use strict";
/**
 * v4.37 — 💨 Tốc độ theo camera
 * Source + physics tests (no Roblox runtime).
 * Run: node tests/run.js
 */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const engineStart = src.indexOf("-- ---------- 💨 TỐC ĐỘ THEO CAMERA (v4.37)");
const engineEnd = src.indexOf("end -- 💨 TỐC ĐỘ THEO CAMERA");
const panelStart = src.indexOf("-- ---------- v4.37: KHUNG 💨 TỐC ĐỘ THEO CAMERA");
const panelEnd = src.indexOf("-- ---------- HẾT KHUNG 💨 TỐC ĐỘ THEO CAMERA ----------");
if (engineStart < 0 || engineEnd < 0 || panelStart < 0 || panelEnd < 0) {
  throw new Error("không tìm thấy khối 💨 trong script.js");
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

console.log("== nguồn 💨 ==");
ok("HubSpeed_Panel", src.includes('Name = "HubSpeed_Panel"'));
ok("thẻ camspeed", src.includes('action="camspeed"') && src.includes('name="Tốc độ theo camera"'));
ok("SetSprint / SpeedVelocity / Bind BC_Speed",
  src.includes("function MV.SetSprint") &&
  src.includes("function MV.SpeedVelocity") &&
  src.includes('BindToRenderStep("BC_Speed"'));
ok("BC_SpeedVel MaxForce.Y = 0", engine.includes("Name = \"BC_SpeedVel\"") && engine.includes("Vector3.new(1e9, 0, 1e9)"));
ok("không gán PlatformStand", !/PlatformStand\s*=/.test(engine));
ok("không BodyGyro instance", !/New\(\s*"BodyGyro"/.test(engine));
ok("không đọc Space/Shift (nhảy của game)", !engine.includes("KeyCode.Space") && !engine.includes("LeftShift") && !engine.includes("LeftControl"));
ok("không tự bật noclip", !engine.includes("SetNoclip") && !panel.includes("Xuyên tường"));
ok("không nút ảo", !panel.includes("Nút ảo") && !panel.includes("_BuildFlyHud") && !panel.includes("showHud"));
ok("StopAll tắt sprint", src.includes("MV.SetSprint(false)"));
ok("watchdog + respawn", src.includes("or MV.sprint or") && src.includes("MV._EnsureSpeed()") && src.includes("MV._BindSpeed()"));

console.log("== giữ tính năng cũ ==");
ok("HubFly_Panel còn", src.includes('Name = "HubFly_Panel"') && src.includes("function MV.SetFly"));
ok("fly noclip + nút ảo còn", src.includes("FlyNoclip") && src.includes("FlyHudToggle"));
ok("thẻ Bay / Xuyên Tường / Nhảy / Thảm / Safe",
  src.includes('action="fly"') && src.includes('action="noclip"') &&
  src.includes('action="infjump"') && src.includes('action="runmode"') &&
  src.includes('action="safefly"'));
ok("👟 WalkSpeed SetSpeed còn", src.includes("function MV.SetSpeed") && src.includes("function MV.WantSpeed"));

console.log("== vật lý SpeedVelocity ==");
function mag(v) { return Math.hypot(v[0], v[1], v[2]); }
function unit(v) {
  const m = mag(v);
  return m < 1e-12 ? [0, 0, 0] : [v[0] / m, v[1] / m, v[2] / m];
}
function clamp(n, lo, hi, dft) {
  n = Number(n);
  if (!Number.isFinite(n)) return dft;
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
}
function speedVelocity(cf, input, speed) {
  let look = [cf.look[0], 0, cf.look[2]];
  let right = [cf.right[0], 0, cf.right[2]];
  const lookM = Math.hypot(look[0], look[2]);
  let rightM = Math.hypot(right[0], right[2]);
  if (lookM < 0.001) {
    right = rightM > 0.001 ? [right[0] / rightM, 0, right[2] / rightM] : [1, 0, 0];
    look = [right[2], 0, -right[0]];
  } else {
    look = [look[0] / lookM, 0, look[2] / lookM];
  }
  rightM = Math.hypot(right[0], right[2]);
  right = rightM > 0.001 ? [right[0] / rightM, 0, right[2] / rightM] : [1, 0, 0];
  let direction = [
    right[0] * input.x - look[0] * input.z,
    0,
    right[2] * input.x - look[2] * input.z,
  ];
  const m = Math.hypot(direction[0], direction[2]);
  if (m < 0.001) return [0, 0, 0];
  if (m > 1) direction = [direction[0] / m, 0, direction[2] / m];
  const sp = clamp(speed, 1, 2000, 50);
  return [direction[0] * sp, 0, direction[2] * sp];
}

const flat = {
  look: [0, 0, -1],
  right: [1, 0, 0],
};
const down60 = {
  look: [0, -Math.sin(Math.PI / 3), -Math.cos(Math.PI / 3)],
  right: [1, 0, 0],
};

const zero = speedVelocity(flat, { x: 0, z: 0 }, 80);
ok("thả phím = 0", mag(zero) === 0);

const fwd = speedVelocity(flat, { x: 0, z: -1 }, 80);
ok("W camera ngang: Y=0, |v|=80, đi -Z",
  near(fwd[1], 0) && near(mag(fwd), 80, 1e-6) && near(fwd[2], -80, 1e-6),
  JSON.stringify(fwd));

const pitch = speedVelocity(down60, { x: 0, z: -1 }, 80);
ok("nhìn xuống 60° + W: vẫn Y=0 (không bay xuống)",
  near(pitch[1], 0) && near(mag(pitch), 80, 1e-4) && Math.abs(pitch[2] + 80) < 0.5,
  JSON.stringify(pitch));

const diag = speedVelocity(flat, { x: 1, z: -1 }, 80);
ok("chéo không nhanh hơn thẳng", mag(diag) <= 80 + 1e-6 && near(mag(diag), 80, 1e-6), String(mag(diag)));

const rightV = speedVelocity(flat, { x: 1, z: 0 }, 50);
ok("D đi theo RightVector XZ", near(rightV[0], 50, 1e-6) && near(rightV[1], 0) && near(rightV[2], 0));

ok("mọi vận tốc SpeedVelocity có Y=0",
  [zero, fwd, pitch, diag, rightV].every((v) => v[1] === 0));

console.log("== nhảy + rơi theo trọng lực game ==");
function simulateFromApex(maxForceY) {
  const g = -196.2;
  const dt = 1 / 60;
  let y = 12; // vừa nhảy lên cao
  let vy = 0;
  let grounded = false;
  for (let i = 0; i < 240; i++) {
    if (maxForceY > 0) {
      vy = 0; // 🚀 khóa Y: đứng lơ lửng
    } else {
      vy += g * dt; // 💨 để game kéo xuống
    }
    y += vy * dt;
    if (y <= 0) {
      grounded = true;
      y = 0;
      break;
    }
  }
  return { y, grounded };
}
function simulateJumpThenFall() {
  const g = -196.2;
  const dt = 1 / 60;
  let y = 0;
  let vy = 50;
  let maxY = 0;
  let grounded = false;
  for (let i = 0; i < 240; i++) {
    vy += g * dt; // 💨 không ghi Y
    y += vy * dt;
    if (y > maxY) maxY = y;
    if (y <= 0 && i > 3) {
      grounded = true;
      break;
    }
  }
  return { maxY, grounded };
}
const hop = simulateJumpThenFall();
ok("💨 nhảy thường: lên rồi rơi", hop.maxY > 2 && hop.grounded, JSON.stringify(hop));
const ground = simulateFromApex(0);
const flying = simulateFromApex(1e9);
ok("💨 MaxForce.Y=0: từ trên cao rơi chạm đất theo gravity game",
  ground.grounded,
  JSON.stringify(ground));
ok("nếu khóa Y như 🚀 thì treo lơ lửng, không rơi",
  !flying.grounded && flying.y > 10,
  JSON.stringify(flying));

const luaMatchesSource =
  /function MV\.SpeedVelocity\(cf, input, speed\)[\s\S]*?direction = Vector3\.new\(direction\.X, 0, direction\.Z\)/.test(engine);
ok("Lua SpeedVelocity khóa Y trước khi nhân tốc độ", luaMatchesSource);

ok("Lua ghi Velocity = Vector3.new(vel.X, 0, vel.Z)", engine.includes("MV._sv.Velocity = Vector3.new(vel.X, 0, vel.Z)"));
ok("thả phím nhả MaxForce XZ (không khóa đứng)", engine.includes("MV._sv.MaxForce = Vector3.new(0, 0, 0)"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
