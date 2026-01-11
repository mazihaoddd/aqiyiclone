#!/usr/bin/env python3
"""
从豆瓣抓取电影/电视剧海报图片
仅用于学习研究目的，请勿用于商业用途
"""

import requests
import os
import time
import re

# 视频列表 - 与 iqiyiData.js 中的数据对应
VIDEOS = [
    {"id": 1, "title": "琉璃", "douban_id": "30395914"},
    {"id": 2, "title": "赘婿", "douban_id": "34Mo852"},
    {"id": 3, "title": "狂飙", "douban_id": "35465232"},
    {"id": 4, "title": "繁花", "douban_id": "34874646"},
    {"id": 5, "title": "庆余年", "douban_id": "25853071"},
    {"id": 6, "title": "长相思", "douban_id": "35208467"},
    {"id": 7, "title": "微暗之火", "douban_id": "35631395"},
    {"id": 8, "title": "大梦归离", "douban_id": "36156080"},
    {"id": 9, "title": "一年一度喜剧大赛", "douban_id": "35372566"},
    {"id": 10, "title": "奔跑吧", "douban_id": "26816519"},
    {"id": 11, "title": "中国好声音", "douban_id": "35051512"},
    {"id": 12, "title": "向往的生活", "douban_id": "35056664"},
    {"id": 13, "title": "极限挑战", "douban_id": "35056530"},
    {"id": 14, "title": "乘风破浪的姐姐", "douban_id": "34841067"},
    {"id": 15, "title": "流浪地球2", "douban_id": "35267208"},
    {"id": 16, "title": "满江红", "douban_id": "35766491"},
    {"id": 17, "title": "消失的她", "douban_id": "35675355"},
    {"id": 18, "title": "孤注一掷", "douban_id": "35267224"},
    {"id": 19, "title": "封神第一部", "douban_id": "10604086"},
    {"id": 20, "title": "热辣滚烫", "douban_id": "35725869"},
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': 'https://movie.douban.com/',
}

def get_poster_url(douban_id):
    """从豆瓣页面获取海报图片URL"""
    url = f"https://movie.douban.com/subject/{douban_id}/"
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        
        # 查找海报图片 - 豆瓣的海报通常在 mainpic 中
        # 格式: https://img9.doubanio.com/view/photo/s_ratio_poster/public/pXXXXXXXX.jpg
        pattern = r'https://img\d\.doubanio\.com/view/photo/[^"]+\.(?:jpg|webp)'
        matches = re.findall(pattern, response.text)
        
        if matches:
            # 优先选择 s_ratio_poster 或 l_ratio_poster
            for match in matches:
                if 'ratio_poster' in match:
                    # 转换为大图
                    return match.replace('s_ratio_poster', 'l_ratio_poster')
            return matches[0]
        
        return None
    except Exception as e:
        print(f"  获取页面失败: {e}")
        return None

def download_image(url, save_path):
    """下载图片"""
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"  下载失败: {e}")
        return False

def main():
    # 创建保存目录
    save_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'public', 'images', 'iqiyi', 'covers')
    os.makedirs(save_dir, exist_ok=True)
    
    print("=" * 50)
    print("开始抓取海报图片...")
    print("=" * 50)
    
    success_count = 0
    failed_list = []
    
    for video in VIDEOS:
        print(f"\n[{video['id']}/{len(VIDEOS)}] {video['title']}")
        
        # 检查是否已存在
        save_path = os.path.join(save_dir, f"{video['id']}.jpg")
        if os.path.exists(save_path):
            print(f"  已存在，跳过")
            success_count += 1
            continue
        
        # 获取海报URL
        poster_url = get_poster_url(video['douban_id'])
        if not poster_url:
            print(f"  未找到海报URL")
            failed_list.append(video['title'])
            continue
        
        print(f"  海报URL: {poster_url[:60]}...")
        
        # 下载图片
        if download_image(poster_url, save_path):
            print(f"  ✓ 保存成功: {save_path}")
            success_count += 1
        else:
            failed_list.append(video['title'])
        
        # 延迟避免被封
        time.sleep(2)
    
    print("\n" + "=" * 50)
    print(f"完成! 成功: {success_count}/{len(VIDEOS)}")
    if failed_list:
        print(f"失败列表: {', '.join(failed_list)}")
    print("=" * 50)

if __name__ == '__main__':
    main()
