def is_inside(polygon, x, y):
    """
    polygon: 坐标元组列表 [(x1, y1), (x2, y2), ...]
    x, y: 待测试点的坐标
    """
    n = len(polygon)
    inside = False

    # 获取第一个点
    p1x, p1y = polygon[0]

    for i in range(1, n + 1):
        # 获取下一个点（用 % n 确保最后一点连回起点）
        p2x, p2y = polygon[i % n]

        # 1. 判断点的 y 坐标是否在边 (p1, p2) 的范围内
        if y > min(p1y, p2y) and y <= max(p1y, p2y):
            # 2. 判断点是否在边的左侧（即射线会穿过这条边）
            if x <= max(p1x, p2x):
                # 计算交点的 x 坐标
                if p1y != p2y:
                    x_inters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x

                # 如果点在交点左侧，说明穿过了这条边
                if p1x == p2x or x <= x_inters:
                    inside = not inside  # 奇数次变 True，偶数次变 False

        # 更新当前点为下一个循环的起点
        p1x, p1y = p2x, p2y

    return inside


# --- 测试用例 ---
square = [(0, 0), (10, 0), (10, 10), (0, 10)]

print(is_inside(square, 5, 5))    # 输出: True  (在正方形中心)
print(is_inside(square, 15, 5))   # 输出: False (在正方形右侧)
