import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import ChartContainer from './ChartContainer';
import { getYearTrendData } from '../utils/dataProcessor';

const YearTrend: React.FC = () => {
  const data = getYearTrendData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="px-3 py-2 rounded text-xs"
          style={{
            background: 'hsl(0, 0%, 10%)',
            border: '1px solid hsl(357, 91%, 47%)',
          }}
        >
          <p className="font-bold mb-1" style={{ color: 'hsl(0, 0%, 95%)' }}>{label}</p>
          <p style={{ color: 'hsl(357, 91%, 47%)' }}>Movies: {payload[0]?.value || 0}</p>
          <p style={{ color: 'hsl(357, 50%, 65%)' }}>TV Shows: {payload[1]?.value || 0}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer chartId="yearTrend" title="Total Movies and TV shows by release year">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-56"
      >
        {/* Legend */}
        <div className="flex items-center gap-4 mb-2 text-[10px]">
          <span style={{ color: 'hsl(0, 0%, 60%)' }}>Type</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(357, 91%, 47%)' }} />
            <span style={{ color: 'hsl(0, 0%, 70%)' }}>Movie</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(357, 50%, 65%)' }} />
            <span style={{ color: 'hsl(0, 0%, 70%)' }}>TV Show</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMovies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(357, 91%, 47%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(357, 91%, 47%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorTVShows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(357, 50%, 65%)" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="hsl(357, 50%, 65%)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(0, 0%, 15%)"
              vertical={false}
            />
            <XAxis 
              dataKey="year" 
              stroke="hsl(0, 0%, 30%)"
              tick={{ fill: 'hsl(0, 0%, 50%)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(0, 0%, 30%)"
              tick={{ fill: 'hsl(0, 0%, 50%)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="movies"
              stackId="1"
              stroke="hsl(357, 91%, 47%)"
              strokeWidth={2}
              fill="url(#colorMovies)"
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="tvShows"
              stackId="1"
              stroke="hsl(357, 50%, 65%)"
              strokeWidth={2}
              fill="url(#colorTVShows)"
              animationDuration={1200}
              animationBegin={200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartContainer>
  );
};

export default YearTrend;
