
import React from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Goal, Award, MessageSquare, Code, Lightbulb, BarChart } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: "Sara Ahmed",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
      name: "Ahmed Hassan",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
      name: "Laila Omar",
      role: "Head of Education",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
      name: "Youssef Ali",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=200&h=200&auto=format&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-800 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-fixed opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('aboutCodeHub')}</h1>
              <p className="text-xl max-w-3xl mx-auto mb-10">
                {t('aboutDescription')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-indigo-800 hover:bg-gray-100">
                  {t('joinCommunity')}
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  {t('learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission and Vision */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Goal className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold">{t('ourMission')}</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('missionDescription')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('missionDescription2')}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold">{t('ourVision')}</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('visionDescription')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('visionDescription2')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-bold text-center mb-16">{t('ourImpact')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('activeStudents')}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('coursesAndTutorials')}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-gray-600 dark:text-gray-300">{t('jobPlacement')}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-4xl font-bold mb-2">120+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('partneredCompanies')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('ourTeam')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('teamDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="text-center pt-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t('joinOurCommunity')}</h2>
                <p className="text-lg text-indigo-100">
                  {t('communityDescription')}
                </p>
                <div className="flex gap-4">
                  <Button className="bg-white text-indigo-900 hover:bg-gray-100">
                    {t('getStarted')}
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t('contactUs')}
                  </Button>
                </div>
              </div>
              
              <div className="lg:text-right">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Community" 
                  className="inline-block rounded-lg shadow-2xl max-h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
