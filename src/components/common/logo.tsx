import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  href?: string;
}

export function Logo({ className, iconSize = 28, textSize = "text-2xl", href = "/" }: LogoProps) {
  return (
    <Link href={href} className={`flex items-center gap-2 font-semibold ${textSize} text-primary ${className}`}>
      <GanttChartSquare size={iconSize} className="shrink-0" />
      <span>{APP_NAME}</span>
    </Link>
  );
}
