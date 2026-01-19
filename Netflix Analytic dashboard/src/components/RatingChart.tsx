import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import ChartContainer from './ChartContainer';
import { getRatingData } from '../utils/dataProcessor';

const RatingChart: React.FC = () => {
  const data = getRatingData().slice(0, 8);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="px-3 py-2 rounded text-xs"
          style={{
            background: 'hsl(0, 0%, 10%)',
            border: '1px solid hsl(357, 91%, 47%)',
          }}
        >
          <p style={{ color: 'hsl(0, 0%, 95%)' }}>Rating: {payload[0].payload.rating}</p>
          <p style={{ color: 'hsl(357, 91%, 47%)' }}>{payload[0].value} titles</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer chartId="rating" title="Ratings by total titles">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-52"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 45, bottom: 0 }}
          >
            <XAxis 
              type="number" 
              stroke="hsl(0, 0%, 30%)"
              tick={{ fill: 'hsl(0, 0%, 50%)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="rating"
              stroke="hsl(0, 0%, 30%)"
              tick={{ fill: 'hsl(0, 0%, 70%)', fontSize: 10 }}
              width={40}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(357, 91%, 47%, 0.1)' }} />
            <Bar dataKey="count" radius={[0, 2, 2, 0]}>
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={`hsl(357, ${90 - index * 8}%, ${50 + index * 3}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartContainer>
  );
};

export default RatingChart;
