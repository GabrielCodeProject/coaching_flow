import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkoutCard } from '@/components/ui/workout-card'

export default function AthleteDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Fitness Journey</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your progress and recommended workouts
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-muted-foreground text-xs">Goal: 5 workouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <p className="text-muted-foreground text-xs">+45 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-muted-foreground text-xs">🔥 Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Dashboard Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump back into your fitness routine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">🏃‍♂️ Continue Last Workout</Button>
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
                    <p className="text-muted-foreground text-sm">Completed 1 day ago</p>
                  </div>
                  <Badge variant="secondary">30 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Upper Body Strength</p>
                    <p className="text-muted-foreground text-sm">Completed 3 days ago</p>
                  </div>
                  <Badge variant="secondary">45 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Morning Yoga Flow</p>
                    <p className="text-muted-foreground text-sm">Completed 5 days ago</p>
                  </div>
                  <Badge variant="secondary">25 min</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fitness Metrics</CardTitle>
                <CardDescription>Track your fitness journey and improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal Progress</span>
                    <span>4/5 workouts</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Challenge</span>
                    <span>12/20 days active</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Strength Progression</span>
                    <span>+15% since last month</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Records</CardTitle>
                <CardDescription>Your best achievements and milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Longest Streak</p>
                    <p className="text-muted-foreground text-sm">Consecutive workout days</p>
                  </div>
                  <Badge variant="secondary">14 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Total Workouts</p>
                    <p className="text-muted-foreground text-sm">All-time completed</p>
                  </div>
                  <Badge variant="secondary">87 sessions</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Total Time</p>
                    <p className="text-muted-foreground text-sm">Hours exercised</p>
                  </div>
                  <Badge variant="secondary">42.5 hrs</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Recommended for You</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <WorkoutCard
                title="Core Strength Builder"
                description="Strengthen your core with this focused workout session"
                coach={{
                  name: 'Mike Johnson',
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
                  name: 'Sarah Davis',
                  rating: 4.9,
                }}
                duration={35}
                difficulty="BEGINNER"
                category="Cardio"
                participants={892}
                className="max-w-sm"
              />
              <WorkoutCard
                title="Upper Body Focus"
                description="Target your arms, shoulders, and upper back muscles"
                coach={{
                  name: 'Alex Brown',
                  rating: 4.6,
                }}
                duration={40}
                difficulty="ADVANCED"
                category="Strength"
                participants={324}
                className="max-w-sm"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Goals</CardTitle>
                <CardDescription>Your active fitness objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lose 10 lbs</span>
                    <span>6 lbs lost</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-muted-foreground text-xs">Target: End of March</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>5K Run Under 25 mins</span>
                    <span>Current: 28:30</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-muted-foreground text-xs">Target: End of February</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>100 Push-ups</span>
                    <span>Current max: 45</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-muted-foreground text-xs">Target: End of April</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
                <CardDescription>Unlock milestones and celebrate progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl">🔥</div>
                    <p className="text-xs font-medium">7-Day Streak</p>
                    <p className="text-muted-foreground text-xs">Unlocked</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">💪</div>
                    <p className="text-xs font-medium">Strength Hero</p>
                    <p className="text-muted-foreground text-xs">Unlocked</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">⏱️</div>
                    <p className="text-xs font-medium">Speed Demon</p>
                    <p className="text-muted-foreground text-xs">In Progress</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🎯</div>
                    <p className="text-xs font-medium">Goal Crusher</p>
                    <p className="text-muted-foreground text-xs">Locked</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🏆</div>
                    <p className="text-xs font-medium">Champion</p>
                    <p className="text-muted-foreground text-xs">Locked</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🌟</div>
                    <p className="text-xs font-medium">Elite</p>
                    <p className="text-muted-foreground text-xs">Locked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
