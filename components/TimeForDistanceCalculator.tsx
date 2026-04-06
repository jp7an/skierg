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
            Enhet
          </label>
          <div className="flex gap-1 p-0.5 bg-gray-800 rounded-lg w-fit mb-2">
            <button
              onClick={() => setInputType('watts')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                inputType === 'watts' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Watt
            </button>
            <button
              onClick={() => setInputType('pace')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                inputType === 'pace' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'
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
          <div className="p-2.5 bg-gray-800 border border-green-500/40 rounded-lg">
            <p className="text-green-400 font-bold text-base">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
