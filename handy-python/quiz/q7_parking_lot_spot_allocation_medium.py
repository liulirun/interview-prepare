"""
Q7) Parking Lot Spot Allocation

AI-BEST:
- Track free contiguous intervals and merge/split on unpark/park.
- In scalable systems this can reach near O(log n) with tree structures.

AI-EASY:
- Linear scan over spot array for contiguous free block.
- Time: O(n) park, Space: O(n)
"""

from __future__ import annotations
from abc import ABC, abstractmethod


class Vehicle(ABC):
    def __init__(self, license_plate: str):
        self.license_plate = license_plate

    @abstractmethod
    def get_required_spots(self) -> int:
        raise NotImplementedError


class Motorcycle(Vehicle):
    def get_required_spots(self) -> int:
        return 1


class Car(Vehicle):
    def get_required_spots(self) -> int:
        return 1


class Truck(Vehicle):
    def get_required_spots(self) -> int:
        return 3


class ParkingLotEasy:
    def __init__(self, total_spots: int):
        self.spots = ["0"] * total_spots

    def park(self, vehicle: Vehicle) -> bool:
        need = vehicle.get_required_spots()
        for i in range(0, len(self.spots) - need + 1):
            if all(spot == "0" for spot in self.spots[i:i + need]):
                for j in range(i, i + need):
                    self.spots[j] = vehicle.license_plate
                print(f"[EASY] Parked {type(vehicle).__name__} {vehicle.license_plate} at {i}-{i + need - 1}")
                return True
        print(f"[EASY] No room for {vehicle.license_plate}")
        return False

    def unpark(self, license_plate: str) -> bool:
        removed = False
        for i in range(len(self.spots)):
            if self.spots[i] == license_plate:
                self.spots[i] = "0"
                removed = True
        print(f"[EASY] Unpark {license_plate}: {removed}")
        return removed


class ParkingLotBest:
    def __init__(self, total_spots: int):
        # free intervals as inclusive pairs [start, end]
        self.free_intervals: list[list[int]] = [[0, total_spots - 1]]
        self.parked: dict[str, tuple[int, int]] = {}

    def park(self, vehicle: Vehicle) -> bool:
        need = vehicle.get_required_spots()
        for idx, interval in enumerate(self.free_intervals):
            start, end = interval
            available = end - start + 1
            if available >= need:
                alloc_start = start
                alloc_end = start + need - 1
                self.parked[vehicle.license_plate] = (alloc_start, need)

                # consume from interval start
                if alloc_end == end:
                    self.free_intervals.pop(idx)
                else:
                    self.free_intervals[idx][0] = alloc_end + 1

                print(f"[BEST] Parked {type(vehicle).__name__} {vehicle.license_plate} at {alloc_start}-{alloc_end}")
                return True

        print(f"[BEST] No room for {vehicle.license_plate}")
        return False

    def unpark(self, license_plate: str) -> bool:
        if license_plate not in self.parked:
            print(f"[BEST] Unpark {license_plate}: False")
            return False

        start, size = self.parked.pop(license_plate)
        self.free_intervals.append([start, start + size - 1])
        self.free_intervals.sort(key=lambda x: x[0])

        # merge touching/overlapping intervals
        merged: list[list[int]] = []
        for current in self.free_intervals:
            if not merged or merged[-1][1] + 1 < current[0]:
                merged.append(current[:])
            else:
                merged[-1][1] = max(merged[-1][1], current[1])
        self.free_intervals = merged

        print(f"[BEST] Unpark {license_plate}: True")
        return True

    def debug_free(self) -> str:
        return ", ".join(f"[{s}-{e}]" for s, e in self.free_intervals)


def run_demo() -> None:
    print("Q7: Parking Lot Spot Allocation")
    vehicles = [Car("ABC-123"), Truck("BIG-TRK"), Motorcycle("M-42"), Car("CAR-999")]

    print("---- EASY ----")
    easy_lot = ParkingLotEasy(8)
    for v in vehicles:
        easy_lot.park(v)
    easy_lot.unpark("BIG-TRK")
    easy_lot.park(Truck("TRK-2"))
    print("[EASY] Spots:", " | ".join(easy_lot.spots))

    print("---- BEST ----")
    best_lot = ParkingLotBest(8)
    for v in vehicles:
        best_lot.park(v)
    print("[BEST] Free:", best_lot.debug_free())
    best_lot.unpark("BIG-TRK")
    print("[BEST] Free after unpark:", best_lot.debug_free())
    best_lot.park(Truck("TRK-2"))
    print("[BEST] Free final:", best_lot.debug_free())


if __name__ == "__main__":
    run_demo()
