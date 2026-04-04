from abc import ABC, abstractmethod

# 1. Inheritance: All vehicles share a license plate


class Vehicle(ABC):
    def __init__(self, license_plate: str):
        self.license_plate = license_plate

    # 2. Polymorphism: Each vehicle type defines its own space needs
    @abstractmethod
    def get_required_spots(self) -> int:
        pass


class Motorcycle(Vehicle):
    def get_required_spots(self) -> int:
        return 1  # Fits in a small spot


class Car(Vehicle):
    def get_required_spots(self) -> int:
        return 1  # Standard spot


class Truck(Vehicle):
    def get_required_spots(self) -> int:
        return 3  # Needs multiple spots


class ParkingLot:
    def __init__(self, total_spots: int):
        self.spots = ['0'] * total_spots  # Simple array of spots

    def park(self, vehicle: Vehicle):
        # Polymorphism: Get how many spaces this specific vehicle needs
        needed = vehicle.get_required_spots()

        # Look for a starting point (i) where the vehicle can fit
        # We stop at 'len - needed' because a Truck needing 3 spots
        # can't start at the very last index.
        for i in range(len(self.spots) - needed + 1):
            # Check if all spots from 'i' to 'i + needed' are empty (None)
            if all(spot is '0' for spot in self.spots[i: i + needed]):

                # If found, fill those specific spots with the vehicle object
                for j in range(i, i + needed):
                    self.spots[j] = vehicle.license_plate

                print(
                    f"Parked {type(vehicle).__name__} ({vehicle.license_plate})")
                return True

        # If the loop finishes without returning, no large enough gap was found
        print("No room left!")
        return False


# Usage
lot = ParkingLot(5)
lot.park(Car("ABC-123"))      # Takes 1 spot
lot.park(Truck("BIG-TRK"))    # Takes 3 spots
lot.park(Motorcycle("M-42"))  # Takes 1 spot
