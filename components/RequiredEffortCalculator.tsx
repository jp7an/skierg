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
    <Card title="Beräkna effekt/fart">
      <div className="space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            Sträcka (meter)
          </label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder=""
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            Tid (hh:mm:ss.d)
          </label>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder=""
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full px-3 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Beräkna
        </button>

        {error && (
          <div className="p-2 bg-red-950 border border-red-500/40 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-2.5 bg-gray-800 border border-green-500/40 rounded-lg space-y-1">
            <p className="text-green-400 font-bold text-base">Krävd effekt:</p>
            <p className="text-sm text-gray-300">Watt: {result.watts}</p>
            <p className="text-sm text-gray-300">tid: {result.pace}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
