import {
    Area,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    ComposedChart
} from "recharts";
import { electricityData } from "../data/data";

// Color mapping for different electricity sources
const COLORS = {
    coal: "#1f2937",
    gas: "#facc15",
    hydro: "#3b82f6",
    nuclear: "#f87171",
    windSolar: "#a78bfa",
    bio: "#10b981",
    oil: "#6366f1"
};

const ElectricityChart = () => {
    // Utility to check if the entry represents a scenario-based projection
    const isBar = (year) => typeof year === "string" && (year.includes("Ambition") || year.includes("Delayed"));

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white shadow my-10 rounded-md">
            {/* Chart Title */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Electricity Generation in Australia
            </h2>

            {/* Chart Container */}
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={electricityData}
                        margin={{ top: 10, right: 30, left: 50, bottom: 60 }}
                    >
                        {/* Grid lines */}
                        <CartesianGrid stroke="#cbd5e0" />

                        {/* X Axis: hidden but still used for alignment */}
                        <XAxis
                            dataKey="year"
                            hide
                            angle={-90}
                            interval={0}
                            height={80}
                        />

                        {/* Y Axis: shows electricity generation values */}
                        <YAxis
                            width={60}
                            label={{
                                value: "Electricity Generation (TWh)",
                                angle: -90,
                                position: "insideLeft",
                                offset: 10,
                                style: {
                                    textAnchor: "middle",
                                    fill: "#4A5568",
                                    fontSize: 16
                                }
                            }}
                        />

                        {/* Tooltip on hover */}
                        <Tooltip />

                        {/* Area charts for historical data */}
                        {["coal", "gas", "hydro", "nuclear", "windSolar", "bio", "oil"].map((key) => (
                            <Area
                                key={key}
                                type="monotone"
                                dataKey={(d) => (!isBar(d.year) ? d[key] : null)}
                                name={key}
                                stackId="1"
                                stroke={COLORS[key]}
                                fill={COLORS[key]}
                                isAnimationActive={false}
                            />
                        ))}

                        {/* Bar charts for scenario-based future projections */}
                        {["coal", "gas", "hydro", "nuclear", "windSolar", "bio", "oil"].map((key) => (
                            <Bar
                                key={`${key}-bar`}
                                dataKey={(d) => (isBar(d.year) ? d[key] : null)}
                                name={key}
                                stackId="1"
                                barSize={20}
                                fill={COLORS[key]}
                                isAnimationActive={false}
                            />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap gap-4 p-4 mx-4 border-t border-gray-200">
                {Object.entries(COLORS).map(([key, color]) => (
                    <div key={key} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                        <span className="text-sm capitalize">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElectricityChart;
