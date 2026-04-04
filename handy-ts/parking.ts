abstract class Vehicle {
  constructor(public readonly licensePlate: string) {}
  abstract getRequiredSpots(): number;
}

class Motorcycle extends Vehicle {
  getRequiredSpots(): number {
    return 1;
  }
}

class Car extends Vehicle {
  getRequiredSpots(): number {
    return 1;
  }
}

class Truck extends Vehicle {
  getRequiredSpots(): number {
    return 3;
  }
}

class ParkingLot {
  private readonly spots: string[];

  constructor(totalSpots: number) {
    this.spots = new Array(totalSpots).fill("0");
  }

  park(vehicle: Vehicle): boolean {
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

export {};

