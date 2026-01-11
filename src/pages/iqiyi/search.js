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
  initSearchSuggestions();
  
  // 获取URL参数
  const query = getUrlParam('q');
  const category = getUrlParam('category');
  
  if (query) {
    currentFilters.query = query;
    document.getElementById('search-input').value = query;
    document.getElementById('search-title').textContent = `"${query}" 的搜索结果`;
    // 添加到搜索历史
    addSearchHistory(query);
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
    container.innerHTML = categories.map(cat => {
      const href = cat.id === 'home' ? 'index.html' : `search.html?category=${cat.id}`;
      const isActive = currentCategory === cat.id ? 'active' : '';
      return `
        <a href="${href}" class="category-item ${isActive}" data-testid="category-${cat.id}">
          <span class="category-icon">${cat.icon}</span>
          <span>${cat.name}</span>
        </a>
      `;
    }).join('');
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
    container.innerHTML = options.map((option, index) => `
      <span class="filter-option ${currentFilters[filterKey] === option ? 'active' : ''}" 
            data-testid="filter-${filterKey}-${index}"
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
  
  // 按关键词筛选（支持标题、描述、演员、导演）
  if (currentFilters.query) {
    const query = currentFilters.query.toLowerCase();
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      v.tags.some(tag => tag.toLowerCase().includes(query)) ||
      (v.actors && v.actors.some(actor => actor.toLowerCase().includes(query))) ||
      (v.director && v.director.toLowerCase().includes(query))
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
