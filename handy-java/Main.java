public class Main {
    public static void main(String[] args) {
        String text = "Maria's lower case is MARIA, but we call her Maria";
        
        // 1. Create the object instance
        FindMaria utils = new FindMaria();
        
        // 2. Call the method on that object
        int total = utils.countOccurrences(text, "Maria", false);
        
        System.out.println("Matches found: " + total);
    }
}