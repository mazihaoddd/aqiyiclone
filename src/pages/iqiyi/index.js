// 爱奇艺首页逻辑
let currentBanner = 0;

document.addEventListener('DOMContentLoaded', function() {
  initCategoryBar();
  initBanner();
  initVideos();
  initRanking();
  initSearch();
});

// 初始化分类导航条
function initCategoryBar() {
  const container = document.getElementById('category-list');
  if (container) {
    container.innerHTML = categories.map(cat => `
      <a href="search.html?category=${cat.id}" class="category-item">
        <span class="category-icon">${cat.icon}</span>
        <span>${cat.name}</span>
      </a>
    `).join('');
  }
}

// 初始化Banner
function initBanner() {
  updateBanner(0);
  
  const thumbsContainer = document.getElementById('banner-thumbs');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = bannerData.slice(0, 8).map((item, index) => `
      <div class="banner-thumb ${index === 0 ? 'active' : ''}" onclick="changeBanner(${index})">
        <img src="${item.thumbnail}" alt="${item.title}">
        <span class="thumb-title">${item.title}</span>
      </div>
    `).join('');
  }

  // 自动轮播
  setInterval(() => {
    currentBanner = (currentBanner + 1) % Math.min(bannerData.length, 8);
    changeBanner(currentBanner);
  }, 5000);
}

function changeBanner(index) {
  currentBanner = index;
  updateBanner(index);
  
  // 更新缩略图状态
  const thumbs = document.querySelectorAll('.banner-thumb');
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function updateBanner(index) {
  const banner = bannerData[index];
  const img = document.getElementById('banner-image');
  const title = document.getElementById('banner-title');
  const desc = document.getElementById('banner-desc');
  
  if (img) img.src = banner.image;
  if (title) title.textContent = banner.title;
  if (desc) desc.textContent = banner.description;
}

// 初始化视频列表
function initVideos() {
  // 热播视频 - 6个
  const hotVideos = videos.filter(v => v.isHot).slice(0, 6);
  renderVideoGrid('hot-videos', hotVideos.length >= 6 ? hotVideos : videos.slice(0, 6));
  
  // 综艺视频
  const varietyVideos = videos.filter(v => v.category === 'variety');
  renderVideoGrid('variety-videos', varietyVideos.length >= 6 ? varietyVideos.slice(0, 6) : videos.slice(0, 6));
  
  // 电影推荐
  const movieVideos = videos.filter(v => v.category === 'movie');
  renderVideoGrid('movie-videos', movieVideos.length >= 6 ? movieVideos.slice(0, 6) : videos.slice(6, 12));
}

// 渲染视频网格
function renderVideoGrid(containerId, videoList) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = videoList.map(video => createVideoCard(video)).join('');
  }
}

// 创建视频卡片
function createVideoCard(video) {
  return `
    <a href="detail.html?id=${video.id}" class="video-card">
      <div class="card-cover">
        <img src="${video.cover}" alt="${video.title}">
        <div class="card-tags">
          ${video.isVip ? '<span class="card-tag tag-vip">VIP</span>' : ''}
          ${video.isHot ? '<span class="card-tag tag-hot">热播</span>' : ''}
          ${!video.isVip ? '<span class="card-tag tag-free">免费</span>' : ''}
        </div>
        ${video.rating ? `<span class="card-rating">${video.rating}</span>` : ''}
        ${video.episodes > 1 ? `<span class="card-episodes">共${video.episodes}集</span>` : ''}
        <div class="card-overlay">
          <button class="overlay-btn btn-play-small" onclick="event.preventDefault(); playVideo(${video.id})">▶ 播放</button>
          <button class="overlay-btn btn-collect" onclick="event.preventDefault(); addToFavorite(${video.id})">+ 收藏</button>
        </div>
      </div>
      <div class="card-info">
        <h4 class="card-title">${video.title}</h4>
        <p class="card-desc">${video.description}</p>
      </div>
    </a>
  `;
}

// 初始化排行榜
function initRanking() {
  const list = document.getElementById('ranking-list');
  if (list) {
    const topVideos = [...videos].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
    list.innerHTML = topVideos.map((video, index) => `
      <li class="ranking-item" onclick="location.href='detail.html?id=${video.id}'">
        <span class="rank-num rank-${index + 1}">${index + 1}</span>
        <span class="rank-title">${video.title}</span>
      </li>
    `).join('');
  }
}

// 初始化搜索
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
}

// 搜索处理
function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
}

// 播放视频
function playVideo(id) {
  window.location.href = `detail.html?id=${id}`;
}

// 添加收藏
function addToFavorite(id) {
  const video = videos.find(v => v.id === id);
  if (video) {
    alert(`已添加 "${video.title}" 到收藏`);
  }
}
