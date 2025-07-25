import { render, screen } from "@testing-library/react";
import { WorkoutCard } from "./workout-card";

const mockWorkout = {
  title: "Full Body HIIT Workout",
  description: "High-intensity interval training for maximum results",
  coach: {
    name: "John Doe",
    rating: 4.8,
  },
  duration: 30,
  difficulty: "INTERMEDIATE" as const,
  category: "HIIT",
  participants: 156,
  imageUrl: "https://example.com/workout.jpg",
  isSubscriptionRequired: false,
};

describe("WorkoutCard", () => {
  it("should render workout title and description", () => {
    render(<WorkoutCard {...mockWorkout} />);

    expect(screen.getByText("Full Body HIIT Workout")).toBeInTheDocument();
    expect(
      screen.getByText("High-intensity interval training for maximum results")
    ).toBeInTheDocument();
  });

  it("should render coach information", () => {
    render(<WorkoutCard {...mockWorkout} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("should render workout metadata", () => {
    render(<WorkoutCard {...mockWorkout} />);

    expect(screen.getByText("30 min")).toBeInTheDocument();
    expect(screen.getByText("156")).toBeInTheDocument();
    expect(screen.getByText("HIIT")).toBeInTheDocument();
  });

  it("should render difficulty badge with correct styling", () => {
    render(<WorkoutCard {...mockWorkout} />);

    const difficultyBadge = screen.getByText("intermediate");
    expect(difficultyBadge).toBeInTheDocument();
    expect(difficultyBadge).toHaveClass("bg-yellow-100", "text-yellow-800");
  });

  it("should render correct button for free workout", () => {
    render(<WorkoutCard {...mockWorkout} />);

    expect(screen.getByText("Start Workout")).toBeInTheDocument();
  });

  it("should render premium badge and correct button for subscription workout", () => {
    render(<WorkoutCard {...mockWorkout} isSubscriptionRequired={true} />);

    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("should render image when provided", () => {
    render(<WorkoutCard {...mockWorkout} />);

    const image = screen.getByAltText("Full Body HIIT Workout");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/workout.jpg");
  });

  it("should render coach initials when no avatar provided", () => {
    render(<WorkoutCard {...mockWorkout} />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("should apply different colors for different difficulty levels", () => {
    const { rerender } = render(
      <WorkoutCard {...mockWorkout} difficulty="BEGINNER" />
    );

    let difficultyBadge = screen.getByText("beginner");
    expect(difficultyBadge).toHaveClass("bg-green-100", "text-green-800");

    rerender(<WorkoutCard {...mockWorkout} difficulty="ADVANCED" />);

    difficultyBadge = screen.getByText("advanced");
    expect(difficultyBadge).toHaveClass("bg-red-100", "text-red-800");
  });
});
