import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Upload, Lock, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();

  const userData = {
    name: "Sujith Kannan",
    email: "sujithyadav050@gmail.com",
    tag: "Javamay25",
    branch: "Hexaware",
    batch: "Java B2 May 25",
    department: "Full Stack Developer",
    profilePicture: null,
    dateOfBirth: "01-01-2004",
    contactNumber: "+91 9344463530",
    address: "Royapettah, Chennai, Tamil Nadu, India",
    emergencyContact: "+91 9884474033",
    degree: "Bachelor of Technology",
    university: "SRM Easwari Engineering College",
    cgpa: "7.5",
    passingYear: "2025",
    resume: {
      filename: "sujith_kannan_resume.pdf",
      uploadDate: "2024-01-15",
    },
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.profilePicture || ""} />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{userData.branch}</Badge>
              <Badge variant="secondary">{userData.batch}</Badge>
              <Badge>{userData.department}</Badge>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="personal">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Personal Info
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />{" "}
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Date of Birth", value: userData.dateOfBirth },
                  { label: "Contact Number", value: userData.contactNumber },
                  { label: "Address", value: userData.address },
                  {
                    label: "Emergency Contact",
                    value: userData.emergencyContact,
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <Label>{label}</Label>
                    {isEditing ? (
                      <Input defaultValue={value} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="col-span-2 text-right">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Info */}
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.degree}
                  </p>
                </div>
                <div>
                  <Label>University</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.university}
                  </p>
                </div>
                <div>
                  <Label>CGPA</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.cgpa}
                  </p>
                </div>
                <div>
                  <Label>Passing Year</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.passingYear}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resume */}
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Uploaded File</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.resume.filename} (Uploaded on{" "}
                    {userData.resume.uploadDate})
                  </p>
                </div>
                <Button onClick={() => alert("Upload functionality soon")}>
                  <Upload className="w-4 h-4 mr-2" /> Upload New Resume
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Notifications</Label>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => alert("Change password soon")}
                >
                  <Lock className="w-4 h-4 mr-2" /> Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
