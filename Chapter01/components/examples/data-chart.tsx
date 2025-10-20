import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type DataPoint = {
  month: string
  value: number
}

type Props = {
  data: DataPoint[]
}

function generateChartSvg(data: DataPoint[]): string {
  const width = 600
  const height = 300
  const padding = 40
  const maxValue = Math.max(...data.map((d) => d.value))
  const barWidth = (width - padding * 2) / data.length

  const bars = data
    .map((point, i) => {
      const barHeight = (point.value / maxValue) * (height - padding * 2)
      const x = padding + i * barWidth + barWidth * 0.1
      const y = height - padding - barHeight

      return `
        <rect 
          x="${x}" 
          y="${y}" 
          width="${barWidth * 0.8}" 
          height="${barHeight}" 
          fill="hsl(var(--primary))"
          rx="4"
        />
        <text 
          x="${x + barWidth * 0.4}" 
          y="${height - padding + 20}" 
          textAnchor="middle" 
          fontSize="12"
          fill="currentColor"
        >
          ${point.month}
        </text>
      `
    })
    .join("")

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${bars}
    </svg>
  `
}

export default function DataChart({ data }: Props) {
  const svg = generateChartSvg(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Generated on the server with zero client JavaScript</CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </CardContent>
    </Card>
  )
}
