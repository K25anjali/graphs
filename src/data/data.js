//electricity data
export const electricityData = [
    { year: 1990, coal: 10, gas: 110, hydro: 15, nuclear: 0, windSolar: 0, bio: 2, oil: 8 },
    { year: 1995, coal: 10, gas: 15, hydro: 18, nuclear: 0, windSolar: 1, bio: 3, oil: 10 },
    { year: 2000, coal: 160, gas: 100, hydro: 20, nuclear: 0, windSolar: 2, bio: 4, oil: 12 },
    { year: 2005, coal: 100, gas: 25, hydro: 15, nuclear: 0, windSolar: 5, bio: 5, oil: 10 },
    { year: 2010, coal: 170, gas: 105, hydro: 18, nuclear: 0, windSolar: 12, bio: 6, oil: 8 },
    { year: 2015, coal: 160, gas: 40, hydro: 16, nuclear: 0, windSolar: 25, bio: 7, oil: 6 },
    { year: 2020, coal: 140, gas: 45, hydro: 20, nuclear: 0, windSolar: 45, bio: 8, oil: 4 },
    { year: 2025, coal: 100, gas: 50, hydro: 22, nuclear: 0, windSolar: 65, bio: 10, oil: 3 },
    { year: "2030 (Delayed)", coal: 0, gas: 100, hydro: 15, nuclear: 0, windSolar: 170, bio: 15, oil: 3 },
    { year: "2030 (Ambition)", coal: 0, gas: 120, hydro: 20, nuclear: 0, windSolar: 300, bio: 10, oil: 1 },
    { year: "2035 (Ambition)", coal: 0, gas: 10, hydro: 25, nuclear: 0, windSolar: 380, bio: 12, oil: 1 }
];

export const CHART_CONFIG = {
    // Years/labels for the x-axis
    LABELS: [2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050],

    // Dataset definitions with null values for years without data
    DATASETS: {
        electricity: [-40, -30, -20, -10, 10, 20, null, null, null, null],
        ghg: [null, null, null, null, 0, 0, -10, -20, -30, -40],
        delayed: [null, null, null, null, 0, 7, 2, -8, -18, -28],
        ch4: [null, null, null, null, 0, 9, 4, -6, -16, -26],
        n2o: [null, null, null, null, 6, 11, 6, -4, -14, -24],
        co2ffi: [null, null, null, null, null, 20, 20, 20, null, null],
        ndcTarget: [null, null, null, null, null, 0, null, null, null, null],
        netZero: [null, null, null, null, null, null, -20, null, null, null],
        fgases: [null, null, null, null, null, null, null, 50, null, null],
        highAmbition: [null, null, null, null, 5, -10, -15, -25, -50, -60],
        ndcToNetZero: [null, null, null, null, 5, 0, -20, -40, -60, -80],
    },

    // Chart styling
    STYLES: {
        subtitle: 'text-gray-400 text-base ml-2 font-normal',
        chartWrapper: 'w-full h-96',
        legendContainer: 'flex flex-wrap gap-4 mt-4 text-sm',
        legendItem: 'flex items-center gap-1.5',
        legendIndicator: 'w-4 h-0.5 rounded bg-gray-900 inline-block'
    },

    // Legend items configuration
    LEGEND_ITEMS: [
        { color: '#222224', label: 'Electricity CO₂' },
        { color: '#bdbdbd', label: 'GHG (incl. LULUCF)' },
        { color: '#8bc34a', label: 'F-Gases' },
        { color: '#4caf50', label: 'CH₄' },
        { color: '#2196f3', label: 'N₂O' },
        { color: '#ff9800', label: 'CO₂-FFI' },
        { color: '#e91e63', label: 'NDC Target' },
        { color: '#f44336', label: 'Net-Zero Year' },
        { color: '#ffeb3b', label: 'Delayed Transition' },
        { color: '#00bcd4', label: 'High Ambition' },
        { color: '#9c27b0', label: 'NDC to Net-Zero Trend' },
    ]
};

export const FOSSIL_CHART_CONFIG = {
    LABELS: [1995, 1997, 1998, 1999, 2000, 2010, 2020, 2030, 2031, 2035, 2036],

    COLORS: {
        COAL: {
            HISTORICAL: "#4b5563",
            NET_ZERO: "#86efac",
            BUSINESS_AS_USUAL: "#22c55e"
        },
        GAS: {
            HISTORICAL: "#1e40af",
            NET_ZERO: "#60a5fa",
            BUSINESS_AS_USUAL: "#3b82f6"
        },
        OIL: {
            HISTORICAL: "#7c3aed",
            NET_ZERO: "#c084fc",
            BUSINESS_AS_USUAL: "#a855f7"
        }
    },

    DATASETS: {
        coal: {
            historical: [1.3, 12, 6, 8, 11, 12, null, null, null, null, null],
            netZero: [null, null, null, null, 3, 6, 9, null, null, null, null],
            businessAsUsual: [null, null, null, null, 6, 3, 5.5, null, null, null, null],
            bar_netZero: [null, null, null, null, null, null, null, 4, 3, 5, 2],
            bar_businessAsUsual: [null, null, null, null, null, null, null, 8, 5, 5, 6]
        },
        gas: {
            historical: [1.3, 12, 6, 8, 11, 12, null, null, null, null, null],
            netZero: [null, null, null, null, 3, 6, 9, null, null, null, null],
            businessAsUsual: [null, null, null, null, 6, 3, 5.5, null, null, null, null],
            bar_netZero: [null, null, null, null, null, null, null, 4, 3, 5, 2],
            bar_businessAsUsual: [null, null, null, null, null, null, null, 8, 5, 5, 6]
        },
        oil: {
            historical: [1.3, 12, 6, 8, 11, 12, null, null, null, null, null],
            netZero: [null, null, null, null, 3, 6, 9, null, null, null, null],
            businessAsUsual: [null, null, null, null, 6, 3, 5.5, null, null, null, null],
            bar_netZero: [null, null, null, null, null, null, null, 4, 3, 5, 2],
            bar_businessAsUsual: [null, null, null, null, null, null, null, 8, 5, 5, 6]
        }
    },
};
