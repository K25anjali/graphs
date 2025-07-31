import {
    Line,
    LineChart,
    Area,
    AreaChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Bar,
    BarChart,
    CartesianGrid,
} from "recharts"

export default function EmissionsChart() {
    // Complete dotted line trajectory (business as usual from 1990 to 2025)
    const dottedTrajectoryData = [
        { year: 1990, value: -30 },
        { year: 1995, value: -15 },
        { year: 2000, value: -5 },
        { year: 2005, value: 0 },
        { year: 2010, value: 8 },
        { year: 2015, value: 15 },
        { year: 2020, value: 20 },
        { year: 2025, value: 22 },
    ]

    // High Ambition trajectory (teal line)
    const highAmbitionData = [
        { year: 2020, value: 18 },
        { year: 2025, value: 20 },
        { year: 2030, value: -21 },
        { year: 2035, value: -26 },
        { year: 2040, value: -40 },
        { year: 2045, value: -50 },
        { year: 2050, value: -60 },
    ]

    // Uncertainty band data (pink area)
    const uncertaintyData = [
        { year: 2020, upper: 25, lower: 15 },
        { year: 2025, upper: 28, lower: 18 },
        { year: 2030, upper: 25, lower: 10 },
        { year: 2035, upper: 20, lower: 5 },
        { year: 2040, upper: 15, lower: -5 },
        { year: 2045, upper: 10, lower: -15 },
        { year: 2050, upper: 5, lower: -25 },
    ]

    // F-Gases bar data (yellow bar around 2030)
    const fGasesData = [{ year: 2030, value: 75 }]

    const CustomDot = ({ cx, cy, fill, r = 4 }) => (
        <circle cx={cx} cy={cy} r={r} fill={fill} stroke="white" strokeWidth={2} />
    )

    const CustomSquare = ({ cx, cy, fill, size = 8 }) => (
        <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} fill={fill} stroke="white" strokeWidth={1} />
    )

    return (
        <div className="w-full max-w-6xl mx-auto bg-white my-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Emissions GHG (Mt CO2eq/yr)</h1>

            <div className="relative" style={{ height: "500px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 20, right: 50, left: 80, bottom: 100 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={1} horizontal={true} vertical={true} />
                        <XAxis
                            dataKey="year"
                            axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                            tickLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                            tick={{ fontSize: 12, fill: "#666" }}
                            domain={[1990, 2050]}
                            type="number"
                            scale="linear"
                        />
                        <YAxis
                            axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                            tickLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                            tick={{ fontSize: 12, fill: "#666" }}
                            domain={[-100, 80]}
                            tickFormatter={(value) => `${value}%`}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {/* Complete dotted trajectory line (business as usual) */}
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dottedTrajectoryData} margin={{ top: 20, right: 50, left: 80, bottom: 100 }}>
                            <XAxis dataKey="year" hide domain={[1990, 2050]} type="number" />
                            <YAxis hide domain={[-100, 80]} />
                            <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Uncertainty band (pink area) */}
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={uncertaintyData} margin={{ top: 20, right: 50, left: 80, bottom: 100 }}>
                            <XAxis dataKey="year" hide domain={[1990, 2050]} type="number" />
                            <YAxis hide domain={[-100, 80]} />
                            <Area type="monotone" dataKey="upper" stroke="none" fill="rgba(251, 207, 232, 0.6)" />
                            <Area type="monotone" dataKey="lower" stroke="none" fill="rgba(255, 255, 255, 0.8)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* High Ambition line (teal) */}
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={highAmbitionData} margin={{ top: 20, right: 50, left: 80, bottom: 100 }}>
                            <XAxis dataKey="year" hide domain={[1990, 2050]} type="number" />
                            <YAxis hide domain={[-100, 80]} />
                            <Line type="monotone" dataKey="value" stroke="#0891b2" strokeWidth={3} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* F-Gases bar (yellow) */}
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fGasesData} margin={{ top: 20, right: 50, left: 80, bottom: 100 }}>
                            <XAxis dataKey="year" hide domain={[1990, 2050]} type="number" />
                            <YAxis hide domain={[-100, 80]} />
                            <Bar dataKey="value" fill="#fbbf24" width={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Reference year 2005 dot (gray) */}
                <div className="absolute" style={{ left: "22%", top: "52%" }}>
                    <CustomDot cx={0} cy={0} fill="#6b7280" />
                </div>

                {/* NDC point on High Ambition line (light blue dot) */}
                <div className="absolute" style={{ left: "75%", top: "42%" }}>
                    <CustomDot cx={0} cy={0} fill="#0891b2" />
                </div>

                {/* Ambition gap (gray square) */}
                <div className="absolute" style={{ left: "85%", top: "38%" }}>
                    <CustomSquare cx={0} cy={0} fill="#6b7280" />
                </div>

                {/* Text annotations */}
                <div className="absolute text-sm text-gray-700" style={{ left: "15%", top: "45%" }}>
                    <div className="text-center">
                        <div className="font-semibold">Reference year 2005</div>
                    </div>
                </div>

                <div className="absolute text-sm text-gray-700" style={{ left: "60%", top: "25%" }}>
                    <div className="text-center">
                        <div className="font-semibold">NDC (unconditional)</div>
                        <div>0%</div>
                    </div>
                </div>

                <div className="absolute text-sm text-gray-700" style={{ left: "70%", top: "55%" }}>
                    <div className="text-center">
                        <div className="font-semibold">NDC</div>
                        <div>-21%</div>
                    </div>
                </div>

                <div className="absolute text-sm text-gray-700" style={{ left: "75%", top: "70%" }}>
                    <div className="text-center">
                        <div className="font-semibold">2035 1.5°C emissions level</div>
                        <div>-26%</div>
                    </div>
                </div>

                <div className="absolute text-sm text-gray-700" style={{ left: "87%", top: "32%" }}>
                    <div className="font-semibold">Ambition gap</div>
                </div>
            </div>

            {/* Legend with exact colors from image */}
            <div className="mt-8 grid grid-cols-6 gap-4 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 border-t-2 border-dashed border-gray-500"></div>
                    <span>Electricity CO2</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gray-600"></div>
                    <span>GHG(incl. LULUCF)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-yellow-400"></div>
                    <span>F-Gases</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-green-500"></div>
                    <span>CH4</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-purple-500"></div>
                    <span>N2O</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-cyan-400"></div>
                    <span>CO2-FFI</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-blue-500"></div>
                    <span>NDC Target</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-red-500"></div>
                    <span>Net-Zero Year</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-800"></div>
                    <span>Delayed Transition</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-cyan-600"></div>
                    <span>High Ambition</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-red-800"></div>
                    <span>NDC to Net-Zero Trend</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Today to NDC Trend</span>
                </div>
            </div>
        </div>
    )
}
