import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Dashboard from "./Dashboard";

vi.mock("../components/EnergyMixPanel", () => ({
  default: () => <div>Mocked Energy Mix Panel</div>,
}));

vi.mock("../components/EnergyWindowPlanner", () => ({
  default: () => <div>Mocked Energy Window Planner</div>,
}));

describe("Dashboard", () => {
  it("renders title and default tab content", () => {
    render(<Dashboard />);

    expect(
      screen.getByText("UK Energy Mix Optimal Charging")
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked Energy Mix Panel")).toBeInTheDocument();
  });

  it("switches to planner tab on click", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getByText("Plan Your Energy Window"));

    expect(screen.getByText("Mocked Energy Window Planner")).toBeInTheDocument();
  });
});