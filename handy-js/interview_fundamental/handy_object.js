/**
 * ARRAY: common operations for interview practice
 */
const assert = require("node:assert/strict");

function printObjectMethods() {
  const proto = Object.prototype;
  
  Object.getOwnPropertyNames(proto).forEach((name) => {
    const value = proto[name];
    
    // Only print if the property is a function (a method)
    if (typeof value === 'function') {
      console.log(name);
    }
  });
}

// printObjectMethods();

function newObject(){
  const user = {
    name: "Alex",
    age: 25,
    greet() { console.log("Hi!"); }
  };
  for (const k of Object.keys(user)){
    console.log(k);
    // console.log(user);
  }
  for (const k in user) {
    console.log(k); // Prints: name, age, greet
    console.log(user[k]); 
  }
}
newObject()

function newObject3(){
  const defaults = { theme: 'dark', notifications: true };
  const userSettings = { notifications: false };

  // Way A: Object.assign
  const finalConfig = Object.assign({}, defaults, userSettings);
  console.log(finalConfig);

  // Way B: Spread Operator (Very common in React/Redux)
  const finalConfig2 = { ...defaults, ...userSettings };
  console.log(finalConfig2);
}
newObject3();
