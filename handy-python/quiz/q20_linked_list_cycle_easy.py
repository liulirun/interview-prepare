"""
Q20) Linked List Cycle

AI-BEST:
- Floyd's tortoise-and-hare pointers.
- Time: O(n), Space: O(1)
"""


class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def has_cycle_best(head: ListNode | None) -> bool:
    # Step 1: Move one pointer slowly and the other quickly.
    # Why: If there is a loop, the fast pointer must eventually lap the slow one.
    slow = head
    fast = head

    # Step 2: Compare pointers while the fast runner can still move.
    # Why: A meeting proves that the list circles back on itself.
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True

    # Step 3: Return false when the fast pointer hits the end.
    # Why: Reaching null means there is no cycle to loop back into.
    return False


def build_list(values: list[int], cycle_at: int | None = None) -> ListNode | None:
    if not values:
        return None

    nodes = [ListNode(value) for value in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]

    if cycle_at is not None:
        nodes[-1].next = nodes[cycle_at]

    return nodes[0]


def run_demo() -> None:
    print("Q20: Linked List Cycle")
    cases = [
        ([3, 2, 0, -4], 1),
        ([1, 2], 0),
        ([1], None),
    ]
    for values, cycle_at in cases:
        head = build_list(values, cycle_at)
        print(f"Input: values={values}, cycle_at={cycle_at}")
        print("  BEST:", has_cycle_best(head))


if __name__ == "__main__":
    run_demo()
