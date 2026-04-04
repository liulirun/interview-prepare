import unittest


def cross_product(origin, point_a, point_b):
    # Your function code here
    x = (point_a[0] - origin[0]) * (point_b[1] - origin[1]) - \
        (point_a[1] - origin[1]) * (point_b[0] - origin[0])
    return x


def area(points: list):
    points.sort()
    if len(points) <= 1:
        return points
    left_turn = []
    for p in points:
        while len(left_turn) >= 2 and cross_product(left_turn[-2], left_turn[-1], p) <= 0:
            left_turn.pop()
        left_turn.append(p)

class TestCrossProduct(unittest.TestCase):

    def test_left_turn(self):
        # Positive result: Counter-clockwise
        o, a, b = (0, 0), (1, 0), (0, 1)
        self.assertGreater(cross_product(o, a, b), 0)

    def test_left_turn(self):
        # Negative result: Clockwise
        o, a, b = (0, 0), (0, 1), (1, 0)
        self.assertLess(cross_product(o, a, b), 0)

    def test_collinear(self):
        # Zero result: Straight line
        o, a, b = (0, 0), (1, 1), (2, 2)
        self.assertEqual(cross_product(o, a, b), 0)

    def test_origin_overlap(self):
        # Edge case: Points are the same
        o = (5, 5)
        self.assertEqual(cross_product(o, o, o), 0)


def calculate_area(points):
    n = len(points)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += points[i][0] * points[j][1]
        area -= points[j][0] * points[i][1]
    return abs(area) / 2.0


points = [(0, 0), (4, 0), (4, 3), (0, 3)]
print(f"Area: {calculate_area(points)}")

if __name__ == '__main__':
    unittest.main()
