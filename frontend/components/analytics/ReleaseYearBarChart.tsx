"use client";

import { YearAnalyticsDto } from '@/types/analytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReleaseYearBarChartProps {
  data: YearAnalyticsDto[];
}

export function ReleaseYearBarChart({ data }: ReleaseYearBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No release year data available
      </div>
    );
  }

  // Sort ascending by year and format
  const chartData = [...data]
    .sort((a, b) => parseInt(a.year) - parseInt(b.year))
    .map(item => ({
      year: item.year,
      count: item.count
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey="year" 
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
          fill="#3b82f6" 
          radius={[4, 4, 0, 0]} 
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
