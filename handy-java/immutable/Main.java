package immutable;
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate myDate = LocalDate.now(); 
        UserUseLocalDate user = new UserUseLocalDate("Alice", myDate);
        
        // 3. To "change" a LocalDate, you must generate a NEW instance.
        // It does not have .setTime(). The original 'myDate' remains untouched.
        // LocalDate modifiedDate = myDate.plusDays(5); 
        myDate.plusDays(5); 
        
        System.out.println("Original Date: " + myDate);
        // System.out.println("Modified Date: " + modifiedDate);
        
    }
}