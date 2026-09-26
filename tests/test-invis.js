"use strict";
/** v4.63 — 👻 nhảy: ảo không bám Away / không trượt XZ / HRP ảo đứng thẳng */
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

function sliceFn(name, next) {
  const a = eng.indexOf("function S.Invis." + name);
  const b = next ? eng.indexOf("function S.Invis." + next, a + 1) : eng.length;
  return a >= 0 && b > a ? eng.slice(a, b) : "";
}
const hide = sliceFn("HideReal", "IsMover");
const ghostSelf = sliceFn("GhostSelf", "HideReal");
const ghost = sliceFn("EnsureGhost", "Follow");
const follow = sliceFn("Follow", "BindNet");
const net = sliceFn("NetHide", "GhostSelf");
const show = sliceFn("LocalShow", "NetHide");
const bindNet = sliceFn("BindNet", "Bind(");
const bind = (() => {
  const a = eng.indexOf("function S.Invis.Bind(");
  const b = eng.indexOf("function S.Invis.Set", a + 1);
  return a >= 0 && b > a ? eng.slice(a, b) : "";
})();
const setFn = sliceFn("Set", "Stop");
const restore = sliceFn("Restore", "LocalShow");

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 👻 toàn hình ==");
ok("S.Invis.Set / HideReal / EnsureGhost / Follow / AimCam / SpoofToPlayers / NetHide / LocalShow",
  src.includes("function S.Invis.Set") && src.includes("function S.Invis.HideReal") &&
  src.includes("function S.Invis.EnsureGhost") && src.includes("function S.Invis.Follow") &&
  src.includes("function S.Invis.AimCam") && src.includes("function S.Invis.SpoofToPlayers") &&
  src.includes("function S.Invis.NetHide") && src.includes("function S.Invis.LocalShow"));
ok("thẻ invis + khung HubInvis_Panel",
  src.includes('action="invis"') && src.includes('Name = "HubInvis_Panel"') &&
  src.includes('HubInvis_Panel = "Tiện ích"'));
ok("RunHubAction invis gọi Set",
  /elseif id == "invis" then[\s\S]{0,280}S\.Invis\.Set/.test(src));
ok("RebuildHubList sync invis", src.includes("S.SyncInvisPanel"));

console.log("== lỗi người khác vẫn thấy (Transparency không replicate) ==");
ok("ghi nhận Transparency client không replicate",
  eng.includes("Transparency client KHÔNG replicate") ||
  eng.includes("Transparency trên client KHÔNG replicate"));
ok("NetHide ngụy CFrame HRP (replicate vật lý tới mọi client)",
  net.includes("HumanoidRootPart") || eng.includes("function S.Invis.HRP"));
