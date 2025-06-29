import { useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type Plugin,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { type DataPoint } from "@/store/useAppStore"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface LineChartProps {
  data: DataPoint[]
}

// Custom plugin to draw dashed line for hovered point
const dashedLinePlugin: Plugin<"line"> = {
  id: "dashedLine",
  afterEvent: (chart, args) => {
    if (args.event.type === "mousemove" || args.event.type === "mouseout") {
      chart.draw();
    }
  },
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    const activeElements = chart.getActiveElements();

    if (activeElements && activeElements.length > 0) {
      const { datasetIndex, index } = activeElements[0];
      const meta = chart.getDatasetMeta(datasetIndex);
      const point = meta.data[index];

      ctx.save();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "#84cc16";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    }
  },
}

ChartJS.register(dashedLinePlugin)

export function LineChart({ data }: LineChartProps) {
  const chartRef = useRef<ChartJS<"line", number[], string>>(null)

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Value",
        data: data.map((d) => d.value),
        borderColor: "#84cc16",
        backgroundColor: "rgba(132, 204, 22, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#84cc16",
        pointBorderColor: "#84cc16",
        pointRadius: 4,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#84cc16",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        tension: 0.1,
        fill: false,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: "#2a2a2a",
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#2a2a2a",
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
          },
          callback: (value) => `$${(Number(value) / 1000).toFixed(0)}K`,
        },
        min: 0,
        max: 100000,
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  }

  return (
    <div className="h-full">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  )
}
