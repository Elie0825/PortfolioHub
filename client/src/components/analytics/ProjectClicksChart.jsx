import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import '../../styles/components/ProjectClicksChart.css'

const ProjectClicksChart = ({ data }) => {
  if (!data.length) return <p className="editor-empty">No click data yet.</p>

  return (
    <div className="project-clicks-chart">
      <ResponsiveContainer width="100%" height={Math.max(160, data.length * 48)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 16, bottom: 0, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
          />
          <YAxis
            type="category"
            dataKey="title"
            width={120}
            tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '0.8rem',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
          <Bar dataKey="live" name="Live" fill="var(--color-brand)" radius={[0, 3, 3, 0]} />
          <Bar dataKey="github" name="GitHub" fill="var(--color-text-secondary)" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProjectClicksChart
