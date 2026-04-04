/**
 * Q7) Parking Lot Spot Allocation
 *
 * AI-BEST:
 * Interval-based free-space tracking.
 * In scalable versions with trees this can approach O(log n) operations.
 *
 * AI-EASY:
 * Linear scan over array of spots.
 * Time: O(n) park, Space: O(n)
 */

abstract class Vehicle {
  constructor(public readonly licensePlate: string) {}
  abstract getRequiredSpots(): number;
}

class Motorcycle extends Vehicle {
  getRequiredSpots(): number { return 1; }
}

class Car extends Vehicle {
  getRequiredSpots(): number { return 1; }
}

class Truck extends Vehicle {
  getRequiredSpots(): number { return 3; }
}

class ParkingLotEasy {
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
        console.log(`[EASY] Parked ${vehicle.constructor.name} ${vehicle.licensePlate} at ${i}-${i + needed - 1}`);
        return true;
      }
    }
    console.log(`[EASY] No room for ${vehicle.licensePlate}`);
    return false;
  }

  unpark(licensePlate: string): boolean {
    let removed = false;
    for (let i = 0; i < this.spots.length; i++) {
      if (this.spots[i] === licensePlate) {
        this.spots[i] = "0";
        removed = true;
      }
    }
    console.log(`[EASY] Unpark ${licensePlate}: ${removed}`);
    return removed;
  }

  debugSpots(): string {
    return this.spots.join(" | ");
  }
}

type Interval = { start: number; end: number };

class ParkingLotBest {
  private freeIntervals: Interval[];
  private parked = new Map<string, { start: number; size: number }>();

  constructor(totalSpots: number) {
    this.freeIntervals = [{ start: 0, end: totalSpots - 1 }];
  }

  park(vehicle: Vehicle): boolean {
    const needed = vehicle.getRequiredSpots();
    for (let i = 0; i < this.freeIntervals.length; i++) {
      const interval = this.freeIntervals[i];
      const available = interval.end - interval.start + 1;
      if (available >= needed) {
        const start = interval.start;
        const end = start + needed - 1;
        this.parked.set(vehicle.licensePlate, { start, size: needed });

        if (end === interval.end) {
          this.freeIntervals.splice(i, 1);
        } else {
          interval.start = end + 1;
        }

        console.log(`[BEST] Parked ${vehicle.constructor.name} ${vehicle.licensePlate} at ${start}-${end}`);
        return true;
      }
    }
    console.log(`[BEST] No room for ${vehicle.licensePlate}`);
    return false;
  }

  unpark(licensePlate: string): boolean {
    const record = this.parked.get(licensePlate);
    if (!record) {
      console.log(`[BEST] Unpark ${licensePlate}: false`);
      return false;
    }

    this.parked.delete(licensePlate);
    this.freeIntervals.push({ start: record.start, end: record.start + record.size - 1 });
    this.freeIntervals.sort((a, b) => a.start - b.start);

    const merged: Interval[] = [];
    for (const cur of this.freeIntervals) {
      if (merged.length === 0 || merged[merged.length - 1].end + 1 < cur.start) {
        merged.push({ ...cur });
      } else {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, cur.end);
      }
    }
    this.freeIntervals = merged;

    console.log(`[BEST] Unpark ${licensePlate}: true`);
    return true;
  }

  debugFreeIntervals(): string {
    return this.freeIntervals.map((x) => `[${x.start}-${x.end}]`).join(", ");
  }
}

function runDemo(): void {
  console.log("Q7: Parking Lot Spot Allocation");
  const vehicles: Vehicle[] = [
    new Car("ABC-123"),
    new Truck("BIG-TRK"),
    new Motorcycle("M-42"),
    new Car("CAR-999"),
  ];

  console.log("---- EASY ----");
  const easyLot = new ParkingLotEasy(8);
  for (const v of vehicles) easyLot.park(v);
  easyLot.unpark("BIG-TRK");
  easyLot.park(new Truck("TRK-2"));
  console.log("[EASY] Spots:", easyLot.debugSpots());

  console.log("---- BEST ----");
  const bestLot = new ParkingLotBest(8);
  for (const v of vehicles) bestLot.park(v);
  console.log("[BEST] Free:", bestLot.debugFreeIntervals());
  bestLot.unpark("BIG-TRK");
  console.log("[BEST] Free after unpark:", bestLot.debugFreeIntervals());
  bestLot.park(new Truck("TRK-2"));
  console.log("[BEST] Free final:", bestLot.debugFreeIntervals());
}

runDemo();

export {};

