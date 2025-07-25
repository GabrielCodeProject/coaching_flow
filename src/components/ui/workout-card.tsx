"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Star, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkoutCardProps {
  title: string;
  description: string;
  coach: {
    name: string;
    avatar?: string;
    rating: number;
  };
  duration: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  participants: number;
  imageUrl?: string;
  isSubscriptionRequired?: boolean;
  className?: string;
}

const difficultyColors = {
  BEGINNER: "bg-green-100 text-green-800 hover:bg-green-200",
  INTERMEDIATE: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  ADVANCED: "bg-red-100 text-red-800 hover:bg-red-200",
};

export function WorkoutCard({
  title,
  description,
  coach,
  duration,
  difficulty,
  category,
  participants,
  imageUrl,
  isSubscriptionRequired = false,
  className,
}: WorkoutCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-shadow",
        className
      )}
    >
      {imageUrl && (
        <div className="aspect-video w-full bg-muted overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {description}
            </CardDescription>
          </div>
          {isSubscriptionRequired && (
            <Badge variant="outline" className="shrink-0">
              Premium
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={coach.avatar} alt={coach.name} />
            <AvatarFallback>
              {coach.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{coach.name}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">
                {coach.rating}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4" />
            <span>{category}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={cn("capitalize", difficultyColors[difficulty])}
          >
            {difficulty.toLowerCase()}
          </Badge>

          <Button size="sm" className="shrink-0">
            {isSubscriptionRequired ? "View Details" : "Start Workout"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
