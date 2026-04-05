import java.lang.reflect.Method;
import java.util.Collections;
import java.util.stream.Stream;

public class try_collections {

//   The Collections class is a powerful utility toolkit in Java that performs operations on collections (like ArrayList, Set, or Map). Unlike ArrayList methods which you call on the object (e.g., list.add()), Collections methods are static, so you pass the list into them.

    public static void main(String[] args){
      Method[] methods = Collections.class.getDeclaredMethods();

        System.out.println("Unique Collections Methods");
        // 2. Stream, extract names, remove duplicates, and sort
        Stream.of(methods)
              .map(Method::getName)
              .distinct()
              .sorted()
              .forEach(System.out::println);

      System.out.println("Collections Start");
      // Sorting: How to sort a list in natural order.
      // Reversing: How to flip the order of elements.
      // Shuffling: How to randomize the order (great for games).
      // Frequency: How to count how many times an object appears.
      // Min/Max: How to find the smallest or largest value.
      // Disjoint: How to check if two lists have zero common elements.
      // Fill: How to replace every element in a list with one specific value.
      // ReplaceAll: How to swap all instances of "A" with "B".
      // Rotate: How to shift elements by a specific distance.
      // Unmodifiable: How to create a "read-only" version of your list.
    }

  }

