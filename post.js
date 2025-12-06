console.log("farmer page loaded");

// ==========================
// 取得 URL 參數
// ==========================
const urlParams = new URLSearchParams(window.location.search);
const farmerName = urlParams.get("farmer");

// if (!farmerName) {
//   console.warn("沒有指定 farmer");
//   return;
// }

// ==========================
// ✅ 茶園基本資料（farmers.js）
// ==========================
const farmerContainer = document.getElementById("farmers");

const farmerData = farmers.find(f => f.farmer === farmerName);

if (farmerData && farmerContainer) {
  farmerContainer.innerHTML = `
    <img src="${farmerData.img}" alt="">
    <ul>
      <li><h3>${farmerData.farmer}</h3></li>
      <li><a href="${farmerData.location}" class="location">茶園位置</a></li>
    </ul>
    <ul class="btns">
      <li class="btn b2">
        <a href="live.html" target="_blank">看直播</a>
      </li>
      <li class="btn b2">
        <a href="${farmerData.buyLink}" class="buy">向他購買</a>
      </li>
    </ul>
  `;
}

// ==========================
// ✅ 茶園日誌（posts）
// ==========================
const postsContainer = document.getElementById("posts");

const postsData = [
  {
    farmer: "永安水庫茶園",
    count: 6,
    img: [
        "./images/carousel1.jpg",
        "./images/carousel3.jpg",
        "./images/carousel1.jpg",
        "./images/step4.jpg",
        "./images/step2.jpg",
        "./images/carousel3.jpg"
    ],
    content: [
      "今天紅茶發酵狀況非常理想，香氣很乾淨 🍃",
      "午後下了一場小雨，有助於茶葉生長。",
      "正在進行人工挑茶，確保品質穩定。",
      "日照充足，是適合採茶的一天。",
      "這批紅茶甜感明顯，令人期待。",
      "下午三點會開直播，歡迎來聊天。"
    ]
  },
  {
    farmer: "永安食蛇龜茶園",
    count: 4,
    img: [
        "./images/step2.jpg",
        "./images/carousel1.jpg",
        "./images/step1.jpg",
        "./images/carousel3.jpg"
    ],
    content: [
      "今天製作包種茶，香氣非常清雅。",
      "山區早晚溫差大，品質穩定。",
      "正在低溫慢焙，請耐心等候。",
      "明天早上會整理好上架販售。"
    ]
  },
  {
    farmer: "永安生態茶園",
    count: 7,
    img: [
        "./images/carousel3.jpg",
        "./images/step1.jpg",
        "./images/step2.jpg",
        "./images/carousel1.jpg",
        "./images/step4.jpg",
        "./images/carousel1.jpg",
        "./images/carousel3.jpg"
    ],

    content: [
      "今天巡園時看到很多昆蟲，生態很好 🌱",
      "不使用農藥，茶葉生長自然。",
      "陽光充足，葉片厚實。",
      "進行人工除草中。",
      "新一批綠茶準備採收。",
      "氣溫下降，香氣更加集中。",
      "晚上會分享茶園日常照片。"
    ]
  }
];

const farmerPosts = postsData.find(p => p.farmer === farmerName);

if (farmerPosts && postsContainer) {
  for (let i = 0; i < farmerPosts.count; i++) {
    const post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
      <div class="post-header">
        <h3>${farmerPosts.farmer}</h3>
        <span class="post-date">2025 / 01 / ${10 + i}</span>
      </div>

      <img src="${farmerPosts.img[i]}" alt="">

      <p class="post-content">${farmerPosts.content[i] || ""}</p>
    `;
    postsContainer.appendChild(post);
  }
}
