import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";
import { renderWithProviders } from "../../../tests/test-utils";

describe("Card component", () => {
  it("affiche le titre", () => {
    renderWithProviders(
      <Card
        title="InoBank"
        description="Test"
        img="/test.png"
        info
      />
    );

    expect(screen.getByText("InoBank")).toBeInTheDocument();
  });
});
