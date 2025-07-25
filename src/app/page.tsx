import { WorkoutCard } from "@/components/ui/workout-card";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Coaching Platform</h1>
        <p className="text-muted-foreground text-lg">
          Your fitness journey starts here - connect with professional coaches
          and discover amazing workouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WorkoutCard
          title="Full Body HIIT Workout"
          description="High-intensity interval training designed to maximize calorie burn and improve cardiovascular fitness in just 30 minutes."
          coach={{
            name: "Sarah Johnson",
            rating: 4.9,
          }}
          duration={30}
          difficulty="INTERMEDIATE"
          category="HIIT"
          participants={245}
          imageUrl="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop"
        />

        <WorkoutCard
          title="Strength Training Fundamentals"
          description="Learn the basics of strength training with proper form and progressive overload techniques."
          coach={{
            name: "Mike Chen",
            rating: 4.8,
          }}
          duration={45}
          difficulty="BEGINNER"
          category="Strength"
          participants={189}
          imageUrl="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=225&fit=crop"
        />

        <WorkoutCard
          title="Advanced Yoga Flow"
          description="Challenge yourself with this advanced yoga sequence that combines strength, flexibility, and mindfulness."
          coach={{
            name: "Emma Davis",
            rating: 4.7,
          }}
          duration={60}
          difficulty="ADVANCED"
          category="Yoga"
          participants={92}
          imageUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop"
          isSubscriptionRequired={true}
        />
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground">
          🎉 Shadcn-UI design system is fully configured and ready for
          development!
        </p>
      </div>
    </div>
  );
}
