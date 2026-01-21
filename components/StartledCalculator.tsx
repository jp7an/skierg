'use client';

import { useState } from 'react';
import Card from './Card';
import { parseTimeToSeconds, formatSecondsToTime } from '@/lib/timeUtils';
import { calculateStartled, SkiExperience } from '@/lib/startGroupUtils';

export default function StartledCalculator() {
  const [weight, setWeight] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [experience, setExperience] = useState<SkiExperience>('okej');
  const [result, setResult] = useState<{
    watts: number;
    wattsPerKg: number;
    paceSeconds: number;
    startGroup: string;
    position: number | null;
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

    const calculationResult = calculateStartled(weightKg, timeSeconds, experience);
    if (!calculationResult) {
      setError('Beräkningen misslyckades');
      return;
    }

    setResult(calculationResult);
  };

  const getPositionIndicator = (position: number | null) => {
    if (position === null) return null;
    
    let label = '';
    if (position < 0.33) label = 'nedre delen';
    else if (position < 0.67) label = 'mitten';
    else label = 'övre delen';
    
    return (
      <div className="mt-2 pt-2 border-t border-green-300">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, position * 100)}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Du är i <span className="font-semibold">{label}</span> av startgruppen
        </p>
      </div>
    );
  };

  return (
    <Card title="Beräkna startled">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vikt (kg)
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="t.ex. 75"
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
            placeholder="t.ex. 20:00.0"
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skidvana
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as SkiExperience)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="liten">Liten</option>
            <option value="okej">Okej</option>
            <option value="stor">Stor</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Välj din erfarenhet av längdskidåkning
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        >
          Beräkna startled
        </button>

        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md space-y-2">
            <div>
              <p className="text-xl font-bold text-gray-900">
                Startled: {result.startGroup}
              </p>
            </div>
            {getPositionIndicator(result.position)}
            <div className="border-t border-green-300 pt-2 space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Genomsnittlig effekt:</span> {result.watts} W
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">W/kg:</span> {result.wattsPerKg} W/kg
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">tid/500m:</span> {formatSecondsToTime(result.paceSeconds, 1)}
              </p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 pt-2 border-t border-gray-200">
          <p>
            OBS: SkiErg-kapacitet kan variera mellan personer i förhållande till startled. {' '}
            <a 
              href="https://erikwickstrom.se/2016/12/30/snittwatt-per-kg-kroppsvikt-pa-5000-m-skierg-vs-vasaloppsplacering/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              källa
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
}
