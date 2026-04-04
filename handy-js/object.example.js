const new_users = [
    { name: 'Alice', id: 1 },
    { name: 'Bob', id: 2 },
    { name: 'Charlie', id: 3 }
];
for (const u of new_users) {
    Object.freeze(u); // This will prevent any modifications to the object, including changing the name or id properties.
    // u.name = "Hays"; // Error: Cannot assign to 'name' because it is a read-only property. 
    console.log(u.name);
}
// Used to merge objects or create copies so you don't mutate the original data.
// Most modern devs use the Spread Operator const fullUser = { ...mods, ...extra }; instead.
const mods = { name: "Hayes" };
const extra = { id: 99, role: "Admin" };
// Merges 'extra' into 'mods'
const fullUser = Object.assign({}, mods, extra);
// Result: { name: "Hayes", id: 99, role: "Admin" }
// Object.freeze() stops everything. Object.seal() is a bit more relaxed: you cannot add or remove properties, but you can change the values of existing ones.
const settings = { theme: "dark" };
Object.seal(settings);
settings.theme = "light"; // Works!
// settings.fontSize = 14;   // Fails! Cannot add new properties.
// Object.values() — The Value Grabber
// If you don't care about the names (keys) and just want the data inside, use this.
const userRoles = { user1: "Admin", user2: "Editor", user3: "Guest" };
const allRoles = Object.values(userRoles);
// Result: ["Admin", "Editor", "Guest"]
// Object.fromEntries() — The Reverse Move
// The "undo" button for Object.entries(). It takes an array of pairs and turns it back into an object.
const arr = [['color', 'red'], ['speed', 'fast']];
const obj = Object.fromEntries(arr);
// Result: { color: 'red', speed: 'fast' }
// The safest way to check if an object actually contains a property itself (rather than inheriting it).
const car = { make: "Toyota" };
console.log(Object.hasOwn(car, "make")); // true
console.log(Object.hasOwn(car, "toString")); // false
