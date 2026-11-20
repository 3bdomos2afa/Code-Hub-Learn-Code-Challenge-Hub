import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Trophy, BookOpen, Code } from "lucide-react";

export default function Profile() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Sample user data - replace with Supabase data in a real implementation
  const user = {
    name: "محمد أحمد",
    username: "mohammed123",
    email: "example@mail.com",
    bio: "مطور ويب متحمس ومتعلم دائم",
    joinedDate: "2023-01-15",
    completedCourses: 5,
    completedChallenges: 12,
    points: 850,
    level: "متوسط",
    badges: ["مبتدئ البرمجة", "متحدي الأكواد", "متعلم نشط"],
    profileImage: "" // Empty for default avatar
  };

  const handleLogout = () => {
    // This would be replaced with actual Supabase auth.signOut() call
    toast({
      title: t("logoutSuccessful"),
      description: t("youHaveBeenLoggedOut"),
    });
    
    // Optionally redirect to home after logout
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('myProfile')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{t('email')}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">{t('bio')}</h3>
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">{t('memberSince')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full mt-6 flex items-center justify-center" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats and Achievements */}
            <div className="md:col-span-2 space-y-6">
              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('statistics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t('completedCourses')}</p>
                      <p className="text-2xl font-bold">{user.completedCourses}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <Code className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t('completedChallenges')}</p>
                      <p className="text-2xl font-bold">{user.completedChallenges}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <Trophy className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t('totalPoints')}</p>
                      <p className="text-2xl font-bold">{user.points}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                        <line x1="4" x2="4" y1="22" y2="15"></line>
                      </svg>
                      <p className="text-sm font-medium">{t('level')}</p>
                      <p className="text-2xl font-bold">{user.level}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('badges')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('recentActivity')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-background rounded-md">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">{t('completedChallenge')}: JavaScript Basics</p>
                        <p className="text-sm text-muted-foreground">3 {t('daysAgo')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background rounded-md">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-medium">{t('earnedBadge')}: React Master</p>
                        <p className="text-sm text-muted-foreground">1 {t('weekAgo')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background rounded-md">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div>
                        <p className="font-medium">{t('enrolledCourse')}: Advanced TypeScript</p>
                        <p className="text-sm text-muted-foreground">2 {t('weeksAgo')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
      }
