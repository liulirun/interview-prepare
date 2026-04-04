def cross_product(o, a, b):
    """计算向量 OA 和 OB 的叉乘"""
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


def is_intersect(p1, p2, p3, p4):
    """
    判断线段 P1P2 和 P3P4 是否相交
    """
    # 1. 快速排斥实验 (Bounding Box Check)
    # 检查两个线段的“外接矩形”是否重叠。如果不重叠，线段绝对不相交。
    if not (min(p1[0], p2[0]) <= max(p3[0], p4[0]) and
            min(p3[0], p4[0]) <= max(p1[0], p2[0]) and
            min(p1[1], p2[1]) <= max(p3[1], p4[1]) and
            min(p3[1], p4[1]) <= max(p1[1], p2[1])):
        return False

    # 2. 跨立实验 (Straddle Test)
    # 计算四个叉乘结果
    cp1 = cross_product(p1, p2, p3)
    cp2 = cross_product(p1, p2, p4)
    cp3 = cross_product(p3, p4, p1)
    cp4 = cross_product(p3, p4, p2)

    # 如果线段相交，点必须在另一条线段的两侧（叉乘符号相反）
    # 或者叉乘为 0（点在另一条线段的延长线上，由于有了快速排斥实验，此时必在线段上）
    if (cp1 * cp2 <= 0) and (cp3 * cp4 <= 0):
        return True

    return False


# --- 测试 ---
p1, p2 = (0, 0), (5, 5)
p3, p4 = (0, 5), (5, 0)
print(is_intersect(p1, p2, p3, p4))  # True (交叉)

p5, p6 = (0, 0), (1, 1)
p7, p8 = (2, 2), (3, 3)
print(is_intersect(p5, p6, p7, p8))  # False (平行且不重叠)
