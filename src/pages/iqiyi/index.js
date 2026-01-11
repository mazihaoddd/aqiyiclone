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
    container.innerHTML = categories.map(cat => {
      const href = cat.id === 'home' ? 'index.html' : `search.html?category=${cat.id}`;
      const isActive = cat.id === 'home' ? 'active' : '';
      return `
        <a href="${href}" class="category-item ${isActive}" data-testid="category-${cat.id}">
          <span class="category-icon">${cat.icon}</span>
          <span>${cat.name}</span>
        </a>
      `;
    }).join('');
  }
}

// 初始化Banner
function initBanner() {
  updateBanner(0);
  
  const thumbsContainer = document.getElementById('banner-thumbs');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = bannerData.slice(0, 8).map((item, index) => `
      <div class="banner-thumb ${index === 0 ? 'active' : ''}" 
           data-testid="banner-thumb-${index}"
           onmouseenter="changeBanner(${index})"
           onclick="goToDetail(${item.id})">
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

// 跳转到详情页
function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

// 播放当前Banner视频
function playCurrentBanner() {
  const banner = bannerData[currentBanner];
  window.location.href = `detail.html?id=${banner.id}`;
}

// 添加当前Banner到追剧
function addCurrentBannerToFavorite() {
  const banner = bannerData[currentBanner];
  alert(`已添加 "${banner.title}" 到追剧列表`);
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
    <a href="detail.html?id=${video.id}" class="video-card" data-testid="video-card-${video.id}">
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
          <button class="overlay-btn btn-play-small" data-testid="video-play-${video.id}" onclick="event.preventDefault(); playVideo(${video.id})">▶ 播放</button>
          <button class="overlay-btn btn-collect" data-testid="video-collect-${video.id}" onclick="event.preventDefault(); addToFavorite(${video.id})">+ 收藏</button>
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
      <li class="ranking-item" data-testid="ranking-item-${index + 1}" onclick="location.href='detail.html?id=${video.id}'">
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
  initSearchSuggestions();
}

// 搜索处理
function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  const errorEl = document.getElementById('search-error');
  
  // 清除之前的错误
  if (errorEl) errorEl.textContent = '';
  hideSearchSuggestions();
  
  if (!query) {
    if (errorEl) {
      errorEl.textContent = '请输入搜索内容';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  if (query.length < 2) {
    if (errorEl) {
      errorEl.textContent = '搜索内容至少2个字符';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  // 添加到搜索历史
  addSearchHistory(query);
  
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// 初始化搜索建议功能
function initSearchSuggestions() {
  const searchInput = document.getElementById('search-input');
  const searchBox = document.querySelector('.search-box');
  
  if (!searchInput || !searchBox) return;
  
  // 创建搜索建议下拉框
  let suggestionsEl = document.getElementById('search-suggestions');
  if (!suggestionsEl) {
    suggestionsEl = document.createElement('div');
    suggestionsEl.id = 'search-suggestions';
    suggestionsEl.className = 'search-suggestions';
    suggestionsEl.setAttribute('data-testid', 'search-suggestions');
    searchBox.appendChild(suggestionsEl);
  }
  
  // 输入框获得焦点时显示建议
  searchInput.addEventListener('focus', function() {
    showSearchSuggestions(this.value);
  });
  
  // 输入时更新建议
  searchInput.addEventListener('input', function() {
    showSearchSuggestions(this.value);
  });
  
  // 点击外部关闭建议
  document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target)) {
      hideSearchSuggestions();
    }
  });
}

// 显示搜索建议
function showSearchSuggestions(query) {
  const suggestionsEl = document.getElementById('search-suggestions');
  if (!suggestionsEl) return;
  
  const history = getSearchHistory();
  let html = '';
  
  // 如果有输入，显示匹配的建议
  if (query && query.length >= 1) {
    const q = query.toLowerCase();
    
    // 搜索匹配的视频、演员、导演
    const matchedVideos = videos.filter(v => 
      v.title.toLowerCase().includes(q)
    ).slice(0, 5);
    
    const matchedActors = [...new Set(
      videos.flatMap(v => v.actors || [])
        .filter(actor => actor.toLowerCase().includes(q))
    )].slice(0, 3);
    
    const matchedDirectors = [...new Set(
      videos.map(v => v.director)
        .filter(d => d && d.toLowerCase().includes(q))
    )].slice(0, 2);
    
    if (matchedVideos.length || matchedActors.length || matchedDirectors.length) {
      html += '<div class="suggestions-section">';
      
      // 视频建议
      matchedVideos.forEach((v, i) => {
        html += `<div class="suggestion-item" data-testid="suggestion-video-${i}" onclick="searchFor('${v.title}')">
          <span class="suggestion-icon">🎬</span>
          <span class="suggestion-text">${highlightMatch(v.title, query)}</span>
          <span class="suggestion-type">${v.category === 'movie' ? '电影' : v.category === 'variety' ? '综艺' : '电视剧'}</span>
        </div>`;
      });
      
      // 演员建议
      matchedActors.forEach((actor, i) => {
        html += `<div class="suggestion-item" data-testid="suggestion-actor-${i}" onclick="searchFor('${actor}')">
          <span class="suggestion-icon">👤</span>
          <span class="suggestion-text">${highlightMatch(actor, query)}</span>
          <span class="suggestion-type">演员</span>
        </div>`;
      });
      
      // 导演建议
      matchedDirectors.forEach((director, i) => {
        html += `<div class="suggestion-item" data-testid="suggestion-director-${i}" onclick="searchFor('${director}')">
          <span class="suggestion-icon">🎬</span>
          <span class="suggestion-text">${highlightMatch(director, query)}</span>
          <span class="suggestion-type">导演</span>
        </div>`;
      });
      
      html += '</div>';
    }
  } else {
    // 没有输入时显示搜索历史和热门搜索
    if (history.length > 0) {
      html += `<div class="suggestions-section">
        <div class="suggestions-header">
          <span>搜索历史</span>
          <button class="clear-history-btn" data-testid="clear-history-btn" onclick="handleClearHistory(event)">清空</button>
        </div>`;
      history.forEach((item, i) => {
        html += `<div class="suggestion-item history-item" data-testid="history-item-${i}" onclick="searchFor('${item}')">
          <span class="suggestion-icon">🕐</span>
          <span class="suggestion-text">${item}</span>
        </div>`;
      });
      html += '</div>';
    }
    
    // 热门搜索
    html += `<div class="suggestions-section">
      <div class="suggestions-header">热门搜索</div>
      <div class="hot-searches" data-testid="hot-searches">`;
    hotSearches.forEach((item, i) => {
      html += `<span class="hot-search-tag" data-testid="hot-search-${i}" onclick="searchFor('${item}')">${item}</span>`;
    });
    html += '</div></div>';
  }
  
  suggestionsEl.innerHTML = html;
  suggestionsEl.style.display = html ? 'block' : 'none';
}

// 隐藏搜索建议
function hideSearchSuggestions() {
  const suggestionsEl = document.getElementById('search-suggestions');
  if (suggestionsEl) {
    suggestionsEl.style.display = 'none';
  }
}

// 高亮匹配文字
function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<em>$1</em>');
}

// 执行搜索
function searchFor(keyword) {
  addSearchHistory(keyword);
  window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
}

// 清空搜索历史
function handleClearHistory(event) {
  event.stopPropagation();
  clearSearchHistory();
  showSearchSuggestions('');
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
