import WattTempoConverter from '@/components/WattTempoConverter';
import TimeForDistanceCalculator from '@/components/TimeForDistanceCalculator';
import DistanceForTimeCalculator from '@/components/DistanceForTimeCalculator';
import RequiredEffortCalculator from '@/components/RequiredEffortCalculator';
import StartledCalculator from '@/components/StartledCalculator';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SkiErg Kalkylatorer
          </h1>
          <p className="text-gray-600">
            Beräkningsverktyg för Concept2 SkiErg träning och tävling
          </p>
        </header>

        <div className="space-y-6">
          <WattTempoConverter />
          <TimeForDistanceCalculator />
          <DistanceForTimeCalculator />
          <RequiredEffortCalculator />
          <StartledCalculator />
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Formel: Watt = 2.80 × (500 / tempo)³
          </p>
        </footer>
      </div>
    </main>
  );
}
