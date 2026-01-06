# 爱奇艺网站复刻 - GUI Agent训练环境

这是一个用于GUI-Agent训练的爱奇艺风格视频网站复刻项目。纯HTML/CSS/JS实现，无需安装任何依赖。

## 项目结构

```
src/
├── pages/
│   └── iqiyi/
│       ├── index.html/js/css    # 首页
│       ├── search.html/js/css   # 搜索/列表页
│       ├── detail.html/js/css   # 详情页
│       ├── cart.html/js/css     # 购物车
│       └── checkout.html/js/css # 结算页
├── components/
│   └── iqiyi/
│       ├── Header.js/css        # 头部导航
│       ├── Footer.js/css        # 底部
│       ├── VideoCard.js/css     # 视频卡片
│       └── SearchForm.js/css    # 搜索表单
├── data/
│   └── iqiyiData.js             # 静态数据
└── public/images/iqiyi/         # 图片资源
```

## 功能特性

- ✅ 静态页面 - 不依赖后端API，数据写在前端代码中
- ✅ 默认登录状态 - 显示已登录用户状态，包含购物车等信息
- ✅ 完整交互 - 搜索、筛选、排序、添加购物车等功能可用
- ✅ 响应式设计 - 支持桌面端浏览
- ✅ 无外部依赖 - 图片、字体等资源本地化，无需npm install
- ✅ 多页面 - 首页、搜索、详情、购物车等核心页面

## 快速开始

直接用浏览器打开 `src/pages/iqiyi/index.html` 即可运行。

或者使用本地服务器（推荐，避免跨域问题）：

```bash
# Python 3
python -m http.server 8080

# 然后访问 http://localhost:8080/src/pages/iqiyi/index.html
```

## 页面说明

1. **首页** (`index.html`) - 视频轮播、分类导航、热播推荐
2. **搜索页** (`search.html`) - 视频筛选、排序、搜索结果
3. **详情页** (`detail.html?id=1`) - 视频播放器、剧集选择、相关推荐
4. **购物车** (`cart.html`) - VIP套餐、购物车管理
5. **结算页** (`checkout.html`) - 支付方式、订单确认

## 测试优惠券

- `VIP10` - 立减10元
- `NEW20` - 新用户立减20元

## 技术栈

- 纯HTML5
- 纯CSS3（响应式设计）
- 原生JavaScript（ES6+）
- LocalStorage（购物车数据持久化）
