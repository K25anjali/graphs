export const historicalData = [
    { year: 1990, coal: 180, gas: 40, hydro: 15, nuclear: 20, windSolar: 5, bio: 5, oil: 5 },
    { year: 1995, coal: 100, gas: 60, hydro: 18, nuclear: 22, windSolar: 8, bio: 6, oil: 7 },
    { year: 2000, coal: 150, gas: 100, hydro: 20, nuclear: 23, windSolar: 15, bio: 8, oil: 10 },
    { year: 2005, coal: 120, gas: 80, hydro: 15, nuclear: 18, windSolar: 25, bio: 10, oil: 8 },
    { year: 2010, coal: 160, gas: 90, hydro: 18, nuclear: 10, windSolar: 40, bio: 12, oil: 6 },
    { year: 2015, coal: 130, gas: 70, hydro: 16, nuclear: 15, windSolar: 60, bio: 70, oil: 40 },
    { year: 2020, coal: 100, gas: 60, hydro: 20, nuclear: 20, windSolar: 20, bio: 90, oil: 50 },
    { year: 2025, coal: 80, gas: 50, hydro: 22, nuclear: 30, windSolar: 10, bio: 100, oil: 100 },
];

export const delayedTransition = [
    { year: 2030, coal: 0, gas: 10, hydro: 0, nuclear: 100, windSolar: 0, bio: 200, oil: 70, scenario: "Delayed" },
    { year: 2035, coal: 0, gas: 0, hydro: 20, nuclear: 0, windSolar: 300, bio: 10, oil: 1, scenario: "Delayed" }
];

export const ambitionTransition = [
    { year: 2030, coal: 0, gas: 5, hydro: 15, nuclear: 50, windSolar: 200, bio: 100, oil: 30, scenario: "Ambition" },
    { year: 2035, coal: 0, gas: 10, hydro: 25, nuclear: 0, windSolar: 380, bio: 12, oil: 1, scenario: "Ambition" }
];

//fuel data 
export const FOSSIL_CHART_CONFIG = {
    LABELS: [1995, 1997, 1998, 1999, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035],

    COLORS: {
        COAL: {
            NET_ZERO: "#719595",
            BUSINESS_AS_USUAL: "#4e7272"
        },
        GAS: {
            NET_ZERO: "#3b82f6",
            BUSINESS_AS_USUAL: "#4f4ea8"
        },
        OIL: {
            NET_ZERO: "#c26867",
            BUSINESS_AS_USUAL: "#c26867"
        }
    },

    DATASETS: {
        coal: {
            historical: [1.3, 12, 6, 8, 11, 12, 14, 12, null, null, null],
            netZero: [null, null, null, null, 2, 6, 3, 4, 2, null, null, null],
            businessAsUsual: [null, null, null, null, 6, 3, 5.5, 3.5, 6.5, null, null, null],
            highAmbition: [null, null, null, null, null, null, null, null, null, null, 6, 8],
            delayedTransition: [null, null, null, null, null, null, null, null, null, null, 4, 5],
        },
        gas: {
            historical: [1.3, 12, 6, 8, 11, 12, 14, 12, null, null, null],
            netZero: [null, null, null, null, 2, 6, 3, 4, 2, null, null, null],
            businessAsUsual: [null, null, null, null, 6, 3, 5.5, 3.5, 6.5, null, null, null],
            highAmbition: [null, null, null, null, null, null, null, null, null, null, 6, 8],
            delayedTransition: [null, null, null, null, null, null, null, null, null, null, 4, 5],
        },
        oil: {
            historical: [1.3, 3, 4.5, 5.2, 3.1, 4.3, 5, 1.5, null, null, null],
            netZero: [null, null, null, null, 1, 4, 3.5, 2, 2, null, null, null],
            businessAsUsual: [null, null, null, null, 1.3, 4.5, 2.5, 3.5, 1.5, null, null, null],
            highAmbition: [null, null, null, null, null, null, null, null, null, null, 6, 8],
            delayedTransition: [null, null, null, null, null, null, null, null, null, null, 4, 5],
        }

    },
};

