import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor platform performance, manage users, and track business metrics
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-muted-foreground text-xs">+12% from last month</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Coaches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">184</div>
            <p className="text-muted-foreground text-xs">+8 new this month</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,892</div>
            <p className="text-muted-foreground text-xs">+18% from last month</p>
            <Progress value={95} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,249</div>
            <p className="text-muted-foreground text-xs">+42 this week</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content Areas */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events and user actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mike Johnson published a new workout</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sarah Davis upgraded to premium</p>
                    <p className="text-muted-foreground text-xs">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">John Doe completed 50 workouts milestone</p>
                    <p className="text-muted-foreground text-xs">6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform performance and status indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Uptime</span>
                    <span className="text-green-600">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Performance</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Video Storage</span>
                    <span className="text-yellow-600">78% Used</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="text-green-600">142ms avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and view user statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mike Johnson</p>
                        <p className="text-muted-foreground text-sm">mike@example.com</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>Coach</Badge>
                    </TableCell>
                    <TableCell>Jan 15, 2024</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah Davis</p>
                        <p className="text-muted-foreground text-sm">sarah@example.com</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Athlete</Badge>
                    </TableCell>
                    <TableCell>Feb 3, 2024</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-muted-foreground text-sm">john@example.com</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Athlete</Badge>
                    </TableCell>
                    <TableCell>Mar 10, 2024</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Suspended</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Monthly subscription revenue analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Basic Plan ($9.99/month)</span>
                    <span>$14,385</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Premium Plan ($19.99/month)</span>
                    <span>$8,798</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coach Revenue Share</span>
                    <span>$1,709</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Earning Coaches</CardTitle>
                <CardDescription>Coaches with highest revenue this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Mike Johnson</p>
                      <p className="text-muted-foreground text-sm">1,234 subscribers</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">$2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alex Brown</p>
                      <p className="text-muted-foreground text-sm">892 subscribers</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">$1,956</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Lisa Wong</p>
                      <p className="text-muted-foreground text-sm">645 subscribers</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">$1,423</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
                <CardDescription>Platform content statistics and moderation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,249</div>
                    <p className="text-muted-foreground text-sm">Total Workouts</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4,567</div>
                    <p className="text-muted-foreground text-sm">Comments</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">8,923</div>
                    <p className="text-muted-foreground text-sm">Ratings</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-muted-foreground text-sm">Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
                <CardDescription>Latest workouts and pending moderation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Full Body HIIT Challenge</p>
                    <p className="text-muted-foreground text-sm">by Mike Johnson</p>
                  </div>
                  <Badge>Published</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Advanced Yoga Flow</p>
                    <p className="text-muted-foreground text-sm">by Lisa Wong</p>
                  </div>
                  <Badge variant="secondary">Pending Review</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Strength Training 101</p>
                    <p className="text-muted-foreground text-sm">by Alex Brown</p>
                  </div>
                  <Badge variant="destructive">Reported</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Button className="h-auto flex-col gap-2 p-4" variant="outline">
              <span>👥</span>
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button className="h-auto flex-col gap-2 p-4" variant="outline">
              <span>📊</span>
              <span className="text-sm">View Reports</span>
            </Button>
            <Button className="h-auto flex-col gap-2 p-4" variant="outline">
              <span>🛡️</span>
              <span className="text-sm">Moderation</span>
            </Button>
            <Button className="h-auto flex-col gap-2 p-4" variant="outline">
              <span>⚙️</span>
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
