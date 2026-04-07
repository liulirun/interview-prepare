/**
 * Q20) Linked List Cycle
 *
 * AI-BEST:
 * Floyd's tortoise-and-hare pointers.
 * Time: O(n), Space: O(1)
 */

class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null = null,
  ) {}
}

function hasCycleBest(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  // Step 1: Move one pointer slowly and one pointer quickly because equal positions can only happen if a loop exists.
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    // Step 2: Compare pointers after each move because meeting inside the list proves the presence of a cycle.
    if (slow === fast) return true;
  }

  // Step 3: Return false when the fast pointer falls off the list because that means there was no cycle to trap it.
  return false;
}

function buildList(values: number[], cycleIndex: number | null = null): ListNode | null {
  if (values.length === 0) return null;

  const nodes = values.map((value) => new ListNode(value));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  if (cycleIndex !== null && cycleIndex >= 0 && cycleIndex < nodes.length) {
    nodes[nodes.length - 1].next = nodes[cycleIndex];
  }
  return nodes[0];
}

function runDemo(): void {
  console.log("Q20: Linked List Cycle");
  const cases = [
    { values: [3, 2, 0, -4], cycleIndex: 1 },
    { values: [1, 2, 3], cycleIndex: null },
    { values: [1], cycleIndex: 0 },
  ];

  for (const { values, cycleIndex } of cases) {
    const head = buildList(values, cycleIndex);
    console.log(`Input: values=${JSON.stringify(values)}, cycleIndex=${cycleIndex}`);
    console.log("  BEST:", hasCycleBest(head));
  }
}

runDemo();

export {};
