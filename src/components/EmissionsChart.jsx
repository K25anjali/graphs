import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Area, ComposedChart, Dot, Bar } from 'recharts'
import { chartData } from '../data/data';

// Calculate baseline values from 2005 for percentage transformation
const baseline2005 = chartData.find(d => d.year === 2005);

const baselineElectricity = baseline2005?.electricity || 0;
const baselineFgases = baseline2005?.fgases || 0;
const baselineCh4 = baseline2005?.ch4 || 0;
const baselineCo2ffi = baseline2005?.co2ffi || 0;

// Calculate total GHG for 2005 from its components for baseline
const baselineCalculatedTotalGhg = (baselineElectricity + baselineFgases + baselineCh4 + baselineCo2ffi);

const transformedData = chartData.map(d => {
    // Only calculate percentages for years 2012 and later for the solid lines
    const shouldCalculateSolidLines = d.year >= 2011;

    const electricityPct = baselineElectricity !== 0 ? ((d.electricity - baselineElectricity) / baselineElectricity) * 100 : null;
    const fgasesPct = baselineFgases !== 0 ? ((d.fgases - baselineFgases) / baselineFgases) * 100 : null;
    const ch4Pct = baselineCh4 !== 0 ? ((d.ch4 - baselineCh4) / baselineCh4) * 100 : null;
    const co2ffiPct = baselineCo2ffi !== 0 ? ((d.co2ffi - baselineCo2ffi) / baselineCo2ffi) * 100 : null;

    const currentCalculatedTotalGhg = (d.electricity || 0) + (d.fgases || 0) + (d.ch4 || 0) + (d.co2ffi || 0);
    const totalGhgPct = shouldCalculateSolidLines && baselineCalculatedTotalGhg !== 0
        ? ((currentCalculatedTotalGhg - baselineCalculatedTotalGhg) / baselineCalculatedTotalGhg) * 100
        : null;

    const highAmbitionPct = d.highAmbition !== null && baselineCalculatedTotalGhg !== 0
        ? ((d.highAmbition - baselineCalculatedTotalGhg) / baselineCalculatedTotalGhg) * 100
        : null;

    const ndcToNetZeroPct = d.ndcToNetZero !== null && baselineCalculatedTotalGhg !== 0
        ? ((d.ndcToNetZero - baselineCalculatedTotalGhg) / baselineCalculatedTotalGhg) * 100
        : null;

    // Estimate greenTrend values as percentages based on visual in image
    let greenTrendPct = null;
    if (d.year >= 2018 && d.year <= 2021) {
        greenTrendPct = 10 - (d.year - 2018) * (5 / 3);
    } else if (d.year > 2021 && d.year <= 2060) {
        greenTrendPct = 5 - (d.year - 2021) * (75 / 39);
    }

    // Yellow bar at 2024, goes up to 60%
    const yellowBarValue = d.year === 2024 ? 60 : null;

    // Uncertainty bands relative to highAmbitionPct
    let uncertaintyUpper = null;
    let uncertaintyLower = null;
    if (highAmbitionPct !== null) {
        uncertaintyUpper = highAmbitionPct + 15;
        uncertaintyLower = highAmbitionPct - 15;
    }

    return {
        year: d.year,
        totalGhg: totalGhgPct, // This will be null before 2012
        electricity: electricityPct,
        fgases: fgasesPct,
        ch4: ch4Pct,
        co2ffi: shouldCalculateSolidLines ? co2ffiPct : null, // Only show from 2012
        highAmbition: highAmbitionPct,
        ndcToNetZero: ndcToNetZeroPct,
        greenTrend: greenTrendPct,
        yellowBar: yellowBarValue,
        uncertaintyUpper: uncertaintyUpper,
        uncertaintyLower: uncertaintyLower,
    };
});

const CustomReferenceDot = (props) => {
    // Don't destructure key from props - React handles it internally
    const { cx, cy, payload } = props;
    if (payload && payload.year === 2005) {
        return <Dot cx={cx} cy={cy} r={4} fill="#666" stroke="#666" strokeWidth={2} />;
    }
    return null;
};

