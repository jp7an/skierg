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
      <div className="space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            /500m (mm:ss.d)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tempoInput}
              onChange={(e) => setTempoInput(e.target.value)}
              placeholder=""
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={convertTempoToWatts}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              → Watt
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            Watt
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={wattsInput}
              onChange={(e) => setWattsInput(e.target.value)}
              placeholder=""
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={convertWattsToTempo}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              → tid
            </button>
          </div>
        </div>

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
