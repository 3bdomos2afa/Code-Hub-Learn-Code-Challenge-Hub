import React from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Link as LinkIcon, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const { t } = useLanguage();
  
  const resources = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      category: "programming",
      type: "guide",
      icon: FileText,
      description: "Comprehensive guide covering all JavaScript basics and advanced concepts.",
      link: "/resources/javascript-fundamentals"
    },
    {
      id: 2,
      title: "React.js Complete Course",
      category: "web",
      type: "video",
      icon: Video,
      description: "Learn React.js from beginner to advanced through project-based tutorials.",
      link: "/courses/react-complete"
    },
    {
      id: 3,
      title: "Python for Data Science",
      category: "data",
      type: "book",
      icon: BookOpen,
      description: "Master Python for data analysis, visualization, and machine learning.",
      link: "/books/python-data-science"
    },
    {
      id: 4,
      title: "Responsive Web Design Cheatsheet",
      category: "design",
      type: "cheatsheet",
      icon: Download,
      description: "Handy reference for CSS media queries and responsive layouts.",
      link: "/resources/responsive-design-cheatsheet"
    },
    {
      id: 5,
      title: "Git & GitHub Mastery",
      category: "tools",
      type: "guide",
      icon: FileText,
      description: "Learn version control best practices with Git and GitHub.",
      link: "/resources/git-github-mastery"
    },
    {
      id: 6,
      title: "Algorithms & Data Structures",
      category: "programming",
      type: "book",
      icon: BookOpen,
      description: "Comprehensive guide to algorithms and data structures with examples.",
      link: "/books/algorithms-data-structures"
    },
    {
      id: 7,
      title: "Top Programming Blogs",
      category: "community",
      type: "links",
      icon: LinkIcon,
      description: "Curated list of the best programming blogs and resources.",
      link: "/resources/top-programming-blogs"
    },
    {
      id: 8,
      title: "Docker & Kubernetes Basics",
      category: "devops",
      type: "guide",
      icon: FileText,
      description: "Get started with containerization and orchestration.",
      link: "/resources/docker-kubernetes"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('learningResources')}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t('resourcesDescription')}
            </p>
          </div>
        </div>
        
        {/* Resources Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface ResourceProps {
  resource: {
    id: number;
    title: string;
    category: string;
    type: string;
    icon: React.ElementType;
    description: string;
    link: string;
  };
}

const ResourceCard = ({ resource }: ResourceProps) => {
  const { t } = useLanguage();
  const Icon = resource.icon;
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="flex-grow">{resource.title}</CardTitle>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={20} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {resource.description}
        </p>
        <div className="flex gap-2">
          <Badge>{resource.category}</Badge>
          <Badge variant="outline">{resource.type}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={resource.link} className="w-full">
          <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors">
            {t('viewResource')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Resources;
