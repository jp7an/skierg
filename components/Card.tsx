import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-green-500/20 p-4">
      <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-3">{title}</h2>
      {children}
    </div>
  );
}
