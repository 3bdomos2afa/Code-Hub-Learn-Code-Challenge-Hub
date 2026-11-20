import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Trophy, Medal, Award, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";

// Mock data for leaderboard users
const topUsers = [
  {
    id: 1,
    name: "Mohamed Ahmed",
    username: "moahmed",
    points: 12450,
    badges: 32,
    rank: 1,
    avatar: null,
    completedChallenges: 78,
    winRate: "92%",
  },
  {
    id: 2,
    name: "Sara Ibrahim",
    username: "saraib",
    points: 10890,
    badges: 28,
    rank: 2,
    avatar: null,
    completedChallenges: 65,
    winRate: "87%",
  },
  {
    id: 3,
    name: "Ali Hassan",
    username: "alih",
    points: 9750,
    badges: 24,
    rank: 3,
    avatar: null,
    completedChallenges: 59,
    winRate: "85%",
  },
  {
    id: 4,
    name: "Layla Mahmoud",
    username: "laylam",
    points: 8920,
    badges: 22,
    rank: 4,
    avatar: null,
    completedChallenges: 54,
    winRate: "82%",
  },
  {
    id: 5,
    name: "Omar Khaled",
    username: "omark",
    points: 8340,
    badges: 20,
    rank: 5,
    avatar: null,
    completedChallenges: 52,
    winRate: "81%",
  },
  {
    id: 6,
    name: "Nour Ahmed",
    username: "noura",
    points: 7980,
    badges: 19,
    rank: 6,
    avatar: null,
    completedChallenges: 48,
    winRate: "80%",
  },
  {
    id: 7,
    name: "Youssef Ibrahim",
    username: "youssefib",
    points: 7650,
    badges: 18,
    rank: 7,
    avatar: null,
    completedChallenges: 47,
    winRate: "79%",
  },
  {
    id: 8,
    name: "Fatima Ali",
    username: "fatimaa",
    points: 7320,
    badges: 17,
    rank: 8,
    avatar: null,
    completedChallenges: 45,
    winRate: "78%",
  },
  {
    id: 9,
    name: "Hassan Mohamed",
    username: "hassanm",
    points: 7120,
    badges: 16,
    rank: 9,
    avatar: null,
    completedChallenges: 43,
    winRate: "77%",
  },
  {
    id: 10,
    name: "Aisha Mahmoud",
    username: "aisham",
    points: 6890,
    badges: 15,
    rank: 10,
    avatar: null,
    completedChallenges: 41,
    winRate: "76%",
  },
];

const LeaderboardPage = () => {
  const { t } = useLanguage();
  const [timeFilter, setTimeFilter] = useState("all-time");
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">{t('leaderboard')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{t('leaderboardDesc')}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Top 3 performers highlight */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {topUsers.slice(0, 3).map((user, index) => (
                <div 
                  key={user.id} 
                  className={`flex flex-col items-center p-4 rounded-lg ${
                    index === 0 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' 
                      : index === 1 
                      ? 'bg-gray-100 dark:bg-gray-600/30 border border-gray-200 dark:border-gray-600' 
                      : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                  }`}
                >
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient flex items-center justify-center text-white text-xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                    {index === 0 && (
                      <Trophy className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500" />
                    )}
                    {index === 1 && (
                      <Medal className="absolute -top-2 -right-2 h-8 w-8 text-gray-400" />
                    )}
                    {index === 2 && (
                      <Award className="absolute -top-2 -right-2 h-8 w-8 text-amber-600" />
                    )}
                  </div>
                  <h3 className="mt-4 font-bold text-lg">{user.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                  <div className="mt-2 font-bold text-primary text-lg">{user.points.toLocaleString()} {t('points')}</div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{user.badges} {t('badges')}</div>
                </div>
              ))}
            </div>
            
            {/* Tabs for time filtering */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Tabs defaultValue="all-time" onValueChange={setTimeFilter}>
                <TabsList>
                  <TabsTrigger value="all-time">{t('allTime')}</TabsTrigger>
                  <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
                  <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Leaderboard table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('rank')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('user')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('points')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      {t('badges')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      {t('completedChallenges')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      {t('winRate')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {topUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.rank <= 3 ? (
                            <div className={`
                              flex items-center justify-center h-8 w-8 rounded-full font-bold
                              ${user.rank === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                                user.rank === 2 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : 
                                'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}
                            `}>
                              {user.rank}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold">
                              {user.rank}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3 rtl:ml-0 rtl:mr-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {user.points.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {user.badges}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        {user.completedChallenges}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        {user.winRate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
