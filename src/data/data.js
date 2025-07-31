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

//fossilsfuel data
export const COLOR = {
    COAL: {
        HISTORICAL: "#4b5563",
        NET_ZERO: "#86efac",
        BUSINESS_AS_USUAL: "#22c55e",
    },
    GAS: {
        HISTORICAL: "#1e40af", // Deep blue
        NET_ZERO: "#60a5fa",    // Light blue
        BUSINESS_AS_USUAL: "#3b82f6", // Medium blue
    },
    OIL: {
        HISTORICAL: "#b45309", // Dark orange
        NET_ZERO: "#f97316",    // Light orange
        BUSINESS_AS_USUAL: "#fb923c", // Medium orange
    },
};

export const coalData = [
    { year: 1995, historical: 1.3 },
    { year: 1997, historical: 12 },
    { year: 1998, historical: 6 },
    { year: 1999, historical: 8 },
    { year: 2000, historical: 11, netZero: 3, businessAsUsual: 6 },
    { year: 2010, historical: 12, netZero: 6, businessAsUsual: 3 },
    { year: 2020, netZero: 9, businessAsUsual: 5.5 },
    { year: 30, bar_netZero: 4, bar_businessAsUsual: 8 },
    { year: 31, bar_netZero: 3, bar_businessAsUsual: 5 },
    { year: 35, bar_netZero: 5, bar_businessAsUsual: 5 },
    { year: 36, bar_netZero: 2, bar_businessAsUsual: 6 },
];