// export const chartData = [
//     { "year": 1990, "electricity": 90.319, "fgases": 1.425779, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1991, "electricity": 94.20752, "fgases": 1.444234, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1992, "electricity": 96.93602, "fgases": 1.029544, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1993, "electricity": 89.92461, "fgases": 1.272877, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1994, "electricity": 90.29253, "fgases": 0.875268, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1995, "electricity": 95.46664, "fgases": 0.898499, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1996, "electricity": 100.51436, "fgases": 2.462495, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1997, "electricity": 98.91033, "fgases": 2.545527, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1998, "electricity": 90.21781, "fgases": 2.129491, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 1999, "electricity": 89.70515, "fgases": 2.80293, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2000, "electricity": 106.98, "fgases": 2.915587, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2001, "electricity": 114.34, "fgases": 2.482269, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2002, "electricity": 119.39, "fgases": 3.248504, "ch4": 94.88814, "co2ffi": 418.2716, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2003, "electricity": 128.23, "fgases": 3.462422, "ch4": 96.99578, "co2ffi": 416.8553, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2004, "electricity": 130.39, "fgases": 3.579787, "ch4": 97.00952, "co2ffi": 420.8057, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2005, "electricity": 137.83, "fgases": 5.233854, "ch4": 99.07785, "co2ffi": 434.0064, "ndcToNetZero": null, "highAmbition": 762.232, "co2": null },
//     { "year": 2006, "electricity": 140.12, "fgases": 7.108629, "ch4": 101.3324, "co2ffi": 456.8348, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2007, "electricity": 145.9, "fgases": 8.976607, "ch4": 103.7081, "co2ffi": 496.3649, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2008, "electricity": 140.58, "fgases": 10.31334, "ch4": 105.8434, "co2ffi": 573.1086, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2009, "electricity": 148.36, "fgases": 10.84117, "ch4": 110.3614, "co2ffi": 532.876, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2010, "electricity": 149.34, "fgases": 11.94557, "ch4": 113.5902, "co2ffi": 507.1579, "ndcToNetZero": null, "highAmbition": 749.0012, "co2": null },
//     { "year": 2011, "electricity": 157.7, "fgases": 12.43707, "ch4": 117.2114, "co2ffi": 480.2555, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2012, "electricity": 163.09, "fgases": 11.93684, "ch4": 114.9457, "co2ffi": 486.402, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2013, "electricity": 162.47, "fgases": 12.7754, "ch4": 116.941, "co2ffi": 493.9668, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2014, "electricity": 159.43, "fgases": 14.48142, "ch4": 118.2868, "co2ffi": 500.3429, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2015, "electricity": 165.7, "fgases": 13.77367, "ch4": 126.709, "co2ffi": 495.7968, "ndcToNetZero": null, "highAmbition": 796.7717, "co2": null },
//     { "year": 2016, "electricity": 172.22, "fgases": 15.22511, "ch4": 134.1676, "co2ffi": 501.882, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2017, "electricity": 175.63, "fgases": 17.09117, "ch4": 141.4303, "co2ffi": 492.8806, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2018, "electricity": 183, "fgases": 18.58286, "ch4": 149.1566, "co2ffi": 501.9844, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2019, "electricity": 181.15, "fgases": 20.18874, "ch4": 157.0913, "co2ffi": 505.9649, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2020, "electricity": 158.61, "fgases": 21.46089, "ch4": 159.2054, "co2ffi": 478.5886, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2021, "electricity": 152.26, "fgases": 22.80934, "ch4": 159.2318, "co2ffi": 510.5908, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2022, "electricity": 163.09, "fgases": 24.16964, "ch4": 161.0963, "co2ffi": 531.4599, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2023, "electricity": 174.71, "fgases": 25.4966, "ch4": 163.0347, "co2ffi": 550.3456, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2024, "electricity": 175.16, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": null, "co2": null },
//     { "year": 2025, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": 794.1698, "co2": null },
//     { "year": 2030, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": 594.6, "highAmbition": 583.9943, "co2": null },
//     { "year": 2035, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": 493.6744, "co2": null },
//     { "year": 2040, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": 388.6197, "co2": null },
//     { "year": 2045, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": 265.1139, "co2": null },
//     { "year": 2050, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": 0, "highAmbition": 189.0093, "co2": null },
//     { "year": 2055, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": 129.8265, "co2": null },
//     { "year": 2060, "electricity": null, "fgases": null, "ch4": null, "co2ffi": null, "ndcToNetZero": null, "highAmbition": 129.6214, "co2": null }
// ];