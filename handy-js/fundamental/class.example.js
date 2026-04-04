/**
 * CLASS EXAMPLES
 *
 * Key ideas:
 * 1) class with constructor
 * 2) public/private fields
 * 3) method + inheritance
 */
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        return `Hi, I am ${this.name} and I am ${this.age} years old.`;
    }
}
class Student extends Person {
    major;
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    study() {
        return `${this.name} is studying ${this.major}.`;
    }
}
const alice = new Student("Alice", 21, "Computer Science");
console.log(alice.introduce());
console.log(alice.study());
