/**
 * TYPE EXAMPLES
 *
 * Key ideas:
 * 1) Primitive types: string, number, boolean
 * 2) Union type: value can be one of multiple types
 * 3) Type alias: reusable custom type
 */

const courseName: string = "TypeScript Basics";
const lessonCount: number = 4;
const isBeginnerFriendly: boolean = true;

type UserRole = "student" | "parent";
const role: UserRole = "parent";

function formartSummary(name: string, lessons: number, beginner: boolean): string {
  return `${name} has ${lessons} lessons. Beginner friendly: ${beginner}`;
}

console.log(formartSummary(courseName, lessonCount, isBeginnerFriendly));
console.log(`Current role: ${role}`); 

// use Object.entries to loop object
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};

for (const[key, value] of Object.entries(user)){
  console.log(`${key}->${value}`)
}
//The for...in loop iterates over all enumerable properties of an object
for (const key in user) {
  if (Object.prototype.hasOwnProperty.call(user, key)) {
    // Type assertion or type guard is needed for type safety
    console.log(`${key}: ${user[key as keyof User]}`);
  }
}


const users: User[] = [
  { name: 'Alice', id: 1 },
  { name: 'Bob', id: 2 },
  { name: 'Charlie', id: 3 }  
];