import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Trophy, Medal, Award, Crown, Star } from "lucide-react";

export const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all-time");

  const leaderboardData = [
    {
      rank: 1,
      name: "Sowmiya Ramamoorthy",
      avatar: "",
      score: 2450,
      courseCompletion: 95,
      assessmentScore: 92,
      badge: "Gold",
      course: "React Development",
      department: "Engineering",
    },
    {
      rank: 2,
      name: "Sudha G",
      avatar: "",
      score: 2380,
      courseCompletion: 88,
      assessmentScore: 90,
      badge: "Silver",
      course: "Full Stack Development",
      department: "Engineering",
    },
    {
      rank: 3,
      name: "Shyamala Lakshmi",
      avatar: "",
      score: 2320,
      courseCompletion: 92,
      assessmentScore: 87,
      badge: "Bronze",
      course: "Frontend Development",
      department: "Design",
    },
    {
      rank: 4,
      name: "Robert Kim",
      avatar: "photo-1472099645785-5658abf4ff4e",
      score: 2180,
      courseCompletion: 85,
      assessmentScore: 89,
      badge: "Merit",
      course: "Backend Development",
      department: "Engineering",
    },
    {
      rank: 5,
      name: "Lisa Wang",
      avatar: "photo-1517841905240-472988babdf9",
      score: 2150,
      courseCompletion: 90,
      assessmentScore: 84,
      badge: "Merit",
      course: "Data Science",
      department: "Analytics",
    },
    {
      rank: 6,
      name: "Alex Thompson",
      avatar: "photo-1500648767791-00dcc994a43e",
      score: 2100,
      courseCompletion: 82,
      assessmentScore: 88,
      badge: "Merit",
      course: "UI/UX Design",
      department: "Design",
    },
    {
      rank: 7,
      name: "Jennifer Lee",
      avatar: "photo-1487412720507-e7ab37603c6f",
      score: 2050,
      courseCompletion: 78,
      assessmentScore: 91,
      badge: "Merit",
      course: "Mobile Development",
      department: "Engineering",
    },
    {
      rank: 8,
      name: "David Brown",
      avatar: "photo-1519244703995-f4e0f30006d5",
      score: 2000,
      courseCompletion: 80,
      assessmentScore: 85,
      badge: "Participant",
      course: "DevOps",
      department: "Operations",
    },
    {
      rank: 9,
      name: "Maria Garcia",
      avatar: "photo-1506794778202-cad84cf45f1d",
      score: 1950,
      courseCompletion: 75,
      assessmentScore: 87,
      badge: "Participant",
      course: "Machine Learning",
      department: "Analytics",
    },
    {
      rank: 10,
      name: "James Wilson",
      avatar: "photo-1507003211169-0a1dd7228f2d",
      score: 1900,
      courseCompletion: 73,
      assessmentScore: 83,
      badge: "Participant",
      course: "Cloud Computing",
      department: "Engineering",
    },
  ];

  const courses = [
    "all",
    ...Array.from(new Set(leaderboardData.map((student) => student.course))),
  ];
  const timeframes = [
    { value: "all-time", label: "All Time" },
    { value: "this-month", label: "This Month" },
    { value: "this-week", label: "This Week" },
  ];

  const filteredData = leaderboardData.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const topThree = filteredData.slice(0, 3);
  const remaining = filteredData.slice(3);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Bronze":
        return "bg-orange-100 text-orange-800";
      case "Merit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Gold":
        return <Crown className="w-4 h-4" />;
      case "Silver":
        return <Medal className="w-4 h-4" />;
      case "Bronze":
        return <Award className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2 flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-primary" />
            <span>Leaderboard</span>
          </h1>
          <p className="text-muted-foreground">
            Celebrate achievements and see how you rank among your peers
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course === "all" ? "All Courses" : course}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              {timeframes.map((timeframe) => (
                <option key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">
            🏆 Top Performers
          </h2>

          <div className="flex justify-center items-end space-x-8 mb-8">
            {/* Second Place */}
            {topThree[1] && (
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-24 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Avatar className="w-16 h-16 border-4 border-gray-400">
                      <AvatarImage
                        src={`https://images.unsplash.com/${topThree[1].avatar}?auto=format&fit=crop&w=100&h=100`}
                      />
                      <AvatarFallback>
                        {topThree[1].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">
                  {topThree[1].name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {topThree[1].course}
                </p>
                <p className="font-bold text-lg text-gray-600">
                  {topThree[1].score} pts
                </p>
                <Badge className="mt-1 bg-gray-100 text-gray-800">
                  <Medal className="w-3 h-3 mr-1" />
                  Silver
                </Badge>
              </div>
            )}

            {/* First Place */}
            {topThree[0] && (
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-32 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Avatar className="w-20 h-20 border-4 border-yellow-400">
                      <AvatarImage
                        src={`https://images.unsplash.com/${topThree[0].avatar}?auto=format&fit=crop&w=100&h=100`}
                      />
                      <AvatarFallback>
                        {topThree[0].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Crown className="w-6 h-6 text-yellow-500 absolute -top-2 left-1/2 transform -translate-x-1/2" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">
                  {topThree[0].name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {topThree[0].course}
                </p>
                <p className="font-bold text-xl text-yellow-600">
                  {topThree[0].score} pts
                </p>
                <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                  <Crown className="w-3 h-3 mr-1" />
                  Gold
                </Badge>
              </div>
            )}

            {/* Third Place */}
            {topThree[2] && (
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg flex items-end justify-center pb-2">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Avatar className="w-14 h-14 border-4 border-orange-400">
                      <AvatarImage
                        src={`https://images.unsplash.com/${topThree[2].avatar}?auto=format&fit=crop&w=100&h=100`}
                      />
                      <AvatarFallback>
                        {topThree[2].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">
                  {topThree[2].name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {topThree[2].course}
                </p>
                <p className="font-bold text-lg text-orange-600">
                  {topThree[2].score} pts
                </p>
                <Badge className="mt-1 bg-orange-100 text-orange-800">
                  <Award className="w-3 h-3 mr-1" />
                  Bronze
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Remaining Rankings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span>Complete Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {remaining.map((student) => (
                <div
                  key={student.rank}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankStyle(
                        student.rank
                      )}`}
                    >
                      {student.rank}
                    </div>

                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={`https://images.unsplash.com/${student.avatar}?auto=format&fit=crop&w=100&h=100`}
                      />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        {student.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {student.course}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Completion
                      </p>
                      <p className="font-bold text-foreground">
                        {student.courseCompletion}%
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                      <p className="font-bold text-foreground">
                        {student.assessmentScore}%
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Total Points
                      </p>
                      <p className="font-bold text-lg text-primary">
                        {student.score}
                      </p>
                    </div>

                    <Badge className={getBadgeColor(student.badge)}>
                      {getBadgeIcon(student.badge)}
                      <span className="ml-1">{student.badge}</span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No students found
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
