import { useState } from "react";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";

import {
  Search,
  Video,
  FileText,
  Play,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Download,
  Clock,
  Award,
  BarChart3,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface CourseContentInterfaceProps {
  courseData: any;
  weeksData: any[];
}

export const CourseContentInterface = ({
  courseData,
  weeksData,
}: CourseContentInterfaceProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const toggleWeek = (weekId: number) => {
    setOpenWeeks((prev) =>
      prev.includes(weekId)
        ? prev.filter((id) => id !== weekId)
        : [...prev, weekId]
    );
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "text-green-600";
    if (progress > 0) return "text-blue-600";
    return "text-gray-600";
  };

  const getProgressBg = (progress: number) => {
    if (progress === 100) return "bg-green-100";
    if (progress > 0) return "bg-blue-100";
    return "bg-gray-100";
  };

  const filteredWeeks = weeksData
    .map((week) => ({
      ...week,
      videos: week.videos.filter((video: any) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      assessments: week.assessments.filter((assessment: any) =>
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (week) =>
        week.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        week.videos.length > 0 ||
        week.assessments.length > 0
    );

  const isTestAccessible = (test: any) => {
    const now = new Date();
    const startDate = new Date(test.startDate || "2024-01-01");
    const endDate = new Date(test.endDate || "2024-12-31");
    return now >= startDate && now <= endDate;
  };

  const handleTestClick = (test: any) => {
    if (!isTestAccessible(test)) {
      alert(
        `Invalid Time – This test can only be accessed between ${test.startDate} and ${test.endDate}`
      );
      return;
    }
    setSelectedTest(test);
    setSelectedContent(null);
  };

  const handleVideoClick = (video: any, week: any) => {
    setSelectedContent({ ...video, type: "video", week: week.title });
    setSelectedTest(null);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Course Navigation */}
      <div className="w-80 border-r border-border bg-card overflow-y-auto">
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content, videos, tests..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Course Progress Summary */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {courseData.progress}%
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Course Progress
                </p>
                <Progress value={courseData.progress} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Weeks List */}
          <div className="space-y-2">
            {filteredWeeks.map((week) => (
              <Card key={week.id} className="border-0 shadow-sm">
                <Collapsible
                  open={openWeeks.includes(week.id)}
                  onOpenChange={() => toggleWeek(week.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors duration-200 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${getProgressBg(
                              week.progress
                            )}`}
                          >
                            <span
                              className={`text-xs font-bold ${getProgressColor(
                                week.progress
                              )}`}
                            >
                              {week.progress}%
                            </span>
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-sm">
                              {week.title}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {
                                week.videos.filter((v: any) => v.isCompleted)
                                  .length
                              }
                              /{week.videos.length} videos
                            </p>
                          </div>
                        </div>
                        {openWeeks.includes(week.id) ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-3">
                      {/* Videos */}
                      <div className="mb-4">
                        <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                          Learning Content
                        </h4>
                        <div className="space-y-1">
                          {week.videos.map((video: any) => (
                            <div
                              key={video.id}
                              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                                video.isCompleted
                                  ? "text-green-700 bg-green-50"
                                  : "text-foreground hover:bg-muted"
                              }`}
                              onClick={() => handleVideoClick(video, week)}
                            >
                              <div className="w-4 h-4 flex-shrink-0">
                                {video.isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Video className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {video.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {video.duration}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tests */}
                      <div>
                        <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                          Tests & Assessments
                        </h4>
                        <div className="space-y-1">
                          {week.assessments.map((test: any) => (
                            <div
                              key={test.id}
                              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                                test.isCompleted
                                  ? "text-green-700 bg-green-50"
                                  : "text-foreground hover:bg-muted"
                              }`}
                              onClick={() => handleTestClick(test)}
                            >
                              <div className="w-4 h-4 flex-shrink-0">
                                {test.isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <FileText className="w-4 h-4 text-orange-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {test.title}
                                </p>
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <span>{test.day}</span>
                                  <span>•</span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs h-4"
                                  >
                                    {test.difficulty}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Content Display */}
      <div className="flex-1 bg-background">
        {selectedContent && (
          <div className="h-full flex flex-col">
            {/* Content Header */}
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedContent.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedContent.week}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedContent.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>Views: {selectedContent.views || 0}</span>
                  </div>
                  {selectedContent.isCompleted && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Video Player Area */}
            <div className="flex-1 p-6">
              <div className="w-full h-96 bg-black rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm opacity-75">
                    Click to play {selectedContent.title}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button className="mr-4">
                  {selectedContent.isCompleted ? "Rewatch" : "Mark as Complete"}
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resources
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedTest && (
          <div className="h-full flex flex-col">
            {/* Test Header */}
            <div className="border-b border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {selectedTest.title}
              </h2>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="attempt">Attempt History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <p className="font-bold text-lg">
                            {selectedTest.duration || "30 min"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <p className="font-bold text-lg">
                            {selectedTest.questions || "20"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Questions
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                          <p className="font-bold text-lg">
                            {selectedTest.marks || "100"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Marks
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="attempt" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                          <p className="font-bold">
                            {selectedTest.score || "--"}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Current Score
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Award className="w-6 h-6 mx-auto mb-2 text-green-600" />
                          <p className="font-bold">
                            {selectedTest.topScore || "--"}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Top Score
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                          <p className="font-bold">
                            {selectedTest.avgScore || "--"}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Average
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Calendar className="w-6 h-6 mx-auto mb-2 text-red-600" />
                          <p className="font-bold">
                            {selectedTest.attempts || 0}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Attempts
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedTest.isCompleted && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 font-medium">
                          Test Completed
                        </p>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Last attempt: {selectedTest.lastAttempt || "N/A"} | IP:{" "}
                        {selectedTest.ip || "N/A"}
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Test Actions */}
            <div className="p-6 border-t border-border">
              {isTestAccessible(selectedTest) ? (
                <Button size="lg" className="mr-4">
                  {selectedTest.isCompleted ? "Retake Test" : "Take Test"}
                </Button>
              ) : (
                <div className="flex items-center space-x-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  <span>Test not accessible at this time</span>
                </div>
              )}

              <Button variant="outline" size="lg">
                View Instructions
              </Button>
            </div>
          </div>
        )}

        {!selectedContent && !selectedTest && (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select Content to Begin
              </h3>
              <p className="text-muted-foreground">
                Choose a video or test from the sidebar to start learning
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
