// Header组件
function renderHeader(containerId) {
  const container = document.getElementById(containerId) || document.querySelector('.iqiyi-header');
  const cart = getCart();
  
  container.innerHTML = `
    <div class="header-container">
      <div class="header-logo">
        <a href="index.html">
          <span class="logo-text">iQIYI</span>
        </a>
      </div>

      <div class="header-search">
        <form class="search-form" onsubmit="handleSearch(event)">
          <div class="search-input-wrapper">
            <input
              type="text"
              class="search-input"
              id="search-input"
              placeholder="搜索视频、演员、导演..."
              autocomplete="off"
            >
            <button type="submit" class="search-btn">🔍 搜索</button>
            <div class="search-suggestions" id="search-suggestions" style="display:none;"></div>
          </div>
          <div class="hot-searches">
            ${['琉璃', '赘婿', '狂飙', '三体', '漫长的季节'].map(item => 
              `<span class="hot-tag" onclick="quickSearch('${item}')">${item}</span>`
            ).join('')}
          </div>
        </form>
      </div>

      <div class="header-actions">
        <a href="checkout.html" class="vip-btn">
          <span class="vip-icon">👑</span>
          <span>开通会员</span>
        </a>

        ${userInfo.isLoggedIn ? `
          <div class="user-area">
            <div class="user-avatar">
              <img src="${userInfo.avatar}" alt="${userInfo.username}">
              ${userInfo.isVip ? `<span class="vip-badge">VIP${userInfo.vipLevel}</span>` : ''}
            </div>
            <div class="user-dropdown">
              <div class="dropdown-header">
                <span class="username">${userInfo.username}</span>
                ${userInfo.isVip ? `<span class="vip-expire">VIP到期: ${userInfo.vipExpireDate}</span>` : ''}
              </div>
              <ul class="dropdown-menu">
                <li><a href="cart.html">购物车 (${cart.length})</a></li>
                <li><a href="#">观看历史</a></li>
                <li><a href="#">我的收藏</a></li>
                <li><a href="#">账号设置</a></li>
                <li><a href="#" onclick="logout()">退出登录</a></li>
              </ul>
            </div>
          </div>
        ` : `
          <a href="#" class="login-btn">登录</a>
        `}

        <a href="cart.html" class="cart-btn">
          <span class="cart-icon">🛒</span>
          ${cart.length > 0 ? `<span class="cart-count">${cart.length}</span>` : ''}
        </a>

        <div class="header-tools">
          <a href="#" class="tool-btn" title="消息">📬</a>
          <a href="#" class="tool-btn" title="历史">📜</a>
          <a href="#" class="tool-btn" title="下载">⬇️</a>
        </div>
      </div>
    </div>
  `;

  // 绑定搜索事件
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', () => {
      if (searchInput.value) showSuggestions();
    });
  }
}

function handleSearch(e) {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
}

function quickSearch(query) {
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function handleSearchInput(e) {
  const value = e.target.value;
  const suggestions = document.getElementById('search-suggestions');
  
  if (value.trim()) {
    const hotSearches = ['琉璃', '赘婿', '狂飙', '三体', '漫长的季节', '繁花', '庆余年', '长相思', '莲花楼', '宁安如梦'];
    const filtered = hotSearches.filter(item => 
      item.toLowerCase().includes(value.toLowerCase())
    );
    
    if (filtered.length > 0) {
      suggestions.innerHTML = filtered.map(item => 
        `<div class="suggestion-item" onclick="quickSearch('${item}')">${item}</div>`
      ).join('');
      suggestions.style.display = 'block';
    } else {
      suggestions.style.display = 'none';
    }
  } else {
    suggestions.style.display = 'none';
  }
}

function showSuggestions() {
  const suggestions = document.getElementById('search-suggestions');
  if (suggestions && suggestions.innerHTML) {
    suggestions.style.display = 'block';
  }
}

function logout() {
  alert('已退出登录');
  location.reload();
}

// 页面加载时渲染Header
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.iqiyi-header')) {
    renderHeader();
  }
});
