import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Loader2, BookOpen, Search, Star, Clock, Users } from "lucide-react";

// Course interface
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  image_url: string | null;
  duration_hours: number;
  students_count: number;
  rating: number;
  created_at?: string;
  updated_at?: string;
}

const Courses = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Categories for filtering
  const categories = [
    "all",
    "programming",
    "design",
    "business",
    "data-science",
    "mobile-dev",
  ];
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      console.log("Fetching courses...");
      // Use mock data for now due to Supabase error
      const mockCourses: Course[] = [
        {
          id: "1",
          title: "Introduction to Web Development",
          description: "Learn the basics of HTML, CSS and JavaScript",
          instructor: "Ahmed Mohamed",
          price: 0,
          category: "programming",
          image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=800&q=80",
          duration_hours: 10,
          students_count: 1245,
          rating: 4.8
        },
        {
          id: "2",
          title: "Advanced React & Redux",
          description: "Master React hooks, context API and Redux state management",
          instructor: "Fatima Ali",
          price: 59.99,
          category: "programming",
          image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=800&q=80",
          duration_hours: 18,
          students_count: 876,
          rating: 4.7
        },
        {
          id: "3", 
          title: "UI/UX Design Fundamentals",
          description: "Learn how to create beautiful user interfaces and experiences",
          instructor: "Omar Hassan",
          price: 49.99,
          category: "design",
          image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&h=800&q=80",
          duration_hours: 12,
          students_count: 543,
          rating: 4.6
        },
        {
          id: "4",
          title: "Python for Data Science",
          description: "Learn Python programming with focus on data analysis and visualization",
          instructor: "Layla Ibrahim",
          price: 0,
          category: "data-science",
          image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=800&q=80",
          duration_hours: 15,
          students_count: 1892,
          rating: 4.9
        }
      ];
      
      setCourses(mockCourses);
      
      // Try to fetch from Supabase but use mock data if it fails
      /* const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setCourses(data as Course[]); */
    } catch (error: any) {
      console.error("Error fetching courses:", error.message);
      toast({
        title: t("errorFetchingCourses"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const filteredCourses = courses
    .filter(course => 
      activeTab === "all" || course.category === activeTab
    )
    .filter(course => 
      searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Get free and paid courses
  const freeCourses = filteredCourses.filter(course => course.price === 0);
  const paidCourses = filteredCourses.filter(course => course.price > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">{t("exploreCourses")}</h1>
                <p className="text-xl max-w-2xl">{t("coursesHeroDescription") || "Discover courses to help you learn new skills and advance your career."}</p>
                
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-300" />
                  </div>
                  <input
                    type="text"
                    placeholder={t("searchCourses") || "Search for courses..."}
                    className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30">{t("trending")}</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">React</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">JavaScript</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Python</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">{t("designPatterns")}</Badge>
                </div>
              </div>
              
              <div className="hidden md:block relative h-64">
                <div className="absolute top-0 right-0 w-60 h-80 transform rotate-3 rounded-lg shadow-2xl overflow-hidden bg-blue-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-24 w-24 text-white/80" />
                  </div>
                </div>
                <div className="absolute top-10 left-10 w-60 h-80 transform -rotate-3 rounded-lg shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=800&q=80" 
                    alt="Course banner" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-20 w-60 h-80 transform rotate-6 rounded-lg shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&h=800&q=80" 
                    alt="Course banner" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Courses Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto flex-nowrap max-w-full">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 whitespace-nowrap"
                  >
                    {t(category) || category.replace(/-/g, " ")}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab}>
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-400" />
                  <h2 className="text-2xl font-bold mb-2">{t("noCoursesFound") || "No courses found"}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{t("tryChangingFilters")}</p>
                  <Button onClick={() => {setActiveTab("all"); setSearchQuery("");}}>
                    {t("clearFilters")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Featured Courses Section */}
                  {filteredCourses.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("featuredCourses") || "Featured Courses"}</h2>
                        <Link to="/courses" className="text-primary hover:underline">
                          {t("viewAll")}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.slice(0, 3).map(course => (
                          <CourseCardFeatured key={course.id} course={course} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Free Courses Section */}
                  {freeCourses.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("freeCourses")}</h2>
                        <Link to="/courses?filter=free" className="text-primary hover:underline">
                          {t("viewAll")}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {freeCourses.map(course => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Paid Courses Section */}
                  {paidCourses.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("paidCourses")}</h2>
                        <Link to="/courses?filter=paid" className="text-primary hover:underline">
                          {t("viewAll")}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paidCourses.map(course => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface CourseCardProps {
  course: Course;
}

// Regular Course Card Component
const CourseCard = ({ course }: CourseCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={course.image_url || "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&h=600&q=80"} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {course.price === 0 && (
          <Badge className="absolute top-2 right-2 bg-emerald-600">{t("free")}</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("by")} {course.instructor}</p>
        <p className="mt-2 text-sm line-clamp-2">{course.description}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {course.category.replace(/-/g, " ")}
          </Badge>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration_hours} {t("hours")}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 500)} {t("ratings")})</span>
        </div>
        <Link to={`/course/${course.id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
            {t("viewDetails")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// Featured Course Card Component with a different style
const CourseCardFeatured = ({ course }: CourseCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={course.image_url || "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&h=600&q=80"} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white">{course.title}</h3>
          <p className="text-sm text-gray-200">{t("by")} {course.instructor}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  fill="currentColor" 
                  className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-400/50"}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-white">{course.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {course.price === 0 ? (
          <Badge className="absolute top-2 right-2 bg-emerald-600">{t("free")}</Badge>
        ) : (
          <Badge className="absolute top-2 right-2 bg-primary">${course.price}</Badge>
        )}
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration_hours} {t("hours")}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.students_count.toLocaleString()} {t("students")}</span>
          </div>
        </div>
        <p className="text-sm line-clamp-2">{course.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/course/${course.id}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            {t("viewDetails")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Courses;
