import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Dashboard Focus Context
 * 
 * How hover focus improves user experience:
 * 1. Draws attention to the chart being analyzed
 * 2. Reduces visual clutter by dimming non-relevant elements
 * 3. Creates a cinematic, premium feel similar to Netflix's UI
 * 4. Allows users to focus on one data visualization at a time
 * 5. Smooth animations make transitions feel natural and polished
 */

interface DashboardFocusContextType {
  focusedChart: string | null;
  setFocusedChart: (chartId: string | null) => void;
  isAnyChartFocused: boolean;
}

const DashboardFocusContext = createContext<DashboardFocusContextType | undefined>(undefined);

export const DashboardFocusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [focusedChart, setFocusedChart] = useState<string | null>(null);

  return (
    <DashboardFocusContext.Provider
      value={{
        focusedChart,
        setFocusedChart,
        isAnyChartFocused: focusedChart !== null,
      }}
    >
      {children}
    </DashboardFocusContext.Provider>
  );
};

export const useDashboardFocus = () => {
  const context = useContext(DashboardFocusContext);
  if (context === undefined) {
    throw new Error('useDashboardFocus must be used within a DashboardFocusProvider');
  }
  return context;
};
