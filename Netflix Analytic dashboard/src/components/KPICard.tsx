import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboardFocus } from '../context/DashboardFocusContext';

interface KPICardProps {
  title: string;
  value: number;
  delay?: number;
  format?: 'number' | 'year';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, delay = 0, format = 'number' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const { isAnyChartFocused } = useDashboardFocus();

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formattedValue = format === 'year' 
    ? displayValue.toString()
    : displayValue.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isAnyChartFocused ? 0.15 : 1, 
        y: 0,
        filter: isAnyChartFocused ? 'blur(8px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.35, delay: delay / 1000 }}
      className="rounded-lg p-3 text-center"
      style={{
        background: 'hsl(0, 0%, 8%)',
        border: '1px solid hsl(0, 0%, 15%)',
      }}
    >
      <span 
        className="block text-xs font-medium uppercase tracking-wider mb-1"
        style={{ color: 'hsl(357, 91%, 55%)' }}
      >
        {title}
      </span>
      <motion.span 
        className="block text-2xl md:text-3xl font-bold"
        style={{ color: 'hsl(0, 0%, 95%)' }}
        key={displayValue}
      >
        {formattedValue}
      </motion.span>
    </motion.div>
  );
};

export default KPICard;
