// SearchForm组件 - 已集成到Header.js中
// 此文件保留用于独立使用搜索表单的场景

function createSearchForm(initialQuery = '') {
  return `
    <form class="search-form" onsubmit="handleSearchSubmit(event)">
      <div class="search-input-wrapper">
        <input
          type="text"
          class="search-input"
          id="search-input"
          placeholder="搜索视频、演员、导演..."
          value="${initialQuery}"
          autocomplete="off"
        >
        <button type="submit" class="search-btn">🔍 搜索</button>
        <div class="search-suggestions" id="search-suggestions" style="display:none;"></div>
      </div>
      <div class="hot-searches">
        ${['琉璃', '赘婿', '狂飙', '三体', '漫长的季节'].map(item => 
          `<span class="hot-tag" onclick="doSearch('${item}')">${item}</span>`
        ).join('')}
      </div>
    </form>
  `;
}

function handleSearchSubmit(e) {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
}

function doSearch(query) {
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}
