export const transformData = (fuelKey, config) => {
    const { LABELS, DATASETS } = config;
    const dataset = DATASETS[fuelKey];

    return LABELS.map((year, i) => {
        const entry = { year };
        for (const key in dataset) {
            entry[key] = dataset[key][i] ?? null;
        }
        return entry;
    });
};
