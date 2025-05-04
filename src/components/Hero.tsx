
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Code, ArrowRight, Terminal, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage === "ar";
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const codeSnippet = `
function learnToCode() {
  const skills = ['HTML', 'CSS', 'JavaScript'];
  
  for (const skill of skills) {
    console.log(\`Learning \${skill}\`);
  }
  
  return "Become a developer!";
}

learnToCode();
`;
  
  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      
      {/* Animated Elements */}
      <div aria-hidden="true" className="select-none">
        <div className={`absolute ${isRtl ? 'right-[-10%]' : 'left-[-10%]'} top-[10%] h-32 w-32 animate-float opacity-20 dark:opacity-10`}>
          <div className="absolute inset-0 rotate-45 transform rounded-lg bg-gradient-to-br from-primary to-purple-600 blur-2xl"></div>
        </div>
        <div className={`absolute ${isRtl ? 'left-[20%]' : 'right-[20%]'} top-[20%] h-48 w-48 animate-float opacity-20 dark:opacity-10 animation-delay-1000`}>
          <div className="absolute inset-0 transform rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-3xl"></div>
        </div>
        <div className="absolute bottom-[10%] left-[45%] h-24 w-24 animate-float opacity-20 dark:opacity-10 animation-delay-2000">
          <div className="absolute inset-0 transform rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-2xl"></div>
        </div>
        
        <div className={`absolute top-[15%] ${isRtl ? 'left-[10%]' : 'right-[10%]'}`}>
          <Code className="h-16 w-16 text-slate-200 dark:text-slate-800 animate-bounce-light" />
        </div>
        
        <div className={`absolute bottom-[25%] ${isRtl ? 'right-[15%]' : 'left-[15%]'}`}>
          <Terminal className="h-12 w-12 text-slate-200 dark:text-slate-800 animate-pulse-light" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center relative z-10">
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white typewriter">
              <span>{currentLanguage === "ar" ? "تعلم البرمجة" : "Learn Coding"} </span>
              <span className="text-primary inline-block mt-2 md:mt-0">{currentLanguage === "ar" ? "بطريقة مميزة" : "in a unique way"}</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
              {t('heroSubtitle')}
            </p>
          </div>
          
          <div className={`mt-10 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
              {t('getStarted')}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/challenges">
                {t('browseChallenge')}
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className={`glass-card p-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex justify-center items-center mb-4">
                <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-background bg-slate-200 dark:bg-slate-700"></div>
                  ))}
                </div>
                <span className={`${isRtl ? 'mr-3' : 'ml-3'} text-sm font-medium`}>+ {t('joinedDevelopers')}</span>
              </div>
              
              <div className="code-bg text-sm overflow-hidden whitespace-pre-wrap overflow-ellipsis max-h-32">
                {codeSnippet}
              </div>
            </div>
            
            <div className={`glass-card p-6 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex justify-center space-x-1 rtl:space-x-reverse mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">{t('averageRating')}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm">{t('challenges')}</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm">{t('courses')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-background" style={{ maxHeight: "120px" }}>
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,181.3C672,171,768,181,864,181.3C960,181,1056,171,1152,181.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}
