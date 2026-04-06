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
          <label className="block text-xs text-green-500 uppercase tracking-wide mb-0.5">
            /500m (mm:ss.d)
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={tempoInput}
              onChange={(e) => setTempoInput(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 text-white rounded px-2 py-0.5 text-sm focus:outline-none focus:border-green-500"
            />
            <button
              onClick={convertTempoToWatts}
              className="px-3 py-1 bg-green-500 hover:bg-green-400 text-black text-xs font-bold rounded whitespace-nowrap transition-colors"
            >
              → Watt
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs text-green-500 uppercase tracking-wide mb-0.5">
            Watt
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={wattsInput}
              onChange={(e) => setWattsInput(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 text-white rounded px-2 py-0.5 text-sm focus:outline-none focus:border-green-500"
            />
            <button
              onClick={convertWattsToTempo}
              className="px-3 py-1 bg-green-500 hover:bg-green-400 text-black text-xs font-bold rounded whitespace-nowrap transition-colors"
            >
              → tid
            </button>
          </div>
        </div>

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
