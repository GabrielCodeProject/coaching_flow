import { render, screen } from "@testing-library/react";
import { UITest } from "./ui-test";

describe("UI Test Component", () => {
  it("should render the main heading", () => {
    render(<UITest />);
    expect(screen.getByText("Coaching Platform UI Test")).toBeInTheDocument();
  });

  it("should render all button variants", () => {
    render(<UITest />);
    expect(screen.getByText("Primary Button")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
    expect(screen.getByText("Outline")).toBeInTheDocument();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render user role badges", () => {
    render(<UITest />);
    expect(screen.getByText("Coach")).toBeInTheDocument();
    expect(screen.getByText("Athlete")).toBeInTheDocument();
    expect(screen.getAllByText("Beginner")).toHaveLength(2); // Multiple beginner badges exist
  });

  it("should render form elements", () => {
    render(<UITest />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type your message here...")
    ).toBeInTheDocument();
    expect(screen.getByText("Select a role")).toBeInTheDocument();
  });

  it("should render workout category tabs", () => {
    render(<UITest />);
    expect(screen.getByText("Strength")).toBeInTheDocument();
    expect(screen.getByText("Cardio")).toBeInTheDocument();
    expect(screen.getByText("Yoga")).toBeInTheDocument();
    expect(screen.getByText("HIIT")).toBeInTheDocument();
  });

  it("should render success message", () => {
    render(<UITest />);
    expect(
      screen.getByText("✅ All Shadcn-UI components are working correctly!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Design system ready for coaching platform development")
    ).toBeInTheDocument();
  });
});
