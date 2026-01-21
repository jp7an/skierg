'use client';

import { useState } from 'react';
import { ExperienceLevel } from '@/lib/constants';
import {
  calculateWatts,
  calculateWattsPerKg,
  calculateTempoPer500m,
  determineStartGroup,
  parseTimeToSeconds,
  formatTime,
} from '@/lib/calculator';

export default function Home() {
  const [weight, setWeight] = useState('');
  const [time5k, setTime5k] = useState('');
  const [experience, setExperience] = useState<ExperienceLevel>('okej');
  const [results, setResults] = useState<{
    watts: number;
    wattsPerKg: number;
    tempoPer500m: string;
    startGroup: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    setResults(null);

    // Validate weight
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Vänligen ange en giltig vikt i kg');
      return;
    }

    // Parse and validate time
    const time5kSeconds = parseTimeToSeconds(time5k);
    if (time5kSeconds === null) {
      setError('Vänligen ange tid i format MM:SS (t.ex. 19:30)');
      return;
    }

    // Calculate results
    const watts = calculateWatts(time5kSeconds);
    const wattsPerKg = calculateWattsPerKg(watts, weightNum);
    const tempoPer500m = calculateTempoPer500m(time5kSeconds);
    const startGroup = determineStartGroup(wattsPerKg, experience);

    setResults({
      watts: Math.round(watts * 10) / 10,
      wattsPerKg: Math.round(wattsPerKg * 100) / 100,
      tempoPer500m: formatTime(tempoPer500m),
      startGroup,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-8 text-center">
          SkiErg Startgruppskalkylator
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Vikt (kg)
              </label>
              <input
                id="weight"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="75"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="time5k" className="block text-sm font-medium text-gray-700 mb-2">
                5000m tid (MM:SS)
              </label>
              <input
                id="time5k"
                type="text"
                value={time5k}
                onChange={(e) => setTime5k(e.target.value)}
                placeholder="19:30"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skidvana (skierfarenhet)
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setExperience('liten')}
                  className={`flex-1 px-4 py-2 rounded-md border transition-colors ${
                    experience === 'liten'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  Liten
                </button>
                <button
                  onClick={() => setExperience('okej')}
                  className={`flex-1 px-4 py-2 rounded-md border transition-colors ${
                    experience === 'okej'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  Okej
                </button>
                <button
                  onClick={() => setExperience('stor')}
                  className={`flex-1 px-4 py-2 rounded-md border transition-colors ${
                    experience === 'stor'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  Stor
                </button>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Beräkna
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Resultat</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Effekt (W)</span>
                <span className="font-medium text-gray-900">{results.watts} W</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">W/kg</span>
                <span className="font-medium text-gray-900">{results.wattsPerKg} W/kg</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Tempo/500m</span>
                <span className="font-medium text-gray-900">{results.tempoPer500m}</span>
              </div>
              <div className="flex justify-between items-center py-3 mt-2">
                <span className="text-gray-600 text-lg">Startgrupp</span>
                <span className="font-semibold text-blue-600 text-2xl">{results.startGroup}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
