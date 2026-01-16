import { useState } from "react";
import EnergyWindowPlanner from "../components/EnergyWindowPlanner";

export default function Dashboard() 
{
    const [activeTab, setActiveTab] = useState<"mix" | "plan">("mix");
    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-300">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        UK Energy Mix Optimal Charging
                    </h1>
                    <div className="mt-6 flex-wrap gap-4 flex">
                        <button 
                            className={`rounded-full px-4 py-2 text-sm font-semibold 
                            ${activeTab === "mix" ? "bg-emerald-400 text-zinc-900" 
                            : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"}`}
                            onClick={() => setActiveTab("mix")}
                        >
                            Energy Mix Charts
                        </button>
                        <button 
                            className={`rounded-full px-4 py-2 text-sm font-semibold
                            ${activeTab === "plan" ? "bg-emerald-400 text-zinc-900" 
                            : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"}`}
                            onClick={() => setActiveTab("plan")}
                        >
                            Plan Your Energy Window
                        </button>
                    </div>
                </header>
                <section className="rounded-xl border-zinc-800 bg-zinc-850 p-6 text-zinc-400">
                    {activeTab === "mix" && (<p>Chart Section</p>)}
                    {activeTab === "plan" && <EnergyWindowPlanner />}
                </section>
            </div>
        </div>
    )
}
