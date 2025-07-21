import { useState } from "react";

import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Video,
  FileText,
  Award,
} from "lucide-react";
import { CourseContentInterface } from "@/components/CourseContentInterface";

export const CourseDetail = () => {
  const { id } = useParams();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]); // First week open by default

  // Mock data - in real app, this would be fetched based on course ID
  const courseData = {
    id: parseInt(id || "1"),
    title: "Advanced React Development",
    instructor: "Shyamala Lakshmi, Babu Duraiswamy",
    description:
      "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. This comprehensive course will take you from intermediate to expert level.",
    duration: "8 weeks",
    progress: 65,
    enrolled: 1247,
    rating: 4.8,
    level: "Advanced",
    thumbnail: "photo-1581091226825-a6a2a5aee158",
    category: "Frontend",
    totalLessons: 45,
    completedLessons: 29,
    estimatedHours: 32,
    overview: [
      "Advanced React Hooks and Custom Hooks",
      "State Management with Context and Redux",
      "Performance Optimization Techniques",
      "Testing React Applications",
      "Server-Side Rendering with Next.js",
      "Modern React Patterns and Best Practices",
    ],
  };

  const weeksData = [
    {
      id: 1,
      title: "Week 1: Advanced Hooks",
      description: "Deep dive into React hooks and creating custom hooks",
      isCompleted: true,
      progress: 100,
      videos: [
        {
          id: 1,
          title: "Introduction to Advanced Hooks",
          duration: "15:30",
          isCompleted: true,
        },
        {
          id: 2,
          title: "Custom Hooks Patterns",
          duration: "22:45",
          isCompleted: true,
        },
        {
          id: 3,
          title: "useCallback and useMemo",
          duration: "18:20",
          isCompleted: true,
        },
      ],
      assessments: [
        {
          id: 1,
          title: "Hooks Quiz",
          day: "Day 3",
          difficulty: "Medium",
          isCompleted: true,
          score: 92,
        },
        {
          id: 2,
          title: "Custom Hooks Project",
          day: "Day 5",
          difficulty: "Hard",
          isCompleted: true,
          score: 88,
        },
      ],
    },
    {
      id: 2,
      title: "Week 2: Context API & State Management",
      description:
        "Managing global state with Context API and advanced patterns",
      isCompleted: true,
      progress: 100,
      videos: [
        {
          id: 4,
          title: "Context API Fundamentals",
          duration: "20:15",
          isCompleted: true,
        },
        {
          id: 5,
          title: "Context with Reducers",
          duration: "25:30",
          isCompleted: true,
        },
        {
          id: 6,
          title: "Context Performance",
          duration: "16:45",
          isCompleted: true,
        },
      ],
      assessments: [
        {
          id: 3,
          title: "Context API Quiz",
          day: "Day 2",
          difficulty: "Medium",
          isCompleted: true,
          score: 95,
        },
        {
          id: 4,
          title: "State Management Project",
          day: "Day 6",
          difficulty: "Hard",
          isCompleted: true,
          score: 90,
        },
      ],
    },
    {
      id: 3,
      title: "Week 3: Performance Optimization",
      description: "Optimizing React applications for better performance",
      isCompleted: false,
      progress: 60,
      videos: [
        {
          id: 7,
          title: "React.memo and Optimization",
          duration: "19:20",
          isCompleted: true,
        },
        {
          id: 8,
          title: "Code Splitting & Lazy Loading",
          duration: "23:15",
          isCompleted: true,
        },
        {
          id: 9,
          title: "Performance Profiling",
          duration: "21:30",
          isCompleted: false,
        },
      ],
      assessments: [
        {
          id: 5,
          title: "Performance Quiz",
          day: "Day 4",
          difficulty: "Medium",
          isCompleted: false,
        },
        {
          id: 6,
          title: "Optimization Challenge",
          day: "Day 7",
          difficulty: "Hard",
          isCompleted: false,
        },
      ],
    },
    {
      id: 4,
      title: "Week 4: Testing React Applications",
      description: "Comprehensive testing strategies for React apps",
      isCompleted: false,
      progress: 0,
      videos: [
        {
          id: 10,
          title: "Testing Fundamentals",
          duration: "18:45",
          isCompleted: false,
        },
        {
          id: 11,
          title: "Component Testing with RTL",
          duration: "26:30",
          isCompleted: false,
        },
        {
          id: 12,
          title: "Integration Testing",
          duration: "24:15",
          isCompleted: false,
        },
      ],
      assessments: [
        {
          id: 7,
          title: "Testing Quiz",
          day: "Day 3",
          difficulty: "Medium",
          isCompleted: false,
        },
        {
          id: 8,
          title: "Testing Project",
          day: "Day 7",
          difficulty: "Hard",
          isCompleted: false,
        },
      ],
    },
  ];

  const toggleWeek = (weekId: number) => {
    setOpenWeeks((prev) =>
      prev.includes(weekId)
        ? prev.filter((id) => id !== weekId)
        : [...prev, weekId]
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/courses" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Courses</span>
            </Link>
          </Button>
        </div>

        {/* Course Info Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Course Image and Progress */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <div className="relative h-48 rounded-t-2xl overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${courseData.thumbnail}?auto=format&fit=crop&w=400&h=200`}
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="mb-2 bg-white/20 text-white">
                    {courseData.level}
                  </Badge>
                  <p className="text-white/90 text-sm">
                    By {courseData.instructor}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-heading font-bold mb-4 text-foreground">
                  {courseData.title}
                </h1>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Course Progress
                    </span>
                    <span className="font-medium">{courseData.progress}%</span>
                  </div>
                  <Progress value={courseData.progress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Information and Instructor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {courseData.estimatedHours}h
                    </div>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {courseData.completedLessons}/{courseData.totalLessons}
                    </div>
                    <p className="text-sm text-muted-foreground">Lessons</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {courseData.enrolled.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold text-foreground">
                        {courseData.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                    {/* <User className="w-8 h-8 text-primary-foreground" /> check it */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {courseData.instructor}
                    </h3>
                    <p className="text-muted-foreground">
                      Senior Software Engineer
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{courseData.category}</Badge>
                      <Badge variant="secondary">5+ years experience</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Interface - Full Width */}
        <div className="w-full">
          <CourseContentInterface
            courseData={courseData}
            weeksData={weeksData}
          />
        </div>
      </div>
    </Layout>
  );
};
