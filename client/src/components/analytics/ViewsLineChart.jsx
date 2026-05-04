import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import '../../styles/components/ViewsLineChart.css'

const formatDate = (dateStr) => {
  const [, month, day] = dateStr.split('-')
  return `${day}/${month}`
}

const ViewsLineChart = ({ data }) => {
  return (
    <div className="views-line-chart">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
            interval={4}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
          />
          <Tooltip
            formatter={(value) => [value, 'Views']}
            labelFormatter={(label) => formatDate(label)}
            contentStyle={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '0.8rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-brand)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ViewsLineChart
