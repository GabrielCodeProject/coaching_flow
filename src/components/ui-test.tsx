"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UITest() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Coaching Platform UI Test</h1>
        <p className="text-muted-foreground">Testing Shadcn-UI components for the coaching platform</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buttons & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons & Actions</CardTitle>
            <CardDescription>Different button variants and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
            <div className="flex gap-2">
              <Badge>Coach</Badge>
              <Badge variant="secondary">Athlete</Badge>
              <Badge variant="outline">Beginner</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input components for forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="athlete">Athlete</SelectItem>
                  <SelectItem value="coach">Coach</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Profile & Avatar */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Avatar and user information display</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Personal Trainer</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Workouts Created:</span>
                <Badge variant="secondary">42</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Rating:</span>
                <Badge>4.8/5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Component */}
      <Card>
        <CardHeader>
          <CardTitle>Workout Categories</CardTitle>
          <CardDescription>Tabbed navigation for different workout types</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="strength" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="yoga">Yoga</TabsTrigger>
              <TabsTrigger value="hiit">HIIT</TabsTrigger>
            </TabsList>
            <TabsContent value="strength" className="space-y-4">
              <h3 className="text-lg font-semibold">Strength Training</h3>
              <p className="text-muted-foreground">
                Build muscle and increase strength with our comprehensive weight training programs.
              </p>
              <div className="flex gap-2">
                <Badge>Beginner</Badge>
                <Badge>Intermediate</Badge>
                <Badge>Advanced</Badge>
              </div>
            </TabsContent>
            <TabsContent value="cardio" className="space-y-4">
              <h3 className="text-lg font-semibold">Cardio Workouts</h3>
              <p className="text-muted-foreground">
                Improve your cardiovascular health with our heart-pumping cardio routines.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">Low Impact</Badge>
                <Badge variant="secondary">High Impact</Badge>
              </div>
            </TabsContent>
            <TabsContent value="yoga" className="space-y-4">
              <h3 className="text-lg font-semibold">Yoga & Flexibility</h3>
              <p className="text-muted-foreground">
                Enhance flexibility and mindfulness with our guided yoga sessions.
              </p>
            </TabsContent>
            <TabsContent value="hiit" className="space-y-4">
              <h3 className="text-lg font-semibold">HIIT Training</h3>
              <p className="text-muted-foreground">
                High-intensity interval training for maximum results in minimum time.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          ✅ All Shadcn-UI components are working correctly!
        </p>
        <p className="text-xs text-muted-foreground">
          Design system ready for coaching platform development
        </p>
      </div>
    </div>
  )
} 