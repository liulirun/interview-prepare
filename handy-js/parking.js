class Vehicle {
    licensePlate;
    constructor(licensePlate) {
        this.licensePlate = licensePlate;
    }
}
class Motorcycle extends Vehicle {
    getRequiredSpots() {
        return 1;
    }
}
class Car extends Vehicle {
    getRequiredSpots() {
        return 1;
    }
}
class Truck extends Vehicle {
    getRequiredSpots() {
        return 3;
    }
}
class ParkingLot {
    spots;
    constructor(totalSpots) {
        this.spots = new Array(totalSpots).fill("0");
    }
    park(vehicle) {
        const needed = vehicle.getRequiredSpots();
        for (let i = 0; i <= this.spots.length - needed; i++) {
            const segment = this.spots.slice(i, i + needed);
            if (segment.every((spot) => spot === "0")) {
                for (let j = i; j < i + needed; j++) {
                    this.spots[j] = vehicle.licensePlate;
                }
                console.log(`Parked ${vehicle.constructor.name} (${vehicle.licensePlate})`);
                return true;
            }
        }
        console.log("No room left!");
        return false;
    }
}
const lot = new ParkingLot(5);
lot.park(new Car("ABC-123"));
lot.park(new Truck("BIG-TRK"));
lot.park(new Motorcycle("M-42"));
