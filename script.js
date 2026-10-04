--[[
    taodepzai v5.0 NOIR — FULL CODE · OBSIDIAN NOIR + layout kiểu DELTA
    v5.0 NOIR: taodepzai - khoi phuc tham kinh co dinh, họ hop it người, doi ten. KHONG cát ham/khung/the.
    v4.66: 🎥 quay camera. v4.65: Thường xuyên. v4.64: mở giả thay 👻.
    v4.43: 🔐 Chống Cấm. v4.42 rút gọn. chip v4.41. v4.40 ⚙. v4.39–v4.36 bay/nhảy/tốc độ.
    Giữ: 🚀/🛡 bay · 🧱 noclip · 🦘 nhảy · 💨 chạy nước rút · 📍👣 · ✨ · 👥 · ⚙️.
    Kiếm tra: trình phân tích cú pháp Luau + hồi quy tĩnh (script.js la Luau, không phải JavaScript).
--]]
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local HttpService = game:GetService("HttpService")
local TeleportService = game:GetService("TeleportService") -- v4.6.3: Reset / Hop / vào server theo mã

người chơi cục bộ = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
camera cục bộ = workspace.CurrentCamera

local targetGui = playerGui
pcall(function()
    -- Người thi hành có gethui thì dùng nó; Chuẩn LocalScript phải ở PlayerGui.
    nếu kiểu dữ liệu (gethui) == "function" thì
        local hui = gethui()
        if hui then targetGui = hui end
    kết thúc
kết thúc)

LÀM
    cục bộ cũ = _G.BananaCatHub_MV
    nếu cũ thì
        if old.StopAll then pcall(old.StopAll) end
        old._wdToken = nil
        if type(old._wd) == "thread" then pcall(task.cancel, old._wd) end
        old._wd = nil
    kết thúc
kết thúc

nếu _G.BananaCatHub_Connections thì
    for _, c in ipairs(_G.BananaCatHub_Connections) do
        pcall(function() c:Disconnect() end)
    kết thúc
kết thúc
_G.BananaCatHub_Connections = {}
pcall(function()
    local oldUnhook = _G.BananaCatHub_AntiBanUnhook
    if type(oldUnhook) == "function" then pcall(oldUnhook) end
    _G.BananaCatHub_AntiBanUnhook = không
kết thúc)
pcall(function()
    cục bộ f = _G.BananaCatHub_Free
    if type(f) == "table" and f.Stop then pcall(f.Stop) end
kết thúc)

pcall(function()
    cục bộ cũ = _G.BananaCatHub_SpecCam
    nếu old ~= nil thì
        local cam = workspace.CurrentCamera
        nếu có camera thì
            nếu old ~= Enum.CameraType.Scriptable thì
                pcall(function() cam.CameraType = old end)
            khác
                pcall(function() cam.CameraType = Enum.CameraType.Custom end)
            kết thúc
            pcall(function()
                local char = player and player.Character
                local hum = char and char:FindFirstChildOfClass("Humanoid")
                cục bộ gốc = char và char:FindFirstChild("HumanoidRootPart")
                nếu có tiếng "hum" thì cam.CameraSubject = hum end
                nếu là root thì
                    cam.CFrame = CFrame.new(root.Position + Vector3.new(0, 3.2, 12), root.Position + Vector3.new(0,1.5,0))
                    cam.Focus = CFrame.new(root.Position)
                kết thúc
            kết thúc)
        kết thúc
        _G.BananaCatHub_SpecCam = nil
    kết thúc
    pcall(function() RunService:UnbindFromRenderStep("BC_Spec") end)
kết thúc)

for _, parent in ipairs({targetGui, playerGui, game:GetService("CoreGui")}) do
    pcall(function()
        cục bộ cũ = cha:TìmConĐầuTiên("BananaCatHub_Crosshair")
        nếu cũ thì hủy bỏ cũ()
    kết thúc)
    pcall(function() -- v5.1: up the location of the run before (làm nổi bật chồng lên)
        cục bộ cũ = cha:TìmConĐầuTiên("BC_ObjTrackESP")
        nếu cũ thì hủy bỏ cũ()
    kết thúc)
    pcall(function()
        cục bộ cũ = cha:TìmConĐầuTiên("BananaCatHub_AnaAimDot")
        nếu cũ thì hủy bỏ cũ()
    kết thúc)
kết thúc

-- v5.1.1: Highlight/nhãn/hộp giờ gắn thẳng vào VẬT (trong Workspace) nên nâng lên trong không gian làm việc
pcall(function()
    for _, d in ipairs(workspace:GetDescendants()) do
        local n = d.Name
        nếu n == "BC_OT_HL" hoặc n == "BC_OT_BB" hoặc n == "BC_OT_BOX" thì
            pcall(function() d:Destroy() end)
        kết thúc
    kết thúc
kết thúc)

hàm cục bộ trackConn(conn)
    local t = _G.BananaCatHub_Connections
    nếu #t > 300 thì
        còn sống cục bộ, n = {}, 0
        for i = 1, #t do
            cục bộ c = t[i]
            if c ~= nil and c.Connected ~= false then n = n + 1; alive[n] = c end
        kết thúc
        for i = 1, #t do t[i] = live[i] end -- ngâm lên đầu; thành phần nhiều phần tử thành con số không
    kết thúc
    table.insert(t, conn)
    trả về kết nối
kết thúc

pcall(function() RunService:UnbindFromRenderStep("Fly") end)
pcall(function() RunService:UnbindFromRenderStep("Carpet") end)
pcall(function() RunService:UnbindFromRenderStep("BC_Speed") end)
pcall(function() RunService:UnbindFromRenderStep("BC_FreeCam") end)
pcall(function() RunService:UnbindFromRenderStep("BC_Invis") end)
pcall(function() RunService:UnbindFromRenderStep("BC_InvisNet") end)
pcall(function() RunService:UnbindFromRenderStep("BC_SafeInvis") end)
pcall(function() RunService:UnbindFromRenderStep("BC_SafeInvisFly") end)
pcall(function() RunService:UnbindFromRenderStep("BC_AutoGlass") end)
pcall(function() RunService:UnbindFromRenderStep("BC_GlassFly") end)
pcall(function() RunService:UnbindFromRenderStep("BC_ObjTrack") end) -- v5.1: định vị vật theo tên
pcall(function() RunService:UnbindFromRenderStep("BC_ObjFly") end) -- v5.1: bay tới vật
pcall(function() RunService:UnbindFromRenderStep("BC_AnaAim") end) -- v5.2: view/chọn vật tại tâm màn hình

cục bộ C = {
    TRẮNG = Color3.fromRGB(255, 255, 255),
    DARK = Color3.fromRGB(238, 241, 248), -- chữ chính trên nền tối
    GRAY = Color3.fromRGB(120, 128, 146), -- nút tắt / chữ phụ
    XANH LÁ CÂY = Color3.fromRGB(64, 214, 152),
    XANH DƯƠNG = Color3.fromRGB(79, 150, 240),
    ĐỎ = Color3.fromRGB(230, 88, 88),
    VÀNG = Color3.fromRGB(250, 204, 102),
    TÍM = Color3.fromRGB(155, 128, 245),
    CAM = Color3.fromRGB(251, 146, 60),
    HỒNG = Color3.fromRGB(226, 82, 158),
    BG = Color3.fromRGB(11, 12, 17), -- nền cửa sổ chính (obsidian)

    INK = Color3.fromRGB(12, 10, 6), -- chữ ĐẬM dùng trên nền vàng/cam/sáng
    SURFACE = Color3.fromRGB(20, 22, 30), -- thẻ, ô nhập
    SURFACE2 = Color3.fromRGB(29, 32, 43), -- panel, line hover, thanh tiêu đề
    SURFACE3 = Color3.fromRGB(44, 49, 64), -- viền sáng, thanh cuộn, nút mặc định
    BORDER = Color3.fromRGB(60, 66, 84), -- viền mảnh 1px
    MUTED = Color3.fromRGB(154, 162, 180), -- chữ phụ
    ACCENT = Color3.fromRGB(240, 201, 122), -- Champagne (màu nhận diện hub)
    ACCENT2 = Color3.fromRGB(198, 141, 62), -- đồng (đuôi gradient / nhấn viền)

    ACCENT3 = Color3.fromRGB(255, 238, 203), -- đỉnh sáng nhất của vàng (highlight viền trên)
    HAIRLINE = Color3.fromRGB(72, 79, 99), -- đường phân tách khối sáng hơn BORDER một bậc
    GLOW = Color3.fromRGB(255, 214, 140), -- màu quần sáng ấm
    DEEP = Color3.fromRGB(7, 8, 11), -- đáy của mọi độ dốc dọc (hút chiều sâu)
}

hàm cục bộ New(cls, props, parent)
    cục bộ obj = Instance.new(cls)
    pcall(function()
        nếu cls == "Frame" hoặc cls == "ScrollingFrame" hoặc cls == "TextButton"
           hoặc cls == "TextLabel" hoặc cls == "TextBox" hoặc cls == "ImageButton" thì
            obj.BorderSizePixel = 0 -- Lớp, không viền 1px kiểu cũ
        kết thúc
        nếu cls == "ScrollingFrame" thì
            obj.ScrollBarThickness = 3 -- thanh cuộn mảnh kiểu hiện đại
            obj.ScrollBarImageColor3 = Color3.fromRGB(88, 96, 118) -- v4.9: sáng hơn để hiển thị trên nền obsidian
            obj.ScrollBarImageTransparency = 0.45
        kết thúc
    kết thúc)
    for k, v in pairs(props or {}) do
        obj[k] = v
    kết thúc
    nếu đối tượng cha thì đối tượng cha bằng đối tượng cha.
    pcall(function()
        nếu cls == "TextButton" hoặc cls == "TextLabel" hoặc cls == "TextBox" thì
            local w = Enum.FontWeight.Medium
            cục bộ f = obj.Font
            nếu f == Enum.Font.GothamBold hoặc f == Enum.Font.GothamBlack thì
                w = Enum.FontWeight.Bold
            elseif f == Enum.Font.GothamSemibold then
                w = Enum.FontWeight.SemiBold
            elseif f == Enum.Font.Gotham or f == Enum.Font.GothamLight or f == Enum.Font.GothamItalic then
                w = Enum.FontWeight.Regular
            kết thúc
            obj.FontFace = Font.new("rbxasset://fonts/families/GothamSSo.json", w)
        kết thúc
    kết thúc)
    pcall(function()
        nếu cls == "TextBox" thì
            trackConn(obj.Focused:Connect(function()
                local st = obj:FindFirstChildOfClass("UIStroke")
                if not st then -- ô chưa có ranh giới thì tạo lúc tập trung (không tạo quyền lúc UI)
                    st = New("UIStroke", {
                        Độ dày = 1,3, Độ trong suốt = 0,05,
                        ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
                    }, obj)
                kết thúc
                TweenService:Create(st, TweenInfo.new(0.16, Enum.EasingStyle.Quart, Enum.EasingDirection.Out),
                    {Color = C.ACCENT, Transparency = 0.02}):Play()
            kết thúc))
            trackConn(obj.FocusLost:Connect(function()
                local st = obj:FindFirstChildOfClass("UIStroke")
                nếu st thì
                    TweenService:Create(st, TweenInfo.new(0.28, Enum.EasingStyle.Quart, Enum.EasingDirection.Out),
                        {Color = C.BORDER, Transparency = 0.35}):Play()
                kết thúc
            kết thúc))
        kết thúc
    kết thúc)
    pcall(function()
        nếu (cls == "TextButton" hoặc cls == "TextLabel") và props
           và props.BackgroundColor3 ~= nil và props.TextColor3 ~= nil
           và (props.BackgroundTransparency hoặc 0) < 0.5 thì
            local bg = props.BackgroundColor3
            nếu typeof(bg) == "Color3" thì
                local lum = 0.2126 * bg.R + 0.7152 * bg.G + 0.0722 * bg.B
                nếu lum > 0.6 và props.TextColor3 == Color3.fromRGB(255, 255, 255) thì
                    obj.TextColor3 = C.INK
                kết thúc
            kết thúc
        kết thúc
    kết thúc)
    trả về obj
kết thúc

hàm cục bộ Corner(p, r)
    return New("UICorner", {CornerRadius = r or UDim.new(0, 10)}, p) -- v4.5: bo 10px ( 8px)
kết thúc

hàm cục bộ Stroke(p, c, t)
    trả về New("UIStroke", {
        Color = c hoặc C.BORDER, -- v4.9: viền đóng khối rõ hơn trên nền obsidian
        Độ dày = t hoặc 1,
        Độ trong suốt = 0,15, -- v4.9: viền viền "có mặt" hơn (trước 0,25)
        ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    }, P)
kết thúc

local flashBack = setmetatable({}, { __mode = "k" })
hàm cục bộ flash(btn, temp, secs, tempColor, back)
    nếu không phải btn thì trả về end
    if flashBack[btn] == nil then flashBack[btn] = { back or btn.Text, btn.TextColor3 } end
    pcall(function()
        btn.Text = tostring(temp)
        if tempColor then btn.TextColor3 = tempColor end
    kết thúc)
    task.delay(giây hoặc 1.6, hàm())
        if not (btn and btn.Parent) then return end
        cục bộ cũ = flashBack[btn]
        nếu không phải là cũ thì trả về cuối
        pcall(function() btn.Text = old[1]; btn.TextColor3 = old[2] end)
        flashBack[btn] = nil
    kết thúc)
kết thúc

hàm cục bộ Tween(o, p, d, e)
    TweenService:Create(o, TweenInfo.new(d or 1.5, e or Enum.EasingStyle.Quart, Enum.EasingDirection.Out), p):Play()
kết thúc

cục bộ D = {}

địa phương S

hàm D.Say(msg, color)
    nếu không phải D.hubStatus thì trả về end
    pcall(function()
        D.hubStatus.Text = tostring(msg)
        D.hubStatus.TextColor3 = màu hoặc C.RED
    kết thúc)
kết thúc

hàm D.BestText(bg)
    if typeof(bg) ~= "Color3" then return C.WHITE end
    local lum = 0.2126 * bg.R + 0.7152 * bg.G + 0.0722 * bg.B
    trả lại (lum > 0.6) và C.INK hoặc C.WHITE
kết thúc

hàm D.Edge(bg)
    if typeof(bg) ~= "Color3" then return C.BORDER end
    trả về Color3.new(
        math.min(1, bg.R + 0.11), math.min(1, bg.G + 0.12), math.min(1, bg.B + 0.16))
kết thúc

hàm D.Grad(obj)
    local g = obj:FindFirstChildOfClass("UIGradient")
    nếu không phải g thì
        g = New("UIGradient", {Color = ColorSequence.new(Color3.new(1,1,1), Color3.new(1,1,1))}, obj)
    kết thúc
    trả lại g
kết thúc

hàm D.Paint(obj, c1, c2, rotation)
    pcall(function()
        obj.BackgroundColor3 = Color3.new(1, 1, 1)
        cục bộ g = D.Grad(obj)
        g.Color = ColorSequence.new(c1, c2 or c1)
        g. Xoay = xoay hoặc 90
    kết thúc)
    trả về obj
kết thúc

hàm D.Unpaint(obj)
    pcall(function()
        nếu không phải là obj thì trả về end
        local g = obj:FindFirstChildOfClass("UIGradient")
        nếu g thì g.Color = ColorSequence.new(Color3.new(1, 1, 1), Color3.new(1, 1, 1)) end
    kết thúc)
    trả về obj
kết thúc

hàm D.Paint3(obj, colors, rotation)
    pcall(function()
        if type(colors) ~= "table" or #colors == 0 then return obj end
        obj.BackgroundColor3 = Color3.new(1, 1, 1)
        cục bộ g = D.Grad(obj)
        cục bộ n = #màu sắc
        nếu n == 1 thì
            g.Color = ColorSequence.new(colors[1], colors[1])
        khác
            cục bộ kp = {}
            for i, col in ipairs(colors) do
                kp[i] = ColorSequenceKeypoint.new((i - 1) / (n - 1), col)
            kết thúc
            g.Color = ColorSequence.new(kp)
        kết thúc
        g. Xoay = xoay hoặc 90
    kết thúc)
    trả về obj
kết thúc

hàm D.TopLight(obj, color, thickness, inset)
    dòng cục bộ = nil
    pcall(function()
        inset = inset hoặc 14
        dòng = Mới("Khung", {
            Tên = "BC_TopLight",
            Kích thước = UDim2.new(1, -inset * 2, 0, thickness hoặc 1),
            Vị trí = UDim2.new(0, inset, 0, 0),
            BackgroundColor3 = màu hoặc C.HAIRLINE,
            Độ trong suốt của nền = 0.3,
            BorderSizePixel = 0,
            ZIndex = (obj.ZIndex hoặc 1) + 1,
        }, obj)
        local g = New("UIGradient", {Rotation = 0}, line)
        g.Transparency = NumberSequence.new({
            NumberSequenceKeypoint.new(0.00, 1.00),
            NumberSequenceKeypoint.new(0.50, 0.05),
            NumberSequenceKeypoint.new(1.00, 1.00),
        })
    kết thúc)
    đường trả về
kết thúc

hàm D.Shade(obj, k1, k2, rotation)
    pcall(function()
        cục bộ g = D.Grad(obj)
        local a = k1 or Color3.new(1.0, 1.0, 1.0)
        local b = k2 or Color3.new(0.82, 0.84, 0.90)
        hàm cục bộ mix(t)
            return Color3.new(aR + (bR - aR) * t, aG + (bG - aG) * t, aB + (bB - aB) * t)
        kết thúc
        g.Color = ColorSequence.new({
            ColorSequenceKeypoint.new(0.00, a), -- mép trên: hắt sáng
            ColorSequenceKeypoint.new(0.10, mix(0.28)),
            ColorSequenceKeypoint.new(0.58, mix(0.62)),
            ColorSequenceKeypoint.new(1.00, b), -- đáy: hút tối
        })
        g. Xoay = xoay hoặc 90
    kết thúc)
    trả về obj
kết thúc

hàm D.PaintText(obj, c1, c2)
    pcall(function()
        obj.TextColor3 = Color3.new(1, 1, 1)
        cục bộ g = D.Grad(obj)
        g.Color = ColorSequence.new(c1, c2 or c1)
        g.Rotation = 0
    kết thúc)
    trả về obj
kết thúc

hàm D.Tactile(btn, baseTrans)
    baseTrans = baseTrans hoặc 0,08
    pcall(function()
        trackConn(btn.MouseEnter:Connect(function()
            Tween(btn, {BackgroundTransparency = math.max(0, baseTrans - 0.06)}, 0.16)
        kết thúc))
        trackConn(btn.MouseLeave:Connect(function()
            Tween(btn, {BackgroundTransparency = baseTrans}, 0.2)
        kết thúc))
        trackConn(btn.MouseButton1Down:Connect(function()
            Tween(btn, {BackgroundTransparency = math.min(1, baseTrans + 0.12)}, 0.08)
        kết thúc))
        trackConn(btn.MouseButton1Up:Connect(function()
            Tween(btn, {BackgroundTransparency = baseTrans}, 0.14)
        kết thúc))
    kết thúc)
    nút quay lại
kết thúc

hàm D.HoverText(btn, overColor, downColor)
    pcall(function()
        local base = btn.TextColor3
        trackConn(btn.MouseEnter:Connect(function() Tween(btn, {TextColor3 = overColor or C.WHITE}, 0.15) end))
        trackConn(btn.MouseLeave:Connect(function() Tween(btn, {TextColor3 = base}, 0.2) end))
        trackConn(btn.MouseButton1Down:Connect(function()
            Tween(btn, {TextColor3 = downColor or overColor or C.WHITE}, 0.08)
        kết thúc))
    kết thúc)
    nút quay lại
kết thúc

hàm D.Glow(obj, color, pad, trans)
    ánh sáng cục bộ = không
    pcall(function()
        nếu không phải obj hoặc không phải obj.Parent thì trả về end
        miếng đệm = miếng đệm hoặc 7
        hàm cục bộ posOf()
            local pp = obj.Position
            return UDim2.new(pp.X.Scale, pp.X.Offset - pad, pp.Y.Scale, pp.Y.Offset - pad)
        kết thúc
        phát sáng = Mới("Khung", {
            Tên = "BC_Glow",
            Kích thước = UDim2.new(1, pad * 2, 1, pad * 2),
            Vị trí = posOf(),
            BackgroundColor3 = màu hoặc C.ACCENT,
            BackgroundTransparency = trans hoặc 0.86,
            BorderSizePixel = 0,
            ZIndex = (obj.ZIndex hoặc 1) - 1,
        }, obj.Parent)
        Góc(phát sáng, UDim.new(1, 0))
        trackConn(obj:GetPropertyChangedSignal("Position"):Connect(function()
            pcall(function() glow.Position = posOf() end)
        kết thúc))
    kết thúc)
    ánh sáng trở lại
kết thúc

hàm D.SetBg(obj, color, trans)
    pcall(function()
        nếu không phải là obj thì trả về end
        obj.BackgroundColor3 = màu
        if trans ~= nil then obj.BackgroundTransparency = trans end
        nếu obj:IsA("TextButton") hoặc obj:IsA("TextLabel") thì
            obj.TextColor3 = D.BestText(màu)
        kết thúc
        local st = obj:FindFirstChildOfClass("UIStroke")
        if st then st.Color = D.Edge(color) end
    kết thúc)
    trả về obj
kết thúc

hàm D.Breathe(obj, props, dur)
    pcall(function()
        local ti = TweenInfo.new(dur or 1.9, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
        TweenService:Create(obj, ti, props):Play()
    kết thúc)
kết thúc

hàm cục bộ ReleaseHubFocus()
    pcall(function()
        local tb = UserInputService:GetFocusedTextBox()
        if tb then tb:ReleaseFocus() end
    kết thúc)
    pcall(function() playerGui:ReleaseFocus() end)
kết thúc

nếu targetGui:FindFirstChild("ExMenu") thì
    targetGui.ExMenu:Destroy()
kết thúc

local gui = New("ScreenGui", {
    Tên="ExMenu",
    IgnoreGuiInset=true,
    ResetOnSpawn=false,
    ZIndexBehavior=Enum.ZIndexBehavior.Sibling,
}, targetGui)

local togBtn = New("TextButton", {
    Kích thước = UDim2.new(0,48,0,48),
    Vị trí = UDim2.new(1, -60, 1, -60),
    Văn bản="",
    BackgroundColor3=Color3.fromRGB(0,0,0),
    BackgroundTransparency=1, -- trong suốt hoàn toàn, không che màn hình
    TextColor3=Color3.fromRGB(255,255,255),
    Font=Enum.Font.GothamBold,
    Kích thước văn bản=32,
    BorderSizePixel=0,
    Chỉ số Z = 1000,
}, gui)
Góc(togBtn, UDim.new(1,0))
-- viền cầu vồng đậm, chỉ viền, không che
local rainbowStroke = Instance.new("UIStroke")
rainbowStroke.Thickness = 2
rainbowStroke.Color = Color3.fromRGB(255,255,255)
rainbowStroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
rainbowStroke.Parent = togBtn
pcall(function()
    local grad = Instance.new("UIGradient")
    grad.Color = ColorSequence.new{
        ColorSequenceKeypoint.new(0.00, Color3.fromRGB(255,0,0)),
        ColorSequenceKeypoint.new(0.20, Color3.fromRGB(255,255,0)),
        ColorSequenceKeypoint.new(0.40, Color3.fromRGB(0,255,0)),
        ColorSequenceKeypoint.new(0.60, Color3.fromRGB(0,255,255)),
        ColorSequenceKeypoint.new(0.80, Color3.fromRGB(0,0,255)),
        ColorSequenceKeypoint.new(1.00, Color3.fromRGB(255,0,255)),
    }
    grad.Rotation = 0
    grad.Parent = rainbowStroke
    task.spawn(function()
        trong khi đúng vậy
            if not togBtn.Parent then break end
            với r=0,360,4 thực hiện
                if not togBtn.Parent then break end
                pcall(function() grad.Rotation = r end)
                task.wait(0.03)
            kết thúc
        kết thúc
    kết thúc)
kết thúc)
D.Tactile(togBtn, 1)
-- bỏ ánh sáng toàn màn hình để không che góc phải khi kéo nút vào giữa

local main = New("Frame", {
    Kích thước = UDim2.new(0, 540, 0, 340),
    Vị trí = UDim2.new(0.5, -270, 0.5, -170),
    BackgroundColor3=C.BG,
    BackgroundTransparency=0, -- v4.9: đục tuyệt đối để gradient 4 màu lên đúng màu
    BorderSizePixel=0,
    Hiển thị = false,
    ClipsDescendants=false,
    Chỉ số Z = 2,
}, gui)
Góc(chính, UDim.new(0,16))
Stroke(main, C.HAIRLINE, 1.2)
D.Paint3(main, {C.SURFACE2, C.BG, C.BG, C.DEEP}, 90)

Lượt truy cập cục bộ = {}

hàm Hit.inObject(o, x, y)
    nếu không phải là o thì trả về false kết thúc
    cục bộ ok, res = pcall(function()
        if not o.Visible then return false end
        local p, s = o.AbsolutePosition, o.AbsoluteSize
        Trả về x >= pX và x <= pX + sX và y >= pY và y <= pY + sY
    kết thúc)
    trả về ok và res == true
kết thúc

hàm Hit.onHub(x, y)
    cục bộ ổn, objs = pcall(function()
        return playerGui:GetGuiObjectsAtPosition(x, y)
    kết thúc)
    nếu ok và type(objs) == "table" thì
        for _, o in ipairs(objs) do
            if o == gui or o:IsDescendantOf(gui) then return true end
        kết thúc
    kết thúc
    local aimOverlayHit = false
    pcall(function()
        lớp phủ cục bộ = S.AnaUi và S.AnaUi.aimGui
        nếu không có lớp phủ thì trả về end
        các container cục bộ = {playerGui}
        if targetGui and targetGui ~= playerGui then containers[#containers + 1] = targetGui end
        for _, container in ipairs(containers) do
            local okAim, aimObjs = pcall(function()
                trả về container:GetGuiObjectsAtPosition(x, y)
            kết thúc)
            nếu okAim và type(aimObjs) == "table" thì
                for _, o in ipairs(aimObjs) do
                    nếu o:IsDescendantOf(overlay) thì
                        dấu chấm cục bộ = S.AnaUi và S.AnaUi.aimDot
                        nếu không phải dot hoặc (o ~= dot và không phải o:IsDescendantOf(dot)) thì
                            aimOverlayHit = true
                            trở lại
                        kết thúc
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc)
    nếu aimOverlayHit thì trả về true
    if Hit.inObject(main, x, y) then return true end
    if Hit.inObject(togBtn, x, y) then return true end
    trả về false
kết thúc

local bgPattern = New("ImageLabel", {
    Tên = "CheckeredBG",
    Kích thước = UDim2.new(1, 0, 1, 0),
    Vị trí = UDim2.new(0, 0, 0, 0),
    Độ trong suốt của nền = 1,
    Hình ảnh = "rbxassetid9822602710",
    Loại tỷ lệ = Enum.ScaleType.Tile,
    TileSize = UDim2.new(0, 13, 0, 13), -- v4.9: hạt nhỏ hơn -> chất liệu thô như vải, không còn "caro"
    ImageTransparency = 0.955, -- v4.9: nhẹ hơn nữa, chỉ còn là loại kim loại
    ImageColor3 = C.ACCENT2, -- v4.9: ánh đồng (trước là vàng chuối gạt)
    Chỉ số Z = 2,
}, chủ yếu)
Góc(bgPattern, UDim.new(0, 14))

local titleBar = New("Frame", {
    Kích thước = UDim2.new(1, 0, 0, 30),
    BackgroundColor3=C.SURFACE2,
    BackgroundTransparency=0, -- v4.9: đục để gradient 3 tăng đúng
    BorderSizePixel=0,
    Chỉ số Z = 3,
}, chủ yếu)
Góc(thanh tiêu đề, UDim.new(0,16))
D.Paint3(titleBar, {C.SURFACE3, C.SURFACE2, C.SURFACE}, 90)
D.TopLight(titleBar, C.ACCENT3, 1, 22) -- v4.9: chỉ vàng mảnh chạy dọc viền trên cửa sổ

D.Paint3(New("Frame", {
    Tên="TitleAccent", Kích thước=UDim2.new(1,-2,0,2), Vị trí=UDim2.new(0,1,1,-1),
    BackgroundColor3=C.ACCENT, BorderSizePixel=0, ZIndex=5,
}, titleBar), {C.ACCENT2, C.ACCENT3, C.ACCENT2}, 0)

D.PaintText(New("TextLabel", {
    Kích thước = UDim2.new(1, -90, 1, 0),
    Vị trí = UDim2.new(0, 12, 0, 0),
    Văn bản="taodepzai v5.0 NOIR",
    Độ trong suốt nền = 1,
    TextColor3=C.DARK,
    Font=Enum.Font.GothamBold,
    Kích thước văn bản=13,
    TextXAlignment = Enum.TextXAlignment.Left,
    Chỉ số Z = 4,
}, titleBar), C.ACCENT, C.ACCENT3) -- v4.9: chữ gradient vàng rượu-panh -> trắng ngà

D.verPill = New("Frame", {
    Tên="VersionPill", Kích thước=UDim2.new(0,62,0,16), Vị trí=UDim2.new(0,158,0,7),
    BackgroundColor3=C.DEEP, BackgroundTransparency=0.15, BorderSizePixel=0, ZIndex=5,
}, thanh tiêu đề)
Góc (D.verPill, UDim.new (1,0))
Stroke(D.verPill, C.ACCENT2, 1) -- v4.9: huy hiệu đen + viền đồng, chữ sâm panh
Mới("TextLabel", {
    Size=UDim2.new(1,0,1,0), Text="v5.0 · NOIR", BackgroundTransparency=1,
    TextColor3=C.ACCENT3, Font=Enum.Font.GothamBold, TextSize=8, ZIndex=6,
}, D.verPill)

hàm cục bộ TitleBtn(txt, xOff)
    trả về New("TextButton", {
        Kích thước=UDim2.new(0,30,0,30), Vị trí=UDim2.new(1,-xOff,0,0), Văn bản=txt,
        BackgroundTransparency=1, TextColor3=C.MUTED, Font=Enum.Font.GothamBold,
        Kích thước chữ=15, Kích thước viền pixel=0, Chỉ số Z=4,
    }, thanh tiêu đề)
kết thúc
local dragLockBtn = TitleBtn("🔒", 64)
local closeBtn = TitleBtn("✕", 32)
D.HoverText(closeBtn, C.RED, C.RED)
D.HoverText(dragLockBtn, C.ACCENT, C.ACCENT)

minW, minH cục bộ = 440, 260

hàm cục bộ BcFit()
    local fn = _G.BananaCatHub_SyncEmbeds
    if type(fn) ~= "function" then return end
    cục bộ ổn, bây giờ = pcall(os.clock)
    Nếu ổn và _G.BcFitLast và bây giờ - _G.BcFitLast < 0.05 thì trả về end
    _G.BcFitLast = ok và bây giờ hoặc 0
    task.defer(fn)
kết thúc

hàm cục bộ SetupResizeHandle(btn, cornerType)
    thay đổi kích thước cục bộ, sizeStart, posStart, inputStart
    trackConn(btn.InputBegan:Connect(function(i)
        nếu i.UserInputType == Enum.UserInputType.MouseButton1 hoặc i.UserInputType == Enum.UserInputType.Touch thì
            pcall(function() if D.openTween then D.openTween:Cancel() D.openTween = nil end end) -- v4.5
            thay đổi kích thước = đúng
            sizeStart=main.Size
            posStart=main.Position
            inputStart=i.Position
        kết thúc
    kết thúc))
    trackConn(UserInputService.InputChanged:Connect(function(i)
        nếu resizing và sizeStart và posStart và inputStart và (i.UserInputType==Enum.UserInputType.MouseMovement hoặc i.UserInputType==Enum.UserInputType.Touch) thì
            local d = i.Position - inputStart
            local w, h = sizeStart.X.Offset, sizeStart.Y.Offset
            local posX, posY = posStart.X.Offset, posStart.Y.Offset
            cục bộ newW, newH = w, h
            cục bộ newX, newY = posX, posY
            nếu cornerType == "BR" thì
                newW = math.max(minW, w + dX)
                newH = math.max(minH, h + dY)
            elseif cornerType == "BL" then
                newW = math.max(minW, w - dX)
                newH = math.max(minH, h + dY)
                newX = posX + (w - newW)
            elseif cornerType == "TR" then
                newW = math.max(minW, w + dX)
                newH = math.max(minH, h - dY)
                newY = posY + (h - newH)
            elseif cornerType == "TL" then
                newW = math.max(minW, w - dX)
                newH = math.max(minH, h - dY)
                newX = posX + (w - newW)
                newY = posY + (h - newH)
            kết thúc
            main.Size = UDim2.new(sizeStart.X.Scale, newW, sizeStart.Y.Scale, newH)
            main.Position = UDim2.new(posStart.X.Scale, newX, posStart.Y.Scale, newY)
        kết thúc
    kết thúc))
    trackConn(UserInputService.InputEnded:Connect(function(i)
        nếu i.UserInputType == Enum.UserInputType.MouseButton1 hoặc i.UserInputType == Enum.UserInputType.Touch thì
            thay đổi kích thước = false
        kết thúc
    kết thúc))
kết thúc

hàm cục bộ CreateHandle(icon, pos)
    local btn = New("TextButton", {
        Kích thước = UDim2.new(0,20,0,20),
        Vị trí = vị trí,
        Văn bản=biểu tượng,
        BackgroundColor3=C.SURFACE3,
        Độ trong suốt của nền = 0.35,
        TextColor3=C.MUTED,
        Font=Enum.Font.GothamBold,
        Kích thước văn bản=11,
        BorderSizePixel=0,
        Chỉ số Z = 100,
    }, chủ yếu)
    Góc(btn, UDim.new(0,5))
    Stroke(btn, C.HAIRLINE, 1)
    D.Shade(btn, Color3.fromRGB(255,255,255), Color3.fromRGB(190,196,210), 90)
    D.Tactile(btn, 0.35)
    nút quay lại
kết thúc

SetupResizeHandle(CreateHandle("↖", UDim2.new(0, 2, 0, 2)), "TL")
SetupResizeHandle(CreateHandle("↗", UDim2.new(1, -22, 0, 2)), "TR")
SetupResizeHandle(CreateHandle("↙", UDim2.new(0, 2, 1, -22)), "BL")
SetupResizeHandle(CreateHandle("↘", UDim2.new(1, -22, 1, -22)), "BR")

tab cục bộ = {}
local tabContent = {}

tab cục bộBar = Mới ("ScrollingFrame", {
    Kích thước = UDim2.new(0, 56, 1, -30),
    Vị trí = UDim2.new(0,0,0,30),
    BackgroundColor3=C.SURFACE,
    Độ trong suốt nền = 0,
    BorderSizePixel=0,
    Chỉ số Z = 3,
    Độ dày thanh cuộn = 3,
    CanvasSize=UDim2.new(0,0,0,0),
}, chủ yếu)
D.Paint3(tabBar, {C.SURFACE, C.BG, C.DEEP}, 90)

Mới("Khung", {
    Tên="TabRailDivider", Kích thước=UDim2.new(0,1,1,-30), Vị trí=UDim2.new(0,56,0,30),
    BackgroundColor3=C.HAIRLINE, BackgroundTransparency=0.45, BorderSizePixel=0, ZIndex=4,
}, chủ yếu)

Mới("UIListLayout", {
    FillDirection=Enum.FillDirection.Vertical,
    SortOrder=Enum.SortOrder.LayoutOrder,
    Padding=UDim.new(0,4),
}, tabBar)

New("UIPadding", {PaddingTop=UDim.new(0,6), PaddingLeft=UDim.new(0,4)}, tabBar)

local contentArea = New("Frame", {
    Size=UDim2.new(1,-56,1,-54), -- v4.5: nhường 56px cho thanh icon + 24px cho header trang
    Vị trí = UDim2.new(0, 56, 0, 54),
    Độ trong suốt nền = 1,
    BorderSizePixel=0,
    Chỉ số Z = 3,
    ClipsDescendants=true,
}, chủ yếu)

D.pageHeader = New("Frame", {
    Tên="Tiêu đề trang", Kích thước=UDim2.new(1,-56,0,24), Vị trí=UDim2.new(0,56,0,30),
    BackgroundColor3=C.SURFACE, BackgroundTransparency=0.2, BorderSizePixel=0, ZIndex=3,
}, chủ yếu)
D.Paint3(D.pageHeader, {C.SURFACE2, C.SURFACE}, 90) -- v4.9: phạm vi chrome mảnh dưới thanh tiêu đề
D.pageTitle = New("TextLabel", {
    Tên="Tiêu đề trang", Kích thước=UDim2.new(1,-196,1,0), Vị trí=UDim2.new(0,10,0,0),
    Text="💾 Code Đã Lưu", BackgroundTransparency=1, TextColor3=C.ACCENT, -- v4.6.2: trang đầu tiên
    Font=Enum.Font.GothamBold, TextSize=11,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=5,
}, D.pageHeader)
D.pageChips = New("Frame", {
    Tên="PageChips", Kích thước=UDim2.new(0,150,1,-6), Vị trí=UDim2.new(1,-156,0,3),
    BackgroundTransparency=1, BorderSizePixel=0, ZIndex=5,
}, D.pageHeader)
Mới("UIListLayout", {
    FillDirection=Enum.FillDirection.Horizontal, Padding=UDim.new(0,8),
    SortOrder=Enum.SortOrder.LayoutOrder, VerticalAlignment=Enum.VerticalAlignment.Center,
}, D.pageChips)

D.hdrSwitches = {}
đối với i, sw trong ipairs({
    {key="embed", icon="🧩", onColor=C.GREEN, tip="Nhúng GUI của tập lệnh vào tab tính năng"},
    {key="guess", icon="🕵", onColor=C.ORANGE, tip="Đoán GUI tạo đị (dễ ăn nhầm GUI game)"},
    {key="park", icon="🪟", onColor=C.GREEN, tip="Đưa GUI của tab 💻 Mã vào menu"},
}) LÀM
    local btn = New("TextButton", {
        Size=UDim2.new(0,42,0,16), Text="", AutoButtonColor=false,
        BackgroundTransparency=1, BorderSizePixel=0, LayoutOrder=i, ZIndex=6,
    }, D.pageChips)
    btn:SetAttribute("BCSwKey", sw.key)
    local ic = New("TextLabel", {
        Kích thước=UDim2.new(0,14,1,0), Vị trí=UDim2.new(0,0,0,0), Văn bản=sw.icon,
        BackgroundTransparency=1, TextColor3=C.MUTED, Font=Enum.Font.GothamBold,
        Kích thước văn bản=10, Căn chỉnh văn bản theo chiều ngang=Enum.TextXAlignment.Left, Chỉ số Z=7,
    }, btn)
    theo dõi cục bộ = Mới("Khung", {
        Tên="BC_SwTrack", Kích thước=UDim2.new(0,26,0,12), Vị trí=UDim2.new(1,-26,0,2),
        BackgroundColor3=C.SURFACE3, BorderSizePixel=0, ZIndex=7,
    }, btn)
    Góc(track, UDim.new(1,0))
    local trackStroke = Stroke(track, C.HAIRLINE, 1)
    nút cục bộ = Mới("Khung", {
        Tên="BC_SwKnob", Kích thước=UDim2.new(0,8,0,8), Vị trí=UDim2.new(0,2,0,2),
        BackgroundColor3=C.GRAY, BorderSizePixel=0, ZIndex=8,
    }, theo dõi)
    Góc(núm vặn, UDim.new(1,0))
    D.hdrSwitches[sw.key] = {btn=btn, icon=ic, track=track, knob=knob, onColor=sw.onColor, stroke=trackStroke}

    btn.Activated:Connect(function()
        local fn = (sw.key == "embed" and S.DoToggleEmbed)
                hoặc (sw.key == "guess" và S.DoToggleGuess)
                hoặc (sw.key == "park" và S.DoTogglePark)
        nếu kiểu(fn) == "function" thì
            pcall(fn) -- function gốc đã tự động thay đổi nút nhãn, ghi đĩa và trạng thái báo cáo
        kết thúc
        D.SyncPageChips()
        pcall(function() if S.SyncEmbedToggles then S.SyncEmbedToggles() end end)
    kết thúc)
    btn.MouseEnter:Connect(function()
        D.pageTitle.Text = sw.icon .. " " .. sw.tip
        D.pageTitle.TextColor3 = C.DARK
        D.pageTitle.TextTransparency = 0,25
    kết thúc)
    btn.MouseLeave:Connect(function()
        D.pageTitle.TextColor3 = C.ACCENT
        local back = D.hoverName or D.activeName
        nếu quay lại thì D.pageTitle.Text = back end
        D.pageTitle.TextTransparency = D.hoverName và 0.4 hoặc 0
    kết thúc)
kết thúc
Mới("Khung", { -- bỏ sót phần dưới tiêu đề
    Name="PageHeaderRule", Size=UDim2.new(1,-56,0,1), Position=UDim2.new(0,56,0,53),
    BackgroundColor3=C.HAIRLINE, BackgroundTransparency=0.5, BorderSizePixel=0, ZIndex=4,
}, chủ yếu)

local activeTab = nil

hàm cục bộ SwitchTab(index)
    ReleaseHubFocus() -- v4.4b:thay đổi tab mà để TextBox còn tập trung vào trò chơi chặn đầu vào (không đi/không bắn)
    for _, t in ipairs(tabContent) do t.Visible = false end
    for _, b in ipairs(tabs) do
        b.BackgroundColor3 = C.SURFACE2
        b. Độ trong suốt của nền = 1
        b.TextColor3 = C.MUTED
        D.Unpaint(b) -- v4.9: wash gradient of time before open to pill ghost/hover up right color
        local bar = b:FindFirstChild("BC_Bar")
        nếu thanh thì thanh đó hiển thị = false
    kết thúc
    nếu tabContent[index] và tabs[index] thì
        tabContent[index].Visible = true
        cục bộ b = tab[chỉ mục]
        b.BackgroundColor3 = C.SURFACE2
        b.BackgroundTransparency = 0.1
        b.TextColor3 = C.ACCENT
        D.Paint3(b, {C.SURFACE3, C.SURFACE2, C.SURFACE}, 90)
        local bar = b:FindFirstChild("BC_Bar")
        nếu không phải quán bar thì
            thanh = Mới("Khung", {
                Tên = "BC_Bar", Kích thước = UDim2.new(0, 3, 1, -12), Vị trí = UDim2.new(0, 2, 0, 6),
                BackgroundColor3 = C.ACCENT, BorderSizePixel = 0, ZIndex = 6,
            }, b)
            Góc(thanh, UDim.new(1, 0))
            D.Paint3(bar, {C.ACCENT3, C.ACCENT, C.ACCENT2}, 90) -- v4.9: vạch như thanh kim loại đánh bóng
        kết thúc
        thanh hiển thị = true
        activeTab = tabContent[index]
        pcall(function()
            nếu D.pageTitle thì
                local ic = b:GetAttribute("BCTabIcon")
                local nm = b:GetAttribute("BCTabName")
                D.activeName = (ic and (ic .. " ") or "") .. tostring(nm or ("Trang " .. index))
                nếu không phải D.hoverName thì
                    D.pageTitle.Text = D.activeName
                    D.pageTitle.TextTransparency = 0
                kết thúc
            kết thúc
        kết thúc)
    kết thúc
    BcFit() -- v4.4c: tab vừa hiện -> đo lại để GUI vừa đúng ô của tab
kết thúc

hàm cục bộ OpenFirstPage()
    chỉ số cục bộ, tốt nhất = 1, nil
    for i, b in ipairs(tabs) do
        cục bộ o = b và b.LayoutOrder
        if type(o) == "number" and (best == nil or o < best) then best = o; idx = i end
    kết thúc
    SwitchTab(idx)
kết thúc

hàm cục bộ MakeTabFrame()
    trả về New("ScrollingFrame", {
        Kích thước = UDim2.new(1, 0, 1, 0),
        Độ trong suốt nền = 1,
        BorderSizePixel=0,
        ScrollBarThickness=4, -- v4.9: mảnh hơn
        ScrollBarImageColor3=Color3.fromRGB(88, 96, 118), -- v4.9: known obsidian trên nền
        ClipsDescendants=true,
        CanvasSize=UDim2.new(0,0,0,0),
        Hiển thị = false,
        Active=true,
        Có thể chọn = false,
        ScrollingDirection=Enum.ScrollingDirection.Y,
        Chỉ số Z = 4,
    }, contentArea)
kết thúc

hàm cục bộ MakeTabButton(name, icon, order, onClick)
    local btn = New("TextButton", {
        Kích thước=UDim2.new(1,-8,0,38), -- v4.5 Delta: ô icon 48x38
        Text=icon, -- CHỈ icon; tên trang hiện ở tiêu đề
        BackgroundColor3=C.SURFACE2, -- pill ghost (SwitchTab tô màu khi trang mở)
        Độ trong suốt nền = 1,
        TextColor3=C.MUTED,
        Font=Enum.Font.GothamBold,
        Kích thước văn bản=16,
        BorderSizePixel=0,
        LayoutOrder=order,
        TextXAlignment=Enum.TextXAlignment.Center,
        Chỉ số Z = 4,
    }, tabBar)
    Corner(btn, UDim.new(0,10)) -- v4.5 Delta: bo 10px cho ô icon
    pcall(function()
        btn:SetAttribution("BCTabName", name) -- tiêu đề + di chuột đọc tên trang từ đây
        btn:SetAttribute("BCTabIcon", icon)
    kết thúc)
    pcall(function()
        trackConn(btn.MouseEnter:Connect(function()
            if btn.BackgroundTransparency > 0.5 then Tween(btn, {BackgroundTransparency = 0.62}, 0.16) end
            pcall(function() -- v4.5 Delta: rê vào icon nào thì header hiện NAME trang đó (mờ nhẹ)
                nếu D.pageTitle thì
                    D.hoverName = btn:GetAttribute("BCTabName")
                    local ic = btn:GetAttribute("BCTabIcon")
                    D.pageTitle.Text = (ic and (ic .. " ") or "") .. tostring(D.hoverName or "")
                    D.pageTitle.TextTransparency = 0,4
                kết thúc
            kết thúc)
        kết thúc))
        trackConn(btn.MouseLeave:Connect(function()
            if btn.TextColor3 ~= C.ACCENT then Tween(btn, {BackgroundTransparency = 1}, 0.2) end
            pcall(function() -- left mouse: header trả về tên trang ĐANG MỞ
                D.hoverName = nil
                nếu D.pageTitle và D.activeName thì
                    D.pageTitle.Text = D.activeName
                    D.pageTitle.TextTransparency = 0
                kết thúc
            kết thúc)
        kết thúc))
    kết thúc)
    btn.Activated:Connect(function()
        for i, b in ipairs(tabs) do
            nếu b == btn thì
                SwitchTab(i)
                nếu onClick thì pcall(onClick) end
                phá vỡ
            kết thúc
        kết thúc
    kết thúc)
    nút quay lại
kết thúc

hàm cục bộ AddTab(name, icon, order, customContent)
    khoa học viễn tưởng địa phương
    nếu customContent thì
        sf = customContent
        sf.Parent = contentArea
        sf.Visible = false
    khác
        sf = MakeTabFrame()
    kết thúc
    local btn = MakeTabButton(name, icon, order)
    table.insert(tabs, btn)
    table.insert(tabContent, sf)
    tabBar.CanvasSize = UDim2.new(0, 0, 0, #tabs * 44 + 10)
    trả lại sf, btn
kết thúc
local codeTab = AddTab("Code", "💻", 2)
local saveCodeTab = AddTab("Code Đã Lưu", "💾", 1)

OpenFirstPage() -- v4.6.2: mở trang START TIÊN theo thứ tự Rail (💾 Code Đã Lưu)

S = {
    dragMenu = false,
    kéo lê = sai,
    dragStart = nil,
    startPos = nil,
    togDragging = false,
    togDragStart = nil,
    togStartPos = nil,
    togMoved = false,
    embedEnabled = true, -- tab 5 có nút 🧩 để tắt toàn bộ công việc nhúng
    embedGuessNew = false, -- 🕵 nhận cả ScreenGui "lạ" mới xuất hiện (mạnh hơn nhưng dễ ăn GUI game)
    parkCodeGuis = true,
    embeds = {}, -- registry: {host, gui, recs={{child,origParent,origPos,origSize}}, conns={}}
}

S.WRAP_MARK_OLD = "-- ===== KÍCH THƯỚC BAO BÌ ĐƯỢC TẠO TỰ ĐỘNG"
S.WRAP_MARK_NEW = "-- ===== BỘ PHẬN BỌC VỪA TỰ ĐỘNG TẠO"
hàm S.SanitizeCode(c)
    nếu kiểu dữ liệu của c khác với "string" thì trả về c.
    if not c:find(S.WRAP_MARK_OLD, 1, true) then return c end
    đầu ra cục bộ = (c:gsub(
        "pcall%s*%(%s*function%s*%(%)%s*_ForceStretch%s*%(%s*g%s*%)%s*end%s*%)",
        ""))
    trở lại
kết thúc

hàm S.Shimmed(n)
    cục bộ v = S.shimmedFns và S.shimmedFns[n]
    nếu v == nil thì trả về false
    trả về rawget(_G, n) == v
kết thúc

hàm D.SyncPageChips()
    pcall(function()
        nếu không phải D.hdrSwitches thì trả về end
        trạng thái cục bộ = {
            nhúng = (S.embedEnabled == true),
            đoán = (S.embedGuessNew == true),
            công viên = (S.parkCodeGuis ~= false),
        }
        for k, s in pairs(D.hdrSwitches) do
            cục bộ bật = (trạng thái[k] == true)
            s.track.BackgroundColor3 = on and (s.onColor or C.GREEN) or C.SURFACE3
            s.knob.BackgroundColor3 = on and C.WHITE or C.GRAY
            s.knob.Position = on và UDim2.new(1,-10,0,2) hoặc UDim2.new(0,2,0,2)
            s.icon.TextColor3 = bật và C.DARK hoặc C.GRAY
            if s.stroke then s.stroke.Color = on and D.Edge(s.onColor or C.GREEN) or C.HAIRLINE end
        kết thúc
    kết thúc)
kết thúc
tập lệnh cục bộ = {}
local waypoints = {} -- khai báo sớm để lưu trữ kho lưu trữ bên dưới được sử dụng
local featureTabs = {} -- nt: khai báo sớm để Store.serialize() và trạng thái sử dụng được
local featureTabIndex = 7 -- 1=Code Đã Lưu 2=Code 3=Script Hub 4= Hỗ Trợ 5=Thiết Lập 6=Tạo Tính Năng; tab tính năng của người dùng từ 7 trở đi
tổng số lần chạy cục bộ, đã hủy = 0, sai
curThread cục bộ, curIndicator = nil, nil
local runActive = false -- chạy trạng thái cờ (không dựa vào curThread nữa)

Cửa hàng cục bộ = {}

Store.SAVE_FILE = "banana_cat_saved.json"
Store.SAVE_VERSION = 3
Store.mode = "none" -- "file" | "memory" | "empty" | "none"
Store.lastError = nil
Store.lastSavedAt = nil
Store.saveCount = 0
Store.loadedScripts = 0
Store.loadedWp = 0
Store.loadedFeatures = {} -- đọc dữ liệu thô từ đĩa; TAB5 sẽ xây dựng tab thật sự
Store.restoreFeatures = nil -- TAB5 gán chức năng xây dựng lại tab vào đây
Store.restoreWaypoints = nil -- TAB3 gán RebuildWaypoints vào đây (TAB2 cần mà chưa tồn tại)
Store.statusLbl = nil -- tab "Code Đã Lưu" gán nhãn trạng thái vào đây
Store.reloadBtn = nil
Store._scheduled = false
Store.refreshStatus = nil -- tab "Code Đã lưu" gán chức năng cập nhật nhãn vào đây

hàm Store.canWrite()
    if type(writefile) ~= "function" or type(readfile) ~= "function" then return false end
    nếu S.Shimmed("writefile") hoặc S.Shimmed("readfile") thì trả về false.
    trả về giá trị đúng
kết thúc

hàm Store.isFinite(n)
    return type(n) == "number" and n == n and n ~= math.huge and n ~= -math.huge
kết thúc

hàm Store.write(data)
    local okEnc, json = pcall(function() return HttpService:JSONEncode(data) end)
    nếu không phải okEnc thì
        Store.mode = "memory"
        Store.lastError = "Không thể mã hóa JSON: " .. tostring(json)
        _G.BananaCatHub_SavedData = dữ liệu
        trả về false
    kết thúc

    nếu không thể ghi vào Store.canWrite() thì
        Store.mode = "memory"
        Store.lastError = "Executor no writefile — chỉ được lưu trong phiên bản trò chơi này"
        _G.BananaCatHub_SavedData = dữ liệu
        trả về false
    kết thúc

    local okW, errW = pcall(writefile, Store.SAVE_FILE, json)
    nếu không okW thì
        Store.mode = "memory"
        Store.lastError = "Tập tin Ghi bị lỗi: " .. tostring(errW)
        _G.BananaCatHub_SavedData = dữ liệu
        trả về false
    kết thúc

    Store.mode = "file"
    Store.lastError = nil
    Store.saveCount = Store.saveCount + 1
    pcall(function() Store.lastSavedAt = os.date("%H:%M:%S") end)
    _G.BananaCatHub_SavedData = dữ liệu
    trả về giá trị đúng
kết thúc

hàm Store.read()
    nếu Store.canWrite() thì
        local hasFile = true
        nếu kiểu dữ liệu (isfile) == "function" thì
            local okI, r = pcall(isfile, Store.SAVE_FILE)
            hasFile = (okI và r == true)
        kết thúc
        nếu có tệp tin thì
            local okR, txt = pcall(readfile, Store.SAVE_FILE)
            nếu okR và type(txt) == "string" và #txt > 0 thì
                local okD, data = pcall(function() return HttpService:JSONDecode(txt) end)
                nếu okD và kiểu dữ liệu == "table" thì
                    Store.mode = "file"
                    Store.lastError = nil
                    dữ liệu trả về
                kết thúc
                Store.lastError = "Việc lưu tệp bị hỏng (JSON không đọc được) — đã bị bỏ qua"
            kết thúc
        kết thúc
    kết thúc
    if Store.lastError and Store.lastError:find("bị hỏng", 1, true) then
        Store.mode = "none"
        trả về nil
    kết thúc
    nếu kiểu dữ liệu (_G.BananaCatHub_SavedData) == "table" thì
        Store.mode = "memory"
        trả về _G.BananaCatHub_SavedData
    kết thúc
    Store.mode = "none"
    trả về nil
kết thúc

hàm Store.serialize()
    local sOut = {}
    for _, s in ipairs(scripts) do
        table.insert(sOut, {
            tên = tostring(s.name hoặc ""),
            mã = tostring(s.code hoặc ""),
            mở rộng = (s.expanded == true),
        })
    kết thúc
    cục bộ wOut = {}
    for _, w in ipairs(waypoints) do
        vị trí cục bộ = w và w.pos
        nếu pos và Store.isFinite(pos.X) và Store.isFinite(pos.Y) và Store.isFinite(pos.Z) thì
            table.insert(wOut, {name = tostring(w.name or ""), x = pos.X, y = pos.Y, z = pos.Z})
        kết thúc
    kết thúc
    cục bộ fOut = {}
    for _, f in ipairs(featureTabs) do
        bảng.chèn(fOut, {
            tên = tostring(f.name hoặc ""),
            icon = tostring(f.icon or "⚙️"),
            mã = tostring(f.code hoặc ""),
        })
    kết thúc
    trở lại {
        phiên bản = Store.SAVE_VERSION,
        scripts = sOut,
        điểm tham chiếu = wOut,
        các tính năng = fOut,
        cài đặt = {
            embedEnabled = (S.embedEnabled == true),
            embedGuessNew = (S.embedGuessNew == true),
            parkCodeGuis = (S.parkCodeGuis ~= false), -- v4.4i
            hubFavs = (function()
                đầu ra cục bộ = {}
                nếu kiểu dữ liệu (S.hubFavs) == "table" thì
                    for nm, v in pairs(S.hubFavs) do if v then out[#out + 1] = tostring(nm) end end
                kết thúc
                trở lại
            kết thúc)(),
        },
    }
kết thúc

hàm Store.save()
    local ok = Store.write(Store.serialize())
    if Store.refreshStatus then pcall(Store.refreshStatus) end
    trả về ok
kết thúc

function Store.saveSoon()
    nếu Store._scheduled thì trả về end
    Store._scheduled = true
    task.delay(0.3, function()
        Store._scheduled = false
        Store.save()
    kết thúc)
kết thúc

hàm Store.load()
    dữ liệu cục bộ = Store.read()
    nếu kiểu dữ liệu (type) khác "table" thì
        Store.mode = Store.canWrite() và "empty" hoặc "none"
        Store.loadedScripts, Store.loadedWp = 0, 0
        Store.loadedFeatures = {}
        trở lại
    kết thúc

    local fileVer = tonumber(data.version) or 1
    nếu fileVer > Store.SAVE_VERSION thì
        Store.lastError = string.format(
            "File save là phiên bản %d, tập lệnh này chỉ hiểu v%d — một số mục không thể tải",
            fileVer, Store.SAVE_VERSION)
    kết thúc

    nếu kiểu dữ liệu (data.settings) == "table" thì
        S.embedEnabled = (data.settings.embedEnabled ~= false)
        S.embedGuessNew = (data.settings.embedGuessNew == true)
        S.parkCodeGuis = (data.settings.parkCodeGuis ~= false)
        nếu type(data.settings.hubFavs) == "table" thì
            S.hubFavs = {}
            for _, nm in ipairs(data.settings.hubFavs) do S.hubFavs[tostring(nm)] = true end
        kết thúc
    kết thúc

    local sOut = {}
    nếu kiểu dữ liệu (data.scripts) == "table" thì
        for _, s in ipairs(data.scripts) do
            nếu type(s) == "table" và type(s.code) == "string" và #s.code > 0 thì
                table.insert(sOut, {
                    tên = (loại(s.name) == "chuỗi" và #s.name > 0) và s.name hoặc ("Script " .. (#sOut + 1)),
                    mã = S.SanitizeCode(s.code),
                    mở rộng = (s.expanded == true),
                })
            kết thúc
        kết thúc
    kết thúc

    cục bộ wOut = {}
    nếu kiểu dữ liệu (data.waypoints) == "table" thì
        for _, w in ipairs(data.waypoints) do
            nếu type(w) == "table" và Store.isFinite(wx) và Store.isFinite(wy) và Store.isFinite(wz) thì
                bảng.chèn(wOut, {
                    tên = (loại(w.name) == "chuỗi" và #w.name > 0) và w.name hoặc ("WP " .. (#wOut + 1)),
                    pos = Vector3.new(wx, wy, wz),
                })
            kết thúc
        kết thúc
    kết thúc

    cục bộ fOut = {}
    nếu kiểu dữ liệu (data.features) == "table" thì
        for _, f in ipairs(data.features) do
            nếu type(f) == "table" và type(f.code) == "string" và #f.code > 0 thì
                bảng.chèn(fOut, {
                    tên = (type(f.name) == "string" và #f.name > 0) và f.name hoặc ("Chiều Năng " .. (#fOut + 1)),
                    icon = (type(f.icon) == "string" and #f.icon > 0) and f.icon or "⚙️",
                    mã = S.SanitizeCode(f.code),
                })
            kết thúc
        kết thúc
    kết thúc

    scripts = sOut
    điểm tham chiếu = wOut
    Store.loadedFeatures = fOut
    Store.loadedScripts, Store.loadedWp = #sOut, #wOut
kết thúc

Store.load()

-- ----------------------------------------------------------------------------
S.compatAdded = S.compatAdded or {} -- tên các hàm đã bù (để cảnh báo lại cho người dùng)
S.compatTried = false
S.vfs = S.vfs hoặc {} -- drive disk Virtual in RAM (khi bộ thực thi không có readfile/writefile)
S.clipboardTxt = S.clipboardTxt hoặc ""
S.queued = S.queued hoặc {} -- queue_on_teleport: giữ lại, không chạy
S.lastRunReport = nil -- báo cáo lần chạy cuối cùng (nhãn 💻 + nút 💾 dùng chung)
S.lastRunError = nil
S.lastNormalizeNote = nil
S.lastParkedCount = 0
S.lastParkedNames = {}

hàm S.HasGlobal(n)
    cục bộ ok, v = pcall(function() return rawget(_G, n) end)
    trả về ok và v ~= nil
kết thúc

hàm S.SetGlobal(n, v)
    if S.HasGlobal(n) then return false end -- KHONG de ham that cua executor
    local ok = pcall(function() rawset(_G, n, v) end)
    nếu được thì
        S.compatAdded[#S.compatAdded + 1] = n
        S.shimmedFns = S.shimmedFns hoặc {}
        S.shimmedFns[n] = rawget(_G, n)
    kết thúc
    trả về ok
kết thúc

hàm S.VRead(p)
    cục bộ f = S.vfs[tostring(p)]
    if f == nil then error("Không tìm thấy tệp: " .. tostring(p)) end
    trả về f
kết thúc
function S.VWrite(p, c) S.vfs[tostring(p)] = tostring(c); return true end
function S.VAppend(p, c) S.vfs[tostring(p)] = (S.vfs[tostring(p)] or "") .. tostring(c); return true end
hàm S.VExists(p) trả về S.vfs[tostring(p)] ~= nil kết thúc
function S.VDel(p) S.vfs[tostring(p)] = nil; return true end
hàm S.VList(dir)
    dir = tostring(dir or ""):gsub("[/\\]+$", "")
    đầu ra cục bộ = {}
    for k in pairs(S.vfs) do
        if dir == "" or k:sub(1, #dir) == dir then out[#out + 1] = k end
    kết thúc
    trở lại
kết thúc

hàm S.CompatRequest(opts)
    if type(opts) ~= "table" then opts = {Url = tostring(opts)} end
    URL cục bộ = tostring(opts.Url hoặc opts.url hoặc "")
    cơ quan địa phương, trạng thái, tốt = "", 0, sai
    pcall(function()
        local r = game:GetService("HttpService"):RequestAsync({
            URL = URL,
            Phương thức = tostring(opts.Method hoặc opts.method hoặc "GET"):upper(),
            Tiêu đề = opts.Headers hoặc opts.headers,
            Body = opts.Body hoặc opts.body,
        })
        thân, trạng thái, tốt = tostring(r.Body hoặc ""), tonumber(r.StatusCode) hoặc 200, (r.Success == true)
    kết thúc)
    nếu body == "" thì
        local okHttp, fetched = pcall(function() return game:HttpGet(url) end)
        nếu okHttp thì
            thân, trạng thái, tốt = tostring(fetched hoặc ""), 200, true
        kết thúc
    kết thúc
    return {StatusCode = status, StatusMessage = "", Body = body, Success = good, Headers = {}}
kết thúc

hàm S.CompatDrawing()
    cục bộ D = {}
    D.Fonts = {UI = 0, System = 0, Plex = 1, Monospace = 2}
    D.new = function(cls)
        local o = {__class = tostring(cls or ""), Visible = false, ZIndex = 1, Transparency = 1}
        trả về setmetatable(o, {
            __index = function(t, k)
                nếu k == "Xóa" hoặc k == "Hủy" thì
                    return function(self) rawset(self, "Visible", false) end
                kết thúc
                trả về rawget(t, k)
            kết thúc,
            __newindex = function(t, k, v) rawset(t, k, v) end,
        })
    kết thúc
    trả về D
kết thúc

hàm S.EnsureCompat()
    if S.compatTried then return S.compatAdded end
    S.compatTried = true
    pcall(function()
        S.SetGlobal("loadstring", function(src, nm) return load(tostring(src), nm or "compat") end)
        S.SetGlobal("getgenv", function() return _G end)
        S.SetGlobal("getrenv", function() return _G end)
        S.SetGlobal("identifyexecutor", function() return "taodepzai v5.0 NOIR-Compat", "4.7" end)
        S.SetGlobal("getexecutorname", function() return "taodepzai v5.0 NOIR-Compat" end)
        S.SetGlobal("getscript", function() return nil end)
        S.SetGlobal("getcallingscript", function() return nil end)
        S.SetGlobal("checkcaller", function() return false end)
        S.SetGlobal("isourclosure", function() return false end)
        S.SetGlobal("is_synapse_function", function() return false end)
        S.SetGlobal("setclipboard", function(t) S.clipboardTxt = tostring(t); return true end)
        S.SetGlobal("toclipboard", function(t) S.clipboardTxt = tostring(t); return true end)
        S.SetGlobal("set_clipboard", function(t) S.clipboardTxt = tostring(t); return true end)
        S.SetGlobal("readfile", function(p) return S.VRead(p) end)
        S.SetGlobal("writefile", function(p, c) return S.VWrite(p, c) end)
        S.SetGlobal("appendfile", function(p, c) return S.VAppend(p, c) end)
        S.SetGlobal("isfile", function(p) return S.VExists(p) end)
        S.SetGlobal("delfile", function(p) return S.VDel(p) end)
        S.SetGlobal("listfiles", function(d) return S.VList(d) end)
        S.SetGlobal("makefolder", function() return true end)
        S.SetGlobal("isfolder", function() return true end)
        S.SetGlobal("delfolder", function() return true end)
        S.SetGlobal("getcustomasset", function(_, p) return tostring(p) end)
        S.SetGlobal("getsynasset", function(_, p) return tostring(p) end)
        S.SetGlobal("request", function(o) return S.CompatRequest(o) end)
        S.SetGlobal("http_request", function(o) return S.CompatRequest(o) end)
        S.SetGlobal("http", {request = function(o) return S.CompatRequest(o) end})
        S.SetGlobal("HttpRequest", function(o) return S.CompatRequest(o) end)
        S.SetGlobal("hookfunction", function(_, nw) return nw end)
        S.SetGlobal("hookmetamethod", function() return function() end end)
        S.SetGlobal("getrawmetatable", function(o) return getmetatable(o) or {} end)
        S.SetGlobal("setrawmetatable", function(o, m) pcall(setmetatable, o, m); return o end)
        S.SetGlobal("setreadonly", function() return true end)
        S.SetGlobal("isreadonly", function() return false end)
        S.SetGlobal("newcclosure", function(f) return f end)
        S.SetGlobal("getnamecallmethod", function() return "" end)
        S.SetGlobal("setnamecallmethod", function() return true end)
        S.SetGlobal("getconnections", function() return {} end)
        S.SetGlobal("fireclickdetector", function() return true end)
        S.SetGlobal("firetouchinterest", function() return true end)
        S.SetGlobal("fireproximityprompt", function() return true end)
        S.SetGlobal("gethui", function() return targetGui end)
        S.SetGlobal("Drawing", S.CompatDrawing())
        S.SetGlobal("setfpscap", function() return true end)
        S.SetGlobal("getfpscap", function() return 60 end)
        S.SetGlobal("iswindowactive", function() return true end)
        S.SetGlobal("queue_on_teleport", function(_, src)
            S.queued[#S.queued + 1] = tostring(src); return true end)
    kết thúc)
    nếu #S.compatAdded > 0 thì
        pcall(function() print("[taodepzai v5.0 NOIR] " .. S.CompatNote()) end)
    kết thúc
    trả về S.compatAdded
kết thúc

hàm S.CompatNote()
    cục bộ n = #S.compatAdded
    nếu n == 0 thì trả về "" kết thúc
    mẫu cục bộ = {}
    for i = 1, math.min(4, n) do sample[#sample + 1] = S.compatAdded[i] end
    return "🩹 đã bù " .. n .. " hàm thi hành còn thiếu (" .. table.concat(sample, ", ")
        .. (n > 4 và "..." hoặc "") .. ")"
kết thúc

hàm S.NormalizeRunnable(c)
    S.lastNormalizeNote = nil
    nếu kiểu dữ liệu (c) ~= "string" thì trả về ""
    c = c:gsub("\239\187\191", ""):gsub("\226\128\139", "")
    c = c:gsub("\226\128\142", ""):gsub("\226\128\143", "")
    local t = c:match("^%s*(.-)%s*$") or ""
    local q = t:match('^["\'](.-)["\']$') -- phong cách cả dấu chớp bao quanh link
    nếu q và q ≈ "" thì t = q kết thúc
    nếu t:match("^https?://") thì
        nếu t:find('[%c"\\]') thì
            S.lastNormalizeNote = "⚠️ link có ký tự lạ -> chạy văn bản"
            trả về c
        kết thúc
        S.lastNormalizeNote = "🔗 link trần -> tự bọc Loadstring(game:HttpGet(...))()"
        return 'loadstring(game:HttpGet("' .. t .. '"))()'
    kết thúc
    local u = t:match('^game:HttpGet%s*%(%s*"(https?://.-)"%s*%)$')
        hoặc t:match('^HttpGet%s*%(%s*"(https?://.-)"%s*%)$')
    nếu bạn thì
        S.lastNormalizeNote = "🔗 HttpGet trần -> chuỗi tải tự bọc(...)()"
        return 'loadstring(game:HttpGet("' .. u .. '"))()'
    kết thúc
    nếu t:match("^loadstring%s*%(") và t:sub(-2) ~= "()" thì
        S.lastNormalizeNote = "➕ chuỗi tải thiếu dấu () -> đã thêm để chạy"
        trả về t .. "()"
    kết thúc
    trả về c
kết thúc

hàm S.RunReportText()
    local r = S.lastRunReport
    nếu không phải r thì trả về "" kết thúc
    nếu r.fail > 0 và r.ok == 0 thì
        local e = tostring(r.err hoặc "không rõ"):gsub("%s+", " ")
        nếu #e > 160 thì e = e:sub(1, 160) .. "…" kết thúc
        return "❌ Không thể chạy: " .. e .. " · mở F9 xem đầy đủ"
    kết thúc
    local t = " ✅Đã chạy xong (" .. r.ok .. " lần)"
    if r.fail > 0 thì t = t .. " · ⚠️ " .. r.fail .. " lần lỗi" end
    nếu r.guis và r.guis > 0 thì
        cục bộ nm = (r.names và r.names[1]) và (" '" .. r.names[1] .. "'") hoặc ""
        t = t .. " · 🧩 " .. r.guis .. " GUI đã vào tab 'GUI Ngoài'" .. nm .. " (bấm ↩ trả ra màn hình)"
    nếu r.parked thì
        t = t .. " · " .. r.parked
    kết thúc
    nếu r.note thì t = t .. " · " .. r.note end
    if r.compat and r.compat ~= "" then t = t .. " · " .. r.compat end
    trả lại t
kết thúc

hàm cục bộ ExecOnce(code, name)
    if #name>0 then print("👤 Chạy bởi:", name) end
    code = S.SanitizeCode(code) -- v4.4b: cut Wrapper "tự động kích thước" độc hại của bản cũ
    code = S.NormalizeRunnable(code) -- v4.7: link trần / thiếu () / BOM -> chạy được
    S.EnsureCompat() -- v4.7: Thiếu hàm thực thi bù (không ghi đè hàm thật)
    cục bộ ok, err = pcall(function()
        local fn, lerr = loadstring(code)
        nếu không phải fn thì lỗi (lerr) kết thúc
        fn()
    kết thúc)
    nếu được thì
        S.lastRunError = nil
    khác
        S.lastRunError = tostring(err)
        pcall(function() warn("[taodepzai v5.0 NOIR] ❌ '" .. tostring(name) .. "' lỗi: " .. tostring(err)) end)
    kết thúc
    trả về ok, err
kết thúc

hàm cục bộ Cancel()
    pcall(function() if S.AbortRunCapture then S.AbortRunCapture() end end)
    bị hủy bỏ=đúng
    runActive=false
    if curThread then pcall(task.cancel, curThread); curThread=nil end
    nếu curIndicator thì curIndicator.BackgroundColor3=C.BLUE; curIndicator=nil kết thúc
kết thúc

hàm cục bộ RunCode(code, name, ind, times, delay, noPark)
    Hủy bỏ()
    ReleaseHubFocus() -- v4.4b: free focus TextBox, if not game block input (không đi/không bắn)
    nếu #code==0 thì trả về false, "⚠️ Vui lòng nhập mã!" kết thúc
    đã hủy bỏ = sai
    if ind then curIndicator=ind; ind.BackgroundColor3=C.RED end
    cục bộ okC, failC = 0, 0
    curThread = task.spawn(function())
        runActive=true
        S.lastParkedCount, S.lastParkedNames = 0, {} -- v4.7: GUI đếm của RIÊNG lần chạy này
        S.lastRunError = nil
        local skipPark, skipWhy = (noPark == true), (noPark == true and "nút script nhanh" or nil)
        nếu không phải skipPark và S.ShouldSkipPark thì
            local s2, w2 = S.ShouldSkipPark(code, name)
            nếu s2 thì skipPark, skipWhy = true, w2 end
        kết thúc
        giới hạn địa phương = không
        nếu bỏ qua bãi đậu xe thì
            S.lastParkNote = "🪟 GUI để NGOÀI màn hình trò chơi (công cụ riêng cửa sổ) — không được đưa vào menu"
            pcall(function()
                print("[taodepzai v5.0 NOIR] 🛠 '" .. tostring(name) .. "': GUI ở NGOÀI màn hình game như cũ"
                    .. " (lý do không đưa vào menu: " .. tostring(skip Why) .. ")")
            kết thúc)
        khác
            S.lastParkNote = nil
            cap = S.BeginRunCapture()
        kết thúc
        for i=1,times do
            nếu bị hủy thì dừng lại
            nếu i>1 và độ trễ>0 thì
                cục bộ e=0
                trong khi e<delay thì
                    nếu bị hủy thì dừng lại
                    task.wait(0.1); e+=0.1
                kết thúc
                nếu bị hủy thì dừng lại
            kết thúc
            cục bộ ok, err = ExecOnce(code, name)
            if ok then okC+=1 else failC+=1; warn("❌ góc",i,err) end
            nếu có thì
                S.EndRunCapture(cap, (#name>0 and name or "Script"))
                S.lastParkedCount = cap.parked hoặc 0 -- v4.7: để báo "GUI đang nằm ở đâu"
                S.lastParkedNames = cap.names hoặc {}
                mũ = không
            kết thúc
        kết thúc
        if cap then S.EndRunCapture(cap, (#name>0 and name or "Script")) cap = nil end
        S.lastRunReport = {
            tên = tên,
            ok = okC,
            thất bại = thất bạiC,
            err = S.lastRunError,
            parked = (skipPark và S.lastParkNote hoặc nil),
            guis = S.lastParkedCount,
            names = S.lastParkedNames,
            note = S.lastNormalizeNote,
            compat = S.CompatNote(),
        }
        totalRuns+=okC+failC
        if ind then ind.BackgroundColor3=C.GREEN; if curIndicator==ind then curIndicator=nil end end
        runActive=false
        curThread=nil
    kết thúc)
    trả về true, nil
kết thúc

hàm cục bộ Label(parent, text, y)
    local isRule = (tostring(text):find("━") ~= nil)
    trả về New("TextLabel", {
        Kích thước=UDim2.new(1,-16,0,14), Vị trí=UDim2.new(0,8,0,y hoặc 0),
        Văn bản=văn bản, Độ trong suốt nền=1,
        TextColor3=(isRule and C.BORDER or C.MUTED), -- v4.5: chữ phụ / đường yêu trên nền tối
        Font=Enum.Font.GothamMedium, TextSize=10, TextXAlignment=Enum.TextXAlignment.Left, ZIndex=6,
    }, cha)
kết thúc

hàm cục bộ Button(parent, text, x, y, w, h, color)
    cơ sở cục bộ = màu hoặc C.SURFACE3
    local btn = New("TextButton", {
        Kích thước = UDim2.new(0, w hoặc 100, 0, h hoặc 24), Vị trí = UDim2.new(0, x hoặc 8, 0, y hoặc 0),
        Văn bản=văn bản, Màu nền 3=màu cơ bản, Độ trong suốt nền=0.08,
        TextColor3=D.BestText(base), Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=6,
    }, cha)
    Góc(btn, UDim.new(0,8))
    Stroke(btn, D.Edge(base), 1.1)
    D.Shade(btn, Color3.fromRGB(255,255,255), Color3.fromRGB(182,187,201), 90)
    D.Tactile(btn, 0.08)
    nút quay lại
kết thúc

hàm S.Debounce(key, secs, fn)
    S._dbt = S._dbt hoặc {}
    cục bộ n = (S._dbt[key] hoặc 0) + 1
    S._dbt[key] = n
    task.delay(secs or 0.18, function()
        if S._dbt[key] ~= n then return end -- đã có phím mới hơn -> lượt xem này bỏ qua
        S._dbt[key] = nil
        pcall(fn)
    kết thúc)
kết thúc

cục bộ y = 8
Label(codeTab, "💻 Nhập Code Tùy Chỉnh", y)
y = y + 14
Label(codeTab, "👤 Tên Script", y)
y = y + 14

local nameIn = New("TextBox", {
    Kích thước=UDim2.new(1,-16,0,26), Vị trí=UDim2.new(0,8,0,y), Văn bản="",
    PlaceholderText="Nhập tên script...", PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0, TextColor3=Color3.fromRGB(233, 237, 245),
    Font=Enum.Font.GothamMedium, TextSize=12, BorderSizePixel=0, ClearTextOnFocus=false,
    Active=true, Selectable=true, ZIndex=10, TextXAlignment=Enum.TextXAlignment.Left,
}, codeTab)
Góc(nameIn, UDim.new(0,5))
Stroke(nameIn, Color3.fromRGB(100,120,200), 1.5)
New("UIPadding", {PaddingLeft=UDim.new(0,6)}, nameIn)

y = y + 32
Nhãn(codeTab, "💻 Mã (Lua)", y)
y = y + 14

local codeIn = New("TextBox", {
    Kích thước=UDim2.new(1,-16,0,80), Vị trí=UDim2.new(0,8,0,y), Văn bản="",
    PlaceholderText="-- Nhập mã Lua tại đây...", PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(28, 31, 41), BackgroundTransparency=0, TextColor3=Color3.fromRGB(233, 237, 245),
    Font=Enum.Font.Code, TextSize=11, BorderSizePixel=0, ClearTextOnFocus=false,
    MultiLine=true, TextWrapped=true, TextXAlignment=Enum.TextXAlignment.Left, TextYAlignment=Enum.TextYAlignment.Top,
    Active=true, Selectable=true, ZIndex=10,
}, codeTab)
Góc(codeIn, UDim.new(0,5))
Stroke(codeIn, Color3.fromRGB(100,120,200), 1.5)
New("UIPadding", {PaddingLeft=UDim.new(0,6), PaddingTop=UDim.new(0,4)}, codeIn)

y = y + 86
Label(codeTab, "🔁 Cài đặt", y)
y = y + 14
Label(codeTab, "Số lần lặp:", y)

local repIn = New("TextBox", {
    Kích thước=UDim2.new(0,55,0,24), Vị trí=UDim2.new(0,8,0,y+12), Văn bản="1",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148), BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
    TextColor3=Color3.fromRGB(233, 237, 245), Font=Enum.Font.GothamMedium, TextSize=12, BorderSizePixel=0,
    ClearTextOnFocus=false, Active=true, Selectable=true, ZIndex=10,
}, codeTab)
Góc(repIn, UDim.new(0,5))
Stroke(repIn, Color3.fromRGB(180,180,200), 1.2)

Label(codeTab, "Thời gian chờ:", y+36)

local delIn = New("TextBox", {
    Kích thước=UDim2.new(0,55,0,24), Vị trí=UDim2.new(0,8,0,y+50), Văn bản="0",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148), BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
    TextColor3=Color3.fromRGB(233, 237, 245), Font=Enum.Font.GothamMedium, TextSize=12, BorderSizePixel=0,
    ClearTextOnFocus=false, Active=true, Selectable=true, ZIndex=10,
}, codeTab)
Góc(delIn, UDim.new(0,5))
Stroke(delIn, Color3.fromRGB(180,180,200), 1.2)

local unitBtn = New("TextButton", {
    Size=UDim2.new(0,55,0,24), Position=UDim2.new(0,75,0,y+50), Text="Giây ▾",
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0, TextColor3=C.DARK,
    Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=10,
}, codeTab)
Góc(unitBtn,UDim.new(0,4)); Đường viền(unitBtn)

local ddFrame = New("Frame", {
    Kích thước=UDim2.new(0,55,0,48), Vị trí=UDim2.new(0,75,0,y+74),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0, BorderSizePixel=0, Visible=false, ZIndex=15,
}, codeTab)
Góc(ddFrame,UDim.new(0,4)); Đường viền(ddFrame)

local secOpt = New("TextButton", {
    Size=UDim2.new(1,0,0,24), Text="Giây", BackgroundColor3=Color3.fromRGB(28, 31, 41),
    BackgroundTransparency=0, TextColor3=C.DARK, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=16,
}, ddFrame)

local minOpt = New("TextButton", {
    Size=UDim2.new(1,0,0,24), Position=UDim2.new(0,0,0,24), Text="Phút",
    BackgroundColor3=Color3.fromRGB(28, 31, 41), BackgroundTransparency=0, TextColor3=C.DARK,
    Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=16,
}, ddFrame)

unitBtn.Activated:Connect(function() ddFrame.Visible=not ddFrame.Visible end)
secOpt.Activated:Connect(function() unitBtn.Text="Giây ▾"; ddFrame.Visible=false end)
minOpt.Activated:Connect(function() unitBtn.Text="Phút ▾"; ddFrame.Visible=false end)

trackConn(UserInputService.InputBegan:Connect(function(i,gp)
    nếu gp thì trả về end
    nếu i.UserInputType == Enum.UserInputType.MouseButton1 hoặc i.UserInputType == Enum.UserInputType.Touch thì
        local f = Hit.inObject(unitBtn, i.Position.X, i.Position.Y)
            hoặc Hit.inObject(ddFrame, i.Position.X, i.Position.Y)
        if not f then ddFrame.Visible=false end
    kết thúc
kết thúc))

y = y + 82

local runBtn = Button(codeTab, "▶ Chạy Mã", 8, y, 336, 26, Color3.fromRGB(0,160,90))
local stopBtn = Button(codeTab, "⏹ cột", 350, y, 126, 26, C.RED)
y = y + 32
local saveBtn = Button(codeTab, "💾 Lưu Vào Danh Sách", 8, y, 468, 26, C.BLUE)
y = y + 32

local statusLbl = Label(codeTab, "", y)
statusLbl.TextColor3=Color3.fromRGB(255, 205, 64); statusLbl.TextSize=9; trạng tháiLbl.ZIndex=6
y = y + 14

local countLbl = Label(codeTab, "🔄 Tổng số lần chạy: 0", y)
countLbl.TextColor3=C.GREEN; countLbl.TextSize=9; countLbl.ZIndex=6

codeTab.CanvasSize = UDim2.new(0, 0, 0, y + 30)

stopBtn.Activated:Connect(function() Cancel(); statusLbl.Text="⏹️ Đã dừng" end)

runBtn.Activated:Connect(function()
    local t=math.clamp(tonumber(repIn.Text)or 1,1,1000)
    local d=math.max(tonumber(delIn.Text)or 0,0)
    if unitBtn.Text:find("Phút") then d=d*60 end
    local ok,err=RunCode(codeIn.Text,nameIn.Text,nil,t,d)
    nếu không ổn thì
        statusLbl.Text=err hoặc "❌ Lỗi không xác định"
    khác
        statusLbl.Text="⏳ Đang thực thi..."
        task.spawn(function()
            trong khi runActive thực hiện
                if cancelled then statusLbl.Text="⏹️ Đã dừng"; return end
                task.wait(0.1)
            kết thúc
            nếu không bị hủy bỏ thì
                local rep7 = S.RunReportText()
                statusLbl.Text = (rep7 ~= "") và rep7
                    hoặc ("✅ Hoàn thành!" .. (S.lastParkNote và (" · " .. S.lastParkNote) hoặc ""))
                statusLbl.TextColor3 = (S.lastRunReport và S.lastRunReport.fail > 0
                    và S.lastRunReport.ok == 0) và C.RED hoặc Color3.fromRGB(255, 205, 64)
            kết thúc
            countLbl.Text="🔄 Tổng số lần chạy: "..totalRuns
            task.delay(1.5, function()
                nếu statusLbl và statusLbl.Parent và (S.lastParkNote hoặc S.lastRunReport) thì
                    local rep7 = S.RunReportText()
                    if rep7 ~= "" then statusLbl.Text = rep7 end
                kết thúc
            kết thúc)
        kết thúc)
    kết thúc
kết thúc)

Tập lệnh xây dựng lại cục bộ

saveBtn.Activated:Connect(function()
    cục bộ n=nameIn.Text
    local c=codeIn.Text
    if #c==0 thì statusLbl.Text="⚠️ Vui lòng nhập mã!"; kết thúc trở lại
    nếu #n==0 thì n="Script "..(#scripts+1) end
    cục bộ bn=n
    local cnt=1
    trong khi đúng vậy
        cục bộ ex=false
        for _,s in ipairs(scripts) do if s.name==n then ex=true; break end end
        nếu không phải ex thì dừng lại
        cnt+=1; n=bn.." ("..cnt..")"
    kết thúc
    table.insert(scripts,{name=n, code=c, expanded=false})
    nếu RebuildScripts thì RebuildScripts() kết thúc
    Store.saveSoon()
    statusLbl.Text=" ✅ Đã lưu vào Tab 'Code Đã Lưu'! (đã ghi xuống đĩa)"
kết thúc)

sy cục bộ = 8
Label(savedCodeTab, "💾 Danh Sách Script Đã Lưu", sy)
sy = sy + 18

local searchIn = New("TextBox", {
    Kích thước=UDim2.new(1,-16,0,26), Vị trí=UDim2.new(0,8,0,sy), Văn bản="",
    PlaceholderText="🔍Tìm kiếm tập lệnh...", PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0, TextColor3=Color3.fromRGB(233, 237, 245),
    Font=Enum.Font.GothamMedium, TextSize=12, BorderSizePixel=0, ClearTextOnFocus=false,
    Active=true, Selectable=true, ZIndex=10, TextXAlignment=Enum.TextXAlignment.Left,
}, savedCodeTab)
Góc(searchIn, UDim.new(0,5))
Stroke(searchIn, Color3.fromRGB(180,180,200), 1.2)
New("UIPadding", {PaddingLeft=UDim.new(0,6)}, searchIn)
sy = sy + 32

Store.statusLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-110,0,20), Vị trí=UDim2.new(0,8,0,sy),
    Văn bản="💾 ...", Độ trong suốt nền=1, Màu chữ 3=XÁM,
    Font=Enum.Font.GothamMedium, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, TextYAlignment=Enum.TextYAlignment.Center,
    TextTruncate=Enum.TextTruncate.AtEnd, ZIndex=7,
}, savedCodeTab)

Store.reloadBtn = New("TextButton", {
    Kích thước=UDim2.new(0,94,0,20), Vị trí=UDim2.new(1,-102,0,sy),
    Text="🔄 Nạp lại", BackgroundColor3=C.BLUE, BackgroundTransparency=0.1,
    TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=8,
}, savedCodeTab)
Góc(Store.reloadBtn, UDim.new(0,5))
Stroke(Store.reloadBtn, Color3.fromRGB(0,90,170), 1)

Store.refreshStatus = function()
    if not Store.statusLbl or not Store.statusLbl.Parent then return end
    cục bộ ns, nw, nf = #scripts, #waypoints, #featureTabs
    nếu Store.lastError thì
        Store.statusLbl.TextColor3=Color3.fromRGB(255, 160, 90)
        Store.statusLbl.Text = string.format("⚠️ %d script · %d WP · %d tab — %s", ns, nw, nf, Store.lastError)
    elseif Store.mode == "file" then
        Store.statusLbl.TextColor3=Color3.fromRGB(58, 214, 140)
        Store.statusLbl.Text = string.format("💾 %d script · %d WP · %d tab · %s%s", ns, nw, nf, Store.SAVE_FILE,
            Store.lastSavedAt và (" · lưu lúc ".. Store.lastSavedAt) hoặc "")
    elseif Store.mode == "memory" then
        Store.statusLbl.TextColor3=Color3.fromRGB(255, 205, 64)
        Store.statusLbl.Text = string.format("⚠️ %d script · %d WP · %d tab — chỉ giữ trong phiên bản trò chơi này (thiếu tập tin ghi)", ns, nw, nf)
    elseif Store.mode == "empty" then
        Store.statusLbl.TextColor3 = C.GRAY
        Store.statusLbl.Text = string.format("💾 Chưa lưu gì · sẽ ghi vào %s khi bạn nhấn Lưu", Store.SAVE_FILE)
    khác
        Store.statusLbl.TextColor3 = C.GRAY
        Store.statusLbl.Text = "💾 Chưa lưu gì (người thực thi thiếu tệp ghi — chỉ giữ trong phiên bản trò chơi)"
    kết thúc
kết thúc

S.DoReload = function()
    Store.load()
    RebuildScripts()
    S.Rebuild()
    if Store.restoreWaypoints then pcall(Store.restoreWaypoints) end
    if Store.restoreFeatures then pcall(Store.restoreFeatures) end
    flash(Store.reloadBtn, " ✅ Đã tải", 1.4)
kết thúc
Store.reloadBtn.Activated:Connect(S.DoReload)

sy = sy + 24

local scriptList = New("Frame", {
    Kích thước=UDim2.new(1,-16,0,0), Vị trí=UDim2.new(0,8,0,sy),
    BackgroundTransparency=1, BorderSizePixel=0, ZIndex=6,
}, savedCodeTab)
New("UIListLayout", {SortOrder=Enum.SortOrder.LayoutOrder, Padding=UDim.new(0,6)}, scriptList)

RebuildScripts = function()
    for _,c in ipairs(scriptList:GetChildren()) do
        if not c:IsA("UIListLayout") then c:Destroy() end
    kết thúc

    thuật ngữ cục bộ = searchIn.Text:lower()
    local disp={}
    for _,d in ipairs(scripts) do
        if term=="" or d.name:lower():find(term,1,true) then table.insert(disp,d) end
    kết thúc

    nếu #disp==0 thì
        Mới("TextLabel", {
            Kích thước = UDim2.new(1, 0, 0, 40),
            Text=term~="" và "📭 Không tìm thấy tập lệnh phù hợp" hoặc "📭 Không có tập lệnh nào được lưu",
            BackgroundTransparency=1, TextColor3=C.GRAY, Font=Enum.Font.GothamMedium, TextSize=11,
            TextXAlignment=Enum.TextXAlignment.Center, TextYAlignment=Enum.TextYAlignment.Center, ZIndex=7,
        }, scriptList)
    kết thúc

    local totalHeight = 0

    for _, d in ipairs(disp) do
        local isExpanded = d.expanded or false
        local rowH = isExpanded and 160 or 42

        hàng cục bộ = New("Khung", {
            Size=UDim2.new(1,0,0,rowH), BackgroundColor3=Color3.fromRGB(26, 29, 38),
            BackgroundTransparency=0.1, BorderSizePixel=0, ZIndex=6,
            ClipsDescendants=true,
        }, scriptList)
        Góc(hàng,UDim.new(0,6)); Đường viền(hàng)

        local arrowBtn = New("TextButton", {
            Kích thước=UDim2.new(0,24,0,24), Vị trí=UDim2.new(0,6,0,9),
            Văn bản = isExpanded và "▲" hoặc "▼",
            BackgroundColor3=Color3.fromRGB(32, 36, 47), BackgroundTransparency=0,
            TextColor3=C.BLUE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(arrowBtn, UDim.new(0,4))

        local nameLbl = New("TextLabel", {
            Kích thước=UDim2.new(1,-175,0,42), Vị trí=UDim2.new(0,36,0,0),
            Văn bản=d.name, Độ trong suốt nền=1, Màu văn bản3=C.DARK,
            Font=Enum.Font.GothamBold, TextSize=11, TextXAlignment=Enum.TextXAlignment.Left,
            TextTruncate=Enum.TextTruncate.AtEnd, ZIndex=8,
        }, hàng ngang)

        local delScriptBtn = New("TextButton", {
            Kích thước=UDim2.new(0,58,0,26), Vị trí=UDim2.new(1,-132,0,8),
            Văn bản="🗑 x", Màu nền 3=Đỏ, Độ trong suốt nền=0.1,
            TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(delScriptBtn, UDim.new(0,5))

        local runScriptBtn = New("TextButton", {
            Kích thước=UDim2.new(0,62,0,26), Vị trí=UDim2.new(1,-68,0,8),
            Văn bản="▶ Chạy", Màu nền3=Xanh lá cây, Độ trong suốt nền=0.1,
            TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(runScriptBtn, UDim.new(0,5))

        nếu isExpanded thì
            local codeBoxFrame = New("ScrollingFrame", {
                Kích thước=UDim2.new(1,-12,0,82), Vị trí=UDim2.new(0,6,0,42),
                BackgroundColor3=Color3.fromRGB(24, 27, 35), BackgroundTransparency=0,
                BorderSizePixel=0, ZIndex=8, ScrollBarThickness=4,
                CanvasSize=UDim2.new(0,0,0,0),
                Kích thước Canvas tự động = Enum.Kích thước tự động.Y,
                ScrollingDirection=Enum.ScrollingDirection.Y,
                ScrollingEnabled=true,
                VerticalScrollBarInset=Enum.ScrollBarInset.ScrollBar,
            }, hàng ngang)
            Góc(codeBoxFrame, UDim.new(0,5))
            Stroke(codeBoxFrame, Color3.fromRGB(190,195,210), 1)

            local codeLbl = New("TextBox", {
                Kích thước=UDim2.new(1,-8,0,0), Vị trí=UDim2.new(0,4,0,4),
                Kích thước tự động = Enum.Kích thước tự động.Y,
                Văn bản=d.code, Màu văn bản3=Màu3.fromRGB(226, 230, 240), Độ trong suốt nền=1,
                Font=Enum.Font.Code, TextSize=10, TextXAlignment=Enum.TextXAlignment.Left,
                TextYAlignment=Enum.TextYAlignment.Top, MultiLine=true, TextWrapped=true,
                ClearTextOnFocus=false, TextEditable=false, Active=true, ZIndex=9,
            }, codeBoxFrame)

            local copyBtn = New("TextButton", {
                Kích thước=UDim2.new(0,120,0,24), Vị trí=UDim2.new(0,6,0,128),
                Văn bản="📋 Mã Sao Chép", Màu nền 3=Xanh lam, Độ trong suốt nền=0.1,
                TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=8,
            }, hàng ngang)
            Góc(copyBtn, UDim.new(0,5))

            copyBtn.Activated:Connect(function()
                nếu S.CopyToClipboard(d.code) thì
                    flash(copyBtn, " ✅ Đã Sao Chép!", 1.5)
                khác
                    codeLbl:CaptureFocus()
                    codeLbl.SelectionStart = 1
                    codeLbl.CursorPosition = #d.code + 1
                    flash(copyBtn, "⚠️ Đã Bội Đen Code", 1.5)
                kết thúc
            kết thúc)
        kết thúc

        arrowBtn.Activated:Connect(function()
            d.expanded = không phải d.expanded
            RebuildScripts()
            Store.saveSoon()
        kết thúc)

        runScriptBtn.Activated:Connect(function()
            local prev = runScriptBtn.Text
            cục bộ prevColor = runScriptBtn.TextColor3
            RunCode(d.code, d.name, runScriptBtn, 1, 0)
            runScriptBtn.Text = "⏳ ..."
            task.spawn(function()
                cục bộ chờ = 0
                while runActive and waited < 60 do task.wait(0.1); waited = waited + 0.1 end
                task.wait(0.4) -- chờ chụp/đậu GUI hoàn tất
                local rep = S.lastRunReport
                local txt = S.RunReportText()
                cục bộ xấu = rep và rep.fail > 0 và rep.ok == 0
                nếu xấu thì
                    runScriptBtn.Text = "❌ lỗi"
                    runScriptBtn.TextColor3 = C.RED
                elseif rep and (rep.guis or 0) > 0 then
                    runScriptBtn.Text = "🧩 vào tab"
                nếu rep và rep.parked thì
                    runScriptBtn.Text = "🪟 ngoài MH"
                khác
                    runScriptBtn.Text = " ✅ xong"
                kết thúc
                pcall(function()
                    nếu Store.statusLbl và Store.statusLbl.Parent thì
                        Store.statusLbl.Text = "▶ '" .. tostring(d.name) .. "' · " .. (txt ~= "" and txt or "xong")
                        Store.statusLbl.TextColor3 = bad and C.RED or C.GRAY
                    kết thúc
                kết thúc)
                task.delay(2.2, function()
                    nếu runScriptBtn và runScriptBtn.Parent thì
                        runScriptBtn.Text = prev
                        runScriptBtn.TextColor3 = prevColor
                    kết thúc
                kết thúc)
            kết thúc)
        kết thúc)

        delScriptBtn.Activated:Connect(function()
            local origIdx = nil
            for idx, s in ipairs(scripts) do
                if s == d then origIdx = idx; break end
            kết thúc
            nếu origIdx thì
                table.remove(scripts, origIdx)
                RebuildScripts()
                Store.saveSoon()
            kết thúc
        kết thúc)

        tổng chiều cao = tổng chiều cao + hàngH + 6
    kết thúc

    local listH = math.max(totalHeight, 40)
    scriptList.Size = UDim2.new(1,-16,0,listH)
    savedCodeTab.CanvasSize = UDim2.new(0, 0, 0, sy + listH + 30)
    if Store.refreshStatus then Store.refreshStatus() end
kết thúc

searchIn:GetPropertyChangedSignal("Text"):Connect(function() S.Debounce("savedSearch", 0.18, RebuildScripts) end)
RebuildScripts()

local supportTab = AddTab("Chiến thuật", "🛠", 5) -- v4.15: 4 -> 5 để nhường chỗ cho 👥 Người Chơi
S.AnaUi = S.AnaUi hoặc {}
S.AnaUi.supportTabIndex = #tabContent

vị trí cục bộ Y = 8

Label(supportTab, "⚡ Script Nhanh - Nhấn để chạy ngay", posY)
posY = posY + 16

local quickScripts = {
    {n="Dex Explorer", d="Mở Dex Explorer", c=[[loadstring(game:HttpGet("https://raw.githubusercontent.com/infyiff/backup/main/dex.lua"))()]], cl=Color3.fromRGB(72, 148, 248)},
    {n="Infinite Yield", d="Admin Commands", c=[[loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()]], cl=C.PURPLE},
    {n="SimpleSpy v3", d="Theo dõi RemoteEvent & RemoteFunction", c=[[loadstring(game:HttpGet("https://raw.githubusercontent.com/ex-serum/SimpleSpy/main/SimpleSpy.lua"))()]], cl=Color3.fromRGB(38, 194, 118)},
}

for _, s in ipairs(quickScripts) do
    local btn = New("TextButton", {
        Kích thước=UDim2.new(1,-16,0,28), Vị trí=UDim2.new(0,8,0,posY), Văn bản="",
        BackgroundColor3=s.cl, BackgroundTransparency=0.3, BorderSizePixel=0, ZIndex=6,
    }, supportTab)
    Góc(btn, UDim.new(0,5))
    Stroke(btn, s.cl, 1.2)
    Mới("TextLabel", {
        Kích thước=UDim2.new(1,-10,1,0), Vị trí=UDim2.new(0,10,0,0), Văn bản=sn."\n"..sd,
        BackgroundTransparency=1, TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10,
        TextXAlignment=Enum.TextXAlignment.Left, TextYAlignment=Enum.TextYAlignment.Center, ZIndex=7,
    }, btn)
    btn.Activated:Connect(function() RunCode(sc, sn, nil, 1, 0, true) end)
    posY = posY + 32
kết thúc

posY = posY + 6
Label(supportTab, "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", posY)
posY = posY + 16

Label(supportTab, "🛠 Hỗ Trợ — Phân Tích Độ", posY)
posY = posY + 18
Label(supportTab, "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", posY)
posY = posY + 16

local analyzeObjectEnabled = false
local highlightEnabled = true

local objectAnalyzeBtn = Button(supportTab, "🎯 Phân Tích Vật Thể: TẮT", 8, posY, 372, 26, C.GRAY)
local clearObjectBtn = Button(supportTab, "🧹 KQ", 386, posY, 90, 26, C.RED)
posY = posY + 32

local highlightToggleBtn = Button(supportTab, "💜 Highlight Tím: BẬT", 8, posY, 372, 26, C.PURPLE)
local removeHighlightBtn = Button(supportTab, "❌ bật Highlight", 386, posY, 90, 26, C.RED)
posY = posY + 32

--------- v4.8: PHÂN TÍCH ĐA NỀN TẢNG (📱 điện thoại + 🖥 máy tính) ----------
S.AnaUi = S.AnaUi hoặc {}
S.AnaUi.devLbl = Label(supportTab, "📱/🖥 Đang nhận dạng thiết bị...", posY)
S.AnaUi.devLbl.TextSize = 9
S.AnaUi.devLbl.TextColor3 = C.ACCENT
posY = posY + 16
S.AnaUi.centerBtn = Button(supportTab, "⊕ Vật thể ở GIỮA màn hình", 8, posY, 232, 26, C.BLUE)
S.AnaUi.nearBtn = Button(supportTab, "🧭 Vật thể GẦN nhất", 246, posY, 230, 26, C.ORANGE)
posY = posY + 30
S.AnaUi.skipGuiBtn = Button(supportTab, "🛡 Phân tích xuyên HUD game: BẬT", 8, posY, 300, 24, C.GREEN)
S.AnaUi.scanFbBtn = Button(supportTab, "🧭 Quét dự phòng: BẬT", 314, posY, 162, 24, C.GREEN)
posY = posY + 28
S.AnaUi.centerAimBtn = Button(supportTab, "🔴 Ngắm tâm: TẮT", 8, posY, 232, 24, C.GRAY)
S.AnaUi.aimButtonMoveEnabled = sai
S.AnaUi.aimMoveBtn = Button(supportTab, "🔒Kéo nút: TẮT", 246, posY, 230, 24, C.GRAY)
posY = posY + 28
S.AnaUi.aimMoveBtn.Activated:Connect(function()
    local moveEnabled = not (S.AnaUi.aimButtonMoveEnabled == true)
    S.AnaUi.aimButtonMoveEnabled = moveEnabled
    nếu không được kích hoạt di chuyển thì
        S.AnaUi.aimButtonDragging = sai
        S.AnaUi.aimButtonDragInput = không
        S.AnaUi.aimButtonDragMoved = sai
        S.AnaUi.aimButtonSuppressUntil = 0
    kết thúc
    S.AnaUi.aimMoveBtn.Text = moveEnabled và "🔓 Kéo nút: BẬT" hoặc "🔒 Kéo nút: TẮT"
    D.SetBg(S.AnaUi.aimMoveBtn, moveEnabled và C.ORANGE hoặc C.GRAY)
    S.AnaSay(moveEnabled và "🔓 Đã mở khóa: kéo nút 🔎 để thay đổi vị trí" hoặc "🔒 Đã khóa vị trí nút 🔎")
kết thúc)
S.AnaUi.whyLbl = Label(supportTab, "🔎 Lý do: — (bật 🎯 Phân Tích Vật Thể rồi Chạm/chuột phải vào vật)", posY)
S.AnaUi.whyLbl.TextSize = 9
posY = posY + 16

Label(supportTab, "💡 Kích hoạt “Kéo nút” viền xung tâm, đóng menu rồi kéo nút 🔎 đến chỗ muốn.", posY)
Label(supportTab, " Tắt “Kéo nút” để khóa; 🔎 để phân tích vật đang ở tâm.", posY+14)
Label(supportTab, " Nút HUD/menu của trò chơi vẫn là tùy chọn phân tích xuyên suốt HUD ở trên.", posY+28)
posY = posY + 44

cục bộ objResultPanel = New("Frame", {
    Kích thước = UDim2.new(1, -16, 0, 190),
    Vị trí = UDim2.new(0, 8, 0, posY),
    BackgroundColor3=Color3.fromRGB(20, 25, 35),
    Độ trong suốt nền = 0,
    BorderSizePixel=0,
    Chỉ số Z = 6,
    Hiển thị = false,
}, supportTab)
Góc(objResultPanel, UDim.new(0,6))
Stroke(objResultPanel, C.PURPLE, 1.5)

New("TextLabel", { -- (objTitleLbl: bien local không dung -> bo de tiet kiem slot local)
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,4),
    Text="🎯 VẬT THỂ ĐƯỢC CHỌN", BackgroundTransparency=1,
    TextColor3=Color3.fromRGB(180, 130, 255),
    Font=Enum.Font.GothamBold, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objNameLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,22),
    Văn bản="Tên: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 255, 100),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objClassLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,38),
    Văn bản="Lớp: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(200, 200, 255),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

local objPosLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,54),
    Văn bản="Vị trí: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 180, 180),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objSizeLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,70),
    Văn bản="Kích thước: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(180, 255, 180),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objRotLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,86),
    Văn bản="Xoay: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(180, 220, 255),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objLookLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,102),
    Văn bản="Nhìn này: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(220, 200, 255),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objMatLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,118),
    Văn bản="Chất liệu: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 220, 180),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objColorLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,134),
    Văn bản="Màu sắc: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 180, 220),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, objResultPanel)

cục bộ objPathLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,150),
    Văn bản="Đường dẫn: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(180, 255, 220),
    Font=Enum.Font.Code, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
    TextTruncate=Enum.TextTruncate.AtEnd,
}, objResultPanel)

local copyObjBtn = New("TextButton", {
    Kích thước=UDim2.new(0,120,0,20), Vị trí=UDim2.new(0,8,0,168),
    Text="📋 Sao chép độ cao", BackgroundColor3=C.BLUE, BackgroundTransparency=0.1,
    TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=8,
}, objResultPanel)
Góc(copyObjBtn, UDim.new(0,4))

copyPathBtn cục bộ = Mới ("TextButton", {
    Kích thước=UDim2.new(0,120,0,20), Vị trí=UDim2.new(0,134,0,168),
    Văn bản="📋 Sao chép đường dẫn", Màu nền 3 = Tím, Độ trong suốt nền = 0.1,
    TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=8,
}, objResultPanel)
Góc(copyPathBtn, UDim.new(0,4))

posY = posY + 198

Label(supportTab, "📍 thoải mái hiện tại (thời gian thực)", posY)
posY = posY + 16

local coordDisplay = New("Frame", {
    Kích thước=UDim2.new(1,-16,0,290),
    Vị trí = UDim2.new(0, 8, 0, posY),
    BackgroundColor3=Color3.fromRGB(30, 35, 45),
    Độ trong suốt nền = 0,
    BorderSizePixel=0,
    Chỉ số Z = 6,
}, supportTab)
Góc(coordDisplay, UDim.new(0,6))
Stroke(coordDisplay, C.BLUE, 1.5)

hàm cục bộ CreateCoordRow(parent, yPos, labelText, labelColor, valueDefault)
    Mới("TextLabel", {
        Kích thước=UDim2.new(0,90,0,16), Vị trí=UDim2.new(0,8,0,yPos),
        Văn bản=nhãn văn bản, Độ trong suốt nền=1, Màu văn bản=màu nhãn,
        Font=Enum.Font.GothamBold, TextSize=10,
        TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
    }, cha)
    trả về New("TextLabel", {
        Kích thước=UDim2.new(1,-100,0,16), Vị trí=UDim2.new(0,100,0,yPos),
        Văn bản=giá trị mặc định hoặc "...", Độ trong suốt nền=1,
        TextColor3=Color3.fromRGB(255,255,255),
        Font=Enum.Font.Code, TextSize=10,
        TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
    }, cha)
kết thúc

Mới("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,14), Vị trí=UDim2.new(0,8,0,4),
    Text="📍 POSITION (DƯỚI CHÂN)", BackgroundTransparency=1,
    TextColor3=Color3.fromRGB(255, 200, 100),
    Font=Enum.Font.GothamBold, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local xValLbl = CreateCoordRow(coordDisplay, 20, "X:", Color3.fromRGB(255,100,100), "0.000")
local yValLbl = CreateCoordRow(coordDisplay, 36, "Y:", Color3.fromRGB(100,255,100), "0.000")
local zValLbl = CreateCoordRow(coordDisplay, 52, "Z:", Color3.fromRGB(100,150,255), "0.000")

Mới("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,14), Vị trí=UDim2.new(0,8,0,72),
    Văn bản="📦 KÍCH THƯỚC", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 200, 100),
    Font=Enum.Font.GothamBold, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local sizeXValLbl = CreateCoordRow(coordDisplay, 88, "Kích thước X:", Color3.fromRGB(255,150,150), "0.000")
local sizeYValLbl = CreateCoordRow(coordDisplay, 104, "Kích thước Y:", Color3.fromRGB(150,255,150), "0.000")
local sizeZValLbl = CreateCoordRow(coordDisplay, 120, "Kích thước Z:", Color3.fromRGB(150,180,255), "0.000")

Mới("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,14), Vị trí=UDim2.new(0,8,0,140),
    Văn bản="🧭 XOAY", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 200, 100),
    Font=Enum.Font.GothamBold, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local rotPValLbl = CreateCoordRow(coordDisplay, 156, "Góc nghiêng (X):", Color3.fromRGB(255,150,150), "0.0°")
local rotYValLbl = CreateCoordRow(coordDisplay, 172, "Yaw (Y):", Color3.fromRGB(150,255,150), "0.0°")
local rotRValLbl = CreateCoordRow(coordDisplay, 188, "Roll (Z):", Color3.fromRGB(150,180,255), "0.0°")

Mới("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,14), Vị trí=UDim2.new(0,8,0,206),
    Văn bản="👁 NHÌN / TRẠNG THÁI / HP", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255, 200, 100),
    Font=Enum.Font.GothamBold, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local lookValLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,222),
    Văn bản="Nhìn này: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(200,220,255),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local stateValLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,240),
    Văn bản="Trạng thái: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(200,255,200),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local hpValLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,16), Vị trí=UDim2.new(0,8,0,258),
    Văn bản="HP: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(255,200,200),
    Font=Enum.Font.Code, TextSize=10,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

local placeLbl = New("TextLabel", {
    Kích thước=UDim2.new(1,-16,0,14), Vị trí=UDim2.new(0,8,0,274),
    Văn bản="Địa điểm: ...", Độ trong suốt nền=1,
    TextColor3=Color3.fromRGB(150, 200, 255),
    Font=Enum.Font.GothamMedium, TextSize=9,
    TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
}, coordDisplay)

posY = posY + 298

local lastPos = Vector3.new()
local lastSize = Vector3.new()
local lastRot = Vector3.new()
địa phương LastLook = Vector3.new()
local lastState = ""
cục bộ lastHp = -1

hàm cục bộ GetRootPart()
    local char = player.Character
    nếu không phải là ký tự thì trả về nil.
    local humanoid = char:FindFirstChildOfClass("Humanoid")
    cục bộ rootPart = (humanoid và humanoid.RootPart)
        hoặc char:FindFirstChild("HumanoidRootPart")
        hoặc char.PrimaryPart
        hoặc char:FindFirstChild("UpperTorso")
        hoặc char:FindFirstChild("Torso")
    trả về phần gốc
kết thúc

hàm cục bộ GetGroundPosition()
    local char = player.Character
    nếu không phải là ký tự thì trả về nil.
    rootPart cục bộ = GetRootPart()
    nếu không phải rootPart thì trả về nil.

    vị trí gốc cục bộ = rootPart.Position
    hướng cục bộ = Vector3.new(0, -500, 0)

    local params = RaycastParams.new()
    params.FilterType = Enum.RaycastFilterType.Exclude
    params.FilterDescendantsInstances = {char}
    params.IgnoreWater = false

    kết quả cục bộ = workspace:Raycast(origin, direction, params)
    nếu kết quả thì
        Trả về result.Position, result.Instance, result.Normal, result.Material
    kết thúc
    trả về nil
kết thúc

local coordAcc = 0
điều phối viên địa phương Lbls
chức năng cục bộ coordNA(all)
    coordLbls = coordLbls hoặc {xValLbl, yValLbl, zValLbl, sizeXValLbl, sizeYValLbl, sizeZValLbl,
                              rotPValLbl, rotYValLbl, rotRValLbl}
    for _, l in ipairs(coordLbls) do pcall(function() l.Text = "N/A" end) end
    nếu tất cả thì
        lookValLbl.Text = "Xem: Không có sẵn"
        stateValLbl.Text = "Tiểu bang: Không áp dụng"
        hpValLbl.Text = "HP: Không có sẵn"
    kết thúc
kết thúc

tọa độ cục bộUpdateConn = RunService.RenderStepped:Connect(function(stepDt)
    coordAcc = coordAcc + (tonumber(stepDt) hoặc 0.016)
    nếu coordAcc < 0.05 thì trả về end
    coordAcc = 0
    nếu không (main và main.Visible) thì trả về end
    if not (supportTab and supportTab.Visible) then return end
    local char = player.Character
    nếu không phải là ký tự thì
        coordNA(true)
        trở lại
    kết thúc

    local humanoid = char:FindFirstChildOfClass("Humanoid")
    rootPart cục bộ = GetRootPart()

    nếu không phải là rootPart thì
        coordNA()
        trở lại
    kết thúc

    local groundPos = GetGroundPosition()
    local displayPos = groundPos or rootPart.CFrame.Position

    local cf = rootPart.CFrame
    kích thước cục bộ = rootPart.Size
    local rx, ry, rz = cf:ToOrientation()
    giao diện cục bộ = cf.LookVector

    nếu (displayPos - lastPos).Magnitude > 0.001 thì
        lastPos = displayPos
        xValLbl.Text = string.format("%.3f", displayPos.X)
        yValLbl.Text = string.format("%.3f", displayPos.Y)
        zValLbl.Text = string.format("%.3f", displayPos.Z)
    kết thúc

    nếu (kích thước - kích thước cuối).Magnitude > 0.001 thì
        kích thước cuối cùng = kích thước
        sizeXValLbl.Text = string.format("%.3f", size.X)
        sizeYValLbl.Text = string.format("%.3f", size.Y)
        sizeZValLbl.Text = string.format("%.3f", size.Z)
    kết thúc

    local newRot = Vector3.new(rx, ry, rz)
    if (newRot - LastRot). Độ lớn > 0,001 thì
        lastRot = newRot
        rotPValLbl.Text = string.format("%.1f°", math.deg(rx))
        rotYValLbl.Text = string.format("%.1f°", math.deg(ry))
        rotRValLbl.Text = string.format("%.1f°", math.deg(rz))
    kết thúc

    nếu (look - lastLook).Magnitude > 0.001 thì
        lastLook = look
        lookValLbl.Text = string.format("Nhìn: %.3f, %.3f, %.3f", look.X, look.Y, look.Z)
    kết thúc

    nếu là hình người thì
        trạng thái cục bộ = humanoid:GetState()
        nếu trạng thái ~= trạng thái cuối cùng thì
            Trạng thái cuối cùng = trạng thái
            stateValLbl.Text = "Trạng thái: "..tostring(state):gsub("Enum.HumanoidStateType.", "")
        kết thúc

        local hp = math.floor(humanoid.Health)
        nếu hp ~= lastHp thì
            lastHp = hp
            hpValLbl.Text = string.format("HP: %d / %d", hp, math.floor(humanoid.MaxHealth))
        kết thúc
    khác
        stateValLbl.Text = "Trạng thái: Không có hình người"
        hpValLbl.Text = "HP: Không có sẵn"
    kết thúc

    if placeLbl.Text == "Địa điểm: ..." and (os.clock() - (D.placeTryAt or -99)) >= 10 then
        D.placeTryAt = os.clock()
        pcall(function()
            thông tin cục bộ = game:GetService("MarketplaceService"):GetProductInfo(game.PlaceId)
            placeLbl.Text = "Địa điểm: "..game.PlaceId.." — "..info.Name
        kết thúc)
    kết thúc
kết thúc)
trackConn(coordUpdateConn)

local currentHighlight = nil

hàm cục bộ RemoveCurrentHighlight()
    nếu currentHighlight thì
        pcall(function() currentHighlight:Destroy() end)
        currentHighlight = nil
    kết thúc
kết thúc

hàm cục bộ CreateHighlight(target)
    nếu không phải là mục tiêu thì
        RemoveCurrentHighlight()
        trở lại
    kết thúc
    nếu không phải target:IsA("BasePart") thì trả về end
    nếu currentHighlight, currentHighlight.Parent và currentHighlight.Adornee bằng target thì
        return -- không xây dựng lại Highlight mỗi lần làm ở cùng một mức độ
    kết thúc
    RemoveCurrentHighlight()

    local hl = Instance.new("Highlight")
    hl.Name = "BananaCatHub_Highlight"
    hl.Adornee = mục tiêu
    hl.FillColor = Color3.fromRGB(160, 60, 255)
    hl.FillTransparency = 0.7
    hl.OutlineColor = Color3.fromRGB(200, 100, 255)
    hl.OutlineTransparency = 0
    hl.DepthMode = Enum.HighlightDepthMode.AlwaysOnTop
    hl.Parent = target

    currentHighlight = hl
kết thúc

hàm cục bộ GetFullPath(obj)
    if not obj then return "nil" end
    các bộ phận cục bộ = {}
    local cur = obj
    trong khi cur và cur ~= game do
        table.insert(parts, 1, cur.Name)
        cur = cur.Parent
    kết thúc
    return table.concat(parts, ".")
kết thúc

-- ----------------------------------------------------------------------------
S.AnaCfg = S.AnaCfg hoặc {
    SkipGameGui = true, -- 🛡 bỏ qua HUD/nền của game khi phân tích (nguyên nhân số 1)
    scanFallback = true, -- 🧭 tia trượt thì quét vật gần tia (game dùng CanQuery=false)
    lờWater = true, -- 🌊 không để mặt nước ăn tia
    holdTime = 0,4, -- 📱 cầm ngón tay bao nhiêu giây thì = "chuột phải"
    holdMove = 18, -- 📱 ngón xê dịch tối đa (px) mà vẫn tính là "giữ"
    maxDist = 10000, -- tầm tia
}
S.AnaUi = S.AnaUi hoặc {}
S.AnaLast = S.AnaLast hoặc {ok = false, why = nil, name = nil, how = nil}
S.AnaNote = nil
S.AnaWhyScan = nil

hàm S.AnaCam()
    local cam = workspace.CurrentCamera
    if not cam then pcall(function() cam = camera end) end
    camera trả về
kết thúc

hàm S.AnaSay(msg)
    S.AnaLast.why = tostring(msg or "")
    pcall(function()
        local l = S.AnaUi.whyLbl
        if l and l.Parent then l.Text = "🔎 " .. tostring(msg) end
    kết thúc)
    pcall(function() print("[taodepzai v5.0 NOIR] 🔎 " .. tostring(msg)) end)
kết thúc

hàm S.DeviceText()
    cảm ứng cục bộ, chuột = false, false
    pcall(function() touch = (UserInputService.TouchEnabled == true) end)
    pcall(function() mouse = (UserInputService.MouseEnabled == true) end)
    local hold = string.format("%.2f", S.AnaCfg.holdTime)
    nếu dùng cảm ứng và chuột thì
        return "🖥📱 Máy có cảm ứng: CHUỘT PHẢI hoặc GIỮ NGÓN " .. hold .. "s lên vật · hoặc ấn ⊕ Giữa màn hình"
    nếu chạm thì
        return "📱 Điện thoại: GIỮ NGÓN " .. hold .. "s lên vật (chạm nhanh vẫn đi/bắn bình thường) · hoặc ⊕ Giữa màn hình"
    nếu chuột thì
        return "🖥 Máy tính: CHUỘT PHẢI vào vật (chuột trái vẫn chơi bình thường) · hoặc ⊕ Giữa màn hình"
    kết thúc
    return "🎮 Chưa xác định thiết bị: sử dụng ⊕ Giữa màn hình hoặc 🧭 Gần nhất — bất kỳ nền tảng nào cũng chạy"
kết thúc

hàm S.RefreshDevLabel()
    pcall(function()
        local l = S.AnaUi.devLbl
        if l and l.Parent then l.Text = S.DeviceText() end
    kết thúc)
kết thúc

hàm S.GuiBlockAt(x, y)
    cục bộ cứng, mềm = nil, nil
    local vpx, vpy = 1280, 720
    pcall(function()
        local cam2 = S.AnaCam()
        if cam2 then vpx, vpy = cam2.ViewportSize.X, cam2.ViewportSize.Y end
    kết thúc)
    local bigArea = vpx * vpy * 0.36
    cont cục bộ = {}
    pcall(function() conts[#conts+1] = playerGui end)
    pcall(function() conts[#conts+1] = game:GetService("CoreGui") end)
    for _, cont in ipairs(conts) do
        local ok, objs = pcall(function() return cont:GetGuiObjectsAtPosition(x, y) end)
        nếu ok và type(objs) == "table" thì
            for _, o in ipairs(objs) do
                local isAimDot = false
                pcall(function()
                    dấu chấm cục bộ = S.AnaUi và S.AnaUi.aimDot
                    isAimDot = dot and (o == dot or o:IsDescendantOf(dot)) or false
                kết thúc)
                nếu không phải là isAimDot thì
                    khu vực địa phương, chuyển đổi, isAct = 0, 1, false
                    pcall(function() area = o.AbsoluteSize.X * o.AbsoluteSize.Y end)
                    pcall(function() trans = o.BackgroundTransparency end)
                    pcall(function() isAct = (o.Active == true) end)
                    tương tác cục bộ = (o:IsA("GuiButton") hoặc o:IsA("TextBox"))
                    thẻ cục bộ = tostring(o.Name) .. " (" .. tostring(o.ClassName) .. ")"
                    nếu tương tác và khu vực < bigArea thì
                        cứng = cứng hoặc thẻ
                    elseif interactive or isAct or trans < 0.5 then
                        mềm = mềm mại hoặc thẻ
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc
    trả lại cứng, mềm
kết thúc

hàm S.PickByRayScan(ray, filterList)
    nếu không phải tia hoặc không phải tia.Nguồn gốc hoặc không phải tia.Hướng thì
        trả về con số 0, "không có hợp lệ quan sát tia"
    kết thúc
    local dir = ray.Direction
    local dirMagnitude = dir.Magnitude
    nếu dirMagnitude < 0,001 thì trả về 0, kết thúc "tia Viewno không có hướng hợp lệ"
    dir = dir / dirMagnitude
    local maxD = tonumber(S.AnaCfg and S.AnaCfg.maxDist) or 10000
    if maxD ~= maxD or maxD == math.huge or maxD <= 0 then maxD = 10000 end
    maxD = math.clamp(maxD, 1, 10000)
    hành lang địa phương = 6 -- nửa chiều rộng dự phòng xung quanh tia, tính bằng đinh tán
    local okParams, op = pcall(function()
        sự chồng lấn cục bộ = OverlapParams.new()
        overlap.FilterType = Enum.RaycastFilterType.Exclude
        overlap.FilterDescendantsInstances = filterList or {}
        overlap.MaxParts = 512
        sự chồng chéo trả về
    kết thúc)
    nếu không phải okParams hoặc không phải op thì
        return nil, "không thể tạo bộ lọc vật liệu quét"
    kết thúc

    các phần cục bộ, đã thấy = {}, {}
    tâm cục bộ = tia.Nguồn gốc + dir * (maxD / 2)
    local up = (math.abs(dir.Y) > 0.98) and Vector3.new(0, 0, 1) or Vector3.new(0, 1, 0)
    local boxCFrame = CFrame.lookAt(center, center + dir, up)
    local okBox, boxParts = pcall(function()
        return workspace:GetPartBoundsInBox(boxCFrame, Vector3.new(corridor * 2, corridor * 2, maxD), op)
    kết thúc)
    nếu okBox và loại(boxParts) == "table" thì
        for _, pt in ipairs(boxParts) do
            nếu pt và chưa được nhìn thấy[pt] thì
                đã thấy[pt] = đúng
                phần[#phần + 1] = pt
            kết thúc
        kết thúc
    khác
        -- Tương thích với môi trường thiếu GetPartBoundsInBox: quét từng đoạn dọc tia,
        -- thay vì kiểm tra 220 stud đầu tiên như phiên bản cũ.
        local stepLen = 180
        đối với startD = 0, maxD, stepLen thì làm
            độ dài cục bộ = math.min(stepLen, maxD - startD)
            nếu độ dài > 0 thì
                mẫu cục bộ = tia gốc + dir * (startD + length / 2)
                local okRadius, around = pcall(function()
                    return workspace:GetPartBoundsInRadius(sample, length / 2 + corridor, op)
                kết thúc)
                nếu okRadius và type(around) == "table" thì
                    cho _, pt trong ipairs(xung quanh) làm
                        nếu pt và chưa được nhìn thấy[pt] thì
                            đã thấy[pt] = đúng
                            phần[#phần + 1] = pt
                        kết thúc
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc
    nếu #parts == 0 thì
        return nil, string.format("không tìm thấy vật thể xung quanh tia trong %.0f studs", maxD)
    kết thúc

    local best, bestSurfaceD, bestOffset = nil, math.huge, math.huge
    for _, pt in ipairs(parts) do
        local okV, along, offset, radius = pcall(function()
            local rel = pt.Position - ray.Origin
            cục bộ t = rel:Dot(dir)
            nếu t <= 0.5 hoặc t > maxD thì trả về nil.
            cục bộ gần nhất = tia.Nguồn gốc + dir * t
            Độ lệch ngang cục bộ = (Vị trí điểm - khoảng cách gần nhất).Độ lớn
            local half = math.max(pt.Size.X, pt.Size.Y, pt.Size.Z) / 2
            if lateral > math.max(corridor, half + 2) then return nil end
            trả về t, bên, một nửa
        kết thúc)
        nếu okV và cùng nhau thì
            bề mặt cục bộD = math.max(0, dọc theo - bán kính)
            nếu surfaceD < bestSurfaceD thì
                tốt nhất, bestSurfaceD, bestOffset = pt, surfaceD, offset
            kết thúc
        kết thúc
    kết thúc
    nếu không phải là tốt nhất thì
        return nil, "quét " .. #parts .. " vật nhưng không vật nào nằm trên tia trong " .. string.format("%.0f", maxD) .. " studs"
    kết thúc
    return best, string.format("quét xa dự phòng · %.0f studs · trôi tâm %.1f studs", bestSurfaceD, bestOffset)
kết thúc

hàm S.NearestParts(n)
    local char = player.Character
    cục bộ gốc = char và char:FindFirstChild("HumanoidRootPart")
    nếu không root thì trả về nil, "chưa có nhân vật (đang ở sảnh/menu?)" end
    cục bộ ổn, các bộ phận = pcall(function()
        op cục bộ = OverlapParams.new()
        op.FilterType = Enum.RaycastFilterType.Exclude
        op.FilterDescendantsInstances = {char, gui}
        op.MaxParts = 120
        return workspace:GetPartBoundsInRadius(root.Position, 60, op)
    kết thúc)
    nếu không ổn hoặc kiểu (các bộ phận) ~= "bảng" hoặc #bộ phận == 0 thì
        return nil, "không quét được vật nào trong 60 studs xung quanh bạn"
    kết thúc
    danh sách cục bộ = {}
    for _, pt in ipairs(parts) do
        local okD, d = pcall(function() return (pt.Position - root.Position).Magnitude end)
        nếu okD và d thì list[#list+1] = {p = pt, d = d} kết thúc
    kết thúc
    table.sort(list, function(a, b) return ad < bd end)
    tên địa phương = {}
    for i = 1, math.min(n or 5, #list) do
        names[#names+1] = list[i].p.Name .. " (" .. string.format("%.1f", list[i].d) .. "m)"
    kết thúc
    return (list[1] and list[1].p or nil), table.concat(names, " · "), #list
kết thúc

function S.FillObjPanel(inst, hitPos, hitNormal, hitMat, how, quiet)
    nếu không phải là inst thì trả về false.
    objResultPanel.Visible = true

    objNameLbl.Text = "Tên: "..inst.Name
    objClassLbl.Text = "Lớp: "..inst.ClassName
    objPosLbl.Text = string.format("Vị trí: %.3f, %.3f, %.3f", hitPos.X, hitPos.Y, hitPos.Z)

    nếu inst:IsA("BasePart") thì
        kích thước cục bộ = kích thước cài đặt
        local cf = inst.CFrame
        local rx, ry, rz = cf:ToOrientation()
        giao diện cục bộ = cf.LookVector
        màu cục bộ = inst.Color
        vật liệu địa phương = inst.Material

        objSizeLbl.Text = string.format("Kích thước: %.3f, %.3f, %.3f", size.X, size.Y, size.Z)
        objRotLbl.Text = string.format("Rotation: P=%.1f° Y=%.1f° R=%.1f°",
            math.deg(rx), math.deg(ry), math.deg(rz))
        objLookLbl.Text = string.format("Nhìn: %.3f, %.3f, %.3f", look.X, look.Y, look.Z)
        objMatLbl.Text = "Vật liệu: "..tostring(material):gsub("Enum.Material.", "")
        objColorLbl.Text = string.format("Màu: R=%d G=%d B=%d",
            math.floor(color.R*255), math.floor(color.G*255), math.floor(color.B*255))

        nếu highlightEnabled thì CreateHighlight(inst) end
    khác
        objSizeLbl.Text = "Size: N/A (không phải BasePart)"
        objRotLbl.Text = "Xoay: Không áp dụng"
        objLookLbl.Text = "Hình ảnh: Không có sẵn"
        objMatLbl.Text = "Vật liệu: Không có sẵn"
        objColorLbl.Text = "Màu sắc: Không áp dụng"
        RemoveCurrentHighlight()
    kết thúc

    objPathLbl.Text = "Đường dẫn: "..GetFullPath(inst)
    objResultPanel:SetAttribute("LastHitPos", tostring(hitPos))
    objResultPanel:SetAttribute("LastPath", GetFullPath(inst))
    objResultPanel:SetAttribution("LastNormal", tostring(hitNormal))
    objResultPanel:SetAttribution("LastMaterial", tostring(hitMat))

    S.AnaLast.ok = true
    S.AnaLast.name = tostring(inst.Name)
    S.AnaLast.how = tostring(how or "")
    nếu không yên tĩnh thì
        S.AnaSay(tostring(how or "🎯 tia bắn trúng") .. ": " .. inst.Name .. " (" .. inst.ClassName .. ")"
            .. (S.AnaNote và (" · " .. S.AnaNote) hoặc ""))
    kết thúc
    trả về giá trị đúng
kết thúc

S.RefreshDevLabel() -- v4.8: hiện đúng cách chọn vật liệu của thiết bị đang dùng

local function PickObjectAt(mousePos, isRightClick, ignoreHubGui)
    local x, y = mousePos.X, mousePos.Y
    S.AnaLast.ok = false
    S.AnaNote = nil
    S.AnaWhyScan = nil

    nếu không bỏ qua HubGui và Hit.onHub(x, y) thì
        S.AnaSay("⏭️ Điểm Đạt nằm trên menu của trung tâm — nhấn ra ngoài trận đấu và thử lại")
        trở lại
    kết thúc
    local hardGui, softGui = S.GuiBlockAt(x, y)
    nếu hardGui thì
        S.AnaSay("🚫 Điểm Đạt là NÚT của trò chơi (" .. hardGui .. ") — chuyển ra chỗ khác để không nhấn nút xuyên suốt")
        trở lại
    kết thúc
    nếu softGui và không phải S.AnaCfg.skipGameGui thì
        S.AnaSay("🚫 HUD của game (" .. softGui .. ") đang chặn — BẬT '🛡 Phân tích xuyên HUD game' được sử dụng")
        trở lại
    kết thúc
    nếu softGui thì
        S.AnaNote = "🛡 phân tích xuyên suốt HUD của game (" .. softGui .. ")"
    kết thúc

    local cam2 = S.AnaCam()
    nếu không phải cam2 thì
        S.AnaSay("⚠️ Game chưa có camera (Workspace.CurrentCamera = nil) — vào lại game rồi thử")
        trở lại
    kết thúc
    local unitRay = cam2:ViewportPointToRay(x, y)
    local params = RaycastParams.new()
    params.FilterType = Enum.RaycastFilterType.Exclude
    local filterList = {}
    if player.Character then table.insert(filterList, player.Character) end
    if gui then table.insert(filterList, gui) end
    params.FilterDescendantsInstances = filterList
    params.IgnoreWater = S.AnaCfg.ignoreWater -- v4.8: không để mặt nước ăn tia

    kết quả cục bộ = workspace:Raycast(unitRay.Origin, unitRay.Direction * S.AnaCfg.maxDist, params)
    nếu kết quả và kết quả.Material == Enum.Material.Water thì
        local pw = RaycastParams.new()
        pw.FilterType = Enum.RaycastFilterType.Exclude
        pw.FilterDescendantsInstances = filterList
        pw.IgnoreWater = true
        local rw = workspace:Raycast(unitRay.Origin, unitRay.Direction * S.AnaCfg.maxDist, pw)
        nếu rw và rw.Instance thì
            kết quả = rw
            S.AnaNote = "🌊 đã xuyên qua mặt nước để lấy vật bên dưới"
        kết thúc
    kết thúc

    local inst, hitPos, hitNormal, hitMat, how
    nếu kết quả và kết quả.Instance thì
        inst, hitPosition, hitNormal, hitMat = result.Instance, result.Position, result.Normal, result.Material
        cách thức = "🎯 tia bắn trúng"
    nếu S.AnaCfg.scanFallback thì
        phần cục bộ, why2 = S.PickByRayScan(unitRay, filterList)
        nếu một phần thì
            inst, hitPos, how = part, part.Position, "🧭 " .. tostring(why2)
            pcall(function() hitNormal = part.CFrame.LookVector end)
            pcall(function() hitMat = part.Material end)
        khác
            S.AnaWhyScan = why2
        kết thúc
    kết thúc
    objResultPanel.Visible = true

    nếu inst thì
        S.FillObjPanel(inst, hitPos, hitNormal, hitMat, how)
    khác
        địa phương prevName = objNameLbl.Text
        objNameLbl.Text = "⚠️ Không trúng gì — giữ vật đang chọn"
        S.AnaSay("⚠️ Không tìm thấy vật ở điểm chạm"
            .. (S.Ana WhyScan and (" (" .. S.Ana WhyScan .. ")") hoặc " (tia đi vào khoảng không)")
            .. " — thử ⊕ Giữa màn hình, 🧭 Gần nhất, hoặc lại gần vật hơn")
        task.delay(1.0, function()
            if objNameLbl và objNameLbl.Parent và objNameLbl.Text == "⚠️ Không trúng gì — giữ vật đang chọn" then
                objNameLbl.Text = prevName
            kết thúc
        kết thúc)
    kết thúc
kết thúc

hàm S.AnaAimEnsureDot()
    nếu S.AnaUi.aimGui và S.AnaUi.aimGui.Parent thì trả về S.AnaUi.aimGui end
    local aimGui = New("ScreenGui", {
        Tên = "BananaCatHub_AnaAimDot",
        IgnoreGuiInset = true,
        ResetOnSpawn = false,
        ZIndexBehavior = Enum.ZIndexBehavior.Global,
        DisplayOrder = 10000,
    }, targetGui)
    S.AnaUi.aimGui = aimGui
    aimGui:SetAttribute("BCHub_External", true)
    local dot = New("Frame", {
        Tên = "CenterAimDot",
        AnchorPoint = Vector2.new(0.5, 0.5),
        Vị trí = UDim2.new(0.5, 0, 0.5, 0),
        Kích thước = UDim2.new(0, 8, 0, 8),
        BackgroundColor3 = Color3.fromRGB(255, 35, 35),
        BorderSizePixel = 0,
        Đang hoạt động = false,
        Có thể chọn = false,
        Chỉ số Z = 10000,
    }, aimGui)
    Góc(dot, UDim.new(1, 0))
    Mới("UIStroke", {
        Màu = Màu3.fromRGB(8, 8, 8),
        Độ dày = 1,5
        Độ trong suốt = 0,
        ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    }, dấu chấm)
    local actionBtn = New("TextButton", {
        Tên = "CenterAimAnalyzeButton",
        AnchorPoint = Vector2.new(0.5, 0.5),
        Vị trí = S.AnaUi.aimButtonPosition hoặc UDim2.new(1, -34, 0.55, 0),
        Kích thước = UDim2.new(0, 46, 0, 46),
        Văn bản = "🔎",
        BackgroundColor3 = Color3.fromRGB(220, 55, 55),
        Độ trong suốt của nền = 0.08,
        TextColor3 = Color3.fromRGB(255, 255, 255),
        Phông chữ = Enum.Font.GothamBold,
        Kích thước chữ = 21,
        AutoButtonColor = true,
        Đang hoạt động = đúng,
        Có thể chọn = false,
        BorderSizePixel = 0,
        Chỉ số Z = 10000,
    }, aimGui)
    Góc(actionBtn, UDim.new(1, 0))
    Mới("UIStroke", {
        Màu = Color3.fromRGB(255, 235, 235),
        Độ dày = 1,5
        Độ trong suốt = 0,1
        ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    }, actionBtn)
    local cam = S.AnaCam()
    khung nhìn cục bộ = cam và cam.ViewportSize
    nếu viewport và viewport.X > 0 và viewport.Y > 0 thì
        local saved = actionBtn.Position
        lề cục bộ = 29
        local x = math.clamp(saved.X.Scale * viewport.X + saved.X.Offset, margin, math.max(margin, viewport.X - margin))
        local y = math.clamp(saved.Y.Scale * viewport.Y + saved.Y.Offset, margin, math.max(margin, viewport.Y - margin))
        actionBtn.Position = UDim2.new(x / viewport.X, 0, y / viewport.Y, 0)
        S.AnaUi.aimButtonPosition = hành độngBtn.Position
    kết thúc
    actionBtn.InputBegan:Connect(function(input)
        if type(S.AnaAimBeginButtonDrag) == "function" then
            pcall(S.AnaAimBeginButtonDrag, input)
        kết thúc
    kết thúc)
    actionBtn.Activated:Connect(function()
        local dragged = S.AnaUi.aimButtonDragMoved == true
        đàn áp cục bộUntil = S.AnaUi.aimButtonSuppressUntil hoặc 0
        S.AnaUi.aimButtonDragMoved = sai
        nếu được kéo hoặc os.clock() < suppressUntil thì trả về end
        nếu kiểu (S.AnaAimAnalyzeOnce) == "function" thì
            local ok = pcall(S.AnaAimAnalyzeOnce)
            nếu không ổn thì
                pcall(function()
                    if S.AnaUi.supportTabIndex then SwitchTab(S.AnaUi.supportTabIndex) end
                    if main then main.Visible = true end
                    if togBtn then togBtn.Text = "✕" end
                    S.AnaSay("⚠️ Không thể phân tích điểm nhìn")
                kết thúc)
            kết thúc
        kết thúc
    kết thúc)
    S.AnaUi.aimGui = aimGui
    S.AnaUi.aimDot = dot
    S.AnaUi.aimActionBtn = hành độngBtn
    trả về aimGui
kết thúc

hàm S.AnaAimStep()
    nếu không phải S.AnaUi.centerAimOn hay không S.AnaUi.aimGui thì quay lại end
    local showOverlay = not (main and main.Visible)
    nếu S.AnaUi.aimGui.Enabled ~= showOverlay thì
        S.AnaUi.aimGui.Enabled = showOverlay
    kết thúc
    nếu không hiển thị lớp phủ thì
        S.AnaUi.aimButtonDragging = sai
        S.AnaUi.aimButtonDragInput = không
    kết thúc
kết thúc

hàm S.AnaAimBeginButtonDrag(input)
    if not S.AnaUi.aimButtonMoveEnabled then return end
    local inputType = input.UserInputType
    if inputType ~= Enum.UserInputType.MouseButton1 and inputType ~= Enum.UserInputType.Touch then return end
    btn địa phương = S.AnaUi.aimActionBtn
    nếu không phải btn thì trả về end
    local inputPos = input.Position
    S.AnaUi.aimButtonDragging = true
    S.AnaUi.aimButtonDragInput = đầu vào
    S.AnaUi.aimButtonDragOrigin = Vector2.new(inputPos.X, inputPos.Y)
    S.AnaUi.aimButtonDragCenter = btn.AbsolutePosition + btn.AbsoluteSize / 2
    S.AnaUi.aimButtonDragMoved = sai
    S.AnaUi.aimButtonSuppressUntil = 0
kết thúc

hàm S.AnaAimDragMove(đầu vào)
    if not S.AnaUi.aimButtonDragging or not S.AnaUi.aimButtonMoveEnabled then return end
    dragInput cục bộ = S.AnaUi.aimButtonDragInput
    nếu không phải là dragInput thì trả về end
    local inputType = dragInput.UserInputType
    local isPointerMove = (inputType == Enum.UserInputType.MouseButton1 and input.UserInputType == Enum.UserInputType.MouseMovement)
        hoặc (inputType == Enum.UserInputType.Touch và input == dragInput)
    nếu không phải là isPointerMove thì trả về end
    local cam = S.AnaCam()
    khung nhìn cục bộ = cam và cam.ViewportSize
    if not viewport or viewport.X <= 0 or viewport.Y <= 0 then return end
    con trỏ cục bộ = Vector2.new(input.Position.X, input.Position.Y)
    delta cục bộ = con trỏ - S.AnaUi.aimButtonDragOrigin
    nếu delta.Magnitude < 5 thì trả về end
    btn địa phương = S.AnaUi.aimActionBtn
    nếu không phải btn thì trả về end
    S.AnaUi.aimButtonDragMoved = true
    local halfX = btn.AbsoluteSize.X / 2 + 6
    local halfY = btn.AbsoluteSize.Y / 2 + 6
    local x = math.clamp(S.AnaUi.aimButtonDragCenter.X + delta.X, halfX, math.max(halfX, viewport.X - halfX))
    local y = math.clamp(S.AnaUi.aimButtonDragCenter.Y + delta.Y, HalfY, math.max(halfY, viewport.Y - HalfY))
    btn.Position = UDim2.new(x / viewport.X, 0, y / viewport.Y, 0)
    S.AnaUi.aimButtonPosition = btn.Position
kết thúc

hàm S.AnaAimEndButtonDrag(input)
    if not S.AnaUi.aimButtonDragging then return end
    dragInput cục bộ = S.AnaUi.aimButtonDragInput
    nếu không phải là dragInput thì trả về end
    local samePointer = input == dragInput
        hoặc (dragInput.UserInputType == Enum.UserInputType.MouseButton1 và input.UserInputType == Enum.UserInputType.MouseButton1)
    nếu không phải cùng một con trỏ thì trả về kết thúc
    nếu S.AnaUi.aimButtonDragMoved thì
        S.AnaUi.aimButtonSuppressUntil = os.clock() + 0,4
    khác
        S.AnaUi.aimButtonDragMoved = sai
        S.AnaUi.aimButtonSuppressUntil = 0
    kết thúc
    S.AnaUi.aimButtonDragging = sai
    S.AnaUi.aimButtonDragInput = không
    S.AnaUi.aimButtonDragOrigin = không
    S.AnaUi.aimButtonDragCenter = không
kết thúc

trackConn(UserInputService.InputChanged:Connect(function(input)
    pcall(S.AnaAimDragMove, input)
kết thúc))
trackConn(UserInputService.InputEnded:Connect(function(input)
    pcall(S.AnaAimEndButtonDrag, input)
kết thúc))

hàm S.AnaAimAnalyzeOnce()
    nếu không phải S.AnaUi.centerAimOn thì trả về false.
    S.AnaLast.ok = false
    local cam = S.AnaCam()
    nếu không phải là camera thì
        S.AnaSay("⚠️ Camera chưa sẵn sàng để phân tích điểm giữa màn hình")
    khác
        kích thước khung nhìn cục bộ = kích thước khung nhìn của camera
        PickObjectAt(Vector2.new(viewport.X * 0.5, viewport.Y * 0.5), false, true)
    kết thúc

    nếu S.AnaUi.supportTabIndex thì
        SwitchTab(S.AnaUi.supportTabIndex)
    kết thúc
    if main then main.Visible = true end
    nếu S.AnaLast và S.AnaLast.ok thì
        supportTab.CanvasPosition = Vector2.new(0, math.max(0, objResultPanel.Position.Y.Offset - 24))
    nếu S.AnaUi.whyLbl thì
        supportTab.CanvasPosition = Vector2.new(0, math.max(0, S.AnaUi.whyLbl.Position.Y.Offset - 24))
    kết thúc
    if togBtn then togBtn.Text = "✕" end
    ReleaseHubFocus()
    Trả về S.AnaLast và S.AnaLast.ok == true
kết thúc

hàm S.AnaAimSet(on)
    bật = (bật == đúng)
    nếu on == (S.AnaUi.centerAimOn == true) thì trả về khi kết thúc
    S.AnaUi.centerAimOn = bật
    nếu bật thì
        local okDot = pcall(S.AnaAimEnsureDot)
        local okBind = false
        nếu okDot thì
            okBind = pcall(function()
                RunService:UnbindFromRenderStep("BC_AnaAim")
                RunService:BindToRenderStep("BC_AnaAim", Enum.RenderPriority.Camera.Value + 1, function()
                    pcall(S.AnaAimStep)
                kết thúc)
            kết thúc)
        kết thúc
        nếu không phải okDot hoặc không phải okBind thì
            S.AnaUi.centerAimOn = false
            pcall(function() RunService:UnbindFromRenderStep("BC_AnaAim") end)
            pcall(function() nếu S.AnaUi.aimGui thì S.AnaUi.aimGui:Destroy() kết thúc)
            S.AnaUi.aimGui, S.AnaUi.aimDot, S.AnaUi.aimActionBtn = không, không, không
            S.AnaUi.aimButtonDragging, S.AnaUi.aimButtonDragInput = false, nil
            S.AnaUi.aimButtonDragOrigin, S.AnaUi.aimButtonDragCenter = không, không
            S.AnaUi.aimButtonDragMoved, S.AnaUi.aimButtonSuppressUntil = false, 0
        khác
            if main then main.Visible = false end -- cái nhìn ngoài game, kết quả sẽ mở lại trong menu
            if togBtn then togBtn.Text = "" end
            ReleaseHubFocus()
        kết thúc
    khác
        pcall(function() RunService:UnbindFromRenderStep("BC_AnaAim") end)
        pcall(function() nếu S.AnaUi.aimGui thì S.AnaUi.aimGui:Destroy() kết thúc)
        S.AnaUi.aimGui, S.AnaUi.aimDot, S.AnaUi.aimActionBtn = không, không, không
        S.AnaUi.aimButtonDragging, S.AnaUi.aimButtonDragInput = false, nil
        S.AnaUi.aimButtonDragOrigin, S.AnaUi.aimButtonDragCenter = không, không
        S.AnaUi.aimButtonDragMoved, S.AnaUi.aimButtonSuppressUntil = false, 0
    kết thúc

    local active = (S.AnaUi.centerAimOn == true)
    btn địa phương = S.AnaUi.centerAimBtn
    nếu btn và btn.Parent thì
        btn.Text = đang hoạt động và "🔴 Ngắm tâm: BẬT" hoặc "🔴 Ngắm tâm: TẮT"
        D.SetBg(btn, active and C.RED or C.GRAY)
    kết thúc
    nếu hoạt động thì
        S.AnaSay("🔴 Ngắm tâm đã bật · canh vật ở chấm đỏ rồi nhấn nút 🔎 để phân tích")
    kết thúc
    trả lại trạng thái hoạt động
kết thúc

S.AnaUi.centerAimBtn.Activated:Connect(function()
    yêu cầu cục bộ = không (S.AnaUi.centerAimOn == true)
    local active = S.AnaAimSet(requested)
    nếu được yêu cầu nhưng chưa được kích hoạt thì
        S.AnaSay("⚠️ Không thể bật chế độ xem tâm — không tạo được chấm đỏ/nút phân tích")
    kết thúc
kết thúc)

trackConn(UserInputService.InputBegan:Connect(function(input, gp)
    if gp then return end -- Roblox đã xử lý đầu vào này (nút GUI / TextBox focus)
    nếu không phân tích đối tượng được kích hoạt thì trả về kết thúc.

    nếu input.UserInputType == Enum.UserInputType.MouseButton2 thì
        PickObjectAt(input.Position, true)
        trở lại
    kết thúc

    nếu input.UserInputType == Enum.UserInputType.Touch thì
        local startTick = tick()
        local startPos = input.Position
        local holdConn, moveConn
        holdConn = UserInputService.InputEnded:Connect(function(e)
            nếu e == input thì
                holdConn:Disconnect()
                nếu moveConn thì moveConn:Disconnect() kết thúc
                if tick() - startTick >= S.AnaCfg.holdTime then -- v4.8: ngưỡng giữ ngón tay được điều chỉnh
                    task.spawn(function() PickObjectAt(input.Position, false) end)
                kết thúc
            kết thúc
        kết thúc)
        moveConn = UserInputService.InputChanged:Connect(function(e)
            nếu e == input thì
                local d = (e.Position - startPos).Độ lớn
                if d > S.AnaCfg.holdMove then -- v4.8: ngón tay trên mobile hay xê dịch -> 12px lên 18px
                    holdConn:Disconnect()
                    moveConn:Disconnect()
                kết thúc
            kết thúc
        kết thúc)
        trở lại
    kết thúc
kết thúc))

objectAnalyzeBtn.Activated:Connect(function()
    analyzeObjectEnabled = không phân tích đối tượng được bật
    nếu analyzeObjectEnabled thì
        objectAnalyzeBtn.Text = "🎯 Phân Tích Vật: BẬT"
        D.SetBg(objectAnalyzeBtn, C.GREEN) -- v4.5: đổi màu kèm theo chữ tương phản
        S.RefreshDevLabel()
        S.AnaSay(" ✅ Đã BẬT phân tích vật thể · " .. S.DeviceText())
    khác
        objectAnalyzeBtn.Text = "🎯 Phân Tích Vật: TẮT"
        D.SetBg(objectAnalyzeBtn, C.GRAY)
        RemoveCurrentHighlight()
    kết thúc
kết thúc)

highlightToggleBtn.Activated:Connect(function()
    highlightEnabled = không được bật
    nếu highlightEnabled thì
        highlightToggleBtn.Text = "💜 Highlight Tím: BẬT"
        D.SetBg(highlightToggleBtn, C.PURPLE)
    khác
        highlightToggleBtn.Text = "💜 Highlight Tím: TẮT"
        D.SetBg(highlightToggleBtn, C.GRAY)
        RemoveCurrentHighlight()
    kết thúc
kết thúc)

removeHighlightBtn.Activated:Connect(function()
    RemoveCurrentHighlight()
kết thúc)

--------- v4.8: ⊕ VẬT THỂ Ở GIỮA HÌNH THỨC (nền tảng nào cũng có thể nhấn, từ cần chuột phải) ----------
S.AnaUi.centerBtn.Activated:Connect(function()
    local vpx, vpy = 1280, 720
    pcall(function()
        local cam2 = S.AnaCam()
        if cam2 then vpx, vpy = cam2.ViewportSize.X, cam2.ViewportSize.Y end
    kết thúc)
    S.AnaSay("⊕ Ẩn menu 0.35s để lấy vật ở GIỮA màn hình...")
    cục bộ prevEnabled = true
    pcall(function() prevEnabled = gui.Enabled end)
    pcall(function() gui.Enabled = false end) -- ẩn menu để menu chính không có vật cần lấy
    task.wait(0.12)
    PickObjectAt(Vector2.new(vpx / 2, vpy / 2), true, true)
    task.wait(0.25)
    pcall(function() gui.Enabled = prevEnabled end)
kết thúc)

--------- v4.8: 🧭 VẬT GẦN NHẤT (cứu cánh cho game không chọn theo điểm chạm) ----------
S.AnaUi.nearBtn.Activated:Connect(function()
    phần cục bộ, thông tin, tổng = S.NearestParts(5)
    nếu không phải là một phần thì
        S.AnaSay("⚠️ Không thể tìm được vật gần bạn: " .. tostring(info))
        trở lại
    kết thúc
    cục bộ hp = nil
    pcall(function() hp = part.Position end)
    S.FillObjPanel(part, hp, nil, nil, "🧭 vật gần bạn nhất (trong " .. tostring(total) .. " vật quét được)")
    pcall(function()
        local l = S.AnaUi.whyLbl
        if l and l.Parent then l.Text = "🔎 Quanh bạn 60 studs: " .. tostring(info) end
    kết thúc)
kết thúc)

--------- v4.8: 2 công tắc cho game "khóa" (đều mặc định BẬT) ----------
S.AnaUi.skipGuiBtn.Activated:Connect(function()
    S.AnaCfg.skipGameGui = not S.AnaCfg.skipGameGui
    local on = S.AnaCfg.skipGameGui
    S.AnaUi.skipGuiBtn.Text = on và "🛡 Phân tích xuyên HUD game: BẬT"
                                 hoặc "🛡 Xuyên HUD game: TẮT (như bản cũ)"
    D.SetBg(S.AnaUi.skipGuiBtn, bật và C.GREEN hoặc C.GRAY)
    S.AnaSay(on and "🛡 BẬT: bỏ qua HUD/nền bán trong suốt của game (khuyên dùng, nhất là 📱 mobile)"
                hoặc "🛡 BẮT ĐẦU: quay lại kiểu cũ — HUD của game sẽ CHẶN phân tích ở điểm chạm")
kết thúc)
S.AnaUi.scanFbBtn.Activated:Connect(function()
    S.AnaCfg.scanFallback = không phải S.AnaCfg.scanFallback
    local on = S.AnaCfg.scanFallback
    S.AnaUi.scanFbBtn.Text = on và "🧭 Quét dự phòng: BẬT" hoặc "🧭 Quét dự phòng: TẮT"
    D.SetBg(S.AnaUi.scanFbBtn, bật và C.GREEN hoặc C.GRAY)
    S.AnaSay(on and "🧭 BẬT: tia trượt sẽ tự động quét vật gần tia — game đặt CanQuery=false vẫn phân tích được"
                hoặc "🧭 BẮT ĐẦU: chỉ dùng tia raycast (nhanh hơn, nhưng game khó sẽ không ra kết quả)")
kết thúc)

clearObjectBtn.Activated:Connect(function()
    objResultPanel.Visible = false
    RemoveCurrentHighlight()
kết thúc)

copyObjBtn.Activated:Connect(function()
    local pos = objResultPanel:GetAttribute("LastHitPos")
    nếu pos và pos ~= "" thì
        S.CopyToClipboard(pos)
        flash(copyObjBtn, " ✅ Đã sao chép!", 1.2)
    kết thúc
kết thúc)

copyPathBtn.Activated:Connect(function()
    đường dẫn cục bộ = objResultPanel:GetAttribute("LastPath")
    nếu đường dẫn và đường dẫn ~= "" thì
        S.CopyToClipboard(path)
        flash(copyPathBtn, " ✅ Đã sao chép!", 1.2)
    kết thúc
kết thúc)

posY = posY + 6

local copyCoordBtn = Button(supportTab, "📋 Copy Chiều Dưới Chân", 8, posY, 468, 26, C.BLUE)
posY = posY + 32

copyCoordBtn.Activated:Connect(function()
    local groundPos = GetGroundPosition()
    rootPart cục bộ = GetRootPart()
    local finalPos = groundPos or (rootPart and rootPart.CFrame.Position)
    nếu không phải finalPos thì trả về end
    local text = string.format("%.3f, %.3f, %.3f", finalPos.X, finalPos.Y, finalPos.Z)
    S.CopyToClipboard(text)
    flash(copyCoordBtn, " ✅ Đã Copy: " .. text, 2)
kết thúc)

Label(supportTab, "🚀 Dịch chuyển đến nơi ở", posY)
posY = posY + 14

D.tpLblX = Label(supportTab, "X:", posY)
D.tpLblX.Size = UDim2.new(0,14,0,14); D.tpLblX.Position = UDim2.new(0,8,0,posY)
local tpXIn = New("TextBox", {
    Kích thước=UDim2.new(0,136,0,24), Vị trí=UDim2.new(0,24,0,posY-2), Văn bản="0",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
    TextColor3=Color3.fromRGB(233, 237, 245), Font=Enum.Font.Code, TextSize=11,
    BorderSizePixel=0, ClearTextOnFocus=false, Active=true, Selectable=true, ZIndex=10,
}, supportTab)
Corner(tpXIn, UDim.new(0,4)); Stroke(tpXIn, Color3.fromRGB(255,100,100), 1.2)

D.tpLblY = Label(supportTab, "Y:", posY)
D.tpLblY.Size = UDim2.new(0,14,0,14); D.tpLblY.Position = UDim2.new(0,166,0,posY)
local tpYIn = New("TextBox", {
    Kích thước=UDim2.new(0,136,0,24), Vị trí=UDim2.new(0,182,0,posY-2), Văn bản="0",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
    TextColor3=Color3.fromRGB(233, 237, 245), Font=Enum.Font.Code, TextSize=11,
    BorderSizePixel=0, ClearTextOnFocus=false, Active=true, Selectable=true, ZIndex=10,
}, supportTab)
Corner(tpYIn, UDim.new(0,4)); Stroke(tpYIn, Color3.fromRGB(100,255,100), 1.2)

D.tpLblZ = Label(supportTab, "Z:", posY)
D.tpLblZ.Size = UDim2.new(0,14,0,14); D.tpLblZ.Position = UDim2.new(0,324,0,posY)
local tpZIn = New("TextBox", {
    Kích thước=UDim2.new(0,136,0,24), Vị trí=UDim2.new(0,340,0,posY-2), Văn bản="0",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
    TextColor3=Color3.fromRGB(233, 237, 245), Font=Enum.Font.Code, TextSize=11,
    BorderSizePixel=0, ClearTextOnFocus=false, Active=true, Selectable=true, ZIndex=10,
}, supportTab)
Corner(tpZIn, UDim.new(0,4)); Stroke(tpZIn, Color3.fromRGB(100,150,255), 1.2)

posY = posY + 30

local fillCurrentBtn = Button(supportTab, "📍 Lấy Vị Trí Dưới Chân", 8, posY, 372, 24, C.ORANGE)
local tpBtn = Button(supportTab, "🚀 Dịch chuyển tức thời", 386, posY, 90, 24, C.GREEN)
posY = posY + 30

fillCurrentBtn.Activated:Connect(function()
    local groundPos = GetGroundPosition()
    rootPart cục bộ = GetRootPart()
    local p = groundPos or (rootPart and rootPart.CFrame.Position)
    nếu không phải p thì trả về end
    tpXIn.Text = string.format("%.3f", pX)
    tpYIn.Text = string.format("%.3f", pY)
    tpZIn.Text = string.format("%.3f", pZ)
kết thúc)

tpBtn.Activated:Connect(function()
    rootPart cục bộ = GetRootPart()
    nếu không phải là rootPart thì trả về end
    local x = tonumber(tpXIn.Text) or 0
    local y = tonumber(tpYIn.Text) or 0
    local z = tonumber(tpZIn.Text) or 0
    rootPart.CFrame = CFrame.new(Vector3.new(x, y, z))
    flash(tpBtn, " ✅ Đã Teleport!", 1.5)
kết thúc)

S.SpeedMeter = S.SpeedMeter hoặc {}
do -- do..end: main chunk gần cạn 200 slot local -> KHÔNG khai báo local ở phạm vi chunk
cục bộ SV = S.SpeedMeter

SV.on = (SV.on == true)
SV.live = tonumber(SV.live) hoặc 0 -- tốc độ hiện tại (studs/s, đã làm mượt)
SV.max = tonumber(SV.max) hoặc 0 -- đạt được đỉnh cao nhất trong phiên bản
SV.base = tonumber(SV.base) -- mặc định của trò chơi (studs/s) — nil = chưa được dò tìm
SV.src = SV.src hoặc "chưa dò"
SV.ws = tonumber(SV.ws) or 0 -- Hiện tại WalkSpeed ​​của Humanoid
SV._bound = (SV._bound == true)

hàm cục bộ num(v)
    v = tonumber(v)
    if v == nil or v ~= v then return nil end -- NaN -> nil
    trả về v
kết thúc
hàm cục bộ fmt(n) trả về chuỗi.format("%.1f", num(n) hoặc 0) kết thúc
hàm cục bộ say(msg) pcall(function() if D.hubStatus then D.hubStatus.Text = msg end end) end

local function move() return S.Move end
hàm cục bộ myHum()
    cục bộ m = di chuyển()
    nếu m và m.Hum thì
        cục bộ ok, h = pcall(m.Hum)
        nếu ổn và h thì trả về h kết thúc
    kết thúc
    local ch = player.Character
    nếu không phải ch thì trả về nil.
    local ok, h = pcall(function() return ch:FindFirstChildOfClass("Humanoid") end)
    nếu ổn và h thì trả về h kết thúc
    trả về ch:FindFirstChild("Humanoid")
kết thúc
hàm cục bộ myRoot()
    cục bộ m = di chuyển()
    nếu m và m.Root thì
        cục bộ ok, r = pcall(m.Root)
        nếu ổn và r thì trả về r kết thúc
    kết thúc
    local ch = player.Character
    trả về ch và ch:FindFirstChild("HumanoidRootPart") hoặc nil
kết thúc
hàm cục bộ readWS(h)
    nếu không phải h thì trả về nil.
    cục bộ ok, v = pcall(function() return h.WalkSpeed ​​end)
    nếu ok thì local n = num(v); nếu n thì trả về n kết thúc
    cục bộ m = di chuyển()
    if m and m.comp then return num(m.comp(h, "WalkSpeed", nil)) end
    trả về nil
kết thúc
hàm cục bộ readPos(r)
    nếu không phải r thì trả về nil.
    cục bộ m = di chuyển()
    tọa độ x, y, z cục bộ
    nếu m và m.comp thì
        địa phương p
        pcall(function() p = r.Position end)
        x, y, z = m.comp(p, "X", nil), m.comp(p, "Y", nil), m.comp(p, "Z", nil)
    khác
        pcall(function() local p = r.Position; x, y, z = pX, pY, pZ end)
    kết thúc
    x, y, z = num(x), num(y), num(z)
    if x == nil or y == nil or z == nil then return nil end
    trả về x, y, z
kết thúc

-- ---------- dòng tốc độ MẶC ĐỊNH của game ----------
hàm SV.Detect()
    cục bộ m = di chuyển()
    local h = myHum()
    local hws = readWS(h)
    baseWS cục bộ = m và num(m._baseWS) hoặc nil
    local applying = (m ~= nil) and (m.speed == true or m.runMode == true)
    nguồn cục bộ
    nếu áp dụng và baseWS thì
        SV.base = baseWS
        src = "game (hub đã học khi 👟 bật)"
    nếu hws và hws > 0 thì
        nếu (không áp dụng) và SV._lastWS và math.abs(hws - SV._lastWS) > 0.01 thì
            src = "game VỪA ĐỔI tốc độ → mặc định mới"
        khác
            src = "game (WalkSpeed ​​của nhân vật)"
        kết thúc
        SV.base = hws
    nếu baseWS thì
        SV.base = baseWS
        src = "hub (đã học)"
    khác
        SV.base = 16
        src = "mặc định Roblox"
    kết thúc
    nếu hws và hws > 0 và không áp dụng thì SV._lastWS = hws end
    nếu hws thì SV.ws = hws end
    SV.src = src
    trả về SV.base, SV.src
kết thúc

---------đo tốc độ HIỆN TAI + giữ đỉnh CAO NHẤT ----------
hàm SV.Step(dt)
    dt = num(dt)
    nếu dt khác hoặc dt <= 0 thì dt = 1 / 60
    nếu dt > 0,5 thì dt = 0,5
    local h = myHum()
    local x, y, z = readPos(myRoot())
    nếu x thì
        nếu SV._px thì
            local dx, dy, dz = x - SV._px, y - SV._py, z - SV._pz
            local d = math.sqrt(dx * dx + dy * dy + dz * dz)
            nếu d <= 25 thì -- > 25 stud/khung hình = dịch chuyển/hồi sinh/lag -> bỏ mẫu
                inst cục bộ = d / dt
                if d > 0.001 then -- chỉ tính mẫu CÓ chuyển đổi (đứng yên không phá số liệu)
                    SV._n = (SV._n hoặc 0) + 1
                    SV.live = (SV._n <= 1) và inst hoặc (SV.live + (inst - SV.live) * 0.35)
                    nếu inst >= 0.5 và inst > SV.max thì SV.max = inst
                kết thúc
            kết thúc
        kết thúc
        SV._px, SV._py, SV._pz = x, y, z
    khác
        SV._px = nil
        SV.live = 0
    kết thúc
    nếu h thì SV.ws = readWS(h) hoặc SV.ws kết thúc
    SV.Detect()
    SV.Sync()
    trả về SV.live
kết thúc

hàm cục bộ setText(lbl, s)
    if lbl and lbl.Text ≥ s then lbl.Text = s end
kết thúc

-- ---------- vẽ số ra widget + HUD ----------
hàm SV.Sync()
    cơ sở cục bộ = num(SV.base) hoặc 0
    tỷ lệ cục bộ = (cơ sở > 0) và (SV.ws / cơ sở) hoặc 0
    tỷ lệ cục bộ = math.max(SV.max, base, 1)
    phần trăm cục bộ = SV.live / quy mô
    if pct < 0 then pct = 0 elseif pct > 1 then pct = 1 end -- KHÔNG dùng math.clamp (chỉ có trong Luau)
    bpct cục bộ = cơ sở / thang đo
    nếu bpct < 0 thì bpct = 0, ngược lại nếu bpct > 1 thì bpct = 1
    setText(SV.baseLbl, string.format("🎯 Trò chơi mặc định: %s studs/s · nguồn: %s", fmt(base), tostring(SV.src)))
    setText(SV.wsLbl, string.format("🚶 WalkSpeed ​​hiện tại: %s%s", fmt(SV.ws),
        (ratio > 0) và string.format(" (×%.2f default)", rate) hoặc ""))
    setText(SV.liveLbl, string.format("⚡ Tốc độ thật: %s studs/s", fmt(SV.live)))
    setText(SV.maxLbl, string.format("🏁 Cao nhất: %s studs/s", fmt(SV.max)))
    nếu SV.btn thì
        setText(SV.btn, SV.on và "🎯 Định tốc độ: BẬT" hoặc "🎯 Định tốc độ: TẮT")
        nếu SV._btnOn ~= SV.on thì
            SV._btnOn = SV.on
            SV.btn.BackgroundColor3 = SV.on và C.GREEN hoặc C.GRAY
        kết thúc
    kết thúc
    nếu SV.barFill và SV._barPct ~= pct thì
        SV._barPct = pct
        SV.barFill.Size = UDim2.new(pct, 0, 1, 0)
    kết thúc
    nếu SV.barBase và SV._barBase ~= bpct thì
        SV._barBase = bpct
        SV.barBase.Position = UDim2.new(bpct, -1, 0, 0)
    kết thúc
    nếu SV.hud thì
        if SV.hud.Visible ~= SV.on then SV.hud.Visible = SV.on end
        setText(SV.hudLbl, string.format("🎯 %s (mặc định trò chơi) · 🚶 %s\n⚡ %s · 🏁 %s đinh tán/s",
            fmt(base), fmt(SV.ws), fmt(SV.live), fmt(SV.max)))
    kết thúc
kết thúc

hàm SV.Status()
    return string.format("🎯 %s · ⚡ %s · 🏁 %s", fmt(SV.base), fmt(SV.live), fmt(SV.max))
kết thúc

-- ---------- bật/tắt vòng đo (chỉ chạy khi BẬT -> không tốn tài nguyên) ----------
hàm SV.Bind(on)
    nếu đang bật và không phải SV._bound thì
        SV._bound = true
        cục bộ ok = pcall(function()
            RunService:BindToRenderStep("BC_SpeedMeter", Enum.RenderPriority.Camera.Value - 6, hàm(dt)
                pcall(function() SV.Step(dt) end)
            kết thúc)
        kết thúc)
        nếu không ổn thì SV._bound = false kết thúc
    nếu không bật và SV._bound thì
        SV._bound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_SpeedMeter") end)
    kết thúc
    trả về SV._bound
kết thúc
hàm SV.Set(on)
    SV.on = (on == true)
    nếu SV.on thì
        SV._px, SV._n = nil, 0
        SV.Detect()
        SV._lastWS = nil
        SV.Bind(true)
        SV.Step(1 / 60) -- có số ngay, không phải đợi khung sau
    khác
        SV.Bind(false)
        SV._px, SV._n = nil, 0
    kết thúc
    SV.Sync()
    trả về SV.on
kết thúc
function SV.Toggle() return SV.Set(not SV.on) end
function SV.Reset() -- xóa chất lượng, vẫn đo tiếp
    SV.max, SV.live = 0, 0
    SV._n = 0
    SV.Sync()
    trả về SV.max
kết thúc

-- ---------- widget trong tab 🛠 Hỗ trợ ----------
Label(supportTab, "🎯 Định vị trò chơi tốc độ (mặc định · hiện tại · cao nhất)", posY)
posY = posY + 18
SV.btn = Button(supportTab, "🎯 Định tốc độ: TẮT", 8, posY, 300, 26, C.GRAY)
SV.resetBtn = Button(supportTab, "🗑 Xóa đỉnh", 314, posY, 162, 26, C.RED)
posY = posY + 30
SV.baseLbl = Label(supportTab, "🎯 Trò chơi mặc định: — studs/s", posY)
SV.baseLbl.TextColor3 = C.ACCENT
SV.baseLbl.TextSize = 9
posY = posY + 16
SV.wsLbl = Label(supportTab, "🚶 WalkSpeed ​​hiện tại: —", posY)
SV.wsLbl.TextSize = 9
posY = posY + 16
SV.liveLbl = Label(supportTab, "⚡ Tốc độ thật: 0.0 studs/s", posY)
SV.liveLbl.TextColor3 = C.GREEN
SV.liveLbl.TextSize = 9
posY = posY + 16
SV.maxLbl = Nhãn(supportTab, "🏁 Cao nhất: 0,0 đinh tán/s", posY)
SV.maxLbl.TextColor3 = C.ORANGE
SV.maxLbl.TextSize = 9
posY = posY + 16

cục bộ smBarBg = New("Khung", {
    Kích thước=UDim2.new(1,-16,0,10), Vị trí=UDim2.new(0,8,0,posY),
    BackgroundColor3=Color3.fromRGB(24, 28, 38), BackgroundTransparency=0.15,
    BorderSizePixel=0, ZIndex=6,
}, supportTab)
Corner(smBarBg, UDim.new(0,5)); Stroke(smBarBg, C.BORDER, 1)
SV.barFill = New("Frame", {
    Kích thước=UDim2.new(0,0,1,0), Vị trí=UDim2.new(0,0,0,0),
    BackgroundColor3=C.BLUE, BackgroundTransparency=0.15, BorderSizePixel=0, ZIndex=7,
}, smBarBg)
Góc(SV.barFill, UDim.new(0,5))
SV.barBase = New("Frame", { -- vạch xanh = tốc độ MẶC ĐỊNH của trò chơi (mốc so sánh)
    Kích thước=UDim2.new(0,2,1,0), Vị trí=UDim2.new(0.25,-1,0,0),
    BackgroundColor3=C.GREEN, BackgroundTransparency=0, BorderSizePixel=0, ZIndex=8,
}, smBarBg)
posY = posY + 16

SV.hintLbl = Label(supportTab, "ℹ️ Chỉ ĐO, không sửa gì · Vạch xanh = mặc định game · Tự học lại khi game đổi.", posY)
SV.hintLbl.TextSize = 9
posY = posY + 18

--------- HUD nổi trong trò chơi trên màn hình (đóng menu vẫn thấy) ----------
SV.hud = New("Frame", {
    Tên = "BC_SpeedHud",
    Kích thước = UDim2.new(0, 214, 0, 44), Vị trí = UDim2.new(0, 12, 0.5, -22),
    BackgroundColor3 = Color3.fromRGB(16, 19, 26), BackgroundTransparency = 0.25,
    BorderSizePixel = 0, Visible = false, ZIndex = 24,
}, gui)
Corner(SV.hud, UDim.new(0,8)); Stroke(SV.hud, C.ACCENT, 1.4)
SV.hudLbl = New("TextLabel", {
    Kích thước = UDim2.new(1,-12,1,0), Vị trí = UDim2.new(0,6,0,0), Văn bản = "🎯 ...",
    BackgroundTransparency = 1, TextColor3 = C.WHITE,
    Phông chữ = Enum.Font.GothamBold, Kích thước chữ = 9,
    TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Center,
    ZIndex = 25, TextWrapped = true,
}, SV.hud)

SV.btn.Activated:Connect(function()
    local on = SV.Set(not SV.on)
    say(on and ("🎯 định vị tốc độ: BẬT · mặc định game " .. fmt(SV.base) .. " studs/s")
           hoặc "🎯 định tốc độ: TẮT")
kết thúc)
SV.resetBtn.Activated:Connect(function()
    SV.Reset()
    say("🎯 đã xóa chất · cao nhất = 0")
kết thúc)

SV.Detect()
SV.Sync()
kết thúc
Label(supportTab, "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", posY)
posY = posY + 16
Label(supportTab, "💾 Waypoint Đã Lưu", posY)
posY = posY + 14

local wpNameIn = New("TextBox", {
    Kích thước=UDim2.new(1,-130,0,24), Vị trí=UDim2.new(0,8,0,posY), Văn bản="",
    PlaceholderText=" Tên điểm tham chiếu...",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
    TextColor3=Color3.fromRGB(233, 237, 245), Font=Enum.Font.GothamMedium, TextSize=11,
    BorderSizePixel=0, ClearTextOnFocus=false, Active=true, Selectable=true, ZIndex=10,
}, supportTab)
Corner(wpNameIn, UDim.new(0,4)); Stroke(wpNameIn, Color3.fromRGB(180,180,200), 1.2)
New("UIPadding", {PaddingLeft=UDim.new(0,6)}, wpNameIn)

local saveWpBtn = Button(supportTab, "💾 Lưu", 0, 0, 100, 24, C.PURPLE)
saveWpBtn.Position = UDim2.new(1, -110, 0, posY)

posY = posY + 32

local wpListFrame = New("Frame", {
    Kích thước=UDim2.new(1,-16,0,0), Vị trí=UDim2.new(0,8,0,posY),
    BackgroundTransparency=1, BorderSizePixel=0, ZIndex=6,
}, supportTab)
New("UIListLayout", {SortOrder=Enum.SortOrder.LayoutOrder, Padding=UDim.new(0,4)}, wpListFrame)

Điểm định vị RebuildWaypoints cục bộ

saveWpBtn.Activated:Connect(function()
    rootPart cục bộ = GetRootPart()
    nếu không phải là rootPart thì trả về end
    tên cục bộ = wpNameIn.Text
    if #name == 0 then name = "WP "..(#waypoints+1) end
    table.insert(waypoints, {name = name, pos = rootPart.CFrame.Position})
    wpNameIn.Text = ""
    nếu RebuildWaypoints thì RebuildWaypoints() kết thúc
    Store.saveSoon()
kết thúc)

RebuildWaypoints = function()
    for _, c in ipairs(wpListFrame:GetChildren()) do
        if not c:IsA("UIListLayout") then c:Destroy() end
    kết thúc

    nếu #waypoints == 0 thì
        Mới("TextLabel", {
            Kích thước = UDim2.new(1, 0, 0, 26),
            Text="📭 Chưa có điểm tham chiếu nào.",
            BackgroundTransparency=1, TextColor3=C.GRAY,
            Font=Enum.Font.GothamMedium, TextSize=10,
            TextXAlignment=Enum.TextXAlignment.Center, ZIndex=7,
        }, wpListFrame)
        supportTab.CanvasSize = UDim2.new(0, 0, 0, posY + 40)
        trở lại
    kết thúc

    tổng cục bộ H = 0
    for i, wp in ipairs(waypoints) do
        hàng cục bộ = New("Khung", {
            Kích thước = UDim2.new(1, 0, 0, 30),
            BackgroundColor3=Color3.fromRGB(26, 29, 38),
            BackgroundTransparency=0.1, BorderSizePixel=0, ZIndex=6,
        }, wpListFrame)
        Góc(hàng, UDim.new(0,5)); Nét(hàng)

        Mới("TextLabel", {
            Kích thước=UDim2.new(1,-120,1,0), Vị trí=UDim2.new(0,8,0,0),
            Văn bản=wp.name.." ("..string.format("%.0f, %.0f, %.0f", wp.pos.X, wp.pos.Y, wp.pos.Z)..")",
            BackgroundTransparency=1, TextColor3=C.DARK,
            Font=Enum.Font.GothamBold, TextSize=9,
            TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
        }, hàng ngang)

        local goBtn = New("TextButton", {
            Kích thước=UDim2.new(0,50,0,22), Vị trí=UDim2.new(1,-84,0,4),
            Văn bản="🚀"", Màu nền 3 = Xanh lá cây, Độ trong suốt nền = 0.1,
            TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9,
            BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(goBtn, UDim.new(0,4))
        goBtn.Activated:Connect(function()
            rootPart cục bộ = GetRootPart()
            nếu không phải là rootPart thì trả về end
            rootPart.CFrame = CFrame.new(wp.pos)
        kết thúc)

        local delBtn = New("TextButton", {
            Kích thước=UDim2.new(0,26,0,22), Vị trí=UDim2.new(1,-30,0,4),
            Văn bản="🗑", Màu nền 3 = Đỏ đậm, Độ trong suốt nền = 0.1,
            TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10,
            BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(delBtn, UDim.new(0,4))
        delBtn.Activated:Connect(function()
            table.remove(waypoints, i)
            RebuildWaypoints()
            Store.saveSoon()
        kết thúc)

        tổngH = tổngH + 34
    kết thúc

    wpListFrame.Size = UDim2.new(1,-16,0,totalH)
    supportTab.CanvasSize = UDim2.new(0, 0, 0, posY + TotalH + 20)
kết thúc

RebuildWaypoints()
Store.restoreWaypoints = RebuildWaypoints

hàm cục bộ NormalizeCode(c)
    nếu kiểu dữ liệu (c) ~= "string" thì trả về ""
    c = S.SanitizeCode(c) -- v4.4b: cắt trình bao bọc cũ "SIZE WRAPPER" (nó ghi đè GUI của trò chơi)
    trả về S.NormalizeRunnable(c)
kết thúc

local GAME_OWNED_GUI_NAMES = {
    Topbar = true, TopbarContainer = true, PlayerList = true, Chat = true,
    Backpack = true, DevConsoleUI = true, ScriptInvitationUI = true,
    FollowPromptUI = true, TouchControlsFrame = true, Main = true, ExMenu = true,
    Thông báo = true, Menu tạm dừng = true, Trong trò chơi = true, CoreGui = true,
}

hàm cục bộ ScanNewGuis(beforeGuis, mine, allowGuess)
    cục bộ được tìm thấy, đã thấy = {}, {}
    hàm cục bộ take(g)
        nếu không phải g hoặc đã thấy[g] thì trả về end
        đã thấy[g] = đúng
        table.insert(found, g)
    kết thúc
    nếu là của tôi thì
        for _, g in ipairs(mine) do
            if g:IsA("ScreenGui") or g:IsA("Folder") then take(g) end
        kết thúc
    kết thúc
    hàm cục bộ scan(container)
        nếu không phải là container thì trả về end
        for _, g in ipairs(container:GetChildren()) do
            nếu không phải trước Guis[g] thì
                trước khi Guis[g] = đúng
                nếu allowGuess và (g:IsA("ScreenGui") hoặc g:IsA("Folder")) và không phải là GAME_OWNED_GUI_NAMES[g.Name] thì
                    local hasGuiChild = false
                    for _, c in ipairs(g:GetChildren()) do
                        if c:IsA("GuiObject") then hasGuiChild = true break end
                    kết thúc
                    nếu hasGuiChild thì lấy(g) kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc
    quét (playerGui)
    if targetGui ~= playerGui then scan(targetGui) end
    trả về đã tìm thấy
kết thúc

hàm cục bộ ForceStretchToParent(obj, maxDepth)
    nếu không phải là obj thì trả về end
    maxDepth = maxDepth hoặc 0
    pcall(function()
        nếu obj:IsA("GuiObject") thì
            nếu obj:IsA("Frame") hoặc obj:IsA("ScrollingFrame") hoặc obj:IsA("CanvasGroup") thì
                cục bộ s = obj.Size
                nếu sXScale < 0,9 và sXOffset > 0 thì
                    obj.Size = UDim2.new(1, 0, sYScale > 0 and sYScale or 1, 0)
                kết thúc
                nếu obj.Position.X.Offset ≥ 0 hoặc obj.Position.Y.Offset ≥ 0 thì
                    obj.Position = UDim2.new(0, 0, 0, 0)
                kết thúc
            kết thúc
        kết thúc
    kết thúc)
    nếu maxDepth <= 0 thì trả về end
    for _, child in ipairs(obj:GetChildren()) do
        ForceStretchToParent(child, maxDepth - 1)
    kết thúc
kết thúc

hàm S.RegisterEmbed(host, gui, recs)
    mục nhập cục bộ = {host = host, gui = gui, recs = recs hoặc {}, conns = {}}
    pcall(function()
        entry.conns[#entry.conns+1] = gui:GetPropertyChangedSignal("Enabled"):Connect(function()
            pcall(function() host.Visible = gui.Enabled end)
        kết thúc)
    kết thúc)
    pcall(function()
        entry.conns[#entry.conns+1] = gui:GetPropertyChangedSignal("Parent"):Connect(function()
            pcall(function() host.Visible = (gui.Parent ~= nil) and gui.Enabled end)
        kết thúc)
    kết thúc)
    pcall(function()
        entry.conns[#entry.conns+1] = gui.Destroying:Connect(function()
            S.DropEmbed(entry, true)
        kết thúc)
    kết thúc)
    S.embeds[#S.embeds+1] = entry
    mục nhập trả lại
kết thúc

hàm S.FindEmbedByHost(host)
    for i, e in ipairs(S.embeds) do
        if e.host == host then return e, i end
    kết thúc
    trả về nil
kết thúc

hàm S.RemoveEmbedAt(i)
    cục bộ e = S.embeds[i]
    nếu không phải e thì trả về end
    for _, c in ipairs(e.conns) do pcall(function() c:Disconnect() end) end
    table.remove(S.embeds, i)
    trả về e
kết thúc

hàm S.DropEmbed(entry, keepQuiet)
    for i, e in ipairs(S.embeds) do
        if e == entry then S.RemoveEmbedAt(i); break end
    kết thúc
    pcall(function() if entry.host and entry.host.Parent then entry.host:Destroy() end end)
    nếu không giữ im lặng thì
        print("[taodepzai v5.0 NOIR] Đã gỡ bỏ máy chủ nhúng khỏi tab")
    kết thúc
kết thúc

hàm S.RestoreEmbed(entry)
    pcall(function() S.RestoreSnap(entry) end)
    entry.snap = nil
    for _, rec in ipairs(entry.recs or {}) do
        pcall(function()
            nếu rec.obj và rec.origParent thì
                rec.obj.Parent = rec.origParent
            kết thúc
        kết thúc)
    kết thúc
    for i, e in ipairs(S.embeds) do
        if e == entry then S.RemoveEmbedAt(i); break end
    kết thúc
    pcall(function() if entry.host and entry.host.Parent then entry.host:Destroy() end end)
kết thúc

hàm S.PruneEmbeds()
    for i = #S.embeds, 1, -1 do
        cục bộ e = S.embeds[i]
        local hostAlive = e.host and e.host.Parent
        local guiAlive = e.gui and e.gui.Parent
        nếu không phải hostAlive hoặc không phải guiAlive thì
            if hostAlive then pcall(function() e.host:Destroy() end) end
            S.RemoveEmbedAt(i)
        kết thúc
    kết thúc
kết thúc

hàm S.MeasureHost(host)
    local hx, hy = host.AbsolutePosition.X, host.AbsolutePosition.Y
    local minX, minY, maxX, maxY = math.huge, math.huge, -math.huge, -math.huge
    cục bộ n = 0
    for _, ch in ipairs(host:GetChildren()) do
        nếu ch:IsA("GuiObject") và ch.Visible ~= false thì
            local p, sz = ch.AbsolutePosition, ch.AbsoluteSize
            nếu p và sz thì
                minX = math.min(minX, pX); minY = math.min(minY, pY)
                maxX = math.max(maxX, pX + sz.X); maxY = math.max(maxY, pY + sz.Y)
                n = n + 1
            kết thúc
        kết thúc
    kết thúc
    if n == 0 or maxX <= minX or maxY <= minY then return nil end
    return { x = minX - hx, y = minY - hy, w = maxX - minX, h = maxY - minY }
kết thúc

hàm S.SnapSubtree(list, node, isTop)
    for _, c in ipairs(node:GetChildren()) do
        nếu c:Là một đối tượng GUI thì
            danh sách[#list+1] = {
                obj = c, top = isTop hoặc nil,
                Vị trí = c.Vị trí, Kích thước = c.Kích thước,
                TextSize = ((c.TextSize and c.TextSize > 0) and not c.TextScaled) and c.TextSize or nil,
            }
            S.SnapSubtree(list, c, false)
        elseif c:IsA("UICorner") then
            list[#list+1] = { obj = c, CornerRadius = c.CornerRadius }
        elseif c:IsA("UIPadding") then
            danh sách[#list+1] = { obj = c,
                PadT = c.PaddingTop, PadB = c.PaddingBottom,
                PadL = c.PaddingLeft, PadR = c.PaddingRight }
        elseif c:IsA("UIStroke") then
            list[#list+1] = { obj = c, Thick = c.Thickness }
        kết thúc
    kết thúc
kết thúc

hàm S.RestoreSnap(entry)
    nếu không phải entry.snap thì trả về end
    for _, rec in ipairs(entry.snap) do
        cục bộ o = rec.obj
        nếu o và o.Parent thì
            pcall(function()
                if rec.Position then o.Position = rec.Position end
                if rec.Size then o.Size = rec.Size end
                if rec.TextSize then o.TextSize = rec.TextSize end
                if rec.CornerRadius then o.CornerRadius = rec.CornerRadius end
                nếu rec.PadT thì
                    o.PaddingTop, o.PaddingBottom = rec.PadT, rec.PadB
                    o.PaddingLeft, o.PaddingRight = rec.PadL, rec.PadR
                kết thúc
                if rec.Thick then o.Thickness = rec.Thick end
            kết thúc)
        kết thúc
    kết thúc
kết thúc

hàm S.FitEmbedded(entry)
    máy chủ cục bộ, gui = entry.host, entry.gui
    nếu không phải máy chủ hoặc không phải máy chủ cha thì trả về kết thúc
    hàm cục bộ mulUDim(u, k)
        return UDim2.new(uXScale, math.floor(uXOffset * k + 0.5),
                         uYScale, math.floor(uYOffset * k + 0.5))
    kết thúc
    hàm cục bộ mulUDimShift(u, k, dx, dy)
        return UDim2.new(uXScale, math.floor(uXOffset * k + 0.5) + dx,
                         uYScale, math.floor(uYOffset * k + 0.5) + dy)
    kết thúc
    hàm cục bộ mulDim(u, k)
        return UDim.new(u.Scale, math.floor(u.Offset * k + 0.5))
    kết thúc

    vùng cục bộ = máy chủ.Cha -- embedHost trong tab
    local aw = area.AbsoluteSize.X - 6
    local ah = area.AbsoluteSize.Y - 6
    nếu aw < 40 hoặc ah < 40 thì trả về end

    pcall(function()
        host.Size = UDim2.new(1, 0, 1, 0)
        host.Position = UDim2.new(0, 0, 0, 0)
        host.BackgroundTransparency = 1
        Host.ClipsDescendants = true -- phần dư (nếu có) vừa vô hình không nhận click
    kết thúc)

    nếu không phải entry.snap thì
        entry.snap = {}
        S.SnapSubtree(entry.snap, host, true)
        if #entry.snap == 0 then return end
    kết thúc
    for _, rec in ipairs(entry.snap) do
        rec.dx, rec.dy = 0, 0
    kết thúc

    S.RestoreSnap(entry)
    cơ sở cục bộ = S.MeasureHost(host)
    nếu không phải là cơ sở thì trả về kết thúc

    local s = math.clamp(math.min(aw / base.w, ah / base.h), 0.35, 3.0)

    hàm cục bộ áp dụng(k)
        for _, rec in ipairs(entry.snap) do
            cục bộ o = rec.obj
            nếu o và o.Parent thì
                pcall(function()
                    if rec.Size then o.Size = mulUDim(rec.Size, k) end
                    nếu rec.Position thì
                        nếu rec.top thì
                            o.Position = mulUDimShift(rec.Position, k, rec.dx or 0, rec.dy or 0)
                        khác
                            o.Position = mulUDim(rec.Position, k)
                        kết thúc
                    kết thúc
                    if rec.TextSize then o.TextSize = math.max(8, math.floor(rec.TextSize * k + 0.5)) end
                    nếu rec.CornerRadius thì
                        o.CornerRadius = UDim.new(rec.CornerRadius.Scale,
                            math.floor(rec.CornerRadius.Offset * k + 0.5))
                    kết thúc
                    nếu rec.PadT thì
                        o.PaddingTop = mulDim(rec.PadT, k)
                        o.PaddingBottom = mulDim(rec.PadB, k)
                        o.PaddingLeft = mulDim(rec.PadL, k)
                        o.PaddingRight = mulDim(rec.PadR, k)
                    kết thúc
                    if rec.Thick then o.Thickness = math.max(1, rec.Thick * k) end
                kết thúc)
            kết thúc
        kết thúc
    kết thúc

    local hw, hh = area.AbsoluteSize.X, area.AbsoluteSize.Y
    hàm cục bộ align(k, tries)
        áp dụng(k)
        local m = S.MeasureHost(host)
        nếu không phải m thì trả về k kết thúc
        local dx = math.floor(-mx + math.max(0, (aw - mw) / 2) + 0.5)
        local dy = math.floor(-my + math.max(0, (ah - mh) / 2) + 0.5)
        nếu math.abs(dx) > 0,5 hoặc math.abs(dy) > 0,5 thì
            for _, rec in ipairs(entry.snap) do
                if rec.top then rec.dx, rec.dy = (rec.dx or 0) + dx, (rec.dy or 0) + dy end
            kết thúc
            áp dụng(k)
            m = S.MeasureHost(host) hoặc m
        kết thúc
        nếu m và tries < 2 và (mw > hw + 1 hoặc mh > hh + 1) thì
            local k2 = k * math.min(hw / mw, hh / mh)
            nếu k2 < k * 0,98 thì
                for _, rec in ipairs(entry.snap) do rec.dx, rec.dy = 0, 0 end
                return align(math.max(k2, 0.15), tries + 1)
            kết thúc
        kết thúc
        trả về k
    kết thúc

    s = align(s, 0)
    entry.fitScale = s
    trả về s
kết thúc

hàm S.TabArea(nm)
    khung cục bộ
    nếu type(nm) == "string" và #nm > 0 thì
        for _, ft in ipairs(featureTabs) do
            if ft.name == nm then frame = ft.frame break end
        kết thúc
    kết thúc
    khung = khung hoặc tab đang hoạt động
    nếu không phải là khung thì trả về nil.
    máy chủ cục bộ = frame:FindFirstChild("ScriptHost")
    khu vực cục bộ = máy chủ hoặc khung
    local sz = area.AbsoluteSize
    return Vector2.new(math.max(0, sz.X - 6), math.max(0, sz.Y - 6))
kết thúc

S.resizedCbs = {}
hàm S.OnResized(fn)
    if type(fn) ~= "function" then return nil end
    table.insert(S.resizedCbs, fn)
    return { Disconnect = function()
        for i, f in ipairs(S.resizedCbs) do
            if f == fn then table.remove(S.resizedCbs, i) break end
        kết thúc
    kết thúc }
kết thúc
hàm S.NotifyResize()
    local a = S.TabArea()
    cục bộ cbs = {}
    for _, f in ipairs(S.resizedCbs) do cbs[#cbs+1] = f end
    for _, f in ipairs(cbs) do pcall(f, a) end
kết thúc

hàm S.FeatureTabHost(nm)
    nếu type(nm) == "string" và #nm > 0 thì
        for _, ft in ipairs(featureTabs) do
            nếu ft.name == nm thì
                local h = ft.frame and ft.frame:FindFirstChild("ScriptHost")
                nếu h thì trả về h kết thúc
            kết thúc
        kết thúc
    kết thúc
    trả về activeTab và activeTab:FindFirstChild("ScriptHost")
kết thúc

hàm S.FitToTab(obj, nm)
    nếu không phải là obj thì trả về nil.
    máy chủ cục bộ = S.FeatureTabHost(nm)
    nếu host và obj.Parent ~= host thì
        pcall(function() obj.Parent = host end)
    kết thúc
    pcall(function()
        obj.Size = UDim2.new(1, 0, 1, 0)
        obj.Position = UDim2.new(0, 0, 0, 0)
    kết thúc)
    trả về obj
kết thúc

_G.BananaCatHubAPI = {
    Phiên bản = "5.0",
    LegacyVersion = "4.61", -- giữ thông tin tương thích cho script cũ
    HubGui = gui, -- v4.4e: sửa lỗi cũ — biến tên là `gui`, không phải `hubGui` (trước đây là nil)
    Chính = chính,
    TabArea = function(self, nm) return S.TabArea(nm) end,
    OnResize = function(self, fn) return S.OnResized(fn) end, -- API:OnResize(f) -> {Disconnect=}
    FeatureTabHost = function(self, nm) return S.FeatureTabHost(nm) end,
    FitToTab = function(self, obj, nm) return S.FitToTab(obj, nm) end,
    EmbedGui = function(self, guiOrFrame, nm) -- xin hub mượn GUI vào tab
        local scr = guiOrFrame
        if scr and not scr:IsA("ScreenGui") then scr = scr:FindFirstAncestorOfClass("ScreenGui") end
        máy chủ cục bộ = S.FeatureTabHost(nm)
        nếu không phải scr hoặc không phải máy chủ thì trả về nil.
        trả về S.EmbedGui(scr, host)
    kết thúc,
    MakeTemplate = function(self, nm, icon) return S.FeatureTemplate(nm, icon) end,
    ReleaseFocus = function(self) pcall(ReleaseHubFocus) end,
    ExternalGui = function(self, props)
        props = props hoặc {}
        local g = Instance.new("ScreenGui")
        g.Name = props.Name or ("BC_External_" .. tostring(math.random(10000, 99999)))
        g.IgnoreGuiInset = props.IgnoreGuiInset ~= false
        g.ResetOnSpawn = false
        g.ZIndexBehavior = Enum.ZIndexBehavior.Global
        g.DisplayOrder = tonumber(props.DisplayOrder) or 9000
        g:SetAttribution("BCHub_External", true) -- báo cho hub biết đừng nhúng GUI này
        g.Parent = targetGui or (player and player:WaitForChild("PlayerGui"))
        trả lại g
    kết thúc,
    Tâm ngắm = hàm(self, on)
        if on == nil then return S.ToggleCrosshair() end
        S.SetCrosshair(on và true hoặc false)
        trả về S.crosshairOn
    kết thúc,
}

hàm S.FeatureTemplate(nm, icon, stamp)
    nếu type(nm) ~= "string" hoặc #nm == 0 thì nm = " Tính Năng Mới" end
    if type(icon) ~= "string" or #icon == 0 then icon = "⚙️" end
    if type(stamp) ~= "string" then stamp = "" end
    đầu cục bộ = [==[
-- ---------------------------------------------------------------------------

BC cục bộ = { Tên = "__BC_NAME__", Biểu tượng = "__BC_ICON__", Thiết kế chiều rộng = 620, Thiết kế chiều cao = 384 }

local Players = game:GetService("Players")
người chơi cục bộ = Players.LocalPlayer
local pg = player and player:WaitForChild("PlayerGui")
nếu không phải pg thì trả về end

local gui = Instance.new("ScreenGui")
gui.Name = BC.Name
gui.ResetOnSpawn = false
gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
gui.Parent = pg

gốc cục bộ = Instance.new("Frame")
root.Name = "Root"
root.Size = UDim2.new(0, BC.DesignW, 0, BC.DesignH)
root.Position = UDim2.new(0.5, -BC.DesignW / 2, 0.5, -BC.DesignH / 2)
root.BackgroundColor3 = Color3.fromRGB(24, 26, 38)
root.BorderSizePixel = 0
root.Parent = gui
hàm cục bộ bcCorner(o, r)
    local c = Instance.new("UICorner")
    c.CornerRadius = UDim.new(0, r)
    c.Cha mẹ = o
    trả về c
kết thúc
bcCorner(root, 8)

API cục bộ = _G.BananaCatHubAPI
local bcConn = nil -- kết nối của API:OnResize, bcClose sẽ ngắt để không bị rò rỉ
hàm cục bộ bcHubMain()
    cục bộ ok, m = pcall(function() trả về API và API.Main kết thúc)
    nếu ok và m và m.AbsoluteSize thì trả về m.
    trung tâm cục bộ = pg:FindFirstChild("ExMenu") hoặc pg:FindFirstChild("BananaCatHub")
    nếu là trung tâm thì
        local f = hub:FindFirstChildWhichIsA("Frame")
        nếu f và f.AbsoluteSize.X > 300 thì trả về f.
    kết thúc
kết thúc
hàm cục bộ bcArea()
    local ok, v = pcall(function() return API and API.TabArea and API:TabArea(BC.Name) end)
    Nếu ổn và v và vX và vX > 60 thì trả về v kết thúc
    cục bộ m = bcHubMain()
    nếu m và m.AbsoluteSize.X > 300 thì
        return Vector2.new(m.AbsoluteSize.X - 30, m.AbsoluteSize.Y - 72)
    kết thúc
    local vp = Vector2.new(1280, 720)
    pcall(function() vp = workspace.CurrentCamera.ViewportSize end)
    local w = math.max(320, math.min(vp.X * 0.55, vp.X - 60))
    return Vector2.new(w, w * BC.DesignH / BC.DesignW)
kết thúc
hàm cục bộ bcFit()
    pcall(function()
        cục bộ par = root.Parent
        nếu par và không phải là par:IsA("ScreenGui") thì
            root.Size = UDim2.new(1, 0, 1, 0)
            root.Position = UDim2.new(0, 0, 0, 0)
            trở lại
        kết thúc
        local a = bcArea()
        root.Size = UDim2.new(0, math.floor(aX), 0, math.floor(aY))
        root.Position = UDim2.new(0.5, -math.floor(aX / 2), 0.5, -math.floor(aY / 2))
    kết thúc)
kết thúc
bcConn = nil
bcFit()
pcall(function()
    if API and API.OnResize then bcConn = API:OnResize(bcFit) end
kết thúc)
local bcHubFrame = bcHubMain()
nếu bcHubFrame thì
    pcall(function()
        bcHubFrame:GetPropertyChangedSignal("AbsoluteSize"):Connect(bcFit)
    kết thúc)
kết thúc
task.delay(0.25, bcFit)
task.delay(1.2, bcFit)

]==]
    cơ thể cục bộ = [==[
-- ---------- giao diện mẫu (thêm/bớt thoải mái, miễn là CON của panel/root) ----
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, -56, 0, 32)
title.Position = UDim2.new(0, 10, 0, 0)
title.BackgroundTransparency = 1
title.Text = BC.Icon .. " " .. BC.Name
title.Font = Enum.Font.GothamBold
title.TextSize = 15
title.TextXAlignment = Enum.TextXAlignment.Left
title.TextColor3 = Color3.fromRGB(255, 255, 255)
tiêu đề.Cha = gốc

local closeBtn = Instance.new("TextButton")
closeBtn.Name = "CloseBtn"
closeBtn.Size = UDim2.new(0, 26, 0, 26)
closeBtn.Position = UDim2.new(1, -34, 0, 3)
closeBtn.BackgroundColor3 = Color3.fromRGB(210, 70, 70)
closeBtn.Text = "X"
closeBtn.Font = Enum.Font.GothamBold
closeBtn.TextSize = 14
closeBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
closeBtn.AutoButtonColor = true
closeBtn.Parent = root
bcCorner(closeBtn, 6)

bảng cục bộ = Instance.new("ScrollingFrame")
panel.Name = "Panel"
panel.Size = UDim2.new(1, -20, 1, -74)
panel.Position = UDim2.new(0, 10, 0, 38)
panel.BackgroundTransparency = 1
panel.BorderSizePixel = 0
panel.ScrollBarThickness = 4 -- v4.9: đồng bộ
panel.AutomaticCanvasSize = Enum.AutomaticSize.Y
panel.CanvasSize = UDim2.new(0, 0, 0, 0)
panel.Parent = root
local list = Instance.new("UIListLayout")
list.Padding = UDim.new(0, 6)
list.SortOrder = Enum.SortOrder.LayoutOrder
danh sách.Cha = bảng
local pad = Instance.new("UIPadding")
pad.PaddingRight = UDim.new(0, 8)
pad.Parent = panel

local bcStatus = Instance.new("TextLabel")
bcStatus.Name = "Status"
bcStatus.Size = UDim2.new(1, -20, 0, 22)
bcStatus.Position = UDim2.new(0, 10, 1, -30)
bcStatus.BackgroundTransparency = 1
bcStatus.Text = "Tót"
bcStatus.TextColor3 = Color3.fromRGB(255, 214, 90)
bcStatus.Font = Enum.Font.Gotham
bcStatus.TextSize = 12
bcStatus.TextXAlignment = Enum.TextXAlignment.Left
bcStatus.Parent = root

hàm cục bộ bcButton(txt, color)
    local b = Instance.new("TextButton")
    b.Size = UDim2.new(1, 0, 0, 30)
    b.BackgroundColor3 = color hoặc Color3.fromRGB(60, 120, 220)
    b.Text = txt
    b.Font = Enum.Font.GothamMedium
    b.TextSize = 13
    b.TextColor3 = Color3.fromRGB(255, 255, 255)
    b.AutoButtonColor = true
    b.Cha = bảng
    bcCorner(b, 6)
    trả lại b
kết thúc

bcToggle = bcButton(BC.Icon .. " Kích hoạt " .. BC.Name)

--------- LỚP PHỦ BÊN NGOÀI (vòng tròn niêm tâm / ESP / HUD ngoài màn hình) ------
hàm cục bộ bcMakeExternalGui(name, order)
    số máy lẻ
    cục bộ ok, API = pcall(function() return _G.BananaCatHubAPI end)
    nếu ổn và API và API.ExternalGui thì
        ext = API:ExternalGui({Name = name, DisplayOrder = order})
    khác
        ext = Instance.new("ScreenGui")
        ext.Name = tên
        ext.IgnoreGuiInset = true
        ext.ResetOnSpawn = false
        ext.ZIndexBehavior = Enum.ZIndexBehavior.Global
        ext.DisplayOrder = order or 9500
        ext:SetAttribute("BCHub_External", true)
        local pg2 = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
        local hui = pg2
        nếu kiểu dữ liệu (gethui) == "function" thì
            local okH, gotH = pcall(gethui)
            nếu okH và gotH thì hui = gotH kết thúc
        kết thúc
        ext.Parent = hui
    kết thúc
    trả về phần mở rộng
kết thúc

local extGui = nil -- Lớp phủ ScreenGui ngoài màn hình (có thể tạo khi bật tính năng)
local extCrossOn = false
hàm cục bộ bcToggleCross()
    nếu không phải extGui thì trả về end
    extCrossOn = không phải extCrossOn
    local ring = extGui:FindFirstChild("BC_Ring")
    local dot = extGui:FindFirstChild("BC_Dot")
    if ring then ring.Visible = extCrossOn end
    if dot then dot.Visible = extCrossOn end
    pcall(function()
        nếu _G.BananaCatHubAPI và _G.BananaCatHubAPI.Crosshair thì
        kết thúc
    kết thúc)
kết thúc

local bcCrossBtn = bcButton("🎯 Niêm tâm: TẮT", Color3.fromRGB(160, 60, 255))

pcall(function()
    nếu _G.BananaCatHubAPI và _G.BananaCatHubAPI.OnResize thì
    kết thúc
kết thúc)

]==]
    chân cục bộ = [==[
-- ---------- đóng / trả GUI (KHÔNG xóa khối này) ----------------------------
local bcEnabled = false
local bcConns = {}
hàm cục bộ bcOn(inst, sig, fn)
    table.insert(bcConns, inst[sig]:Connect(fn))
kết thúc

hàm cục bộ bcClose()
    if bcConn then pcall(function() bcConn:Disconnect() end) bcConn = nil end
    for _, c in ipairs(bcConns) do pcall(function() c:Disconnect() end) end
    for i = #bcConns, 1, -1 do bcConns[i] = nil end
    bcEnabled = false
    pcall(function() gui.Enabled = false end)
    task.delay(0.06, function() pcall(function() gui:Destroy() end) end)
kết thúc
bcOn(closeBtn, "MouseButton1Click", bcClose)

_G.BC_FEATURES = _G.BC_FEATURES hoặc {}
_G.BC_FEATURES[BC.Name] = { name = BC.Name, Close = bcClose, Gui = gui, Root = root }

bcOn(bcCrossBtn, "MouseButton1Click", function()
    nếu không được bật thì
        bcToggle:Activate()
        task.wait(0.1)
    kết thúc
    bcToggleCross()
    bcCrossBtn.Text = extCrossOn và "🎯 Niêm tâm: BẬT" hoặc "🎯 Niêm tâm: TẮT"
kết thúc)

bcOn(bcToggle, "MouseButton1Click", function()
    bcEnabled = không bcEnabled
    bcToggle.Text = (bcEnabled and "⏹ " or BC.Icon .. " ") .. BC.Name
    bcStatus.Text = bcEnabled và "Đang chạy..." hoặc "Tắt"
    nếu bcEnabled thì
        nếu không phải extGui hoặc không phải extGui.Parent thì
            extGui = bcMakeExternalGui(BC.Name .. "_Ext", 9500)

            local ring = Instance.new("Frame")
            ring.Name = "BC_Ring"
            ring.Size = UDim2.new(0, 32, 0, 32)
            ring.Position = UDim2.new(0.5, -16, 0.5, -16)
            ring.BackgroundTransparency = 1
            ring.BorderSizePixel = 0
            ring.AnchorPoint = Vector2.new(0.5, 0.5)
            ring.Visible = false
            ring.Parent = extGui
            local rc = Instance.new("UICorner"); rc.CornerRadius = UDim.new(1, 0); rc.Parent = ring
            local rs = Instance.new("UIStroke"); rs.Thickness = 1.5; rs.Color = Color3.fromRGB(255,255,255); rs.Parent = ring

            local dot = Instance.new("Frame")
            dot.Name = "BC_Dot"
            dot.Size = UDim2.new(0, 3, 0, 3)
            dot.Position = UDim2.new(0.5, -2, 0.5, -2)
            dot.BackgroundColor3 = Color3.fromRGB(255,255,255)
            dot.BorderSizePixel = 0
            dot.AnchorPoint = Vector2.new(0.5, 0.5)
            chấm.Visible = false
            dot.Parent = extGui
            local dc = Instance.new("UICorner"); dc.CornerRadius = UDim.new(1, 0); dc.Parent = dot

            khoảng cách cục bộ, ll = 22, 10
            hàm cục bộ ln(w, h, x, y)
                local f = Instance.new("Frame")
                f.Size = UDim2.new(0,w,0,h); f.Position = UDim2.new(0.5,x,0.5,y)
                f.BackgroundColor3 = Color3.fromRGB(255,255,255); f.BorderSizePixel = 0
                f.AnchorPoint = Vector2.new(0.5,0.5); f.BackgroundTransparency = 0.2
                f.Name = "BC_Line"; f.Parent = extGui
            kết thúc
            ln(2, ll, -1, -gap - ll/2)
            ln(2, ll, -1, gap + ll/2)
            ln(ll, 2, -gap - ll/2, -1)
            ln(ll, 2, gap + ll/2, -1)
        kết thúc

        table.insert(bcConns, task.spawn(function()
            trong khi bcEnabled thực hiện
                task.wait(0.2)
                pcall(function()
                kết thúc)
            kết thúc
        kết thúc))
    khác
        extCrossOn = false
        pcall(function() if extGui then extGui:Destroy() end end)
        extGui = nil
        bcCrossBtn.Text = "🎯 Niêm tâm: BẮT ĐẦU"
    kết thúc
kết thúc)

print(" ✅ [" .. BC.Name .. "] đã tải — dán vào tab \"Tạo Tính Năng\" của taodepzai v5.0 NOIR rồi nhấn vào ► Chạy Script")
Trả về BC.Name
]==]
    đầu ra cục bộ = đầu .. thân .. chân
    out = (out:gsub("__BC_NAME__", function() return nm end))
    out = (out:gsub("__BC_ICON__", function() return icon end))
    out = (out:gsub("__BC_STAMP__", function() return (#stamp > 0) and stamp or "sinh bởi hub" end))
    trở lại
kết thúc

_G.BananaCatHub_SyncEmbeds = function()
    pcall(S.SyncAllEmbeds)
kết thúc
pcall(function()
    trackConn(main:GetPropertyChangedSignal("Size"):Connect(function()
        BcFit() -- GUI đang được nhúng trong tab -> đo & thu nhỏ lại
        pcall(S.NotifyResize) -- script ngoài (tự xin size) -> chạy lại bcFit của nó
    kết thúc))
kết thúc)

hàm S.SyncAllEmbeds()
    for _, e in ipairs(S.embeds) do
        nếu e.host và e.host.Parent thì
            pcall(function() S.FitEmbedded(e) end)
        kết thúc
    kết thúc
kết thúc

hàm S.ClearEmbedsUnder(containerFrame)
    nếu không phải containerFrame thì trả về 0.
    cục bộ n = 0
    for i = #S.embeds, 1, -1 do
        cục bộ e = S.embeds[i]
        nếu e.host và e.host.Parent == containerFrame thì
            S.RestoreEmbed(e)
            n ± 1
        kết thúc
    kết thúc
    for _, child in ipairs(containerFrame:GetChildren()) do
        nếu child.Name:sub(1, 9) == "Embedded_" thì
            pcall(function() child:Destroy() end)
        kết thúc
    kết thúc
    trả về n
kết thúc

hàm S.EmbedGui(scr, containerFrame)
    if not S.embedEnabled then return nil end
    if not scr or not scr.Parent then return nil end
    if not containerFrame or not containerFrame.Parent then return nil end
    if scr == gui or scr:IsDescendantOf(gui) then return nil end
    local isExt = false
    pcall(function() isExt = (scr:GetAttribute("BCHub_External") == true) end)
    nếu isExt thì trả về nil

    Tên máy chủ cục bộ = "Embedded_"..scr.Name
    for _, ex in ipairs(containerFrame:GetChildren()) do
        nếu ex.Name == hostName thì
            local e = S.FindEmbedByHost(ex)
            nếu e thì
                S.RestoreEmbed(e)
            khác
                pcall(function() ex:Destroy() end)
            kết thúc
        kết thúc
    kết thúc

    máy chủ cục bộ = New("Frame", {
        Kích thước = UDim2.new(1,0,1,0),
        Vị trí = UDim2.new(0,0,0,0),
        Độ trong suốt của nền = 1,
        BorderSizePixel = 0,
        Chỉ số Z = 5,
        Tên = hostName,
        ClipsDescendants = true,
    }, containerFrame)

    bản ghi cục bộ = {}
    for _, ch in ipairs(scr:GetChildren()) do
        nếu ch:IsA("GuiObject") thì
            recs[#recs+1] = {obj = ch, origParent = scr, origPosition = ch.Position, origSize = ch.Size}
        kết thúc
    kết thúc
    nếu #recs == 0 thì
        pcall(function() host:Destroy() end)
        trả về nil
    kết thúc
    for _, rec in ipairs(recs) do
        pcall(function() rec.obj.Parent = host end)
    kết thúc

    ForceStretchToParent(host) -- chỉ root (an toàn cho vài frame con)
    mục nhập cục bộ = S.RegisterEmbed(host, scr, recs)
    pcall(function() S.FitEmbedded(entry) end)
    task.delay(0.08, function() pcall(function() S.FitEmbedded(entry) end) end)
    task.delay(0.4, function() pcall(function() S.FitEmbedded(entry) end) end)
    máy chủ trả về
kết thúc

S.crosshairGui = nil
S.crosshairBtns = {} -- danh sách nút 🎯 trên các tab để cập nhật văn bản đồng loạt
S.crosshairOn = false
S.crosshairColor = Color3.fromRGB(255, 255, 255)
S.crosshairSize = 32

hàm S._buildCrosshair()
    if S.crosshairGui and S.crosshairGui.Parent then return S.crosshairGui end
    cục bộ g = New("ScreenGui", {
        Tên = "BananaCatHub_Crosshair",
        IgnoreGuiInset = true,
        ResetOnSpawn = false,
        ZIndexBehavior = Enum.ZIndexBehavior.Global,
        DisplayOrder = 9999,
    }, targetGui)
    g:SetAttribute("BCHub_External", true)

    vòng cục bộ = New("Khung", {
        Tên = "Nhẫn",
        Kích thước = UDim2.new(0, S.crosshairSize, 0, S.crosshairSize),
        Vị trí = UDim2.new(0.5, -S.crosshairSize/2, 0.5, -S.crosshairSize/2),
        Độ trong suốt của nền = 1,
        BorderSizePixel = 0,
        AnchorPoint = Vector2.new(0.5, 0.5),
    }, g)
    New("UICorner", {CornerRadius = UDim.new(1, 0)}, ring)
    New("UIStroke", {Thickness = 1.5, Color = S.crosshairColor, Transparency = 0.1}, ring)

    local dot = New("Frame", {
        Tên = "Dot",
        Kích thước = UDim2.new(0, 3, 0, 3),
        Vị trí = UDim2.new(0.5, -2, 0.5, -2),
        BackgroundColor3 = S.crosshairColor,
        BorderSizePixel = 0,
        AnchorPoint = Vector2.new(0.5, 0.5),
    }, g)
    New("UICorner", {CornerRadius = UDim.new(1, 0)}, dot)

    khoảng cách cục bộ = S.crosshairSize/2 + 6
    local lineLen = 10
    hàm cục bộ line(name, w, h, x, y)
        local ln = New("Frame", {
            Tên = tên, Kích thước = UDim2.new(0, w, 0, h),
            Vị trí = UDim2.new(0.5, x, 0.5, y),
            BackgroundColor3 = S.crosshairColor, BorderSizePixel = 0,
            AnchorPoint = Vector2.new(0.5, 0.5), BackgroundTransparency = 0.15,
        }, g)
        trả về ln
    kết thúc
    line("Top", 2, lineLen, -1, -gap - lineLen/2)
    line("Bottom", 2, lineLen, -1, gap + lineLen/2)
    line("Left", lineLen, 2, -gap - lineLen/2, -1)
    line("Phải", lineLen, 2, gap + lineLen/2, -1)

    S.crosshairGui = g
    trả lại g
kết thúc

hàm S.SetCrosshair(on)
    S.crosshairOn = (on == true)
    nếu S.crosshairOn thì
        S._buildCrosshair()
        if S.crosshairGui then S.crosshairGui.Enabled = true end
    khác
        if S.crosshairGui then S.crosshairGui.Enabled = false end
    kết thúc
    for _, b in ipairs(S.crosshairBtns) do
        pcall(function()
            nếu b và b.Cha thì
                b.Text = S.crosshairOn và "🎯 Tâm: BẬT" hoặc "🎯 Tâm"
                b.BackgroundColor3 = S.crosshairOn và Color3.fromRGB(180, 80, 220) hoặc C.PURPLE
            kết thúc
        kết thúc)
    kết thúc
kết thúc

hàm S.ToggleCrosshair()
    S.SetCrosshair(not S.crosshairOn)
    trả về S.crosshairOn
kết thúc

hàm S.RegisterCrosshairBtn(btn)
    nếu không phải btn thì trả về end
    table.insert(S.crosshairBtns, btn)
    pcall(function()
        btn.Text = S.crosshairOn và "🎯 Tâm: BẬT" hoặc "🎯 Tâm"
        btn.BackgroundColor3 = S.crosshairOn and Color3.fromRGB(180, 80, 220) or C.PURPLE
    kết thúc)
    btn.Activated:Connect(function()
        S.ToggleCrosshair()
    kết thúc)
kết thúc

S.EMBED_TRY_DELAYS = {0.6, 1.8, 4, 7, 10} -- các cột thử lại sau khi nhấn ▶
S.EMBED_HOOK_GRACE = 11 -- giữ hook + watcher đà bao nhiêu giây (bắt GUI sinh đẩu)
S.EMBED_PROBABLE_AGE = 5 -- GUI "không chắc chắn" tự động nhận chỉ nếu sinh trong 5 giây đầu
S.EMBED_CHILD_WAIT = 15 -- GUI chờ "chín" số lần (0,2s/lần = tối đa 3s)
S.activeHook = nil -- chỉ 1 hook sống tại 1 thời điểm (khác hook script đè)

S.SYSTEM_GUI_NAMES = {
    Thanh trên cùng = true, Khung chứa thanh trên cùng = true, Danh sách người chơi = true, Trò chuyện = true, Ba lô = true,
    DevConsoleUI = true, ScriptInvitationUI = true, FollowPromptUI = true,
    TouchControlsFrame = true, PauseMenu = true, CoreGui = true, ExMenu = true,
}
S.GENERIC_GUI_NAMES = { Main = true, InGame = true, Notifications = true }

hàm S.IsEmbeddable(g, containerFrame, trust)
    nếu không phải g thì trả về false, kết thúc "không có GUI"
    nếu không phải g.Parent thì trả về false, "GUI chưa có Parent (script chưa được gắn lên màn hình)" end
    if not (g:IsA("ScreenGui") or g:IsA("Folder")) then return false, "không phải ScreenGui/Folder" end
    if g == gui hoặc g:IsDescendantOf(gui) thì trả về false, "là GUI của hub chính" end
    if g.Name == "ExMenu" thì trả về false, "sử dụng tên GUI của hub (ExMenu)" end
    nếu S.SYSTEM_GUI_NAMES[g.Name] thì
        return false, "là GUI của game/hệ thống (" .. tostring(g.Name) .. ")"
    kết thúc
    nếu độ tin cậy ~= "certain" và độ tin cậy ~= "manual" và S.GENERIC_GUI_NAMES[g.Name] thì
        return false, "tên '" .. tostring(g.Name) .. "' hay là UI của game — bật 🕵 hoặc nhấn 🔁 để ép nhúng"
    kết thúc
    local isExt = false
    pcall(function() isExt = (g:GetAttribute("BCHub_External") == true) end)
    nếu isExt thì trả về false, "là lớp phủ ngoài màn hình (BCHub_External)" end
    if containerFrame and g:IsDescendantOf(containerFrame) then return false, " đã nằm trong tab rồi" end
    for _, e in ipairs(S.embeds) do
        if e.gui == g thì trả về false, "đã được nhúng ở tab khác" end
    kết thúc
    local hasChild = false
    for _, c in ipairs(g:GetChildren()) do
        if c:IsA("GuiObject") then hasChild = true break end
    kết thúc
    nếu không có hasChild thì trả về false, "chưa có frame con (script còn dựng GUI)" end
    trả về giá trị đúng
kết thúc

hàm S.HookInstanceNew()
    if S.activeHook thì pcall(S.activeHook) end -- gỡ hook lần chạy trước, tránh chồng chuỗi
    S.activeHook = nil

    bản ghi cục bộ = {}
    cục bộ st = {
        hooked = false, available = false, viaHookfunction = false,
        realNew = nil, ours = nil, origFromHook = nil,
        thăm dò = false, thăm dò đã thấy = false,
        inRun = true, GraceUntil = nil, t0 = os.clock(),
    }
    local myCo = coroutine.running()

    hàm cục bộ unhook()
        nếu không được móc nối thì trả về end
        st.hooked = false
        nếu st.viaHookfunction thì
            pcall(function()
                nếu kiểu của hookfunction là "function" và st.origFromHook thì
                    hookfunction(Instance.new, st.origFromHook)
                kết thúc
            kết thúc)
        khác
            pcall(function()
                if Instance.new == st.ours then Instance.new = st.realNew end
            kết thúc)
        kết thúc
        if S.activeHook == unhook then S.activeHook = nil end
    kết thúc

    hàm cục bộ recorder(cls, ...)
        local inst = st.realNew(cls, ...)
        nếu st.probing thì
            if cls == "ScreenGui" then st.probeSeen = true end
            trả lại inst
        kết thúc
        nếu st.hooked và cls == "ScreenGui" thì
            local now = os.clock()
            bản ghi[#bản ghi + 1] = {
                inst = inst,
                certain = (coroutine.running() == myCo),
                whileRun = (st.inRun == true) hoặc (st.graceUntil ~= nil và bây giờ là < st.graceUntil),
                tuổi = hiện tại - st.t0,
                nhúng = sai,
                qua = "móc",
            }
        kết thúc
        trả lại inst
    kết thúc

    pcall(function()
        st.realNew = Instance.new
        st.ours = máy ghi âm
        Instance.new = st.ours
        st.hooked = (Instance.new == st.ours)
    kết thúc)

    nếu st.hooked không phải là và kiểu của hookfunction là "function" thì
        pcall(function()
            st.ours = máy ghi âm
            st.origFromHook = hookfunction(Instance.new, st.ours)
            if st.origFromHook then st.realNew = st.origFromHook end
            st.hooked = true
            st.viaHookfunction = true
        kết thúc)
    kết thúc

    nếu st.hooked thì
        pcall(function()
            st.probing, st.probeSeen = true, false
            local thăm dò = Instance.new("ScreenGui") -- không gắn kết Parent, hủy bỏ ngay
            st.probing = false
            st.available = (st.probeSeen == true)
            if probe and probe.Destroy then pcall(function() probe:Destroy() end) end
        kết thúc)
        nếu không có sẵn thì
            pcall(unhook)
        kết thúc
    kết thúc

    S.activeHook = unhook
    trả lại móc, ghi âm, st
kết thúc

hàm S.WatchNewGuis(records, st)
    kết nối cục bộ = {}
    hàm cục bộ đã có(g)
        for _, r in ipairs(records) do if r.inst == g then return true end end
        trả về false
    kết thúc
    hàm cục bộ makeHandler()
        trả về hàm (con)
            if st.watchOn == false then return end
            nếu không phải là con thì trả về end
            local okType, isGui = pcall(function()
                trả về child:IsA("ScreenGui") hoặc child:IsA("Folder")
            kết thúc)
            nếu không (okType và isGui) thì trả về end
            if child == gui or already(child) then return end
            local now = os.clock()
            bản ghi[#bản ghi + 1] = {
                inst = con,
                chắc chắn = sai,
                whileRun = (st.inRun == true) hoặc (st.graceUntil ~= nil và bây giờ là < st.graceUntil),
                tuổi = hiện tại - st.t0,
                nhúng = sai,
                qua = "xem",
            }
        kết thúc
    kết thúc
    local seenCtn, containers = {}, {playerGui, targetGui}
    pcall(function()
        local cg = game:GetService("CoreGui")
        nếu cg thì containers[#containers + 1] = cg end
    kết thúc)
    for _, ctn in ipairs(containers) do
        nếu ctn và không thấyCtn[ctn] thì
            seenCtn[ctn] = true
            pcall(function()
                conns[#conns + 1] = ctn.ChildAdded:Connect(makeHandler())
            kết thúc)
        kết thúc
    kết thúc
    st.watchOn = true
    hàm cục bộ stopWatch()
        st.watchOn = false
        for _, c in ipairs(conns) do pcall(function() c:Disconnect() end) end
    kết thúc
    trả về đồng hồ bấm giờ, conns
kết thúc

hàm S.EmbedRecorded(records, containerFrame, mode, verbose)
    if type(records) ~= "table" or #records == 0 then return 0, nil end
    if not containerFrame or not containerFrame.Parent then return 0, "tab đã bị đóng" end
    if not S.embedEnabled then return 0, "🧩 nhúng đang TẮT" end
    chế độ = chế độ hoặc "chạy"

    thứ tự cục bộ = {}
    for _, r in ipairs(records) do
        nếu r và r.inst và không r.embedded thì order[#order + 1] = r end
    kết thúc
    điểm chức năng cục bộ (r)
        nếu r.certain thì trả về 3 end
        if r.duringRun then return 2 end
        trả về 1
    kết thúc
    table.sort(order, function(a, b) return score(a) > score(b) end)

    cục bộ đã xong, whyTop = 0, nil
    for _, r in ipairs(order) do
        chấp nhận cục bộ = false
        nếu mode == "all" thì
            chấp nhận = đúng
        nếu r.certain thì
            chấp nhận = đúng
        elseif r.duringRun and mode ~= "strict" then
            chấp nhận = đúng
        elseif mode == "any" and (r.age or 0) <= S.EMBED_PROBABLE_AGE then
            chấp nhận = đúng
        kết thúc
        nếu chấp nhận thì
            quỹ tín thác địa phương
            Nếu r.certain thì trust = "certain"
            elseif r.duringRun or mode == "all" then trust = "manual"
            Ngược lại, tin tưởng = "đoán" kết thúc
            local okE, why = S.IsEmbeddable(r.inst, containerFrame, trust)
            nếu okE thì
                nếu S.EmbedGui(r.inst, containerFrame) thì
                    r.embedded = true
                    r.why = nil
                    đã hoàn thành += 1
                khác
                    r.why = "S.EmbedGui từ chối"
                    whyTop = r.why
                kết thúc
            khác
                r.why = why
                nếu tại sao thì whyTop = why end
                nếu chi tiết và không được báo cáo thì
                    r.reported = true
                    pcall(function()
                        print(string.format("[taodepzai v5.0 NOIR] 🔍 bỏ qua GUI '%s' (%s, %s): %s",
                            tostring(r.inst and r.inst.Name), tostring(r.via), trust, tostring(why)))
                    kết thúc)
                kết thúc
            kết thúc
        kết thúc
    kết thúc
    Trả về đã xong, tại sao?
kết thúc

hàm S.FindFeatureByHost(host)
    nếu không phải là máy chủ thì trả về nil.
    for _, ft in ipairs(featureTabs) do
        if ft.frame and ft.frame.Parent and ft.frame:FindFirstChild("ScriptHost") == host then return ft end
    kết thúc
    trả về nil
kết thúc

hàm S.FindActiveFeature()
    for _, ft in ipairs(featureTabs) do
        if ft.frame == activeTab then return ft end
    kết thúc
    trả về nil
kết thúc

hàm S.DiagText(st, records)
    local hookTxt = "Không rõ"
    nếu st thì
        nếu st.available thì
            hookTxt = st.viaHookfunction and "OK (qua hookfunction)" or "OK ​​(ghi ngo Instance.new)"
        nếu st.hooked thì
            hookTxt = "cài được nhưng KHÔNG ăn (người thực hiện bỏ qua hook)"
        khác
            hookTxt = "BỊ CHẶN (người thực thi không cho sửa Instance.new)"
        kết thúc
    kết thúc
    cục bộ n, chắc chắn, theo dõi, quét = 0, 0, 0, 0
    for _, r in ipairs(records or {}) do
        n ± 1
        nếu r.certain thì certain += 1 end
        if r.via == "watch" then watch += 1 end
        if r.via == "scan" then scan += 1 end
    kết thúc
    local lastWhy = nil
    for _, r in ipairs(records or {}) do if r.why then lastWhy = r.why end end
    return string.format("hook=%s · ghi nhận %d GUI (chắc chắn %d, watcher %d, quét %d) · nhúng=%s · lý do cuối cùng: %s",
        hookTxt, n, certain, watch, scan, tostring(S.embedEnabled and "BẬT" or "TẮT"), tostring(lastWhy or "—"))
kết thúc

hàm S.RescueScan(ft, host)
    host = host or (ft and ft.frame and ft.frame:FindFirstChild("ScriptHost"))
    nếu không phải là máy chủ hoặc không phải là máy chủ cha thì trả về 0.
    if not S.embedEnabled then return 0 end
    các container cục bộ = {playerGui}
    if targetGui ~= playerGui then containers[#containers + 1] = targetGui end
    pcall(function()
        local cg = game:GetService("CoreGui")
        nếu cg thì containers[#containers + 1] = cg end
    kết thúc)
    cục bộ được nhìn thấy, n = {}, 0
    for _, ctn in ipairs(containers) do
        pcall(function()
            for _, g in ipairs(ctn:GetChildren()) do
                nếu n < 3 và không được nhìn thấy[g] thì
                    đã thấy[g] = đúng
                    local okE = S.IsEmbeddable(g, host, "manual")
                    nếu okE và S.EmbedGui(g, host) thì
                        n ± 1
                        nếu ft thì
                            ft.records = ft.records hoặc {}
                            ft.records[#ft.records + 1] =
                                {inst = g, certain = false, duringRun = true, age = 0, embedded = true, via = "rescue"}
                        kết thúc
                    kết thúc
                kết thúc
            kết thúc
        kết thúc)
        nếu n >= 3 thì thoát
    kết thúc
    trả về n
kết thúc

hàm S.ReembedFeature(ft, allowScan)
    if not ft or not ft.frame or not ft.frame.Parent then return 0, "tab không còn tồn tại" end
    if not S.embedEnabled then return 0, "🧩 nhúng đang TẮT" end
    máy chủ cục bộ = ft.frame:FindFirstChild("ScriptHost")
    if not host then return 0, "tab lack ScriptHost" end
    for _, e in ipairs(S.embeds) do
        nếu e.host và e.host.Parent == hosting thì trả về 0, "tab đã có sẵn GUI nhúng" end
    kết thúc
    local n, why = S.EmbedRecorded(ft.records, host, "all", true)
    nếu n > 0 thì trả về n
    nếu allowScan == true thì
        cục bộ m = S.RescueScan(ft, host)
        nếu m > 0 thì trả về m
        tại sao = "không tìm thấy GUI nào ngoài menu để nhúng"
    kết thúc
    Nếu không thì tại sao?
        tại sao = (số bản ghi ft và số bản ghi ft > 0)
            và (ft.last Why hoặc "GUI chưa sẵn sàng để nhúng")
            hoặc "không ghi được GUI nào (tập lệnh có tạo ScreenGui không?)"
    kết thúc
    trả về 0, tại sao?
kết thúc

hàm S.OnFeatureTabOpened(ft)
    if not ft or not ft.frame or not ft.frame.Parent then return end
    local n = S.ReembedFeature(ft, false)
    nếu n > 0 thì
        pcall(function()
            nếu ft.status và ft.status.Parent thì
                ft.status.Text = string.format(
                    "# vừa tải lại %d GUI vào tab (một lần trước đó bị rớt ngoài menu) — nhấn ✕ để trả về trò chơi", n)
            kết thúc
            if ft.indicator and ft.indicator.Parent then ft.indicator.BackgroundColor3 = C.GREEN end
        kết thúc)
    kết thúc
kết thúc

S.parkTab = nil
S.parkBtn = nil
S.parkList = nil
S.parkCount = 0
S.PARK_MAX = 2 -- mỗi lần chạy chỉ đưa ra tối đa 2 GUI vào menu (tránh cả giao diện người dùng của trò chơi)

hàm S.ParkHost(nhãn)
    nếu không (S.parkList và S.parkList.Parent) thì
        sf cục bộ, btn = AddTab("GUI Ngoài", "🧩", 99)
        S.parkTab, S.parkBtn = sf, btn
        Mới("TextLabel", {
            Kích thước = UDim2.new(1, -140, 0, 30), Vị trí = UDim2.new(0, 8, 0, 4),
            Text = "🧩 GUI chạy tập lệnh ở tab 💻 Tạo mã ra — trung tâm đưa vào đây. Bấm ↩ để trả về màn hình trò chơi. (Dex/IY/SimpleSpy KHÔNG bao giờ vào đây.)",
            BackgroundTransparency = 1, TextColor3 = C.DARK, Font = Enum.Font.GothamMedium,
            Kích thước văn bản = 10, Ngắt dòng văn bản = true, Chỉ số Z = 6,
            TextXAlignment = Enum.TextXAlignment.Left,
        }, S.parkTab)
        local backAll = New("TextButton", {
            Kích thước = UDim2.new(0, 124, 0, 24), Vị trí = UDim2.new(1, -128, 0, 6),
            Text = "↩ Trả tất cả về game", BackgroundColor3 = C.RED, BackgroundTransparency = 0.15,
            TextColor3 = C.WHITE, Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 7,
        }, S.parkTab)
        Góc(backAll, UDim.new(0, 5))
        backAll.Activated:Connect(function()
            local n = S.RemoveAllParked()
            pcall(function()
                print("[taodepzai v5.0 NOIR] ↩ đã trả " .. n .. " GUI về màn hình game")
            kết thúc)
        kết thúc)
        S.parkList = New("Frame", {
            Tên = "ParkList", Kích thước = UDim2.new(1, -16, 1, -42), Vị trí = UDim2.new(0, 8, 0, 38),
            BackgroundTransparency = 1, BorderSizePixel = 0, ZIndex = 5,
        }, S.parkTab)
        New("UIListLayout", {Padding = UDim.new(0, 6), SortOrder = Enum.SortOrder.LayoutOrder}, S.parkList)
    kết thúc

    S.parkCount += 1
    hộp cục bộ = New("Khung", {
        Tên = "ParkBox_" .. tostring(label hoặc "GUI"),
        Kích thước = UDim2.new(1, 0, 0, 240), Thứ tự bố trí = S.parkCount,
        BackgroundColor3 = C.BG, BackgroundTransparency = 0.35, BorderSizePixel = 0, ZIndex = 5,
    }, S.parkList)
    Góc(hộp, UDim.new(0, 8))
    Stroke(box, nil, 1)

    cục bộ back = New("TextButton", {
        Kích thước = UDim2.new(0, 110, 0, 20), Vị trí = UDim2.new(1, -114, 0, 2),
        Text = "↩ Trả về game", BackgroundColor3 = C.GRAY, BackgroundTransparency = 0.2,
        TextColor3 = C.WHITE, Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 7,
    }, hộp)
    Góc(phía sau, UDim.new(0, 5))
    trở lại.Đã kích hoạt:Kết nối(function()
        S.ClearEmbedsUnder(box) -- return frame con về ScreenGui gốc + abort hosting
        pcall(function() box:Destroy() end)
        S.parkCount = math.max(0, S.parkCount - 1)
        pcall(function() S.parkTab.CanvasSize = UDim2.new(0, 0, 0, S.parkCount * 246 + 10) end)
        pcall(function()
            Nếu S.parkBtn thì S.parkBtn.Text = S.parkCount > 0
                và ("🧩 GUI Ngoài (" .. S.parkCount .. ")") hoặc "🧩 GUI Ngoài" cuối
        kết thúc)
    kết thúc)

    khu vực cục bộ = Mới("Khung", {
        Tên = "ParkArea", Kích thước = UDim2.new(1, -8, 1, -30), Vị trí = UDim2.new(0, 4, 0, 26),
        BackgroundTransparency = 1, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 5,
    }, hộp)
    pcall(function() S.parkTab.CanvasSize = UDim2.new(0, 0, 0, S.parkCount * 246 + 10) end)
    pcall(function()
        if S.parkBtn then S.parkBtn.Text = "🧩 GUI Ngoài (" .. S.parkCount .. ")" end
    kết thúc)
    khu vực trả hàng, hộp
kết thúc

S.NO_PARK_MARKERS = {
    "dex.lua", "dex explorer", "dexexplorer", "infiniteyield", "infinite yield",
    "Điệp viên đơn giản", "gián điệp đơn giản",
}
hàm S.ShouldSkipPark(code, name)
    local hay = (tostring(code or "") .. "\n" .. tostring(name or "")):lower()
    for _, m in ipairs(S.NO_PARK_MARKERS) do
        if hay:find(m, 1, true) then return true, m end
    kết thúc
    local code_l = tostring(code or ""):lower()
    local hasFetch = code_l:find("httpget", 1, true) or code_l:find("http_request", 1, true)
        hoặc code_l:find("request(", 1, true) hoặc code_l:find("https://", 1, true)
        hoặc code_l:find("http://", 1, true)
    nếu hasFetch và (code_l:find("loadstring", 1, true) hoặc code_l:find("load(", 1, true)) thì
        return true, "tải tập lệnh từ mạng (sang GUI ngoài màn hình như thiết kế tác giả)"
    kết thúc
    trả về false, nil
kết thúc

hàm S.RemoveAllParked()
    if not (S.parkList and S.parkList.Parent) then return 0 end
    cục bộ n = 0
    trẻ em địa phương = S.parkList:GetChildren()
    for i = #kids, 1, -1 do
        hộp cục bộ = trẻ em[i]
        nếu box.Name:sub(1, 8) == "ParkBox_" thì
            S.ClearEmbedsUnder(box)
            pcall(function() box:Destroy() end)
            n ± 1
        kết thúc
    kết thúc
    S.parkCount = 0
    pcall(function() S.parkTab.CanvasSize = UDim2.new(0, 0, 0, 10) end)
    pcall(function() if S.parkBtn then S.parkBtn.Text = "🧩 GUI Bên" end end)
    trả về n
kết thúc

hàm S.BeginRunCapture()
    if not S.embedEnabled then return nil end
    if S.parkCodeGuis == false then return nil end
    cục bộ ok, cap = pcall(function()
        local unhook, recs, st = S.HookInstanceNew()
        local stopWatch = S.WatchNewGuis(recs, st)
        st.stopWatch = đồng hồ bấm giờ
        return {unhook = unhook, recs = recs, st = st, stopWatch = stopWatch,
            đã đỗ xe = 0, tên = {}, đã hủy = false}
    kết thúc)
    Nếu không ổn thì trả về nil.
    S.activeCap = cap -- để Cancel() được gỡ bỏ hook+watcher nếu người dùng nhấn ⏹ Dừng giữa chừng
    nắp trả lại
kết thúc

hàm S.AbortRunCapture()
    giới hạn cục bộ = S.activeCap
    nếu không phải là cap thì trả về false end
    S.activeCap = nil
    cap.cancelled = true
    pcall(function() if cap.st then cap.st.watchOn = false cap.st.inRun = false end end)
    pcall(cap.stopWatch)
    pcall(cap.unhook)
    trả về giá trị đúng
kết thúc

hàm S.EndRunCapture(cap, label)
    if not cap or cap.cancelled then return 0 end
    local st, recs = cap.st, cap.recs
    pcall(function()
        st.inRun = false
        st.graceUntil = os.clock() + 1.0
    kết thúc)

    hàm cục bộ try()
        if cap.cancelled or cap.parked >= S.PARK_MAX or not S.embedEnabled then return 0 end
        cục bộ được thêm vào = 0
        for _, r in ipairs(recs) do
            nếu cap.parked >= S.PARK_MAX thì dừng lại.
            nếu r và r.inst và không phải r.embedded thì
                quỹ tín thác địa phương
                Nếu r.certain thì trust = "certain"
                elseif r.duringRun then trust = "manual"
                Ngược lại, tin tưởng = "đoán" kết thúc
                nếu S.IsEmbeddable(r.inst, nil, trust) thì
                    khu vực địa phương, hộp = S.ParkHost(nhãn)
                    nếu area và S.EmbedGui(r.inst, area) thì
                        r.embedded = true
                        cap.parked += 1
                        cap.names[#cap.names + 1] = tostring(r.inst.Name)
                        đã thêm ± 1
                        pcall(function()
                            print(string.format("[taodepzai v5.0 NOIR] 🧩 đã đưa GUI '%s' vào tab 'GUI Ngoài' (tập lệnh chạy ở tab Code)",
                                tostring(r.inst.Name)))
                        kết thúc)
                    nếu hộp thì
                        pcall(function() box:Destroy() end) -- không được nhúng -> do để ô trống
                        S.parkCount = math.max(0, S.parkCount - 1)
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
        trả lại đã thêm
    kết thúc

    tổng cục bộ = thử()
    for _, d in ipairs(S.EMBED_TRY_DELAYS) do
        task.delay(d, function()
            nếu cap.cancelled hoặc cap.parked >= S.PARK_MAX thì trả về end
            nếu không phải S.embedEnabled thì trả về end
            thử()
        kết thúc)
    kết thúc
    task.delay(S.EMBED_HOOK_GRACE, function()
        pcall(cap.unhook)
        pcall(cap.stopWatch)
        if S.activeCap == cap then S.activeCap = nil end
    kết thúc)
    pcall(function()
        print("[taodepzai v5.0 NOIR] ► tab Code · " .. S.DiagText(st, recs) .. " · đã đưa vào menu: " .. cap.parked)
    kết thúc)
    tổng số tiền hoàn trả
kết thúc

hàm cục bộ RunFeatureScript(code, name, containerFrame, indicator, statusLabel)
    nếu #code == 0 thì
        nếu statusLabel thì statusLabel.Text = "⚠️ Vui lòng nhập mã!" kết thúc
        trả về false, "rỗng"
    kết thúc

    mã = Chuẩn hóa mã(mã)
    S.EnsureCompat() -- v4.7: tab ➕ Tính Năng cũng được bù đắp thiếu chức năng thi hành

    nếu chỉ báo thì indicator.BackgroundColor3 = C.RED
    if statusLabel then statusLabel.Text = "⏳ Đang thực thi..." end
    ReleaseHubFocus() -- v4.4b: đang dán code trong TextBox mà chạy luôn thì game vẫn "khóa" input

    local ft = S.FindFeatureByHost(containerFrame)
    local runToken = nil
    nếu ft thì
        ft._runToken = (tonumber(ft._runToken) or 0) + 1
        runToken = ft._runToken
        ft.records = nil -- lần chạy mới -> bỏ danh sách GUI của lần chạy cũ
    kết thúc

    local embedCount, lateCandidate = 0, 0
    local featureUnhook, records, lastWhy, hookState = nil, nil, nil, nil
    cục bộ ok, err = pcall(function()
        local fn, lerr = loadstring(code)
        if not fn then error("loadstring thất bại: "..tostring(lerr)) end

        cục bộ beforeGuis = {}
        for _, g in ipairs(playerGui:GetChildren()) do beforeGuis[g] = true end
        for _, g in ipairs(targetGui:GetChildren()) do beforeGuis[g] = true end
        pcall(function()
            for _, g in ipairs(game:GetService("CoreGui"):GetChildren()) do beforeGuis[g] = true end
        kết thúc)

        local unhook, recs, st = S.HookInstanceNew()
        local stopWatch = S.WatchNewGuis(recs, st)
        st.stopWatch = đồng hồ bấm giờ
        featureUnhook, record, hookState = unhook, recs, st
        if ft then ft.records = recs ft.hookState = st end

        cục bộ fnOk, fnErr = pcall(fn)

        st.inRun = false
        st.graceUntil = os.clock() + 1.0

        local hookWorks = (st.available == true)
        local useScan = (not hookWorks) or (S.embedGuessNew == true)
        chế độ cục bộ = (S.embedGuessNew == true) và "bất kỳ" hoặc "chạy"

        for i = 1, S.EMBED_CHILD_WAIT do
            nếu sử dụng quét thì
                local found = ScanNewGuis(beforeGuis, nil, true)
                for _, g in ipairs(found) do
                    local now = os.clock()
                    recs[#recs + 1] = {
                        inst = g, certain = false,
                        duringRun = (st.inRun == true) or (now < (st.graceUntil or 0)),
                        tuổi = hiện tại - st.t0, nhúng = false, thông qua = "quét",
                    }
                kết thúc
            kết thúc
            local d, why = S.EmbedRecorded(recs, containerFrame, useScan and "any" or mode, true)
            embedCount += d
            nếu tại sao thì lastWhy = tại sao kết thúc
            nếu embedCount > 0 thì thoát
            task.wait(0.2)
        kết thúc

        nếu embedCount > 0 thì
            unhook()
            pcall(stopWatch)
        khác
            task.delay(S.EMBED_HOOK_GRACE, function() pcall(unhook) pcall(stopWatch) end)
        kết thúc

        nếu không phải fnOk thì báo lỗi (fnErr) kết thúc

        for _, dly in ipairs(S.EMBED_TRY_DELAYS) do
            task.delay(dly, function()
                if ft and ft._runToken ~= runToken then return end
                nếu embedCount > 0 thì trả về end
                if not (containerFrame and containerFrame.Parent) then return end
                nếu không phải S.embedEnabled thì trả về end
                nếu sử dụng quét thì
                    local found = ScanNewGuis(beforeGuis, nil, true)
                    for _, g in ipairs(found) do
                        local now = os.clock()
                        recs[#recs + 1] = {
                            inst = g, certain = false, duringRun = false,
                            tuổi = hiện tại - st.t0, nhúng = false, thông qua = "quét",
                        }
                    kết thúc
                kết thúc
                local more = S.EmbedRecorded(recs, containerFrame, "any", true)
                nếu lớn hơn 0 thì
                    embedCount += more
                    pcall(function()
                        if indicator and indicator.Parent then indicator.BackgroundColor3 = C.GREEN end
                        nếu statusLabel và statusLabel.Parent thì
                            statusLabel.Text = string.format(
                                " ✅ xong · GUI sinh học đã được nhúng vào tab (%d) — nhấn ✕ để trả về màn hình trò chơi",
                                embedCount)
                        kết thúc
                    kết thúc)
                kết thúc
            kết thúc)
        kết thúc

        nếu embedCount == 0 thì
            local late = ScanNewGuis(beforeGuis, nil, true)
            thực cục bộ = 0
            for _, g in ipairs(late) do
                if g.Parent and not g:IsDescendantOf(containerFrame) then real += 1 end
            kết thúc
            nếu real > 0 thì lateCandidate = real end
        kết thúc
    kết thúc)

    nếu embedCount > 0 thì
        if featureUnhook then pcall(featureUnhook) end
        pcall(function() nếu hookState và hookState.stopWatch thì kết thúc hookState.stopWatch())
    kết thúc
    nếu ft thì
        ft.records = record -- giữ lại để MỞ tab / press 🔁 được nhúng tiếp theo
        ft.lastWhy = lastWhy
        ft.indicator = chỉ báo
        ft.hookState = hookState
    kết thúc
    pcall(function()
        print("[taodepzai v5.0 NOIR] ▶ '" .. tostring(name) .. "' · " .. S.DiagText(hookState, records)
            .. " · đã nhúng: " .. embedCount)
    kết thúc)

    nếu được thì
        nếu chỉ báo thì indicator.BackgroundColor3 = C.GREEN
        nếu statusLabel thì
            nếu embedCount > 0 thì
                statusLabel.Text = string.format(
                    " ✅ xong · %d GUI đã được nhúng vào tab (bấm ✕ để trả về màn hình trò chơi)", embedCount)
            nếu không phải S.embedEnabled thì
                statusLabel.Text = " ✅ xong · 🧩 nhúng đang TẮT, GUI nằm ngoài màn hình — BẬT lại rồi nhấn ►"
            nếu hookState và hookState.available ~= true thì
                statusLabel.Text = "⚠️ Executor CHẶN hook Instance.new — hub đã sử dụng chế độ quét dự phòng"
                    .. (lateCandidate > 0 and (" (thấy " .. LateCandidate .. " GUI mới)") hoặc " (không tìm thấy GUI mới nào)")
                    .. " · nhấn 🔁 'Cứu GUI' ở tab Tạo Tính Năng để ép nhúng · chi tiết ở console (F9)"
            nếu lateCandidate > 0 thì
                statusLabel.Text = string.format(
                    " ✅ xong · đã tìm thấy %d mới GUI nhưng chưa được nhúng — MỞ lại tab này hoặc nhấn 🔁 'Cứu GUI'%s",
                    LateCandidate, (S.embedGuessNew == true) và "" hoặc " · hoặc bật 🕵 'Đoán GUI đ'")
            khác
                statusLabel.Text = " ✅ xong · không tìm thấy tập lệnh tạo GUI nào (tập lệnh có tạo ScreenGui không?)"
                    .. (lastWhy và (" · lý do: " .. tostring(lastWhy)) hoặc "")
            kết thúc
        kết thúc
        trả về true, nil, records
    khác
        nếu chỉ báo thì indicator.BackgroundColor3 = C.RED
        if statusLabel then statusLabel.Text = "❌ Lỗi: "..tostring(err) end
        cảnh báo("[taodepzai v5.0 NOIR] Lỗi kịch bản tính năng:", err)
        trả về false, lỗi, bản ghi
    kết thúc
kết thúc
hàm cục bộ CreateFeatureTab(name, icon, codeContent)
    if not name or #name == 0 then name = "Tính Năng " .. (#featureTabs + 1) end
    if not icon or #icon == 0 then icon = "⚙️" end

    codeContent = NormalizeCode(codeContent)

    dữ liệu tính năng cục bộ

    local sf = MakeTabFrame()
    local btn = MakeTabButton(name, icon, featureTabIndex + #featureTabs, function()
        task.defer(function() S.OnFeatureTabOpened(featureData) end)
    kết thúc)

    table.insert(tabs, btn)
    table.insert(tabContent, sf)
    tabBar.CanvasSize = UDim2.new(0, 0, 0, #tabs * 44 + 10)

    local tabIdx = #tabs

    featureData = {
        tên = tên,
        biểu tượng = biểu tượng,
        mã = nội dung mã,
        nút = nút,
        khung = sf,
        tabIdx = tabIdx,
    }
    table.insert(featureTabs, featureData)

    local embedHost = New("Frame", {
        Kích thước = UDim2.new(1,0,1,-36),
        Vị trí = UDim2.new(0,0,0,0),
        Độ trong suốt của nền = 1,
        BorderSizePixel = 0,
        Chỉ số Z = 5,
        Tên = "ScriptHost",
        Hiển thị = đúng,
    }, sf)
    featureData.hostFrame = embedhost -- v4.4g

    thanh công cụ cục bộ = Mới("Khung", {
        Kích thước = UDim2.new(1,0,0,36),
        Vị trí = UDim2.new(0,0,1,-36),
        BackgroundColor3 = Color3.fromRGB(230,233,242),
        Độ trong suốt của nền = 0.1,
        BorderSizePixel = 0,
        Chỉ số Z = 20,
    }, sf)
    Góc(thanh công cụ, UDim.new(0,6))
    Stroke(toolbar, Color3.fromRGB(180,185,200), 1)

    local runFeatureBtn = New("TextButton", {
        Kích thước=UDim2.new(0,90,0,26), Vị trí=UDim2.new(0,6,0,5),
        Văn bản="▶ Chạy Script", Màu nền 3=XANH LÁ CÂY, Độ trong suốt nền=0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=21,
    }, thanh công cụ)
    Góc(runFeatureBtn, UDim.new(0,5))

    local saveFeatureBtn = New("TextButton", {
        Kích thước=UDim2.new(0,84,0,26), Vị trí=UDim2.new(0,100,0,5),
        Văn bản="📤 Mã giảm giá", Màu nền 3 = Xanh lam, Độ trong suốt nền = 0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=21,
    }, thanh công cụ)
    Góc(saveFeatureBtn, UDim.new(0,5))

    local editFeatureBtn = New("TextButton", {
        Kích thước=UDim2.new(0,52,0,26), Vị trí=UDim2.new(0,188,0,5),
        Văn bản="✏️ Sửa", Màu nền 3 = Cam, Độ trong suốt nền = 0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=21,
    }, thanh công cụ)
    Góc(editFeatureBtn, UDim.new(0,5))

    local crosshairBtn = New("TextButton", {
        Kích thước=UDim2.new(0,68,0,26), Vị trí=UDim2.new(0,244,0,5),
        Văn bản="🎯 Tâm", Màu nền 3=Tím nhạt, Độ trong suốt nền=0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=21,
    }, thanh công cụ)
    Góc(crosshairBtn, UDim.new(0,5))
    S.RegisterCrosshairBtn(crosshairBtn)

    local closeFeatureBtn = Mới("TextButton", {
        Kích thước=UDim2.new(0,40,0,26), Vị trí=UDim2.new(1,-46,0,5),
        Văn bản="✕", Màu nền 3=Đỏ, Độ trong suốt nền=0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=12, BorderSizePixel=0, ZIndex=21,
    }, thanh công cụ)
    Góc(closeFeatureBtn, UDim.new(0,5))

    local fStatus = New("TextLabel", {
        Kích thước=UDim2.new(1,-52-316,0,26), Vị trí=UDim2.new(0,316,0,5),
        Văn bản="", Độ trong suốt nền=1, Màu văn bản3=Màu3.fromRGB(255, 205, 64),
        Font=Enum.Font.GothamMedium, TextSize=8, TextXAlignment=Enum.TextXAlignment.Left,
        TextTruncate=Enum.TextTruncate.AtEnd, ZIndex=21,
    }, thanh công cụ)
    featureData.status = fStatus -- v4.4g: hub tự sửa nhãn khi nhúng địu thành công

    local editorFrame = New("Frame", {
        Kích thước = UDim2.new(1, 0, 1, -36),
        Vị trí = UDim2.new(0,0,0,0),
        BackgroundColor3=Color3.fromRGB(245,247,252),
        Độ trong suốt nền = 0,
        BorderSizePixel=0,
        Chỉ số Z = 30,
        Hiển thị = false,
    }, sf)

    local editorBox = New("TextBox", {
        Kích thước=UDim2.new(1,-16,1,-70), Vị trí=UDim2.new(0,8,0,8),
        Văn bản=codeContent,
        PlaceholderText="Dán script hoàn chỉnh HOẶC link raw vào đây...\nScript có thể tạo GUI riêng, GUI sẽ được nhúng vào tab này.",
        PlaceholderColor3=Color3.fromRGB(122, 130, 148),
        BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0,
        TextColor3=Color3.fromRGB(233, 237, 245),
        Font=Enum.Font.Code, TextSize=11, BorderSizePixel=0, ClearTextOnFocus=false,
        MultiLine=true, TextWrapped=true, TextXAlignment=Enum.TextXAlignment.Left, TextYAlignment=Enum.TextYAlignment.Top,
        Active=true, Selectable=true, ZIndex=31,
    }, editorFrame)
    Góc(editorBox, UDim.new(0,5))
    Stroke(editorBox, Color3.fromRGB(100,120,200), 1.5)
    New("UIPadding", {PaddingLeft=UDim.new(0,6), PaddingTop=UDim.new(0,4)}, editorBox)

    local applyEditBtn = New("TextButton", {
        Kích thước=UDim2.new(0,120,0,26), Vị trí=UDim2.new(0,8,1,-34),
        Text=" ✅ Áp Dụng", BackgroundColor3=C.GREEN, BackgroundTransparency=0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=31,
    }, editorFrame)
    Góc(applyEditBtn, UDim.new(0,5))

    local cancelEditBtn = New("TextButton", {
        Kích thước=UDim2.new(0,120,0,26), Vị trí=UDim2.new(0,134,1,-34),
        Văn bản="❌", Màu nền 3=Đỏ, Độ trong suốt nền=0.1,
        TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=31,
    }, editorFrame)
    Góc(cancelEditBtn, UDim.new(0,5))

    hàm cục bộ ClearHost()
        S.ClearEmbedsUnder(embedHost)
    kết thúc

    runFeatureBtn.Activated:Connect(function()
        ClearHost()
        fStatus.Text = "⏳ Đang chạy..."
        RunFeatureScript(codeContent, name, embedHost, runFeatureBtn, fStatus)
    kết thúc)

    saveFeatureBtn.Activated:Connect(function()
        cục bộ c = codeContent
        nếu #c == 0 thì
            fStatus.Text = "⚠️ Không có mã!"
            trở lại
        kết thúc
        cục bộ n = tên
        cục bộ bn = n
        số lượng cục bộ = 1
        trong khi đúng vậy
            cục bộ ex = false
            for _, s in ipairs(scripts) do
                if s.name == n then ex = true; break end
            kết thúc
            nếu không phải ex thì dừng lại
            cnt ± 1
            n = bn.." ("..cnt..")"
        kết thúc
        table.insert(scripts, {name = n, code = c, expanded = false})
        nếu RebuildScripts thì RebuildScripts() kết thúc
        Store.saveSoon()
        fStatus.Text = " ✅ Đã sao chép sang tab Code!"
    kết thúc)

    editFeatureBtn.Activated:Connect(function()
        editorBox.Text = codeContent
        editorFrame.Visible = true
    kết thúc)

    applyEditBtn.Activated:Connect(function()
        codeContent = NormalizeCode(editorBox.Text)
        featureData.code = codeContent
        editorFrame.Visible = false
        ClearHost()
        Store.saveSoon() -- code đã thay đổi thì bản lưu trên đĩa cũng phải thay đổi theo
        fStatus.Text = "✏️ Đã cập nhật mã"
    kết thúc)

    cancelEditBtn.Activated:Connect(function()
        editorFrame.Visible = false
    kết thúc)

    closeFeatureBtn.Activated:Connect(function()
        ClearHost()
        OpenFirstPage() -- v4.6.2: đóng tab tính năng thì về trang đầu (💾 Code Đã Lưu)
    kết thúc)

    trả về dữ liệu tính năng
kết thúc

task.spawn(function()
    task.wait(1)
    local lastSize = main.AbsoluteSize
    trong khi main và main.Parent thực hiện
        task.wait(0.15)
        nếu main.AbsoluteSize ~= lastSize thì
            lastSize = main.AbsoluteSize
            nếu #S.embeds > 0 thì
                S.SyncAllEmbeds()
            kết thúc
            S.PruneEmbeds()
            nếu _G.BananaCatHub_EmbedHosts thì
                for i = #_G.BananaCatHub_EmbedHosts, 1, -1 do
                    máy chủ cục bộ = _G.BananaCatHub_EmbedHosts[i]
                    nếu không phải máy chủ hoặc không phải máy chủ.Cha thì
                        table.remove(_G.BananaCatHub_EmbedHosts, i)
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc
kết thúc)

local createFeatureTab = AddTab("Tạo Năng", "➕", 7) -- v4.15: 6 -> 7 (👥 chen vào ô 4)

cy cục bộ = 8
Label(createFeatureTab, "➕ Tạo Tab Năng Tính Tích Hợp", cy)
cy = cy + 16
Label(createFeatureTab, "Dán NGUYÊN an script HOẶC link raw.", cy)
cy = cy + 14
Label(createFeatureTab, "Chạy tập lệnh trong tab; GUI của NÓ được nhúng vào menu (không đụng đến trò chơi GUI).", cy)
cy = cy + 14
Label(createFeatureTab, "💾 Tab tạo ra TỰ ĐỘNG được lưu — vẫn thoát game vào lại, thoát khỏi cần nhấn thêm gì.", cy)
cy = cy + 14
Label(createFeatureTab, "🧩 Nhấn 🎯 Chạy tập lệnh xong nhớ nhấn ✕ hoặc kéo menu ra — hub auto-free focus", cy)
cy = cy + 14
Label(createFeatureTab, " để bạn quay chuột/bắn lại bình thường. Nếu script vẫn sử dụng chuột: 🧩 TẮT nhúng.", cy)
cy = cy + 18

Label(createFeatureTab, "🏷️ Tên Tính:", cy)
cy = cy + 14

local featureNameIn = New("TextBox", {
    Kích thước=UDim2.new(1,-16,0,26), Vị trí=UDim2.new(0,8,0,cy), Văn bản="",
    PlaceholderText="VD: Tự động canh tác, Bay, Tốc độ...",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0, TextColor3=Color3.fromRGB(233, 237, 245),
    Font=Enum.Font.GothamMedium, TextSize=12, BorderSizePixel=0, ClearTextOnFocus=false,
    Active=true, Selectable=true, ZIndex=10, TextXAlignment=Enum.TextXAlignment.Left,
}, createFeatureTab)
Góc(featureNameIn, UDim.new(0,5))
Stroke(featureNameIn, Color3.fromRGB(100,120,200), 1.5)
New("UIPadding", {PaddingLeft=UDim.new(0,6)}, featureNameIn)

cy = cy + 32
Label(createFeatureTab, "🎨 Icon (1 ký tự, tùy chọn):", cy)
cy = cy + 14

local featureIconIn = New("TextBox", {
    Kích thước=UDim2.new(0,60,0,26), Vị trí=UDim2.new(0,8,0,cy), Văn bản="⚙️",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(26, 29, 38), BackgroundTransparency=0, TextColor3=Color3.fromRGB(233, 237, 245),
    Font=Enum.Font.GothamBold, TextSize=14, BorderSizePixel=0, ClearTextOnFocus=false,
    Active=true, Selectable=true, ZIndex=10,
}, createFeatureTab)
Góc(featureIconIn, UDim.new(0,5))
Stroke(featureIconIn, Color3.fromRGB(180,180,200), 1.2)

cy = cy + 32
Label(createFeatureTab, "📜 Dán Script Hoàn Chỉnh HOẶC link raw:", cy)
cy = cy + 14

local featureCodeIn = New("TextBox", {
    Kích thước=UDim2.new(1,-16,0,140), Vị trí=UDim2.new(0,8,0,cy), Văn bản="",
    PlaceholderText="Dán script hoặc link raw (https://...) vào đây...\nScript có thể tạo riêng ScreenGui, GUI sẽ được nhúng vào tab.",
    PlaceholderColor3=Color3.fromRGB(122, 130, 148),
    BackgroundColor3=Color3.fromRGB(28, 31, 41), BackgroundTransparency=0, TextColor3=Color3.fromRGB(233, 237, 245),
    Font=Enum.Font.Code, TextSize=11, BorderSizePixel=0, ClearTextOnFocus=false,
    MultiLine=true, TextWrapped=true, TextXAlignment=Enum.TextXAlignment.Left, TextYAlignment=Enum.TextYAlignment.Top,
    Active=true, Selectable=true, ZIndex=10,
}, createFeatureTab)
Góc(featureCodeIn, UDim.new(0,5))
Stroke(featureCodeIn, Color3.fromRGB(100,120,200), 1.5)
New("UIPadding", {PaddingLeft=UDim.new(0,6), PaddingTop=UDim.new(0,4)}, featureCodeIn)

cy = cy + 146

local createTabBtn = Button(createFeatureTab, "➕ Tạo Tab Tính Năng", 8, cy, 210, 28, Color3.fromRGB(0,150,200))
local clearFormBtn = Button(createFeatureTab, "🧹 Form", 224, cy, 116, 28, C.ORANGE)
cy = cy + 34

local embedToggleBtn = Button(createFeatureTab, "🧩 Nhúng vào Tab: BẬT", 346, cy - 34, 130, 28, C.GREEN)
local GuessToggleBtn = Button(createFeatureTab, "🕵 Đoán GUI: TẮT", 8, cy, 176, 26, C.GRAY)
local GrabSizeCodeBtn = Button(createFeatureTab, "📏 Code Tự Co Giãn (an toàn, Auto-Lưu)", 190, cy, 286, 26, C.PURPLE)
cy = cy + 34
local fixMouseBtn = Button(createFeatureTab, "🖱 Kẹt chuột / không được ấn? Bấm vào đây", 8, cy, 468, 24, C.RED)
cy = cy + 30
local copyTemplateBtn = Button(createFeatureTab, "📋 Copy Code Mẫu Cho AI (menu + Kiểm tâm)", 8, cy, 468, 26, C.BLUE)
cy = cy + 32

S.reembedBtn = Button(createFeatureTab,
    "🔁 Cứu GUI: nhúng lại GUI của tab ĐANG MỞ vào menu", 8, cy, 468, 26, C.BLUE)
cy = cy + 32

S.parkToggleBtn = Button(createFeatureTab,
    "🪟 GUI chạy ở tab 💻 Code → đưa vào menu: BẬT", 8, cy, 468, 26, C.GREEN)
cy = cy + 32

S.SyncEmbedToggles = function()
    pcall(function() if D.SyncPageChips then D.SyncPageChips() end end) -- v4.5: chip trên trang tiêu đề
    pcall(function()
        embedToggleBtn.Text = S.embedEnabled và "🧩 Nhúng vào Tab: BẬT" hoặc "🧩 Nhúng vào Tab: TẮT"
        D.SetBg(embedToggleBtn, S.embedEnabled and C.GREEN or C.GRAY) -- v4.5
        đoánToggleBtn.Text = (S.embedGuessNew == true) và "🕵Đoán GUI: BẬT" hoặc "🕵Đoán GUI: TẮT"
        D.SetBg(guessToggleBtn, (S.embedGuessNew == true) and C.ORANGE or C.GRAY) -- v4.5
        nếu S.parkToggleBtn thì
            cục bộ bật = (S.parkCodeGuis ~= false)
            S.parkToggleBtn.Text = bật và "🪟 GUI chạy ở tab 💻 Mã → menu đưa vào: BẬT"
                                     hoặc "🪟 GUI chạy ở tab 💻 Code → để ngoài màn hình: BẮT ĐẦU"
            D.SetBg(S.parkToggleBtn, on and C.GREEN or C.GRAY)
        kết thúc
    kết thúc)
kết thúc
S.SyncEmbedToggles()

local createStatus = Label(createFeatureTab, "", cy)
createStatus.TextColor3=C.YELLOW; createStatus.TextSize=9; createStatus.ZIndex=6
cy = cy + 14

S.DoToggleEmbed = function()
    S.embedEnabled = không phải S.embedEnabled
    nếu S.embedEnabled thì
        embedToggleBtn.Text = "🧩 Nhúng vào Tab: BẬT"
        D.SetBg(embedToggleBtn, C.GREEN)
        createStatus.Text = "🧩 BẬT: GUI của tập lệnh được mượn vào tab. Nhấn ✕ trên tab để trả về như cũ."
    khác
        embedToggleBtn.Text = "🧩 Nhúng vào Tab: BẮT ĐẦU"
        D.SetBg(embedToggleBtn, C.GRAY)
        for _, ft in ipairs(featureTabs) do
            local hostFrame = ft.frame and ft.frame:FindFirstChild("ScriptHost")
            if hostFrame then S.ClearEmbedsUnder(hostFrame) end
        kết thúc
        pcall(S.RemoveAllParked)
        S.PruneEmbeds()
        createStatus.Text = "🛡 Chế độ an toàn: hub không sửa GUI nữa. Muốn nhúng lại thì nhấn BẬT."
    kết thúc
    Store.saveSoon() -- v4.4g: lưu trạng thái 🧩 xuống đĩa -> thoát game vào lại vẫn được giữ
    pcall(function() if Store.refreshStatus then Store.refreshStatus() end end)
kết thúc
embedToggleBtn.Activated:Connect(S.DoToggleEmbed)

S.DoToggleGuess = function()
    S.embedGuessNew = not (S.embedGuessNew == true)
    nếu S.embedGuessNew thì
        đoánToggleBtn.Text = "🕵Đoán GUI: BẬT"
        D.SetBg(guessToggleBtn, C.ORANGE)
        createStatus.Text = "🕵 BẬT: script tạo GUI mút (sau HttpGet/task.wait) sẽ được nhúng — tiện hơn"
            .. " Nhưng nếu game cũng vừa mở UI đúng lúc thì UI đó có thể được mượn vào tab (bấm ✕ để trả)."
    khác
        đoánToggleBtn.Text = "🕵Đo GUI đị: BẮT ĐẦU"
        D.SetBg(guessToggleBtn, C.GRAY)
        createStatus.Text = "🛡 An toàn nhất: chỉ nhúng GUI mà hub chắc chắn là tập lệnh."
            .. " Script tạo GUI sẽ chạy bình thường bên ngoài màn hình, không được nhúng."
    kết thúc
    Store.saveSoon() -- v4.4g: lưu trạng thái 🕵 xuống đĩa
kết thúc
guessToggleBtn.Activated:Connect(S.DoToggleGuess)

S.DoTogglePark = function()
    S.parkCodeGuis = (S.parkCodeGuis == false) -- đảo trạng thái
    S.SyncEmbedToggles()
    nếu S.parkCodeGuis == false thì
        local n = S.RemoveAllParked() -- hoàn tác ngay: trả GUI về màn hình trò chơi
        createStatus.Text = "🪟 BẮT ĐẦU: script chạy ở tab 💻 Code / 💾 Code Đã lưu sẽ để GUI NGOÀI màn hình trò chơi"
            .. (n > 0 and (" · đã trả " .. n .. " GUI về màn hình") hoặc "")
            .. " · tab ➕ Tính Năng vẫn nhúng GUI vào tab như bình thường."
    khác
        createStatus.Text = "🪟 BẬT: GUI của tập lệnh chạy ở tab 💻 Mã sẽ được đưa vào tab '🧩 GUI Ngoài'"
            .. " (mỗi GUI có nút ↩ trả về màn hình). Dex/IY/SimpleSpy vẫn LUÔN ở ngoài màn hình trò chơi."
    kết thúc
    Store.saveSoon() -- lưu xuống đĩa: thoát trò chơi vào lại vẫn giữ lựa chọn này
kết thúc
S.parkToggleBtn.Activated:Connect(S.DoTogglePark)

grabSizeCodeBtn.Activated:Connect(function()
    local currentCode = featureCodeIn.Text
    nếu #currentCode == 0 thì
        createStatus.Text = "⚠️ Ô code đang trống, không có gì để lấy!"
        trở lại
    kết thúc

    local wrappedCode = [[
local _FIT_WRAPPER = true
local _bcRealNew = Instance.new
cục bộ _bcMine = {}
local _bcHookOn = true
pcall(function()
    Instance.new = function(cls, ...)
        local inst = _bcRealNew(cls, ...)
        if _bcHookOn and cls == "ScreenGui" then _bcMine[#_bcMine + 1] = inst end
        trả lại inst
    kết thúc
kết thúc)

]] .. currentCode .. [[

pcall(function() _bcHookOn = false; Instance.new = _bcRealNew end)

task.delay(4, function()
    pcall(function() _bcHookOn = false; Instance.new = _bcRealNew end)
kết thúc)

task.defer(function()
    task.wait(0.4)
    trung tâm cục bộ = nil
    pcall(function()
        local hubGui = (gethui and gethui()) or game:GetService("Players").LocalPlayer:FindFirstChildOfClass("PlayerGui")
        hub = hubGui và hubGui:FindFirstChild("ExMenu") và hubGui.ExMenu:FindFirstChildWhichIsA("Frame")
        nếu không phải là trung tâm
            local pg = game:GetService("Players").LocalPlayer:FindFirstChildOfClass("PlayerGui")
            hub = pg và pg:FindFirstChild("ExMenu") và pg.ExMenu:FindFirstChildWhichIsA("Frame")
        kết thúc
    kết thúc)
    for _, g in ipairs(_bcMine) do
        pcall(function()
            nếu không phải g hoặc không phải g.Parent thì trả về end
            gốc cục bộ = g:TìmConĐầuTiênLàMột("Khung")
                hoặc g:FindFirstChildWhichIsA("ScrollingFrame")
                hoặc g:FindFirstChildWhichIsA("GuiObject")
            nếu không phải là root thì trả về end
            if root.Size and (root.Size.X.Scale ~= 0 or root.Size.Y.Scale ~= 0) then return end
            local us = root:FindFirstChild("BananaCatFitScale")
            nếu không phải chúng ta thì
                us = _bcRealNew("UIScale")
                us.Name = "BananaCatFitScale"
                chúng ta.Cha mẹ = gốc
            kết thúc
            nếu là trung tâm thì
                hàm cục bộ _bcSync()
                    us.Scale = math.clamp(hub.AbsoluteSize.X / 540, 0.8, 1.6)
                kết thúc
                _bcSync()
                hub:GetPropertyChangedSignal("AbsoluteSize"):Connect(function()
                    pcall(_bcSync)
                kết thúc)
            kết thúc
        kết thúc)
    kết thúc
kết thúc)
]]

    local saveName = "AutoSize_"..os.date("%H%M%S")
    local bn = saveName
    số lượng cục bộ = 1
    trong khi đúng vậy
        cục bộ ex = false
        for _, s in ipairs(scripts) do
            if s.name == saveName then ex = true; break end
        kết thúc
        nếu không phải ex thì dừng lại
        cnt ± 1
        saveName = bn.." ("..cnt..")"
    kết thúc

    table.insert(scripts, {name = saveName, code = wrappedCode, expanded = false})
    nếu RebuildScripts thì RebuildScripts() kết thúc
    Store.saveSoon()

    createStatus.Text = " ✅Đã lưu bản tự động co giãn vào tab 'Code Đã Lưu': "..saveName..
        " · Để tab tính năng co giãn theo menu thì KHÔNG cần bản này, hub sẽ tự động làm khi ấn vào ► Chạy Script."
kết thúc)

S.DoFixMouse = function()
    cục bộ đã hoàn thành = {}
    ReleaseHubFocus()
    đã xong[#done+1] = "nhả tập trung"
    cục bộ được khôi phục = 0
    for _, ft in ipairs(featureTabs) do
        local hostFrame = ft.frame and ft.frame:FindFirstChild("ScriptHost")
        if hostFrame then restored = restored + S.ClearEmbedsUnder(hostFrame) end
    kết thúc
    nếu được khôi phục > 0 thì done[#done+1] = "đã trả " .. được khôi phục .. " GUI về game" end
    for _, e in ipairs(S.embeds) do
        pcall(function() e.host.Visible = e.gui.Enabled end)
    kết thúc
    pcall(function() UserInputService.MouseBehavior = Enum.MouseBehavior.Default end)
    done[#done+1] = "chuột về mặc định"
    createStatus.Text = "🖱 " .. table.concat(done, " · ")
        .. " — vẫn không được? 🧩 KHẮC nhúng rồi nhấn vào ► lại (lúc đó hub không xâm phạm GUI nào)"
    return table.concat(done, " · ")
kết thúc
fixMouseBtn.Activated:Connect(S.DoFixMouse)

S.reembedBtn.Activated:Connect(function()
    ReleaseHubFocus()
    local ft = S.FindActiveFeature()
    nếu không phải ft thì
        createStatus.Text = "⚠️ Hãy MỞ tab tính năng cần nghiên trước (bấm vào tab đó cho nó hiện ra) rồi nhấn 🔁."
        trở lại
    kết thúc
    nếu không phải S.embedEnabled thì
        createStatus.Text = "⚠️ 🧩 'Nhúng vào Tab' đang TẮT — BẬT lại rồi mới cứu GUI."
        trở lại
    kết thúc
    createStatus.Text = "⏳ Đang tìm GUI của '" .. ft.name .. "' để nhúng lại vào menu..."
    task.defer(function()
        local n, why = S.ReembedFeature(ft, true)
        nếu n > 0 thì
            createStatus.Text = string.format(
                " ✅ Đã nhúng lại %d GUI vào tab '%s'. Nếu nhầm lẫn một GUI khác, hãy mở tab đó nhấn ✕ để trả về.",
                n, ft.name)
            pcall(function()
                nếu ft.status và ft.status.Parent thì
                    ft.status.Text = string.format("Đã nhúng lại %d GUI vào tab (nút 🔁 Cứu GUI)", n)
                kết thúc
                if ft.indicator and ft.indicator.Parent then ft.indicator.BackgroundColor3 = C.GREEN end
            kết thúc)
        khác
            createStatus.Text = "⚠️ Chưa được nhúng: " .. tostring(why hoặc "không rõ lý do")
                .. " · press ► Chạy lại Script rồi CHỜ 10 giây (hub tự động thử lại 5 lần) · xem bảng điều khiển (F9) để biết hook có bị chặn thực thi không."
        kết thúc
        print(string.format("[taodepzai v5.0 NOIR] 🔁 Cứu tab GUI '%s': %d GUI đã nhúng%s",
            tostring(ft.name), n, why and (" · lý do bỏ qua: " .. tostring(why)) or ""))
    kết thúc)
kết thúc)

copyTemplateBtn.Activated:Connect(function()
    ReleaseHubFocus()
    local nm = (featureNameIn.Text or ""):gsub('[\r "]', " "):gsub("^%s+", ""):gsub("%s+$", "")
    if #nm == 0 thì nm = "Tính Năng Mới" end
    local ic = (featureIconIn.Text or ""):gsub('[\r "]', " ")
    if #ic == 0 then ic = "⚙️" end
    tem địa phương
    pcall(function() stamp = os.date("sinh %H:%M %d/%m/%Y") end)
    mã cục bộ = S.FeatureTemplate(nm, ic, stamp)

    local copied = S.CopyToClipboard(code)
    local inBox = false
    nếu #featureCodeIn.Text == 0 thì
        featureCodeIn.Text = mã
        trong hộp thư đến = đúng
    kết thúc
    local saveName = "Mẫu" .. nm
    local baseName = saveName
    số lượng cục bộ = 1
    trong khi đúng vậy
        cục bộ tồn tại = sai
        for _, sc in ipairs(scripts) do
            if sc.name == saveName then exists = true break end
        kết thúc
        nếu không tồn tại thì dừng lại
        cnt = cnt + 1
        saveName = baseName .. " (" .. cnt .. ")"
    kết thúc
    table.insert(scripts, {name = saveName, code = code, expanded = false})
    nếu RebuildScripts thì RebuildScripts() kết thúc
    Store.saveSoon()

    createStatus.Text = (đã sao chép và ("📋 ĐÃ COPY " .. #code .. " ký tự vào clipboard")
        hoặc ("⚠️ Người thực thi không có setclipboard — lấy mã ở tab 'Mã đã lưu'"))
        .. " · đã lưu '" .. saveName .. "'"
        .. (inBox and " · đã điền vào ô code" hoặc " · ô code giữ mã của bạn")
        .. " · gửi mã đoạn NGUYÊN cho AI/người viết script, dán lại rồi nhấn ► Chạy Script."
    local oldLabel = copyTemplateBtn.Text
    copyTemplateBtn.Text = " ✅ Đã sao chép mã mẫu cho: " .. nm
    task.delay(2.6, function()
        if copyTemplateBtn and copyTemplateBtn.Parent then copyTemplateBtn.Text = oldLabel end
    kết thúc)
    print("[taodepzai v5.0 NOIR] 📋 Code mẫu '" .. nm .. "' (" .. #code .. " ký tự) — clipboard: "
        .. tostring(copied))
kết thúc)

Label(createFeatureTab, "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", cy)
cy = cy + 16
Label(createFeatureTab, "📋 Danh Sách Tab Tính Đã Tạo:", cy)
cy = cy + 16

local featureListFrame = New("Frame", {
    Kích thước=UDim2.new(1,-16,0,0), Vị trí=UDim2.new(0,8,0,cy),
    BackgroundTransparency=1, BorderSizePixel=0, ZIndex=6,
}, createFeatureTab)
New("UIListLayout", {SortOrder=Enum.SortOrder.LayoutOrder, Padding=UDim.new(0,4)}, featureListFrame)

hàm cục bộ RebuildFeatureList()
    for _, c in ipairs(featureListFrame:GetChildren()) do
        if not c:IsA("UIListLayout") then c:Destroy() end
    kết thúc

    nếu #featureTabs == 0 thì
        Mới("TextLabel", {
            Kích thước = UDim2.new(1, 0, 0, 30),
            Text="📭 Chưa có tính năng tab nào.",
            BackgroundTransparency=1, TextColor3=C.GRAY, Font=Enum.Font.GothamMedium, TextSize=10,
            TextXAlignment=Enum.TextXAlignment.Center, TextYAlignment=Enum.TextYAlignment.Center, ZIndex=7,
        }, featureListFrame)
        createFeatureTab.CanvasSize = UDim2.new(0, 0, 0, cy + 50)
        trở lại
    kết thúc

    tổng cục bộ H = 0
    for i, ft in ipairs(featureTabs) do
        hàng cục bộ = New("Khung", {
            Size=UDim2.new(1,0,0,32), BackgroundColor3=Color3.fromRGB(26, 29, 38),
            BackgroundTransparency=0.1, BorderSizePixel=0, ZIndex=6,
        }, featureListFrame)
        Góc(hàng, UDim.new(0,5)); Nét(hàng)

        Mới("TextLabel", {
            Kích thước=UDim2.new(1,-90,1,0), Vị trí=UDim2.new(0,8,0,0),
            Văn bản=ft.icon.." "..ft.name, Độ trong suốt nền=1, Màu chữ 3=C.DARK,
            Font=Enum.Font.GothamBold, TextSize=10, TextXAlignment=Enum.TextXAlignment.Left, ZIndex=7,
        }, hàng ngang)

        local goBtn = New("TextButton", {
            Kích thước=UDim2.new(0,50,0,22), Vị trí=UDim2.new(1,-78,0,5),
            Văn bản="➡ Mở", Màu nền 3 = Xanh lam, Độ trong suốt nền = 0.1,
            TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=9, BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(goBtn, UDim.new(0,4))
        goBtn.Activated:Connect(function()
            for i, b in ipairs(tabs) do
                if b == ft.btn then SwitchTab(i); break end
            kết thúc
        kết thúc)

        local delBtn = New("TextButton", {
            Kích thước=UDim2.new(0,24,0,22), Vị trí=UDim2.new(1,-26,0,5),
            Văn bản="🗑", Màu nền 3 = Đỏ đậm, Độ trong suốt nền = 0.1,
            TextColor3=C.WHITE, Font=Enum.Font.GothamBold, TextSize=10, BorderSizePixel=0, ZIndex=8,
        }, hàng ngang)
        Góc(delBtn, UDim.new(0,4))
        delBtn.Activated:Connect(function()
            chỉ số cục bộ = nil
            for j, t in ipairs(tabs) do
                if t == ft.btn then idx = j; break end
            kết thúc
            nếu idx thì
                if activeTab == ft.frame then OpenFirstPage() end -- v4.6.2
                local hostFrame = ft.frame and ft.frame:FindFirstChild("ScriptHost")
                if hostFrame then S.ClearEmbedsUnder(hostFrame) end
                ft.btn:Destroy()
                ft.frame:Destroy()
                table.remove(tabs, idx)
                table.remove(tabContent, idx)
                table.remove(featureTabs, i)
                for j, t in ipairs(tabs) do
                    t.LayoutOrder = j
                kết thúc
                for j, ft2 in ipairs(featureTabs) do
                    for k, t in ipairs(tabs) do
                        if t == ft2.btn then ft2.tabIdx = k; break end
                    kết thúc
                kết thúc
                RebuildFeatureList()
                Store.saveSoon() -- ⭐ xóa cũng phải ghi xuống đĩa, nếu không tab sẽ "sống lại" khi tham gia lại
            kết thúc
        kết thúc)

        tổngH = tổngH + 36
    kết thúc

    featureListFrame.Size = UDim2.new(1,-16,0,totalH)
    createFeatureTab.CanvasSize = UDim2.new(0, 0, 0, cy + TotalH + 30)
kết thúc

createTabBtn.Activated:Connect(function()
    local n = featureNameIn.Text
    local ic = featureIconIn.Text
    local c = featureCodeIn.Text

    nếu #n == 0 thì
        createStatus.Text = "⚠️ Vui lòng nhập tên tính năng!"
        trở lại
    kết thúc
    nếu #c == 0 thì
        createStatus.Text = "⚠️ Vui lòng dán script!"
        trở lại
    kết thúc

    for _, ft in ipairs(featureTabs) do
        nếu ft.name == n thì
            createStatus.Text = "⚠️ Tên tính năng đã tồn tại!"
            trở lại
        kết thúc
    kết thúc

    CreateFeatureTab(n, ic, c)
    RebuildFeatureList()
    Store.saveSoon() -- ⭐ lưu ngay vào file để thoát game vào lại vẫn còn tab này

    createStatus.Text = " ✅ Đã tạo tab: "..n.." (đã lưu)"
    featureNameIn.Text = ""
    featureIconIn.Text = "⚙️"
    featureCodeIn.Text = ""

    SwitchTab(#tabs)
kết thúc)

clearFormBtn.Activated:Connect(function()
    featureNameIn.Text = ""
    featureIconIn.Text = "⚙️"
    featureCodeIn.Text = ""
    createStatus.Text = "🧹 Đã xóa biểu mẫu"
kết thúc)

RebuildFeatureList()
pcall(function()
    createFeatureTab.CanvasSize = UDim2.new(0, 0, 0, cy + 40)
kết thúc)

Store.restoreFeatures = function()
    for i = #featureTabs, 1, -1 do
        cục bộ ft = featureTabs[i]
        for j, b in ipairs(tabs) do
            nếu b == ft.btn thì
                table.remove(tabs, j)
                table.remove(tabContent, j)
                phá vỡ
            kết thúc
        kết thúc
        if activeTab == ft.frame then OpenFirstPage() end -- v4.6.2
        local hostFrame = ft.frame and ft.frame:FindFirstChild("ScriptHost")
        if hostFrame then S.ClearEmbedsUnder(hostFrame) end
        pcall(function() ft.btn:Destroy() end)
        pcall(function() ft.frame:Destroy() end)
        table.remove(featureTabs, i)
    kết thúc

    for _, f in ipairs(Store.loadedFeatures) do
        CreateFeatureTab(f.name, f.icon, f.code)
    kết thúc

    for j, t in ipairs(tabs) do t.LayoutOrder = j end
    tabBar.CanvasSize = UDim2.new(0, 0, 0, #tabs * 44 + 10)
    RebuildFeatureList()
    if Store.refreshStatus then Store.refreshStatus() end
kết thúc

nếu #Store.loadedFeatures > 0 thì
    Store.restoreFeatures()
    createStatus.Text = string.format("💾Đã khôi phục %d tính năng của tab từ bộ nhớ", #Store.loadedFeatures)
kết thúc

S.Move = {
    fly = false, noclip = false, infJump = false, speed = false, carpet = false,
    runMode = false, -- 🏃 mode "chạy trên thảm" (gộp thảm + tốc độ + HUD)
    sprint = false, sprintSpeed ​​= 50, -- v4.37: 💨 tốc độ theo camera (mặt đất, không Thường xuyên Tường)
    highJump = false, highJumpSpeed ​​= 80, -- v4.38: 🦘 nhảy cao (công tắc độc lập, chỉnh tốc độ)
    _hud = nil, _hudUp = nil, _hudDown = nil, _hudCarpet = nil, _hudClose = nil, _menuWasOpen = nil,
    Tốc độ bay = 50, tốc độ đi bộ = 16, sức mạnh nhảy = 50,
    speedMode = "x", speedMul = 3, appliedWS = nil,
    thảmW = 6, thảmH = 0.5, thảmL = 6, -- Rộng × Cao(ngày) × Dài
    CarpetGap = 0.2, -- thảm cách bàn chân bao nhiêu stud (0 = áp sát)
    carpetSlack = 0.5, carpetHold = true, carpetEdge = true,
    carpetY = nil,
    _carpet = nil, _bv = nil, _bg = nil, _floor = nil,
    _ncConn = không, _ncDesc = không, _ncChar = không, _ncLast = không,
    _ijConn = không, _ijConn2 = không, _speedThread = không,
    _origCC = {}, -- [part] = CanCollide gốc
    _baseWS = 16, _baseJP = 50, -- tốc độ / lực nhảy GỐC CỦA GAME
    _wd = nil, _lastJump = nil, _ijBaseJP = nil, _ijBaseJH = nil,
    _carpetRetries = 0, -- số lần thảm bị xóa
}
MV cục bộ = S.Move
_G.BananaCatHub_MV = S.Move -- v4.28: hiển thị cho các tham chiếu cũ (HubLoc fly)

hàm MV.comp(v, k, dft)
    if v == nil then return dft end
    cục bộ ok, val = pcall(function() return v[k] end)
    nếu ok và kiểu dữ liệu (val) == "number" thì trả về val end
    trả về dft
kết thúc
hàm cục bộ mvClamp(n, lo, hi, dft)
    n = tonumber(n)
    if n == nil or n ~= n then return dft end
    nếu n < lo thì trả về lo kết thúc
    nếu n > hi thì trả về hi kết thúc
    trả về n
kết thúc

function MV.Char() return player.Character end
hàm MV.Hum()
    local c = player.Character
    trả về c và c:FindFirstChildOfClass("Humanoid") hoặc nil
kết thúc
hàm MV.Root()
    local c = player.Character
    trả về c và c:FindFirstChild("HumanoidRootPart") hoặc nil
kết thúc

--------- 🧱 XUYÊN TƯỜNG (NoClip) ----------
hàm MV._NcPart(p)
    nếu không (p và p.IsA và p:IsA("BasePart")) thì trả về end
    MV._ncParts = MV._ncParts hoặc {}
    nếu MV._origCC[p] == nil thì
        MV._origCC[p] = MV._ncParts[p] và đúng hoặc p.CanCollide
    kết thúc
    nếu p.CanCollide ~= false thì pcall(function() p.CanCollide = false end) end
    MV._ncParts[p] = true
kết thúc
hàm MV._NcScan()
    local c = MV.Char()
    nếu không phải c thì trả về end
    if MV._ncChar ~= c then --đổi nhân vật (respawn) -> up connect old
        if MV._ncDesc then pcall(function() MV._ncDesc:Disconnect() end) end
        MV._ncChar = c
        MV._ncParts = {} -- nhân vật mới -> mới danh sách phần
        MV._ncDesc = trackConn(c.DescendantAdded:Connect(MV._NcPart))
    kết thúc
    for _, p in ipairs(c:GetDescendants()) do MV._NcPart(p) end
kết thúc
hàm MV._NcEnforce()
    if not MV.noclip then return end
    local c = MV.Char()
    các bộ phận cục bộ = MV._ncParts
    nếu không phải c hoặc không phải các bộ phận thì trả về đầu cuối
    for p in pairs(parts) do
        cục bộ ok = pcall(function()
            nếu p:LàHậu duệ của (c) thì
                nếu p.CanCollide ~= false thì p.CanCollide = kết thúc sai
            khác
                parts[p] = nil -- part đã rời khỏi người dùng (game delete) -> theo dõi theo dõi
            kết thúc
        kết thúc)
        nếu không ổn thì parts[p] = nil end
    kết thúc
kết thúc
--------- v4.22: 🧲 ĐẨY XUYÊN khi bị chặn CỨNG ----------
hàm MV._NcAssist()
    nếu MV.fly hoặc không (MV.noclip và MV.ncPass ~= false) thì
        MV._passBlocked, MV._passPX, MV._passPZ, MV._passAt = 0, nil, nil, nil
        trở lại
    kết thúc
    local onCarpet = (MV.carpet == true) or (MV.runMode == true)
    cục bộ h, r = MV.Hum(), MV.Root()
    nếu không phải h hoặc không phải r thì
        MV._passBlocked, MV._passPX, MV._passPZ, MV._passAt = 0, nil, nil, nil
        trở lại
    kết thúc
    local now = os.clock()
    local dt = now - (MV._passAt or now)
    MV._passAt = now
    if dt <= 0 hoặc dt > 0.5 thì dt = 1/60 end -- frame start/lag -> coi như 1 frame
    local okMD, md = pcall(function() return h.MoveDirection end)
    local mx = okMD and MV.comp(md, "X", 0) or 0
    local mz = okMD and MV.comp(md, "Z", 0) or 0
    local want = math.sqrt(mx * mx + mz * mz) -- 0..1: đang nhấn bất kỳ hướng dẫn nào
    local px, pz = MV.comp(r.Position, "X", nil), MV.comp(r.Position, "Z", nil)
    nếu không phải (px và pz) thì trả về end
    cục bộ đã di chuyển = 0
    nếu MV._passPX thì
        local dx, dz = px - MV._passPX, pz - MV._passPZ
        moved = math.sqrt(dx * dx + dz * dz)
    kết thúc
    MV._passPX, MV._passPZ = px, pz
    local spd = mvClamp(tonumber(MV.WantSpeed()) or 16, 6, 120)
    local ws = tonumber(MV.comp(h, "WalkSpeed", nil)) or spd
    local expect = math.min(spd, ws) * want * dt
    nếu muốn <= 0.1 thì
        MV._passBlocked = 0 -- không nhấn gì -> không đưa
    elseif moved < expect * (onCarpet and 0.12 or 0.35) then
        MV._passBlocked = (MV._passBlocked hoặc 0) + dt -- bị chặn -> đếm thời gian khóa
    khác
        MV._passBlocked = (MV._passBlocked hoặc 0) * 0.5 -- đi được -> quên tăng dần
    kết thúc
    if (MV._passBlocked or 0) < (onCarpet and 0.35 or 0.2) or want <= 0.1 then return end
    ux cục bộ, uz = mx / muốn, mz / muốn
    local stepLen = onCarpet và math.min(spd * dt * 0.5, 0.4) -- trên thảm: lang RẤT nhẹ nhàng
                    hoặc math.min(spd * dt * 1.15, 3) -- 1 frame không say quá 3 stud
    local y = MV.comp(r.Position, "Y", nil)
    nếu y == nil thì trả về end
    pcall(function() r.CFrame = CFrame.new(px + ux * stepLen, y, pz + uz * stepLen) end)
kết thúc
hàm MV._NcStep()
    if not MV.noclip then return end
    local c = MV.Char()
    nếu không phải c thì trả về end
    local now = os.clock()
    nếu MV._ncChar ~= c hoặc không phải MV._ncLast hoặc (now - MV._ncLast) > 0.5 thì
        MV._ncLast = bây giờ
        MV._NcScan() -- quét đầy đủ: bắt phần mới / nhân vật mới
    kết thúc
    MV._NcEnforce() -- MỖI FRAME: thắng game bật lại CanCollide
    MV._NcAssist() -- 🧲 bị chặn -> tự đưa xuyên
kết thúc
hàm MV._NcBind(on)
    nếu bật và không phải MV._ncBound thì
        MV._ncBound = true
        cục bộ ok = pcall(function()
            RunService:BindToRenderStep("BC_NoClip", Enum.RenderPriority.Last.Value, function()
                pcall(MV._NcStep)
            kết thúc)
        kết thúc)
        nếu không ổn thì MV._ncBound = false kết thúc
    nếu không bật và MV._ncBound thì
        MV._ncBound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_NoClip") end)
    kết thúc
    trả về MV._ncBound
kết thúc
hàm MV._NcForgetLost()
    for p in pairs(MV._origCC) do
        nếu không (p và p.Parent) thì MV._origCC[p] = nil end
    kết thúc
kết thúc
hàm MV._NcRestore()
    for p, v in pairs(MV._origCC) do
        nếu p và p.Parent thì
            pcall(function() p.CanCollide = v end)
        kết thúc
        MV._origCC[p] = nil
    kết thúc
    MV._origCC = {}
    MV._ncParts = {}
kết thúc
hàm MV.SetNoclip(on)
    bật = (bật == đúng)
    if on == MV.noclip then return MV.noclip end
    MV.noclip = bật
    nếu bật thì
        MV._ncLast = nil
        MV._ncParts = {}
        MV._passBlocked, MV._passPX, MV._passPZ, MV._passAt = 0, nil, nil, nil
        if MV.ncPass == nil thì MV.ncPass = true end -- v4.22: 🧲 mặc định BẬT
        MV._NcScan() -- quét ngay lần đầu cho chắc
        MV._ncConn = trackConn(RunService.Stepped:Connect(MV._NcStep))
        MV._NcBind(true) -- v4.22: thêm khung cuối cùng của lớp ghi
    khác
        for _, c in ipairs({ MV._ncConn, MV._ncDesc }) do
            nếu c thì pcall(function() c:Disconnect() end) end
        kết thúc
        MV._ncConn, MV._ncDesc, MV._ncChar, MV._ncLast = nil, nil, nil, nil
        MV._NcBind(false)
        MV._passBlocked, MV._passPX, MV._passPZ, MV._passAt = 0, nil, nil, nil
        MV._NcRestore()
    kết thúc
    MV._Watchdog()
    if MV.SyncFlyHud then MV.SyncFlyHud() end
    trả về MV.noclip
kết thúc

--------- 🦘 NHẢY VÔ HẠN ----------
hàm MV._JumpGuard()
    local h = MV.Hum()
    nếu không phải h thì trả về end
    pcall(function()
        local jp = mvClamp(MV.jumpPower, 1, 500)
        nếu h.UseJumpPower ~= false thì
            if (tonumber(h.JumpPower) or 0) < 1 then h.JumpPower = jp end
        kết thúc
        nếu (tonumber(h.JumpHeight) hoặc 0) < 0.1 thì
            local g = tonumber(workspace.Gravity) or 0
            nếu g < 1 thì g = 196,2 kết thúc
            h.JumpHeight = mvClamp((jp * jp) / (2 * g), 1, 500)
        kết thúc
    kết thúc)
kết thúc
hàm MV._JumpConfirm(y0)
    if not MV.infJump then return end
    cục bộ r2 = MV.Root()
    nếu không phải r2 thì trả về end
    vị trí cục bộ = r2.Vị trí.Y - y0
    local v = r2.AssemblyLinearVelocity
    local vy = MV.comp(v, "Y", 0)
    if up < 0.4 và vy < 10 then -- chưa nhúc nhích -> game đã bỏ qua lệnh nhảy
        pcall(function()
            r2.AssemblyLinearVelocity = Vector3.new(
                MV.comp(v, "X", 0), MV.WantJumpSpeed(), MV.comp(v, "Z", 0))
        kết thúc)
    kết thúc
kết thúc
hàm MV._DoJump()
    if not MV.infJump then return false end
    cục bộ h, r = MV.Hum(), MV.Root()
    nếu không phải h hoặc không phải r thì trả về false.
    nếu h.Sit hoặc h.PlatformStand thì trả về false end -- ngồi ngồi/xe: không nhảy
    local now = os.clock()
    nếu MV._lastJump và (now - MV._lastJump) < 0.12 thì trả về kết thúc sai -- Chống Bốc Tăng
    MV._lastJump = bây giờ
    MV._JumpGuard()
    local y0 = r.Position.Y
    pcall(function() h:ChangeState(Enum.HumanoidStateType.Jumping) end)
    pcall(function() h.Jump = true end)
    task.delay(0.08, function() pcall(MV._JumpConfirm, y0) end)
    trả về giá trị đúng
kết thúc
hàm MV.SetInfJump(on)
    bật = (bật == đúng)
    if on == MV.infJump then return MV.infJump end
    MV.infJump = bật
    nếu bật thì
        local h = MV.Hum()
        if h then MV._ijBaseJP, MV._ijBaseJH = h.JumpPower, h.JumpHeight end
        MV._JumpGuard()
        MV._ijConn = trackConn(UserInputService.JumpRequest:Connect(function()
            pcall(MV._DoJump)
        kết thúc))
        MV._ijConn2 = trackConn(UserInputService.InputBegan:Connect(function(i, gp)
            if not MV.infJump then return end
            pcall(function()
                local tb = UserInputService:GetFocusedTextBox()
                if tb và tb:IsDescendantOf(gui) then return end -- đang nhập trong hub thì thôi
                cục bộ k = i và i.KeyCode
                if k == Enum.KeyCode.Space or k == Enum.KeyCode.ButtonA then MV._DoJump() end
            kết thúc)
        kết thúc))
    khác
        for _, c in ipairs({ MV._ijConn, MV._ijConn2 }) do
            nếu c thì pcall(function() c:Disconnect() end) end
        kết thúc
        MV._ijConn, MV._ijConn2 = không, không
        local h = MV.Hum()
        nếu h thì
            if MV._ijBaseJP ~= nil then pcall(function() h.JumpPower = MV._ijBaseJP end) end
            if MV._ijBaseJH ~= nil then pcall(function() h.JumpHeight = MV._ijBaseJH end) end
        kết thúc
        MV._ijBaseJP, MV._ijBaseJH = không, không
    kết thúc
    MV._Watchdog()
    trả về MV.infJump
kết thúc

--------- 👟 CHẠY ĐỘ (WalkSpeed ​​/ JumpPower) ----------
hàm MV.WantSpeed()
    nếu MV.speedMode == "x" thì
        cơ sở cục bộ = tonumber(MV._baseWS) hoặc 16
        return mvClamp(base * mvClamp(MV.speedMul, 1, 20), 0, 500)
    kết thúc
    return mvClamp(MV.walkSpeed, 0, 500)
kết thúc
hàm MV.ApplyChar()
    local h = MV.Hum()
    nếu không phải h thì trả về end
    nếu MV.speed thì
        local want = MV.WantSpeed()
        h.WalkSpeed ​​= muốn
        MV.appliedWS = muốn
        nếu không phải MV.highJump thì
            local jp = mvClamp(MV.jumpPower, 0, 500)
            if h.JumpPower ~= jp then h.JumpPower = jp end
        kết thúc
    khác
        h.WalkSpeed ​​= MV._baseWS hoặc 16
        nếu không phải MV.highJump thì
            h.JumpPower = MV._baseJP hoặc 50
        kết thúc
        MV.appliedWS = nil
    kết thúc
kết thúc
hàm MV.SpeedStep()
    local h = MV.Hum()
    nếu không phải h hoặc không phải MV.speed thì trả về end
    nếu MV.appliedWS ~= nil và math.abs((tonumber(h.WalkSpeed) hoặc 0) - MV.appliedWS) > 0.01 thì
        MV._baseWS = tonumber(h.WalkSpeed) hoặc MV._baseWS
    kết thúc
    MV.ApplyChar()
kết thúc
hàm MV.SetSpeed(on)
    bật = (bật == đúng)
    if on == MV.speed then return MV.speed end
    local h = MV.Hum()
    nếu bật chứ không phải MV.speed và h thì -- mặc định nhớ ở lần đầu tiên
        MV._baseWS = h.WalkSpeed ​​hoặc 16
        MV._baseJP = h.JumpPower hoặc 50
    kết thúc
    MV.speed = bật
    MV.ApplyChar()
    MV._Watchdog()
    trả về MV.speed
kết thúc

--------- v4.12.2: VÒNG CANH GÁC (lý do nhiều game "không hoạt động") ----------
hàm MV._NeedWatch()
    trả về (MV.fly hoặc MV.noclip hoặc MV.infJump hoặc MV.speed hoặc MV.runMode
            hoặc MV.sprint hoặc MV.highJump hoặc (MV.Safe và MV.Safe.on)) == true
kết thúc
hàm MV._KeepAlive()
    if MV.speed or MV.runMode then pcall(MV.SpeedStep) end
    nếu MV.sprint thì
        pcall(MV._EnsureSpeed)
        nếu MV._speedBound không phải là (tick() - (MV._speedFrameAt hoặc 0)) > 0.6 thì
            MV._speedBound = false
            pcall(MV._BindSpeed)
            pcall(MV._SpeedFrame)
        kết thúc
    kết thúc
    if MV.infJump or MV.runMode then pcall(MV._JumpGuard) end
    if MV.highJump then pcall(MV._HighJumpApplyPower) end
    -- [ĐÃ XÓA] thảm giữ ấm
    nếu MV.fly thì
        pcall(MV._EnsureFly)
        nếu MV._flyBound không phải là (tick() - (MV._flyFrameAt hoặc 0)) > 0.6 thì
            MV._flyBound = false
            pcall(MV._BindFly)
            pcall(MV._FlyFrame)
        kết thúc
    kết thúc
    nếu MV.Safe và MV.Safe.on và (tick() - (MV.Safe._lastFrameAt hoặc 0)) > 0.6 thì
        MV.Safe._bound = false
        pcall(MV.Safe.Bind)
        pcall(MV.Safe.Step, 0.1)
    kết thúc
kết thúc
hàm MV._Watchdog()
    nếu không phải MV._NeedWatch() thì
        MV._wdToken = nil
        luồng cục bộ = MV._wd
        MV._wd = nil
        if type(thread) == "thread" and thread ~= coroutine.running() then pcall(task.cancel, thread) end
        trở lại
    kết thúc
    nếu MV._wdToken thì trả về end
    mã thông báo cục bộ = {}
    MV._wdToken = token
    luồng cục bộ = tác vụ.tạo(hàm()
        trong khi MV._wdToken == token và MV._NeedWatch() thực hiện
            pcall(MV._KeepAlive)
            task.wait(0.3)
        kết thúc
        if MV._wdToken == token then MV._wdToken, MV._wd = nil, nil end
    kết thúc)
    if MV._wdToken == token then MV._wd = thread end
kết thúc

---------- 🚀 BAY THEO CAMERA (v4.36) ----------
LÀM
local FL = { x = 0, z = 0, y = 0, holds = {}, showHud = true, focused = true, conns = {} }
MV.Flight = FL

hàm MV.ClearFlyInput()
    FL.x, FL.z, FL.y = 0, 0, 0
    FL.holds, FL.joyInput, FL.dragInput = {}, nil, nil
    if FL.knob and FL.knob.Parent then FL.knob.Position = UDim2.new(0.5, -14, 0.5, -14) end
kết thúc
hàm MV.SetFlyVirtual(x, z, y)
    FL.x, FL.z, FL.y = mvClamp(x, -1, 1, 0), mvClamp(z, -1, 1, 0), mvClamp(y, -1, 1, 0)
kết thúc
hàm MV._RestoreFlyHum()
    cục bộ h = FL.hum
    nếu h và h.Parent thì
        h.PlatformStand = FL.platformStand
        h.AutoRotate = FL.autoRotate
    kết thúc
    FL.hum = nil
kết thúc
hàm MV._DestroyFlyParts()
    for _, key in ipairs({"_bv", "_bg", "_floor"}) do
        if MV[key] then MV[key]:Destroy(); MV[key] = nil end
    kết thúc
kết thúc
hàm MV._EnsureFly()
    cục bộ r, h = MV.Root(), MV.Hum()
    if not MV.fly then return nil end
    nếu không phải r hoặc không phải h hoặc h.Health <= 0 thì
        MV._DestroyFlyParts()
        MV._RestoreFlyHum()
        MV.ClearFlyInput()
        FL.root = nil
        trả về nil
    kết thúc
    nếu FL.root ~= r thì
        MV._DestroyFlyParts()
        MV._RestoreFlyHum()
        MV.ClearFlyInput()
        FL.root = r
    kết thúc
    nếu FL.hum ~= h thì
        MV._RestoreFlyHum()
        FL.hum, FL.platformStand, FL.autoRotate = h, h.PlatformStand, h.AutoRotate
    kết thúc
    nếu MV._bv hoặc MV._bv.Parent không bằng r thì
        if MV._bv then MV._bv:Destroy() end
        MV._bv = New("BodyVelocity", {
            Tên = "BC_FlyVel", Lực tối đa = Vector3.new(1e9, 1e9, 1e9), Vận tốc = Vector3.zero,
        }, r)
    kết thúc
    nếu MV._bg hoặc MV._bg.Parent không bằng r thì
        if MV._bg then MV._bg:Destroy() end
        MV._bg = New("BodyGyro", {
            Tên = "BC_FlyGyro", Mô-men xoắn cực đại = Vector3.new(1e9, 1e9, 1e9), P = 1e4, D = 50,
        }, r)
    kết thúc
    if h.PlatformStand ~= true then h.PlatformStand = true end
    if h.AutoRotate ~= false then h.AutoRotate = false end
    nếu không phải MV._floor hoặc không phải MV._floor.Parent thì
        MV._floor = New("Part", {
            Tên = "BC_FlyFloor", Kích thước = Vector3.new(6, 0.2, 6), Độ trong suốt = 0.7,
            Màu = Color3.fromRGB(200, 230, 255), Chất liệu = Enum.Material.Glass,
            Cố định = true, CanCollide = false, CanTouch = false, CanQuery = false,
        }, không gian làm việc)
    kết thúc
    trả về r, h
kết thúc

hàm MV._ReadFlyInput(cf, h)
    if not FL.focused or UserInputService:GetFocusedTextBox() then return Vector3.zero end
    cục bộ x, z, y = FL.x, FL.z, FL.y
    local virtualDirection = FL.joyInput ~= nil or math.abs(x) + math.abs(z) > 0
    for _, v in pairs(FL.holds) do
        x ± vX; y ± vY; z ± vZ
        nếu vX ~= 0 hoặc vZ ~= 0 thì virtualDirection = true
    kết thúc
    local w = UserInputService:IsKeyDown(Enum.KeyCode.W)
    local s = UserInputService:IsKeyDown(Enum.KeyCode.S)
    local a = UserInputService:IsKeyDown(Enum.KeyCode.A)
    local d = UserInputService:IsKeyDown(Enum.KeyCode.D)
    nếu w hoặc s hoặc a hoặc d thì
        x, z = (d và 1 hoặc 0) - (a và 1 hoặc 0), (s và 1 hoặc 0) - (w và 1 hoặc 0)
    nếu không phải virtualDirection và h thì
        local md = h.MoveDirection
        local right = Vector3.new(cf.RightVector.X, 0, cf.RightVector.Z)
        if right.Magnitude > 0.001 then right = right.Unit else right = Vector3.new(1, 0, 0) end
        local forward = Vector3.new(right.Z, 0, -right.X)
        x, z = md:Dot(phải), -md:Dot(tiến)
    kết thúc
    local up = UserInputService:IsKeyDown(Enum.KeyCode.Space)
    local down = UserInputService:IsKeyDown(Enum.KeyCode.LeftShift)
        hoặc UserInputService:IsKeyDown(Enum.KeyCode.LeftControl)
    nếu lên hoặc xuống thì y = (lên và 1 hoặc 0) - (xuống và 1 hoặc 0) kết thúc
    trả về Vector3.new(x, y, z)
kết thúc
hàm MV.FlyVelocity(cf, input, speed)
    hướng cục bộ = cf.RightVector * input.X - cf.LookVector * input.Z + Vector3.new(0, input.Y, 0)
    Độ lớn cục bộ = hướng.Độ lớn
    nếu độ lớn < 0.001 thì trả về Vector3.zero
    nếu cường độ > 1 thì hướng = hướng / cường độ kết thúc -- chéo không nhanh hơn, giữ analog
    hướng trả về * mvClamp(tốc độ, 1, 2000, 50)
kết thúc
hàm MV._FlyStep()
    nếu không phải MV.fly thì trả về end
    MV._flyFrameAt = tick()
    local r, h = MV._EnsureFly()
    nếu không phải r thì trả về end
    local cam = workspace.CurrentCamera
    nếu có camera thì
        local cf = cam.CFrame
        MV._bv.Velocity = MV.FlyVelocity(cf, MV._ReadFlyInput(cf, h), MV.flySpeed)
        MV._bg.CFrame = CFrame.new(r.Position) * cf.Rotation
    khác
        MV._bv.Velocity = Vector3.zero
    kết thúc
    MV._floor.Position = r.Position - Vector3.new(0, 3.5, 0)
kết thúc
hàm MV._FlyFrame()
    cục bộ ok, err = pcall(MV._FlyStep)
    nếu không ổn thì
        FL.lastError = tostring(err)
        pcall(function() if MV._bv then MV._bv.Velocity = Vector3.zero end end)
        nếu tick() - (FL.errorAt hoặc -math.huge) > 2 thì
            FL.errorAt = tick()
            Warn("[taodepzai v5.0 NOIR] 🚀 Bay: " .. FL.lastError)
        kết thúc
    kết thúc
kết thúc
hàm MV._BindFly()
    if MV._flyBound or not MV.fly then return end
    RunService:UnbindFromRenderStep("Bay")
    RunService:BindToRenderStep("Fly", Enum.RenderPriority.Camera.Value + 1, MV._FlyFrame)
    MV._flyBound = true
    MV._flyFrameAt = tick()
kết thúc
hàm MV._StopFly()
    RunService:UnbindFromRenderStep("Bay")
    MV._flyBound = false
    MV._DestroyFlyParts()
    MV._RestoreFlyHum()
    MV.ClearFlyInput()
    FL.root = nil
kết thúc
hàm MV.SetFly(on)
    bật = (bật == đúng)
    nếu bật thì
        cục bộ r, h = MV.Root(), MV.Hum()
        nếu không r hoặc không h hoặc h.Health <= 0 thì trả về false, "chưa có nhân vật sống để bay" end
        if MV.Safe and MV.Safe.on then MV.Safe.Stop() end
        nếu MV._glassFlyActive thì MV.StopGlassFly() kết thúc
        if MV._playerFlyActive then MV.StopPlayerFly() end
        if MV.runMode then MV.SetRunMode(false) end
        if not MV.fly then MV.ClearFlyInput() end
        MV.fly = true
        MV._EnsureFly()
        MV._BindFly()
        MV._FlyFrame() -- phím tắt được giữ tại chỗ ngay lập tức, không có tốc độ mặc định lúc mới bật
    khác
        MV.fly = false
        MV._StopFly()
    kết thúc
    MV._Watchdog()
    MV.SyncHud()
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end
    trả về MV.fly
kết thúc
hàm MV.SetFlySpeed(n)
    n = tonumber(n)
    if not n or n ≠ n or n == math.huge or n == -math.huge then return false, "n tốc độ 1–2000" end
    MV.flySpeed ​​= mvClamp(n, 1, 2000, 50)
    MV.SyncHud()
    if S.RefreshMovePanel then S.RefreshMovePanel() end
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end
    trả về true, MV.flySpeed
kết thúc
hàm MV.SetFlyHud(on)
    FL.showHud = (on == true)
    if not FL.showHud then MV.ClearFlyInput() end
    MV.SyncHud()
    trả về FL.showHud
kết thúc

hàm MV._BuildFlyHud()
    if FL.hud and FL.hud.Parent then return FL.hud end
    for _, c in ipairs(FL.conns) do c:Disconnect() end
    FL.conns = {}
    MV.ClearFlyInput()
    hàm cục bộ connect(signal, callback)
        cục bộ c = trackConn(signal:Connect(callback))
        FL.conns[#FL.conns + 1] = c
    kết thúc
    cục bộ hud = New("Khung", {
        Tên = "BC_FlyHud", Kích thước = UDim2.new(0, 292, 0, 184), Vị trí = UDim2.new(0, 10, 1, -194),
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.18, BorderSizePixel = 0,
        Visible = false, ZIndex = 25,
    }, gui)
    FL.hud = hud
    Góc(hud, UDim.new(0, 12)); Đường viền(hud, C.HAIRLINE, 1)
    D.Shade(hud, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)
    tiêu đề cục bộ = Mới("Nhãn văn bản", {
        Tên = "FlyHudTitle", Kích thước = UDim2.new(1, -76, 0, 22), Vị trí = UDim2.new(0, 10, 0, 2),
        Văn bản = "🚀 Bay theo camera", Active = true, BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Phông chữ = Enum.Font.GothamBold, TextSize = 11, ZIndex = 26,
        TextXAlignment = Enum.TextXAlignment.Left,
    }, hud)
    nút chức năng cục bộ (tên, văn bản, x, y, w, h, màu sắc)
        cục bộ b = New("TextButton", {
            Tên = tên, Văn bản = văn bản, Kích thước = UDim2.new(0, w, 0, h), Vị trí = UDim2.new(0, x, 0, y),
            BackgroundColor3 = color, TextColor3 = D.BestText(color), BackgroundTransparency = 0.15,
            Font = Enum.Font.GothamBold, TextSize = 11, BorderSizePixel = 0, ZIndex = 28,
        }, hud)
        Góc(b, UDim.new(0, 8))
        trả lại b
    kết thúc
    local hide = button("FlyHudHide", "👁", 226, 2, 28, 22, C.SURFACE3)
    local close = button("FlyHudClose", "✕", 258, 2, 26, 22, C.RED)
    connect(hide.Activated, function() MV.SetFlyHud(false) end)
    hàm cục bộ dừng()
        MV.SetFly(false)
        S.Rebuild()
        D.Say("🚀 Bay: TẮT — công tắc Thường xuyên giữ nguyên", C.YELLOW)
    kết thúc
    kết nối (đóng.Đã kích hoạt, dừng)
    niềm vui cục bộ = Mới("Khung", {
        Tên = "FlyJoystick", Hoạt động = true, Kích thước = UDim2.new(0, 104, 0, 104),
        Vị trí = UDim2.new(0, 10, 0, 32), Màu nền 3 = C.SURFACE2,
        BackgroundTransparency = 0.15, BorderSizePixel = 0, ZIndex = 26,
    }, hud)
    Corner(joy, UDim.new(1, 0)); Stroke(joy, C.BORDER, 1)
    FL.knob = New("Frame", {
        Tên = "FlyKnob", Kích thước = UDim2.new(0, 28, 0, 28), Vị trí = UDim2.new(0.5, -14, 0.5, -14),
        BackgroundColor3 = C.ACCENT, BorderSizePixel = 0, ZIndex = 27,
    }, vui sướng)
    Góc(FL.knob, UDim.new(1, 0))
    con trỏ hàm cục bộ (đầu vào)
        return input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch
    kết thúc
    Hàm cục bộ khớp với (được giữ, đầu vào, di chuyển)
        trả về held == input hoặc (held và held.UserInputType == Enum.UserInputType.MouseButton1)
            và input.UserInputType == (moving và Enum.UserInputType.MouseMovement hoặc Enum.UserInputType.MouseButton1))
    kết thúc
    hàm cục bộ updateJoy(pos)
        local delta = Vector2.new(pos.X, pos.Y) - (joy.AbsolutePosition + joy.AbsoluteSize * 0.5)
        if delta.Magnitude > 38 then delta = delta.Unit * 38 end
        FL.x, FL.z = delta.X/38, delta.Y/38
        FL.knob.Position = UDim2.new(0.5, delta.X - 14, 0.5, delta.Y - 14)
    kết thúc
    kết nối(joy.InputBegan, function(input)
        nếu con trỏ (đầu vào) và MV.fly và FL.showHud và không phải FL.joyInput thì
            FL.joyInput = input; updateJoy(input.Position)
        kết thúc
    kết thúc)
    hàm cục bộ hold(name, text, x, y, w, h, axis, color)
        local b = button(name, text, x, y, w, h, color or C.SURFACE3)
        kết nối(b.InputBegan, function(input)
            if pointer(input) and MV.fly and FL.showHud then FL.holds[input] = axis end
        kết thúc)
        connect(b.InputEnded, function(input) FL.holds[input] = nil end)
    kết thúc
    hold("FlyForward", "↑", 150, 32, 30, 30, Vector3.new(0, 0, -1))
    hold("FlyBack", "↓", 150, 100, 30, 30, Vector3.new(0, 0, 1))
    hold("FlyLeft", "←", 116, 66, 30, 30, Vector3.new(-1, 0, 0))
    hold("FlyRight", "→", 184, 66, 30, 30, Vector3.new(1, 0, 0))
    hold("FlyUp", "⬆", 238, 32, 40, 44, Vector3.new(0, 1, 0), C.GREEN)
    hold("FlyDown", "⬇", 238, 82, 40, 44, Vector3.new(0, -1, 0), C.RED)
    local stopBtn = button("FlyHudStop", "⏹ cột", 198, 144, 80, 28, C.RED)
    kết nối(stopBtn.Activated, dừng)
    FL.status = New("TextLabel", {
        Tên = "FlyHudStatus", Kích thước = UDim2.new(0, 182, 0, 36), Vị trí = UDim2.new(0, 10, 0, 140),
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
        Kích thước văn bản = 9, Văn bản xuống dòng = true, Căn chỉnh văn bản theo trục X = Enum.TextXAlignment.Left, Chỉ số Z = 26,
    }, hud)
    kết nối(title.InputBegan, function(input)
        nếu con trỏ (đầu vào) và không phải là FL.dragInput thì
            FL.dragInput, FL.dragStart, FL.dragPos = input, input.Position, hud.Position
        kết thúc
    kết thúc)
    kết nối(UserInputService.InputChanged, function(input)
        if matches(FL.joyInput, input, true) then updateJoy(input.Position) end
        nếu khớp với (FL.dragInput, input, true) thì
            delta cục bộ = input.Position - FL.dragStart
            hud.Position = UDim2.new(FL.dragPos.X.Scale, FL.dragPos.X.Offset + delta.X,
                FL.dragPos.Y.Scale, FL.dragPos.Y.Offset + delta.Y)
        kết thúc
    kết thúc)
    kết nối(UserInputService.InputEnded, function(input)
        for held in pairs(FL.holds) do if matches(held, input, false) then FL.holds[held] = nil end end
        nếu khớp với (FL.joyInput, input, false) thì
            FL.joyInput, FL.x, FL.z = nil, 0, 0
            FL.knob.Position = UDim2.new(0.5, -14, 0.5, -14)
        kết thúc
        if matches(FL.dragInput, input, false) then FL.dragInput = nil end
    kết thúc)
    kết nối(UserInputService.WindowFocusReleased, function())
        FL.focused = false
        MV.ClearFlyInput()
        nếu MV._bv thì MV._bv.Velocity = Vector3.zero
    kết thúc)
    connect(UserInputService.WindowFocused, function() FL.focused = true end)
    trả về hud
kết thúc
hàm MV.SyncFlyHud()
    if MV.fly then MV._BuildFlyHud() end
    nếu FL.hud và FL.hud.Parent thì
        FL.hud.Visible = MV.fly và FL.showHud
        FL.status.Text = string.format("💨 %g · 🧱 %s\nThả phím / cần: đứng cân ngang", MV.flySpeed, MV.noclip và "BẬT" hoặc "TẮT")
    kết thúc
    if S.SyncFlyPanel then S.SyncFlyPanel() end
kết thúc
kết thúc -- 🚀 BAY THEO CAMERA

--------- 💨 CAMERA TỐC ĐỘ THEO (v4.37) ----------
LÀM
CS cục bộ = { tập trung = true }
MV.CamSpeed ​​= CS

hàm MV._DestroySpeedParts()
    if MV._sv then MV._sv:Destroy(); MV._sv = nil end
kết thúc
hàm MV._EnsureSpeed()
    cục bộ r, h = MV.Root(), MV.Hum()
    if not MV.sprint then return nil end
    nếu MV.fly hoặc (MV.Safe và MV.Safe.on) thì
        MV._DestroySpeedParts()
        CS.root = nil
        trả về nil
    kết thúc
    nếu không phải r hoặc không phải h hoặc h.Health <= 0 thì
        MV._DestroySpeedParts()
        CS.root = nil
        trả về nil
    kết thúc
    nếu CS.root ~= r thì
        MV._DestroySpeedParts()
        CS.root = r
    kết thúc
    nếu MV._sv hoặc MV._sv.Parent không bằng r thì
        if MV._sv then MV._sv:Destroy() end
        MV._sv = New("BodyVelocity", {
            Tên = "BC_SpeedVel", Lực tối đa = Vector3.new(1e9, 0, 1e9), Vận tốc = Vector3.zero,
        }, r)
    khác
        local mf = MV._sv.MaxForce
        nếu mf và (mf.Y ~= 0) thì
            MV._sv.MaxForce = Vector3.new(1e9, 0, 1e9)
        kết thúc
    kết thúc
    trả về r, h
kết thúc

hàm MV._ReadSpeedInput(cf, h)
    if not CS.focused or UserInputService:GetFocusedTextBox() then return Vector3.zero end
    cục bộ x, z = 0, 0
    local w = UserInputService:IsKeyDown(Enum.KeyCode.W)
    local s = UserInputService:IsKeyDown(Enum.KeyCode.S)
    local a = UserInputService:IsKeyDown(Enum.KeyCode.A)
    local d = UserInputService:IsKeyDown(Enum.KeyCode.D)
    nếu w hoặc s hoặc a hoặc d thì
        x, z = (d và 1 hoặc 0) - (a và 1 hoặc 0), (s và 1 hoặc 0) - (w và 1 hoặc 0)
    nếu h thì
        local md = h.MoveDirection
        local right = Vector3.new(cf.RightVector.X, 0, cf.RightVector.Z)
        if right.Magnitude > 0.001 then right = right.Unit else right = Vector3.new(1, 0, 0) end
        local forward = Vector3.new(right.Z, 0, -right.X)
        x, z = md:Dot(phải), -md:Dot(tiến)
    kết thúc
    return Vector3.new(x, 0, z)
kết thúc
hàm MV.SpeedVelocity(cf, input, speed)
    local look = Vector3.new(cf.LookVector.X, 0, cf.LookVector.Z)
    local right = Vector3.new(cf.RightVector.X, 0, cf.RightVector.Z)
    nếu độ lớn nhìn < 0,001 thì
        if right.Magnitude > 0.001 then right = right.Unit else right = Vector3.new(1, 0, 0) end
        look = Vector3.new(right.Z, 0, -right.X)
    khác
        nhìn = nhìn.Đơn vị
    kết thúc
    if right.Magnitude > 0.001 then right = right.Unit else right = Vector3.new(1, 0, 0) end
    hướng cục bộ = phải * input.X - nhìn * input.Z
    hướng = Vector3.new(hướng.X, 0, hướng.Z)
    Độ lớn cục bộ = hướng.Độ lớn
    nếu độ lớn < 0.001 thì trả về Vector3.zero
    nếu độ lớn > 1 thì hướng = hướng / độ lớn kết thúc
    hướng trả về * mvClamp(tốc độ, 1, 2000, 50)
kết thúc
hàm MV._SpeedStep()
    nếu không phải MV.sprint thì trả về end
    MV._speedFrameAt = tick()
    local r, h = MV._EnsureSpeed()
    nếu không phải r hoặc không phải MV._sv thì trả về end
    local cam = workspace.CurrentCamera
    nếu không phải là camera thì
        MV._sv.MaxForce = Vector3.new(0, 0, 0)
        MV._sv.Velocity = Vector3.zero
        trở lại
    kết thúc
    local vel = MV.SpeedVelocity(cam.CFrame, MV._ReadSpeedInput(cam.CFrame, h), MV.sprintSpeed)
    nếu vận tốc.Magnitude < 0.001 thì
        MV._sv.MaxForce = Vector3.new(0, 0, 0)
        MV._sv.Velocity = Vector3.zero
    khác
        MV._sv.MaxForce = Vector3.new(1e9, 0, 1e9)
        MV._sv.Velocity = Vector3.new(vel.X, 0, vel.Z)
    kết thúc
kết thúc
hàm MV._SpeedFrame()
    cục bộ ok, err = pcall(MV._SpeedStep)
    nếu không ổn thì
        CS.lastError = tostring(err)
        pcall(function() if MV._sv then MV._sv.Velocity = Vector3.zero end end)
        nếu tick() - (CS.errorAt hoặc -math.huge) > 2 thì
            CS.errorAt = tick()
            Warn("[taodepzai v5.0 NOIR] 💨 Tốc độ: " .. CS.lastError)
        kết thúc
    kết thúc
kết thúc
hàm MV._BindSpeed()
    if MV._speedBound or not MV.sprint then return end
    RunService:UnbindFromRenderStep("BC_Speed")
    RunService:BindToRenderStep("BC_Speed", Enum.RenderPriority.Camera.Value + 1, MV._SpeedFrame)
    MV._speedBound = true
    MV._speedFrameAt = tick()
kết thúc
hàm MV._StopSpeed()
    RunService:UnbindFromRenderStep("BC_Speed")
    MV._speedBound = false
    MV._DestroySpeedParts()
    CS.root = nil
kết thúc
hàm MV.SetSprint(on)
    bật = (bật == đúng)
    nếu bật thì
        cục bộ r, h = MV.Root(), MV.Hum()
        nếu không phải r hoặc không h hoặc h.Health <= 0 thì trả về false, "chưa có nhân vật sống để chạy" end
        MV.sprint = true
        MV._EnsureSpeed()
        MV._BindSpeed()
        MV._SpeedFrame()
    khác
        MV.sprint = false
        MV._StopSpeed()
    kết thúc
    MV._Watchdog()
    if S.SyncSpeedPanel then S.SyncSpeedPanel() end
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end
    trả về MV.sprint
kết thúc
hàm MV.SetSprintSpeed(n)
    n = tonumber(n)
    if not n or n ≠ n or n == math.huge or n == -math.huge then return false, "n tốc độ 1–2000" end
    MV.sprintSpeed ​​= mvClamp(n, 1, 2000, 50)
    if S.SyncSpeedPanel then S.SyncSpeedPanel() end
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end
    trả về true, MV.sprintSpeed
kết thúc
end -- 💨 TỐC ĐỘ THEO CAMERA

--------- 🦘 NHẢY CAO (v4.38) ----------
LÀM
cục bộ HJ = { cuối cùng = 0 }
MV.HighJump = HJ

hàm MV.WantJumpSpeed()
    if MV.highJump then return mvClamp(MV.highJumpSpeed, 1, 500, 80) end
    return mvClamp(MV.jumpPower, 1, 500, 50)
kết thúc
hàm MV.HighJumpVelocity(current, speed)
    local vx = MV.comp(current, "X", 0)
    local vz = MV.comp(current, "Z", 0)
    return Vector3.new(vx, mvClamp(speed, 1, 500, 80), vz)
kết thúc
hàm MV._HighJumpApplyPower()
    nếu không phải MV.highJump thì trả về end
    local h = MV.Hum()
    nếu không phải h thì trả về end
    local jp = mvClamp(MV.highJumpSpeed, 1, 500, 80)
    pcall(function()
        nếu h.UseJumpPower ~= false thì
            if (tonumber(h.JumpPower) or 0) ~= jp then h.JumpPower = jp end
        kết thúc
        local g = tonumber(workspace.Gravity) or 0
        nếu g < 1 thì g = 196,2 kết thúc
        local jh = mvClamp((jp * jp) / (2 * g), 1, 500)
        if math.abs((tonumber(h.JumpHeight) or 0) - jh) > 0.05 then h.JumpHeight = jh end
    kết thúc)
kết thúc
hàm MV._DoHighJump()
    if not MV.highJump then return false end
    nếu MV.fly hoặc (MV.Safe và MV.Safe.on) thì trả về false.
    cục bộ h, r = MV.Hum(), MV.Root()
    nếu không phải h hoặc không phải r thì trả về false.
    nếu h.Sit thì trả về false
    local st = h:GetState()
    if st == Enum.HumanoidStateType.Freefall then return false end
    local now = os.clock()
    nếu HJ.last và (now - HJ.last) < 0.12 thì trả về false.
    HJ.last = bây giờ
    MV._HighJumpApplyPower()
    pcall(function() h:ChangeState(Enum.HumanoidStateType.Jumping) end)
    pcall(function() h.Jump = true end)
    pcall(function()
        r.AssemblyLinearVelocity = MV.HighJumpVelocity(r.AssemblyLinearVelocity, MV.highJumpSpeed)
    kết thúc)
    trả về giá trị đúng
kết thúc
hàm MV._HighJumpBind()
    if HJ.conn or not MV.highJump then return end
    HJ.conn = trackConn(UserInputService.JumpRequest:Connect(function()
        pcall(MV._DoHighJump)
    kết thúc))
    HJ.conn2 = trackConn(UserInputService.InputBegan:Connect(function(i, gp)
        nếu không phải MV.highJump thì trả về end
        pcall(function()
            local tb = UserInputService:GetFocusedTextBox()
            nếu tb và tb:IsDescendantOf(gui) thì trả về end
            cục bộ k = i và i.KeyCode
            if k == Enum.KeyCode.Space or k == Enum.KeyCode.ButtonA then MV._DoHighJump() end
        kết thúc)
    kết thúc))
kết thúc
hàm MV._HighJumpUnbind()
    for _, c in ipairs({ HJ.conn, HJ.conn2 }) do
        nếu c thì pcall(function() c:Disconnect() end) end
    kết thúc
    HJ.conn, HJ.conn2 = nil, nil
kết thúc
hàm MV.SetHighJump(on)
    bật = (bật == đúng)
    if on == MV.highJump then return MV.highJump end
    local h = MV.Hum()
    nếu bật thì
        nếu h thì HJ.baseJP, HJ.baseJH = h.JumpPower, h.JumpHeight end
        MV.highJump = true
        MV._HighJumpApplyPower()
        MV._HighJumpBind()
    khác
        MV.highJump = false
        MV._HighJumpUnbind()
        nếu h không phải là MV.infJump thì
            if HJ.baseJP ~= nil then pcall(function() h.JumpPower = HJ.baseJP end) end
            if HJ.baseJH ~= nil then pcall(function() h.JumpHeight = HJ.baseJH end) end
        kết thúc
        HJ.baseJP, HJ.baseJH = không, không
    kết thúc
    MV._Watchdog()
    if S.SyncHighJumpPanel then S.SyncHighJumpPanel() end
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end
    trả về MV.highJump
kết thúc
hàm MV.SetHighJumpSpeed(n)
    n = tonumber(n)
    if not n or n ≠ n or n == math.huge or n == -math.huge then return false, "n tốc độ nhảy 1–500" end
    MV.highJumpSpeed ​​= mvClamp(n, 1, 500, 80)
    if MV.highJump then pcall(MV._HighJumpApplyPower) end
    if S.SyncHighJumpPanel then S.SyncHighJumpPanel() end
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end
    trả về true, MV.highJumpSpeed
kết thúc
kết thúc -- 🦘 NHẢY CAO

LÀM
MV.Safe = {
    bật = false,
    auto = true, -- ➡ auto bay (không nhấn gì vẫn bay theo camera hướng)
    bán kính = 25, -- 📏 cách xác định khoảng cách để né (đinh tán)
    tốc độ = 60, -- 💨 tốc độ bay
    lái = 4, -- 🌀 né gạt (1–10)
    lá chắn = true, -- 🔲 bức tường trong suốt hình vuông bao quanh (nhìn thấy vùng né)
    ShieldThk = 0.4, -- độ dày vách
    ShieldH = 0, -- v4.23: 0 = chiều cao TỰ ĐỘNG theo nhân vật (trước đây cố định 16)
    ShieldSize = 0, -- v4.23: nửa viền viền (đinh tán). 0 = Tự động vật vật; 📏 KHÔNG kéo giãn giãn
    lá chắnT = 0,86, -- độ trong suốt (càng nhỏ càng rõ)
    tránhPlayers = true,-- 👤 né cả NGƯỜI CHƠI khác (dù họ đứng yên)
    Circle = true, -- ⭕ không có mối nguy hiểm nào -> tự bay VÒNG TRÒN
    roundR = 20, -- ⭕ bán kính tròn
    lookTime = 1.0, -- 👁 nhìn trước bao nhiêu giây để né vật ĐANG BAY TỚI mình
    lookMul = 1.6, -- 👁 quét xa hơn vùng né bấy nhiêu lần (bắt vật từ xa lao tới)
    _holdAt = 0, -- thời điểm cuối cùng còn mối nguy (né more 0,35s cho chắc)
    _myV = Vector3.new(0, 0, 0), -- Vận tốc mình ĐANG định bay ( để tính tốc độ lao vào nhau)
    _ang = 0, _center = nil, -- ⭕ góc + tâm vòng
    noclip = true, -- 🧱 tự bật Xuyên Tường để đưa ra nhiều vật cản
    _ncPrev = nil, -- trạng thái Xuyên Tường TRƯỚC KHI bật 🛡 (để trả lại đúng)
    _shield = nil, -- 4 vách trong suốt
    _shieldPos = nil,
    _hum = nil, -- Humanoid mà Safe Fly đã thay đổi trạng thái
    _platformStandPrev = nil,
    _autoRotatePrev = nil,
    _root = nil, -- v4.23: nhân vật đang gắn kết (đổi là tự động khôi phục phần bay + xương)
    _bound = false, -- v4.23: unmount "BC_Safe" riêng biệt của vòng lặp
    _lastFrameAt = 0, -- v4.23: vòng lặp cuối cùng 🛡 chạy (watchdog soi còn sống không)
    playerThreats = 0,
    mối đe dọa = 0, gần nhất = nil, -- để hiện trạng thái
    _rep = Vector3.new(0, 0, 0), -- vector Đẩy của lần quét gần nhất
    _seen = {}, _cache = nil, _listAcc = 0, _sc = 0,
    _virtX = 0, _virtZ = 0, _virtY = 0,
    showHud = true,
    _hud = nil,
    _joyBG = nil, _joyKnob = nil, _dragging = false,
    _bv = nil, _bg = nil,
}
SF cục bộ = MV.Safe

hàm cục bộ sfIsPart(d)
    nếu d == nil thì trả về false
    local okA, isPart = pcall(function() return d:IsA("BasePart") end) -- game thật: IsA có sẵn
    if okA and isPart ~= nil then return isPart == true end
    local okC, cls = pcall(function() return tostring(d.ClassName or "") end)
    nếu không phải okC thì trả về false.
    return (cls == "Part" or cls == "MeshPart" or cls == "WedgePart" or cls == "TrussPart")
            hoặc cls == "CornerWedgePart" hoặc cls == "UnionOperation" hoặc cls == "NegateOperation"
            hoặc cls == "IntersectOperation" hoặc cls == "Ball" hoặc cls == "Cylinder"
            hoặc cls == "SpawnLocation" hoặc cls == "Seat" hoặc cls == "VehicleSeat" hoặc cls == "Platform")
kết thúc
hàm cục bộ sfIgnore(d, char)
    local nm = tostring(d.Name or "")
    if nm:sub(1, 3) == "BC_" then return true end
    if char and d:IsDescendantOf(char) then return true end
    sàn cục bộ = MV._floor
    if floor and floor.Parent and d:IsDescendantOf(floor) then return true end
    trả về false
kết thúc
hàm cục bộ sfOverlap(char)
    if SF._op and SF._opChar == char then return SF._op end
    cục bộ ok, op = pcall(function() return OverlapParams.new() end)
    if not ok or op == nil then return nil end
    pcall(function() op.MaxParts = 0 end) -- 0 = không giới hạn
    pcall(function() op.RespectCanCollide = false end) -- vật không và vi hạt vẫn tính
    pcall(function() op.FilterType = Enum.RaycastFilterType.Exclude end) -- API mới
    pcall(function() op.FilterDescendantsInstances = { char } end) -- bỏ qua một phần của chính mình
    SF._op, SF._opChar = op, char
    trả lại op
kết thúc
hàm cục bộ sfCandidates(pos, dt, reach)
    r0 cục bộ = phạm vi hoặc bán kính SF
    local char0 = MV.Char()
    local op0 = sfOverlap(char0)
    local okL, list = pcall(function() return workspace:GetPartBoundsInRadius(pos, r0, op0) end)
    if not okL then okL, list = pcall(function() return workspace:GetPartBoundsInRadius(pos, r0) end) end
    nếu okL và kiểu (danh sách) == "table" thì trả về danh sách kết thúc
    SF._listAcc = (SF._listAcc hoặc 0) + (dt hoặc 0,15)
    nếu SF._cache hoặc SF._listAcc không lớn hơn hoặc bằng 2 thì
        SF._listAcc = 0
        đầu ra cục bộ = {}
        local ok2, desc = pcall(function() return workspace:GetDescendants() end)
        nếu ok2 và type(desc) == "table" thì
            for _, d in ipairs(desc) do
                nếu #out >= 600 thì thoát.
                nếu sfIsPart(d) thì out[#out + 1] = d end
            kết thúc
        kết thúc
        SF._cache = out
    kết thúc
    trả về SF._cache hoặc {}
kết thúc
hàm cục bộ sfPlayers(pos, rad, rep0, near0)
    đại diện cục bộ, n, gần = đại diện0, 0, gần0
    nếu không phải SF.avoidPlayers thì trả về rep, n, gần cuối
    local char = MV.Char()
    cục bộ ok, danh sách = pcall(function() return Players:GetPlayers() end)
    Nếu không ổn hoặc kiểu (danh sách) ~= "bảng" thì trả về rep, n, gần cuối.
    for _, pl in ipairs(list) do
        nếu pl ~= player thì
            local ch = pl.Character
            nếu ch và ch ~= char thì
                local hrp = ch:FindFirstChild("HumanoidRootPart") or ch:FindFirstChildOfClass("BasePart")
                pp cục bộ = hrp và hrp.Vị trí
                nếu pp thì
                    delta cục bộ = pp - pos
                    khoảng cách cục bộ = delta.Độ lớn
                    nếu dist <= rad và dist > 0,01 thì
                        n = n + 1
                        if near == nil or dist < near then near = dist end
                        w cục bộ = 1 - (khoảng cách / rad)
                        Rep = Rep - (delta / dist) * (0.5 + w * w * 3) -- TRỪ = Đưa RA XA
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc
    trả lại rep, n, gần
kết thúc
hàm MV.Safe.Scan(pos, dt)
    local char = MV.Char()
    bán kính cục bộ = mvClamp(SF.radius, 1, 300, 25)
    tầm với cục bộ = rad * mvClamp(SF.lookMul, 1, 4, 1.6)
    local lookT = mvClamp(SF.lookTime, 0.1, 3, 1.0)
    local myV = SF._myV hoặc Vector3.new(0, 0, 0) -- vận tốc MÌNH (mình bay tới nó cũng tính)
    local rep = Vector3.new(0, 0, 0)
    cục bộ n, gần = 0, nil
    cục bộ hiện tại = tick()
    cục bộ đã thấy = {}
    cục bộ pchars = {}
    local pls = Players:GetPlayers()
    nếu type(pls) == "table" thì
        for _, pl in ipairs(pls) do
            nếu pl ~= player thì
                local ch2 = pl.Character
                if ch2 ~= nil and ch2 ~= char then pchars[ch2] = true end
            kết thúc
        kết thúc
    kết thúc
    local hasPChar = (next(pchars) ~= nil)
    hàm cục bộ trongPChar(d)
        nếu không có ký tự PChar thì trả về false.
        for ch2 in pairs(pchars) do
            nếu d:IsDescendantOf(ch2) thì trả về true
        kết thúc
        trả về false
    kết thúc
    SF._mvCount = 0 -- v4.20: đếm vật ĐANG CHẠY trong tầm (để soi trạng thái)
    for _, d in ipairs(sfCandidates(pos, dt, reach)) do
        nếu sfIsPart(d) và không phải sfIgnore(d, char) và không phải inPChar(d) thì
            vị trí cục bộ p = d.Vị trí
            nếu p thì
                delta cục bộ = p - pos
                khoảng cách cục bộ = delta.Độ lớn
                rr cục bộ = 0
                local sz = d.Size
                nếu sz thì
                    local mx = math.max(sz.X, sz.Y, sz.Z)
                    if type(mx) == "number" then rr = mx * 0.5 end
                kết thúc
                nếu rr > rad * 0.75 thì rr = rad * 0.75
                sóng cục bộ = khoảng cách - rr
                nếu surf < 0 thì surf = 0
                nếu surf <= reach và dist > 0.01 thì
                    local dir = delta / dist -- hướng TỚI vật
                    di chuyển cục bộ, đóng = false, 0
                    local v = d.AssemblyLinearVelocity
                    nếu v và v.Magnitude thì
                        nếu v.Magnitude > 1.5 thì moving = true end
                        closing = -(vX * dir.X + vY * dir.Y + vZ * dir.Z)
                    kết thúc
                    cục bộ cũ = SF._seen[d]
                    nếu cũ thì
                        local dd = (p - old.p).Magnitude
                        local ddt = math.max(now - old.t, 0.02)
                        nếu dd > 0,35 hoặc (dd / ddt) > 1,5 thì moving = true end
                        nếu closing <= 0.5 và dd > 0.1 thì
                            closing = math.max(closing, dd / ddt)
                        kết thúc
                    kết thúc
                    nếu không di chuyển thì
                        local hum0 = d:FindFirstAncestorOfClass("Humanoid")
                        nếu hum0 == nil thì
                            anc cục bộ = d.Cha
                            if anc then hum0 = anc:FindFirstChildOfClass("Humanoid") end
                        kết thúc
                        nếu hum0 ~= nil thì
                            local md = hum0.MoveDirection
                            local mdMag = 0
                            nếu md thì
                                cục bộ m2 = md.Độ lớn
                                if type(m2) == "number" then mdMag = m2 end
                            kết thúc
                            nếu mdMag > 0.05 thì moving = true end
                        kết thúc
                    kết thúc
                    nếu đang di chuyển và lướt sóng <= đạt tới thì SF._mvCount = (SF._mvCount hoặc 0) + 1 kết thúc
                    đã thấy[d] = { p = p, t = bây giờ }
                    Nguy hiểm cục bộ = (sóng <= bức xạ và đang di chuyển)
                    local tHit = nil
                    nếu giá đóng cửa > 0,5 thì
                        tHit = (surf - rad * 0.35) / đóng -- còn bao lâu thì MẶT vật tới sát mình
                        nếu tHit <= lookT thì danger = true end
                    kết thúc
                    nếu có nguy hiểm thì
                        n = n + 1
                        if near == nil or surf < near then near = surf end
                        local w = mvClamp(1 - (surf / (rad * mvClamp(SF.lookMul, 1, 4, 1.6))), 0.2, 1)
                        myDot cục bộ = mvClamp(myV.X * dir.X + myV.Y * dir.Y + myV.Z * dir.Z, 0, 200)
                        Tăng cường cục bộ = 1 + mvClamp(đóng, 0, 200) / 60 + myDot / 240
                        cục bộ pv = p
                        nếu v và v.Magnitude > 0.1 thì pv = p + v * 0.35
                        local pdir = pv - pos
                        nếu pdir.Magnitude > 0.01 thì
                            pdir = pdir.Unit
                            nếu (pdir.X * dir.X + pdir.Y * dir.Y + pdir.Z * dir.Z) < 0 thì pdir = dir end
                        khác
                            pdir = dir
                        kết thúc
                        rep = rep - pdir * (0.35 + w * w * 3) * boost
                    kết thúc
                kết thúc
            kết thúc
        kết thúc
    kết thúc
    cục bộ pn0 = n
    rep, n, near = sfPlayers(pos, rad, rep, near)
    SF.playerThreats = n
    n = pn0 + n
    SF._seen = đã thấy
    SF._rep = rep
    SF.movers = SF._mvCount hoặc 0
    SF._mvCount = nil
    SF.threats, SF.nearest = n, gần
    nếu n > 0 thì
        SF._holdAt = bây giờ
        SF._lastThreatAt = now -- v4.20: nhớ vừa đủ (để né tiếp)
        if Rep.Magnitude > 0 thì SF._lastRep = Rep end -- nhớ HƯỚNG đang né
    kết thúc
    trả lại n, gần, rep
kết thúc
--------- v4.18: 🔲 BỨC TƯỜNG TRONG SUỐT HÌNH VUÔNG bao quanh mình ----------
hàm MV.Safe.KillShield()
    for i = 1, 4 do
        cục bộ w = SF._shield và SF._shield[i]
        nếu w thì pcall(function() w:Destroy() end) end
    kết thúc
    SF._shield, SF._shieldPos = nil, nil
kết thúc
hàm MV.Safe.ShieldHalf()
    local n = tonumber(SF.shieldSize)
    nếu n và n > 0 thì trả về mvClamp(n, 0.5, 300, 3) kết thúc -- chỉnh tay
    cục bộ w = 2
    cục bộ r = MV.Root()
    if r then pcall(function() w = math.max(tonumber(r.Size.X) or 2, tonumber(r.Size.Z) or 2) end) end
    return mvClamp(w * 0.5 + 1.6, 2, 8, 3) -- người thường: 2,6 stud (cạnh ~5,2)
kết thúc
hàm MV.Safe.ShieldHeight()
    cục bộ n = tonumber(SF.shieldH)
    nếu n và n > 0 thì trả về mvClamp(n, 1, 100, 8) kết thúc
    cục bộ hh = 2
    cục bộ r = MV.Root()
    nếu r thì pcall(function() hh = tonumber(r.Size.Y) or 2 end) end
    return mvClamp(hh * 3 + 2, 4, 14, 8) -- người thường: 8 stud
kết thúc
hàm MV.Safe.BuildShield()
    MV.Safe.KillShield()
    phía cục bộ, h = MV.Safe.ShieldHalf(), MV.Safe.ShieldHeight()
    local thk = SF.shieldThk
    SF._shield = {}
    for i = 1, 4 do
        local long = (i <= 2)
        cục bộ w = New("Phần", {
            Tên = "BC_Shield" .. i,
            Kích thước = long và Vector3.new(side * 2 + thk, h, thk) hoặc Vector3.new(thk, h, side * 2 + thk),
            Độ trong suốt = SF.shieldT,
            Màu = Color3.fromRGB(120, 225, 255),
            Vật liệu = Enum.Material.Glass,
            Cố định = true, CanCollide = false, CastShadow = false,
        }, không gian làm việc)
        SF._shield[i] = w
    kết thúc
kết thúc
hàm MV.Safe.UpdateShield(pos)
    nếu không (SF.on và SF.shield) thì
        if SF._shield then MV.Safe.KillShield() end
        trở lại
    kết thúc
    local side = MV.Safe.ShieldHalf()
    local wallH = MV.Safe.ShieldHeight()
    nhu cầu địa phương = (SF._shield == nil)
    nếu không cần thiết thì
        for i = 1, 4 do
            cục bộ w = SF._shield[i]
            if not w or not w.Parent then need = true break end
        kết thúc
    kết thúc
    nếu cần thì pcall(MV.Safe.BuildShield) end
    nếu không phải SF._shield hoặc không phải SF._shield[1] thì trả về kết thúc
    cục bộ q = SF._shieldPos
    nếu q và math.abs(qX - pos.X) < 0.05 và math.abs(qY - pos.Y) < 0.05 và math.abs(qZ - pos.Z) < 0.05
       và math.abs((qS hoặc 0) - side) < 0.01 và math.abs((qH hoặc 0) - wallH) < 0.01 thì
        trở lại
    kết thúc
    SF._shieldPos = { X = vị trí X, Y = vị trí Y, Z = vị trí Z, S = cạnh, H = chiều cao tường }
    for i = 1, 4 do
        cục bộ w = SF._shield[i]
        nếu w thì
            dx, dz cục bộ = 0, 0
            Nếu i == 1 thì dz = cạnh, ngược lại nếu i == 2 thì dz = -cạnh
            elseif i == 3 then dx = side else dx = -side end
            local okS = pcall(function()
                w.Size = (i <= 2) và Vector3.new(side * 2 + SF.shieldThk, wallH, SF.shieldThk)
                                      hoặc Vector3.new(SF.shieldThk, wallH, side * 2 + SF.shieldThk)
                w.CFrame = CFrame.new(pos.X + dx, pos.Y, pos.Z + dz)
            kết thúc)
            if not okS then MV.Safe.KillShield(); return end
        kết thúc
    kết thúc
kết thúc
hàm MV.Safe._EnsureBV()
    cục bộ r = MV.Root()
    nếu không phải r thì trả về nil, nil end
    nếu SF._bv và SF._bv.Parent == r và SF._bg và SF._bg.Parent == r thì
        trả về SF._bv, SF._bg
    kết thúc
    pcall(function() if SF._bv then SF._bv:Destroy() end end)
    pcall(function() if SF._bg then SF._bg:Destroy() end end)
    local bv = New("BodyVelocity", { Name = "BC_SafeFlyVel", MaxForce = Vector3.new(1e9, 1e9, 1e9), Velocity = Vector3.new(0,0,0) }, r)
    local bg = New("BodyGyro", { Name = "BC_SafeFlyGyro", MaxTorque = Vector3.new(1e9, 1e9, 1e9), P = 1e4, D = 50 }, r)
    SF._bv, SF._bg = bv, bg
    local h = MV.Hum()
    nếu h thì
        nếu SF._hum ~= h thì
            SF._hum = h
            pcall(function() SF._platformStandPrev = h.PlatformStand end)
            pcall(function() SF._autoRotatePrev = h.AutoRotate end)
        kết thúc
        pcall(function() h.PlatformStand = true end)
        pcall(function() h.AutoRotate = false end)
    kết thúc
    trả về bv, bg
kết thúc

hàm MV.Safe._RestoreHum()
    cục bộ h = SF._hum
    nếu h và h.Parent thì
        nếu SF._platformStandPrev khác nil thì
            pcall(function() h.PlatformStand = SF._platformStandPrev end)
        kết thúc
        nếu SF._autoRotatePrev khác nil thì
            pcall(function() h.AutoRotate = SF._autoRotatePrev end)
        kết thúc
    kết thúc
    SF._hum = nil
    SF._platformStandPrev = nil
    SF._autoRotatePrev = nil
kết thúc

hàm MV.Safe.Repair()
    cục bộ r = MV.Root()
    nếu không phải r thì trả về false kết thúc
    local bv, bg = MV.Safe._EnsureBV()
    nếu không phải bv hoặc MV.Root() ~= r thì
        trả về false
    kết thúc
    MV.flySpeed ​​= mvClamp(SF.speed, 1, 2000, 60)
    trả về giá trị đúng
kết thúc
hàm MV.Safe.Bind()
    nếu SF._bound thì trả về true
    SF._bound = pcall(function() RunService:BindToRenderStep("BC_Safe", 2, MV.Safe._Frame) end)
    trả về SF._bound == true
kết thúc
hàm MV.Safe.Unbind()
    SF._bound = false
    pcall(function() RunService:UnbindFromRenderStep("BC_Safe") end)
kết thúc
function MV.Safe._Frame(dt) pcall(MV.Safe.Step, dt) end
hàm MV.Safe.Step(dt)
    nếu không phải SF.on thì trả về end
    SF._lastFrameAt = tick()
    cục bộ r, h = MV.Root(), MV.Hum()
    nếu không phải r thì
        if SF._shield then pcall(MV.Safe.KillShield) end
        SF._root = nil
        trở lại
    kết thúc
    nếu SF._root ~= r thì
        SF._root = r
        pcall(MV.Safe.Reset)
        SF._shieldPos = nil
        if SF.shield then pcall(MV.Safe.KillShield) end
        pcall(MV.Safe._EnsureBV)
    kết thúc
    nếu không (SF._bv và SF._bv.Parent == r) thì
        pcall(MV.Safe._EnsureBV)
    kết thúc
    local bv = SF._bv
    nếu không (bv và bv.Parent == r) thì trả về end
    local bg = SF._bg
    nếu h thì
        if h.PlatformStand ~= true then pcall(function() h.PlatformStand = true end) end
        if h.AutoRotate ~= false then pcall(function() h.AutoRotate = false end) end
    kết thúc
    local dtv = tonumber(dt) or 0.016
    SF._sc = (SF._sc hoặc 0) + dtv
    local sinceThreat = tick() - (SF._lastThreatAt or 0)
    local ivScan = (((SF.threats or 0) > 0) or sinceThreat < 1.0) and 0.05 or 0.15
    nếu SF._sc >= ivScan thì
        local okS = pcall(MV.Safe.Scan, r.Position, SF._sc)
        SF._sc = 0
        if not okS then SF.threats, SF.nearest = 0, nil end
    kết thúc
    cục bộ hiện tại = tick()
    liên hệ cục bộ = ((SF.threats hoặc 0) > 0) hoặc ((hiện tại - (SF._holdAt hoặc 0)) < 0,35)
    các khóa cục bộ = (h và h.MoveDirection) hoặc Vector3.new(0, 0, 0)
    local vX = tonumber(SF._virtX) or 0
    local vZ = tonumber(SF._virtZ) or 0
    nếu math.abs(vX) > 0.01 hoặc math.abs(vZ) > 0.01 thì
        keys = Vector3.new(vX, 0, vZ)
    kết thúc
    local busy = Keys.Magnitude >= 0.01 -- đang nhấn WASD / joystick Virtual -> nhường quyền cho bạn
    thư mục cục bộ = khóa
    nếu dir.Magnitude < 0.01 và SF.auto thì
        local cam = workspace.CurrentCamera
        nếu có camera thì
            góc nhìn cục bộ = cam.CFrame.LookVector
            dir = Vector3.new(look.X, 0, look.Z)
        kết thúc
    kết thúc
    if dir.Magnitude > 0 then dir = dir.Unit else dir = Vector3.new(0, 0, 0) end
    local up = UserInputService:IsKeyDown(Enum.KeyCode.Space)
    local down = UserInputService:IsKeyDown(Enum.KeyCode.LeftShift)
              hoặc UserInputService:IsKeyDown(Enum.KeyCode.LeftControl)
    local vY = tonumber(SF._virtY) or 0
    địa phương vv
    nếu math.abs(vY) > 0.01 thì
        vv = vY
    khác
        vv = (lên cộng 1 hoặc 0) - (xuống cộng 1 hoặc 0)
    kết thúc
    tốc độ cục bộ = mvClamp(SF.speed, 1, 2000, 60)
    mục tiêu địa phương
    nếu SF.circle và SF.auto và (không bận) và (không liên lạc) thì
        local R = mvClamp(SF.circleR, 3, 300, 20)
        local cx, cy, cz = r.Position.X, r.Position.Y, r.Position.Z
        if SF._center then cx, cy, cz = SF._center.X, SF._center.Y, SF._center.Z end
        local dxz = math.sqrt((r.Position.X - cx) ^ 2 + (r.Position.Z - cz) ^ 2)
        nếu dxz > R * 1.6 thì
            SF._center = nil
            cx, cy, cz = r.Position.X, r.Position.Y, r.Position.Z
        nếu SF._center == nil thì
            SF._center = { X = cx, Y = cy, Z = cz }
        kết thúc
        SF._ang = (SF._ang or 0) + dtv * (spd / math.max(R, 1)) -- bay đều quanh tâm
        local tx = cx + math.cos(SF._ang) * R
        tz địa phương = cz + math.sin(SF._ang) * R
        tang cục bộ = Vector3.new(-math.sin(SF._ang), 0, math.cos(SF._ang)) * spd
        local want = Vector3.new(tx - r.Position.X, cy - r.Position.Y, tz - r.Position.Z)
        mục tiêu = tang + muốn * 2.2 + Vector3.new(0, vv * spd, 0)
        if target.Magnitude > spd then target = target.Unit * spd end
    khác
        SF._center = nil -- rời khỏi vòng tròn chế độ -> tâm mới sau
        mục tiêu = (dir + Vector3.new(0, vv, 0)) * spd
    kết thúc
    đại diện địa phương = SF._rep
    nếu (rep == nil hoặc rep.Magnitude < 0.01) và SF._lastRep ~= nil thì
        local el = now - (SF._lastThreatAt or 0)
        if el < 0.9 then Rep = SF._lastRep * (1 - el / 0.9) end -- tăng tăng, không cô hướng
    kết thúc
    nếu rep và rep.Magnitude > 0 thì
        mục tiêu = mục tiêu + rep * (spd * (0.25 + 0.09 * mvClamp(SF.steer, 1, 10, 4)))
        công suất cục bộ = tốc độ * 2
        if target.Magnitude > cap then target = target.Unit * cap end
    kết thúc
    nếu SF.nearest và SF.nearest < mvClamp(SF.radius, 1, 300, 25) * 0.4 thì
        mục tiêu = mục tiêu + Vector3.new(0, spd * 0.75, 0)
    kết thúc
    SF._myV = mục tiêu
    bv.Vận tốc = mục tiêu
    nếu bg và target.Magnitude > 0.1 thì
        local lookPos = r.Position + Vector3.new(target.X, 0, target.Z)
        nếu (lookPos - r.Position).Magnitude > 0.1 thì
            bg.CFrame = CFrame.new(r.Position, lookPos)
        kết thúc
    kết thúc
    if SF.shield then pcall(MV.Safe.UpdateShield, r.Position) end
    SF._hudAcc = (SF._hudAcc hoặc 0) + dtv
    nếu SF._hudAcc >= 0.3 thì
        SF._hudAcc = 0
        if SF._hudUpdate then pcall(SF._hudUpdate) end
    kết thúc
kết thúc
hàm MV.Safe.Set(on)
    if on == true và MV.fly thì MV.SetFly(false) end -- không để hai BodyVelocity tranh lực
    SF.on = (on == true)
    nếu SF.on thì
        nếu SF.noclip và SF._ncPrev == nil thì
            SF._ncPrev = MV.noclip == true
            pcall(function() MV.SetNoclip(true) end)
        kết thúc
        pcall(MV.Safe._EnsureBV)
        MV.flySpeed ​​= mvClamp(SF.speed, 1, 2000, 60)
        SF._root = MV.Root()
        pcall(MV._Watchdog)
        SF._lastFrameAt = tick()
        pcall(MV.Safe.Bind)
        pcall(function() MV.Safe.UpdateShield(MV.Root() and MV.Root().Position or Vector3.new(0, 0, 0)) end)
        pcall(function() MV.Safe.SyncHud() end)
    khác
        pcall(MV.Safe.Unbind)
        MV.Safe.Reset()
        pcall(function() MV.Safe.ClearVirt() end)
        pcall(function() if SF._bv then SF._bv:Destroy() end end)
        pcall(function() if SF._bg then SF._bg:Destroy() end end)
        SF._bv, SF._bg = nil, nil
        nếu không phải MV.fly thì
            pcall(MV.Safe._RestoreHum)
        kết thúc
        MV.Safe.KillShield()
        SF._root = nil
        nếu SF._ncPrev ~= nil thì
            local was = SF._ncPrev
            SF._ncPrev = nil
            local stillFlying = (MV._glassFlyActive == true) hoặc (MV._playerFlyActive == true)
            nếu không còn bay nữa thì
                pcall(function() MV.SetNoclip(was) end)
            kết thúc
        kết thúc
        pcall(function() MV.Safe.SyncHud() end)
    kết thúc
    trả lại SF.on
kết thúc
hàm MV.Safe.SetNoclipAuto(b)
    SF.noclip = (b == true)
    nếu SF.on thì
        nếu SF.noclip thì
            if SF._ncPrev == nil then SF._ncPrev = MV.noclip == true end
            pcall(function() MV.SetNoclip(true) end)
        elseif SF._ncPrev ~= nil then
            local was = SF._ncPrev
            SF._ncPrev = nil
            pcall(function() MV.SetNoclip(was) end)
        kết thúc
    kết thúc
    trả về SF.noclip
kết thúc
hàm MV.Safe.SetShield(b)
    SF.shield = (b == true)
    nếu SF.on và SF.shield thì
        cục bộ r = MV.Root()
        if r then pcall(MV.Safe.UpdateShield, r.Position) end
    khác
        MV.Safe.KillShield()
    kết thúc
    trả lại SF.shield
kết thúc
hàm MV.Safe.SetAvoidPlayers(b)
    SF.avoidPlayers = (b == true)
    MV.Safe.Reset()
    trả về SF.avoidPlayers
kết thúc
function MV.Safe.Reset() -- quên dấu vết cũ (không chắc ma vật biến mất)
    SF._seen, SF._cache = {}, nil
    SF._rep = Vector3.new(0, 0, 0)
    SF.threats, SF.nearest, SF.playerThreats = 0, nil, 0
    SF.movers, SF._lastRep, SF._lastThreatAt, SF._mvCount = 0, nil, nil, nil -- v4.20
    SF._holdAt, SF._center, SF._ang = 0, nil, 0
    SF._myV = Vector3.new(0, 0, 0)
kết thúc
function MV.Safe.Stop() return MV.Safe.Set(false) end
hàm MV.Safe.SetCircle(b)
    SF.circle = (b == true)
    SF._center = nil
    trả về SF.circle
kết thúc
hàm MV.Safe.SetCircleR(n)
    SF.circleR = mvClamp(n, 3, 300, 20)
    SF._center = nil
    trả về SF.circleR
kết thúc
hàm MV.Safe.Recenter()
    SF._center = nil
    trả về giá trị đúng
kết thúc
function MV.Safe.SetLook(t) -- 👁 nhìn trước (giây) để né vật đang bay tới
    SF.lookTime = mvClamp(t, 0.1, 3, 1.0)
    trả về SF.lookTime
kết thúc
hàm MV.Safe.SetRadius(n)
    SF.radius = mvClamp(n, 1, 300, 25)
    MV.Safe.Reset()
    SF._shieldPos = nil --thay đổi kính -> vẽ lại theo kích thước mới
    nếu SF.on và SF.shield thì
        cục bộ r = MV.Root()
        if r then pcall(MV.Safe.UpdateShield, r.Position) end
    kết thúc
    trả về bán kính SF.
kết thúc

hàm MV.Safe.SetShieldSize(n)
    SF.shieldSize = mvClamp(n, 0, 300, 0)
    SF._shieldPos = nil
    nếu SF.on và SF.shield thì
        cục bộ r = MV.Root()
        if r then pcall(MV.Safe.UpdateShield, r.Position) end
    kết thúc
    trả về SF.shieldSize
kết thúc
hàm MV.Safe.SetSpeed(n)
    SF.speed = mvClamp(n, 1, 2000, 60)
    MV.flySpeed ​​= SF.speed -- for frame ⚙ và một số trạng thái tương tự
    trả về SF.speed
kết thúc
function MV.Safe.SetSteer(n) SF.steer = mvClamp(n, 1, 10, 4); return SF.steer end
function MV.Safe.SetAuto(b) SF.auto = (b == true); return SF.auto end
hàm MV.Safe.Status()
    if not SF.on then return "🛡 bay an toàn: đang TẮT (khiên up, Xuyên Tường trả lại như cũ)" end
    local s = string.format("🛡 bay an toàn: BẬT · 💨 %g · 📏 né trong %gm · 🌀 %g",
        SF.speed, SF.radius, SF.steer)
    if SF.auto then s = s .. " · ➡ tự bay" end
    nếu SF.shield thì
        local half = MV.Safe.ShieldHalf()
        s = s .. string.format(" · 🔲 %gm/c%s", half * 2, (tonumber(SF.shieldSize) or 0) > 0 and "" or " (tự)")
    kết thúc
    nếu SF.circle và SF.auto thì
        cục bộ bận = sai
        local hum0 = MV.Hum()
        local md0 = hum0 and hum0.MoveDirection
        if md0 and md0.Magnitude and md0.Magnitude >= 0.01 then busy = true end
        if math.abs(tonumber(SF._virtX) or 0) > 0.01 or math.abs(tonumber(SF._virtZ) or 0) > 0.01 then busy = true end
        nếu (SF.threats hoặc 0) > 0 thì
            s = s .. " · ⭕ tạm dừng (đang né)"
        nếu bận thì
            s = s .. " · ⭕ tạm dừng (đang nhấn phím)"
        khác
            s = s .. " · ⭕ bay vòng tròn " .. tostring(math.floor(SF.circleR + 0.5)) .. "m"
        kết thúc
    kết thúc
    nếu (SF.movers hoặc 0) > 0 và (SF.threats hoặc 0) == 0 thì
        s = s .. string.format(" · 🐾 thấy %d vật thể đang chạy", SF.movers)
    kết thúc
    nếu SF.noclip thì s = s.. " · 🧱 xuyên vật cản" end
    nếu (SF.threats hoặc 0) > 0 thì
        s = s .. string.format(" · ⚠️ đang né %d mối nguy (gần nhất %gm)", SF.threats,
            math.floor((SF.nearest or 0) + 0.5))
        if (SF.playerThreats or 0) > 0 then s = s .. string.format(" — có %d người chơi", SF.playerThreats) end
    khác
        s = s.. " · ✅ quanh đây không có gì lao tới mình"
    kết thúc
    nếu SF.showHud và SF.on thì
        s = s .. " · 📱 nút ảo BẬT"
    kết thúc
    trả về s
kết thúc

hàm MV.Safe.SetVirt(x, z, y)
    SF._virtX = mvClamp(tonumber(x) or 0, -1, 1, 0)
    SF._virtZ = mvClamp(tonumber(z) or 0, -1, 1, 0)
    SF._virtY = mvClamp(tonumber(y) or 0, -1, 1, 0)
    Trả về SF._virtX, SF._virtZ, SF._virtY
kết thúc
hàm MV.Safe.ClearVirt()
    SF._virtX, SF._virtZ, SF._virtY = 0, 0, 0
    trả về giá trị đúng
kết thúc
hàm MV.Safe.SetShowHud(b)
    SF.showHud = (b == true)
    nếu không phải SF.showHud thì
        pcall(function() MV.Safe.ClearVirt() end)
        pcall(function()
            if SF._joyKnob then SF._joyKnob.Position = UDim2.new(0.5, -16, 0.5, -16) end
        kết thúc)
        SF._dragging = false
    kết thúc
    pcall(function() MV.Safe.SyncHud() end)
    trả về SF.showHud
kết thúc
hàm MV.Safe._BuildHud()
    if SF._hud and SF._hud.Parent then return SF._hud end
    cục bộ hud = New("Khung", {
        Tên = "BC_SafeHud",
        Kích thước = UDim2.new(0, 300, 0, 190),
        Vị trí = UDim2.new(0, 10, 1, -200),
        BackgroundColor3 = C.SURFACE,
        Độ trong suốt của nền = 0.18,
        BorderSizePixel = 0,
        Hiển thị = false,
        Chỉ số Z = 25,
    }, gui)
    Góc(hud, UDim.new(0, 12))
    Stroke(hud, C.HAIRLINE, 1)
    D.Shade(hud, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)

    tiêu đề cục bộ = Mới("Nhãn văn bản", {
        Kích thước = UDim2.new(1, -70, 0, 18), Vị trí = UDim2.new(0, 10, 0, 4),
        Text = "🛡 Bay An Toàn - Nút Ảo", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Phông chữ = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 26,
    }, hud)

    local hideBtn = New("TextButton", {
        Kích thước = UDim2.new(0, 28, 0, 20), Vị trí = UDim2.new(1, -62, 0, 2),
        Văn bản = "👁", Màu nền 3 = C.SURFACE3, Độ trong suốt nền = 0.15,
        TextColor3 = C.MUTED, Font = Enum.Font.GothamBold, TextSize = 10,
        BorderSizePixel = 0, ZIndex = 26,
    }, hud)
    Góc(hideBtn, UDim.new(0, 6))
    hideBtn.Activated:Connect(function()
        MV.Safe.SetShowHud(false)
        D.Say("📱 đã ẩn nút ảo 🛡 (vào khung 🛡 trong 📚 Script Hub để BẬT lại)", C.MUTED)
    kết thúc)

    local closeBtn = New("TextButton", {
        Kích thước = UDim2.new(0, 28, 0, 20), Vị trí = UDim2.new(1, -32, 0, 2),
        Văn bản = "✕", Màu nền 3 = Đỏ đậm, Độ trong suốt nền = 0.2,
        TextColor3 = C.WHITE, Font = Enum.Font.GothamBold, TextSize = 10,
        BorderSizePixel = 0, ZIndex = 26,
    }, hud)
    Góc(closeBtn, UDim.new(0, 6))
    closeBtn.Activated:Connect(function()
        MV.Safe.Stop()
        D.Say("🚫 đã tắt 🛡 Bảy An Toàn", C.YELLOW)
    kết thúc)

    local joyBG = New("Frame", {
        Tên = "JoyBG",
        Kích thước = UDim2.new(0, 110, 0, 110), Vị trí = UDim2.new(0, 10, 0, 26),
        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.15,
        BorderSizePixel = 0, ZIndex = 26,
    }, hud)
    Góc(joyBG, UDim.new(0, 14))
    Đột quỵ (joyBG, C.BORDER, 1)
    SF._joyBG = joyBG

    local joyKnob = New("Frame", {
        Tên = "JoyKnob",
        Kích thước = UDim2.new(0, 32, 0, 32), Vị trí = UDim2.new(0.5, -16, 0.5, -16),
        BackgroundColor3 = C.ACCENT, BackgroundTransparency = 0.15,
        BorderSizePixel = 0, ZIndex = 27,
    }, joyBG)
    Góc(joyKnob, UDim.new(1, 0))
    Stroke(joyKnob, C.WHITE, 1)
    SF._joyKnob = joyKnob

    hàm cục bộ dirBtn(txt, x, y, vx, vz)
        cục bộ b = New("TextButton", {
            Kích thước = UDim2.new(0, 28, 0, 28), Vị trí = UDim2.new(0, x, 0, y),
            Văn bản = txt, Màu nền 3 = C.SURFACE3, Độ trong suốt nền = 0.2,
            TextColor3 = C.DARK, Font = Enum.Font.GothamBold, TextSize = 12,
            BorderSizePixel = 0, ZIndex = 27,
        }, joyBG)
        Góc(b, UDim.new(1, 0))
        nắm giữ địa phương = sai
        b.InputBegan:Connect(function(inp)
            nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
                giữ = đúng
                MV.Safe.SetVirt(vx, vz, SF._virtY)
            kết thúc
        kết thúc)
        b.InputEnded:Connect(function(inp)
            nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
                giữ = sai
                if not SF._dragging then MV.Safe.SetVirt(0, 0, SF._virtY) end
            kết thúc
        kết thúc)
        trả lại b
    kết thúc
    dirBtn("↑", 41, 2, 0, -1)
    dirBtn("↓", 41, 80, 0, 1)
    dirBtn("←", 2, 41, -1, 0)
    dirBtn("→", 80, 41, 1, 0)

    hàm cục bộ updateJoy(inputPos)
        local okPos, absPos = pcall(function() return joyBG.AbsolutePosition end)
        local okSize, absSize = pcall(function() return joyBG.AbsoluteSize end)
        if not (okPos and okSize and absPos and absSize) then return end
        local cx = absPos.X + absSize.X * 0.5
        local cy = absPos.Y + absSize.Y * 0.5
        local dx = inputPos.X - cx
        local dy = inputPos.Y - cy
        giá trị R tối đa cục bộ = 38
        độ lớn cục bộ = math.sqrt(dx*dx + dy*dy)
        nếu mag > maxR thì
            dx = dx / mag * maxR
            dy = dy / mag * maxR
            mag = maxR
        kết thúc
        pcall(function()
            joyKnob.Position = UDim2.new(0.5, dx - 16, 0.5, dy - 16)
        kết thúc)
        nx cục bộ = dx / maxR
        local nz = dy / maxR
        pcall(function() MV.Safe.SetVirt(nx, nz, SF._virtY) end)
    kết thúc
    hàm cục bộ resetJoy()
        SF._dragging = false
        pcall(function()
            joyKnob.Position = UDim2.new(0.5, -16, 0.5, -16)
        kết thúc)
        MV.Safe.SetVirt(0, 0, SF._virtY)
    kết thúc

    joyBG.InputBegan:Connect(function(inp)
        nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
            SF._dragging = true
            updateJoy(inp.Position)
        kết thúc
    kết thúc)
    joyBG.InputChanged:Connect(function(inp)
        nếu SF._dragging và (inp.UserInputType == Enum.UserInputType.MouseMovement hoặc inp.UserInputType == Enum.UserInputType.Touch) thì
            updateJoy(inp.Position)
        kết thúc
    kết thúc)
    trackConn(UserInputService.InputChanged:Connect(function(inp)
        nếu SF._dragging và (inp.UserInputType == Enum.UserInputType.MouseMovement hoặc inp.UserInputType == Enum.UserInputType.Touch) thì
            local ok, pos = pcall(function() return inp.Position end)
            nếu ok và pos thì cập nhậtJoy(pos) kết thúc
        kết thúc
    kết thúc))
    trackConn(UserInputService.InputEnded:Connect(function(inp)
        nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
            nếu SF._dragging thì đặt lại Joy()
        kết thúc
    kết thúc))

    hàm cục bộ vBtn(txt, x, y, w, h, color, cb)
        cục bộ b = New("TextButton", {
            Kích thước = UDim2.new(0, w, 0, h), Vị trí = UDim2.new(0, x, 0, y),
            Văn bản = txt, Màu nền 3 = màu hoặc C.SURFACE3, Độ trong suốt nền = 0.15,
            TextColor3 = D.BestText(color or C.SURFACE3), Font = Enum.Font.GothamBold, TextSize = 11,
            BorderSizePixel = 0, ZIndex = 27,
        }, hud)
        Góc(b, UDim.new(0, 8))
        Stroke(b, C.BORDER, 1)
        giữ cục bộ = sai
        nếu cb thì
            b.InputBegan:Connect(function(inp)
                nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
                    giữ = đúng
                    pcall(cb, true)
                kết thúc
            kết thúc)
            b.InputEnded:Connect(function(inp)
                nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
                    giữ = sai
                    pcall(cb, false)
                kết thúc
            kết thúc)
            b.Activated:Connect(function() pcall(cb, nil) end)
        kết thúc
        trả lại b
    kết thúc

    vBtn("⬆", 130, 26, 40, 36, Color3.fromRGB(0,150,0), function(isDown)
        if isDown == true then MV.Safe.SetVirt(SF._virtX, SF._virtZ, 1)
        elseif isDown == false then MV.Safe.SetVirt(SF._virtX, SF._virtZ, 0)
        khác
            pcall(function() MV.Nudge(2.5) end)
        kết thúc
    kết thúc)
    vBtn("⬇", 130, 66, 40, 36, Color3.fromRGB(150,0,0), function(isDown)
        if isDown == true then MV.Safe.SetVirt(SF._virtX, SF._virtZ, -1)
        elseif isDown == false then MV.Safe.SetVirt(SF._virtX, SF._virtZ, 0)
        khác
            pcall(function() MV.Nudge(-2.5) end)
        kết thúc
    kết thúc)

    vBtn("⏹ cột", 130, 108, 82, 26, C.RED, function() MV.Safe.Stop() end)
    vBtn("⭕ Tâm", 216, 108, 52, 26, C.PURPLE, function() MV.Safe.Recenter() end)

    vBtn("↻", 174, 26, 36, 36, C.SURFACE3, function()
        SF._ang = (SF._ang hoặc 0) + 0,6
    kết thúc)

    local autoTog = vBtn("➡Tự: BẬT", 10, 142, 82, 24, C.GREEN, function()
        MV.Safe.SetAuto(not SF.auto)
        D.Say(SF.auto và "➡ tự bay: BẬT" hoặc "➡ tự bay: TẮT", C.ACCENT)
        pcall(function() if S.SyncSafePanel then S.SyncSafePanel() end end)
        pcall(function() MV.Safe.SyncHud() end)
    kết thúc)
    local CircTog = vBtn("⭕ Vòng: BẬT", 96, 142, 82, 24, C.GREEN, function()
        MV.Safe.SetCircle(not SF.circle)
        D.Say(SF.circle và "⭕ vòng tròn: BẬT" hoặc "⭕ vòng tròn: TẮT", C.ACCENT)
        pcall(function() if S.SyncSafePanel then S.SyncSafePanel() end end)
        pcall(function() MV.Safe.SyncHud() end)
    kết thúc)

    tốc độ cục bộ = New("TextLabel", {
        Kích thước = UDim2.new(0, 108, 0, 24), Vị trí = UDim2.new(0, 182, 0, 142),
        Văn bản = "💨 60", Độ trong suốt nền = 1, Màu chữ 3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 27,
    }, hud)

    LÀM
        kéo cục bộ, vị trí bắt đầu, đầu vào bắt đầu
        tiêu đề.Đầu vàoBắt đầu:Kết nối(hàm(inp)
            nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
                kéo = đúng
                startInput = inp.Position
                startPos = hud.Position
            kết thúc
        kết thúc)
        trackConn(UserInputService.InputChanged:Connect(function(inp)
            nếu kéo và (inp.UserInputType == Enum.UserInputType.MouseMovement hoặc inp.UserInputType == Enum.UserInputType.Touch) thì
                local delta = inp.Position - startInput
                hud.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
            kết thúc
        kết thúc))
        trackConn(UserInputService.InputEnded:Connect(function(inp)
            nếu inp.UserInputType == Enum.UserInputType.MouseButton1 hoặc inp.UserInputType == Enum.UserInputType.Touch thì
                kéo lê = sai
            kết thúc
        kết thúc))
    kết thúc

    hàm SF._hudUpdate()
        pcall(function()
            nếu autoTog thì
                autoTog.Text = SF.auto và "➡ Tự: BẬT" hoặc "➡ Tự: TẮT"
                autoTog.BackgroundColor3 = SF.auto và C.GREEN hoặc C.SURFACE3
                autoTog.TextColor3 = D.BestText(autoTog.BackgroundColor3)
            kết thúc
            nếu circTog thì
                CircTog.Text = SF.circle và "⭕ Vòng: BẬT" hoặc "⭕ Vòng: TẮT"
                circTog.BackgroundColor3 = SF.circle and C.GREEN or C.SURFACE3
                CircTog.TextColor3 = D.BestText(circTog.BackgroundColor3)
            kết thúc
            nếu tốc độLbl thì
                mối đe dọa cục bộ = SF.threats hoặc 0
                speedLbl.Text = string.format("💨 %g · %s%d", SF.speed or 60, thr>0 and "⚠️" or "✅", thr)
                speedLbl.TextColor3 = thr>0 và C.YELLOW hoặc C.MUTED
            kết thúc
        kết thúc)
    kết thúc

    SF._hud = hud
    trả về hud
kết thúc

hàm MV.Safe.SyncHud()
    pcall(function()
        local hud = MV.Safe._BuildHud()
        nếu hud thì
            local should = (SF.on == true) and (SF.showHud ~= false)
            hud.Visible = nên
            if should and SF._hudUpdate then SF._hudUpdate() end
        kết thúc
        nếu SF.on thì
            cục bộ cũ = MV._hud
            nếu cũ thì old.Visible = false kết thúc
        khác
            pcall(function() MV.SyncHud() end)
        kết thúc
    kết thúc)
kết thúc

end -- hết khối 🛡 BAY AN TOÀN (v4.18)

--------- 🪩 THẢM KÍNH (chỉnh ngắn × Cao × Dài + khoảng cách tới chân) ----------
-- Có hai chế độ cài đặt độc lập:
-- • SetCarpet: thảm bám dưới chân để tương thích API cũ.
-- • PlaceGlass: các tấm kính CỐ ĐỊNH, được lưu trong _placedGlasses và không bị
-- tấm mới ghi đè. UI use record { id, part, location, size } bên dưới.
Hàm MV.SetCarpetSize(w, h, l)
    MV.carpetW = mvClamp(w, 0.5, 100, MV.carpetW hoặc 6)
    MV.carpetH = mvClamp(h, 0.1, 20, MV.carpetH hoặc 0.5)
    MV.carpetL = mvClamp(l, 0.5, 100, MV.carpetL hoặc 6)
    nếu MV._carpet và MV._carpet.Parent thì
        pcall(function()
            MV._carpet.Size = Vector3.new(MV.carpetW, MV.carpetH, MV.carpetL)
            MV._MakeEdge(MV._carpet)
        kết thúc)
    kết thúc
    Trả về MV.carpetW, MV.carpetH, MV.carpetL
kết thúc
hàm MV.SetCarpetGap(g)
    MV.carpetGap = mvClamp(g, -10, 50, MV.carpetGap hoặc 0.2)
    trả về MV.carpetGap
kết thúc
hàm MV.FootY()
    cục bộ r = MV.Root()
    nếu không phải r thì trả về nil.
    trả về r.Vị trí.Y - 3.0
kết thúc
hàm MV._StopCarpet()
    if MV._carpet then pcall(function() MV._carpet:Destroy() end) end
    MV._carpet = nil
    MV.carpetY = nil
    pcall(function() RunService:UnbindFromRenderStep("Carpet") end)
kết thúc
hàm MV.CarpetHost()
    trả về không gian làm việc
kết thúc
hàm MV._MakeEdge(cp)
    nếu không phải cp thì trả về end
    cục bộ cũ = nil
    pcall(function() old = cp:FindFirstChild("BC_GlassEdge") end)
    nếu không phải MV.carpetEdge thì
        nếu cũ thì pcall(function() old:Destroy() end) end
        trở lại
    kết thúc
    nếu cũ thì trả về cuối
    pcall(function()
        cạnh cục bộ = Instance.new("SelectionBox")
        edge.Name = "BC_GlassEdge"
        edge.Adornee = cp
        độ dày đường viền = 0,035
        cạnh.SurfaceTransparency = 1
        edge.Color3 = C.ACCENT
        cạnh.Cha = cp
    kết thúc)
kết thúc
hàm MV.SetCarpetEdge(on)
    MV.carpetEdge = (on == true)
    pcall(function() MV._MakeEdge(MV._carpet) end)
    for _, rec in ipairs(MV.GetPlacedGlasses and MV.GetPlacedGlasses() or {}) do
        pcall(function() MV._MakeEdge(rec.part) end)
    kết thúc
    trả về MV.carpetEdge
kết thúc
hàm MV.SetCarpetHold(on)
    MV.carpetHold = (on == true)
    trả lại MV.carpetHold
kết thúc
hàm MV.SetCarpetSlack(n)
    MV.carpetSlack = mvClamp(n, 0, 50, MV.carpetSlack hoặc 0.5)
    trả về MV.carpetSlack
kết thúc
hàm MV.CreateCarpet(y)
    cục bộ r = MV.Root()
    nếu không phải r thì trả về nil.
    local cp = MV._carpet
    nếu không phải cp hoặc không phải cp.Parent thì
        pcall(function() if cp then cp:Destroy() end end)
        cp = New("Part", {
            Tên = "BC_GlassCarpet_Follow",
            Kích thước = Vector3.new(MV.carpetW hoặc 6, MV.carpetH hoặc 0.5, MV.carpetL hoặc 6),
            Cố định = true, CanCollide = true, CanTouch = false,
            Vật liệu = Enum.Material.Glass, Màu sắc = Color3.fromRGB(116, 221, 255),
            Độ trong suốt = 0.42, Độ phản xạ = 0.04, Bóng đổ = false,
        }, MV.CarpetHost())
        MV._carpet = cp
    kết thúc
    local hh = mvClamp(MV.carpetH, 0.1, 20, 0.5)
    cục bộ cy = tonumber(y)
    nếu cy == nil thì
        cy = MV.carpetY
        nếu cy == nil thì
            cy = (MV.FootY() hoặc r.Position.Y - 3.0) - (MV.carpetGap hoặc 0.2) - hh / 2
        kết thúc
    kết thúc
    MV.carpetY = cy
    pcall(function()
        cp.Size = Vector3.new(
            mvClamp(MV.carpetW, 0.5, 100, 6),
            hh,
            mvClamp(MV.carpetL, 0.5, 100, 6)
        )
        cp.CFrame = CFrame.new(r.Position.X, cy, r.Position.Z)
        cp.Anchored = true
        cp.CanCollide = true
        cp.CanTouch = false
        cp.Material = Enum.Material.Glass
        cp.Transparency = 0.42
        cp.Color = Color3.fromRGB(116, 221, 255)
        MV._MakeEdge(cp)
    kết thúc)
    trả về cp
kết thúc
hàm MV.SetCarpet(on)
    bật = (bật == đúng)
    nếu không bật thì
        MV.carpet = false
        MV._StopCarpet()
        MV._carpetRetries = 0
        pcall(function() if MV.SyncHud then MV.SyncHud() end end)
        trả về false
    kết thúc
    nếu không phải MV.Root() thì
        return false, "chưa có nhân vật để tạo thảm"
    kết thúc
    MV.carpet = true
    MV._carpetRetries = 0
    MV.carpetY = nil
    local cp = MV.CreateCarpet()
    nếu không phải là CP thì
        MV.carpet = false
        return false, "không thể tạo được kính râm"
    kết thúc
    pcall(function() RunService:UnbindFromRenderStep("Carpet") end)
    local okBind = pcall(function()
        RunService:BindToRenderStep("Carpet", Enum.RenderPriority.Character.Value + 1, function()
            nếu không phải MV.carpet thì trả về end
            gốc cục bộ = MV.Root()
            nếu không phải là root thì trả về end
            nếu không phải MV._carpet hoặc không phải MV._carpet.Parent thì
                MV._carpetRetries = (MV._carpetRetries hoặc 0) + 1
                nếu MV._carpetRetries <= 3 thì
                    MV.CreateCarpet(MV.carpetY)
                kết thúc
                trở lại
            kết thúc
            cục bộ y = MV.carpetY
            nếu y == nil thì
                y = (MV.FootY() hoặc căn bậc hai của vị trí Y - 3.0) - (MV.carpetGap hoặc 0.2) - (MV.carpetH hoặc 0.5) / 2
                MV.carpetY = y
            kết thúc
            pcall(function() MV._carpet.CFrame = CFrame.new(root.Position.X, y, root.Position.Z) end)
        kết thúc)
    kết thúc)
    nếu không phải okBind thì
        MV.SetCarpet(false)
        trả về sai, "người thực thi không liên kết được kính kính"
    kết thúc
    pcall(function() if MV.SyncHud then MV.SyncHud() end end)
    trả về giá trị đúng
kết thúc

--------- v4.24: ĐẶT KÍNH DƯỚI CHÂN (đặt nhiều tấm kính cố định) ----------
MV._placedGlasses = MV._placedGlasses hoặc {}
MV._glassId = tonumber(MV._glassId) or 0
MV.autoGlass = MV.autoGlass == true
MV._lastGlassPos = MV._lastGlassPos hoặc nil
MV.glassMax = mvClamp(MV.glassMax, 1, 1000, 250)
MV._autoGlassBound = MV._autoGlassBound == true

hàm MV._GlassPart(entry)
    if type(entry) == "table" then return entry.part or entry.Part end
    mục nhập trả lại
kết thúc
hàm MV._GlassRecord(entry, fallbackId)
    nếu type(entry) == "table" thì
        local p = MV._GlassPart(entry)
        nếu p thì
            phần nhập = p
            entry.id = tonumber(entry.id) or fallbackId
            mục nhập trả lại
        kết thúc
        trả về nil
    kết thúc
    nếu nhập liệu thì
        trả về { id = fallbackId, part = entry }
    kết thúc
    trả về nil
kết thúc
hàm MV._GlassChanged()
    làm mới cục bộ = S.GlassRefreshList
    if type(refresh) ~= "function" then return end
    nếu MV._glassRefreshQueued thì trả về end
    MV._glassRefreshQueued = true
    hàm cục bộ run()
        MV._glassRefreshQueued = sai
        pcall(refresh)
    kết thúc
    if task and type(task.defer) == "function" then task.defer(run) else run() end
kết thúc
hàm MV._GlassPosition(root)
    root = root hoặc MV.Root()
    nếu không phải là root thì trả về nil.
    local h = mvClamp(MV.carpetH, 0.1, 20, 0.5)
    chân cục bộ = MV.FootY() hoặc (root.Position.Y - root.Size.Y / 2)
    trả về Vector3.new(
        root.Position.X,
        foot - mvClamp(MV.carpetGap, -10, 50, 0.2) - h / 2,
        root.Position.Z
    )
kết thúc
hàm MV._CreateGlassAt(pos)
    nếu không phải pos thì trả về nil, "không có vị trí đặt kính" end
    danh sách cục bộ = MV._placedGlasses
    nếu kiểu dữ liệu (danh sách) khác với "bảng" thì
        danh sách = {}
        MV._placedGlasses = danh sách
    kết thúc
    nếu #list >= mvClamp(MV.glassMax, 1, 1000, 250) thì
        return nil, "đã đạt giới hạn " .. tostring(MV.glassMax) .. " tấm kính"
    kết thúc
    MV._glassId = (tonumber(MV._glassId) or 0) + 1
    ID cục bộ = MV._glassId
    local w = mvClamp(MV.carpetW, 0.5, 100, 6)
    local h = mvClamp(MV.carpetH, 0.1, 20, 0.5)
    local l = mvClamp(MV.carpetL, 0.5, 100, 6)
    phần cục bộ = Mới("Phần", {
        Tên = chuỗi.format("BC_GlassCarpet_%03d", id),
        Kích thước = Vector3.new(w, h, l), CFrame = CFrame.new(pos),
        Cố định = true, CanCollide = true, CanTouch = false,
        Vật liệu = Enum.Material.Glass, Màu sắc = Color3.fromRGB(116, 221, 255),
        Độ trong suốt = 0.42, Độ phản xạ = 0.04, Bóng đổ = false,
    }, MV.CarpetHost())
    pcall(function()
        part:SetAttribute("BananaCatGlass", true)
        part:SetAttribute("BananaCatGlassId", id)
        part:SetAttribute("BananaCatGlassFixed", true)
    kết thúc)
    local rec = { id = id, part = part, position = pos, size = Vector3.new(w, h, l), createdAt = os.clock() }
    table.insert(list, rec)
    MV._MakeEdge(part)
    trả lại bản ghi
kết thúc
hàm MV._RecoverPlacedGlasses()
    if type(MV._placedGlasses) ~= "table" then MV._placedGlasses = {} end
    cục bộ đã hồi phục = {}
    cục bộ ok, children = pcall(function() return workspace:GetChildren() end)
    if not ok or type(children) ~= "table" then return 0 end
    for _, child in ipairs(children) do
        local idText = nil
        pcall(function()
            if child:IsA("BasePart") then idText = tostring(child.Name):match("^BC_GlassCarpet_(%d+)$") end
        kết thúc)
        ID cục bộ = tonumber(idText)
        nếu id thì
            recovered[#recovered + 1] = { id = id, part = child, position = child.Position, size = child.Size }
            if id > (tonumber(MV._glassId) or 0) then MV._glassId = id end
            pcall(function() MV._MakeEdge(child) end)
        kết thúc
    kết thúc
    table.sort(recovered, function(a, b) return (a.id or 0) < (b.id or 0) end)
    for _, rec in ipairs(recovered) do table.insert(MV._placedGlasses, rec) end
    trả về #đã phục hồi
kết thúc
if type(MV._placedGlasses) ~= "table" then MV._placedGlasses = {} end
if #MV._placedGlasses == 0 then pcall(MV._RecoverPlacedGlasses) end

hàm MV.PlaceGlass(silent)
    gốc cục bộ = MV.Root()
    nếu không root thì trả về false, "chưa có nhân vật để đặt kính" end
    vị trí cục bộ = MV._GlassPosition(root)
    local rec, err = MV._CreateGlassAt(pos)
    nếu không nhận được thì trả về false, lỗi kết thúc
    MV._lastGlassPos = root.Position
    nếu không im lặng thì MV._GlassChanged() kết thúc
    trả về true, rec.part, rec
kết thúc
hàm MV.ClearPlacedGlasses()
    pcall(function() if MV.StopGlassFly then MV.StopGlassFly() end end)
    if MV.autoGlass then pcall(function() MV.SetAutoGlass(false) end) end
    cục bộ n = 0
    nếu type(MV._placedGlasses) == "table" thì
        for _, entry in ipairs(MV._placedGlasses) do
            phần cục bộ = MV._GlassPart(entry)
            nếu phần và phần cha thì
                pcall(function() part:Destroy() end)
                n = n + 1
            kết thúc
        kết thúc
    kết thúc
    MV._placedGlasses = {}
    MV._lastGlassPos = nil
    MV._GlassChanged()
    trả về n
kết thúc
hàm MV.RemoveGlassAt(idx)
    local n = math.floor(tonumber(idx) or 0)
    if n < 1 hoặc type(MV._placedGlasses) ~= "table" thì trả về false, "không tìm thấy ống kính" end
    mục nhập cục bộ = MV._placedGlasses[n]
    nếu không nhập thì trả về false, "không tìm thấy tấm kính" end
    phần cục bộ = MV._GlassPart(entry)
    nếu MV._glassFlyTarget == entry hoặc MV._glassFlyIdx == n thì
        pcall(function() MV.StopGlassFly() end)
    kết thúc
    table.remove(MV._placedGlasses, n)
    if part and part.Parent then pcall(function() part:Destroy() end) end
    MV._GlassChanged()
    trả về giá trị đúng, phần, mục nhập
kết thúc
hàm MV.RemoveGlass(part)
    if not part or type(MV._placedGlasses) ~= "table" thì trả về false, "không tìm thấy tấm kính" end
    for i, entry in ipairs(MV._placedGlasses) do
        if MV._GlassPart(entry) == part then return MV.RemoveGlassAt(i) end
    kết thúc
    return false, "không tìm thấy ống kính"
kết thúc
hàm MV.GetPlacedGlasses()
    đầu ra cục bộ = {}
    if type(MV._placedGlasses) ~= "table" then MV._placedGlasses = {} end
    for i = #MV._placedGlasses, 1, -1 do
        cục bộ cũ = MV._placedGlasses[i]
        rec cục bộ = MV._GlassRecord(cũ, i)
        phần cục bộ = rec và rec.part
        nếu không phải là một phần hoặc không phải là một phần của cha mẹ thì
            table.remove(MV._placedGlasses, i)
        khác
            rec.position = part.Position
            rec.size = part.Size
            out[i] = rec
        kết thúc
    kết thúc
    cục bộ nhỏ gọn = {}
    for i = 1, #MV._placedGlasses do
        rec cục bộ = MV._GlassRecord(MV._placedGlasses[i], i)
        if rec and rec.part and rec.part.Parent then compact[#compact + 1] = rec end
    kết thúc
    if #compact ~= #MV._placedGlasses then MV._placedGlasses = compact end
    trả lại nhỏ gọn
kết thúc
hàm MV.SetAutoGlass(on)
    mong muốn cục bộ = (bật == đúng)
    MV.autoGlass = muốn
    nếu không muốn thì
        MV._autoGlassBound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_AutoGlass") end)
        MV._GlassChanged()
        trả về false
    kết thúc
    nếu không phải MV._autoGlassBound thì
        cục bộ ok = pcall(function()
            RunService:BindToRenderStep("BC_AutoGlass", Enum.RenderPriority.Camera.Value - 5, function()
                pcall(function()
                    gốc cục bộ = MV.Root()
                    if root then MV._AutoGlassTick(root.Position) end
                kết thúc)
            kết thúc)
        kết thúc)
        MV._autoGlassBound = ok
    kết thúc
    gốc cục bộ = MV.Root()
    if root then pcall(function() MV._AutoGlassTick(root.Position) end) end
    MV._GlassChanged()
    trả về MV.autoGlass
kết thúc
hàm MV._AutoGlassTick(curPos)
    if not MV.autoGlass or not curPos then return false end
    local last = MV._lastGlassPos
    local w = mvClamp(MV.carpetW, 0.5, 100, 6)
    local l = mvClamp(MV.carpetL, 0.5, 100, 6)
    bước cục bộ = mvClamp(math.min(w, l) * 0.65, 1, 100, 3)
    nếu cuối cùng thì
        local dx, dz = curPos.X - last.X, curPos.Z - last.Z
        nếu dx * dx + dz * dz < step * step thì trả về false
    kết thúc
    local ok = MV.PlaceGlass(true)
    nếu được thì
        MV._lastGlassPos = curPos
        MV._GlassChanged()
        trả về giá trị đúng
    kết thúc
    trả về false
kết thúc

--------- v4.27: BAY TẤM KÍNH (đổi đặt kính thành bay tới kính, chỉnh tốc độ) ----------
MV.glassFlySpeed ​​= mvClamp(MV.glassFlySpeed, 1, 2000, 60)
MV._glassFlyTarget = MV._glassFlyTarget hoặc không
MV._glassFlyActive = MV._glassFlyActive == true
MV._glassFlyIdx = MV._glassFlyIdx hoặc không
MV._glassFlyBV = MV._glassFlyBV hoặc không
MV._glassFlyBG = MV._glassFlyBG hoặc không
MV._glassFlyNcPrev = MV._glassFlyNcPrev hoặc nil
MV._glassFlyHum = MV._glassFlyHum hoặc không
MV._glassFlyPlatformStandPrev = MV._glassFlyPlatformStandPrev
MV._glassFlyAutoRotatePrev = MV._glassFlyAutoRotatePrev

hàm MV.SetGlassFlySpeed(n)
    cục bộ v = tonumber(n)
    if v == nil hoặc v ~= v thì trả về false, "nhập tốc độ bay 1-2000" end
    MV.glassFlySpeed ​​= mvClamp(v, 1, 2000, MV.glassFlySpeed ​​hoặc 60)
    trả về true, MV.glassFlySpeed
kết thúc
hàm MV._EnsureGlassFlyBV()
    cục bộ r = MV.Root()
    nếu không phải r thì trả về nil, nil end
    nếu MV._glassFlyBV và MV._glassFlyBV.Parent == r và MV._glassFlyBG và MV._glassFlyBG.Parent == r thì
        local h = MV.Hum()
        nếu h và MV._glassFlyHum ~= h thì
            MV._glassFlyHum = h
            pcall(function() MV._glassFlyPlatformStandPrev = h.PlatformStand end)
            pcall(function() MV._glassFlyAutoRotatePrev = h.AutoRotate end)
            pcall(function() h.PlatformStand = true; h.AutoRotate = false end)
        kết thúc
        trả về MV._glassFlyBV, MV._glassFlyBG
    kết thúc
    pcall(function() nếu MV._glassFlyBV thì MV._glassFlyBV:Destroy() kết thúc)
    pcall(function() if MV._glassFlyBG then MV._glassFlyBG:Destroy() end end)
    MV._glassFlyBV, MV._glassFlyBG = không, không
    local bv = New("BodyVelocity", {
        Tên = "BC_GlassFlyVel", Lực tối đa = Vector3.new(1e9, 1e9, 1e9), Vận tốc = Vector3.new(0, 0, 0)
    }, r)
    cục bộ bg = New("BodyGyro", {
        Tên = "BC_GlassFlyGyro", Mô-men xoắn cực đại = Vector3.new(1e9, 1e9, 1e9), P = 1e4, D = 50
    }, r)
    MV._glassFlyBV, MV._glassFlyBG = bv, bg
    local h = MV.Hum()
    nếu h thì
        MV._glassFlyHum = h
        pcall(function() MV._glassFlyPlatformStandPrev = h.PlatformStand end)
        pcall(function() MV._glassFlyAutoRotatePrev = h.AutoRotate end)
        pcall(function() h.PlatformStand = true; h.AutoRotate = false end)
    kết thúc
    trả về bv, bg
kết thúc
hàm MV.StopGlassFly()
    MV._glassFlyActive = false
    MV._glassFlyTarget = nil
    MV._glassFlyIdx = nil
    pcall(function() RunService:UnbindFromRenderStep("BC_GlassFly") end)
    pcall(function() nếu MV._glassFlyBV thì MV._glassFlyBV:Destroy() kết thúc)
    pcall(function() if MV._glassFlyBG then MV._glassFlyBG:Destroy() end end)
    MV._glassFlyBV, MV._glassFlyBG = không, không
    cục bộ h = MV._glassFlyHum
    local safeOn = MV.Safe and MV.Safe.on == true
    nếu h và h.Parent và không phải MV.fly và không phải MV._playerFlyActive và không phải safeOn thì
        nếu MV._glassFlyPlatformStandPrev ~= nil thì pcall(function() h.PlatformStand = MV._glassFlyPlatformStandPrev end) end
        nếu MV._glassFlyAutoRotatePrev ~= nil thì pcall(function() h.AutoRotate = MV._glassFlyAutoRotatePrev end) end
    kết thúc
    MV._glassFlyHum = nil
    MV._glassFlyPlatformStandPrev = nil
    MV._glassFlyAutoRotatePrev = nil
    nếu MV._glassFlyNcPrev ~= nil thì
        địa phương là = MV._glassFlyNcPrev
        MV._glassFlyNcPrev = nil
        local safeOwnsNoclip = safeOn and MV.Safe.noclip == true
        nếu không phải MV._playerFlyActive và không phải safeOwnsNoclip thì
            pcall(function() MV.SetNoclip(was) end)
        kết thúc
    kết thúc
    trả về giá trị đúng
kết thúc
hàm MV._GlassFlyStep(dt)
    if not MV._glassFlyActive then return end
    rec cục bộ = MV._glassFlyTarget
    phần cục bộ = MV._GlassPart(rec)
    nếu không phải là một phần hoặc không phải là một phần của cha mẹ thì
        MV.StopGlassFly()
        MV._GlassChanged()
        trở lại
    kết thúc
    gốc cục bộ = MV.Root()
    nếu không phải root thì return end -- respawn: giữ mục tiêu, Refresh/khung sau sẽ gắn sức mạnh vào root mới
    local topY = part.Position.Y + part.Size.Y / 2
    local want = Vector3.new(part.Position.X, topY + 3.2, part.Position.Z)
    vị trí cục bộ = gốc.Vị trí
    local dx, dy, dz = want.X - pos.X, want.Y - pos.Y, want.Z - pos.Z
    local dist = math.sqrt(dx * dx + dy * dy + dz * dz)
    nếu dist <= 0,75 thì
        pcall(function() root.CFrame = CFrame.new(want) end)
        MV.StopGlassFly()
        trở lại
    kết thúc
    tốc độ cục bộ = mvClamp(MV.glassFlySpeed, 1, 2000, 60)
    nếu dist < 2 thì speed = math.max(4, speed * 0.15)
    elseif dist < 5 then speed = math.max(8, speed * 0.45) end
    pcall(function() MV.SetNoclip(true) end)
    local bv, bg = MV._EnsureGlassFlyBV()
    local dir = Vector3.new(dx / dist, dy / dist, dz / dist)
    nếu bv thì vận tốc của bv bằng hướng * tốc độ kết thúc
    local horizontal = Vector3.new(want.X - pos.X, 0, want.Z - pos.Z)
    nếu bg và horizontal.Magnitude > 0,05 thì
        pcall(function() bg.CFrame = CFrame.new(pos, Vector3.new(want.X, pos.Y, want.Z)) end)
    kết thúc
    nếu không phải BV thì
        bước cục bộ = math.min(dist, speed * (tonumber(dt) or 0.05))
        pcall(function() root.CFrame = CFrame.new(pos + dir * step) end)
    kết thúc
kết thúc
hàm MV.NearestGlassIndex()
    gốc cục bộ = MV.Root()
    nếu không phải là root thì trả về nil.
    tốt nhất cục bộ, bestD = nil, math.huge
    for i, rec in ipairs(MV.GetPlacedGlasses()) do
        phần cục bộ = MV._GlassPart(rec)
        nếu phần và phần cha thì
            local d = (part.Position - root.Position).Magnitude
            nếu d < bestD thì best, bestD = i, d kết thúc
        kết thúc
    kết thúc
    trả lại tốt nhất
kết thúc
hàm MV.FlyToGlass(idx)
    local list = MV.GetPlacedGlasses()
    local n = math.floor(tonumber(idx) or 0)
    bản ghi cục bộ = (n >= 1 và danh sách[n]) hoặc nil
    nếu không phải bản ghi và n > 0 thì
        for i, item in ipairs(list) do
            if tonumber(item.id) == n then rec, n = item, i break end
        kết thúc
    kết thúc
    nếu không rec thì trả về false, "không tìm thấy tấm kính" end
    nếu không phải MV.Root() thì trả về false, kết thúc "chưa có nhân vật để bay"
    if MV.fly then pcall(function() MV.SetFly(false) end) end
    if MV._playerFlyActive then pcall(function() MV.StopPlayerFly() end) end
    nếu MV._glassFlyNcPrev == nil và (không phải MV.Safe hoặc MV.Safe.noclip ~= true) thì
        MV._glassFlyNcPrev = MV.noclip == true
    kết thúc
    MV._glassFlyTarget = rec
    MV._glassFlyIdx = n
    MV._glassFlyActive = true
    pcall(function() MV.SetNoclip(true) end)
    pcall(function() MV._EnsureGlassFlyBV() end)
    pcall(function() RunService:UnbindFromRenderStep("BC_GlassFly") end)
    local okBind = pcall(function()
        RunService:BindToRenderStep("BC_GlassFly", Enum.RenderPriority.Camera.Value - 1, hàm(dt)
            pcall(MV._GlassFlyStep, dt)
        kết thúc)
    kết thúc)
    nếu không phải okBind thì
        MV.StopGlassFly()
        trả về sai, "người thực thi không thể liên kết bay tới kính"
    kết thúc
    pcall(MV._Watchdog)
    trả về giá trị true, nhận
kết thúc

--------- v4.28: BAY TỚI NGƯỜI CHƠI (xuyên tường, chỉnh tốc độ, 0=auto lấy tốc độ game) ----------
MV.playerFlySpeed ​​= MV.playerFlySpeed ​​hoặc 0
MV._playerFlyTarget = MV._playerFlyTarget hoặc nil
MV._playerFlyActive = MV._playerFlyActive hoặc false
MV._playerFlyPos = MV._playerFlyPos hoặc nil
MV._playerFlyBV = MV._playerFlyBV hoặc nil
MV._playerFlyBG = MV._playerFlyBG hoặc nil
MV._playerFlyNcPrev = MV._playerFlyNcPrev hoặc nil

hàm MV.SetPlayerFlySpeed(n)
    cục bộ v = tonumber(n)
    if v == nil thì trả về false, "nhập số 0-500 (0=auto)" end
    nếu v == 0 thì
        MV.playerFlySpeed ​​= 0
        trả về true, 0
    kết thúc
    MV.playerFlySpeed ​​= mvClamp(v, 1, 500, MV.playerFlySpeed ​​or 0)
    trả về true, MV.playerFlySpeed
kết thúc

hàm MV.GetPlayerFlySpeed()
    local s = tonumber(MV.playerFlySpeed) or 0
    nếu s == 0 thì
        cơ sở cục bộ = tonumber(MV._baseWS) hoặc 16
        local flySp = tonumber(MV.flySpeed) or 60
        nếu MV._playerFlyActive hoặc MV.fly thì
            trả về flySp
        khác
            trả về cơ sở > 0 và cơ sở hoặc 16
        kết thúc
    kết thúc
    trả về s
kết thúc

hàm MV._EnsurePlayerFlyBV()
    cục bộ r = MV.Root()
    nếu không phải r thì trả về nil, nil end
    nếu MV._playerFlyBV và MV._playerFlyBV.Parent == r thì
        trả về MV._playerFlyBV, MV._playerFlyBG
    kết thúc
    pcall(function() if MV._playerFlyBV then MV._playerFlyBV:Destroy() end end)
    pcall(function() if MV._playerFlyBG then MV._playerFlyBG:Destroy() end end)
    local bv = New("BodyVelocity", { Name = "BC_PlayerFlyVel", MaxForce = Vector3.new(1e9, 1e9, 1e9), Velocity = Vector3.new(0,0,0) }, r)
    local bg = New("BodyGyro", { Name = "BC_PlayerFlyGyro", MaxTorque = Vector3.new(1e9, 1e9, 1e9), P = 1e4, D = 50 }, r)
    MV._playerFlyBV, MV._playerFlyBG = bv, bg
    local h = MV.Hum()
    nếu h thì
        pcall(function() h.PlatformStand = true end)
        pcall(function() h.AutoRotate = false end)
    kết thúc
    trả về bv, bg
kết thúc

hàm MV.StopPlayerFly()
    MV._playerFlyActive = false
    MV._playerFlyTarget = nil
    MV._playerFlyPos = nil
    pcall(function() RunService:UnbindFromRenderStep("BC_PlayerFly") end)
    pcall(function() if MV._playerFlyBV then MV._playerFlyBV:Destroy() end end)
    pcall(function() if MV._playerFlyBG then MV._playerFlyBG:Destroy() end end)
    MV._playerFlyBV, MV._playerFlyBG = nil, nil
    nếu không phải MV.fly thì
        local h = MV.Hum()
        nếu h thì
            pcall(function() h.PlatformStand = false end)
            pcall(function() h.AutoRotate = true end)
        kết thúc
    kết thúc
    nếu MV._playerFlyNcPrev khác nil thì
        cục bộ là = MV._playerFlyNcPrev
        MV._playerFlyNcPrev = nil
        local stillFlying = (MV.Safe and MV.Safe.on == true)
        nếu không còn bay nữa thì
            nếu là == false thì
                pcall(function() MV.SetNoclip(false) end)
            kết thúc
        kết thúc
    kết thúc
    trả về giá trị đúng
kết thúc

hàm MV._PlayerFlyStep(dt)
    if not MV._playerFlyActive then return end
    local targetPlayer = MV._playerFlyTarget
    nếu không phải là targetPlayer hoặc không phải là targetPlayer.Parent thì
        MV.StopPlayerFly()
        trở lại
    kết thúc
    cục bộ c, r = nil, nil
    pcall(function()
        local char = targetPlayer.Character
        nếu char thì
            r = char:FindFirstChild("HumanoidRootPart")
            c = ký tự
        kết thúc
    kết thúc)
    nếu không phải r thì
        trở lại
    kết thúc
    local myRoot = MV.Root()
    nếu không phải là myRoot thì
        MV.StopPlayerFly()
        trở lại
    kết thúc
    local want = r.Position + Vector3.new(0, 3.5, 0)
    MV._playerFlyPos = muốn
    vị trí cục bộ = myRoot.Position
    dx cục bộ = want.X - pos.X
    local dy = want.Y - pos.Y
    local dz = want.Z - pos.Z
    local dist = math.sqrt(dx*dx + dy*dy + dz*dz)
    tốc độ cục bộ = tonumber(MV.GetPlayerFlySpeed()) hoặc 16
    local close = dist < 2
    nếu gần thì
        tốc độ = math.max(2, tốc độ * 0.15)
    nếu dist < 3.5 thì
        tốc độ = math.max(6, tốc độ * 0.45)
    kết thúc
    MV.SetNoclip(true) -- ⚡ v4.34: gọi thẳng (hàm nội bộ, đã tự động bọc pcal)
    local bv, bg = MV._EnsurePlayerFlyBV()
    thư mục cục bộ = Vector3.zero
    nếu dist > 0.1 thì
        dir = Vector3.new(dx / dist, dy / dist, dz / dist)
    kết thúc
    nếu bv thì
        nếu gần thì
            local targetVel = (r and r.Velocity) or Vector3.new(0, 0, 0)
            bv.Velocity = targetVel + dir * speed
        khác
            Vận tốc bv = hướng * tốc độ
        kết thúc
    kết thúc
    nếu bg thì
        bg.CFrame = CFrame.new(pos, Vector3.new(want.X, pos.Y, want.Z))
    kết thúc
    nếu bv và dist > 0,1 thì
        bước cục bộ = math.min(dist, speed * (tonumber(dt) or 0.05))
        myRoot.CFrame = CFrame.new(pos.X + dir.X * step, pos.Y + dir.Y * step, pos.Z + dir.Z * step)
    kết thúc
kết thúc

hàm MV.FlyToPlayer(p)
    nếu không p hoặc không p.Parent thì trả về false, "người chơi không tồn tại" end
    nếu p == player thì trả về false, "không thể bay tới chính mình" end
    nếu không phải MV.Root() thì trả về false, kết thúc "chưa có nhân vật"
    if MV.fly then MV.SetFly(false) end
    nếu MV._playerFlyNcPrev == nil và (không phải MV.Safe hoặc MV.Safe._ncPrev == nil) thì
        MV._playerFlyNcPrev = MV.noclip == true
    kết thúc
    MV._playerFlyTarget = p
    MV._playerFlyActive = true
    MV._playerFlyPos = nil
    pcall(function() MV.SetNoclip(true) end)
    pcall(function() MV._EnsurePlayerFlyBV() end)
    pcall(function() RunService:UnbindFromRenderStep("BC_PlayerFly") end)
    pcall(function()
        RunService:BindToRenderStep("BC_PlayerFly", Enum.RenderPriority.Camera.Value - 1, hàm(dt)
            pcall(MV._PlayerFlyStep, dt)
        kết thúc)
    kết thúc)
    MV._Watchdog()
    trả về giá trị đúng, p
kết thúc

--------- v5.1: 🚀 BAY TỚI VẬT ĐANG ĐỊNH VỊ (bám theo vật, tự dừng nếu vật biến mất) ----------
MV.objectFlySpeed ​​= mvClamp(MV.objectFlySpeed, 1, 2000, 60)
MV._objFlyTarget = MV._objFlyTarget hoặc nil
MV._objFlyActive = MV._objFlyActive == true
MV._objFlyBV = MV._objFlyBV hoặc nil
MV._objFlyBG = MV._objFlyBG hoặc nil
MV._objFlyNcPrev = MV._objFlyNcPrev hoặc nil
MV._objFlyHum = MV._objFlyHum hoặc nil
MV._objFlyPS = MV._objFlyPS
MV._objFlyAR = MV._objFlyAR

hàm MV.SetObjectFlySpeed(n)
    cục bộ v = tonumber(n)
    if v == nil hoặc v ~= v thì trả về false, "nhập tốc độ bay 1-2000" end
    MV.objectFlySpeed ​​= mvClamp(v, 1, 2000, MV.objectFlySpeed ​​or 60)
    trả về true, MV.objectFlySpeed
kết thúc

-- Vật cần bay tới có thể là BasePart hoặc Model -> luôn hỏi lại từng khung hình
-- nên một phần được thiết lập lại/sửa đổi vẫn bám đúng.
hàm MV._ObjFlyPart()
    local t = MV._objFlyTarget
    if t == nil then return nil end
    cục bộ ổn, phần = pcall(function()
        nếu S.ObjTrack và S.ObjTrack.PartOf thì trả về S.ObjTrack.PartOf(t) end
        nếu t:IsA("BasePart") thì trả về t
        if t.PrimaryPart then return t.PrimaryPart end
        trả về t:TìmChiLẻĐầuTiênLàMột("BasePart")
    kết thúc)
    nếu ổn và một phần và một phần.Cha thì trả về phần kết thúc
    trả về nil
kết thúc

hàm MV._EnsureObjFlyBV()
    cục bộ r = MV.Root()
    nếu không phải r thì trả về nil, nil end
    nếu MV._objFlyBV và MV._objFlyBV.Parent == r và MV._objFlyBG và MV._objFlyBG.Parent == r thì
        local h = MV.Hum()
        nếu h và MV._objFlyHum ~= h thì
            MV._objFlyHum = h
            pcall(function() MV._objFlyPS = h.PlatformStand end)
            pcall(function() MV._objFlyAR = h.AutoRotate end)
            pcall(function() h.PlatformStand = true; h.AutoRotate = false end)
        kết thúc
        trả về MV._objFlyBV, MV._objFlyBG
    kết thúc
    pcall(function() if MV._objFlyBV then MV._objFlyBV:Destroy() end end)
    pcall(function() if MV._objFlyBG then MV._objFlyBG:Destroy() end end)
    MV._objFlyBV, MV._objFlyBG = không, không
    local bv = New("BodyVelocity", {
        Tên = "BC_ObjFlyVel", Lực tối đa = Vector3.new(1e9, 1e9, 1e9), Vận tốc = Vector3.new(0, 0, 0)
    }, r)
    cục bộ bg = New("BodyGyro", {
        Tên = "BC_ObjFlyGyro", Mô-men xoắn cực đại = Vector3.new(1e9, 1e9, 1e9), P = 1e4, D = 50
    }, r)
    MV._objFlyBV, MV._objFlyBG = bv, bg
    local h = MV.Hum()
    nếu h thì
        MV._objFlyHum = h
        pcall(function() MV._objFlyPS = h.PlatformStand end)
        pcall(function() MV._objFlyAR = h.AutoRotate end)
        pcall(function() h.PlatformStand = true; h.AutoRotate = false end)
    kết thúc
    trả về bv, bg
kết thúc

hàm MV.StopObjectFly()
    MV._objFlyActive = false
    MV._objFlyTarget = nil
    pcall(function() RunService:UnbindFromRenderStep("BC_ObjFly") end)
    pcall(function() if MV._objFlyBV then MV._objFlyBV:Destroy() end end)
    pcall(function() if MV._objFlyBG then MV._objFlyBG:Destroy() end end)
    MV._objFlyBV, MV._objFlyBG = không, không
    cục bộ h = MV._objFlyHum
    local safeOn = MV.Safe and MV.Safe.on == true
    nếu h và h.Parent và không phải MV.fly và không phải MV._playerFlyActive và không phải MV._glassFlyActive và không phải safeOn thì
        if MV._objFlyPS ~= nil then pcall(function() h.PlatformStand = MV._objFlyPS end) end
        if MV._objFlyAR ~= nil then pcall(function() h.AutoRotate = MV._objFlyAR end) end
    kết thúc
    MV._objFlyHum, MV._objFlyPS, MV._objFlyAR = không, không, không
    nếu MV._objFlyNcPrev ~= nil thì
        cục bộ là = MV._objFlyNcPrev
        MV._objFlyNcPrev = nil
        nếu không phải MV._playerFlyActive và không phải MV._glassFlyActive và không phải safeOn thì
            pcall(function() MV.SetNoclip(was) end)
        kết thúc
    kết thúc
    pcall(function() if S.ObjTrack and S.ObjTrack.OnFlyChange then S.ObjTrack.OnFlyChange() end end)
    trả về giá trị đúng
kết thúc

hàm MV._ObjectFlyStep(dt)
    if not MV._objFlyActive then return end
    local part = MV._ObjFlyPart()
    nếu không phải là một phần thì
        pcall(MV.StopObjectFly)
        pcall(function() if D.Say then D.Say("🌳 vật đang bay tới đã biến mất — đã dừng bay", C.YELLOW) end end)
        trở lại
    kết thúc
    local myRoot = MV.Root()
    nếu không phải myRoot thì return end -- respawn: giữ mục tiêu, khung sau gắn lực vào root mới
    local want = part.Position + Vector3.new(0, 3.2, 0)
    vị trí cục bộ = myRoot.Position
    local dx, dy, dz = want.X - pos.X, want.Y - pos.Y, want.Z - pos.Z
    local dist = math.sqrt(dx * dx + dy * dy + dz * dz)
    tốc độ cục bộ = mvClamp(MV.objectFlySpeed, 1, 2000, 60)
    local close = (dist <= 2.5)
    nếu gần thì tốc độ = math.max(2, tốc độ * 0.15)
    elseif dist < 5 then speed = math.max(6, speed * 0.45) end
    pcall(function() MV.SetNoclip(true) end)
    local bv, bg = MV._EnsureObjFlyBV()
    local dir = Vector3.new(0, 0, 0)
    if dist > 0.1 then dir = Vector3.new(dx / dist, dy / dist, dz / dist) end
    nếu bv thì
        cục bộ pv = nil
        pcall(function() pv = part.AssemblyLinearVelocity end)
        nếu gần và pv thì
            Vận tốc bv = pv + dir * tốc độ
        khác
            Vận tốc bv = hướng * tốc độ
        kết thúc
    kết thúc
    nếu bg và (dist > 0,05) thì
        pcall(function() bg.CFrame = CFrame.new(pos, Vector3.new(want.X, pos.Y, want.Z)) end)
    kết thúc
    nếu bv và dist > 0,1 thì
        bước cục bộ = math.min(dist, speed * (tonumber(dt) or 0.05))
        pcall(function() myRoot.CFrame = CFrame.new(pos + dir * step) end)
    kết thúc
kết thúc

hàm MV.FlyToObject(target, speed)
    if target == nil thì trả về false, "chưa có vật phẩm để bay tới" end
    nếu không phải MV.Root() thì trả về false, kết thúc "chưa có nhân vật để bay"
    phần cục bộ = nil
    pcall(function()
        if S.ObjTrack and S.ObjTrack.PartOf then part = S.ObjTrack.PartOf(target) end
    kết thúc)
    nếu không có phần thì trả về false, "vật không còn trong game" end
    if speed ~= nil then pcall(function() MV.SetObjectFlySpeed(speed) end) end
    if MV.fly then pcall(function() MV.SetFly(false) end) end
    if MV._playerFlyActive then pcall(function() MV.StopPlayerFly() end) end
    if MV._glassFlyActive then pcall(function() MV.StopGlassFly() end) end
    if MV._objFlyNcPrev == nil then MV._objFlyNcPrev = (MV.noclip == true) end
    MV._objFlyTarget = mục tiêu
    MV._objFlyActive = true
    pcall(function() MV.SetNoclip(true) end)
    pcall(function() MV._EnsureObjFlyBV() end)
    pcall(function() RunService:UnbindFromRenderStep("BC_ObjFly") end)
    local okBind = pcall(function()
        RunService:BindToRenderStep("BC_ObjFly", Enum.RenderPriority.Camera.Value - 1, hàm(dt)
            pcall(MV._ObjectFlyStep, dt)
        kết thúc)
    kết thúc)
    nếu không phải okBind thì
        MV.StopObjectFly()
        return false, "người thực thi không thể liên kết bay tới vật"
    kết thúc
    pcall(function() if S.ObjTrack and S.ObjTrack.OnFlyChange then S.ObjTrack.OnFlyChange() end end)
    trả về giá trị đúng, mục tiêu
kết thúc

-- ---------- ⬆⬇ nâng cao/hạ: thảm thì đổi độ cao, bay thì Đưa người ----------
hàm MV.Nudge(dy)
    nếu MV.carpet thì
        MV.carpetY = (MV.carpetY hoặc MV.FootY() hoặc 0) + dy
        trả về giá trị true, "thảm"
    nếu MV.fly thì
        cục bộ r = MV.Root()
        if r then r.CFrame = CFrame.new(r.Position.X, r.Position.Y + dy, r.Position.Z) end
        trả về giá trị true, "bay"
    kết thúc
    trả về false, nil
kết thúc

--------- HUD: Cụm nút NỔI TRÊN HÌNH THỨC (⬆ 🪩 ⬇ ✕) ----------
hàm MV._HudNudge(dy)
    cục bộ ổn, cái gì = MV.Nudge(dy)
    MV._HudSay(ok and ((dy > 0 and "⬆ nâng " or "⬇ hạ ") .. tostring(what) .. " 2.5")
                   hoặc "⬆⬇ bật Bay trước đó")
kết thúc
hàm MV._BuildHud()
    if MV._hud then return MV._hud end
    cục bộ hud = New("Khung", {
        Tên = "BC_MoveHud",
        Kích thước = UDim2.new(0, 180, 0, 160), Vị trí = UDim2.new(1, -190, 0.5, -80),
        BackgroundTransparency = 1, Visible = false, ZIndex = 20,
    }, gui)
    hàm cục bộ obtn(txt, y, size, color, cb)
        cục bộ b = New("TextButton", {
            Kích thước = UDim2.new(0, kích thước, 0, kích thước), Vị trí = UDim2.new(0.5, -kích thước / 2, 0, y),
            Văn bản = txt, Màu nền 3 = màu hoặc C.BLUE, Độ trong suốt nền = 0.3,
            TextColor3 = C.WHITE, Font = Enum.Font.GothamBold, TextSize = 20,
            BorderSizePixel = 0, ZIndex = 21,
        }, hud)
        Góc(b, UDim.new(1, 0))
        Stroke(b, C.WHITE, 2)
        b.Đã kích hoạt:Connect(function() pcall(cb) end)
        trả lại b
    kết thúc
    MV._hudCarpet = nil -- [REMOVED] tham kinh
    MV._hudUp = obtn("⬆", 60, 50, Color3.fromRGB(0, 150, 0), function() MV._HudNudge(2.5) end)
    MV._hudDown = obtn("⬇", 120, 50, Color3.fromRGB(150, 0, 0), function() MV._HudNudge(-2.5) end)
    MV._hudClose = New("TextButton", {
        Kích thước = UDim2.new(0, 34, 0, 34), Vị trí = UDim2.new(1, -44, 0, 10),
        Văn bản = "✕", Màu nền 3 = Đỏ đậm, Độ trong suốt nền = 0.3,
        TextColor3 = C.WHITE, Font = Enum.Font.GothamBold, TextSize = 18,
        BorderSizePixel = 0, ZIndex = 21,
    }, hud)
    Góc(MV._hudClose, UDim.new(1, 0))
    Stroke(MV._hudClose, C.WHITE, 2)
    MV._hudClose.Activated:Connect(function()
        MV.SetRunMode(false)
        MV._HudSay("🛑 đã tắt chế độ chạy trên thảm")
    kết thúc)
    MV._hud = hud
    trả về hud
kết thúc
hàm MV._HudSay(msg)
    pcall(function() if D.hubStatus then D.hubStatus.Text = msg end end)
kết thúc
hàm MV.SyncHud()
    pcall(function()
        local hud = MV._BuildHud()
        local safeOn = (MV.Safe and MV.Safe.on == true)
        local on = (MV.fly or MV.runMode)
        if safeOn hoặc MV.fly thì on = false end -- 🚀 dùng HUD điều khiển tay, 🪩/🏃 giữ HUD cũ
        hud.Visible = (on == true)
        if MV._hudCarpet then -- xám như bản gốc, XANH khi thảm bật
            MV._hudCarpet.BackgroundColor3 = MV.carpet và C.GREEN hoặc C.GRAY
        kết thúc
    kết thúc)
    if MV.SyncFlyHud then MV.SyncFlyHud() end
kết thúc

--------- 🏃 CHẠY TRÊN THẢM = "🕹️ BAY CHẠY BỘ" của aiaiaitao3 (v4.12.4: GIỐNG 100%) ----------
hàm MV.SetRunMode(on)
    MV.runMode = false
    pcall(function() if main then main.Visible = true end end)
    pcall(function() if togBtn then togBtn.Text = (main and main.Visible) and "✕" or "" end end)
    MV._menuWasOpen = nil
    MV.SyncHud()
    return false, "tinh nang chay tren tham da bi xoa"
kết thúc

-- ----------tắt hết / khôi phục sau hồi sinh / trạng thái summ tắt ----------
hàm MV.StopAll()
    pcall(function() if S.Free and S.Free.Stop then S.Free.Stop() end end)
    if MV.Safe and MV.Safe.on then pcall(function() MV.Safe.Stop() end) end
    pcall(function() MV.StopGlassFly() end)
    pcall(function() MV.StopPlayerFly() end)
    pcall(function() MV.StopObjectFly() end) -- v5.1:tắt luôn bay tới vị trí vật phẩm
    MV.SetFly(false)
    MV.SetCarpet(false)
    MV.SetNoclip(false)
    MV.SetInfJump(false)
    MV.SetHighJump(false) -- v4.38:tắt 🦘 nhảy cao
    MV.SetSpeed(false)
    MV.SetSprint(false) -- v4.37:tắt 💨tốc độ camera
    MV.SetRunMode(false) -- v4.12: thoát chế độ chạy trên thảm (trả lời menu + ẩn HUD)
    MV._Watchdog()
    MV.SyncHud()
    pcall(function() if MV.Safe and MV.Safe.SyncHud then MV.Safe.SyncHud() end end)
kết thúc
S.MoveActionState = {
    fly = function() return S.Move.fly end,
    noclip = function() return S.Move.noclip end,
    infjump = function() return S.Move.infJump end,
    highjump= function() return S.Move.highJump end,
    tốc độ = hàm() trả về S.Move.speed kết thúc,
    camspeed= function() return S.Move.sprint end,
    carpet = function() return S.Move.carpet end,
    runmode = function() return S.Move.runMode end,
    loc_all = function() return S.Loc and S.Loc.on end,
    loc_solo = function() return S.Loc and S.Loc.solo end,
    spec_on = function() return S.Spec and S.Spec.on end,
    glow = function() return S.Glow and S.Glow.on end,
    freecam = function() return S.Free and S.Free.on end,
    safefly = function() return S.Move.Safe and S.Move.Safe.on end,
    objtrack = function() return S.ObjTrack và S.ObjTrack.on end, -- v5.1: 🌳 định vị vật theo tên
}

hàm MV.Refresh()
    MV._NcForgetLost() -- v4.22: chỉ quên phần đã mất (giữ giá trị gốc của phần đang bật 🧱)
    if MV.speed thì MV.ApplyChar() kết thúc -- không ép mặc định tốc độ mặc dù đang bay chỉ
    if MV.noclip then MV._NcStep() end
    nếu MV.fly thì
        MV._EnsureFly()
        MV._BindFly()
    kết thúc
    nếu MV.sprint thì
        MV._EnsureSpeed()
        MV._BindSpeed()
    kết thúc
    nếu MV.highJump thì
        pcall(MV._HighJumpApplyPower)
        pcall(MV._HighJumpBind)
    kết thúc
    if MV.Safe and MV.Safe.on then pcall(MV.Safe.Step, 0.05) end -- v4.23: 🛡 tự chữa lành sau khi hồi sinh
    if MV._glassFlyActive then pcall(MV._EnsureGlassFlyBV) end -- giữ mục tiêu qua respawn
    if MV.autoGlass and not MV._autoGlassBound then pcall(MV.SetAutoGlass, true) end
    MV.SyncHud()
    pcall(function() if MV.Safe and MV.Safe.SyncHud then MV.Safe.SyncHud() end end)
kết thúc
hàm MV.Status()
    cục bộ t = {}
    if MV.fly then t[#t + 1] = string.format("🚀 bay %d", MV.flySpeed) end
    if MV.noclip thì t[#t + 1] = "🧱Tường tường" end
    nếu MV.infJump thì t[#t + 1] = "🦘 nhảy vô hạn" end
    if MV.highJump then t[#t + 1] = string.format("🦘 nhảy cao %d", MV.highJumpSpeed) end
    if MV.sprint then t[#t + 1] = string.format("💨 tốc độ %d", MV.sprintSpeed) end
    nếu MV.speed thì
        nếu MV.speedMode == "x" thì
            t[#t + 1] = string.format("👟 chạy ×%g (game %g)", MV.speedMul, MV._baseWS or 16)
        khác
            t[#t + 1] = string.format("👟 chạy %g", MV.walkSpeed)
        kết thúc
    kết thúc
    nếu MV._playerFlyActive thì
        local pn = MV._playerFlyTarget and tostring(MV._playerFlyTarget.Name) or "?"
        local sp = MV.GetPlayerFlySpeed ​​and MV.GetPlayerFlySpeed() or (MV.playerFlySpeed ​​or 0)
        nếu (tonumber(MV.playerFlySpeed) hoặc 0) == 0 thì
            t[#t + 1] = string.format("🚀 bay tới người %s (auto %g)", pn, sp)
        khác
            t[#t + 1] = string.format("🚀 bay tới người %s %g", pn, sp)
        kết thúc
    kết thúc
    local glassCount = 0
    pcall(function() glassCount = #MV.GetPlacedGlasses() end)
    if glassCount > 0 then t[#t + 1] = "🧱 kính " .. tostring(glassCount) .. " tấm" end
    nếu MV._glassFlyActive thì
        local targetId = MV._glassFlyTarget and MV._glassFlyTarget.id or "?"
        t[#t + 1] = "🚀 bay tới kính #" .. tostring(targetId)
    kết thúc
    if #t == 0 thì return "🚶 di chuyển: đang TẮT" end
    return "🚶 đang BẬT: " .. table.concat(t, " · ")
kết thúc
trackConn(player.CharacterAdded:Connect(function()
    task.spawn(function()
        task.wait(0.3)
        pcall(MV.Refresh)
    kết thúc)
kết thúc))

--------- v4.6.3: NHÓM TÍNH NĂNG 🌐 MÁY CHỦ (Đặt lại · Hop · Lấy mã · Vào theo mã) ----------
hàm S.GetJobId()
    ID cục bộ = game.JobId
    if id == nil then return nil end
    id = tostring(id)
    if id == "" then return nil end
    trả về id
kết thúc

hàm S.CopyToClipboard(text)
    cục bộ đã làm = sai
    pcall(function()
        nếu setclipboard thì setclipboard(text) đã thực hiện = true
        elseif toclipboard then toclipboard(text) did = true
        elseif set_clipboard then set_clipboard(text) did = true end
    kết thúc)
    trả lại
kết thúc

hàm S.FetchServers(cursor)
    URL cục bộ = "https://games.roblox.com/v1/games/" .. tostring(game.PlaceId)
             .. "/servers/Public?sortOrder=Asc&limit=100"
    if cursor and cursor ~= "" then url = url .. "&cursor=" .. tostring(cursor) end
    local raw = game:HttpGet(url)
    dữ liệu cục bộ = HttpService:JSONDecode(raw)
    if type(data) ~= "table" then return {}, nil end
    return (type(data.data) == "table" and data.data or {}), data.nextPageCursor
kết thúc

hàm S.ResetServer()
    local me = S.GetJobId()
    nếu là tôi thì
        TeleportService:TeleportToPlaceInstance(game.PlaceId, me, player)
        return "🔄 Đang vào lại máy chủ ĐÚNG này: " .. me .. " (giữ nguyên người chơi cùng máy chủ)..."
    kết thúc
    Dịch vụ dịch chuyển tức thời:Dịch chuyển tức thời(game.PlaceId, player)
    return "🔄 Không thể đọc máy chủ mã hóa (Studio/server menu) → đang tải lại trò chơi..."
kết thúc

hàm S.JoinServer(jobId)
    TeleportService:TeleportToPlaceInstance(game.PlaceId, tostring(jobId), player)
kết thúc

hàm S.HopServer()
    local me = tostring(S.GetJobId() or "")
    cục bộ cand, con trỏ = {}, ""
    for _ = 1, 3 do
        danh sách cục bộ, nextCursor = S.FetchServers(cursor)
        for _, sv in ipairs(list) do
            local sid = (sv and sv.id) and tostring(sv.id) or nil
            local playing = tonumber(sv and sv.playing) or 0
            local maxp = tonumber(sv and sv.maxPlayers) or 0
            nếu sid và sid ~= me và (maxp <= 0 hoặc đang chơi < maxp) thì
                cand[#cand + 1] = {id = sid, playing = playing, maxPlayers = maxp}
            kết thúc
        kết thúc
        if #cand > 0 then break end -- có ứng viên rồi thì khỏi cô trang
        if not nextCursor or nextCursor == "" then break end
        con trỏ = con trỏ tiếp theo
    kết thúc
    nếu #cand == 0 thì
        return "⚠️ Không tìm thấy máy chủ nào còn chỗ trống (hoặc trò chơi này không hiển thị máy chủ danh sách)"
    kết thúc
    local pick = cand[math.random(1, #cand)]
    S.JoinServer(pick.id)
    return "🔀 Đang nhảy sang server " .. pick.id .. " (" .. pick.playing .. "/" .. pick.maxPlayers
        .. " người) · tìm được " .. #cand .. " server khác để chọn, bỏ qua server hiện tại"
kết thúc


hàm S.HopLowServer()
    local me = tostring(S.GetJobId() or "")
    cục bộ cand, con trỏ = {}, ""
    trang cục bộ = 0
    local maxPages = 8 -- quét 800 server để tìm server vắng nhất
    for _ = 1, maxPages do
        trang = trang + 1
        local ok, list, nextCursor = pcall(function() return S.FetchServers(cursor) end)
        nếu không ổn thì
            -- nếu http bị lỗi, hãy thử lại 1 lần
            task.wait(0.3)
            ok, list, nextCursor = pcall(function() return S.FetchServers(cursor) end)
        kết thúc
        nếu không hợp lệ hoặc kiểu (danh sách) ~= "bảng" thì thoát.
        for _, sv in ipairs(list) do
            local sid = (sv and sv.id) and tostring(sv.id) or nil
            local playing = tonumber(sv and sv.playing) or 0
            local maxp = tonumber(sv and sv.maxPlayers) or 0
            nếu sid và sid ~= me và (maxp <= 0 hoặc đang chơi < maxp) thì
                -- chỉ lấy chỗ trống của máy chủ và không có máy chủ hiện tại
                cand[#cand + 1] = {id = sid, playing = playing, maxPlayers = maxp}
            kết thúc
        kết thúc
        if not nextCursor or nextCursor == "" then break end
        con trỏ = con trỏ tiếp theo
        task.wait(0.15) -- tránh api spam
    kết thúc
    nếu #cand == 0 thì
        return "⚠️ Không tìm thấy máy chủ nào còn chỗ trống (đã quét "..pages.." trang)"
    kết thúc
    -- sắp xếp theo số người chơi tăng dần (ít người nhất lên đầu)
    table.sort(cand, function(a,b) return (a.playing or 0) < (b.playing or 0) end)
    local minPlay = cand[1].playing
    -- get toàn bộ server có số người = minPlay (hoặc chênh lệch 1) để hỗ trợ trùng lặp ngẫu nhiên
    tốt nhất cục bộ = {}
    for _, sv in ipairs(cand) do
        nếu sv.playing <= minPlay + 1 thì
            tốt nhất[#tốt nhất+1] = sv
        khác
            phá vỡ
        kết thúc
    kết thúc
    local pick = best[math.random(1, #best)]
    S.JoinServer(pick.id)
    return "🔀 [ÍT NGƯỜI] Đang nhảy sang server " .. pick.id .. " (" .. pick.playing .. "/" .. pick.maxPlayers .. " người) · đã quét " .. #cand .. " server qua " .. pages .. " trang, vắng nhất " .. minPlay .. " người"
kết thúc

hàm S.HopEmptyServer()
    local me = tostring(S.GetJobId() or "")
    cục bộ cand, con trỏ = {}, ""
    trang cục bộ = 0
    local maxPages = 10
    for _ = 1, maxPages do
        trang = trang + 1
        local ok, list, nextCursor = pcall(function() return S.FetchServers(cursor) end)
        nếu không ổn thì
            task.wait(0.3)
            ok, list, nextCursor = pcall(function() return S.FetchServers(cursor) end)
        kết thúc
        nếu không hợp lệ hoặc kiểu (danh sách) ~= "bảng" thì thoát.
        for _, sv in ipairs(list) do
            local sid = (sv and sv.id) and tostring(sv.id) or nil
            local playing = tonumber(sv and sv.playing) or 0
            local maxp = tonumber(sv and sv.maxPlayers) or 0
            nếu sid và sid ~= me và (maxp <= 0 hoặc playing < maxp) và playing <= 3 thì
                cand[#cand + 1] = {id = sid, playing = playing, maxPlayers = maxp}
            kết thúc
        kết thúc
        if #cand >= 5 thì break end -- đủ 5 server vắng thì dừng sớm
        if not nextCursor or nextCursor == "" then break end
        con trỏ = con trỏ tiếp theo
        task.wait(0.15)
    kết thúc
    nếu #cand == 0 thì
        -- dự phòng sang HopLowServer nếu không có máy chủ siêu vắng
        trả về S.HopLowServer()
    kết thúc
    table.sort(cand, function(a,b) return (a.playing or 0) < (b.playing or 0) end)
    local pick = cand[math.random(1, #cand)]
    S.JoinServer(pick.id)
    return "🔀 [SIÊU VẮNG ≤3] Đang nhảy sang server " .. pick.id .. " (" .. pick.playing .. "/" .. pick.maxPlayers .. " người) · tìm thấy " .. #cand .. " server vắng qua " .. pages .. " trang"
kết thúc


--------- 🔐 CHỐNG BAN (v4.43) ----------
S.AntiBan = S.AntiBan hoặc {
    bật = (_G.BananaCatHub_AntiBan == true),
    bận = false, lastHop = 0, cooldown = 10, hops = 0,
    lastReason = "", armed = false, snaps = 0, snapAt = 0,
    conns = {}, _unhookKick = nil,
}

hàm S.AntiBanIsMsg(msg)
    local s = string.lower(tostring(msg or ""))
    nếu s == "" thì trả về false
    khóa cục bộ = {
        "Bạn đã bị cấm", "Bạn đã bị đuổi khỏi trò chơi", "Bạn đã bị cấm", "Bạn đã bị đuổi khỏi trò chơi",
        "Bị cấm tham gia", "Bị đuổi khỏi trò chơi", "Phát hiện lỗi khai thác", "Phát hiện gian lận",
        "phát hiện gian lận", "chống gian lận", "chống gian lận", "bị đuổi bởi", "bị cấm bởi",
        "Bạn bị cấm", "Tài khoản bị cấm", "Trò chơi bị cấm", "Máy chủ bị cấm", "Người chơi bị đá ra khỏi trò chơi",
    }
    for i = 1, #keys do
        if string.find(s, keys[i], 1, true) then return true end
    kết thúc
    trả về false
kết thúc

hàm S.AntiBanStatus()
    cục bộ a = S.AntiBan
    nếu không phải a.on thì trả về "🔐 Chống cấm: TẮT" kết thúc
    local extra = (a.lastReason ~= "" and (" · lần cuối: " .. a.lastReason)) or ""
    return "🔐 Anti Ban: BẬT · đã nhảy " .. tostring(a.hops) .. " lần · chờ " .. tostring(a.cooldown) .. "s" .. extra
kết thúc

hàm S.AntiBanHop(lý do)
    cục bộ a = S.AntiBan
    if not a or not a.on then return false, "off" end
    if a.busy then return false, "busy" end
    cục bộ hiện tại = 0
    pcall(function() now = tick() end)
    local cd = tonumber(a.cooldown) or 10
    Nếu now > 0 và a.lastHop > 0 và (now - a.lastHop) < cd thì trả về false, "cooldown" end
    a.bận rộn = đúng
    a.lastHop = bây giờ
    a.lastReason = tostring(reason or "suspect")
    a.hops = (tonumber(a.hops) or 0) + 1
    pcall(function() _G.BananaCatHub_AntiBan = true end)
    tin nhắn cục bộ = "⚠️ chưa nhảy"
    local ok = pcall(function() msg ​​= S.HopServer() end)
    nếu không ổn thì
        pcall(function() TeleportService:Teleport(game.PlaceId, player) end)
        msg = "🔐 không lấy được danh sách → rời PlaceId (không đặt lại máy chủ cũ)"
    kết thúc
    a.bận = sai
    pcall(function() if S.SyncAntiBanPanel then S.SyncAntiBanPanel() end end)
    pcall(function() if D.Say then D.Say("🔐 " .. tostring(msg), C.ACCENT) end end)
    trả về true, msg
kết thúc

hàm S.AntiBanDisarm()
    cục bộ a = S.AntiBan
    nếu không phải là a thì trả về end
    nếu a._unhookKick thì
        pcall(a._unhookKick)
        nếu _G.BananaCatHub_AntiBanUnhook == a._unhookKick thì
            _G.BananaCatHub_AntiBanUnhook = không
        kết thúc
        a._unhookKick = nil
    kết thúc
    for i = #(a.conns or {}), 1, -1 do
        cục bộ c = a.conns[i]
        pcall(function() if c then c:Disconnect() end end)
        a.conns[i] = nil
    kết thúc
    a.armed = false
kết thúc

hàm S.AntiBanSet(on)
    S.AntiBan.on = bật và đúng hoặc sai
    pcall(function() _G.BananaCatHub_AntiBan = S.AntiBan.on end)
    nếu S.AntiBan.on thì
        S.AntiBanArm()
    khác
        S.AntiBanDisarm()
    kết thúc
    if S.SyncAntiBanPanel then pcall(S.SyncAntiBanPanel) end
    trả về S.AntiBan.on
kết thúc

hàm S.AntiBanArm()
    cục bộ a = S.AntiBan
    nếu a.armed thì trả về end
    a.armed = true
    a.conns = a.conns hoặc {}
    hàm cục bộ antiConnect(signal, fn)
        cục bộ c = tín hiệu:Kết nối(fn)
        a.conns[#a.conns + 1] = c
        trackConn(c)
        trả về c
    kết thúc
    pcall(function()
        nếu kiểu của hookfunction là "function" thì
            người địa phương cũ
            cũ = hàm móc (người chơi.Kick, hàm (...)
                if a.on then S.AntiBanHop("kick") return end
                nếu cũ thì trả về cũ(...) kết thúc
            kết thúc)
            nếu cũ thì
                cục bộ đã bị xóa = false
                hàm cục bộ unhookKick()
                    nếu bị xóa thì trả về kết thúc
                    đã xóa = đúng
                    pcall(function() hookfunction(player.Kick, old) end)
                kết thúc
                a._unhookKick = unhookKick
                _G.BananaCatHub_AntiBanUnhook = unhookKick
            kết thúc
        kết thúc
    kết thúc)
    pcall(function()
        antiConnect(Players.PlayerRemoving, function(p)
            if p == player and a.on then S.AntiBanHop("player_removing") end
        kết thúc)
    kết thúc)
    pcall(function()
        local gs = game:GetService("GuiService")
        antiConnect(gs.ErrorMessageChanged, function()
            nếu không phải a.on thì trả về end
            thông báo cục bộ = ""
            pcall(function() msg ​​= tostring(gs.ErrorMessage or "") end)
            if msg == "" then pcall(function() msg ​​= tostring(gs:GetErrorMessage()) end) end
            if S.AntiBanIsMsg(msg) then S.AntiBanHop("gui_error") end
        kết thúc)
    kết thúc)
    pcall(function()
        antiConnect(TeleportService.TeleportInitFailed, function()
            nếu không phải a.on thì trả về end
            task.delay(1.2, function()
                S.AntiBan.busy = false
                S.AntiBanHop("teleport_fail")
            kết thúc)
        kết thúc)
    kết thúc)
    pcall(function()
        antiConnect(game:GetService("LogService").MessageOut, function(msg)
            if a.on and S.AntiBanIsMsg(msg) then S.AntiBanHop("log") end
        kết thúc)
    kết thúc)
    hàm cục bộ watchHum(hum)
        nếu không có tiếng vo ve thì trả về đầu cuối
        pcall(function()
            antiConnect(hum:GetPropertyChangedSignal("WalkSpeed"), function()
                nếu không phải a.on thì trả về end
                cục bộ m = S.Move
                local hot = m and (m.fly or m.noclip or m.sprint or m.infJump or m.highJump or (m.Safe and m.Safe.on))
                nếu không nóng thì trả lại đầu
                cục bộ hiện tại = tick()
                nếu bây giờ - (S.AntiBan.snapAt hoặc 0) > 4 thì S.AntiBan.snaps = 0
                S.AntiBan.snapAt = bây giờ
                S.AntiBan.snaps = (S.AntiBan.snaps hoặc 0) + 1
                nếu S.AntiBan.snaps >= 3 thì
                    S.AntiBan.snaps = 0
                    S.AntiBanHop("speed_reset")
                kết thúc
            kết thúc)
        kết thúc)
    kết thúc
    pcall(function()
        if player.Character then watchHum(player.Character:FindFirstChildOfClass("Humanoid")) end
        antiConnect(player.CharacterAdded, function(ch)
            task.wait(0.25)
            watchHum(ch:FindFirstChildOfClass("Humanoid"))
        kết thúc)
    kết thúc)
kết thúc
if S.AntiBan.on then pcall(S.AntiBanArm) end
--------- HẾT 🔐 CHỐNG BAN ----------

S.ScriptHubList = {
    {icon="🛡", name="Infinite Yield", cat="Admin", ord=1,
     desc="Các lệnh quản trị: kill, speed, jump, noclip, teleport, bring, prefix tùy chỉnh...",
     code=[[loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()]],
     noPark=true},
    {icon="🧰", name="Dex Explorer", cat="Explorer", ord=2,
     desc="Duyệt toàn bộ instance trong game, xem/sửa thuộc tính, tìm đối tượng theo đường dẫn.",
     code=[[loadstring(game:HttpGet("https://raw.githubusercontent.com/infyiff/backup/main/dex.lua"))()]],
     noPark=true},
    {icon="📡", name="SimpleSpy v3", cat="Spy", ord=3,
     desc="Theo dõi RemoteEvent/RemoteFunction: tên, tham số, sao chép mã để gọi lại sức khỏe.",
     code=[[loadstring(game:HttpGet("https://raw.githubusercontent.com/ex-serum/SimpleSpy/main/SimpleSpy.lua"))()]],
     noPark=true},
    {icon="🎯", name="Niêm tâm (Crosshair)", cat="Tiện ích", ord=4, action="crosshair",
     desc="Bật/tắt vòng tròn niêm tâm + 4 bắn ngắn ở GIỮA màn hình game (menu bên ngoài)."},
    {icon="🧩", name="Trả GUI về màn hình", cat="Tiện ích", ord=5, action="unpark",
     desc="Hoàn tác MỌI GUI hub mượn vào menu: tab tính năng + tab 🧩 GUI Ngoài."},
    {icon="🖱", name="Sửa kẹp chuột", cat="Tiện ích", ord=6, action="fixmouse",
     desc="Nhả focus ô nhập, trả GUI về trò chơi, đặt lại MouseBehavior — hết cảnh không quay chuột/không bắn."},
    {icon="🔄", name="Tải lại hub từ đĩa", cat="Tiện ích", ord=7, action="reload",
     desc="Đọc lại file save: script đã lưu, waypoint, tab tính năng, cài đặt 🧩 / 🕵 / 🪟."},
    {icon="🧹", name="Dọn hosting nhúng rác", cat="Tiện ích", ord=8, action="prune",
     desc="Xóa các khung Embedded_ mồ hôi côi/rỗng còn sót lại trong tab (script tự hủy GUI để quay lại)."},
    {icon="🔄", name="Đặt lại máy chủ", cat="Máy chủ", ord=9, action="đặt lại máy chủ",
     desc="Vào lại ĐÚNG server đang chơi (giữ nguyên bạn bè/người chơi cùng server). Studio thì tải lại game."},
    {icon="🔀", name="Máy chủ Hop", cat="Máy chủ", ord=10, action="máy chủ hop",
     desc="Tự động lấy mã máy chủ: đọc danh sách máy chủ công khai, bỏ hiện tại máy chủ + đầy máy chủ, nhảy sang 1 máy chủ khác."},
    {icon="👥", name="Hop Server Ít Người", cat="Server", ord=10.1, action="hoplow",
     desc="Quét 800 server (8 trang) tìm server VẮNG NHẤT (ít người nhất), ưu tiên server chỉ 1-2 người, rồi nhảy sang. Dùng khi muốn farm yên tĩnh."},
    {icon="🌙", name="Hop Server Siêu Vắng (≤3)", cat="Server", ord=10.2, action="hopempty",
     desc="Chỉ tìm máy chủ có ≤3 người đang chơi (siêu vắng). Nếu không có, động dự phòng tự động tìm máy chủ ít người nhất. Quét tối đa 10 trang."},
    {icon="🔐", name="Chống cấm", cat="Máy chủ", ord=10.5, action="chống cấm",
     desc="Tự nhảy SANG SERVER KHÁC (cùng trò chơi) khi bị kick/cấm hoặc máy chủ nghi hành động (bay/xuyên/tốc độ được đặt lại). Đánh lạc hướng máy chủ chủ. Bấm lại để TẮT."},
    {icon="🌐", name="Lấy mã máy chủ (JobId)", cat="Máy chủ", ord=11, action="getjobid",
     desc="Đọc mã máy chủ hiện tại, sao chép ra clipboard và điền sẵn vào ô 🎟 để gửi cho bạn bè vào cùng."},
    {icon="🚀", name="Bay theo camera", cat="Di chuyển", ord=12, action="fly",
     desc="Bay điều KHIỂN TAY theo camera (khác 🛡 Bay An Toàn). Nhìn xuống 60° + tiến tới = xuống 60°. WASD/joystick; thả phím đứng lơ. Space lên · Shift/Ctrl xuống. 🧱 Thường xuyên bật/tắt riêng khung ở 🚀."},
    {icon="💨", name="Tốc độ theo camera", cat="Di chuyển", ord=12.2, action="camspeed",
     desc="Chạy trên mặt đất 100% kiểu 🚀: WASD/cần điều khiển theo hướng camera. KHÔNG xuyên tường, nhảy bình thường, rơi theo sức mạnh game, không nút ảo. Chỉnh tốc độ ở khung 💨."},
    {icon="🪩", name="Thảm kính bám chân", cat="Di chuyển", ord=12.6, action="carpet",
     desc="Bật/tắt một thảm kính trong suốt bám dưới chân; tương thích chế độ thảm cũ, không ảnh hưởng đến các tấm kính cố định."},
    {icon="🧱", name="Đặt tấm kính cố định", cat="Di chuyển", ord=12.7, action="placeglass",
     desc=" Đặt thêm một tấm kính dưới chân tại vị trí hiện tại. Mỗi lần ấn tạo một tấm mới, không ghi đè trước."},
    {icon="📋", name="Đã đặt quản lý kính", cat="Di chuyển", ord=12.8, action="openglasspanel",
     desc="Mở tab 👥 Người Chơi để xem số lượng/danh sách, bay tới hoặc xóa riêng từng tấm kính."},
    {icon="🔄", name="Tự đặt kính theo đường đi", cat="Di chuyển", ord=12.9, action="autoglass",
     desc="Tự động thêm cố định kính khi chuyển đủ xa; ấn lại để dừng. Danh sách và cập nhật số lượng trong menu."},
    {icon="🧹", name="Xóa toàn bộ kính", cat="Di chuyển", ord=12.95, action="clearglass",
     desc="Xóa tất cả các tấm kính cố định đã đặt, không tắt thảm kính bám chân."},
    {icon="🚀", name="Bay tới kính gần nhất", cat="Di chuyển", ord=12.96, action="flyglass",
     desc="Bay vật cản tới tâm điểm kính cố định gần nhất; tốc độ điều chỉnh trong tab 👥 Người Chơi."},
    {icon="⏹", name="Dừng bay tới kính", cat="Di chuyển", ord=12.97, action="stopglassfly",
     desc="Dừng ngay lực bay tới tấm kính và khôi phục trạng thái nhân vật trước bay."},
    {icon="🧱", name="Xuyên Tường", cat="Di chuyển", ord=13, action="noclip",
     desc="Đi xuyên mọi vật cản. Tắt đi trả lại ĐÚNG CanCollide gốc của từng phần (không phân cứng như bản cũ)."},
    {icon="🦘", name="Nhảy Vô Hạnh", cat="Di chuyển", ord=14, action="infjump",
     desc="Nhảy mãi không đất. Tự thử 3 cách nhảy (ChangeState · lệnh Jump · Đẩy vận tốc) nên cả game cấm nhảy, để JumpPower=0 hay ăn mất phím Space vẫn nhảy được."},
    {icon="🦘", name="Nhảy Cao", cat="Di chuyển", ord=14.2, action="highjump",
     desc="Công tắc độc lập kiểu 👤 Né người (🛡): BẬT/TẮT +chỉnh tốc độ nhảy. Space là nhảy cao, rơi theo trọng lực game. Không thường xuyên, không nút ảo. Không thay 🦘 Bỏ vô hạn."},
            {icon="🎥", name="Khán giả", cat="Tiện ích", ord=21.5, action="freecam",
     desc="Camera BAY Khắp nơi tương tự 🚀 (WASD · Space/Shift · nhìn chuột). Nhân vật MÌNH đứng yên tại chỗ. Tắt thì trả camera. Không FireServer. Không cướp 🚀💨🦘🛡✨🔐."},
    {icon="✨", name="Phát Sáng", cat="Tiện ích", ord=22, action="glow",
     desc="CHÍNH Bạn phát sáng: trinh sáng cả nhân vật + đèn toả sáng thật xung quanh người. Chỉnh CHIỀU RỘNG + ĐỘ SÁNG + MÀU ở khung ✨ ngay đầu danh sách. 👁 xuyên (sáng xuyên vật cản) · 💡 đèn không bị cản trở · bị xóa hay hồi sinh thì tự gắn lại."},
    {icon="🛡", name="Bay An Toàn", cat="Di chuyển", ord=23, action="safefly",
     desc="Bật là TỰ BAY + TỰ NÉ NGƯỜI CHƠI và mọi vật có dấu hiệu chuyển động (được cả vật bị script/tween kéo đi) trong bán kính bạn chỉnh: càng gần thúc mạnh, quá gần thì đuổi lên trên. 🔲 Có BỨC TƯỜNG TRỌNG HÌNH VUÔNG bao quanh cho thấy vùng né · 🧱 tự bật Xuyên Tường để cung cấp cho bạn QUA cản. 💨 tốc độ · 📏 khoảng cách né · 🌀 né tránh ở khung 🛡 ngay đầu danh sách."},
    {icon="📍", name="Định Vị Người Chơi", cat="Định Vị", ord=17, action="loc_all",
     desc="Xuyên tường thấy TẤT CẢ người chơi. Bấm lại để TẮT. Chọn từng người / khoảng cách: tab 👥 Chơi Người."},
    {icon="🌳", name="Định Vị Vật Theo Tên", cat="Định vị", ord=18.5, action="objfind",
     desc="Nhập tên vật thể (VD: cây) để định vị MỌI vật thể phù hợp trong máy chủ, bám theo vật thể khi nó di chuyển. Bấm để mở ô nhập ở tab 👥 Người chơi."},
    {icon="🚀", name="Bay Tới Vật Đang Định Vị", cat="Định vị", ord=18.6, action="objfly",
     desc="Bay xuyên vật cản tới vật gần nhất trong danh sách 🌳 đang định vị; vật di chuyển thì bay theo, vật biến mất thì tự dừng."},
    {icon="🧹", name="Tắt Định Vị Vật", cat="Định vị", ord=18.7, action="objclear",
     desc="Xoá toàn bộ bộ định vị theo tên (không ảnh hưởng 📍 định vị người chơi và 👣 xem người chơi)."},
    {icon="👣", name="Xem Người Chơi", cat="Định vị", ord=19, action="spec_on",
     desc="Bám camera theo người gần nhất. Bấm lại để TRẢ CAMERA. Danh sách người chọn: tab 👥."},
}
S.hubFavs = S.hubFavs hoặc {}
S.hubCat = "Tất cả"
S.hubSearch = ""

hàm S.RunHubAction(id)
    nếu id == "crosshair" thì
        local okC = pcall(function() S.ToggleCrosshair() end)
        nếu không okC thì return "⚠️ chưa bật được niêm tâm" end
        S.Rebuild() -- cập nhật nút nhãn
        return "🎯 Niêm tâm: " .. (S.crosshairOn và "BẬT (giữa màn hình game)" hoặc "TẮT")
    nếu id == "unpark" thì
        cục bộ n = 0
        pcall(function() n = n + (S.RemoveAllParked() or 0) end)
        for _, ft in ipairs(featureTabs) do
            máy chủ cục bộ = ft.frame và ft.frame:FindFirstChild("ScriptHost")
            nếu máy chủ thì pcall(function() n = n + S.ClearEmbedsUnder(host) end) end
        kết thúc
        pcall(S.PruneEmbeds)
        pcall(function() if S.SyncEmbedToggles then S.SyncEmbedToggles() end end)
        return "🧩 đã trả " .. n .. " GUI về màn hình game (GUI gốc giữ nguyên, không Destroy)"
    nếu id == "fixmouse" thì
        nếu kiểu (S.DoFixMouse) == "function" thì
            thông báo cục bộ = nil
            pcall(function() msg ​​= S.DoFixMouse() end)
            return "🖱 " .. tostring(tin nhắn hoặc "đã trả đầu vào cho trò chơi")
        kết thúc
        pcall(ReleaseHubFocus)
        pcall(function() UserInputService.MouseBehavior = Enum.MouseBehavior.Default end)
        return "🖱 đã free focus + đặt lại chuột"
    nếu id == "reload" thì
        nếu kiểu(S.DoReload) == "function" thì
            task.spawn(function() pcall(S.DoReload) end)
            return "🔄 đang tải lại hub từ đĩa..."
        kết thúc
        return "⚠️ hub chưa sẵn sàng để tải lại"
    nếu id == "prune" thì
        pcall(S.PruneEmbeds)
        return "🧹 đã thu dọn các hosting chứa rác"
    nếu id == "resetserver" thì
        tin nhắn cục bộ = "⚠️ chưa được thiết lập lại"
        local okRs = pcall(function() msg ​​= S.ResetServer() end)
        if not okRs then return "⚠️ Reset server thất bại: " .. tostring(msg) end
        trả về chuỗi(msg)
    nếu id == "hopserver" thì
        tin nhắn cục bộ = "⚠️ chưa được nhảy"
        local okHp = pcall(function() msg ​​= S.HopServer() end)
        nếu không phải okHp thì
            return "⚠️ Máy chủ Hop bị lỗi: " .. tostring(msg)
                .. " — vẫn được sử dụng ô 🎟 máy chủ mã hóa dán bên dưới để vào thủ công"
        kết thúc
        trả về chuỗi(msg)
    nếu id == "hoplow" thì
        tin nhắn cục bộ = "⚠️ chưa được nhảy"
        local okHp = pcall(function() msg ​​= S.HopLowServer() end)
        nếu không phải okHp thì
            return "⚠️ Hop ít người thất bại: " .. tostring(msg)
                .. " — thử lại hoặc dùng ô 🎟 dán mã thủ công"
        kết thúc
        trả về chuỗi(msg)
    nếu id == "hopempty" thì
        tin nhắn cục bộ = "⚠️ chưa được nhảy"
        local okHp = pcall(function() msg ​​= S.HopEmptyServer() end)
        nếu không phải okHp thì
            return "⚠️ Hop siêu thất bại: " .. tostring(msg)
                .. " — thử lại hoặc dùng ô 🎟"
        kết thúc
        trả về chuỗi(msg)
    nếu id == "antiban" thì
        người địa phương bị truy nã = không phải S.AntiBan.on
        local okAb = pcall(function() S.AntiBanSet(wanted) end)
        nếu không okAb thì return "⚠️ chưa được kích hoạt Anti Ban" end
        S.Rebuild()
        trả về S.AntiBanStatus()
    nếu id == "getjobid" thì
        local jid = S.GetJobId()
        nếu không jid thì return "⚠️ Không thể đọc được máy chủ mã hóa (đang ở Studio / máy chủ đơn)" end
        local okCp = S.CopyToClipboard(jid)
        pcall(function() if D.hubJobIn then D.hubJobIn.Text = jid end end)
        pcall(function() if S.SyncServerPanel then S.SyncServerPanel() end end)
        return (okCp và "🌐 Đã sao chép máy chủ mã hóa: " hoặc "🌐 Máy chủ Mã (người thực thi không cho sao chép, sao chép tay):") .. jid

    --------- v4.12: BỘ DI CHUYỂN ----------
    nếu id == "fly" thì
        local wanted = not S.Move.fly
        local okF, on, err = pcall(S.Move.SetFly, wanted)
        if not okF then return "⚠️ lỗi bay: " .. tostring(on) end
        nếu muốn và không bật thì trả về "⚠️ " .. tostring(err) end
        S.Rebuild()
        return S.Move.fly và ("🚀 Bay theo camera: BẬT — WASD/cần điều khiển · thả phím đứng lơ · tốc độ " .. tostring(S.Move.flySpeed))
                            hoặc "🚀 Bay: TẮT — Thường xuyên giữ nguyên theo công tắc 🧱"
    nếu id == "camspeed" thì
        local wanted = not S.Move.sprint
        local okS, on, err = pcall(S.Move.SetSprint, wanted)
        if not okS then return "⚠️ lỗi tốc độ: " .. tostring(on) end
        nếu muốn và không bật thì trả về "⚠️ " .. tostring(err) end
        S.Rebuild()
        return S.Move.sprint và ("💨 Tốc độ theo camera: BẬT — WASD/joystick mặt đất · nhảy bình thường · rơi theo game · tốc độ " .. tostring(S.Move.sprintSpeed))
                               hoặc "💨 Tốc độ theo camera: TẮT — năng lượng/nhảy trả về trò chơi"
    nếu id == "noclip" thì
        nếu không phải S.Move.noclip cũng không phải S.Move.Root() thì return "⚠️ chưa có nhân vật (đợi vào game xong hãy nhấn)" end
        pcall(function() S.Move.SetNoclip(not S.Move.noclip) end)
        S.Rebuild()
        return S.Move.noclip và "🧱 Xuyên tường: BẬT (đi xuyên mọi vật cản)"
                              hoặc "🧱 Xuyên tường thuật: TẮT (CanCollide đã trả lại giá trị gốc)"
    elseif id == "infjump" then
        pcall(function() S.Move.SetInfJump(not S.Move.infJump) end)
        S.Rebuild()
        return S.Move.infJump và "🦘 Bỏ vô hạn: BẬT (Space/🐸 A — nhảy được cả game cấm nhảy/không Bốc JumpRequest)"
                               hoặc "🦘 Skip vô hạn: TẮT (JumpPower/JumpHeight đã trả lại trò chơi)"
    nếu id == "highjump" thì
        local wanted = not S.Move.highJump
        local okH, on = pcall(S.Move.SetHighJump, wanted)
        if not okH then return "⚠️ lỗi nhảy cao: " .. tostring(on) end
        S.Rebuild()
        return S.Move.highJump và ("🦘 Skip cao: BẬT — tốc độ " .. tostring(S.Move.highJumpSpeed) .. " · Space nhảy cao · rơi theo game")
                                hoặc "🦘 Skip cao: TẮT — JumpPower trả về trò chơi"
    nếu id == "speed" thì
        pcall(function() S.Move.SetSpeed(not S.Move.speed) end)
        S.Rebuild()
        trả về S.Move.speed và ("👟 Chạy tốc độ: BẬT — " .. (S.Move.speedMode == "x"
                                     và ("theo game ×" .. tostring(S.Move.speedMul)
                                          .. " = " .. tostring(S.Move.WantSpeed()))
                                     hoặc ("cố định " .. tostring(S.Move.walkSpeed)))
                                 .. " · JumpPower " .. tostring(S.Move.jumpPower))
                            hoặc ("👟 Chạy tốc độ: TẮT — về tốc độ trò chơi (" .. tostring(S.Move._baseWS) .. ")")
    nếu id == "carpet" thì
        local wanted = not S.Move.carpet
        local okC, on, errC = pcall(S.Move.SetCarpet, wanted)
        if not okC then return "⚠️ lỗi thảm kính: " .. tostring(on) end
        nếu muốn và không bật thì trả về "⚠️" .. tostring(errC) end
        S.Rebuild()
        return S.Move.carpet và "🪩 thân kính bám chân: BẬT — thảm di chuyển cùng bạn"
                              hoặc "🪩 thân kính bám chân: TẮT"
    nếu id == "placeglass" thì
        local okP, part, rec = S.Move.PlaceGlass()
        if not okP then return "⚠️ " .. tostring(part) end
        pcall(function() if S.GlassRefreshList then S.GlassRefreshList() end end)
        S.Rebuild()
        return "🧱 Đặt tấm kính cố định #" .. tostring(rec và rec.id hoặc "?")
            .. " · tổng " .. tostring(#(S.Move.GetPlacedGlasses() or {})) .. " tấm"
    nếu id == "clearglass" thì
        local n = S.Move.ClearPlacedGlasses()
        pcall(function() if S.GlassRefreshList then S.GlassRefreshList() end end)
        S.Rebuild()
        return "🧹 Đã xóa toàn bộ " .. tostring(n) .. " tấm kính cố định"
    nếu id == "autoglass" thì
        local on = S.Move.SetAutoGlass(not S.Move.autoGlass)
        pcall(function() if S.GlassRefreshList then S.GlassRefreshList() end end)
        S.Rebuild()
        return on và "🔄 Tự đặt kính: BẬT — đi tới địa điểm cố định tấm cố định ở đó"
                   hoặc "🔄 Tự động đặt kính: TẮT"
    nếu id == "openglasspanel" thì
        local okOpen = false
        pcall(function() okOpen = S.OpenGlassPanel and S.OpenGlassPanel() or S.OpenPlayerTab() end)
        return okOpen và "📋 Đã mở 👥 Người Chơi → danh sách kính kính"
                      hoặc "⚠️ chưa mở được kính mắt bảng"
    nếu id == "flyglass" thì
        local idx = S.Move.NearestGlassIndex and S.Move.NearestGlassIndex()
        nếu không phải idx thì return "⚠️ chưa có tấm kính cố định để bay tới" end
        local okF, rec = S.Move.FlyToGlass(idx)
        if not okF then return "⚠️ " .. tostring(rec) end
        return "🚀 đang bay tới tấm kính #" .. tostring(rec và rec.id hoặc idx)
            .. " · tốc độ " .. tostring(S.Move.glassFlySpeed) .. " — sẽ dừng khi tới nơi"
    nếu id == "stopglassfly" thì
        S.Move.StopGlassFly()
        return "⏹ đã dừng bay tới kính"
    nếu id == "flyplayer" thì
        nếu không phải S.Move.Root() thì return "⚠️ chưa có nhân vật để bay (đợi vào game xong hãy nhấn)" end
        mục tiêu cục bộ = nil
        if S.Loc and S.Loc.Nearest then target = S.Loc.Nearest() end
        nếu không đạt mục tiêu thì return "⚠️ không có người chơi nào để bay tới" end
        local ok, res = S.Move.FlyToPlayer(target)
        if S.Loc and S.Loc.RefreshList then pcall(S.Loc.RefreshList) end
        if S.SyncLocPanel then pcall(S.SyncLocPanel) end
        S.Rebuild()
        return ok and string.format("🚀 đang bay tới người %s tốc độ %g (0=tự động lấy tốc độ trò chơi) — ⏹ Dừng bay tới người để dừng, theo dõi mục tiêu chuyển hướng, dừng khi <2 đinh tán", tostring(target.Name), S.Move.GetPlayerFlySpeed ​​và S.Move.GetPlayerFlySpeed() hoặc S.Move.playerFlySpeed ​​hoặc 0)
                    hoặc ("⚠️ " .. tostring(res))
    nếu id == "stopflyplayer" thì
        S.Move.StopPlayerFly()
        if S.Loc and S.Loc.RefreshList then pcall(S.Loc.RefreshList) end
        if S.SyncLocPanel then pcall(S.SyncLocPanel) end
        S.Rebuild()
        return "⏹ đã dừng bay tới người chơi"
    nếu id == "runmode" thì
        return "⚠️ Tính năng chạy trên thảm đã bị xóa"
    nếu id == "loc_all" thì
        pcall(function() S.Loc.Set(not S.Loc.on) end)
        S.Rebuild()
        return (S.Loc.on và "📍 ĐỊNH VỊ: BẬT — " hoặc "📍 Định VỊ: TẮT —") .. S.Loc.Status()
    nếu id == "loc_solo" thì
        nếu S.Loc.solo thì
            pcall(function() S.Loc.SetSolo(false) end)
        khác
            pcall(function() S.Loc.SetTarget(S.Loc.target or S.Loc.Nearest()) end)
        kết thúc
        S.Rebuild()
        return (S.Loc.solo và "🎯 Định VỊ LẺ: " .. tostring(S.Loc.target và S.Loc.target.Name hay "?")
                .. " — chỉ ra người này (bấm tên khác trong khung 📍 để đổi)")
               hoặc "🎯 ĐỊNH VỊ LẺ: TẮT (trở lại bình thường)"
    --------- v4.17: 🛡 BAY AN TOÀN ----------
    nếu id == "safefly" thì
        nếu không phải S.Move.Root() thì return "⚠️ chưa có nhân vật để bay (đợi vào game xong hãy nhấn)" end
        nếu không phải S.Move.Safe.on thì
            local okf = S.Move.SetFly(true)
            nếu okf == false thì return "⚠️ không bật được" end
        kết thúc
        pcall(function() S.Move.Safe.Set(not S.Move.Safe.on) end)
        pcall(function() if S.SyncSafePanel then S.SyncSafePanel() end end)
        S.Rebuild()
        return S.Move.Safe.Status()
    nếu id == "safefly_off" thì
        pcall(function() S.Move.Safe.Stop() end)
        pcall(function() if S.SyncSafePanel then S.SyncSafePanel() end end)
        S.Rebuild()
        trả về "🚫 " .. S.Move.Safe.Status()

    --------- v4.16: ✨ PHÁT SÁNG ----------
    nếu id == "glow" thì
        pcall(function() S.Glow.Set(not S.Glow.on) end)
        pcall(function() if S.SyncGlowPanel then S.SyncGlowPanel() end end)
        S.Rebuild()
        trả về S.Glow.Status()
    nếu id == "glow_off" thì
        pcall(function() S.Glow.Stop() end)
        pcall(function() if S.SyncGlowPanel then S.SyncGlowPanel() end end)
        S.Rebuild()
        trả về "🚫 " .. S.Glow.Status()

    --------- v4.64: 🎥 KHÁN GIẢ ----------
    nếu id == "freecam" thì
        pcall(function() S.Free.Set(not S.Free.on) end)
        pcall(function() if S.SyncFreePanel then S.SyncFreePanel() end end)
        S.Rebuild()
        trả về S.Free.Status()
    nếu id == "freecam_off" thì
        pcall(function() S.Free.Stop() end)
        pcall(function() if S.SyncFreePanel then S.SyncFreePanel() end end)
        S.Rebuild()
        trả về "🚫 " .. S.Free.Status()

    --------- v4.14: 👣 XEM NGƯỜI CHƠI ----------
    nếu id == "spec_on" thì
        nếu S.Spec và S.Spec.on thì
            pcall(function() S.Spec.Stop() end)
            pcall(function() if S.Spec.RefreshList then S.Spec.RefreshList() end end)
            S.Rebuild()
            trả về "🚫 " .. (S.Spec.Status và S.Spec.Status() hoặc "đã nhảy xem")
        kết thúc
        local p = S.Spec.target or S.Loc.target or S.Loc.Nearest()
        nếu không p thì return "⚠️ chưa có ai để xem (server chỉ có mình bạn)" end
        pcall(function() S.Loc.SetTarget(p) end)
        pcall(function() S.Spec.Set(p) end)
        pcall(function() if S.Spec.RefreshList then S.Spec.RefreshList() end end)
        S.Rebuild()
        return "👣 " .. S.Spec.Status() .. " (bấm lại thẻ để dừng · chọn người ở tab 👥)"
    nếu id == "spec_off" thì
        pcall(function() S.Spec.Stop() end)
        pcall(function() if S.Spec.RefreshList then S.Spec.RefreshList() end end)
        S.Rebuild()
        trả về "🚫 " .. S.Spec.Status()
    nếu id == "loc_stop" thì
        pcall(function() S.Loc.StopAll() end)
        S.Rebuild()
        return "🚫 đã tắt hết định vị: " .. S.Loc.Status()
    nếu id == "movestop" thì
        pcall(function() S.Move.StopAll() end)
        S.Rebuild()
        return "🛑 đã tắt hết: " .. S.Move.Status()
    --------- v5.1: 🌳 ĐỊNH VỊ VẬT THEO NAME ----------
    nếu id == "objfind" thì
        pcall(function() if S.ObjTrack.Focus then S.ObjTrack.Focus() end end)
        S.Rebuild()
        return "🌳 định vị vật: nhập tên vào ô 🔎 (VD: cây) · " .. S.ObjTrack.Status()
    nếu id == "objfly" thì
        mục tiêu cục bộ = select(1, S.ObjTrack.Nearest())
        nếu không nhắm mục tiêu thì trả về "⚠️ chưa có vật thể nào được định vị — mở 🌳 ở tab 👥 Người chơi và nhập tên vật phẩm" end
        local okFly, resFly = S.Move.FlyToObject(target)
        S.Rebuild()
        if not okFly then return "⚠️ " .. tostring(resFly) end
        return "🚀 đang bay tới '" .. tostring(target.Name) .. "' (vật đi đâu bay theo đó · press ⏹ Dừng bay để dừng)"
    nếu id == "objclear" thì
        cục bộ n = 0
        for _ in pairs(S.ObjTrack.items) do n = n + 1 end
        pcall(function() S.ObjTrack.Set(false) end)
        S.Rebuild()
        return "🧹 đã xóa " .. tostring(n) .. " định vị trí theo tên"
    kết thúc
    return "⚠️ không rõ thao tác: " .. tostring(id)
kết thúc

hàm D.CardBtn(parent, text, posX, w, color)
    cục bộ b = New("TextButton", {
        Kích thước = UDim2.new(0, w, 0, 24), Vị trí = UDim2.new(1, posX, 0, 16),
        Văn bản = văn bản, Màu nền 3 = màu hoặc C.SURFACE3, Độ trong suốt nền = 0.08,
        TextColor3 = D.BestText(color or C.SURFACE3), Font = Enum.Font.GothamBold, TextSize = 9,
        BorderSizePixel = 0, ZIndex = 8,
    }, cha)
    Góc(b, UDim.new(0, 7))
    Stroke(b, D.Edge(color or C.SURFACE3), 1.1)
    D.Shade(b, Color3.fromRGB(255,255,255), Color3.fromRGB(182,187,201), 90) -- v4.9: vát sâu hơn
    D.Cảm giác xúc giác (b, 0,08)
    trả lại b
kết thúc

D.hubTab = AddTab("Script Hub", "📚", 3)

D.hubSearchBox = New("TextBox", {
    Kích thước = UDim2.new(1, -16, 0, 26), Vị trí = UDim2.new(0, 8, 0, 8),
    PlaceholderText = "🔍 Tìm script hoặc tiện ích...", Text = "", ClearTextOnFocus = false,
    BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.08, TextColor3 = C.DARK,
    PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 10,
    TextXAlignment = Enum.TextXAlignment.Left, BorderSizePixel = 0, ZIndex = 6,
}, D.hubTab)
Corner(D.hubSearchBox, UDim.new(0, 10))
Stroke(D.hubSearchBox, C.BORDER, 1)
New("UIPadding", {PaddingLeft = UDim.new(0, 9)}, D.hubSearchBox)

D.hubChips = New("Frame", {
    Kích thước = UDim2.new(1, -16, 0, 22), Vị trí = UDim2.new(0, 8, 0, 38),
    BackgroundTransparency = 1, BorderSizePixel = 0, ZIndex = 6,
}, D.hubTab)
Mới("UIListLayout", {
    FillDirection = Enum.FillDirection.Horizontal, Padding = UDim.new(0, 5),
    SortOrder = Enum.SortOrder.LayoutOrder, VerticalAlignment = Enum.VerticalAlignment.Center,
}, D.hubChips)

D.hubList = New("ScrollingFrame", {
    Kích thước = UDim2.new(1, -16, 1, -146), Vị trí = UDim2.new(0, 8, 0, 64), -- v4.6.3: thêm 54px cho khung 🌐 Server
    BackgroundTransparency = 1, BorderSizePixel = 0, CanvasSize = UDim2.new(0, 0, 0, 0),
    ScrollBarThickness = 3, ClipsDescendants = true, ZIndex = 6,
    Kích thước Canvas Tự động = Enum.Kích thước Tự động.Y,
}, D.hubTab)
New("UIListLayout", {Padding = UDim.new(0, 6), SortOrder = Enum.SortOrder.LayoutOrder}, D.hubList)

D.hubStatus = New("TextLabel", {
    Kích thước = UDim2.new(1, -16, 0, 22), Vị trí = UDim2.new(0, 8, 1, -24),
    Text = "📚 Nhấn vào để chạy tập lệnh, ⚡ để thực hiện tiện ích · ⭐ để ghi lên đầu",
    BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 9,
    TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left,
    TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 6,
}, D.hubTab)

--------- v4.6.3: KHUNG 🌐 MÁY CHỦ nằm ngay dưới danh sách thẻ ----------
D.hubSrvPanel = New("Frame", {
    Tên = "HubServerPanel", Kích thước = UDim2.new(1, -16, 0, 80), Vị trí = UDim2.new(0, 8, 1, -80),
    BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.25, BorderSizePixel = 0, ZIndex = 6,
}, D.hubTab)
Corner(D.hubSrvPanel, UDim.new(0, 10))
Stroke(D.hubSrvPanel, C.BORDER, 1)

D.hubJobLbl = New("TextLabel", {
    Kích thước = UDim2.new(1, -44, 0, 14), Vị trí = UDim2.new(0, 8, 0, 5),
    Text = "🌐 Máy chủ Mã: đang đọc...", BackgroundTransparency = 1, TextColor3 = C.MUTED,
    Phông chữ = Enum.Font.GothamMedium, Kích thước chữ = 9,
    TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
}, D.hubSrvPanel)

D.hubJobCopy = New("TextButton", {
    Kích thước = UDim2.new(0, 26, 0, 16), Vị trí = UDim2.new(1, -32, 0, 4), Văn bản = "📋",
    BackgroundColor3 = C.BLUE, BackgroundTransparency = 0.1, TextColor3 = C.INK,
    Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, AutoButtonColor = false, ZIndex = 7,
}, D.hubSrvPanel)
Corner(D.hubJobCopy, UDim.new(0, 6))
D.Tactile(D.hubJobCopy, 0.1)

D.hubJobIn = New("TextBox", {
    Kích thước = UDim2.new(1, -124, 0, 24), Vị trí = UDim2.new(0, 8, 0, 24),
    PlaceholderText = "🎟 Dán máy chủ mã hóa (JobId) vào đây...", Text = "", ClearTextOnFocus = false,
    BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
    PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
    TextXAlignment = Enum.TextXAlignment.Left, BorderSizePixel = 0, ZIndex = 7,
}, D.hubSrvPanel)
Corner(D.hubJobIn, UDim.new(0, 8))
Stroke(D.hubJobIn, C.BORDER, 1)
New("UIPadding", {PaddingLeft = UDim.new(0, 7)}, D.hubJobIn)

D.hubJoinBtn = D.CardBtn(D.hubSrvPanel, "🚀 Vào", -110, 52, C.GREEN)
D.hubJoinBtn.Position = UDim2.new(1, -110, 0, 24)
D.hubHopBtn = D.CardBtn(D.hubSrvPanel, "🔀 Hop", -54, 50, C.PURPLE)
D.hubHopBtn.Position = UDim2.new(1, -54, 0, 24)

-- nhảy ít người
D.hubLowBtn = D.CardBtn(D.hubSrvPanel, "👥 Ít", -110, 40, C.BLUE)
D.hubLowBtn.Position = UDim2.new(1, -110, 0, 52)
D.hubEmptyBtn = D.CardBtn(D.hubSrvPanel, "🌙 Vắng", -62, 44, C.ORANGE)
D.hubEmptyBtn.Position = UDim2.new(1, -62, 0, 52)


hàm S.SyncServerPanel()
    pcall(function()
        nếu không phải D.hubJobLbl thì trả về end
        local jid = S.GetJobId()
        nếu jid thì
            D.hubJobLbl.Text = "🌐 Mã máy chủ: " .. jid
            D.hubJobLbl.TextColor3 = C.DARK
        khác
            D.hubJobLbl.Text = "🌐 Không thể đọc máy chủ mã hóa (Studio/server đơn) — 🔄 Reset vẫn được sử dụng"
            D.hubJobLbl.TextColor3 = C.MUTED
        kết thúc
    kết thúc)
kết thúc

D.hubJobCopy.Activated:Connect(function()
    local jid = S.GetJobId()
    nếu không phải jid thì
        D.Say("⚠️ Không có máy chủ mã hóa để sao chép (đang ở đơn vị Studio / máy chủ)")
        trở lại
    kết thúc
    local okCp = S.CopyToClipboard(jid)
    pcall(function() D.hubJobIn.Text = jid end)
    D.Say(okCp and ("📋 Đã sao chép máy chủ mã hóa: " .. jid)
              hoặc ("⚠️ Executor không cho copy — máy chủ mã hóa là: " .. jid), okCp và C.GREEN hoặc C.YELLOW)
kết thúc)

D.hubJoinBtn.Activated:Connect(function()
    ID cục bộ = tostring(D.hubJobIn.Text hoặc "")
    id = id:gsub("^%s+", ""):gsub("%s+$", "")
    id = id:gsub('^"', ""):gsub('"$', ""):gsub("^'", ""):gsub("'$", "")
    nếu id == "" thì
        D.Say("⚠️ Please DÁN mã hóa máy chủ (JobId) vào ô 🎟 trước khi nhấn 🚀 Vào")
        ReleaseHubFocus()
        trở lại
    kết thúc
    D.Say("🚀 Đang vào máy chủ " .. id .. " ...", C.YELLOW)
    ReleaseHubFocus() -- free focus ô nhập, không thì game chặn input sau khi teleport
    local okJ, errJ = pcall(function() S.JoinServer(id) end)
    nếu không okJ thì
        D.Say("⚠️ Không thể vào máy chủ này (mã sai/hết sức/game block): " .. tostring(errJ))
    kết thúc
kết thúc)

D.hubHopBtn.Activated:Connect(function()
    ReleaseHubFocus()
    D.Say("🔀 Đang đi lấy máy chủ mã hóa...", C.YELLOW)
    D.hubStatus.Text = S.RunHubAction("hopserver")
kết thúc)

D.hubLowBtn.Activated:Connect(function()
    ReleaseHubFocus()
    D.Say("👥Đang quét 800 server tìm server ÍT NGƯỜI nhất...", C.YELLOW)
    D.hubStatus.Text = S.RunHubAction("hoplow")
kết thúc)

D.hubEmptyBtn.Activated:Connect(function()
    ReleaseHubFocus()
    D.Say("🌙 Đang tìm máy chủ SIÊU VẮNG ≤3 người...", C.YELLOW)
    D.hubStatus.Text = S.RunHubAction("hopempty")
kết thúc)


hàm S.Rebuild()
    pcall(function() if S.RebuildHubList then S.RebuildHubList() end end)
kết thúc

S.HubPanelCat = {
    HubTune_Panel = "Chuyển",
    HubFly_Panel = "Di chuyển",
    HubSpeed_Panel = "Chuyển",
    HubHighJump_Panel = "Di chuyển",
    HubMove_Panel = "Chuyển",
    HubSafe_Panel = "Chuyển",
    HubGlow_Panel = "Tiện ích",
    HubFree_Panel = "Tiện ích",
    HubAntiBan_Panel = "Server",
}
hàm S.SyncHubPanels()
    danh sách cục bộ = D.hubList
    nếu không phải danh sách hoặc không phải danh sách cha thì trả về kết thúc
    local cat = S.hubCat hoặc "Tất cả"
    for _, c in ipairs(list:GetChildren()) do
        local want = S.HubPanelCat[c.Name]
        if want then
            c.Visible = (cat == "Tất cả") or (cat == want)
        end
    end
end

function S.RebuildHubList()
    local list = D.hubList
    if not list or not list.Parent then return end
    local stale = {}
    for _, c in ipairs(list:GetChildren()) do
        if c:IsA("Frame") and c.Name:sub(1, 8) == "HubCard_" then stale[#stale + 1] = c end
    end
    for _, c in ipairs(stale) do pcall(function() c:Destroy() end) end

    local q = tostring(S.hubSearch or ""):lower()
    local cat = S.hubCat or "Tất cả"
    local items = {}
    for _, it in ipairs(S.ScriptHubList) do
        local okCat = (cat == "Tất cả") or (it.cat == cat)
        local okQ = (q == "")
            or tostring(it.name):lower():find(q, 1, true) ~= nil
            or tostring(it.desc or ""):lower():find(q, 1, true) ~= nil
            or tostring(it.cat or ""):lower():find(q, 1, true) ~= nil
        if okCat and okQ then items[#items + 1] = it end
    end
    table.sort(items, function(a, b)
        local fa = S.hubFavs[a.name] and 1 or 0
        local fb = S.hubFavs[b.name] and 1 or 0
        if fa ~= fb then return fa > fb end
        return (a.ord or 99) < (b.ord or 99)
    end)

    for i, it in ipairs(items) do
        local card = New("Frame", {
            Name = "HubCard_" .. tostring(it.name), Size = UDim2.new(1, 0, 0, 56), LayoutOrder = i + 1,
            BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
        }, list)
        Corner(card, UDim.new(0, 10))
        Stroke(card, S.hubFavs[it.name] and C.ACCENT or C.HAIRLINE, 1)   -- v4.9: viền tách khối rõ hơn
        D.Shade(card, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)   -- v4.9: thẻ có khối

        local ico = New("TextLabel", {
            Size = UDim2.new(0, 34, 0, 34), Position = UDim2.new(0, 8, 0, 11), Text = it.icon,
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.15, TextColor3 = C.ACCENT,
            Font = Enum.Font.GothamBold, TextSize = 16, BorderSizePixel = 0, ZIndex = 7,
        }, card)
        Corner(ico, UDim.new(0, 9))
        D.Shade(ico, Color3.fromRGB(255,255,255), Color3.fromRGB(176,181,196), 90)
        Stroke(ico, C.HAIRLINE, 1)

        New("TextLabel", {
            Size = UDim2.new(1, -214, 0, 14), Position = UDim2.new(0, 50, 0, 8),
            Text = tostring(it.name) .. (S.hubFavs[it.name] and "  ⭐" or ""),
            BackgroundTransparency = 1, TextColor3 = C.DARK, Font = Enum.Font.GothamBold, TextSize = 11,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, card)
        New("TextLabel", {
            Size = UDim2.new(1, -214, 0, 10), Position = UDim2.new(0, 50, 0, 22),
            Text = string.upper(tostring(it.cat or "")), BackgroundTransparency = 1,
            TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 8,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, card)
        New("TextLabel", {
            Size = UDim2.new(1, -214, 0, 20), Position = UDim2.new(0, 50, 0, 33),
            Text = tostring(it.desc or ""), BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9, TextWrapped = true,
            TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
        }, card)

        local isAction = (it.action ~= nil)
        local runText
        if isAction then
            if it.action == "crosshair" then
                runText = (S.crosshairOn and "🎯 TẮT") or "🎯 BẬT"
            elseif S.MoveActionState and S.MoveActionState[it.action] then
                local on = false
                pcall(function() on = S.MoveActionState[it.action]() end)
                runText = tostring(it.icon) .. " " .. ((on and "TẮT") or "BẬT")
            else
                runText = "⚡ Chạy"
            end
        else
            runText = "▶ Chạy"
        end
        local runBtn = D.CardBtn(card, runText, -166, 78, isAction and C.SURFACE3 or C.GREEN)
        runBtn.Activated:Connect(function()
            ReleaseHubFocus()
            if it.code then
                local okR = RunCode(it.code, it.name, nil, 1, 0, it.noPark == true)
                D.Say((okR and "▶ đã chạy '" or "⚠️ không chạy được '") .. it.name .. "'"
                    .. (it.noPark and " · 🪟 GUI của nó ở NGOÀI màn hình game (đúng như tab 🛠)" or "")
                    .. " · xem chi tiết ở tab 💻 Code", C.YELLOW)
            else
                D.Say(S.RunHubAction(it.action), C.YELLOW)
            end
        end)

        if it.code then
            local copyBtn = D.CardBtn(card, "📋", -84, 24, C.BLUE)
            copyBtn.Activated:Connect(function()
                local did = S.CopyToClipboard(it.code)
                D.Say(did and ("📋 đã copy loadstring của '" .. it.name .. "'")
                           or "⚠️ executor này không hỗ trợ clipboard", did and C.GREEN or C.RED)
            end)
            local saveBtn = D.CardBtn(card, "💾", -56, 24, C.PURPLE)
            saveBtn.Activated:Connect(function()
                local nm = it.name
                local cnt = 1
                while true do
                    local ex = false
                    for _, s in ipairs(scripts) do if s.name == nm then ex = true break end end
                    if not ex then break end
                    cnt += 1
                    nm = it.name .. " (" .. cnt .. ")"
                end
                table.insert(scripts, {name = nm, code = it.code, expanded = false})
                pcall(function() if RebuildScripts then RebuildScripts() end end)
                pcall(function() Store.saveSoon() end)
                D.Say("💾 đã lưu '" .. nm .. "' sang tab 💾 Code Đã Lưu", C.GREEN)
            end)
        end

        local favBtn = D.CardBtn(card, S.hubFavs[it.name] and "⭐" or "☆", -28, 24,
            S.hubFavs[it.name] and C.YELLOW or C.SURFACE3)
        favBtn.Activated:Connect(function()
            if S.hubFavs[it.name] then S.hubFavs[it.name] = nil else S.hubFavs[it.name] = true end
            pcall(function() Store.saveSoon() end)   -- lưu yêu thích xuống đĩa
            S.RebuildHubList()
            D.Say(S.hubFavs[it.name] and ("⭐ đã ghim '" .. it.name .. "' lên đầu")
                                      or ("☆ đã bỏ ghim '" .. it.name .. "'"), C.MUTED)
        end)
    end

    pcall(function()
        if S.SyncHubPanels then S.SyncHubPanels() end
        local panelH = 0
        for _, c in ipairs(list:GetChildren()) do
            if c:IsA("Frame") and c.Name:sub(1, 8) ~= "HubCard_" and c.Visible ~= false then
                panelH = panelH + ((c.Size and c.Size.Y.Offset) or 0) + 6
            end
        end
        list.CanvasSize = UDim2.new(0, 0, 0, #items * 62 + 6 + panelH)
    end)
    if S.SyncFlyPanel then pcall(S.SyncFlyPanel) end          -- v4.36: Bay + xuyên tường độc lập
    if S.SyncSpeedPanel then pcall(S.SyncSpeedPanel) end      -- v4.37: 💨 tốc độ theo camera
    if S.SyncHighJumpPanel then pcall(S.SyncHighJumpPanel) end -- v4.38: 🦘 nhảy cao
    if S.SyncTunePanel then pcall(S.SyncTunePanel) end         -- v4.40: ⚙ tuỳ chỉnh gom
    if S.RefreshMovePanel then pcall(S.RefreshMovePanel) end   -- v4.12: nhãn trạng thái di chuyển
    if S.SyncGlowPanel then pcall(S.SyncGlowPanel) end         -- v4.16: nhãn khung ✨ phát sáng
    if S.SyncFreePanel then pcall(S.SyncFreePanel) end         -- v4.64: 🎥 khán giả
    if S.SyncSafePanel then pcall(S.SyncSafePanel) end         -- v4.17: nhãn khung 🛡 bay an toàn
    if S.SyncAntiBanPanel then pcall(S.SyncAntiBanPanel) end   -- v4.43: 🔐 anti ban
    if #items == 0 and D.hubStatus then
        D.Say("🔍 không tìm thấy gì khớp '" .. tostring(S.hubSearch or "") .. "'", C.MUTED)
    end
end

-- ---------- v4.40: KHUNG ⚙ TUỲ CHỈNH (Bay · Tốc độ camera · Nhảy cao · Di chuyển) ----------
do
    local P = New("Frame", {
        Name = "HubTune_Panel", Size = UDim2.new(1, 0, 0, 172), LayoutOrder = -4,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10)); Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 4),
        Text = "⚙ TUỲ CHỈNH — 🚀 Bay · 💨 Tốc độ camera · 🦘 Nhảy cao · 👟 Di chuyển",
        BackgroundTransparency = 1, TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local function button(name, text, x, y, w, color)
        local b = New("TextButton", {
            Name = name, Text = text, Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            BackgroundColor3 = color, TextColor3 = D.BestText(color), BorderSizePixel = 0,
            Font = Enum.Font.GothamBold, TextSize = 9, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6)); D.Tactile(b, 0.08)
        return b
    end
    local function box(name, x, y, val)
        local b = New("TextBox", {
            Name = name, Size = UDim2.new(0, 52, 0, 22), Position = UDim2.new(0, x, 0, y),
            Text = tostring(val), ClearTextOnFocus = false, BackgroundColor3 = C.SURFACE2,
            TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        return b
    end
    local function lab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end

    local flyBtn = button("TuneFly", "🚀 Bay: TẮT", 8, 24, 110, C.GRAY)
    local flyBox = box("TuneFlySpeed", 122, 24, MV.flySpeed)
    local flyApply = button("TuneFlyApply", "✔", 178, 24, 32, C.GREEN)
    local flyStop = button("TuneFlyStop", "⏹", 214, 24, 32, C.RED)

    local spdBtn = button("TuneSprint", "💨 Tốc độ: TẮT", 8, 50, 110, C.GRAY)
    local spdBox = box("TuneSprintSpeed", 122, 50, MV.sprintSpeed)
    local spdApply = button("TuneSprintApply", "✔", 178, 50, 32, C.GREEN)
    local spdStop = button("TuneSprintStop", "⏹", 214, 50, 32, C.RED)

    local hjBtn = button("TuneHighJump", "🦘 Nhảy cao: TẮT", 8, 76, 110, C.GRAY)
    local hjBox = box("TuneHighJumpSpeed", 122, 76, MV.highJumpSpeed)
    local hjApply = button("TuneHighJumpApply", "✔", 178, 76, 32, C.GREEN)
    local hjStop = button("TuneHighJumpStop", "⏹", 214, 76, 32, C.RED)

    lab("👟 Chạy", 254, 24, 48)
    local wsBox = box("TuneWalkSpeed", 304, 24, (MV.speedMode == "x") and ("x" .. tostring(MV.speedMul)) or tostring(MV.walkSpeed))
    lab("🦘 Lực nhảy", 254, 50, 70)
    local jpBox = box("TuneJumpPower", 324, 50, MV.jumpPower)
    local mvApply = button("TuneMoveApply", "✔ Di chuyển", 254, 76, 122, C.GREEN)

    local status = New("TextLabel", {
        Name = "TuneStatus", Size = UDim2.new(1, -16, 0, 28), Position = UDim2.new(0, 8, 0, 102),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
        TextSize = 9, TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 32), Position = UDim2.new(0, 8, 0, 134),
        Text = "💡 ✔ = áp tốc độ dòng đó. 👟 gõ x3 = theo game ×3, gõ số = cố định. Bay tới người chơi và Safe Fly ở khung ⚙ bên dưới.",
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 8,
        TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local function paintToggle(b, on, label)
        b.Text = label .. (on and "BẬT" or "TẮT")
        D.SetBg(b, on and C.GREEN or C.GRAY)
    end
    local function focused()
        return UserInputService:GetFocusedTextBox()
    end
    function S.SyncTunePanel()
        if not (P and P.Parent) then return end
        paintToggle(flyBtn, MV.fly, "🚀 Bay: ")
        paintToggle(spdBtn, MV.sprint, "💨 Tốc độ: ")
        paintToggle(hjBtn, MV.highJump, "🦘 Nhảy cao: ")
        local tb = focused()
        if tb ~= flyBox then flyBox.Text = tostring(MV.flySpeed) end
        if tb ~= spdBox then spdBox.Text = tostring(MV.sprintSpeed) end
        if tb ~= hjBox then hjBox.Text = tostring(MV.highJumpSpeed) end
        if tb ~= wsBox then
            wsBox.Text = (MV.speedMode == "x") and ("x" .. tostring(MV.speedMul)) or tostring(MV.walkSpeed)
        end
        if tb ~= jpBox then jpBox.Text = tostring(MV.jumpPower) end
        status.Text = (MV.Status and MV.Status()) or ""
    end

    flyBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("fly"), C.YELLOW) end)
    spdBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("camspeed"), C.YELLOW) end)
    hjBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("highjump"), C.YELLOW) end)
    flyStop.Activated:Connect(function()
        ReleaseHubFocus(); MV.SetFly(false); S.Rebuild()
        D.Say("🚀 Bay: TẮT", C.YELLOW)
    end)
    spdStop.Activated:Connect(function()
        ReleaseHubFocus(); MV.SetSprint(false); S.Rebuild()
        D.Say("💨 Tốc độ theo camera: TẮT", C.YELLOW)
    end)
    hjStop.Activated:Connect(function()
        ReleaseHubFocus(); MV.SetHighJump(false); S.Rebuild()
        D.Say("🦘 Nhảy cao: TẮT", C.YELLOW)
    end)
    local function applyFly()
        ReleaseHubFocus()
        local ok, result = MV.SetFlySpeed(flyBox.Text)
        D.Say(ok and ("💨 Tốc độ bay: " .. tostring(result)) or ("⚠️ " .. tostring(result)), ok and C.GREEN or C.YELLOW)
        S.SyncTunePanel()
    end
    local function applySprint()
        ReleaseHubFocus()
        local ok, result = MV.SetSprintSpeed(spdBox.Text)
        D.Say(ok and ("💨 Tốc độ chạy camera: " .. tostring(result)) or ("⚠️ " .. tostring(result)), ok and C.GREEN or C.YELLOW)
        S.SyncTunePanel()
    end
    local function applyHj()
        ReleaseHubFocus()
        local ok, result = MV.SetHighJumpSpeed(hjBox.Text)
        D.Say(ok and ("💨 Tốc độ nhảy cao: " .. tostring(result)) or ("⚠️ " .. tostring(result)), ok and C.GREEN or C.YELLOW)
        S.SyncTunePanel()
    end
    flyApply.Activated:Connect(applyFly)
    spdApply.Activated:Connect(applySprint)
    hjApply.Activated:Connect(applyHj)
    flyBox.FocusLost:Connect(function(enter) if enter then applyFly() end end)
    spdBox.FocusLost:Connect(function(enter) if enter then applySprint() end end)
    hjBox.FocusLost:Connect(function(enter) if enter then applyHj() end end)
    mvApply.Activated:Connect(function()
        ReleaseHubFocus()
        local wmul = tostring(wsBox.Text or ""):match("^[xX×]%s*([%d%.]+)")
        if wmul then
            MV.speedMode = "x"
            MV.speedMul = mvClamp(tonumber(wmul), 1, 20)
        else
            local w = tonumber(wsBox.Text)
            if w then
                MV.speedMode = "num"
                MV.walkSpeed = mvClamp(w, 0, 500, 16)
            end
        end
        local j = tonumber(jpBox.Text)
        if j then MV.jumpPower = mvClamp(j, 0, 500, 50) end
        pcall(function() if MV.speed then MV.ApplyChar() end end)
        if S.RefreshMovePanel then pcall(S.RefreshMovePanel) end
        S.SyncTunePanel()
        D.Say(string.format("⚙ di chuyển: chạy %s · lực nhảy %d",
            (MV.speedMode == "x") and ("×" .. tostring(MV.speedMul)) or tostring(MV.walkSpeed),
            MV.jumpPower), C.GREEN)
    end)
    S.tuneBtns = {panel = P, fly = flyBtn, sprint = spdBtn, highjump = hjBtn, flySpeed = flyBox, sprintSpeed = spdBox, highJumpSpeed = hjBox, walk = wsBox, jump = jpBox}
    S.SyncTunePanel()
end
-- ---------- HẾT KHUNG ⚙ TUỲ CHỈNH ----------

-- ---------- v4.43: KHUNG 🔐 ANTI BAN ----------
do
    local P = New("Frame", {
        Name = "HubAntiBan_Panel", Size = UDim2.new(1, 0, 0, 88), LayoutOrder = 3,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10)); Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 4),
        Text = "🔐 ANTI BAN — tự hop server khác khi bị nghi / định ban",
        BackgroundTransparency = 1, TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local function abtn(name, text, x, y, w, color)
        local b = New("TextButton", {
            Name = name, Text = text, Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            BackgroundColor3 = color, TextColor3 = D.BestText(color), BorderSizePixel = 0,
            Font = Enum.Font.GothamBold, TextSize = 9, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6)); D.Tactile(b, 0.08)
        return b
    end
    local onBtn = abtn("AntiBanOn", "🔐 TẮT", 8, 24, 88, C.GRAY)
    local hopBtn = abtn("AntiBanHopNow", "🔀 Hop ngay", 100, 24, 88, C.PURPLE)
    New("TextLabel", {
        Size = UDim2.new(0, 52, 0, 22), Position = UDim2.new(0, 194, 0, 24),
        Text = "⏳ chờ s", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local cdBox = New("TextBox", {
        Name = "AntiBanCooldown", Size = UDim2.new(0, 44, 0, 22), Position = UDim2.new(0, 246, 0, 24),
        Text = tostring(S.AntiBan.cooldown), ClearTextOnFocus = false, BackgroundColor3 = C.SURFACE2,
        TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
    }, P)
    Corner(cdBox, UDim.new(0, 6))
    local st = New("TextLabel", {
        Name = "AntiBanStatus", Size = UDim2.new(1, -16, 0, 32), Position = UDim2.new(0, 8, 0, 50),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
        TextSize = 9, TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    function S.SyncAntiBanPanel()
        pcall(function()
            onBtn.Text = S.AntiBan.on and "🔐 BẬT" or "🔐 TẮT"
            D.SetBg(onBtn, S.AntiBan.on and C.GREEN or C.GRAY)
            if UserInputService:GetFocusedTextBox() ~= cdBox then
                cdBox.Text = tostring(S.AntiBan.cooldown or 10)
            end
            st.Text = S.AntiBanStatus() .. " · kick/ban/error → hop. Bay/xuyên bị reset tốc độ 3 lần/4s → hop. Không vào lại đúng server cũ."
        end)
    end
    onBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.RunHubAction("antiban")
        S.SyncAntiBanPanel()
    end)
    hopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        if not S.AntiBan.on then S.AntiBanSet(true) end
        local n = tonumber(cdBox.Text)
        if n then S.AntiBan.cooldown = math.clamp(n, 3, 60) end
        S.AntiBanHop("manual")
        S.SyncAntiBanPanel()
    end)
    cdBox.FocusLost:Connect(function()
        local n = tonumber(cdBox.Text)
        if n then S.AntiBan.cooldown = math.clamp(n, 3, 60) end
        S.SyncAntiBanPanel()
    end)
    S.SyncAntiBanPanel()
end
-- ---------- HẾT KHUNG 🔐 ANTI BAN ----------

-- ---------- v4.36: KHUNG 🚀 BAY THEO CAMERA (công tắc 🧱 độc lập) ----------
do
    local P = New("Frame", {
        Name = "HubFly_Panel", Size = UDim2.new(1, 0, 0, 154), LayoutOrder = -1,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10)); Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 4),
        Text = "🚀 BAY THEO CAMERA — điều khiển tay", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local function button(name, text, x, y, w, color)
        local b = New("TextButton", {
            Name = name, Text = text, Size = UDim2.new(0, w, 0, 24), Position = UDim2.new(0, x, 0, y),
            BackgroundColor3 = color, TextColor3 = D.BestText(color), BorderSizePixel = 0,
            Font = Enum.Font.GothamBold, TextSize = 10, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6)); D.Tactile(b, 0.08)
        return b
    end
    local onBtn = button("FlyToggle", "🚀 Bay: TẮT", 8, 24, 100, C.GRAY)
    local ncBtn = button("FlyNoclip", "🧱 Xuyên tường: TẮT", 114, 24, 158, C.GRAY)
    local hudBtn = button("FlyHudToggle", "📱 Nút ảo: BẬT", 278, 24, 124, C.GREEN)
    New("TextLabel", {
        Size = UDim2.new(0, 128, 0, 24), Position = UDim2.new(0, 8, 0, 54),
        Text = "💨 Tốc độ (1–2000)", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 10, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local speed = New("TextBox", {
        Name = "FlySpeed", Size = UDim2.new(0, 56, 0, 24), Position = UDim2.new(0, 140, 0, 54),
        Text = tostring(MV.flySpeed), ClearTextOnFocus = false, BackgroundColor3 = C.SURFACE2,
        TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 10, BorderSizePixel = 0, ZIndex = 8,
    }, P)
    Corner(speed, UDim.new(0, 6))
    local apply = button("FlySpeedApply", "✔ Áp dụng", 202, 54, 92, C.GREEN)
    local stop = button("FlyStop", "⏹ Dừng bay", 300, 54, 102, C.RED)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 46), Position = UDim2.new(0, 8, 0, 84),
        Text = "WASD / joystick: bay theo camera cả lên và xuống. Nhìn xuống 60° + tiến tới = bay xuống 60°. "
            .. "Space / ⬆: lên; Shift/Ctrl / ⬇: xuống. Thả điều khiển: đứng lơ lửng. "
            .. "🧱 là công tắc riêng, Bay không tự bật/tắt xuyên tường.",
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)
    local status = New("TextLabel", {
        Name = "FlyPanelStatus", Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 134),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
        TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    function S.SyncFlyPanel()
        local function paint(b, on, label)
            b.Text = label .. (on and "BẬT" or "TẮT")
            D.SetBg(b, on and C.GREEN or C.GRAY)
        end
        paint(onBtn, MV.fly, "🚀 Bay: ")
        paint(ncBtn, MV.noclip, "🧱 Xuyên tường: ")
        paint(hudBtn, MV.Flight.showHud, "📱 Nút ảo: ")
        if UserInputService:GetFocusedTextBox() ~= speed then speed.Text = tostring(MV.flySpeed) end
        status.Text = MV.fly and ("🚀 Đang bay theo camera · tốc độ " .. tostring(MV.flySpeed) .. " · thả phím để dừng tại chỗ")
            or "🚀 Đã tắt bay · 🧱 xuyên tường " .. (MV.noclip and "BẬT" or "TẮT")
    end
    onBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("fly"), C.YELLOW) end)
    ncBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("noclip"), C.YELLOW) end)
    hudBtn.Activated:Connect(function() ReleaseHubFocus(); MV.SetFlyHud(not MV.Flight.showHud) end)
    local function applySpeed()
        local value = speed.Text
        ReleaseHubFocus()
        local ok, result = MV.SetFlySpeed(value)
        if ok then D.Say("💨 Tốc độ bay: " .. tostring(result), C.GREEN)
        else D.Say("⚠️ " .. tostring(result), C.YELLOW) end
        S.SyncFlyPanel()
    end
    apply.Activated:Connect(applySpeed)
    speed.FocusLost:Connect(function(enter) if enter then applySpeed() end end)
    stop.Activated:Connect(function()
        ReleaseHubFocus(); MV.SetFly(false); S.Rebuild()
        D.Say("🚀 Bay: TẮT — xuyên tường giữ nguyên theo công tắc 🧱", C.YELLOW)
    end)
    S.flyBtns = {on = onBtn, noclip = ncBtn, hud = hudBtn, speed = speed, apply = apply, stop = stop, panel = P}
    S.SyncFlyPanel()
end
-- ---------- HẾT KHUNG 🚀 BAY THEO CAMERA ----------

-- ---------- v4.37: KHUNG 💨 TỐC ĐỘ THEO CAMERA (không xuyên tường, không nút ảo) ----------
do
    local P = New("Frame", {
        Name = "HubSpeed_Panel", Size = UDim2.new(1, 0, 0, 130), LayoutOrder = -2,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10)); Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 4),
        Text = "💨 TỐC ĐỘ THEO CAMERA — mặt đất, nhảy/rơi theo game", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local function button(name, text, x, y, w, color)
        local b = New("TextButton", {
            Name = name, Text = text, Size = UDim2.new(0, w, 0, 24), Position = UDim2.new(0, x, 0, y),
            BackgroundColor3 = color, TextColor3 = D.BestText(color), BorderSizePixel = 0,
            Font = Enum.Font.GothamBold, TextSize = 10, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6)); D.Tactile(b, 0.08)
        return b
    end
    local onBtn = button("SpeedToggle", "💨 Tốc độ: TẮT", 8, 24, 132, C.GRAY)
    local stop = button("SpeedStop", "⏹ Dừng", 146, 24, 80, C.RED)
    New("TextLabel", {
        Size = UDim2.new(0, 128, 0, 24), Position = UDim2.new(0, 8, 0, 54),
        Text = "💨 Tốc độ (1–2000)", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 10, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local speed = New("TextBox", {
        Name = "SprintSpeed", Size = UDim2.new(0, 56, 0, 24), Position = UDim2.new(0, 140, 0, 54),
        Text = tostring(MV.sprintSpeed), ClearTextOnFocus = false, BackgroundColor3 = C.SURFACE2,
        TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 10, BorderSizePixel = 0, ZIndex = 8,
    }, P)
    Corner(speed, UDim.new(0, 6))
    local apply = button("SpeedApply", "✔ Áp dụng", 202, 54, 92, C.GREEN)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 32), Position = UDim2.new(0, 8, 0, 82),
        Text = "WASD / joystick game: chạy theo hướng camera trên mặt đất. Nhảy = Space của game. "
            .. "Rơi theo trọng lực game. Không xuyên tường, không nút ảo.",
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)
    local status = New("TextLabel", {
        Name = "SpeedPanelStatus", Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 112),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
        TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    function S.SyncSpeedPanel()
        onBtn.Text = "💨 Tốc độ: " .. (MV.sprint and "BẬT" or "TẮT")
        D.SetBg(onBtn, MV.sprint and C.GREEN or C.GRAY)
        if UserInputService:GetFocusedTextBox() ~= speed then speed.Text = tostring(MV.sprintSpeed) end
        status.Text = MV.sprint
            and ("💨 Đang chạy theo camera · tốc độ " .. tostring(MV.sprintSpeed) .. " · nhảy/rơi theo game")
            or "💨 Đã tắt · va chạm tường + nhảy + trọng lực = của game"
    end
    onBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("camspeed"), C.YELLOW) end)
    local function applySpeed()
        local value = speed.Text
        ReleaseHubFocus()
        local ok, result = MV.SetSprintSpeed(value)
        if ok then D.Say("💨 Tốc độ chạy: " .. tostring(result), C.GREEN)
        else D.Say("⚠️ " .. tostring(result), C.YELLOW) end
        S.SyncSpeedPanel()
    end
    apply.Activated:Connect(applySpeed)
    speed.FocusLost:Connect(function(enter) if enter then applySpeed() end end)
    stop.Activated:Connect(function()
        ReleaseHubFocus(); MV.SetSprint(false); S.Rebuild()
        D.Say("💨 Tốc độ theo camera: TẮT", C.YELLOW)
    end)
    S.speedBtns = {on = onBtn, speed = speed, apply = apply, stop = stop, panel = P}
    S.SyncSpeedPanel()
end
-- ---------- HẾT KHUNG 💨 TỐC ĐỘ THEO CAMERA ----------

-- ---------- v4.38: KHUNG 🦘 NHẢY CAO (công tắc độc lập kiểu 👤 Né người) ----------
do
    local P = New("Frame", {
        Name = "HubHighJump_Panel", Size = UDim2.new(1, 0, 0, 118), LayoutOrder = -3,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10)); Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255,255,255), Color3.fromRGB(188,192,205), 90)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 4),
        Text = "🦘 NHẢY CAO — BẬT/TẮT độc lập (kiểu 👤 Né người)", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local function button(name, text, x, y, w, color)
        local b = New("TextButton", {
            Name = name, Text = text, Size = UDim2.new(0, w, 0, 24), Position = UDim2.new(0, x, 0, y),
            BackgroundColor3 = color, TextColor3 = D.BestText(color), BorderSizePixel = 0,
            Font = Enum.Font.GothamBold, TextSize = 10, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6)); D.Tactile(b, 0.08)
        return b
    end
    local onBtn = button("HighJumpToggle", "🦘 Nhảy cao: TẮT", 8, 24, 148, C.GRAY)
    local stop = button("HighJumpStop", "⏹ Dừng", 162, 24, 80, C.RED)
    New("TextLabel", {
        Size = UDim2.new(0, 148, 0, 24), Position = UDim2.new(0, 8, 0, 54),
        Text = "💨 Tốc độ nhảy (1–500)", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 10, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local speed = New("TextBox", {
        Name = "HighJumpSpeed", Size = UDim2.new(0, 56, 0, 24), Position = UDim2.new(0, 160, 0, 54),
        Text = tostring(MV.highJumpSpeed), ClearTextOnFocus = false, BackgroundColor3 = C.SURFACE2,
        TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 10, BorderSizePixel = 0, ZIndex = 8,
    }, P)
    Corner(speed, UDim.new(0, 6))
    local apply = button("HighJumpApply", "✔ Áp dụng", 222, 54, 92, C.GREEN)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 82),
        Text = "BẬT rồi bấm Space: nhảy cao theo số trên. Rơi theo game. Không xuyên tường, không nút ảo.",
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local status = New("TextLabel", {
        Name = "HighJumpStatus", Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 100),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
        TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    function S.SyncHighJumpPanel()
        onBtn.Text = "🦘 Nhảy cao: " .. (MV.highJump and "BẬT" or "TẮT")
        D.SetBg(onBtn, MV.highJump and C.GREEN or C.GRAY)
        if UserInputService:GetFocusedTextBox() ~= speed then speed.Text = tostring(MV.highJumpSpeed) end
        status.Text = MV.highJump
            and ("🦘 Đang nhảy cao · tốc độ " .. tostring(MV.highJumpSpeed) .. " · rơi theo trọng lực game")
            or "🦘 Đã tắt · nhảy = của game (🦘 vô hạn vẫn độc lập)"
    end
    onBtn.Activated:Connect(function() ReleaseHubFocus(); D.Say(S.RunHubAction("highjump"), C.YELLOW) end)
    local function applySpeed()
        local value = speed.Text
        ReleaseHubFocus()
        local ok, result = MV.SetHighJumpSpeed(value)
        if ok then D.Say("💨 Tốc độ nhảy cao: " .. tostring(result), C.GREEN)
        else D.Say("⚠️ " .. tostring(result), C.YELLOW) end
        S.SyncHighJumpPanel()
    end
    apply.Activated:Connect(applySpeed)
    speed.FocusLost:Connect(function(enter) if enter then applySpeed() end end)
    stop.Activated:Connect(function()
        ReleaseHubFocus(); MV.SetHighJump(false); S.Rebuild()
        D.Say("🦘 Nhảy cao: TẮT", C.YELLOW)
    end)
    S.highJumpBtns = {on = onBtn, speed = speed, apply = apply, stop = stop, panel = P}
    S.SyncHighJumpPanel()
end
-- ---------- HẾT KHUNG 🦘 NHẢY CAO ----------

-- ---------- v4.12: KHUNG ⚙ TUỲ CHỈNH DI CHUYỂN (DA XOA THAM KINH) ----------
-- ---------- v4.12: KHUNG ⚙ TUỲ CHỈNH DI CHUYỂN (DA XOA THAM KINH) ----------
do
    local PH = 180
    local P = New("Frame", {
        Name = "HubMove_Panel",
        Size = UDim2.new(1, 0, 0, PH),
        LayoutOrder = 0,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    local function title(txt)
        New("TextLabel", {
            Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.ACCENT,
            Font = Enum.Font.GothamBold, TextSize = 10,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end
    local function lab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end
    local function box(x, y, w, val)
        local b = New("TextBox", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = tostring(val), ClearTextOnFocus = false,
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
            PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
        }, P)
        Corner(b, UDim.new(0, 6))
        Stroke(b, C.BORDER, 1)
        return b
    end
    local function act(txt, x, y, w, color)
        local b = New("TextButton", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color or C.SURFACE3, BackgroundTransparency = 0.08,
            TextColor3 = D.BestText(color or C.SURFACE3), Font = Enum.Font.GothamBold,
            TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Tactile(b, 0.08)
        return b
    end
    local function say(msg, good) D.Say(msg, good and C.GREEN or C.RED) end

    title("⚙ Tuỳ chỉnh di chuyển (áp dụng ngay)")

    lab("🚀 Bay", 8, 22, 52)
    local flyIn = box(62, 22, 44, S.Move.flySpeed)
    lab("👟 Chạy", 114, 22, 50)
    local wsIn = box(166, 22, 40, (S.Move.speedMode == "x") and ("x" .. tostring(S.Move.speedMul)) or tostring(S.Move.walkSpeed))
    lab("🦘 Nhảy", 214, 22, 46)
    local jpIn = box(262, 22, 40, S.Move.jumpPower)
    local ap1 = act("✔", 308, 22, 28, C.GREEN)

    lab("0=auto tốc độ bay người", 8, 48, 140)
    local speedPlayerBox = box(150, 48, 44, S.Move.playerFlySpeed or 0)
    local applyPlayerSpeedBtn = act("✔ Tốc bay người", 200, 48, 110, C.GREEN)

    local upBtn  = act("⬆ Nâng", 8, 74, 62, C.BLUE)
    local dnBtn  = act("⬇ Hạ", 76, 74, 56, C.BLUE)
    local stopBtn = act("🛑 Tắt hết", 138, 74, 76, C.RED)
    local st = New("TextLabel", {
        Size = UDim2.new(1, -230, 0, 20), Position = UDim2.new(0, 222, 0, 74),
        Text = S.Move.Status(), BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    ap1.Activated:Connect(function()
        ReleaseHubFocus()
        local f = tonumber(flyIn.Text); local w = tonumber(wsIn.Text); local j = tonumber(jpIn.Text)
        if f then
            S.Move.flySpeed = (f >= 1 and f <= 2000) and f or S.Move.flySpeed
            S.Move.SyncFlyHud()
        end
        local wmul = tostring(wsIn.Text or ""):match("^[xX×]%s*([%d%.]+)")
        if wmul then
            S.Move.speedMode = "x"
            S.Move.speedMul  = mvClamp(tonumber(wmul), 1, 20)
        elseif w then
            S.Move.speedMode = "num"
            S.Move.walkSpeed = (w >= 1 and w <= 500) and w or S.Move.walkSpeed
        end
        if j then S.Move.jumpPower = (j >= 0 and j <= 500) and j or S.Move.jumpPower end
        flyIn.Text = tostring(S.Move.flySpeed)
        wsIn.Text  = (S.Move.speedMode == "x") and ("x" .. tostring(S.Move.speedMul)) or tostring(S.Move.walkSpeed)
        jpIn.Text  = tostring(S.Move.jumpPower)
        pcall(function() if S.Move.speed then S.Move.ApplyChar() end end)
        say(string.format("⚙ đã áp dụng: bay %d · chạy %s · nhảy %d%s",
            S.Move.flySpeed,
            (S.Move.speedMode == "x") and ("×" .. tostring(S.Move.speedMul) .. " (theo game)") or tostring(S.Move.walkSpeed),
            S.Move.jumpPower,
            (S.Move.speedMode == "x" and S.Move.speed) and (" = " .. tostring(S.Move.WantSpeed())) or ""), true)
    end)

    upBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local ok, what = S.Move.Nudge(2.5)
        say(ok and ("⬆ đã nâng " .. tostring(what) .. " lên 2.5") or "⬆ bật Bay trước đã", ok == true)
        st.Text = S.Move.Status()
    end)
    dnBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local ok, what = S.Move.Nudge(-2.5)
        say(ok and ("⬇ đã hạ " .. tostring(what) .. " xuống 2.5") or "⬇ bật Bay trước đã", ok == true)
        st.Text = S.Move.Status()
    end)
    stopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        D.Say(S.RunHubAction("movestop"), C.YELLOW)
        st.Text = S.Move.Status()
    end)

    local pcBtn
    local TXT_PASS_ON  = "🧲 Đẩy xuyên khi kẹt: BẬT"
    local TXT_PASS_OFF = "🧲 Đẩy xuyên khi kẹt: TẮT"
    local function paintPass()
        local on = (S.Move.ncPass ~= false)
        pcBtn.Text = on and TXT_PASS_ON or TXT_PASS_OFF
        pcBtn.BackgroundColor3 = on and C.GREEN or C.GRAY
        pcBtn.TextColor3 = D.BestText(pcBtn.BackgroundColor3)
    end
    pcBtn = act(TXT_PASS_ON, 8, 100, 168, C.GREEN)
    S.Move._passBtn = pcBtn
    pcBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Move.ncPass = (S.Move.ncPass == false)
        paintPass()
        say(S.Move.ncPass and "🧲 tự đẩy xuyên: BẬT" or "🧲 tự đẩy xuyên: TẮT", true)
    end)

    local flyPlayerBtn = act("🚀 Bay tới người gần nhất", 184, 100, 150, C.ACCENT)
    local stopPlayerFlyBtn = act("⏹ Dừng bay người", 340, 100, 110, C.RED)

    local function paintGlass()
        local pFlying = S.Move._playerFlyActive == true
        flyPlayerBtn.Text = pFlying and ("🚀 Đang bay tới " .. tostring(S.Move._playerFlyTarget and S.Move._playerFlyTarget.Name or "?")) or "🚀 Bay tới người gần nhất"
        flyPlayerBtn.BackgroundColor3 = pFlying and C.GREEN or C.ACCENT
        flyPlayerBtn.TextColor3 = D.BestText(flyPlayerBtn.BackgroundColor3)
        if speedPlayerBox then speedPlayerBox.Text = tostring(S.Move.playerFlySpeed or 0) end
    end
    flyPlayerBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local target = nil
        if S.Loc and S.Loc.Nearest then target = S.Loc.Nearest() end
        if not target then
            say("⚠️ không có người chơi nào để bay tới", false)
            return
        end
        local ok, res = S.Move.FlyToPlayer(target)
        st.Text = S.Move.Status()
        paintGlass()
        if S.Loc and S.Loc.RefreshList then pcall(S.Loc.RefreshList) end
        say(ok and ("🚀 đang bay tới " .. tostring(target.Name)) or ("⚠️ " .. tostring(res)), ok==true)
    end)
    stopPlayerFlyBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Move.StopPlayerFly()
        st.Text = S.Move.Status()
        paintGlass()
        if S.Loc and S.Loc.RefreshList then pcall(S.Loc.RefreshList) end
        say("⏹ đã dừng bay tới người", true)
    end)
    applyPlayerSpeedBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local v = tonumber(tostring(speedPlayerBox.Text or ""):match("%-?%d+%.?%d*"))
        if v == nil then v = S.Move.playerFlySpeed or 0 end
        S.Move.SetPlayerFlySpeed(v)
        speedPlayerBox.Text = tostring(S.Move.playerFlySpeed or 0)
        st.Text = S.Move.Status()
        paintGlass()
        local sp = S.Move.GetPlayerFlySpeed and S.Move.GetPlayerFlySpeed() or S.Move.playerFlySpeed or 0
        if (tonumber(S.Move.playerFlySpeed) or 0) == 0 then
            say(string.format("🚀 tốc độ bay tới người: auto (%g = tốc độ game)", sp), true)
        else
            say("🚀 tốc độ bay tới người: " .. tostring(sp), true)
        end
        if S.Loc and S.Loc.RefreshList then pcall(S.Loc.RefreshList) end
        if S.SyncLocPanel then pcall(S.SyncLocPanel) end
    end)
    paintGlass()
    S.Move._glassBtns = { flyPlayer = flyPlayerBtn, stopPlayer = stopPlayerFlyBtn, speedPlayerBox = speedPlayerBox, paint = paintGlass }

    function S.RefreshMovePanel()
        pcall(function()
            st.Text = S.Move.Status()
            flyIn.Text = tostring(S.Move.flySpeed)
            wsIn.Text = (S.Move.speedMode == "x") and ("x" .. tostring(S.Move.speedMul)) or tostring(S.Move.walkSpeed)
            jpIn.Text = tostring(S.Move.jumpPower)
            paintPass()
            if S.Move._glassBtns and S.Move._glassBtns.paint then pcall(S.Move._glassBtns.paint) end
        end)
    end
end

S.Loc = {

    on = false,             -- 👁️ định vị TẤT CẢ người chơi
    solo = false,           -- 🎯 chỉ định vị ĐÚNG 1 người (S.Loc.target)
    target = nil,
    maxDist = 0,            -- 0 = không giới hạn; >0 = chỉ hiện người trong bán kính này (stud)
    _gui = nil, _items = {}, _friend = {}, _downAt = {},
    _acc = 0, _listAcc = 0, _bound = false,
}
local LOC = S.Loc
local LOCC = {
    normal = { fill = Color3.fromRGB(0, 255, 100),   out = Color3.fromRGB(255, 255, 255), txt = Color3.fromRGB(0, 255, 100) },
    friend = { fill = Color3.fromRGB(255, 105, 180), out = Color3.fromRGB(255, 182, 193), txt = Color3.fromRGB(255, 182, 193) },
    down   = { fill = Color3.fromRGB(200, 0, 0),     out = Color3.fromRGB(255, 100, 100), txt = Color3.fromRGB(255, 100, 100) },
    fdown  = { fill = Color3.fromRGB(138, 43, 226),  out = Color3.fromRGB(200, 150, 255), txt = Color3.fromRGB(200, 150, 255) },
}
local function locRound(n) return math.floor((tonumber(n) or 0) + 0.5) end
local function locTime(sec)                      -- số giây -> "mm:ss"
    local v = math.max(0, math.floor(tonumber(sec) or 0))
    return string.format("%02d:%02d", math.floor(v / 60), v % 60)
end
function S.Loc.Root()
    local c = player.Character
    return (c and c:FindFirstChild("HumanoidRootPart")) or nil
end
function S.Loc.CharOf(p)
    local c = p and p.Character
    if not c then return nil end
    local r = c:FindFirstChild("HumanoidRootPart")
    local h = c:FindFirstChildOfClass("Humanoid")
    if r and h then return c, r, h end
    return nil
end
function S.Loc.IsFriend(p)
    local uid = p and p.UserId
    if uid == nil then return false end
    if LOC._friend[uid] == nil then
        local ok, res = pcall(function() return player:IsFriendsWith(uid) end)
        LOC._friend[uid] = (ok and res == true) or false
    end
    return LOC._friend[uid] == true
end
function S.Loc.IsDown(h)
    if not h then return false end
    if h.PlatformStand == true then return true end
    if (tonumber(h.Health) or 1) <= 0 then return true end
    return false
end
function S.Loc.NoteDown(p, down)
    if p == nil then return end
    if down then
        if not LOC._downAt[p] then LOC._downAt[p] = tick() end
    else
        LOC._downAt[p] = nil
    end
end
function S.Loc.DownSecs(p)
    local st = LOC._downAt[p]
    if not st then return 0 end
    return tick() - st
end
function S.Loc.Dist(p)
    local r = LOC.Root()
    local _, pr = LOC.CharOf(p)
    if not r or not pr then return nil end
    return (r.Position - pr.Position).Magnitude
end
function S.Loc.Nearest()
    local best, bd = nil, nil
    for _, p in ipairs(Players:GetPlayers()) do
        if p ~= player then
            local d = LOC.Dist(p)
            if d and (bd == nil or d < bd) then best, bd = p, d end
            if not best then best = p end
        end
    end
    return best
end
function S.Loc.Wanted(p)
    if p == nil or p == player then return false end
    if LOC.solo then return LOC.target == p end
    return LOC.on == true
end
function S.Loc.Gui()
    if LOC._gui and LOC._gui.Parent then return LOC._gui end
    LOC._gui = New("ScreenGui", {
        Name = "BC_LocEsp", ResetOnSpawn = false,
        ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
    }, gui)
    return LOC._gui
end
function S.Loc.Kill(p)
    local it = LOC._items[p]
    if not it then return end
    pcall(function() if it.hl then it.hl:Destroy() end end)
    pcall(function() if it.bb then it.bb:Destroy() end end)
    LOC._items[p] = nil
end
function S.Loc.Clear()
    for p, _ in pairs(LOC._items) do LOC.Kill(p) end
    pcall(function() if LOC._gui then LOC._gui:ClearAllChildren() end end)
end
function S.Loc.Make(p)
    local c, r = LOC.CharOf(p)
    if not c then return end
    LOC.Kill(p)
    local g = LOC.Gui()
    local hl = New("Highlight", {
        Name = tostring(p.Name) .. "_HL", Adornee = c,
        FillColor = LOCC.normal.fill, FillTransparency = 0.55,
        OutlineColor = LOCC.normal.out, OutlineTransparency = 0,
    }, g)
    local bb = New("BillboardGui", {
        Name = tostring(p.Name) .. "_BB", Adornee = r,
        Size = UDim2.new(0, 170, 0, 46), StudsOffset = Vector3.new(0, 3.6, 0),
        AlwaysOnTop = true,
    }, g)
    local lbl = New("TextLabel", {
        Size = UDim2.new(1, 0, 1, 0), BackgroundTransparency = 1,
        TextColor3 = LOCC.normal.txt, Font = Enum.Font.GothamBold, TextSize = 11,
        TextStrokeColor3 = Color3.fromRGB(0, 0, 0), TextStrokeTransparency = 0.35,
    }, bb)
    LOC._items[p] = { hl = hl, bb = bb, lbl = lbl }
    LOC.TickOne(p)
end
function S.Loc.TickOne(p)
    local it = LOC._items[p]
    if not it then return end
    local c, r, h = LOC.CharOf(p)
    if not c then LOC.Kill(p); return end
    local down, fr = LOC.IsDown(h), LOC.IsFriend(p)
    S.Loc.NoteDown(p, down)
    local col = down and (fr and LOCC.fdown or LOCC.down) or (fr and LOCC.friend or LOCC.normal)
    local r0 = LOC.Root()
    local dist = (r0 and r) and (r0.Position - r.Position).Magnitude or nil
    local far = (LOC.maxDist > 0 and dist ~= nil and dist > LOC.maxDist)
    it.hl.FillColor = col.fill
    it.hl.OutlineColor = col.out
    it.lbl.TextColor3 = col.txt
    it.hl.Enabled = not far
    it.bb.Enabled = not far
    local mid = {}
    if down then mid[#mid + 1] = "☠️ Hạ gục ⏱ " .. locTime(LOC.DownSecs(p)) end
    if h then mid[#mid + 1] = string.format("❤️ %d/%d", locRound(h.Health or 0), locRound(h.MaxHealth or 100)) end
    mid[#mid + 1] = dist and string.format("📏 %dm", locRound(dist)) or "📏 --m"
    it.lbl.Text = p.Name .. (fr and "  💗 Bạn Bè" or "") .. "\n" .. table.concat(mid, " · ")   -- v4.34: Name vốn là chuỗi, khỏi tostring
end
function S.Loc.Tick()
    for p, _ in pairs(LOC._items) do
        if not LOC.Wanted(p) then
            LOC.Kill(p)
        else
            pcall(LOC.TickOne, p)
        end
    end
    if not (LOC.on or LOC.solo) then return end
    local ok, list = pcall(function() return Players:GetPlayers() end)
    if not ok or not list then return end
    for _, p in ipairs(list) do
        if LOC.Wanted(p) and not LOC._items[p] and LOC.CharOf(p) then
            pcall(function() LOC.Make(p) end)
        end
    end
end
function S.Loc.Bind(on)
    if on and not LOC._bound then
        LOC._bound = true
        pcall(function()
            RunService:BindToRenderStep("BC_Loc", Enum.RenderPriority.Camera.Value - 2, function(dt)
                LOC._acc = (LOC._acc or 0) + (tonumber(dt) or 0.016)
                if LOC._acc < 0.2 then return end
                LOC._acc = 0
                pcall(function() LOC.Tick() end)
                LOC._listAcc = (LOC._listAcc or 0) + 0.2
                if LOC._listAcc >= 1 then
                    LOC._listAcc = 0
                    if LOC.RefreshList then pcall(LOC.RefreshList) end
                end
            end)
        end)
    elseif (not on) and LOC._bound then
        LOC._bound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_Loc") end)
    end
end
function S.Loc.Refresh()
    if not (LOC.on or LOC.solo) then
        LOC.Clear()
        LOC.Bind(false)
        return
    end
    for p, _ in pairs(LOC._items) do if not LOC.Wanted(p) then LOC.Kill(p) end end
    local ok, list = pcall(function() return Players:GetPlayers() end)
    if ok and list then
        for _, p in ipairs(list) do
            if LOC.Wanted(p) and not LOC._items[p] and LOC.CharOf(p) then
                pcall(function() LOC.Make(p) end)
            end
        end
    end
    LOC.Bind(true)
end
function S.Loc.Set(on)
    LOC.on = (on == true)
    LOC.Refresh()
    return LOC.on
end
function S.Loc.SetSolo(on)
    LOC.solo = (on == true)
    if not LOC.solo then LOC.target = nil end
    LOC.Refresh()
    return LOC.solo
end
function S.Loc.SetTarget(p)
    LOC.target = (p ~= nil and p ~= player) and p or nil
    LOC.solo = (LOC.target ~= nil)
    LOC.Refresh()
    return LOC.target
end
function S.Loc.SetMaxDist(n)
    LOC.maxDist = math.max(0, tonumber(n) or 0)
    pcall(LOC.Tick)
    return LOC.maxDist
end
function S.Loc.StopAll()
    LOC.on = false; LOC.solo = false; LOC.target = nil
    LOC._downAt = {}
    LOC.Clear()
    LOC.Bind(false)
    return true
end
function S.Loc.Status()
    if not (LOC.on or LOC.solo) then return "📍 định vị: đang TẮT (chưa hiện ai)" end
    local n = 0
    for _ in pairs(LOC._items) do n = n + 1 end
    local t = {}
    if LOC.on then t[#t + 1] = "👁️ tất cả" end
    if LOC.solo then t[#t + 1] = "🎯 lẻ: " .. tostring(LOC.target and LOC.target.Name or "chưa chọn") end
    if LOC.maxDist > 0 then t[#t + 1] = string.format("📏 ≤ %dm", locRound(LOC.maxDist)) end
    return string.format("📍 đang định vị %d người (%s)", n, table.concat(t, " · "))
end
do
    local function hookLoc(p)
        if p == player then return nil end
        trackConn(p.CharacterAdded:Connect(function()
            if LOC.Wanted(p) then pcall(function() LOC.Make(p) end) end
        end))
        trackConn(p.CharacterRemoving:Connect(function() LOC.Kill(p) end))
        if LOC.Wanted(p) then pcall(function() LOC.Make(p) end) end
    end
    for _, p in ipairs(Players:GetPlayers()) do if p ~= player then pcall(hookLoc, p) end end
    trackConn(Players.PlayerAdded:Connect(function(p) pcall(hookLoc, p) end))
    trackConn(Players.PlayerRemoving:Connect(function(p)
        LOC._friend[p.UserId] = nil
        LOC._downAt[p] = nil
        if LOC.target == p then LOC.target = nil end
        LOC.Kill(p)
    end))
end

do
    local tab = AddTab("Người Chơi", "👥", 4)      -- 4 = ngay sau 📚 Script Hub (3), trước ➕ (7)
    D.playerTab = tab
    function S.OpenPlayerTab()
        for i, tc in ipairs(tabContent) do
            if tc == D.playerTab then
                SwitchTab(i)
                return true
            end
        end
        return false
    end
    New("TextLabel", {
        Name = "PlayerTitle",
        Size = UDim2.new(1, -16, 0, 18), Position = UDim2.new(0, 8, 0, 8),
        Text = "👥 NGƯỜI CHƠI — ĐỊNH VỊ & XEM NGƯỜI CHƠI",
        BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 11,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, tab)
    New("TextLabel", {
        Name = "PlayerNote",
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 26),
        Text = "📍 = thấy người khác xuyên tường · 👣 = bám camera theo 1 người để xem họ đang làm gì."
             .. "  🌳 = định vị MỌI vật theo tên (VD: cây) và bám theo vật đang di chuyển."
             .. "  (Các nút tắt/mở nhanh vẫn có thẻ trong 📚 Script Hub.)",
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 8,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, tab)
    D.playerY = 46
end

-- ---------- KHUNG 📍 ĐỊNH VỊ (nằm trong trang 👥 NGƯỜI CHƠI) ----------
do
    local PH = 380
    local P = New("Frame", {
        Name = "HubLoc_Panel",
        Size = UDim2.new(1, -16, 0, PH),
        Position = UDim2.new(0, 8, 0, D.playerY or 46),
        LayoutOrder = 1,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.playerTab)
    D.playerY = (D.playerY or 46) + PH + 8
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "📍 ĐỊNH VỊ NGƯỜI CHƠI (xuyên tường) + 🚀 BAY TỚI NGƯỜI",
        BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local function act(txt, x, y, w, color)
        local b = New("TextButton", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end
    local function lab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end

    local allBtn  = act("👁️ Tất Cả", 8, 22, 76, C.GRAY)
    local soloBtn = act("🎯 Lẻ", 90, 22, 76, C.GRAY)
    local stopBtn = act("🚫 Tắt", 172, 22, 56, C.SURFACE3)

    local flyNearBtn = act("🚀 Gần nhất", 234, 22, 76, C.ACCENT)
    local flyStopBtn = act("⏹️ Dừng bay", 316, 22, 76, C.SURFACE3)

    lab("📏 Xa nhất:", 8, 48, 58)
    local distIn = New("TextBox", {
        Size = UDim2.new(0, 50, 0, 20), Position = UDim2.new(0, 66, 0, 48),
        Text = "0", ClearTextOnFocus = false,
        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
        PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(distIn, UDim.new(0, 6))
    lab("m (0 = không giới hạn)", 122, 48, 120)

    lab("🚀 Tốc độ bay tới người:", 8, 72, 122)
    local flySpeedIn = New("TextBox", {
        Size = UDim2.new(0, 56, 0, 20), Position = UDim2.new(0, 132, 0, 72),
        Text = "0", ClearTextOnFocus = false,
        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
        PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(flySpeedIn, UDim.new(0, 6))
    lab("0=auto (lấy tốc độ game)", 194, 72, 160)
    local flySpeedApply = act("✅ Đặt", 354, 72, 38, C.GREEN)

    local searchIn = New("TextBox", {
        Size = UDim2.new(1, -16, 0, 22), Position = UDim2.new(0, 8, 0, 96),
        Text = "", PlaceholderText = "🔍 Tìm tên người chơi...", ClearTextOnFocus = false,
        PlaceholderColor3 = C.GRAY, BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1,
        TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Left, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(searchIn, UDim.new(0, 6))
    New("UIPadding", { PaddingLeft = UDim.new(0, 6) }, searchIn)

    local list = New("ScrollingFrame", {
        Name = "LocList", Size = UDim2.new(1, -16, 0, 190), Position = UDim2.new(0, 8, 0, 122),
        BackgroundTransparency = 1, BorderSizePixel = 0, ScrollBarThickness = 4,
        CanvasSize = UDim2.new(0, 0, 0, 0), ZIndex = 7,
    }, P)
    New("UIListLayout", { Padding = UDim.new(0, 4), SortOrder = Enum.SortOrder.LayoutOrder }, list)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 56), Position = UDim2.new(0, 8, 0, 316),
        Text = "💡 Bấm TÊN = chỉ định vị người đó. 🟢 thường · 💗 bạn bè · 🔴 bị hạ gục (⏱ đếm giờ) · "
             .. "🟣 bạn bè bị hạ gục. 📏 Xa nhất: chỉ hiện người trong bán kính đó. "
             .. "🚀 Bay tới = xuyên tường (tự bật 🧱 + 🚀), theo dõi mục tiêu di chuyển, dừng khi <2 studs. "
             .. "Tốc độ 0 = auto lấy tốc độ mặc định của game.",
        TextWrapped = true, BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function paint()
        allBtn.Text = LOC.on and "👁️ Tất Cả: BẬT" or "👁️ Tất Cả"
        allBtn.BackgroundColor3 = LOC.on and C.GREEN or C.GRAY
        allBtn.TextColor3 = D.BestText(allBtn.BackgroundColor3)
        soloBtn.Text = LOC.solo and ("🎯 " .. tostring(LOC.target and LOC.target.Name or "?")) or "🎯 Lẻ"
        soloBtn.BackgroundColor3 = LOC.solo and C.PURPLE or C.GRAY
        soloBtn.TextColor3 = D.BestText(soloBtn.BackgroundColor3)
        local mv = S.Move
        local sp = mv and mv.playerFlySpeed or 0
        if tonumber(sp) == 0 then
            flySpeedIn.Text = "0"
            flySpeedIn.PlaceholderText = tostring(mv and mv.GetPlayerFlySpeed and mv.GetPlayerFlySpeed() or 16)
        else
            flySpeedIn.Text = tostring(sp)
        end
        local active = mv and mv._playerFlyActive
        flyNearBtn.BackgroundColor3 = active and C.GREEN or C.ACCENT
        flyNearBtn.TextColor3 = D.BestText(flyNearBtn.BackgroundColor3)
        flyNearBtn.Text = active and ("🚀 Đang bay " .. tostring(mv._playerFlyTarget and mv._playerFlyTarget.Name or "?")) or "🚀 Gần nhất"
    end

    LOC.RefreshList = function(force)
        local term = tostring(searchIn.Text or ""):lower()
        local ok, players = pcall(function() return Players:GetPlayers() end)
        if not ok or not players then return end
        local want = {}
        local sig = term
        for _, p in ipairs(players) do
            if p ~= player then
                local nm = tostring(p.Name)
                if term == "" or nm:lower():find(term, 1, true) then
                    want[#want + 1] = p
                    local _, _, h0 = LOC.CharOf(p)
                    sig = sig .. "|" .. nm
                        .. (LOC.IsFriend(p) and "F" or "") .. (LOC.IsDown(h0) and "D" or "")
                        .. (LOC.target == p and "T" or "")
                end
            end
        end
        local cache = LOC._rows
        if (force == true) or (sig ~= LOC._rowSig) or (cache == nil) then
            LOC._rowSig = sig
            LOC._rows = {}
            cache = LOC._rows
            for _, c in ipairs(list:GetChildren()) do
                if not c:IsA("UIListLayout") then pcall(function() c:Destroy() end) end
            end
            local order = 0
            for _, p in ipairs(want) do
                local nm = tostring(p.Name)
                order = order + 1
                local _, _, h = LOC.CharOf(p)
                local fr, down = LOC.IsFriend(p), LOC.IsDown(h)
                local col = down and (fr and LOCC.fdown or LOCC.down) or (fr and LOCC.friend or LOCC.normal)
                    local row = New("Frame", {
                        Size = UDim2.new(1, 0, 0, 28), LayoutOrder = order,
                        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.25,
                        BorderSizePixel = 0, ZIndex = 8,
                    }, list)
                    Corner(row, UDim.new(0, 6))
                    local sub = {}
                    if fr then sub[#sub + 1] = "💗 Bạn Bè" end
                    if down then sub[#sub + 1] = "☠️ " .. locTime(LOC.DownSecs(p)) end
                    local b = New("TextButton", {
                        Size = UDim2.new(1, -162, 1, 0), Position = UDim2.new(0, 6, 0, 0),
                        Text = (LOC.target == p and "🎯 " or "") .. nm
                             .. (#sub > 0 and ("  " .. table.concat(sub, "  ")) or ""),
                        BackgroundTransparency = 1, TextColor3 = col.txt,
                        Font = Enum.Font.GothamBold, TextSize = 9,
                        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 9,
                    }, row)
                    b.Activated:Connect(function()
                        ReleaseHubFocus()
                        if LOC.target == p then
                            LOC.SetSolo(false)
                            if S.Spec and S.Spec.on and S.Spec.target == p then pcall(function() S.Spec.Stop() end) end
                        else
                            LOC.SetTarget(p)
                            if S.Spec and S.Spec.on then
                                pcall(function() S.Spec.Set(p) end)
                                pcall(function() if S.Spec.RefreshList then S.Spec.RefreshList() end end)
                            end
                        end
                        paint()
                        if LOC.RefreshList then LOC.RefreshList() end
                        S.Rebuild()
                    end)
                    local d = LOC.Dist(p)
                    local distLbl = New("TextLabel", {
                        Size = UDim2.new(0, 56, 1, 0), Position = UDim2.new(1, -156, 0, 0),
                        Text = d and string.format("📏 %dm", locRound(d)) or "📏 --m",
                        BackgroundTransparency = 1, TextColor3 = col.txt,
                        Font = Enum.Font.GothamMedium, TextSize = 9,
                        TextXAlignment = Enum.TextXAlignment.Right, ZIndex = 9,
                    }, row)
                    local mv = S.Move
                    local isFlyingToThis = mv and mv._playerFlyActive and mv._playerFlyTarget == p
                    local flyBtn = New("TextButton", {
                        Size = UDim2.new(0, 70, 0, 20), Position = UDim2.new(1, -76, 0, 4),
                        Text = isFlyingToThis and "⏹️ Dừng" or "🚀 Bay tới",
                        BackgroundColor3 = isFlyingToThis and C.RED or C.ACCENT,
                        TextColor3 = Color3.fromRGB(255,255,255),
                        Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 10,
                    }, row)
                    Corner(flyBtn, UDim.new(0, 6))
                    D.Shade(flyBtn, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
                    D.Tactile(flyBtn, 0.08)
                    cache[p] = { dist = distLbl, fly = flyBtn }   -- v4.34: lần sau chỉ cập nhật chữ, không dựng lại
                    flyBtn.Activated:Connect(function()
                        ReleaseHubFocus()
                        local mv2 = S.Move
                        if not mv2 then return end
                        local currentlyFlyingToThis = mv2._playerFlyActive and mv2._playerFlyTarget == p
                        if currentlyFlyingToThis then
                            pcall(function() mv2.StopPlayerFly() end)
                        else
                            pcall(function() mv2.FlyToPlayer(p) end)
                        end
                        if S.SyncMovePanel then pcall(S.SyncMovePanel) end
                        if D.hubStatus then
                            if mv2._playerFlyActive then
                                flash(D.hubStatus, "🚀 Bay tới " .. tostring(p.Name) .. " " .. tostring(mv2.GetPlayerFlySpeed and mv2.GetPlayerFlySpeed() or mv2.playerFlySpeed or 0), 1.8, C.ACCENT)
                            else
                                flash(D.hubStatus, "⏹️ Đã dừng bay tới " .. tostring(p.Name), 1.2, C.GRAY)
                            end
                        end
                        if LOC.RefreshList then pcall(LOC.RefreshList) end
                        S.Rebuild()
                    end)
            end
            pcall(function() list.CanvasSize = UDim2.new(0, 0, 0, order * 32) end)
        else
            local mv = S.Move
            for _, p in ipairs(want) do
                local r = cache[p]
                if r then
                    local d2 = LOC.Dist(p)
                    if r.dist then r.dist.Text = d2 and string.format("📏 %dm", locRound(d2)) or "📏 --m" end
                    if r.fly then
                        local flying = mv and mv._playerFlyActive and mv._playerFlyTarget == p
                        r.fly.Text = flying and "⏹️ Dừng" or "🚀 Bay tới"
                        r.fly.BackgroundColor3 = flying and C.RED or C.ACCENT
                    end
                end
            end
        end
        paint()
    end

    allBtn.Activated:Connect(function()
        ReleaseHubFocus()
        LOC.Set(not LOC.on)
        paint()
        if LOC.RefreshList then LOC.RefreshList() end
        S.Rebuild()
        if D.hubStatus then flash(D.hubStatus, "📍 " .. LOC.Status(), 1.8, C.ACCENT) end
    end)
    soloBtn.Activated:Connect(function()
        ReleaseHubFocus()
        if LOC.solo then
            LOC.SetSolo(false)
        else
            LOC.SetTarget(LOC.target or LOC.Nearest())
        end
        paint()
        if LOC.RefreshList then LOC.RefreshList() end
        S.Rebuild()
        if D.hubStatus then flash(D.hubStatus, "🎯 " .. LOC.Status(), 1.8, C.ACCENT) end
    end)
    stopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        LOC.StopAll()
        paint()
        if LOC.RefreshList then LOC.RefreshList() end
        S.Rebuild()
        if D.hubStatus then flash(D.hubStatus, "🚫 " .. LOC.Status(), 1.8, C.ACCENT) end
    end)
    distIn.FocusLost:Connect(function()
        ReleaseHubFocus()
        local n = tonumber(tostring(distIn.Text or ""):match("%-?%d+%.?%d*")) or 0
        LOC.SetMaxDist(n)
        distIn.Text = tostring(LOC.maxDist)
        if D.hubStatus then
            flash(D.hubStatus, (LOC.maxDist > 0 and string.format("📏 chỉ hiện người trong %dm", locRound(LOC.maxDist))
                 or "📏 không giới hạn khoảng cách"), 1.8, C.ACCENT)
        end
    end)
    flySpeedApply.Activated:Connect(function()
        ReleaseHubFocus()
        local mv = S.Move
        if not mv then return end
        local n = tonumber(tostring(flySpeedIn.Text or ""):match("%-?%d+%.?%d*"))
        if n == nil then
            if D.hubStatus then flash(D.hubStatus, "⚠️ Nhập số 0-500 (0=auto)", 1.5, C.RED) end
            return
        end
        local ok, msg = mv.SetPlayerFlySpeed(n)
        if not ok and D.hubStatus then
            flash(D.hubStatus, "⚠️ " .. tostring(msg), 1.5, C.RED)
        else
            paint()
            if D.hubStatus then
                local sp = mv.GetPlayerFlySpeed and mv.GetPlayerFlySpeed() or mv.playerFlySpeed or 0
                if (tonumber(mv.playerFlySpeed) or 0) == 0 then
                    flash(D.hubStatus, string.format("🚀 Tốc độ bay tới người: auto (%g = tốc độ game)", sp), 1.8, C.ACCENT)
                else
                    flash(D.hubStatus, string.format("🚀 Tốc độ bay tới người: %g", sp), 1.5, C.GREEN)
                end
            end
            if S.SyncMovePanel then pcall(S.SyncMovePanel) end
            S.Rebuild()
        end
    end)
    flySpeedIn.FocusLost:Connect(function(enter)
        if not enter then return end
        ReleaseHubFocus()
        local mv = S.Move
        if not mv then return end
        local n = tonumber(tostring(flySpeedIn.Text or ""):match("%-?%d+%.?%d*"))
        if n == nil then return end
        local ok = mv.SetPlayerFlySpeed(n)
        if ok then
            paint()
            S.Rebuild()
        end
    end)
    flyNearBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local mv = S.Move
        if not mv then return end
        local target = LOC.Nearest()
        if not target then
            if D.hubStatus then flash(D.hubStatus, "⚠️ Không có người chơi nào để bay tới", 1.5, C.RED) end
            return
        end
        pcall(function() mv.FlyToPlayer(target) end)
        paint()
        if LOC.RefreshList then pcall(LOC.RefreshList) end
        if S.SyncMovePanel then pcall(S.SyncMovePanel) end
        S.Rebuild()
        if D.hubStatus then flash(D.hubStatus, "🚀 Bay tới gần nhất: " .. tostring(target.Name), 1.8, C.ACCENT) end
    end)
    flyStopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local mv = S.Move
        if mv then pcall(function() mv.StopPlayerFly() end) end
        paint()
        if LOC.RefreshList then pcall(LOC.RefreshList) end
        if S.SyncMovePanel then pcall(S.SyncMovePanel) end
        S.Rebuild()
        if D.hubStatus then flash(D.hubStatus, "⏹️ Đã dừng bay tới người", 1.2, C.GRAY) end
    end)

    if LOC.RefreshList then pcall(LOC.RefreshList) end
    S.SyncLocPanel = function()
        paint()
        distIn.Text = tostring(LOC.maxDist)
        local mv = S.Move
        if mv then
            flySpeedIn.Text = tostring(mv.playerFlySpeed or 0)
        end
        if LOC.RefreshList then pcall(LOC.RefreshList) end
    end
end

S.Spec = {
    on = false, target = nil,       -- 👣 đang xem ai
    auto = true,                    -- người đang xem thoát thì tự chuyển sang người gần nhất
    follow = true, dist = 12, height = 3.2,
    moving = false, jumping = false, falling = false, speed = 0, act = "",
    lastMove = 0, lastJump = 0, lastFall = 0,
    _prev = nil, _oldType = nil, _oldSubject = nil, _bound = false, _ui = {},
}
local SP = S.Spec
local function spRound(n) return math.floor((tonumber(n) or 0) + 0.5) end

function S.Spec.CamOn()
    local cam = workspace.CurrentCamera
    if not cam then return end
    if SP._oldType == nil then
        pcall(function()
            local ct = cam.CameraType
            if ct ~= Enum.CameraType.Scriptable then
                SP._oldType = ct
            else
                SP._oldType = Enum.CameraType.Custom
            end
        end)
    end
    if SP._oldSubject == nil then
        pcall(function() SP._oldSubject = cam.CameraSubject end)
    end
    if SP._oldType then _G.BananaCatHub_SpecCam = SP._oldType end
    pcall(function() cam.CameraType = Enum.CameraType.Scriptable end)
end
function S.Spec.CamOff()
    local cam = workspace.CurrentCamera
    pcall(function()
        if cam then
            if SP._oldType and SP._oldType ~= Enum.CameraType.Scriptable then
                cam.CameraType = SP._oldType
            else
                cam.CameraType = Enum.CameraType.Custom
            end
        end
    end)
    pcall(function()
        if not cam then return end
        local char = player and player.Character
        local hum = char and char:FindFirstChildOfClass("Humanoid")
        local root = char and char:FindFirstChild("HumanoidRootPart")
        if hum then
            cam.CameraSubject = hum
        elseif SP._oldSubject then
            pcall(function() cam.CameraSubject = SP._oldSubject end)
        end
        if root then
            local pos = root.Position
            cam.CFrame = CFrame.new(pos + Vector3.new(0, 3.2, 12), pos + Vector3.new(0, 1.5, 0))
            cam.Focus = CFrame.new(pos)
        end
    end)
    SP._oldType = nil
    SP._oldSubject = nil
    _G.BananaCatHub_SpecCam = nil
end
function S.Spec.Acting(p)
    if not p or not SP.on then return "—" end
    local c, r, h = S.Loc.CharOf(p)
    if not c then return "⏳ đang chờ nhân vật (đang hồi sinh?)" end
    if S.Loc.IsDown(h) then
        local t = S.Loc.DownSecs(p)
        return "☠️ đang BỊ HẠ GỤC" .. (t > 0 and (" (⏱ " .. string.format("%02d:%02d", math.floor(t / 60), math.floor(t % 60)) .. ")") or "")
    end
    if h and h.Sit == true then return "🪑 đang NGỒI" end
    if SP.jumping then return "🦘 đang NHẢY" end
    if SP.falling then return "🪂 đang RƠI" end
    local sp = tonumber(SP.speed) or 0
    if sp > 0.6 then
        local base = (h and tonumber(h.WalkSpeed)) or 16
        if sp >= base * 1.25 then return "🏃 đang CHẠY NHANH (" .. spRound(sp) .. " m/s)"
        elseif sp >= base * 0.6 then return "🚶 đang CHẠY (" .. spRound(sp) .. " m/s)"
        else return "🐌 đang đi CHẬM (" .. spRound(sp) .. " m/s)" end
    end
    return "🧍 đang ĐỨNG YÊN"
end
function S.Spec.Step(dt)
    if not (SP.on and SP.target) then return end
    local p = SP.target
    if p.Parent == nil then
        SP.target = nil
        if SP.auto then
            local n = S.Loc.Nearest()
            if n then pcall(function() S.Spec.Set(n) end) end
        end
        if not SP.target then pcall(function() S.Spec.Stop() end) end
        pcall(function() if S.Spec.RefreshList then S.Spec.RefreshList() end end)
        return
    end
    local c, r = S.Loc.CharOf(p)
    if not c or not r then
        if SP.auto then
            local n = S.Loc.Nearest()
            if n and n ~= p and S.Loc.CharOf(n) then
                SP.target = n
                SP._prev = nil
                SP.lastMove, SP.lastJump, SP.lastFall = 0, 0, 0
                S.Spec.RefreshList()
            end
        end
        SP.moving, SP.jumping, SP.falling, SP.speed = false, false, false, 0
        S.Loc.NoteDown(p, false)
        S.Spec.Sync()
        return
    end
    S.Loc.NoteDown(p, S.Loc.IsDown(c:FindFirstChildOfClass("Humanoid")))
    local pos = r.Position
    local now = tick()
    local pv = SP._prev
    if pv and pv.p == p then
        local d = math.max(now - pv.t, 0.001)
        local dx, dz = pos.X - pv.x, pos.Z - pv.z
        local sp = math.sqrt(dx * dx + dz * dz) / d
        if sp > 0.6 then SP.lastMove = now; SP.speed = sp end
        local dy = pos.Y - pv.y
        if dy > 0.8 then SP.lastJump = now end
        if dy < -0.8 then SP.lastFall = now end
    end
    SP.moving = (SP.lastMove > 0) and (now - SP.lastMove < 0.5) or false
    SP.jumping = (SP.lastJump > 0) and (now - SP.lastJump < 0.9) or false
    SP.falling = (SP.lastFall > 0) and (now - SP.lastFall < 0.6) or false
    if not SP.moving then SP.speed = 0 end
    SP._prev = { p = p, t = now, x = pos.X, y = pos.Y, z = pos.Z }
    if SP.follow then
        local cam = workspace.CurrentCamera
        if cam then
            local look = r.CFrame.LookVector
            local want = pos - look * SP.dist + Vector3.new(0, SP.height, 0)
            cam.CFrame = CFrame.lookAt(want, pos + Vector3.new(0, 1.5, 0))   -- v4.34: ghi thẳng
        end
    end
    SP._acc = (SP._acc or 0) + (tonumber(dt) or 0.016)
    if SP._acc >= 0.25 then
        SP._acc = 0
        S.Spec.Sync()
        if SP.follow then
            local cam = workspace.CurrentCamera
            if cam and cam.CameraType ~= Enum.CameraType.Scriptable then
                pcall(function() cam.CameraType = Enum.CameraType.Scriptable end)
            end
        end
    end
end
function S.Spec.Bind(on)
    if on and not SP._bound then
        SP._bound = true
        pcall(function()
            RunService:BindToRenderStep("BC_Spec", Enum.RenderPriority.Camera.Value - 3, function(dt)
                pcall(S.Spec.Step, dt)
            end)
        end)
    elseif (not on) and SP._bound then
        SP._bound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_Spec") end)
    end
end
function S.Spec.Set(p)
    if p == nil or p == player or p.Parent == nil then
        SP.on = false; SP.target = nil; SP._prev = nil
        SP.moving, SP.jumping, SP.falling, SP.speed = false, false, false, 0
        SP.lastMove, SP.lastJump, SP.lastFall = 0, 0, 0
        S.Spec.Bind(false)
        S.Spec.CamOff()
        S.Spec.Sync()
        return false
    end
    SP.target, SP.on, SP._prev = p, true, nil
    SP.lastMove, SP.lastJump, SP.lastFall = 0, 0, 0
    SP.moving, SP.jumping, SP.falling, SP.speed = false, false, false, 0
    S.Spec.Bind(true)
    if SP.follow then S.Spec.CamOn() end
    S.Spec.Sync()
    return true
end
function S.Spec.Stop() return S.Spec.Set(nil) end
function S.Spec.SetFollow(on)
    SP.follow = (on == true)
    if SP.follow and SP.on then S.Spec.CamOn() else S.Spec.CamOff() end
    S.Spec.Sync()
    return SP.follow
end
function S.Spec.SetAuto(on) SP.auto = (on == true); S.Spec.Sync(); return SP.auto end
function S.Spec.SetDist(n) SP.dist = mvClamp(n, 3, 200); S.Spec.Sync(); return SP.dist end
function S.Spec.SetHeight(n) SP.height = mvClamp(n, -30, 60); S.Spec.Sync(); return SP.height end
function S.Spec.Status()
    if not (SP.on and SP.target) then return "👣 xem người chơi: đang TẮT (camera của bạn bình thường)" end
    return "👣 đang xem " .. tostring(SP.target.Name) .. " — " .. S.Spec.Acting(SP.target)
end
do
    trackConn(Players.PlayerRemoving:Connect(function(p)
        if SP.target == p then
            SP.target = nil
            if SP.on and SP.auto then
                local n = S.Loc.Nearest()
                if n then pcall(function() S.Spec.Set(n) end) end
            end
            if not SP.target then pcall(function() S.Spec.Stop() end) end
            pcall(function() S.Spec.RefreshList() end)
        end
    end))
    trackConn(player.CharacterAdded:Connect(function()
        task.spawn(function()
            task.wait(0.5)
            if not SP.on then
                pcall(function() S.Spec.CamOff() end)
                pcall(function()
                    local cam = workspace.CurrentCamera
                    local char = player.Character
                    local hum = char and char:FindFirstChildOfClass("Humanoid")
                    if cam and hum then
                        cam.CameraSubject = hum
                        cam.CameraType = Enum.CameraType.Custom
                    end
                end)
            else
                pcall(function() S.Spec.CamOn() end)
            end
            pcall(function() if S.Spec.RefreshList then S.Spec.RefreshList() end end)
        end)
    end))
    pcall(function()
        trackConn(workspace:GetPropertyChangedSignal("CurrentCamera"):Connect(function()
            task.spawn(function()
                task.wait(0.1)
                if SP.on and SP.follow then
                    pcall(function() S.Spec.CamOn() end)
                end
            end)
        end))
    end)
end

-- ---------- BẢNG NỔI 👣 (hiện trên màn hình game, menu đóng vẫn thấy) ----------
do
    local g = New("ScreenGui", {
        Name = "BC_SpecHud", ResetOnSpawn = false,
        ZIndexBehavior = Enum.ZIndexBehavior.Sibling, Enabled = false,
    }, gui)
    local F = New("Frame", {
        Name = "SpecBox", Size = UDim2.new(0, 250, 0, 92), Position = UDim2.new(0, 10, 0, 10),
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 20,
    }, g)
    Corner(F, UDim.new(0, 10))
    Stroke(F, C.ACCENT, 1.2)
    D.Shade(F, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)
    SP._ui.gui = g
    SP._ui.title = New("TextLabel", {
        Name = "title",
        Size = UDim2.new(1, -46, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "👣 ĐANG XEM", BackgroundTransparency = 1, TextColor3 = C.ACCENT,
        Font = Enum.Font.GothamBold, TextSize = 10, TextXAlignment = Enum.TextXAlignment.Left,
        ZIndex = 21,
    }, F)
    SP._ui.who = New("TextLabel", {
        Name = "who",
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 19),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.DARK,
        Font = Enum.Font.GothamBold, TextSize = 11, TextXAlignment = Enum.TextXAlignment.Left,
        TextTruncate = Enum.TextTruncate.AtEnd, ZIndex = 21,
    }, F)
    SP._ui.info = New("TextLabel", {
        Name = "info",
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 37),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left,
        ZIndex = 21,
    }, F)
    SP._ui.act = New("TextLabel", {
        Name = "act",
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 52),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.GREEN,
        Font = Enum.Font.GothamBold, TextSize = 11, TextXAlignment = Enum.TextXAlignment.Left,
        TextTruncate = Enum.TextTruncate.AtEnd, ZIndex = 21,
    }, F)
    local stopBtn = New("TextButton", {
        Name = "stopBtn",
        Size = UDim2.new(0, 30, 0, 20), Position = UDim2.new(1, -38, 0, 4),
        Text = "🚫", BackgroundColor3 = C.RED, TextColor3 = D.BestText(C.RED),
        Font = Enum.Font.GothamBold, TextSize = 11, BorderSizePixel = 0, ZIndex = 22,
    }, F)
    Corner(stopBtn, UDim.new(0, 7))
    D.Tactile(stopBtn, 0.1)
    stopBtn.Activated:Connect(function()
        pcall(function() S.Spec.Stop() end)
        pcall(function() S.Spec.RefreshList() end)
        pcall(S.Rebuild)
    end)
    local followBtnHud = New("TextButton", {
        Name = "followBtn",
        Size = UDim2.new(0, 46, 0, 20), Position = UDim2.new(1, -88, 0, 4),
        Text = "🎥 Bám", BackgroundColor3 = C.GREEN, TextColor3 = D.BestText(C.GREEN),
        Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 22,
    }, F)
    Corner(followBtnHud, UDim.new(0, 7))
    D.Tactile(followBtnHud, 0.1)
    followBtnHud.Activated:Connect(function()
        pcall(function() S.Spec.SetFollow(not SP.follow) end)
        pcall(function() S.Spec.RefreshList() end)
    end)
    SP._ui.followBtn = followBtnHud
    SP._ui.note = New("TextLabel", {
        Name = "note",
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 70),
        Text = "💡 bấm 🚫 để trả camera về cho bạn", BackgroundTransparency = 1, TextColor3 = C.GRAY,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        ZIndex = 21,
    }, F)
end
function S.Spec.Sync()
    local u = SP._ui
    if not u then return end
    local on = (SP.on and SP.target ~= nil)
    pcall(function() if u.gui then u.gui.Enabled = on end end)
    if not on then return end
    pcall(function()
        if u.followBtn then
            u.followBtn.Text = SP.follow and "🎥 Bám" or "🎥 Thôi"
            u.followBtn.BackgroundColor3 = SP.follow and C.GREEN or C.SURFACE3
            u.followBtn.TextColor3 = D.BestText(u.followBtn.BackgroundColor3)
        end
    end)
    local p = SP.target
    local c, r, h = S.Loc.CharOf(p)
    local fr = S.Loc.IsFriend(p)
    local nm = tostring(p.Name) .. (fr and "  💗 Bạn Bè" or "")
    local dist = S.Loc.Dist(p)
    local lines = {}
    if h then lines[#lines + 1] = string.format("❤️ %d/%d", spRound(h.Health or 0), spRound(h.MaxHealth or 100)) end
    lines[#lines + 1] = dist and ("📏 " .. spRound(dist) .. "m") or "📏 --m"
    lines[#lines + 1] = "💨 " .. spRound(SP.speed) .. " m/s"
    pcall(function()
        if u.who then u.who.Text = "👣 " .. nm end
        if u.info then u.info.Text = table.concat(lines, "   ") end
        if u.act then
            local txt = S.Spec.Acting(p)
            u.act.Text = txt
            u.act.TextColor3 = S.Loc.IsDown(h) and Color3.fromRGB(255, 100, 100) or C.GREEN
        end
        if u.title then
            u.title.Text = "👣 ĐANG XEM" .. (SP.follow and "" or " (KHÔNG bám)") .. (SP.auto and " · 🔄" or "")
        end
    end)
end

-- ---------- 🎥 KHÁN GIẢ (v4.64) ----------
S.Free = {
    on = false, speed = 50,
    _bound = false, _cf = nil, _wasAnchored = nil, _hrp = nil,
    _camType = nil, _camSub = nil, _yaw = 0, _pitch = 0,
    _mdx = 0, _mdy = 0, _step = nil, _mouse = nil, _pos = nil, _mouseBeh = nil,
}
local FR = S.Free
function S.Free.Char() return player and player.Character or nil end
function S.Free.HRP(ch)
    ch = ch or S.Free.Char()
    return ch and ch:FindFirstChild("HumanoidRootPart")
end
function S.Free.HoldChar()
    -- Nhân vật ĐỨNG YÊN. Không cướp bay / đứng nền / xuyên tường.
    if not FR.on then return end
    local hrp = S.Free.HRP()
    if not hrp then return end
    if FR._hrp ~= hrp then
        FR._hrp = hrp
        FR._wasAnchored = hrp.Anchored
        FR._cf = hrp.CFrame
    end
    if not FR._cf then FR._cf = hrp.CFrame end
    hrp.Anchored = true
    hrp.CFrame = FR._cf
end
function S.Free.ReleaseChar()
    local hrp = FR._hrp or S.Free.HRP()
    if hrp and hrp.Parent then
        pcall(function()
            hrp.Anchored = (FR._wasAnchored == true)
            if FR._cf then hrp.CFrame = FR._cf end
        end)
    end
    FR._hrp, FR._wasAnchored, FR._cf = nil, nil, nil
end
function S.Free.AimCam()
    -- Lỗi: Scriptable tắt chuột game; InputChanged.Delta = 0 nếu không LockCenter → không quay được.
    local cam = workspace.CurrentCamera
    if not cam then return end
    if FR._camType == nil then FR._camType = cam.CameraType end
    if FR._camSub == nil then FR._camSub = cam.CameraSubject end
    cam.CameraType = Enum.CameraType.Scriptable
    pcall(function() cam.CameraSubject = nil end)
    pcall(function()
        if FR._mouseBeh == nil then FR._mouseBeh = UserInputService.MouseBehavior end
        if UserInputService:GetFocusedTextBox() then
            UserInputService.MouseBehavior = Enum.MouseBehavior.Default
            return
        end
        UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter
        local d = UserInputService:GetMouseDelta()
        if d then
            FR._mdx = (FR._mdx or 0) + d.X
            FR._mdy = (FR._mdy or 0) + d.Y
        end
    end)
end
function S.Free.RestoreCam()
    local cam = workspace.CurrentCamera
    FR._yaw, FR._pitch, FR._mdx, FR._mdy = 0, 0, 0, 0
    pcall(function()
        UserInputService.MouseBehavior = FR._mouseBeh or Enum.MouseBehavior.Default
    end)
    FR._mouseBeh = nil
    if not cam then FR._camType, FR._camSub, FR._pos = nil, nil, nil return end
    local t = FR._camType
    pcall(function()
        if t and t ~= Enum.CameraType.Scriptable then
            cam.CameraType = t
        else
            cam.CameraType = Enum.CameraType.Custom
        end
    end)
    local ch = S.Free.Char()
    local hum = ch and ch:FindFirstChildOfClass("Humanoid")
    local sub = hum or FR._camSub
    if sub then pcall(function() cam.CameraSubject = sub end) end
    FR._camType, FR._camSub, FR._pos = nil, nil, nil
end
function S.Free.Look()
    local yaw = FR._yaw or 0
    local pitch = FR._pitch or 0
    yaw = yaw - (FR._mdx or 0) * 0.004
    pitch = pitch - (FR._mdy or 0) * 0.004
    if pitch > 1.4 then pitch = 1.4 elseif pitch < -1.4 then pitch = -1.4 end
    FR._mdx, FR._mdy = 0, 0
    FR._yaw, FR._pitch = yaw, pitch
    return CFrame.Angles(0, yaw, 0) * CFrame.Angles(pitch, 0, 0)
end
function S.Free.Step(dt)
    -- Lỗi: lấy vị trí camera đã bị Popper + Camera+1 → không xuyên tường.
    -- Sửa: FR._pos tự lưu; Scriptable mỗi frame; ghi lúc Last.
    if not FR.on then return end
    S.Free.HoldChar()
    local cam = workspace.CurrentCamera
    if not cam then return end
    S.Free.AimCam()
    dt = tonumber(dt) or 0.016
    if dt < 0 then dt = 0 end
    if dt > 0.1 then dt = 0.1 end
    local look = S.Free.Look()
    local pos = FR._pos
    if not pos then return end
    local ch = S.Free.Char()
    local hum = ch and ch:FindFirstChildOfClass("Humanoid")
    local cf = CFrame.new(pos) * look
    local input = Vector3.zero
    pcall(function()
        input = MV._ReadFlyInput(cf, hum)
    end)
    local vel = MV.FlyVelocity(cf, input, FR.speed)
    pos = pos + vel * dt
    FR._pos = pos
    cam.CFrame = CFrame.new(pos) * look
end
function S.Free.Bind(on)
    if on and not FR._bound then
        FR._bound = true
        pcall(function()
            RunService:BindToRenderStep("BC_FreeCam", Enum.RenderPriority.Last.Value, function(dt)
                pcall(S.Free.Step, dt)
            end)
        end)
        if not FR._step then
            FR._step = RunService.Stepped:Connect(function()
                if FR.on then pcall(S.Free.HoldChar) end
            end)
        end
    elseif (not on) and FR._bound then
        FR._bound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_FreeCam") end)
        pcall(function() if FR._step then FR._step:Disconnect() end end)
        FR._step, FR._mouse = nil, nil
    end
end
function S.Free.Set(on)
    on = (on == true)
    if on then
        if S.Spec and S.Spec.on then pcall(function() S.Spec.Stop() end) end
        local cam = workspace.CurrentCamera
        if cam then
            local look = cam.CFrame.LookVector
            local y = look.Y
            if y > 1 then y = 1 elseif y < -1 then y = -1 end
            FR._yaw = math.atan2(-look.X, -look.Z)
            FR._pitch = math.asin(y)
            FR._mdx, FR._mdy = 0, 0
            FR._pos = cam.CFrame.Position
        end
        FR.on = true
        S.Free.HoldChar()
        S.Free.AimCam()
        S.Free.Bind(true)
        S.Free.Step(0)
    else
        FR.on = false
        S.Free.Bind(false)
        S.Free.ReleaseChar()
        S.Free.RestoreCam()
    end
    if S.SyncFreePanel then pcall(S.SyncFreePanel) end
    return FR.on
end
function S.Free.Stop() return S.Free.Set(false) end
function S.Free.SetSpeed(n)
    n = tonumber(n)
    if not n or n ~= n or n == math.huge or n == -math.huge then return false, FR.speed end
    FR.speed = mvClamp(n, 1, 2000, 50)
    if S.SyncFreePanel then pcall(S.SyncFreePanel) end
    return true, FR.speed
end
function S.Free.Status()
    if not FR.on then return "🎥 khán giả: đang TẮT · nhân vật đi bình thường" end
    return string.format("🎥 khán giả: BẬT · camera bay (WASD · Space/Shift) · nhân vật đứng yên · 💨 %g", FR.speed)
end
do
    trackConn(player.CharacterAdded:Connect(function()
        FR._hrp, FR._wasAnchored, FR._cf = nil, nil, nil
        if not FR.on then return end
        task.defer(function()
            if FR.on then S.Free.HoldChar() end
        end)
    end))
end
_G.BananaCatHub_Free = S.Free
-- ---------- HẾT 🎥 KHÁN GIẢ ----------

S.Glow = {
    on = false, width = 18, bright = 3,
    color = Color3.fromRGB(120, 220, 255),
    thru = true,          -- 👁 xuyên tường (mặc định BẬT — đúng ý "ánh sáng không bị trói")
    light = true,         -- 💡 đèn thật toả sáng quanh người
    _hl = nil, _pl = nil, _char = nil, _bound = false, _acc = 0, palIdx = 1,
}
local GL = S.Glow
local function glowRound(n) return math.floor((tonumber(n) or 0) + 0.5) end
GL.palette = {
    { name = "Xanh băng", c = Color3.fromRGB(120, 220, 255) },
    { name = "Xanh lá",  c = Color3.fromRGB(80, 255, 140) },
    { name = "Hồng",     c = Color3.fromRGB(255, 120, 210) },
    { name = "Vàng",     c = Color3.fromRGB(255, 220, 90) },
    { name = "Đỏ",       c = Color3.fromRGB(255, 80, 80) },
    { name = "Tím",      c = Color3.fromRGB(170, 120, 255) },
    { name = "Trắng",    c = Color3.fromRGB(255, 255, 255) },
}
function S.Glow.FillT() return mvClamp(0.94 - (tonumber(GL.bright) or 0) * 0.088, 0, 1, 1) end
function S.Glow.EdgeT() return mvClamp(0.60 - (tonumber(GL.bright) or 0) * 0.058, 0, 1, 1) end
function S.Glow.Char() return player and player.Character or nil end
function S.Glow.Kill()
    pcall(function() if GL._hl then GL._hl:Destroy() end end)
    pcall(function() if GL._pl then GL._pl:Destroy() end end)
    GL._hl, GL._pl, GL._char = nil, nil, nil
end
function S.Glow.Apply()
    if not GL.on then return end
    local ch = S.Glow.Char()
    if not ch then return end
    if GL._char ~= ch then S.Glow.Kill(); GL._char = ch end          -- respawn -> nhân vật mới
    local hrp = ch:FindFirstChild("HumanoidRootPart") or ch:FindFirstChildOfClass("BasePart")
    local mode = GL.thru and Enum.HighlightDepthMode.AlwaysOnTop or Enum.HighlightDepthMode.Occluded
    local host = (gui and gui.Parent and gui) or targetGui or playerGui
    if not host then return end
    if not (GL._hl and GL._hl.Parent) then                            -- bị game xoá -> dựng lại
        GL._hl = New("Highlight", {
            Name = "BC_GlowHL", Adornee = ch,
            FillColor = GL.color, OutlineColor = GL.color,
            FillTransparency = S.Glow.FillT(), OutlineTransparency = S.Glow.EdgeT(),
            DepthMode = mode,
        }, host)
    end
    pcall(function()
        if GL._hl.Parent ~= host then GL._hl.Parent = host end
        GL._hl.Adornee = ch
        GL._hl.FillColor = GL.color
        GL._hl.OutlineColor = GL.color
        GL._hl.FillTransparency = S.Glow.FillT()
        GL._hl.OutlineTransparency = S.Glow.EdgeT()
        GL._hl.DepthMode = mode
    end)
    if GL.light and hrp then
        if not (GL._pl and GL._pl.Parent) then                        -- bị xoá -> dựng lại
            GL._pl = New("PointLight", {
                Name = "BC_GlowLight", Brightness = GL.bright, Range = GL.width,
                Color = GL.color, Shadows = false,
            }, hrp)
        end
        pcall(function()
            GL._pl.Brightness = GL.bright
            GL._pl.Range = GL.width
            GL._pl.Color = GL.color
            GL._pl.Shadows = false                                     -- không bị vật cản chặn
            if GL._pl.Parent ~= hrp then GL._pl.Parent = hrp end
        end)
    elseif not GL.light then
        pcall(function() if GL._pl then GL._pl:Destroy() end end)
        GL._pl = nil
    end
end
function S.Glow.Bind(on)
    if on and not GL._bound then
        GL._bound = true
        pcall(function()
            RunService:BindToRenderStep("BC_Glow", Enum.RenderPriority.Camera.Value - 5, function(dt)
                GL._acc = (GL._acc or 0) + (tonumber(dt) or 0.016)
                if GL._acc < 0.5 then return end      -- 2 lần/giây là đủ để canh, không tốn gì
                GL._acc = 0
                pcall(S.Glow.Apply)
            end)
        end)
    elseif (not on) and GL._bound then
        GL._bound = false
        pcall(function() RunService:UnbindFromRenderStep("BC_Glow") end)
    end
end
function S.Glow.Set(on)
    GL.on = (on == true)
    if GL.on then S.Glow.Bind(true); S.Glow.Apply() else S.Glow.Kill(); S.Glow.Bind(false) end
    return GL.on
end
function S.Glow.SetWidth(n)  GL.width  = mvClamp(n, 1, 200, GL.width);  S.Glow.Apply(); return GL.width  end
function S.Glow.SetBright(n) GL.bright = mvClamp(n, 0, 10, GL.bright); S.Glow.Apply(); return GL.bright end
function S.Glow.SetThru(b)   GL.thru   = (b == true); S.Glow.Apply(); return GL.thru end
function S.Glow.SetLight(b)  GL.light  = (b == true); S.Glow.Apply(); return GL.light end
function S.Glow.SetColor(c)
    if typeof(c) == "Color3" then
        GL.color = c
    elseif type(c) == "number" and GL.palette[c] then
        GL.palIdx = c
        GL.color = GL.palette[c].c
    end
    S.Glow.Apply()
    return GL.color
end
function S.Glow.CycleColor()
    local n = #GL.palette
    GL.palIdx = ((GL.palIdx or 1) % n) + 1
    GL.color = GL.palette[GL.palIdx].c
    S.Glow.Apply()
    return GL.palette[GL.palIdx].name
end
function S.Glow.Stop() return S.Glow.Set(false) end
function S.Glow.ColorName()
    for _, p in ipairs(GL.palette) do
        if p.c == GL.color then return p.name end
    end
    return "tự chọn"
end
function S.Glow.Status()
    if not GL.on then return "✨ phát sáng: đang TẮT" end
    local t = { string.format("📏 rộng %g", GL.width), string.format("☀ sáng %g", GL.bright),
                "🎨 " .. S.Glow.ColorName() }
    if GL.thru then t[#t + 1] = "👁 xuyên tường" end
    if GL.light then t[#t + 1] = "💡 đèn thật" end
    return "✨ phát sáng: BẬT · " .. table.concat(t, " · ")
end
do
    trackConn(player.CharacterAdded:Connect(function()
        if GL.on then pcall(S.Glow.Apply) end
    end))
end

-- ---------- KHUNG ✨ PHÁT SÁNG (trên cùng danh sách thẻ trong 📚 Script Hub) ----------
do
    local PH = 132
    local P = New("Frame", {
        Name = "HubGlow_Panel",
        Size = UDim2.new(1, 0, 0, PH), LayoutOrder = 1,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Name = "GlowTitle",
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "✨ PHÁT SÁNG (nhân vật của MÌNH)", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local function act(txt, x, y, w, color, name)
        local b = New("TextButton", {
            Name = name or "GlowBtn",
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end
    local function lab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end
    local function box(x, y, w, val)
        local b = New("TextBox", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = tostring(val), ClearTextOnFocus = false,
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
            PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
        }, P)
        Corner(b, UDim.new(0, 6))
        return b
    end

    local onBtn   = act("✨ BẬT", 8, 22, 92, C.GRAY, "GlowOn")
    local thruBtn = act("👁 Xuyên tường: BẬT", 106, 22, 112, C.GREEN, "GlowThru")
    local litBtn  = act("💡 Đèn thật: BẬT", 224, 22, 104, C.GREEN, "GlowLight")

    lab("📏 Rộng", 8, 48, 44)
    local wIn = box(52, 48, 46, 18)
    lab("☀ Sáng", 106, 48, 44)
    local bIn = box(150, 48, 46, 3)
    local colBtn = act("🎨 Đổi màu", 204, 48, 124, C.PURPLE, "GlowColor")

    local applyBtn = act("✔ Áp dụng", 8, 74, 84, C.SURFACE3, "GlowApply")
    local stopBtn  = act("🚫 Tắt", 98, 74, 70, C.RED, "GlowStop")
    local statusLbl = New("TextLabel", {
        Name = "GlowStatus",
        Size = UDim2.new(1, -188, 0, 20), Position = UDim2.new(0, 174, 0, 74),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextTruncate = Enum.TextTruncate.AtEnd, ZIndex = 7,
    }, P)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 30), Position = UDim2.new(0, 8, 0, 98),
        Text = "💡 📏 Rộng = bán kính toả sáng (1–200) · ☀ Sáng = độ sáng (0–10). "
             .. "👁 Xuyên tường = thấy mình sáng qua tường · 💡 Đèn thật = ánh sáng KHÔNG bị vật cản chặn. "
             .. "Bị game xoá hay respawn thì tự gắn lại; chỉ thêm hiệu ứng, KHÔNG đụng vào di chuyển.",
        TextWrapped = true, BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function paint()
        onBtn.Text = GL.on and "✨ TẮT" or "✨ BẬT"
        onBtn.BackgroundColor3 = GL.on and C.GREEN or C.GRAY
        onBtn.TextColor3 = D.BestText(onBtn.BackgroundColor3)
        thruBtn.Text = GL.thru and "👁 Xuyên tường: BẬT" or "👁 Xuyên tường: TẮT"
        thruBtn.BackgroundColor3 = GL.thru and C.GREEN or C.SURFACE3
        thruBtn.TextColor3 = D.BestText(thruBtn.BackgroundColor3)
        litBtn.Text = GL.light and "💡 Đèn thật: BẬT" or "💡 Đèn thật: TẮT"
        litBtn.BackgroundColor3 = GL.light and C.GREEN or C.SURFACE3
        litBtn.TextColor3 = D.BestText(litBtn.BackgroundColor3)
        wIn.Text, bIn.Text = tostring(GL.width), tostring(GL.bright)
        colBtn.Text = "🎨 " .. S.Glow.ColorName()
        statusLbl.Text = S.Glow.Status()
    end
    S.SyncGlowPanel = paint                     -- S.RebuildHubList gọi để nhãn luôn đúng
    S.Glow.RefreshPanel = paint

    onBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Glow.Set(not GL.on)
        paint()
        if D.hubStatus then flash(D.hubStatus, S.Glow.Status(), 2, C.ACCENT) end
        pcall(S.Rebuild)   -- đổi chữ thẻ ✨ trong danh sách
    end)
    thruBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Glow.SetThru(not GL.thru)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, GL.thru and "👁 xuyên tường: thấy mình sáng qua vật cản"
                 or "👁 chỉ sáng khi không bị vật cản che", 2, C.ACCENT)
        end
    end)
    litBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Glow.SetLight(not GL.light)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, GL.light and "💡 đèn thật: toả sáng quanh người, không bị vật cản chặn"
                 or "💡 đã tắt đèn (chỉ còn nhuộm sáng nhân vật)", 2, C.ACCENT)
        end
    end)
    colBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local nm = S.Glow.CycleColor()
        paint()
        if D.hubStatus then flash(D.hubStatus, "🎨 màu phát sáng: " .. nm, 1.8, C.ACCENT) end
    end)
    applyBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local w = tonumber(tostring(wIn.Text or ""):match("%-?%d+%.?%d*"))
        local b = tonumber(tostring(bIn.Text or ""):match("%-?%d+%.?%d*"))
        if w then S.Glow.SetWidth(w) end
        if b then S.Glow.SetBright(b) end
        if not GL.on then S.Glow.Set(true) end          -- áp dụng là bật luôn cho khỏi phải bấm 2 lần
        paint()
        if D.hubStatus then flash(D.hubStatus, S.Glow.Status(), 2, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    stopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Glow.Stop()
        paint()
        if D.hubStatus then flash(D.hubStatus, "🚫 " .. S.Glow.Status(), 1.8, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    paint()
end


-- ---------- v4.64: KHUNG 🎥 KHÁN GIẢ ----------
do
    local PH = 108
    local P = New("Frame", {
        Name = "HubFree_Panel",
        Size = UDim2.new(1, 0, 0, PH), LayoutOrder = 2,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Name = "FreeTitle",
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "🎥 KHÁN GIẢ (camera bay khắp nơi · nhân vật đứng yên)", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local function act(txt, x, y, w, color, name)
        local b = New("TextButton", {
            Name = name or "FreeBtn",
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end

    local onBtn = act("🎥 BẬT", 8, 22, 92, C.GRAY, "FreeOn")
    local stopBtn = act("🚫 Tắt", 106, 22, 70, C.RED, "FreeStop")
    local statusLbl = New("TextLabel", {
        Name = "FreeStatus",
        Size = UDim2.new(1, -192, 0, 20), Position = UDim2.new(0, 182, 0, 22),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextTruncate = Enum.TextTruncate.AtEnd, ZIndex = 7,
    }, P)

    New("TextLabel", {
        Size = UDim2.new(0, 36, 0, 20), Position = UDim2.new(0, 8, 0, 46),
        Text = "💨", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 9, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local spdIn = New("TextBox", {
        Size = UDim2.new(0, 52, 0, 20), Position = UDim2.new(0, 36, 0, 46),
        Text = tostring(FR.speed), ClearTextOnFocus = false,
        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
        PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(spdIn, UDim.new(0, 6))
    local applyBtn = act("✔ Áp dụng", 94, 46, 84, C.SURFACE3, "FreeApply")

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 32), Position = UDim2.new(0, 8, 0, 70),
        Text = "WASD + Space/Shift bay camera giống 🚀. Chuột xoay nhìn. Nhân vật đứng yên. Không FireServer. Không cướp bay/nhảy/🛡.",
        TextWrapped = true, BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function paint()
        onBtn.Text = FR.on and "🎥 TẮT" or "🎥 BẬT"
        onBtn.BackgroundColor3 = FR.on and C.GREEN or C.GRAY
        onBtn.TextColor3 = D.BestText(onBtn.BackgroundColor3)
        spdIn.Text = tostring(FR.speed)
        statusLbl.Text = S.Free.Status()
    end
    S.SyncFreePanel = paint
    S.Free.RefreshPanel = paint

    onBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Free.Set(not FR.on)
        paint()
        if D.hubStatus then flash(D.hubStatus, S.Free.Status(), 2, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    stopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Free.Stop()
        paint()
        if D.hubStatus then flash(D.hubStatus, "🚫 " .. S.Free.Status(), 1.8, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    applyBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local n = tonumber(tostring(spdIn.Text or ""):match("%-?%d+%.?%d*"))
        if n then S.Free.SetSpeed(n) end
        if not FR.on then S.Free.Set(true) end
        paint()
        if D.hubStatus then flash(D.hubStatus, S.Free.Status(), 2, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    paint()
end
-- ---------- HẾT KHUNG 🎥 KHÁN GIẢ ----------

-- ---------- KHUNG 🛡 BAY AN TOÀN (trên cùng danh sách thẻ, dưới ⚙ và ✨) ----------
do
    local PH = 200
    local P = New("Frame", {
        Name = "HubSafe_Panel",
        Size = UDim2.new(1, 0, 0, PH), LayoutOrder = 2,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.hubList)
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Name = "SafeTitle",
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "🛡 BAY AN TOÀN (tự bay + né vật có dấu hiệu chuyển động)", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local function act(txt, x, y, w, color, name)
        local b = New("TextButton", {
            Name = name or "SafeBtn",
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end
    local function lab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end
    local function box(x, y, w, val)
        local b = New("TextBox", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = tostring(val), ClearTextOnFocus = false,
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
            PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
        }, P)
        Corner(b, UDim.new(0, 6))
        return b
    end

    local onBtn = act("🛡 BẬT", 8, 22, 92, C.GRAY, "SafeOn")
    lab("📏 Né", 104, 22, 30)
    local radIn = box(132, 22, 44, 25)
    lab("💨 Bay", 180, 22, 36)
    local spdIn = box(216, 22, 44, 60)
    lab("🌀 Gắt", 264, 22, 32)
    local strIn = box(296, 22, 38, 4)

    local autoBtn  = act("➡ Tự bay: BẬT", 8, 48, 96, C.GREEN, "SafeAuto")
    local shBtn    = act("🔲 Khiên: BẬT", 108, 48, 82, C.GREEN, "SafeShield")
    local plBtn    = act("👤 Né người: BẬT", 194, 48, 92, C.GREEN, "SafePlayers")
    local ncBtn    = act("🧱 Xuyên: BẬT", 290, 48, 44, C.GREEN, "SafeNoclip")

    local ciBtn    = act("⭕ Vòng tròn: BẬT", 8, 74, 104, C.GREEN, "SafeCircle")
    lab("⭕ Bán kính", 116, 74, 48)
    local cirIn    = box(166, 74, 40, 20)
    lab("👁 Nhìn trước", 210, 74, 54)
    local lookIn   = box(266, 74, 34, 1)
    lab("giây", 302, 74, 30)

    local applyBtn = act("✔ Áp dụng", 8, 100, 84, C.SURFACE3, "SafeApply")
    local stopBtn  = act("🚫 Tắt", 98, 100, 50, C.RED, "SafeStop")
    lab("🔲 Cỡ", 154, 100, 32)
    local szIn = box(188, 100, 34, 0)
    lab("(0 = tự)", 224, 100, 40)
    local hudBtn = act("📱 Nút ảo: BẬT", 268, 100, 86, C.GREEN, "SafeHud")
    local statusLbl = New("TextLabel", {
        Name = "SafeStatus",
        Size = UDim2.new(1, -16, 0, 20), Position = UDim2.new(0, 8, 0, 124),
        Text = "", BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextWrapped = true,
        TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)
    New("TextLabel", {
        Name = "SafeNote",
        Size = UDim2.new(1, -16, 0, 48), Position = UDim2.new(0, 8, 0, 148),
        Text = "💡 🔲 Khiên = bức tường trong suốt hình vuông ÔM QUANH nhân vật (cỡ hợp lí; muốn to/nhỏ "
             .. "thì chỉnh ô 🔲 Cỡ — 0 = tự động. 📏 Né chỉ là khoảng cách né, không kéo giãn khiên) · "
             .. "👤 Né người = coi NGƯỜI CHƠI khác là mối nguy dù họ đứng yên · 🧱 Xuyên = tự bật Xuyên "
             .. "Tường để lực đẩy đưa bạn QUA vật cản, tắt 🛡 là trả lại như cũ. ⭕ Vòng tròn = khi KHÔNG "
             .. "có ai/vật nào đang lao tới mình thì tự bay vòng tròn quanh chỗ đang đứng (bán kính "
             .. "chỉnh ở ô ⭕), đang né hoặc đang bấm WASD/joystick ảo thì TẠM DỪNG, né xong tự bay vòng lại. "
             .. "👁 Nhìn trước = quét xa 📏 × 1,6 và bắt vật ĐANG LAO TỚI từ ngoài tầm. 📱 Nút ảo = joystick "
             .. "kéo + ⬆⬇ giữ để lên/xuống, hiện khi 🛡 BẬT. 🛡 tự sống qua respawn / hết trận sang trận mới.",

        BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextWrapped = true,
        TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function paint()
        onBtn.Text = MV.Safe.on and "🛡 TẮT" or "🛡 BẬT"
        onBtn.BackgroundColor3 = MV.Safe.on and C.GREEN or C.GRAY
        onBtn.TextColor3 = D.BestText(onBtn.BackgroundColor3)
        autoBtn.Text = MV.Safe.auto and "➡ Tự bay: BẬT" or "➡ Tự bay: TẮT"
        autoBtn.BackgroundColor3 = MV.Safe.auto and C.GREEN or C.SURFACE3
        autoBtn.TextColor3 = D.BestText(autoBtn.BackgroundColor3)
        shBtn.Text = MV.Safe.shield and "🔲 Khiên: BẬT" or "🔲 Khiên: TẮT"
        shBtn.BackgroundColor3 = MV.Safe.shield and C.GREEN or C.SURFACE3
        shBtn.TextColor3 = D.BestText(shBtn.BackgroundColor3)
        plBtn.Text = MV.Safe.avoidPlayers and "👤 Né người: BẬT" or "👤 Né người: TẮT"
        plBtn.BackgroundColor3 = MV.Safe.avoidPlayers and C.GREEN or C.SURFACE3
        plBtn.TextColor3 = D.BestText(plBtn.BackgroundColor3)
        ncBtn.Text = MV.Safe.noclip and "🧱 Xuyên: BẬT" or "🧱 Xuyên: TẮT"
        ncBtn.BackgroundColor3 = MV.Safe.noclip and C.GREEN or C.SURFACE3
        ncBtn.TextColor3 = D.BestText(ncBtn.BackgroundColor3)
        ciBtn.Text = MV.Safe.circle and "⭕ Vòng tròn: BẬT" or "⭕ Vòng tròn: TẮT"
        ciBtn.BackgroundColor3 = MV.Safe.circle and C.GREEN or C.SURFACE3
        ciBtn.TextColor3 = D.BestText(ciBtn.BackgroundColor3)
        hudBtn.Text = MV.Safe.showHud and "📱 Nút ảo: BẬT" or "📱 Nút ảo: TẮT"
        hudBtn.BackgroundColor3 = MV.Safe.showHud and C.GREEN or C.SURFACE3
        hudBtn.TextColor3 = D.BestText(hudBtn.BackgroundColor3)
        radIn.Text, spdIn.Text, strIn.Text =
            tostring(MV.Safe.radius), tostring(MV.Safe.speed), tostring(MV.Safe.steer)
        cirIn.Text, lookIn.Text = tostring(MV.Safe.circleR), tostring(MV.Safe.lookTime)
        szIn.Text = tostring(MV.Safe.shieldSize)
        statusLbl.Text = MV.Safe.Status()
        statusLbl.TextColor3 = ((MV.Safe.threats or 0) > 0) and C.YELLOW or C.MUTED
    end
    S.SyncSafePanel = paint
    MV.Safe.RefreshPanel = paint

    onBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.Set(not MV.Safe.on)
        paint()
        if D.hubStatus then flash(D.hubStatus, MV.Safe.Status(), 2.2, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    autoBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetAuto(not MV.Safe.auto)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, MV.Safe.auto and "➡ tự bay: không bấm gì vẫn bay theo hướng camera"
                 or "➡ tự bay TẮT: chỉ bay khi bấm WASD (nhưng vẫn tự né)", 2, C.ACCENT)
        end
    end)
    shBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetShield(not MV.Safe.shield)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, MV.Safe.shield and ("🔲 khiên trong suốt hình vuông: BẬT · "
                 .. string.format("%g m/cạnh%s", MV.Safe.ShieldHalf() * 2,
                      (tonumber(MV.Safe.shieldSize) or 0) > 0 and " (chỉnh tay)" or " (tự động)"))
                 or "🔲 đã ẩn khiên (vẫn né y như cũ)", 2, C.ACCENT)
        end
    end)
    plBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetAvoidPlayers(not MV.Safe.avoidPlayers)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, MV.Safe.avoidPlayers and "👤 coi NGƯỜI CHƠI khác là mối nguy (né dù họ đứng yên)"
                 or "👤 đã bỏ qua người chơi (chỉ né vật chuyển động)", 2, C.ACCENT)
        end
    end)
    ncBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetNoclipAuto(not MV.Safe.noclip)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, MV.Safe.noclip and "🧱 lực đẩy đưa bạn XUYÊN QUA vật cản (Xuyên Tường tự bật)"
                 or "🧱 đã trả Xuyên Tường về như trước", 2, C.ACCENT)
        end
    end)
    ciBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetCircle(not MV.Safe.circle)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, MV.Safe.circle and ("⭕ không có gì lao tới mình -> tự bay VÒNG TRÒN bán kính " .. tostring(math.floor(MV.Safe.circleR + 0.5)) .. "m")
                 or "⭕ đã tắt bay vòng tròn (chỉ bay theo hướng đang nhìn)", 2, C.ACCENT)
        end
    end)
    applyBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetRadius(tonumber(tostring(radIn.Text or ""):match("%-?%d+%.?%d*")) or MV.Safe.radius)
        MV.Safe.SetSpeed(tonumber(tostring(spdIn.Text or ""):match("%-?%d+%.?%d*")) or MV.Safe.speed)
        MV.Safe.SetSteer(tonumber(tostring(strIn.Text or ""):match("%-?%d+%.?%d*")) or MV.Safe.steer)
        MV.Safe.SetCircleR(tonumber(tostring(cirIn.Text or ""):match("%-?%d+%.?%d*")) or MV.Safe.circleR)
        MV.Safe.SetLook(tonumber(tostring(lookIn.Text or ""):match("%-?%d+%.?%d*")) or MV.Safe.lookTime)
        MV.Safe.SetShieldSize(tonumber(tostring(szIn.Text or ""):match("%-?%d+%.?%d*")) or MV.Safe.shieldSize)
        if not MV.Safe.on then MV.Safe.Set(true) end      -- áp dụng là bật luôn
        paint()
        if D.hubStatus then flash(D.hubStatus, MV.Safe.Status(), 2.4, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    stopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.Stop()
        paint()
        if D.hubStatus then flash(D.hubStatus, "🚫 " .. MV.Safe.Status(), 1.8, C.ACCENT) end
        pcall(S.Rebuild)
    end)
    hudBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.Safe.SetShowHud(not MV.Safe.showHud)
        paint()
        if D.hubStatus then
            flash(D.hubStatus, MV.Safe.showHud and "📱 nút ảo 🛡: BẬT — hiện joystick + ⬆⬇ khi 🛡 đang bật"
                 or "📱 nút ảo 🛡: TẮT — đã ẩn cụm nút nổi", 1.8, C.ACCENT)
        end
    end)
    paint()
end

-- ---------- TỰ LÀM MỚI 2 DANH SÁCH TRONG MENU (📍 + 👣) ----------
do
    local acc = 0
    RunService:BindToRenderStep("BC_HubList", Enum.RenderPriority.Camera.Value - 4, function(dt)
        acc = acc + (tonumber(dt) or 0.016)
        if acc < 2 then return end
        acc = 0
        pcall(function()
            local visible = false
            local function open(t) if t and t.Visible == true then return true end return false end
            if open(D.playerTab) or open(D.hubTab) then visible = true end
            if not visible then return end
            if S.Loc.RefreshList then S.Loc.RefreshList() end
            if S.Spec.RefreshList then S.Spec.RefreshList() end
            if S.GlassRefreshList then S.GlassRefreshList() end
            if S.ObjTrack and S.ObjTrack.RefreshList then pcall(S.ObjTrack.RefreshList) end   -- v5.1: 🌳
        end)
    end)
end

-- ---------- KHUNG 👣 XEM NGƯỜI CHƠI (ngay dưới khung 📍 trong trang 👥 NGƯỜI CHƠI) -------
do
    local PH = 262
    local P = New("Frame", {
        Name = "HubSpec_Panel",
        Size = UDim2.new(1, -16, 0, PH),
        Position = UDim2.new(0, 8, 0, D.playerY or 46),
        LayoutOrder = 2,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.playerTab)
    D.playerY = (D.playerY or 46) + PH + 8
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "👣 XEM NGƯỜI CHƠI (bám theo — xem họ đang làm gì)", BackgroundTransparency = 1,
        TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local function act(txt, x, y, w, color)
        local b = New("TextButton", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end
    local function lab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end

    local watchBtn = act("👣 Bám theo", 8, 22, 106, C.GRAY)
    local followBtn = act("🎥 Bám: BẬT", 120, 22, 96, C.GREEN)
    local autoBtn = act("🔄 Tự chuyển", 222, 22, 66, C.GRAY)

    lab("📏", 8, 48, 14)
    local distIn = New("TextBox", {
        Size = UDim2.new(0, 44, 0, 20), Position = UDim2.new(0, 22, 0, 48),
        Text = "12", ClearTextOnFocus = false,
        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
        PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(distIn, UDim.new(0, 6))
    lab("m · ⬆", 70, 48, 30)
    local hiIn = New("TextBox", {
        Size = UDim2.new(0, 44, 0, 20), Position = UDim2.new(0, 100, 0, 48),
        Text = "3.2", ClearTextOnFocus = false,
        BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
        PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(hiIn, UDim.new(0, 6))
    local applyBtn = act("✔ Áp dụng", 150, 48, 70, C.SURFACE3)
    lab("🚫 Dừng", 226, 48, 62)

    local searchIn = New("TextBox", {
        Size = UDim2.new(1, -16, 0, 22), Position = UDim2.new(0, 8, 0, 72),
        Text = "", PlaceholderText = "🔍 Tìm tên người chơi...", ClearTextOnFocus = false,
        PlaceholderColor3 = C.GRAY, BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1,
        TextColor3 = C.DARK, Font = Enum.Font.GothamMedium, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Left, BorderSizePixel = 0, ZIndex = 7,
    }, P)
    Corner(searchIn, UDim.new(0, 6))
    New("UIPadding", { PaddingLeft = UDim.new(0, 6) }, searchIn)

    local list = New("ScrollingFrame", {
        Name = "SpecList", Size = UDim2.new(1, -16, 0, 130), Position = UDim2.new(0, 8, 0, 98),
        BackgroundTransparency = 1, BorderSizePixel = 0, ScrollBarThickness = 4,
        CanvasSize = UDim2.new(0, 0, 0, 0), ZIndex = 7,
    }, P)
    New("UIListLayout", { Padding = UDim.new(0, 4), SortOrder = Enum.SortOrder.LayoutOrder }, list)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 30), Position = UDim2.new(0, 8, 0, 230),
        Text = "💡 Bấm TÊN = bám theo xem họ đang làm gì (video chạy trong mắt bạn). "
             .. "Chỉ ĐỔI CAMERA — nhân vật bạn không bị dịch chuyển; 🚫 Dừng là trả camera về ngay.",
        TextWrapped = true, BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function paint()
        local nm = (SP.on and SP.target) and tostring(SP.target.Name) or nil
        watchBtn.Text = nm and ("👣 " .. nm) or "👣 Bám theo"
        watchBtn.BackgroundColor3 = SP.on and C.GREEN or C.GRAY
        watchBtn.TextColor3 = D.BestText(watchBtn.BackgroundColor3)
        followBtn.Text = SP.follow and "🎥 Bám: BẬT" or "🎥 Bám: TẮT"
        followBtn.BackgroundColor3 = SP.follow and C.GREEN or C.SURFACE3
        followBtn.TextColor3 = D.BestText(followBtn.BackgroundColor3)
        autoBtn.BackgroundColor3 = SP.auto and C.PURPLE or C.SURFACE3
        autoBtn.TextColor3 = D.BestText(autoBtn.BackgroundColor3)
        distIn.Text, hiIn.Text = tostring(SP.dist), tostring(SP.height)
    end

    S.Spec.RefreshList = function()
        if not (list and list.Parent) then return end
        for _, c in ipairs(list:GetChildren()) do
            if not c:IsA("UIListLayout") then pcall(function() c:Destroy() end) end
        end
        local term = tostring(searchIn.Text or ""):lower()
        local order = 0
        local ok, players = pcall(function() return Players:GetPlayers() end)
        if not ok or not players then return end
        for _, p in ipairs(players) do
            if p ~= player then
                local nm = tostring(p.Name)
                if term == "" or nm:lower():find(term, 1, true) then
                    order = order + 1
                    local c, r, h = S.Loc.CharOf(p)
                    local fr, down = S.Loc.IsFriend(p), S.Loc.IsDown(h)
                    local col = down and Color3.fromRGB(255, 100, 100)
                             or (fr and Color3.fromRGB(255, 182, 193) or C.DARK)
                    local row = New("Frame", {
                        Size = UDim2.new(1, 0, 0, 26), LayoutOrder = order,
                        BackgroundColor3 = (SP.target == p) and C.SURFACE3 or C.SURFACE2,
                        BackgroundTransparency = (SP.target == p) and 0.05 or 0.25,
                        BorderSizePixel = 0, ZIndex = 8,
                    }, list)
                    Corner(row, UDim.new(0, 6))
                    local sub = {}
                    if fr then sub[#sub + 1] = "💗" end
                    if down then sub[#sub + 1] = "☠️" end
                    if c then
                        sub[#sub + 1] = (h and string.format("❤️%d", spRound(h.Health or 0)) or "❤️?")
                    else
                        sub[#sub + 1] = "⏳ chờ nhân vật"
                    end
                    local b = New("TextButton", {
                        Size = UDim2.new(1, -74, 1, 0), Position = UDim2.new(0, 6, 0, 0),
                        Text = (SP.target == p and "👣 " or "") .. nm .. "  " .. table.concat(sub, " "),
                        BackgroundTransparency = 1, TextColor3 = col,
                        Font = Enum.Font.GothamBold, TextSize = 9,
                        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 9,
                    }, row)
                    b.Activated:Connect(function()
                        ReleaseHubFocus()
                        pcall(function() S.Loc.SetTarget(p) end)      -- vừa định vị vừa bám theo
                        S.Spec.Set(p)
                        pcall(function() S.Loc.RefreshList() end)
                        paint()
                        if S.Spec.RefreshList then S.Spec.RefreshList() end
                        pcall(S.Rebuild)
                    end)
                    local d = S.Loc.Dist(p)
                    New("TextLabel", {
                        Size = UDim2.new(0, 66, 1, 0), Position = UDim2.new(1, -68, 0, 0),
                        Text = d and ("📏 " .. spRound(d) .. "m") or "📏 --m",
                        BackgroundTransparency = 1, TextColor3 = C.MUTED,
                        Font = Enum.Font.GothamMedium, TextSize = 9,
                        TextXAlignment = Enum.TextXAlignment.Right, ZIndex = 9,
                    }, row)
                end
            end
        end
        pcall(function() list.CanvasSize = UDim2.new(0, 0, 0, order * 30) end)
        paint()
    end

    watchBtn.Activated:Connect(function()
        ReleaseHubFocus()
        if SP.on then
            S.Spec.Stop()
        else
            local p = SP.target or S.Loc.target or S.Loc.Nearest()
            if not p then
                if D.hubStatus then flash(D.hubStatus, "⚠️ chưa có ai để xem (server chỉ có mình bạn)", 2, C.RED) end
            else
                S.Loc.SetTarget(p)
                S.Spec.Set(p)
            end
        end
        paint()
        if S.Spec.RefreshList then S.Spec.RefreshList() end
        pcall(function() S.Loc.RefreshList() end)
        pcall(S.Rebuild)
        if D.hubStatus then flash(D.hubStatus, S.Spec.Status(), 2, C.ACCENT) end
    end)
    followBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Spec.SetFollow(not SP.follow)
        paint()
        if D.hubStatus then flash(D.hubStatus, SP.follow and "🎥 camera bám theo người đang xem" or "🎥 đã trả camera về cho bạn (vẫn xem được bảng 👣)", 2, C.ACCENT) end
    end)
    autoBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.Spec.SetAuto(not SP.auto)
        paint()
        if D.hubStatus then flash(D.hubStatus, SP.auto and "🔄 người đang xem thoát -> tự chuyển người gần nhất" or "🔄 đã tắt tự chuyển", 2, C.ACCENT) end
    end)
    applyBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local d = tonumber(tostring(distIn.Text or ""):match("%-?%d+%.?%d*")) or SP.dist
        local hh = tonumber(tostring(hiIn.Text or ""):match("%-?%d+%.?%d*")) or SP.height
        S.Spec.SetDist(d); S.Spec.SetHeight(hh)
        paint()
        if D.hubStatus then flash(D.hubStatus, string.format("📏 camera: lùi %gm · cao %gm", SP.dist, SP.height), 1.8, C.ACCENT) end
    end)
    local stopBtn2 = New("TextButton", {
        Size = UDim2.new(0, 108, 0, 20), Position = UDim2.new(1, -116, 0, 48),
        Text = "🚫 Dừng xem", BackgroundColor3 = C.RED, TextColor3 = D.BestText(C.RED),
        Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
    }, P)
    Corner(stopBtn2, UDim.new(0, 6))
    D.Tactile(stopBtn2, 0.1)
    stopBtn2.Activated:Connect(function()
        ReleaseHubFocus()
        S.Spec.Stop()
        paint()
        if S.Spec.RefreshList then S.Spec.RefreshList() end
        pcall(S.Rebuild)
        if D.hubStatus then flash(D.hubStatus, "🚫 " .. S.Spec.Status(), 2, C.ACCENT) end
    end)
    pcall(function() end)
    paint()
    if S.Spec.RefreshList then pcall(S.Spec.RefreshList) end
    pcall(function()
        if D.playerTab then D.playerTab.CanvasSize = UDim2.new(0, 0, 0, (D.playerY or 600) + 16) end
    end)
end

-- ---------- KHUNG 🧱 ĐẶT KÍNH & 🚀 BAY TỚI KÍNH (nhiều tấm cố định) ----------
do
    local PH = 354
    local P = New("Frame", {
        Name = "HubGlass_Panel",
        Size = UDim2.new(1, -16, 0, PH),
        Position = UDim2.new(0, 8, 0, D.playerY or 46),
        LayoutOrder = 3,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.playerTab)
    D.playerY = (D.playerY or 46) + PH + 8
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "🧱 THẢM KÍNH CỐ ĐỊNH · 🚀 BAY TỚI TỪNG TẤM",
        BackgroundTransparency = 1, TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 22), Position = UDim2.new(0, 8, 0, 20),
        Text = "Bấm 🧱 Đặt thêm để tạo tấm mới tại chân bạn. Tấm đã đặt đứng yên, không bị ghi đè; mỗi dòng có nút bay tới và xóa riêng.",
        TextWrapped = true, BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function glassAct(txt, x, y, w, color)
        local b = New("TextButton", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end
    local function glassLab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end
    local function glassInput(txt, x, y, w)
        local box = New("TextBox", {
            Size = UDim2.new(0, w, 0, 20), Position = UDim2.new(0, x, 0, y),
            Text = txt, ClearTextOnFocus = false,
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
            PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Center, BorderSizePixel = 0, ZIndex = 7,
        }, P)
        Corner(box, UDim.new(0, 6))
        return box
    end
    local function numberFrom(box, fallback)
        local s = tostring(box and box.Text or "")
        return tonumber(s:match("[+-]?%d+%.?%d*")) or fallback
    end

    glassLab("Rộng", 8, 44, 32)
    local widthIn = glassInput(tostring(MV.carpetW or 6), 42, 44, 42)
    glassLab("Cao", 91, 44, 27)
    local heightIn = glassInput(tostring(MV.carpetH or 0.5), 119, 44, 42)
    glassLab("Dài", 168, 44, 27)
    local lengthIn = glassInput(tostring(MV.carpetL or 6), 196, 44, 42)
    glassLab("Gap", 245, 44, 28)
    local gapIn = glassInput(tostring(MV.carpetGap or 0.2), 275, 44, 43)
    local sizeApply = glassAct("✅ Áp dụng", 326, 44, 60, C.SURFACE3)

    local placeBtn = glassAct("🧱 Đặt thêm", 8, 70, 94, C.BLUE)
    local autoBtn = glassAct("🔄 Tự đặt: TẮT", 108, 70, 94, C.SURFACE3)
    local clearBtn = glassAct("🧹 Xóa tất cả", 208, 70, 94, C.RED)
    local stopBtn = glassAct("⏹ Dừng bay", 308, 70, 78, C.SURFACE3)

    glassLab("🚀 Tốc độ bay:", 8, 96, 90)
    local flySpeedIn = glassInput(tostring(MV.glassFlySpeed or 60), 98, 96, 48)
    local flySpeedApply = glassAct("✅ Đặt", 150, 96, 52, C.GREEN)
    local speedNote = New("TextLabel", {
        Size = UDim2.new(1, -210, 0, 20), Position = UDim2.new(0, 208, 0, 96),
        Text = "tấm gần nhất từ 📚 Script Hub · 1–2000",
        BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium, TextSize = 8,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)

    local countLbl = New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 18), Position = UDim2.new(0, 8, 0, 120),
        Text = "🧱 Đã đặt: 0 tấm · cố định",
        BackgroundTransparency = 1, TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local list = New("ScrollingFrame", {
        Name = "GlassList", Size = UDim2.new(1, -16, 0, 208), Position = UDim2.new(0, 8, 0, 142),
        BackgroundTransparency = 1, BorderSizePixel = 0, ScrollBarThickness = 4,
        CanvasSize = UDim2.new(0, 0, 0, 0), ZIndex = 7,
    }, P)
    New("UIListLayout", {
        Padding = UDim.new(0, 3), SortOrder = Enum.SortOrder.LayoutOrder,
    }, list)

    local function applyGlassSettings()
        local w, h, l = MV.SetCarpetSize(
            numberFrom(widthIn, MV.carpetW or 6),
            numberFrom(heightIn, MV.carpetH or 0.5),
            numberFrom(lengthIn, MV.carpetL or 6)
        )
        local g = MV.SetCarpetGap(numberFrom(gapIn, MV.carpetGap or 0.2))
        widthIn.Text, heightIn.Text, lengthIn.Text, gapIn.Text = tostring(w), tostring(h), tostring(l), tostring(g)
        return w, h, l, g
    end
    local function glassCount()
        local ok, items = pcall(MV.GetPlacedGlasses)
        if ok and type(items) == "table" then return items end
        return {}
    end
    local function paintGlassButtons(items)
        local auto = MV.autoGlass == true
        autoBtn.Text = auto and "🔄 Tự đặt: BẬT" or "🔄 Tự đặt: TẮT"
        autoBtn.BackgroundColor3 = auto and C.GREEN or C.SURFACE3
        autoBtn.TextColor3 = D.BestText(autoBtn.BackgroundColor3)
        countLbl.Text = "🧱 Đã đặt: " .. tostring(#items) .. " tấm · cố định"
        speedNote.Text = "tấm gần nhất từ 📚 Script Hub · " .. tostring(MV.glassFlySpeed or 60) .. ""
    end

    S.GlassRefreshList = function()
        if not (list and list.Parent) then return end
        local items = glassCount()
        for _, child in ipairs(list:GetChildren()) do
            if not child:IsA("UIListLayout") then pcall(function() child:Destroy() end) end
        end
        for i, rec in ipairs(items) do
            local glassIndex = i
            local part = rec.part
            local pos = rec.position or (part and part.Position) or Vector3.new(0, 0, 0)
            local row = New("Frame", {
                Name = "GlassRow_" .. tostring(rec.id or i),
                Size = UDim2.new(1, 0, 0, 29), LayoutOrder = i,
                BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.18,
                BorderSizePixel = 0, ZIndex = 8,
            }, list)
            Corner(row, UDim.new(0, 6))
            Stroke(row, (MV._glassFlyTarget == rec) and C.ACCENT or C.BORDER, 1)
            New("TextLabel", {
                Size = UDim2.new(1, -126, 1, 0), Position = UDim2.new(0, 7, 0, 0),
                Text = string.format("#%s  X %.1f  Y %.1f  Z %.1f", tostring(rec.id or i), pos.X, pos.Y, pos.Z),
                BackgroundTransparency = 1, TextColor3 = C.DARK, Font = Enum.Font.GothamBold, TextSize = 8,
                TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 9,
            }, row)
            local fly = New("TextButton", {
                Size = UDim2.new(0, 56, 0, 21), Position = UDim2.new(1, -116, 0, 4),
                Text = "🚀 Tới", BackgroundColor3 = C.ACCENT, TextColor3 = D.BestText(C.ACCENT),
                Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
            }, row)
            Corner(fly, UDim.new(0, 5)); D.Tactile(fly, 0.08)
            fly.Activated:Connect(function()
                ReleaseHubFocus()
                local ok, result = MV.FlyToGlass(glassIndex)
                if ok then
                    D.Say("🚀 đang bay tới tấm kính #" .. tostring(result and result.id or glassIndex) .. " · bấm ⏹ để dừng", C.YELLOW)
                else
                    D.Say("⚠️ " .. tostring(result), C.RED)
                end
                pcall(S.GlassRefreshList)
            end)
            local del = New("TextButton", {
                Size = UDim2.new(0, 52, 0, 21), Position = UDim2.new(1, -56, 0, 4),
                Text = "🗑 Xóa", BackgroundColor3 = C.RED, TextColor3 = D.BestText(C.RED),
                Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
            }, row)
            Corner(del, UDim.new(0, 5)); D.Tactile(del, 0.08)
            del.Activated:Connect(function()
                ReleaseHubFocus()
                local ok, result = MV.RemoveGlassAt(glassIndex)
                if ok then
                    D.Say("🗑 đã xóa tấm kính #" .. tostring(result and result.id or glassIndex), C.GREEN)
                else
                    D.Say("⚠️ " .. tostring(result), C.RED)
                end
                pcall(S.GlassRefreshList)
            end)
        end
        pcall(function() list.CanvasSize = UDim2.new(0, 0, 0, math.max(0, #items * 32)) end)
        paintGlassButtons(items)
    end

    S.OpenGlassPanel = function()
        local ok = S.OpenPlayerTab and S.OpenPlayerTab() or false
        pcall(S.GlassRefreshList)
        return ok
    end
    sizeApply.Activated:Connect(function()
        ReleaseHubFocus()
        local w, h, l, g = applyGlassSettings()
        D.Say(string.format("✅ kích thước kính: %g × %g × %g · gap %g", w, h, l, g), C.GREEN)
    end)
    placeBtn.Activated:Connect(function()
        ReleaseHubFocus()
        applyGlassSettings()
        local ok, part, rec = MV.PlaceGlass()
        if ok then
            D.Say("🧱 đã đặt tấm kính cố định #" .. tostring(rec and rec.id or "?")
                .. " · tổng " .. tostring(#glassCount()) .. " tấm", C.GREEN)
        else
            D.Say("⚠️ " .. tostring(part), C.RED)
        end
        pcall(S.GlassRefreshList)
    end)
    autoBtn.Activated:Connect(function()
        ReleaseHubFocus()
        applyGlassSettings()
        local on = MV.SetAutoGlass(not MV.autoGlass)
        D.Say(on and "🔄 tự đặt kính: BẬT" or "🔄 tự đặt kính: TẮT", C.YELLOW)
        pcall(S.GlassRefreshList)
    end)
    clearBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local n = MV.ClearPlacedGlasses()
        D.Say("🧹 đã xóa toàn bộ " .. tostring(n) .. " tấm kính cố định", C.GREEN)
        pcall(S.GlassRefreshList)
    end)
    stopBtn.Activated:Connect(function()
        ReleaseHubFocus()
        MV.StopGlassFly()
        D.Say("⏹ đã dừng bay tới kính", C.YELLOW)
        pcall(S.GlassRefreshList)
    end)
    flySpeedApply.Activated:Connect(function()
        ReleaseHubFocus()
        local ok, value = MV.SetGlassFlySpeed(numberFrom(flySpeedIn, MV.glassFlySpeed or 60))
        if ok then
            flySpeedIn.Text = tostring(value)
            speedNote.Text = "tấm gần nhất từ 📚 Script Hub · " .. tostring(value)
            D.Say("🚀 tốc độ bay tới kính: " .. tostring(value), C.GREEN)
        else
            D.Say("⚠️ " .. tostring(value), C.RED)
        end
    end)
    pcall(S.GlassRefreshList)
    pcall(function()
        if D.playerTab then D.playerTab.CanvasSize = UDim2.new(0, 0, 0, (D.playerY or 600) + 16) end
    end)
end

D.hubChipBtns = {}
for _, cname in ipairs({"Tất cả", "Admin", "Explorer", "Spy", "Tiện ích", "Server", "Di chuyển", "Định vị"}) do
    local w = (cname == "Tất cả" and 58) or (cname == "Explorer" and 68) or (cname == "Tiện ích" and 64)
              or (cname == "Server" and 56) or (cname == "Admin" and 52) or (cname == "Di chuyển" and 66) or (cname == "Định vị" and 58) or 44
    local chip = New("TextButton", {
        Size = UDim2.new(0, w, 0, 20), Text = cname,
        BackgroundColor3 = (S.hubCat == cname) and C.ACCENT or C.SURFACE2,
        BackgroundTransparency = (S.hubCat == cname) and 0.08 or 1,
        TextColor3 = (S.hubCat == cname) and C.INK or C.MUTED,
        Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 7,
    }, D.hubChips)
    Corner(chip, UDim.new(1, 0))
    Stroke(chip, (S.hubCat == cname) and C.ACCENT2 or C.BORDER, 1)
    chip.Activated:Connect(function()
        S.hubCat = cname
        for nm, cb in pairs(D.hubChipBtns) do
            local on = (nm == cname)
            cb.BackgroundColor3 = on and C.ACCENT or C.SURFACE2
            cb.BackgroundTransparency = on and 0.08 or 1
            cb.TextColor3 = on and C.INK or C.MUTED
            local st = cb:FindFirstChildOfClass("UIStroke")
            if st then st.Color = on and C.ACCENT2 or C.BORDER end
        end
        S.RebuildHubList()
    end)
    D.hubChipBtns[cname] = chip
end

trackConn(D.hubSearchBox:GetPropertyChangedSignal("Text"):Connect(function()
    S.hubSearch = D.hubSearchBox.Text          -- ghi nhận ngay (rẻ) để chip/lọc khác đọc đúng
    S.Debounce("hubSearch", 0.18, S.RebuildHubList)   -- nhưng chỉ DỰNG lại thẻ 1 lần sau phím cuối
end))
S.RebuildHubList()

D.SyncPageChips()
S.SyncServerPanel()   -- v4.6.3: hiện mã server (JobId) lên khung 🌐 SERVER

do   -- gói gọn trong 1 khối: tiết kiệm "local" ở cấp cao nhất của chunk
-- ============================================================================
-- ---------- 🌳 ĐỊNH VỊ VẬT THEO TÊN (v5.1) — nhập tên là thấy MỌI vật khớp ---
-- Quét workspace để tìm mọi BasePart/Model có tên khớp (không phân biệt hoa
-- thường, không dấu), vẽ Highlight + nhãn + (tuỳ chọn) hộp bao quanh GẮN THẲNG
-- vào vật nên vật di chuyển tới đâu định vị đi theo tới đó. Định kỳ quét lại
-- nên vật mới xuất hiện hoặc vật bị xoá đều tự cập nhật.
-- ============================================================================
S.ObjTrack = {
    on = false,           -- đang định vị hay không
    query = "",           -- người dùng gõ vào ô 🔎
    keys = {},            -- ["cay"], ["cay","da"]...
    maxDist = 0,          -- 0 = không giới hạn khoảng cách (stud)
    maxItems = 60,        -- định vị tối đa bao nhiêu vật (gần nhất trước)
    showRows = 8,         -- số dòng hiện trong bảng
    thru = true,          -- xuyên tường (thấy cả vật sau tường)
    showLabel = true,     -- nhãn tên + khoảng cách
    showBox = false,      -- hộp bao quanh vật (BoxHandleAdornment)
    showXYZ = true,       -- hiện toạ độ X/Y/Z dưới nhãn (giống khung 🎯 Phân Tích Toạ Độ)
    skipPlayers = true,   -- bỏ qua nhân vật người chơi (đã có 📍 riêng)
    color = 1,
    items = {},           -- [instance] = { hl, bb, lbl, box, part, dist }
    list = {},            -- danh sách gần nhất trước (dùng cho bảng + bay tới)
    lastScan = 0,
    rescanEvery = 1.5,    -- (giữ cho tương thích) giây: nhịp quét cũ
    -- ===== TỐI ƯU CHỐNG KHỰNG (v5.1.2): quét chia nhỏ theo từng khung hình =====
    scanIdle = 2.0,       -- giây: nghỉ giữa 2 lượt quét (trước là 1,5)
    scanBudget = 180,     -- mỗi khung hình xử lý tối đa bấy nhiêu vật
    scanSliceMs = 1.2,    -- trần thời gian 1 lát quét (ms) — vượt là nhả ra cho khung hình
    makeBudget = 8,       -- mỗi khung hình tạo tối đa 8 định vị mới (rải ra, không dồn)
    tickSliceMs = 1.5,    -- trần thời gian 1 lượt cập nhật nhãn (ms)
    labelBudget = 20,     -- mỗi lượt cập nhật tối đa 20 vật (xoay vòng)
    infoEvery = 0.5,      -- giây: làm mới khung 🎯 (trước là mỗi 0,2s)
    labelEvery = 0.25,    -- giây: cập nhật khoảng cách + nhãn
    pathKeys = {},        -- từ khoá dạng PATH dán vào (VD: workspace.rung cay.thancay)
    entries = {},         -- nhiều mục ghim cùng lúc: { {raw="cây",kind="name"}, {raw="Workspace.Rừng Cây",kind="path"} }
    -- trạng thái nội bộ cho quét chia lát + vòng xoay
    _order = {}, _tickIdx = 0, _pending = {}, _queue = {}, _qN = 0,
    _pathSet = {}, _pathN = 0, _chars = {},
    _nc = setmetatable({}, { __mode = "k" }),   -- đệm tên đã chuẩn hoá theo từng vật
    _gui = nil, _acc = 0, _scanAcc = 0, _bound = false,
    _scanned = 0, _renderErr = false,
    _sel = nil, _selPart = nil,   -- vật đang xem thông tin (khung 🎯 giống phân tích toạ độ)
    _found = 0, _scanMs = 0, _capped = false, _err = nil, _rowSig = nil,
}
local OT = S.ObjTrack
OT.palette = {
    { name = "Xanh nước", fill = Color3.fromRGB(0, 170, 255), out = Color3.fromRGB(186, 231, 255) },
    { name = "Xanh ngọc", fill = Color3.fromRGB(0, 255, 170), out = Color3.fromRGB(255, 255, 255) },
    { name = "Cam",       fill = Color3.fromRGB(255, 165, 0), out = Color3.fromRGB(255, 240, 210) },
    { name = "Hồng",      fill = Color3.fromRGB(255, 105, 180), out = Color3.fromRGB(255, 214, 236) },
    { name = "Tím",       fill = Color3.fromRGB(170, 120, 255), out = Color3.fromRGB(232, 222, 255) },
    { name = "Vàng",      fill = Color3.fromRGB(255, 225, 80), out = Color3.fromRGB(255, 252, 214) },
    { name = "Đỏ",        fill = Color3.fromRGB(255, 70, 70), out = Color3.fromRGB(255, 214, 214) },
    { name = "Xanh dương", fill = Color3.fromRGB(90, 170, 255), out = Color3.fromRGB(222, 240, 255) },
}
function OT.Pal()
    local i = tonumber(OT.color) or 1
    return OT.palette[i] or OT.palette[1]
end
local function otRound(n) return math.floor((tonumber(n) or 0) + 0.5) end

-- Toạ độ 1 dòng "X 12.3 · Y 5.0 · Z -8.4" — y như khung 📍 Toạ Độ của hub.
local function otXYZ(part)
    local ok, pos = pcall(function() return part.Position end)
    if not ok or not pos then return "" end
    return string.format("X %.1f · Y %.1f · Z %.1f", pos.X, pos.Y, pos.Z)
end

-- Đường dẫn đầy đủ kiểu "Workspace.Rừng Cây.ThanCay"
function OT.PathOf(inst)
    if inst == nil then return "nil" end
    local parts, cur, guard = {}, inst, 0
    while cur and cur ~= game and guard < 40 do
        table.insert(parts, 1, tostring(cur.Name))
        cur = cur.Parent
        guard = guard + 1
    end
    return table.concat(parts, ".")
end

-- Bảng thông tin 1 vật: ĐÚNG các dòng của khung "🎯 VẬT THỂ ĐƯỢC CHỌN" (phân tích toạ độ).
function OT.Info(inst, part)
    if inst == nil then return {} end
    if part == nil then part = OT.PartOf(inst) end
    local rows = {}
    local function add(k, v) rows[#rows + 1] = { k = k, v = tostring(v) } end
    add("Name", tostring(inst.Name))
    add("Class", tostring(inst.ClassName))
    add("Path", OT.PathOf(inst))
    if part then
        local okP, pos = pcall(function() return part.Position end)
        if okP and pos then add("Position", string.format("%.3f, %.3f, %.3f", pos.X, pos.Y, pos.Z)) end
        local okS, size = pcall(function() return part.Size end)
        if okS and size then add("Size", string.format("%.3f, %.3f, %.3f", size.X, size.Y, size.Z)) end
        local okC, cf = pcall(function() return part.CFrame end)
        if okC and cf then
            pcall(function()
                local rx, ry, rz = cf:ToOrientation()
                add("Rotation", string.format("P=%.1f° Y=%.1f° R=%.1f°", math.deg(rx), math.deg(ry), math.deg(rz)))
            end)
            pcall(function()
                local look = cf.LookVector
                add("Look", string.format("%.3f, %.3f, %.3f", look.X, look.Y, look.Z))
            end)
        end
        local okM, mat = pcall(function() return part.Material end)
        if okM and mat then add("Material", tostring(mat):gsub("Enum.Material.", "")) end
        local okCol, col = pcall(function() return part.Color end)
        if okCol and col then
            add("Color", string.format("R=%d G=%d B=%d",
                math.floor(col.R * 255), math.floor(col.G * 255), math.floor(col.B * 255)))
        end
    end
    return rows
end

-- Chọn 1 vật để hiện thông tin (giống chọn vật bằng 🎯 Phân Tích Vật Thể)
function OT.Select(inst)
    if inst == nil or inst.Parent == nil then
        OT._sel, OT._selPart = nil, nil
    else
        OT._sel = inst
        OT._selPart = OT.PartOf(inst)
    end
    if OT.RefreshInfo then pcall(OT.RefreshInfo) end
    return OT._sel
end

function OT.CopyCoords(inst)
    local part = (inst and OT.PartOf(inst)) or OT._selPart
    if part == nil then return false, "chưa chọn vật nào" end
    local ok, pos = pcall(function() return part.Position end)
    if not ok or not pos then return false, "vật không còn toạ độ" end
    local txt = string.format("%.3f, %.3f, %.3f", pos.X, pos.Y, pos.Z)
    local did = (S.CopyToClipboard and S.CopyToClipboard(txt)) or false
    return did, txt
end

function OT.CopyPath(inst)
    local target = inst or OT._sel
    if target == nil then return false, "chưa chọn vật nào" end
    local txt = OT.PathOf(target)
    local did = (S.CopyToClipboard and S.CopyToClipboard(txt)) or false
    return did, txt
end

-- Bảng "bỏ dấu" tiếng Việt: gõ "cay" vẫn khớp "Cây", gõ "da" khớp "Đá".
local OT_FOLD = {}
do
    local groups = {
        ["a"] = "áàảãạăắằẳẵặâấầẩẫậÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ",
        ["e"] = "éèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆ",
        ["i"] = "íìỉĩịÍÌỈĨỊ",
        ["o"] = "óòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ",
        ["u"] = "úùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰ",
        ["y"] = "ýỳỷỹỵÝỲỶỸỴ",
        ["d"] = "đĐ",
    }
    if type(utf8) == "table" and type(utf8.codes) == "function" then
        pcall(function()
            for base, chars in pairs(groups) do
                for _, cp in utf8.codes(chars) do OT_FOLD[cp] = base end
            end
        end)
    end
end

function OT.Norm(s)
    local t = tostring(s or "")
    if t == "" then return "" end
    local out, k = {}, 0
    local okUtf = false
    if type(utf8) == "table" and type(utf8.codes) == "function" and type(utf8.char) == "function" then
        okUtf = pcall(function()
            for _, cp in utf8.codes(t) do
                k = k + 1
                out[k] = OT_FOLD[cp] or utf8.char(cp)
            end
        end)
        if not okUtf then out, k = {}, 0 end
    end
    if not okUtf then k = 1; out[1] = t end
    local s2 = table.concat(out, "", 1, k):gsub("%s+", " ")
    return (s2:lower())
end

-- Gõ tên thường (cây) hoặc dán cả PATH (Workspace.Rừng Cây.ThanCay / game.Workspace.Cây) đều được.
function OT.Split(q)
    local out, paths = {}, {}
    for part in tostring(q or ""):gmatch("[^,;]+") do
        local k = (OT.Norm(part):gsub("^%s+", ""):gsub("%s+$", ""))
        if #k > 0 then
            local hasPath = k:find(".", 1, true) ~= nil or k:find("/", 1, true) ~= nil
                        or k:find("\\", 1, true) ~= nil
            if hasPath then
                local full = k:gsub("[/\\]", ".")
                if full:sub(1, 5) == "game." then full = full:sub(6) end   -- "game.Workspace.…" -> "workspace.…"
                paths[#paths + 1] = full
                local last = full:match("([^%.]+)$")
                if last and #last > 0 then out[#out + 1] = last end
            else
                out[#out + 1] = k
            end
        end
    end
    OT.pathKeys = paths
    return out
end

-- Tên đã chuẩn hoá được ĐỆM LẠI theo vật: đổi tên mới tính lại.
-- (Trước đây mỗi lượt quét phải chuẩn hoá lại tên của CẢ workspace -> khựng theo chu kỳ.)
function OT.NormCached(inst)
    local nm = inst.Name
    if type(nm) ~= "string" then return "" end
    local c = OT._nc[inst]
    if c ~= nil and c.raw == nm then return c.norm end
    local norm = OT.Norm(nm)
    OT._nc[inst] = { raw = nm, norm = norm }
    return norm
end

function OT.MatchesNorm(n)
    if n == "" or #OT.keys == 0 then return false end
    local keys = OT.keys
    for i = 1, #keys do
        if n:find(keys[i], 1, true) then return true end
    end
    return false
end

-- Dán PATH thì đi thẳng theo từng đoạn tên (không phải quét cả workspace để dò path nữa)
function OT.ResolvePath(key)
    local segs = {}
    for s in tostring(key or ""):gmatch("[^%.]+") do
        s = s:gsub("^%s+", ""):gsub("%s+$", "")
        if #s > 0 then segs[#segs + 1] = s end
    end
    if #segs == 0 then return nil end
    local cur, i = game, 1
    if segs[1] == "workspace" then cur, i = workspace, 2
    elseif segs[1] == "game" then i = 2 end
    while i <= #segs do
        if cur == nil then return nil end
        local found = nil
        local okK, kids = pcall(function() return cur:GetChildren() end)
        if not okK or type(kids) ~= "table" then return nil end
        for k = 1, #kids do
            if OT.Norm(kids[k].Name) == segs[i] then found = kids[k] break end
        end
        if found == nil then return nil end
        cur, i = found, i + 1
    end
    return cur
end

function OT.RefreshPaths()
    OT._pathSet = {}
    OT._pathN = 0
    local keys = OT.pathKeys or {}
    for i = 1, #keys do
        local ok, inst = pcall(OT.ResolvePath, keys[i])
        if ok and inst ~= nil then
            OT._pathSet[inst] = true
            OT._pathN = OT._pathN + 1
        end
    end
end

-- Vật này có phải "ứng viên" không (khớp TÊN hoặc nằm trong PATH đã dán)
function OT.Candidate(inst)
    if OT._pathN > 0 and OT._pathSet[inst] then return true end
    return OT.MatchesNorm(OT.NormCached(inst))
end
OT.Hit = OT.Candidate   -- tương thích tên hàm cũ

-- ============================================================================
-- NHIỀU MỤC CHẠY CÙNG LÚC (v5.1.3): ghim từng tên/path thành "mục", mỗi mục có nút ✕
-- để xoá riêng. Tất cả mục + ô nhập đang gõ đều được gộp vào keys/pathKeys mỗi lượt quét.
-- ============================================================================
function OT.IsPathLike(raw)
    local t = tostring(raw or "")
    return t:find(".", 1, true) ~= nil or t:find("/", 1, true) ~= nil or t:find("\\", 1, true) ~= nil
end

-- Chuẩn hoá 1 mục để so trùng (bỏ dấu, gộp / \ thành ., bỏ tiền tố game.)
function OT.EntryKey(raw)
    local t = tostring(raw or ""):gsub("^%s+", ""):gsub("%s+$", "")
    t = OT.Norm(t)
    if OT.IsPathLike(t) then
        t = t:gsub("[/\\]", ".")
        if t:sub(1, 5) == "game." then t = t:sub(6) end
    end
    return t
end

-- Gộp MỌI mục đã ghim + ô nhập đang gõ thành keys (tên) và pathKeys (path)
function OT.RebuildKeys()
    local keys, paths = {}, {}
    local function push(raw)
        raw = tostring(raw or "")
        if raw:gsub("%s", "") == "" then return end
        if OT.IsPathLike(raw) then
            local key = OT.EntryKey(raw)
            local ok, inst = pcall(OT.ResolvePath, key)
            if ok and inst ~= nil then          -- path còn trong game -> theo path
                paths[#paths + 1] = key
                return
            end
            -- path không resolve được: vẫn thử như TÊN (VD tên vật có dấu chấm) để không mất tính năng
        end
        local k = OT.Norm(raw):gsub("^%s+", ""):gsub("%s+$", "")
        if #k > 0 then keys[#keys + 1] = k end
    end
    for i = 1, #OT.entries do push(OT.entries[i].raw) end
    for part in tostring(OT.query or ""):gmatch("[^,;]+") do push(part) end   -- gõ là thấy ngay (như cũ)
    OT.keys, OT.pathKeys = keys, paths
    return #keys, #paths
end

-- Ghim 1 mục mới. Trả về (ok, kind|why)
function OT.AddEntry(raw)
    raw = tostring(raw or ""):gsub("^%s+", ""):gsub("%s+$", "")
    if raw == "" then return false, "chưa nhập gì" end
    local key = OT.EntryKey(raw)
    for i = 1, #OT.entries do
        if OT.EntryKey(OT.entries[i].raw) == key then
            return false, "mục này đã có trong danh sách rồi"
        end
    end
    local kind = OT.IsPathLike(raw) and "path" or "name"
    if kind == "path" then
        local ok, inst = pcall(OT.ResolvePath, key)
        if not ok or inst == nil then kind = "name" end   -- chưa resolve được -> vẫn nhận, xét như tên
    end
    OT.entries[#OT.entries + 1] = { raw = raw, kind = kind }
    OT._tagSig = nil
    OT.RebuildKeys()
    OT.on = true
    OT.Bind()
    pcall(OT.Rescan, true)          -- quét ngay: vừa ghim mục là thấy vật luôn (khỏi chờ 2s)
    if OT.RefreshTags then pcall(OT.RefreshTags) end
    return true, kind
end

-- Xoá 1 mục; hết mục thì tự tắt định vị
function OT.RemoveEntry(i)
    i = tonumber(i) or 0
    if i < 1 or i > #OT.entries then return false, "mục không tồn tại" end
    local raw = OT.entries[i].raw
    table.remove(OT.entries, i)
    OT._tagSig = nil
    OT.RebuildKeys()
    if #OT.keys == 0 and #(OT.pathKeys or {}) == 0 then
        OT.Set(false)
    elseif OT.on then
        pcall(OT.Rescan, true)
    end
    if OT.RefreshTags then pcall(OT.RefreshTags) end
    return true, raw
end

function OT.ClearEntries()
    OT.entries = {}
    OT.query = ""
    OT._tagSig = nil
    OT.RebuildKeys()
    if OT.RefreshTags then pcall(OT.RefreshTags) end
end

function OT.Matches(name)
    local n = OT.Norm(name)
    if n == "" or #OT.keys == 0 then return false end
    for i = 1, #OT.keys do
        if n:find(OT.keys[i], 1, true) then return true end
    end
    return false
end

-- Vật nào để gắn nhãn: BasePart -> chính nó; Model -> PrimaryPart / part đầu tiên.
function OT.PartOf(inst, depth)
    if inst == nil then return nil end
    depth = tonumber(depth) or 0
    if depth > 4 then return nil end
    local okA, isA = pcall(function() return inst:IsA("BasePart") end)
    if okA and isA then return inst end
    local okP, pp = pcall(function() return inst.PrimaryPart end)
    if okP and pp and pp.Parent then return pp end
    local okW, found = pcall(function() return inst:FindFirstChildWhichIsA("BasePart", true) end)   -- true = tìm sâu (Model/Folder lồng nhau)
    if not okW then okW, found = pcall(function() return inst:FindFirstChildWhichIsA("BasePart") end) end
    if okW and found and found.Parent then return found end
    local okC, kids = pcall(function() return inst:GetChildren() end)
    if okC and type(kids) == "table" then
        for i = 1, #kids do
            local p = OT.PartOf(kids[i], depth + 1)
            if p then return p end
        end
    end
    return nil
end

function OT.RefreshChars()   -- lấy nhân vật người chơi 1 lần cho cả lượt quét
    local out = {}
    if OT.skipPlayers then
        local okL, list = pcall(function() return Players:GetPlayers() end)
        if okL and type(list) == "table" then
            for i = 1, #list do
                local c = nil
                pcall(function() c = list[i].Character end)
                if c ~= nil then out[#out + 1] = c end
            end
        end
    end
    OT._chars = out
end

function OT.Skip(inst)
    if inst == nil then return true end
    local chars = OT._chars
    if chars == nil then
        OT.RefreshChars()
        chars = OT._chars
    end
    for i = 1, #chars do
        local okD, inside = pcall(function() return inst:IsDescendantOf(chars[i]) end)
        if okD and inside then return true end
    end
    return false
end

function OT.Gui()
    if OT._gui and OT._gui.Parent then return OT._gui end
    OT._gui = New("ScreenGui", {
        Name = "BC_ObjTrackESP", ResetOnSpawn = false,
        ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
    }, targetGui)
    return OT._gui
end

function OT.Kill(inst)
    local it = OT.items[inst]
    if not it then return end
    pcall(function() if it.hl then it.hl:Destroy() end end)
    pcall(function() if it.bb then it.bb:Destroy() end end)
    pcall(function() if it.box then it.box:Destroy() end end)
    OT.items[inst] = nil
    if it.slot then OT._order[it.slot] = nil end   -- để lượt cập nhật nhãn xoay vòng khỏi quét nhầm
end

function OT.Clear()
    for inst in pairs(OT.items) do OT.Kill(inst) end
    OT.items = {}
    OT._order, OT._tickIdx, OT._pending = {}, 0, {}
    OT._passing = false
    OT._queue, OT._qN = {}, 0
    OT._sel, OT._selPart = nil, nil
    OT.list = {}
    OT._found = 0
    OT._capped = false
    OT._rowSig = nil
    pcall(function() if OT._gui then OT._gui:ClearAllChildren() end end)
end

function OT._MakeBox(part, pal)
    local ok, box = pcall(function()
        -- BoxHandleAdornment là lớp tạo được bằng Instance.new; nếu executor chặn thì bỏ qua hộp.
        return New("BoxHandleAdornment", {   -- phải nằm trong Workspace mới hiện -> gắn vào part
            Name = "BC_OT_BOX", Adornee = part,
            Size = part.Size + Vector3.new(0.4, 0.4, 0.4),
            Color3 = pal.fill, Transparency = 0.35,
            AlwaysOnTop = OT.thru, ZIndex = 3, Visible = OT.showBox,
        }, part)
    end)
    if ok and box then return box end
    return nil
end

function OT.Make(inst, part)
    if inst == nil or part == nil then return end
    local okP, alive = pcall(function() return (part.Parent ~= nil) and (inst.Parent ~= nil) end)
    if not okP or not alive then return end
    OT.Kill(inst)
    local g = OT.Gui()
    local pal = OT.Pal()

    -- ⚠️ QUAN TRỌNG: Highlight phải nằm trong Workspace mới render. Gắn vào PlayerGui là
    -- "nhập tên mà không thấy gì" — nên gắn thẳng vào vật (giống 🎯 Phân Tích Vật Thể).
    -- Folder không phải BasePart/Model nên Adornee phải trỏ vào part bên trong mới hiện
    local okAM, adornee = pcall(function()
        return (inst:IsA("BasePart") or inst:IsA("Model")) and inst or part
    end)
    if not okAM or adornee == nil then adornee = part end
    local hl = nil
    local okH = pcall(function()
        hl = New("Highlight", {
            Name = "BC_OT_HL", Adornee = adornee,
            FillColor = pal.fill, FillTransparency = 0.7,   -- giống hệt Highlight của 🎯 Phân Tích Vật Thể
            OutlineColor = pal.out, OutlineTransparency = 0,
            DepthMode = OT.thru and Enum.HighlightDepthMode.AlwaysOnTop or Enum.HighlightDepthMode.Occluded,
        }, inst)
    end)
    if not okH then
        hl = nil
        pcall(function()   -- executor chặn gắn vào vật -> thử lại vào GUI (một số bản vẫn hiện)
            hl = New("Highlight", {
                Name = "BC_OT_HL", Adornee = adornee,
                FillColor = pal.fill, FillTransparency = 0.7,
                OutlineColor = pal.out, OutlineTransparency = 0,
                DepthMode = OT.thru and Enum.HighlightDepthMode.AlwaysOnTop or Enum.HighlightDepthMode.Occluded,
            }, g)
        end)
    end

    -- Nhãn BillboardGui: gắn vào part (nằm trong Workspace) nên chắc chắn hiện + bám theo vật
    local bb, lbl = nil, nil
    pcall(function()
        bb = New("BillboardGui", {
            Name = "BC_OT_BB", Adornee = part,
            Size = UDim2.new(0, 210, 0, OT.showXYZ and 46 or 30), StudsOffset = Vector3.new(0, 2.4, 0),
            AlwaysOnTop = OT.thru, MaxDistance = 3000, ResetOnSpawn = false,
        }, part)
        lbl = New("TextLabel", {
            Size = UDim2.new(1, 0, 1, 0), BackgroundTransparency = 1,
            Text = tostring(inst.Name), TextColor3 = pal.out,
            Font = Enum.Font.GothamBold, TextSize = 11,
            TextStrokeColor3 = Color3.fromRGB(0, 0, 0), TextStrokeTransparency = 0.35,
            TextWrapped = true,
        }, bb)
    end)
    if bb == nil then
        pcall(function()   -- dự phòng: nếu không gắn được vào part thì để trong GUI
            bb = New("BillboardGui", {
                Name = "BC_OT_BB", Adornee = part,
                Size = UDim2.new(0, 210, 0, OT.showXYZ and 46 or 30), StudsOffset = Vector3.new(0, 2.4, 0),
                AlwaysOnTop = OT.thru, MaxDistance = 3000, ResetOnSpawn = false,
            }, g)
            lbl = New("TextLabel", {
                Size = UDim2.new(1, 0, 1, 0), BackgroundTransparency = 1,
                Text = tostring(inst.Name), TextColor3 = pal.out,
                Font = Enum.Font.GothamBold, TextSize = 11,
                TextStrokeColor3 = Color3.fromRGB(0, 0, 0), TextStrokeTransparency = 0.35,
                TextWrapped = true,
            }, bb)
        end)
    end

    local box = nil
    if OT.showBox then box = OT._MakeBox(part, pal) end
    OT._slotN = (OT._slotN or 0) + 1
    OT._order[OT._slotN] = inst
    OT._orderN = OT._slotN
    OT.items[inst] = { hl = hl, bb = bb, lbl = lbl, box = box, part = part, dist = 0,
                       adornee = adornee, slot = OT._slotN, txt = nil }
    OT._renderErr = (hl == nil and bb == nil)
    if OT._renderErr then OT._err = "executor chặn Highlight/BillboardGui — không vẽ được định vị" end
end

-- Cập nhật nhãn/khoảng cách + xoá vật đã biến mất. Highlight và nhãn gắn vào vật
-- nên vật tự di chuyển theo, không cần bám bằng tay.
-- Cập nhật nhãn XOAY VÒNG: mỗi lượt chỉ đụng tối đa labelBudget vật, có trần thời gian.
-- (Trước đây mỗi 0,2s là cập nhật HẾT mọi vật -> vừa đi vừa khựng.)
-- Cập nhật MỘT vật (tách riêng cho gọn + đỡ lồng nhiều tầng).
function OT.TickOne(inst, myPos, pal)
    local it = OT.items[inst]
    if it == nil then return end
    local part = it.part
    local okA, alive = pcall(function() return part ~= nil and part.Parent ~= nil and inst.Parent ~= nil end)
    if not okA or not alive then OT.Kill(inst) return end
    local okD, d = pcall(function() return myPos and (part.Position - myPos).Magnitude or nil end)
    d = (okD and d) or nil
    it.dist = d or 0
    local far = (OT.maxDist > 0 and d ~= nil and d > OT.maxDist)
    -- Highlight/nhãn/hộp phải nằm trong Workspace mới hiện -> giữ luôn gắn đúng chỗ
    local anchor = it.adornee or inst
    if it.hl and it.hl.Parent ~= anchor then
        local okRe = pcall(function() it.hl.Parent = anchor end)
        if not okRe then
            pcall(function() it.hl:Destroy() end)
            it.hl = nil
        end
    end
    if it.hl == nil then
        pcall(function()
            it.hl = New("Highlight", {
                Name = "BC_OT_HL", Adornee = anchor,
                FillColor = pal.fill, FillTransparency = 0.7,
                OutlineColor = pal.out, OutlineTransparency = 0,
                DepthMode = OT.thru and Enum.HighlightDepthMode.AlwaysOnTop or Enum.HighlightDepthMode.Occluded,
            }, anchor)
        end)
    end
    if it.hl then
        pcall(function() it.hl.Adornee = anchor end)
        it.hl.Enabled = not far
        it.hl.FillColor = pal.fill
        it.hl.OutlineColor = pal.out
        pcall(function()
            it.hl.DepthMode = OT.thru and Enum.HighlightDepthMode.AlwaysOnTop or Enum.HighlightDepthMode.Occluded
        end)
    end
    if it.bb then
        if it.bb.Parent ~= part then pcall(function() it.bb.Parent = part end) end
        it.bb.Adornee = part
        it.bb.Enabled = (not far) and OT.showLabel
        it.bb.AlwaysOnTop = OT.thru
        pcall(function() it.bb.Size = UDim2.new(0, 210, 0, OT.showXYZ and 46 or 30) end)
    end
    if it.box then
        if it.box.Parent ~= part then pcall(function() it.box.Parent = part end) end
        it.box.Adornee = part
        pcall(function() it.box.Size = part.Size + Vector3.new(0.4, 0.4, 0.4) end)
        it.box.Visible = (not far) and OT.showBox
        it.box.Color3 = pal.fill
        it.box.AlwaysOnTop = OT.thru
    end
    if it.lbl then
        -- chỉ dựng lại chuỗi khi số liệu ĐỔI (đỡ rác bộ nhớ + đỡ vẽ lại chữ mỗi khung hình)
        local dm = otRound(d or 0)
        if it.txtName ~= inst.Name or it.txtDist ~= dm then
            it.txtName, it.txtDist = inst.Name, dm
            it.txtXYZ = OT.showXYZ and otXYZ(part) or nil
        elseif OT.showXYZ then
            it.txtXYZ = otXYZ(part)
        end
        local txt = tostring(inst.Name) .. (d and ("  📏 " .. dm .. "m") or "  📏 --m")
        if OT.showXYZ and it.txtXYZ ~= nil and it.txtXYZ ~= "" then txt = txt .. "\n🧭 " .. it.txtXYZ end
        if it.txt ~= txt then it.txt = txt end
        if it.lbl.Text ~= it.txt then it.lbl.Text = it.txt end
        it.lbl.TextColor3 = pal.out
    end
end

-- Cập nhật nhãn XOAY VÒNG: mỗi lượt chỉ đụng tối đa labelBudget vật, có trần thời gian.
-- (Trước đây mỗi 0,2s là cập nhật HẾT mọi vật -> vừa đi vừa khựng.)
function OT.Tick()
    local t0 = os.clock()
    local order = OT._order or {}
    local n = tonumber(OT._orderN) or 0
    OT._tickUpdates = 0
    if n > 0 then
        local myRoot = S.Move and S.Move.Root and S.Move.Root() or nil
        local myPos = myRoot and myRoot.Position or nil
        local pal = OT.Pal()
        local quota = math.min(tonumber(OT.labelBudget) or 20, n)
        local guard = 0
        while quota > 0 and guard < n * 2 do
            guard = guard + 1
            OT._tickIdx = (OT._tickIdx % n) + 1
            local inst = order[OT._tickIdx]
            if inst == nil then
                -- khe trống (vật đã bị xoá) — đi tiếp
            elseif OT.items[inst] == nil then
                order[OT._tickIdx] = nil
            else
                quota = quota - 1
                OT._tickUpdates = OT._tickUpdates + 1
                pcall(OT.TickOne, inst, myPos, pal)
            end
            if (os.clock() - t0) * 1000 > (OT.tickSliceMs or 1.5) then break end   -- nhả khung hình
        end
    end
    -- vật đang xem bị xoá -> ẩn khung 🎯 NGAY (không chờ hết 0,5s)
    if OT._sel ~= nil then
        local okS, aliveS = pcall(function() return OT._sel.Parent ~= nil end)
        if not okS or not aliveS then
            OT._sel, OT._selPart = nil, nil
            OT._infoAt = os.clock()
            if OT.RefreshInfo then pcall(OT.RefreshInfo) end   -- ẩn khung 🎯 ngay
        end
    end
    -- khung 🎯 thông tin vật đang chọn: làm mới thưa hơn (0,5s) cho khỏi nặng
    if OT._sel and OT.RefreshInfo and (os.clock() - (OT._infoAt or 0)) >= (OT.infoEvery or 0.5) then
        OT._infoAt = os.clock()
        pcall(OT.RefreshInfo)
    end
end

-- ============================================================================
-- QUÉT CHIA NHỎ THEO TỪNG KHUNG HÌNH (không còn GetDescendants() một phát)
-- Mỗi khung hình chỉ xử lý ~scanBudget vật trong ~scanSliceMs, nên dù map có
-- hàng chục nghìn vật thì cũng không khựng. Không dùng workspace:GetDescendants()
-- nữa (nó tạo mảng khổng lồ mỗi lượt -> đúng thủ phạm gây khựng theo chu kỳ).
-- ============================================================================
function OT.ScanBegin()
    OT.RefreshPaths()
    OT.RefreshChars()
    local root = S.Move and S.Move.Root and S.Move.Root() or nil
    OT._myPos = root and root.Position or nil
    OT._queue = { workspace }      -- ngăn xếp: cha LUÔN được xét trước con
    OT._qN = 1
    OT._hits = {}
    OT._scanned, OT._skipped = 0, 0
    OT._passing = true
    OT._passT0 = os.clock()
    OT._err = nil
end

-- Phân loại 1 vật khớp: BasePart -> chính nó; Model/Folder -> part đại diện.
-- Part nằm trong Model/Folder cũng khớp tên thì bỏ qua (cấp trên đã đại diện) — chống trùng.
function OT.ScanHit(inst)
    local okP, posOrBool = pcall(function() return inst:IsA("BasePart") end)
    if okP and posOrBool then
        local anc, guard, covered = inst.Parent, 0, false
        while anc and guard < 32 do
            guard = guard + 1
            if anc == workspace then break end
            if OT.Candidate(anc) then
                local okM, isM = pcall(function() return anc:IsA("Model") or anc:IsA("Folder") end)
                if okM and isM then covered = true break end
            end
            anc = anc.Parent
        end
        if covered then
            OT._skipped = OT._skipped + 1
            return
        end
        local okP2, pos = pcall(function() return inst.Position end)
        local d = 0
        if okP2 and pos and OT._myPos then d = (pos - OT._myPos).Magnitude end
        if OT.maxDist <= 0 or d <= OT.maxDist then
            OT._hits[#OT._hits + 1] = { inst = inst, part = inst, dist = d }
        end
        return
    end
    local okM, isM = pcall(function() return inst:IsA("Model") end)
    local okF, isF = false, false
    if not (okM and isM) then okF, isF = pcall(function() return inst:IsA("Folder") end) end
    if not ((okM and isM) or (okF and isF)) then return end
    local part = OT.PartOf(inst)
    if part == nil or part.Parent == nil then return end
    local okP3, pos = pcall(function() return part.Position end)
    local d = 0
    if okP3 and pos and OT._myPos then d = (pos - OT._myPos).Magnitude end
    if OT.maxDist <= 0 or d <= OT.maxDist then
        OT._hits[#OT._hits + 1] = { inst = inst, part = part, dist = d }
    end
end

-- Xử lý 1 lát. budget = số vật, msCap = trần thời gian (ms), runToEnd = chạy hết ngay.
function OT.ScanSlice(budget, msCap, runToEnd)
    if not OT._passing then return true end
    budget = tonumber(budget) or tonumber(OT.scanBudget) or 180
    msCap = tonumber(msCap) or tonumber(OT.scanSliceMs) or 1.2
    local t0 = os.clock()
    local done = 0
    while OT._qN > 0 do
        local inst = OT._queue[OT._qN]
        OT._queue[OT._qN] = nil
        OT._qN = OT._qN - 1
        local okK, kids = pcall(function() return inst:GetChildren() end)   -- đẩy con vào ngăn xếp
        if okK and type(kids) == "table" then
            for i = 1, #kids do
                OT._qN = OT._qN + 1
                OT._queue[OT._qN] = kids[i]
            end
        end
        if inst ~= workspace then
            OT._scanned = OT._scanned + 1
            if OT.Candidate(inst) and not OT.Skip(inst) then
                OT.ScanHit(inst)
            end
        end
        done = done + 1
        if not runToEnd and (done >= budget or (os.clock() - t0) * 1000 > msCap) then
            return false   -- hết ngân sách khung hình này, khung sau quét tiếp
        end
    end
    OT.ScanFinish()
    return true
end

-- Chốt 1 lượt quét: sắp theo khoảng cách, bỏ vật cũ, xếp hàng tạo vật mới (rải ra)
function OT.ScanFinish()
    OT._passing = false
    local hits = OT._hits or {}
    table.sort(hits, function(a, b) return a.dist < b.dist end)
    local maxN = math.max(1, tonumber(OT.maxItems) or 60)
    local keep, list = {}, {}
    local n = 0
    for i = 1, #hits do
        local h = hits[i]
        local okV, alive = pcall(function() return h.inst.Parent ~= nil and h.part.Parent ~= nil end)
        if okV and alive then
            n = n + 1
            if n <= maxN then
                keep[h.inst] = true
                list[#list + 1] = h
            end
        end
    end
    for inst in pairs(OT.items) do
        if not keep[inst] then OT.Kill(inst) end
    end
    OT._pending = {}
    for i = 1, #list do
        local h = list[i]
        local it = OT.items[h.inst]
        if it == nil then
            OT._pending[#OT._pending + 1] = h
        else
            it.part = h.part
        end
    end
    OT.list = list
    OT._found = #hits
    OT._capped = (#hits > #list)
    OT._scanMs = otRound((os.clock() - (OT._passT0 or os.clock())) * 1000)
    OT._lastScan = os.clock()
    if OT.RefreshList then pcall(OT.RefreshList) end
    return #hits
end

-- Tạo định vị mới rải ra nhiều khung hình (mỗi khung tối đa makeBudget vật)
function OT.DrainPending(quota)
    local pend = OT._pending
    if pend == nil or #pend == 0 then return 0 end
    quota = tonumber(quota) or tonumber(OT.makeBudget) or 8
    local made = 0
    while quota > 0 and #pend > 0 do
        local h = table.remove(pend, 1)
        if h ~= nil then
            local okV, alive = pcall(function() return h.inst.Parent ~= nil and h.part.Parent ~= nil end)
            if okV and alive and OT.items[h.inst] == nil then
                pcall(OT.Make, h.inst, h.part)
                made = made + 1
            end
        end
        quota = quota - 1
    end
    return made
end

-- API cũ: quét & chốt NGAY (nút 🔄, gõ tên, test). Chỉ dùng cho hành động người dùng bấm.
function OT.Rescan(force)
    if not OT.on and not (force and (#OT.keys > 0 or #(OT.pathKeys or {}) > 0)) then return 0 end
    if not force and (os.clock() - (OT._lastScan or 0)) < OT.rescanEvery then return OT._found or 0 end
    pcall(OT.ScanBegin)
    if not OT._passing then return OT._found or 0 end
    OT.ScanSlice(1e9, 1e9, true)    -- chạy hết ngay (runToEnd)
    if OT._passing then OT.ScanFinish() end
    OT.DrainPending(1e9)            -- tạo hết ngay cho hành động có chủ đích
    return OT._found or 0
end

-- Vòng lặp mỗi khung hình: KHÔNG bao giờ làm việc nặng một phát.
--  • tạo định vị mới: rải ra makeBudget vật / khung hình
--  • quét: chia lát scanBudget vật, tối đa scanSliceMs mỗi khung hình
--  • nhãn: xoay vòng labelBudget vật mỗi labelEvery giây
function OT.Step(dt)
    local step = tonumber(dt) or 0.016
    OT._acc = (OT._acc or 0) + step
    if OT._acc >= OT.labelEvery then
        OT._acc = 0
        pcall(OT.Tick)
    end
    if OT.on then
        if OT._pending ~= nil and #OT._pending > 0 then pcall(OT.DrainPending) end
        if not OT._passing then
            OT._scanAcc = (OT._scanAcc or 0) + step
            if OT._scanAcc >= (OT.scanIdle or 2.0) then
                OT._scanAcc = 0
                pcall(OT.ScanBegin)
            end
        end
        if OT._passing then pcall(OT.ScanSlice) end   -- quét tiếp lát nữa
    end
end

function OT.Bind()
    if OT._bound then return end
    OT._bound = true
    pcall(function()
        RunService:BindToRenderStep("BC_ObjTrack", Enum.RenderPriority.Camera.Value - 6, function(dt)
            pcall(OT.Step, dt)
        end)
    end)
end

function OT.Unbind()
    OT._bound = false
    pcall(function() RunService:UnbindFromRenderStep("BC_ObjTrack") end)
end

function OT.Set(on)
    on = on and true or false
    if on and #OT.keys == 0 then
        OT.on = false
        OT.Unbind()
        OT.Clear()
        pcall(function() if S.Move and S.Move.StopObjectFly then S.Move.StopObjectFly() end end)
        return false, "chưa nhập tên vật (ô 🔎 Tên vật)"
    end
    OT.on = on
    if on then
        OT.Bind()
        OT.Rescan(true)
        return true
    end
    OT.Clear()
    OT.Unbind()
    -- tắt định vị thì dừng luôn 🚀 bay tới vật (không còn vật để bám theo)
    pcall(function() if S.Move and S.Move.StopObjectFly then S.Move.StopObjectFly() end end)
    if OT.RefreshList then pcall(OT.RefreshList) end
    return false
end

function OT.Toggle() return OT.Set(not OT.on) end

-- Gõ tên là tự bật định vị (chờ 0,35s sau phím cuối cho khỏi quét liên tục)
function OT.SetQuery(q)
    OT.query = tostring(q or "")
    OT.RebuildKeys()   -- gộp ô nhập đang gõ + các mục đã ghim
    S.Debounce("objtrack", 0.35, function()
        if #OT.keys == 0 and #(OT.pathKeys or {}) == 0 then
            if OT.on then OT.Set(false) end
            OT.Clear()
            if OT.RefreshList then pcall(OT.RefreshList) end
            return
        end
        OT.on = true
        OT.Bind()
        local n = OT.Rescan(true)
        if n == 0 then
            pcall(function()
                if D.Say then
                    D.Say("⚠️ không thấy vật nào khớp \"" .. tostring(OT.query) .. "\" — thử tên ngắn hơn (VD: cây)", C.RED)
                end
            end)
        end
        if OT.RefreshList then pcall(OT.RefreshList) end
    end)
    return OT.keys
end

function OT.SetMaxDist(n)
    local v = tonumber(n) or 0
    if v ~= v or v < 0 then v = 0 end
    if v > 100000 then v = 100000 end
    OT.maxDist = v
    if OT.on then OT.Rescan(true) end
    return OT.maxDist
end

function OT.CycleColor()
    OT.color = ((tonumber(OT.color) or 1) % #OT.palette) + 1
    OT.ApplyStyle()
    return OT.Pal().name
end

function OT.ApplyStyle()
    local pal = OT.Pal()
    for _, it in pairs(OT.items) do
        if it.hl then
            it.hl.FillColor = pal.fill
            it.hl.OutlineColor = pal.out
            pcall(function()
                it.hl.DepthMode = OT.thru and Enum.HighlightDepthMode.AlwaysOnTop or Enum.HighlightDepthMode.Occluded
            end)
        end
        if it.bb then
            it.bb.AlwaysOnTop = OT.thru
            it.bb.Enabled = OT.showLabel
        end
        if it.lbl then it.lbl.TextColor3 = pal.out end
        if OT.showBox and it.box == nil and it.part then
            it.box = OT._MakeBox(it.part, pal)
        elseif it.box then
            it.box.Visible = OT.showBox
            it.box.Color3 = pal.fill
        end
    end
end

function OT.Nearest()
    local best, bestH = nil, nil
    for i = 1, #OT.list do
        local h = OT.list[i]
        if h.part and h.part.Parent and h.inst.Parent then
            if best == nil or h.dist < best then best, bestH = h.dist, h end
        end
    end
    return bestH and bestH.inst or nil, bestH
end

function OT.Status()
    if #OT.keys == 0 and #(OT.pathKeys or {}) == 0 then return "🌳 Định vị vật: chưa nhập tên" end
    local n = 0
    for _ in pairs(OT.items) do n = n + 1 end
    if n == 0 and (OT._found or 0) == 0 then
        return "⚠️ không thấy vật nào khớp \"" .. tostring(OT.query)
            .. "\" (đã quét " .. tostring(OT._scanned or 0)
            .. " vật) — thử tên ngắn hơn (VD: cây) hoặc dán đúng path"
    end
    local t = "🌳 " .. table.concat(OT.keys, " + ")
    if #OT.entries > 0 then t = t .. " （" .. #OT.entries .. " mục đã ghim）" end
    t = t .. " · theo " .. n .. "/" .. (OT._found or 0) .. " vật"
    if (OT._skipped or 0) > 0 then t = t .. " (gộp " .. OT._skipped .. " part con)" end
    if OT._capped then t = t .. " (gần nhất " .. tostring(OT.maxItems) .. ")" end
    if OT.maxDist > 0 then t = t .. " · ≤" .. otRound(OT.maxDist) .. "m" end
    if (OT._scanMs or 0) > 0 then t = t .. " · quét " .. OT._scanMs .. "ms" end
    if S.Move and S.Move._objFlyActive and S.Move._objFlyTarget then
        t = t .. " · 🚀 bay tới " .. tostring(S.Move._objFlyTarget.Name)
    end
    if OT._err then t = t .. " · ⚠️ " .. OT._err end
    return t
end

function OT.OnFlyChange()
    if OT.RefreshList then pcall(OT.RefreshList) end
end
end

-- ---------- 🌳 KHUNG ĐỊNH VỊ VẬT THEO TÊN (trong trang 👥 NGƯỜI CHƠI) ----------
do
    local OT = S.ObjTrack
    local function otRound(n) return math.floor((tonumber(n) or 0) + 0.5) end
    local function otAlive(inst) return inst ~= nil and inst.Parent ~= nil end
    local P = New("Frame", {
        Name = "HubObjTrack_Panel",
        Size = UDim2.new(1, -16, 0, 452),
        Position = UDim2.new(0, 8, 0, D.playerY or 46),
        LayoutOrder = 4,
        BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.12, BorderSizePixel = 0, ZIndex = 6,
    }, D.playerTab)
    D.playerY = (D.playerY or 46) + 452 + 8
    Corner(P, UDim.new(0, 10))
    Stroke(P, C.HAIRLINE, 1)
    D.Shade(P, Color3.fromRGB(255, 255, 255), Color3.fromRGB(188, 192, 205), 90)

    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, 4),
        Text = "🌳 ĐỊNH VỊ VẬT THEO TÊN (nhập tên là thấy MỌI vật khớp · bám theo vật đang di chuyển)",
        BackgroundTransparency = 1, TextColor3 = C.ACCENT, Font = Enum.Font.GothamBold, TextSize = 10,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 22), Position = UDim2.new(0, 8, 0, 20),
        Text = "Gõ tên vật vào ô 🔎 (VD: cây, đá, rương). Nhiều tên thì cách nhau dấu phẩy. Giống tên không cần dấu: gõ "
            .. "\"cay\" vẫn khớp \"Cây\". Bấm Enter (hoặc ➕ Thêm mục) để GHIM lại thành 1 mục — ghim được "
            .. "NHIỀU mục cùng lúc, mỗi mục có nút ✕ để xoá riêng. Vật mới xuất hiện hay bị xoá đều tự cập nhật.",
        TextWrapped = true, BackgroundTransparency = 1, TextColor3 = C.MUTED,
        Font = Enum.Font.GothamMedium, TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 7,
    }, P)

    local function otAct(txt, x, y, w, color)
        local b = New("TextButton", {
            Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundColor3 = color, TextColor3 = D.BestText(color),
            Font = Enum.Font.GothamBold, TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, P)
        Corner(b, UDim.new(0, 6))
        D.Shade(b, Color3.fromRGB(255, 255, 255), Color3.fromRGB(182, 187, 201), 90)
        D.Tactile(b, 0.08)
        return b
    end
    local function otLab(txt, x, y, w)
        New("TextLabel", {
            Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            Text = txt, BackgroundTransparency = 1, TextColor3 = C.MUTED,
            Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, P)
    end
    local function otInput(txt, x, y, w, ph)
        local box = New("TextBox", {
            Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            Text = txt, PlaceholderText = ph or "", ClearTextOnFocus = false,
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.1, TextColor3 = C.DARK,
            PlaceholderColor3 = C.GRAY, Font = Enum.Font.GothamMedium, TextSize = 9,
            TextXAlignment = Enum.TextXAlignment.Left, BorderSizePixel = 0, ZIndex = 7,
        }, P)
        Corner(box, UDim.new(0, 6))
        New("UIPadding", { PaddingLeft = UDim.new(0, 6) }, box)
        return box
    end

    otLab("🔎 Tên vật:", 8, 46, 66)
    local queryIn = otInput(S.ObjTrack.query or "", 76, 46, 246, "VD: cây, đá, rương...")
    local toggleBtn = otAct("🌳 Định vị: TẮT", 330, 46, 140, C.GREEN)
    local rescanBtn = otAct("🔄 Quét lại", 478, 46, 118, C.BLUE)

    local boxBtn = otAct("🔲 Hộp: TẮT", 8, 74, 88, C.SURFACE3)
    local thruBtn = otAct("🕶 Xuyên tường: BẬT", 100, 74, 136, C.GREEN)
    local labelBtn = otAct("💬 Nhãn: BẬT", 240, 74, 98, C.GREEN)
    local colorBtn = otAct("🎨 " .. S.ObjTrack.Pal().name, 342, 74, 148, C.PURPLE)
    local clearBtn = otAct("🧹 Xoá hết", 494, 74, 102, C.RED)

    otLab("📏 Xa nhất:", 8, 102, 66)
    local distIn = otInput(S.ObjTrack.maxDist > 0 and tostring(S.ObjTrack.maxDist) or "0", 74, 102, 46, "0")
    local distApply = otAct("✅ Đặt", 126, 102, 52, C.SURFACE3)
    local flyBtn = otAct("🚀 Bay tới gần nhất", 186, 102, 142, C.ACCENT)
    local flyStop = otAct("⏹ Dừng bay", 334, 102, 84, C.SURFACE3)
    otLab("🚀 Tốc độ:", 424, 102, 66)
    local speedIn = otInput(tostring(S.Move.objectFlySpeed or 60), 492, 102, 48, "60")
    local speedApply = otAct("✅", 546, 102, 50, C.GREEN)

    local statusLbl = New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 128),
        Text = S.ObjTrack.Status(), BackgroundTransparency = 1, TextColor3 = C.ACCENT,
        Font = Enum.Font.GothamBold, TextSize = 9,
        TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
    }, P)
    local xyzBtn = otAct("🧭 Nhãn toạ độ: BẬT", 8, 146, 168, C.GREEN)
    local skipBtn = otAct("🚫 Bỏ qua người chơi: BẬT", 180, 146, 190, C.GREEN)
    -- ➕ Hàng "MỤC ĐANG CHẠY": ghim nhiều tên/path, mỗi mục bấm ✕ để xoá riêng
    S.ObjTrack.BuildTagsUI = function()
        local tagsY = 172
        local addBtn = otAct("➕ Thêm mục", 8, tagsY, 118, C.ACCENT)
        addBtn.Name = "OTAdd"
        local tags = New("ScrollingFrame", {
            Name = "OTTags",
            Size = UDim2.new(1, -142, 0, 28), Position = UDim2.new(0, 130, 0, tagsY),
            BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.25, BorderSizePixel = 0,
            ScrollBarThickness = 3, CanvasSize = UDim2.new(0, 0, 0, 0), ZIndex = 7,
            ScrollingDirection = Enum.ScrollingDirection.X,
        }, P)
        Corner(tags, UDim.new(0, 6))
        New("UIListLayout", {
            Padding = UDim.new(0, 4), FillDirection = Enum.FillDirection.Horizontal,
            SortOrder = Enum.SortOrder.LayoutOrder, VerticalAlignment = Enum.VerticalAlignment.Center,
        }, tags)
        New("UIPadding", { PaddingLeft = UDim.new(0, 6), PaddingRight = UDim.new(0, 6), PaddingTop = UDim.new(0, 5) }, tags)

        local function refreshTags()
            if not (tags and tags.Parent) then return end
            local entries = S.ObjTrack.entries or {}
            local sig = {}
            for i = 1, #entries do sig[i] = tostring(entries[i].kind) .. ":" .. tostring(entries[i].raw) end
            sig = table.concat(sig, "|")
            if sig == S.ObjTrack._tagSig then return end     -- không đổi thì khỏi dựng lại
            S.ObjTrack._tagSig = sig
            for _, ch in ipairs(tags:GetChildren()) do
                if not ch:IsA("UIListLayout") and not ch:IsA("UIPadding") then
                    pcall(function() ch:Destroy() end)
                end
            end
            if #entries == 0 then
                New("TextLabel", {
                    Name = "OTTagHint", Size = UDim2.new(1, -8, 0, 16),
                    Text = "chưa ghim mục nào — gõ tên/path rồi Enter (hoặc bấm ➕ Thêm mục) để chạy NHIỀU mục cùng lúc",
                    BackgroundTransparency = 1, TextColor3 = C.MUTED, Font = Enum.Font.GothamMedium,
                    TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 8,
                }, tags)
                pcall(function() tags.CanvasSize = UDim2.new(0, 0, 0, 0) end)
                return
            end
            local w = 0
            for i = 1, #entries do
                local e = entries[i]
                local txt = tostring(e.raw)
                local short = (#txt > 30) and (txt:sub(1, 27) .. "...") or txt
                local label = ((e.kind == "path") and "📁 " or "🏷 ") .. short
                local width = math.max(60, math.min(240, 30 + #label * 5))
                local bg = (e.kind == "path") and C.BLUE or C.SURFACE3
                local tag = New("TextButton", {
                    Name = "OTTag_" .. tostring(i),
                    Size = UDim2.new(0, width, 0, 18), LayoutOrder = i,
                    Text = "✕ " .. label, BackgroundColor3 = bg, TextColor3 = D.BestText(bg),
                    Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 8,
                    TextTruncate = Enum.TextTruncate.AtEnd,
                }, tags)
                Corner(tag, UDim.new(0, 5)); D.Tactile(tag, 0.08)
                tag.Activated:Connect(function()
                    ReleaseHubFocus()
                    local okR, raw = S.ObjTrack.RemoveEntry(i)
                    if okR then
                        D.Say("🗑 đã xoá mục '" .. tostring(raw) .. "' — các mục còn lại vẫn chạy", C.YELLOW)
                    else
                        D.Say("⚠️ " .. tostring(raw), C.RED)
                    end
                    pcall(S.ObjTrack.RefreshTags)
                    pcall(S.ObjTrack.RefreshList)
                end)
                w = w + width + 4
            end
            pcall(function() tags.CanvasSize = UDim2.new(0, w + 20, 0, 0) end)
        end
        S.ObjTrack.RefreshTags = refreshTags

        addBtn.Activated:Connect(function()
            ReleaseHubFocus()
            local raw = tostring(queryIn.Text or "")
            local okA, kindOrWhy = S.ObjTrack.AddEntry(raw)
            if okA then
                queryIn.Text = ""
                S.ObjTrack.SetQuery("")
                D.Say("➕ đã thêm mục '" .. raw .. "' — đang chạy cùng " ..
                      tostring(#S.ObjTrack.entries) .. " mục", C.GREEN)
            else
                D.Say("⚠️ " .. tostring(kindOrWhy), C.RED)
            end
            pcall(S.ObjTrack.RefreshTags)
            pcall(S.ObjTrack.RefreshList)
        end)
    end
    S.ObjTrack.BuildTagsUI()

    local list = New("ScrollingFrame", {
        Name = "ObjTrackList", Size = UDim2.new(1, -16, 0, 84), Position = UDim2.new(0, 8, 0, 206),
        BackgroundTransparency = 1, BorderSizePixel = 0, ScrollBarThickness = 4,
        CanvasSize = UDim2.new(0, 0, 0, 0), ZIndex = 7,
    }, P)
    New("UIListLayout", { Padding = UDim.new(0, 3), SortOrder = Enum.SortOrder.LayoutOrder }, list)

    -- 🎯 Khung thông tin vật đang chọn — y hệt khung "🎯 VẬT THỂ ĐƯỢC CHỌN" của phần
    -- "Phân Tích Vật Thể": Name/Class/Position/Size/Rotation/Look/Material/Color/Path,
    -- cập nhật theo vật đang chuyển động + 2 nút Copy Tọa Độ / Copy Path.
    -- (gói trong 1 hàm riêng: mỗi hàm chỉ được 200 local — xem chú thích ở tests/luau/README.md)
    -- Gán vào field của bảng thay vì "local function ...": KHÔNG chiếm slot local của khối này.
    S.ObjTrack.BuildInfoUI = function()
    local info = New("Frame", {
        Name = "OTInfo",
        Size = UDim2.new(1, -16, 0, 148), Position = UDim2.new(0, 8, 0, 296),
        BackgroundColor3 = Color3.fromRGB(20, 25, 35), BackgroundTransparency = 0,
        BorderSizePixel = 0, ZIndex = 7, Visible = false,
    }, P)
    Corner(info, UDim.new(0, 6))
    Stroke(info, C.BLUE, 1.5)
    New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 4),
        Text = "🎯 VẬT THỂ ĐƯỢC CHỌN (giống khung phân tích toạ độ — bấm 📊 ở danh sách)",
        TextColor3 = Color3.fromRGB(150, 210, 255), Font = Enum.Font.GothamBold, TextSize = 9,
        BackgroundTransparency = 1, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 8,
    }, info)
    local infoLbl = New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 104), Position = UDim2.new(0, 8, 0, 22),
        Text = "bấm 📊 ở 1 dòng trong danh sách để xem toạ độ vật đó",
        TextColor3 = Color3.fromRGB(255, 255, 255), Font = Enum.Font.Code, TextSize = 10,
        BackgroundTransparency = 1, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, TextWrapped = true, ZIndex = 8,
    }, info)
    local copyPosBtn = New("TextButton", {
        Size = UDim2.new(0, 120, 0, 18), Position = UDim2.new(0, 8, 0, 128),
        Text = "📋 Copy Tọa Độ", BackgroundColor3 = C.BLUE, TextColor3 = D.BestText(C.BLUE),
        Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
    }, info)
    Corner(copyPosBtn, UDim.new(0, 4)); D.Tactile(copyPosBtn, 0.08)
    local copyPathBtn = New("TextButton", {
        Size = UDim2.new(0, 120, 0, 18), Position = UDim2.new(0, 134, 0, 128),
        Text = "📋 Copy Path", BackgroundColor3 = C.PURPLE, TextColor3 = D.BestText(C.PURPLE),
        Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
    }, info)
    Corner(copyPathBtn, UDim.new(0, 4)); D.Tactile(copyPathBtn, 0.08)

    local function refreshInfo()
        local sel, part = OT._sel, OT._selPart
        if sel == nil or not otAlive(sel) then
            OT._sel, OT._selPart = nil, nil
            info.Visible = false
            return
        end
        if part == nil or not otAlive(part) then
            part = OT.PartOf(sel)
            OT._selPart = part
        end
        local rows = OT.Info(sel, part)
        local out = {}
        for i = 1, #rows do out[i] = rows[i].k .. ": " .. rows[i].v end
        local txt = table.concat(out, "\n")
        if infoLbl.Text ~= txt then infoLbl.Text = txt end   -- chỉ ghi khi số liệu đổi
        info.Visible = true
    end
    OT.RefreshInfo = refreshInfo
    infoLbl.Name, copyPosBtn.Name, copyPathBtn.Name = "OTInfoLbl", "OTCopyPos", "OTCopyPath"

    copyPosBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local did, txt = OT.CopyCoords()
        D.Say(did and ("📋 đã copy toạ độ: " .. tostring(txt)) or ("⚠️ " .. tostring(txt)),
              did and C.GREEN or C.RED)
    end)
    copyPathBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local did, txt = OT.CopyPath()
        D.Say(did and ("📋 đã copy path: " .. tostring(txt)) or ("⚠️ " .. tostring(txt)),
              did and C.GREEN or C.RED)
    end)
    end
    S.ObjTrack.BuildInfoUI()

    -- đặt tên control để dễ soi lỗi / kiểm thử tự động
    queryIn.Name, toggleBtn.Name, rescanBtn.Name = "OTQuery", "OTToggle", "OTRescan"
    statusLbl.Name, clearBtn.Name = "OTStatus", "OTClear"
    xyzBtn.Name, skipBtn.Name = "OTXyz", "OTSkip"

    local function paint()
        toggleBtn.Text = OT.on and "🌳 Định vị: BẬT" or "🌳 Định vị: TẮT"
        toggleBtn.BackgroundColor3 = OT.on and C.GREEN or C.SURFACE3
        toggleBtn.TextColor3 = D.BestText(toggleBtn.BackgroundColor3)
        boxBtn.Text = OT.showBox and "🔲 Hộp: BẬT" or "🔲 Hộp: TẮT"
        boxBtn.BackgroundColor3 = OT.showBox and C.GREEN or C.SURFACE3
        boxBtn.TextColor3 = D.BestText(boxBtn.BackgroundColor3)
        thruBtn.Text = OT.thru and "🕶 Xuyên tường: BẬT" or "🕶 Xuyên tường: TẮT"
        thruBtn.BackgroundColor3 = OT.thru and C.GREEN or C.SURFACE3
        thruBtn.TextColor3 = D.BestText(thruBtn.BackgroundColor3)
        labelBtn.Text = OT.showLabel and "💬 Nhãn: BẬT" or "💬 Nhãn: TẮT"
        labelBtn.BackgroundColor3 = OT.showLabel and C.GREEN or C.SURFACE3
        labelBtn.TextColor3 = D.BestText(labelBtn.BackgroundColor3)
        colorBtn.Text = "🎨 " .. OT.Pal().name
        xyzBtn.Text = OT.showXYZ and "🧭 Nhãn toạ độ: BẬT" or "🧭 Nhãn toạ độ: TẮT"
        xyzBtn.BackgroundColor3 = OT.showXYZ and C.GREEN or C.SURFACE3
        xyzBtn.TextColor3 = D.BestText(xyzBtn.BackgroundColor3)
        skipBtn.Text = OT.skipPlayers and "🚫 Bỏ qua người chơi: BẬT" or "🚫 Bỏ qua người chơi: TẮT"
        skipBtn.BackgroundColor3 = OT.skipPlayers and C.GREEN or C.SURFACE3
        skipBtn.TextColor3 = D.BestText(skipBtn.BackgroundColor3)
        local flying = (S.Move and S.Move._objFlyActive == true)
        flyStop.BackgroundColor3 = flying and C.RED or C.SURFACE3
        flyStop.TextColor3 = D.BestText(flyStop.BackgroundColor3)
        statusLbl.Text = OT.Status()
        statusLbl.TextColor3 = OT.on and C.GREEN or C.ACCENT
    end

    S.ObjTrack.RefreshList = function()
        if not (list and list.Parent) then return end
        if not (D.playerTab and D.playerTab.Visible) then return end
        local shown = math.max(0, math.min(#OT.list, tonumber(OT.showRows) or 8))
        local sigParts = {}
        for i = 1, shown do
            local h = OT.list[i]
            sigParts[i] = tostring(h.inst.Name) .. "|" .. tostring(h.inst)
        end
        local sig = table.concat(sigParts, "#")
        if #OT.list == 0 then sig = "EMPTY:" .. tostring(OT.query) .. ":" .. tostring(OT._scanned or 0) end
        if sig ~= OT._rowSig then
            OT._rowSig = sig
            for _, child in ipairs(list:GetChildren()) do
                if not child:IsA("UIListLayout") then pcall(function() child:Destroy() end) end
            end
            if #OT.list == 0 then
                -- nói rõ vì sao trống, thay vì để người dùng tưởng tính năng hỏng
                New("TextLabel", {
                    Name = "OTEmpty",
                    Size = UDim2.new(1, 0, 0, 60), LayoutOrder = 1,
                    Text = "⚠️ Không có vật nào khớp \"" .. tostring(OT.query) .. "\"\n"
                        .. "Đã quét " .. tostring(OT._scanned or 0) .. " vật trong Workspace.\n"
                        .. "Thử tên ngắn hơn (VD: cây) hoặc dán đúng Path (VD: Workspace.Rừng Cây).",
                    TextWrapped = true, BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.15,
                    TextColor3 = C.RED, Font = Enum.Font.GothamMedium, TextSize = 9,
                    BorderSizePixel = 0, ZIndex = 8, TextXAlignment = Enum.TextXAlignment.Left,
                }, list)
            end
            for i = 1, shown do
                local h = OT.list[i]
                local inst = h.inst
                local row = New("Frame", {
                    Name = "OTRow_" .. tostring(i),
                    Size = UDim2.new(1, 0, 0, 26), LayoutOrder = i,
                    BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.18,
                    BorderSizePixel = 0, ZIndex = 8,
                }, list)
                Corner(row, UDim.new(0, 6))
                Stroke(row, (S.Move and S.Move._objFlyTarget == inst) and C.ACCENT or C.BORDER, 1)
                New("TextLabel", {
                    Name = "OTName",
                    Size = UDim2.new(1, -250, 1, 0), Position = UDim2.new(0, 7, 0, 0),
                    Text = string.format("#%d  %s  (%s, %dm)", i, tostring(inst.Name),
                        tostring(inst.ClassName or "?"), otRound(h.dist)),
                    BackgroundTransparency = 1, TextColor3 = C.DARK, Font = Enum.Font.GothamBold,
                    TextSize = 8, TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 9,
                }, row)
                local infoRow = New("TextButton", {
                    Name = "OTInfoRow",
                    Size = UDim2.new(0, 56, 0, 20), Position = UDim2.new(1, -244, 0, 3),
                    Text = "📊 Xem", BackgroundColor3 = C.BLUE, TextColor3 = D.BestText(C.BLUE),
                    Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
                }, row)
                Corner(infoRow, UDim.new(0, 5)); D.Tactile(infoRow, 0.08)
                infoRow.Activated:Connect(function()
                    ReleaseHubFocus()
                    S.ObjTrack.Select(inst)
                    D.Say("📊 đang xem '" .. tostring(inst.Name) .. "' — số liệu cập nhật theo vật", C.BLUE)
                    pcall(S.ObjTrack.RefreshList)
                end)
                local flyRow = New("TextButton", {
                    Name = "OTFlyRow",
                    Size = UDim2.new(0, 84, 0, 20), Position = UDim2.new(1, -176, 0, 3),
                    Text = "🚀 Bay", BackgroundColor3 = C.ACCENT, TextColor3 = D.BestText(C.ACCENT),
                    Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
                }, row)
                Corner(flyRow, UDim.new(0, 5)); D.Tactile(flyRow, 0.08)
                flyRow.Activated:Connect(function()
                    ReleaseHubFocus()
                    local ok, res = S.Move.FlyToObject(inst)
                    if ok then
                        D.Say("🚀 đang bay tới '" .. tostring(inst.Name) .. "' · bấm ⏹ Dừng bay để dừng", C.GREEN)
                    else
                        D.Say("⚠️ " .. tostring(res), C.RED)
                    end
                    pcall(S.ObjTrack.RefreshList)
                end)
                local copyRow = New("TextButton", {
                    Name = "OTCopyRow",
                    Size = UDim2.new(0, 86, 0, 20), Position = UDim2.new(1, -88, 0, 3),
                    Text = "📋 Tên", BackgroundColor3 = C.SURFACE3, TextColor3 = D.BestText(C.SURFACE3),
                    Font = Enum.Font.GothamBold, TextSize = 8, BorderSizePixel = 0, ZIndex = 9,
                }, row)
                Corner(copyRow, UDim.new(0, 5)); D.Tactile(copyRow, 0.08)
                copyRow.Activated:Connect(function()
                    ReleaseHubFocus()
                    local did = S.CopyToClipboard(tostring(inst.Name))
                    D.Say(did and ("📋 đã copy tên '" .. tostring(inst.Name) .. "'")
                              or "⚠️ executor không có setclipboard", did and C.GREEN or C.RED)
                end)
            end
            pcall(function() list.CanvasSize = UDim2.new(0, 0, 0, math.max(0, shown * 29)) end)
        end
        paint()
    end

    S.OpenObjectPanel = function()
        local ok = S.OpenPlayerTab and S.OpenPlayerTab() or false
        if S.ObjTrack.RefreshTags then pcall(S.ObjTrack.RefreshTags) end
        pcall(S.ObjTrack.RefreshList)
        return ok
    end
    S.ObjTrack.Focus = function()
        if S.OpenObjectPanel then pcall(S.OpenObjectPanel) end
        pcall(function() if queryIn and queryIn.Parent then queryIn:CaptureFocus() end end)
    end

    queryIn:GetPropertyChangedSignal("Text"):Connect(function()
        S.ObjTrack.SetQuery(queryIn.Text)
    end)
    queryIn.FocusLost:Connect(function(enterPressed)
        ReleaseHubFocus()
        if enterPressed then
            -- Enter = GHIM mục này lại (chạy chung với các mục khác), không thay thế mục cũ
            local raw = tostring(queryIn.Text or "")
            local okA, kindOrWhy = S.ObjTrack.AddEntry(raw)
            if okA then
                queryIn.Text = ""
                S.ObjTrack.SetQuery("")
                D.Say("➕ đã ghim mục '" .. raw .. "' (Enter) — đang chạy cùng " ..
                      tostring(#S.ObjTrack.entries) .. " mục", C.GREEN)
            else
                D.Say("⚠️ " .. tostring(kindOrWhy), C.RED)
            end
            pcall(S.ObjTrack.RefreshTags)
            pcall(S.ObjTrack.RefreshList)
            return
        end
        S.ObjTrack.SetQuery(queryIn.Text)
        pcall(S.ObjTrack.RefreshList)
    end)
    toggleBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local ok, why = S.ObjTrack.Toggle()
        if ok == false and why then
            D.Say("⚠️ " .. tostring(why), C.RED)
        else
            D.Say(S.ObjTrack.Status(), ok and C.GREEN or C.YELLOW)
        end
        pcall(S.ObjTrack.RefreshList)
    end)
    rescanBtn.Activated:Connect(function()
        ReleaseHubFocus()
        if #S.ObjTrack.keys == 0 then
            D.Say("⚠️ nhập tên vật trước đã (VD: cây)", C.RED)
        else
            local n = S.ObjTrack.Rescan(true)
            D.Say("🔄 quét lại: thấy " .. tostring(n) .. " vật khớp · " .. S.ObjTrack.Status(), C.ACCENT)
        end
        pcall(S.ObjTrack.RefreshList)
    end)
    boxBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.ObjTrack.showBox = not S.ObjTrack.showBox
        S.ObjTrack.ApplyStyle()
        D.Say(S.ObjTrack.showBox and "🔲 hộp bao quanh vật: BẬT" or "🔲 hộp bao quanh vật: TẮT", C.YELLOW)
        pcall(S.ObjTrack.RefreshList)
    end)
    thruBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.ObjTrack.thru = not S.ObjTrack.thru
        S.ObjTrack.ApplyStyle()
        D.Say(S.ObjTrack.thru and "🕶 xuyên tường: BẬT (thấy cả vật sau tường)" or "🕶 xuyên tường: TẮT", C.YELLOW)
        pcall(S.ObjTrack.RefreshList)
    end)
    labelBtn.Activated:Connect(function()
        ReleaseHubFocus()
        S.ObjTrack.showLabel = not S.ObjTrack.showLabel
        S.ObjTrack.ApplyStyle()
        D.Say(S.ObjTrack.showLabel and "💬 nhãn tên + khoảng cách: BẬT" or "💬 nhãn: TẮT (chỉ còn Highlight)", C.YELLOW)
        pcall(S.ObjTrack.RefreshList)
    end)
    colorBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local name = S.ObjTrack.CycleColor()
        D.Say("🎨 màu định vị: " .. tostring(name), C.ACCENT)
        pcall(S.ObjTrack.RefreshList)
    end)
    clearBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local n = 0
        for _ in pairs(S.ObjTrack.items) do n = n + 1 end
        local nE = #(S.ObjTrack.entries or {})
        S.ObjTrack.ClearEntries()
        S.ObjTrack.Set(false)
        D.Say("🧹 đã xoá " .. tostring(n) .. " định vị vật + " .. tostring(nE) .. " mục đã ghim", C.GREEN)
        pcall(S.ObjTrack.RefreshList)
    end)
    distApply.Activated:Connect(function()
        ReleaseHubFocus()
        local n = tonumber(tostring(distIn.Text or ""):match("%-?%d+%.?%d*")) or 0
        local v = S.ObjTrack.SetMaxDist(n)
        distIn.Text = tostring(otRound(v))
        D.Say(v > 0 and ("📏 chỉ định vị vật trong " .. otRound(v) .. "m") or "📏 không giới hạn khoảng cách",
              C.ACCENT)
        pcall(S.ObjTrack.RefreshList)
    end)
    distIn.FocusLost:Connect(function()
        ReleaseHubFocus()
        local n = tonumber(tostring(distIn.Text or ""):match("%-?%d+%.?%d*")) or 0
        distIn.Text = tostring(otRound(S.ObjTrack.SetMaxDist(n)))
        pcall(S.ObjTrack.RefreshList)
    end)
    flyBtn.Activated:Connect(function()
        ReleaseHubFocus()
        local target = select(1, S.ObjTrack.Nearest())
        if not target then
            D.Say("⚠️ chưa có vật nào đang định vị — nhập tên vật trước", C.RED)
        else
            local ok, res = S.Move.FlyToObject(target)
            if ok then
                D.Say("🚀 đang bay tới '" .. tostring(target.Name) .. "' · bấm ⏹ Dừng bay để dừng", C.GREEN)
            else
                D.Say("⚠️ " .. tostring(res), C.RED)
            end
        end
        pcall(S.ObjTrack.RefreshList)
    end)
    flyStop.Activated:Connect(function()
        ReleaseHubFocus()
        S.Move.StopObjectFly()
        D.Say("⏹ đã dừng bay tới vật", C.YELLOW)
        pcall(S.ObjTrack.RefreshList)
    end)
    speedApply.Activated:Connect(function()
        ReleaseHubFocus()
        local n = tonumber(tostring(speedIn.Text or ""):match("%-?%d+%.?%d*")) or 60
        local ok, value = S.Move.SetObjectFlySpeed(n)
        if ok then
            speedIn.Text = tostring(value)
            D.Say("🚀 tốc độ bay tới vật: " .. tostring(value), C.GREEN)
        else
            D.Say("⚠️ " .. tostring(value), C.RED)
        end
    end)
    speedIn.FocusLost:Connect(function()
        ReleaseHubFocus()
        speedIn.Text = tostring(S.Move.objectFlySpeed or 60)
    end)

    skipBtn.Activated:Connect(function()
        ReleaseHubFocus()
        OT.skipPlayers = not OT.skipPlayers
        if OT.on then pcall(OT.Rescan, true) end
        D.Say(OT.skipPlayers and "🚫 bỏ qua nhân vật người chơi: BẬT" or "🚫 bỏ qua nhân vật người chơi: TẮT", C.YELLOW)
        pcall(S.ObjTrack.RefreshList)
    end)
    xyzBtn.Activated:Connect(function()
        ReleaseHubFocus()
        OT.showXYZ = not OT.showXYZ
        pcall(OT.Tick)
        D.Say(OT.showXYZ and "🧭 hiện toạ độ X/Y/Z trên nhãn: BẬT" or "🧭 hiện toạ độ trên nhãn: TẮT", C.YELLOW)
        pcall(S.ObjTrack.RefreshList)
    end)
    paint()
    pcall(S.ObjTrack.RefreshList)
    pcall(function()
        if D.playerTab then D.playerTab.CanvasSize = UDim2.new(0, 0, 0, (D.playerY or 600) + 16) end
    end)
end

_G.BananaCatHub_ObjTrack = S.ObjTrack   -- v5.1: cho script khác đọc trạng thái định vị vật

do
    local setTab = AddTab("Thiết Lập", "⚙️", 6)   -- v4.15: 5 -> 6 (👥 chen vào ô 4)

    local sy = 8
    local function rule(y)
        New("TextLabel", {
            Size = UDim2.new(1, -16, 0, 14), Position = UDim2.new(0, 8, 0, y),
            Text = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", BackgroundTransparency = 1,
            TextColor3 = C.HAIRLINE, Font = Enum.Font.Gotham, TextSize = 8,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 6,
        }, setTab)
    end
    local function card(title, h)
        local f = New("Frame", {
            Size = UDim2.new(1, -16, 0, h), Position = UDim2.new(0, 8, 0, sy),
            BackgroundColor3 = C.SURFACE, BackgroundTransparency = 0.08,
            BorderSizePixel = 0, ZIndex = 6,
        }, setTab)
        Corner(f, UDim.new(0, 10))
        Stroke(f, C.HAIRLINE, 0.18)
        New("TextLabel", {
            Size = UDim2.new(1, -16, 0, 16), Position = UDim2.new(0, 8, 0, 6),
            Text = title, BackgroundTransparency = 1, TextColor3 = C.ACCENT,
            Font = Enum.Font.GothamBold, TextSize = 10,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, f)
        sy = sy + h + 8
        return f
    end
    local function line(parent, text, y, color, h)
        return New("TextLabel", {
            Size = UDim2.new(1, -16, 0, h or 12), Position = UDim2.new(0, 8, 0, y),
            Text = text, BackgroundTransparency = 1, TextColor3 = color or C.MUTED,
            Font = Enum.Font.Gotham, TextSize = 9, TextWrapped = true,
            TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 7,
        }, parent)
    end
    local function act(parent, text, x, y, w, color)
        local b = New("TextButton", {
            Size = UDim2.new(0, w, 0, 22), Position = UDim2.new(0, x, 0, y),
            Text = text, BackgroundColor3 = color or C.SURFACE3, BackgroundTransparency = 0.08,
            TextColor3 = D.BestText(color or C.SURFACE3), Font = Enum.Font.GothamBold,
            TextSize = 9, BorderSizePixel = 0, ZIndex = 8,
        }, parent)
        Corner(b, UDim.new(0, 7))
        Stroke(b, D.Edge(color or C.SURFACE3), 0.22)
        return b
    end

    -- ---------- [1] TÌNH TRẠNG LƯU TRỮ ----------
    local c1 = card("💾  LƯU TRỮ — dữ liệu của bạn đang nằm ở đâu?", 82)
    local stTitle = line(c1, "", 24, C.GRAY, 12)
    local stBody  = line(c1, "", 38, C.MUTED, 26)
    local saveNow = act(c1, "💾 Lưu ngay", 8, 54, 92, C.GREEN)
    local reload  = act(c1, "🔄 Đọc lại từ đĩa", 106, 54, 116)

    local function refreshStorage()
        local ns, nw, nf = #scripts, #waypoints, #featureTabs
        local canDisk = Store.canWrite()
        stTitle.TextColor3 = canDisk and C.GREEN or C.YELLOW
        if canDisk then
            stTitle.Text = "✅  ĐANG GHI XUỐNG ĐĨA THẬT"
            stBody.Text = string.format(
                "File: %s\n%d script · %d waypoint · %d tab tính năng — sống qua cả lần rejoin.",
                tostring(Store.SAVE_FILE), ns, nw, nf)
        else
            stTitle.Text = "⚠️  CHỈ GIỮ TRONG RAM CỦA PHIÊN CHƠI NÀY"
            stBody.Text = string.format(
                "Executor không có writefile thật (hub đã bù bằng ổ đĩa ảo).\n%d script · %d WP · %d tab — REJOIN LÀ MẤT. Hãy bấm 📤 Xuất để sao lưu.",
                ns, nw, nf)
        end
    end
    refreshStorage()
    saveNow.Activated:Connect(function()
        local ok = Store.save()
        refreshStorage()
        flash(saveNow, ok and "✅ Đã lưu" or "❌ Lỗi", 1.4)
    end)
    reload.Activated:Connect(function()
        pcall(function() if S.DoReload then S.DoReload() end end)
        refreshStorage()
    end)

    -- ---------- [2] XUẤT / NHẬP ----------
    local c2 = card("📤  SAO LƯU & CHUYỂN MÁY", 132)
    line(c2, "Xuất toàn bộ dữ liệu ra clipboard để dán sang máy/executor khác, hoặc nhập lại chuỗi đã lưu. Nhập là GHÉP theo tên — không ghi đè cái đang có.", 24, C.MUTED, 24)
    local expBtn = act(c2, "📤 Xuất ra clipboard", 8, 50, 128, C.BLUE)
    local paste = New("TextBox", {
        Size = UDim2.new(1, -16, 0, 44), Position = UDim2.new(0, 8, 0, 76),
        PlaceholderText = "Dán JSON đã xuất vào đây rồi bấm 📥 Nhập…",
        Text = "", BackgroundColor3 = C.SURFACE2, BackgroundTransparency = 0.06,
        TextColor3 = C.DARK, PlaceholderColor3 = C.GRAY, Font = Enum.Font.Code,
        TextSize = 9, TextWrapped = true, TextXAlignment = Enum.TextXAlignment.Left,
        TextYAlignment = Enum.TextYAlignment.Top, ClearTextOnFocus = false, ZIndex = 7,
    }, c2)
    Corner(paste, UDim.new(0, 7))
    Stroke(paste, C.HAIRLINE, 0.2)
    local impBtn = act(c2, "📥 Nhập", 142, 50, 66, C.GREEN)

    expBtn.Activated:Connect(function()
        local ok, json = pcall(function() return HttpService:JSONEncode(Store.serialize()) end)
        if not ok or type(json) ~= "string" then
            flash(expBtn, "❌ Lỗi JSON", 1.6)
            return
        end
        local done = S.CopyToClipboard(json)
        if not done then
            paste.Text = json
            flash(expBtn, "⚠️ Đã dán vào ô", 1.8)
        else
            flash(expBtn, "✅ Đã copy", 1.8)
        end
    end)

    impBtn.Activated:Connect(function()
        local txt = paste.Text
        if type(txt) ~= "string" or #txt < 2 then
            flash(impBtn, "⚠️ Trống", 1.6); return
        end
        local ok, data = pcall(function() return HttpService:JSONDecode(txt) end)
        local hasPayload = ok and type(data) == "table" and (
            type(data.scripts) == "table" or type(data.waypoints) == "table"
            or type(data.features) == "table" or type(data.settings) == "table")
        if not hasPayload then
            flash(impBtn, "❌ JSON sai", 1.8); return
        end

        local function uniqueName(base, used, fallback)
            local nm = tostring(base or "")
            if nm == "" then nm = fallback end
            if not used[nm] then
                used[nm] = true
                return nm
            end
            local root, k = nm, 2
            repeat
                nm = root .. " (" .. k .. ")"
                k += 1
            until not used[nm]
            used[nm] = true
            return nm
        end

        local haveScripts, addedScripts = {}, 0
        for _, s in ipairs(scripts) do haveScripts[tostring(s.name)] = true end
        for _, s in ipairs(data.scripts or {}) do
            if type(s) == "table" and type(s.code) == "string" and #s.code > 0 then
                local nm = uniqueName(s.name, haveScripts, "Script " .. (#scripts + 1))
                scripts[#scripts + 1] = {
                    name = nm,
                    code = S.SanitizeCode(s.code),
                    expanded = (s.expanded == true),
                }
                addedScripts += 1
            end
        end

        local haveWaypoints, addedWaypoints = {}, 0
        for _, w in ipairs(waypoints) do haveWaypoints[tostring(w.name)] = true end
        for _, w in ipairs(data.waypoints or {}) do
            if type(w) == "table" and Store.isFinite(w.x) and Store.isFinite(w.y) and Store.isFinite(w.z) then
                local nm = uniqueName(w.name, haveWaypoints, "WP " .. (#waypoints + 1))
                waypoints[#waypoints + 1] = {
                    name = nm,
                    pos = Vector3.new(w.x, w.y, w.z),
                }
                addedWaypoints += 1
            end
        end

        local haveFeatures, addedFeatures = {}, 0
        for _, f in ipairs(featureTabs) do haveFeatures[tostring(f.name)] = true end
        for _, f in ipairs(data.features or {}) do
            if type(f) == "table" and type(f.code) == "string" and #f.code > 0 then
                local nm = uniqueName(f.name, haveFeatures, "Tính Năng " .. (#featureTabs + 1))
                local ic = tostring(f.icon or "⚙️")
                CreateFeatureTab(nm, ic, S.SanitizeCode(f.code))
                addedFeatures += 1
            end
        end

        if type(data.settings) == "table" then
            if type(data.settings.embedEnabled) == "boolean" then
                S.embedEnabled = data.settings.embedEnabled
            end
            if type(data.settings.embedGuessNew) == "boolean" then
                S.embedGuessNew = data.settings.embedGuessNew
            end
            if type(data.settings.parkCodeGuis) == "boolean" then
                S.parkCodeGuis = data.settings.parkCodeGuis
            end
            if type(data.settings.hubFavs) == "table" then
                S.hubFavs = S.hubFavs or {}
                for _, nm in ipairs(data.settings.hubFavs) do
                    if tostring(nm) ~= "" then S.hubFavs[tostring(nm)] = true end
                end
            end
        end

        pcall(function() RebuildScripts() end)
        pcall(function() RebuildWaypoints() end)
        pcall(function() RebuildFeatureList() end)
        pcall(function() if S.SyncEmbedToggles then S.SyncEmbedToggles() end end)
        if not S.embedEnabled then
            for _, ft in ipairs(featureTabs) do
                local hostFrame = ft.frame and ft.frame:FindFirstChild("ScriptHost")
                if hostFrame then S.ClearEmbedsUnder(hostFrame) end
            end
            pcall(S.RemoveAllParked)
            pcall(S.PruneEmbeds)
        end
        refreshStorage()
        Store.saveSoon()
        paste.Text = ""
        flash(impBtn, string.format("✅ +%d script · +%d WP · +%d tab", addedScripts, addedWaypoints, addedFeatures), 2.4)
    end)

    -- ---------- [3] MÔI TRƯỜNG EXECUTOR ----------
    local c3 = card("🖥  MÔI TRƯỜNG EXECUTOR", 74)
    local envTitle = line(c3, "", 24, C.DARK, 12)
    local envBody  = line(c3, "", 38, C.MUTED, 26)
    pcall(function()
        local nm, ver = "không rõ", ""
        if identifyexecutor then
            local a, b = identifyexecutor()
            nm = tostring(a or "không rõ"); ver = tostring(b or "")
        end
        envTitle.Text = "Executor: " .. nm .. (ver ~= "" and ("  ·  " .. ver) or "")
        local miss = {}
        for _, k in ipairs({"writefile", "readfile", "setclipboard", "gethui", "hookfunction", "Drawing", "request", "queue_on_teleport"}) do
            if not S.HasGlobal(k) then miss[#miss + 1] = k end
        end
        if #miss == 0 then
            envBody.Text = "✅ Executor đủ mọi hàm hub cần — không phải bù gì."
            envBody.TextColor3 = C.GREEN
        else
            envBody.Text = "Hub đã tự bù " .. #miss .. " hàm còn thiếu: " .. table.concat(miss, ", ")
            envBody.TextColor3 = C.YELLOW
        end
    end)

    -- ---------- [4] VÙNG NGUY HIỂM ----------
    local c4 = card("⚠️  VÙNG NGUY HIỂM", 66)
    line(c4, "Xoá sạch script đã lưu, waypoint và tab tính năng. Không hoàn tác được.", 24, C.MUTED, 14)
    local clearBtn = act(c4, "🗑 Xoá sạch dữ liệu", 8, 40, 132, C.RED)
    local armed = false
    clearBtn.Activated:Connect(function()
        if not armed then
            armed = true
            clearBtn.Text = "⚠️ Bấm lần nữa để XÁC NHẬN"
            task.delay(4, function()
                armed = false
                if clearBtn and clearBtn.Parent then clearBtn.Text = "🗑 Xoá sạch dữ liệu" end
            end)
            return
        end
        armed = false
        for i = #scripts, 1, -1 do scripts[i] = nil end
        for i = #waypoints, 1, -1 do waypoints[i] = nil end
        pcall(function() RebuildScripts() end)
        pcall(function() if Store.restoreWaypoints then Store.restoreWaypoints() end end)
        Store.save()
        refreshStorage()
        flash(clearBtn, "✅ Đã xoá", 1.6)
    end)

    setTab.CanvasSize = UDim2.new(0, 0, 0, sy + 8)
    S.settingsTab = setTab
    S.settingsBtns = {save = saveNow, reload = reload, export = expBtn, import = impBtn,
                      paste = paste, clear = clearBtn, statusTitle = stTitle, statusBody = stBody,
                      envTitle = envTitle, envBody = envBody, cardStorage = c1, cardEnv = c3}
    S.refreshStorageCard = refreshStorage   -- để chỗ khác gọi lại sau khi trạng thái lưu thay đổi
end

local function ToggleMainFrame()
    main.Visible = not main.Visible
    togBtn.Text = main.Visible and "✕" or ""
    if not main.Visible then ReleaseHubFocus() end   -- v4.4b: đóng menu là phải trả input cho game
    if main.Visible then
        pcall(function()
            if D.openTween then D.openTween:Cancel() end
            local ts, tp = main.Size, main.Position
            main.Size = UDim2.new(ts.X.Scale, math.max(160, ts.X.Offset - 24),
                                  ts.Y.Scale, math.max(110, ts.Y.Offset - 16))
            main.Position = UDim2.new(tp.X.Scale, tp.X.Offset + 12, tp.Y.Scale, tp.Y.Offset + 8)
            D.openTween = TweenService:Create(main,
                TweenInfo.new(0.2, Enum.EasingStyle.Quint, Enum.EasingDirection.Out),
                {Size = ts, Position = tp})
            D.openTween:Play()
            D.openTween.Completed:Connect(function()
                D.openTween = nil
                pcall(BcFit)   -- đo lại để GUI đang nhúng vừa đúng ô tab
            end)
        end)
    end
end

closeBtn.Activated:Connect(function()
    pcall(function() if D.openTween then D.openTween:Cancel() D.openTween = nil end end)
    main.Visible = false
    togBtn.Text = ""
    ReleaseHubFocus()   -- v4.5: đóng bằng ✕ cũng phải trả input cho game (trước đây chỉ có nút  làm)
end)

dragLockBtn.Activated:Connect(function()
    S.dragMenu = not S.dragMenu
    if S.dragMenu then
        dragLockBtn.Text = "🔓"
        dragLockBtn.TextColor3 = C.ACCENT   -- v4.5: vàng accent thay vì xanh
    else
        dragLockBtn.Text = "🔒"
        dragLockBtn.TextColor3 = C.MUTED
    end
end)

trackConn(titleBar.InputBegan:Connect(function(i)
    if S.dragMenu and (i.UserInputType==Enum.UserInputType.MouseButton1 or i.UserInputType==Enum.UserInputType.Touch) then
        pcall(function() if D.openTween then D.openTween:Cancel() D.openTween = nil end end)  -- v4.5
        S.dragging=true
        S.dragStart=i.Position
        S.startPos=main.Position
    end
end))

trackConn(UserInputService.InputChanged:Connect(function(i)
    if S.dragging and S.startPos and S.dragStart and (i.UserInputType==Enum.UserInputType.MouseMovement or i.UserInputType==Enum.UserInputType.Touch) then
        local d=i.Position-S.dragStart
        main.Position=UDim2.new(S.startPos.X.Scale, S.startPos.X.Offset+d.X, S.startPos.Y.Scale, S.startPos.Y.Offset+d.Y)
    end
end))

trackConn(UserInputService.InputEnded:Connect(function(i)
    if i.UserInputType==Enum.UserInputType.MouseButton1 or i.UserInputType==Enum.UserInputType.Touch then
        S.dragging=false
    end
end))

trackConn(togBtn.InputBegan:Connect(function(i)
    if i.UserInputType == Enum.UserInputType.MouseButton1 or i.UserInputType == Enum.UserInputType.Touch then
        if S.dragMenu then
            S.togDragging = true
            S.togDragStart = i.Position
            S.togStartPos = togBtn.Position
            S.togMoved = false
        end
    end
end))

trackConn(UserInputService.InputChanged:Connect(function(i)
    if S.togDragging and S.dragMenu and (i.UserInputType == Enum.UserInputType.MouseMovement or i.UserInputType == Enum.UserInputType.Touch) then
        local delta = i.Position - S.togDragStart
        if delta.Magnitude > 5 then
            S.togMoved = true
        end
        if S.togMoved then
            togBtn.Position = UDim2.new(
                S.togStartPos.X.Scale, S.togStartPos.X.Offset + delta.X,
                S.togStartPos.Y.Scale, S.togStartPos.Y.Offset + delta.Y
            )
        end
    end
end))

trackConn(UserInputService.InputEnded:Connect(function(i)
    if i.UserInputType == Enum.UserInputType.MouseButton1 or i.UserInputType == Enum.UserInputType.Touch then
        if S.togDragging then
            S.togDragging = false
            if not S.togMoved then
                ToggleMainFrame()
            end
        end
    end
end))

togBtn.Activated:Connect(function()
    if not S.dragMenu then
        ToggleMainFrame()
    end
end)

trackConn(UserInputService.InputBegan:Connect(function(i, gp)
    if not gp and i.KeyCode == Enum.KeyCode.RightControl then
        ToggleMainFrame()
    end
end))

main.Visible = true
togBtn.Text = "✕"

print(string.format(
    "✅ taodepzai v5.0 NOIR — sẵn sàng! Đã nạp lại %d script + %d waypoint + %d tab tính năng từ bộ nhớ (chế độ: %s%s)",
    Store.loadedScripts, Store.loadedWp, #Store.loadedFeatures, Store.mode,
    Store.lastError and (" | ⚠️ " .. Store.lastError) or ""
))
print("   💾 File lưu: " .. Store.SAVE_FILE .. " (trong thư mục workspace của executor — sống qua cả lần rejoin)")
print("   Tính năng: Code + Code Đã Lưu + Script Hub + Hỗ Trợ (POS+SIZE+ROT+LOOK+VẬT THỂ+HIGHLIGHT TÍM) + Thiết Lập + Tạo Tính Năng")
print("   🆕 v5.0: Di chuyển — 🚀/🛡 bay · 🧱 noclip · 🦘 nhảy · 💨 sprint · 👥 định vị/spectator · ✨ glow · 💾 lưu script/waypoint/tab")
