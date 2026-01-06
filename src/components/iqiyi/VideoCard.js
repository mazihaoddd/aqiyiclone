// VideoCard组件
function createVideoCard(video, showFreeTag = false) {
  const tagsHtml = video.tags ? video.tags.slice(0, 2).map(tag => 
    `<span class="meta-tag">${tag}</span>`
  ).join('') : '';

  return `
    <a href="detail.html?id=${video.id}" class="video-card" 
       onmouseenter="showCardOverlay(this)" 
       onmouseleave="hideCardOverlay(this)">
      <div class="card-cover">
        <img src="${video.cover}" alt="${video.title}">
        
        <div class="card-tags">
          ${video.isVip ? '<span class="tag vip-tag">VIP</span>' : ''}
          ${video.isHot ? '<span class="tag hot-tag">热播</span>' : ''}
          ${showFreeTag && !video.isVip ? '<span class="tag free-tag">免费</span>' : ''}
        </div>

        ${video.rating ? `<span class="card-rating">${video.rating}</span>` : ''}
        ${video.episodes > 1 ? `<span class="card-episodes">共${video.episodes}集</span>` : ''}

        <div class="card-overlay" style="display:none;">
          <button class="play-btn" onclick="event.preventDefault(); playVideo(${video.id})">▶ 立即播放</button>
          <button class="add-btn" onclick="event.preventDefault(); event.stopPropagation(); addToFavorite(${video.id}, '${video.title}')">+ 收藏</button>
        </div>
      </div>

      <div class="card-info">
        <h4 class="card-title">${video.title}</h4>
        <p class="card-desc">${video.description}</p>
        ${tagsHtml ? `<div class="card-meta">${tagsHtml}</div>` : ''}
      </div>
    </a>
  `;
}

function showCardOverlay(card) {
  const overlay = card.querySelector('.card-overlay');
  if (overlay) overlay.style.display = 'flex';
}

function hideCardOverlay(card) {
  const overlay = card.querySelector('.card-overlay');
  if (overlay) overlay.style.display = 'none';
}

function playVideo(id) {
  window.location.href = `detail.html?id=${id}`;
}

function addToFavorite(id, title) {
  alert(`已添加 "${title}" 到收藏`);
}

// 渲染视频网格
function renderVideoGrid(containerId, videoList, showFreeTag = false) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = videoList.map(video => createVideoCard(video, showFreeTag)).join('');
  }
}
