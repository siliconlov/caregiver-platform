'use client';

interface VitalsChartProps {
  data: number[];
  color: string;
  label: string;
}

export default function VitalsChart({ data, color, label }: VitalsChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const width = 300;
  const height = 100;
  
  // Convert data points to SVG coordinates
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  // Create area path
  const areaPath = `M 0 ${height} L ${points} L ${width} ${height} Z`;
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '120px', marginTop: '16px' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area under the line */}
        <path d={areaPath} fill={`url(#gradient-${label})`} />
        
        {/* The Sparkline */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
        />
      </svg>
      
      <div className="flex-row justify-between text-xs text-muted" style={{ marginTop: '8px' }}>
        <span>24h ago</span>
        <span style={{ color }}>Now</span>
      </div>
    </div>
  );
}
