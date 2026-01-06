// 搜索页面逻辑
let currentFilters = {
  type: '全部',
  region: '全部',
  year: '全部',
  sort: '综合排序',
  query: ''
};

document.addEventListener('DOMContentLoaded', function() {
  initCategoryBar();
  initFilters();
  initSearch();
  
  // 获取URL参数
  const query = getUrlParam('q');
  const category = getUrlParam('category');
  
  if (query) {
    currentFilters.query = query;
    document.getElementById('search-input').value = query;
    document.getElementById('search-title').textContent = `"${query}" 的搜索结果`;
  }
  
  if (category) {
    const categoryMap = {
      'drama': '电视剧',
      'movie': '电影',
      'variety': '综艺',
      'anime': '动漫',
      'documentary': '纪录片',
      'kids': '少儿'
    };
    if (categoryMap[category]) {
      currentFilters.type = categoryMap[category];
      document.getElementById('search-title').textContent = categoryMap[category];
    }
  }
  
  filterVideos();
});

// 初始化分类导航条
function initCategoryBar() {
  const container = document.getElementById('category-list');
  const currentCategory = getUrlParam('category');
  
  if (container) {
    container.innerHTML = categories.map(cat => `
      <a href="search.html?category=${cat.id}" class="category-item ${currentCategory === cat.id ? 'active' : ''}">
        <span class="category-icon">${cat.icon}</span>
        <span>${cat.name}</span>
      </a>
    `).join('');
  }
}

// 初始化筛选器
function initFilters() {
  renderFilterOptions('filter-types', filterOptions.types, 'type');
  renderFilterOptions('filter-regions', filterOptions.regions, 'region');
  renderFilterOptions('filter-years', filterOptions.years, 'year');
  renderFilterOptions('filter-sorts', filterOptions.sorts, 'sort');
}

function renderFilterOptions(containerId, options, filterKey) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = options.map(option => `
      <span class="filter-option ${currentFilters[filterKey] === option ? 'active' : ''}" 
            onclick="setFilter('${filterKey}', '${option}')">
        ${option}
      </span>
    `).join('');
  }
}

function setFilter(key, value) {
  currentFilters[key] = value;
  initFilters(); // 重新渲染筛选器状态
  filterVideos();
}

// 筛选视频
function filterVideos() {
  let filtered = [...videos];
  
  // 按关键词筛选
  if (currentFilters.query) {
    const query = currentFilters.query.toLowerCase();
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      v.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // 按类型筛选
  if (currentFilters.type !== '全部') {
    const typeMap = {
      '电视剧': 'drama',
      '电影': 'movie',
      '综艺': 'variety',
      '动漫': 'anime',
      '纪录片': 'documentary'
    };
    const category = typeMap[currentFilters.type];
    if (category) {
      filtered = filtered.filter(v => v.category === category);
    }
  }
  
  // 按年份筛选
  if (currentFilters.year !== '全部' && currentFilters.year !== '更早') {
    const year = parseInt(currentFilters.year);
    filtered = filtered.filter(v => v.year === year);
  } else if (currentFilters.year === '更早') {
    filtered = filtered.filter(v => v.year < 2020);
  }
  
  // 排序
  switch (currentFilters.sort) {
    case '最新上线':
      filtered.sort((a, b) => b.year - a.year);
      break;
    case '评分最高':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case '最多播放':
      filtered.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
      break;
  }
  
  renderVideoList(filtered);
}

// 渲染视频列表
function renderVideoList(videoList) {
  const container = document.getElementById('video-list');
  const noResults = document.getElementById('no-results');
  const resultCount = document.getElementById('result-count');
  
  if (videoList.length === 0) {
    container.style.display = 'none';
    noResults.style.display = 'block';
    resultCount.textContent = '';
  } else {
    container.style.display = 'grid';
    noResults.style.display = 'none';
    resultCount.textContent = `共 ${videoList.length} 个结果`;
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
