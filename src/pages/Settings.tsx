import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/hooks/use-language";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useToast } from "@/components/ui/use-toast";
import { Shield, User, Bell, GraduationCap, Palette } from "lucide-react";

export default function Settings() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // مثال لبيانات المستخدم، ستعتمد على بيانات Supabase الفعلية لاحقاً
  const [profile, setProfile] = useState({
    name: "محمد أحمد",
    email: "example@mail.com",
    username: "mohammed123",
    bio: "مطور ويب متحمس ومتعلم دائم",
    newPassword: "",
    confirmPassword: "",
  });
  
  // إعدادات الإشعارات
  const [notifications, setNotifications] = useState({
    email: true,
    challenges: true,
    courses: true,
    achievements: true,
    system: false,
  });

  // إعدادات الخصوصية
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showActivities: true,
    showAchievements: true,
  });

  // معالجة تحديث الملف الشخصي
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // هنا سيتم إرسال البيانات إلى Supabase لاحقاً
    setTimeout(() => {
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم حفظ التغييرات بنجاح",
      });
      setIsLoading(false);
    }, 1000);
  };

  // معالجة تغيير كلمة المرور
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    // هنا سيتم تحديث كلمة المرور في Supabase لاحقاً
    setTimeout(() => {
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تحديث كلمة المرور بنجاح",
      });
      setProfile({
        ...profile,
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    }, 1000);
  };

  // معالجة تغيير إعدادات الإشعارات
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({
      ...notifications,
      [key]: value
    });
    
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم حفظ إعدادات الإشعارات الخاصة بك",
    });
  };

  // معالجة تغيير إعدادات الخصوصية
  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy({
      ...privacy,
      [key]: value
    });
    
    toast({
      title: "تم تحديث الخصوصية",
      description: "تم حفظ إعدادات الخصوصية الخاصة بك",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('settings')}</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />{t('profile')}
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />{t('security')}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />{t('notifications')}
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />{t('preferences')}
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />{t('learning')}
              </TabsTrigger>
            </TabsList>

            {/* الملف الشخصي */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>{t('profileSettings')}</CardTitle>
                  <CardDescription>
                    {t('profileSettingsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('fullName')}</Label>
                        <Input 
                          id="name" 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">{t('username')}</Label>
                        <Input 
                          id="username" 
                          value={profile.username}
                          onChange={(e) => setProfile({...profile, username: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">{t('bio')}</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? t('saving') : t('saveChanges')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* الأمان */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>{t('securitySettings')}</CardTitle>
                  <CardDescription>
                    {t('securitySettingsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange}>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">{t('currentPassword')}</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">{t('newPassword')}</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={profile.newPassword}
                          onChange={(e) => setProfile({...profile, newPassword: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={profile.confirmPassword}
                          onChange={(e) => setProfile({...profile, confirmPassword: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? t('updating') : t('updatePassword')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* الإشعارات */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>{t('notificationSettings')}</CardTitle>
                  <CardDescription>
                    {t('notificationSettingsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('emailNotifications')}</Label>
                        <p className="text-sm text-muted-foreground">{t('emailNotificationsDescription')}</p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange('email', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('challengeNotifications')}</Label>
                        <p className="text-sm text-muted-foreground">{t('challengeNotificationsDescription')}</p>
                      </div>
                      <Switch 
                        checked={notifications.challenges}
                        onCheckedChange={(value) => handleNotificationChange('challenges', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('courseNotifications')}</Label>
                        <p className="text-sm text-muted-foreground">{t('courseNotificationsDescription')}</p>
                      </div>
                      <Switch 
                        checked={notifications.courses}
                        onCheckedChange={(value) => handleNotificationChange('courses', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('achievementNotifications')}</Label>
                        <p className="text-sm text-muted-foreground">{t('achievementNotificationsDescription')}</p>
                      </div>
                      <Switch 
                        checked={notifications.achievements}
                        onCheckedChange={(value) => handleNotificationChange('achievements', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('systemNotifications')}</Label>
                        <p className="text-sm text-muted-foreground">{t('systemNotificationsDescription')}</p>
                      </div>
                      <Switch 
                        checked={notifications.system}
                        onCheckedChange={(value) => handleNotificationChange('system', value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* التفضيلات */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>{t('preferenceSettings')}</CardTitle>
                  <CardDescription>
                    {t('preferenceSettingsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('theme')}</Label>
                        <p className="text-sm text-muted-foreground">{t('themeDescription')}</p>
                      </div>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('language')}</Label>
                        <p className="text-sm text-muted-foreground">{t('languageDescription')}</p>
                      </div>
                      <LanguageToggle />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('profileVisibility')}</Label>
                        <p className="text-sm text-muted-foreground">{t('profileVisibilityDescription')}</p>
                      </div>
                      <Switch 
                        checked={privacy.profileVisibility}
                        onCheckedChange={(value) => handlePrivacyChange('profileVisibility', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('showActivities')}</Label>
                        <p className="text-sm text-muted-foreground">{t('showActivitiesDescription')}</p>
                      </div>
                      <Switch 
                        checked={privacy.showActivities}
                        onCheckedChange={(value) => handlePrivacyChange('showActivities', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('showAchievements')}</Label>
                        <p className="text-sm text-muted-foreground">{t('showAchievementsDescription')}</p>
                      </div>
                      <Switch 
                        checked={privacy.showAchievements}
                        onCheckedChange={(value) => handlePrivacyChange('showAchievements', value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* التعلم */}
            <TabsContent value="learning">
              <Card>
                <CardHeader>
                  <CardTitle>{t('learningSettings')}</CardTitle>
                  <CardDescription>
                    {t('learningSettingsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('codingLanguagePreference')}</Label>
                        <p className="text-sm text-muted-foreground">{t('codingLanguagePreferenceDescription')}</p>
                      </div>
                      <select className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2">
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="php">PHP</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('difficultyLevel')}</Label>
                        <p className="text-sm text-muted-foreground">{t('difficultyLevelDescription')}</p>
                      </div>
                      <select className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2">
                        <option value="beginner">{t('beginner')}</option>
                        <option value="intermediate">{t('intermediate')}</option>
                        <option value="advanced">{t('advanced')}</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('learningGoals')}</Label>
                        <p className="text-sm text-muted-foreground">{t('learningGoalsDescription')}</p>
                      </div>
                      <select className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2">
                        <option value="career">{t('careerDevelopment')}</option>
                        <option value="hobby">{t('personalInterest')}</option>
                        <option value="academic">{t('academicRequirements')}</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast({
                    title: t('settingsSaved'),
                    description: t('learningPreferencesSaved')
                  })}>
                    {t('savePreferences')}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
