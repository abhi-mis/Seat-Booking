import { Seat } from '../types';

// Initialize seats with 11 rows (10 rows of 7 seats + 1 row of 3 seats)
export const initializeSeats = (): Seat[] => {
  const seats: Seat[] = [];
  let seatId = 1;

  for (let row = 1; row <= 11; row++) {
    const seatsInRow = row === 11 ? 3 : 7;
    for (let i = 0; i < seatsInRow; i++) {
      seats.push({
        id: seatId++,
        isBooked: false,
        rowNumber: row,
      });
    }
  }
  return seats;
};

// Find best available seats in the same row
export const findSeatsInSameRow = (
  seats: Seat[],
  numSeats: number,
  row: number
): number[] => {
  const seatsInRow = row === 11 ? 3 : 7;
  const rowStart = (row - 1) * 7;
  const consecutive: number[] = [];

  for (let i = rowStart; i < rowStart + seatsInRow; i++) {
    if (consecutive.length === numSeats) break;
    
    if (!seats[i]?.isBooked) {
      consecutive.push(seats[i].id);
    } else {
      consecutive.length = 0;
    }
  }

  return consecutive.length === numSeats ? consecutive : [];
};

// Find best available nearby seats
export const findNearbySeats = (
  seats: Seat[],
  numSeats: number
): number[] => {
  const available: number[] = [];

  for (const seat of seats) {
    if (available.length === numSeats) break;
    if (!seat.isBooked) {
      available.push(seat.id);
    }
  }

  return available.length === numSeats ? available : [];
};