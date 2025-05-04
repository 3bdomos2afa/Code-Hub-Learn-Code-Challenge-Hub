
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

// Mock data
const topUsers = [
  {
    id: 1,
    name: "Mohamed Ahmed",
    username: "moahmed",
    points: 12450,
    badges: 32,
    rank: 1,
    avatar: null,
  },
  {
    id: 2,
    name: "Sara Ibrahim",
    username: "saraib",
    points: 10890,
    badges: 28,
    rank: 2,
    avatar: null,
  },
  {
    id: 3,
    name: "Ali Hassan",
    username: "alih",
    points: 9750,
    badges: 24,
    rank: 3,
    avatar: null,
  },
  {
    id: 4,
    name: "Layla Mahmoud",
    username: "laylam",
    points: 8920,
    badges: 22,
    rank: 4,
    avatar: null,
  },
  {
    id: 5,
    name: "Omar Khaled",
    username: "omark",
    points: 8340,
    badges: 20,
    rank: 5,
    avatar: null,
  }
];

export function Leaderboard() {
  const { t } = useLanguage();
  
  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2: 
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-gray-500";
    }
  };
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('topPerformers')}</h2>
        <Link to="/leaderboard" className="text-primary flex items-center hover:underline">
          <span>{t('viewAll')}</span>
          <ArrowRight className="ml-1 rtl:ml-0 rtl:mr-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('rank')}
              </th>
              <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('user')}
              </th>
              <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                {t('badges')}
              </th>
              <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('points')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {topUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.rank <= 3 ? (
                      <Trophy className={`h-5 w-5 ${getTrophyColor(user.rank)}`} />
                    ) : (
                      <span className="text-gray-500 font-medium">{user.rank}</span>
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
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {user.badges}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {user.points.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
