// src/components/EmissionsChart.jsx
import React, { useMemo } from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceDot,
    Legend
} from "recharts";

const rawData = [
    { year: 1990, electricity: -35, },
    { year: 1995, electricity: -28, },
    { year: 2000, electricity: -10, },
    { year: 2005, electricity: 0, },
    { year: 2010, electricity: 18, },
    { year: 2012, electricity: 24, },
    { year: 2015, electricity: 18, },
    { year: 2018, electricity: 11, },
    { year: 2019, electricity: 5, ghg: 6, ndcToNetZero: 5, highAmbition: 5, },
    { year: 2020, electricity: 7, ghg: 8, ndcToNetZero: 10, highAmbition: 10, },
    { year: 2021, electricity: 10, ndcToNetZero: 7, highAmbition: 8, },
    { year: 2022, electricity: 7, ndcToNetZero: -6, highAmbition: 5, },
    { year: 2023, electricity: 22, ndcUnconditional: 22, ndcToNetZero: -10, highAmbition: -2, },
    { year: 2025, ghg: 0, ndcUnconditional: 22, ndcToNetZero: -20, highAmbition: -10, },

    // small projection wedge leading into 2030
    { year: 2028, ghg: -20, ndcUnconditional: 22, ndcToNetZero: -30 },

    // key 2030 point: NDC (unconditional) label appears here (we show a pink wedge)
    { year: 2030, ghg: -16, ndcToNetZero: -32, highAmbition: -5, ndcUnconditional: 22 },

    // small fade of the pink wedge
    { year: 2032, ghg: -24, ndcToNetZero: -36, highAmbition: -12, ndcUnconditional: 22 },
    { year: 2033, ghg: -22, ndcToNetZero: -28, highAmbition: -6, ndcUnconditional: 22 },
    { year: 2034, ghg: -18, ndcToNetZero: -25, highAmbition: -12, ndcUnconditional: 22 },

    // tall F-Gases single bar drawn at 2035
    { year: 2035, ghg: -21, ndcToNetZero: -21, highAmbition: -26, fgases: 75 },

    { year: 2040, ghg: -40, ndcToNetZero: -40, highAmbition: -44 },
    { year: 2045, ghg: -53, ndcToNetZero: -50, highAmbition: -60 },
    { year: 2050, ghg: -66, ndcToNetZero: -62, highAmbition: -80 },
    { year: 2055, ghg: -83, ndcToNetZero: -70, highAmbition: -68 },
    { year: 2060, ghg: -90, ndcToNetZero: -75, highAmbition: -70 }
];

export default function EmissionsChart() {
    // we'll draw light areas for both ndcToNetZero and highAmbition (they overlap visually).
    const data = useMemo(() => {
        return rawData.map((d) => {
            // ensure every key exists (Recharts prefers numbers or null)
            const ndc = d.ndcToNetZero ?? null;
            const high = d.highAmbition ?? null;
            const gap = ndc != null && high != null ? Math.abs(ndc - high) : 0;
            return {
                ...d,
                ndcToNetZero: ndc,
                highAmbition: high,
                gap,
                ndcUnconditional: d.ndcUnconditional ?? null,
                fgases: d.fgases ?? null
            };
        });
    }, []);

    const tooltipFormatter = (value, name) => {
        if (value == null) return ["—", name];
        return [`${value}%`, name];
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-[520px] bg-white p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-semibold">Emissions GHG <span className="text-gray-400 text-base">(Mt CO₂eq/yr)</span></h3>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <ComposedChart data={data} margin={{ top: 10, right: 40, left: 20, bottom: 20 }}>
                    <CartesianGrid stroke="#e9e9e9" strokeDasharray="6 6" />
                    <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12, fill: "#6b6b6b" }}
                        domain={["dataMin", "dataMax"]}
                        type="number"
                        tickCount={10}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#6b6b6b" }}
                        domain={[-100, 80]}
                        ticks={[-100, -80, -60, -40, -20, 0, 20, 40, 60]}
                        tickFormatter={(v) => `${v}%`}
                    />

                    <Tooltip formatter={tooltipFormatter} />

                    {/* PINK wedge (NDC unconditional projection) */}
                    <Area
                        type="monotone"
                        dataKey="ndcUnconditional"
                        stroke="none"
                        fill="#f7c8ce"
                        fillOpacity={0.7}
                        isAnimationActive={false}
                    />

                    {/* Light envelope/uncertainty shading (big pale blue area) 
              this is an approximation to the large pale band in the screenshot */}
                    <Area
                        type="monotone"
                        dataKey="highAmbition"
                        stroke="none"
                        fill="#dfeff4"
                        fillOpacity={0.45}
                        isAnimationActive={false}
                        connectNulls
                    />
                    <Area
                        type="monotone"
                        dataKey="ndcToNetZero"
                        stroke="none"
                        fill="#eaf6f8"
                        fillOpacity={0.35}
                        isAnimationActive={false}
                        connectNulls
                    />

                    {/* Yellow single bar for F-Gases (drawn narrow so it looks like a vertical column) */}
                    <Bar
                        dataKey="fgases"
                        barSize={14}
                        fill="#f3d13a"
                        isAnimationActive={false}
                    />

                    {/* Electricity CO2 - dashed black line */}
                    <Line
                        type="monotone"
                        dataKey="electricity"
                        stroke="#6b6b6b"
                        strokeWidth={2}
                        strokeDasharray="6 6"
                        dot={false}
                        activeDot={{ r: 3 }}
                        name="Electricity CO₂"
                        isAnimationActive={false}
                        connectNulls
                    />

                    {/* GHG incl. LULUCF - solid black */}
                    <Line
                        type="monotone"
                        dataKey="ghg"
                        stroke="#d8e4e6"
                        strokeWidth={2.2}
                        dot={false}
                        name="GHG (incl. LULUCF)"
                        isAnimationActive={false}
                        connectNulls
                    />

                    {/* NDC to Net-Zero Trend - light teal */}
                    <Line
                        type="monotone"
                        dataKey="ndcToNetZero"
                        stroke="#d8e4e6"
                        strokeWidth={2.2}
                        dot={false}
                        name="NDC to Net-Zero Trend"
                        isAnimationActive={false}
                        connectNulls
                    />
                    {/* High Ambition - teal/darker */}
                    <Line
                        type="monotone"
                        dataKey="highAmbition"
                        stroke="#0e90a8"
                        strokeWidth={2.8}
                        dot={false}
                        name="High Ambition"
                        isAnimationActive={false}
                        connectNulls
                    />
                    {/* Annotations: reference year 2005 */}
                    <ReferenceDot x={2005} y={0} r={6} fill="#7d7d7d" stroke="#fff" label={{ position: "bottom", value: "Reference year 2005" }} />

                    {/* NDC point around 2035 */}
                    <ReferenceDot x={2035} y={-21} r={7} fill="#64c6d1" stroke="#fff" label={{ position: "bottom", value: "NDC -21%" }} />
                    <Legend verticalAlign="bottom" align="left" wrapperStyle={{ bottom: -6 }} />

                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
