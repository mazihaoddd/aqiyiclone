// 详情页逻辑
let currentVideo = null;
let currentEpisode = 1;
let comments = [];
let showAllEpisodes = false;

document.addEventListener('DOMContentLoaded', function() {
  const videoId = getUrlParam('id');
  if (videoId) {
    loadVideoDetail(parseInt(videoId));
  } else {
    window.location.href = 'index.html';
  }
  initSearch();
  initComments();
});

// Tab切换
function switchTab(tab) {
  // 更新Tab按钮状态
  document.querySelectorAll('.panel-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  
  // 显示对应内容
  document.getElementById('tab-video').style.display = tab === 'video' ? 'block' : 'none';
  document.getElementById('tab-comment').style.display = tab === 'comment' ? 'block' : 'none';
}

function loadVideoDetail(id) {
  currentVideo = videos.find(v => v.id === id);
  if (!currentVideo) {
    window.location.href = 'index.html';
    return;
  }

  document.title = `${currentVideo.title} - 爱奇艺`;

  // 播放器背景
  document.getElementById('player-bg').src = currentVideo.cover;
  
  // VIP提示
  if (currentVideo.isVip) {
    document.getElementById('vip-notice').style.display = 'block';
    document.getElementById('vip-promo').style.display = 'flex';
  }

  // 视频标题
  document.getElementById('video-title').textContent = currentVideo.title;

  // 视频统计信息
  document.getElementById('video-rating').textContent = `⭐ ${currentVideo.rating || '暂无'}`;
  document.getElementById('video-year').textContent = `${currentVideo.year}年`;
  
  const categoryNames = { drama: '电视剧', movie: '电影', variety: '综艺', anime: '动漫' };
  document.getElementById('video-category').textContent = categoryNames[currentVideo.category] || '视频';

  // 标签
  document.getElementById('video-tags').innerHTML = currentVideo.tags.map(tag => 
    `<span class="tag">${tag}</span>`
  ).join('');

  // 描述
  document.getElementById('video-desc').textContent = currentVideo.description;

  // 剧集选择（多集内容）
  if (currentVideo.episodes > 1) {
    document.getElementById('episodes-card').style.display = 'block';
    document.getElementById('episodes-info').textContent = `更新至${currentVideo.episodes}集`;
    renderEpisodes();
  }

  // 相关推荐
  renderRelatedVideos();
}

function renderEpisodes() {
  const grid = document.getElementById('episodes-grid');
  const viewAllBtn = document.getElementById('view-all-btn');
  const maxShow = showAllEpisodes ? currentVideo.episodes : 15;
  const episodes = [];
  
  for (let i = 1; i <= Math.min(currentVideo.episodes, maxShow); i++) {
    const isVip = currentVideo.isVip && i > 6;
    episodes.push(`
      <button class="episode-btn ${i === currentEpisode ? 'active' : ''} ${isVip ? 'vip' : ''}" 
              onclick="selectEpisode(${i})">
        ${i}
      </button>
    `);
  }
  
  grid.innerHTML = episodes.join('');
  
  // 显示"查看全部"按钮
  if (currentVideo.episodes > 15 && !showAllEpisodes) {
    viewAllBtn.style.display = 'block';
    viewAllBtn.textContent = `查看全部(${currentVideo.episodes})`;
    viewAllBtn.onclick = () => {
      showAllEpisodes = true;
      renderEpisodes();
    };
  } else {
    viewAllBtn.style.display = 'none';
  }
}

function selectEpisode(ep) {
  currentEpisode = ep;
  renderEpisodes();
  
  if (currentVideo.isVip && ep > 6) {
    alert('该集需要VIP会员观看，请先开通VIP');
  } else {
    playCurrentVideo();
  }
}

function renderRelatedVideos() {
  const container = document.getElementById('related-videos');
  
  let related = videos.filter(v => 
    v.id !== currentVideo.id && 
    (v.category === currentVideo.category || v.tags.some(t => currentVideo.tags.includes(t)))
  ).slice(0, 6);
  
  if (related.length < 6) {
    const others = videos.filter(v => v.id !== currentVideo.id && !related.includes(v));
    related = [...related, ...others].slice(0, 6);
  }
  
  container.innerHTML = related.map(video => `
    <a href="detail.html?id=${video.id}" class="recommend-item">
      <div class="recommend-cover">
        <img src="${video.cover}" alt="${video.title}">
        <span class="recommend-tag ${video.isVip ? 'vip' : 'free'}">${video.isVip ? 'VIP' : '免费'}</span>
      </div>
      <div class="recommend-info">
        <div class="recommend-title">${video.title}</div>
        <div class="recommend-meta">${video.episodes > 1 ? `共${video.episodes}集` : '电影'}</div>
      </div>
    </a>
  `).join('');
}

function playCurrentVideo() {
  if (currentVideo.isVip && currentEpisode > 6) {
    if (confirm('该内容需要VIP会员观看，是否前往开通？')) {
      window.location.href = 'checkout.html';
    }
  } else {
    alert(`正在播放: ${currentVideo.title} 第${currentEpisode}集`);
  }
}

function addToFavorite() {
  alert(`已添加 "${currentVideo.title}" 到追剧列表`);
}

function shareVideo() {
  alert('分享链接已复制到剪贴板');
}

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


// ========== 评论功能 ==========
const mockComments = [
  { id: 1, user: '追剧小达人', avatar: '../../public/images/iqiyi/avatar.svg', isVip: true, time: '2小时前', text: '太好看了！剧情紧凑，演员演技在线，强烈推荐！', likes: 128, liked: false },
  { id: 2, user: '影视爱好者', avatar: '../../public/images/iqiyi/avatar.svg', isVip: false, time: '5小时前', text: '画面质感很棒，配乐也很用心，期待后续剧情发展', likes: 86, liked: false },
  { id: 3, user: '夜猫子', avatar: '../../public/images/iqiyi/avatar.svg', isVip: true, time: '昨天', text: '熬夜追完了，真的太上头了！', likes: 234, liked: false },
  { id: 4, user: '路人甲', avatar: '../../public/images/iqiyi/avatar.svg', isVip: false, time: '2天前', text: '剧情有点拖沓，但整体还不错', likes: 45, liked: false },
  { id: 5, user: 'VIP用户001', avatar: '../../public/images/iqiyi/avatar.svg', isVip: true, time: '3天前', text: '冲着演员来的，没让我失望！', likes: 167, liked: false },
  { id: 6, user: '小白', avatar: '../../public/images/iqiyi/avatar.svg', isVip: false, time: '1周前', text: '第一次看这种类型的剧，感觉还挺新鲜的', likes: 32, liked: false },
];

function initComments() {
  comments = [...mockComments];
  renderComments();
}

function renderComments() {
  const container = document.getElementById('comment-list');
  const countBadge = document.getElementById('comment-count-badge');
  
  countBadge.textContent = comments.length;
  
  container.innerHTML = comments.map(comment => `
    <div class="comment-item">
      <div class="comment-avatar">
        <img src="${comment.avatar}" alt="">
      </div>
      <div class="comment-body">
        <div class="comment-author">
          <span class="comment-name">${comment.user}</span>
          ${comment.isVip ? '<span class="comment-vip">VIP</span>' : ''}
          <span class="comment-time">${comment.time}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
        <div class="comment-actions">
          <button class="comment-action-btn ${comment.liked ? 'liked' : ''}" onclick="likeComment(${comment.id})">
            ${comment.liked ? '❤️' : '🤍'} ${comment.likes}
          </button>
          <button class="comment-action-btn" onclick="replyComment(${comment.id})">
            💬 回复
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function submitComment() {
  const input = document.getElementById('comment-input');
  const text = input.value.trim();
  
  if (!text) {
    alert('请输入评论内容');
    return;
  }
  
  const newComment = {
    id: Date.now(),
    user: '用户086914',
    avatar: '../../public/images/iqiyi/avatar.svg',
    isVip: true,
    time: '刚刚',
    text: text,
    likes: 0,
    liked: false
  };
  
  comments.unshift(newComment);
  input.value = '';
  renderComments();
  alert('评论发布成功！');
}

function likeComment(id) {
  const comment = comments.find(c => c.id === id);
  if (comment) {
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
    renderComments();
  }
}

function replyComment(id) {
  const comment = comments.find(c => c.id === id);
  if (comment) {
    const input = document.getElementById('comment-input');
    input.value = `@${comment.user} `;
    input.focus();
    switchTab('comment');
  }
}
