'use client';

import { useState } from 'react';
import Card from './Card';
import { parseTimeToSeconds, formatSecondsToTime } from '@/lib/timeUtils';
import { calculateDistanceFromWatts, calculateDistanceFromPace } from '@/lib/skiergCalculations';

export default function DistanceForTimeCalculator() {
  const [timeInput, setTimeInput] = useState('');
  const [powerInput, setPowerInput] = useState('');
  const [inputType, setInputType] = useState<'watts' | 'pace'>('watts');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult('');

    const timeSeconds = parseTimeToSeconds(timeInput);
    if (timeSeconds === null || timeSeconds <= 0) {
      setError('Ogiltig tid. Använd format mm:ss.d eller hh:mm:ss.d');
      return;
    }

    if (inputType === 'watts') {
      const watts = parseFloat(powerInput);
      if (isNaN(watts) || watts <= 0) {
        setError('Ogiltigt watt-värde');
        return;
      }
      const distanceMeters = calculateDistanceFromWatts(timeSeconds, watts);
      setResult(`Sträcka: ${Math.round(distanceMeters)} m`);
    } else {
      const paceSeconds = parseTimeToSeconds(powerInput);
      if (paceSeconds === null || paceSeconds <= 0) {
        setError('Ogiltigt tempo. Använd format mm:ss.d');
        return;
      }
      const distanceMeters = calculateDistanceFromPace(timeSeconds, paceSeconds);
      setResult(`Sträcka: ${Math.round(distanceMeters)} m`);
    }
  };

  return (
    <Card title="Beräkna sträcka för tid">
      <div className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kraftkälla
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
              Tempo/500m
            </label>
          </div>
          <input
            type="text"
            value={powerInput}
            onChange={(e) => setPowerInput(e.target.value)}
            placeholder={inputType === 'watts' ? '200' : '2:15.0'}
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
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-lg font-semibold text-gray-900">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
