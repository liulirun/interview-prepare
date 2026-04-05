/**
 * ARRAY: common operations for interview practice
 */
const assert = require("node:assert/strict");

function print_methods() {
  const a = [1];
  const x = Object.getPrototypeOf(a);

  // This returns ALL property names, even the hidden (non-enumerable) ones
  Object.getOwnPropertyNames(x).forEach((k) => {
    console.log(k, x[k]);
  });
}

// print_methods();

// `Array.from()` Summary

// `Array.from()` creates a new Array from **iterables** (Strings, Sets, Maps) or **array-like objects** (NodeLists, `{length: n}`).

// ```javascript
// // 1. Basic Conversion (String/Set/Map)
// const fromStr  = Array.from("Hi");          // ["H", "i"]
// const fromSet  = Array.from(new Set([1,2])); // [1, 2]

// // 2. DOM Collections (NodeLists)
// const divs = Array.from(document.querySelectorAll("div"));

// // 3. Array-like with Length (Generating Ranges)
// const range = Array.from({ length: 3 }, (_, i) => i + 1);
// // Output: [1, 2, 3]

// // 4. One-step Mapping (Performance optimized)
// const doubled = Array.from([1, 2, 3], x => x * 2);
// // Output: [2, 4, 6]
// ```

// several ways to create Array
// function newArray(){
//   // const a = ["apple", "orange"];
//   // const a = new Array('re', 'yes');
//   // const a = new Array(2).fill(2);
//   // const a = Array.from('yes');
//   // const set = new Set([1, 2, 2, 3])
//   // const a = Array.from([...set]);
//   // const a = Array.of(2,2);
//   const a = Array.from({ length: 5 }, (v, i) => i + 1); // [1, 2, 3, 4, 5]
//   return a
// }

function operation1() {
  const a = [1, 2, 3, 4, 5];
  a.push(0);
  a.push(1);
  const b = a.pop();
  const c = a.shift(0);
  const d = a.unshift(-1);
  const e = a.slice(2, 4);
  const f = [...a];
  a.splice(1, 0, -1, -2);

  console.log(`a value is ${a}`);
  console.log(`b value is ${b}`);
  console.log(`c value is ${c}`);
  console.log(`d value is ${d}`);
  console.log(`e value is ${e}`);
  console.log(`f value is ${f}`);
}

function operation2() {
  a1 = new Array(1, 2, 3, 4);
  // b1 = a1.forEach((i)=>console.log(i));
  // b1 = a1.map((i)=>i+1);
  // c1 = a1.map((x) =>  x * x );
  // d1 = a1.filter((x) => x>2);
  // console.log(`d1 value is ${d1}`);

  // e1= a1.reduce(function(m, o) {
  //   return m + o;
  // }, 0)
  // console.log(`e1 value is ${e1}`);

  let a = [1, 2, 3, 0];
  // a.reverse();
  // a.sort();
  // a.toSorted();
}

operation1();
operation2();
