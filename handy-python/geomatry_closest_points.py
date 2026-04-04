import math


def brutal_force_distance(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)


def find_closest_pair_brutral(points):
    """brutal"""
    min_dist = float('inf')
    closest_pair = None

    n = len(points)
    for i in range(n):
        for j in range(i + 1, n):
            d = distance(points[i], points[j])
            if d < min_dist:
                min_dist = d
                closest_pair = (points[i], points[j])

    return min_dist, closest_pair


# Usage
points = [(-1, 0), (2, 3), (12, 30), (5, 1), (12, 10), (3, 4)]
dist, pair = find_closest_pair_brutral(points)
print(f"Distance: {dist}, Pair: {pair}")
