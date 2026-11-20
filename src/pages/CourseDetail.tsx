import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Loader2, Clock, Users, Star, PlayCircle, Download, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  image_url: string | null;
  category: string;
  created_at: string;
}

interface Enrollment {
  id: string;
  progress: number;
}

const CourseDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Fetch course and enrollment data
  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
      try {
        // Get course details
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();
          
        if (courseError) throw courseError;
        setCourse(courseData);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Check if user is enrolled
          const { data: enrollmentData, error: enrollmentError } = await supabase
            .from("enrollments")
            .select("*")
            .eq("course_id", id)
            .eq("user_id", session.user.id)
            .maybeSingle();
            
          if (!enrollmentError && enrollmentData) {
            setEnrollment(enrollmentData);
          }
        }
      } catch (error: any) {
        console.error("Error fetching course:", error.message);
        toast({
          title: t("errorFetchingCourse"),
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseAndEnrollment();
  }, [id, t, toast]);
  
  // Handle enrollment
  const handleEnroll = async () => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Redirect to login if not authenticated
        toast({
          title: t("loginRequired"),
          description: t("pleaseLoginToEnroll"),
        });
        navigate("/auth");
        return;
      }
      
      setEnrolling(true);
      
      // Create enrollment
      const { data, error } = await supabase
        .from("enrollments")
        .insert({
          user_id: session.user.id,
          course_id: id,
          progress: 0,
          completed_modules: [],
          current_module: 0,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setEnrollment(data);
      
      toast({
        title: t("enrollmentSuccess"),
        description: t("youAreNowEnrolled"),
      });
    } catch (error: any) {
      console.error("Error enrolling:", error.message);
      toast({
        title: t("enrollmentFailed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  };
  
  // Mock data for curriculum
  const curriculum = [
    { title: "Introduction to the Course", duration: "10:30", type: "video" },
    { title: "Setting Up Your Environment", duration: "15:45", type: "video" },
    { title: "Core Concepts Explained", duration: "20:15", type: "video" },
    { title: "Practice Exercise 1", type: "exercise" },
    { title: "Advanced Techniques", duration: "25:00", type: "video" },
    { title: "Course Resources", type: "document" },
  ];
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p>{t("loadingCourse")}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{t("courseNotFound")}</CardTitle>
              <CardDescription>{t("courseNotFoundDescription")}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/courses")} className="w-full">
                {t("backToCourses")}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Course Info */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-gray-300">{course.description}</p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span>8 {t("hours")}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span>1,240+ {t("students")}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-2" />
                    <span>4.8 (240 {t("ratings")})</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&auto=format&fit=crop&q=80"
                    alt={course.instructor}
                    className="h-10 w-10 rounded-full mr-3" 
                  />
                  <span>{course.instructor}</span>
                </div>
                
                {enrollment ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{t("yourProgress")}</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/course/${id}/lessons`)}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      {enrollment.progress > 0 ? t("continueLearning") : t("startLearning")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-3xl font-bold">
                      {course.price === 0 
                        ? t("free") 
                        : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(course.price)}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("enrolling")}
                        </>
                      ) : (
                        t("enrollNow")
                      )}
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Course Image */}
              <div className="relative h-64 lg:h-auto rounded-lg overflow-hidden">
                <img 
                  src={course.image_url || "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent">
              <TabsTrigger 
                value="overview" 
                className={`rounded-none border-b-2 py-2 px-4 ${
                  activeTab === 'overview' 
                    ? 'border-primary' 
                    : 'border-transparent'
                }`}
              >
                {t("overview")}
              </TabsTrigger>
              <TabsTrigger 
                value="curriculum" 
                className={`rounded-none border-b-2 py-2 px-4 ${
                  activeTab === 'curriculum' 
                    ? 'border-primary' 
                    : 'border-transparent'
                }`}
              >
                {t("curriculum")}
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className={`rounded-none border-b-2 py-2 px-4 ${
                  activeTab === 'reviews' 
                    ? 'border-primary' 
                    : 'border-transparent'
                }`}
              >
                {t("reviews")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{t("aboutCourse")}</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {course.description}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{t("whatYouWillLearn")}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                          <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{t("learnSkill1")}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                          <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{t("learnSkill2")}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                          <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{t("learnSkill3")}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                          <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{t("learnSkill4")}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{t("requirements")}</h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                      <li>{t("requirement1")}</li>
                      <li>{t("requirement2")}</li>
                      <li>{t("requirement3")}</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("courseIncludes")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <PlayCircle className="mr-3 h-5 w-5 text-gray-500" />
                        <span>8 {t("hoursOnDemandVideo")}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="mr-3 h-5 w-5 text-gray-500" />
                        <span>15 {t("downloadableResources")}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="mr-3 h-5 w-5 text-gray-500" />
                        <span>{t("fullLifetimeAccess")}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-0">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{t("courseCurriculum")}</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("curriculumDescription")}
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t("section1")}: {t("gettingStarted")}</h3>
                  <div className="space-y-2">
                    {curriculum.map((item, index) => (
                      <div 
                        key={index} 
                        className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          {item.type === "video" ? (
                            <PlayCircle className="h-5 w-5 text-blue-500 mr-3" />
                          ) : item.type === "document" ? (
                            <Download className="h-5 w-5 text-green-500 mr-3" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-orange-500 mr-3" />
                          )}
                          <span>{item.title}</span>
                        </div>
                        {item.duration && <span className="text-sm text-gray-500">{item.duration}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{t("studentReviews")}</h2>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">4.8</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">(240 {t("ratings")})</div>
                </div>
                
                <div className="border-t pt-6 space-y-6">
                  {/* Review 1 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">Sarah J.</div>
                          <div className="text-sm text-gray-500">3 {t("daysAgo")}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className={`w-4 h-4 ${i <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("reviewText1")}
                    </p>
                  </div>
                  
                  {/* Review 2 */}
                  <div className="space-y-3 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">Michael T.</div>
                          <div className="text-sm text-gray-500">1 {t("weekAgo")}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("reviewText2")}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
