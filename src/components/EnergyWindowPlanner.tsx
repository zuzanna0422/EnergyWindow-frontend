export default function EnergyWindowPlanner() {
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
                        />
                    </label>
                    <button
                        type="button"
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
                    <div>Start:</div>
                    <div>End:</div>
                    <div>Average Carbon Intensity:</div>
                </div>
            </div>
        </div>
    )
}