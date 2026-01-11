# 爱奇艺网站复刻 - GUI Agent训练环境

这是一个用于GUI-Agent训练的爱奇艺风格视频网站复刻项目。纯HTML/CSS/JS实现，无需安装任何依赖。

## 项目结构

```
src/
├── pages/iqiyi/
│   ├── index.html/js/css      # 首页
│   ├── search.html/js/css     # 搜索/列表页
│   ├── detail.html/js/css     # 详情页
│   ├── cart.html/js/css       # 购物车
│   ├── checkout.html/js/css   # 结算页
│   └── profile.html/js/css    # 个人中心
├── data/
│   └── iqiyiData.js           # 静态数据（视频、分类、用户等）
└── public/images/iqiyi/
    ├── covers/                # 真实海报图片
    ├── placeholder.svg        # 占位图
    └── avatar.svg             # 用户头像

scripts/
└── fetch_posters.py           # 海报抓取脚本
```

## 功能特性

### 核心功能
- ✅ 6个完整页面（首页、搜索、详情、购物车、结算、个人中心）
- ✅ 左侧分类导航（16个分类）
- ✅ 视频轮播Banner（8个热门视频）
- ✅ 视频详情页（播放器、选集、评论、相关推荐）
- ✅ 搜索功能（支持视频名、演员、导演搜索）
- ✅ 搜索历史和热门搜索词
- ✅ 购物车和VIP结算流程
- ✅ 个人中心（观看历史、收藏、VIP、钱包、设置）

### GUI-Agent训练优化
- ✅ 所有可交互元素添加 `data-testid` 属性
- ✅ 表单验证和错误提示
- ✅ 统一的导航栏结构
- ✅ 真实海报图片（14/20）
- ✅ 20个视频数据（含演员、导演信息）

## 快速开始

直接用浏览器打开 `src/pages/iqiyi/index.html` 即可运行。

或者使用本地服务器（推荐）：

```bash
# Python 3
python -m http.server 8080

# 访问 http://localhost:8080/src/pages/iqiyi/index.html
```

## 页面说明

| 页面 | 文件 | 功能 |
|------|------|------|
| 首页 | `index.html` | 轮播Banner、分类导航、热播推荐、排行榜 |
| 搜索 | `search.html` | 筛选器、搜索建议、视频列表 |
| 详情 | `detail.html?id=1` | 播放器、选集、评论、相关推荐 |
| 购物车 | `cart.html` | VIP套餐、购物车管理 |
| 结算 | `checkout.html` | 支付方式、优惠券、订单确认 |
| 个人中心 | `profile.html` | 观看历史、收藏、VIP、钱包、设置 |

## 测试数据

### 优惠券
- `VIP10` - 9折优惠
- `NEW20` - 8折优惠

### 视频数据
- 8部电视剧（琉璃、赘婿、狂飙、繁花、庆余年2、长相思、微暗之火、大梦归离）
- 6部综艺（一年一度喜剧大赛、奔跑吧、中国好声音、向往的生活、极限挑战、乘风破浪的姐姐）
- 6部电影（流浪地球2、满江红、消失的她、孤注一掷、封神第一部、热辣滚烫）

## 海报抓取

项目包含从豆瓣抓取海报的脚本（仅用于学习研究）：

```bash
python scripts/fetch_posters.py
```

## data-testid 命名规范

```
header-*          # 顶部导航元素
category-*        # 分类导航
banner-*          # 轮播Banner
video-card-*      # 视频卡片
filter-*          # 筛选器
search-*          # 搜索相关
comment-*         # 评论相关
cart-*            # 购物车相关
profile-*         # 个人中心相关
```

## 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- LocalStorage（购物车、搜索历史持久化）
- 无外部依赖，纯静态页面
