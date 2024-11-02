import React, { useState, useCallback } from 'react';
import { Train } from 'lucide-react';
import { Seat } from './types';
import { initializeSeats, findSeatsInSameRow, findNearbySeats } from './utils/seatUtils';
import { SeatMap } from './components/SeatMap';

function App() {
  const [seats, setSeats] = useState<Seat[]>(initializeSeats());
  const [numSeats, setNumSeats] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const bookSeats = useCallback(() => {
    setError('');
    setSuccess('');

    const num = parseInt(numSeats);
    if (isNaN(num) || num < 1 || num > 7) {
      setError('Please enter a number between 1 and 7');
      return;
    }

    // Find best available seats
    let seatsToBook: number[] = [];
    
    // Try to find seats in the same row first
    for (let row = 1; row <= 11; row++) {
      seatsToBook = findSeatsInSameRow(seats, num, row);
      if (seatsToBook.length === num) break;
    }

    // If not found in same row, find nearby seats
    if (seatsToBook.length === 0) {
      seatsToBook = findNearbySeats(seats, num);
    }

    if (seatsToBook.length === 0) {
      setError(`Sorry, ${num} consecutive seats are not available`);
      return;
    }

    // Book the seats
    setSeats(prevSeats => 
      prevSeats.map(seat => ({
        ...seat,
        isBooked: seat.isBooked || seatsToBook.includes(seat.id)
      }))
    );

    setSuccess(`Successfully booked seats: ${seatsToBook.join(', ')}`);
    setNumSeats('');
  }, [numSeats, seats]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Train className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Train Seat Booking</h1>
          </div>
          <p className="text-gray-600">Book up to 7 seats at once</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="number"
              min="1"
              max="7"
              value={numSeats}
              onChange={(e) => setNumSeats(e.target.value)}
              placeholder="Number of seats (1-7)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={bookSeats}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Seats
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}
        </div>

        <SeatMap
          seats={seats}
          selectedSeats={[]}
          onSeatClick={() => {}}
        />
      </div>
    </div>
  );
}

export default App;