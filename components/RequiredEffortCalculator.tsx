'use client';

import { useState } from 'react';
import Card from './Card';
import { parseTimeToSeconds, formatSecondsToTime } from '@/lib/timeUtils';
import { calculateRequiredWatts, calculateRequiredPace } from '@/lib/skiergCalculations';

export default function RequiredEffortCalculator() {
  const [distance, setDistance] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [result, setResult] = useState<{ watts: string; pace: string } | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult(null);

    const distanceMeters = parseFloat(distance);
    if (isNaN(distanceMeters) || distanceMeters <= 0) {
      setError('Ogiltig sträcka');
      return;
    }

    const timeSeconds = parseTimeToSeconds(timeInput);
    if (timeSeconds === null || timeSeconds <= 0) {
      setError('Ogiltig tid. Använd format mm:ss.d eller hh:mm:ss.d');
      return;
    }

    const watts = calculateRequiredWatts(distanceMeters, timeSeconds);
    const paceSeconds = calculateRequiredPace(distanceMeters, timeSeconds);

    setResult({
      watts: `${Math.round(watts)} W`,
      pace: `${formatSecondsToTime(paceSeconds, 1)} /500m`,
    });
  };

  return (
    <Card title="Beräkna krävd kraft">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sträcka (meter)
          </label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="5000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tid (hh:mm:ss.d)
          </label>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="20:00.0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Beräkna
        </button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md space-y-2">
            <p className="text-lg font-semibold text-gray-900">Krävd kraft:</p>
            <p className="text-gray-700">Watt: {result.watts}</p>
            <p className="text-gray-700">Tempo: {result.pace}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
