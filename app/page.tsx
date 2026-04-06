import WattTempoConverter from '@/components/WattTempoConverter';
import TimeForDistanceCalculator from '@/components/TimeForDistanceCalculator';
import DistanceForTimeCalculator from '@/components/DistanceForTimeCalculator';
import RequiredEffortCalculator from '@/components/RequiredEffortCalculator';
import StartledCalculator from '@/components/StartledCalculator';

export default function Home() {
  return (
    <main className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">SKIERG</h1>
          <p className="text-green-500 text-xs uppercase tracking-widest mt-0.5">Concept2 Kalkylatorer</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><WattTempoConverter /></div>
          <div className="flex flex-col gap-3">
            <DistanceForTimeCalculator />
            <RequiredEffortCalculator />
            <TimeForDistanceCalculator />
          </div>
          <div className="md:col-span-2"><StartledCalculator /></div>
        </div>
      </div>
    </main>
  );
}
