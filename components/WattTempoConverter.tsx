'use client';

import { useState } from 'react';
import Card from './Card';
import { parseTimeToSeconds, formatSecondsToTime } from '@/lib/timeUtils';
import { paceToWatts, wattsToPace } from '@/lib/skiergCalculations';

export default function WattTempoConverter() {
  const [tempoInput, setTempoInput] = useState('');
  const [wattsInput, setWattsInput] = useState('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const convertTempoToWatts = () => {
    setError('');
    setResult('');

    const seconds = parseTimeToSeconds(tempoInput);
    if (seconds === null || seconds <= 0) {
      setError('Ogiltig tid. Använd format mm:ss.d eller hh:mm:ss.d');
      return;
    }

    const watts = paceToWatts(seconds);
    setResult(`${Math.round(watts)} W`);
  };

  const convertWattsToTempo = () => {
    setError('');
    setResult('');

    const watts = parseFloat(wattsInput);
    if (isNaN(watts) || watts <= 0) {
      setError('Ogiltigt watt-värde');
      return;
    }

    const paceSeconds = wattsToPace(watts);
    setResult(`${formatSecondsToTime(paceSeconds, 1)} /500m`);
  };

  return (
    <Card title="Watt ↔ /500m">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            /500m (mm:ss.d)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tempoInput}
              onChange={(e) => setTempoInput(e.target.value)}
              placeholder=""
              className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={convertTempoToWatts}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              → Watt
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Watt
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={wattsInput}
              onChange={(e) => setWattsInput(e.target.value)}
              placeholder=""
              className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={convertWattsToTempo}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              → tid
            </button>
          </div>
        </div>

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
