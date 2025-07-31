import {
    Area,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    Legend,
    ComposedChart
} from "recharts";

const COLORS = {
    coal: "#1f2937",
    gas: "#facc15",
    hydro: "#3b82f6",
    nuclear: "#f87171",
    windSolar: "#a78bfa",
    bio: "#10b981",
    oil: "#6366f1"
};
import { electricityData } from "../data/data";

const ElectricityChart = () => {

    const isBar = (year) => typeof year === "string" && (year.includes("Ambition") || year.includes("Delayed"));

    return (
        <div className="max-w-6xl mx-auto h-auto p-4 bg-white shadow my-10 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Electricity Generation in Australia
            </h2>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={electricityData}
                        margin={{ top: 10, right: 30, left: 50, bottom: 60 }}
                    >
                        <CartesianGrid stroke="#cbd5e0" strokeDasharray="3 3" />
                        <XAxis
                            hide
                            dataKey="year"
                            angle={-90}
                            textAnchor="end"
                            interval={0}
                            height={80}
                        />
                        <YAxis
                            width={60}
                            label={{
                                value: "Electricity Generation (TWh)",
                                angle: -90,
                                position: "insideLeft",
                                offset: 10,
                                style: { textAnchor: "middle", fill: "#4A5568", fontSize: 16 }
                            }}
                        />

                        <Tooltip />

                        {/* Area Chart for past years */}
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

                        {/* Bar Chart for scenario years */}
                        {["coal", "gas", "hydro", "nuclear", "windSolar", "bio", "oil"].map((key) => (
                            <Bar
                                key={`${key}-bar`}
                                dataKey={(d) => (isBar(d.year) ? d[key] : null)}
                                name={key}
                                stackId="2"
                                barSize={20} // ⬅️ slightly reduced bar width
                                fill={COLORS[key]}
                                isAnimationActive={false}
                            />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>

            </div>
            {/* Custom Legend - Outside the chart container */}
            <div className="flex flex-wrap gap-4 p-4 mx-4 border-gray-200 border-t-1">
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