ok("NetHide cộng IV.Away, không FireServer",
  net.includes("IV._cf + IV.Away") && !/:FireServer\s*\(/.test(eng) &&
  !/:InvokeServer\s*\(/.test(eng) && !/:FireClient\s*\(/.test(eng));
ok("Away đủ xa (không đứng nguyên chỗ) nhưng Y nhỏ (không bay lên trời)",
  eng.includes("IV.Away = Vector3.new(24000, 40, 24000)") &&
  !eng.includes("1e5") && !eng.includes("100000"));
ok("Stepped LocalShow (trước physics) — Heartbeat KHÔNG NetHide (đè bước đi)",
  bindNet.includes("RunService.Stepped:Connect") && bindNet.includes("pcall(S.Invis.LocalShow)") &&
  !bindNet.includes("Heartbeat") && !bindNet.includes("NetHide"));
ok("LocalShow trả CFrame đã lưu, KHÔNG ghi Velocity (đứng hình)",
  show.includes("hrp.CFrame = IV._cf") && restore.includes("hrp.CFrame = IV._cf") &&
  !show.includes("AssemblyLinearVelocity") && !show.includes("AssemblyAngularVelocity"));
ok("Stop/Restore trả CFrame trước khi tắt",
  setFn.includes("S.Invis.Restore()") && restore.includes("hrp.CFrame = IV._cf"));
ok("SpoofAll duyệt Players:GetPlayers, không đụng Character người khác, không remote",
  eng.includes("Players:GetPlayers()") && !eng.includes("p.Character") &&
  !eng.includes("RemoteEvent") && !eng.includes("RemoteFunction"));
ok("SpoofToPlayers gọi SpoofAll + NetHide, không FireServer",
  src.includes("function S.Invis.SpoofToPlayers") &&
  /function S\.Invis\.SpoofToPlayers\([\s\S]*?SpoofAll\([\s\S]*?NetHide\(/.test(eng) &&
  !/:FireServer\s*\(/.test(eng));

console.log("== lỗi người khác vẫn thấy vì Evade tắt NetHide ==");
ok("BUG: NetHide KHÔNG return sớm trên Evade (gửi CFrame tới người chơi)",
  !/function S\.Invis\.NetHide\([\s\S]*?IsEvade\(\) then return end/.test(net) &&
  net.includes("IV._cf + IV.Away"));
ok("BUG: BindNet/LocalShow chạy cả Evade (Last + Stepped)",
  !bindNet.includes("if S.Invis.IsEvade() then return end") &&
  !/function S\.Invis\.LocalShow\([\s\S]*?IsEvade\(\) then return end/.test(show) &&
  bind.includes("pcall(S.Invis.SpoofToPlayers)"));
ok("LocalShow hum:Move giữ WASD, không ghi Velocity",
  show.includes("hum:Move(md, false)") && !show.includes("AssemblyLinearVelocity"));
ok("Evade vẫn GhostSelf LTM mỗi frame (mình trong suốt)",
  src.includes("function S.Invis.GhostSelf") &&
  hide.includes("S.Invis.GhostSelf(ch)") &&
  ghostSelf.includes("LocalTransparencyModifier = 0.45") &&
  bind.includes("pcall(S.Invis.GhostSelf)"));
ok("Camera-1 KHÔNG LocalShow (CFrame lúc vẽ đè WASD)",
  !bind.includes("pcall(S.Invis.LocalShow)") && bind.includes("pcall(S.Invis.Follow)"));
ok("tắt thì Unbind BC_InvisNet + Restore LTM",
  bind.includes('UnbindFromRenderStep("BC_InvisNet")') &&
  restore.includes("LocalTransparencyModifier"));
ok("Status ngụy CFrame tới người chơi, không remote",
  eng.includes("ngụy CFrame tới") && eng.includes("không remote"));

console.log("== Evade không giật clone / tay ==");
ok("IsEvade theo GameId 3647333358 / PlaceId 9872472334 / tên evade",
  src.includes("function S.Invis.IsEvade") && eng.includes("3647333358") &&
  eng.includes("9872472334") && eng.includes('"evade"'));
ok("Camera-1 không Camera+2",
  bind.includes("Enum.RenderPriority.Camera.Value - 1") &&
  !eng.includes("Camera.Value + 2") && !eng.includes("Character.Value"));
ok("Transparency=1 game khác + Last SpoofToPlayers mọi game",
  hide.includes("d.Transparency = 1") &&
  bind.includes('BindToRenderStep("BC_InvisNet"') &&
  bind.includes("Enum.RenderPriority.Last.Value") &&
  net.includes("IV._cf + IV.Away"));

console.log("== nhân vật ảo trong suốt đi theo mình + camera ==");
ok("BUG: EnsureGhost không bỏ Evade/FP (phải thấy nhân vật ảo)",
  !ghost.includes("IsEvade() or S.Invis.IsFirstPerson()") &&
  ghost.includes('g.Name = "BC_InvisGhost"') && ghost.includes("d.Transparency = 0.45"));
ok("BUG: Follow không PivotTo GetPivot (anim nhảy/WorldPivot làm ảo trượt 1 hướng)",
  !follow.includes("GetPivot") && !follow.includes("IV._cf") &&
  !follow.includes("IsEvade() or S.Invis.IsFirstPerson()") &&
  follow.includes("fc.CFrame") && follow.includes("rc.CFrame"));
ok("BUG: ghost parent Folder BC_InvisHold, KHÔNG parent camera",
  eng.includes('h.Name = "BC_InvisHold"') &&
  !eng.includes("g.Parent = cam") && !follow.includes("g.Parent = cam"));
ok("AimCam CameraSubject = ghost HRP, RestoreCam khi tắt, không đổi kiểu camera",
  src.includes("function S.Invis.AimCam") && src.includes("function S.Invis.RestoreCam") &&
  eng.includes("cam.CameraSubject = hrp") && setFn.includes("S.Invis.AimCam()") &&
  setFn.includes("S.Invis.RestoreCam()") && !eng.includes("CameraType"));
ok("BUG: trận mới/tắt — RestoreCam bám LiveSubject Humanoid hiện tại (không Humanoid cũ)",
  src.includes("function S.Invis.LiveSubject") &&
  eng.includes('FindFirstChildOfClass("Humanoid")') &&
  /function S\.Invis\.RestoreCam\([\s\S]*?LiveSubject\(/.test(eng));
ok("BUG: CharacterAdded RestoreCam + AimCam (không kẹt camera sau trận mới)",
  /CharacterAdded:Connect\([\s\S]*?RestoreCam\([\s\S]*?AimCam\(/.test(eng));
ok("BUG nhảy: JumpRequest LocalShow trước khi nhảy (HRP đang Away → ảo trượt 1 hướng)",
  eng.includes("JumpRequest") && /JumpRequest[\s\S]{0,280}LocalShow/.test(eng) &&
  bind.includes("BindJump") && bind.includes('UnbindFromRenderStep("BC_InvisNet")'));
ok("BUG nhảy: Follow copy CFrame từng BasePart theo cây tên (không IV._cf / GetPivot)",
  follow.includes("FindFirstChild") && follow.includes("BasePart") &&
  follow.includes("CFrame") && !follow.includes("IV._cf") && !follow.includes("GetPivot"));
ok("BUG nhảy còn trượt: RootCF — HRP đang Away thì ảo đứng chỗ thật (Magnitude 500)",
  src.includes("function S.Invis.RootCF") && eng.includes("Magnitude > 500") &&
  follow.includes("RootCF"));
ok("BUG nhảy còn trượt: HRP ảo đứng thẳng (LookVector Y=0) — camera Part không nghiêng kéo đi",
  follow.includes("LookVector") && follow.includes("Vector3.new(lv.X, 0, lv.Z)"));
ok("BUG nhảy còn trượt: AirStick XZ=0 lúc Jumping/Freefall không WASD, giữ Y",
  src.includes("function S.Invis.AirStick") &&
  eng.includes("HumanoidStateType.Jumping") && eng.includes("HumanoidStateType.Freefall") &&
  eng.includes("Vector3.new(0, v.Y, 0)") &&
  bindNet.includes("pcall(S.Invis.AirStick)") &&
  /JumpRequest[\s\S]{0,420}AirStick/.test(eng) &&
  !show.includes("AssemblyLinearVelocity"));
ok("nhân vật thật Transparency = 1 (local) + ghost 0.45",
  hide.includes("d.Transparency = 1") && ghost.includes("d.Transparency = 0.45"));
ok("không chìm đất / không HUD / không CameraType",
  !eng.includes("_underY") && !eng.includes("pressHud") && !eng.includes("CameraType") &&
  !eng.includes("BC_SafeInvisCam"));
ok("không cướp 🚀/🧱/PlatformStand nhân vật thật",
  !eng.includes("MV.SetFly") && !eng.includes("SetNoclip") && !eng.includes("PlatformStand") &&
  !eng.includes("MV.Safe.Set"));
ok("HideReal không đụng Anchored / CanCollide / Massless / PivotTo",
  hide.length > 0 && !hide.includes("Anchored") && !hide.includes("CanCollide") &&
  !hide.includes("Massless") && !hide.includes("PivotTo"));
ok("ghost hủy Humanoid + mover trước khi parent",
  ghost.includes('d:IsA("Humanoid")') && ghost.includes("S.Invis.IsMover(d)") &&
  ghost.indexOf('d:IsA("Humanoid")') < ghost.indexOf("g.Parent = hold"));
ok("Follow copy CFrame part ghost, bỏ qua nếu g == nhân vật thật, không PivotTo người thật",
  follow.includes("g == ch") && !follow.includes("ch:PivotTo") &&
  follow.includes("fc.CFrame") && follow.includes("rc.CFrame"));

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
