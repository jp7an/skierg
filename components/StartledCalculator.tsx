'use client';

import { useState } from 'react';
import Card from './Card';
import { parseTimeToSeconds, formatSecondsToTime } from '@/lib/timeUtils';
import { calculateStartled } from '@/lib/startGroupUtils';

export default function StartledCalculator() {
  const [weight, setWeight] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [result, setResult] = useState<{
    watts: number;
    wattsPerKg: number;
    paceSeconds: number;
    startGroup: string;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    setResult(null);

    const weightKg = parseFloat(weight);
    if (isNaN(weightKg) || weightKg <= 0) {
      setError('Ogiltig vikt');
      return;
    }

    const timeSeconds = parseTimeToSeconds(timeInput);
    if (timeSeconds === null || timeSeconds <= 0) {
      setError('Ogiltig tid. Använd format mm:ss.d eller hh:mm:ss.d');
      return;
    }

    const calculationResult = calculateStartled(weightKg, timeSeconds);
    if (!calculationResult) {
      setError('Beräkningen misslyckades');
      return;
    }

    setResult(calculationResult);
  };

  return (
    <Card title="Startled - Beräkna startgrupp">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vikt (kg)
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="75"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            5000m tid (hh:mm:ss.d)
          </label>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="20:00.0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ange din 5000 meter tid
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Beräkna startgrupp
        </button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md space-y-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                Startgrupp: {result.startGroup}
              </p>
            </div>
            <div className="border-t border-green-300 pt-3 space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Genomsnittlig effekt:</span> {result.watts} W
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">W/kg:</span> {result.wattsPerKg} W/kg
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Tempo/500m:</span> {formatSecondsToTime(result.paceSeconds, 1)}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
