// 购物车页面逻辑
let cart = [];
let selectedItems = new Set();

document.addEventListener('DOMContentLoaded', function() {
  cart = getCart();
  renderProducts();
  renderCart();
  initSearch();
});

// 渲染VIP产品
function renderProducts() {
  const container = document.getElementById('products-grid');
  container.innerHTML = vipProducts.map((product, index) => `
    <div class="product-card ${product.recommended ? 'recommended' : ''}" data-testid="product-${index}" onclick="addToCart(${product.id})">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-duration">${product.duration}</p>
      <div class="product-price">${product.price}</div>
      <div class="product-original">¥${product.originalPrice}</div>
      <button class="add-cart-btn" data-testid="add-cart-${index}">加入购物车</button>
    </div>
  `).join('');
}

// 渲染购物车
function renderCart() {
  const container = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  const cartHeader = document.getElementById('cart-header');
  
  document.getElementById('cart-count').textContent = cart.length;
  
  if (cart.length === 0) {
    container.innerHTML = '';
    emptyCart.style.display = 'block';
    cartHeader.style.display = 'none';
  } else {
    emptyCart.style.display = 'none';
    cartHeader.style.display = 'grid';
    
    container.innerHTML = cart.map((item, index) => `
      <div class="cart-item" data-testid="cart-item-${index}">
        <div class="item-checkbox">
          <input type="checkbox" data-testid="cart-checkbox-${index}" ${selectedItems.has(index) ? 'checked' : ''} 
                 onchange="toggleItem(${index})">
        </div>
        <div class="item-info">
          <span class="item-icon">👑</span>
          <div>
            <div class="item-name">${item.title}</div>
            <div class="item-desc">爱奇艺VIP会员</div>
          </div>
        </div>
        <div class="item-price">¥${item.price}</div>
        <div class="item-quantity">
          <button class="qty-btn" data-testid="qty-minus-${index}" onclick="changeQuantity(${index}, -1)">-</button>
          <span class="qty-num" data-testid="qty-num-${index}">${item.quantity || 1}</span>
          <button class="qty-btn" data-testid="qty-plus-${index}" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <div class="item-subtotal">¥${item.price * (item.quantity || 1)}</div>
        <button class="item-remove" data-testid="cart-remove-${index}" onclick="removeItem(${index})">删除</button>
      </div>
    `).join('');
  }
  
  updateTotal();
}

// 添加到购物车
function addToCart(productId) {
  const product = vipProducts.find(p => p.id === productId);
  if (product) {
    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    renderCart();
    alert(`已添加 "${product.title}" 到购物车`);
  }
}

// 切换选中状态
function toggleItem(index) {
  if (selectedItems.has(index)) {
    selectedItems.delete(index);
  } else {
    selectedItems.add(index);
  }
  updateTotal();
}

// 全选/取消全选
function toggleSelectAll() {
  const selectAll = document.getElementById('select-all');
  if (selectAll.checked) {
    cart.forEach((_, index) => selectedItems.add(index));
  } else {
    selectedItems.clear();
  }
  renderCart();
}

// 修改数量
function changeQuantity(index, delta) {
  const item = cart[index];
  const newQty = (item.quantity || 1) + delta;
  if (newQty >= 1 && newQty <= 10) {
    item.quantity = newQty;
    saveCart(cart);
    renderCart();
  }
}

// 删除商品
function removeItem(index) {
  cart.splice(index, 1);
  selectedItems.delete(index);
  // 重新映射选中项
  const newSelected = new Set();
  selectedItems.forEach(i => {
    if (i > index) newSelected.add(i - 1);
    else if (i < index) newSelected.add(i);
  });
  selectedItems = newSelected;
  saveCart(cart);
  renderCart();
}

// 更新总价
function updateTotal() {
  let total = 0;
  let count = 0;
  
  selectedItems.forEach(index => {
    const item = cart[index];
    if (item) {
      total += item.price * (item.quantity || 1);
      count += item.quantity || 1;
    }
  });
  
  document.getElementById('selected-count').textContent = count;
  document.getElementById('total-price').textContent = `¥${total}`;
  
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.disabled = count === 0;
}

// 去结算
function goCheckout() {
  if (selectedItems.size === 0) {
    alert('请先选择商品');
    return;
  }
  
  // 保存选中的商品到localStorage
  const selectedProducts = [];
  selectedItems.forEach(index => {
    if (cart[index]) {
      selectedProducts.push(cart[index]);
    }
  });
  localStorage.setItem('checkout_items', JSON.stringify(selectedProducts));
  
  window.location.href = 'checkout.html';
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
  const errorEl = document.getElementById('search-error');
  
  if (errorEl) errorEl.textContent = '';
  
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
  
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}
