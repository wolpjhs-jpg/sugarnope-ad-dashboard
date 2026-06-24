(function () {
  "use strict";
  var D = window.SUGARNOPE_DATA;
  var won = function (n) { return "₩" + Math.round(n).toLocaleString("ko-KR"); };
  var num = function (n) { return Math.round(n).toLocaleString("ko-KR"); };
  var pct = function (n) { return (Math.round(n * 10) / 10).toLocaleString("ko-KR") + "%"; };
  var roas = function (value, spend) { return spend > 0 ? (value / spend) * 100 : 0; };
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- header ---------- */
  var m = D.meta;
  $("metaChips").innerHTML =
    chip("계정", m.accountName) +
    chip("기간", m.periodStart + " ~ " + m.periodEnd) +
    chip("픽셀", "SugarNope") +
    '<span class="chip off">집행상태 ' + m.deliveryStatus + "</span>";
  $("subline").textContent =
    "계정ID " + m.accountId + " · " + m.business + " · " + m.campaign + " · " + m.objective + " · 기여 " + m.attribution;
  function chip(k, v) { return '<span class="chip"><b>' + k + "</b> " + v + "</span>"; }

  /* ---------- goal ---------- */
  var g = D.goal, cap = 1200;
  $("goalNum").textContent = pct(g.currentPct);
  $("goalFill").style.width = Math.min(100, (g.currentPct / cap) * 100) + "%";
  $("goalTick").style.left = (g.targetPct / cap) * 100 + "%";
  $("goalTargetLbl").style.left = (g.targetPct / cap) * 100 + "%";
  $("goalCurLbl").textContent = pct(g.currentPct);

  /* ---------- kpis ---------- */
  var s = D.summary;
  var kpis = [
    { k: "광고비", v: won(s.spend), d: "총 집행", ic: "ti-coin" },
    { k: "웹사이트 전환값", v: won(s.convValue), d: "장바구니+결제시작", ic: "ti-shopping-cart" },
    { k: "ROAS", v: pct(s.roasPct), d: "전환값 ÷ 지출", ic: "ti-trending-up" },
    { k: "장바구니 건수", v: num(s.atcCount) + "건", d: "건당 " + won(s.cpa), ic: "ti-basket" },
    { k: "CTR", v: pct(s.ctrPct), d: "클릭 " + num(s.clicks), ic: "ti-click" },
    { k: "CPC", v: won(s.cpc), d: "링크클릭 " + num(s.linkClicks), ic: "ti-pointer" },
    { k: "CPM", v: won(s.cpm), d: "노출 " + num(s.impressions), ic: "ti-eye" },
    { k: "도달 · 빈도", v: num(s.reach), d: "빈도 " + s.frequency, ic: "ti-users" },
  ];
  $("kpis").innerHTML = kpis.map(function (c) {
    return '<div class="kpi"><div class="k"><i class="ti ' + c.ic + '"></i>' + c.k +
      '</div><div class="v">' + c.v + '</div><div class="d">' + c.d + "</div></div>";
  }).join("");

  /* ---------- daily trend chart ---------- */
  var days = D.daily.filter(function (r) { return r.spend > 5000; }); // 실집행 4일(6/20–6/23)
  new Chart($("trendChart"), {
    data: {
      labels: days.map(function (r) { return r.date; }),
      datasets: [
        { type: "bar", label: "광고비", data: days.map(function (r) { return r.spend; }), backgroundColor: "#378add", yAxisID: "y", borderRadius: 4, order: 3 },
        { type: "bar", label: "장바구니 전환값", data: days.map(function (r) { return r.atcValue; }), backgroundColor: "#1d9e75", yAxisID: "y", borderRadius: 4, order: 3 },
        { type: "line", label: "ROAS %", data: days.map(function (r) { return Math.round(roas(r.atcValue, r.spend)); }), borderColor: "#ba7517", backgroundColor: "#ba7517", yAxisID: "y1", tension: 0.3, pointRadius: 4, borderWidth: 2, order: 1 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (c) {
        if (c.dataset.yAxisID === "y1") return "ROAS " + c.parsed.y + "%";
        return c.dataset.label + " " + won(c.parsed.y);
      } } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        y: { position: "left", grid: { color: "#eef0f3" }, ticks: { font: { size: 11 }, callback: function (v) { return "₩" + v / 1000 + "k"; } } },
        y1: { position: "right", grid: { display: false }, min: 0, max: 1800, ticks: { color: "#ba7517", font: { size: 11 }, callback: function (v) { return v + "%"; } } },
      },
    },
  });

  /* ---------- funnel chart ---------- */
  new Chart($("funnelChart"), {
    type: "bar",
    data: {
      labels: D.funnel.map(function (r) { return r.step; }),
      datasets: [{ label: "이벤트 수", data: D.funnel.map(function (r) { return r.count; }),
        backgroundColor: ["#b5d4f4", "#85b7eb", "#378add", "#185fa5", "#0c447c"], borderRadius: 4 }],
    },
    options: {
      indexAxis: "y", responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (c) { return num(c.parsed.x) + "건"; } } } },
      scales: {
        x: { type: "logarithmic", grid: { color: "#eef0f3" }, ticks: { font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { font: { size: 12.5 } } },
      },
    },
  });
  var f = {}; D.funnel.forEach(function (r) { f[r.step] = r.count; });
  $("rateA").textContent = pct((f["결제 시작"] / f["장바구니"]) * 100);
  $("rateB").textContent = pct((f["구매"] / f["결제 시작"]) * 100);
  $("rateC").textContent = pct((f["구매"] / f["장바구니"]) * 100);

  /* ---------- breakdown tabs + table ---------- */
  var dims = {
    platform: { label: "매체별", rows: D.byPlatform },
    position: { label: "지면별", rows: D.byPosition },
    age: { label: "연령별", rows: D.byAge },
    gender: { label: "성별", rows: D.byGender },
  };
  var order = ["platform", "position", "age", "gender"];
  $("tabs").innerHTML = order.map(function (key, i) {
    return '<button class="tab' + (i === 0 ? " on" : "") + '" data-dim="' + key + '">' + dims[key].label + "</button>";
  }).join("");
  function rowClass(r) { var v = roas(r.atcValue, r.spend); return v >= 1000 ? "hi" : (v >= 300 ? "mid" : "lo"); }
  function renderTable(key) {
    var rows = dims[key].rows.slice().sort(function (a, b) { return b.spend - a.spend; });
    var maxSpend = Math.max.apply(null, rows.map(function (r) { return r.spend; }));
    var body = rows.map(function (r) {
      var rv = roas(r.atcValue, r.spend);
      var cpa = r.atc > 0 ? won(r.spend / r.atc) : "—";
      var share = Math.round((r.spend / maxSpend) * 100);
      return "<tr>" +
        '<td class="barcell">' + r.key + '<span class="fill" style="width:' + share + '%"></span></td>' +
        "<td>" + won(r.spend) + "</td>" +
        "<td>" + num(r.impressions) + "</td>" +
        "<td>" + pct(r.ctrPct) + "</td>" +
        "<td>" + num(r.atc) + "</td>" +
        "<td>" + cpa + "</td>" +
        "<td>" + won(r.atcValue) + "</td>" +
        '<td><span class="roas ' + rowClass(r) + '">' + (r.spend > 0 ? pct(rv) : "—") + "</span></td>" +
        "</tr>";
    }).join("");
    $("bdBody").innerHTML = body;
  }
  renderTable("platform");
  $("tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".tab"); if (!btn) return;
    [].forEach.call(document.querySelectorAll(".tab"), function (t) { t.classList.remove("on"); });
    btn.classList.add("on");
    renderTable(btn.getAttribute("data-dim"));
  });

  /* ---------- insights ---------- */
  $("findings").innerHTML = [
    li("blue", "ti-brand-instagram", "노출의 97%가 인스타그램", "광고비 " + won(307054) + " (96.5%)가 인스타에 집중, ROAS 901%. 페이스북은 소액(" + won(10281) + ")이지만 ROAS 1,281%로 더 높음."),
    li("green", "ti-player-play", "릴스·스토리가 피드보다 압도적", "피드가 예산의 92%를 쓰며 ROAS 602%인 반면, 인스타 릴스 ROAS 10,105% · 스토리 2,478%. 소액 테스트 지면이 효율 최상위."),
    li("amber", "ti-users", "젊은 층 효율 높지만 저예산", "18-34세 ROAS 2,429~4,680%인데 예산은 8%뿐. 예산 79%가 45-64세(ROAS 750~801%)에 쏠림 — 볼륨은 45-54세(148건)가 견인."),
    li("pink", "ti-gender-male", "남성 ROAS가 여성의 2배", "남성 ROAS 1,736% vs 여성 818%. 그러나 남성 예산 비중은 10.5%에 불과."),
  ].join("");
  $("recs").innerHTML = [
    li("amber", "ti-alert-triangle", "진짜 병목은 결제 전환", "장바구니→구매 0.71%. 광고 효율(장바구니 ROAS 911%)은 충분 — 카트는 폭발하나 결제로 안 넘어옴. 장바구니/결제시작 리타게팅, 체크아웃 UX·배송비·결제수단 점검 우선."),
    li("blue", "ti-target", "최적화 이벤트를 '구매'로 전환", "현재 장바구니 최적화라 광고 귀속 구매가 0건. 픽셀 구매신호는 양호(EMQ 8.7)하므로, 구매 데이터가 쌓이면 구매(또는 가치) 최적화로 전환해 실매출 ROAS 측정."),
    li("green", "ti-arrows-shuffle", "예산 재배분 테스트", "릴스/스토리 지면과 18-34세에 예산을 단계적으로 증액해 ROAS 유지 여부 검증. 피드 일변도 분산 완화."),
    li("pink", "ti-chart-dots", "비교 분석은 계정 공유 필요", "타 슈가놉 계정(1~9 등)은 현재 접근 권한 밖이라 실측 비교 불가. Artience 자산 권한 공유 시 멀티계정 ROAS 비교 추가 예정."),
  ].join("");
  function li(color, icon, t, d) {
    return '<li><span class="ic ' + color + '"><i class="ti ' + icon + '"></i></span><div><b>' + t + "</b><br><span class=\"minihint\" style=\"font-size:13px;color:var(--muted)\">" + d + "</span></div></li>";
  }

  /* ---------- footer ---------- */
  $("pulled").textContent = m.pulledAt;
})();
