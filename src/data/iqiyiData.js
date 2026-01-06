// 爱奇艺静态数据

const categories = [
  { id: 'movie', name: '电影', icon: '🎬' },
  { id: 'cinema', name: '云影院', icon: '🏠' },
  { id: 'variety', name: '综艺', icon: '🎤' },
  { id: 'kids', name: '少儿', icon: '👶' },
  { id: 'anime', name: '动漫', icon: '🎨' },
  { id: 'documentary', name: '纪录片', icon: '📹' },
  { id: 'knowledge', name: '知识', icon: '📚' },
  { id: 'game', name: '游戏', icon: '🎮' },
  { id: 'drama', name: '电视剧', icon: '📺' },
  { id: 'preview', name: '新片预告', icon: '🎞️' },
  { id: 'ranking', name: '风云榜', icon: '🏆' },
  { id: 'vip', name: 'VIP', icon: '👑' },
  { id: 'novel', name: '小说', icon: '📖' },
  { id: 'live', name: '直播', icon: '📡' },
  { id: 'vr', name: 'VR', icon: '🥽' },
];

const bannerData = [
  {
    id: 1,
    title: '琉璃',
    description: '璇玑司凤虐恋情深',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['爱情', '古装'],
  },
  {
    id: 2,
    title: '赘婿',
    description: '宁毅逆袭商战传奇',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['喜剧', '古装'],
  },
  {
    id: 3,
    title: '三国演义',
    description: '经典历史巨制',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['历史', '战争'],
  },
  {
    id: 4,
    title: '老友记',
    description: '经典美剧重温',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['喜剧', '美剧'],
  },
  {
    id: 5,
    title: '狂飙',
    description: '扫黑除恶大剧',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['犯罪', '剧情'],
  },
  {
    id: 6,
    title: '繁花',
    description: '王家卫执导年代剧',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['剧情', '年代'],
  },
  {
    id: 7,
    title: '庆余年',
    description: '范闲的传奇人生',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['古装', '喜剧'],
  },
  {
    id: 8,
    title: '长相思',
    description: '三生三世虐恋',
    image: '../../public/images/iqiyi/banner.svg',
    thumbnail: '../../public/images/iqiyi/placeholder.svg',
    tags: ['古装', '爱情'],
  },
];

