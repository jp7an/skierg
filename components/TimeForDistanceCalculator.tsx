'use client';

import { useState } from 'react';
import Card from './Card';
import { parseTimeToSeconds, formatSecondsToTime } from '@/lib/timeUtils';
import { calculateTimeFromWatts, calculateTimeFromPace } from '@/lib/skiergCalculations';

export default function TimeForDistanceCalculator() {
  const [distance, setDistance] = useState('');
  const [powerInput, setPowerInput] = useState('');
  const [inputType, setInputType] = useState<'watts' | 'pace'>('watts');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult('');

    const distanceMeters = parseFloat(distance);
    if (isNaN(distanceMeters) || distanceMeters <= 0) {
      setError('Ogiltig sträcka');
      return;
    }

    if (inputType === 'watts') {
      const watts = parseFloat(powerInput);
      if (isNaN(watts) || watts <= 0) {
        setError('Ogiltigt watt-värde');
        return;
      }
      const timeSeconds = calculateTimeFromWatts(distanceMeters, watts);
      setResult(`Tid: ${formatSecondsToTime(timeSeconds, 1)}`);
    } else {
      const paceSeconds = parseTimeToSeconds(powerInput);
      if (paceSeconds === null || paceSeconds <= 0) {
        setError('Ogiltigt tempo. Använd format mm:ss.d');
        return;
      }
      const timeSeconds = calculateTimeFromPace(distanceMeters, paceSeconds);
      setResult(`Tid: ${formatSecondsToTime(timeSeconds, 1)}`);
    }
  };

  return (
    <Card title="Beräkna tid">
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
            Enhet
          </label>
          <div className="flex gap-0.5 p-0.5 bg-zinc-900 border border-zinc-700 rounded w-fit mb-2">
            <button
              onClick={() => setInputType('watts')}
              className={`px-3 py-0.5 text-xs font-bold rounded transition-colors ${
                inputType === 'watts' ? 'bg-green-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Watt
            </button>
            <button
              onClick={() => setInputType('pace')}
              className={`px-3 py-0.5 text-xs font-bold rounded transition-colors ${
                inputType === 'pace' ? 'bg-green-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              /500m
            </button>
          </div>
          <input
            type="text"
            value={powerInput}
            onChange={(e) => setPowerInput(e.target.value)}
            placeholder={inputType === 'watts' ? '' : 'mm:ss.d'}
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
          <div className="px-2 py-1.5 bg-zinc-900 border border-green-500/30 rounded">
            <p className="text-green-400 font-bold text-sm">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
