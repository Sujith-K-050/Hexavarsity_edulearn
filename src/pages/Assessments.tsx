import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Filter,
  FileText,
  Clock,
  Star,
  Trophy,
  Play,
  CheckCircle,
  Wifi,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Assessments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [internetCheck, setInternetCheck] = useState(false);
  const { toast } = useToast();

  const assessments = [
    {
      id: 1,
      title: "React Fundamentals Quiz",
      description: "Test your knowledge of React basics including components, props, and state",
      category: "React",
      difficulty: "Easy",
      duration: "30 min",
      questions: 20,
      status: "not-started",
      progress: 0,
      tags: ["React", "Frontend", "Components"],
      attempts: 0,
      maxAttempts: 3,
      negativeMarking: true
    },
    {
      id: 2,
      title: "JavaScript Advanced Concepts",
      description: "Advanced JavaScript concepts including closures, prototypes, and async programming",
      category: "JavaScript",
      difficulty: "Hard",
      duration: "45 min",
      questions: 25,
      status: "in-progress",
      progress: 60,
      tags: ["JavaScript", "Advanced", "Programming"],
      attempts: 1,
      maxAttempts: 2,
      negativeMarking: true,
      lastScore: 75
    },
    {
      id: 3,
      title: "CSS Grid and Flexbox",
      description: "Master modern CSS layout techniques with Grid and Flexbox",
      category: "CSS",
      difficulty: "Medium",
      duration: "25 min",
      questions: 15,
      status: "completed",
      progress: 100,
      tags: ["CSS", "Layout", "Design"],
      attempts: 2,
      maxAttempts: 3,
      negativeMarking: false,
      lastScore: 92,
      bestScore: 92
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description: "Test your understanding of Node.js server-side development",
      category: "Backend",
      difficulty: "Medium",
      duration: "40 min",
      questions: 30,
      status: "not-started",
      progress: 0,
      tags: ["Node.js", "Backend", "API"],
      attempts: 0,
      maxAttempts: 2,
      negativeMarking: true
    },
    {
      id: 5,
      title: "Database Design & SQL",
      description: "Comprehensive test on database design principles and SQL queries",
      category: "Database",
      difficulty: "Hard",
      duration: "50 min",
      questions: 35,
      status: "not-started",
      progress: 0,
      tags: ["SQL", "Database", "Design"],
      attempts: 0,
      maxAttempts: 1,
      negativeMarking: true
    },
    {
      id: 6,
      title: "Python Data Structures",
      description: "Test your knowledge of Python data structures and algorithms",
      category: "Python",
      difficulty: "Easy",
      duration: "35 min",
      questions: 22,
      status: "completed",
      progress: 100,
      tags: ["Python", "Data Structures", "Algorithms"],
      attempts: 1,
      maxAttempts: 3,
      negativeMarking: false,
      lastScore: 88,
      bestScore: 88
    }
  ];

  const categories = ["all", ...Array.from(new Set(assessments.map(a => a.category)))];
  const difficulties = ["all", "Easy", "Medium", "Hard"];
  const statuses = ["all", "not-started", "in-progress", "completed"];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || assessment.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || assessment.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === "all" || assessment.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const checkInternetSpeed = () => {
    // Simulate internet speed check
    setTimeout(() => {
      setInternetCheck(true);
      toast({
        title: "Connection Check",
        description: "Your internet connection is stable and ready for testing!",
      });
    }, 1000);
  };

  const handleStartTest = (assessmentId: number) => {
    if (!agreedToTerms || !internetCheck) {
      toast({
        title: "Requirements Not Met",
        description: "Please agree to terms and check your internet connection.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Starting Assessment",
      description: "Redirecting to test interface...",
    });

    // Simulate navigation to test interface
    setTimeout(() => {
      window.location.href = `/test/${assessmentId}`;
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Assessments
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge and track your progress with our comprehensive assessments
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            <select 
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === "all" ? "All Difficulties" : difficulty}
                </option>
              ))}
            </select>

            <select 
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assessment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {assessments.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {assessments.filter(a => a.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {assessments.filter(a => a.status === "in-progress").length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(assessments.filter(a => a.lastScore).reduce((acc, a) => acc + (a.lastScore || 0), 0) / assessments.filter(a => a.lastScore).length) || 0}%
                </div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getDifficultyColor(assessment.difficulty)}>
                    {assessment.difficulty}
                  </Badge>
                  <Badge className={getStatusColor(assessment.status)}>
                    {assessment.status === "not-started" ? "Not Started" : 
                     assessment.status === "in-progress" ? "In Progress" : "Completed"}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                  {assessment.title}
                </CardTitle>
                <CardDescription>
                  {assessment.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {assessment.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Assessment Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{assessment.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{assessment.questions} questions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>{assessment.attempts}/{assessment.maxAttempts} attempts</span>
                  </div>
                  {assessment.lastScore && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{assessment.lastScore}% score</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {assessment.status !== "not-started" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{assessment.progress}%</span>
                    </div>
                    <Progress value={assessment.progress} className="w-full" />
                  </div>
                )}

                {/* Negative Marking Warning */}
                {assessment.negativeMarking && (
                  <div className="flex items-center space-x-1 text-orange-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>Negative marking applicable</span>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        variant={assessment.status === "completed" ? "outline" : "default"}
                        disabled={assessment.attempts >= assessment.maxAttempts && assessment.status === "completed"}
                      >
                        {assessment.status === "not-started" 
                          ? "Take Test" 
                          : assessment.status === "completed" 
                          ? (assessment.attempts >= assessment.maxAttempts ? "No Attempts Left" : "Retake Test")
                          : "Continue Test"
                        }
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{assessment.title}</DialogTitle>
                        <DialogDescription>
                          Please review the test details and confirm you're ready to begin.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Duration:</span> {assessment.duration}
                          </div>
                          <div>
                            <span className="font-medium">Questions:</span> {assessment.questions}
                          </div>
                          <div>
                            <span className="font-medium">Difficulty:</span> {assessment.difficulty}
                          </div>
                          <div>
                            <span className="font-medium">Attempts Left:</span> {assessment.maxAttempts - assessment.attempts}
                          </div>
                        </div>

                        {assessment.negativeMarking && (
                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-sm text-orange-800">
                              <strong>Note:</strong> This assessment has negative marking. Incorrect answers will deduct points.
                            </p>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="terms" 
                              checked={agreedToTerms}
                              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                            />
                            <label htmlFor="terms" className="text-sm">
                              ✅ I agree to not switch tabs or use unfair means during the test
                            </label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="internet" 
                              checked={internetCheck}
                              onCheckedChange={() => {}}
                            />
                            <label htmlFor="internet" className="text-sm flex items-center">
                              <Wifi className="w-4 h-4 mr-1" />
                              ✅ I have good internet connection
                            </label>
                            {!internetCheck && (
                              <Button variant="outline" size="sm" onClick={checkInternetSpeed}>
                                Check Speed
                              </Button>
                            )}
                          </div>
                        </div>

                        <Button 
                          className="w-full" 
                          size="lg"
                          disabled={!agreedToTerms || !internetCheck}
                          onClick={() => handleStartTest(assessment.id)}
                        >
                          Start Test
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No assessments found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};