const videos = [
  // 热播电视剧
  { id: 1, title: '琉璃', cover: '../../public/images/iqiyi/placeholder.svg', rating: 9.2, category: 'drama', tags: ['爱情', '古装'], description: '璇玑司凤虐恋情深', episodes: 59, year: 2020, isVip: true, isHot: true },
  { id: 2, title: '赘婿', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.5, category: 'drama', tags: ['喜剧', '古装'], description: '宁毅逆袭商战传奇', episodes: 36, year: 2021, isVip: true, isHot: true },
  { id: 3, title: '狂飙', cover: '../../public/images/iqiyi/placeholder.svg', rating: 9.4, category: 'drama', tags: ['犯罪', '剧情'], description: '扫黑除恶大剧', episodes: 39, year: 2023, isVip: false, isHot: true },
  { id: 4, title: '繁花', cover: '../../public/images/iqiyi/placeholder.svg', rating: 9.1, category: 'drama', tags: ['剧情', '年代'], description: '王家卫执导年代剧', episodes: 30, year: 2024, isVip: true, isHot: true },
  { id: 5, title: '庆余年2', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.9, category: 'drama', tags: ['古装', '喜剧'], description: '范闲的传奇人生', episodes: 36, year: 2024, isVip: true, isHot: true },
  { id: 6, title: '长相思', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.7, category: 'drama', tags: ['古装', '爱情'], description: '三生三世虐恋', episodes: 39, year: 2023, isVip: true, isHot: true },
  { id: 7, title: '微暗之火', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.6, category: 'drama', tags: ['悬疑', '爱情'], description: '悬疑爱情剧', episodes: 24, year: 2024, isVip: true, isHot: false },
  { id: 8, title: '大梦归离', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.4, category: 'drama', tags: ['古装', '仙侠'], description: '仙侠奇缘', episodes: 45, year: 2023, isVip: true, isHot: false },
  
  // 综艺节目
  { id: 9, title: '一年一度喜剧大赛', cover: '../../public/images/iqiyi/placeholder.svg', rating: 9.0, category: 'variety', tags: ['喜剧', '综艺'], description: '爆笑喜剧盛宴', episodes: 12, year: 2022, isVip: false, isHot: true },
  { id: 10, title: '奔跑吧', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.3, category: 'variety', tags: ['真人秀', '户外'], description: '户外竞技真人秀', episodes: 14, year: 2024, isVip: false, isHot: true },
  { id: 11, title: '中国好声音', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.1, category: 'variety', tags: ['音乐', '选秀'], description: '音乐选秀节目', episodes: 15, year: 2024, isVip: false, isHot: false },
  { id: 12, title: '向往的生活', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.8, category: 'variety', tags: ['慢综艺', '生活'], description: '田园慢生活', episodes: 13, year: 2024, isVip: false, isHot: true },
  { id: 13, title: '极限挑战', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.2, category: 'variety', tags: ['真人秀', '挑战'], description: '极限挑战真人秀', episodes: 12, year: 2024, isVip: false, isHot: false },
  { id: 14, title: '乘风破浪的姐姐', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.5, category: 'variety', tags: ['选秀', '女团'], description: '姐姐们的舞台', episodes: 11, year: 2024, isVip: true, isHot: true },
  
  // 电影
  { id: 15, title: '流浪地球2', cover: '../../public/images/iqiyi/placeholder.svg', rating: 9.3, category: 'movie', tags: ['科幻', '灾难'], description: '中国科幻巨制', episodes: 1, year: 2023, isVip: true, isHot: true },
  { id: 16, title: '满江红', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.6, category: 'movie', tags: ['悬疑', '历史'], description: '张艺谋悬疑大片', episodes: 1, year: 2023, isVip: true, isHot: true },
  { id: 17, title: '消失的她', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.4, category: 'movie', tags: ['悬疑', '犯罪'], description: '悬疑犯罪电影', episodes: 1, year: 2023, isVip: true, isHot: false },
  { id: 18, title: '孤注一掷', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.2, category: 'movie', tags: ['犯罪', '剧情'], description: '反诈题材电影', episodes: 1, year: 2023, isVip: false, isHot: true },
  { id: 19, title: '封神第一部', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.8, category: 'movie', tags: ['奇幻', '古装'], description: '封神演义改编', episodes: 1, year: 2023, isVip: true, isHot: true },
  { id: 20, title: '热辣滚烫', cover: '../../public/images/iqiyi/placeholder.svg', rating: 8.0, category: 'movie', tags: ['喜剧', '励志'], description: '贾玲励志喜剧', episodes: 1, year: 2024, isVip: true, isHot: true },
];

const userInfo = {
  isLoggedIn: true,
  username: '用户086914',
  avatar: '../../public/images/iqiyi/avatar.svg',
  isVip: true,
  vipLevel: 5,
  vipExpireDate: '2025-12-31',
  cartItems: [
    { id: 1, title: 'VIP月卡', price: 25 },
    { id: 2, title: 'VIP年卡', price: 218 },
  ],
  watchHistory: [1, 3, 5, 7],
  favorites: [2, 4, 6],
};

const filterOptions = {
  types: ['全部', '电视剧', '电影', '综艺', '动漫', '纪录片'],
  regions: ['全部', '内地', '美国', '韩国', '日本', '英国', '其他'],
  years: ['全部', '2024', '2023', '2022', '2021', '2020', '更早'],
  sorts: ['综合排序', '最新上线', '最多播放', '评分最高'],
};

const vipProducts = [
  { id: 1, title: 'VIP月卡', price: 25, originalPrice: 30, duration: '1个月' },
  { id: 2, title: 'VIP季卡', price: 68, originalPrice: 90, duration: '3个月' },
  { id: 3, title: 'VIP年卡', price: 218, originalPrice: 360, duration: '12个月', recommended: true },
  { id: 4, title: 'VIP连续包月', price: 19, originalPrice: 25, duration: '每月自动续费' },
];

const paymentMethods = [
  { id: 'alipay', name: '支付宝', icon: '💳' },
  { id: 'wechat', name: '微信支付', icon: '💚' },
  { id: 'unionpay', name: '银联支付', icon: '💳' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎' },
];

// 获取URL参数
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// 保存购物车到localStorage
function saveCart(items) {
  localStorage.setItem('iqiyi_cart', JSON.stringify(items));
}

// 获取购物车
function getCart() {
  const cart = localStorage.getItem('iqiyi_cart');
  return cart ? JSON.parse(cart) : userInfo.cartItems;
}
