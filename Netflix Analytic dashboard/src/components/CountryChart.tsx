import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import ChartContainer from './ChartContainer';
import { getCountryData } from '../utils/dataProcessor';

const CountryChart: React.FC = () => {
  const data = getCountryData();
  
  const treemapData = data.map((item, index) => ({
    name: item.country,
    size: item.count,
    fill: `hsl(357, ${95 - index * 8}%, ${50 + index * 4}%)`,
  }));

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
          <p style={{ color: 'hsl(0, 0%, 95%)' }}>{payload[0].payload.name}</p>
          <p style={{ color: 'hsl(357, 91%, 47%)' }}>{payload[0].payload.size} titles</p>
        </div>
      );
    }
    return null;
  };

  interface TreemapContentProps {
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    fill: string;
    size: number;
  }

  const CustomContent: React.FC<TreemapContentProps> = ({ x, y, width, height, name, fill, size }) => {
    const showName = width > 50 && height > 30;
    const showValue = width > 40 && height > 45;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke="hsl(0, 0%, 8%)"
          strokeWidth={2}
        />
        {showName && (
          <text
            x={x + 6}
            y={y + 14}
            fill="hsl(0, 0%, 95%)"
            fontSize={width > 80 ? 11 : 9}
            fontFamily="Inter, sans-serif"
          >
            {name.length > 12 ? name.slice(0, 10) + '...' : name}
          </text>
        )}
        {showValue && (
          <text
            x={x + 6}
            y={y + height - 8}
            fill="hsl(0, 0%, 80%)"
            fontSize={10}
            fontFamily="Inter, sans-serif"
          >
            {size >= 1000 ? (size / 1000).toFixed(2) + 'K' : size}
          </text>
        )}
      </g>
    );
  };

  return (
    <ChartContainer chartId="country" title="Top 10 Countries by Movies and TV shows">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-56"
      >
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="hsl(0, 0%, 8%)"
            content={<CustomContent x={0} y={0} width={0} height={0} name="" fill="" size={0} />}
            animationDuration={800}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </motion.div>
    </ChartContainer>
  );
};

export default CountryChart;
