import React from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Clock, Users, ArrowRight, Award } from "lucide-react";

const Contests = () => {
  const { t } = useLanguage();
  
  const upcomingContests = [
    {
      id: 1,
      title: "Algorithm Challenge",
      date: "2025-06-15",
      time: "10:00 AM",
      duration: "2 hours",
      difficulty: "Medium",
      participants: 352,
      prizes: "$500",
    },
    {
      id: 2,
      title: "Web Development Hackathon",
      date: "2025-07-01",
      time: "09:00 AM",
      duration: "24 hours",
      difficulty: "Hard",
      participants: 128,
      prizes: "$1,000",
    },
    {
      id: 3,
      title: "Data Science Competition",
      date: "2025-07-20",
      time: "02:00 PM",
      duration: "3 hours",
      difficulty: "Expert",
      participants: 215,
      prizes: "$750",
    },
  ];
  
  const pastContests = [
    {
      id: 4,
      title: "Frontend Masters Challenge",
      date: "2025-05-01",
      difficulty: "Medium",
      participants: 532,
      winners: ["Sarah Ahmed", "John Williams", "Maria Rodriguez"],
    },
    {
      id: 5,
      title: "Backend Architecture Contest",
      date: "2025-04-15",
      difficulty: "Hard",
      participants: 243,
      winners: ["Ahmed Hassan", "Emma Johnson", "Carlos Vega"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-amber-600 to-orange-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('codingContests')}</h1>
                  <p className="text-xl">{t('contestsHeroDescription')}</p>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                    {t('joinContest')}
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                    {t('learnMore')}
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-amber-800" />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
                    <h3 className="text-xl font-bold mb-3">{t('monthlyChallenge')}</h3>
                    <p className="mb-4">{t('monthlyChallengeDescription')}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{t('prize')}</div>
                        <div className="text-amber-600 font-bold text-lg">$2,500</div>
                      </div>
                      <div>
                        <div className="font-medium">{t('participants')}</div>
                        <div className="text-amber-600 font-bold text-lg">486</div>
                      </div>
                      <div>
                        <div className="font-medium">{t('deadline')}</div>
                        <div>May 25, 2025</div>
                      </div>
                      <div>
                        <div className="font-medium">{t('difficulty')}</div>
                        <Badge className="bg-amber-600">{t('advanced')}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Contests */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8">{t('upcomingContests')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingContests.map((contest) => (
              <Card key={contest.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    {contest.difficulty === "Easy" && <Badge className="bg-green-600">{t('easy')}</Badge>}
                    {contest.difficulty === "Medium" && <Badge className="bg-yellow-600">{t('medium')}</Badge>}
                    {contest.difficulty === "Hard" && <Badge className="bg-red-600">{t('hard')}</Badge>}
                    {contest.difficulty === "Expert" && <Badge className="bg-purple-600">{t('expert')}</Badge>}
                  </div>
                  <CardTitle>{contest.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">{t('date')}</div>
                      <div>{new Date(contest.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">{t('duration')}</div>
                      <div>{contest.duration}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">{t('participants')}</div>
                      <div>{contest.participants}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Trophy className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">{t('prizes')}</div>
                      <div>{contest.prizes}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {t('register')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Past Contests */}
        <div className="bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold mb-8">{t('pastContests')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastContests.map((contest) => (
                <Card key={contest.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-2 mb-2">
                          {contest.difficulty === "Easy" && <Badge className="bg-green-600">{t('easy')}</Badge>}
                          {contest.difficulty === "Medium" && <Badge className="bg-yellow-600">{t('medium')}</Badge>}
                          {contest.difficulty === "Hard" && <Badge className="bg-red-600">{t('hard')}</Badge>}
                        </div>
                        <CardTitle>{contest.title}</CardTitle>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(contest.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500">{t('participants')}</div>
                        <div className="font-medium">{contest.participants}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{t('winners')}</div>
                        <div className="font-medium">{contest.winners.length}</div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">{t('topWinners')}</h4>
                    <div className="space-y-2">
                      {contest.winners.map((winner, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 
                              ? "bg-yellow-500 text-yellow-900" 
                              : index === 1 
                                ? "bg-gray-300 text-gray-700" 
                                : "bg-amber-600 text-amber-900"
                          }`}>
                            {index + 1}
                          </div>
                          <span>{winner}</span>
                          {index === 0 && (
                            <Award className="h-4 w-4 ml-auto text-yellow-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      {t('viewResults')}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contests;
