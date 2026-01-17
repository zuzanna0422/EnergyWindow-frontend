import { fetchDailyEnergyMix } from "../api/energyApi";
import type { EnergyMixDaily } from "../types/energyApi";
import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = [
    '#22c55e', // green
    '#38bdf8', // sky
    '#f59e0b', // amber
    '#a855f7', // purple
    '#ef4444', // red
    '#14b8a6',
    '#eab308',
    '#84cc16',
    '#f97316',
]

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
        <div className="rounded-2xl border-zinc-800 bg-zinc-850 p-6 text-lg font-bold text-center">
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
                                            {chartData.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % VideoColorSpace.length]} />
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