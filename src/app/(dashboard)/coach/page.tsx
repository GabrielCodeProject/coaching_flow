import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CoachDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Coach Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your workouts, view analytics, and engage with your athletes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Total Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Athletes Following
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">⭐ From 89 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,921</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
            <CardDescription>Your latest published workouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Full Body HIIT Challenge</p>
                <p className="text-sm text-muted-foreground">
                  Published 2 days ago
                </p>
              </div>
              <Badge>Published</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Strength Training Basics</p>
                <p className="text-sm text-muted-foreground">
                  Published 1 week ago
                </p>
              </div>
              <Badge>Published</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Advanced Yoga Flow</p>
                <p className="text-sm text-muted-foreground">Draft</p>
              </div>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              ➕ Create New Workout
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📊 View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              👥 Manage Athletes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              💬 View Comments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
