import WattTempoConverter from '@/components/WattTempoConverter';
import TimeForDistanceCalculator from '@/components/TimeForDistanceCalculator';
import DistanceForTimeCalculator from '@/components/DistanceForTimeCalculator';
import RequiredEffortCalculator from '@/components/RequiredEffortCalculator';
import StartledCalculator from '@/components/StartledCalculator';

export default function Home() {
  return (
    <main className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight">
            SKI<span className="text-green-400">ERG</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Concept2 Kalkylatorer</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WattTempoConverter />
          <TimeForDistanceCalculator />
          <DistanceForTimeCalculator />
          <RequiredEffortCalculator />
          <div className="col-span-1 md:col-span-2">
            <StartledCalculator />
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500"></footer>
      </div>
    </main>
  );
}
