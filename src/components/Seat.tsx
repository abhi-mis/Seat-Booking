import React from 'react';
import { Armchair } from 'lucide-react';

interface SeatProps {
  id: number;
  isBooked: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const Seat: React.FC<SeatProps> = ({ id, isBooked, isSelected, onClick }) => {
  const getColor = () => {
    if (isBooked) return 'text-gray-400';
    if (isSelected) return 'text-green-500';
    return 'text-blue-500 hover:text-blue-600';
  };

  return (
    <div 
      className={`relative transition-transform ${
        !isBooked && 'hover:scale-110 cursor-pointer'
      }`}
      onClick={!isBooked ? onClick : undefined}
    >
      <Armchair 
        className={`w-8 h-8 ${getColor()} transition-colors`}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
        {id}
      </span>
    </div>
  );
};