/**
 * ARRAY: common operations for interview practice
 */

function printStringMethods() {
  const proto = String.prototype;

  Object.getOwnPropertyNames(proto).forEach((name) => {
    const value = proto[name];

    // Only print if the property is a function (a method)
    if (typeof value === "function") {
      console.log(name);
    }
  });
}
printStringMethods();

function operation1(){
  const a = 'yes, sir';
  console.log(a[2]);
  console.log(a.indexOf(','));

  console.log(a.slice(0, 2));
  console.log(a.concat('.nono'));
  console.log(a.replace('yes', 'no'));
};

operation1();


