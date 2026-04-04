import math


def circles_overlap(c1, c2, r1, r2):
    """How do you check if two circles overlap?
Answer: Calculate the distance between the centres of the two circles. If this distance is less than or equal to the sum of their radii, the circles overlap."""
    # c1, c2 are tuples of (x, y) coordinates
    dist = math.sqrt((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2)
    return dist <= (r1 + r2)


def rectangles_intersect(r1, r2):
    """How do you find if two rectangles intersect?
Answer: For two axis-aligned rectangles, they intersect if one is not completely to the left, right, above, or below the other. Use their boundary coordinates (
) for comparison."""
    """
    r1, r2 = {'x1': min_x, 'y1': min_y, 'x2': max_x, 'y2': max_y}
    """
    # Check if one rectangle is to the left, right, above, or below the other
    return not (r1['x2'] < r2['x1'] or  # r1 is completely left of r2
                r1['x1'] > r2['x2'] or  # r1 is completely right of r2
                r1['y2'] < r2['y1'] or  # r1 is completely below r2
                r1['y1'] > r2['y2'])    # r1 is completely above r2


def distance_to_ball(point, ball_center, radius):
    """
    To calculate the 3D distance to a ball (sphere), you first find the Euclidean distance to its center and then subtract the ball's radius to get the distance to its surface.
    """
    # 1. Calculate distance from the point to the center of the ball
    dist_to_center = math.dist(point, ball_center)

    # 2. Subtract the radius to get the distance to the surface
    dist_to_surface = dist_to_center - radius

    # If the distance is negative, the point is inside the ball
    return max(0, dist_to_surface)


# Example Usage
my_pos = (10, 10, 10)
ball_pos = (0, 0, 0)
ball_size = 5

dist = distance_to_ball(my_pos, ball_pos, ball_size)
print(f"Distance to the ball's surface: {dist:.2f}")


def do_balls_intersect(ball_1_center, ball_1_radius, ball_2_center, ball_2_radius):
    """
    Checks if two 3D spheres intersect.
    :param ball_1_center: Tuple (x, y, z)
    :param ball_2_center: Tuple (x, y, z)
    """
    # 1. Calculate the distance between the two center points
    dist_sq = (x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2
    radii_sum_sq = (radius1 + radius2)**2
    if dist_sq <= radii_sum_sq:
        # Intersecting!
        return True


# --- Example ---
# Ball 1 at origin, size 5
# Ball 2 at (8, 0, 0), size 5
# Total radii = 10. Distance = 8. They should hit!
do_balls_intersect((0, 0, 0), 5, (8, 0, 0), 5)
