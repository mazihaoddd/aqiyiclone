// 结算页面逻辑
let orderItems = [];
let selectedPayment = 'alipay';
let couponDiscount = 0;
let originalTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
  loadOrderItems();
  renderPaymentMethods();
  updateSummary();
});

// 加载订单商品
function loadOrderItems() {
  const checkoutItems = localStorage.getItem('checkout_items');
  if (checkoutItems) {
    orderItems = JSON.parse(checkoutItems);
  } else {
    // 默认显示推荐的VIP年卡
    orderItems = [vipProducts.find(p => p.recommended) || vipProducts[0]];
  }
  
  renderOrderItems();
}

// 渲染订单商品
function renderOrderItems() {
  const container = document.getElementById('order-items');
  
  if (orderItems.length === 0) {
    container.innerHTML = '<p style="color:#888;text-align:center;">暂无商品</p>';
    return;
  }
  
  container.innerHTML = orderItems.map((item, index) => `
    <div class="order-item" data-testid="order-item-${index}">
      <div class="order-item-info">
        <span class="order-item-icon">👑</span>
        <div>
          <div class="order-item-name">${item.title}</div>
          <div class="order-item-desc">${item.duration} × ${item.quantity || 1}</div>
        </div>
      </div>
      <div class="order-item-price">¥${item.price * (item.quantity || 1)}</div>
    </div>
  `).join('');
}

// 渲染支付方式
function renderPaymentMethods() {
  const container = document.getElementById('payment-methods');
  container.innerHTML = paymentMethods.map((method, index) => `
    <div class="payment-method ${method.id === selectedPayment ? 'active' : ''}" 
         data-testid="payment-${method.id}"
         onclick="selectPayment('${method.id}')">
      <span class="payment-icon">${method.icon}</span>
      <span class="payment-name">${method.name}</span>
    </div>
  `).join('');
}

// 选择支付方式
function selectPayment(id) {
  selectedPayment = id;
  renderPaymentMethods();
}

// 应用优惠券
function applyCoupon() {
  const code = document.getElementById('coupon-code').value.trim().toUpperCase();
  const errorEl = document.getElementById('coupon-error');
  
  // 清除之前的错误
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
  
  if (!code) {
    if (errorEl) {
      errorEl.textContent = '请输入优惠券代码';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  if (code === 'VIP10') {
    couponDiscount = Math.floor(originalTotal * 0.1);
    document.getElementById('coupon-row').style.display = 'flex';
    document.getElementById('coupon-discount').textContent = `-¥${couponDiscount}`;
    alert('优惠券已应用：9折优惠');
  } else if (code === 'NEW20') {
    couponDiscount = Math.floor(originalTotal * 0.2);
    document.getElementById('coupon-row').style.display = 'flex';
    document.getElementById('coupon-discount').textContent = `-¥${couponDiscount}`;
    alert('优惠券已应用：8折优惠');
  } else {
    if (errorEl) {
      errorEl.textContent = '无效的优惠券代码';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  updateSummary();
}

// 更新订单汇总
function updateSummary() {
  // 计算原价总额
  let originalPrice = 0;
  orderItems.forEach(item => {
    originalPrice += (item.originalPrice || item.price) * (item.quantity || 1);
  });
  
  // 计算实际价格
  let actualPrice = 0;
  orderItems.forEach(item => {
    actualPrice += item.price * (item.quantity || 1);
  });
  
  originalTotal = actualPrice;
  const memberDiscount = originalPrice - actualPrice;
  const finalPrice = actualPrice - couponDiscount;
  
  document.getElementById('original-price').textContent = `¥${originalPrice}`;
  document.getElementById('member-discount').textContent = `-¥${memberDiscount}`;
  document.getElementById('final-price').textContent = `¥${finalPrice}`;
  document.getElementById('submit-btn').textContent = `立即支付 ¥${finalPrice}`;
}

// 提交订单
function submitOrder() {
  if (orderItems.length === 0) {
    alert('请先选择商品');
    return;
  }
  
  // 模拟支付过程
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = '支付中...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // 清空购物车中已购买的商品
    localStorage.removeItem('checkout_items');
    
    // 显示成功弹窗
    document.getElementById('order-success').style.display = 'flex';
  }, 1500);
}
