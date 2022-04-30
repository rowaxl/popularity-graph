import { useMemo } from 'react';
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
import { PopulationMap } from "../interfaces";

interface PopulationChartProps {
  populations: PopulationMap[]
  isLoading: boolean
}

const PopulationChart = ({ populations, isLoading }: PopulationChartProps) => {
  if (isLoading) return <>Loading...</>;

  return (
    // TODO: Responsive
    // TODO: show "YEAR"
    <ResponsiveContainer
      width="100%"
      minWidth={320}
      height="100%"
      minHeight={300}
      debounce={320}
    >
      <LineChart
        margin={{ top: 20, right: 15, left: 15, bottom: 0 }}
      >
        <XAxis
          dataKey="year"
          type="category"
          allowDuplicatedCategory={false}
          unit="年"
        />
        <YAxis dataKey="value" unit="人" />
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
  )
}

export default PopulationChart;
