/* 航標海域：以 Canvas 2D 手繪透視的小型 3D 場景，不依賴任何外部函式庫。
   燈塔居中，三個扇區對應三個欄目，每個浮標是一則內容。 */
(function () {
  'use strict';
  var root = document.getElementById('sea');
  if (!root) return;
  var cv = root.querySelector('canvas');
  var ctx = cv.getContext && cv.getContext('2d');
  if (!ctx) return;

  var CH = {
    t: { name: '環安衛趨勢', color: '#c9a46a', shape: 'cone', centre: 90 },
    p: { name: '風險管理實戰', color: '#9fb6c3', shape: 'can', centre: 210 },
    r: { name: '職場行為科學', color: '#a7b79c', shape: 'ball', centre: 330 }
  };
  var KIND = { official: '官方來源', analysis: '作者分析', open: '待驗證問題' };

  var NODES = [
    { ch: 't', short: '台灣', kind: 'official', title: '台灣：增列結晶型游離二氧化矽濃度監測', meta: '第 04 期 · 11/20 公告', text: '職安署公告指定業別及特定粉塵場所增列監測，與監測對象、採樣數量及頻率實施方式，2027/1/1 生效。企業暴露改善成效仍待監測。', href: 'issue-04.html#regions', cta: '看第 04 期區域動向' },
    { ch: 't', short: '美國', kind: 'official', title: '美國：CSB 公布遠端隔離安全影片', meta: '第 04 期 · 11/12 公布', text: '以 2019 年 ITC、PES、TPC 三案說明手動或現地閥在火災時難以安全接近。超出七天窗口，列為製程安全背景。', href: 'issue-04.html#regions', cta: '看第 04 期區域動向' },
    { ch: 't', short: '英國', kind: 'official', title: '英國：HSE 發布 2025/26 年度職業健康與安全統計', fig: '89.1 萬', figLabel: '名工作者有工作相關壓力、憂鬱或焦慮', meta: '第 04 期 · 11/19 發布', text: '造成 1,820 萬工作日損失。整體職業健康風險及相關工日損失比率近四年大致持平。', href: 'issue-04.html#regions', cta: '看第 04 期區域動向' },
    { ch: 't', short: '日本', kind: 'official', title: '日本：東京勞動局更新建設業安全衛生對策', meta: '第 04 期 · 11/20 更新', text: '因死亡災害增加而提出防災要求。此為主管機關行動公告，尚無介入後事故下降的證據。', href: 'issue-04.html#regions', cta: '看第 04 期區域動向' },
    { ch: 't', short: '挪威', kind: 'official', title: '挪威：Havtil 稽核 ConocoPhillips 承重結構運行監測', meta: '第 04 期 · 11/20 公布 · 回覆期限 12/11', text: '確認一項缺失，涉及可能遭來訪船舶撞擊的橋樑之設計載荷及抗撞能力。修復及驗證仍待後續資料。', href: 'issue-04.html#regions', cta: '看第 04 期區域動向' },

    { ch: 'p', short: '控制層級', kind: 'analysis', title: '提醒了一百次，為什麼事故還是發生？', meta: '專文 · 2026.11.03', text: '從「叫人小心」到「讓系統不容易出錯」。用米德爾頓酒廠卸桶案例，談控制層級、工程控制與一線參與設計。', href: 'article-01.html', cta: '閱讀全文' },
    { ch: 'p', short: '有效性驗證', kind: 'analysis', title: '風機基礎撐過第一個冬天，為什麼還要回去量？', meta: '專文 · 2026.11.18', text: '用 Rampion 礁體方塊試點拆解三條驗證軌道，再談 CAPA 從執行完成、功能有效到持續有效。', href: 'article-02.html', cta: '閱讀全文' },
    { ch: 'p', short: '外部諮詢', kind: 'official', title: 'RMP 金屬加工，用外部諮詢維持管理制度', fig: '2025', figLabel: '再獲 SHARP 認可', meta: '美國 · 第 04 期', text: '自 2013 年與 TOSHA 現場諮詢合作，2024 年無可記錄職業傷病案例。公開資料未提供各措施成效。', href: 'issue-04.html#case-1', cta: '看案例' },
    { ch: 'p', short: '保密訪談', kind: 'official', title: 'Singer Instruments，把壓力訊號轉成職務與人力調整', fig: '2 人', figLabel: '因工作壓力請病假的員工，均成功復工', meta: '英國 · 第 04 期', text: '以保密訪談釐清工作量疑慮，再增加人力及推行跨職務訓練，數週後回訪。來源沒有量化病假降幅。', href: 'issue-04.html#case-2', cta: '看案例' },
    { ch: 'p', short: '自動化搬運', kind: 'official', title: 'Dinamica Generale，以自動化減少重複搬運', fig: '約 6 萬件', figLabel: '每年移除的人工搬運，單件 5–30 公斤', meta: '義大利 · 第 04 期', text: '協作機器人、自動清洗系統與電子控制搬運輔具，總投資約 34.4 萬歐元。無完整前後事故率資料。', href: 'issue-04.html#case-3', cta: '看案例' },
    { ch: 'p', short: '局部排氣', kind: 'official', title: '甲醇沾塗作業，將排氣設計移到逸散源附近', fig: '<0.888', figLabel: 'ppm，改造後甲醇濃度（原 15.95 ppm）', meta: '台灣 · 第 03 期', text: '後吸槽式氣罩搭配局部圍封。摘要未交代完整採樣條件。', href: 'issue-03.html#case-1', cta: '看案例' },
    { ch: 'p', short: '整治達標', kind: 'official', title: 'York 舊乾洗污染場址，用採樣確認整治達標', fig: '約 2 年', figLabel: 'EPA 估計達到源區目標的時間', meta: '美國 · 第 03 期', text: '所有採樣位置與深度均達到 PCE 土壤目標，後續轉向地下水污染羽流。', href: 'issue-03.html#case-2', cta: '看案例' },
    { ch: 'p', short: '趨勢監測', kind: 'official', title: 'PFAS 管理，用多年監測驗證環境變化', fig: '−30%', figLabel: '河川 PFOS，2016–2025 年', meta: '英格蘭 · 第 03 期', text: '個別措施的貢獻比例無法由趨勢數字判定，PFAS 仍廣泛存在。', href: 'issue-03.html#case-3', cta: '看案例' },
    { ch: 'p', short: '申報合規', kind: 'official', title: '高露潔棕欖補報進口化學品資料', fig: '47 項', figLabel: '超過申報門檻的化學品', meta: '美國 · 第 02 期', text: '補齊資料是已確認成果，公開資料未提供排放或暴露變化。', href: 'issue-02.html#case-1', cta: '看案例' },
    { ch: 'p', short: '防沖刷', kind: 'official', title: 'Rampion 分開驗證防沖刷與生態效益', fig: '7.5 萬', figLabel: '布放的礁體方塊約數', meta: '英國 · 第 02 期', text: '布放結構經第一個冬季仍穩定，生物多樣性效益仍待監測。', href: 'issue-02.html#case-2', cta: '看案例' },
    { ch: 'p', short: '通報時限', kind: 'official', title: 'GSV 把事故通報接到處理時限', fig: '逾 85%', figLabel: '案例記載的事故降幅', meta: '丹麥 · 第 02 期', text: '手機通報自動通知安全部門，並要求 36 小時內處理。各項措施的個別貢獻未拆分。', href: 'issue-02.html#case-3', cta: '看案例' },

    { ch: 'r', short: '停工', kind: 'open', title: '時間壓力與停工判斷', meta: '研究議程', text: '工期緊迫或交接資訊不足時，哪些條件會影響工作者暫停作業的決定？', href: '#research', cta: '看研究議程' },
    { ch: 'r', short: '通報', kind: 'open', title: '主管回應與危害通報', meta: '研究議程', text: '主管首次回應的方式，以及後續是否回報處理進度，如何影響員工下次通報的意願？', href: '#research', cta: '看研究議程' },
    { ch: 'r', short: '設計', kind: 'open', title: '工作設計與控制措施', meta: '研究議程', text: '表單、工具與設備如何影響安全步驟的執行？哪些步驟最常卡住或被跳過？', href: '#research', cta: '看研究議程' }
  ];

  // 英文版：en/beacon-en.js 會先定義 window.BEACON_I18N，覆蓋欄目名稱、來源標籤與浮標資料
  var L = window.BEACON_I18N || null;
  if (L) {
    if (L.ch) Object.keys(L.ch).forEach(function (k) { if (CH[k]) CH[k].name = L.ch[k]; });
    if (L.kind) KIND = L.kind;
    if (L.nodes) NODES = L.nodes;
  }

  var RAD = Math.PI / 180, TAU = Math.PI * 2, R_SEA = 7.4;
  // 依欄目把浮標排進各自的扇區
  // 扇區寬度依浮標數量分配；環安衛趨勢固定以 90° 為中心，預設朝向觀看者
  var keys = Object.keys(CH), weight = {}, total = 0;
  keys.forEach(function (k) {
    var c = NODES.filter(function (n) { return n.ch === k; }).length;
    weight[k] = Math.max(c, 5); total += weight[k];
  });
  var start = 90 - weight.t / total * 180, bounds = [];
  keys.forEach(function (k) {
    var span = weight[k] / total * 360;
    CH[k].from = start; CH[k].centre = start + span / 2; CH[k].span = span;
    bounds.push(start); start += span;
  });
  keys.forEach(function (k) {
    var list = NODES.filter(function (n) { return n.ch === k; });
    var half = CH[k].span / 2 - 10;
    list.forEach(function (n, i) {
      var f = (i + 0.5) / list.length * 2 - 1;
      n.a = (CH[k].centre + f * half) * RAD;
      n.r = list.length < 4 ? (i % 2 ? 5.7 : 3.9) : list.length < 7 ? (i % 2 ? 5.9 : 3.5) : [3.3, 6.0, 4.65][i % 3];
      n.x = Math.cos(n.a) * n.r; n.z = Math.sin(n.a) * n.r;
      n.phase = i * 1.7 + CH[k].centre;
    });
  });

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, dpr = 1;
  var yaw = 0, pitch = 0.52, zoom = 1, targetYaw = null;
  var filter = 'all', selected = NODES[0], hover = null;
  var lastTouch = -1e9, visible = true, t = 0, last = 0, raf = 0;
  var cx, cy, F, D = 22, cosY, sinY, cosP, sinP;

  function setCam() {
    cosY = Math.cos(yaw); sinY = Math.sin(yaw); cosP = Math.cos(pitch); sinP = Math.sin(pitch);
    var base = Math.min(W * 0.44, H * 0.9) / R_SEA;
    F = base * D * zoom; cx = W / 2; cy = H * 0.57;
  }
  function proj(x, y, z) {
    var x1 = x * cosY + z * sinY, z1 = -x * sinY + z * cosY;
    var y2 = y * cosP - z1 * sinP, z2 = y * sinP + z1 * cosP;
    var s = F / (D - z2);
    return { x: cx + x1 * s, y: cy - y2 * s, s: s, d: z1 };
  }
  function wrap(a) { a = (a + Math.PI) % TAU; if (a < 0) a += TAU; return a - Math.PI; }

  function resize() {
    var r = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(200, r.width); H = Math.max(200, r.height);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    draw();
  }

  function ring(r, style, lw, dash) {
    ctx.beginPath();
    for (var i = 0; i <= 72; i++) {
      var a = i / 72 * TAU, p = proj(Math.cos(a) * r, 0, Math.sin(a) * r);
      if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
    }
    ctx.strokeStyle = style; ctx.lineWidth = lw; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
  }
  function seg(a, r0, r1, style, lw) {
    var p = proj(Math.cos(a) * r0, 0, Math.sin(a) * r0), q = proj(Math.cos(a) * r1, 0, Math.sin(a) * r1);
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = style; ctx.lineWidth = lw; ctx.stroke();
  }

  function drawSea() {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#131f26'); g.addColorStop(1, '#18262e');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // 海面圓盤
    ctx.beginPath();
    for (var i = 0; i <= 72; i++) { var a = i / 72 * TAU, p = proj(Math.cos(a) * R_SEA, 0, Math.sin(a) * R_SEA); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }
    var c0 = proj(0, 0, 0);
    var sg = ctx.createRadialGradient(c0.x, c0.y, 0, c0.x, c0.y, R_SEA * c0.s);
    sg.addColorStop(0, '#263a44'); sg.addColorStop(1, '#1b2a33');
    ctx.fillStyle = sg; ctx.fill();
    for (var r = 1.5; r < R_SEA; r += 1.5) ring(r, 'rgba(190,205,214,.13)', 1);
    ring(R_SEA, 'rgba(201,164,106,.55)', 1.5);
    for (var d = 0; d < 360; d += 10) {
      var major = d % 30 === 0;
      seg(d * RAD, major ? R_SEA - 0.35 : R_SEA - 0.18, R_SEA, 'rgba(201,164,106,' + (major ? '.6' : '.3') + ')', 1);
    }
    for (d = 0; d < 360; d += 30) seg(d * RAD, 1.5, R_SEA - 0.35, 'rgba(255,255,255,.05)', 1);
    // 扇區分界與名稱
    bounds.forEach(function (b) { seg(b * RAD, 1.2, R_SEA, 'rgba(201,164,106,.32)', 1.2); });
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    Object.keys(CH).forEach(function (k) {
      var a = CH[k].centre * RAD, p = proj(Math.cos(a) * (R_SEA + 0.6), 0, Math.sin(a) * (R_SEA + 0.6));
      var front = (p.d / (R_SEA + 0.6) + 1) / 2;
      ctx.globalAlpha = (filter === 'all' || filter === k ? 1 : 0.35) * (0.35 + 0.65 * front);
      ctx.font = '700 ' + Math.round(Math.max(12, Math.min(15, W / 42))) + 'px system-ui, -apple-system, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = CH[k].color;
      var tw = ctx.measureText(CH[k].name).width / 2 + 6;
      ctx.fillText(CH[k].name, Math.min(Math.max(p.x, tw), W - tw), p.y);
    });
    ctx.globalAlpha = 1;
  }

  function beamAngle() { return reduce ? (selected ? selected.a : 90 * RAD) : (t * TAU / 12) % TAU; }

  function drawBeam(b) {
    var top = proj(0, 3.05, 0), half = 0.17, pts = [];
    for (var i = 0; i <= 8; i++) { var a = b - half + i / 8 * half * 2; pts.push(proj(Math.cos(a) * R_SEA, 0, Math.sin(a) * R_SEA)); }
    var o = proj(0, 0, 0), tip = proj(Math.cos(b) * R_SEA, 0, Math.sin(b) * R_SEA);
    var g = ctx.createLinearGradient(o.x, o.y, tip.x, tip.y);
    g.addColorStop(0, 'rgba(201,164,106,.42)'); g.addColorStop(1, 'rgba(201,164,106,.04)');
    ctx.beginPath(); ctx.moveTo(o.x, o.y); pts.forEach(function (p) { ctx.lineTo(p.x, p.y); }); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
    var g2 = ctx.createLinearGradient(top.x, top.y, tip.x, tip.y);
    g2.addColorStop(0, 'rgba(255,243,220,.30)'); g2.addColorStop(1, 'rgba(255,243,220,0)');
    ctx.beginPath(); ctx.moveTo(top.x, top.y); ctx.lineTo(pts[0].x, pts[0].y); ctx.lineTo(pts[8].x, pts[8].y); ctx.closePath(); ctx.fillStyle = g2; ctx.fill();
  }

  function drawLighthouse() {
    var p = proj(0, 0, 0), s = p.s, x = p.x, y = p.y;
    ctx.beginPath(); ctx.ellipse(x, y, 0.95 * s, 0.95 * s * sinP, 0, 0, TAU); ctx.fillStyle = '#3a4850'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(x, y - 0.08 * s, 0.7 * s, 0.7 * s * sinP, 0, 0, TAU); ctx.fillStyle = '#55646c'; ctx.fill();
    var hb = 2.6, wb = 0.42, wt = 0.26;
    for (var i = 0; i < 4; i++) {
      var f0 = i / 4, f1 = (i + 1) / 4, w0 = wb + (wt - wb) * f0, w1 = wb + (wt - wb) * f1;
      ctx.beginPath();
      ctx.moveTo(x - w0 * s, y - f0 * hb * s); ctx.lineTo(x + w0 * s, y - f0 * hb * s);
      ctx.lineTo(x + w1 * s, y - f1 * hb * s); ctx.lineTo(x - w1 * s, y - f1 * hb * s); ctx.closePath();
      ctx.fillStyle = i % 2 ? '#b5503a' : '#eef1f2'; ctx.fill();
    }
    ctx.fillStyle = 'rgba(0,0,0,.16)';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + wb * s, y); ctx.lineTo(x + wt * s, y - hb * s); ctx.lineTo(x, y - hb * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1b2a33'; ctx.fillRect(x - 0.4 * s, y - (hb + 0.08) * s, 0.8 * s, 0.1 * s);
    ctx.save(); ctx.shadowColor = '#fff1d6'; ctx.shadowBlur = 0.9 * s;
    ctx.fillStyle = '#fff4dc'; ctx.fillRect(x - 0.2 * s, y - (hb + 0.52) * s, 0.4 * s, 0.44 * s); ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - 0.3 * s, y - (hb + 0.52) * s); ctx.lineTo(x + 0.3 * s, y - (hb + 0.52) * s); ctx.lineTo(x, y - (hb + 0.85) * s); ctx.closePath();
    ctx.fillStyle = '#1b2a33'; ctx.fill(); ctx.strokeStyle = '#c9a46a'; ctx.lineWidth = 1; ctx.stroke();
  }

  function drawBuoy(n, p, lit) {
    var c = CH[n.ch], on = filter === 'all' || filter === n.ch;
    var isSel = n === selected, isHov = n === hover;
    var s = Math.max(p.s, 17), x = p.x, bob = reduce ? 0 : Math.sin(t * 1.4 + n.phase) * 0.05 * s, y = p.y + bob;
    var tilt = reduce ? 0 : Math.sin(t * 1.1 + n.phase) * 0.05;
    ctx.globalAlpha = on ? 1 : 0.22;
    if (isSel) {
      var pulse = reduce ? 0.5 : (Math.sin(t * 3) + 1) / 2;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, (0.62 + pulse * 0.12) * s, (0.62 + pulse * 0.12) * s * sinP, 0, 0, TAU);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.beginPath(); ctx.ellipse(p.x, p.y, 0.4 * s, 0.4 * s * sinP, 0, 0, TAU); ctx.fillStyle = 'rgba(10,18,23,.5)'; ctx.fill();
    ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
    ctx.beginPath(); ctx.moveTo(-0.3 * s, 0); ctx.lineTo(0.3 * s, 0); ctx.lineTo(0.2 * s, -0.36 * s); ctx.lineTo(-0.2 * s, -0.36 * s); ctx.closePath();
    ctx.fillStyle = c.color; ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(0, -0.36 * s, 0.25 * s, 0.36 * s);
    ctx.strokeStyle = '#e8ecee'; ctx.lineWidth = Math.max(1.5, 0.05 * s);
    ctx.beginPath(); ctx.moveTo(0, -0.36 * s); ctx.lineTo(0, -0.92 * s); ctx.stroke();
    var m = 0.19 * s, ty = -1.0 * s;
    ctx.fillStyle = c.color; ctx.beginPath();
    if (c.shape === 'cone') { ctx.moveTo(0, ty - m * 1.15); ctx.lineTo(m, ty + m * 0.7); ctx.lineTo(-m, ty + m * 0.7); ctx.closePath(); }
    else if (c.shape === 'can') { ctx.rect(-m * 0.85, ty - m * 0.85, m * 1.7, m * 1.7); }
    else { ctx.arc(0, ty, m, 0, TAU); }
    ctx.fill();
    var glow = Math.max(lit, isSel || isHov ? 1 : 0);
    if (glow > 0.02 && on) {
      ctx.shadowColor = '#fff1d6'; ctx.shadowBlur = 14 * glow; ctx.globalAlpha = glow;
      ctx.fillStyle = '#fff4dc'; ctx.beginPath(); ctx.arc(0, ty - m * 1.7, 2 + 2.5 * glow, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    // 標籤：近處常亮，遠處在光束掃過時浮現
    var front = (p.d / 6 + 1) / 2;
    var la = on ? Math.max(isSel || isHov ? 1 : 0, 0.06 + 0.94 * Math.pow(front, 1.6), lit) : 0.12;
    ctx.globalAlpha = Math.min(1, la);
    var fs = Math.round(Math.max(11, Math.min(14, s * 0.42)));
    ctx.font = (isSel || isHov ? '800 ' : '600 ') + fs + 'px system-ui, -apple-system, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    var ly = p.y + 0.4 * s * sinP + 5, tw = ctx.measureText(n.short).width;
    if (isSel || isHov) { ctx.fillStyle = '#c9a46a'; ctx.fillRect(p.x - tw / 2 - 5, ly - 2, tw + 10, fs + 6); ctx.fillStyle = '#1b2a33'; }
    else { ctx.fillStyle = '#eef1f2'; }
    ctx.fillText(n.short, p.x, ly + 1);
    ctx.globalAlpha = 1;
    n._hx = x; n._hy = y - 0.5 * s; n._hr = Math.max(24, 0.62 * s);
  }

  var hud = root.querySelector('.sea-hud');
  function draw() {
    if (!W) return;
    setCam();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawSea();
    var b = beamAngle();
    drawBeam(b);
    var items = NODES.map(function (n) { return { n: n, p: proj(n.x, 0, n.z) }; });
    items.push({ n: null, p: proj(0, 0, 0) });
    items.sort(function (a, c) { return a.p.d - c.p.d; });
    items.forEach(function (it) {
      if (!it.n) return drawLighthouse();
      var diff = Math.abs(wrap(it.n.a - b));
      drawBuoy(it.n, it.p, Math.max(0, 1 - diff / 0.4));
    });
    if (hud) {
      var brg = Math.round(((yaw / RAD) % 360 + 360) % 360);
      hud.textContent = (L && L.hud ? L.hud : '燈質 Fl W 12s　方位 ') + ('00' + brg).slice(-3) + '°';
    }
  }

  function frame(now) {
    raf = 0;
    var dt = Math.min(0.05, (now - last) / 1000 || 0); last = now;
    if (!reduce) t += dt;
    if (targetYaw !== null) {
      var d = wrap(targetYaw - yaw);
      if (Math.abs(d) < 0.002 || reduce) { yaw = targetYaw; targetYaw = null; } else yaw += d * Math.min(1, dt * 4.5);
    } else if (!reduce && !dragging && now - lastTouch > 7000) {
      yaw += dt * 0.045;
    }
    draw();
    if (visible && (!reduce || targetYaw !== null)) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }

  // 資訊面板
  var panel = root.querySelector('.sea-card');
  var listEl = root.querySelector('.sea-list');
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render() {
    var n = selected; if (!n || !panel) return;
    panel.innerHTML =
      '<div class="meta"><span class="src ' + n.kind + '">' + KIND[n.kind] + '</span><span>' + esc(CH[n.ch].name) + ' · ' + esc(n.meta) + '</span></div>' +
      '<h3>' + esc(n.title) + '</h3>' +
      (n.fig ? '<p class="fig"><b>' + esc(n.fig) + '</b><span>' + esc(n.figLabel) + '</span></p>' : '') +
      '<p>' + esc(n.text) + '</p>' +
      '<a class="go" href="' + esc(n.href) + '">' + esc(n.cta) + ' <span aria-hidden="true">→</span></a>';
    if (listEl) [].forEach.call(listEl.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-current', String(NODES[+b.dataset.i] === n));
    });
  }
  function select(n, turn) {
    selected = n;
    if (turn !== false) targetYaw = yaw + wrap(n.a - Math.PI / 2 - yaw);
    if (filter !== 'all' && filter !== n.ch) setFilter('all');
    lastTouch = performance.now();
    render(); kick(); if (reduce) draw();
  }
  if (listEl) {
    listEl.innerHTML = NODES.map(function (n, i) {
      return '<li><button type="button" data-i="' + i + '"><small>' + esc(n.short) + '</small><span>' + esc(n.title) + '</span></button></li>';
    }).join('');
    listEl.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (b) select(NODES[+b.dataset.i]);
    });
  }

  // 欄目篩選
  var chips = root.querySelectorAll('.chip');
  function setFilter(f) {
    filter = f;
    [].forEach.call(chips, function (c) { c.setAttribute('aria-pressed', String(c.dataset.ch === f)); });
    if (f !== 'all') targetYaw = yaw + wrap(CH[f].centre * RAD - Math.PI / 2 - yaw);
    lastTouch = performance.now(); kick(); if (reduce) draw();
  }
  [].forEach.call(chips, function (c) { c.addEventListener('click', function () { setFilter(c.dataset.ch); }); });

  // 指標互動：拖曳旋轉、點選浮標
  var dragging = false, px = 0, py = 0, moved = 0;
  function pick(e) {
    var r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, best = null, bd = 1e9;
    NODES.forEach(function (n) {
      if (filter !== 'all' && filter !== n.ch) return;
      var d = Math.hypot(x - n._hx, y - n._hy);
      if (d < n._hr && d < bd) { bd = d; best = n; }
    });
    return best;
  }
  cv.addEventListener('pointerdown', function (e) {
    dragging = true; moved = 0; px = e.clientX; py = e.clientY; targetYaw = null;
    cv.classList.add('dragging'); try { cv.setPointerCapture(e.pointerId); } catch (_) {}
    lastTouch = performance.now(); kick();
  });
  cv.addEventListener('pointermove', function (e) {
    if (dragging) {
      var dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      yaw += dx * 0.008;
      if (e.pointerType === 'mouse') pitch = Math.max(0.3, Math.min(0.95, pitch + dy * 0.004));
      lastTouch = performance.now();
      if (reduce) draw();
    } else if (e.pointerType === 'mouse') {
      var h = pick(e);
      if (h !== hover) { hover = h; cv.classList.toggle('hit', !!h); if (reduce) draw(); }
    }
  });
  function up(e) {
    if (!dragging) return;
    dragging = false; cv.classList.remove('dragging');
    if (e.type === 'pointerup' && moved < 8) { var n = pick(e); if (n) select(n); }
    lastTouch = performance.now();
  }
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', function () { if (hover) { hover = null; cv.classList.remove('hit'); if (reduce) draw(); } });
  cv.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') {
      var i = NODES.indexOf(selected) + (k === 'ArrowRight' ? 1 : -1);
      select(NODES[(i + NODES.length) % NODES.length]); e.preventDefault();
    } else if (k === 'Enter' && selected) { location.href = selected.href; }
  });
  [].forEach.call(root.querySelectorAll('.sea-tools button'), function (b) {
    b.addEventListener('click', function () {
      var a = b.dataset.act;
      if (a === 'in') zoom = Math.min(1.9, zoom * 1.2);
      else if (a === 'out') zoom = Math.max(0.7, zoom / 1.2);
      else { zoom = 1; pitch = 0.52; targetYaw = yaw + wrap(0 - yaw); }
      lastTouch = performance.now(); kick(); if (reduce) draw();
    });
  });

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(cv); else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    visible = es[0].isIntersecting; if (visible) kick();
  }).observe(cv);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

  var sum = root.querySelector('.sea-panel summary');
  if (sum) sum.textContent = L && L.list ? L.list(NODES.length) : '全部浮標清單（' + NODES.length + '）';
  cv.setAttribute('aria-label', L && L.aria ? L.aria(NODES.length) : '可旋轉的 3D 海圖：中央是燈塔，周圍 ' + NODES.length + ' 個浮標分屬三個欄目。按左右方向鍵切換浮標，按 Enter 前往內容；旁邊的清單列出全部項目。');
  render(); resize(); kick();
})();
