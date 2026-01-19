import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import ChartContainer from './ChartContainer';
import { getTypeData } from '../utils/dataProcessor';

const TypeDonut: React.FC = () => {
  const data = getTypeData();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const moviePercent = ((data[0].value / total) * 100).toFixed(2);
  const tvPercent = ((data[1].value / total) * 100).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div 
          className="px-3 py-2 rounded text-xs"
          style={{
            background: 'hsl(0, 0%, 10%)',
            border: '1px solid hsl(357, 91%, 47%)',
          }}
        >
          <p style={{ color: 'hsl(0, 0%, 95%)' }}>{payload[0].name}</p>
          <p style={{ color: 'hsl(357, 91%, 47%)' }}>{payload[0].value} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer chartId="type" title="TV Show and Movies">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-52 relative"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={2}
              dataKey="value"
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? 'hsl(357, 91%, 47%)' : 'hsl(357, 50%, 65%)'}
                  stroke="hsl(0, 0%, 8%)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center stats */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="block text-lg font-bold" style={{ color: 'hsl(0, 0%, 95%)' }}>
              {total}
            </span>
            <span className="block text-[10px]" style={{ color: 'hsl(0, 0%, 60%)' }}>
              Total
            </span>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 text-[10px]" style={{ color: 'hsl(0, 0%, 70%)' }}>
          <span style={{ color: 'hsl(357, 50%, 65%)' }}>{data[1].value}</span>
          <span className="block">({tvPercent}%)</span>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-center" style={{ color: 'hsl(0, 0%, 70%)' }}>
          <span style={{ color: 'hsl(357, 91%, 47%)' }}>{data[0].value}</span>
          <span> ({moviePercent}%)</span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-0 right-0 text-[10px] space-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(357, 91%, 47%)' }} />
            <span style={{ color: 'hsl(0, 0%, 70%)' }}>Movie</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(357, 50%, 65%)' }} />
            <span style={{ color: 'hsl(0, 0%, 70%)' }}>TV Show</span>
          </div>
        </div>
      </motion.div>
    </ChartContainer>
  );
};

export default TypeDonut;
