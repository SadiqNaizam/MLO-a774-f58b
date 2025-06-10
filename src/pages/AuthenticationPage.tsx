import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, User, LogIn, UserPlus, AlertCircle, Github } from 'lucide-react'; // Added Github icon
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type LoginFormInputs = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type RegisterFormInputs = z.infer<typeof registerSchema>;


const AuthenticationPage = () => {
  console.log('AuthenticationPage loaded');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "user@example.com", password: "password123" }, // Default credentials
  });

  const registerForm = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    setError(null);
    console.log('Login attempt:', data);
    // Simulate API call
    if (data.email === "user@example.com" && data.password === "password123") {
      toast.success("Login successful! Welcome back.");
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError("Invalid email or password. Please try again.");
      toast.error("Login Failed: Invalid email or password.");
    }
  };

  const onRegisterSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setError(null);
    console.log('Registration attempt:', data);
    // Simulate API call
    toast.success("Registration successful! Welcome aboard.");
    setTimeout(() => {
        setActiveTab("login"); // Switch to login tab after registration
        loginForm.setValue("email", data.email); // Pre-fill email for convenience
        loginForm.setValue("password", ""); // Clear password field
    }, 1000);
  };
  
  const handleSocialLogin = (provider: string) => {
    setError(null);
    console.log(`Attempting ${provider} login...`);
    toast.info(`Connecting with ${provider}... (Not implemented)`);
    // In a real app, this would redirect to an OAuth flow.
    // For now, let's simulate success and redirect to dashboard
    setTimeout(() => {
        toast.success(`Successfully signed in with ${provider}!`);
        navigate('/dashboard');
    }, 1500);
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png" alt="Lovable Clones Logo" className="mx-auto h-16 w-16 mb-2" />
          <CardTitle className="text-2xl font-bold text-pink-600">Welcome to Lovable Clones!</CardTitle>
          <CardDescription>
            {activeTab === "login" ? "Sign in to continue your journey." : "Create an account to start designing."}
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login"><LogIn className="mr-2 h-4 w-4"/>Login</TabsTrigger>
            <TabsTrigger value="register"><UserPlus className="mr-2 h-4 w-4"/>Register</TabsTrigger>
          </TabsList>
          {error && (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="login-email" type="email" placeholder="user@example.com" {...loginForm.register("email")} className="pl-10" />
                  </div>
                  {loginForm.formState.errors.email && <p className="text-xs text-red-500">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                   <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="login-password" type="password" placeholder="••••••••" {...loginForm.register("password")} className="pl-10" />
                  </div>
                  {loginForm.formState.errors.password && <p className="text-xs text-red-500">{loginForm.formState.errors.password.message}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
                 <Button variant="link" size="sm" className="text-xs text-gray-600 hover:text-pink-500" onClick={() => toast.info("Forgot password? This feature is coming soon!")}>
                  Forgot password?
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="reg-username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="reg-username" placeholder="YourCoolUsername" {...registerForm.register("username")} className="pl-10"/>
                  </div>
                   {registerForm.formState.errors.username && <p className="text-xs text-red-500">{registerForm.formState.errors.username.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="reg-email" type="email" placeholder="me@example.com" {...registerForm.register("email")} className="pl-10"/>
                  </div>
                  {registerForm.formState.errors.email && <p className="text-xs text-red-500">{registerForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="reg-password" type="password" placeholder="••••••••" {...registerForm.register("password")} className="pl-10"/>
                  </div>
                  {registerForm.formState.errors.password && <p className="text-xs text-red-500">{registerForm.formState.errors.password.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-confirmPassword">Confirm Password</Label>
                   <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="reg-confirmPassword" type="password" placeholder="••••••••" {...registerForm.register("confirmPassword")} className="pl-10"/>
                  </div>
                  {registerForm.formState.errors.confirmPassword && <p className="text-xs text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white" disabled={registerForm.formState.isSubmitting}>
                  {registerForm.formState.isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
        <div className="px-6 pb-6">
            <Separator className="my-4" />
            <p className="text-center text-xs text-gray-500 mb-3">Or sign in with</p>
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('GitHub')}>
                <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            {/* Add other social login buttons here */}
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationPage;