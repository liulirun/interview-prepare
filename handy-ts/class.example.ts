/**
 * CLASS EXAMPLES
 *
 * Key ideas:
 * 1) class with constructor
 * 2) public/private fields
 * 3) method + inheritance
 */

class Person {
  constructor(public name: string, private age: number) {}

  introduce(): string {
    return `Hi, I am ${this.name} and I am ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name: string, age: number, public major: string) {
    super(name, age);
  }

  study(): string {
    return `${this.name} is studying ${this.major}.`;
  }
}

const alice = new Student("Alice", 21, "Computer Science");
console.log(alice.introduce());
console.log(alice.study());
