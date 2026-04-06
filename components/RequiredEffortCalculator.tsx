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
          <label className="block text-xs text-green-500 uppercase tracking-wide mb-0.5">
            Sträcka (meter)
          </label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="bg-black border border-zinc-700 text-white rounded px-2 py-0.5 text-sm focus:outline-none focus:border-green-500 w-full"
          />
        </div>

        <div>
          <label className="block text-xs text-green-500 uppercase tracking-wide mb-0.5">
            Tid (hh:mm:ss.d)
          </label>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="bg-black border border-zinc-700 text-white rounded px-2 py-0.5 text-sm focus:outline-none focus:border-green-500 w-full"
          />
        </div>

        <button
          onClick={calculate}
          className="px-4 py-1.5 bg-green-500 hover:bg-green-400 text-black text-xs font-bold rounded uppercase tracking-wide transition-colors"
        >
          Beräkna
        </button>

        {error && (
          <div className="px-2 py-1 bg-zinc-900 border border-red-500/40 rounded text-red-400 text-xs">
            {error}
          </div>
        )}

        {result && (
          <div className="px-2 py-1.5 bg-zinc-900 border border-green-500/30 rounded space-y-0.5">
            <p className="text-green-400 font-bold text-sm">Krävd effekt:</p>
            <p className="text-xs text-green-400">Watt: {result.watts}</p>
            <p className="text-xs text-green-400">tid: {result.pace}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
