public class FindMaria {

    public static int countOccurrences(String text, String target, boolean caseSensitive) {
        // 1. Edge case handling
        if (text == null || target == null || text.isEmpty() || target.isEmpty()) {
            return 0;
        }
        // 2. Handle case sensitivity without changing the original text variable
        String searchText = caseSensitive ? text : text.toLowerCase();
        String searchTarget = caseSensitive ? target : target.toLowerCase();
        // // 3. Scan the string efficiently
        int count = 0;
        int index = 0;
        while ((index = searchText.indexOf(searchTarget, index)) != -1){
            count +=1;
            index += searchTarget.length();
        }
        return count;
    }
}
