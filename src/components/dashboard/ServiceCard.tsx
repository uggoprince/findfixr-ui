'use client';

import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export function ServiceCard({ icon: Icon, title, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="service-card p-6 text-center cursor-pointer group"
    >
      <div className="service-icon w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-700 shadow-primary">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
    </div>
  );
}
