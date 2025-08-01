import React from 'react';
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    Bar,
    ComposedChart
} from 'recharts';
import { CHART_CONFIG } from '../data/data';

// Transform the data into the format expected by Recharts
const transformData = () => {
    return CHART_CONFIG.LABELS.map((year, index) => {
        const dataPoint = { year };

        // Add each dataset to the data point
        Object.keys(CHART_CONFIG.DATASETS).forEach(key => {
            dataPoint[key] = CHART_CONFIG.DATASETS[key][index];
        });

        return dataPoint;
    });
};

const EmissionsRecharts = () => {
    const chartData = transformData();

    return (
        <div className="bg-gray-100 h-auto max-w-7xl mx-auto my-10 p-0">
            <div className="bg-white rounded-xl mx-auto my-8 p-8 max-w-6xl shadow-sm">
                {/* Chart Title */}
                <div className="text-xl font-semibold mb-2 text-gray-900">
                    Emissions GHG <span className={CHART_CONFIG.STYLES.subtitle}>(Mt CO₂eq/yr)</span>
                </div>

                {/* Chart Container */}
                <div className="w-full h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData}>
                            <CartesianGrid stroke="#eee" />
                            <XAxis dataKey="year" />

                            {/* Y-axis configuration */}
                            <YAxis
                                domain={[-100, 60]}
                                tickFormatter={(val) => `${val}%`}
                                stroke="#888"
                            />

                            <Tooltip formatter={(value) => `${value}%`} />

                            {/* Line Charts */}
                            <Line
                                dataKey="electricity"
                                stroke="#222224"
                                strokeDasharray="4 4"
                                strokeWidth={2}
                            />
                            <Line dataKey="ghg" stroke="#bdbdbd" strokeWidth={2} />
                            <Line dataKey="fgases" stroke="#8bc34a" strokeWidth={2} />
                            <Line dataKey="ch4" stroke="#4caf50" strokeWidth={2} />
                            <Line dataKey="n2o" stroke="#2196f3" strokeWidth={2} />
                            <Line dataKey="ndcToNetZero" stroke="#9c27b0" strokeWidth={2} />
                            <Line dataKey="netZero" stroke="#f44336" dot={{ fill: "#f44336", r: 6 }} strokeWidth={0} />

                            {/* Bar Chart */}
                            <Bar
                                dataKey="delayed"
                                fill="#ffeb3b"
                                barSize={16}
                            />

                            {/* Area Charts */}
                            <Area
                                dataKey="co2ffi"
                                fill="#ff9800"
                                fillOpacity={0.4}
                            />
                            <Area
                                dataKey="highAmbition"
                                fill="#00bcd4"
                                fillOpacity={0.4}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend for showcase of label*/}
                <div className={CHART_CONFIG.STYLES.legendContainer}>
                    {CHART_CONFIG.LEGEND_ITEMS.map((item) => (
                        <span key={item.label} className={CHART_CONFIG.STYLES.legendItem}>
                            <span
                                className={CHART_CONFIG.STYLES.legendIndicator}
                                style={{ backgroundColor: item.color }}
                            />
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default EmissionsRecharts;