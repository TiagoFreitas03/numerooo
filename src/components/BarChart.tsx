import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement)

interface IBarChartProps {
	data: number[]
}

export function BarChart({ data }: IBarChartProps) {
	return (
		<div className='mb-4'>
			<Bar
				options={{ indexAxis: 'y', responsive: true }}
				data={{
					labels: [' 1 ', ' 2 ', ' 3 ', ' 4 ', ' 5 ', ' 6 ', '💀'],
					datasets: [
						{
							data,
							backgroundColor: 'rgba(119, 189, 251, 1)'
						}
					]
				}}
			/>
		</div>
	)
}