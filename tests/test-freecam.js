"use strict";
/** v4.65 — 🎥 Khán giả: camera xuyên tường (FR._pos + Last, không Popper). */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const start = src.indexOf("-- ---------- 🎥 KHÁN GIẢ (v4.64)");
const end = src.indexOf("-- ---------- HẾT 🎥 KHÁN GIẢ ----------");
if (start < 0 || end < 0) throw new Error("không tìm thấy engine 🎥 Khán giả");
const eng = src.slice(start, end);

const pStart = src.indexOf("-- ---------- v4.64: KHUNG 🎥 KHÁN GIẢ");
const pEnd = src.indexOf("-- ---------- HẾT KHUNG 🎥 KHÁN GIẢ ----------");
if (pStart < 0 || pEnd < 0) throw new Error("không tìm thấy HubFree_Panel");
const panel = src.slice(pStart, pEnd);

function sliceFn(name, next) {
  const a = eng.indexOf("function S.Free." + name);
  const b = next ? eng.indexOf("function S.Free." + next, a + 1) : eng.length;
  return a >= 0 && b > a ? eng.slice(a, b) : "";
}
const hold = sliceFn("HoldChar", "ReleaseChar");
const release = sliceFn("ReleaseChar", "AimCam");
const aim = sliceFn("AimCam", "RestoreCam");
const restore = sliceFn("RestoreCam", "Look");
const step = sliceFn("Step", "Bind");
const bind = sliceFn("Bind", "Set");
const setFn = sliceFn("Set", "Stop");

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 🎥 khán giả ==");
ok("S.Free.Set / Stop / HoldChar / AimCam / Step / FlyVelocity",
  src.includes("function S.Free.Set") && src.includes("function S.Free.Stop") &&
  src.includes("function S.Free.HoldChar") && src.includes("function S.Free.AimCam") &&
  src.includes("function S.Free.Step") && eng.includes("MV.FlyVelocity"));
ok("thẻ freecam + khung HubFree_Panel Tiện ích",
  src.includes('action="freecam"') && src.includes('Name = "HubFree_Panel"') &&
  src.includes('HubFree_Panel = "Tiện ích"'));
ok("RunHubAction freecam gọi Set",
  /elseif id == "freecam" then[\s\S]{0,280}S\.Free\.Set/.test(src));
ok("RebuildHubList sync free", src.includes("S.SyncFreePanel"));

console.log("== BUG: đã xóa 👻 toàn hình ==");
ok("không còn S.Invis / HubInvis / action invis",
  !src.includes("function S.Invis") && !src.includes("HubInvis_Panel") &&
  !src.includes('action="invis"') && !src.includes("S.Invis.Set"));
ok("không còn SafeInvis / ghost toàn hình",
  !src.includes("function S.SafeInvis") && !src.includes("BC_InvisGhost") &&
  !src.includes("BC_InvisHold") && !src.includes('action="safeinvis"'));

console.log("== BUG: nhân vật đứng yên, camera bay ==");
ok("HoldChar neo HRP + khóa CFrame (không SetFly / PlatformStand / noclip)",
  hold.includes("Anchored = true") && hold.includes("hrp.CFrame") &&
  !hold.includes("SetFly") && !hold.includes("PlatformStand") && !hold.includes("SetNoclip"));
ok("Stepped HoldChar mỗi physics (WASD không kéo người)",
  bind.includes("RunService.Stepped:Connect") && bind.includes("pcall(S.Free.HoldChar)"));
ok("tắt thì ReleaseChar trả Anchored + RestoreCam Humanoid",
  setFn.includes("S.Free.ReleaseChar()") && setFn.includes("S.Free.RestoreCam()") &&
  release.includes("Anchored") && restore.includes("CameraType.Custom") &&
  restore.includes('FindFirstChildOfClass("Humanoid")'));
ok("AimCam CameraType Scriptable (camera đi, người ở lại)",
  aim.includes("CameraType.Scriptable") && setFn.includes("S.Free.AimCam()"));
ok("Step dùng MV.FlyVelocity + _ReadFlyInput (cách bay giống 🚀)",
  step.includes("MV.FlyVelocity") && step.includes("MV._ReadFlyInput") &&
  step.includes("cam.CFrame"));
ok("Bind BC_FreeCam Last (sau Popper), không cướp Bind Fly",
  bind.includes('BindToRenderStep("BC_FreeCam"') &&
  bind.includes("Last.Value") && !bind.includes("Camera.Value + 1") &&
  !bind.includes('BindToRenderStep("Fly"') &&
  src.includes('BindToRenderStep("Fly"'));
ok("BUG không xuyên tường: Step dùng FR._pos, không cam.CFrame.Position (Popper kéo ra)",
  step.includes("FR._pos") && !step.includes("cam.CFrame.Position"));
ok("BUG không xuyên tường: AimCam Scriptable mỗi Step + nil CameraSubject",
  step.includes("S.Free.AimCam()") && aim.includes("CameraType.Scriptable") &&
  (aim.includes("CameraSubject = nil") || aim.includes("cam.CameraSubject = nil")));
ok("không FireServer / không remote trong engine",
  !/:FireServer\s*\(/.test(eng) && !/:InvokeServer\s*\(/.test(eng) &&
  !eng.includes("RemoteEvent") && !eng.includes("RemoteFunction"));
ok("không cướp 🚀/🧱/🦘/🛡 trong engine Free",
  !eng.includes("MV.SetFly") && !eng.includes("SetNoclip") &&
  !eng.includes("SetHighJump") && !eng.includes("MV.Safe.Set") &&
  !eng.includes("PlatformStand"));

console.log("== không mất tính năng ==");
ok("🚀/💨/🦘/🛡/✨/🔐 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function MV.Safe.Set") &&
  src.includes("function S.Glow.Set") && src.includes("function S.AntiBanSet"));
ok("👣 Xem người chơi còn", src.includes("function S.Spec.Set") && src.includes('action="spec_on"'));
ok("nút khung gọi Free.Set / Stop",
  panel.includes("S.Free.Set(not FR.on)") && panel.includes("S.Free.Stop()"));
ok("ô tốc độ gọi SetSpeed 1–2000",
  src.includes("function S.Free.SetSpeed") && panel.includes("S.Free.SetSpeed"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
