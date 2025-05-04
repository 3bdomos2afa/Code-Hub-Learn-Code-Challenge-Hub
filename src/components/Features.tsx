
import { Book, Award, User, Code } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Features() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Book className="h-8 w-8 text-primary" />,
      title: t('learnTitle'),
      description: t('learnDescription'),
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: t('practiceTitle'),
      description: t('practiceDescription'),
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t('competeTitle'),
      description: t('competeDescription'),
    },
    {
      icon: <User className="h-8 w-8 text-primary" />,
      title: t('profileTitle'),
      description: t('profileDescription'),
    },
  ];
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('whyChooseUs')}</h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('platformDescription')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm card-hover border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 inline-block mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
