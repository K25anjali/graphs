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

const chartData = [
    {
        "year": 1990,
        "electricity": -27,
        "fgases": null,
        "ch4": null,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": null
    },
    {
        "year": 2000,
        "electricity": -10,
        "fgases": null,
        "ch4": null,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": null
    },
    {
        "year": 2005,
        "electricity": 0,
        "fgases": null,
        "ch4": null,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": null
    },
    {
        "year": 2010,
        "electricity": -10,
        "fgases": null,
        "ch4": null,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": null
    },
    {
        "year": 2015,
        "electricity": 26,
        "fgases": null,
        "ch4": null,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": null
    },
    {
        "year": 2018,
        "electricity": 15,
        "fgases": null,
        "ch4": 16,
        "co2ffi": null,
        "ndcToNetZero": 16,
        "highAmbition": 16,
        "co2": 16
    },
    {
        "year": 2019,
        "electricity": 15,
        "fgases": null,
        "ch4": 18,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": 19
    },
    {
        "year": 2020,
        "electricity": 14,
        "fgases": null,
        "ch4": 19,
        "co2ffi": null,
        "ndcToNetZero": null,
        "highAmbition": null,
        "co2": 20
    },
    {
        "year": 2021,
        "electricity": 20,
        "fgases": null,
        "ch4": 16,
        "co2ffi": null,
        "ndcToNetZero": 16,
        "highAmbition": null,
        "co2": 15
    },
    {
        "year": 2022,
        "electricity": 23,
        "fgases": null,
        "ch4": 10,
        "co2ffi": null,
        "ndcToNetZero": 15,
        "highAmbition": null,
        "co2": 12
    },
    {
        "year": 2023,
        "electricity": 20,
        "fgases": null,
        "ch4": null,
        "co2ffi": 20,
        "ndcToNetZero": 5,
        "highAmbition": null,
        "co2": 11
    },
    {
        "year": 2030,
        "electricity": null,
        "fgases": null,
        "ch4": -10,
        "co2ffi": 20,
        "ndcToNetZero": -10,
        "highAmbition": -30,
        "co2": -10
    },
    {
        "year": 2031,
        "electricity": null,
        "fgases": null,
        "ch4": null,
        "co2ffi": 21,
        "ndcToNetZero": -8,
        "highAmbition": -50,
        "co2": -10
    },
    {
        "year": 2034,
        "electricity": null,
        "fgases": null,
        "ch4": -25,
        "co2ffi": 22,
        "ndcToNetZero": -28,
        "highAmbition": -50,
        "co2": -20
    },
    {
        "year": 2035,
        "electricity": null,
        "fgases": 66,
        "ch4": -25,
        "co2ffi": null,
        "ndcToNetZero": -28,
        "highAmbition": -50,
        "co2": -20
    },

    {
        "year": 2040,
        "electricity": null,
        "fgases": null,
        "ch4": -36,
        "co2ffi": null,
        "ndcToNetZero": -25,
        "highAmbition": -50,
        "co2": -40
    },
    {
        "year": 2050,
        "electricity": null,
        "fgases": null,
        "ch4": -40,
        "co2ffi": null,
        "ndcToNetZero": -48,
        "highAmbition": -41,
        "co2": -42
    },
    {
        "year": 2060,
        "electricity": null,
        "fgases": null,
        "ch4": -40,
        "co2ffi": null,
        "ndcToNetZero": -60,
        "highAmbition": -60,
        "co2": -30
    },
    {
        "year": 2070,
        "electricity": null,
        "fgases": null,
        "ch4": -55,
        "co2ffi": null,
        "ndcToNetZero": -70,
        "highAmbition": -100,
        "co2": -100
    },
];
const EmissionsRecharts = () => {

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
                            <CartesianGrid stroke="#eee" strokeDasharray={4} />
                            <XAxis
                                type="number"  // Ensures proper numerical scaling
                                scale="time"   // Helps with year-based spacing
                                dataKey="year"
                                domain={[1990, 2070]}  // Adjust as needed
                                ticks={[1999, 2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070]}
                                axisLine={false}
                            />
                            <YAxis
                                domain={[-100, 60]}
                                ticks={[-100, -80, -60, -40, -20, 0, 20, 40, 60]}
                                tickFormatter={(val) => `${val}%`}
                                stroke="#888"
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip formatter={(value) => `${value}%`} />

                            {/* Line Charts */}
                            <Line
                                dataKey="electricity"
                                stroke="#6a6a6a"
                                strokeDasharray="4 4"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={true}
                            />
                            <Line
                                dataKey="highAmbition"
                                stroke="#8bc34a"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={true}
                            />
                            <Line
                                dataKey="ch4"
                                stroke="#c9d9da"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={true}
                            />
                            <Line
                                dataKey="ndcToNetZero"
                                stroke="#5f969d"
                                strokeWidth={2}
                                dot={false}
                                connectNulls={true}
                            />

                            {/* Bar Chart */}
                            <Bar
                                dataKey="fgases"
                                fill="#f7f19d"
                                barSize={20}
                                connectNulls={true}
                            />

                            {/* Area Charts */}
                            <Area
                                dataKey="co2ffi"
                                fill="#fbd9d7"
                                stroke='#fff'
                                // fillOpacity={0.4}
                                connectNulls={true}
                            />
                            <Area
                                dataKey="co2"
                                // fill="#c9d9da"
                                // stroke='#fff'
                                fillOpacity={0.4}
                                connectNulls={true}
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
        </div>
    );
};

export default EmissionsRecharts;