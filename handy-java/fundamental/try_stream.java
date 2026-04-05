import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class try_stream {
    public static void main(String[] args) {

      Method[] methods = Stream.class.getDeclaredMethods();
      System.out.println("Unique Stream Methods");
      // 2. Use a Stream to process the method names
      Stream.of(methods)
            .map(Method::getName)  // Extract just the name String
            .distinct()            // Remove duplicate names (overloads)
            .sorted()              // Put them in alphabetical order
            .forEach(System.out::println); // Print each one
    
    // Group
    List<Integer> scores = new ArrayList<>(List.of(1, 2, 3, 90));
    Map<String, List<Integer>> gradeGroups = scores.stream()
    .collect(Collectors.groupingBy(s -> s >= 60 ? "Pass" : "Fail"));
    System.out.println(gradeGroups);

    }
}
