import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkoutCard } from "@/components/ui/workout-card";

export default function AthleteDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Fitness Journey</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your progress and recommended workouts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Workouts This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Goal: 5 workouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <p className="text-xs text-muted-foreground">+45 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">🔥 Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump back into your fitness routine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              🏃‍♂️ Continue Last Workout
            </Button>
            <Button className="w-full justify-start" variant="outline">
              🔍 Browse New Workouts
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📈 View Progress
            </Button>
            <Button className="w-full justify-start" variant="outline">
              ⚙️ Manage Subscription
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest workout sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Full Body HIIT</p>
                <p className="text-sm text-muted-foreground">
                  Completed 1 day ago
                </p>
              </div>
              <Badge variant="secondary">30 min</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Upper Body Strength</p>
                <p className="text-sm text-muted-foreground">
                  Completed 3 days ago
                </p>
              </div>
              <Badge variant="secondary">45 min</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Morning Yoga Flow</p>
                <p className="text-sm text-muted-foreground">
                  Completed 5 days ago
                </p>
              </div>
              <Badge variant="secondary">25 min</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkoutCard
            title="Core Strength Builder"
            description="Strengthen your core with this focused workout session"
            coach={{
              name: "Mike Johnson",
              rating: 4.7,
            }}
            duration={25}
            difficulty="INTERMEDIATE"
            category="Core"
            participants={543}
            className="max-w-sm"
          />
          <WorkoutCard
            title="Cardio Blast"
            description="High-energy cardio workout to get your heart pumping"
            coach={{
              name: "Sarah Davis",
              rating: 4.9,
            }}
            duration={35}
            difficulty="BEGINNER"
            category="Cardio"
            participants={892}
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
