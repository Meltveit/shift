import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type DashboardHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function DashboardHeader({ title, description, children, className }: DashboardHeaderProps) {
  return (
    <header className={cn("flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8", className)}>
      <div className="grid gap-1">
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center shrink-0">{children}</div>}
    </header>
  );
}
