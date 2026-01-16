export type EnergyMixDaily = {
    date: string,
    fuel: Record<string, number>,
    cleanEnergyPercentage: number,
}

export type ChargingWindowResults = {
    from: string,
    to: string,
    cleanEnergyPercentage: number,
}