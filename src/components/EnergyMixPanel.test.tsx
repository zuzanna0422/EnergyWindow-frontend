import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EnergyMixPanel from "./EnergyMixPanel";
import { fetchDailyEnergyMix } from "../api/energyApi";

vi.mock("../api/energyApi", () => ({
  fetchDailyEnergyMix: vi.fn(),
}));

describe("EnergyMixPanel", () => {
  it("shows error message when API fails", async () => {
    const mockedFetch = vi.mocked(fetchDailyEnergyMix);
    mockedFetch.mockRejectedValue(new Error("boom"));

    render(<EnergyMixPanel />);

    expect(
      await screen.findByText("Failed to load energy mix.")
    ).toBeInTheDocument();
  });
});