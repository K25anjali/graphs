import React from 'react';
import {
    ComposedChart, Area, Line, Bar, CartesianGrid,
    XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, ReferenceLine
} from 'recharts';
import { FOSSIL_CHART_CONFIG } from '../data/data';


const transformData = (fuelType, config) => {
    const fuelData = config.DATASETS[fuelType];
    return config.LABELS.map((year, index) => ({
        year,
        historical: fuelData.historical[index],
        netZero: fuelData.netZero[index],
        businessAsUsual: fuelData.businessAsUsual[index],
        highAmbition: fuelData.highAmbition[index],
        delayedTransition: fuelData.delayedTransition[index]
    }));
};

const FuelChart = ({ data, title, colors, showYAxis }) => {
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mx-1 text-center bg-gray-200 border border-gray-300">{title}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
                    barGap={0}
                    barCategoryGap={0}
                >
                    <CartesianGrid stroke="#cbd5e0" />
                    {/* Dashed reference lines with higher z-index */}

                    <XAxis
                        dataKey="year"
                        ticks={[2000, 2010, 2020, 2030, 2035]}
                        padding={{ left: 8 }}
                        interval={0}
                        tickFormatter={(value) => {
                            // Show last 2 digits for years >= 2030
                            if (value >= 2030) return value.toString().slice(-2);
                            return value; // Show full year for other years
                        }}
                    />
                    <YAxis
                        hide={!showYAxis}
                        ticks={[0, 5, 10, 15]}
                        domain={[0, 15]}
                        tick={{ fontSize: 10, }}
                        label={{
                            value: "Fossils Energy production and use EJ/yr",
                            angle: -90,
                            position: "insideLeft",
                            offset: 5,
                            style: { textAnchor: "middle", fontSize: 15 },
                        }}
                    />
                    <Tooltip
                        formatter={(value) =>
                            value != null && !isNaN(value) ? [value.toFixed(1), "Gt CO₂"] : ["N/A", ""]
                        }
                        labelFormatter={(label) => `Year: ${label}`}
                    />

                    {/* Area charts */}
                    <Area
                        type="monotone"
                        dataKey="netZero"
                        stackId="area"
                        fill={colors.NET_ZERO}
                        stroke="none"
                        name="Net Zero Scenario"
                    />
                    <Area
                        type="monotone"
                        dataKey="businessAsUsual"
                        stackId="area"
                        fill={colors.BUSINESS_AS_USUAL}
                        fillOpacity={1}
                        stroke="none"
                        name="Business as Usual"
                    />
                    {/* Historical line */}
                    <Line
                        type="monotone"
                        dataKey="historical"
                        stroke="#333"
                        strokeWidth={2}
                        strokeDasharray="6 6"
                        dot={false}
                        name="Historical"
                    />

                    {/* Bar charts */}
                    <Bar
                        dataKey="highAmbition"
                        fill={colors.NET_ZERO}
                        barSize={20}
                        name="High Ambition Scenario"
                        label={title === "Coal" ? {
                            position: 'top',
                            content: ({ value, x, y, width, index }) => {
                                if (!value) return null;
                                return (
                                    <text
                                        x={x + width / 2}
                                        y={y - 15}  // Moved higher (from -5 to -15)
                                        fill="#000"
                                        fontSize={16}
                                        textAnchor="top"
                                        transform={`rotate(-90, ${x + width / 2}, ${y - 15})`}
                                        dominantBaseline="middle"  // Better vertical alignment
                                    >
                                        High Ambition
                                    </text>
                                );
                            }
                        } : null}  // Only show for Coal
                    />

                    <Bar
                        dataKey="delayedTransition"
                        fill={colors.BUSINESS_AS_USUAL}
                        barSize={20}
                        name="Delayed Transition"
                        isAnimationActive={false}
                        label={title === "Coal" ? {
                            position: 'top',
                            content: ({ value, x, y, width, payload }) => {
                                if (!value) return null;
                                return (
                                    <text
                                        x={x + width / 2}
                                        y={y - 15}  // Moved higher
                                        fill="#000"
                                        fontSize={16}
                                        textAnchor="top"
                                        transform={`rotate(-90, ${x + width / 2}, ${y - 15})`}
                                        dominantBaseline="middle"
                                    >
                                        Delayed Transition
                                    </text>
                                );
                            }
                        } : null}  // Only show for Coal
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

const FossilsFuelChart = () => {
    const coalData = transformData('coal', FOSSIL_CHART_CONFIG);
    const gasData = transformData('gas', FOSSIL_CHART_CONFIG);
    const oilData = transformData('oil', FOSSIL_CHART_CONFIG);

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-md grid grid-cols-3 mt-10">
            <FuelChart data={coalData} title="Coal" colors={FOSSIL_CHART_CONFIG.COLORS.COAL} showYAxis />
            <FuelChart data={gasData} title="Gas" colors={FOSSIL_CHART_CONFIG.COLORS.GAS} />
            <FuelChart data={oilData} title="Oil" colors={FOSSIL_CHART_CONFIG.COLORS.OIL} />
        </div>
    );
};

export default FossilsFuelChart;