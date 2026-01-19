import React from 'react';
import { motion } from 'framer-motion';
import { DashboardFocusProvider, useDashboardFocus } from '../context/DashboardFocusContext';
import KPICard from '../components/KPICard';
import GenreChart from '../components/GenreChart';
import RatingChart from '../components/RatingChart';
import TypeDonut from '../components/TypeDonut';
import CountryChart from '../components/CountryChart';
import YearTrend from '../components/YearTrend';
import { getKPIData } from '../utils/dataProcessor';

const NetflixLogo: React.FC = () => {
  const { isAnyChartFocused } = useDashboardFocus();
  
  return (
    <motion.div 
      animate={{ 
        opacity: isAnyChartFocused ? 0.15 : 1,
        filter: isAnyChartFocused ? 'blur(8px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-center rounded-lg p-3"
      style={{
        background: 'hsl(0, 0%, 8%)',
        border: '1px solid hsl(0, 0%, 15%)',
      }}
    >
      <span 
        className="text-3xl md:text-4xl font-bold tracking-wider"
        style={{ 
          color: 'hsl(357, 91%, 47%)',
          fontFamily: 'Arial Black, sans-serif',
          letterSpacing: '0.05em',
        }}
      >
        NETFLIX
      </span>
    </motion.div>
  );
};

const DashboardContent: React.FC = () => {
  const kpiData = getKPIData();

  const kpiCards = [
    { title: 'Total Titles', value: kpiData.totalTitles },
    { title: 'Total Rating', value: kpiData.totalRatings },
    { title: 'Total genres', value: kpiData.totalGenres },
  ];

  const kpiCardsRight = [
    { title: 'Start date', value: kpiData.startYear, format: 'year' as const },
    { title: 'Total Titles', value: kpiData.endYear, format: 'year' as const },
    { title: 'Locations', value: kpiData.totalCountries },
  ];

  return (
    <div 
      className="min-h-screen w-full p-4 md:p-6"
      style={{
        background: 'hsl(0, 0%, 4%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Top KPI Row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 md:grid-cols-7 gap-3"
        >
          {kpiCards.map((kpi, index) => (
            <KPICard
              key={kpi.title + index}
              title={kpi.title}
              value={kpi.value}
              delay={index * 80}
            />
          ))}
          
          {/* Netflix Logo - Center */}
          <NetflixLogo />
          
          {kpiCardsRight.map((kpi, index) => (
            <KPICard
              key={kpi.title + index}
              title={kpi.title}
              value={kpi.value}
              delay={(index + 4) * 80}
              format={kpi.format}
            />
          ))}
        </motion.div>

        {/* Middle Row: Genres | Donut | Ratings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <GenreChart />
          <TypeDonut />
          <RatingChart />
        </motion.div>

        {/* Bottom Row: Countries | Year Trend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <CountryChart />
          <YearTrend />
        </motion.div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <DashboardFocusProvider>
      <DashboardContent />
    </DashboardFocusProvider>
  );
};

export default Index;
