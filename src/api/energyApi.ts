import type { ChargingWindowResults, EnergyMixDaily } from "../types/energyApi";

const API_URL = import.meta.env.VITE_API_URL as string;

if(!API_URL) {
    throw new Error("VITE_API_URL is not defined in .env file");
}

async function request<T>(path: string): Promise<T> 
{
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok)
    {
        throw new Error(`API request failed with status ${response.status}`);
    } 
    else {

        return response.json() as Promise<T>;
    }
}
export async function fetchDailyEnergyMix(): Promise<EnergyMixDaily[]> 
{
    return request<EnergyMixDaily[]>("/api/EnergyMix/daily-mix");
}

export async function fetchOptimalChargingWindow(hours : number): Promise<ChargingWindowResults> 
{
    return request<ChargingWindowResults>(`/api/EnergyMix/optimal-window?hours=${hours}`);
}