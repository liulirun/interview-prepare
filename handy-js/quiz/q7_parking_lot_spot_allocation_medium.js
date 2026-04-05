/**
 * Q7) Parking Lot Spot Allocation
 *
 * AI-BEST:
 * Interval-based free-space tracking (concept used in scalable implementations).
 * In production, a balanced tree can drive near O(log n) updates/lookups.
 *
 * AI-EASY:
 * Linear scan over spot array for a contiguous free segment.
 * Time: O(n) park in worst case, Space: O(n)
 */

class Vehicle {
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

class ParkingLotEasy {
  constructor(totalSpots) {
    this.spots = new Array(totalSpots).fill("0");
  }

  park(vehicle) {
    const need = vehicle.getRequiredSpots();
    for (let i = 0; i <= this.spots.length - need; i++) {
      const segment = this.spots.slice(i, i + need);
      if (segment.every((spot) => spot === "0")) {
        for (let j = i; j < i + need; j++) {
          this.spots[j] = vehicle.licensePlate;
        }
        console.log(`[EASY] Parked ${vehicle.constructor.name} ${vehicle.licensePlate} at ${i}-${i + need - 1}`);
        return true;
      }
    }
    console.log(`[EASY] No room for ${vehicle.licensePlate}`);
    return false;
  }

  unpark(licensePlate) {
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
}

class ParkingLotBest {
  constructor(totalSpots) {
    this.totalSpots = totalSpots;

    // Intervals are inclusive ranges [start, end] of free spots.
    this.freeIntervals = [{ start: 0, end: totalSpots - 1 }];
    this.parked = new Map(); // plate -> { start, size }
  }

  park(vehicle) {
    const need = vehicle.getRequiredSpots();

    for (let i = 0; i < this.freeIntervals.length; i++) {
      const interval = this.freeIntervals[i];
      const available = interval.end - interval.start + 1;
      if (available >= need) {
        const start = interval.start;
        const end = start + need - 1;

        this.parked.set(vehicle.licensePlate, { start, size: need });

        // Consume from interval start; remove interval if fully used.
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

  unpark(licensePlate) {
    const record = this.parked.get(licensePlate);
    if (!record) {
      console.log(`[BEST] Unpark ${licensePlate}: false`);
      return false;
    }

    this.parked.delete(licensePlate);
    const interval = { start: record.start, end: record.start + record.size - 1 };

    // Insert back in sorted order, then merge adjacent/overlapping intervals.
    this.freeIntervals.push(interval);
    this.freeIntervals.sort((a, b) => a.start - b.start);

    const merged = [];
    for (const curr of this.freeIntervals) {
      if (merged.length === 0 || merged[merged.length - 1].end + 1 < curr.start) {
        merged.push({ ...curr });
      } else {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, curr.end);
      }
    }
    this.freeIntervals = merged;

    console.log(`[BEST] Unpark ${licensePlate}: true`);
    return true;
  }

  debugFreeIntervals() {
    return this.freeIntervals.map((x) => `[${x.start}-${x.end}]`).join(", ");
  }
}

function runDemo() {
  console.log("Q7: Parking Lot Spot Allocation");
  const easyLot = new ParkingLotEasy(8);
  const bestLot = new ParkingLotBest(8);
  const vehicles = [
    new Car("ABC-123"),
    new Truck("BIG-TRK"),
    new Motorcycle("M-42"),
    new Car("CAR-999"),
  ];

  console.log("---- EASY ----");
  for (const v of vehicles) easyLot.park(v);
  easyLot.unpark("BIG-TRK");
  easyLot.park(new Truck("TRK-2"));
  console.log("[EASY] Spots:", easyLot.spots.join(" | "));

  console.log("---- BEST ----");
  for (const v of vehicles) bestLot.park(v);
  console.log("[BEST] Free:", bestLot.debugFreeIntervals());
  bestLot.unpark("BIG-TRK");
  console.log("[BEST] Free after unpark:", bestLot.debugFreeIntervals());
  bestLot.park(new Truck("TRK-2"));
  console.log("[BEST] Free final:", bestLot.debugFreeIntervals());
}

runDemo();
