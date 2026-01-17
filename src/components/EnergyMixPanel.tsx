import { fetchDailyEnergyMix } from "../api/energyApi";
import type { EnergyMixDaily } from "../types/energyApi";
import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS: Record<string, string> = {
    coal: "#f59e0b",
    gas: "#d97706",
    biomass: "#40bd81",
    nuclear: "#1fc475",
    hydro: "#2ebf79",
    imports: "#de8014",
    other: "#b45309",
    wind: "#269e64",
    solar: "#2f9162",
}

function formatDate(dateIso: string) {
    const d = new Date(dateIso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`
}

function mapFuelToChart(fuel: Record<string, number>) {
    return Object.entries(fuel).map(([name, value]) => ({
        name,
        value,
    }))
}

export default function EnergyMixPanel() {
    const [data, setData] = useState<EnergyMixDaily[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDailyEnergyMix()
            .then(setData)
            .catch(() => setError("Failed to load energy mix."))
    }, [])

    if (error) {
        return (
            <div className="rounded-2xl border-zinc-800 bg-zinc-850 p-6 text-red-400">
                {error}
            </div>
        )
    }

    return (
        <div className="rounded-2xl bg-zinc-850 p-6 text-lg font-bold text-center">
            <div className="mt-4 grid gap-6 md:grid-cols-3 text-center">
                {data.map((day, idx) => {
                const chartData = mapFuelToChart(day.fuel);
                    return (
                        <div key={day.date} className="flex flex-col items-center gap-3">
                            <div className="h-56 w-full">
                                                            <div className="text-sm text-zinc-400">
                                {idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : "Day after"} - {formatDate(day.date)}
                            </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={80}
                                        >
                                            {chartData.map((entry) => (
                                                <Cell key={entry.name} fill={COLORS[entry.name]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => value !== undefined ? `${Math.round(Number(value))}%` : ''}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="px-3 py-1 text-base text-zinc-300">
                                Clean energy: {Math.round(day.cleanEnergyPercentage)}%
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}