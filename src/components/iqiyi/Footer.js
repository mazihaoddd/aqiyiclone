// Footer组件
function renderFooter(containerId) {
  const container = document.getElementById(containerId) || document.querySelector('.iqiyi-footer');
  
  container.innerHTML = `
    <div class="footer-container">
      <div class="footer-links">
        <div class="footer-section">
          <h5>关于我们</h5>
          <ul>
            <li><a href="#">公司介绍</a></li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">加入我们</a></li>
            <li><a href="#">合作伙伴</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>帮助中心</h5>
          <ul>
            <li><a href="#">常见问题</a></li>
            <li><a href="#">会员服务</a></li>
            <li><a href="#">播放问题</a></li>
            <li><a href="#">意见反馈</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>合作服务</h5>
          <ul>
            <li><a href="#">广告服务</a></li>
            <li><a href="#">内容合作</a></li>
            <li><a href="#">版权合作</a></li>
            <li><a href="#">开放平台</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>下载客户端</h5>
          <ul>
            <li><a href="#">iOS版</a></li>
            <li><a href="#">Android版</a></li>
            <li><a href="#">PC版</a></li>
            <li><a href="#">TV版</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-logo">
          <span class="logo-text">iQIYI</span>
        </div>
        <div class="footer-info">
          <p>© 2024 爱奇艺 版权所有</p>
          <p>本站为GUI-Agent训练环境模拟站点</p>
        </div>
        <div class="footer-social">
          <a href="#" class="social-btn">微博</a>
          <a href="#" class="social-btn">微信</a>
          <a href="#" class="social-btn">抖音</a>
        </div>
      </div>
    </div>
  `;
}

// 页面加载时渲染Footer
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.iqiyi-footer')) {
    renderFooter();
  }
});
