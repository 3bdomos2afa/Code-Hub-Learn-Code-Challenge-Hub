import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlayCircle, Lock, CheckCircle, Award, BookOpen, AlertTriangle } from "lucide-react";

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
  course_id: string | null;
  enrolled_at: string;
  progress: number | null;
  user_id: string | null;
  completed_modules: string[] | null;
  current_module: number | null;
  quiz_scores: Record<string, number> | Json | null;
}

interface Module {
  id: number;
  title: string;
  type: "video" | "quiz";
  duration?: string;
  content?: string;
  questions?: Question[];
  locked: boolean;
  completed: boolean;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const CourseLessons = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [showPassQuizDialog, setShowPassQuizDialog] = useState(false);
  const [showFailQuizDialog, setShowFailQuizDialog] = useState(false);
  
  useEffect(() => {
    fetchCourseAndEnrollment();
  }, [id]);

  useEffect(() => {
    if (enrollment) {
      generateModules();
    }
  }, [enrollment]);
  
  const fetchCourseAndEnrollment = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: t("loginRequired"),
          description: t("pleaseLoginToViewCourse"),
        });
        navigate("/auth");
        return;
      }
      
      // Get course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();
        
      if (courseError) throw courseError;
      setCourse(courseData);
      
      // Check if user is enrolled
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", id)
        .eq("user_id", session.user.id)
        .maybeSingle();
        
      if (enrollmentError) throw enrollmentError;
      
      if (!enrollmentData) {
        toast({
          title: t("enrollmentRequired"),
          description: t("pleaseEnrollInThisCourse"),
        });
        navigate(`/course/${id}`);
        return;
      }
      
      // Initialize enrollment with default values if needed
      const updatedEnrollment = {
        ...enrollmentData,
        completed_modules: enrollmentData?.completed_modules || [],
        current_module: enrollmentData?.current_module || 0,
        quiz_scores: enrollmentData?.quiz_scores || {},
      };
      
      setEnrollment(updatedEnrollment as Enrollment);
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
  
  const generateModules = () => {
    if (!enrollment) return;
    
    // Generate 10 modules for demo (5 video lessons + 1 quiz) * 2
    const generatedModules: Module[] = [];
    
    for (let i = 0; i < 2; i++) {
      // Add 5 video lessons
      for (let j = 1; j <= 5; j++) {
        const moduleId = i * 6 + j;
        const isCompleted = enrollment.completed_modules?.includes(moduleId.toString()) || false;
        const isLocked = moduleId > (enrollment.current_module + 1);
        
        generatedModules.push({
          id: moduleId,
          title: `${t("lesson")} ${moduleId}: ${t("videoLesson")}`,
          type: "video",
          duration: "10:00",
          content: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video URL
          locked: isLocked,
          completed: isCompleted,
        });
      }
      
      // Add a quiz after every 5 lessons
      const quizId = i * 6 + 6;
      const isQuizCompleted = enrollment.completed_modules?.includes(quizId.toString()) || false;
      const isQuizLocked = quizId > (enrollment.current_module + 1);
      
      generatedModules.push({
        id: quizId,
        title: `${t("quiz")} ${i + 1}`,
        type: "quiz",
        locked: isQuizLocked,
        completed: isQuizCompleted,
        questions: [
          {
            id: 1,
            text: "What is the main advantage of using React?",
            options: [
              "Server-side rendering only",
              "Component-based architecture",
              "Static typing",
              "SQL integration"
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            text: "Which hook is used for side effects in React?",
            options: [
              "useState",
              "useReducer",
              "useEffect",
              "useContext"
            ],
            correctAnswer: 2
          },
          {
            id: 3,
            text: "What does JSX stand for?",
            options: [
              "JavaScript XML",
              "JSON XML",
              "JavaScript Extension",
              "Java Syntax XML"
            ],
            correctAnswer: 0
          },
          {
            id: 4,
            text: "Which is NOT a React lifecycle method?",
            options: [
              "componentDidMount",
              "componentWillUpdate",
              "componentDidCatch",
              "componentForceUpdate"
            ],
            correctAnswer: 3
          },
          {
            id: 5,
            text: "What is the purpose of keys in React lists?",
            options: [
              "For styling elements",
              "For unique identification of elements",
              "For data encryption",
              "For database references"
            ],
            correctAnswer: 1
          }
        ]
      });
    }
    
    setModules(generatedModules);
    
    // Set active module to current module if not completed
    const currentModuleIndex = enrollment.current_module;
    if (currentModuleIndex < generatedModules.length) {
      setActiveModule(generatedModules[currentModuleIndex]);
    }
  };
  
  const handleModuleSelect = (module: Module) => {
    if (module.locked) {
      toast({
        title: t("moduleIsLocked"),
        description: t("completeAllPreviousModules"),
        variant: "destructive",
      });
      return;
    }
    
    setActiveModule(module);
    
    // Reset quiz state when selecting a module
    if (module.type === "quiz") {
      setSelectedAnswers([]);
      setQuizCompleted(false);
      setShowQuizResults(false);
    }
  };
  
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleQuizSubmit = () => {
    if (!activeModule || activeModule.type !== "quiz" || !activeModule.questions) return;
    
    // Check if all questions have been answered
    if (selectedAnswers.length !== activeModule.questions.length || 
        selectedAnswers.some(answer => answer === undefined)) {
      toast({
        title: t("incompleteQuiz"),
        description: t("pleaseAnswerAllQuestions"),
        variant: "destructive",
      });
      return;
    }
    
    // Calculate score
    let correctAnswers = 0;
    activeModule.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = (correctAnswers / activeModule.questions.length) * 100;
    setQuizScore(score);
    setQuizCompleted(true);
    setShowQuizResults(true);
    
    // Check if passed (minimum 70%)
    if (score >= 70) {
      setShowPassQuizDialog(true);
    } else {
      setShowFailQuizDialog(true);
    }
  };
  
  const handleCompleteModule = async () => {
    if (!activeModule || !enrollment) return;
    
    try {
      // Get current enrollment data
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const completedModules = Array.isArray(enrollment.completed_modules) 
        ? [...enrollment.completed_modules] 
        : [];
        
      if (!completedModules.includes(activeModule.id.toString())) {
        completedModules.push(activeModule.id.toString());
      }
      
      // Calculate next module
      const nextModuleIndex = modules.findIndex(m => m.id === activeModule.id) + 1;
      const currentModule = nextModuleIndex < modules.length ? nextModuleIndex : enrollment.current_module;
      
      // Calculate overall progress
      const progress = Math.round((completedModules.length / modules.length) * 100);
      
      // Update quiz scores if applicable
      let quizScores = (typeof enrollment.quiz_scores === 'object' && enrollment.quiz_scores !== null) 
        ? { ...enrollment.quiz_scores as Record<string, number> } 
        : {};
        
      if (activeModule.type === "quiz") {
        quizScores = {
          ...quizScores,
          [activeModule.id]: quizScore
        };
      }
      
      // Update enrollment in database
      const { error } = await supabase
        .from("enrollments")
        .update({
          completed_modules: completedModules,
          current_module: currentModule,
          progress: progress,
          quiz_scores: quizScores
        })
        .eq("id", enrollment.id);
        
      if (error) throw error;
      
      // Update local state
      setEnrollment({
        ...enrollment,
        completed_modules: completedModules,
        current_module: currentModule,
        progress: progress,
        quiz_scores: quizScores
      } as Enrollment);
      
      // Update modules
      generateModules();
      
      // Show toast notification
      toast({
        title: t("moduleCompleted"),
        description: nextModuleIndex < modules.length 
          ? t("nextModuleUnlocked")
          : t("courseCompleted"),
      });
      
      // Move to next module if available
      if (nextModuleIndex < modules.length) {
        setActiveModule(modules[nextModuleIndex]);
        
        // Reset quiz state
        setSelectedAnswers([]);
        setQuizCompleted(false);
        setShowQuizResults(false);
      }
      
      // Close dialogs
      setShowPassQuizDialog(false);
      setShowFailQuizDialog(false);
    } catch (error: any) {
      console.error("Error updating progress:", error.message);
      toast({
        title: t("errorUpdatingProgress"),
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleRetryQuiz = () => {
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setShowQuizResults(false);
    setShowFailQuizDialog(false);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-36 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!course || !enrollment) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{t("courseNotFound")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("courseNotFoundDescription")}</p>
              <Button className="w-full mt-4" onClick={() => navigate("/courses")}>
                {t("backToCourses")}
              </Button>
            </CardContent>
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
        {/* Course Header */}
        <div className="bg-gradient-to-b from-primary to-primary-600 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                <p className="text-primary-100 mt-2">{t("by")} {course.instructor}</p>
              </div>
              
              <div className="w-full md:w-auto">
                <Card className="w-full md:w-64">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{t("yourProgress")}</span>
                      <span className="font-medium">{enrollment.progress}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Module List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold mb-4">{t("courseModules")}</h2>
              
              <div className="space-y-2">
                {modules.map((module) => (
                  <Button
                    key={module.id}
                    variant={activeModule?.id === module.id ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto py-3 ${
                      module.locked ? "opacity-60" : ""
                    }`}
                    onClick={() => handleModuleSelect(module)}
                  >
                    <div className="mr-2">
                      {module.locked ? (
                        <Lock className="h-5 w-5" />
                      ) : module.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : module.type === "quiz" ? (
                        <Award className="h-5 w-5 text-amber-500" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{module.title}</span>
                      {module.type === "video" && module.duration && (
                        <span className="text-xs text-muted-foreground">{module.duration}</span>
                      )}
                      {module.type === "quiz" && (
                        <span className="text-xs text-muted-foreground">{t("requiredToProgress")}</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Module Content */}
            <div className="lg:col-span-3">
              {activeModule ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{activeModule.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {activeModule.type === "video" && (
                        <div className="aspect-video">
                          <iframe 
                            src={activeModule.content} 
                            className="w-full h-full border-0 rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={activeModule.title}
                          ></iframe>
                        </div>
                      )}
                      
                      {activeModule.type === "quiz" && (
                        <div className="space-y-8">
                          {!quizCompleted ? (
                            <>
                              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                                <div className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-3 mt-0.5" />
                                  <div>
                                    <h3 className="font-medium text-yellow-800 dark:text-yellow-400">{t("quizInstructions")}</h3>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                      {t("quizPassingScore")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            
                              {activeModule.questions?.map((question, qIndex) => (
                                <div key={question.id} className="border rounded-lg p-4">
                                  <h3 className="font-medium text-lg mb-4">
                                    {qIndex + 1}. {question.text}
                                  </h3>
                                  <div className="space-y-2">
                                    {question.options.map((option, oIndex) => (
                                      <div 
                                        key={oIndex}
                                        className={`
                                          p-3 rounded-lg border cursor-pointer transition-all
                                          ${selectedAnswers[qIndex] === oIndex 
                                            ? 'bg-primary/10 border-primary' 
                                            : 'hover:bg-secondary'
                                          }
                                        `}
                                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                                      >
                                        <div className="flex items-center">
                                          <div className={`
                                            w-5 h-5 rounded-full flex items-center justify-center mr-3
                                            ${selectedAnswers[qIndex] === oIndex 
                                              ? 'bg-primary text-primary-foreground' 
                                              : 'bg-muted'
                                            }
                                          `}>
                                            {String.fromCharCode(65 + oIndex)} {/* A, B, C, D */}
                                          </div>
                                          <span>{option}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              
                              <Button 
                                className="w-full"
                                onClick={handleQuizSubmit}
                              >
                                {t("submitQuiz")}
                              </Button>
                            </>
                          ) : (
                            <div className="space-y-6">
                              <div className={`
                                rounded-lg p-6 text-center
                                ${quizScore >= 70 
                                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                                  : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                                }
                              `}>
                                <div className="flex flex-col items-center">
                                  {quizScore >= 70 ? (
                                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                                  ) : (
                                    <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                                  )}
                                  
                                  <h3 className={`text-xl font-bold ${
                                    quizScore >= 70 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                                  }`}>
                                    {quizScore >= 70 ? t("quizPassed") : t("quizFailed")}
                                  </h3>
                                  
                                  <div className="text-3xl font-bold mt-2">
                                    {quizScore.toFixed(0)}%
                                  </div>
                                  
                                  <p className="mt-2 text-sm">
                                    {quizScore >= 70 
                                      ? t("quizPassedMessage") 
                                      : t("quizFailedMessage")
                                    }
                                  </p>
                                </div>
                              </div>
                              
                              {activeModule.questions?.map((question, qIndex) => {
                                const isCorrect = selectedAnswers[qIndex] === question.correctAnswer;
                                
                                return (
                                  <div 
                                    key={question.id} 
                                    className={`border rounded-lg p-4 ${
                                      isCorrect 
                                        ? 'border-green-300 dark:border-green-700' 
                                        : 'border-red-300 dark:border-red-700'
                                    }`}
                                  >
                                    <div className="flex items-center mb-2">
                                      {isCorrect ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                      ) : (
                                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                                      )}
                                      <h3 className="font-medium">
                                        {qIndex + 1}. {question.text}
                                      </h3>
                                    </div>
                                    
                                    <div className="space-y-2 mt-3">
                                      {question.options.map((option, oIndex) => {
                                        const isSelected = selectedAnswers[qIndex] === oIndex;
                                        const isCorrectOption = question.correctAnswer === oIndex;
                                        
                                        let bgColor = "";
                                        if (isSelected && isCorrectOption) {
                                          bgColor = "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
                                        } else if (isSelected && !isCorrectOption) {
                                          bgColor = "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700";
                                        } else if (isCorrectOption) {
                                          bgColor = "bg-green-100/50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
                                        }
                                        
                                        return (
                                          <div 
                                            key={oIndex}
                                            className={`p-3 rounded-lg border ${bgColor}`}
                                          >
                                            <div className="flex items-center">
                                              <div className={`
                                                w-5 h-5 rounded-full flex items-center justify-center mr-3
                                                ${isCorrectOption 
                                                  ? 'bg-green-500 text-white' 
                                                  : isSelected 
                                                  ? 'bg-red-500 text-white'
                                                  : 'bg-muted'
                                                }
                                              `}>
                                                {String.fromCharCode(65 + oIndex)}
                                              </div>
                                              <span>{option}</span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                              
                              <div className="flex gap-4">
                                {quizScore >= 70 ? (
                                  <Button 
                                    className="w-full"
                                    onClick={handleCompleteModule}
                                  >
                                    {t("continueToNextModule")}
                                  </Button>
                                ) : (
                                  <Button 
                                    className="w-full"
                                    onClick={handleRetryQuiz}
                                    variant="outline"
                                  >
                                    {t("retryQuiz")}
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {activeModule.type === "video" && !activeModule.completed && (
                    <Button 
                      className="w-full"
                      onClick={handleCompleteModule}
                    >
                      {t("markAsCompleted")}
                    </Button>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground mb-6" />
                    <h3 className="text-xl font-medium mb-2">{t("selectModule")}</h3>
                    <p className="text-muted-foreground text-center max-w-sm">{t("selectModuleDescription")}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Quiz Pass Dialog */}
      <AlertDialog open={showPassQuizDialog} onOpenChange={setShowPassQuizDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("quizPassed")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("quizPassedLongMessage")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCompleteModule}>
              {t("continueToNextModule")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Quiz Fail Dialog */}
      <AlertDialog open={showFailQuizDialog} onOpenChange={setShowFailQuizDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("quizFailed")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("quizFailedLongMessage")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowFailQuizDialog(false)}>
              {t("reviewYourAnswers")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRetryQuiz}>
              {t("retryQuiz")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default CourseLessons;
