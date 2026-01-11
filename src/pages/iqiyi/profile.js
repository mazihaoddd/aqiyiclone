// 个人中心页面逻辑

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initSearch();
  loadUserData();
  
  // 检查URL参数
  const tab = getUrlParam('tab');
  if (tab) {
    switchTab(tab);
  }
});

// 初始化Tab切换
function initTabs() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const tab = this.dataset.tab;
      switchTab(tab);
    });
  });
}

// 切换Tab
function switchTab(tab) {
  // 更新菜单状态
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tab);
  });
  
  // 显示对应面板
  document.querySelectorAll('.content-panel').forEach(panel => {
    panel.style.display = 'none';
  });
  
  const targetPanel = document.getElementById(`panel-${tab}`);
  if (targetPanel) {
    targetPanel.style.display = 'block';
  }
  
  // 加载对应数据
  if (tab === 'history') {
    loadHistory();
  } else if (tab === 'favorite') {
    loadFavorites();
  }
}

// 加载用户数据
function loadUserData() {
  // 可以从localStorage或API加载
}

// 加载观看历史
function loadHistory() {
  const container = document.getElementById('history-list');
  const historyIds = userInfo.watchHistory || [1, 3, 5, 7];
  
  const historyVideos = historyIds.map(id => videos.find(v => v.id === id)).filter(Boolean);
  
  if (historyVideos.length === 0) {
    container.innerHTML = `
      <div class="empty-state" data-testid="history-empty">
        <div class="empty-icon">🕐</div>
        <p class="empty-text">暂无观看历史</p>
        <a href="index.html" class="empty-btn">去首页看看</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = historyVideos.map((video, index) => `
    <a href="detail.html?id=${video.id}" class="video-item" data-testid="history-item-${index}">
      <div class="video-item-cover">
        <img src="${video.cover}" alt="${video.title}">
        <div class="video-item-progress">
          <div class="video-item-progress-fill" style="width: ${Math.random() * 80 + 10}%"></div>
        </div>
      </div>
      <div class="video-item-title">${video.title}</div>
      <div class="video-item-info">看到第${Math.floor(Math.random() * video.episodes) + 1}集</div>
    </a>
  `).join('');
}

// 加载收藏
function loadFavorites() {
  const container = document.getElementById('favorite-list');
  const favoriteIds = userInfo.favorites || [2, 4, 6];
  
  const favoriteVideos = favoriteIds.map(id => videos.find(v => v.id === id)).filter(Boolean);
  
  if (favoriteVideos.length === 0) {
    container.innerHTML = `
      <div class="empty-state" data-testid="favorite-empty">
        <div class="empty-icon">⭐</div>
        <p class="empty-text">暂无收藏内容</p>
        <a href="search.html" class="empty-btn">去发现更多</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = favoriteVideos.map((video, index) => `
    <a href="detail.html?id=${video.id}" class="video-item" data-testid="favorite-item-${index}">
      <div class="video-item-cover">
        <img src="${video.cover}" alt="${video.title}">
      </div>
      <div class="video-item-title">${video.title}</div>
      <div class="video-item-info">${video.episodes > 1 ? `更新至${video.episodes}集` : '电影'}</div>
    </a>
  `).join('');
}

// 退出登录
function logout() {
  if (confirm('确定要退出登录吗？')) {
    alert('已退出登录');
    window.location.href = 'index.html';
  }
}

// 搜索
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

function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
}
