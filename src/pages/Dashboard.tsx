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
  BookOpen,
  Award,
  TrendingUp,
  Play,
  FileText,
  Trophy,
  Clock,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  // Mock data - in real app, this would come from the database
  const userData = {
    name: "Sujith Kannan",
    totalCourses: 8,
    assessmentsTaken: 12,
    averageScore: 87,
    currentCourse: "Advanced React Development",
    courseProgress: 65,
  };

  const quickStats = [
    {
      title: "Total Courses",
      value: userData.totalCourses,
      icon: BookOpen,
      description: "Enrolled courses",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Assessments Taken",
      value: userData.assessmentsTaken,
      icon: FileText,
      description: "Completed tests",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Average Score",
      value: `${userData.averageScore}%`,
      icon: TrendingUp,
      description: "Performance rate",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Achievements",
      value: 5,
      icon: Trophy,
      description: "Badges earned",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const recentAnnouncements = [
    {
      title: "Removed you from Training Progarm  ",
      description:
        "Despite multiple reminders, we noticed that you have not shown any progress or very less progress in your Blended Learning.",
      time: "2 hours ago",
      type: "course",
    },
    {
      title: "Weekly Assessment Results",
      description: "Check your performance in this week's assessments",
      time: "1 day ago",
      type: "result",
    },
    {
      title: "Study Group Formation",
      description: "Join study groups for collaborative learning",
      time: "3 days ago",
      type: "community",
    },
  ];

  const upcomingDeadlines = [
    {
      title: "JavaScript Fundamentals Quiz",
      course: "Web Development Basics",
      dueDate: "Tomorrow",
      priority: "high",
    },
    {
      title: "React Project Submission",
      course: "Advanced React Development",
      dueDate: "3 days",
      priority: "medium",
    },
    {
      title: "Database Design Assignment",
      course: "Backend Development",
      dueDate: "1 week",
      priority: "low",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey and reach new milestones today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-primary" />
                  <span>Continue Learning</span>
                </CardTitle>
                <CardDescription>
                  Pick up where you left off in your current course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {userData.currentCourse}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Module 4: State Management with Redux
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {userData.courseProgress}% Complete
                    </Badge>
                  </div>
                  <Progress
                    value={userData.courseProgress}
                    className="w-full"
                  />
                  <div className="flex space-x-3">
                    <Button asChild>
                      <Link to="/courses/1">Continue Course</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/courses">View All Courses</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump into your most common activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    asChild
                  >
                    <Link to="/courses">
                      <BookOpen className="w-6 h-6" />
                      <span>Browse Courses</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    asChild
                  >
                    <Link to="/assessments">
                      <FileText className="w-6 h-6" />
                      <span>Take Assessment</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2"
                    asChild
                  >
                    <Link to="/leaderboard">
                      <Trophy className="w-6 h-6" />
                      <span>View Leaderboard</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <Link
                      key={index}
                      to={
                        deadline.title.includes("Quiz") ||
                        deadline.title.includes("Assignment")
                          ? "/assessments"
                          : "/courses"
                      }
                      className="block"
                    >
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 cursor-pointer">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {deadline.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {deadline.course}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              deadline.priority === "high"
                                ? "destructive"
                                : deadline.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            Due {deadline.dueDate}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Latest Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnnouncements.map((announcement, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium text-sm text-foreground">
                        {announcement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {announcement.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {announcement.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        First Course Completed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Perfect Quiz Score</p>
                      <p className="text-xs text-muted-foreground">
                        1 week ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Study Group Leader</p>
                      <p className="text-xs text-muted-foreground">
                        2 weeks ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
