"use strict";
/** v4.50 — 👻 camera trên mặt đất chạy/nhảy, nhân vật chìm đất, nút bấm nhiều lần */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 👻 TOÀN HÌNH AN TOÀN (v4.50)");
const end = src.indexOf("-- ---------- HẾT 👻 TOÀN HÌNH AN TOÀN ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 👻 Toàn hình an toàn");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.50: KHUNG 👻 TOÀN HÌNH AN TOÀN");
const pEnd = src.indexOf("-- ---------- HẾT KHUNG 👻 TOÀN HÌNH AN TOÀN ----------");
if (pStart < 0 || pEnd < 0) throw new Error("không tìm thấy HubSafeInvis_Panel");
const panel = src.slice(pStart, pEnd);

function fnBody(name) {
  const k = "function S.SafeInvis." + name + "(";
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
ok("Set + SinkNow + SetupCam + Follow + SetAdjust",
  src.includes("function S.SafeInvis.Set") && src.includes("function S.SafeInvis.SinkNow") &&
  src.includes("function S.SafeInvis.SetupCam") && src.includes("function S.SafeInvis.Follow") &&
  src.includes("function S.SafeInvis.SetAdjust"));
ok("thẻ safeinvis + khung", src.includes('action="safeinvis"') && src.includes('Name = "HubSafeInvis_Panel"'));

console.log("== chìm đất + xuyên tường, camera khán giả ==");
ok("bật: SetNoclip(true) + SinkNow xuống dưới đất",
  fnBody("Set").includes("SetNoclip(true)") && fnBody("Set").includes("SinkNow") &&
  eng.includes("SI._underY = SI._surfY - d"));
ok("camera part BC_SafeInvisCam + CameraSubject, KHÔNG CameraType (Popper vẫn chặn tường)",
  eng.includes("BC_SafeInvisCam") && eng.includes("cam.CameraSubject") &&
  !eng.includes("CameraType"));
ok("Follow: camera chạy trên mặt đất, nhân vật theo XZ dưới đất",
  fnBody("Follow").includes("_underY") && fnBody("Follow").includes("_surfY + 2.5") &&
  fnBody("Follow").includes("SI._cx") && fnBody("Follow").includes("cp.CFrame"));
ok("camera chạy/nhảy bình thường (WalkSpeed + JumpPower + gravity)",
  src.includes("function S.SafeInvis.MoveDir") && src.includes("GetMoveVector") &&
  fnBody("Follow").includes("WalkSpeed") && fnBody("Follow").includes("dir.X * spd * dt") &&
  fnBody("Follow").includes("JumpPower") && fnBody("Follow").includes("_camVelY"));
ok("PlatformStand = false (chạy/nhảy)",
  eng.includes("hum.PlatformStand = false") && eng.includes("hum.AutoRotate = true"));
ok("LTM + RenderPriority.Last (Evade)",
  fnBody("HideInst").includes("LocalTransparencyModifier = 1") &&
  eng.includes("Enum.RenderPriority.Last.Value"));

console.log("== nút màn hình tắt cả 🧱 ==");
ok("nút HUD bấm nhiều lần (toggle Set(want, true))",
  eng.includes("function pressHud") && eng.includes("S.SafeInvis.Set(want, true)") &&
  eng.includes("not SI.on"));
ok("Set(false) luôn SetNoclip(false) (tắt xuyên tường trên Script Hub)",
  fnBody("Set").includes("SetNoclip(false)"));
ok("tắt: SurfaceNow + KillCam trả camera Humanoid",
  fnBody("Set").includes("SurfaceNow") && fnBody("Set").includes("KillCam"));
ok("📐 chỉnh nút vẫn còn, đang chỉnh thì không tắt",
  src.includes("function S.SafeInvis.SetAdjust") &&
  /if SI\.adjust or SI\._dragMoved then/.test(eng) &&
  panel.includes("SafeInvisAdjust"));
ok("HUD DisplayOrder 10000", eng.includes("DisplayOrder = 10000"));

console.log("== không cướp tính năng cũ ==");
ok("không MV.Safe.Set / không CameraType Scriptable",
  !eng.includes("MV.Safe.Set(") && !eng.includes("CameraType"));
ok("🚀/💨/🦘/✨/🛡/🔐 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function S.Glow.Set") &&
  src.includes("function MV.Safe.Set") && src.includes("function S.AntiBanSet"));
ok("thẻ glow/fly/safefly/antiban/noclip còn",
  src.includes('action="glow"') && src.includes('action="fly"') &&
  src.includes('action="safefly"') && src.includes('action="antiban"') &&
  src.includes('action="noclip"'));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
