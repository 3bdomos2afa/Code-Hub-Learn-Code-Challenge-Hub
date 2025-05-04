
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
import { Loader2, Code, Search, Trophy, Star } from "lucide-react";

// Challenge interface
interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  category: string;
  image_url: string | null;
  created_at: string;
}

const Challenges = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Categories for filtering - dynamically generated from challenges
  const [categories, setCategories] = useState<string[]>(["all"]);
  
  // Difficulties
  const difficulties = {
    "easy": "bg-green-600",
    "medium": "bg-yellow-600",
    "hard": "bg-orange-600",
    "expert": "bg-red-600"
  };
  
  useEffect(() => {
    fetchChallenges();
  }, []);
  
  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setChallenges(data);
        
        // Extract unique categories
        const uniqueCategories = ["all", ...new Set(data.map(challenge => challenge.category))];
        setCategories(uniqueCategories);
      }
    } catch (error: any) {
      console.error("Error fetching challenges:", error.message);
      toast({
        title: t("errorFetchingChallenges") || "Error fetching challenges",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const filteredChallenges = challenges
    .filter(challenge => 
      activeTab === "all" || challenge.category === activeTab
    )
    .filter(challenge => 
      searchQuery === "" || 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Group by difficulty
  const easyChallenges = filteredChallenges.filter(challenge => challenge.difficulty === "easy");
  const mediumChallenges = filteredChallenges.filter(challenge => challenge.difficulty === "medium");
  const hardChallenges = filteredChallenges.filter(challenge => challenge.difficulty === "hard");
  const expertChallenges = filteredChallenges.filter(challenge => challenge.difficulty === "expert");

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">{t("challenges")}</h1>
                <p className="text-xl max-w-2xl">{t("challengesHeroDescription") || "Test your coding skills with our challenges and compete with other developers."}</p>
                
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-300" />
                  </div>
                  <input
                    type="text"
                    placeholder={t("searchChallenges") || "Search challenges..."}
                    className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <Badge 
                      key={category} 
                      className="bg-white/20 hover:bg-white/30 cursor-pointer"
                      onClick={() => setActiveTab(category)}
                    >
                      {category === "all" ? t("all") : category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/20 rounded-full blur-lg"></div>
                  <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/20 rounded-full blur-lg"></div>
                  <div className="relative h-full w-full flex items-center justify-center">
                    <Code className="h-32 w-32 text-white/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Challenges Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                  >
                    {category === "all" ? t("all") : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab}>
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : filteredChallenges.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <Code className="h-16 w-16 mx-auto text-gray-400" />
                  <h2 className="text-2xl font-bold mb-2">{t("noChallengesFound") || "No challenges found"}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{t("tryChangingFilters") || "Try changing your filters or search term"}</p>
                  <Button onClick={() => {setActiveTab("all"); setSearchQuery("");}}>
                    {t("clearFilters") || "Clear Filters"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Featured Challenges Section */}
                  {filteredChallenges.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("featuredChallenges") || "Featured Challenges"}</h2>
                        <Link to="/challenges" className="text-primary hover:underline">
                          {t("viewAll") || "View All"}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredChallenges.slice(0, 3).map(challenge => (
                          <ChallengeCardFeatured key={challenge.id} challenge={challenge} difficulty={difficulties} t={t} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Easy Challenges Section */}
                  {easyChallenges.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("easyChallenges") || "Easy Challenges"}</h2>
                        <Link to="/challenges?filter=easy" className="text-primary hover:underline">
                          {t("viewAll") || "View All"}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {easyChallenges.map(challenge => (
                          <ChallengeCard key={challenge.id} challenge={challenge} difficulty={difficulties} t={t} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Medium Challenges Section */}
                  {mediumChallenges.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("mediumChallenges") || "Medium Challenges"}</h2>
                        <Link to="/challenges?filter=medium" className="text-primary hover:underline">
                          {t("viewAll") || "View All"}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mediumChallenges.map(challenge => (
                          <ChallengeCard key={challenge.id} challenge={challenge} difficulty={difficulties} t={t} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Hard Challenges Section */}
                  {hardChallenges.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("hardChallenges") || "Hard Challenges"}</h2>
                        <Link to="/challenges?filter=hard" className="text-primary hover:underline">
                          {t("viewAll") || "View All"}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hardChallenges.map(challenge => (
                          <ChallengeCard key={challenge.id} challenge={challenge} difficulty={difficulties} t={t} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Expert Challenges Section */}
                  {expertChallenges.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("expertChallenges") || "Expert Challenges"}</h2>
                        <Link to="/challenges?filter=expert" className="text-primary hover:underline">
                          {t("viewAll") || "View All"}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {expertChallenges.map(challenge => (
                          <ChallengeCard key={challenge.id} challenge={challenge} difficulty={difficulties} t={t} />
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

interface ChallengeCardProps {
  challenge: Challenge;
  difficulty: Record<string, string>;
  t: (key: string) => string;
}

// Regular Challenge Card Component
const ChallengeCard = ({ challenge, difficulty, t }: ChallengeCardProps) => {
  const difficultyClass = difficulty[challenge.difficulty as keyof typeof difficulty] || "bg-gray-600";
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        {challenge.image_url ? (
          <img 
            src={challenge.image_url} 
            alt={challenge.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Code className="h-20 w-20 text-white/50" />
        )}
        <Badge className={`absolute top-2 right-2 ${difficultyClass}`}>
          {t(challenge.difficulty) || challenge.difficulty}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.points} {t("points") || "points"}</p>
        <p className="mt-2 text-sm line-clamp-2">{challenge.description}</p>
        <div className="mt-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {challenge.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm">{Math.floor(Math.random() * 1000)} {t("submissions") || "submissions"}</span>
        </div>
        <Link to={`/challenge/${challenge.id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
            {t("viewDetails") || "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// Featured Challenge Card Component with a different style
const ChallengeCardFeatured = ({ challenge, difficulty, t }: ChallengeCardProps) => {
  const difficultyClass = difficulty[challenge.difficulty as keyof typeof difficulty] || "bg-gray-600";
  
  return (
    <Card className="overflow-hidden flex flex-col h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="relative h-56 overflow-hidden">
        {challenge.image_url ? (
          <img 
            src={challenge.image_url} 
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Code className="h-24 w-24 text-white/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
          <p className="text-sm text-gray-200">{challenge.points} {t("points") || "points"}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} fill="currentColor" className="w-4 h-4 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-xs text-white">5.0</span>
          </div>
        </div>
        
        <Badge className={`absolute top-2 right-2 ${difficultyClass}`}>
          {t(challenge.difficulty) || challenge.difficulty}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <p className="text-sm line-clamp-2">{challenge.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/challenge/${challenge.id}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            {t("viewDetails") || "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Challenges;
