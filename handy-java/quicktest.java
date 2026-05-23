
public class quicktest{
  public static void main(String[] args) {
    System.out.println("start");
    String s = "Maria's lower case is MARIA, but we call her Maria";
    String t = "Maria";
    int count_sensitive = count_number(s, t, true);
    System.out.println("sensitive count for " + t + " = " + count_sensitive);
    int count_insensitive = count_number(s, t, false);
    System.out.println("insensitive count for " + t + " = " + count_insensitive);
  }
  public static int count_number(String s, String t, boolean caseSensitive){
    String use_s = s;
    String use_t = t;
    int count = 0;
    if (!caseSensitive){
      use_s = s.toLowerCase();
      use_t = t.toLowerCase();
    }
    String[] use_a = use_s.split(" ");
    for (String word : use_a) {
      if (word.contains(use_t)) count++;
      
    }
    return count;
  }
}