
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/use-language";

// Mock data
const courses = [
  {
    id: 1,
    title: "Introduction to Python",
    instructor: "Ahmed Mohamed",
    enrolled: 3450,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=500&h=300&q=80",
    progress: 0,
  },
  {
    id: 2,
    title: "Web Development with React",
    instructor: "Fatima Ali",
    enrolled: 2820,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=500&h=300&q=80",
    progress: 45,
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    instructor: "Omar Hassan",
    enrolled: 1980,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500&h=300&q=80",
    progress: 72,
  },
];

export function TopCourses() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('topCourses')}</h2>
        <Link to="/courses" className="text-primary flex items-center hover:underline">
          <span>{t('viewAll')}</span>
          <ArrowRight className="ml-1 rtl:ml-0 rtl:mr-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="card-hover overflow-hidden">
            <div className="relative h-40">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-4 py-2">
                  <div className="flex justify-between text-white text-xs mb-1">
                    <span>{t('yourProgress')}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{t('by')} {course.instructor}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className={`w-4 h-4 ${i <= Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 rtl:ml-0 rtl:mr-1">{course.rating}</span>
                <span className="mx-2">•</span>
                <span>{course.enrolled.toLocaleString()} {t('students')}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/course/${course.id}`} className="w-full">
                <button className="w-full bg-gradient text-white py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
                  {course.progress > 0 ? t('continueCourse') : t('enrollNow')}
                </button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
