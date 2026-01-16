import { useState } from "react";
import { fetchOptimalChargingWindow } from "../api/energyApi";
import type { ChargingWindowResults } from "../types/energyApi";

export default function EnergyWindowPlanner() {
    const [hours, setHours] = useState(1);
    const [result, setResult] = useState<ChargingWindowResults | null>(null);

    function formatDate(iso?: string)
    {
        if (!iso){
            return "-"
        }

        const date = new Date(iso)

        if (isNaN(date.getTime())) 
        {
            return '-'
        }

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        let hours = date.getHours()
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12

        return `${day}.${month}.${year} ${hours}:${minutes}${ampm}`
    }

    const handleCalculate = async () => {
        const data = await fetchOptimalChargingWindow(hours);
        setResult(data);
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-zinc-800 bg-zinc-850 p-6">
                <h2 className="text-lg font-bold">
                    Plan charging window
                </h2>

                <form className="m-4 grid gap-4 pt-4">
                    <label className="text-base text-zinc-400">
                        Enter hours
                        <input
                            type="number"
                            min={1}
                            max={6}
                            placeholder="Enter 1-6 hours..."
                            className="mt-2 w-full rounded-lg border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
                            onChange={(e) => setHours(Number(e.currentTarget.value))}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-zinc-900 hover:bg-emerald-500">
                            Calculate
                    </button>
                </form>
            </div>

            <div className="rounded-2xl border-zinc-800 bg-zinc-850 p-6">
                <h2 className="text-lg font-bold text-zinc-400">
                    Results:
                </h2>
                <div className="mt-4 pt-4 gap-2 flex flex-col">
                    <div>Start: {formatDate(result?.from ?? "-")}</div>
                    <div>End: {formatDate(result?.to ?? "-")}</div>
                    <div>Clean Energy Percentage:{" "} {result?.cleanEnergyPercentage != null ? `${Math.round(result.cleanEnergyPercentage)}%` : "-"}</div>
                </div>
            </div>
        </div>
    )
}