/**
 * FLOW EXAMPLES
 *
 * Key ideas:
 * 1) for...of loop for arrays
 * 2) while loop for repeated checks
 * 3) break / continue to control loop execution
 */

const scores: number[] = [70, 85, 92, 58, 100];

for (const score of scores) {
  if (score < 60) {
    console.log(`Skipping failing score: ${score}`);
    continue;
  }

  if (score === 100) {
    console.log("Perfect score found, stop early.");
    break;
  }
}

let countdown = 3;
while (countdown > 0) {
  console.log(`Countdown: ${countdown}`);
  countdown--;
}


interface User {
  'name': string,
  'id':number
}

const users: User[] = {
  { name: 'Alice', id: 1 },
  { name: 'Bob', id: 2 },
  { name: 'Charlie', id: 3 }  
}