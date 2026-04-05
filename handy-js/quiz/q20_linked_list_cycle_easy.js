/**
 * Q20) Linked List Cycle
 *
 * AI-BEST:
 * Floyd's tortoise-hare pointers.
 * Time: O(n), Space: O(1)
 */

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycleBest(head) {
  // Step 1: Use two pointers with different speeds.
  // Why: if a cycle exists, fast eventually laps slow and they meet.
  let slow = head;
  let fast = head;

  // Step 2: Move until fast hits end (no cycle) or meets slow (cycle).
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  // Step 3: Reaching null means no cycle.
  return false;
}

function buildLinkedList(values, cyclePos) {
  if (!values.length) return null;

  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (cyclePos >= 0 && cyclePos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[cyclePos];
  }

  return nodes[0];
}

function runDemo() {
  console.log("Q20: Linked List Cycle");
  const cases = [
    { values: [3, 2, 0, -4], cyclePos: 1 },
    { values: [1, 2], cyclePos: 0 },
    { values: [1], cyclePos: -1 },
  ];

  for (const { values, cyclePos } of cases) {
    const head = buildLinkedList(values, cyclePos);
    console.log(`Input: values=${JSON.stringify(values)}, cyclePos=${cyclePos}`);
    console.log("  BEST:", hasCycleBest(head));
  }
}

runDemo();