export default function EmissionsChart() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-lg font-normal text-gray-600">
                Emissions GHG (Mt CO2eq/yr)
            </h2>

            <div className="h-[600px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={transformedData}
                        margin={{ top: 20, right: 30, left: 60, bottom: 120 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                            dataKey="year"
                            type="number"
                            scale="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#666' }}
                            domain={[1990, 2060]}
                            ticks={[1990, 2000, 2010, 2020, 2030, 2040, 2050, 2060]}
                            tickFormatter={(year) => year.toString()}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#666' }}
                            tickFormatter={(value) => `${value}%`}
                            domain={[-100, 60]}
                            ticks={[-100, -80, -60, -40, -20, 0, 20, 40, 60]}
                        />

                        {/* Yellow bar at 2024 where dashed line ends */}
                        <Bar
                            dataKey="yellowBar"
                            fill="#ffd700"
                            opacity={0.8}
                            width={16}
                        />

                        {/* Uncertainty areas starting from 2024 */}
                        <Area
                            type="monotone"
                            dataKey="uncertaintyUpper"
                            stroke="none"
                            fill="#ffb3ba"
                            fillOpacity={0.4}
                            connectNulls={false}
                        />

                        <Area
                            type="monotone"
                            dataKey="uncertaintyLower"
                            stroke="none"
                            fill="#bae1ff"
                            fillOpacity={0.4}
                            connectNulls={false}
                        />

                        {/* Main GHG total line (solid black) - starts from 2012 */}
                        <Line
                            type="monotone"
                            dataKey="totalGhg"
                            stroke="#333"
                            strokeWidth={3}
                            dot={<CustomReferenceDot />}  // Just pass the component directly
                            connectNulls={false}
                            name="GHG (incl. LULUCF)"
                        />

                        {/* CO2-FFI line (gray) - starts from 2012 */}
                        <Line
                            type="monotone"
                            dataKey="co2ffi"
                            stroke="#a3a3a3"
                            strokeWidth={2}
                            dot={false}
                            connectNulls={false}
                            name="CO₂-FFI"
                        />

                        {/* Electricity CO2 (dashed black) - ends at 2024 */}
                        <Line
                            type="monotone"
                            dataKey="electricity"
                            stroke="#333"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            connectNulls={false}
                            name="Electricity CO₂"
                        />

                        {/* Green trend line starting from 2018 going down to 2060 */}
                        <Line
                            type="monotone"
                            dataKey="greenTrend"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                            connectNulls={false}
                            name="Today to NDC Trend"
                        />

                        {/* High Ambition scenario (main blue line) */}
                        <Line
                            type="monotone"
                            dataKey="highAmbition"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={false}
                            connectNulls={false}
                            name="High Ambition"
                        />

                        {/* Reference line for 2005 */}
                        <ReferenceLine x={2005} stroke="#666" strokeDasharray="3 3" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Annotations */}
            <div className="relative">
                <div className="absolute" style={{ top: '-400px', left: '200px' }}>
                    <div className="text-xs text-gray-600">
                        <div>Reference year 2005</div>
                    </div>
                </div>

                <div className="absolute" style={{ top: '-250px', right: '300px' }}>
                    <div className="text-xs text-gray-600">
                        <div>NDC (unconditional)</div>
                        <div>0 %</div>
                    </div>
                </div>

                <div className="absolute" style={{ top: '-180px', right: '200px' }}>
                    <div className="text-xs text-gray-600">
                        <div>Ambition gap</div>
                    </div>
                </div>

                <div className="absolute" style={{ top: '-150px', right: '350px' }}>
                    <div className="text-xs text-gray-600">
                        <div>NDC</div>
                        <div>-21 %</div>
                    </div>
                </div>

                <div className="absolute" style={{ top: '-100px', right: '400px' }}>
                    <div className="text-xs text-gray-600">
                        <div>2035 1.5°C emissions level</div>
                        <div>-26 %</div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gray-800" style={{ borderTop: '2px dashed #333' }}></div>
                    <span>Electricity CO₂</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gray-600"></div>
                    <span>GHG(incl. LULUCF)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-yellow-400"></div>
                    <span>F-Gases</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-green-400"></div>
                    <span>CH₄</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-purple-400"></div>
                    <span>N₂O</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gray-400"></div>
                    <span>CO₂-FFI</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>NDC Target</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 triangle"></div>
                    <span>Net-Zero Year</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-purple-600"></div>
                    <span>Delayed Transition</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-500"></div>
                    <span>High Ambition</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-purple-500" style={{ borderTop: '2px dashed #8b5cf6' }}></div>
                    <span>NDC to Net-Zero Trend</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Today to NDC Trend</span>
                </div>
            </div>

            {/* Caption */}
            <div className="mt-6 text-xs text-gray-500 leading-relaxed">
                <p className="font-medium mb-2">
                    Figure Subtext. Australia's GHG Including LULUCF Emission Pathways Across Scenarios.
                </p>
                <p>
                    Historical Data Is From PRIMAP-Hist (Solid Black Line For Total GHG, Include LULUCF), Ember (Dashed Black Line For
                    Electricity Supply GHG Emissions), And CEDS (Colored Breakdown Of Historic GHG Emissions, Without F-Gases). Colored Triangles Mark The Official 2030 NDC And Net-Zero Targets. Colored Dots Mark
                    Possible Values For 2035 And 2040, Based On Extrapolation Of The 2022-2030 Linear Trajectory ("Today To NDC Trend"), Interpolation Between The 2030 And Net-Zero 2050 Targets ("NDC To Net-Zero
                    Trend"). Pathways Data Includes LULUCF Emissions And Is From The Downscaled Scenarios Based On The Australia_NZ Region Of The GCAM Model From The NGFS Phase V Scenarios.
                </p>
            </div>
        </div>
    );
}
