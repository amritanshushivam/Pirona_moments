import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PieChartWidgetProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  title?: string;
  centerValue?: string;
  height?: number;
}

export function PieChartWidget({ data, colors, title, centerValue, height = 300 }: PieChartWidgetProps) {
  return (
    <motion.div
      className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {title && <h3 className="font-bold text-gray-900 mb-4">{title}</h3>}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {centerValue && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{centerValue}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
            <span className="text-xs font-semibold text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface ProgressBarWidgetProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showPercentage?: boolean;
}

export function ProgressBarWidget({ label, value, max = 100, color = 'from-amber-500 to-orange-600', showPercentage = true }: ProgressBarWidgetProps) {
  const percentage = (value / max) * 100;
  return (
    <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-800">{label}</p>
        {showPercentage && <p className="text-xs font-bold text-gray-600">{percentage.toFixed(0)}%</p>}
      </div>
      <div className="bg-gray-200 rounded-full h-2">
        <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      <p className="text-xs text-gray-600 mt-2">{value.toLocaleString()} / {max.toLocaleString()}</p>
    </div>
  );
}
