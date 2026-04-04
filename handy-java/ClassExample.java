/**
 * CLASS EXAMPLES
 *
 * Pro tip:
 * In interviews, explain why you choose `private` fields and expose behavior
 * through methods. That shows encapsulation, not just syntax knowledge.
 */
public class ClassExample {
    static class Person {
        public final String name;
        private final int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        protected String introduce() {
            return "Hi, I am " + name + " and I am " + age + " years old.";
        }

        protected int age() {
            return age;
        }
    }

    static class Student extends Person {
        private final String major;

        Student(String name, int age, String major) {
            super(name, age);
            this.major = major;
        }

        String study() {
            return "%d %s %s".formatted(age(), name, major);
        }
    }

    public static void main(String[] args) {
        Student alice = new Student("Alice", 21, "Computer Science");
        System.out.println(alice.introduce());
        System.out.println(alice.study());
    }
}
