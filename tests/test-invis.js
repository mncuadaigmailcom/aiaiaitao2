"use strict";
/** v4.54 — 👻 người khác không thấy: ngụy CFrame tới client, không FireServer */
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
const ghost = sliceFn("EnsureGhost", "Follow");
const follow = sliceFn("Follow", "BindNet");
const net = sliceFn("NetHide", "HideReal");
const show = sliceFn("LocalShow", "NetHide");
const bind = sliceFn("Bind", "Set");
const setFn = sliceFn("Set", "Stop");
const restore = sliceFn("Restore", "LocalShow");

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== nguồn 👻 toàn hình ==");
ok("S.Invis.Set / HideReal / EnsureGhost / Follow / SpoofAll / Stop / NetHide / LocalShow",
  src.includes("function S.Invis.Set") && src.includes("function S.Invis.HideReal") &&
  src.includes("function S.Invis.EnsureGhost") && src.includes("function S.Invis.Follow") &&
  src.includes("function S.Invis.SpoofAll") && src.includes("function S.Invis.Stop") &&
  src.includes("function S.Invis.NetHide") && src.includes("function S.Invis.LocalShow"));
ok("thẻ invis + khung HubInvis_Panel",
  src.includes('action="invis"') && src.includes('Name = "HubInvis_Panel"') &&
  src.includes('HubInvis_Panel = "Tiện ích"'));
ok("RunHubAction invis gọi Set",
  /elseif id == "invis" then[\s\S]{0,280}S\.Invis\.Set/.test(src));
ok("RebuildHubList sync invis", src.includes("S.SyncInvisPanel"));

console.log("== lỗi người khác vẫn thấy (Transparency không replicate) ==");
ok("ghi nhận Transparency client không replicate",
  eng.includes("Transparency trên client KHÔNG replicate") ||
  eng.includes("Transparency client không"));
ok("NetHide ngụy CFrame HRP (replicate vật lý tới mọi client)",
  net.includes("HumanoidRootPart") || eng.includes("function S.Invis.HRP"));
ok("NetHide cộng IV.Away, không FireServer",
  net.includes("IV._cf + IV.Away") && !/:FireServer\s*\(/.test(eng) &&
  !/:InvokeServer\s*\(/.test(eng) && !/:FireClient\s*\(/.test(eng));
ok("Away đủ xa (không đứng nguyên chỗ) nhưng Y nhỏ (không bay lên trời)",
  eng.includes("IV.Away = Vector3.new(24000, 40, 24000)") &&
  !eng.includes("1e5") && !eng.includes("100000"));
ok("Stepped LocalShow (trước physics) + Heartbeat NetHide (sau physics)",
  eng.includes("RunService.Stepped:Connect") && eng.includes("RunService.Heartbeat:Connect") &&
  bind.includes("S.Invis.BindNet(true)") && bind.includes("S.Invis.LocalShow") &&
  eng.includes("pcall(S.Invis.NetHide)"));
ok("LocalShow trả CFrame đã lưu — mình không bị kéo ra xa",
  show.includes("hrp.CFrame = IV._cf") && restore.includes("hrp.CFrame = IV._cf"));
ok("Stop/Restore trả CFrame trước khi tắt",
  setFn.includes("S.Invis.Restore()") && restore.includes("hrp.CFrame = IV._cf"));
ok("SpoofAll duyệt Players:GetPlayers, không đụng Character người khác, không remote",
  eng.includes("Players:GetPlayers()") && !eng.includes("p.Character") &&
  !eng.includes("RemoteEvent") && !eng.includes("RemoteFunction"));

console.log("== mình trong suốt · không bay · không remote ==");
ok("nhân vật thật Transparency = 1 (local) + ghost 0.45",
  hide.includes("d.Transparency = 1") && ghost.includes("d.Transparency = 0.45") &&
  ghost.includes('g.Name = "BC_InvisGhost"'));
ok("ghost parent CurrentCamera, KHÔNG fallback workspace",
  ghost.includes("g.Parent = cam") && !ghost.includes("cam or workspace") &&
  !ghost.includes("g.Parent = workspace"));
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
  ghost.indexOf('d:IsA("Humanoid")') < ghost.indexOf("g.Parent = cam"));
ok("Follow chỉ PivotTo ghost, bỏ qua nếu g == nhân vật thật",
  (follow.includes("g:PivotTo(cf)") || follow.includes("g:PivotTo(ch:GetPivot())")) &&
  !follow.includes("ch:PivotTo") && follow.includes("g == ch"));

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
