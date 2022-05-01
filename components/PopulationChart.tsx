import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { PopulationMap } from '../interfaces';
import styles from '../styles/Charts.module.css';

interface PopulationChartProps {
  populations: PopulationMap[]
}

const PopulationChart = ({ populations }: PopulationChartProps) => {
  if (!populations) return <>Loading...</>;

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer
        width="99%"
        height={400}
        debounce={1}
      >
        <LineChart
          margin={{ top: 20, right: 15, left: 15, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey="year"
            type="category"
            allowDuplicatedCategory={false}
            unit="年"
          />
          <YAxis dataKey="value" width={80} />
          <Tooltip
            formatter={(value: number) => `${value}名`}
            labelFormatter={(value: number) => `${value}年`}
          />
          <Legend />

          {populations.map((populationData, index) => (
            <Line
              key={`line_${index}`}
              data={populationData.data}
              dataKey="value"
              stroke={populationData.color}
              name={populationData.prefName}
            />
          ))}

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PopulationChart;
