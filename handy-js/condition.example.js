/**
 * CONDITION EXAMPLES
 *
 * Key ideas:
 * 1) if / else if / else branching
 * 2) switch for multiple fixed cases
 * 3) ternary for short inline conditions
 */
function gradeLabel(score) {
    if (score >= 90)
        return "A";
    if (score >= 80)
        return "B";
    if (score >= 70)
        return "C";
    return "Needs improvement";
}
function dayType(day) {
    switch (day.toLowerCase()) {
        case "saturday":
        case "sunday":
            return "Weekend";
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            return "Weekday";
        default:
            return "Unknown day";
    }
}
const score = 88;
const passMessage = score >= 60 ? "Pass" : "Fail";
console.log(`Score ${score}: ${gradeLabel(score)}`);
console.log(`Result: ${passMessage}`);
console.log(`Saturday is a: ${dayType("Saturday")}`);
