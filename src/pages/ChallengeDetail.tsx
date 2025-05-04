
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Code, Share2, Trophy, Clock, Users, CheckCircle, Clock3, Star } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  category: string;
  image_url: string | null;
  created_at: string;
  content: string;
  time_limit_minutes: number;
}

interface ChallengeSubmission {
  id: string;
  challenge_id: string;
  user_id: string;
  submission_date: string;
  status: "completed" | "in_progress";
  score: number;
}

const ChallengeDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submission, setSubmission] = useState<ChallengeSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [relatedChallenges, setRelatedChallenges] = useState<Challenge[]>([]);
  
  // Difficulty colors
  const difficultyColor = {
    "easy": "bg-green-600",
    "medium": "bg-yellow-600",
    "hard": "bg-orange-600",
    "expert": "bg-red-600"
  };
  
  useEffect(() => {
    fetchChallengeAndSubmission();
  }, [id, user, t, toast]);
  
  const fetchChallengeAndSubmission = async () => {
    try {
      if (!id) return;

      // Get challenge details
      const { data: challengeData, error: challengeError } = await supabase
        .from("challenges")
        .select("*")
        .eq("id", id)
        .single();
        
      if (challengeError) throw challengeError;
      setChallenge(challengeData as Challenge);
      
      // Check if user is authenticated and has attempted this challenge
      if (user) {
        const { data: submissionData, error: submissionError } = await supabase
          .from("challenge_submissions")
          .select("*")
          .eq("challenge_id", id)
          .eq("user_id", user.id)
          .maybeSingle();
          
        if (!submissionError && submissionData) {
          setSubmission(submissionData as ChallengeSubmission);
        }
      }
      
      // Get related challenges with the same category
      if (challengeData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from("challenges")
          .select("*")
          .eq("category", challengeData.category)
          .neq("id", challengeData.id)
          .limit(3);
          
        if (!relatedError && relatedData) {
          setRelatedChallenges(relatedData as Challenge[]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching challenge:", error.message);
      toast({
        title: t("errorFetchingChallenge") || "Error fetching challenge",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartChallenge = async () => {
    if (!user) {
      toast({
        title: t("loginRequired") || "Login required",
        description: t("pleaseLoginToStartChallenge") || "Please login to start this challenge",
        variant: "default"
      });
      navigate("/auth");
      return;
    }
    
    if (!challenge) return;
    
    setStarting(true);
    try {
      // Create a new submission record if user hasn't started this challenge yet
      if (!submission) {
        const { data, error } = await supabase
          .from("challenge_submissions")
          .insert({
            user_id: user.id,
            challenge_id: challenge.id,
            status: "in_progress",
            score: 0,
          })
          .select()
          .single();
          
        if (error) throw error;
        setSubmission(data as ChallengeSubmission);
      }
      
      // Navigate to the challenge playground
      navigate(`/code-playground?challenge=${challenge.id}`);
    } catch (error: any) {
      console.error("Error starting challenge:", error.message);
      toast({
        title: t("errorStartingChallenge") || "Error starting challenge",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setStarting(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share && challenge) {
      navigator.share({
        title: challenge.title,
        text: challenge.description,
        url: window.location.href,
      })
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("linkCopied"),
        description: t("linkCopiedToClipboard"),
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg">{t("loadingChallenge") || "Loading challenge..."}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{t("challengeNotFound") || "Challenge not found"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t("challengeNotFoundDescription") || "The challenge you are looking for does not exist."}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/challenges")} className="w-full">
                {t("backToChallenges") || "Back to Challenges"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  const difficultyClass = difficultyColor[challenge.difficulty as keyof typeof difficultyColor] || "bg-gray-600";
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Challenge Icon */}
              <div className="flex justify-center md:col-span-1">
                <div className="w-48 h-48 relative">
                  {challenge.image_url ? (
                    <img 
                      src={challenge.image_url}
                      alt={challenge.title}
                      className="w-full h-full object-cover rounded-lg shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
                      <Code className="h-24 w-24 text-white/80" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Challenge Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <Badge className={`mb-3 ${difficultyClass}`}>{t(challenge.difficulty) || challenge.difficulty}</Badge>
                  <Badge className="ml-2 mb-3 bg-primary/60 hover:bg-primary">{challenge.category}</Badge>
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">{challenge.title}</h1>
                  
                  <div className="flex items-center mt-2 space-x-6">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                      <span>{challenge.points} {t("points") || "points"}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock3 className="h-5 w-5 text-blue-400 mr-2" />
                      <span>{challenge.time_limit_minutes} {t("minutes") || "minutes"}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-400 mr-2" />
                      <span>{Math.floor(Math.random() * 5000)} {t("submissions") || "submissions"}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg">{challenge.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  {submission?.status === "completed" ? (
                    <Button 
                      className="w-full md:w-auto gap-2 text-lg font-medium bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => navigate(`/code-playground?challenge=${challenge.id}`)}
                      size="lg"
                    >
                      <CheckCircle className="h-5 w-5" />
                      {t("viewYourSolution") || "View Your Solution"}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full md:w-auto gap-2 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={handleStartChallenge}
                      disabled={starting}
                      size="lg"
                    >
                      {starting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Code className="h-5 w-5" />
                      )}
                      {starting 
                        ? (t("starting") || "Starting...") 
                        : submission?.status === "in_progress"
                          ? (t("continueChallenge") || "Continue Challenge")
                          : (t("startChallenge") || "Start Challenge")}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2 text-lg font-medium border-white/20 bg-white/5 hover:bg-white/10"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                    {t("share")}
                  </Button>
                </div>
                
                {submission?.status === "completed" && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>{t("challengeCompleted") || "Challenge completed"} • {submission.score} {t("points") || "points"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Challenge Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-10">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">{t("challengeDescription") || "Challenge Description"}</h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <p>{challenge.content || challenge.description}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">{t("requirements") || "Requirements"}</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <ul className="space-y-3 list-disc list-inside">
                    <li>{t("requirement1") || "Write efficient and optimized code"}</li>
                    <li>{t("requirement2") || "Ensure your solution handles all edge cases"}</li>
                    <li>{t("requirement3") || "Complete the challenge within the time limit"}</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">{t("tips") || "Tips"}</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <ul className="space-y-3 list-disc list-inside">
                    <li>{t("tip1") || "Break down the problem into smaller parts"}</li>
                    <li>{t("tip2") || "Consider the time and space complexity of your solution"}</li>
                    <li>{t("tip3") || "Test your code with different inputs"}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-3 border-b">
                  <CardTitle>{t("challengeStats") || "Challenge Stats"}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("totalPoints") || "Total Points"}</div>
                      <div className="text-gray-500">{challenge.points}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("timeLimit") || "Time Limit"}</div>
                      <div className="text-gray-500">{challenge.time_limit_minutes} {t("minutes") || "minutes"}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("difficulty") || "Difficulty"}</div>
                      <div className="text-gray-500">{t(challenge.difficulty) || challenge.difficulty}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("submissions") || "Submissions"}</div>
                      <div className="text-gray-500">{Math.floor(Math.random() * 5000)}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button 
                    className="w-full gap-2"
                    onClick={handleStartChallenge}
                    disabled={starting}
                  >
                    {starting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Code className="h-4 w-4" />
                    )}
                    {starting 
                      ? (t("starting") || "Starting...") 
                      : submission?.status === "completed"
                        ? (t("viewYourSolution") || "View Your Solution")
                        : submission?.status === "in_progress"
                          ? (t("continueChallenge") || "Continue Challenge")
                          : (t("startChallenge") || "Start Challenge")}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Related Challenges */}
              {relatedChallenges.length > 0 && (
                <Card className="border border-gray-200 dark:border-gray-800">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle>{t("relatedChallenges") || "Related Challenges"}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {relatedChallenges.map((relatedChallenge) => (
                        <Link 
                          key={relatedChallenge.id} 
                          to={`/challenge/${relatedChallenge.id}`} 
                          className="flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                        >
                          <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            {relatedChallenge.image_url ? (
                              <img 
                                src={relatedChallenge.image_url} 
                                alt={relatedChallenge.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Code className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-1">{relatedChallenge.title}</h4>
                            <div className="flex items-center mt-1">
                              <Badge className={`${difficultyColor[relatedChallenge.difficulty as keyof typeof difficultyColor] || "bg-gray-600"} mr-2 text-xs`}>
                                {t(relatedChallenge.difficulty) || relatedChallenge.difficulty}
                              </Badge>
                              <span className="text-xs text-gray-500">{relatedChallenge.points} {t("points") || "points"}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
