import {
    ComposedChart,
    Area,
    Line,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { coalData, COLOR } from "../data/data"

const gasData = [...coalData];
const oilData = [...coalData];

const AREA_KEYS = [
    { key: "netZero", label: "Net Zero Scenario" },
    { key: "businessAsUsual", label: "Business as Usual" },
];

const BAR_KEYS = ["bar_netZero", "bar_businessAsUsual"];

const FuelChart = ({ data, title, colors, showYaxis = false }) => {
    const areaChartData = data.filter((d) => d.year <= 2020);

    return (
        <div className="w-full bg-white rounded-xl shadow-md my-8">
            <h2 className="text-xl font-semibold mb-4 text-center bg-gray-100 border border-gray-300">{title}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
                >
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="year"
                        tick={{ fontSize: 10 }}
                        label={{ value: "Year", position: "bottom", offset: 5 }}
                        ticks={[2000, 2010, 2020, 30, 35]}
                        padding={{ left: 10 }}
                    />
                    <YAxis
                        hide={!showYaxis}
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
                            value != null && !isNaN(value)
                                ? [value.toFixed(1), "Gt CO₂"]
                                : ["N/A", ""]
                        }
                        labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="historical"
                        stroke={colors.HISTORICAL}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3 }}
                        name="Historical"
                    />
                    {AREA_KEYS.map((item) => (
                        <Area
                            key={item.key}
                            type="monotone"
                            dataKey={item.key}
                            stackId="1"
                            fill={colors[item.key.toUpperCase()]}
                            stroke={colors[item.key.toUpperCase()]}
                            name={item.label}
                            data={areaChartData}
                        />
                    ))}
                    {BAR_KEYS.map((item) => {
                        const keyType = item.includes("netZero")
                            ? "NET_ZERO"
                            : "BUSINESS_AS_USUAL";
                        return (
                            <Bar
                                key={item}
                                dataKey={item}
                                stackId="1"
                                fill={colors[keyType]}
                                barSize={18}
                            />
                        );
                    })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default function FossilFuelChart() {
    return (
        <div className="max-w-6xl mx-auto flex space-x-8">
            <FuelChart data={coalData} title="Coal" colors={COLOR.COAL} showYaxis={true} />
            <FuelChart data={gasData} title="Gas" colors={COLOR.GAS} />
            <FuelChart data={oilData} title="Oil" colors={COLOR.OIL} />
        </div>
    );
}
