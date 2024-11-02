export interface Seat {
  id: number;
  isBooked: boolean;
  rowNumber: number;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookedSeats: number[];
}