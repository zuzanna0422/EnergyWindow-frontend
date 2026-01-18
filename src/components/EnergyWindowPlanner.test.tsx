import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EnergyWindowPlanner from "./EnergyWindowPlanner";
import { fetchOptimalChargingWindow } from "../api/energyApi";

vi.mock("../api/energyApi", () => ({
  fetchOptimalChargingWindow: vi.fn(),
}));

describe("EnergyWindowPlanner", () => {
  it("renders basic labels", () => {
    render(<EnergyWindowPlanner />);

    expect(screen.getByText("Plan charging window")).toBeInTheDocument();
    expect(screen.getByText("Results:")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter 1-6 hours...")
    ).toBeInTheDocument();
  });

  it("shows clean energy percentage after calculate", async () => {
    const mockedFetch = vi.mocked(fetchOptimalChargingWindow);
    mockedFetch.mockResolvedValue({
      from: "-",
      to: "-",
      cleanEnergyPercentage: 20,
    });

    render(<EnergyWindowPlanner />);

    fireEvent.change(screen.getByPlaceholderText("Enter 1-6 hours..."), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("Calculate"));

    expect(await screen.findByText(/20%/)).toBeInTheDocument();
  });
});