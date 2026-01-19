import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardFocus } from '../context/DashboardFocusContext';

interface ChartContainerProps {
  chartId: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  chartId, 
  title, 
  children,
  className = ''
}) => {
  const { focusedChart, setFocusedChart, isAnyChartFocused } = useDashboardFocus();
  const isFocused = focusedChart === chartId;
  const isBlurred = isAnyChartFocused && !isFocused;

  return (
    <motion.div
      onMouseEnter={() => setFocusedChart(chartId)}
      onMouseLeave={() => setFocusedChart(null)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isBlurred ? 0.15 : 1,
        scale: isFocused ? 1.15 : 1,
        filter: isBlurred ? 'blur(8px)' : 'blur(0px)',
        zIndex: isFocused ? 100 : 1,
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`relative rounded-lg overflow-visible ${className}`}
      style={{
        background: 'hsl(0, 0%, 8%)',
        boxShadow: isFocused 
          ? '0 0 80px hsla(357, 91%, 47%, 0.5), 0 20px 60px hsla(0, 0%, 0%, 0.8)'
          : '0 2px 8px hsla(0, 0%, 0%, 0.3)',
        border: isFocused 
          ? '2px solid hsl(357, 91%, 47%)'
          : '1px solid hsl(0, 0%, 15%)',
        padding: '16px',
        transformOrigin: 'center center',
        pointerEvents: isBlurred ? 'none' : 'auto',
      }}
    >
      <h3 
        className="font-sans text-sm font-medium mb-3 text-center tracking-wide"
        style={{ color: 'hsl(357, 91%, 55%)' }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

export default ChartContainer;
