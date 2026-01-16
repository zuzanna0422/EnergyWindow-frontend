import type { ChargingWindowResults, EnergyMixDaily } from "../types/energyApi";

export async function fetchDailyEnergyMix(): Promise<EnergyMixDaily[]> 
{
    throw new Error("Not implemented");
}

export async function fetchOptimalChargingWindow(hours : number): Promise<ChargingWindowResults> 
{
    throw new Error(`Not implemented for ${hours} hours`);
}