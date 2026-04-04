/**
 * ARRAY: common operations for interview practice
 */

const assert = require("node:assert/strict");

// several ways to create Array
function newArray1(){
  // const a = ["apple", "orange"];
  // const a = new Array('re', 'yes');
  // const a = new Array(2).fill(2);
  const a = Array.of(2,2);
  return a
}

function newArray2(){
  // const a = Array.from('yes');
  // const set = new Set([1, 2, 2, 3])
  // const a = Array.from([...set]);
  const a = Array.from({ length: 5 }, (v, i) => i + 1); // [1, 2, 3, 4, 5]
  return a
}

// function test(){
//   const a = [1, 2, 3, 4, 5];
//   a.push(0);
//   a.push(1);
//   let b = a.pop();
//   let c = a.shift(0);
//   let d = a.unshift(-1);
//   console.log(`a value is ${a}`);
//   console.log(`b value is ${b}`);  
//   console.log(`c value is ${c}`);  
//   console.log(`d value is ${d}`);  
// }

function test(){
  // const a = [1, 2, 3, 4, 5];
  // // console.log(a.indexOf(6));
  // // console.log(a.indexOf(1));
  // const b = a.slice(2, 4);
  // const c = [...a];
  // a.splice(1, 0, -1, -2);
  // console.log(`a value is ${a}`);
  // a.push(2);
  // console.log(`a value is ${a}`);
  // console.log(`b value is ${b}`);  
  // console.log(`c value is ${c}`);  

  // a1 = [1, 2, [3, 4]];
  a1 = new Array(1, 2, 3, 4);
    // b1 = a1.forEach((i)=>console.log(i));
  // b1 = a1.map((i)=>i+1);
  // console.log(`b1 value is ${b1}`);  
  // console.log(`b1 value is ${typeof b1}`);  

  // c1 = a1.map((x) =>  x * x );
  // console.log(`c1 value is ${c1}`);  
  // console.log(`c1 value is ${typeof c1}`);  
  
  // d1 = a1.filter((x) => x>2);
  // console.log(`d1 value is ${d1}`);  
  
  // e1= a1.reduce(function(m, o) {
  //   return m + o;
  // }, 0)
  // console.log(`e1 value is ${e1}`);
  
  let a = [1, 2, 3, 0];
  a.reverse();
  // console.log(`a value is ${a}`);
  // a.sort();
  // console.log(`a value is ${a}`);
  // a.toSorted();
  // console.log(`a value is ${a}`);
  
}

function print_methods(){
  const a = [1];
  const x = Object.getPrototypeOf(a);

  // This returns ALL property names, even the hidden (non-enumerable) ones
  Object.getOwnPropertyNames(x).forEach((k) => {
    console.log(k, x[k]);
  });
}

// Self-test: newArray
function testcase() {
  assert.deepEqual(newArray1(), [2, 2], "WRONG");
}

test();
// print_methods();
// testcase();
