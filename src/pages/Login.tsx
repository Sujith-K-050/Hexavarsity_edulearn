import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen, Mail, Lock, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import learningHero from "@/assets/learning-hero.jpg";
import { Description } from "@radix-ui/react-toast";

export const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // State
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Simulated user DB
  const existingUsers = useRef<string[]>([
    "john@example.com",
    "sarah@example.com",
    "mike@example.com",
    "admin@edulearn.com",
  ]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    var emailExists = existingUsers.current.includes(email.toLowerCase());
    // Connect and check DB here

    if (emailExists) {
      setMode("login");
      setEmailConfirmed(true);
    } else {
      existingUsers.current.push(email.toLowerCase());
      toast({
        title: "Email not Present",
        description: "Enter details to become a new User. ",
      });
      setMode("signup");
      setEmailConfirmed(true);
    }
  };

  const handleChangeEmail = () => {
    setEmail("");
    setEmailConfirmed(false);
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setErrors({});
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    // Connect and check DB here

    if (Object.keys(newErrors).length === 0) {
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to dashboard...",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Minimum 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      var emailExists = existingUsers.current.includes(email.toLowerCase());
      // check email in db

      if (emailExists) {
        toast({
          title: "Email already registred",
          description: "Please login in (or) use 'Forget Password' option",
        });

        setTimeout(() => {
          setMode("login");
          setEmailConfirmed(true);
          setEmail(email);
          setPassword("");
          setConfirmPassword("");
          setFullName("");
          setErrors({});
        }, 1500);
      } else {
        toast({
          title: "Account Created",
          description: "Welcome to EduLearn! Redirecting to login...",
        });

        setTimeout(() => {
          setMode("login");
          setEmailConfirmed(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFullName("");
          setErrors({});
          navigate("/dashboard");
        }, 1500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={learningHero}
          alt="Students learning together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Join the Learning Revolution
            </h2>
            <p className="text-xl opacity-90">
              Connect with thousands of learners and accelerate your career
              growth
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-heading font-bold text-3xl text-foreground">
                EduLearn
              </h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Your journey to knowledge starts here
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <Button
              variant={mode === "login" ? "default" : "outline"}
              onClick={() => {
                setMode("login");
                setEmailConfirmed(false);
              }}
              className="mr-2"
            >
              Login
            </Button>
            <Button
              variant={mode === "signup" ? "default" : "outline"}
              onClick={() => {
                setMode("signup");
                setEmailConfirmed(true);
              }}
            >
              Signup
            </Button>
          </div>

          {/* Card */}
          <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-heading text-center">
                {emailConfirmed
                  ? mode === "signup"
                    ? "Create Account"
                    : "Welcome Back"
                  : "Let's Begin"}
              </CardTitle>
              <CardDescription className="text-center">
                {emailConfirmed
                  ? mode === "signup"
                    ? "Join thousands of learners worldwide"
                    : "Sign in to continue your journey"
                  : "Enter your login ID to continue"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={mode === "signup" ? handleSignup : handleLogin}
                className="space-y-4"
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Login ID (Email)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 ${emailConfirmed ? "pr-20" : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={emailConfirmed && mode === "login"}
                    />
                    {emailConfirmed && mode === "login" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-primary hover:bg-transparent"
                        onClick={handleChangeEmail}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Change
                      </Button>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Next Button */}
                {!emailConfirmed && (
                  <Button type="button" className="w-full" onClick={handleNext}>
                    Next
                  </Button>
                )}

                {/* Conditional fields shown after confirming email */}
                {emailConfirmed && mode === "signup" && (
                  <>
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-sm text-destructive">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {emailConfirmed && (
                  <>
                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={
                            mode === "signup"
                              ? "Create a password"
                              : "Enter your password"
                          }
                          className="pl-10 pr-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    {mode === "signup" && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Submit */}
                    <Button type="submit" className="w-full">
                      {mode === "signup" ? "Create Account" : "Sign In"}
                    </Button>

                    {/* Forgot password */}
                    {mode === "login" && (
                      <div className="text-center">
                        <Link
                          to="/forgot-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
