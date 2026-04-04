import math


def cross_product(o, a, b):
    """
    smallest area contains ALL points
    Returns the 2D cross product of vectors OA and OB.
    Positive: Left turn (counter-clockwise)
    Zero: Collinear (straight line)
    Negative: Right turn (clockwise)
    """
    x = (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    if x < 0:
        print(f"ClockWise-{o}, {a}, {b}")
    if x == 0:
        print(f"Line-{o}, {a}, {b}")
    if x > 0:
        print(f"Countrt-ClockWise-{o}, {a}, {b}")
    return x


def convex_hull(points):
    """Computes the convex hull using Monotone Chain algorithm."""
    # 1. Sort points by x-coordinate (then y if x is tied)
    points.sort()

    if len(points) <= 1:
        return points

    # 2. Build the lower hull
    lower = []
    for p in points:
        # While the last three points don't make a 'left turn', pop the middle one
        while len(lower) >= 2 and cross_product(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # 3. Build the upper hull
    upper = []
    for p in reversed(points):
        # Repeat the logic for the top half of the shape
        while len(upper) >= 2 and cross_product(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    # 4. Combine hulls (remove last point of each because it's repeated)
    return lower[:-1] + upper[:-1]


# Example usage
points = [(0, 3), (2, 2), (1, 1), (2, 1), (3, 0), (0, 0), (3, 3), (1, 2)]
hull = convex_hull(points)
print(f"Hull vertices: {hull}")

# 这句话的意思是，这个公式利用了向量相对于原点的“正向”或“反向”移动来自动加减面积。
# 你可以把原点

# 想象成一个手电筒，每两个相邻的点和原点都会组成一个三角形。
# “向前”移动（增加面积）：
# 当你顺着多边形的边走时，如果这条边是“绕着”原点转（比如逆时针），公式计算出的那块三角形面积就是正数。这就好比你在涂色，把这块区域填满。
# “向内凹”或“往回走”（减少面积）：
# 如果多边形有个“坑”（凹角），或者某条边是从原点的一侧绕到了另一侧，导致它相对于原点的转动方向变了，公式就会算出负数。
# 为什么要这么做？
# 想象一个带坑的形状：
# 当你计算外围的边时，公式会算出包含那个“坑”在内的一个大面积。
# 当你走到“坑”的那几条边时，因为方向变了，公式算出的是负面积。
# 大面积 + 负面积，正好把多边形外面多算的那块空地给“减”掉了。
# 最后，剩下的就是那个不规则形状精确的内部面积。
# 总结：
# 正数 = 正在覆盖形状的区域。
# 负数 = 正在减去形状之外多余的空地。
# 除以 2 = 因为两点与原点构成的平行四边形面积是三角形的两倍，所以最后要折半。


def calculate_area(points):
    n = len(points)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += points[i][0] * points[j][1]
        area -= points[j][0] * points[i][1]
    return abs(area) / 2.0


print(calculate_area([(0, 0), (0, 1), (1, 0)]))
