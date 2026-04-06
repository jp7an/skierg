import { ReactNode } from 'react';

interface CardProps { title: string; children: ReactNode; }

export default function Card({ title, children }: CardProps) {
  return (
    <div className="border border-zinc-800 rounded p-3 bg-zinc-950">
      <h2 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">{title}</h2>
      {children}
    </div>
  );
}
