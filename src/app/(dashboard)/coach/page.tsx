import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function CoachDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Coach Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your workouts, view analytics, and engage with your athletes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Athletes Following</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">+180 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-muted-foreground text-xs">⭐ From 89 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,921</div>
            <p className="text-muted-foreground text-xs">+23% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Dashboard Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Workouts</CardTitle>
                <CardDescription>Your latest published workouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Full Body HIIT Challenge</p>
                    <p className="text-muted-foreground text-sm">Published 2 days ago</p>
                  </div>
                  <Badge>Published</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Strength Training Basics</p>
                    <p className="text-muted-foreground text-sm">Published 1 week ago</p>
                  </div>
                  <Badge>Published</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Advanced Yoga Flow</p>
                    <p className="text-muted-foreground text-sm">Draft</p>
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Track your workout engagement and growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Goal Progress</span>
                    <span>8/10 workouts</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subscriber Growth</span>
                    <span>+15% this month</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>87% average</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Workouts</CardTitle>
                <CardDescription>Your most popular content this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Full Body HIIT Challenge</p>
                    <p className="text-muted-foreground text-sm">2,847 completions</p>
                  </div>
                  <Badge variant="secondary">⭐ 4.9</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Beginner Strength Training</p>
                    <p className="text-muted-foreground text-sm">1,923 completions</p>
                  </div>
                  <Badge variant="secondary">⭐ 4.7</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Core Crusher</p>
                    <p className="text-muted-foreground text-sm">1,456 completions</p>
                  </div>
                  <Badge variant="secondary">⭐ 4.8</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Latest feedback from your athletes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-muted-foreground text-sm">
                      &quot;Amazing HIIT workout! Really felt the burn. Thank you!&quot;
                    </p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sarah Miller</p>
                    <p className="text-muted-foreground text-sm">
                      &quot;Perfect for beginners. Clear instructions and great form cues.&quot;
                    </p>
                    <p className="text-muted-foreground text-xs">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Alex Lee</p>
                    <p className="text-muted-foreground text-sm">
                      &quot;Love the variety in your workouts. Keep them coming!&quot;
                    </p>
                    <p className="text-muted-foreground text-xs">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Stats</CardTitle>
                <CardDescription>Community interaction with your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-muted-foreground text-sm">Comments This Week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.8</div>
                    <p className="text-muted-foreground text-sm">Avg. Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-muted-foreground text-sm">New Follows</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12.4K</div>
                    <p className="text-muted-foreground text-sm">Total Views</p>
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
