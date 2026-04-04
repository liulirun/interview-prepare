import java.util.Arrays;

/**
 * PARKING LOT OOP PRACTICE
 *
 * Pro tip:
 * In interviews, point out polymorphism clearly:
 * `park` calls `getRequiredSpots()` without checking concrete vehicle type.
 */
public class ParkingInterview {
    static abstract class Vehicle {
        protected final String licensePlate;

        Vehicle(String licensePlate) {
            this.licensePlate = licensePlate;
        }

        abstract int getRequiredSpots();
    }

    static class Motorcycle extends Vehicle {
        Motorcycle(String licensePlate) {
            super(licensePlate);
        }

        @Override
        int getRequiredSpots() {
            return 1;
        }
    }

    static class Car extends Vehicle {
        Car(String licensePlate) {
            super(licensePlate);
        }

        @Override
        int getRequiredSpots() {
            return 1;
        }
    }

    static class Truck extends Vehicle {
        Truck(String licensePlate) {
            super(licensePlate);
        }

        @Override
        int getRequiredSpots() {
            return 3;
        }
    }

    static class ParkingLot {
        private final String[] spots;

        ParkingLot(int totalSpots) {
            this.spots = new String[totalSpots];
            Arrays.fill(this.spots, "0");
        }

        boolean park(Vehicle vehicle) {
            int needed = vehicle.getRequiredSpots();

            for (int i = 0; i <= spots.length - needed; i++) {
                boolean allEmpty = true;
                for (int j = i; j < i + needed; j++) {
                    if (!"0".equals(spots[j])) {
                        allEmpty = false;
                        break;
                    }
                }

                if (allEmpty) {
                    for (int j = i; j < i + needed; j++) {
                        spots[j] = vehicle.licensePlate;
                    }
                    System.out.println("Parked " + vehicle.getClass().getSimpleName() + " (" + vehicle.licensePlate + ")");
                    return true;
                }
            }

            System.out.println("No room left!");
            return false;
        }
    }

    public static void main(String[] args) {
        ParkingLot lot = new ParkingLot(5);
        lot.park(new Car("ABC-123"));
        lot.park(new Truck("BIG-TRK"));
        lot.park(new Motorcycle("M-42"));
    }
}
