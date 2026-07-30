"use client";

import { RatingAnalyticsDto } from '@/types/analytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingDistributionChartProps {
  data: RatingAnalyticsDto[];
}

export function RatingDistributionChart({ data }: RatingDistributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No rating data available
      </div>
    );
  }

  // Ensure 1-5 ratings are all present, filling missing with 0
  const allRatings = [1, 2, 3, 4, 5];
  const chartData = allRatings.map(rating => {
    const found = data.find(item => item.rating === rating);
    return {
      rating: `${rating} Star${rating > 1 ? 's' : ''}`,
      count: found ? found.count : 0
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey="rating" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#6b7280', fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#6b7280', fontSize: 12 }} 
          allowDecimals={false}
        />
        <Tooltip 
          cursor={{ fill: '#f3f4f6' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value) => [`${value} albums`, 'Count']}
          labelStyle={{ color: '#111827', fontWeight: 600, marginBottom: '4px' }}
        />
        <Bar 
          dataKey="count" 
          fill="#f59e0b" // Yellow for stars
          radius={[4, 4, 0, 0]} 
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
