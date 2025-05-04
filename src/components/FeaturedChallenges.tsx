
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

// Mock data
const challenges = [
  {
    id: 1,
    title: "Algorithm Challenge",
    description: "Solve three algorithmic puzzles related to searching and sorting.",
    difficulty: "Medium",
    category: "Algorithms",
    participants: 235,
    points: 120,
  },
  {
    id: 2,
    title: "Frontend Design Challenge",
    description: "Build a responsive navigation menu with animations.",
    difficulty: "Easy",
    category: "Web Development",
    participants: 342,
    points: 80,
  },
  {
    id: 3,
    title: "Database Optimization",
    description: "Optimize a series of SQL queries for better performance.",
    difficulty: "Hard",
    category: "Databases",
    participants: 124,
    points: 150,
  },
];

export function FeaturedChallenges() {
  const { t } = useLanguage();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('featuredChallenges')}</h2>
        <Link to="/challenges" className="text-primary flex items-center hover:underline">
          <span>{t('viewAll')}</span>
          <ArrowRight className="ml-1 rtl:ml-0 rtl:mr-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="card-hover">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{challenge.title}</CardTitle>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{challenge.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded text-xs">
                  {challenge.category}
                </span>
                <span className="mx-2">•</span>
                <span>{challenge.participants} {t('participants')}</span>
                <span className="mx-2">•</span>
                <span>{challenge.points} {t('points')}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/challenge/${challenge.id}`} className="w-full">
                <button className="w-full bg-gradient text-white py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
                  {t('joinChallenge')}
                </button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
