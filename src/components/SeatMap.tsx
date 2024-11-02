import React from 'react';
import { Seat as SeatType } from '../types';
import { Seat } from './Seat';
import { Armchair } from 'lucide-react';

interface SeatMapProps {
  seats: SeatType[];
  selectedSeats: number[];
  onSeatClick: (seatId: number) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeats, onSeatClick }) => {
  const renderRow = (rowNumber: number) => {
    const seatsInRow = rowNumber === 11 ? 3 : 7;
    const rowSeats = seats.filter(seat => seat.rowNumber === rowNumber);

    return (
      <div 
        key={rowNumber}
        className={`flex gap-2 ${
          rowNumber === 11 ? 'justify-center' : 'justify-between'
        } mb-4`}
      >
        {rowSeats.map(seat => (
          <Seat
            key={seat.id}
            id={seat.id}
            isBooked={seat.isBooked}
            isSelected={selectedSeats.includes(seat.id)}
            onClick={() => onSeatClick(seat.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="mb-6">
        {Array.from({ length: 11 }, (_, i) => renderRow(i + 1))}
      </div>
      
      <div className="flex justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <Armchair className="w-5 h-5 text-blue-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair className="w-5 h-5 text-green-500" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair className="w-5 h-5 text-gray-400" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};