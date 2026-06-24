/*
 * 슈가놉(SugarNope) Meta 광고 성과 — 실데이터
 * 계정: 10_슈가놉_강미선 (ID 2479603099134351), 비즈니스: Artience
 * 출처: Meta Ads API 직접 조회 (2026-06-24 기준)
 * 집행 기간: 2026-06-19 ~ 2026-06-24 (실제 노출이 발생한 6일)
 *
 * 주의: "전환값"은 광고에 기여된 '장바구니 담기(Website adds to cart)' 값입니다.
 *  - 결제시작/결제완료의 '광고 기여 금액'은 Meta API에서 별도 조회되지 않습니다(캠페인 최적화 이벤트가 장바구니이기 때문).
 *  - 구매 ROAS / 광고 기여 구매건수는 "Not available" = 집행 기간 광고 귀속 구매 사실상 0건.
 *  - 퍼널(funnel) 수치는 픽셀 사이트 전체(광고+자연유입 합산)이며 광고 기여분이 아님.
 */
window.SUGARNOPE_DATA = {
  meta: {
    accountName: "10_슈가놉_강미선",
    accountId: "2479603099134351",
    business: "Artience",
    currency: "KRW",
    pixel: "SugarNope (1473970411077281)",
    periodStart: "2026-06-19",
    periodEnd: "2026-06-24",
    pulledAt: "2026-06-24",
    campaign: "SugarNope_Meta_Social_2026",
    objective: "판매(OUTCOME_SALES) · Advantage+ · 장바구니 최적화",
    deliveryStatus: "OFF (일시중지)",
    attribution: "1일 조회 / 7일 클릭",
  },

  goal: { metric: "장바구니 전환값 기준 ROAS", targetPct: 300, currentPct: 911 },

  // 계정 합계 (실측)
  summary: {
    spend: 318066,
    atcValue: 2897030,
    atcCount: 376,
    roasPct: 911,            // atcValue / spend
    cpa: 846,                // 장바구니 건당 비용
    impressions: 11519,
    reach: 9218,
    frequency: 1.25,
    clicks: 850,
    linkClicks: 790,
    ctrPct: 7.38,
    cpc: 374,
    cpm: 27612,
  },

  // 일별 (실측). 6/19·6/24는 램프업/마감으로 노출 미미.
  daily: [
    { date: "6/19", spend: 1608,   impressions: 46,   clicks: 7,   atc: 0,   atcValue: 0 },
    { date: "6/20", spend: 59407,  impressions: 1540, clicks: 100, atc: 53,  atcValue: 595770 },
    { date: "6/21", spend: 59680,  impressions: 1996, clicks: 135, atc: 65,  atcValue: 940220 },
    { date: "6/22", spend: 62034,  impressions: 2144, clicks: 199, atc: 84,  atcValue: 452720 },
    { date: "6/23", spend: 135115, impressions: 5778, clicks: 405, atc: 172, atcValue: 894220 },
    { date: "6/24", spend: 222,    impressions: 15,   clicks: 4,   atc: 2,   atcValue: 14100 },
  ],

  // 매체(publisher_platform) 별 (실측)
  byPlatform: [
    { key: "Instagram",       spend: 307054, impressions: 11217, clicks: 828, ctrPct: 7.38, atc: 368, atcValue: 2765290 },
    { key: "Facebook",        spend: 10281,  impressions: 268,   clicks: 21,  ctrPct: 7.84, atc: 8,   atcValue: 131740 },
    { key: "Audience Network",spend: 508,    impressions: 19,    clicks: 1,   ctrPct: 5.26, atc: 0,   atcValue: 0 },
    { key: "Threads",         spend: 223,    impressions: 15,    clicks: 0,   ctrPct: 0,    atc: 0,   atcValue: 0 },
  ],

  // 지면(platform_position) 별 (실측, 주요 항목)
  byPosition: [
    { key: "피드 (feed)",            spend: 293461, impressions: 10565, clicks: 775, ctrPct: 7.34, atc: 314, atcValue: 1766540 },
    { key: "인스타 스토리",          spend: 14235,  impressions: 393,   clicks: 34,  ctrPct: 8.65, atc: 17,  atcValue: 352720 },
    { key: "인스타 릴스",            spend: 7339,   impressions: 395,   clicks: 32,  ctrPct: 8.10, atc: 41,  atcValue: 741590 },
    { key: "페이스북 릴스",          spend: 1685,   impressions: 68,    clicks: 7,   ctrPct: 10.29,atc: 3,   atcValue: 8280 },
    { key: "페북 릴스 오버레이",     spend: 84,     impressions: 10,    clicks: 0,   ctrPct: 0,    atc: 1,   atcValue: 27900 },
    { key: "기타 지면",              spend: 1262,   impressions: 88,    clicks: 2,   ctrPct: 2.27, atc: 0,   atcValue: 0 },
  ],

  // 연령(age) 별 (실측)
  byAge: [
    { key: "18-24", spend: 6074,   impressions: 410,  clicks: 11,  ctrPct: 2.68, atc: 10,  atcValue: 284220 },
    { key: "25-34", spend: 18183,  impressions: 762,  clicks: 45,  ctrPct: 5.91, atc: 20,  atcValue: 441640 },
    { key: "35-44", spend: 52423,  impressions: 2035, clicks: 117, ctrPct: 5.75, atc: 49,  atcValue: 425620 },
    { key: "45-54", spend: 125315, impressions: 4327, clicks: 318, ctrPct: 7.35, atc: 148, atcValue: 940380 },
    { key: "55-64", spend: 89812,  impressions: 3035, clicks: 281, ctrPct: 9.26, atc: 131, atcValue: 719610 },
    { key: "65+",   spend: 26259,  impressions: 950,  clicks: 78,  ctrPct: 8.21, atc: 18,  atcValue: 85560 },
  ],

  // 성별(gender) 별 (실측)
  byGender: [
    { key: "여성",   spend: 283247, impressions: 10076, clicks: 771, ctrPct: 7.65, atc: 328, atcValue: 2317110 },
    { key: "남성",   spend: 33412,  impressions: 1388,  clicks: 77,  ctrPct: 5.55, atc: 48,  atcValue: 579920 },
    { key: "미상",   spend: 1407,   impressions: 55,    clicks: 2,   ctrPct: 3.64, atc: 0,   atcValue: 0 },
  ],

  // 픽셀 퍼널 — 사이트 전체(광고+자연), 2026-06-15 ~ 06-24
  funnel: [
    { step: "페이지뷰",     count: 357317 },
    { step: "콘텐츠 조회",  count: 273931 },
    { step: "장바구니",     count: 19774 },
    { step: "결제 시작",    count: 2405 },
    { step: "구매",         count: 141 },
  ],

  // 픽셀 신호품질(EMQ) — 참고
  signalQuality: [
    { event: "Purchase", emq: 8.7, freshness: "실시간" },
    { event: "InitiateCheckout", emq: 6.3, freshness: "시간단위" },
    { event: "AddToCart", emq: 6.1, freshness: "실시간" },
    { event: "ViewContent", emq: 6.1, freshness: "시간단위" },
  ],
};
