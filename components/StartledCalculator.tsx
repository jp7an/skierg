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

  const POSITION_LABELS = {
    lower: 'nedre delen',
    middle: 'mitten',
    upper: 'övre delen',
  };

  const getPositionIndicator = (position: number | null) => {
    if (position === null) return null;
    
    let label = '';
    if (position < 0.33) label = POSITION_LABELS.lower;
    else if (position < 0.67) label = POSITION_LABELS.middle;
    else label = POSITION_LABELS.upper;
    
    return (
      <div className="mt-2 pt-2 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, position * 100)}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Du är i <span className="font-semibold">{label}</span> av startgruppen
        </p>
      </div>
    );
  };

  return (
    <Card title="Beräkna startled">
      <div className="space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            Vikt (kg)
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="t.ex. 75"
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            5000m tid (hh:mm:ss.d)
          </label>
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="t.ex. 20:00.0"
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">
            Skidvana
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as SkiExperience)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
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
          className="w-full px-3 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Beräkna startled
        </button>

        {error && (
          <div className="p-2 bg-red-950 border border-red-500/40 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-2.5 bg-gray-800 border border-green-500/40 rounded-lg space-y-2">
            <div>
              <p className="text-xl font-bold text-green-400">
                Startled: {result.startGroup}
              </p>
            </div>
            {getPositionIndicator(result.position)}
            <div className="border-t border-gray-700 pt-2 space-y-1">
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Genomsnittlig effekt:</span> {result.watts} W
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold">W/kg:</span> {result.wattsPerKg} W/kg
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold">/500m:</span> {formatSecondsToTime(result.paceSeconds, 1)}
              </p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 pt-2 border-t border-gray-700">
          <p>
            OBS: SkiErg-kapacitet kan variera mellan personer i förhållande till startled.{' '}
            <a 
              href="https://erikwickstrom.se/2016/12/30/snittwatt-per-kg-kroppsvikt-pa-5000-m-skierg-vs-vasaloppsplacering/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              källa
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
}
