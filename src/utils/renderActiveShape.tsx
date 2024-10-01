import React from "react";
import { Sector } from "recharts";

// Renders the active shape for the pie chart
// This function is called by Recharts to customize the appearance of the active sector and adds leader lines
export const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

    // Calculate positions and angles for the custom shape and leader lines for labels
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 18;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            {/* Inner sector */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            {/* Outer sector */}
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            {/* Leader line connecting sector to label */}
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            {/* Label text */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={-4} textAnchor={textAnchor} fill="currentColor"
                  fontSize={10}>
                {payload.name}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={12} textAnchor={textAnchor} fill="currentColor"
                  fontSize={10}>
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    );
};