"use strict";
/** v4.69 — taodepzai hiện được: SyncTogBtn không crash nil S */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? " — " + detail : "")); }
}

console.log("== tên script taodepzai ==");
ok("tiêu đề menu Text=taodepzai", src.includes('Text="taodepzai"'));
ok("pill v4.69 · NOIR đúng 1 lần",
  (src.match(/Text="v4\.69 · NOIR"/g) || []).length === 1);
ok("không còn tiêu đề Banana Cat Hub trên titleBar",
  !src.includes('Text="🍌 Banana Cat Hub"'));

console.log("== nút ẩn/bật menu ảnh game + hiệu ứng ==");
ok("TogIcon ImageLabel rbxassetid",
  src.includes('Name = "TogIcon"') && src.includes("rbxassetid://") &&
  /TogIcon[\s\S]{0,500}rbxassetid:\/\//.test(src));
ok("TogRing + UIGradient hiệu ứng",
  src.includes('Name = "TogRing"') && src.includes("UIGradient") &&
  src.includes("BC_TogFx"));
ok("S.SyncTogBtn — ⚙ khi chạy thảm, ảnh khi menu thường",
  src.includes("local function SyncTogBtn") && src.includes("S.SyncTogBtn = SyncTogBtn") &&
  /function MV.SetRunMode[\s\S]{0,1200}S\.SyncTogBtn/.test(src) &&
  src.includes('togBtn.Text = "⚙"'));
ok("BUG không hiện: không gán S.xxx trước khi S = { (crash nil → không GUI)",
  (() => {
    const i = src.indexOf("\nS = {") >= 0 ? src.indexOf("\nS = {") : src.indexOf("\r\nS = {");
    if (i < 0) return false;
    return !/function S\.\w+\s*\(/.test(src.slice(0, i));
  })());
ok("ScreenGui DisplayOrder để nổi trên GUI game",
  /Name=\"ExMenu\"[\s\S]{0,280}DisplayOrder/.test(src));

console.log("== không mất tính năng ==");
ok("🚀/💨/🦘/🛡/✨/🔐/🎥/👣 còn",
  src.includes("function MV.SetFly") && src.includes("function MV.SetSprint") &&
  src.includes("function MV.SetHighJump") && src.includes("function MV.Safe.Set") &&
  src.includes("function S.Glow.Set") && src.includes("function S.AntiBanSet") &&
  src.includes("function S.Free.Set") && src.includes("function S.Spec.Set"));
ok("togBtn.Activated / kéo nút / ToggleMainFrame còn",
  src.includes("togBtn.Activated") && src.includes("function ToggleMainFrame") &&
  src.includes("S.togDragging"));
ok("_G.BananaCatHub lưu dữ liệu còn (không đổi key lưu)",
  src.includes("_G.BananaCatHub_SavedData") && src.includes("_G.BananaCatHub_MV"));

console.log("\n" + pass + " PASS · " + fail + " FAIL");
if (fail) process.exit(1);
