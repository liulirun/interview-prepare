/**
 * TYPE EXAMPLES
 *
 * Key ideas:
 * 1) Primitive types: string, number, boolean
 * 2) Union type: value can be one of multiple types
 * 3) Type alias: reusable custom type
 */
const courseName = "TypeScript Basics";
const lessonCount = 4;
const isBeginnerFriendly = true;
const role = "parent";
function formartSummary(name, lessons, beginner) {
    return `${name} has ${lessons} lessons. Beginner friendly: ${beginner}`;
}
console.log(formartSummary(courseName, lessonCount, isBeginnerFriendly));
console.log(`Current role: ${role}`);
const user = {
    name: "Hayes",
    id: 0,
};
for (const [key, value] of Object.entries(user)) {
    console.log(`${key}->${value}`);
}
//The for...in loop iterates over all enumerable properties of an object
for (const key in user) {
    if (Object.prototype.hasOwnProperty.call(user, key)) {
        // Type assertion or type guard is needed for type safety
        console.log(`${key}: ${user[key]}`);
    }
}
const users = [
    { name: 'Alice', id: 1 },
    { name: 'Bob', id: 2 },
    { name: 'Charlie', id: 3 }
];
