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
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sträcka (meter)
          </label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder=""
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enhet
          </label>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="watts"
                checked={inputType === 'watts'}
                onChange={() => setInputType('watts')}
                className="mr-2"
              />
              Watt
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="pace"
                checked={inputType === 'pace'}
                onChange={() => setInputType('pace')}
                className="mr-2"
              />
              tid/500m
            </label>
          </div>
          <input
            type="text"
            value={powerInput}
            onChange={(e) => setPowerInput(e.target.value)}
            placeholder={inputType === 'watts' ? '' : 'mm:ss.d'}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        >
          Beräkna
        </button>

        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-2 bg-green-50 border border-green-200 rounded-md">
            <p className="text-base font-semibold text-gray-900">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
