/**
 * ARRAY: common operations for interview practice
 */
const assert = require("node:assert/strict");

function printMapMethods() {
  const proto = Map.prototype;

  Object.getOwnPropertyNames(proto).forEach((name) => {
    const value = proto[name];

    // Only print if the property is a function (a method)
    if (typeof value === "function") {
      console.log(name);
    }
  });
}

// printMapMethods();

// // several ways to create Map
function newMap() {
  const a = new Map([
    ["k1", 1],
    ["k2", 2],
  ]);
  //  Converting from an Object
  const userObj = { id: 3, name: "Charlie" };
  const map3 = new Map(Object.entries(userObj));
}
newMap();

// // several ways to loop a map
function loopMap() {
  // The Most Common: for...of
  const myMap = new Map([
    ["a", 1],
    ["b", 2],
  ]);

  // The Built-in: .forEach()
  for (const [key, value] of myMap) {
    console.log(`loop1: ${key}: ${value}`);
  }

  myMap.forEach((value, key) => {
    console.log(`loop2: ${key}: ${value}`);
  });

  // Loop through Keys Only
  for (const key of myMap.keys()) {
    console.log(key);
  }
  // Loop through Values Only
  for (const val of myMap.values()) {
    console.log(val);
  }
}
loopMap();
