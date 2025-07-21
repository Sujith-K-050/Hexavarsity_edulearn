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
import { Input } from "@/components/ui/input";

import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Play,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Mock data - in real app, this would come from the database
  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      description:
        "Master advanced React concepts including hooks, context, and performance optimization",
      duration: "8 weeks",
      progress: 65,
      enrolled: 1247,
      rating: 4.8,
      level: "Advanced",
      thumbnail: "photo-1581091226825-a6a2a5aee158",
      status: "in-progress",
      category: "Frontend",
    },
    {
      id: 2,
      title: "Node.js Backend Fundamentals",
      instructor: "Michael Chen",
      description:
        "Build scalable backend applications with Node.js, Express, and MongoDB",
      duration: "10 weeks",
      progress: 0,
      enrolled: 892,
      rating: 4.6,
      level: "Intermediate",
      thumbnail: "photo-1461749280684-dccba630e2f6",
      status: "not-started",
      category: "Backend",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      instructor: "Emma Davis",
      description:
        "Complete guide to JavaScript from basics to advanced concepts",
      duration: "6 weeks",
      progress: 100,
      enrolled: 2134,
      rating: 4.9,
      level: "Beginner",
      thumbnail: "photo-1486312338219-ce68d2c6f44d",
      status: "completed",
      category: "Programming",
    },
    {
      id: 4,
      title: "Database Design & SQL",
      instructor: "Robert Kim",
      description: "Learn database design principles and master SQL queries",
      duration: "7 weeks",
      progress: 30,
      enrolled: 756,
      rating: 4.7,
      level: "Intermediate",
      thumbnail: "photo-1488590528505-98d2b5aba04b",
      status: "in-progress",
      category: "Database",
    },
    {
      id: 5,
      title: "Python for Data Science",
      instructor: "Dr. Lisa Wang",
      description:
        "Comprehensive Python course focused on data analysis and machine learning",
      duration: "12 weeks",
      progress: 0,
      enrolled: 1543,
      rating: 4.8,
      level: "Intermediate",
      thumbnail: "photo-1649972904349-6e44c42644a7",
      status: "not-started",
      category: "Data Science",
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      instructor: "Alex Thompson",
      description:
        "Learn modern design principles and create stunning user interfaces",
      duration: "9 weeks",
      progress: 45,
      enrolled: 987,
      rating: 4.5,
      level: "Beginner",
      thumbnail: "photo-1581091226825-a6a2a5aee158",
      status: "in-progress",
      category: "Design",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "not-started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Play className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            My Courses
          </h1>
          <p className="text-muted-foreground">
            Explore and continue your learning journey with our comprehensive
            courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors, or categories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => {
                // TODO: Implement filter functionality
                toast({
                  title: "Filter Feature",
                  description: "Filter functionality will be available soon!",
                });
              }}
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {courses.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {courses.filter((c) => c.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {courses.filter((c) => c.status === "in-progress").length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    courses.reduce((acc, course) => acc + course.progress, 0) /
                      courses.length
                  )}
                  %
                </div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-muted via-muted/80 to-muted overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${course.thumbnail}?auto=format&fit=crop&w=400&h=200`}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(course.status)}>
                    {getStatusIcon(course.status)}
                    <span className="ml-1 capitalize">
                      {course.status.replace("-", " ")}
                    </span>
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                  {course.title}
                </CardTitle>
                <CardDescription>By {course.instructor}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolled.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {course.status !== "not-started" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="w-full" />
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  <Button asChild className="w-full">
                    <Link to={`/courses/${course.id}`}>
                      {course.status === "not-started"
                        ? "Start Course"
                        : course.status === "completed"
                        ? "Review Course"
                        : "Continue Learning"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or explore our course catalog
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
