package access_modifier;

class Parent {
    private String privateMsg = "Secret";
    String defaultMsg = "Friendly";
    protected String protectedMsg = "Family";
    public String publicMsg = "World";

    private void privateMethod() {}
    void defaultMethod() {}
    protected void protectedMethod() {}
    public void publicMethod() {}
}

class Child extends Parent {
    @Override public void defaultMethod() {}       // ✅Can increase visibility (default -> public)
    // @Override void protectedMethod() {}        // ❌:Cannot reduce visibility (protected -> default)
}

class AccessModifierDemo {
    public static void main(String[] args) {
        Parent parent = new Parent();
        Child child = new Child();

        System.out.println("=== Running Access Modifier Interview Questions ===");

        // Q1: Can you access a private variable from another class in the same package?
        // String q1 = parent.privateMsg;          // ❌:private is strictly restricted to its own class

        // Q2: Can you access a private method using an instance of that class?
        // parent.privateMethod();                 // ❌:Instance variable cannot bypass private wall

        // Q3: Does 'default' (no modifier) allow access within the same package?
        String q3 = parent.defaultMsg;             // ✅default allows package-level visibility
        parent.defaultMethod();                    // ✅default method executes fine here

        // Q4: Can a subclass access package-private (default) members of its parent?
        String q4 = child.defaultMsg;              // ✅Works here because Child is in the same package

        // Q5: Can a subclass reduce the visibility of a protected method when overriding it?
        // See Child class definition above.        // ❌:Overriding method cannot restrict access further

        // Q6: Does 'protected' allow access to non-subclasses in the same package?
        String q6 = parent.protectedMsg;           // ✅protected behaves like default within same package
        parent.protectedMethod();                  // ✅Method runs because package access applies

        // Q7: Is 'public' accessible from absolutely anywhere in the application?
        String q7 = parent.publicMsg;              // ✅public is visible to all classes everywhere
        parent.publicMethod();                     // ✅Global visibility confirmed

        // Q8: Can local variables inside a method use access modifiers?
        // public int localizedVar = 10;           // ❌:Local variables inside methods cannot have modifiers

        // Q9: Can a top-level outer class be marked as private or protected?
        // See file structure constraints.         // ❌:Outer classes can only be public or default

        // Q10: Can you access protected members from a different package without inheritance?
        // Simulated cross-package barrier:
        // String q10 = parent.protectedMsg;       // ❌:Cross-package access requires inheritance for protected

        System.out.println("All allowed checks passed successfully!");
    }
}
