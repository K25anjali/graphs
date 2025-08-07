import {
    Area,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    ComposedChart,
    LabelList
} from "recharts";

import { historicalData, delayedTransition, ambitionTransition } from "../data/data";
const COLORS = {
    coal: "#3a3a3a",
    gas: "#cc8c3f",
    hydro: "#6c6563",
    nuclear: "#3d3acc",
    windSolar: "#8b9249",
    bio: "#d9b355",
    oil: "#8ab8c9"
};


// Combine all data
const allData = [
    ...historicalData,
    ...delayedTransition,
    ...ambitionTransition
];

const ElectricityChart = () => {
    // Process data to group scenarios by year
    const processedData = allData.reduce((acc, item) => {
        if (!item.scenario) {
            // Historical data
            acc.push(item);
        } else {
            // Scenario data - group by year
            const existing = acc.find(d => d.year === item.year);
            if (existing) {
                existing[item.scenario] = { ...item };
            } else {
                acc.push({
                    year: item.year,
                    [item.scenario]: { ...item },
                    isScenarioGroup: true
                });
            }
        }
        return acc;
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white shadow my-10 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Electricity Generation in Australia
            </h2>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={processedData}
                        margin={{ top: 50, right: 30, left: 50, bottom: 0 }}
                        barCategoryGap={15} // Space between scenario groups
                        barGap={5} // No gap between bars in same group
                    >
                        <CartesianGrid stroke="#cbd5e0" vertical={true} horizontal={true} />

                        <XAxis
                            dataKey="year"
                            angle={0}
                            height={60}
                            hide={true}
                        />
                        <YAxis
                            ticks={[200, 300, 400, 500]}  // Removed duplicate 200
                            domain={[100, 500]}  // More flexible domain calculation
                            width={80}
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

                        <Tooltip />

                        {/* Area charts for historical data */}
                        {["coal", "gas", "hydro", "nuclear", "windSolar", "bio", "oil"].map((key) => (
                            <Area
                                key={`area-${key}`}
                                type="monotone"
                                dataKey={(d) => (!d.isScenarioGroup ? d[key] : null)}
                                name={key}
                                stackId="area"
                                stroke="none"
                                fill={COLORS[key]}
                                fillOpacity={0.8}
                                isAnimationActive={false}
                            />
                        ))}

                        {/* Bars for Delayed scenario */}
                        {["coal", "gas", "hydro", "nuclear", "windSolar", "bio", "oil"].map((key) => (
                            <Bar
                                key={`delayed-${key}`}
                                dataKey={(d) => (d.Delayed ? d.Delayed[key] : null)}
                                name={`Delayed ${key}`}
                                stackId="delayed"
                                barSize={30}
                                fill={COLORS[key]}
                                isAnimationActive={false}

                            />
                        ))}

                        {/* Bars for Ambition scenario */}
                        {["coal", "gas", "hydro", "nuclear", "windSolar", "bio", "oil"].map((key) => (
                            <Bar
                                key={`ambition-${key}`}
                                dataKey={(d) => (d.Ambition ? d.Ambition[key] : null)}
                                name={`Ambition ${key}`}
                                stackId="ambition"
                                barSize={30}
                                fill={COLORS[key]}
                                isAnimationActive={false}
                            />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

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