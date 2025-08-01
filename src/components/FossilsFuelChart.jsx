import {
    ComposedChart, Area, Line, Bar, CartesianGrid,
    XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { transformData } from '../utils/transformData';
import { FOSSIL_CHART_CONFIG } from '../data/data';

const FuelChart = ({ data, title, colors, showYAxis }) => {

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mx-1 text-center bg-gray-200 border border-gray-300">{title}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 20 }} barGap={2} >
                    <CartesianGrid stroke="#cbd5e0" />
                    <XAxis
                        dataKey="year"
                        ticks={[2000, 2010, 2020, 2030, 2035]}
                        padding={{ left: 10 }}
                    />
                    <YAxis
                        hide={!showYAxis}
                        ticks={[0, 5, 10, 15]}
                        domain={[0, 15]}
                        tick={{ fontSize: 10 }}
                        label={{
                            value: "CO₂ Emissions (Gt)",
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

                    {/* Historical line */}
                    <Line
                        type="monotone"
                        dataKey="historical"
                        stroke={colors.HISTORICAL}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3 }}
                        name="Historical"
                    />

                    {/* Inline Area charts */}
                    <Area
                        type="monotone"
                        dataKey="netZero"
                        stackId="1"
                        fill={colors.NET_ZERO}
                        stroke={colors.NET_ZERO}
                        name="Net Zero Scenario"
                    />
                    <Area
                        type="monotone"
                        dataKey="businessAsUsual"
                        stackId="1"
                        fill={colors.BUSINESS_AS_USUAL}
                        stroke={colors.BUSINESS_AS_USUAL}
                        name="Business as Usual"
                    />

                    {/* Inline Bar charts */}
                    <Bar
                        dataKey="bar_netZero"
                        stackId="1"
                        fill={colors.NET_ZERO}
                        barSize={18}
                        name="Net Zero Scenario"
                    />
                    <Bar
                        dataKey="bar_businessAsUsual"
                        stackId="1"
                        fill={colors.BUSINESS_AS_USUAL}
                        barSize={18}
                        name="Business as Usual"
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
}

export default FossilsFuelChart;
